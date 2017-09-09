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
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
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
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(13);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(15)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./b-component.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./b-component.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(7),
  /* template */
  __webpack_require__(17),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/minh.truong/Documents/sources/b-components/src/components/Checkbox.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Checkbox.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1adc8271", Component.options)
  } else {
    hotAPI.reload("data-v-1adc8271", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(8),
  /* template */
  __webpack_require__(18),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/minh.truong/Documents/sources/b-components/src/components/FloatLabelInput.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] FloatLabelInput.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-39d37818", Component.options)
  } else {
    hotAPI.reload("data-v-39d37818", Component.options)
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
  __webpack_require__(9),
  /* template */
  __webpack_require__(20),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/minh.truong/Documents/sources/b-components/src/components/Radio.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Radio.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7934db3d", Component.options)
  } else {
    hotAPI.reload("data-v-7934db3d", Component.options)
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
  __webpack_require__(10),
  /* template */
  __webpack_require__(19),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/minh.truong/Documents/sources/b-components/src/components/Select.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Select.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4d71c4aa", Component.options)
  } else {
    hotAPI.reload("data-v-4d71c4aa", Component.options)
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
  __webpack_require__(11),
  /* template */
  __webpack_require__(21),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/minh.truong/Documents/sources/b-components/src/components/Switch.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Switch.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c91b2a3c", Component.options)
  } else {
    hotAPI.reload("data-v-c91b2a3c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	props: ['value', 'disabled', 'id', 'label'],
	methods: {
		update() {
			var checked = true;
			if (this.value) checked = false;
			this.$emit('input', checked);
		}
	}

});

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
	data() {
		return {
			classLabel: ''
		};
	},
	props: ['value', 'disabled', 'placeholder', 'label'],
	mounted() {
		this.change();
	},
	watch: {
		value(value) {
			this.updateChange(value);
		}
	},
	methods: {
		change() {
			this.updateChange(this.$refs.bInput.value);
		},
		updateChange(value) {
			var isEmpty = value == undefined || value == null || value.length == 0 ? true : false;
			if (!isEmpty) this.classLabel = 'active';else this.classLabel = '';

			this.$emit('input', value);
		}
	}
});

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	props: ['value', 'disabled', 'name', 'id', 'label'],
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
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	data() {
		return {
			selected: ''
		};
	},
	props: ['id', 'default', 'label', 'name', 'disabled', 'list', 'item-key', 'item-val', 'value'],
	watch: {
		value() {
			this.updateWhenNotFound();
		},
		list() {
			this.updateWhenNotFound();
		}
	},
	mounted() {
		this.updateWhenNotFound();
	},
	computed: {
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
					name: listItem[this.itemKey]
				};
				items.push(item);
			}

			return items;
		}
	},
	methods: {
		update() {
			let selected = this.$el.querySelector('select').value;
			this.$emit('input', selected);
			this.selected = selected;
		},
		isSelected(v) {
			var a = 1;
			if (this.value == v) {
				this.selected = v;
				return true;
			}
			return false;
		},
		isFound() {
			var found = false;
			if (this.list == undefined || this.list == null || this.list.length == 0) {
				return found;
			}

			let items = [];
			for (let i = 0; i < this.list.length; i++) {
				let listItem = this.list[i];
				let item = {
					value: listItem[this.itemVal],
					name: listItem[this.itemKey]
				};
				if (item.value == this.value) {
					found = true;
					break;
				}
			}

			return found;
		},
		updateWhenNotFound() {
			if (this.list == undefined || this.list == null || this.list.length == 0) {
				this.$el.querySelector('select').value = null;
			} else {
				var founded = this.isFound();
				if (!founded) this.$el.querySelector('select').value = null;
			}
		}
	}

});

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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
	props: ['value', 'disabled'],
	methods: {
		update() {
			var checked = true;
			if (this.value) checked = false;
			this.$emit('input', checked);
		}
	}
});

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Switch__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Switch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_Switch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_FloatLabelInput__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_FloatLabelInput___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_FloatLabelInput__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Checkbox__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Checkbox___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_Checkbox__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Radio__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Radio___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_Radio__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Select__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Select___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_Select__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__scss_b_component_scss__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__scss_b_component_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__scss_b_component_scss__);








Vue.component('BSwitch', __WEBPACK_IMPORTED_MODULE_0__components_Switch___default.a);
Vue.component('BFloatLabelInput', __WEBPACK_IMPORTED_MODULE_1__components_FloatLabelInput___default.a);
Vue.component('BCheckbox', __WEBPACK_IMPORTED_MODULE_2__components_Checkbox___default.a);
Vue.component('BRadio', __WEBPACK_IMPORTED_MODULE_3__components_Radio___default.a);
Vue.component('BSelect', __WEBPACK_IMPORTED_MODULE_4__components_Select___default.a);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)();
// imports


