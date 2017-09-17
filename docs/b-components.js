/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const mixins = {
	props: ['value']
};
/* harmony default export */ __webpack_exports__["a"] = (mixins);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_component__ = __webpack_require__(1);

/* harmony default export */ __webpack_exports__["a"] = ({
    data() {
        return {
            checkedStore: false
        };
    },
    mixins: [__WEBPACK_IMPORTED_MODULE_0__base_component__["a" /* default */]],
    props: ['class-name', 'disabled', 'id', 'label', 'checked', 'name', 'bind-value'],
    created() {
        this.updateUIByModel();
    },
    computed: {
        classes() {
            return (this.className ? this.className : '') + ' checkbox__input';
        },
        isChecked: {
            cache: false,
            get() {
                return this.checkedStore;
            }
        }
    },
    watch: {
        value: {
            handler(oldValue, newValue) {
                this.updateUIByModel();
            },
            deep: true
        }
    },
    methods: {
        uniqueArray(array) {
            var result = array.filter(function (item, pos) {
                return array.indexOf(item) == pos;
            });
            return result;
        },
        updateUIByModel() {
            if (this.value != undefined || this.value == null) {
                // if this have model, we will compare model and bind-value
                if (this.bindValue && Array.isArray(this.value)) {
                    this.checkedStore = this.value.indexOf(this.bindValue) >= 0;
                    return;
                }
                this.checkedStore = this.value;
            } else {
                console.error('[B-Components] Checkbox component must assign the model');
                this.checkedStore = false;
            }
        },
        update() {
            console.log('Test');
            if (Array.isArray(this.value)) {
                // $emit array to outside model
                if (this.checkedStore) {
                    // Model already have value 
                    this.value.splice(this.value.indexOf(this.bindValue), 1);
                    this.checkedStore = false;
                } else {
                    this.value.push(this.bindValue);
                    this.checkedStore = true;
                }
                this.$emit('input', this.value);
            } else {
                if (this.value) {
                    this.$emit('input', false);
                } else this.$emit('input', true);
            }
        }
    }

});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(10),
  /* template */
  __webpack_require__(24),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/minh.truong/Documents/sources/b-components/src/themes/ios/CheckBox.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] CheckBox.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-43455a5f", Component.options)
  } else {
    hotAPI.reload("data-v-43455a5f", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(11),
  /* template */
  __webpack_require__(28),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/minh.truong/Documents/sources/b-components/src/themes/ios/Radio.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Radio.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-baf57422", Component.options)
  } else {
    hotAPI.reload("data-v-baf57422", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(12),
  /* template */
  __webpack_require__(23),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/minh.truong/Documents/sources/b-components/src/themes/ios/Rating.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Rating.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2d83f459", Component.options)
  } else {
    hotAPI.reload("data-v-2d83f459", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(13),
  /* template */
  __webpack_require__(25),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/minh.truong/Documents/sources/b-components/src/themes/ios/Select.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Select.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4e2eb038", Component.options)
  } else {
    hotAPI.reload("data-v-4e2eb038", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(14),
  /* template */
  __webpack_require__(29),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/minh.truong/Documents/sources/b-components/src/themes/ios/Switch.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Switch.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c7a15320", Component.options)
  } else {
    hotAPI.reload("data-v-c7a15320", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(15),
  /* template */
  __webpack_require__(27),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/minh.truong/Documents/sources/b-components/src/themes/ios/TextField.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] TextField.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6da7cac1", Component.options)
  } else {
    hotAPI.reload("data-v-6da7cac1", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(16),
  /* template */
  __webpack_require__(26),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/minh.truong/Documents/sources/b-components/src/themes/ios/Textarea.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Textarea.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-69266b14", Component.options)
  } else {
    hotAPI.reload("data-v-69266b14", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_CheckBox__ = __webpack_require__(2);
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__components_CheckBox__["a" /* default */]);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Radio__ = __webpack_require__(17);
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__components_Radio__["a" /* default */]);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Rating__ = __webpack_require__(18);
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__components_Rating__["a" /* default */]);

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Select__ = __webpack_require__(19);
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__components_Select__["a" /* default */]);

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_CheckBox__ = __webpack_require__(2);
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
	mixins: [__WEBPACK_IMPORTED_MODULE_0__components_CheckBox__["a" /* default */]],
	computed: {
		classes() {
			return (this.className ? this.className : '') + ' switch__input';
		}
	}
});

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_TextField__ = __webpack_require__(20);
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__components_TextField__["a" /* default */]);

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Textarea__ = __webpack_require__(21);
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__components_Textarea__["a" /* default */]);

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_component__ = __webpack_require__(1);

