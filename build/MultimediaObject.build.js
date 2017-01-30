/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "build/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _create = __webpack_require__(1);

	var _create2 = _interopRequireDefault(_create);

	var _keys = __webpack_require__(37);

	var _keys2 = _interopRequireDefault(_keys);

	var _typeof2 = __webpack_require__(42);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _classCallCheck2 = __webpack_require__(76);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(77);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _raf = __webpack_require__(81);

	var _raf2 = _interopRequireDefault(_raf);

	var _utils = __webpack_require__(82);

	var _utils2 = _interopRequireDefault(_utils);

	var _easings = __webpack_require__(85);

	var _easings2 = _interopRequireDefault(_easings);

	var _data = __webpack_require__(84);

	var _data2 = _interopRequireDefault(_data);

	var _customEventManager = __webpack_require__(86);

	var _customEventManager2 = _interopRequireDefault(_customEventManager);

	var _requireScript = __webpack_require__(87);

	var _requireScript2 = _interopRequireDefault(_requireScript);

	var _config = __webpack_require__(88);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _raf2.default)(); /*
	                      
	                      Copyright 2016 Ciro André DE CARO
	                      
	                      Licensed under the Apache License, Version 2.0 (the "License");
	                      you may not use this file except in compliance with the License.
	                      You may obtain a copy of the License at
	                      
	                          http://www.apache.org/licenses/LICENSE-2.0
	                      
	                      Unless required by applicable law or agreed to in writing, software
	                      distributed under the License is distributed on an "AS IS" BASIS,
	                      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	                      See the License for the specific language governing permissions and
	                      limitations under the License.
	                      
	                      */

	var conf = (0, _config2.default)();
	/**
	* Represents a MultimediaObject
	* @constructor
	* @param {object} json -  a JSON representing the object. When used with JSON, the object automatically loads the data.
	OR
	* @param {string} type -  the DOM type of the MultimediaObject
	* @param {string} name - the name of the MultimediaObject
	* @param {object} data - an object representing the datas which can be internally used by the MultimediaObject
	* @param {object} style - an object representing the CSS style of the MultimediaObject, applied at creation
	* @param {object} attributes - an object representing the DOM attributes of the MultimediaObject, applied at creation to the DOM Element
	* @param {object} events - an object representing the Events provided by the object. Supporting only DOM events for the moment. TODO -> add custom events
	* @param {object} animations - a second separated Object representing the MultimediaObject state over time. Each step contain an object with style values wich will be precompiled and applied over time.
	*/

	var MultimediaObject = function () {
	  function MultimediaObject() {
	    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'block';
	    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'multimediaObject';
	    var fps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 60;
	    (0, _classCallCheck3.default)(this, MultimediaObject);

	    if ((typeof type === 'undefined' ? 'undefined' : (0, _typeof3.default)(type)) === 'object') {
	      this.name = name || type.name;
	      this.type = type.type || 'block';
	      this._style = {};
	      this.style = {};
	      this.events = {};
	      this._events = {};
	      this.functions = {};
	      this.breakpoints = [];
	      this.selectedAnimation = 'default';
	      this.currentAnimation = {};
	      this.animated = false;
	      this.computedAnimations = [];
	      this.childs = [];
	      this.dependencies = [];
	      this.animatedProps = {
	        0.02: {}
	      };
	      this.innerHTML = '';

	      this.fps = fps;
	      this.then = performance.now() || Date.now();
	      this.interval = 1000 / this.fps;
	      this.totalIteration = 0;
	      this.counter = 0;

	      this.reverse = false;
	      this.repeat = 0;
	      this.animationStarted = false;
	      this.loadFromJSON(type);
	      this.applyFunctions();

	      this.addDefaultParameters();
	      this.init();
	      this.applyAttributes();
	      this.applyStyle();
	      this.applyEvents();
	      this.applyBreakpoints();
	      this.applyDependencies();
	    } else {
	      this.uuid = _utils2.default.generateUUID();
	      this.name = name;
	      this.type = type;
	      this.data = {};
	      this._style = {};
	      this.style = {};
	      this.attributes = {};
	      this.events = {};
	      this._events = {};
	      this.functions = {};
	      this.selectedAnimation = 'default';
	      this.currentAnimation = {};
	      this.breakpoints = [];
	      this.animated = false;
	      this.computedAnimations = [];
	      this.childs = [];
	      this.dependencies = [];
	      this.animatedProps = {
	        0.02: {}
	      };
	      this.innerHTML = '';

	      this.DOMParent = null;

	      this.fps = fps;
	      this.then = performance.now() || Date.now();
	      this.interval = 1000 / this.fps;
	      this.totalIteration = 0;
	      this.counter = 0;

	      this.reverse = false;
	      this.repeat = 0;
	      this.animationStarted = false;

	      this.init();
	      this.addDefaultParameters();
	    }
	  }

	  /**
	  * @function
	  * Inititalize the MultimediaObject
	  * generates the DOMElement, applyAttributes, sorts animations steps
	  */

	  (0, _createClass3.default)(MultimediaObject, [{
	    key: 'init',
	    value: function init() {
	      var _this = this;

	      this.generate(_utils2.default.Atoms(this.type));
	      this.element.innerHTML = this.innerHTML;
	      this.getSortedSteps();
	      if (!window.MultimediaObjectEditor) {
	        if (!(this.DOMParent instanceof MultimediaObject)) {
	          if (window[conf.namespace]) {
	            this.appendElementTo(document.getElementById(window[conf.namespace].containerId));
	          } else {
	            this.appendElementTo();
	          }
	        }
	        if (this.data.autostart) {
	          this.startAnimation();
	        } else {
	          this.addListener('startAfterPreload', function () {
	            return _this.startAnimation();
	          }, true);
	        }
	      }
	      if (this.attributes && !this.attributes.id) {
	        this.applyAttributes({
	          id: this.name
	        });
	      }
	    }
	  }, {
	    key: 'addDefaultParameters',
	    value: function addDefaultParameters() {
	      if (conf.defaultAttributes[this.type] && !this.load) {
	        for (var key in conf.defaultAttributes[this.type]) {
	          if (!this.attributes[key]) {
	            this.attributes[key] = conf.defaultAttributes[this.type][key];
	          }
	        }
	      }
	      this.data.autostart = typeof this.data.autostart === 'undefined' ? true : this.data.autostart;
	      if (this.element) {
	        this.applyAttributes();
	      }
	    }
	  }, {
	    key: 'checkDep',
	    value: function checkDep(dependency) {
	      var pushOrSplice = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'push';

	      var depIndex = this.dependencies.indexOf(dependency);
	      switch (pushOrSplice) {
	        case 'splice':
	          if (depIndex >= 0) {
	            this.dependencies.splice(depIndex, 1);
	          }
	          break;
	        case 'push':
	        default:
	          if (depIndex < 0) {
	            this.dependencies.push(dependency);
	          }
	      }
	    }

	    /**
	    * @function
	    * Require dependencies and add it to a dependencie bundle
	    * @param {object} dependencies - the dependencies to fetch
	    * @return {object} MultimediaObject
	    */

	  }, {
	    key: 'applyDependencies',
	    value: function applyDependencies(dependencies) {
	      var _this2 = this;

	      dependencies = dependencies || this.dependencies;
	      if (dependencies instanceof Array) {
	        dependencies.forEach(function (dep) {
	          _this2.checkDep(dep);
	        });
	      } else {
	        this.checkDep(dependencies);
	      }
	      return this;
	    }
	  }, {
	    key: 'removeDependencies',
	    value: function removeDependencies(dependencies) {
	      var _this3 = this;

	      dependencies = dependencies || this.dependencies;
	      if (dependencies instanceof Array) {
	        dependencies.forEach(function (dep) {
	          _this3.checkDep(dep, 'splice');
	        });
	      } else {
	        this.checkDep(dependencies, 'splice');
	      }
	      return this;
	    }
	  }, {
	    key: 'requireDependencies',
	    value: function requireDependencies(callback) {
	      if (this.dependencies.length > 0) {
	        (0, _requireScript2.default)(this.dependencies, 'dependencies');
	        _requireScript2.default.ready('dependencies', callback);
	      } else {
	        callback();
	      }
	    }

	    /**
	    * @function
	    * Add a global style object to the page
	    * @param {string} id - the id or class to which bind the style
	    * @param {object} style - the CSS style properties to apply
	    * @return {object} MultimediaObject
	    */

	  }, {
	    key: 'addGlobalStyle',
	    value: function addGlobalStyle(style, callback) {
	      var styleMarkup = document.createElement('style');
	      var styleText = style;

	      styleMarkup.innerHTML = styleText;
	      styleMarkup.id = this.uuid + '-style';
	      styleMarkup.type = 'text/css';
	      document.head.appendChild(styleMarkup);

	      if (callback) {
	        window.setTimeout(callback, 100);
	      }

	      return this;
	    }

	    /**
	    * @function
	    * Apply the object in parameter as style properties
	    * @param {object} properties - the CSS style properties to apply
	    * @return {object} MultimediaObject
	    */

	  }, {
	    key: 'applyStyle',
	    value: function applyStyle() {
	      var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.style;
	      var override = arguments[1];

	      var k = void 0;
	      var transforms = [];
	      var v = void 0;
	      var _style = (0, _keys2.default)(this._style).length;
	      override = override || false;

	      for (k in properties) {
	        v = properties[k];
	        if (_utils2.default.transformProperties.contains(k)) {
	          transforms.push([k, v]);
	          var val = _utils2.default.transformValueForProperty(k, v);
	          var treatedVal = '' + val.value + val.unit;
	          if (_style < 1 || override) {
	            this._style[k] = treatedVal;
	          }
	          this.style[k] = treatedVal;
	        } else if (_utils2.default.pxProperties.contains(k)) {
	          var _val = '' + _utils2.default.getNumFromString(v) + _utils2.default.unitForProperty(k, v);
	          if (_style < 1 || override) {
	            this._style[k] = _val;
	          }
	          this.style[k] = _val;
	          this.element.style[k] = _val;
	        } else if (_utils2.default.styleProperties.contains(k)) {
	          if (_style < 1 || override) {
	            this._style[k] = v;
	          }
	          this.style[k] = v;
	          this.element.style[k] = v;
	        } else {
	          var _val2 = '' + v + _utils2.default.unitForProperty(k, v);
	          // console.log(v);
	          this.style[_utils2.default.propertyWithPrefix(k)] = _val2;
	          if (_style < 1 || override) {
	            this._style[_utils2.default.propertyWithPrefix(k)] = _val2;
	          }
	          if (v.indexOf('{{absoluteAssetURL}}') >= 0 && window[conf.namespace]) {
	            v = v.replace('{{absoluteAssetURL}}', window.MultimediaObjectEditor ? this.data.absoluteAssetURL : window[conf.namespace].absoluteAssetURL);
	          }
	          this.element.style[_utils2.default.propertyWithPrefix(k)] = v;
	        }
	      }

	      var z = [0, 1, 2, 3];
	      var trans = {
	        x: this._style.translateX ? _utils2.default.getNumFromString(this._style.translateX) : 0,
	        y: this._style.translateY ? _utils2.default.getNumFromString(this._style.translateY) : 0,
	        z: this._style.translateZ ? _utils2.default.getNumFromString(this._style.translateZ) : 0,
	        xU: this._style.translateX ? _utils2.default.getUnitFromString(this._style.translateX) : 'px',
	        yU: this._style.translateY ? _utils2.default.getUnitFromString(this._style.translateY) : 'px',
	        zU: this._style.translateZ ? _utils2.default.getUnitFromString(this._style.translateZ) : 'px'
	      };
	      var rot = {
	        value: this._style.rotate ? _utils2.default.getNumFromString(this._style.rotate) : 0,
	        u: 'deg'
	      };
	      var ske = {
	        x: this._style.skewX ? _utils2.default.getNumFromString(this._style.skewX) : 0,
	        y: this._style.skewY ? _utils2.default.getNumFromString(this._style.skewY) : 0,
	        u: 'deg'
	      };
	      var sca = {
	        x: this._style.scaleX ? _utils2.default.getNumFromString(this._style.scaleX) : 1,
	        y: this._style.scaleY ? _utils2.default.getNumFromString(this._style.scaleY) : 1
	      };

	      if (transforms.length > 0) {
	        v = transforms.map(function (transform) {
	          return _utils2.default.transformValueForProperty(transform[0], transform[1]).string;
	        });

	        v.forEach(function (a) {
	          if (a.indexOf('translateX') >= 0 || a.indexOf('translate-x') >= 0) {
	            trans.x = _utils2.default.getNumFromString(a);
	            trans.xU = _utils2.default.getUnitFromString(a);
	          } else if (a.indexOf('translateY') >= 0 || a.indexOf('translate-y') >= 0) {
	            trans.y = _utils2.default.getNumFromString(a);
	            trans.yU = _utils2.default.getUnitFromString(a);
	          } else if (a.indexOf('translateZ') >= 0 || a.indexOf('translate-z') >= 0) {
	            trans.z = _utils2.default.getNumFromString(a);
	            trans.zU = _utils2.default.getUnitFromString(a);
	          }
	          if (a.indexOf('rotate') >= 0) {
	            rot.value = _utils2.default.getNumFromString(a);
	          }
	          if (a.indexOf('scaleX') >= 0 || a.indexOf('scale-x') >= 0) {
	            sca.x = _utils2.default.getNumFromString(a);
	          } else if (a.indexOf('scaleY') >= 0 || a.indexOf('scale-y') >= 0) {
	            sca.y = _utils2.default.getNumFromString(a);
	          } else if (a.indexOf('scale') >= 0) {
	            sca.x = _utils2.default.getNumFromString(a);
	            sca.y = _utils2.default.getNumFromString(a);
	          }
	          if (a.indexOf('skewX') >= 0 || a.indexOf('skew-x') >= 0) {
	            ske.x = _utils2.default.getNumFromString(a);
	          } else if (a.indexOf('skewY') >= 0 || a.indexOf('skew-y') >= 0) {
	            ske.y = _utils2.default.getNumFromString(a);
	          } else if (a.indexOf('skew') >= 0) {
	            ske.x = _utils2.default.getNumFromString(a);
	            ske.y = _utils2.default.getNumFromString(a);
	          }
	        });
	        // console.log(z);
	        z[0] = 'translate3d(' + trans.x + trans.xU + ',' + trans.y + trans.yU + ',' + trans.z + trans.zU + ')';
	        z[1] = 'rotate(' + rot.value + rot.u + ')';
	        z[2] = 'skew(' + ske.x + ske.u + ',' + ske.y + ske.u + ')';
	        z[3] = 'scale(' + sca.x + ',' + sca.y + ')';
	        // console.log(z);
	        z = z.filter(function (el) {
	          return !/^[0-9]/.test(el);
	        }).join(' ');

	        this.element.style[_utils2.default.propertyWithPrefix('transform')] = z;
	      }
	      _customEventManager2.default.dispatchEvent('actualize-style', this._style);

	      return this;
	    }

	    /**
	    * @function
	    * Apply the functions as method of the MultimediaObject
	    * @param {object} functions - key = name of functions, value = function body.
	    * @return {object} MultimediaObject
	    */

	  }, {
	    key: 'applyFunctions',
	    value: function applyFunctions(functions) {
	      if (functions) {
	        for (var func in functions) {
	          this[func] = functions[func];
	          this.functions[func] = functions[func];
	        }
	      } else {
	        for (var _func in this.functions) {
	          this[_func] = this.functions[_func];
	        }
	      }
	      return this;
	    }

	    /**
	    * @function
	    * Apply the attributes to the DOMElement and attributes propertie of the MultimediaObject
	    * @param {object} attributes - key = name of attribute, value = value.
	    * @return {object} MultimediaObject
	    */

	  }, {
	    key: 'applyAttributes',
	    value: function applyAttributes(attributes) {
	      if (attributes) {
	        for (var attr in attributes) {
	          var replaced = attributes[attr];
	          if (typeof attributes[attr] === 'string' && attributes[attr].indexOf('{{absoluteAssetURL}}') >= 0 && window[conf.namespace]) {
	            replaced = attributes[attr].replace('{{absoluteAssetURL}}', window.MultimediaObjectEditor ? this.data.absoluteAssetURL : window[conf.namespace].absoluteAssetURL);
	          }
	          this.attributes[attr] = attributes[attr];
	          this.element.setAttribute(attr, replaced || attributes[attr]);
	        }
	      } else {
	        for (var _attr in this.attributes) {
	          var _replaced = this.attributes[_attr];
	          if (typeof this.attributes[_attr] === 'string' && this.attributes[_attr].indexOf('{{absoluteAssetURL}}') >= 0 && window[conf.namespace]) {
	            _replaced = this.attributes[_attr].replace('{{absoluteAssetURL}}', window.MultimediaObjectEditor ? this.data.absoluteAssetURL : window[conf.namespace].absoluteAssetURL);
	          }
	          this.element.setAttribute(_attr, _replaced || this.attributes[_attr]);
	        }
	      }
	      return this;
	    }

	    /**
	    * @function
	    * Apply the breakpoints
	    * @param {array} breakpoints - breakpoint object {{querie,style}}
	    * @return {object} MultimediaObject
	    */

	  }, {
	    key: 'applyBreakpoints',
	    value: function applyBreakpoints() {
	      var _this4 = this;

	      var breakpoints = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

	      if (this.breakpoints.length > 0 || breakpoints.length > 0) {
	        breakpoints.forEach(function (breakpoint, index) {
	          if (_this4.breakpoints.indexOf(breakpoint) === -1) {
	            _this4.breakpoints.push(breakpoint);
	          }
	        });
	        this.checkBreakpoints();
	      }
	      return this;
	    }

	    /**
	    * @function
	    * Apply the events to the DOMElement and events propertie of the MultimediaObject
	    * @param {object} attributes - key = name of event, value = function.
	    * @return {object} MultimediaObject
	    */

	  }, {
	    key: 'applyEvents',
	    value: function applyEvents(events) {
	      var _this5 = this;

	      var applySwipeEvent = function applySwipeEvent(evt) {
	        var detecttouch = !!('ontouchstart' in window) || !!('ontouchstart' in document.documentElement) || !!window.ontouchstart || !!window.onmsgesturechange || window.DocumentTouch && window.document instanceof window.DocumentTouch,
	            ob = _this5;
	        var userData = {};
	        ob.evtStarted = false;
	        _this5.evtStart = function (e) {
	          e.preventDefault();
	          var event = e.changedTouches ? e.changedTouches[0] : e;
	          ob.evtStarted = true;
	          userData = {
	            start: {
	              left: event.pageX,
	              top: event.pageY
	            }
	          };
	        };
	        _this5.evtEnd = function (e) {
	          e.preventDefault();
	          if (!ob.evtStarted) {
	            return;
	          }
	          var event = e.changedTouches ? e.changedTouches[0] : e;
	          userData.end = {
	            left: event.pageX,
	            top: event.pageY
	          };
	          userData.dx = userData.end.left - userData.start.left;
	          userData.dy = userData.end.top - userData.start.top;
	          userData.angle = Math.atan2(userData.dy, userData.dx);
	          userData.angle *= 180 / Math.PI;
	          userData.inMotion = e.type === 'touchmove' || e.type === 'mousemove';
	          userData.direction = Math.abs(userData.dx) > Math.abs(userData.dy) ? ('' + userData.dx).indexOf('-') !== -1 ? 'left' : 'right' : ('' + userData.dy).indexOf('-') !== -1 ? 'top' : 'bottom';
	          ob.events[evt].apply(ob, [e, userData]);
	          if (userData.inMotion === false) {
	            ob.evtStarted = false;
	          }
	        };
	        if (detecttouch) {
	          _this5.element.addEventListener('touchstart', _this5.evtStart, false);
	          _this5.element.addEventListener('touchmove', _this5.evtEnd, false);
	          _this5.element.addEventListener('touchend', _this5.evtEnd, false);
	        } else {
	          _this5.element.addEventListener('mousedown', _this5.evtStart, false);
	          _this5.element.addEventListener('mousemove', _this5.evtEnd, false);
	          _this5.element.addEventListener('mouseup', _this5.evtEnd, false);
	        }
	      };
	      if (events) {
	        for (var evt in events) {
	          this.events[evt] = events[evt];
	          this._events[evt] = this.transformEvent(events[evt]);
	          if (_utils2.default.checkEvent(evt) && evt !== 'swipe') {
	            this.element.addEventListener(evt, this._events[evt]);
	          } else if (evt === 'swipe') {
	            applySwipeEvent(evt);
	          } else {
	            this.addListener(evt, this.events[evt]);
	          }
	        }
	      } else if ((0, _keys2.default)(this.events).length > 0) {
	        for (var _evt in this.events) {
	          if (_evt === 'swipe') {
	            applySwipeEvent(_evt);
	          } else {
	            this._events[_evt] = this.transformEvent(this.events[_evt]);
	            if (_utils2.default.checkEvent(_evt)) {
	              this.element.addEventListener(_evt, this._events[_evt]);
	            } else {
	              this.addListener(_evt, this.events[_evt]);
	            }
	          }
	        }
	      }
	      return this;
	    }

	    /**
	    * @function
	    * Remove an event by eventName
	    * @param {string} eventName - name of the event
	    * @return {object} MultimediaObject
	    */

	  }, {
	    key: 'removeEvent',
	    value: function removeEvent(eventName) {
	      if (_utils2.default.checkEvent(eventName)) {
	        if (this.events[eventName]) {
	          this.element.removeEventListener(eventName, this._events[eventName]);
	          delete this.events[eventName];
	          delete this._events[eventName];
	        } else {
	          console.log('Event does not exist');
	        }
	      } else if (eventName === 'swipe') {
	        this.element.removeEventListener('touchstart', this.evtStart);
	        this.element.removeEventListener('touchmove', this.evtEnd);
	        this.element.removeEventListener('touchend', this.evtEnd);
	        this.element.removeEventListener('mousedown', this.evtStart);
	        this.element.removeEventListener('mousemove', this.evtEnd);
	        this.element.removeEventListener('mouseup', this.evtEnd);
	        delete this.events[eventName];
	        delete this._events[eventName];
	      } else if (this.events[eventName]) {
	        this.removeListener(eventName, this._events[eventName]);
	        delete this.events[eventName];
	        delete this._events[eventName];
	      } else {
	        console.log('Event does not exist');
	      }
	      return this;
	    }
	  }, {
	    key: 'deactivateEvent',
	    value: function deactivateEvent(eventName) {
	      if (this.events[eventName]) {
	        if (_utils2.default.checkEvent(eventName)) {
	          this.element.removeEventListener(eventName, this._events[eventName]);
	        } else if (eventName === 'swipe') {
	          this.element.removeEventListener('touchstart', this.evtStart);
	          this.element.removeEventListener('touchmove', this.evtEnd);
	          this.element.removeEventListener('touchend', this.evtEnd);
	          this.element.removeEventListener('mousedown', this.evtStart);
	          this.element.removeEventListener('mousemove', this.evtEnd);
	          this.element.removeEventListener('mouseup', this.evtEnd);
	        } else {
	          this.removeListener(eventName, this._events[eventName]);
	        }
	      } else {
	        console.log('Event does not exist');
	      }
	    }

	    /**
	    * @function
	    * Remove a function by name
	    * @param {string} eventName - name of the function
	    * @return {object} MultimediaObject
	    */

	  }, {
	    key: 'removeFunction',
	    value: function removeFunction(functionName) {
	      if (this.functions[functionName]) {
	        delete this.functions[functionName];
	      } else {
	        console.log('Function does not exist');
	      }
	      return this;
	    }

	    /**
	    * @function
	    * Remove a propertie
	    * @param {string} type - type of propertie
	    * @param {string} propertieName - name of the propertie
	    * @return {object} MultimediaObject
	    */

	  }, {
	    key: 'removePropertie',
	    value: function removePropertie(type, propertieName) {
	      var _this6 = this;

	      switch (type) {
	        case 'attributes':
	          if (this.attributes[propertieName]) {
	            this.element.removeAttribute(propertieName);
	            delete this.attributes[propertieName];
	          } else {
	            console.log(propertieName + ' attribute does not exist');
	          }
	          break;
	        case 'data':
	          if (this.data[propertieName]) {
	            delete this.data[propertieName];
	          } else {
	            console.log(propertieName + ' data does not exist');
	          }
	          break;
	        case 'style':
	        default:
	          if (this._style[propertieName]) {
	            this.element.style[_utils2.default.propertyWithPrefix(propertieName)] = '';
	            this.element.style[propertieName] = '';
	            if (_utils2.default.transformProperties.contains(propertieName)) {
	              this.element.style[_utils2.default.propertyWithPrefix('transform')] = '';
	              this.element.style.transform = '';
	            }
	            delete this.style[propertieName];
	            delete this._style[propertieName];
	            var containsTransformProps = function () {
	              var keys = (0, _keys2.default)(_this6._style),
	                  hasTransform = false;
	              for (var key = 0; key < keys.length; key++) {
	                if (_utils2.default.transformProperties.contains(keys[key])) {
	                  hasTransform = true;
	                  break;
	                }
	              }
	              return hasTransform;
	            }();
	            if (!containsTransformProps) {
	              delete this.style.transform;
	              delete this._style.transform;
	              delete this.style[_utils2.default.propertyWithPrefix('transform')];
	              delete this._style[_utils2.default.propertyWithPrefix('transform')];
	            }
	          } else if (this.style[propertieName]) {
	            if (_utils2.default.transformProperties.contains(propertieName)) {
	              this.element.style[_utils2.default.propertyWithPrefix('transform')] = '';
	              this.element.style.transform = '';
	            }
	            this.element.style[_utils2.default.propertyWithPrefix(propertieName)] = '';
	            this.element.style[propertieName] = '';
	            delete this.style[propertieName];
	          } else {
	            console.log(propertieName + ' style does not exist');
	          }
	      }

	      return this;
	    }

	    /**
	    * @function
	    * tranform event to get access to it with removeEventListener
	    * @param {function} callback - the event you want to transform
	    * @return {function} function
	    */

	  }, {
	    key: 'transformEvent',
	    value: function transformEvent(callback) {
	      var parent = this;
	      return function (event) {
	        callback.apply(parent, [event]);
	      };
	    }
	  }, {
	    key: 'checkBreakpoints',
	    value: function checkBreakpoints() {
	      var _this7 = this;

	      var winW = window.MultimediaObjectEditor ? 'parseInt(getComputedStyle(document.getElementById(\'' + conf.container + '\')).width)' : 'window.innerWidth',
	          winH = window.MultimediaObjectEditor ? 'parseInt(getComputedStyle(document.getElementById(\'' + conf.container + '\')).height)' : 'window.innerHeight';
	      if (this.breakpoints.length > 0) {
	        (function () {
	          var style = {};
	          for (var w in _this7._style) {
	            style[w] = _this7._style[w];
	          }
	          _this7.breakpoints.forEach(function (breakpoint, index) {
	            var conditions = [];
	            for (var breaks in breakpoint.querie) {
	              if (breaks === 'orientation') {
	                conditions.push('' + (breakpoint.querie[breaks] === 'landscape' ? winW + ' > ' + winH : winH + ' > ' + winW));
	              } else {
	                conditions.push((/height/.test(breaks) ? winH : winW) + ' ' + (/min/.test(breaks) ? '>=' : '<=') + ' ' + parseInt(breakpoint.querie[breaks]));
	              }
	            }
	            var evaluatedRule = '';

	            conditions.forEach(function (rule, index) {
	              if (index >= 1) {
	                evaluatedRule += ' && ' + rule;
	              } else {
	                evaluatedRule += rule;
	              }
	            });
	            evaluatedRule = new Function('return ' + evaluatedRule);
	            if (evaluatedRule()) {
	              for (var s in breakpoint.style) {
	                style[s] = breakpoint.style[s];
	              }
	            }
	          });
	          if (_this7.computedAnimations.length > 0) {
	            for (var _w in _this7.computedAnimations[_this7.currentIteration]) {
	              style[_w] = _this7.computedAnimations[_this7.currentIteration][_w];
	            }
	          }
	          _this7.applyStyle(style);
	        })();
	      }
	    }

	    /**
	    * @function
	    * Generates the DOMElement based on type parameter
	    * @param {string} type - type of DOMElement
	    * @return {object} MultimediaObject
	    */

	  }, {
	    key: 'generate',
	    value: function generate(type) {
	      var _this8 = this;

	      this.element = document.createElement(type);
	      this.type = type;
	      window.addEventListener('resize', function () {
	        _this8.checkBreakpoints();
	      });
	      _customEventManager2.default.addListener('resize-scene', function () {
	        _this8.checkBreakpoints();
	      });
	      return this;
	    }

	    /**
	    * @function
	    * append MultimediaObject.element to container parameter
	    * @param {DOMElement or MultimediaObject} container - the container to append to
	    * @return {object} MultimediaObject
	    */

	  }, {
	    key: 'appendElementTo',
	    value: function appendElementTo(container) {
	      var _this9 = this;

	      if (container) {
	        if (container instanceof MultimediaObject) {
	          container.element.appendChild(this.element);
	        } else {
	          container.appendChild(this.element);
	        }
	        this.DOMParent = container;
	        var childsLength = this.childs.length,
	            i = 0;

	        if (childsLength > 0) {
	          this.childs.forEach(function (child, index) {
	            child.DOMParent = _this9;
	            child.appendElementTo(_this9);
	          });
	        }
	      } else {
	        document.body.appendChild(this.element);
	        this.DOMParent = document.body;
	        var _childsLength = this.childs.length,
	            _i = 0;

	        if (_childsLength > 0) {
	          this.childs.forEach(function (child, index) {
	            child.DOMParent = _this9;
	            child.appendElementTo(_this9);
	          });
	        }
	      }
	      if (this.initializer) {
	        this.initializer();
	      }
	      return this;
	    }

	    /**
	    * @function
	    * add children to MultimediaObject
	    * @param {DOMElement} child - the child to add
	    * @return {object} MultimediaObject
	    */

	  }, {
	    key: 'add',
	    value: function add(child) {
	      this.childs.push(child);
	      if (child instanceof MultimediaObject) {
	        this.element.appendChild(child.element);
	      } else {
	        this.element.appendChild(child);
	      }
	      child.DOMParent = this;
	      _customEventManager2.default.dispatchEvent('actualize-DOM-elements');
	      return this;
	    }

	    /**
	    * @function
	    * removes a child from a MultimediaObject
	    * @param {DOMElement} child - the child to remove
	    * @return {object} MultimediaObject
	    */

	  }, {
	    key: 'remove',
	    value: function remove(child) {
	      var elementIndex = this.childs.indexOf(child);
	      if (elementIndex >= 0) {
	        this.childs.splice(elementIndex, 1);
	        if (child instanceof MultimediaObject) {
	          this.element.removeChild(child.element);
	        } else {
	          this.element.removeChild(child);
	        }
	        child.DOMParent = null;
	      }
	      _customEventManager2.default.dispatchEvent('actualize-DOM-elements');
	      return this;
	    }

	    /**
	    * @function
	    * get the computed style of a CSS propertie
	    * @param {string} propertie - the css propertie
	    * @return {string} css - pixel value
	    */

	  }, {
	    key: 'getComputedStyle',
	    value: function (_getComputedStyle) {
	      function getComputedStyle(_x) {
	        return _getComputedStyle.apply(this, arguments);
	      }

	      getComputedStyle.toString = function () {
	        return _getComputedStyle.toString();
	      };

	      return getComputedStyle;
	    }(function (propertie) {
	      return getComputedStyle(this.element, null).getPropertyValue(propertie);
	    })

	    /**
	    * @function
	    * pre interpolate animations steps for interpolation
	    * @param {int} fps - the framerate to use as base for the frame computation
	    * @return {object} MultimediaObject
	    */

	  }, {
	    key: 'preInterpolateStep',
	    value: function preInterpolateStep(fps) {
	      var _this10 = this;

	      this.getSortedSteps();
	      var isAnimatedEvent = function isAnimatedEvent(string) {
	        if ((0, _keys2.default)(_this10._events).join().indexOf(string) >= 0) {
	          return true;
	        }
	        return false;
	      },
	          totalAnimationTime = _utils2.default.getMaxOfArray(this.numericSteps),
	          totalAnimationIteration = Math.floor(totalAnimationTime * fps);

	      this.animatedProps = {};
	      var lastStep = void 0;

	      for (var secIndex = 0; secIndex < this.numericSteps.length; secIndex++) {
	        var second = this.numericSteps[secIndex].toFixed(2);
	        var easing = void 0;
	        // console.log("animations : ", this.currentAnimation);

	        for (var prop in this.currentAnimation[second]) {
	          if (prop !== 'easing') {
	            if (!this.animatedProps[prop]) {
	              this.animatedProps[prop] = {};
	              this.animatedProps[prop].label = prop;
	              this.animatedProps[prop].steps = {};
	            }

	            if (!this.animatedProps[prop].steps[second]) {
	              this.animatedProps[prop].steps[second] = {};
	            }
	            var stepPropKeys = (0, _keys2.default)(this.animatedProps[prop].steps),
	                lastStepProp = stepPropKeys.length > 1 ? stepPropKeys[stepPropKeys.length - 2] : undefined;

	            lastStep = lastStepProp ? this.animatedProps[prop].steps[lastStepProp] : undefined;

	            if (/color/ig.test(prop)) {
	              var colorObj = _utils2.default.transformToColor(this.currentAnimation[second][prop]);
	              this.animatedProps[prop].steps[second].startValue = lastStep ? lastStep.endValue : this._style[prop] ? _utils2.default.transformToColor(this._style[prop]) : { r: 0, g: 0, b: 0 };
	              this.animatedProps[prop].steps[second].unit = typeof this.currentAnimation[second][prop] === 'string' ? _utils2.default.getUnitFromString(this.currentAnimation[second][prop] || '') : '';
	              this.animatedProps[prop].steps[second].endValue = colorObj;
	              this.animatedProps[prop].steps[second].changeInValue = {
	                r: this.animatedProps[prop].steps[second].endValue.r - this.animatedProps[prop].steps[second].startValue.r,
	                g: this.animatedProps[prop].steps[second].endValue.g - this.animatedProps[prop].steps[second].startValue.g,
	                b: this.animatedProps[prop].steps[second].endValue.b - this.animatedProps[prop].steps[second].startValue.b,
	                a: this.animatedProps[prop].steps[second].endValue.a - this.animatedProps[prop].steps[second].startValue.a
	              };
	              this.animatedProps[prop].steps[second].initIteration = lastStepProp ? Math.floor(lastStepProp * fps) : 0;
	              this.animatedProps[prop].steps[second].totalStepIteration = Math.floor(second * fps - this.animatedProps[prop].steps[second].initIteration);
	              this.animatedProps[prop].steps[second].easing = this.currentAnimation[second].easing;
	              this.animatedProps[prop].steps[second].currentIteration = 0;
	            } else if (!/\d/g.test(this.currentAnimation[second][prop])) {
	              this.animatedProps[prop].steps[second].startValue = lastStep ? lastStep.endValue : this._style[prop] ? this._style[prop] : 'auto';
	              this.animatedProps[prop].steps[second].unit = '';
	              this.animatedProps[prop].steps[second].endValue = this.currentAnimation[second][prop];
	              this.animatedProps[prop].steps[second].changeInValue = this.animatedProps[prop].steps[second].endValue;
	              this.animatedProps[prop].steps[second].initIteration = lastStepProp ? Math.floor(lastStepProp * fps) : 0;
	              this.animatedProps[prop].steps[second].totalStepIteration = Math.floor(second * fps) - this.animatedProps[prop].steps[second].initIteration;
	              this.animatedProps[prop].steps[second].easing = this.currentAnimation[second].easing;
	              this.animatedProps[prop].steps[second].currentIteration = 0;
	            } else {
	              this.animatedProps[prop].steps[second].startValue = parseFloat(lastStep ? lastStep.endValue : this._style[prop] ? parseFloat(this._style[prop]) : 0);
	              this.animatedProps[prop].steps[second].unit = typeof this.currentAnimation[second][prop] === 'string' && /px|%/g.test(this.currentAnimation[second][prop]) ? _utils2.default.getUnitFromString(this.currentAnimation[second][prop] || '') : '';
	              this.animatedProps[prop].steps[second].endValue = parseFloat(this.currentAnimation[second][prop]);
	              this.animatedProps[prop].steps[second].changeInValue = parseFloat(this.animatedProps[prop].steps[second].endValue - this.animatedProps[prop].steps[second].startValue);
	              this.animatedProps[prop].steps[second].initIteration = lastStepProp ? Math.floor(lastStepProp * fps) : 0;
	              this.animatedProps[prop].steps[second].totalStepIteration = Math.floor(second * fps) - this.animatedProps[prop].steps[second].initIteration;
	              this.animatedProps[prop].steps[second].easing = this.currentAnimation[second].easing;
	              this.animatedProps[prop].steps[second].currentIteration = 0;
	            }
	            // console.log(this.currentAnimation[second][prop],this.animatedProps[prop].steps[second].endValue);
	          }
	        }
	      }

	      // console.log(this.animatedProps);

	      this.computedAnimations = !this.computedAnimations || [];

	      for (var _prop in this.animatedProps) {
	        if (!isAnimatedEvent(_prop)) {
	          for (var iteration = 0; iteration <= totalAnimationIteration; iteration++) {
	            var propNumericSteps = (0, _keys2.default)(this.animatedProps[_prop].steps),
	                iterationSeconds = iteration / totalAnimationIteration * totalAnimationTime,
	                secondsElapsed = isFinite(iterationSeconds) ? Number(iterationSeconds).toFixed(2) : 0,
	                stepSecond = _utils2.default.closest(secondsElapsed, propNumericSteps);

	            if (!this.computedAnimations[iteration]) {
	              this.computedAnimations[iteration] = {};
	            }
	            if (/color/ig.test(_prop)) {
	              var _easing = this.animatedProps[_prop].steps[stepSecond].easing || 'linearEase',
	                  actualIteration = this.animatedProps[_prop].steps[stepSecond].currentIteration,
	                  startValue = this.animatedProps[_prop].steps[stepSecond].startValue,
	                  endValue = this.animatedProps[_prop].steps[stepSecond].endValue,
	                  changeInValue = this.animatedProps[_prop].steps[stepSecond].changeInValue,
	                  totalIterationValue = this.animatedProps[_prop].steps[stepSecond].totalStepIteration,
	                  r = actualIteration < totalIterationValue ? parseInt(_easings2.default[_easing](actualIteration, startValue.r, changeInValue.r, totalIterationValue)) : endValue.r,
	                  g = actualIteration < totalIterationValue ? parseInt(_easings2.default[_easing](actualIteration, startValue.g, changeInValue.g, totalIterationValue)) : endValue.g,
	                  b = actualIteration < totalIterationValue ? parseInt(_easings2.default[_easing](actualIteration, startValue.b, changeInValue.b, totalIterationValue)) : endValue.b,
	                  a = actualIteration < totalIterationValue ? Number(_easings2.default[_easing](actualIteration, startValue.a, changeInValue.a, totalIterationValue).toFixed(2)) : endValue.a;

	              this.computedAnimations[iteration][_prop] = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
	              // console.log(this.computedAnimations[iteration][prop]);
	            } else if (!/\d/g.test(this.animatedProps[_prop].steps[stepSecond].startValue)) {
	              var _easing2 = this.animatedProps[_prop].steps[stepSecond].easing || 'linearEase',
	                  _actualIteration = this.animatedProps[_prop].steps[stepSecond].currentIteration,
	                  _startValue = this.animatedProps[_prop].steps[stepSecond].startValue,
	                  _endValue = this.animatedProps[_prop].steps[stepSecond].endValue,
	                  _changeInValue = this.animatedProps[_prop].steps[stepSecond].changeInValue,
	                  _totalIterationValue = this.animatedProps[_prop].steps[stepSecond].totalStepIteration,
	                  value = _actualIteration < _totalIterationValue - 1 ? _startValue : _endValue;
	              // console.log(prop,this.animatedProps[prop].steps[stepSecond].initIteration,iteration,actualIteration,totalIterationValue,totalAnimationIteration);

	              this.computedAnimations[iteration][_prop] = value + this.animatedProps[_prop].steps[stepSecond].unit;
	            } else {
	              var _easing3 = this.animatedProps[_prop].steps[stepSecond].easing || 'linearEase',
	                  _actualIteration2 = this.animatedProps[_prop].steps[stepSecond].currentIteration,
	                  _startValue2 = this.animatedProps[_prop].steps[stepSecond].startValue,
	                  _endValue2 = this.animatedProps[_prop].steps[stepSecond].endValue,
	                  _changeInValue2 = this.animatedProps[_prop].steps[stepSecond].changeInValue,
	                  _totalIterationValue2 = this.animatedProps[_prop].steps[stepSecond].totalStepIteration,
	                  _value = _actualIteration2 < _totalIterationValue2 - 1 ? _easings2.default[_easing3](_actualIteration2, _startValue2, _changeInValue2, _totalIterationValue2) : _endValue2;
	              // console.log(prop,this.animatedProps[prop].steps[stepSecond].initIteration,iteration,actualIteration,totalIterationValue,totalAnimationIteration);

	              this.computedAnimations[iteration][_prop] = _value + this.animatedProps[_prop].steps[stepSecond].unit;
	            }

	            if (iteration >= this.animatedProps[_prop].steps[stepSecond].initIteration && this.animatedProps[_prop].steps[stepSecond].currentIteration <= this.animatedProps[_prop].steps[stepSecond].totalStepIteration) {
	              this.animatedProps[_prop].steps[stepSecond].currentIteration++;
	            }
	          }
	        } else {
	          for (var sec in this.animatedProps[_prop].steps) {
	            var iterationSec = Math.floor(Number(sec) * this.fps);
	            if (!this.computedAnimations[iterationSec]) {
	              this.computedAnimations[iterationSec] = {};
	            }
	            this.computedAnimations[iterationSec][_prop] = this.animatedProps[_prop].steps[sec].endValue;
	          }
	        }
	      }

	      // console.log(this.computedAnimations);
	      return this;
	    }

	    /**
	    * @function
	    * frame interpolation, takes the value present at a certain frame in the interpolatedSteps array and apply it as style
	    * needs an animation loop
	    * @param {int} currentIteration - the current frame
	    * @param {float} seconds - the current frame
	    * @param {int} fps - the framerate to preinterpolate if needed
	    * @return {object} MultimediaObject
	    */

	  }, {
	    key: 'interpolateStep',
	    value: function interpolateStep(currentIteration, seconds, fps) {
	      var animationsLength = this.computedAnimations.length;
	      // console.log(animationsLength,currentIteration);
	      if (animationsLength <= 0) {
	        this.preInterpolateStep(fps);
	      }
	      // console.log(this.computedAnimations[currentIteration]);
	      if (currentIteration <= 1 && !this.animationStarted) {
	        _customEventManager2.default.dispatchEvent(this.uuid + '-animationStart');
	        this.currentIteration = currentIteration;
	        this.applyIteration();
	      }
	      if (animationsLength > currentIteration) {
	        this.animated = true;
	        this.currentIteration = currentIteration;
	        this.applyIteration();
	        this.checkBreakpoints();
	      }
	      if (animationsLength === currentIteration) {
	        this.stopAnimation();
	        this.currentIteration = animationsLength - 1;
	        _customEventManager2.default.dispatchEvent(this.uuid + '-animationEnd');
	      }
	      // console.log(animationsLength, currentIteration, this.animationStarted);

	      return this;
	    }
	  }, {
	    key: 'applyIteration',
	    value: function applyIteration() {
	      if (this.computedAnimations[this.currentIteration]) {
	        var style = (0, _create2.default)(this.computedAnimations[this.currentIteration]);
	        for (var key in this.computedAnimations[this.currentIteration]) {
	          if (!_utils2.default.isAnimatableProp(key)) {
	            this.dispatchEvent(key, { value: this.computedAnimations[this.currentIteration][key] });
	            delete style[key];
	          }
	        }
	        this.applyStyle(style);
	      }
	    }
	  }, {
	    key: 'restartAnimation',
	    value: function restartAnimation() {
	      this.stopAnimation();
	      this.counter = 0;
	      this.runAnimation();
	    }
	  }, {
	    key: 'startAnimation',
	    value: function startAnimation() {
	      this.animationStarted = true;
	      this.runAnimation();
	      // this.childs.forEach(function(child){
	      //   if(child.data.autostart){
	      //     child.startAnimation();
	      //   }
	      // });
	    }
	  }, {
	    key: 'stopAnimation',
	    value: function stopAnimation() {
	      this.animationStarted = false;
	      this.animated = false;
	      // this.counter = 0;
	      window.cancelAnimationFrame(this.rafID);
	      // this.childs.forEach(function(child){
	      //   child.stopAnimation();
	      // });
	    }
	  }, {
	    key: 'runAnimation',
	    value: function runAnimation() {
	      var _this11 = this;

	      this.rafID = window.requestAnimationFrame(function (time) {
	        _this11.runAnimation();
	      });
	      if ((0, _keys2.default)(this.currentAnimation).length > 0) {
	        this.now = performance.now() || Date.now();
	        this.delta = this.now - this.then;
	        if (!this.animationStarted) {
	          this.animationStarted = true;
	          this.totalTime = Number(this.getSortedSteps()[this.getSortedSteps().length - 1]);
	          this.totalIteration = this.totalTime * this.fps;
	        } else if (this.delta > this.interval) {
	          this.then = this.now - this.delta % this.interval;

	          if (!this.reverse) {
	            this.counter++;
	          } else {
	            if (this.counter <= 0) {
	              this.counter = this.totalIteration;
	              // console.log(this.counter);
	            }
	            this.counter--;
	          }

	          var sec = performance.now() || Date.now(),
	              dateSec = new Date(sec - this.startTime),
	              iterationSeconds = this.counter / this.totalIteration * this.totalTime;

	          this.secondsElapsed = isFinite(iterationSeconds) ? Number(iterationSeconds).toFixed(2) : 0;

	          // console.log(this.secondsElapsed, this.totalIteration);

	          this.interpolateStep(this.counter, this.secondsElapsed, this.fps);

	          if (this.counter >= this.totalIteration && !this.reverse) {
	            if (this.repeat > 0 && this.repeatCounter < this.repeat) {
	              this.counter = 0;
	              this.repeatCounter++;
	            }
	          } else if (this.counter == 1 && this.reverse) {
	            if (this.repeat > 0 && this.repeatCounter < this.repeat) {
	              this.counter = 0;
	              this.repeatCounter++;
	            }
	          }
	          // console.log(this.secondsElapsed);
	        }
	      }
	    }
	  }, {
	    key: 'addListener',
	    value: function addListener(listener, fn, glob) {
	      glob = glob || /global/ig.test(listener);
	      if (glob) {
	        return _customEventManager2.default.addListener(listener, fn);
	      }
	      return _customEventManager2.default.addListener(this.uuid + '-' + listener, fn);
	    }
	  }, {
	    key: 'removeListener',
	    value: function removeListener(listener, fn, glob) {
	      glob = glob || /global/ig.test(listener);
	      if (glob) {
	        if (fn instanceof Function) {
	          return _customEventManager2.default.removeListener(listener, fn);
	        }
	        return _customEventManager2.default.removeListener(listener, this[fn]);
	      } else if (fn instanceof Function) {
	        return _customEventManager2.default.removeListener(this.uuid + '-' + listener, fn);
	      }
	      return _customEventManager2.default.removeListener(this.uuid + '-' + listener, this[fn]);
	    }
	  }, {
	    key: 'dispatchEvent',
	    value: function dispatchEvent(eventName, params, glob) {
	      glob = glob || /global/ig.test(eventName);
	      if (glob) {
	        return _customEventManager2.default.dispatchEvent(eventName, params, this);
	      }
	      return _customEventManager2.default.dispatchEvent(this.uuid + '-' + eventName, params, this);
	    }
	  }, {
	    key: 'changeAnimation',
	    value: function changeAnimation(animationName) {
	      this.animations[this.selectedAnimation] = this.currentAnimation;
	      this.selectedAnimation = animationName;
	      this.computedSteps = [];
	      this.currentAnimation = this.animations[this.selectedAnimation] || {};
	      this.animations[this.selectedAnimation] = this.animations[this.selectedAnimation] || this.currentAnimation;

	      this.applyStyle(this._style);
	      this.stopAnimation();
	      this.preInterpolateStep(this.timeline ? this.timeline.fps : this.fps);
	      if (this.timeline) {
	        this.timeline.computeSteps();
	        this.timeline.stop();
	      }
	      if (this.timeline && this.timeline.UI) {
	        this.timeline.UI.insertInterface();
	      }
	    }
	  }, {
	    key: 'addAnimationProperties',
	    value: function addAnimationProperties(propertieArray) {
	      var _this12 = this;

	      var _parent = this,
	          existingProp = (0, _keys2.default)(this.animatedProps),
	          time = this.timeline ? Number(this.timeline.secondsElapsed) : 0;

	      time = time === 0 ? 0.00 : time;
	      propertieArray.forEach(function (refProp, index) {
	        var prop = refProp.key || refProp,
	            value = refProp.value || _this12._style[prop] || 0;

	        if (existingProp.indexOf(prop) === -1) {
	          if (!_this12.currentAnimation[time]) {
	            _this12.currentAnimation[time] = {};
	          }
	          _this12.currentAnimation[time][prop] = value;
	        }
	      });
	      this.animations[this.selectedAnimation] = this.currentAnimation;
	      this.preInterpolateStep(this.timeline ? this.timeline.fps : this.fps);
	      if (this.timeline) {
	        this.timeline.computeSteps();
	      }
	      if (this.timeline && this.timeline.UI) {
	        this.timeline.UI.insertInterface();
	      }
	      return this;
	    }
	  }, {
	    key: 'deleteAnimationProperties',
	    value: function deleteAnimationProperties(propertieArray) {
	      var _this13 = this;

	      propertieArray.forEach(function (refProp, index) {
	        for (var step in _this13.currentAnimation) {
	          for (var prop in _this13.currentAnimation[step]) {
	            if (prop === refProp) {
	              delete _this13.currentAnimation[step][prop];
	            }
	          }
	        }
	      });
	      this.animations[this.selectedAnimation] = this.currentAnimation;
	      this.preInterpolateStep(this.timeline.fps || this.fps);
	      if (this.timeline) {
	        this.timeline.computeSteps();
	      }
	      this.dispatchEvent('actualize-timeline-elements', {}, true);
	      return this;
	    }
	  }, {
	    key: 'deleteAnimationKeyframe',
	    value: function deleteAnimationKeyframe(time, prop) {
	      if (this.currentAnimation[time]) {
	        if (prop) {
	          delete this.currentAnimation[time][prop];
	        } else {
	          delete this.currentAnimation[time];
	        }
	        if ((0, _keys2.default)(this.currentAnimation[time]).length === 1) {
	          delete this.currentAnimation[time];
	        }
	        this.animations[this.selectedAnimation] = this.currentAnimation;
	        this.preInterpolateStep(this.timeline.fps || this.fps);
	        if (this.timeline) {
	          this.timeline.computeSteps();
	        }
	        this.dispatchEvent('actualize-timeline-elements', {}, true);
	      } else {
	        console.log('animation at ' + time + ' don\'t exist');
	      }

	      return this;
	    }
	  }, {
	    key: 'addAnimationKeyframe',
	    value: function addAnimationKeyframe(time, prop, value) {
	      if (!this.currentAnimation[time]) {
	        this.currentAnimation[time] = {};
	      }
	      this.currentAnimation[time][prop] = value;
	      this.animations[this.selectedAnimation] = this.currentAnimation;
	      // console.log(time, prop, value);
	      // console.log(this.currentAnimation, this.animations);
	      this.preInterpolateStep(this.timeline.fps || this.fps);
	      if (this.timeline) {
	        this.timeline.computeSteps();
	      }
	      this.dispatchEvent('actualize-timeline-elements', {}, true);
	      return this;
	    }
	  }, {
	    key: 'getSortedSteps',
	    value: function getSortedSteps() {
	      var numericSteps = (0, _keys2.default)(this.currentAnimation).map(function (val, index) {
	        return parseFloat(val);
	      });
	      numericSteps.sort(function (a, b) {
	        return a - b;
	      });
	      this.numericSteps = numericSteps;
	      for (var t in this.currentAnimation) {
	        // console.log(t);
	        if (!/\d\.\d{2}/.test(t)) {
	          this.currentAnimation[parseFloat(t).toFixed(2)] = this.currentAnimation[t];
	          delete this.currentAnimation[t];
	        } else if ((0, _keys2.default)(this.currentAnimation[t]).length === 0) {
	          delete this.currentAnimation[t];
	        }
	      }
	      return this.numericSteps;
	    }
	  }, {
	    key: 'getTotalAnimationTime',
	    value: function getTotalAnimationTime() {
	      this.getSortedSteps();
	      this.totalAnimationTime = _utils2.default.getMaxOfArray(this.numericSteps);
	      return this.totalAnimationTime;
	    }
	  }, {
	    key: 'exportToJSON',
	    value: function exportToJSON() {
	      var ob = {};
	      ob.exportedEvents = {};
	      ob.exportedFunctions = {};
	      ob.childs = [];

	      for (var p in this) {
	        if (typeof this[p] !== 'undefined' && this[p] !== null) {
	          if (typeof this[p] !== 'function' && !this[p].element && !this[p].children && !this[p].elements && !/exportedFunctions|exportedEvents|childs|interval|then|now|delta|animated|animationStarted|currentIteration|computedAnimations|totalTime|secondsElapsed|rafID|numericSteps|counter|totalIteration|animationStarted|direction|coords|bounds|geo|infowindow|map|marker|shop/.test(p)) {
	            ob[p] = this[p];
	          }
	        }
	      }

	      for (var evt in this.events) {
	        var txt = this.events[evt].toString(),
	            args = txt.slice(txt.indexOf('(') + 1, txt.indexOf(')')).split(','),
	            body = txt.slice(txt.indexOf('{') + 1, txt.lastIndexOf('}'));
	        ob.exportedEvents[evt] = { args: args.map(function (el) {
	            return el.replace(/\s+|\n+|(\/\*\*\/\n)+/g, '');
	          }), body: body };
	      }

	      for (var func in this.functions) {
	        var _txt = this.functions[func].toString(),
	            _args = _txt.slice(_txt.indexOf('(') + 1, _txt.indexOf(')')).split(','),
	            _body = _txt.slice(_txt.indexOf('{') + 1, _txt.lastIndexOf('}'));
	        ob.exportedFunctions[func] = { args: _args.map(function (el) {
	            return el.replace(/\s+|\n+|(\/\*\*\/\n)+/g, '');
	          }), body: _body };
	      }

	      this.childs.forEach(function (child) {
	        ob.childs.push(child.exportToJSON());
	      });

	      ob.style = this._style;
	      ob.attributes = this.attributes;
	      ob.breakpoints = this.breakpoints;
	      ob.globalStyle = this.globalStyle;
	      ob.data = this.data || {};
	      ob.currentAnimation = this.currentAnimation;
	      ob.load = true;
	      ob.type = this.type;
	      ob.data.absoluteAssetURL = this.data.absoluteAssetURL || './';

	      // console.log(ob);
	      return ob;
	    }
	  }, {
	    key: 'setAbsoluteAssetURL',
	    value: function setAbsoluteAssetURL(json) {
	      if (window[conf.namespace] && json) {
	        if (typeof window[conf.namespace].absoluteAssetURL !== 'undefined' && window[conf.namespace].absoluteAssetURL !== 'undefined' && window[conf.namespace].absoluteAssetURL !== '') {
	          this.data.absoluteAssetURL = window[conf.namespace].absoluteAssetURL;
	        } else if (typeof json.data.absoluteAssetURL !== 'undefined' && json.data.absoluteAssetURL !== '' && json.data.absoluteAssetURL !== './') {
	          window[conf.namespace].absoluteAssetURL = json.data.absoluteAssetURL;
	        } else {
	          this.data.absoluteAssetURL = './';
	        }
	      } else {
	        this.data.absoluteAssetURL = json.data && typeof json.data.absoluteAssetURL !== 'undefined' && json.data.absoluteAssetURL !== '' ? json.data.absoluteAssetURL : './';
	      }
	    }
	  }, {
	    key: 'loadFromJSON',
	    value: function loadFromJSON(json) {
	      var _this14 = this;

	      for (var key in json) {
	        if (key === 'animations' && !json.animations.default) {
	          this.currentAnimation = json.animations;
	          this.animations = {};
	          this.animations.default = json.animations;
	        } else {
	          this[key] = json[key];
	        }
	      }

	      for (var evt in json.exportedEvents) {
	        var args = json.exportedEvents[evt].args.map(function (el) {
	          return el.replace(/\s+|\n+|(\/\*\*\/\n)+/g, '');
	        }),
	            body = json.exportedEvents[evt].body;
	        this.events[evt] = new Function(args, body);
	      }

	      for (var func in json.exportedFunctions) {
	        var _args2 = json.exportedFunctions[func].args.map(function (el) {
	          return el.replace(/\s+|\n+|(\/\*\*\/\n)+/g, '');
	        }),
	            _body2 = json.exportedFunctions[func].body;
	        this.functions[func] = new Function(_args2, _body2);
	      }
	      if (json.childs) {
	        json.childs.forEach(function (child, index) {
	          child.load = true;
	          if (json.data) {
	            child.data = child.data || {};
	            // child.data.absoluteAssetURL = json.data.absoluteAssetURL || "";
	            child.data.autostart = eval(child.data.autostart);
	            child.data.absoluteAssetURL = child.data.absoluteAssetURL || '';
	          }
	          child.DOMParent = _this14;
	          _this14.childs[index] = new MultimediaObject(child);
	        });
	      }

	      this.uuid = _utils2.default.generateUUID();
	      this.data = json.data || {};
	      this.type = json.type;
	      this.data.absoluteAssetURL = json.data && json.data.absoluteAssetURL ? json.data.absoluteAssetURL : '';
	      this.data.autostart = json.data ? eval(json.data.autostart) : true;
	      this.setAbsoluteAssetURL(json);
	    }
	  }]);
	  return MultimediaObject;
	}();

	exports.default = MultimediaObject;


	module.exports = MultimediaObject;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(2), __esModule: true };

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(3);
	var $Object = __webpack_require__(6).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(4)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(19)});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(5)
	  , core      = __webpack_require__(6)
	  , ctx       = __webpack_require__(7)
	  , hide      = __webpack_require__(9)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 5 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 6 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(8);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(10)
	  , createDesc = __webpack_require__(18);
	module.exports = __webpack_require__(14) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(11)
	  , IE8_DOM_DEFINE = __webpack_require__(13)
	  , toPrimitive    = __webpack_require__(17)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(14) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(12);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(14) && !__webpack_require__(15)(function(){
	  return Object.defineProperty(__webpack_require__(16)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(15)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(12)
	  , document = __webpack_require__(5).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(12);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(11)
	  , dPs         = __webpack_require__(20)
	  , enumBugKeys = __webpack_require__(35)
	  , IE_PROTO    = __webpack_require__(32)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(16)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(36).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(10)
	  , anObject = __webpack_require__(11)
	  , getKeys  = __webpack_require__(21);

	module.exports = __webpack_require__(14) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(22)
	  , enumBugKeys = __webpack_require__(35);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(23)
	  , toIObject    = __webpack_require__(24)
	  , arrayIndexOf = __webpack_require__(28)(false)
	  , IE_PROTO     = __webpack_require__(32)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(25)
	  , defined = __webpack_require__(27);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(26);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(24)
	  , toLength  = __webpack_require__(29)
	  , toIndex   = __webpack_require__(31);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(30)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(30)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(33)('keys')
	  , uid    = __webpack_require__(34);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(5)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(5).document && document.documentElement;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(38), __esModule: true };

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(39);
	module.exports = __webpack_require__(6).Object.keys;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(40)
	  , $keys    = __webpack_require__(21);

	__webpack_require__(41)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(27);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(4)
	  , core    = __webpack_require__(6)
	  , fails   = __webpack_require__(15);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(43);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(60);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(44), __esModule: true };

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(45);
	__webpack_require__(55);
	module.exports = __webpack_require__(59).f('iterator');

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(46)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(47)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(30)
	  , defined   = __webpack_require__(27);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(48)
	  , $export        = __webpack_require__(4)
	  , redefine       = __webpack_require__(49)
	  , hide           = __webpack_require__(9)
	  , has            = __webpack_require__(23)
	  , Iterators      = __webpack_require__(50)
	  , $iterCreate    = __webpack_require__(51)
	  , setToStringTag = __webpack_require__(52)
	  , getPrototypeOf = __webpack_require__(54)
	  , ITERATOR       = __webpack_require__(53)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 48 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(9);

/***/ },
/* 50 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(19)
	  , descriptor     = __webpack_require__(18)
	  , setToStringTag = __webpack_require__(52)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(9)(IteratorPrototype, __webpack_require__(53)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(10).f
	  , has = __webpack_require__(23)
	  , TAG = __webpack_require__(53)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(33)('wks')
	  , uid        = __webpack_require__(34)
	  , Symbol     = __webpack_require__(5).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(23)
	  , toObject    = __webpack_require__(40)
	  , IE_PROTO    = __webpack_require__(32)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(56);
	var global        = __webpack_require__(5)
	  , hide          = __webpack_require__(9)
	  , Iterators     = __webpack_require__(50)
	  , TO_STRING_TAG = __webpack_require__(53)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(57)
	  , step             = __webpack_require__(58)
	  , Iterators        = __webpack_require__(50)
	  , toIObject        = __webpack_require__(24);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(47)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 57 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 58 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(53);

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(61), __esModule: true };

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(62);
	__webpack_require__(73);
	__webpack_require__(74);
	__webpack_require__(75);
	module.exports = __webpack_require__(6).Symbol;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(5)
	  , has            = __webpack_require__(23)
	  , DESCRIPTORS    = __webpack_require__(14)
	  , $export        = __webpack_require__(4)
	  , redefine       = __webpack_require__(49)
	  , META           = __webpack_require__(63).KEY
	  , $fails         = __webpack_require__(15)
	  , shared         = __webpack_require__(33)
	  , setToStringTag = __webpack_require__(52)
	  , uid            = __webpack_require__(34)
	  , wks            = __webpack_require__(53)
	  , wksExt         = __webpack_require__(59)
	  , wksDefine      = __webpack_require__(64)
	  , keyOf          = __webpack_require__(65)
	  , enumKeys       = __webpack_require__(66)
	  , isArray        = __webpack_require__(69)
	  , anObject       = __webpack_require__(11)
	  , toIObject      = __webpack_require__(24)
	  , toPrimitive    = __webpack_require__(17)
	  , createDesc     = __webpack_require__(18)
	  , _create        = __webpack_require__(19)
	  , gOPNExt        = __webpack_require__(70)
	  , $GOPD          = __webpack_require__(72)
	  , $DP            = __webpack_require__(10)
	  , $keys          = __webpack_require__(21)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(71).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(68).f  = $propertyIsEnumerable;
	  __webpack_require__(67).f = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(48)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(9)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(34)('meta')
	  , isObject = __webpack_require__(12)
	  , has      = __webpack_require__(23)
	  , setDesc  = __webpack_require__(10).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(15)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(5)
	  , core           = __webpack_require__(6)
	  , LIBRARY        = __webpack_require__(48)
	  , wksExt         = __webpack_require__(59)
	  , defineProperty = __webpack_require__(10).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(21)
	  , toIObject = __webpack_require__(24);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(21)
	  , gOPS    = __webpack_require__(67)
	  , pIE     = __webpack_require__(68);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 67 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 68 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(26);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(24)
	  , gOPN      = __webpack_require__(71).f
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(22)
	  , hiddenKeys = __webpack_require__(35).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(68)
	  , createDesc     = __webpack_require__(18)
	  , toIObject      = __webpack_require__(24)
	  , toPrimitive    = __webpack_require__(17)
	  , has            = __webpack_require__(23)
	  , IE8_DOM_DEFINE = __webpack_require__(13)
	  , gOPD           = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(14) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 73 */