// module
exports.push([module.i, ".b-switch {\n  display: inline-block;\n  box-sizing: border-box;\n  position: relative;\n  min-width: 51px;\n  font-size: 17px;\n  padding: 0 20px;\n  border: none;\n  overflow: visible;\n  width: 51px;\n  height: 32px;\n  text-align: left; }\n  .b-switch .switch__input {\n    padding: 0;\n    border: 0;\n    background-color: transparent;\n    outline: 0;\n    width: 100%;\n    height: 100%;\n    margin: 0;\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    vertical-align: top;\n    z-index: 0;\n    position: absolute; }\n    .b-switch .switch__input:checked + .switch__toggle {\n      box-shadow: inset 0 0 0 2px #5198db;\n      background-color: #5198db; }\n    .b-switch .switch__input:checked + .switch__toggle > .switch__handle {\n      left: 21px;\n      box-shadow: 0 3px 2px rgba(0, 0, 0, 0.25); }\n    .b-switch .switch__input:disabled + .switch__toggle {\n      opacity: .3;\n      cursor: default;\n      pointer-events: none; }\n  .b-switch .switch__toggle {\n    position: absolute;\n    border-radius: 30px;\n    -webkit-transition-property: all;\n    transition-property: all;\n    -webkit-transition-duration: .35s;\n    transition-duration: .35s;\n    -webkit-transition-timing-function: ease-out;\n    transition-timing-function: ease-out;\n    box-shadow: inset 0 0 0 2px #e5e5e5;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0; }\n  .b-switch :checked + .switch__toggle {\n    box-shadow: inset 0 0 0 2px #5198db;\n    background-color: #5198db; }\n  .b-switch .switch__handle {\n    position: absolute;\n    background-color: #fff;\n    box-sizing: border-box;\n    border-radius: 28px;\n    height: 28px;\n    width: 28px;\n    left: 1px;\n    top: 2px;\n    -webkit-transition-property: all;\n    transition-property: all;\n    -webkit-transition-duration: .35s;\n    transition-duration: .35s;\n    -webkit-transition-timing-function: cubic-bezier(0.59, 0.01, 0.5, 0.99);\n    transition-timing-function: cubic-bezier(0.59, 0.01, 0.5, 0.99);\n    box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.25), 0 3px 2px rgba(0, 0, 0, 0.25); }\n  .b-switch .switch__touch {\n    position: absolute;\n    top: -5px;\n    bottom: -5px;\n    left: -10px;\n    right: -10px; }\n\n.b-checkbox {\n  position: relative;\n  display: inline-block;\n  height: 22px;\n  cursor: pointer; }\n  .b-checkbox .checkbox__input {\n    position: absolute;\n    right: 0;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    padding: 0;\n    border: 0;\n    background-color: transparent;\n    z-index: 1;\n    vertical-align: top;\n    outline: 0;\n    width: 100%;\n    height: 100%;\n    margin: 0;\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none; }\n    .b-checkbox .checkbox__input:checked + .checkbox__checkmark:after {\n      border-width: 1px; }\n    .b-checkbox .checkbox__input:checked + .checkbox__checkmark:before {\n      background: rgba(24, 103, 194, 0.81);\n      border: none; }\n    .b-checkbox .checkbox__input[disabled] + .checkbox__checkmark {\n      opacity: .5; }\n  .b-checkbox label {\n    margin: 0 10px 0 30px; }\n  .b-checkbox .checkbox__checkmark {\n    box-sizing: border-box;\n    background-clip: padding-box;\n    user-select: none;\n    position: absolute;\n    height: 22px;\n    width: 22px;\n    pointer-events: none;\n    display: inline-block; }\n    .b-checkbox .checkbox__checkmark:after {\n      position: absolute;\n      content: '';\n      background: 0 0;\n      top: 7px;\n      left: 5px;\n      width: 11px;\n      height: 5px;\n      border: 2px solid #fff;\n      border-width: 0px;\n      border-top: none;\n      border-right: none;\n      border-radius: 0;\n      -webkit-transform: rotate(-45deg);\n      transform: rotate(-45deg);\n      opacity: 1;\n      -webkit-transition-property: all;\n      transition-property: all;\n      -webkit-transition-duration: .35s;\n      transition-duration: .35s;\n      -webkit-transition-timing-function: ease-out;\n      transition-timing-function: ease-out; }\n    .b-checkbox .checkbox__checkmark:before {\n      position: absolute;\n      background: 0 0;\n      content: '';\n      box-sizing: border-box;\n      width: 22px;\n      height: 22px;\n      border: 1px solid #c7c7cd;\n      border-radius: 22px;\n      box-shadow: none;\n      left: 0;\n      -webkit-transition-property: all;\n      transition-property: all;\n      -webkit-transition-duration: .35s;\n      transition-duration: .35s;\n      -webkit-transition-timing-function: ease-out;\n      transition-timing-function: ease-out; }\n\n.b-radio {\n  position: relative;\n  display: inline-block;\n  cursor: pointer; }\n  .b-radio .radio__input {\n    position: absolute;\n    right: 0;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    padding: 0;\n    border: 0;\n    background-color: transparent;\n    z-index: 1;\n    vertical-align: top;\n    outline: 0;\n    width: 100%;\n    height: 100%;\n    margin: 0;\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none; }\n    .b-radio .radio__input:checked + .radio__checkmark:after {\n      opacity: 1; }\n    .b-radio .radio__input:checked + .radio__checkmark:before {\n      background-color: transparent; }\n    .b-radio .radio__input[disabled] + .radio__checkmark {\n      opacity: .5; }\n  .b-radio label {\n    cursor: pointer;\n    margin: 0; }\n  .b-radio .radio__checkmark {\n    box-sizing: border-box;\n    background-clip: padding-box;\n    user-select: none;\n    position: relative;\n    height: 24px;\n    width: 22px;\n    pointer-events: none;\n    display: inline-block; }\n    .b-radio .radio__checkmark:after {\n      content: '';\n      position: absolute;\n      top: 12px;\n      left: 4px;\n      opacity: 0;\n      width: 16px;\n      height: 7px;\n      background: transparent;\n      border: 2px solid rgba(24, 103, 194, 0.81);\n      border-top: none;\n      border-right: none;\n      border-radius: 0;\n      -webkit-transform: rotate(-45deg);\n      transform: rotate(-45deg);\n      -webkit-transition-property: all;\n      transition-property: all;\n      -webkit-transition-duration: .35s;\n      transition-duration: .35s;\n      -webkit-transition-timing-function: ease-out;\n      transition-timing-function: ease-out; }\n    .b-radio .radio__checkmark:before {\n      position: absolute;\n      content: '';\n      box-sizing: border-box;\n      width: 6px;\n      height: 6px;\n      border-radius: 22px;\n      box-shadow: none;\n      left: 10px;\n      background-color: #b5b5b5;\n      top: 15px;\n      -webkit-transition-property: all;\n      transition-property: all;\n      -webkit-transition-duration: .35s;\n      transition-duration: .35s;\n      -webkit-transition-timing-function: ease-out;\n      transition-timing-function: ease-out; }\n\n.b-float-label {\n  position: relative; }\n  .b-float-label label {\n    position: absolute;\n    margin: 0;\n    opacity: 0;\n    top: 0px;\n    left: 10px;\n    height: 15px;\n    font-size: 11px;\n    color: #1976d2;\n    padding: 0px 5px;\n    background-color: #fff;\n    transition: all .2s ease-in-out; }\n  .b-float-label label.active {\n    opacity: 1;\n    top: -8px; }\n  .b-float-label input[type=text] {\n    width: 100%;\n    outline: 0;\n    line-height: 1.5;\n    font-size: 14px;\n    border-radius: 3px;\n    border: 1px solid #dfdfdf;\n    background-color: #fff;\n    box-sizing: border-box;\n    transition: all .2s ease-in-out;\n    padding: 6px 15px; }\n    .b-float-label input[type=text]:disabled {\n      border-color: whitesmoke;\n      color: #c5c5c5;\n      cursor: no-drop; }\n", ""]);