/* harmony default export */ __webpack_exports__["a"] = ({
	mixins: [__WEBPACK_IMPORTED_MODULE_0__base_component__["a" /* default */]],
	props: ['disabled', 'name', 'id', 'label', 'class-name'],
	computed: {
		isCheck() {
			if (this.value == this.$attrs.value) return true;else return false;
		}
	},
	methods: {
		update() {
			if (this.$refs.bRadio.checked) this.$emit('input', this.$attrs.value);
		}
	}

});

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_component__ = __webpack_require__(1);

/* harmony default export */ __webpack_exports__["a"] = ({
	mixins: [__WEBPACK_IMPORTED_MODULE_0__base_component__["a" /* default */]],
	props: ['disabled', 'name', 'id', 'label', 'class-name', 'rate-max'],
	computed: {
		listRate() {
			if (this.rateMax == undefined || this.rateMax == null) return [1, 2, 3, 4, 5];

			let list = [];
			for (let i = 1; i <= parseInt(this.rateMax); i++) list.push(i);
			return list;
		},
		rate() {
			if (this.value == undefined || this.value == null) return 0;else return parseInt(this.value);
		},
		classes() {
			let classStar = this.className ? this.className : '';
			classStar += this.rate >= this.listRate.length ? ' full' : '';
			return classStar + ' rating__input';
		}
	},
	methods: {
		update(rate) {
			if (this.disabled != 'disabled') this.$emit('input', rate);
		}
	}

});

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_component__ = __webpack_require__(1);


/* harmony default export */ __webpack_exports__["a"] = ({
	data() {
		return {
			isActive: false
		};
	},
	mixins: [__WEBPACK_IMPORTED_MODULE_0__base_component__["a" /* default */]],
	mounted() {
		this.float();
	},
	props: ['id', 'default', 'label', 'name', 'disabled', 'list', 'item-text', 'item-val', 'class-name', 'placeholder'],
	computed: {
		selected: {
			get() {
				this.float();
				return this.value;
			},
			set(newValue) {}
		},
		items() {
			if (this.list == undefined || this.list == null || this.list.length == 0) {
				if (this.default != undefined && this.default != null) {
					return [this.default];
				}
				return [{ value: '', name: '' }];
			}

			let items = [];
			for (let i = 0; i < this.list.length; i++) {
				let listItem = this.list[i];
				let item = {
					value: listItem[this.itemVal],
					name: listItem[this.itemText]
				};
				items.push(item);
			}

			return items;
		}
	},
	methods: {
		update(val) {
			this.$emit('input', val);
			this.float();
		},
		float() {
			if (this.$el == undefined || this.value == null || this.value.length == 0) {
				this.isActive = false;
				return;
			}

			if (this.isModelInList()) {
				this.isActive = true;
				return;
			}

			this.isActive = false;
		},
		isModelInList() {
			var found = false;
			for (var i = 0; i < this.items.length; i++) {
				var item = this.items[i];
				if (item.value.toString() == this.value.toString()) {
					found = true;
					break;
				}
			}
			return found;
		}
	}

});

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_component__ = __webpack_require__(1);