/***/ function(module, exports) {

	

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(64)('asyncIterator');

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(64)('observable');

/***/ },
/* 76 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(78);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(79), __esModule: true };

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(80);
	var $Object = __webpack_require__(6).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(4);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(14), 'Object', {defineProperty: __webpack_require__(10).f});

/***/ },
/* 81 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

	// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

	// MIT license

	exports.default = function () {
	  var lastTime = 0;
	  var vendors = ['ms', 'moz', 'webkit', 'o'];
	  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
	    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
	  }

	  if (!window.requestAnimationFrame) {
	    window.requestAnimationFrame = function (callback) {
	      var currTime = new Date().getTime();
	      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	      var id = window.setTimeout(function () {
	        callback(currTime + timeToCall);
	      }, timeToCall);
	      lastTime = currTime + timeToCall;
	      return id;
	    };
	  }

	  if (!window.cancelAnimationFrame) {
	    window.cancelAnimationFrame = function (id) {
	      clearTimeout(id);
	    };
	  }
	};

	module.exports = exports['default'];

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Set = __webpack_require__(83);

	var _Set2 = _interopRequireDefault(_Set);

	var _data = __webpack_require__(84);

	var _data2 = _interopRequireDefault(_data);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  Atoms: function Atoms() {
	    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'block';

	    var types = _data2.default.Atoms;
	    return types[type];
	  },
	  convertLeftToTime: function convertLeftToTime(base, left, totalTime) {
	    var parentWidth = base;
	    var percentageLeftFromPixel = left * 100 / parentWidth;
	    var timeFromLeft = percentageLeftFromPixel / 98 * totalTime;
	    var result = parseFloat(timeFromLeft).toFixed(2);

	    return parseFloat(result) > totalTime ? totalTime.toFixed(2) : result;
	  },
	  concatObject: function concatObject() {
	    for (var _len = arguments.length, objects = Array(_len), _key = 0; _key < _len; _key++) {
	      objects[_key] = arguments[_key];
	    }

	    var ret = {};
	    var len = arguments.length;
	    for (var i = 0; i < len; i++) {
	      for (var p in objects[i]) {
	        if (!ret[p]) {
	          ret[p] = objects[i][p];
	        }
	      }
	    }
	    return ret;
	  },
	  checkEvent: function checkEvent(evt) {
	    return _data2.default.regex.DOMEvent.test(evt);
	  },
	  getElementsWithAttribute: function getElementsWithAttribute(attribute, value, element) {
	    var matchingElements = [];
	    var allElements = element ? element instanceof Array ? element : document.querySelectorAll(element) : document.getElementsByTagName('*');
	    for (var i = 0, n = allElements.length; i < n; i++) {
	      var attrValue = allElements[i].getAttribute(attribute);
	      if (attrValue !== null) {
	        // Element exists with attribute. Add to array.
	        matchingElements.push(allElements[i]);
	      }
	    }
	    return matchingElements;
	  },
	  getObjectUnderCursor: function getObjectUnderCursor(elements, cursorPosition, callback) {
	    var ret = false;
	    elements.forEach(function (object) {
	      var box = object.element ? object.element.getBoundingClientRect() : object.getBoundingClientRect();
	      if (cursorPosition.x >= box.left && cursorPosition.x <= box.right && cursorPosition.y >= box.top && cursorPosition.y <= box.bottom) {
	        ret = object;
	      }
	    });
	    if (callback) {
	      callback(ret);
	    }
	    return ret;
	  },
	  isEmpty: function isEmpty(obj) {
	    var hasOwnProperty = Object.prototype.hasOwnProperty;

	    // null and undefined are "empty"
	    if (obj == null) {
	      return true;
	    }

	    // Assume if it has a length property with a non-zero value
	    // that that property is correct.
	    if (obj.length > 0) {
	      return false;
	    }
	    if (obj.length === 0) {
	      return true;
	    }

	    // Otherwise, does it have any properties of its own?
	    // Note that this doesn't handle
	    // toString and valueOf enumeration bugs in IE < 9
	    for (var key in obj) {
	      if (hasOwnProperty.call(obj, key)) return false;
	    }

	    return true;
	  },
	  generateRandomHexColor: function generateRandomHexColor() {
	    var rndColour = '#' + Math.floor(Math.random() * 16777215).toString(16);
	    while (rndColour.length < 7) {
	      rndColour += 'f';
	    }
	    return rndColour;
	  },
	  closest: function closest(num, arr) {
	    var sortedArr = arr.sort(function (a, b) {
	      return a - b;
	    });
	    var chosen = void 0;
	    for (var i = 0; i < sortedArr.length; i++) {
	      var prevInd = i;
	      chosen = sortedArr[i];
	      if (i > 0) {
	        prevInd = i - 1;
	      }
	      if (num < sortedArr[i]) {
	        if (num - sortedArr[prevInd] < sortedArr[i] - num) {
	          chosen = sortedArr[prevInd];
	        } else {
	          chosen = sortedArr[i];
	        }
	        break;
	      }
	    }
	    return chosen;
	  },


	  pxProperties: new _Set2.default(_data2.default.sets.pxProperties),
	  degProperties: new _Set2.default(_data2.default.sets.degProperties),
	  transformProperties: new _Set2.default(_data2.default.sets.transformProperties),
	  styleProperties: new _Set2.default(_data2.default.sets.styleProperties),

	  isAnimatableProp: function isAnimatableProp(prop) {
	    return _data2.default.regex.animatableProps.test(prop);
	  },
	  constrain: function constrain(value, min, max) {
	    if (min > value) {
	      return min;
	    }
	    if (max < value) {
	      return max;
	    }
	    return value;
	  },
	  getRandomInt: function getRandomInt(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	  },
	  applyDefaults: function applyDefaults(options, defaults) {
	    for (var k in defaults) {
	      options[k] = defaults[k];
	    }
	    return options;
	  },
	  clone: function clone(o) {
	    var newO = {};
	    var k = void 0;
	    var v = void 0;

	    for (k in o) {
	      v = o[k];
	      newO[k] = v;
	    }
	    return newO;
	  },
	  roundf: function roundf(v, decimal) {
	    var tV = v.toString();
	    var preDecimal = tV.match(/^(.+)!?\./) ? tV.match(/^(.+)!?\./)[0] : '0.';
	    return Number('' + preDecimal + v.toString().replace(preDecimal, '').slice(0, decimal));
	  },
	  toDashed: function toDashed(str) {
	    return str.replace(/([A-Z])/g, function ($1) {
	      return '-' + $1.toLowerCase();
	    });
	  },
	  prefixFor: function prefixFor(property) {
	    var propArray = property.split('-');
	    var ref = ['Webkit', 'Moz', 'ms'];

	    var i = void 0;
	    var j = void 0;
	    var k = void 0;
	    var len = void 0;
	    var len1 = void 0;
	    var prefix = void 0;
	    var prop = void 0;
	    var propertyName = void 0;
	    if (document.body.style[property] !== undefined) {
	      return '';
	    }
	    propertyName = '';
	    for (i = 0, len = propArray.length; i < len; i++) {
	      prop = propArray[i];
	      propertyName += prop.substring(0, 1).toUpperCase() + prop.substring(1);
	    }
	    for (j = 0, len1 = ref.length; j < len1; j++) {
	      prefix = ref[j];
	      k = prefix + propertyName;
	      if (document.body.style[k] !== undefined) {
	        return prefix;
	      }
	    }
	    return '';
	  },
	  propertyWithPrefix: function propertyWithPrefix(property) {
	    var prefix = this.prefixFor(property);
	    if (prefix === 'Moz') {
	      return '' + prefix + (property.substring(0, 1).toUpperCase() + property.substring(1));
	    }
	    if (prefix !== '') {
	      return '-' + prefix.toLowerCase() + '-' + this.toDashed(property);
	    }
	    return this.toDashed(property);
	  },
	  unitForProperty: function unitForProperty(k, v) {
	    if (this.pxProperties.contains(k)) {
	      var unit = this.getUnitFromString(v);
	      return unit !== '' ? unit : 'px';
	    } else if (this.degProperties.contains(k)) {
	      return 'deg';
	    } else if (this.transformProperties.contains(k)) {
	      return '';
	    } else if (this.styleProperties.contains(k)) {
	      return '';
	    }
	    return '';
	  },
	  getMaxOfArray: function getMaxOfArray(numArray) {
	    /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max */
	    var result = void 0;
	    if (numArray instanceof Array && numArray.length > 0) {
	      result = Math.max.apply(null, numArray);
	    }
	    if (!isNaN(result)) {
	      return result;
	    }
	    throw new Error('getMaxOfArray only works on an array');
	  },
	  transformValueForProperty: function transformValueForProperty(k, v) {
	    var _this = this;

	    if (!this.transformProperties.contains(k)) {
	      throw new Error(k + ' is not a transform property');
	    }
	    var value = 0;
	    var unit = void 0;
	    value = typeof v === 'string' && v.indexOf(',') >= 0 ? v.split(',') : this.getNumFromString(v);
	    unit = this.unitForProperty(k, v);
	    if (k.indexOf('scale') >= 0) {
	      unit = '';
	    } else if (this.degProperties.contains(k)) {
	      unit = 'deg';
	    }
	    var string = k + '(' + value + unit + ')';
	    if (value instanceof Array) {
	      value = value.map(function (val) {
	        return _this.getNumFromString(val);
	      });
	      var res = '';
	      value.forEach(function (val, index) {
	        res += index > 0 ? ', ' + val + unit : '' + val + unit;
	      });
	      string = k + '(' + res + ')';
	    }
	    return { string: string, unit: unit, value: value };
	  },
	  generateUUID: function generateUUID() {
	    var d = new Date().getTime();
	    if (window.performance && typeof window.performance.now === 'function') {
	      d += performance.now(); // use high-precision timer if available
	    }
	    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	      var r = (d + Math.random() * 16) % 16 | 0;
	      d = Math.floor(d / 16);
	      return (c === 'x' ? r : r & 0x3 | 0x8).toString(16);
	    });
	    return uuid;
	  },
	  getNumFromString: function getNumFromString(str) {
	    if (typeof str === 'string') {
	      var num = str.match(/-(?=\d)|\d+|\.\d+/g);
	      return num !== null ? parseFloat(num.join('')) : 0;
	    }
	    return typeof parseFloat(str) === 'number' && !isNaN(parseFloat(str)) ? parseFloat(str) : 0;
	  },
	  getUnitFromString: function getUnitFromString(str) {
	    var unit = '';
	    if (typeof str === 'string') {
	      var u = str.match ? str.match(/%|px|vh|vw|em|deg/g) : null;
	      unit = u !== null ? u[0] : '';
	    }
	    return unit;
	  },
	  hexToR: function hexToR(h) {
	    return parseInt(this.cutHex(h).substring(0, 2), 16);
	  },
	  hexToG: function hexToG(h) {
	    return parseInt(this.cutHex(h).substring(2, 4), 16);
	  },
	  hexToB: function hexToB(h) {
	    return parseInt(this.cutHex(h).substring(4, 6), 16);
	  },
	  cutHex: function cutHex(h) {
	    return h.charAt(0) === '#' ? h.substring(1, 7) : h;
	  },
	  rgb2hex: function rgb2hex(red, green, blue) {
	    var rgb = blue | green << 8 | red << 16;
	    return '#' + (0x1000000 + rgb).toString(16).slice(1);
	  },
	  transformToColor: function transformToColor(propertie) {
	    var colorObj = void 0;
	    if (propertie[0] === '#') {
	      colorObj = {
	        r: this.hexToR(propertie),
	        g: this.hexToG(propertie),
	        b: this.hexToB(propertie),
	        a: 1
	      };
	    } else {
	      var par = typeof propertie === 'string' ? propertie.indexOf('(') : -1;
	      if (par >= 0) {
	        propertie = propertie.slice(par + 1, propertie.length - 1);
	      }
	      var rgba = typeof propertie === 'string' ? propertie.split(',') : [0, 0, 0, 0];
	      colorObj = {
	        r: parseInt(rgba[0], 10),
	        g: parseInt(rgba[1], 10),
	        b: parseInt(rgba[2], 10),
	        a: parseFloat(rgba[3] || 1)
	      };
	    }
	    return colorObj;
	  },
	  toCamelCase: function toCamelCase(str) {
	    return str.replace(/(-.)/g, function ($1) {
	      return $1.substr(1, 1).toUpperCase();
	    }).replace(/\s/g, '').replace(/^(.)/, function ($1) {
	      return $1.toLowerCase();
	    });
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(76);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(77);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var type = function type(obj) {
	  var text = obj.constructor.toString();
	  return text.match(/function (.*)\(/)[1];
	};

	var Set = function () {
	  function Set(array) {
	    (0, _classCallCheck3.default)(this, Set);

	    this.obj = {};
	    if (array) {
	      this.add(array);
	    }
	  }

	  (0, _createClass3.default)(Set, [{
	    key: 'contains',
	    value: function contains(v) {
	      return this.obj[v] === 1;
	    }
	  }, {
	    key: 'add',
	    value: function add(array) {
	      var i = void 0;
	      var len = void 0;
	      var v = void 0;
	      if (typeof array !== 'string' && typeof array !== 'number' && type(array).indexOf('Array') < 0) {
	        throw new Error('you can only add an array, a string or a number');
	      }
	      if (typeof array === 'string' || typeof array === 'number') {
	        this.obj[array] = 1;
	      } else {
	        for (i = 0, len = array.length; i < len; i++) {
	          v = array[i];
	          this.obj[v] = 1;
	        }
	      }
	    }
	  }]);
	  return Set;
	}();

	exports.default = Set;
	module.exports = exports['default'];

/***/ },
/* 84 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var pxPropertiesArray = ['baselineShift', 'border', 'borderBottom', 'borderBottomLeftRadius', 'borderBottomRightRadius', 'borderBottomWidth', 'borderImageOutset', 'borderImageWidth', 'borderLeft', 'borderLeftWidth', 'borderRadius', 'borderRight', 'borderRightWidth', 'borderSpacing', 'borderTop', 'borderTopLeftRadius', 'borderTopRightRadius', 'borderTopWidth', 'borderWidth', 'bottom', 'columnGap', 'columnRule', 'columnRuleWidth', 'columnWidth', 'cx', 'cy', 'flexBasis', 'fontSize', 'left', 'letterSpacing', 'lineHeight', 'marginBottom', 'marginLeft', 'marginRight', 'marginTop', 'maxHeight', 'maxWidth', 'minHeight', 'minWidth', 'motion', 'offset', 'offsetDistance', 'outlineOffset', 'outlineWidth', 'paddingBottom', 'paddingLeft', 'paddingRight', 'paddingTop', 'perspective', 'r', 'right', 'rx', 'ry', 'shapeMargin', 'size', 'strokeDasharray', 'strokeDashoffset', 'strokeWidth', 'tabSize', 'textIndent', 'top', 'webkitBorderAfterWidth', 'webkitBorderBeforeWidth', 'webkitBorderEndWidth', 'webkitBorderHorizontalSpacing', 'webkitBorderStartWidth', 'webkitBorderVerticalSpacing', 'webkitFontSizeDelta', 'webkitLogicalHeight', 'webkitLogicalWidth', 'webkitMarginAfter', 'webkitMarginBefore', 'webkitMarginEnd', 'webkitMarginStart', 'webkitMaskBoxImageOutset', 'webkitMaskBoxImageWidth', 'webkitMaskPosition', 'webkitMaskPositionX', 'webkitMaskPositionY', 'webkitMaskSize', 'webkitMaxLogicalHeight', 'webkitMaxLogicalWidth', 'webkitMinLogicalHeight', 'webkitMinLogicalWidth', 'webkitPaddingAfter', 'webkitPaddingBefore', 'webkitPaddingEnd', 'webkitPaddingStart', 'webkitPerspectiveOriginX', 'webkitPerspectiveOriginY', 'webkitTextStroke', 'webkitTextStrokeWidth', 'width', 'wordSpacing', 'x', 'y', 'baseline-shift', 'border-bottom', 'border-bottom-left-radius', 'border-bottom-right-radius', 'border-bottom-width', 'border-image-outset', 'border-image-width', 'border-left', 'border-left-width', 'border-radius', 'border-right', 'border-right-width', 'border-spacing', 'border-top', 'border-top-left-radius', 'border-top-right-radius', 'border-top-width', 'border-width', 'column-gap', 'column-rule', 'column-rule-width', 'column-width', 'flex-basis', 'font-size', 'letter-spacing', 'line-height', 'margin-bottom', 'margin-left', 'margin-right', 'margin-top', 'max-height', 'max-width', 'min-height', 'min-width', 'offset-distance', 'outline-offset', 'outline-width', 'padding-bottom', 'padding-left', 'padding-right', 'padding-top', 'shape-margin', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-width', 'tab-size', 'text-indent', 'webkit-border-after-width', 'webkit-border-before-width', 'webkit-border-end-width', 'webkit-border-horizontal-spacing', 'webkit-border-start-width', 'webkit-border-vertical-spacing', 'webkit-font-size-delta', 'webkit-logical-height', 'webkit-logical-width', 'webkit-margin-after', 'webkit-margin-before', 'webkit-margin-end', 'webkit-margin-start', 'webkit-mask-box-image-outset', 'webkit-mask-box-image-width', 'webkit-mask-position', 'webkit-mask-position-x', 'webkit-mask-position-y', 'webkit-mask-size', 'webkit-max-logical-height', 'webkit-max-logical-width', 'webkit-min-logical-height', 'webkit-min-logical-width', 'webkit-padding-after', 'webkit-padding-before', 'webkit-padding-end', 'webkit-padding-start', 'webkit-text-stroke', 'webkit-text-stroke-width', 'webkit-transform-origin-x', 'webkit-transform-origin-y', 'webkit-transform-origin-z', 'word-spacing', 'translateX', 'translateY', 'translateZ', 'translate-x', 'translate-y', 'translate-z', 'translate'];

	var stylePropertiesArray = ['background', 'flex', 'flexGrow', 'flexShrink', 'objectPosition', 'transformOrigin', 'alignContent', 'alignItems', 'alignSelf', 'alignmentBaseline', 'all', 'animation', 'animationDelay', 'animationDirection', 'animationDuration', 'animationFillMode', 'animationIterationCount', 'animationName', 'animationPlayState', 'animationTimingFunction', 'backfaceVisibility', 'background', 'backgroundAttachment', 'backgroundBlendMode', 'backgroundClip', 'backgroundColor', 'backgroundImage', 'backgroundOrigin', 'backgroundPosition', 'backgroundRepeat', 'backgroundRepeatX', 'backgroundRepeatY', 'borderBottomColor', 'borderBottomStyle', 'borderCollapse', 'borderColor', 'borderImage', 'borderImageRepeat', 'borderImageSlice', 'borderImageSource', 'borderLeftColor', 'borderLeftStyle', 'borderRightColor', 'borderRightStyle', 'borderStyle', 'borderTopColor', 'borderTopStyle', 'boxShadow', 'boxSizing', 'breakAfter', 'breakBefore', 'breakInside', 'bufferedRendering', 'captionSide', 'clear', 'clip', 'clipPath', 'clipRule', 'color', 'colorInterpolation', 'colorInterpolationFilters', 'colorRendering', 'columnCount', 'columnFill', 'columnRuleColor', 'columnRuleStyle', 'columnSpan', 'columns', 'contain', 'content', 'counterIncrement', 'counterReset', 'cursor', 'd', 'direction', 'display', 'dominantBaseline', 'emptyCells', 'fill', 'fillOpacity', 'fillRule', 'filter', 'flexDirection', 'flexFlow', 'flexWrap', 'float', 'floodColor', 'floodOpacity', 'font', 'fontFamily', 'fontFeatureSettings', 'fontKerning', 'fontStretch', 'fontStyle', 'fontVariant', 'fontVariantCaps', 'fontVariantLigatures', 'fontVariantNumeric', 'fontWeight', 'hyphens', 'imageRendering', 'isolation', 'justifyContent', 'lightingColor', 'listStyle', 'listStyleImage', 'listStylePosition', 'listStyleType', 'marker', 'markerEnd', 'markerMid', 'markerStart', 'mask', 'maskType', 'maxZoom', 'minZoom', 'mixBlendMode', 'objectFit', 'offsetPath', 'offsetRotation', 'opacity', 'order', 'orientation', 'orphans', 'outline', 'outlineColor', 'outlineStyle', 'overflow', 'overflowWrap', 'overflowX', 'overflowY', 'page', 'pageBreakAfter', 'pageBreakBefore', 'pageBreakInside', 'paintOrder', 'perspectiveOrigin', 'pointerEvents', 'position', 'quotes', 'resize', 'shapeImageThreshold', 'shapeOutside', 'shapeRendering', 'speak', 'src', 'stopColor', 'stopOpacity', 'stroke', 'strokeLinecap', 'strokeLinejoin', 'strokeMiterlimit', 'strokeOpacity', 'tableLayout', 'textAlign', 'textAlignLast', 'textAnchor', 'textCombineUpright', 'textDecoration', 'textOrientation', 'textOverflow', 'textRendering', 'textShadow', 'textSizeAdjust', 'textTransform', 'touchAction', 'transform', 'transformStyle', 'transition', 'transitionDelay', 'transitionDuration', 'transitionProperty', 'transitionTimingFunction', 'unicodeBidi', 'unicodeRange', 'userSelect', 'userZoom', 'vectorEffect', 'visibility', 'vertical-align', 'verticalAlign', 'webkitAppRegion', 'webkitAppearance', 'webkitBackgroundClip', 'webkitBackgroundOrigin', 'webkitBorderAfter', 'webkitBorderAfterColor', 'webkitBorderAfterStyle', 'webkitBorderBefore', 'webkitBorderBeforeColor', 'webkitBorderBeforeStyle', 'webkitBorderEnd', 'webkitBorderEndColor', 'webkitBorderEndStyle', 'webkitBorderImage', 'webkitBorderStart', 'webkitBorderStartColor', 'webkitBorderStartStyle', 'webkitBoxAlign', 'webkitBoxDecorationBreak', 'webkitBoxDirection', 'webkitBoxFlex', 'webkitBoxFlexGroup', 'webkitBoxLines', 'webkitBoxOrdinalGroup', 'webkitBoxOrient', 'webkitBoxPack', 'webkitBoxReflect', 'webkitColumnBreakAfter', 'webkitColumnBreakBefore', 'webkitColumnBreakInside', 'webkitFontSmoothing', 'webkitHighlight', 'webkitHyphenateCharacter', 'webkitLineBreak', 'webkitLineClamp', 'webkitLocale', 'webkitMarginAfterCollapse', 'webkitMarginBeforeCollapse', 'webkitMarginBottomCollapse', 'webkitMarginCollapse', 'webkitMarginTopCollapse', 'webkitMask', 'webkitMaskBoxImage', 'webkitMaskBoxImageRepeat', 'webkitMaskBoxImageSlice', 'webkitMaskBoxImageSource', 'webkitMaskClip', 'webkitMaskComposite', 'webkitMaskImage', 'webkitMaskOrigin', 'webkitMaskRepeat', 'webkitMaskRepeatX', 'webkitMaskRepeatY', 'webkitPrintColorAdjust', 'webkitRtlOrdering', 'webkitRubyPosition', 'webkitTapHighlightColor', 'webkitTextCombine', 'webkitTextDecorationsInEffect', 'webkitTextEmphasis', 'webkitTextEmphasisColor', 'webkitTextEmphasisPosition', 'webkitTextEmphasisStyle', 'webkitTextFillColor', 'webkitTextOrientation', 'webkitTextSecurity', 'webkitTextStrokeColor', 'webkitUserDrag', 'webkitUserModify', 'webkitWritingMode', 'whiteSpace', 'widows', 'willChange', 'wordBreak', 'wordWrap', 'writingMode', 'zIndex', 'zoom', 'flex-grow', 'flex-shrink', 'object-position', 'transform-origin', 'align-content', 'align-items', 'align-self', 'alignment-baseline', 'animation-delay', 'animation-direction', 'animation-duration', 'animation-fill-mode', 'animation-iteration-count', 'animation-name', 'animation-play-state', 'animation-timing-function', 'backface-visibility', 'background-attachment', 'background-blend-mode', 'background-clip', 'background-color', 'background-image', 'background-origin', 'background-position', 'background-repeat', 'background-repeat-x', 'background-repeat-y', 'border-bottom-color', 'border-bottom-style', 'border-collapse', 'border-color', 'border-image', 'border-image-repeat', 'border-image-slice', 'border-image-source', 'border-left-color', 'border-left-style', 'border-right-color', 'border-right-style', 'border-style', 'border-top-color', 'border-top-style', 'box-shadow', 'box-sizing', 'break-after', 'break-before', 'break-inside', 'buffered-rendering', 'caption-side', 'clip-path', 'clip-rule', 'color-interpolation', 'color-interpolation-filters', 'color-rendering', 'column-count', 'column-fill', 'column-rule-color', 'column-rule-style', 'column-span', 'counter-increment', 'counter-reset', 'dominant-baseline', 'empty-cells', 'fill-opacity', 'fill-rule', 'flex-direction', 'flex-flow', 'flex-wrap', 'flood-color', 'flood-opacity', 'font-family', 'font-feature-settings', 'font-kerning', 'font-stretch', 'font-style', 'font-variant', 'font-variant-caps', 'font-variant-ligatures', 'font-variant-numeric', 'font-weight', 'image-rendering', 'justify-content', 'lighting-color', 'list-style', 'list-style-image', 'list-style-position', 'list-style-type', 'marker-end', 'marker-mid', 'marker-start', 'mask-type', 'max-zoom', 'min-zoom', 'mix-blend-mode', 'object-fit', 'offset-path', 'offset-rotation', 'outline-color', 'outline-style', 'overflow-wrap', 'overflow-x', 'overflow-y', 'page-break-after', 'page-break-before', 'page-break-inside', 'paint-order', 'perspective-origin', 'pointer-events', 'shape-image-threshold', 'shape-outside', 'shape-rendering', 'stop-color', 'stop-opacity', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'table-layout', 'text-align', 'text-align-last', 'text-anchor', 'text-combine-upright', 'text-decoration', 'text-orientation', 'text-overflow', 'text-rendering', 'text-shadow', 'text-size-adjust', 'text-transform', 'touch-action', 'transform-style', 'transition-delay', 'transition-duration', 'transition-property', 'transition-timing-function', 'unicode-bidi', 'unicode-range', 'user-select', 'user-zoom', 'vector-effect', 'webkit-app-region', 'webkit-appearance', 'webkit-background-clip', 'webkit-background-origin', 'webkit-border-after', 'webkit-border-after-color', 'webkit-border-after-style', 'webkit-border-before', 'webkit-border-before-color', 'webkit-border-before-style', 'webkit-border-end', 'webkit-border-end-color', 'webkit-border-end-style', 'webkit-border-image', 'webkit-border-start', 'webkit-border-start-color', 'webkit-border-start-style', 'webkit-box-align', 'webkit-box-decoration-break', 'webkit-box-direction', 'webkit-box-flex', 'webkit-box-flex-group', 'webkit-box-lines', 'webkit-box-ordinal-group', 'webkit-box-orient', 'webkit-box-pack', 'webkit-box-reflect', 'webkit-column-break-after', 'webkit-column-break-before', 'webkit-column-break-inside', 'webkit-font-smoothing', 'webkit-highlight', 'webkit-hyphenate-character', 'webkit-line-break', 'webkit-line-clamp', 'webkit-locale', 'webkit-margin-after-collapse', 'webkit-margin-before-collapse', 'webkit-margin-bottom-collapse', 'webkit-margin-collapse', 'webkit-margin-top-collapse', 'webkit-mask', 'webkit-mask-box-image', 'webkit-mask-box-image-repeat', 'webkit-mask-box-image-slice', 'webkit-mask-box-image-source', 'webkit-mask-clip', 'webkit-mask-composite', 'webkit-mask-image', 'webkit-mask-origin', 'webkit-mask-repeat', 'webkit-mask-repeat-x', 'webkit-mask-repeat-y', 'webkit-print-color-adjust', 'webkit-rtl-ordering', 'webkit-ruby-position', 'webkit-tap-highlight-color', 'webkit-text-combine', 'webkit-text-decorations-in-effect', 'webkit-text-emphasis', 'webkit-text-emphasis-color', 'webkit-text-emphasis-position', 'webkit-text-emphasis-style', 'webkit-text-fill-color', 'webkit-text-orientation', 'webkit-text-security', 'webkit-text-stroke-color', 'webkit-user-drag', 'webkit-user-modify', 'webkit-writing-mode', 'white-space', 'will-change', 'word-break', 'word-wrap', 'writing-mode', 'z-index', 'zoom'];

	exports.default = {
	  Atoms: {
	    block: 'div',
	    div: 'div',
	    header: 'header',
	    footer: 'footer',
	    aside: 'aside',
	    article: 'article',
	    main: 'main',
	    nav: 'nav',
	    navigation: 'nav',
	    span: 'span',
	    text: 'p',
	    p: 'p',
	    paragraphe: 'p',
	    'ulist-container': 'ul',
	    ulist: 'ul',
	    ul: 'ul',
	    'unordered-list': 'ul',
	    'olist-container': 'ol',
	    olist: 'ol',
	    ol: 'ol',
	    'ordered-list': 'ol',
	    'list-element': 'li',
	    li: 'li',
	    code: 'pre',
	    pre: 'pre',
	    input: 'input',
	    textarea: 'textarea',
	    form: 'form',
	    image: 'img',
	    img: 'img',
	    button: 'button',
	    iframe: 'iframe',
	    video: 'video',
	    canvas: 'canvas',
	    audio: 'audio'
	  },
	  regex: {
	    DOMEvent: new RegExp('^(click|mousedown|mouseup|mousemove|change|touchstart|touchmove|touchend|input|focus|dlclick|mouseenter|mouseleave|mouseover|mouseout|blur|search|submit|play|pause|canplay|progress)$'),
	    animatableProps: new RegExp('^(background-color|translate|scale|rotate|skew|margin|padding|top|left|right|bottom|color|font-size|width|height|opacity)$')
	  },
	  sets: {
	    pxProperties: pxPropertiesArray,
	    degProperties: ['rotate', 'rotate-x', 'rotate-y', 'rotate-z', 'rotate-x', 'rotate-y', 'rotate-z', 'skew', 'skewX', 'skewY', 'skewZ', 'skew-x', 'skew-y', 'skew-z'],
	    transformProperties: ['translate', 'translateX', 'translateY', 'translateZ', 'translateX', 'translate-x', 'translateY', 'translate-y', 'translate-z', 'scale', 'scaleX', 'scaleY', 'scaleZ', 'scale-x', 'scale-y', 'scale-z', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'rotate-x', 'rotate-y', 'rotate-z', 'skew', 'skewX', 'skewY', 'skewZ', 'skew-x', 'skew-y', 'skew-z', 'perspective', 'perspectiveX', 'perspectiveY', 'perspectiveZ', 'perspective-x', 'perspective-y', 'perspective-z'],
	    styleProperties: stylePropertiesArray
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 85 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  linearEase: function linearEase(currentIteration, startValue, changeInValue, totalIterations) {
	    return changeInValue * currentIteration / totalIterations + startValue;
	  },
	  easeInQuad: function easeInQuad(t, b, c, d) {
	    return c * (t /= d) * t + b;
	  },
	  easeOutQuad: function easeOutQuad(t, b, c, d) {
	    return -c * (t /= d) * (t - 2) + b;
	  },
	  easeInOutQuad: function easeInOutQuad(t, b, c, d) {
	    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
	    return -c / 2 * (--t * (t - 2) - 1) + b;
	  },
	  easeInCubic: function easeInCubic(t, b, c, d) {
	    return c * (t /= d) * t * t + b;
	  },
	  easeOutCubic: function easeOutCubic(t, b, c, d) {
	    return c * ((t = t / d - 1) * t * t + 1) + b;
	  },
	  easeInOutCubic: function easeInOutCubic(t, b, c, d) {
	    if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
	    return c / 2 * ((t -= 2) * t * t + 2) + b;
	  },
	  easeInQuart: function easeInQuart(t, b, c, d) {
	    return c * (t /= d) * t * t * t + b;
	  },
	  easeOutQuart: function easeOutQuart(t, b, c, d) {
	    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	  },
	  easeInOutQuart: function easeInOutQuart(t, b, c, d) {
	    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
	    return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	  },
	  easeInQuint: function easeInQuint(t, b, c, d) {
	    return c * (t /= d) * t * t * t * t + b;
	  },
	  easeOutQuint: function easeOutQuint(t, b, c, d) {
	    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
	  },
	  easeInOutQuint: function easeInOutQuint(t, b, c, d) {
	    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
	    return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
	  },
	  easeInSine: function easeInSine(t, b, c, d) {
	    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
	  },
	  easeOutSine: function easeOutSine(t, b, c, d) {
	    return c * Math.sin(t / d * (Math.PI / 2)) + b;
	  },
	  easeInOutSine: function easeInOutSine(t, b, c, d) {
	    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
	  },
	  easeInExpo: function easeInExpo(t, b, c, d) {
	    return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
	  },
	  easeOutExpo: function easeOutExpo(t, b, c, d) {
	    return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
	  },
	  easeInOutExpo: function easeInOutExpo(t, b, c, d) {
	    if (t == 0) return b;
	    if (t == d) return b + c;
	    if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
	    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
	  },
	  easeInCirc: function easeInCirc(t, b, c, d) {
	    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
	  },
	  easeOutCirc: function easeOutCirc(t, b, c, d) {
	    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
	  },
	  easeInOutCirc: function easeInOutCirc(t, b, c, d) {
	    if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
	    return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
	  },
	  easeInElastic: function easeInElastic(t, b, c, d) {
	    var s = 1.70158;var p = 0;var a = c;
	    if (t == 0) return b;if ((t /= d) == 1) return b + c;if (!p) p = d * 0.3;
	    if (a < Math.abs(c)) {
	      a = c;var s = p / 4;
	    } else var s = p / (2 * Math.PI) * Math.asin(c / a);
	    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	  },
	  easeOutElastic: function easeOutElastic(t, b, c, d) {
	    var s = 1.70158;var p = 0;var a = c;
	    if (t == 0) return b;if ((t /= d) == 1) return b + c;if (!p) p = d * 0.3;
	    if (a < Math.abs(c)) {
	      a = c;var s = p / 4;
	    } else var s = p / (2 * Math.PI) * Math.asin(c / a);
	    return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
	  },
	  easeInOutElastic: function easeInOutElastic(t, b, c, d) {
	    var s = 1.70158;var p = 0;var a = c;
	    if (t == 0) return b;if ((t /= d / 2) == 2) return b + c;if (!p) p = d * (0.3 * 1.5);
	    if (a < Math.abs(c)) {
	      a = c;var s = p / 4;
	    } else var s = p / (2 * Math.PI) * Math.asin(c / a);
	    if (t < 1) return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	    return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
	  },
	  easeInBack: function easeInBack(t, b, c, d, s) {
	    if (s == undefined) s = 1.70158;
	    return c * (t /= d) * t * ((s + 1) * t - s) + b;
	  },
	  easeOutBack: function easeOutBack(t, b, c, d, s) {
	    if (s == undefined) s = 1.70158;
	    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	  },
	  easeInOutBack: function easeInOutBack(t, b, c, d, s) {
	    if (s == undefined) s = 1.70158;
	    if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
	    return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
	  },
	  easeInBounce: function easeInBounce(t, b, c, d) {
	    return c - Easing.easeOutBounce(d - t, 0, c, d) + b;
	  },
	  easeOutBounce: function easeOutBounce(t, b, c, d) {
	    if ((t /= d) < 1 / 2.75) {
	      return c * (7.5625 * t * t) + b;
	    } else if (t < 2 / 2.75) {
	      return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
	    } else if (t < 2.5 / 2.75) {
	      return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
	    }
	    return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
	  },
	  easeInOutBounce: function easeInOutBounce(t, b, c, d) {
	    if (t < d / 2) return Easing.easeInBounce(t * 2, 0, c, d) * 0.5 + b;
	    return Easing.easeOutBounce(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
	  }
	};
	module.exports = exports["default"];

/***/ },
/* 86 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var EventManager = function EventManager() {
	  this.listeners = {};
	};
	// place properties here
	// Constructor
	EventManager.prototype = {
	  // public methods
	  addListener: function addListener(event, fn) {
	    if (this.listeners[event]) {
	      if (fn instanceof Function) {
	        if (this.listeners[event].indexOf(fn) < 0) {
	          this.listeners[event].push(fn);
	        }
	      }
	    } else {
	      this.listeners[event] = [];
	      this.addListener(event, fn);
	    }
	    return this;
	  },
	  dispatchEvent: function dispatchEvent(event, params, context) {
	    params = params || {};

	    if (this.listeners[event]) {
	      if (context) {
	        this.listeners[event].forEach(function (f, index) {
	          f.call(context, params);
	        });
	      } else {
	        this.listeners[event].forEach(function (f, index) {
	          f.call(window, params);
	        });
	      }
	    }
	    return this;
	  },
	  removeListener: function removeListener(event, fn) {
	    var fnIndex = this.listeners[event].indexOf(fn);
	    if (fnIndex > 0) {
	      this.listeners[event].splice(fnIndex, 1);
	    }
	    return this;
	  }
	};

	exports.default = new EventManager();
	module.exports = exports["default"];

/***/ },
/* 87 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	/*!
	  * $script.js JS loader & dependency manager
	  * https://github.com/ded/script.js
	  * (c) Dustin Diaz 2014 | License MIT
	  */

	exports.default = function () {
	  var doc = document,
	      head = doc.getElementsByTagName('head')[0],
	      s = 'string',
	      f = false,
	      push = 'push',
	      readyState = 'readyState',
	      onreadystatechange = 'onreadystatechange',
	      list = {},
	      ids = {},
	      delay = {},
	      scripts = {},
	      scriptpath = void 0,
	      urlArgs = void 0;

	  function every(ar, fn) {
	    for (var i = 0, j = ar.length; i < j; ++i) {
	      if (!fn(ar[i])) return f;
	    }return 1;
	  }
	  function each(ar, fn) {
	    every(ar, function (el) {
	      fn(el);
	      return 1;
	    });
	  }

	  function $script(paths, idOrDone, optDone) {
	    paths = paths[push] ? paths : [paths];
	    var idOrDoneIsDone = idOrDone && idOrDone.call,
	        done = idOrDoneIsDone ? idOrDone : optDone,
	        id = idOrDoneIsDone ? paths.join('') : idOrDone,
	        queue = paths.length;
	    function loopFn(item) {
	      return item.call ? item() : list[item];
	    }
	    function callback() {
	      if (! --queue) {
	        list[id] = 1;
	        done && done();
	        for (var dset in delay) {
	          every(dset.split('|'), loopFn) && !each(delay[dset], loopFn) && (delay[dset] = []);
	        }
	      }
	    }
	    setTimeout(function () {
	      each(paths, function loading(path, force) {
	        if (path === null) return callback();

	        if (!force && !/^https?:\/\//.test(path) && scriptpath) {
	          path = path.indexOf('.js') === -1 ? scriptpath + path + '.js' : scriptpath + path;
	        }

	        if (scripts[path]) {
	          if (id) ids[id] = 1;
	          return scripts[path] == 2 ? callback() : setTimeout(function () {
	            loading(path, true);
	          }, 0);
	        }

	        scripts[path] = 1;
	        if (id) ids[id] = 1;
	        create(path, callback);
	      });
	    }, 0);
	    return $script;
	  }

	  function create(path, fn) {
	    var el = doc.createElement('script'),
	        loaded = void 0;
	    el.onload = el.onerror = el[onreadystatechange] = function () {
	      if (el[readyState] && !/^c|loade/.test(el[readyState]) || loaded) return;
	      el.onload = el[onreadystatechange] = null;
	      loaded = 1;
	      scripts[path] = 2;
	      fn();
	    };
	    el.async = 1;
	    el.src = urlArgs ? path + (path.indexOf('?') === -1 ? '?' : '&') + urlArgs : path;
	    head.insertBefore(el, head.lastChild);
	  }

	  $script.get = create;

	  $script.order = function (scripts, id, done) {
	    (function callback(s) {
	      s = scripts.shift();
	      !scripts.length ? $script(s, id, done) : $script(s, callback);
	    })();
	  };

	  $script.path = function (p) {
	    scriptpath = p;
	  };
	  $script.urlArgs = function (str) {
	    urlArgs = str;
	  };
	  $script.ready = function (deps, ready, req) {
	    deps = deps[push] ? deps : [deps];
	    var missing = [];
	    !each(deps, function (dep) {
	      list[dep] || missing[push](dep);
	    }) && every(deps, function (dep) {
	      return list[dep];
	    }) ? ready() : !function (key) {
	      delay[key] = delay[key] || [];
	      delay[key][push](ready);
	      req && req(missing);
	    }(deps.join('|'));
	    return $script;
	  };

	  $script.done = function (idOrDone) {
	    $script([null], idOrDone);
	  };

	  return $script;
	};

	module.exports = exports['default'];

/***/ },
/* 88 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function () {
	  return {
	    namespace: '_s4mConfig',
	    container: 'scene',
	    defaultAttributes: {
	      video: {
	        src: '',
	        type: 'video/mp4',
	        controls: 'true',
	        muted: 'true',
	        loop: 'true',
	        preload: 'true',
	        playsinline: 'true'
	      },
	      img: {
	        src: ''
	      },
	      iframe: {
	        src: ''
	      },
	      form: {
	        name: ''
	      },
	      input: {
	        name: ''
	      },
	      audio: {
	        src: ''
	      }
	    }
	  };
	};

	module.exports = exports['default'];

/***/ }
/******/ ]);