// exports


/***/ }),
/* 14 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(16);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 16 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "b-checkbox"
  }, [_c('input', {
    staticClass: "checkbox__input",
    attrs: {
      "type": "checkbox",
      "id": _vm.id,
      "disabled": _vm.disabled
    },
    domProps: {
      "checked": _vm.value
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
     require("vue-hot-reload-api").rerender("data-v-1adc8271", module.exports)
  }
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "b-ios b-float-label"
  }, [_c('label', {
    class: _vm.classLabel
  }, [_vm._v(_vm._s(_vm.label))]), _vm._v(" "), _c('input', {
    ref: "bInput",
    staticClass: "b__input",
    attrs: {
      "placeholder": _vm.placeholder,
      "type": "text",
      "disabled": _vm.disabled
    },
    domProps: {
      "value": _vm.value
    },
    on: {
      "input": function($event) {
        _vm.change()
      }
    }
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-39d37818", module.exports)
  }
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "b-select"
  }, [_c('label', {
    attrs: {
      "for": _vm.id
    }
  }, [_vm._v(_vm._s(_vm.label))]), _vm._v(" "), _c('select', {
    attrs: {
      "name": _vm.name,
      "id": _vm.id,
      "disabled": _vm.disabled
    },
    on: {
      "change": function($event) {
        _vm.update()
      }
    }
  }, _vm._l((_vm.items), function(item) {
    return _c('option', {
      domProps: {
        "value": item.value,
        "selected": _vm.isSelected(item.value)
      }
    }, [_vm._v(_vm._s(item.name))])
  }))])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4d71c4aa", module.exports)
  }
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "b-radio"
  }, [_c('input', {
    ref: "bRadio",
    staticClass: "radio__input",
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
     require("vue-hot-reload-api").rerender("data-v-7934db3d", module.exports)
  }
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "b-switch",
    attrs: {
      "checked": ""
    },
    on: {
      "click": function($event) {
        _vm.update()
      }
    }
  }, [_c('input', {
    staticClass: "switch__input",
    attrs: {
      "type": "checkbox",
      "disabled": _vm.disabled
    },
    domProps: {
      "checked": _vm.value
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
     require("vue-hot-reload-api").rerender("data-v-c91b2a3c", module.exports)
  }
}

/***/ })
/******/ ]);
//# sourceMappingURL=b-components.js.map