/* harmony default export */ __webpack_exports__["a"] = ({
	data() {
		return {
			classLabel: '',
			objModel: this.value
		};
	},
	mixins: [__WEBPACK_IMPORTED_MODULE_0__base_component__["a" /* default */]],
	props: ['disabled', 'placeholder', 'label', 'class-name', 'name', 'id', 'type'],

	computed: {
		classes() {
			return (this.className ? this.className : '') + " b__input";
		},
		typeComponent() {
			if (this.type == undefined || this.type == null || this.type.length == 0) return 'text';
			return this.type;
		}
	},
	watch: {
		value(newValue) {
			this.change(newValue);
		}
	},
	mounted() {
		this.change(this.value);
	},
	methods: {
		change(value) {
			this.updateChange(value);
		},
		updateChange(value) {
			var isEmpty = value == undefined || value == null || value.length == 0 ? true : false;
			if (!isEmpty) {
				this.classLabel = 'active';
			} else this.classLabel = '';
			this.objModel = value;

			this.$emit('input', value);
		}
	}
});

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_component__ = __webpack_require__(1);


/* harmony default export */ __webpack_exports__["a"] = ({
	data() {
		return {
			classLabel: '',
			text: ''
		};
	},
	mixins: [__WEBPACK_IMPORTED_MODULE_0__base_component__["a" /* default */]],
	props: ['value', 'disabled', 'placeholder', 'label', 'cols', 'rows', 'class-name', 'id', 'name'],
	mounted() {
		this.change(this.value);
	},
	watch: {
		value(value) {
			this.updateChange(value);
		}
	},
	methods: {
		change(value) {
			this.updateChange(value);
		},
		updateChange(value) {
			var isEmpty = value == undefined || value == null || value.length == 0 ? true : false;
			if (!isEmpty) this.classLabel = 'active';else this.classLabel = '';

			this.text = value;
			this.$el.querySelector('textarea').value = this.text;
			if (value == undefined || value == null) this.$el.querySelector('textarea').value = '';

			this.$emit('input', value);
		}
	}
});

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__themes_ios_TextField_vue__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__themes_ios_TextField_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__themes_ios_TextField_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__themes_ios_CheckBox_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__themes_ios_CheckBox_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__themes_ios_CheckBox_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__themes_ios_Radio_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__themes_ios_Radio_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__themes_ios_Radio_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__themes_ios_Switch_vue__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__themes_ios_Switch_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__themes_ios_Switch_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__themes_ios_Select_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__themes_ios_Select_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__themes_ios_Select_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__themes_ios_Textarea_vue__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__themes_ios_Textarea_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__themes_ios_Textarea_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__themes_ios_Rating_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__themes_ios_Rating_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__themes_ios_Rating_vue__);








