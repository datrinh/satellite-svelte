function noop() {
}
function assign(tar, src) {
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
  return typeof thing === "function";
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
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
  return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
  if (definition[2] && fn) {
    const lets = definition[2](fn(dirty));
    if ($$scope.dirty === void 0) {
      return lets;
    }
    if (typeof lets === "object") {
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
    const style = element("style");
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
  return text(" ");
}
function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return () => node.removeEventListener(event, handler, options);
}
function prevent_default(fn) {
  return function(event) {
    event.preventDefault();
    return fn.call(this, event);
  };
}
function attr(node, attribute, value) {
  if (value == null)
    node.removeAttribute(attribute);
  else if (node.getAttribute(attribute) !== value)
    node.setAttribute(attribute, value);
}
function children(element2) {
  return Array.from(element2.childNodes);
}
function set_data(text2, data) {
  data = "" + data;
  if (text2.wholeText !== data)
    text2.data = data;
}
let current_component;
function set_current_component(component) {
  current_component = component;
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
    for (let i = 0; i < dirty_components.length; i += 1) {
      const component = dirty_components[i];
      set_current_component(component);
      update(component.$$);
    }
    set_current_component(null);
    dirty_components.length = 0;
    while (binding_callbacks.length)
      binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
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
    p: outros
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
function transition_out(block, local, detach2, callback) {
  if (block && block.o) {
    if (outroing.has(block))
      return;
    outroing.add(block);
    outros.c.push(() => {
      outroing.delete(block);
      if (callback) {
        if (detach2)
          block.d(1);
        callback();
      }
    });
    block.o(local);
  }
}
function bind(component, name, callback) {
  const index = component.$$.props[name];
  if (index !== void 0) {
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
    add_render_callback(() => {
      const new_on_destroy = on_mount.map(run).filter(is_function);
      if (on_destroy) {
        on_destroy.push(...new_on_destroy);
      } else {
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
  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}
function init(component, options, instance2, create_fragment2, not_equal, props, append_styles2, dirty = [-1]) {
  const parent_component = current_component;
  set_current_component(component);
  const $$ = component.$$ = {
    fragment: null,
    ctx: null,
    props,
    update: noop,
    not_equal,
    bound: blank_object(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
    callbacks: blank_object(),
    dirty,
    skip_bound: false,
    root: options.target || parent_component.$$.root
  };
  append_styles2 && append_styles2($$.root);
  let ready = false;
  $$.ctx = instance2 ? instance2(component, options.props || {}, (i, ret, ...rest) => {
    const value = rest.length ? rest[0] : ret;
    if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
      if (!$$.skip_bound && $$.bound[i])
        $$.bound[i](value);
      if (ready)
        make_dirty(component, i);
    }
    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update);
  $$.fragment = create_fragment2 ? create_fragment2($$.ctx) : false;
  if (options.target) {
    if (options.hydrate) {
      const nodes = children(options.target);
      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      $$.fragment && $$.fragment.c();
    }
    if (options.intro)
      transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor, options.customElement);
    flush();
  }
  set_current_component(parent_component);
}
class SvelteComponent {
  $destroy() {
    destroy_component(this, 1);
    this.$destroy = noop;
  }
  $on(type, callback) {
    const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
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
function add_css$5(target) {
  append_styles(target, "svelte-10sb7nx", ".charles-newsletter-done.svelte-10sb7nx.svelte-10sb7nx{background-color:#00c40a;color:white;padding:2rem}.charles-newsletter-done.svelte-10sb7nx h1.svelte-10sb7nx{font-size:3rem}.charles-newsletter-done.svelte-10sb7nx p.svelte-10sb7nx{font-size:1.5rem}.charles-newsletter-done.svelte-10sb7nx .content.svelte-10sb7nx{max-width:576px;margin:auto}");
}
function create_fragment$5(ctx) {
  let section;
  return {
    c() {
      section = element("section");
      section.innerHTML = `<div class="content svelte-10sb7nx"><h1 class="text-5xl svelte-10sb7nx">Thanks a lot! \u{1F973}</h1> 

    <p class="text-base svelte-10sb7nx">We have successfully opted-in to stay in touch with us on WhatsApp. We&#39;re
      excited to have you!</p></div>`;
      attr(section, "class", "charles-newsletter-done svelte-10sb7nx");
    },
    m(target, anchor) {
      insert(target, section, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(section);
    }
  };
}
class NewsletterOptInSuccess extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment$5, safe_not_equal, {}, add_css$5);
  }
}
function add_css$4(target) {
  append_styles(target, "svelte-52qjtk", "button.svelte-52qjtk{padding:0.5rem;cursor:pointer;background-color:#00c40a;border-radius:1rem;border:none;color:white;height:32px}");
}
function create_fragment$4(ctx) {
  let button;
  let current;
  const default_slot_template = ctx[2].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[1], null);
  return {
    c() {
      button = element("button");
      if (default_slot)
        default_slot.c();
      attr(button, "type", ctx[0]);
      attr(button, "class", "svelte-52qjtk");
    },
    m(target, anchor) {
      insert(target, button, anchor);
      if (default_slot) {
        default_slot.m(button, null);
      }
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 2)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[1], !current ? get_all_dirty_from_scope(ctx2[1]) : get_slot_changes(default_slot_template, ctx2[1], dirty, null), null);
        }
      }
      if (!current || dirty & 1) {
        attr(button, "type", ctx2[0]);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(button);
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function instance$4($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { type = "button" } = $$props;
  $$self.$$set = ($$props2) => {
    if ("type" in $$props2)
      $$invalidate(0, type = $$props2.type);
    if ("$$scope" in $$props2)
      $$invalidate(1, $$scope = $$props2.$$scope);
  };
  return [type, $$scope, slots];
}
class CtaButton extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$4, create_fragment$4, safe_not_equal, { type: 0 }, add_css$4);
  }
}
function add_css$3(target) {
  append_styles(target, "svelte-16yoonm", '.satellite-checkbox.svelte-16yoonm.svelte-16yoonm.svelte-16yoonm{display:flex;text-align:left;margin-bottom:16px}.satellite-checkbox.svelte-16yoonm .container.svelte-16yoonm.svelte-16yoonm{display:block;position:relative;padding-left:35px;margin-bottom:12px;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;color:#ababab;width:fit-content;font-size:0.8rem}.satellite-checkbox.svelte-16yoonm .container input.svelte-16yoonm.svelte-16yoonm{position:absolute;opacity:0;cursor:pointer;height:0;width:0}.satellite-checkbox.svelte-16yoonm .checkmark.svelte-16yoonm.svelte-16yoonm{position:absolute;top:0;left:0;height:25px;width:25px;border-radius:0.2rem;background-color:#f3f3f3}.satellite-checkbox.svelte-16yoonm .container:hover input.svelte-16yoonm~.checkmark.svelte-16yoonm{background-color:#dadada}.satellite-checkbox.svelte-16yoonm .checkmark.svelte-16yoonm.svelte-16yoonm:after{content:"";position:absolute;display:none}.satellite-checkbox.svelte-16yoonm .container input.svelte-16yoonm:checked~.checkmark.svelte-16yoonm:after{display:block}.satellite-checkbox.svelte-16yoonm .container .checkmark.svelte-16yoonm.svelte-16yoonm:after{left:9px;top:4px;width:7px;height:14px;border:solid black;border-width:0 2px 2px 0;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg);box-sizing:border-box}');
}
function create_fragment$3(ctx) {
  let div;
  let label;
  let t0;
  let input;
  let t1;
  let span;
  let current;
  const default_slot_template = ctx[3].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[2], null);
  return {
    c() {
      div = element("div");
      label = element("label");
      if (default_slot)
        default_slot.c();
      t0 = space();
      input = element("input");
      t1 = space();
      span = element("span");
      attr(input, "id", ctx[0]);
      attr(input, "type", "checkbox");
      input.value = ctx[1];
      attr(input, "class", "svelte-16yoonm");
      attr(span, "class", "checkmark svelte-16yoonm");
      attr(label, "class", "container svelte-16yoonm");
      attr(label, "for", ctx[0]);
      attr(div, "class", "satellite-checkbox svelte-16yoonm");
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
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 4)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[2], !current ? get_all_dirty_from_scope(ctx2[2]) : get_slot_changes(default_slot_template, ctx2[2], dirty, null), null);
        }
      }
      if (!current || dirty & 1) {
        attr(input, "id", ctx2[0]);
      }
      if (!current || dirty & 2) {
        input.value = ctx2[1];
      }
      if (!current || dirty & 1) {
        attr(label, "for", ctx2[0]);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function instance$3($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { id } = $$props;
  let { value } = $$props;
  $$self.$$set = ($$props2) => {
    if ("id" in $$props2)
      $$invalidate(0, id = $$props2.id);
    if ("value" in $$props2)
      $$invalidate(1, value = $$props2.value);
    if ("$$scope" in $$props2)
      $$invalidate(2, $$scope = $$props2.$$scope);
  };
  return [id, value, $$scope, slots];
}
class BaseCheckbox extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, create_fragment$3, safe_not_equal, { id: 0, value: 1 }, add_css$3);
  }
}
function add_css$2(target) {
  append_styles(target, "svelte-e1mo4v", "input.svelte-e1mo4v{padding:0.5rem;background-color:#f3f3f3;border:none;margin-bottom:16px;height:3rem;border-radius:0.2rem}");
}
function create_fragment$2(ctx) {
  let input;
  return {
    c() {
      input = element("input");
      attr(input, "type", ctx[0]);
      attr(input, "placeholder", ctx[1]);
      input.value = ctx[2];
      attr(input, "class", "svelte-e1mo4v");
    },
    m(target, anchor) {
      insert(target, input, anchor);
    },
    p(ctx2, [dirty]) {
      if (dirty & 1) {
        attr(input, "type", ctx2[0]);
      }
      if (dirty & 2) {
        attr(input, "placeholder", ctx2[1]);
      }
      if (dirty & 4 && input.value !== ctx2[2]) {
        input.value = ctx2[2];
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(input);
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let { type = "text" } = $$props;
  let { placeholder } = $$props;
  let { value } = $$props;
  $$self.$$set = ($$props2) => {
    if ("type" in $$props2)
      $$invalidate(0, type = $$props2.type);
    if ("placeholder" in $$props2)
      $$invalidate(1, placeholder = $$props2.placeholder);
    if ("value" in $$props2)
      $$invalidate(2, value = $$props2.value);
  };
  return [type, placeholder, value];
}
class BaseInput extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, safe_not_equal, { type: 0, placeholder: 1, value: 2 }, add_css$2);
  }
}
function add_css$1(target) {
  append_styles(target, "svelte-uf4qf7", ".svelte-uf4qf7.svelte-uf4qf7,.svelte-uf4qf7.svelte-uf4qf7:before,.svelte-uf4qf7.svelte-uf4qf7:after{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.svelte-uf4qf7.svelte-uf4qf7{font-family:Arial, Helvetica, sans-serif;margin:0}h1.svelte-uf4qf7.svelte-uf4qf7{font-size:1rem}p.svelte-uf4qf7.svelte-uf4qf7{font-size:0.8rem}.gap.svelte-uf4qf7.svelte-uf4qf7{margin-bottom:1rem}.charles-newsletter.svelte-uf4qf7.svelte-uf4qf7{box-shadow:0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);border-radius:0.5rem;text-align:center;background-color:white;margin:2px}.charles-newsletter.svelte-uf4qf7 h1.svelte-uf4qf7{font-size:1rem;margin-bottom:8px}.charles-newsletter-form.svelte-uf4qf7.svelte-uf4qf7{display:flex;flex-direction:column;max-width:576px;padding:3rem;margin:auto}");
}
function create_else_block(ctx) {
  let newsletteroptinsuccess;
  let current;
  newsletteroptinsuccess = new NewsletterOptInSuccess({});
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
      if (current)
        return;
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
function create_if_block$1(ctx) {
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
  let ctabutton;
  let current;
  let mounted;
  let dispose;
  function cinput0_value_binding(value) {
    ctx[11](value);
  }
  let cinput0_props = {
    type: "text",
    placeholder: ctx[5]
  };
  if (ctx[8] !== void 0) {
    cinput0_props.value = ctx[8];
  }
  cinput0 = new BaseInput({ props: cinput0_props });
  binding_callbacks.push(() => bind(cinput0, "value", cinput0_value_binding));
  function cinput1_value_binding(value) {
    ctx[12](value);
  }
  let cinput1_props = {
    type: "tel",
    placeholder: ctx[6]
  };
  if (ctx[9] !== void 0) {
    cinput1_props.value = ctx[9];
  }
  cinput1 = new BaseInput({ props: cinput1_props });
  binding_callbacks.push(() => bind(cinput1, "value", cinput1_value_binding));
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
      t0 = text(ctx[0]);
      t1 = space();
      p = element("p");
      t2 = text(ctx[1]);
      t3 = space();
      create_component(cinput0.$$.fragment);
      t4 = space();
      create_component(cinput1.$$.fragment);
      t5 = space();
      create_component(ccheckbox.$$.fragment);
      t6 = space();
      create_component(ctabutton.$$.fragment);
      attr(h1, "class", "gap svelte-uf4qf7");
      attr(p, "class", "gap svelte-uf4qf7");
      attr(form, "class", "charles-newsletter-form svelte-uf4qf7");
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
      mount_component(ctabutton, form, null);
      current = true;
      if (!mounted) {
        dispose = listen(form, "submit", prevent_default(ctx[10]));
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (!current || dirty & 1)
        set_data(t0, ctx2[0]);
      if (!current || dirty & 2)
        set_data(t2, ctx2[1]);
      const cinput0_changes = {};
      if (dirty & 32)
        cinput0_changes.placeholder = ctx2[5];
      if (!updating_value && dirty & 256) {
        updating_value = true;
        cinput0_changes.value = ctx2[8];
        add_flush_callback(() => updating_value = false);
      }
      cinput0.$set(cinput0_changes);
      const cinput1_changes = {};
      if (dirty & 64)
        cinput1_changes.placeholder = ctx2[6];
      if (!updating_value_1 && dirty & 512) {
        updating_value_1 = true;
        cinput1_changes.value = ctx2[9];
        add_flush_callback(() => updating_value_1 = false);
      }
      cinput1.$set(cinput1_changes);
      const ccheckbox_changes = {};
      if (dirty & 8204) {
        ccheckbox_changes.$$scope = { dirty, ctx: ctx2 };
      }
      ccheckbox.$set(ccheckbox_changes);
      const ctabutton_changes = {};
      if (dirty & 8208) {
        ctabutton_changes.$$scope = { dirty, ctx: ctx2 };
      }
      ctabutton.$set(ctabutton_changes);
    },
    i(local) {
      if (current)
        return;
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
      if (detaching)
        detach(form);
      destroy_component(cinput0);
      destroy_component(cinput1);
      destroy_component(ccheckbox);
      destroy_component(ctabutton);
      mounted = false;
      dispose();
    }
  };
}
function create_default_slot_1(ctx) {
  let t0;
  let t1;
  let a;
  let t2;
  return {
    c() {
      t0 = text(ctx[2]);
      t1 = space();
      a = element("a");
      t2 = text("Link");
      attr(a, "href", ctx[3]);
      attr(a, "target", "_blank");
      attr(a, "class", "svelte-uf4qf7");
    },
    m(target, anchor) {
      insert(target, t0, anchor);
      insert(target, t1, anchor);
      insert(target, a, anchor);
      append(a, t2);
    },
    p(ctx2, dirty) {
      if (dirty & 4)
        set_data(t0, ctx2[2]);
      if (dirty & 8) {
        attr(a, "href", ctx2[3]);
      }
    },
    d(detaching) {
      if (detaching)
        detach(t0);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(a);
    }
  };
}
function create_default_slot(ctx) {
  let t;
  return {
    c() {
      t = text(ctx[4]);
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 16)
        set_data(t, ctx2[4]);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_fragment$1(ctx) {
  let div;
  let current_block_type_index;
  let if_block;
  let current;
  const if_block_creators = [create_if_block$1, create_else_block];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (!ctx2[7])
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      div = element("div");
      if_block.c();
      attr(div, "class", "charles-newsletter svelte-uf4qf7");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if_blocks[current_block_type_index].m(div, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(div, null);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if_blocks[current_block_type_index].d();
    }
  };
}
let hasAgreed = false;
function instance$1($$self, $$props, $$invalidate) {
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
  const onSubmit = () => {
    $$invalidate(7, isDone = true);
  };
  function cinput0_value_binding(value) {
    name = value;
    $$invalidate(8, name);
  }
  function cinput1_value_binding(value) {
    phone = value;
    $$invalidate(9, phone);
  }
  $$self.$$set = ($$props2) => {
    if ("title" in $$props2)
      $$invalidate(0, title = $$props2.title);
    if ("description" in $$props2)
      $$invalidate(1, description = $$props2.description);
    if ("legalText" in $$props2)
      $$invalidate(2, legalText = $$props2.legalText);
    if ("privacyPolicyLink" in $$props2)
      $$invalidate(3, privacyPolicyLink = $$props2.privacyPolicyLink);
    if ("ctaButtonLabel" in $$props2)
      $$invalidate(4, ctaButtonLabel = $$props2.ctaButtonLabel);
    if ("namePlaceholder" in $$props2)
      $$invalidate(5, namePlaceholder = $$props2.namePlaceholder);
    if ("phoneNrPlaceholder" in $$props2)
      $$invalidate(6, phoneNrPlaceholder = $$props2.phoneNrPlaceholder);
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
    cinput0_value_binding,
    cinput1_value_binding
  ];
}
class NewsletterOptIn extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, {
      title: 0,
      description: 1,
      legalText: 2,
      privacyPolicyLink: 3,
      ctaButtonLabel: 4,
      namePlaceholder: 5,
      phoneNrPlaceholder: 6
    }, add_css$1);
  }
}
function add_css(target) {
  append_styles(target, "svelte-h5e7ry", ".charles-satellite-button{position:fixed;bottom:8px;right:8px;border-radius:9999px;width:48px;height:48px}");
}
function create_if_block(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      div.textContent = "Tada!";
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_fragment(ctx) {
  let div;
  let button;
  let t1;
  let mounted;
  let dispose;
  let if_block = ctx[0] && create_if_block();
  return {
    c() {
      div = element("div");
      button = element("button");
      button.textContent = "Open";
      t1 = space();
      if (if_block)
        if_block.c();
      attr(button, "class", "charles-satellite-button");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, button);
      append(div, t1);
      if (if_block)
        if_block.m(div, null);
      if (!mounted) {
        dispose = listen(button, "click", ctx[1]);
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (ctx2[0]) {
        if (if_block)
          ;
        else {
          if_block = create_if_block();
          if_block.c();
          if_block.m(div, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div);
      if (if_block)
        if_block.d();
      mounted = false;
      dispose();
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let isOpen = false;
  const onClick = () => {
    $$invalidate(0, isOpen = !isOpen);
  };
  return [isOpen, onClick];
}
class BubbleButton extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {}, add_css);
  }
}
var lib = {
  NewsletterOptIn,
  BubbleButton
};
export { lib as default };
