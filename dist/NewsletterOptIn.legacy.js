var NewsletterOptIn = (function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var _typeof_1 = createCommonjsModule(function (module) {
  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      module.exports = _typeof = function _typeof(obj) {
        return typeof obj;
      };

      module.exports["default"] = module.exports, module.exports.__esModule = true;
    } else {
      module.exports = _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };

      module.exports["default"] = module.exports, module.exports.__esModule = true;
    }

    return _typeof(obj);
  }

  module.exports = _typeof;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  });

  var _typeof = unwrapExports(_typeof_1);

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  var runtime_1 = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var runtime = (function (exports) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function define(obj, key, value) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
      return obj[key];
    }
    try {
      // IE 8 has a broken Object.defineProperty that only works on DOM objects.
      define({}, "");
    } catch (err) {
      define = function(obj, key, value) {
        return obj[key] = value;
      };
    }

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);

      // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.
      generator._invoke = makeInvokeMethod(innerFn, self, context);

      return generator;
    }
    exports.wrap = wrap;

    // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
      try {
        return { type: "normal", arg: fn.call(obj, arg) };
      } catch (err) {
        return { type: "throw", arg: err };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";

    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {};

    // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}

    // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function () {
      return this;
    });

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype &&
        NativeIteratorPrototype !== Op &&
        hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype =
      Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = GeneratorFunctionPrototype;
    define(Gp, "constructor", GeneratorFunctionPrototype);
    define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
    GeneratorFunction.displayName = define(
      GeneratorFunctionPrototype,
      toStringTagSymbol,
      "GeneratorFunction"
    );

    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function(method) {
        define(prototype, method, function(arg) {
          return this._invoke(method, arg);
        });
      });
    }

    exports.isGeneratorFunction = function(genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor
        ? ctor === GeneratorFunction ||
          // For the native GeneratorFunction constructor, the best we can
          // do is to check its .name property.
          (ctor.displayName || ctor.name) === "GeneratorFunction"
        : false;
    };

    exports.mark = function(genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        define(genFun, toStringTagSymbol, "GeneratorFunction");
      }
      genFun.prototype = Object.create(Gp);
      return genFun;
    };

    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.
    exports.awrap = function(arg) {
      return { __await: arg };
    };

    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;
          if (value &&
              typeof value === "object" &&
              hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function(value) {
              invoke("next", value, resolve, reject);
            }, function(err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return PromiseImpl.resolve(value).then(function(unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function(error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function(resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise =
          // If enqueue has been called before, then we want to wait until
          // all previous Promises have been resolved before calling invoke,
          // so that results are always delivered in the correct order. If
          // enqueue has not been called before, then it is important to
          // call invoke immediately, without waiting on a callback to fire,
          // so that the async generator function has the opportunity to do
          // any necessary setup in a predictable way. This predictability
          // is why the Promise constructor synchronously invokes its
          // executor callback, and why async functions synchronously
          // execute code before the first await. Since we implement simple
          // async functions in terms of async generators, it is especially
          // important to get this right, even though it requires care.
          previousPromise ? previousPromise.then(
            callInvokeWithMethodAndArg,
            // Avoid propagating failures to Promises returned by later
            // invocations of the iterator.
            callInvokeWithMethodAndArg
          ) : callInvokeWithMethodAndArg();
      }

      // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).
      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);
    define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    });
    exports.AsyncIterator = AsyncIterator;

    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise;

      var iter = new AsyncIterator(
        wrap(innerFn, outerFn, self, tryLocsList),
        PromiseImpl
      );

      return exports.isGeneratorFunction(outerFn)
        ? iter // If outerFn is a generator, return the full iterator.
        : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
          });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;

      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }

          // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;

          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);

          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;

          var record = tryCatch(innerFn, self, context);
          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done
              ? GenStateCompleted
              : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };

          } else if (record.type === "throw") {
            state = GenStateCompleted;
            // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.
            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    }

    // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.
    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];
      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError(
            "The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (! info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value;

        // Resume execution at the desired location (see delegateYield).
        context.next = delegate.nextLoc;

        // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.
        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }

      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      }

      // The delegate iterator is finished, so forget it and continue with
      // the outer generator.
      context.delegate = null;
      return ContinueSentinel;
    }

    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);

    define(Gp, toStringTagSymbol, "Generator");

    // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.
    define(Gp, iteratorSymbol, function() {
      return this;
    });

    define(Gp, "toString", function() {
      return "[object Generator]";
    });

    function pushTryEntry(locs) {
      var entry = { tryLoc: locs[0] };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{ tryLoc: "root" }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function(object) {
      var keys = [];
      for (var key in object) {
        keys.push(key);
      }
      keys.reverse();

      // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.
      return function next() {
        while (keys.length) {
          var key = keys.pop();
          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        }

        // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.
        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1, next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined$1;
            next.done = true;

            return next;
          };

          return next.next = next;
        }
      }

      // Return an iterator with no values.
      return { next: doneResult };
    }
    exports.values = values;

    function doneResult() {
      return { value: undefined$1, done: true };
    }

    Context.prototype = {
      constructor: Context,

      reset: function(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.
        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;

        this.method = "next";
        this.arg = undefined$1;

        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" &&
                hasOwn.call(this, name) &&
                !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },

      stop: function() {
        this.done = true;

        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },

      dispatchException: function(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;
        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined$1;
          }

          return !! caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }

            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },

      abrupt: function(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev &&
              hasOwn.call(entry, "finallyLoc") &&
              this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry &&
            (type === "break" ||
             type === "continue") &&
            finallyEntry.tryLoc <= arg &&
            arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },

      complete: function(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" ||
            record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },

      finish: function(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },

      "catch": function(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }

        // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.
        throw new Error("illegal catch attempt");
      },

      delegateYield: function(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    };

    // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.
    return exports;

  }(
    // If this script is executing as a CommonJS module, use module.exports
    // as the regeneratorRuntime namespace. Otherwise create a new empty
    // object. Either way, the resulting object will be used to initialize
    // the regeneratorRuntime variable at the top of this file.
    module.exports 
  ));

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, in modern engines
    // we can explicitly access globalThis. In older engines we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    if (typeof globalThis === "object") {
      globalThis.regeneratorRuntime = runtime;
    } else {
      Function("r", "regeneratorRuntime = r")(runtime);
    }
  }
  });

  var regenerator = runtime_1;

  var check = function (it) {
    return it && it.Math == Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global_1 =
    // eslint-disable-next-line es/no-global-this -- safe
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    // eslint-disable-next-line no-restricted-globals -- safe
    check(typeof self == 'object' && self) ||
    check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
    // eslint-disable-next-line no-new-func -- fallback
    (function () { return this; })() || Function('return this')();

  var fails = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  // Detect IE8's incomplete defineProperty implementation
  var descriptors = !fails(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
  });

  var call$2 = Function.prototype.call;

  var functionCall = call$2.bind ? call$2.bind(call$2) : function () {
    return call$2.apply(call$2, arguments);
  };

  var $propertyIsEnumerable$1 = {}.propertyIsEnumerable;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG = getOwnPropertyDescriptor$1 && !$propertyIsEnumerable$1.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
  var f$6 = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor$1(this, V);
    return !!descriptor && descriptor.enumerable;
  } : $propertyIsEnumerable$1;

  var objectPropertyIsEnumerable = {
  	f: f$6
  };

  var createPropertyDescriptor = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var FunctionPrototype$2 = Function.prototype;
  var bind$3 = FunctionPrototype$2.bind;
  var call$1 = FunctionPrototype$2.call;
  var callBind = bind$3 && bind$3.bind(call$1);

  var functionUncurryThis = bind$3 ? function (fn) {
    return fn && callBind(call$1, fn);
  } : function (fn) {
    return fn && function () {
      return call$1.apply(fn, arguments);
    };
  };

  var toString$1 = functionUncurryThis({}.toString);
  var stringSlice$1 = functionUncurryThis(''.slice);

  var classofRaw = function (it) {
    return stringSlice$1(toString$1(it), 8, -1);
  };

  var Object$4 = global_1.Object;
  var split = functionUncurryThis(''.split);

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject = fails(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !Object$4('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classofRaw(it) == 'String' ? split(it, '') : Object$4(it);
  } : Object$4;

  var TypeError$9 = global_1.TypeError;

  // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible = function (it) {
    if (it == undefined) throw TypeError$9("Can't call method on " + it);
    return it;
  };

  // toObject with fallback for non-array-like ES3 strings



  var toIndexedObject = function (it) {
    return indexedObject(requireObjectCoercible(it));
  };

  // `IsCallable` abstract operation
  // https://tc39.es/ecma262/#sec-iscallable
  var isCallable = function (argument) {
    return typeof argument == 'function';
  };

  var isObject = function (it) {
    return typeof it == 'object' ? it !== null : isCallable(it);
  };

  var aFunction = function (argument) {
    return isCallable(argument) ? argument : undefined;
  };

  var getBuiltIn = function (namespace, method) {
    return arguments.length < 2 ? aFunction(global_1[namespace]) : global_1[namespace] && global_1[namespace][method];
  };

  var objectIsPrototypeOf = functionUncurryThis({}.isPrototypeOf);

  var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

  var process = global_1.process;
  var Deno = global_1.Deno;
  var versions = process && process.versions || Deno && Deno.version;
  var v8 = versions && versions.v8;
  var match, version;

  if (v8) {
    match = v8.split('.');
    // in old Chrome, versions of V8 isn't V8 = Chrome / 10
    // but their correct versions are not interesting for us
    version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
  }

  // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
  // so check `userAgent` even if `.v8` exists, but 0
  if (!version && engineUserAgent) {
    match = engineUserAgent.match(/Edge\/(\d+)/);
    if (!match || match[1] >= 74) {
      match = engineUserAgent.match(/Chrome\/(\d+)/);
      if (match) version = +match[1];
    }
  }

  var engineV8Version = version;

  /* eslint-disable es/no-symbol -- required for testing */



  // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
  var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
    var symbol = Symbol();
    // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
    return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
      // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      !Symbol.sham && engineV8Version && engineV8Version < 41;
  });

  /* eslint-disable es/no-symbol -- required for testing */


  var useSymbolAsUid = nativeSymbol
    && !Symbol.sham
    && typeof Symbol.iterator == 'symbol';

  var Object$3 = global_1.Object;

  var isSymbol = useSymbolAsUid ? function (it) {
    return typeof it == 'symbol';
  } : function (it) {
    var $Symbol = getBuiltIn('Symbol');
    return isCallable($Symbol) && objectIsPrototypeOf($Symbol.prototype, Object$3(it));
  };

  var String$3 = global_1.String;

  var tryToString = function (argument) {
    try {
      return String$3(argument);
    } catch (error) {
      return 'Object';
    }
  };

  var TypeError$8 = global_1.TypeError;

  // `Assert: IsCallable(argument) is true`
  var aCallable = function (argument) {
    if (isCallable(argument)) return argument;
    throw TypeError$8(tryToString(argument) + ' is not a function');
  };

  // `GetMethod` abstract operation
  // https://tc39.es/ecma262/#sec-getmethod
  var getMethod = function (V, P) {
    var func = V[P];
    return func == null ? undefined : aCallable(func);
  };

  var TypeError$7 = global_1.TypeError;

  // `OrdinaryToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-ordinarytoprimitive
  var ordinaryToPrimitive = function (input, pref) {
    var fn, val;
    if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = functionCall(fn, input))) return val;
    if (isCallable(fn = input.valueOf) && !isObject(val = functionCall(fn, input))) return val;
    if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = functionCall(fn, input))) return val;
    throw TypeError$7("Can't convert object to primitive value");
  };

  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var defineProperty$3 = Object.defineProperty;

  var setGlobal = function (key, value) {
    try {
      defineProperty$3(global_1, key, { value: value, configurable: true, writable: true });
    } catch (error) {
      global_1[key] = value;
    } return value;
  };

  var SHARED = '__core-js_shared__';
  var store$1 = global_1[SHARED] || setGlobal(SHARED, {});

  var sharedStore = store$1;

  var shared = createCommonjsModule(function (module) {
  (module.exports = function (key, value) {
    return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.19.1',
    mode: 'global',
    copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
  });
  });

  var Object$2 = global_1.Object;

  // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject
  var toObject = function (argument) {
    return Object$2(requireObjectCoercible(argument));
  };

  var hasOwnProperty = functionUncurryThis({}.hasOwnProperty);

  // `HasOwnProperty` abstract operation
  // https://tc39.es/ecma262/#sec-hasownproperty
  var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty(toObject(it), key);
  };

  var id = 0;
  var postfix = Math.random();
  var toString = functionUncurryThis(1.0.toString);

  var uid = function (key) {
    return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
  };

  var WellKnownSymbolsStore$1 = shared('wks');
  var Symbol$1 = global_1.Symbol;
  var symbolFor = Symbol$1 && Symbol$1['for'];
  var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

  var wellKnownSymbol = function (name) {
    if (!hasOwnProperty_1(WellKnownSymbolsStore$1, name) || !(nativeSymbol || typeof WellKnownSymbolsStore$1[name] == 'string')) {
      var description = 'Symbol.' + name;
      if (nativeSymbol && hasOwnProperty_1(Symbol$1, name)) {
        WellKnownSymbolsStore$1[name] = Symbol$1[name];
      } else if (useSymbolAsUid && symbolFor) {
        WellKnownSymbolsStore$1[name] = symbolFor(description);
      } else {
        WellKnownSymbolsStore$1[name] = createWellKnownSymbol(description);
      }
    } return WellKnownSymbolsStore$1[name];
  };

  var TypeError$6 = global_1.TypeError;
  var TO_PRIMITIVE$1 = wellKnownSymbol('toPrimitive');

  // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive
  var toPrimitive = function (input, pref) {
    if (!isObject(input) || isSymbol(input)) return input;
    var exoticToPrim = getMethod(input, TO_PRIMITIVE$1);
    var result;
    if (exoticToPrim) {
      if (pref === undefined) pref = 'default';
      result = functionCall(exoticToPrim, input, pref);
      if (!isObject(result) || isSymbol(result)) return result;
      throw TypeError$6("Can't convert object to primitive value");
    }
    if (pref === undefined) pref = 'number';
    return ordinaryToPrimitive(input, pref);
  };

  // `ToPropertyKey` abstract operation
  // https://tc39.es/ecma262/#sec-topropertykey
  var toPropertyKey = function (argument) {
    var key = toPrimitive(argument, 'string');
    return isSymbol(key) ? key : key + '';
  };

  var document$1 = global_1.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS$1 = isObject(document$1) && isObject(document$1.createElement);

  var documentCreateElement = function (it) {
    return EXISTS$1 ? document$1.createElement(it) : {};
  };

  // Thank's IE8 for his funny defineProperty
  var ie8DomDefine = !descriptors && !fails(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
    return Object.defineProperty(documentCreateElement('div'), 'a', {
      get: function () { return 7; }
    }).a != 7;
  });

  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  var f$5 = descriptors ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject(O);
    P = toPropertyKey(P);
    if (ie8DomDefine) try {
      return $getOwnPropertyDescriptor$1(O, P);
    } catch (error) { /* empty */ }
    if (hasOwnProperty_1(O, P)) return createPropertyDescriptor(!functionCall(objectPropertyIsEnumerable.f, O, P), O[P]);
  };

  var objectGetOwnPropertyDescriptor = {
  	f: f$5
  };

  var String$2 = global_1.String;
  var TypeError$5 = global_1.TypeError;

  // `Assert: Type(argument) is Object`
  var anObject = function (argument) {
    if (isObject(argument)) return argument;
    throw TypeError$5(String$2(argument) + ' is not an object');
  };

  var TypeError$4 = global_1.TypeError;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var $defineProperty$1 = Object.defineProperty;

  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  var f$4 = descriptors ? $defineProperty$1 : function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPropertyKey(P);
    anObject(Attributes);
    if (ie8DomDefine) try {
      return $defineProperty$1(O, P, Attributes);
    } catch (error) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError$4('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var objectDefineProperty = {
  	f: f$4
  };

  var createNonEnumerableProperty = descriptors ? function (object, key, value) {
    return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var functionToString = functionUncurryThis(Function.toString);

  // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
  if (!isCallable(sharedStore.inspectSource)) {
    sharedStore.inspectSource = function (it) {
      return functionToString(it);
    };
  }

  var inspectSource = sharedStore.inspectSource;

  var WeakMap$1 = global_1.WeakMap;

  var nativeWeakMap = isCallable(WeakMap$1) && /native code/.test(inspectSource(WeakMap$1));

  var keys = shared('keys');

  var sharedKey = function (key) {
    return keys[key] || (keys[key] = uid(key));
  };

  var hiddenKeys$1 = {};

  var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
  var TypeError$3 = global_1.TypeError;
  var WeakMap = global_1.WeakMap;
  var set, get, has;

  var enforce = function (it) {
    return has(it) ? get(it) : set(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject(it) || (state = get(it)).type !== TYPE) {
        throw TypeError$3('Incompatible receiver, ' + TYPE + ' required');
      } return state;
    };
  };

  if (nativeWeakMap || sharedStore.state) {
    var store = sharedStore.state || (sharedStore.state = new WeakMap());
    var wmget = functionUncurryThis(store.get);
    var wmhas = functionUncurryThis(store.has);
    var wmset = functionUncurryThis(store.set);
    set = function (it, metadata) {
      if (wmhas(store, it)) throw new TypeError$3(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      wmset(store, it, metadata);
      return metadata;
    };
    get = function (it) {
      return wmget(store, it) || {};
    };
    has = function (it) {
      return wmhas(store, it);
    };
  } else {
    var STATE = sharedKey('state');
    hiddenKeys$1[STATE] = true;
    set = function (it, metadata) {
      if (hasOwnProperty_1(it, STATE)) throw new TypeError$3(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      createNonEnumerableProperty(it, STATE, metadata);
      return metadata;
    };
    get = function (it) {
      return hasOwnProperty_1(it, STATE) ? it[STATE] : {};
    };
    has = function (it) {
      return hasOwnProperty_1(it, STATE);
    };
  }

  var internalState = {
    set: set,
    get: get,
    has: has,
    enforce: enforce,
    getterFor: getterFor
  };

  var FunctionPrototype$1 = Function.prototype;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getDescriptor = descriptors && Object.getOwnPropertyDescriptor;

  var EXISTS = hasOwnProperty_1(FunctionPrototype$1, 'name');
  // additional protection from minified / mangled / dropped function names
  var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
  var CONFIGURABLE = EXISTS && (!descriptors || (descriptors && getDescriptor(FunctionPrototype$1, 'name').configurable));

  var functionName = {
    EXISTS: EXISTS,
    PROPER: PROPER,
    CONFIGURABLE: CONFIGURABLE
  };

  var redefine = createCommonjsModule(function (module) {
  var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;

  var getInternalState = internalState.get;
  var enforceInternalState = internalState.enforce;
  var TEMPLATE = String(String).split('String');

  (module.exports = function (O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;
    var name = options && options.name !== undefined ? options.name : key;
    var state;
    if (isCallable(value)) {
      if (String(name).slice(0, 7) === 'Symbol(') {
        name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
      }
      if (!hasOwnProperty_1(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
        createNonEnumerableProperty(value, 'name', name);
      }
      state = enforceInternalState(value);
      if (!state.source) {
        state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
      }
    }
    if (O === global_1) {
      if (simple) O[key] = value;
      else setGlobal(key, value);
      return;
    } else if (!unsafe) {
      delete O[key];
    } else if (!noTargetGet && O[key]) {
      simple = true;
    }
    if (simple) O[key] = value;
    else createNonEnumerableProperty(O, key, value);
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, 'toString', function toString() {
    return isCallable(this) && getInternalState(this).source || inspectSource(this);
  });
  });

  var ceil = Math.ceil;
  var floor = Math.floor;

  // `ToIntegerOrInfinity` abstract operation
  // https://tc39.es/ecma262/#sec-tointegerorinfinity
  var toIntegerOrInfinity = function (argument) {
    var number = +argument;
    // eslint-disable-next-line no-self-compare -- safe
    return number !== number || number === 0 ? 0 : (number > 0 ? floor : ceil)(number);
  };

  var max = Math.max;
  var min$1 = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  var toAbsoluteIndex = function (index, length) {
    var integer = toIntegerOrInfinity(index);
    return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
  };

  var min = Math.min;

  // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength
  var toLength = function (argument) {
    return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  // `LengthOfArrayLike` abstract operation
  // https://tc39.es/ecma262/#sec-lengthofarraylike
  var lengthOfArrayLike = function (obj) {
    return toLength(obj.length);
  };

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod$1 = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject($this);
      var length = lengthOfArrayLike(O);
      var index = toAbsoluteIndex(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare -- NaN check
      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare -- NaN check
        if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
      } else for (;length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };

  var arrayIncludes = {
    // `Array.prototype.includes` method
    // https://tc39.es/ecma262/#sec-array.prototype.includes
    includes: createMethod$1(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod$1(false)
  };

  var indexOf = arrayIncludes.indexOf;


  var push$3 = functionUncurryThis([].push);

  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !hasOwnProperty_1(hiddenKeys$1, key) && hasOwnProperty_1(O, key) && push$3(result, key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (hasOwnProperty_1(O, key = names[i++])) {
      ~indexOf(result, key) || push$3(result, key);
    }
    return result;
  };

  // IE8- don't enum bug keys
  var enumBugKeys = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
  ];

  var hiddenKeys = enumBugKeys.concat('length', 'prototype');

  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  // eslint-disable-next-line es/no-object-getownpropertynames -- safe
  var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return objectKeysInternal(O, hiddenKeys);
  };

  var objectGetOwnPropertyNames = {
  	f: f$3
  };

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
  var f$2 = Object.getOwnPropertySymbols;

  var objectGetOwnPropertySymbols = {
  	f: f$2
  };

  var concat$1 = functionUncurryThis([].concat);

  // all object keys, includes non-enumerable and symbols
  var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = objectGetOwnPropertyNames.f(anObject(it));
    var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
    return getOwnPropertySymbols ? concat$1(keys, getOwnPropertySymbols(it)) : keys;
  };

  var copyConstructorProperties = function (target, source) {
    var keys = ownKeys(source);
    var defineProperty = objectDefineProperty.f;
    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!hasOwnProperty_1(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  };

  var replacement = /#|\.prototype\./;

  var isForced = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true
      : value == NATIVE ? false
      : isCallable(detection) ? fails(detection)
      : !!detection;
  };

  var normalize = isForced.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced.data = {};
  var NATIVE = isForced.NATIVE = 'N';
  var POLYFILL = isForced.POLYFILL = 'P';

  var isForced_1 = isForced;

  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;






  /*
    options.target      - name of the target object
    options.global      - target is the global object
    options.stat        - export as static methods of target
    options.proto       - export as prototype methods of target
    options.real        - real prototype method for the `pure` version
    options.forced      - export even if the native feature is available
    options.bind        - bind methods to the target, required for the `pure` version
    options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe      - use the simple assignment of property instead of delete + defineProperty
    options.sham        - add a flag to not completely full polyfills
    options.enumerable  - export as enumerable property
    options.noTargetGet - prevent calling a getter on target
    options.name        - the .name of the function if it does not match the key
  */
  var _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) {
      target = global_1;
    } else if (STATIC) {
      target = global_1[TARGET] || setGlobal(TARGET, {});
    } else {
      target = (global_1[TARGET] || {}).prototype;
    }
    if (target) for (key in source) {
      sourceProperty = source[key];
      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];
      FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
      // contained in target
      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty == typeof targetProperty) continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      }
      // add a flag to not completely full polyfills
      if (options.sham || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty(sourceProperty, 'sham', true);
      }
      // extend global
      redefine(target, key, sourceProperty, options);
    }
  };

  var FunctionPrototype = Function.prototype;
  var apply = FunctionPrototype.apply;
  var bind$2 = FunctionPrototype.bind;
  var call = FunctionPrototype.call;

  // eslint-disable-next-line es/no-reflect -- safe
  var functionApply = typeof Reflect == 'object' && Reflect.apply || (bind$2 ? call.bind(apply) : function () {
    return call.apply(apply, arguments);
  });

  // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  // eslint-disable-next-line es/no-array-isarray -- safe
  var isArray = Array.isArray || function isArray(argument) {
    return classofRaw(argument) == 'Array';
  };

  var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');
  var test = {};

  test[TO_STRING_TAG$2] = 'z';

  var toStringTagSupport = String(test) === '[object z]';

  var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
  var Object$1 = global_1.Object;

  // ES3 wrong here
  var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) { /* empty */ }
  };

  // getting tag from ES6+ `Object.prototype.toString`
  var classof = toStringTagSupport ? classofRaw : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (tag = tryGet(O = Object$1(it), TO_STRING_TAG$1)) == 'string' ? tag
      // builtinTag case
      : CORRECT_ARGUMENTS ? classofRaw(O)
      // ES3 arguments fallback
      : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
  };

  var String$1 = global_1.String;

  var toString_1 = function (argument) {
    if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
    return String$1(argument);
  };

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  // eslint-disable-next-line es/no-object-keys -- safe
  var objectKeys = Object.keys || function keys(O) {
    return objectKeysInternal(O, enumBugKeys);
  };

  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es/no-object-defineproperties -- safe
  var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject(O);
    var props = toIndexedObject(Properties);
    var keys = objectKeys(Properties);
    var length = keys.length;
    var index = 0;
    var key;
    while (length > index) objectDefineProperty.f(O, key = keys[index++], props[key]);
    return O;
  };

  var html = getBuiltIn('document', 'documentElement');

  /* global ActiveXObject -- old IE, WSH */








  var GT = '>';
  var LT = '<';
  var PROTOTYPE$1 = 'prototype';
  var SCRIPT = 'script';
  var IE_PROTO = sharedKey('IE_PROTO');

  var EmptyConstructor = function () { /* empty */ };

  var scriptTag = function (content) {
    return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
  };

  // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
  var NullProtoObjectViaActiveX = function (activeXDocument) {
    activeXDocument.write(scriptTag(''));
    activeXDocument.close();
    var temp = activeXDocument.parentWindow.Object;
    activeXDocument = null; // avoid memory leak
    return temp;
  };

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var NullProtoObjectViaIFrame = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement('iframe');
    var JS = 'java' + SCRIPT + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html.appendChild(iframe);
    // https://github.com/zloirock/core-js/issues/475
    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag('document.F=Object'));
    iframeDocument.close();
    return iframeDocument.F;
  };

  // Check for document.domain and active x support
  // No need to use active x approach when document.domain is not set
  // see https://github.com/es-shims/es5-shim/issues/150
  // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
  // avoid IE GC bug
  var activeXDocument;
  var NullProtoObject = function () {
    try {
      activeXDocument = new ActiveXObject('htmlfile');
    } catch (error) { /* ignore */ }
    NullProtoObject = typeof document != 'undefined'
      ? document.domain && activeXDocument
        ? NullProtoObjectViaActiveX(activeXDocument) // old IE
        : NullProtoObjectViaIFrame()
      : NullProtoObjectViaActiveX(activeXDocument); // WSH
    var length = enumBugKeys.length;
    while (length--) delete NullProtoObject[PROTOTYPE$1][enumBugKeys[length]];
    return NullProtoObject();
  };

  hiddenKeys$1[IE_PROTO] = true;

  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  var objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      EmptyConstructor[PROTOTYPE$1] = anObject(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE$1] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO] = O;
    } else result = NullProtoObject();
    return Properties === undefined ? result : objectDefineProperties(result, Properties);
  };

  var arraySlice = functionUncurryThis([].slice);

  /* eslint-disable es/no-object-getownpropertynames -- safe */


  var $getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;


  var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
    ? Object.getOwnPropertyNames(window) : [];

  var getWindowNames = function (it) {
    try {
      return $getOwnPropertyNames$1(it);
    } catch (error) {
      return arraySlice(windowNames);
    }
  };

  // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
  var f$1 = function getOwnPropertyNames(it) {
    return windowNames && classofRaw(it) == 'Window'
      ? getWindowNames(it)
      : $getOwnPropertyNames$1(toIndexedObject(it));
  };

  var objectGetOwnPropertyNamesExternal = {
  	f: f$1
  };

  var f = wellKnownSymbol;

  var wellKnownSymbolWrapped = {
  	f: f
  };

  var path = global_1;

  var defineProperty$2 = objectDefineProperty.f;

  var defineWellKnownSymbol = function (NAME) {
    var Symbol = path.Symbol || (path.Symbol = {});
    if (!hasOwnProperty_1(Symbol, NAME)) defineProperty$2(Symbol, NAME, {
      value: wellKnownSymbolWrapped.f(NAME)
    });
  };

  var defineProperty$1 = objectDefineProperty.f;



  var TO_STRING_TAG = wellKnownSymbol('toStringTag');

  var setToStringTag = function (it, TAG, STATIC) {
    if (it && !hasOwnProperty_1(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
      defineProperty$1(it, TO_STRING_TAG, { configurable: true, value: TAG });
    }
  };

  var bind$1 = functionUncurryThis(functionUncurryThis.bind);

  // optional / simple context binding
  var functionBindContext = function (fn, that) {
    aCallable(fn);
    return that === undefined ? fn : bind$1 ? bind$1(fn, that) : function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  var noop$1 = function () { /* empty */ };
  var empty = [];
  var construct$1 = getBuiltIn('Reflect', 'construct');
  var constructorRegExp = /^\s*(?:class|function)\b/;
  var exec = functionUncurryThis(constructorRegExp.exec);
  var INCORRECT_TO_STRING = !constructorRegExp.exec(noop$1);

  var isConstructorModern = function (argument) {
    if (!isCallable(argument)) return false;
    try {
      construct$1(noop$1, empty, argument);
      return true;
    } catch (error) {
      return false;
    }
  };

  var isConstructorLegacy = function (argument) {
    if (!isCallable(argument)) return false;
    switch (classof(argument)) {
      case 'AsyncFunction':
      case 'GeneratorFunction':
      case 'AsyncGeneratorFunction': return false;
      // we can't check .prototype since constructors produced by .bind haven't it
    } return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
  };

  // `IsConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-isconstructor
  var isConstructor = !construct$1 || fails(function () {
    var called;
    return isConstructorModern(isConstructorModern.call)
      || !isConstructorModern(Object)
      || !isConstructorModern(function () { called = true; })
      || called;
  }) ? isConstructorLegacy : isConstructorModern;

  var SPECIES = wellKnownSymbol('species');
  var Array$1 = global_1.Array;

  // a part of `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesConstructor = function (originalArray) {
    var C;
    if (isArray(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (isConstructor(C) && (C === Array$1 || isArray(C.prototype))) C = undefined;
      else if (isObject(C)) {
        C = C[SPECIES];
        if (C === null) C = undefined;
      }
    } return C === undefined ? Array$1 : C;
  };

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesCreate = function (originalArray, length) {
    return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
  };

  var push$2 = functionUncurryThis([].push);

  // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
  var createMethod = function (TYPE) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var IS_FILTER_REJECT = TYPE == 7;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject($this);
      var self = indexedObject(O);
      var boundFunction = functionBindContext(callbackfn, that);
      var length = lengthOfArrayLike(self);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate;
      var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
      var value, result;
      for (;length > index; index++) if (NO_HOLES || index in self) {
        value = self[index];
        result = boundFunction(value, index, O);
        if (TYPE) {
          if (IS_MAP) target[index] = result; // map
          else if (result) switch (TYPE) {
            case 3: return true;              // some
            case 5: return value;             // find
            case 6: return index;             // findIndex
            case 2: push$2(target, value);      // filter
          } else switch (TYPE) {
            case 4: return false;             // every
            case 7: push$2(target, value);      // filterReject
          }
        }
      }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
    };
  };

  var arrayIteration = {
    // `Array.prototype.forEach` method
    // https://tc39.es/ecma262/#sec-array.prototype.foreach
    forEach: createMethod(0),
    // `Array.prototype.map` method
    // https://tc39.es/ecma262/#sec-array.prototype.map
    map: createMethod(1),
    // `Array.prototype.filter` method
    // https://tc39.es/ecma262/#sec-array.prototype.filter
    filter: createMethod(2),
    // `Array.prototype.some` method
    // https://tc39.es/ecma262/#sec-array.prototype.some
    some: createMethod(3),
    // `Array.prototype.every` method
    // https://tc39.es/ecma262/#sec-array.prototype.every
    every: createMethod(4),
    // `Array.prototype.find` method
    // https://tc39.es/ecma262/#sec-array.prototype.find
    find: createMethod(5),
    // `Array.prototype.findIndex` method
    // https://tc39.es/ecma262/#sec-array.prototype.findIndex
    findIndex: createMethod(6),
    // `Array.prototype.filterReject` method
    // https://github.com/tc39/proposal-array-filtering
    filterReject: createMethod(7)
  };

  var $forEach = arrayIteration.forEach;

  var HIDDEN = sharedKey('hidden');
  var SYMBOL = 'Symbol';
  var PROTOTYPE = 'prototype';
  var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

  var setInternalState = internalState.set;
  var getInternalState = internalState.getterFor(SYMBOL);

  var ObjectPrototype$1 = Object[PROTOTYPE];
  var $Symbol = global_1.Symbol;
  var SymbolPrototype$1 = $Symbol && $Symbol[PROTOTYPE];
  var TypeError$2 = global_1.TypeError;
  var QObject = global_1.QObject;
  var $stringify = getBuiltIn('JSON', 'stringify');
  var nativeGetOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  var nativeDefineProperty = objectDefineProperty.f;
  var nativeGetOwnPropertyNames = objectGetOwnPropertyNamesExternal.f;
  var nativePropertyIsEnumerable = objectPropertyIsEnumerable.f;
  var push$1 = functionUncurryThis([].push);

  var AllSymbols = shared('symbols');
  var ObjectPrototypeSymbols = shared('op-symbols');
  var StringToSymbolRegistry = shared('string-to-symbol-registry');
  var SymbolToStringRegistry = shared('symbol-to-string-registry');
  var WellKnownSymbolsStore = shared('wks');

  // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
  var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

  // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
  var setSymbolDescriptor = descriptors && fails(function () {
    return objectCreate(nativeDefineProperty({}, 'a', {
      get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
    })).a != 7;
  }) ? function (O, P, Attributes) {
    var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype$1, P);
    if (ObjectPrototypeDescriptor) delete ObjectPrototype$1[P];
    nativeDefineProperty(O, P, Attributes);
    if (ObjectPrototypeDescriptor && O !== ObjectPrototype$1) {
      nativeDefineProperty(ObjectPrototype$1, P, ObjectPrototypeDescriptor);
    }
  } : nativeDefineProperty;

  var wrap = function (tag, description) {
    var symbol = AllSymbols[tag] = objectCreate(SymbolPrototype$1);
    setInternalState(symbol, {
      type: SYMBOL,
      tag: tag,
      description: description
    });
    if (!descriptors) symbol.description = description;
    return symbol;
  };

  var $defineProperty = function defineProperty(O, P, Attributes) {
    if (O === ObjectPrototype$1) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
    anObject(O);
    var key = toPropertyKey(P);
    anObject(Attributes);
    if (hasOwnProperty_1(AllSymbols, key)) {
      if (!Attributes.enumerable) {
        if (!hasOwnProperty_1(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
        O[HIDDEN][key] = true;
      } else {
        if (hasOwnProperty_1(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
        Attributes = objectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
      } return setSymbolDescriptor(O, key, Attributes);
    } return nativeDefineProperty(O, key, Attributes);
  };

  var $defineProperties = function defineProperties(O, Properties) {
    anObject(O);
    var properties = toIndexedObject(Properties);
    var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
    $forEach(keys, function (key) {
      if (!descriptors || functionCall($propertyIsEnumerable, properties, key)) $defineProperty(O, key, properties[key]);
    });
    return O;
  };

  var $create = function create(O, Properties) {
    return Properties === undefined ? objectCreate(O) : $defineProperties(objectCreate(O), Properties);
  };

  var $propertyIsEnumerable = function propertyIsEnumerable(V) {
    var P = toPropertyKey(V);
    var enumerable = functionCall(nativePropertyIsEnumerable, this, P);
    if (this === ObjectPrototype$1 && hasOwnProperty_1(AllSymbols, P) && !hasOwnProperty_1(ObjectPrototypeSymbols, P)) return false;
    return enumerable || !hasOwnProperty_1(this, P) || !hasOwnProperty_1(AllSymbols, P) || hasOwnProperty_1(this, HIDDEN) && this[HIDDEN][P]
      ? enumerable : true;
  };

  var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
    var it = toIndexedObject(O);
    var key = toPropertyKey(P);
    if (it === ObjectPrototype$1 && hasOwnProperty_1(AllSymbols, key) && !hasOwnProperty_1(ObjectPrototypeSymbols, key)) return;
    var descriptor = nativeGetOwnPropertyDescriptor(it, key);
    if (descriptor && hasOwnProperty_1(AllSymbols, key) && !(hasOwnProperty_1(it, HIDDEN) && it[HIDDEN][key])) {
      descriptor.enumerable = true;
    }
    return descriptor;
  };

  var $getOwnPropertyNames = function getOwnPropertyNames(O) {
    var names = nativeGetOwnPropertyNames(toIndexedObject(O));
    var result = [];
    $forEach(names, function (key) {
      if (!hasOwnProperty_1(AllSymbols, key) && !hasOwnProperty_1(hiddenKeys$1, key)) push$1(result, key);
    });
    return result;
  };

  var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
    var IS_OBJECT_PROTOTYPE = O === ObjectPrototype$1;
    var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
    var result = [];
    $forEach(names, function (key) {
      if (hasOwnProperty_1(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || hasOwnProperty_1(ObjectPrototype$1, key))) {
        push$1(result, AllSymbols[key]);
      }
    });
    return result;
  };

  // `Symbol` constructor
  // https://tc39.es/ecma262/#sec-symbol-constructor
  if (!nativeSymbol) {
    $Symbol = function Symbol() {
      if (objectIsPrototypeOf(SymbolPrototype$1, this)) throw TypeError$2('Symbol is not a constructor');
      var description = !arguments.length || arguments[0] === undefined ? undefined : toString_1(arguments[0]);
      var tag = uid(description);
      var setter = function (value) {
        if (this === ObjectPrototype$1) functionCall(setter, ObjectPrototypeSymbols, value);
        if (hasOwnProperty_1(this, HIDDEN) && hasOwnProperty_1(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
        setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
      };
      if (descriptors && USE_SETTER) setSymbolDescriptor(ObjectPrototype$1, tag, { configurable: true, set: setter });
      return wrap(tag, description);
    };

    SymbolPrototype$1 = $Symbol[PROTOTYPE];

    redefine(SymbolPrototype$1, 'toString', function toString() {
      return getInternalState(this).tag;
    });

    redefine($Symbol, 'withoutSetter', function (description) {
      return wrap(uid(description), description);
    });

    objectPropertyIsEnumerable.f = $propertyIsEnumerable;
    objectDefineProperty.f = $defineProperty;
    objectGetOwnPropertyDescriptor.f = $getOwnPropertyDescriptor;
    objectGetOwnPropertyNames.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames;
    objectGetOwnPropertySymbols.f = $getOwnPropertySymbols;

    wellKnownSymbolWrapped.f = function (name) {
      return wrap(wellKnownSymbol(name), name);
    };

    if (descriptors) {
      // https://github.com/tc39/proposal-Symbol-description
      nativeDefineProperty(SymbolPrototype$1, 'description', {
        configurable: true,
        get: function description() {
          return getInternalState(this).description;
        }
      });
      {
        redefine(ObjectPrototype$1, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
      }
    }
  }

  _export({ global: true, wrap: true, forced: !nativeSymbol, sham: !nativeSymbol }, {
    Symbol: $Symbol
  });

  $forEach(objectKeys(WellKnownSymbolsStore), function (name) {
    defineWellKnownSymbol(name);
  });

  _export({ target: SYMBOL, stat: true, forced: !nativeSymbol }, {
    // `Symbol.for` method
    // https://tc39.es/ecma262/#sec-symbol.for
    'for': function (key) {
      var string = toString_1(key);
      if (hasOwnProperty_1(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
      var symbol = $Symbol(string);
      StringToSymbolRegistry[string] = symbol;
      SymbolToStringRegistry[symbol] = string;
      return symbol;
    },
    // `Symbol.keyFor` method
    // https://tc39.es/ecma262/#sec-symbol.keyfor
    keyFor: function keyFor(sym) {
      if (!isSymbol(sym)) throw TypeError$2(sym + ' is not a symbol');
      if (hasOwnProperty_1(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
    },
    useSetter: function () { USE_SETTER = true; },
    useSimple: function () { USE_SETTER = false; }
  });

  _export({ target: 'Object', stat: true, forced: !nativeSymbol, sham: !descriptors }, {
    // `Object.create` method
    // https://tc39.es/ecma262/#sec-object.create
    create: $create,
    // `Object.defineProperty` method
    // https://tc39.es/ecma262/#sec-object.defineproperty
    defineProperty: $defineProperty,
    // `Object.defineProperties` method
    // https://tc39.es/ecma262/#sec-object.defineproperties
    defineProperties: $defineProperties,
    // `Object.getOwnPropertyDescriptor` method
    // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
    getOwnPropertyDescriptor: $getOwnPropertyDescriptor
  });

  _export({ target: 'Object', stat: true, forced: !nativeSymbol }, {
    // `Object.getOwnPropertyNames` method
    // https://tc39.es/ecma262/#sec-object.getownpropertynames
    getOwnPropertyNames: $getOwnPropertyNames,
    // `Object.getOwnPropertySymbols` method
    // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
    getOwnPropertySymbols: $getOwnPropertySymbols
  });

  // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
  // https://bugs.chromium.org/p/v8/issues/detail?id=3443
  _export({ target: 'Object', stat: true, forced: fails(function () { objectGetOwnPropertySymbols.f(1); }) }, {
    getOwnPropertySymbols: function getOwnPropertySymbols(it) {
      return objectGetOwnPropertySymbols.f(toObject(it));
    }
  });

  // `JSON.stringify` method behavior with symbols
  // https://tc39.es/ecma262/#sec-json.stringify
  if ($stringify) {
    var FORCED_JSON_STRINGIFY = !nativeSymbol || fails(function () {
      var symbol = $Symbol();
      // MS Edge converts symbol values to JSON as {}
      return $stringify([symbol]) != '[null]'
        // WebKit converts symbol values to JSON as null
        || $stringify({ a: symbol }) != '{}'
        // V8 throws on boxed symbols
        || $stringify(Object(symbol)) != '{}';
    });

    _export({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
      // eslint-disable-next-line no-unused-vars -- required for `.length`
      stringify: function stringify(it, replacer, space) {
        var args = arraySlice(arguments);
        var $replacer = replacer;
        if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
        if (!isArray(replacer)) replacer = function (key, value) {
          if (isCallable($replacer)) value = functionCall($replacer, this, key, value);
          if (!isSymbol(value)) return value;
        };
        args[1] = replacer;
        return functionApply($stringify, null, args);
      }
    });
  }

  // `Symbol.prototype[@@toPrimitive]` method
  // https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
  if (!SymbolPrototype$1[TO_PRIMITIVE]) {
    var valueOf = SymbolPrototype$1.valueOf;
    // eslint-disable-next-line no-unused-vars -- required for .length
    redefine(SymbolPrototype$1, TO_PRIMITIVE, function (hint) {
      // TODO: improve hint logic
      return functionCall(valueOf, this);
    });
  }
  // `Symbol.prototype[@@toStringTag]` property
  // https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
  setToStringTag($Symbol, SYMBOL);

  hiddenKeys$1[HIDDEN] = true;

  var defineProperty = objectDefineProperty.f;


  var NativeSymbol = global_1.Symbol;
  var SymbolPrototype = NativeSymbol && NativeSymbol.prototype;

  if (descriptors && isCallable(NativeSymbol) && (!('description' in SymbolPrototype) ||
    // Safari 12 bug
    NativeSymbol().description !== undefined
  )) {
    var EmptyStringDescriptionStore = {};
    // wrap Symbol constructor for correct work with undefined description
    var SymbolWrapper = function Symbol() {
      var description = arguments.length < 1 || arguments[0] === undefined ? undefined : toString_1(arguments[0]);
      var result = objectIsPrototypeOf(SymbolPrototype, this)
        ? new NativeSymbol(description)
        // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
        : description === undefined ? NativeSymbol() : NativeSymbol(description);
      if (description === '') EmptyStringDescriptionStore[result] = true;
      return result;
    };

    copyConstructorProperties(SymbolWrapper, NativeSymbol);
    SymbolWrapper.prototype = SymbolPrototype;
    SymbolPrototype.constructor = SymbolWrapper;

    var NATIVE_SYMBOL = String(NativeSymbol('test')) == 'Symbol(test)';
    var symbolToString = functionUncurryThis(SymbolPrototype.toString);
    var symbolValueOf = functionUncurryThis(SymbolPrototype.valueOf);
    var regexp = /^Symbol\((.*)\)[^)]+$/;
    var replace = functionUncurryThis(''.replace);
    var stringSlice = functionUncurryThis(''.slice);

    defineProperty(SymbolPrototype, 'description', {
      configurable: true,
      get: function description() {
        var symbol = symbolValueOf(this);
        var string = symbolToString(symbol);
        if (hasOwnProperty_1(EmptyStringDescriptionStore, symbol)) return '';
        var desc = NATIVE_SYMBOL ? stringSlice(string, 7, -1) : replace(string, regexp, '$1');
        return desc === '' ? undefined : desc;
      }
    });

    _export({ global: true, forced: true }, {
      Symbol: SymbolWrapper
    });
  }

  // `Object.prototype.toString` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  var objectToString = toStringTagSupport ? {}.toString : function toString() {
    return '[object ' + classof(this) + ']';
  };

  // `Object.prototype.toString` method
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  if (!toStringTagSupport) {
    redefine(Object.prototype, 'toString', objectToString, { unsafe: true });
  }

  var Function$1 = global_1.Function;
  var concat = functionUncurryThis([].concat);
  var join = functionUncurryThis([].join);
  var factories = {};

  var construct = function (C, argsLength, args) {
    if (!hasOwnProperty_1(factories, argsLength)) {
      for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
      factories[argsLength] = Function$1('C,a', 'return new C(' + join(list, ',') + ')');
    } return factories[argsLength](C, args);
  };

  // `Function.prototype.bind` method implementation
  // https://tc39.es/ecma262/#sec-function.prototype.bind
  var functionBind = Function$1.bind || function bind(that /* , ...args */) {
    var F = aCallable(this);
    var Prototype = F.prototype;
    var partArgs = arraySlice(arguments, 1);
    var boundFunction = function bound(/* args... */) {
      var args = concat(partArgs, arraySlice(arguments));
      return this instanceof boundFunction ? construct(F, args.length, args) : F.apply(that, args);
    };
    if (isObject(Prototype)) boundFunction.prototype = Prototype;
    return boundFunction;
  };

  var TypeError$1 = global_1.TypeError;

  // `Assert: IsConstructor(argument) is true`
  var aConstructor = function (argument) {
    if (isConstructor(argument)) return argument;
    throw TypeError$1(tryToString(argument) + ' is not a constructor');
  };

  var nativeConstruct = getBuiltIn('Reflect', 'construct');
  var ObjectPrototype = Object.prototype;
  var push = [].push;

  // `Reflect.construct` method
  // https://tc39.es/ecma262/#sec-reflect.construct
  // MS Edge supports only 2 arguments and argumentsList argument is optional
  // FF Nightly sets third argument as `new.target`, but does not create `this` from it
  var NEW_TARGET_BUG = fails(function () {
    function F() { /* empty */ }
    return !(nativeConstruct(function () { /* empty */ }, [], F) instanceof F);
  });

  var ARGS_BUG = !fails(function () {
    nativeConstruct(function () { /* empty */ });
  });

  var FORCED = NEW_TARGET_BUG || ARGS_BUG;

  _export({ target: 'Reflect', stat: true, forced: FORCED, sham: FORCED }, {
    construct: function construct(Target, args /* , newTarget */) {
      aConstructor(Target);
      anObject(args);
      var newTarget = arguments.length < 3 ? Target : aConstructor(arguments[2]);
      if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);
      if (Target == newTarget) {
        // w/o altered newTarget, optimization for 0-4 arguments
        switch (args.length) {
          case 0: return new Target();
          case 1: return new Target(args[0]);
          case 2: return new Target(args[0], args[1]);
          case 3: return new Target(args[0], args[1], args[2]);
          case 4: return new Target(args[0], args[1], args[2], args[3]);
        }
        // w/o altered newTarget, lot of arguments case
        var $args = [null];
        functionApply(push, $args, args);
        return new (functionApply(functionBind, Target, $args))();
      }
      // with altered newTarget, not support built-in constructors
      var proto = newTarget.prototype;
      var instance = objectCreate(isObject(proto) ? proto : ObjectPrototype);
      var result = functionApply(Target, instance, args);
      return isObject(result) ? result : instance;
    }
  });

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
  function init$1(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
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

  function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function add_css$4(target) {
    append_styles(target, "svelte-10sb7nx", ".charles-newsletter-done.svelte-10sb7nx.svelte-10sb7nx{background-color:#00c40a;color:white;padding:2rem}.charles-newsletter-done.svelte-10sb7nx h1.svelte-10sb7nx{font-size:3rem}.charles-newsletter-done.svelte-10sb7nx p.svelte-10sb7nx{font-size:1.5rem}.charles-newsletter-done.svelte-10sb7nx .content.svelte-10sb7nx{max-width:576px;margin:auto}");
  }

  function create_fragment$4(ctx) {
    var section;
    var div;
    var h1;
    var t0;
    var t1;
    var p;
    var t2;
    var mounted;
    var dispose;
    return {
      c: function c() {
        section = element("section");
        div = element("div");
        h1 = element("h1");
        t0 = text(
        /*successTitle*/
        ctx[0]);
        t1 = space();
        p = element("p");
        t2 = text(
        /*successDescription*/
        ctx[1]);
        attr(h1, "class", "text-5xl svelte-10sb7nx");
        attr(p, "class", "text-base svelte-10sb7nx");
        attr(div, "class", "content svelte-10sb7nx");
        attr(section, "class", "charles-newsletter-done svelte-10sb7nx");
      },
      m: function m(target, anchor) {
        insert(target, section, anchor);
        append(section, div);
        append(div, h1);
        append(h1, t0);
        append(div, t1);
        append(div, p);
        append(p, t2);

        if (!mounted) {
          dispose = listen(section, "click",
          /*click_handler*/
          ctx[3]);
          mounted = true;
        }
      },
      p: function p(ctx, _ref) {
        var _ref2 = _slicedToArray(_ref, 1),
            dirty = _ref2[0];

        if (dirty &
        /*successTitle*/
        1) set_data(t0,
        /*successTitle*/
        ctx[0]);
        if (dirty &
        /*successDescription*/
        2) set_data(t2,
        /*successDescription*/
        ctx[1]);
      },
      i: noop,
      o: noop,
      d: function d(detaching) {
        if (detaching) detach(section);
        mounted = false;
        dispose();
      }
    };
  }

  function instance$4($$self, $$props, $$invalidate) {
    var successTitle = $$props.successTitle;
    var successDescription = $$props.successDescription;
    var dispatch = createEventDispatcher();

    var click_handler = function click_handler() {
      return dispatch("click");
    };

    $$self.$$set = function ($$props) {
      if ('successTitle' in $$props) $$invalidate(0, successTitle = $$props.successTitle);
      if ('successDescription' in $$props) $$invalidate(1, successDescription = $$props.successDescription);
    };

    return [successTitle, successDescription, dispatch, click_handler];
  }

  var NewsletterOptInSuccess = /*#__PURE__*/function (_SvelteComponent) {
    _inherits(NewsletterOptInSuccess, _SvelteComponent);

    var _super = _createSuper$4(NewsletterOptInSuccess);

    function NewsletterOptInSuccess(options) {
      var _this;

      _classCallCheck(this, NewsletterOptInSuccess);

      _this = _super.call(this);
      init$1(_assertThisInitialized(_this), options, instance$4, create_fragment$4, safe_not_equal, {
        successTitle: 0,
        successDescription: 1
      }, add_css$4);
      return _this;
    }

    return NewsletterOptInSuccess;
  }(SvelteComponent);

  function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function add_css$3(target) {
    append_styles(target, "svelte-1ru8nfc", "button.svelte-1ru8nfc{box-sizing:border-box;padding:0.5rem 1.5rem;cursor:pointer;background-color:#00c40a;border-radius:2rem;border:none;color:white;height:2.5rem;display:flex;align-items:center;justify-content:center}");
  }

  function create_fragment$3(ctx) {
    var button;
    var current;
    var default_slot_template =
    /*#slots*/
    ctx[2].default;
    var default_slot = create_slot(default_slot_template, ctx,
    /*$$scope*/
    ctx[1], null);
    return {
      c: function c() {
        button = element("button");
        if (default_slot) default_slot.c();
        attr(button, "type",
        /*type*/
        ctx[0]);
        attr(button, "class", "svelte-1ru8nfc");
      },
      m: function m(target, anchor) {
        insert(target, button, anchor);

        if (default_slot) {
          default_slot.m(button, null);
        }

        current = true;
      },
      p: function p(ctx, _ref) {
        var _ref2 = _slicedToArray(_ref, 1),
            dirty = _ref2[0];

        if (default_slot) {
          if (default_slot.p && (!current || dirty &
          /*$$scope*/
          2)) {
            update_slot_base(default_slot, default_slot_template, ctx,
            /*$$scope*/
            ctx[1], !current ? get_all_dirty_from_scope(
            /*$$scope*/
            ctx[1]) : get_slot_changes(default_slot_template,
            /*$$scope*/
            ctx[1], dirty, null), null);
          }
        }

        if (!current || dirty &
        /*type*/
        1) {
          attr(button, "type",
          /*type*/
          ctx[0]);
        }
      },
      i: function i(local) {
        if (current) return;
        transition_in(default_slot, local);
        current = true;
      },
      o: function o(local) {
        transition_out(default_slot, local);
        current = false;
      },
      d: function d(detaching) {
        if (detaching) detach(button);
        if (default_slot) default_slot.d(detaching);
      }
    };
  }

  function instance$3($$self, $$props, $$invalidate) {
    var _$$props$$$slots = $$props.$$slots,
        slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
        $$scope = $$props.$$scope;
    var _$$props$type = $$props.type,
        type = _$$props$type === void 0 ? "button" : _$$props$type;

    $$self.$$set = function ($$props) {
      if ('type' in $$props) $$invalidate(0, type = $$props.type);
      if ('$$scope' in $$props) $$invalidate(1, $$scope = $$props.$$scope);
    };

    return [type, $$scope, slots];
  }

  var CtaButton = /*#__PURE__*/function (_SvelteComponent) {
    _inherits(CtaButton, _SvelteComponent);

    var _super = _createSuper$3(CtaButton);

    function CtaButton(options) {
      var _this;

      _classCallCheck(this, CtaButton);

      _this = _super.call(this);
      init$1(_assertThisInitialized(_this), options, instance$3, create_fragment$3, safe_not_equal, {
        type: 0
      }, add_css$3);
      return _this;
    }

    return CtaButton;
  }(SvelteComponent);

  function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function add_css$2(target) {
    append_styles(target, "svelte-pxuelf", ".satellite-checkbox.svelte-pxuelf.svelte-pxuelf.svelte-pxuelf{display:flex;text-align:left;margin-bottom:16px}.satellite-checkbox.svelte-pxuelf .container.svelte-pxuelf.svelte-pxuelf{display:block;position:relative;padding-left:35px;margin-bottom:12px;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;color:#ababab;width:fit-content;font-size:0.8rem}.satellite-checkbox.svelte-pxuelf .container input.svelte-pxuelf.svelte-pxuelf{position:absolute;opacity:0;cursor:pointer;height:0;width:0}.satellite-checkbox.svelte-pxuelf .checkmark.svelte-pxuelf.svelte-pxuelf{position:absolute;top:0;left:0;height:1.25rem;width:1.25rem;border-radius:0.25rem;background-color:#f3f3f3}.satellite-checkbox.svelte-pxuelf .container:hover input.svelte-pxuelf~.checkmark.svelte-pxuelf{background-color:#dadada}.satellite-checkbox.svelte-pxuelf .checkmark.svelte-pxuelf.svelte-pxuelf:after{content:\"\";position:absolute;display:none}.satellite-checkbox.svelte-pxuelf .container input.svelte-pxuelf:checked~.checkmark.svelte-pxuelf:after{display:block}.satellite-checkbox.svelte-pxuelf .container .checkmark.svelte-pxuelf.svelte-pxuelf:after{left:0.5rem;top:0.1rem;width:0.4rem;height:0.8rem;border:solid black;border-width:0 2px 2px 0;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg)}");
  }

  function create_fragment$2(ctx) {
    var div;
    var label;
    var t0;
    var input;
    var t1;
    var span;
    var current;
    var mounted;
    var dispose;
    var default_slot_template =
    /*#slots*/
    ctx[3].default;
    var default_slot = create_slot(default_slot_template, ctx,
    /*$$scope*/
    ctx[2], null);
    return {
      c: function c() {
        div = element("div");
        label = element("label");
        if (default_slot) default_slot.c();
        t0 = space();
        input = element("input");
        t1 = space();
        span = element("span");
        attr(input, "id",
        /*id*/
        ctx[1]);
        attr(input, "type", "checkbox");
        attr(input, "class", "svelte-pxuelf");
        attr(span, "class", "checkmark svelte-pxuelf");
        attr(label, "class", "container svelte-pxuelf");
        attr(label, "for",
        /*id*/
        ctx[1]);
        attr(div, "class", "satellite-checkbox svelte-pxuelf");
      },
      m: function m(target, anchor) {
        insert(target, div, anchor);
        append(div, label);

        if (default_slot) {
          default_slot.m(label, null);
        }

        append(label, t0);
        append(label, input);
        input.checked =
        /*checked*/
        ctx[0];
        append(label, t1);
        append(label, span);
        current = true;

        if (!mounted) {
          dispose = listen(input, "change",
          /*input_change_handler*/
          ctx[4]);
          mounted = true;
        }
      },
      p: function p(ctx, _ref) {
        var _ref2 = _slicedToArray(_ref, 1),
            dirty = _ref2[0];

        if (default_slot) {
          if (default_slot.p && (!current || dirty &
          /*$$scope*/
          4)) {
            update_slot_base(default_slot, default_slot_template, ctx,
            /*$$scope*/
            ctx[2], !current ? get_all_dirty_from_scope(
            /*$$scope*/
            ctx[2]) : get_slot_changes(default_slot_template,
            /*$$scope*/
            ctx[2], dirty, null), null);
          }
        }

        if (!current || dirty &
        /*id*/
        2) {
          attr(input, "id",
          /*id*/
          ctx[1]);
        }

        if (dirty &
        /*checked*/
        1) {
          input.checked =
          /*checked*/
          ctx[0];
        }

        if (!current || dirty &
        /*id*/
        2) {
          attr(label, "for",
          /*id*/
          ctx[1]);
        }
      },
      i: function i(local) {
        if (current) return;
        transition_in(default_slot, local);
        current = true;
      },
      o: function o(local) {
        transition_out(default_slot, local);
        current = false;
      },
      d: function d(detaching) {
        if (detaching) detach(div);
        if (default_slot) default_slot.d(detaching);
        mounted = false;
        dispose();
      }
    };
  }

  function instance$2($$self, $$props, $$invalidate) {
    var _$$props$$$slots = $$props.$$slots,
        slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
        $$scope = $$props.$$scope;
    var id = $$props.id;
    var checked = $$props.checked;

    function input_change_handler() {
      checked = this.checked;
      $$invalidate(0, checked);
    }

    $$self.$$set = function ($$props) {
      if ('id' in $$props) $$invalidate(1, id = $$props.id);
      if ('checked' in $$props) $$invalidate(0, checked = $$props.checked);
      if ('$$scope' in $$props) $$invalidate(2, $$scope = $$props.$$scope);
    };

    return [checked, id, $$scope, slots, input_change_handler];
  }

  var BaseCheckbox = /*#__PURE__*/function (_SvelteComponent) {
    _inherits(BaseCheckbox, _SvelteComponent);

    var _super = _createSuper$2(BaseCheckbox);

    function BaseCheckbox(options) {
      var _this;

      _classCallCheck(this, BaseCheckbox);

      _this = _super.call(this);
      init$1(_assertThisInitialized(_this), options, instance$2, create_fragment$2, safe_not_equal, {
        id: 1,
        checked: 0
      }, add_css$2);
      return _this;
    }

    return BaseCheckbox;
  }(SvelteComponent);

  function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function add_css$1(target) {
    append_styles(target, "svelte-17fo3ti", "input.svelte-17fo3ti{padding:0.5rem;background-color:#f3f3f3;border:none;margin-bottom:16px;height:2.5rem;border-radius:0.25rem;font-size:0.75rem}");
  }

  function create_fragment$1(ctx) {
    var input;
    var mounted;
    var dispose;
    return {
      c: function c() {
        input = element("input");
        attr(input, "type",
        /*type*/
        ctx[1]);
        attr(input, "placeholder",
        /*placeholder*/
        ctx[2]);
        input.value =
        /*value*/
        ctx[0];
        attr(input, "class", "svelte-17fo3ti");
      },
      m: function m(target, anchor) {
        insert(target, input, anchor);

        if (!mounted) {
          dispose = listen(input, "input",
          /*onInput*/
          ctx[3]);
          mounted = true;
        }
      },
      p: function p(ctx, _ref) {
        var _ref2 = _slicedToArray(_ref, 1),
            dirty = _ref2[0];

        if (dirty &
        /*type*/
        2) {
          attr(input, "type",
          /*type*/
          ctx[1]);
        }

        if (dirty &
        /*placeholder*/
        4) {
          attr(input, "placeholder",
          /*placeholder*/
          ctx[2]);
        }

        if (dirty &
        /*value*/
        1 && input.value !==
        /*value*/
        ctx[0]) {
          input.value =
          /*value*/
          ctx[0];
        }
      },
      i: noop,
      o: noop,
      d: function d(detaching) {
        if (detaching) detach(input);
        mounted = false;
        dispose();
      }
    };
  }

  function instance$1($$self, $$props, $$invalidate) {
    var _$$props$type = $$props.type,
        type = _$$props$type === void 0 ? "text" : _$$props$type;
    var placeholder = $$props.placeholder;
    var value = $$props.value;

    var onInput = function onInput(ev) {
      return $$invalidate(0, value = ev.target.value);
    };

    $$self.$$set = function ($$props) {
      if ('type' in $$props) $$invalidate(1, type = $$props.type);
      if ('placeholder' in $$props) $$invalidate(2, placeholder = $$props.placeholder);
      if ('value' in $$props) $$invalidate(0, value = $$props.value);
    };

    return [value, type, placeholder, onInput];
  }

  var BaseInput = /*#__PURE__*/function (_SvelteComponent) {
    _inherits(BaseInput, _SvelteComponent);

    var _super = _createSuper$1(BaseInput);

    function BaseInput(options) {
      var _this;

      _classCallCheck(this, BaseInput);

      _this = _super.call(this);
      init$1(_assertThisInitialized(_this), options, instance$1, create_fragment$1, safe_not_equal, {
        type: 1,
        placeholder: 2,
        value: 0
      }, add_css$1);
      return _this;
    }

    return BaseInput;
  }(SvelteComponent);

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function add_css(target) {
    append_styles(target, "svelte-ltwhj4", ".svelte-ltwhj4.svelte-ltwhj4,.svelte-ltwhj4.svelte-ltwhj4:before,.svelte-ltwhj4.svelte-ltwhj4:after{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;font-family:Arial, Helvetica, sans-serif;margin:0}.gap.svelte-ltwhj4.svelte-ltwhj4{margin-bottom:1rem}.center.svelte-ltwhj4.svelte-ltwhj4{display:flex;align-items:center;justify-content:center}.text-sm.svelte-ltwhj4.svelte-ltwhj4{font-size:0.75rem}.charles-newsletter.svelte-ltwhj4.svelte-ltwhj4{box-shadow:0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);border-radius:0.5rem;text-align:center;background-color:white;margin:2px}.charles-newsletter.svelte-ltwhj4 h1.svelte-ltwhj4{font-size:1rem;margin-bottom:8px;font-weight:bold}.charles-newsletter-form.svelte-ltwhj4.svelte-ltwhj4{display:flex;flex-direction:column;max-width:576px;padding:3rem;margin:auto}");
  } // (60:2) {:else}


  function create_else_block(ctx) {
    var newsletteroptinsuccess;
    var current;
    newsletteroptinsuccess = new NewsletterOptInSuccess({
      props: {
        successTitle:
        /*successTitle*/
        ctx[7],
        successDescription:
        /*successDescription*/
        ctx[8]
      }
    });
    newsletteroptinsuccess.$on("click",
    /*onClickSuccess*/
    ctx[14]);
    return {
      c: function c() {
        create_component(newsletteroptinsuccess.$$.fragment);
      },
      m: function m(target, anchor) {
        mount_component(newsletteroptinsuccess, target, anchor);
        current = true;
      },
      p: function p(ctx, dirty) {
        var newsletteroptinsuccess_changes = {};
        if (dirty &
        /*successTitle*/
        128) newsletteroptinsuccess_changes.successTitle =
        /*successTitle*/
        ctx[7];
        if (dirty &
        /*successDescription*/
        256) newsletteroptinsuccess_changes.successDescription =
        /*successDescription*/
        ctx[8];
        newsletteroptinsuccess.$set(newsletteroptinsuccess_changes);
      },
      i: function i(local) {
        if (current) return;
        transition_in(newsletteroptinsuccess.$$.fragment, local);
        current = true;
      },
      o: function o(local) {
        transition_out(newsletteroptinsuccess.$$.fragment, local);
        current = false;
      },
      d: function d(detaching) {
        destroy_component(newsletteroptinsuccess, detaching);
      }
    };
  } // (41:2) {#if !isDone}


  function create_if_block(ctx) {
    var form;
    var h1;
    var t0;
    var t1;
    var p;
    var t2;
    var t3;
    var cinput0;
    var updating_value;
    var t4;
    var cinput1;
    var updating_value_1;
    var t5;
    var ccheckbox;
    var updating_checked;
    var t6;
    var div;
    var ctabutton;
    var current;
    var mounted;
    var dispose;

    function cinput0_value_binding(value) {
      /*cinput0_value_binding*/
      ctx[17](value);
    }

    var cinput0_props = {
      type: "text",
      placeholder:
      /*namePlaceholder*/
      ctx[5]
    };

    if (
    /*name*/
    ctx[10] !== void 0) {
      cinput0_props.value =
      /*name*/
      ctx[10];
    }

    cinput0 = new BaseInput({
      props: cinput0_props
    });
    binding_callbacks.push(function () {
      return bind(cinput0, 'value', cinput0_value_binding);
    });

    function cinput1_value_binding(value) {
      /*cinput1_value_binding*/
      ctx[18](value);
    }

    var cinput1_props = {
      type: "tel",
      placeholder:
      /*phoneNrPlaceholder*/
      ctx[6]
    };

    if (
    /*phone*/
    ctx[11] !== void 0) {
      cinput1_props.value =
      /*phone*/
      ctx[11];
    }

    cinput1 = new BaseInput({
      props: cinput1_props
    });
    binding_callbacks.push(function () {
      return bind(cinput1, 'value', cinput1_value_binding);
    });

    function ccheckbox_checked_binding(value) {
      /*ccheckbox_checked_binding*/
      ctx[19](value);
    }

    var ccheckbox_props = {
      id: "agreed",
      $$slots: {
        default: [create_default_slot_1]
      },
      $$scope: {
        ctx: ctx
      }
    };

    if (
    /*hasAgreed*/
    ctx[12] !== void 0) {
      ccheckbox_props.checked =
      /*hasAgreed*/
      ctx[12];
    }

    ccheckbox = new BaseCheckbox({
      props: ccheckbox_props
    });
    binding_callbacks.push(function () {
      return bind(ccheckbox, 'checked', ccheckbox_checked_binding);
    });
    ctabutton = new CtaButton({
      props: {
        type: "submit",
        $$slots: {
          default: [create_default_slot]
        },
        $$scope: {
          ctx: ctx
        }
      }
    });
    return {
      c: function c() {
        form = element("form");
        h1 = element("h1");
        t0 = text(
        /*title*/
        ctx[0]);
        t1 = space();
        p = element("p");
        t2 = text(
        /*description*/
        ctx[1]);
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
      m: function m(target, anchor) {
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
          dispose = listen(form, "submit", prevent_default(
          /*onSubmit*/
          ctx[13]));
          mounted = true;
        }
      },
      p: function p(ctx, dirty) {
        if (!current || dirty &
        /*title*/
        1) set_data(t0,
        /*title*/
        ctx[0]);
        if (!current || dirty &
        /*description*/
        2) set_data(t2,
        /*description*/
        ctx[1]);
        var cinput0_changes = {};
        if (dirty &
        /*namePlaceholder*/
        32) cinput0_changes.placeholder =
        /*namePlaceholder*/
        ctx[5];

        if (!updating_value && dirty &
        /*name*/
        1024) {
          updating_value = true;
          cinput0_changes.value =
          /*name*/
          ctx[10];
          add_flush_callback(function () {
            return updating_value = false;
          });
        }

        cinput0.$set(cinput0_changes);
        var cinput1_changes = {};
        if (dirty &
        /*phoneNrPlaceholder*/
        64) cinput1_changes.placeholder =
        /*phoneNrPlaceholder*/
        ctx[6];

        if (!updating_value_1 && dirty &
        /*phone*/
        2048) {
          updating_value_1 = true;
          cinput1_changes.value =
          /*phone*/
          ctx[11];
          add_flush_callback(function () {
            return updating_value_1 = false;
          });
        }

        cinput1.$set(cinput1_changes);
        var ccheckbox_changes = {};

        if (dirty &
        /*$$scope, privacyPolicyLink, legalText*/
        1048588) {
          ccheckbox_changes.$$scope = {
            dirty: dirty,
            ctx: ctx
          };
        }

        if (!updating_checked && dirty &
        /*hasAgreed*/
        4096) {
          updating_checked = true;
          ccheckbox_changes.checked =
          /*hasAgreed*/
          ctx[12];
          add_flush_callback(function () {
            return updating_checked = false;
          });
        }

        ccheckbox.$set(ccheckbox_changes);
        var ctabutton_changes = {};

        if (dirty &
        /*$$scope, ctaButtonLabel*/
        1048592) {
          ctabutton_changes.$$scope = {
            dirty: dirty,
            ctx: ctx
          };
        }

        ctabutton.$set(ctabutton_changes);
      },
      i: function i(local) {
        if (current) return;
        transition_in(cinput0.$$.fragment, local);
        transition_in(cinput1.$$.fragment, local);
        transition_in(ccheckbox.$$.fragment, local);
        transition_in(ctabutton.$$.fragment, local);
        current = true;
      },
      o: function o(local) {
        transition_out(cinput0.$$.fragment, local);
        transition_out(cinput1.$$.fragment, local);
        transition_out(ccheckbox.$$.fragment, local);
        transition_out(ctabutton.$$.fragment, local);
        current = false;
      },
      d: function d(detaching) {
        if (detaching) detach(form);
        destroy_component(cinput0);
        destroy_component(cinput1);
        destroy_component(ccheckbox);
        destroy_component(ctabutton);
        mounted = false;
        dispose();
      }
    };
  } // (49:6) <CCheckbox id="agreed" bind:checked={hasAgreed}>


  function create_default_slot_1(ctx) {
    var span;
    var t0;
    var t1;
    var a;
    var t2;
    return {
      c: function c() {
        span = element("span");
        t0 = text(
        /*legalText*/
        ctx[2]);
        t1 = space();
        a = element("a");
        t2 = text("Link");
        attr(a, "href",
        /*privacyPolicyLink*/
        ctx[3]);
        attr(a, "target", "_blank");
        attr(a, "class", "svelte-ltwhj4");
        attr(span, "class", "text-sm svelte-ltwhj4");
      },
      m: function m(target, anchor) {
        insert(target, span, anchor);
        append(span, t0);
        append(span, t1);
        append(span, a);
        append(a, t2);
      },
      p: function p(ctx, dirty) {
        if (dirty &
        /*legalText*/
        4) set_data(t0,
        /*legalText*/
        ctx[2]);

        if (dirty &
        /*privacyPolicyLink*/
        8) {
          attr(a, "href",
          /*privacyPolicyLink*/
          ctx[3]);
        }
      },
      d: function d(detaching) {
        if (detaching) detach(span);
      }
    };
  } // (57:8) <CtaButton type="submit">


  function create_default_slot(ctx) {
    var t;
    return {
      c: function c() {
        t = text(
        /*ctaButtonLabel*/
        ctx[4]);
      },
      m: function m(target, anchor) {
        insert(target, t, anchor);
      },
      p: function p(ctx, dirty) {
        if (dirty &
        /*ctaButtonLabel*/
        16) set_data(t,
        /*ctaButtonLabel*/
        ctx[4]);
      },
      d: function d(detaching) {
        if (detaching) detach(t);
      }
    };
  }

  function create_fragment(ctx) {
    var div;
    var current_block_type_index;
    var if_block;
    var current;
    var if_block_creators = [create_if_block, create_else_block];
    var if_blocks = [];

    function select_block_type(ctx, dirty) {
      if (!
      /*isDone*/
      ctx[9]) return 0;
      return 1;
    }

    current_block_type_index = select_block_type(ctx);
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    return {
      c: function c() {
        div = element("div");
        if_block.c();
        attr(div, "class", "charles-newsletter svelte-ltwhj4");
      },
      m: function m(target, anchor) {
        insert(target, div, anchor);
        if_blocks[current_block_type_index].m(div, null);
        current = true;
      },
      p: function p(ctx, _ref) {
        var _ref2 = _slicedToArray(_ref, 1),
            dirty = _ref2[0];

        var previous_block_index = current_block_type_index;
        current_block_type_index = select_block_type(ctx);

        if (current_block_type_index === previous_block_index) {
          if_blocks[current_block_type_index].p(ctx, dirty);
        } else {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, function () {
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
      i: function i(local) {
        if (current) return;
        transition_in(if_block);
        current = true;
      },
      o: function o(local) {
        transition_out(if_block);
        current = false;
      },
      d: function d(detaching) {
        if (detaching) detach(div);
        if_blocks[current_block_type_index].d();
      }
    };
  }

  function instance($$self, $$props, $$invalidate) {
    var _$$props$isPreview = $$props.isPreview,
        isPreview = _$$props$isPreview === void 0 ? false : _$$props$isPreview;
    var submitHandler = $$props.submitHandler;
    var _$$props$title = $$props.title,
        title = _$$props$title === void 0 ? "Get our Whatsapp Newsletter" : _$$props$title;
    var _$$props$description = $$props.description,
        description = _$$props$description === void 0 ? "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure aliquid repellat quisquam non molestiae, unde libero cupiditate quia" : _$$props$description;
    var _$$props$legalText = $$props.legalText,
        legalText = _$$props$legalText === void 0 ? "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure aliquid repellat quisquam non molestiae, unde libero cupiditate quia" : _$$props$legalText;
    var _$$props$privacyPolic = $$props.privacyPolicyLink,
        privacyPolicyLink = _$$props$privacyPolic === void 0 ? "https://hello-charles.com" : _$$props$privacyPolic;
    var _$$props$ctaButtonLab = $$props.ctaButtonLabel,
        ctaButtonLabel = _$$props$ctaButtonLab === void 0 ? "Submit" : _$$props$ctaButtonLab;
    var _$$props$namePlacehol = $$props.namePlaceholder,
        namePlaceholder = _$$props$namePlacehol === void 0 ? "Your Name" : _$$props$namePlacehol;
    var _$$props$phoneNrPlace = $$props.phoneNrPlaceholder,
        phoneNrPlaceholder = _$$props$phoneNrPlace === void 0 ? "Your Phone Number" : _$$props$phoneNrPlace;
    var _$$props$successTitle = $$props.successTitle,
        successTitle = _$$props$successTitle === void 0 ? "Thanks a lot! 🥳" : _$$props$successTitle;
    var _$$props$successDescr = $$props.successDescription,
        successDescription = _$$props$successDescr === void 0 ? "We have successfully opted-in to stay in touch with us on WhatsApp. We're excited to have you!" : _$$props$successDescr;
    var isDone = false;
    var name = "";
    var phone = "";
    var hasAgreed = false;

    var onSubmit = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
        var _submitHandler;

        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!isPreview) {
                  _context.next = 3;
                  break;
                }

                $$invalidate(9, isDone = true);
                return _context.abrupt("return");

              case 3:
                console.log("{ name, phoneNumber: phone, hasAgreed }", {
                  name: name,
                  phoneNumber: phone,
                  hasAgreed: hasAgreed
                });
                _context.next = 6;
                return (_submitHandler = submitHandler) === null || _submitHandler === void 0 ? void 0 : _submitHandler({
                  name: name,
                  phoneNumber: phone,
                  hasAgreed: hasAgreed
                });

              case 6:
                $$invalidate(9, isDone = true);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function onSubmit() {
        return _ref3.apply(this, arguments);
      };
    }();

    var onClickSuccess = function onClickSuccess() {
      if (isPreview) {
        $$invalidate(9, isDone = false);
      }
    };

    function cinput0_value_binding(value) {
      name = value;
      $$invalidate(10, name);
    }

    function cinput1_value_binding(value) {
      phone = value;
      $$invalidate(11, phone);
    }

    function ccheckbox_checked_binding(value) {
      hasAgreed = value;
      $$invalidate(12, hasAgreed);
    }

    $$self.$$set = function ($$props) {
      if ('isPreview' in $$props) $$invalidate(15, isPreview = $$props.isPreview);
      if ('submitHandler' in $$props) $$invalidate(16, submitHandler = $$props.submitHandler);
      if ('title' in $$props) $$invalidate(0, title = $$props.title);
      if ('description' in $$props) $$invalidate(1, description = $$props.description);
      if ('legalText' in $$props) $$invalidate(2, legalText = $$props.legalText);
      if ('privacyPolicyLink' in $$props) $$invalidate(3, privacyPolicyLink = $$props.privacyPolicyLink);
      if ('ctaButtonLabel' in $$props) $$invalidate(4, ctaButtonLabel = $$props.ctaButtonLabel);
      if ('namePlaceholder' in $$props) $$invalidate(5, namePlaceholder = $$props.namePlaceholder);
      if ('phoneNrPlaceholder' in $$props) $$invalidate(6, phoneNrPlaceholder = $$props.phoneNrPlaceholder);
      if ('successTitle' in $$props) $$invalidate(7, successTitle = $$props.successTitle);
      if ('successDescription' in $$props) $$invalidate(8, successDescription = $$props.successDescription);
    };

    return [title, description, legalText, privacyPolicyLink, ctaButtonLabel, namePlaceholder, phoneNrPlaceholder, successTitle, successDescription, isDone, name, phone, hasAgreed, onSubmit, onClickSuccess, isPreview, submitHandler, cinput0_value_binding, cinput1_value_binding, ccheckbox_checked_binding];
  }

  var NewsletterOptIn = /*#__PURE__*/function (_SvelteComponent) {
    _inherits(NewsletterOptIn, _SvelteComponent);

    var _super = _createSuper(NewsletterOptIn);

    function NewsletterOptIn(options) {
      var _this;

      _classCallCheck(this, NewsletterOptIn);

      _this = _super.call(this);
      init$1(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {
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
      return _this;
    }

    return NewsletterOptIn;
  }(SvelteComponent);

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

  console.log("document.currentScript", document.currentScript);
  let integrationConfig = window?.["_chIntCnf"];
  if (document.currentScript) {
      const src = document.currentScript.src;
      if (!integrationConfig) {
          integrationConfig = {};
      }
      const query = queryString_4(src).query;
      integrationConfig = {
          ...integrationConfig,
          vendor: query.vendor,
          scriptId: query.script_id,
          universeUri: query.universe_uri,
      };
  }
  console.log("integrationConfig", integrationConfig);
  const init = async ({ scriptId, universeUri }) => {
      const config = await (await fetch(`${universeUri}/api/v0/storefronts/scripts/${scriptId}/public/config`)).json();
      const { newsletter_opt_in: { title, description, selector }, } = config;
      // Selectors are sent without brackets, so they need to be attached
      const cleanSelector = `[${selector}]`;
      const targets = document.querySelectorAll(cleanSelector);
      const submitHandler = async ({ name, phoneNumber, hasAgreed }) => {
          const payload = {
              name,
              phone_number: phoneNumber,
              legal_opt_in: hasAgreed,
          };
          const res = await fetch(
          // `${universeUri}/api/v0/storefronts/scripts/${scriptId}/public/api/v0/message_subscriptions/from_newsletter_opt_in`,
          `http://localhost:3000/api/v0/storefronts/scripts/${scriptId}/public/api/v0/message_subscriptions/from_external_newsletter_opt_in`, {
              method: "POST",
              body: JSON.stringify(payload),
              headers: {
                  "Content-Type": "application/json",
              },
          });
          console.log("res", res);
          return res;
      };
      var iframe = document.createElement("iframe");
      iframe.onload = (ev) => {
          new NewsletterOptIn({
              target: iframe.contentWindow.document.body,
              props: {
                  title,
                  description,
                  submitHandler,
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
  init(integrationConfig);

  return NewsletterOptIn;

})();
