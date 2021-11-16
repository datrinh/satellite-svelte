var NewsletterOptIn = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function append_styles(target, style_sheet_id, styles) {
        const append_styles_to = get_root_for_style(target);
        if (!append_styles_to.getElementById(style_sheet_id)) {
            const style = element('style');
            style.id = style_sheet_id;
            style.textContent = styles;
            append_stylesheet(append_styles_to, style);
        }
    }
    function get_root_for_style(node) {
        if (!node)
            return document;
        const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
        if (root && root.host) {
            return root;
        }
        return node.ownerDocument;
    }
    function append_stylesheet(node, style) {
        append(node.head || node, style);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_data(text, data) {
        data = '' + data;
        if (text.wholeText !== data)
            text.data = data;
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init$2(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    /* src/components/NewsletterOptInSuccess.svelte generated by Svelte v3.44.1 */

    function add_css$4(target) {
    	append_styles(target, "svelte-10sb7nx", ".charles-newsletter-done.svelte-10sb7nx.svelte-10sb7nx{background-color:#00c40a;color:white;padding:2rem}.charles-newsletter-done.svelte-10sb7nx h1.svelte-10sb7nx{font-size:3rem}.charles-newsletter-done.svelte-10sb7nx p.svelte-10sb7nx{font-size:1.5rem}.charles-newsletter-done.svelte-10sb7nx .content.svelte-10sb7nx{max-width:576px;margin:auto}");
    }

    function create_fragment$4(ctx) {
    	let section;
    	let div;
    	let mounted;
    	let dispose;

    	return {
    		c() {
    			section = element("section");
    			div = element("div");

    			div.innerHTML = `<h1 class="text-5xl svelte-10sb7nx">Thanks a lot! 🥳</h1> 

    <p class="text-base svelte-10sb7nx">We have successfully opted-in to stay in touch with us on WhatsApp. We&#39;re
      excited to have you!</p>`;

    			attr(div, "class", "content svelte-10sb7nx");
    			attr(section, "class", "charles-newsletter-done svelte-10sb7nx");
    		},
    		m(target, anchor) {
    			insert(target, section, anchor);
    			append(section, div);

    			if (!mounted) {
    				dispose = listen(div, "click", /*click_handler*/ ctx[1]);
    				mounted = true;
    			}
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(section);
    			mounted = false;
    			dispose();
    		}
    	};
    }

    function instance$4($$self) {
    	const dispatch = createEventDispatcher();
    	const click_handler = () => dispatch("click");
    	return [dispatch, click_handler];
    }

    class NewsletterOptInSuccess extends SvelteComponent {
    	constructor(options) {
    		super();
    		init$2(this, options, instance$4, create_fragment$4, safe_not_equal, {}, add_css$4);
    	}
    }

    /* src/components/CtaButton.svelte generated by Svelte v3.44.1 */

    function add_css$3(target) {
    	append_styles(target, "svelte-1ru8nfc", "button.svelte-1ru8nfc{box-sizing:border-box;padding:0.5rem 1.5rem;cursor:pointer;background-color:#00c40a;border-radius:2rem;border:none;color:white;height:2.5rem;display:flex;align-items:center;justify-content:center}");
    }

    function create_fragment$3(ctx) {
    	let button;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	return {
    		c() {
    			button = element("button");
    			if (default_slot) default_slot.c();
    			attr(button, "type", /*type*/ ctx[0]);
    			attr(button, "class", "svelte-1ru8nfc");
    		},
    		m(target, anchor) {
    			insert(target, button, anchor);

    			if (default_slot) {
    				default_slot.m(button, null);
    			}

    			current = true;
    		},
    		p(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*type*/ 1) {
    				attr(button, "type", /*type*/ ctx[0]);
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(button);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	let { type = "button" } = $$props;

    	$$self.$$set = $$props => {
    		if ('type' in $$props) $$invalidate(0, type = $$props.type);
    		if ('$$scope' in $$props) $$invalidate(1, $$scope = $$props.$$scope);
    	};

    	return [type, $$scope, slots];
    }

    class CtaButton extends SvelteComponent {
    	constructor(options) {
    		super();
    		init$2(this, options, instance$3, create_fragment$3, safe_not_equal, { type: 0 }, add_css$3);
    	}
    }

    /* src/components/BaseCheckbox.svelte generated by Svelte v3.44.1 */

    function add_css$2(target) {
    	append_styles(target, "svelte-pxuelf", ".satellite-checkbox.svelte-pxuelf.svelte-pxuelf.svelte-pxuelf{display:flex;text-align:left;margin-bottom:16px}.satellite-checkbox.svelte-pxuelf .container.svelte-pxuelf.svelte-pxuelf{display:block;position:relative;padding-left:35px;margin-bottom:12px;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;color:#ababab;width:fit-content;font-size:0.8rem}.satellite-checkbox.svelte-pxuelf .container input.svelte-pxuelf.svelte-pxuelf{position:absolute;opacity:0;cursor:pointer;height:0;width:0}.satellite-checkbox.svelte-pxuelf .checkmark.svelte-pxuelf.svelte-pxuelf{position:absolute;top:0;left:0;height:1.25rem;width:1.25rem;border-radius:0.25rem;background-color:#f3f3f3}.satellite-checkbox.svelte-pxuelf .container:hover input.svelte-pxuelf~.checkmark.svelte-pxuelf{background-color:#dadada}.satellite-checkbox.svelte-pxuelf .checkmark.svelte-pxuelf.svelte-pxuelf:after{content:\"\";position:absolute;display:none}.satellite-checkbox.svelte-pxuelf .container input.svelte-pxuelf:checked~.checkmark.svelte-pxuelf:after{display:block}.satellite-checkbox.svelte-pxuelf .container .checkmark.svelte-pxuelf.svelte-pxuelf:after{left:0.5rem;top:0.1rem;width:0.4rem;height:0.8rem;border:solid black;border-width:0 2px 2px 0;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg)}");
    }

    function create_fragment$2(ctx) {
    	let div;
    	let label;
    	let t0;
    	let input;
    	let t1;
    	let span;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

    	return {
    		c() {
    			div = element("div");
    			label = element("label");
    			if (default_slot) default_slot.c();
    			t0 = space();
    			input = element("input");
    			t1 = space();
    			span = element("span");
    			attr(input, "id", /*id*/ ctx[0]);
    			attr(input, "type", "checkbox");
    			input.value = /*value*/ ctx[1];
    			attr(input, "class", "svelte-pxuelf");
    			attr(span, "class", "checkmark svelte-pxuelf");
    			attr(label, "class", "container svelte-pxuelf");
    			attr(label, "for", /*id*/ ctx[0]);
    			attr(div, "class", "satellite-checkbox svelte-pxuelf");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			append(div, label);

    			if (default_slot) {
    				default_slot.m(label, null);
    			}

    			append(label, t0);
    			append(label, input);
    			append(label, t1);
    			append(label, span);
    			current = true;
    		},
    		p(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[2],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*id*/ 1) {
    				attr(input, "id", /*id*/ ctx[0]);
    			}

    			if (!current || dirty & /*value*/ 2) {
    				input.value = /*value*/ ctx[1];
    			}

    			if (!current || dirty & /*id*/ 1) {
    				attr(label, "for", /*id*/ ctx[0]);
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	let { id } = $$props;
    	let { value } = $$props;

    	$$self.$$set = $$props => {
    		if ('id' in $$props) $$invalidate(0, id = $$props.id);
    		if ('value' in $$props) $$invalidate(1, value = $$props.value);
    		if ('$$scope' in $$props) $$invalidate(2, $$scope = $$props.$$scope);
    	};

    	return [id, value, $$scope, slots];
    }

    class BaseCheckbox extends SvelteComponent {
    	constructor(options) {
    		super();
    		init$2(this, options, instance$2, create_fragment$2, safe_not_equal, { id: 0, value: 1 }, add_css$2);
    	}
    }

    /* src/components/BaseInput.svelte generated by Svelte v3.44.1 */

    function add_css$1(target) {
    	append_styles(target, "svelte-17fo3ti", "input.svelte-17fo3ti{padding:0.5rem;background-color:#f3f3f3;border:none;margin-bottom:16px;height:2.5rem;border-radius:0.25rem;font-size:0.75rem}");
    }

    function create_fragment$1(ctx) {
    	let input;

    	return {
    		c() {
    			input = element("input");
    			attr(input, "type", /*type*/ ctx[0]);
    			attr(input, "placeholder", /*placeholder*/ ctx[1]);
    			input.value = /*value*/ ctx[2];
    			attr(input, "class", "svelte-17fo3ti");
    		},
    		m(target, anchor) {
    			insert(target, input, anchor);
    		},
    		p(ctx, [dirty]) {
    			if (dirty & /*type*/ 1) {
    				attr(input, "type", /*type*/ ctx[0]);
    			}

    			if (dirty & /*placeholder*/ 2) {
    				attr(input, "placeholder", /*placeholder*/ ctx[1]);
    			}

    			if (dirty & /*value*/ 4 && input.value !== /*value*/ ctx[2]) {
    				input.value = /*value*/ ctx[2];
    			}
    		},
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(input);
    		}
    	};
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { type = "text" } = $$props;
    	let { placeholder } = $$props;
    	let { value } = $$props;

    	$$self.$$set = $$props => {
    		if ('type' in $$props) $$invalidate(0, type = $$props.type);
    		if ('placeholder' in $$props) $$invalidate(1, placeholder = $$props.placeholder);
    		if ('value' in $$props) $$invalidate(2, value = $$props.value);
    	};

    	return [type, placeholder, value];
    }

    class BaseInput extends SvelteComponent {
    	constructor(options) {
    		super();
    		init$2(this, options, instance$1, create_fragment$1, safe_not_equal, { type: 0, placeholder: 1, value: 2 }, add_css$1);
    	}
    }

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var strictUriEncode = str => encodeURIComponent(str).replace(/[!'()*]/g, x => `%${x.charCodeAt(0).toString(16).toUpperCase()}`);

    var token = '%[a-f0-9]{2}';
    var singleMatcher = new RegExp(token, 'gi');
    var multiMatcher = new RegExp('(' + token + ')+', 'gi');

    function decodeComponents(components, split) {
    	try {
    		// Try to decode the entire string first
    		return decodeURIComponent(components.join(''));
    	} catch (err) {
    		// Do nothing
    	}

    	if (components.length === 1) {
    		return components;
    	}

    	split = split || 1;

    	// Split the array in 2 parts
    	var left = components.slice(0, split);
    	var right = components.slice(split);

    	return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
    }

    function decode(input) {
    	try {
    		return decodeURIComponent(input);
    	} catch (err) {
    		var tokens = input.match(singleMatcher);

    		for (var i = 1; i < tokens.length; i++) {
    			input = decodeComponents(tokens, i).join('');

    			tokens = input.match(singleMatcher);
    		}

    		return input;
    	}
    }

    function customDecodeURIComponent(input) {
    	// Keep track of all the replacements and prefill the map with the `BOM`
    	var replaceMap = {
    		'%FE%FF': '\uFFFD\uFFFD',
    		'%FF%FE': '\uFFFD\uFFFD'
    	};

    	var match = multiMatcher.exec(input);
    	while (match) {
    		try {
    			// Decode as big chunks as possible
    			replaceMap[match[0]] = decodeURIComponent(match[0]);
    		} catch (err) {
    			var result = decode(match[0]);

    			if (result !== match[0]) {
    				replaceMap[match[0]] = result;
    			}
    		}

    		match = multiMatcher.exec(input);
    	}

    	// Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else
    	replaceMap['%C2'] = '\uFFFD';

    	var entries = Object.keys(replaceMap);

    	for (var i = 0; i < entries.length; i++) {
    		// Replace all decoded components
    		var key = entries[i];
    		input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
    	}

    	return input;
    }

    var decodeUriComponent = function (encodedURI) {
    	if (typeof encodedURI !== 'string') {
    		throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');
    	}

    	try {
    		encodedURI = encodedURI.replace(/\+/g, ' ');

    		// Try the built in decoder first
    		return decodeURIComponent(encodedURI);
    	} catch (err) {
    		// Fallback to a more advanced decoder
    		return customDecodeURIComponent(encodedURI);
    	}
    };

    var splitOnFirst = (string, separator) => {
    	if (!(typeof string === 'string' && typeof separator === 'string')) {
    		throw new TypeError('Expected the arguments to be of type `string`');
    	}

    	if (separator === '') {
    		return [string];
    	}

    	const separatorIndex = string.indexOf(separator);

    	if (separatorIndex === -1) {
    		return [string];
    	}

    	return [
    		string.slice(0, separatorIndex),
    		string.slice(separatorIndex + separator.length)
    	];
    };

    var filterObj = function (obj, predicate) {
    	var ret = {};
    	var keys = Object.keys(obj);
    	var isArr = Array.isArray(predicate);

    	for (var i = 0; i < keys.length; i++) {
    		var key = keys[i];
    		var val = obj[key];

    		if (isArr ? predicate.indexOf(key) !== -1 : predicate(key, val, obj)) {
    			ret[key] = val;
    		}
    	}

    	return ret;
    };

    var queryString = createCommonjsModule(function (module, exports) {





    const isNullOrUndefined = value => value === null || value === undefined;

    const encodeFragmentIdentifier = Symbol('encodeFragmentIdentifier');

    function encoderForArrayFormat(options) {
    	switch (options.arrayFormat) {
    		case 'index':
    			return key => (result, value) => {
    				const index = result.length;

    				if (
    					value === undefined ||
    					(options.skipNull && value === null) ||
    					(options.skipEmptyString && value === '')
    				) {
    					return result;
    				}

    				if (value === null) {
    					return [...result, [encode(key, options), '[', index, ']'].join('')];
    				}

    				return [
    					...result,
    					[encode(key, options), '[', encode(index, options), ']=', encode(value, options)].join('')
    				];
    			};

    		case 'bracket':
    			return key => (result, value) => {
    				if (
    					value === undefined ||
    					(options.skipNull && value === null) ||
    					(options.skipEmptyString && value === '')
    				) {
    					return result;
    				}

    				if (value === null) {
    					return [...result, [encode(key, options), '[]'].join('')];
    				}

    				return [...result, [encode(key, options), '[]=', encode(value, options)].join('')];
    			};

    		case 'comma':
    		case 'separator':
    		case 'bracket-separator': {
    			const keyValueSep = options.arrayFormat === 'bracket-separator' ?
    				'[]=' :
    				'=';

    			return key => (result, value) => {
    				if (
    					value === undefined ||
    					(options.skipNull && value === null) ||
    					(options.skipEmptyString && value === '')
    				) {
    					return result;
    				}

    				// Translate null to an empty string so that it doesn't serialize as 'null'
    				value = value === null ? '' : value;

    				if (result.length === 0) {
    					return [[encode(key, options), keyValueSep, encode(value, options)].join('')];
    				}

    				return [[result, encode(value, options)].join(options.arrayFormatSeparator)];
    			};
    		}

    		default:
    			return key => (result, value) => {
    				if (
    					value === undefined ||
    					(options.skipNull && value === null) ||
    					(options.skipEmptyString && value === '')
    				) {
    					return result;
    				}

    				if (value === null) {
    					return [...result, encode(key, options)];
    				}

    				return [...result, [encode(key, options), '=', encode(value, options)].join('')];
    			};
    	}
    }

    function parserForArrayFormat(options) {
    	let result;

    	switch (options.arrayFormat) {
    		case 'index':
    			return (key, value, accumulator) => {
    				result = /\[(\d*)\]$/.exec(key);

    				key = key.replace(/\[\d*\]$/, '');

    				if (!result) {
    					accumulator[key] = value;
    					return;
    				}

    				if (accumulator[key] === undefined) {
    					accumulator[key] = {};
    				}

    				accumulator[key][result[1]] = value;
    			};

    		case 'bracket':
    			return (key, value, accumulator) => {
    				result = /(\[\])$/.exec(key);
    				key = key.replace(/\[\]$/, '');

    				if (!result) {
    					accumulator[key] = value;
    					return;
    				}

    				if (accumulator[key] === undefined) {
    					accumulator[key] = [value];
    					return;
    				}

    				accumulator[key] = [].concat(accumulator[key], value);
    			};

    		case 'comma':
    		case 'separator':
    			return (key, value, accumulator) => {
    				const isArray = typeof value === 'string' && value.includes(options.arrayFormatSeparator);
    				const isEncodedArray = (typeof value === 'string' && !isArray && decode(value, options).includes(options.arrayFormatSeparator));
    				value = isEncodedArray ? decode(value, options) : value;
    				const newValue = isArray || isEncodedArray ? value.split(options.arrayFormatSeparator).map(item => decode(item, options)) : value === null ? value : decode(value, options);
    				accumulator[key] = newValue;
    			};

    		case 'bracket-separator':
    			return (key, value, accumulator) => {
    				const isArray = /(\[\])$/.test(key);
    				key = key.replace(/\[\]$/, '');

    				if (!isArray) {
    					accumulator[key] = value ? decode(value, options) : value;
    					return;
    				}

    				const arrayValue = value === null ?
    					[] :
    					value.split(options.arrayFormatSeparator).map(item => decode(item, options));

    				if (accumulator[key] === undefined) {
    					accumulator[key] = arrayValue;
    					return;
    				}

    				accumulator[key] = [].concat(accumulator[key], arrayValue);
    			};

    		default:
    			return (key, value, accumulator) => {
    				if (accumulator[key] === undefined) {
    					accumulator[key] = value;
    					return;
    				}

    				accumulator[key] = [].concat(accumulator[key], value);
    			};
    	}
    }

    function validateArrayFormatSeparator(value) {
    	if (typeof value !== 'string' || value.length !== 1) {
    		throw new TypeError('arrayFormatSeparator must be single character string');
    	}
    }

    function encode(value, options) {
    	if (options.encode) {
    		return options.strict ? strictUriEncode(value) : encodeURIComponent(value);
    	}

    	return value;
    }

    function decode(value, options) {
    	if (options.decode) {
    		return decodeUriComponent(value);
    	}

    	return value;
    }

    function keysSorter(input) {
    	if (Array.isArray(input)) {
    		return input.sort();
    	}

    	if (typeof input === 'object') {
    		return keysSorter(Object.keys(input))
    			.sort((a, b) => Number(a) - Number(b))
    			.map(key => input[key]);
    	}

    	return input;
    }

    function removeHash(input) {
    	const hashStart = input.indexOf('#');
    	if (hashStart !== -1) {
    		input = input.slice(0, hashStart);
    	}

    	return input;
    }

    function getHash(url) {
    	let hash = '';
    	const hashStart = url.indexOf('#');
    	if (hashStart !== -1) {
    		hash = url.slice(hashStart);
    	}

    	return hash;
    }

    function extract(input) {
    	input = removeHash(input);
    	const queryStart = input.indexOf('?');
    	if (queryStart === -1) {
    		return '';
    	}

    	return input.slice(queryStart + 1);
    }

    function parseValue(value, options) {
    	if (options.parseNumbers && !Number.isNaN(Number(value)) && (typeof value === 'string' && value.trim() !== '')) {
    		value = Number(value);
    	} else if (options.parseBooleans && value !== null && (value.toLowerCase() === 'true' || value.toLowerCase() === 'false')) {
    		value = value.toLowerCase() === 'true';
    	}

    	return value;
    }

    function parse(query, options) {
    	options = Object.assign({
    		decode: true,
    		sort: true,
    		arrayFormat: 'none',
    		arrayFormatSeparator: ',',
    		parseNumbers: false,
    		parseBooleans: false
    	}, options);

    	validateArrayFormatSeparator(options.arrayFormatSeparator);

    	const formatter = parserForArrayFormat(options);

    	// Create an object with no prototype
    	const ret = Object.create(null);

    	if (typeof query !== 'string') {
    		return ret;
    	}

    	query = query.trim().replace(/^[?#&]/, '');

    	if (!query) {
    		return ret;
    	}

    	for (const param of query.split('&')) {
    		if (param === '') {
    			continue;
    		}

    		let [key, value] = splitOnFirst(options.decode ? param.replace(/\+/g, ' ') : param, '=');

    		// Missing `=` should be `null`:
    		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
    		value = value === undefined ? null : ['comma', 'separator', 'bracket-separator'].includes(options.arrayFormat) ? value : decode(value, options);
    		formatter(decode(key, options), value, ret);
    	}

    	for (const key of Object.keys(ret)) {
    		const value = ret[key];
    		if (typeof value === 'object' && value !== null) {
    			for (const k of Object.keys(value)) {
    				value[k] = parseValue(value[k], options);
    			}
    		} else {
    			ret[key] = parseValue(value, options);
    		}
    	}

    	if (options.sort === false) {
    		return ret;
    	}

    	return (options.sort === true ? Object.keys(ret).sort() : Object.keys(ret).sort(options.sort)).reduce((result, key) => {
    		const value = ret[key];
    		if (Boolean(value) && typeof value === 'object' && !Array.isArray(value)) {
    			// Sort object keys, not values
    			result[key] = keysSorter(value);
    		} else {
    			result[key] = value;
    		}

    		return result;
    	}, Object.create(null));
    }

    exports.extract = extract;
    exports.parse = parse;

    exports.stringify = (object, options) => {
    	if (!object) {
    		return '';
    	}

    	options = Object.assign({
    		encode: true,
    		strict: true,
    		arrayFormat: 'none',
    		arrayFormatSeparator: ','
    	}, options);

    	validateArrayFormatSeparator(options.arrayFormatSeparator);

    	const shouldFilter = key => (
    		(options.skipNull && isNullOrUndefined(object[key])) ||
    		(options.skipEmptyString && object[key] === '')
    	);

    	const formatter = encoderForArrayFormat(options);

    	const objectCopy = {};

    	for (const key of Object.keys(object)) {
    		if (!shouldFilter(key)) {
    			objectCopy[key] = object[key];
    		}
    	}

    	const keys = Object.keys(objectCopy);

    	if (options.sort !== false) {
    		keys.sort(options.sort);
    	}

    	return keys.map(key => {
    		const value = object[key];

    		if (value === undefined) {
    			return '';
    		}

    		if (value === null) {
    			return encode(key, options);
    		}

    		if (Array.isArray(value)) {
    			if (value.length === 0 && options.arrayFormat === 'bracket-separator') {
    				return encode(key, options) + '[]';
    			}

    			return value
    				.reduce(formatter(key), [])
    				.join('&');
    		}

    		return encode(key, options) + '=' + encode(value, options);
    	}).filter(x => x.length > 0).join('&');
    };

    exports.parseUrl = (url, options) => {
    	options = Object.assign({
    		decode: true
    	}, options);

    	const [url_, hash] = splitOnFirst(url, '#');

    	return Object.assign(
    		{
    			url: url_.split('?')[0] || '',
    			query: parse(extract(url), options)
    		},
    		options && options.parseFragmentIdentifier && hash ? {fragmentIdentifier: decode(hash, options)} : {}
    	);
    };

    exports.stringifyUrl = (object, options) => {
    	options = Object.assign({
    		encode: true,
    		strict: true,
    		[encodeFragmentIdentifier]: true
    	}, options);

    	const url = removeHash(object.url).split('?')[0] || '';
    	const queryFromUrl = exports.extract(object.url);
    	const parsedQueryFromUrl = exports.parse(queryFromUrl, {sort: false});

    	const query = Object.assign(parsedQueryFromUrl, object.query);
    	let queryString = exports.stringify(query, options);
    	if (queryString) {
    		queryString = `?${queryString}`;
    	}

    	let hash = getHash(object.url);
    	if (object.fragmentIdentifier) {
    		hash = `#${options[encodeFragmentIdentifier] ? encode(object.fragmentIdentifier, options) : object.fragmentIdentifier}`;
    	}

    	return `${url}${queryString}${hash}`;
    };

    exports.pick = (input, filter, options) => {
    	options = Object.assign({
    		parseFragmentIdentifier: true,
    		[encodeFragmentIdentifier]: false
    	}, options);

    	const {url, query, fragmentIdentifier} = exports.parseUrl(input, options);
    	return exports.stringifyUrl({
    		url,
    		query: filterObj(query, filter),
    		fragmentIdentifier
    	}, options);
    };

    exports.exclude = (input, filter, options) => {
    	const exclusionFilter = Array.isArray(filter) ? key => !filter.includes(key) : (key, value) => !filter(key, value);

    	return exports.pick(input, exclusionFilter, options);
    };
    });
    queryString.extract;
    queryString.parse;
    queryString.stringify;
    var queryString_4 = queryString.parseUrl;
    queryString.stringifyUrl;
    queryString.pick;
    queryString.exclude;

    const newsletterConfig = {
        enabled: true,
        selector: '[data-charles="charles-newsletter"]',
        title: "Configured Heading",
        description: "Configured Desc",
    };

    const getConfig = async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(newsletterConfig);
            }, 500);
        });
    };
    const init$1 = () => {
        // check config if bubble should be shown
        let integrationConfig = window?.["_chIntCnf"];
        console.log("document.currentScript", document.currentScript);
        if (document.currentScript) {
            const src = document.currentScript.src;
            if (!integrationConfig) {
                integrationConfig = {};
            }
            const query = queryString_4(src).query;
            console.log("query", query);
            if (query.proxy_vendor) {
                integrationConfig.vendor = query.proxy_vendor;
            }
            if (query.script_id) {
                integrationConfig.script_id = query.script_id;
            }
            if (query.universe_uri) {
                integrationConfig.universe_uri = query.universe_uri;
            }
        }
    };
    // if (
    //   integrationConfig?.vendor &&
    //   integrationConfig.universe_uri &&
    //   integrationConfig.universe_uri.length > 0
    // ) {
    //   main(integrationConfig);
    // } else {
    //   console.warn(
    //     "[Charles Satellite] - missing base integration config: ",
    //     integrationConfig
    //   );
    // }
    // function main(integrationConfig: CharlesIntegrationBaseConfiguration): void {
    //   const provider = new Provider({
    //     universe_uri: integrationConfig.universe_uri,
    //     script_id: integrationConfig.script_id,
    //   });
    //   // get config off universe
    //   provider
    //     .getConfiguration()
    //     .then((config) => {
    //       // TODO use schema validate json
    //       /** Load modules **/
    //       // order opt in
    //       if (config?.order_opt_in && config.order_opt_in.active === true) {
    //         OrderOptInWidget.create(
    //           provider,
    //           config.order_opt_in,
    //           integrationConfig.vendor
    //         );
    //       }
    //     })
    //     .catch((err: Error) => {
    //       throw err;
    //     });
    // }

    /* src/satellites/NewsletterOptIn.svelte generated by Svelte v3.44.1 */

    function add_css(target) {
    	append_styles(target, "svelte-ltwhj4", ".svelte-ltwhj4.svelte-ltwhj4,.svelte-ltwhj4.svelte-ltwhj4:before,.svelte-ltwhj4.svelte-ltwhj4:after{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;font-family:Arial, Helvetica, sans-serif;margin:0}.gap.svelte-ltwhj4.svelte-ltwhj4{margin-bottom:1rem}.center.svelte-ltwhj4.svelte-ltwhj4{display:flex;align-items:center;justify-content:center}.text-sm.svelte-ltwhj4.svelte-ltwhj4{font-size:0.75rem}.charles-newsletter.svelte-ltwhj4.svelte-ltwhj4{box-shadow:0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);border-radius:0.5rem;text-align:center;background-color:white;margin:2px}.charles-newsletter.svelte-ltwhj4 h1.svelte-ltwhj4{font-size:1rem;margin-bottom:8px;font-weight:bold}.charles-newsletter-form.svelte-ltwhj4.svelte-ltwhj4{display:flex;flex-direction:column;max-width:576px;padding:3rem;margin:auto}");
    }

    // (53:2) {:else}
    function create_else_block(ctx) {
    	let newsletteroptinsuccess;
    	let current;
    	newsletteroptinsuccess = new NewsletterOptInSuccess({});
    	newsletteroptinsuccess.$on("click", /*onClickSuccess*/ ctx[11]);

    	return {
    		c() {
    			create_component(newsletteroptinsuccess.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(newsletteroptinsuccess, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i(local) {
    			if (current) return;
    			transition_in(newsletteroptinsuccess.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(newsletteroptinsuccess.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(newsletteroptinsuccess, detaching);
    		}
    	};
    }

    // (34:2) {#if !isDone}
    function create_if_block(ctx) {
    	let form;
    	let h1;
    	let t0;
    	let t1;
    	let p;
    	let t2;
    	let t3;
    	let cinput0;
    	let updating_value;
    	let t4;
    	let cinput1;
    	let updating_value_1;
    	let t5;
    	let ccheckbox;
    	let t6;
    	let div;
    	let ctabutton;
    	let current;
    	let mounted;
    	let dispose;

    	function cinput0_value_binding(value) {
    		/*cinput0_value_binding*/ ctx[13](value);
    	}

    	let cinput0_props = {
    		type: "text",
    		placeholder: /*namePlaceholder*/ ctx[5]
    	};

    	if (/*name*/ ctx[8] !== void 0) {
    		cinput0_props.value = /*name*/ ctx[8];
    	}

    	cinput0 = new BaseInput({ props: cinput0_props });
    	binding_callbacks.push(() => bind(cinput0, 'value', cinput0_value_binding));

    	function cinput1_value_binding(value) {
    		/*cinput1_value_binding*/ ctx[14](value);
    	}

    	let cinput1_props = {
    		type: "tel",
    		placeholder: /*phoneNrPlaceholder*/ ctx[6]
    	};

    	if (/*phone*/ ctx[9] !== void 0) {
    		cinput1_props.value = /*phone*/ ctx[9];
    	}

    	cinput1 = new BaseInput({ props: cinput1_props });
    	binding_callbacks.push(() => bind(cinput1, 'value', cinput1_value_binding));

    	ccheckbox = new BaseCheckbox({
    			props: {
    				id: "agreed",
    				value: hasAgreed,
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			}
    		});

    	ctabutton = new CtaButton({
    			props: {
    				type: "submit",
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			}
    		});

    	return {
    		c() {
    			form = element("form");
    			h1 = element("h1");
    			t0 = text(/*title*/ ctx[0]);
    			t1 = space();
    			p = element("p");
    			t2 = text(/*description*/ ctx[1]);
    			t3 = space();
    			create_component(cinput0.$$.fragment);
    			t4 = space();
    			create_component(cinput1.$$.fragment);
    			t5 = space();
    			create_component(ccheckbox.$$.fragment);
    			t6 = space();
    			div = element("div");
    			create_component(ctabutton.$$.fragment);
    			attr(h1, "class", "gap svelte-ltwhj4");
    			attr(p, "class", "gap text-sm svelte-ltwhj4");
    			attr(div, "class", "center svelte-ltwhj4");
    			attr(form, "class", "charles-newsletter-form svelte-ltwhj4");
    		},
    		m(target, anchor) {
    			insert(target, form, anchor);
    			append(form, h1);
    			append(h1, t0);
    			append(form, t1);
    			append(form, p);
    			append(p, t2);
    			append(form, t3);
    			mount_component(cinput0, form, null);
    			append(form, t4);
    			mount_component(cinput1, form, null);
    			append(form, t5);
    			mount_component(ccheckbox, form, null);
    			append(form, t6);
    			append(form, div);
    			mount_component(ctabutton, div, null);
    			current = true;

    			if (!mounted) {
    				dispose = listen(form, "submit", prevent_default(/*onSubmit*/ ctx[10]));
    				mounted = true;
    			}
    		},
    		p(ctx, dirty) {
    			if (!current || dirty & /*title*/ 1) set_data(t0, /*title*/ ctx[0]);
    			if (!current || dirty & /*description*/ 2) set_data(t2, /*description*/ ctx[1]);
    			const cinput0_changes = {};
    			if (dirty & /*namePlaceholder*/ 32) cinput0_changes.placeholder = /*namePlaceholder*/ ctx[5];

    			if (!updating_value && dirty & /*name*/ 256) {
    				updating_value = true;
    				cinput0_changes.value = /*name*/ ctx[8];
    				add_flush_callback(() => updating_value = false);
    			}

    			cinput0.$set(cinput0_changes);
    			const cinput1_changes = {};
    			if (dirty & /*phoneNrPlaceholder*/ 64) cinput1_changes.placeholder = /*phoneNrPlaceholder*/ ctx[6];

    			if (!updating_value_1 && dirty & /*phone*/ 512) {
    				updating_value_1 = true;
    				cinput1_changes.value = /*phone*/ ctx[9];
    				add_flush_callback(() => updating_value_1 = false);
    			}

    			cinput1.$set(cinput1_changes);
    			const ccheckbox_changes = {};

    			if (dirty & /*$$scope, privacyPolicyLink, legalText*/ 32780) {
    				ccheckbox_changes.$$scope = { dirty, ctx };
    			}

    			ccheckbox.$set(ccheckbox_changes);
    			const ctabutton_changes = {};

    			if (dirty & /*$$scope, ctaButtonLabel*/ 32784) {
    				ctabutton_changes.$$scope = { dirty, ctx };
    			}

    			ctabutton.$set(ctabutton_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(cinput0.$$.fragment, local);
    			transition_in(cinput1.$$.fragment, local);
    			transition_in(ccheckbox.$$.fragment, local);
    			transition_in(ctabutton.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(cinput0.$$.fragment, local);
    			transition_out(cinput1.$$.fragment, local);
    			transition_out(ccheckbox.$$.fragment, local);
    			transition_out(ctabutton.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(form);
    			destroy_component(cinput0);
    			destroy_component(cinput1);
    			destroy_component(ccheckbox);
    			destroy_component(ctabutton);
    			mounted = false;
    			dispose();
    		}
    	};
    }

    // (42:6) <CCheckbox id="agreed" value={hasAgreed}>
    function create_default_slot_1(ctx) {
    	let span;
    	let t0;
    	let t1;
    	let a;
    	let t2;

    	return {
    		c() {
    			span = element("span");
    			t0 = text(/*legalText*/ ctx[2]);
    			t1 = space();
    			a = element("a");
    			t2 = text("Link");
    			attr(a, "href", /*privacyPolicyLink*/ ctx[3]);
    			attr(a, "target", "_blank");
    			attr(a, "class", "svelte-ltwhj4");
    			attr(span, "class", "text-sm svelte-ltwhj4");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    			append(span, t0);
    			append(span, t1);
    			append(span, a);
    			append(a, t2);
    		},
    		p(ctx, dirty) {
    			if (dirty & /*legalText*/ 4) set_data(t0, /*legalText*/ ctx[2]);

    			if (dirty & /*privacyPolicyLink*/ 8) {
    				attr(a, "href", /*privacyPolicyLink*/ ctx[3]);
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    		}
    	};
    }

    // (50:8) <CtaButton type="submit">
    function create_default_slot(ctx) {
    	let t;

    	return {
    		c() {
    			t = text(/*ctaButtonLabel*/ ctx[4]);
    		},
    		m(target, anchor) {
    			insert(target, t, anchor);
    		},
    		p(ctx, dirty) {
    			if (dirty & /*ctaButtonLabel*/ 16) set_data(t, /*ctaButtonLabel*/ ctx[4]);
    		},
    		d(detaching) {
    			if (detaching) detach(t);
    		}
    	};
    }

    function create_fragment(ctx) {
    	let div;
    	let current_block_type_index;
    	let if_block;
    	let current;
    	const if_block_creators = [create_if_block, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (!/*isDone*/ ctx[7]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	return {
    		c() {
    			div = element("div");
    			if_block.c();
    			attr(div, "class", "charles-newsletter svelte-ltwhj4");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			if_blocks[current_block_type_index].m(div, null);
    			current = true;
    		},
    		p(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(div, null);
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			if_blocks[current_block_type_index].d();
    		}
    	};
    }

    let hasAgreed = false;

    function instance($$self, $$props, $$invalidate) {
    	let { isPreview = false } = $$props;
    	let { title = "Get our Whatsapp Newsletter" } = $$props;
    	let { description = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure aliquid repellat quisquam non molestiae, unde libero cupiditate quia" } = $$props;
    	let { legalText = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure aliquid repellat quisquam non molestiae, unde libero cupiditate quia" } = $$props;
    	let { privacyPolicyLink = "https://hello-charles.com" } = $$props;
    	let { ctaButtonLabel = "Submit" } = $$props;
    	let { namePlaceholder = "Your Name" } = $$props;
    	let { phoneNrPlaceholder = "Your Phone Number" } = $$props;
    	let isDone = false;
    	let name = "";
    	let phone = "";
    	init$1();

    	const onSubmit = () => {
    		if (isPreview) {
    			$$invalidate(7, isDone = true);
    			return;
    		}

    		$$invalidate(7, isDone = true);
    	};

    	const onClickSuccess = () => {
    		if (isPreview) {
    			$$invalidate(7, isDone = false);
    		}
    	};

    	function cinput0_value_binding(value) {
    		name = value;
    		$$invalidate(8, name);
    	}

    	function cinput1_value_binding(value) {
    		phone = value;
    		$$invalidate(9, phone);
    	}

    	$$self.$$set = $$props => {
    		if ('isPreview' in $$props) $$invalidate(12, isPreview = $$props.isPreview);
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('description' in $$props) $$invalidate(1, description = $$props.description);
    		if ('legalText' in $$props) $$invalidate(2, legalText = $$props.legalText);
    		if ('privacyPolicyLink' in $$props) $$invalidate(3, privacyPolicyLink = $$props.privacyPolicyLink);
    		if ('ctaButtonLabel' in $$props) $$invalidate(4, ctaButtonLabel = $$props.ctaButtonLabel);
    		if ('namePlaceholder' in $$props) $$invalidate(5, namePlaceholder = $$props.namePlaceholder);
    		if ('phoneNrPlaceholder' in $$props) $$invalidate(6, phoneNrPlaceholder = $$props.phoneNrPlaceholder);
    	};

    	return [
    		title,
    		description,
    		legalText,
    		privacyPolicyLink,
    		ctaButtonLabel,
    		namePlaceholder,
    		phoneNrPlaceholder,
    		isDone,
    		name,
    		phone,
    		onSubmit,
    		onClickSuccess,
    		isPreview,
    		cinput0_value_binding,
    		cinput1_value_binding
    	];
    }

    class NewsletterOptIn extends SvelteComponent {
    	constructor(options) {
    		super();

    		init$2(
    			this,
    			options,
    			instance,
    			create_fragment,
    			safe_not_equal,
    			{
    				isPreview: 12,
    				title: 0,
    				description: 1,
    				legalText: 2,
    				privacyPolicyLink: 3,
    				ctaButtonLabel: 4,
    				namePlaceholder: 5,
    				phoneNrPlaceholder: 6
    			},
    			add_css
    		);
    	}
    }

    const init = async () => {
        const config = await getConfig();
        const { selector, title, description, enabled } = config;
        console.log("document.currentScript", document.currentScript);
        if (!enabled) {
            return;
        }
        const targets = document.querySelectorAll(selector);
        var iframe = document.createElement("iframe");
        iframe.onload = (ev) => {
            new NewsletterOptIn({
                target: iframe.contentWindow.document.body,
                props: {
                    title,
                    description,
                },
            });
            iframe.style.height =
                iframe.contentWindow.document.body.scrollHeight + "px";
            iframe.style.border = "none";
            iframe.style.width = "100%";
            iframe.contentWindow.document.body.style.overflow = "hidden"; // remove scrollbar on IE11
        };
        // TODO: Currently not functional to replace multiple targets
        targets.forEach((el) => {
            el.parentNode.replaceChild(iframe, el);
        });
    };
    init();

    return NewsletterOptIn;

})();