Vue.component('BTextField', __WEBPACK_IMPORTED_MODULE_0__themes_ios_TextField_vue___default.a);
Vue.component('BCheckBox', __WEBPACK_IMPORTED_MODULE_1__themes_ios_CheckBox_vue___default.a);
Vue.component('BRadio', __WEBPACK_IMPORTED_MODULE_2__themes_ios_Radio_vue___default.a);
Vue.component('BSwitch', __WEBPACK_IMPORTED_MODULE_3__themes_ios_Switch_vue___default.a);
Vue.component('BSelect', __WEBPACK_IMPORTED_MODULE_4__themes_ios_Select_vue___default.a);
Vue.component('BTextarea', __WEBPACK_IMPORTED_MODULE_5__themes_ios_Textarea_vue___default.a);
Vue.component('BRating', __WEBPACK_IMPORTED_MODULE_6__themes_ios_Rating_vue___default.a);

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "b__components b-ios b-rating"
  }, [_c('ul', {
    class: _vm.classes
  }, _vm._l((_vm.listRate), function(item) {
    return _c('li', {
      class: item <= _vm.rate ? 'active' : '',
      on: {
        "click": function($event) {
          _vm.update(item)
        }
      }
    }, [_c('i', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (item > _vm.rate),
        expression: " item > rate "
      }],
      staticClass: "fa fa-star-o",
      attrs: {
        "aria-hidden": "true"
      }
    }), _vm._v(" "), _c('i', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (item <= _vm.rate),
        expression: " item <= rate "
      }],
      staticClass: "fa fa-star",
      attrs: {
        "aria-hidden": "true"
      }
    })])
  }))])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2d83f459", module.exports)
  }
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "b__components b-checkbox"
  }, [_c('input', {
    class: _vm.classes,
    attrs: {
      "type": "checkbox",
      "name": _vm.name,
      "id": _vm.id,
      "disabled": _vm.disabled
    },
    domProps: {
      "checked": _vm.isChecked
    },
    on: {
      "click": function($event) {
        _vm.update()
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "checkbox__checkmark"
  }), _vm._v(" "), _c('label', {
    attrs: {
      "for": _vm.id
    }
  }, [_vm._v(_vm._s(_vm.label))])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-43455a5f", module.exports)
  }
}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "b__components b-select"
  }, [_c('label', {
    class: _vm.isActive ? 'active' : '',
    attrs: {
      "for": _vm.id
    }
  }, [_vm._v(_vm._s(_vm.label))]), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.selected),
      expression: "selected"
    }],
    class: (_vm.className ? _vm.className : '') + ' b__select_element',
    attrs: {
      "placeholder": _vm.placeholder,
      "name": _vm.name,
      "id": _vm.id,
      "disabled": _vm.disabled
    },
    on: {
      "change": [function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.selected = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }, function($event) {
        _vm.update($event.target.value)
      }]
    }
  }, _vm._l((_vm.items), function(item) {
    return _c('option', {
      domProps: {
        "value": item.value
      }
    }, [_vm._v(_vm._s(item.name))])
  })), _vm._v(" "), _c('span', {
    class: _vm.isActive ? 'placeholder' : 'placeholder show'
  }, [_vm._v(_vm._s(_vm.placeholder))])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4e2eb038", module.exports)
  }
}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "b__components b-ios b-textarea"
  }, [_c('label', {
    class: _vm.classLabel
  }, [_vm._v(_vm._s(_vm.label))]), _vm._v(" "), _c('textarea', {
    ref: "bTextarea",
    class: (_vm.className ? _vm.className : '') + ' b__textarea',
    attrs: {
      "placeholder": _vm.placeholder,
      "type": "text",
      "cols": _vm.cols,
      "rows": _vm.rows,
      "id": _vm.id,
      "name": _vm.name,
      "disabled": _vm.disabled
    },
    on: {
      "input": function($event) {
        _vm.change($event.target.value)
      }
    }
  }, [_vm._v(_vm._s(_vm.text))])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-69266b14", module.exports)
  }
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "b__components b-ios b-float-label"
  }, [_c('label', {
    class: _vm.classLabel
  }, [_vm._v(_vm._s(_vm.label))]), _vm._v(" "), _c('input', {
    ref: "bInput",
    class: _vm.classes,
    attrs: {
      "placeholder": _vm.placeholder,
      "type": _vm.typeComponent,
      "name": _vm.name,
      "id": _vm.id,
      "disabled": _vm.disabled
    },
    domProps: {
      "value": _vm.value
    },
    on: {
      "input": function($event) {
        _vm.change($event.target.value)
      }
    }
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6da7cac1", module.exports)
  }
}

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "b__components b-radio"
  }, [_c('input', {
    ref: "bRadio",
    class: (_vm.className ? _vm.className : '') + ' radio__input',
    attrs: {
      "type": "radio",
      "name": _vm.name,
      "id": _vm.id,
      "disabled": _vm.disabled
    },
    domProps: {
      "checked": _vm.isCheck
    },
    on: {
      "change": function($event) {
        _vm.update()
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "radio__checkmark"
  }), _vm._v(" "), _c('label', {
    attrs: {
      "for": _vm.id
    }
  }, [_vm._v(_vm._s(_vm.label))])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-baf57422", module.exports)
  }
}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "b__components b-switch",
    attrs: {
      "checked": ""
    },
    on: {
      "click": function($event) {
        _vm.update()
      }
    }
  }, [_c('input', {
    class: _vm.classes,
    attrs: {
      "type": "checkbox",
      "name": _vm.name,
      "id": _vm.id,
      "disabled": _vm.disabled
    },
    domProps: {
      "checked": _vm.isChecked
    }
  }), _vm._v(" "), _vm._m(0)])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "switch__toggle"
  }, [_c('div', {
    staticClass: "switch__handle"
  }, [_c('div', {
    staticClass: "switch__touch"
  })])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-c7a15320", module.exports)
  }
}

/***/ })
/******/ ]);
//# sourceMappingURL=b-components.js.map