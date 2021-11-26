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
function destroy_each(iterations, detaching) {
  for (let i = 0; i < iterations.length; i += 1) {
    if (iterations[i])
      iterations[i].d(detaching);
  }
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
function select_option(select, value) {
  for (let i = 0; i < select.options.length; i += 1) {
    const option = select.options[i];
    if (option.__value === value) {
      option.selected = true;
      return;
    }
  }
  select.selectedIndex = -1;
}
function select_value(select) {
  const selected_option = select.querySelector(":checked") || select.options[0];
  return selected_option && selected_option.__value;
}
function custom_event(type, detail, bubbles = false) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(type, bubbles, false, detail);
  return e;
}
let current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function createEventDispatcher() {
  const component = get_current_component();
  return (type, detail) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(type, detail);
      callbacks.slice().forEach((fn) => {
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
  let div;
  let h1;
  let t0;
  let t1;
  let p;
  let t2;
  let mounted;
  let dispose;
  return {
    c() {
      section = element("section");
      div = element("div");
      h1 = element("h1");
      t0 = text(ctx[0]);
      t1 = space();
      p = element("p");
      t2 = text(ctx[1]);
      attr(h1, "class", "text-5xl svelte-10sb7nx");
      attr(p, "class", "text-base svelte-10sb7nx");
      attr(div, "class", "content svelte-10sb7nx");
      attr(section, "class", "charles-newsletter-done svelte-10sb7nx");
    },
    m(target, anchor) {
      insert(target, section, anchor);
      append(section, div);
      append(div, h1);
      append(h1, t0);
      append(div, t1);
      append(div, p);
      append(p, t2);
      if (!mounted) {
        dispose = listen(section, "click", ctx[3]);
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & 1)
        set_data(t0, ctx2[0]);
      if (dirty & 2)
        set_data(t2, ctx2[1]);
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(section);
      mounted = false;
      dispose();
    }
  };
}
function instance$5($$self, $$props, $$invalidate) {
  let { successTitle } = $$props;
  let { successDescription } = $$props;
  const dispatch = createEventDispatcher();
  const click_handler = () => dispatch("click");
  $$self.$$set = ($$props2) => {
    if ("successTitle" in $$props2)
      $$invalidate(0, successTitle = $$props2.successTitle);
    if ("successDescription" in $$props2)
      $$invalidate(1, successDescription = $$props2.successDescription);
  };
  return [successTitle, successDescription, dispatch, click_handler];
}
class NewsletterOptInSuccess extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$5, create_fragment$5, safe_not_equal, { successTitle: 0, successDescription: 1 }, add_css$5);
  }
}
function add_css$4(target) {
  append_styles(target, "svelte-1ru8nfc", "button.svelte-1ru8nfc{box-sizing:border-box;padding:0.5rem 1.5rem;cursor:pointer;background-color:#00c40a;border-radius:2rem;border:none;color:white;height:2.5rem;display:flex;align-items:center;justify-content:center}");
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
      attr(button, "class", "svelte-1ru8nfc");
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
  append_styles(target, "svelte-pxuelf", '.satellite-checkbox.svelte-pxuelf.svelte-pxuelf.svelte-pxuelf{display:flex;text-align:left;margin-bottom:16px}.satellite-checkbox.svelte-pxuelf .container.svelte-pxuelf.svelte-pxuelf{display:block;position:relative;padding-left:35px;margin-bottom:12px;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;color:#ababab;width:fit-content;font-size:0.8rem}.satellite-checkbox.svelte-pxuelf .container input.svelte-pxuelf.svelte-pxuelf{position:absolute;opacity:0;cursor:pointer;height:0;width:0}.satellite-checkbox.svelte-pxuelf .checkmark.svelte-pxuelf.svelte-pxuelf{position:absolute;top:0;left:0;height:1.25rem;width:1.25rem;border-radius:0.25rem;background-color:#f3f3f3}.satellite-checkbox.svelte-pxuelf .container:hover input.svelte-pxuelf~.checkmark.svelte-pxuelf{background-color:#dadada}.satellite-checkbox.svelte-pxuelf .checkmark.svelte-pxuelf.svelte-pxuelf:after{content:"";position:absolute;display:none}.satellite-checkbox.svelte-pxuelf .container input.svelte-pxuelf:checked~.checkmark.svelte-pxuelf:after{display:block}.satellite-checkbox.svelte-pxuelf .container .checkmark.svelte-pxuelf.svelte-pxuelf:after{left:0.5rem;top:0.1rem;width:0.4rem;height:0.8rem;border:solid black;border-width:0 2px 2px 0;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg)}');
}
function create_fragment$3(ctx) {
  let div;
  let label;
  let t0;
  let input;
  let t1;
  let span;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = ctx[4].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[3], null);
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
      attr(input, "id", ctx[1]);
      attr(input, "type", "checkbox");
      input.required = ctx[2];
      attr(input, "class", "svelte-pxuelf");
      attr(span, "class", "checkmark svelte-pxuelf");
      attr(label, "class", "container svelte-pxuelf");
      attr(label, "for", ctx[1]);
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
      input.checked = ctx[0];
      append(label, t1);
      append(label, span);
      current = true;
      if (!mounted) {
        dispose = listen(input, "change", ctx[5]);
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 8)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[3], !current ? get_all_dirty_from_scope(ctx2[3]) : get_slot_changes(default_slot_template, ctx2[3], dirty, null), null);
        }
      }
      if (!current || dirty & 2) {
        attr(input, "id", ctx2[1]);
      }
      if (!current || dirty & 4) {
        input.required = ctx2[2];
      }
      if (dirty & 1) {
        input.checked = ctx2[0];
      }
      if (!current || dirty & 2) {
        attr(label, "for", ctx2[1]);
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
      mounted = false;
      dispose();
    }
  };
}
function instance$3($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { id } = $$props;
  let { checked } = $$props;
  let { required = false } = $$props;
  function input_change_handler() {
    checked = this.checked;
    $$invalidate(0, checked);
  }
  $$self.$$set = ($$props2) => {
    if ("id" in $$props2)
      $$invalidate(1, id = $$props2.id);
    if ("checked" in $$props2)
      $$invalidate(0, checked = $$props2.checked);
    if ("required" in $$props2)
      $$invalidate(2, required = $$props2.required);
    if ("$$scope" in $$props2)
      $$invalidate(3, $$scope = $$props2.$$scope);
  };
  return [checked, id, required, $$scope, slots, input_change_handler];
}
class BaseCheckbox extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, create_fragment$3, safe_not_equal, { id: 1, checked: 0, required: 2 }, add_css$3);
  }
}
function add_css$2(target) {
  append_styles(target, "svelte-d37zeh", "input.svelte-d37zeh{padding:0.5rem;background-color:#f3f3f3;border:none;margin-bottom:1rem;height:2.5rem;border-radius:0.25rem;font-size:0.75rem;width:100%}");
}
function create_fragment$2(ctx) {
  let input;
  let mounted;
  let dispose;
  return {
    c() {
      input = element("input");
      attr(input, "type", ctx[1]);
      attr(input, "placeholder", ctx[2]);
      input.value = ctx[0];
      input.required = ctx[3];
      attr(input, "class", "svelte-d37zeh");
    },
    m(target, anchor) {
      insert(target, input, anchor);
      if (!mounted) {
        dispose = listen(input, "input", ctx[4]);
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & 2) {
        attr(input, "type", ctx2[1]);
      }
      if (dirty & 4) {
        attr(input, "placeholder", ctx2[2]);
      }
      if (dirty & 1 && input.value !== ctx2[0]) {
        input.value = ctx2[0];
      }
      if (dirty & 8) {
        input.required = ctx2[3];
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(input);
      mounted = false;
      dispose();
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let { type = "text" } = $$props;
  let { placeholder } = $$props;
  let { value } = $$props;
  let { required = false } = $$props;
  const dispatch = createEventDispatcher();
  const onInput = (ev) => {
    $$invalidate(0, value = ev.target.value);
    dispatch("input", value);
  };
  $$self.$$set = ($$props2) => {
    if ("type" in $$props2)
      $$invalidate(1, type = $$props2.type);
    if ("placeholder" in $$props2)
      $$invalidate(2, placeholder = $$props2.placeholder);
    if ("value" in $$props2)
      $$invalidate(0, value = $$props2.value);
    if ("required" in $$props2)
      $$invalidate(3, required = $$props2.required);
  };
  return [value, type, placeholder, required, onInput];
}
class BaseInput extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, safe_not_equal, {
      type: 1,
      placeholder: 2,
      value: 0,
      required: 3
    }, add_css$2);
  }
}
var countries = [
  {
    name: "Aruba",
    code: "AW",
    callingCode: "297"
  },
  {
    name: "Afghanistan",
    code: "AF",
    callingCode: "93"
  },
  {
    name: "Angola",
    code: "AO",
    callingCode: "244"
  },
  {
    name: "Anguilla",
    code: "AI",
    callingCode: "1264"
  },
  {
    name: "\xC3land Islands",
    code: "AX",
    callingCode: "358"
  },
  {
    name: "Albania",
    code: "AL",
    callingCode: "355"
  },
  {
    name: "Andorra",
    code: "AD",
    callingCode: "376"
  },
  {
    name: "United Arab Emirates",
    code: "AE",
    callingCode: "971"
  },
  {
    name: "Argentina",
    code: "AR",
    callingCode: "54"
  },
  {
    name: "Armenia",
    code: "AM",
    callingCode: "374"
  },
  {
    name: "American Samoa",
    code: "AS",
    callingCode: "1684"
  },
  {
    name: "Antigua and Barbuda",
    code: "AG",
    callingCode: "1268"
  },
  {
    name: "Australia",
    code: "AU",
    callingCode: "61"
  },
  {
    name: "Austria",
    code: "AT",
    callingCode: "43"
  },
  {
    name: "Azerbaijan",
    code: "AZ",
    callingCode: "994"
  },
  {
    name: "Burundi",
    code: "BI",
    callingCode: "257"
  },
  {
    name: "Belgium",
    code: "BE",
    callingCode: "32"
  },
  {
    name: "Benin",
    code: "BJ",
    callingCode: "229"
  },
  {
    name: "Burkina Faso",
    code: "BF",
    callingCode: "226"
  },
  {
    name: "Bangladesh",
    code: "BD",
    callingCode: "880"
  },
  {
    name: "Bulgaria",
    code: "BG",
    callingCode: "359"
  },
  {
    name: "Bahrain",
    code: "BH",
    callingCode: "973"
  },
  {
    name: "Bahamas",
    code: "BS",
    callingCode: "1242"
  },
  {
    name: "Bosnia and Herzegovina",
    code: "BA",
    callingCode: "387"
  },
  {
    name: "Saint Barth\xC3\xA9lemy",
    code: "BL",
    callingCode: "590"
  },
  {
    name: "Belarus",
    code: "BY",
    callingCode: "375"
  },
  {
    name: "Belize",
    code: "BZ",
    callingCode: "501"
  },
  {
    name: "Bermuda",
    code: "BM",
    callingCode: "1441"
  },
  {
    name: "Bolivia",
    code: "BO",
    callingCode: "591"
  },
  {
    name: "Brazil",
    code: "BR",
    callingCode: "55"
  },
  {
    name: "Barbados",
    code: "BB",
    callingCode: "1246"
  },
  {
    name: "Brunei",
    code: "BN",
    callingCode: "673"
  },
  {
    name: "Bhutan",
    code: "BT",
    callingCode: "975"
  },
  {
    name: "Botswana",
    code: "BW",
    callingCode: "267"
  },
  {
    name: "Central African Republic",
    code: "CF",
    callingCode: "236"
  },
  {
    name: "Canada",
    code: "CA",
    callingCode: "1"
  },
  {
    name: "Cocos (Keeling) Islands",
    code: "CC",
    callingCode: "61"
  },
  {
    name: "Switzerland",
    code: "CH",
    callingCode: "41"
  },
  {
    name: "Chile",
    code: "CL",
    callingCode: "56"
  },
  {
    name: "China",
    code: "CN",
    callingCode: "86"
  },
  {
    name: "Ivory Coast",
    code: "CI",
    callingCode: "225"
  },
  {
    name: "Cameroon",
    code: "CM",
    callingCode: "237"
  },
  {
    name: "DR Congo",
    code: "CD",
    callingCode: "243"
  },
  {
    name: "Republic of the Congo",
    code: "CG",
    callingCode: "242"
  },
  {
    name: "Cook Islands",
    code: "CK",
    callingCode: "682"
  },
  {
    name: "Colombia",
    code: "CO",
    callingCode: "57"
  },
  {
    name: "Comoros",
    code: "KM",
    callingCode: "269"
  },
  {
    name: "Cape Verde",
    code: "CV",
    callingCode: "238"
  },
  {
    name: "Costa Rica",
    code: "CR",
    callingCode: "506"
  },
  {
    name: "Cuba",
    code: "CU",
    callingCode: "53"
  },
  {
    name: "Cura\xC3\xA7ao",
    code: "CW",
    callingCode: "5999"
  },
  {
    name: "Christmas Island",
    code: "CX",
    callingCode: "61"
  },
  {
    name: "Cayman Islands",
    code: "KY",
    callingCode: "1345"
  },
  {
    name: "Cyprus",
    code: "CY",
    callingCode: "357"
  },
  {
    name: "Czechia",
    code: "CZ",
    callingCode: "420"
  },
  {
    name: "Germany",
    code: "DE",
    callingCode: "49"
  },
  {
    name: "Djibouti",
    code: "DJ",
    callingCode: "253"
  },
  {
    name: "Dominica",
    code: "DM",
    callingCode: "1767"
  },
  {
    name: "Denmark",
    code: "DK",
    callingCode: "45"
  },
  {
    name: "Dominican Republic",
    code: "DO",
    callingCode: "1809"
  },
  {
    name: "Dominican Republic",
    code: "DO",
    callingCode: "1829"
  },
  {
    name: "Dominican Republic",
    code: "DO",
    callingCode: "1849"
  },
  {
    name: "Algeria",
    code: "DZ",
    callingCode: "213"
  },
  {
    name: "Ecuador",
    code: "EC",
    callingCode: "593"
  },
  {
    name: "Egypt",
    code: "EG",
    callingCode: "20"
  },
  {
    name: "Eritrea",
    code: "ER",
    callingCode: "291"
  },
  {
    name: "Western Sahara",
    code: "EH",
    callingCode: "212"
  },
  {
    name: "Spain",
    code: "ES",
    callingCode: "34"
  },
  {
    name: "Estonia",
    code: "EE",
    callingCode: "372"
  },
  {
    name: "Ethiopia",
    code: "ET",
    callingCode: "251"
  },
  {
    name: "Finland",
    code: "FI",
    callingCode: "358"
  },
  {
    name: "Fiji",
    code: "FJ",
    callingCode: "679"
  },
  {
    name: "Falkland Islands",
    code: "FK",
    callingCode: "500"
  },
  {
    name: "France",
    code: "FR",
    callingCode: "33"
  },
  {
    name: "Faroe Islands",
    code: "FO",
    callingCode: "298"
  },
  {
    name: "Micronesia",
    code: "FM",
    callingCode: "691"
  },
  {
    name: "Gabon",
    code: "GA",
    callingCode: "241"
  },
  {
    name: "United Kingdom",
    code: "GB",
    callingCode: "44"
  },
  {
    name: "Georgia",
    code: "GE",
    callingCode: "995"
  },
  {
    name: "Guernsey",
    code: "GG",
    callingCode: "44"
  },
  {
    name: "Ghana",
    code: "GH",
    callingCode: "233"
  },
  {
    name: "Gibraltar",
    code: "GI",
    callingCode: "350"
  },
  {
    name: "Guinea",
    code: "GN",
    callingCode: "224"
  },
  {
    name: "Guadeloupe",
    code: "GP",
    callingCode: "590"
  },
  {
    name: "Gambia",
    code: "GM",
    callingCode: "220"
  },
  {
    name: "Guinea-Bissau",
    code: "GW",
    callingCode: "245"
  },
  {
    name: "Equatorial Guinea",
    code: "GQ",
    callingCode: "240"
  },
  {
    name: "Greece",
    code: "GR",
    callingCode: "30"
  },
  {
    name: "Grenada",
    code: "GD",
    callingCode: "1473"
  },
  {
    name: "Greenland",
    code: "GL",
    callingCode: "299"
  },
  {
    name: "Guatemala",
    code: "GT",
    callingCode: "502"
  },
  {
    name: "French Guiana",
    code: "GF",
    callingCode: "594"
  },
  {
    name: "Guam",
    code: "GU",
    callingCode: "1671"
  },
  {
    name: "Guyana",
    code: "GY",
    callingCode: "592"
  },
  {
    name: "Hong Kong",
    code: "HK",
    callingCode: "852"
  },
  {
    name: "Honduras",
    code: "HN",
    callingCode: "504"
  },
  {
    name: "Croatia",
    code: "HR",
    callingCode: "385"
  },
  {
    name: "Haiti",
    code: "HT",
    callingCode: "509"
  },
  {
    name: "Hungary",
    code: "HU",
    callingCode: "36"
  },
  {
    name: "Indonesia",
    code: "ID",
    callingCode: "62"
  },
  {
    name: "Isle of Man",
    code: "IM",
    callingCode: "44"
  },
  {
    name: "India",
    code: "IN",
    callingCode: "91"
  },
  {
    name: "British Indian Ocean Territory",
    code: "IO",
    callingCode: "246"
  },
  {
    name: "Ireland",
    code: "IE",
    callingCode: "353"
  },
  {
    name: "Iran",
    code: "IR",
    callingCode: "98"
  },
  {
    name: "Iraq",
    code: "IQ",
    callingCode: "964"
  },
  {
    name: "Iceland",
    code: "IS",
    callingCode: "354"
  },
  {
    name: "Israel",
    code: "IL",
    callingCode: "972"
  },
  {
    name: "Italy",
    code: "IT",
    callingCode: "39"
  },
  {
    name: "Jamaica",
    code: "JM",
    callingCode: "1876"
  },
  {
    name: "Jersey",
    code: "JE",
    callingCode: "44"
  },
  {
    name: "Jordan",
    code: "JO",
    callingCode: "962"
  },
  {
    name: "Japan",
    code: "JP",
    callingCode: "81"
  },
  {
    name: "Kazakhstan",
    code: "KZ",
    callingCode: "76"
  },
  {
    name: "Kazakhstan",
    code: "KZ",
    callingCode: "77"
  },
  {
    name: "Kenya",
    code: "KE",
    callingCode: "254"
  },
  {
    name: "Kyrgyzstan",
    code: "KG",
    callingCode: "996"
  },
  {
    name: "Cambodia",
    code: "KH",
    callingCode: "855"
  },
  {
    name: "Kiribati",
    code: "KI",
    callingCode: "686"
  },
  {
    name: "Saint Kitts and Nevis",
    code: "KN",
    callingCode: "1869"
  },
  {
    name: "South Korea",
    code: "KR",
    callingCode: "82"
  },
  {
    name: "Kosovo",
    code: "XK",
    callingCode: "383"
  },
  {
    name: "Kuwait",
    code: "KW",
    callingCode: "965"
  },
  {
    name: "Laos",
    code: "LA",
    callingCode: "856"
  },
  {
    name: "Lebanon",
    code: "LB",
    callingCode: "961"
  },
  {
    name: "Liberia",
    code: "LR",
    callingCode: "231"
  },
  {
    name: "Libya",
    code: "LY",
    callingCode: "218"
  },
  {
    name: "Saint Lucia",
    code: "LC",
    callingCode: "1758"
  },
  {
    name: "Liechtenstein",
    code: "LI",
    callingCode: "423"
  },
  {
    name: "Sri Lanka",
    code: "LK",
    callingCode: "94"
  },
  {
    name: "Lesotho",
    code: "LS",
    callingCode: "266"
  },
  {
    name: "Lithuania",
    code: "LT",
    callingCode: "370"
  },
  {
    name: "Luxembourg",
    code: "LU",
    callingCode: "352"
  },
  {
    name: "Latvia",
    code: "LV",
    callingCode: "371"
  },
  {
    name: "Macau",
    code: "MO",
    callingCode: "853"
  },
  {
    name: "Saint Martin",
    code: "MF",
    callingCode: "590"
  },
  {
    name: "Morocco",
    code: "MA",
    callingCode: "212"
  },
  {
    name: "Monaco",
    code: "MC",
    callingCode: "377"
  },
  {
    name: "Moldova",
    code: "MD",
    callingCode: "373"
  },
  {
    name: "Madagascar",
    code: "MG",
    callingCode: "261"
  },
  {
    name: "Maldives",
    code: "MV",
    callingCode: "960"
  },
  {
    name: "Mexico",
    code: "MX",
    callingCode: "52"
  },
  {
    name: "Marshall Islands",
    code: "MH",
    callingCode: "692"
  },
  {
    name: "Macedonia",
    code: "MK",
    callingCode: "389"
  },
  {
    name: "Mali",
    code: "ML",
    callingCode: "223"
  },
  {
    name: "Malta",
    code: "MT",
    callingCode: "356"
  },
  {
    name: "Myanmar",
    code: "MM",
    callingCode: "95"
  },
  {
    name: "Montenegro",
    code: "ME",
    callingCode: "382"
  },
  {
    name: "Mongolia",
    code: "MN",
    callingCode: "976"
  },
  {
    name: "Northern Mariana Islands",
    code: "MP",
    callingCode: "1670"
  },
  {
    name: "Mozambique",
    code: "MZ",
    callingCode: "258"
  },
  {
    name: "Mauritania",
    code: "MR",
    callingCode: "222"
  },
  {
    name: "Montserrat",
    code: "MS",
    callingCode: "1664"
  },
  {
    name: "Martinique",
    code: "MQ",
    callingCode: "596"
  },
  {
    name: "Mauritius",
    code: "MU",
    callingCode: "230"
  },
  {
    name: "Malawi",
    code: "MW",
    callingCode: "265"
  },
  {
    name: "Malaysia",
    code: "MY",
    callingCode: "60"
  },
  {
    name: "Mayotte",
    code: "YT",
    callingCode: "262"
  },
  {
    name: "Namibia",
    code: "NA",
    callingCode: "264"
  },
  {
    name: "New Caledonia",
    code: "NC",
    callingCode: "687"
  },
  {
    name: "Niger",
    code: "NE",
    callingCode: "227"
  },
  {
    name: "Norfolk Island",
    code: "NF",
    callingCode: "672"
  },
  {
    name: "Nigeria",
    code: "NG",
    callingCode: "234"
  },
  {
    name: "Nicaragua",
    code: "NI",
    callingCode: "505"
  },
  {
    name: "Niue",
    code: "NU",
    callingCode: "683"
  },
  {
    name: "Netherlands",
    code: "NL",
    callingCode: "31"
  },
  {
    name: "Norway",
    code: "NO",
    callingCode: "47"
  },
  {
    name: "Nepal",
    code: "NP",
    callingCode: "977"
  },
  {
    name: "Nauru",
    code: "NR",
    callingCode: "674"
  },
  {
    name: "New Zealand",
    code: "NZ",
    callingCode: "64"
  },
  {
    name: "Oman",
    code: "OM",
    callingCode: "968"
  },
  {
    name: "Pakistan",
    code: "PK",
    callingCode: "92"
  },
  {
    name: "Panama",
    code: "PA",
    callingCode: "507"
  },
  {
    name: "Pitcairn Islands",
    code: "PN",
    callingCode: "64"
  },
  {
    name: "Peru",
    code: "PE",
    callingCode: "51"
  },
  {
    name: "Philippines",
    code: "PH",
    callingCode: "63"
  },
  {
    name: "Palau",
    code: "PW",
    callingCode: "680"
  },
  {
    name: "Papua New Guinea",
    code: "PG",
    callingCode: "675"
  },
  {
    name: "Poland",
    code: "PL",
    callingCode: "48"
  },
  {
    name: "Puerto Rico",
    code: "PR",
    callingCode: "1787"
  },
  {
    name: "Puerto Rico",
    code: "PR",
    callingCode: "1939"
  },
  {
    name: "North Korea",
    code: "KP",
    callingCode: "850"
  },
  {
    name: "Portugal",
    code: "PT",
    callingCode: "351"
  },
  {
    name: "Paraguay",
    code: "PY",
    callingCode: "595"
  },
  {
    name: "Palestine",
    code: "PS",
    callingCode: "970"
  },
  {
    name: "French Polynesia",
    code: "PF",
    callingCode: "689"
  },
  {
    name: "Qatar",
    code: "QA",
    callingCode: "974"
  },
  {
    name: "R\xC3\xA9union",
    code: "RE",
    callingCode: "262"
  },
  {
    name: "Romania",
    code: "RO",
    callingCode: "40"
  },
  {
    name: "Russia",
    code: "RU",
    callingCode: "7"
  },
  {
    name: "Rwanda",
    code: "RW",
    callingCode: "250"
  },
  {
    name: "Saudi Arabia",
    code: "SA",
    callingCode: "966"
  },
  {
    name: "Sudan",
    code: "SD",
    callingCode: "249"
  },
  {
    name: "Senegal",
    code: "SN",
    callingCode: "221"
  },
  {
    name: "Singapore",
    code: "SG",
    callingCode: "65"
  },
  {
    name: "South Georgia",
    code: "GS",
    callingCode: "500"
  },
  {
    name: "Svalbard and Jan Mayen",
    code: "SJ",
    callingCode: "4779"
  },
  {
    name: "Solomon Islands",
    code: "SB",
    callingCode: "677"
  },
  {
    name: "Sierra Leone",
    code: "SL",
    callingCode: "232"
  },
  {
    name: "El Salvador",
    code: "SV",
    callingCode: "503"
  },
  {
    name: "San Marino",
    code: "SM",
    callingCode: "378"
  },
  {
    name: "Somalia",
    code: "SO",
    callingCode: "252"
  },
  {
    name: "Saint Pierre and Miquelon",
    code: "PM",
    callingCode: "508"
  },
  {
    name: "Serbia",
    code: "RS",
    callingCode: "381"
  },
  {
    name: "South Sudan",
    code: "SS",
    callingCode: "211"
  },
  {
    name: "S\xC3\xA3o Tom\xC3\xA9 and Pr\xC3\xADncipe",
    code: "ST",
    callingCode: "239"
  },
  {
    name: "Suriname",
    code: "SR",
    callingCode: "597"
  },
  {
    name: "Slovakia",
    code: "SK",
    callingCode: "421"
  },
  {
    name: "Slovenia",
    code: "SI",
    callingCode: "386"
  },
  {
    name: "Sweden",
    code: "SE",
    callingCode: "46"
  },
  {
    name: "Swaziland",
    code: "SZ",
    callingCode: "268"
  },
  {
    name: "Sint Maarten",
    code: "SX",
    callingCode: "1721"
  },
  {
    name: "Seychelles",
    code: "SC",
    callingCode: "248"
  },
  {
    name: "Syria",
    code: "SY",
    callingCode: "963"
  },
  {
    name: "Turks and Caicos Islands",
    code: "TC",
    callingCode: "1649"
  },
  {
    name: "Chad",
    code: "TD",
    callingCode: "235"
  },
  {
    name: "Togo",
    code: "TG",
    callingCode: "228"
  },
  {
    name: "Thailand",
    code: "TH",
    callingCode: "66"
  },
  {
    name: "Tajikistan",
    code: "TJ",
    callingCode: "992"
  },
  {
    name: "Tokelau",
    code: "TK",
    callingCode: "690"
  },
  {
    name: "Turkmenistan",
    code: "TM",
    callingCode: "993"
  },
  {
    name: "Timor-Leste",
    code: "TL",
    callingCode: "670"
  },
  {
    name: "Tonga",
    code: "TO",
    callingCode: "676"
  },
  {
    name: "Trinidad and Tobago",
    code: "TT",
    callingCode: "1868"
  },
  {
    name: "Tunisia",
    code: "TN",
    callingCode: "216"
  },
  {
    name: "Turkey",
    code: "TR",
    callingCode: "90"
  },
  {
    name: "Tuvalu",
    code: "TV",
    callingCode: "688"
  },
  {
    name: "Taiwan",
    code: "TW",
    callingCode: "886"
  },
  {
    name: "Tanzania",
    code: "TZ",
    callingCode: "255"
  },
  {
    name: "Uganda",
    code: "UG",
    callingCode: "256"
  },
  {
    name: "Ukraine",
    code: "UA",
    callingCode: "380"
  },
  {
    name: "Uruguay",
    code: "UY",
    callingCode: "598"
  },
  {
    name: "United States",
    code: "US",
    callingCode: "1"
  },
  {
    name: "Uzbekistan",
    code: "UZ",
    callingCode: "998"
  },
  {
    name: "Vatican City",
    code: "VA",
    callingCode: "3906698"
  },
  {
    name: "Vatican City",
    code: "VA",
    callingCode: "379"
  },
  {
    name: "Saint Vincent and the Grenadines",
    code: "VC",
    callingCode: "1784"
  },
  {
    name: "Venezuela",
    code: "VE",
    callingCode: "58"
  },
  {
    name: "British Virgin Islands",
    code: "VG",
    callingCode: "1284"
  },
  {
    name: "United States Virgin Islands",
    code: "VI",
    callingCode: "1340"
  },
  {
    name: "Vietnam",
    code: "VN",
    callingCode: "84"
  },
  {
    name: "Vanuatu",
    code: "VU",
    callingCode: "678"
  },
  {
    name: "Wallis and Futuna",
    code: "WF",
    callingCode: "681"
  },
  {
    name: "Samoa",
    code: "WS",
    callingCode: "685"
  },
  {
    name: "Yemen",
    code: "YE",
    callingCode: "967"
  },
  {
    name: "South Africa",
    code: "ZA",
    callingCode: "27"
  },
  {
    name: "Zambia",
    code: "ZM",
    callingCode: "260"
  },
  {
    name: "Zimbabwe",
    code: "ZW",
    callingCode: "263"
  }
];
function add_css$1(target) {
  append_styles(target, "svelte-1rff3re", ".phone-input.svelte-1rff3re.svelte-1rff3re{display:flex}.phone-input.svelte-1rff3re .phone-input-prefix-select.svelte-1rff3re{height:2.5rem;border-radius:0.25rem;border:none;background-color:#f3f3f3;padding:0.5rem;margin-right:0.5rem}");
}
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[12] = list[i];
  return child_ctx;
}
function create_each_block(ctx) {
  let option;
  let t0_value = ctx[12].code + "";
  let t0;
  let t1;
  let t2_value = ctx[12].callingCode + "";
  let t2;
  let t3;
  let option_value_value;
  return {
    c() {
      option = element("option");
      t0 = text(t0_value);
      t1 = text(" (+");
      t2 = text(t2_value);
      t3 = text(")");
      option.__value = option_value_value = `+${ctx[12].callingCode}`;
      option.value = option.__value;
    },
    m(target, anchor) {
      insert(target, option, anchor);
      append(option, t0);
      append(option, t1);
      append(option, t2);
      append(option, t3);
    },
    p(ctx2, dirty) {
      if (dirty & 16 && t0_value !== (t0_value = ctx2[12].code + ""))
        set_data(t0, t0_value);
      if (dirty & 16 && t2_value !== (t2_value = ctx2[12].callingCode + ""))
        set_data(t2, t2_value);
      if (dirty & 16 && option_value_value !== (option_value_value = `+${ctx2[12].callingCode}`)) {
        option.__value = option_value_value;
        option.value = option.__value;
      }
    },
    d(detaching) {
      if (detaching)
        detach(option);
    }
  };
}
function create_fragment$1(ctx) {
  let div;
  let select;
  let t;
  let cinput;
  let updating_value;
  let current;
  let mounted;
  let dispose;
  let each_value = ctx[4];
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  function cinput_value_binding(value) {
    ctx[8](value);
  }
  let cinput_props = {
    type: "tel",
    placeholder: ctx[2],
    required: ctx[3]
  };
  if (ctx[1] !== void 0) {
    cinput_props.value = ctx[1];
  }
  cinput = new BaseInput({ props: cinput_props });
  binding_callbacks.push(() => bind(cinput, "value", cinput_value_binding));
  cinput.$on("input", ctx[5]);
  return {
    c() {
      div = element("div");
      select = element("select");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t = space();
      create_component(cinput.$$.fragment);
      attr(select, "class", "phone-input-prefix-select svelte-1rff3re");
      select.required = ctx[3];
      if (ctx[0] === void 0)
        add_render_callback(() => ctx[7].call(select));
      attr(div, "class", "phone-input svelte-1rff3re");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, select);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(select, null);
      }
      select_option(select, ctx[0]);
      append(div, t);
      mount_component(cinput, div, null);
      current = true;
      if (!mounted) {
        dispose = [
          listen(select, "change", ctx[7]),
          listen(select, "change", ctx[5])
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & 16) {
        each_value = ctx2[4];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(select, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
      if (!current || dirty & 8) {
        select.required = ctx2[3];
      }
      if (dirty & 17) {
        select_option(select, ctx2[0]);
      }
      const cinput_changes = {};
      if (dirty & 4)
        cinput_changes.placeholder = ctx2[2];
      if (dirty & 8)
        cinput_changes.required = ctx2[3];
      if (!updating_value && dirty & 2) {
        updating_value = true;
        cinput_changes.value = ctx2[1];
        add_flush_callback(() => updating_value = false);
      }
      cinput.$set(cinput_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(cinput.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(cinput.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      destroy_each(each_blocks, detaching);
      destroy_component(cinput);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  let { prefix = "+49" } = $$props;
  let { number = "" } = $$props;
  let { value = `${prefix} ${number}` } = $$props;
  let { placeholder } = $$props;
  let { required = false } = $$props;
  let { allowedCountries = countries } = $$props;
  const dispatch = createEventDispatcher();
  const removeLeadingZero = (number2) => {
    return number2.substr(0, 1) === "0" ? number2.substr(1) : number2;
  };
  const sanitizeNumber = (number2) => {
    return removeLeadingZero(number2);
  };
  const onInput = () => {
    $$invalidate(6, value = `${prefix}${sanitizeNumber(number)}`);
    dispatch("input", value);
  };
  function select_change_handler() {
    prefix = select_value(this);
    $$invalidate(0, prefix);
    $$invalidate(4, allowedCountries);
  }
  function cinput_value_binding(value2) {
    number = value2;
    $$invalidate(1, number);
  }
  $$self.$$set = ($$props2) => {
    if ("prefix" in $$props2)
      $$invalidate(0, prefix = $$props2.prefix);
    if ("number" in $$props2)
      $$invalidate(1, number = $$props2.number);
    if ("value" in $$props2)
      $$invalidate(6, value = $$props2.value);
    if ("placeholder" in $$props2)
      $$invalidate(2, placeholder = $$props2.placeholder);
    if ("required" in $$props2)
      $$invalidate(3, required = $$props2.required);
    if ("allowedCountries" in $$props2)
      $$invalidate(4, allowedCountries = $$props2.allowedCountries);
  };
  return [
    prefix,
    number,
    placeholder,
    required,
    allowedCountries,
    onInput,
    value,
    select_change_handler,
    cinput_value_binding
  ];
}
class PhoneInput extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, {
      prefix: 0,
      number: 1,
      value: 6,
      placeholder: 2,
      required: 3,
      allowedCountries: 4
    }, add_css$1);
  }
}
function add_css(target) {
  append_styles(target, "svelte-ltwhj4", ".svelte-ltwhj4.svelte-ltwhj4,.svelte-ltwhj4.svelte-ltwhj4:before,.svelte-ltwhj4.svelte-ltwhj4:after{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;font-family:Arial, Helvetica, sans-serif;margin:0}.gap.svelte-ltwhj4.svelte-ltwhj4{margin-bottom:1rem}.center.svelte-ltwhj4.svelte-ltwhj4{display:flex;align-items:center;justify-content:center}.text-sm.svelte-ltwhj4.svelte-ltwhj4{font-size:0.75rem}.charles-newsletter.svelte-ltwhj4.svelte-ltwhj4{box-shadow:0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);border-radius:0.5rem;text-align:center;background-color:white;margin:2px}.charles-newsletter.svelte-ltwhj4 h1.svelte-ltwhj4{font-size:1rem;margin-bottom:8px;font-weight:bold}.charles-newsletter-form.svelte-ltwhj4.svelte-ltwhj4{display:flex;flex-direction:column;max-width:576px;padding:3rem;margin:auto}");
}
function create_else_block(ctx) {
  let newsletteroptinsuccess;
  let current;
  newsletteroptinsuccess = new NewsletterOptInSuccess({
    props: {
      successTitle: ctx[7],
      successDescription: ctx[8]
    }
  });
  newsletteroptinsuccess.$on("click", ctx[14]);
  return {
    c() {
      create_component(newsletteroptinsuccess.$$.fragment);
    },
    m(target, anchor) {
      mount_component(newsletteroptinsuccess, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const newsletteroptinsuccess_changes = {};
      if (dirty & 128)
        newsletteroptinsuccess_changes.successTitle = ctx2[7];
      if (dirty & 256)
        newsletteroptinsuccess_changes.successDescription = ctx2[8];
      newsletteroptinsuccess.$set(newsletteroptinsuccess_changes);
    },
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
function create_if_block(ctx) {
  let form;
  let h1;
  let t0;
  let t1;
  let p;
  let t2;
  let t3;
  let cinput;
  let updating_value;
  let t4;
  let cphoneinput;
  let updating_value_1;
  let t5;
  let ccheckbox;
  let updating_checked;
  let t6;
  let div;
  let ctabutton;
  let current;
  let mounted;
  let dispose;
  function cinput_value_binding(value) {
    ctx[17](value);
  }
  let cinput_props = {
    type: "text",
    placeholder: ctx[5],
    required: true
  };
  if (ctx[10] !== void 0) {
    cinput_props.value = ctx[10];
  }
  cinput = new BaseInput({ props: cinput_props });
  binding_callbacks.push(() => bind(cinput, "value", cinput_value_binding));
  function cphoneinput_value_binding(value) {
    ctx[18](value);
  }
  let cphoneinput_props = {
    placeholder: ctx[6],
    required: true
  };
  if (ctx[11] !== void 0) {
    cphoneinput_props.value = ctx[11];
  }
  cphoneinput = new PhoneInput({ props: cphoneinput_props });
  binding_callbacks.push(() => bind(cphoneinput, "value", cphoneinput_value_binding));
  function ccheckbox_checked_binding(value) {
    ctx[19](value);
  }
  let ccheckbox_props = {
    id: "agreed",
    required: true,
    $$slots: { default: [create_default_slot_1] },
    $$scope: { ctx }
  };
  if (ctx[12] !== void 0) {
    ccheckbox_props.checked = ctx[12];
  }
  ccheckbox = new BaseCheckbox({ props: ccheckbox_props });
  binding_callbacks.push(() => bind(ccheckbox, "checked", ccheckbox_checked_binding));
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
      create_component(cinput.$$.fragment);
      t4 = space();
      create_component(cphoneinput.$$.fragment);
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
      mount_component(cinput, form, null);
      append(form, t4);
      mount_component(cphoneinput, form, null);
      append(form, t5);
      mount_component(ccheckbox, form, null);
      append(form, t6);
      append(form, div);
      mount_component(ctabutton, div, null);
      current = true;
      if (!mounted) {
        dispose = listen(form, "submit", prevent_default(ctx[13]));
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (!current || dirty & 1)
        set_data(t0, ctx2[0]);
      if (!current || dirty & 2)
        set_data(t2, ctx2[1]);
      const cinput_changes = {};
      if (dirty & 32)
        cinput_changes.placeholder = ctx2[5];
      if (!updating_value && dirty & 1024) {
        updating_value = true;
        cinput_changes.value = ctx2[10];
        add_flush_callback(() => updating_value = false);
      }
      cinput.$set(cinput_changes);
      const cphoneinput_changes = {};
      if (dirty & 64)
        cphoneinput_changes.placeholder = ctx2[6];
      if (!updating_value_1 && dirty & 2048) {
        updating_value_1 = true;
        cphoneinput_changes.value = ctx2[11];
        add_flush_callback(() => updating_value_1 = false);
      }
      cphoneinput.$set(cphoneinput_changes);
      const ccheckbox_changes = {};
      if (dirty & 1048588) {
        ccheckbox_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_checked && dirty & 4096) {
        updating_checked = true;
        ccheckbox_changes.checked = ctx2[12];
        add_flush_callback(() => updating_checked = false);
      }
      ccheckbox.$set(ccheckbox_changes);
      const ctabutton_changes = {};
      if (dirty & 1048592) {
        ctabutton_changes.$$scope = { dirty, ctx: ctx2 };
      }
      ctabutton.$set(ctabutton_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(cinput.$$.fragment, local);
      transition_in(cphoneinput.$$.fragment, local);
      transition_in(ccheckbox.$$.fragment, local);
      transition_in(ctabutton.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(cinput.$$.fragment, local);
      transition_out(cphoneinput.$$.fragment, local);
      transition_out(ccheckbox.$$.fragment, local);
      transition_out(ctabutton.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(form);
      destroy_component(cinput);
      destroy_component(cphoneinput);
      destroy_component(ccheckbox);
      destroy_component(ctabutton);
      mounted = false;
      dispose();
    }
  };
}
function create_default_slot_1(ctx) {
  let span;
  let t0;
  let t1;
  let a;
  let t2;
  return {
    c() {
      span = element("span");
      t0 = text(ctx[2]);
      t1 = space();
      a = element("a");
      t2 = text("Link");
      attr(a, "href", ctx[3]);
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
    p(ctx2, dirty) {
      if (dirty & 4)
        set_data(t0, ctx2[2]);
      if (dirty & 8) {
        attr(a, "href", ctx2[3]);
      }
    },
    d(detaching) {
      if (detaching)
        detach(span);
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
function create_fragment(ctx) {
  let div;
  let current_block_type_index;
  let if_block;
  let current;
  const if_block_creators = [create_if_block, create_else_block];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (!ctx2[9])
      return 0;
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
function instance($$self, $$props, $$invalidate) {
  let { isPreview = false } = $$props;
  let { submitHandler } = $$props;
  let { title = "Get our Whatsapp Newsletter" } = $$props;
  let { description = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure aliquid repellat quisquam non molestiae, unde libero cupiditate quia" } = $$props;
  let { legalText = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure aliquid repellat quisquam non molestiae, unde libero cupiditate quia" } = $$props;
  let { privacyPolicyLink = "https://hello-charles.com" } = $$props;
  let { ctaButtonLabel = "Submit" } = $$props;
  let { namePlaceholder = "Your Name" } = $$props;
  let { phoneNrPlaceholder = "Your Phone Number" } = $$props;
  let { successTitle = "Thanks a lot! \u{1F973}" } = $$props;
  let { successDescription = "We have successfully opted-in to stay in touch with us on WhatsApp. We're excited to have you!" } = $$props;
  let isDone = false;
  let name = "";
  let phone = "";
  let hasAgreed = false;
  const onSubmit = async () => {
    if (isPreview) {
      $$invalidate(9, isDone = true);
      return;
    }
    console.log("{ name, phoneNumber: phone, hasAgreed }", { name, phoneNumber: phone, hasAgreed });
    await (submitHandler == null ? void 0 : submitHandler({ name, phoneNumber: phone, hasAgreed }));
    $$invalidate(9, isDone = true);
  };
  const onClickSuccess = () => {
    if (isPreview) {
      $$invalidate(9, isDone = false);
    }
  };
  function cinput_value_binding(value) {
    name = value;
    $$invalidate(10, name);
  }
  function cphoneinput_value_binding(value) {
    phone = value;
    $$invalidate(11, phone);
  }
  function ccheckbox_checked_binding(value) {
    hasAgreed = value;
    $$invalidate(12, hasAgreed);
  }
  $$self.$$set = ($$props2) => {
    if ("isPreview" in $$props2)
      $$invalidate(15, isPreview = $$props2.isPreview);
    if ("submitHandler" in $$props2)
      $$invalidate(16, submitHandler = $$props2.submitHandler);
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
    if ("successTitle" in $$props2)
      $$invalidate(7, successTitle = $$props2.successTitle);
    if ("successDescription" in $$props2)
      $$invalidate(8, successDescription = $$props2.successDescription);
  };
  return [
    title,
    description,
    legalText,
    privacyPolicyLink,
    ctaButtonLabel,
    namePlaceholder,
    phoneNrPlaceholder,
    successTitle,
    successDescription,
    isDone,
    name,
    phone,
    hasAgreed,
    onSubmit,
    onClickSuccess,
    isPreview,
    submitHandler,
    cinput_value_binding,
    cphoneinput_value_binding,
    ccheckbox_checked_binding
  ];
}
class NewsletterOptIn extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {
      isPreview: 15,
      submitHandler: 16,
      title: 0,
      description: 1,
      legalText: 2,
      privacyPolicyLink: 3,
      ctaButtonLabel: 4,
      namePlaceholder: 5,
      phoneNrPlaceholder: 6,
      successTitle: 7,
      successDescription: 8
    }, add_css);
  }
}
var lib = {
  NewsletterOptIn
};
export { lib as default };
