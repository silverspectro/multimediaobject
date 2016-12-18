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

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/*

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

	__webpack_require__(1);
	var utils = __webpack_require__(2),
	    Easings = __webpack_require__(4),
	    eventManager = __webpack_require__(5),
	    requireScript = __webpack_require__(6);

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
	    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "block";
	    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "multimediaObject";
	    var fps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 60;

	    _classCallCheck(this, MultimediaObject);

	    if ((typeof type === "undefined" ? "undefined" : _typeof(type)) === "object") {
	      this.name = name || type.name;
	      this._style = {};
	      this.style = {};
	      this.events = {};
	      this._events = {};
	      this.functions = {};
	      this.breakpoints = [];
	      this.animations = {};
	      this.animated = false;
	      this.computedAnimations = [];
	      this.childs = [];
	      this.dependencies = [];
	      this.innerHTML = "";

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

	      this.init();
	      this.addDefaultParameters();
	      this.applyAttributes();
	      this.applyStyle(this.style);
	      this.applyEvents();
	      this.applyBreakpoints();
	    } else {
	      this.uuid = utils.generateUUID();
	      this.name = name;
	      this.type = type;
	      this.data = {};
	      this._style = {};
	      this.style = {};
	      this.attributes = {};
	      this.events = {};
	      this._events = {};
	      this.functions = {};
	      this.animations = {};
	      this.breakpoints = [];
	      this.animated = false;
	      this.computedAnimations = [];
	      this.childs = [];
	      this.dependencies = [];
	      this.innerHTML = "";

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

	  _createClass(MultimediaObject, [{
	    key: "init",


	    /**
	    * @function
	    * Inititalize the MultimediaObject
	    * generates the DOMElement, applyAttributes, sorts animations steps
	    */

	    value: function init() {
	      this.generate(utils.Atoms(this.type));
	      this.element.innerHTML = this.innerHTML;
	      this.getSortedSteps();
	      if (!window.MultimediaObjectEditor) {
	        if (window._s4mConfig) {
	          this.appendElementTo(document.getElementById(window._s4mConfig.containerId));
	        } else {
	          this.appendElementTo();
	        }
	      }
	      if (!this.attributes.id) {
	        this.applyAttributes({
	          id: this.name
	        });
	      }
	    }
	  }, {
	    key: "addDefaultParameters",
	    value: function addDefaultParameters() {
	      if (conf.defaultAttributes[this.type]) {
	        for (var key in conf.defaultAttributes[this.type]) {
	          if (!this.attributes[key]) {
	            this.attributes[key] = conf.defaultAttributes[this.type][key];
	          }
	        }
	      }
	      this.applyAttributes();
	    }
	  }, {
	    key: "applyDependencies",


	    /**
	    * @function
	    * Require dependencies and add it to a dependencie bundle
	    * @param {object} dependencies - the dependencies to fetch
	    * @return {object} MultimediaObject
	    */

	    value: function applyDependencies(dependency) {
	      if (dependency) {
	        var depIndex = this.dependencies.indexOf(dependency);
	        if (depIndex < 0) {
	          this.dependencies.push(dependency);
	        }
	      }
	      return this;
	    }
	  }, {
	    key: "removeDependencies",
	    value: function removeDependencies(dependency) {
	      var depIndex = this.dependencies.indexOf(dependency);
	      if (depIndex >= 0) {
	        this.dependencies.splice(depIndex, 1);
	      }
	      return this;
	    }
	  }, {
	    key: "requireDependencies",
	    value: function requireDependencies(callback) {
	      if (this.dependencies.length > 0) {
	        requireScript(this.dependencies, "dependencies");
	        requireScript.ready("dependencies", callback);
	      } else {
	        callback();
	      }
	    }
	  }, {
	    key: "addGlobalStyle",


	    /**
	    * @function
	    * Add a global style object to the page
	    * @param {string} id - the id or class to which bind the style
	    * @param {object} style - the CSS style properties to apply
	    * @return {object} MultimediaObject
	    */

	    value: function addGlobalStyle(style, callback) {
	      var styleMarkup = document.createElement("style"),
	          styleText = style;

	      styleMarkup.innerHTML = styleText;
	      styleMarkup.id = this.uuid + "-style";
	      styleMarkup.type = "text/css";
	      document.head.appendChild(styleMarkup);

	      if (callback) {
	        window.setTimeout(callback, 100);
	      }

	      return this;
	    }
	  }, {
	    key: "applyStyle",


	    /**
	    * @function
	    * Apply the object in parameter as style properties
	    * @param {object} properties - the CSS style properties to apply
	    * @return {object} MultimediaObject
	    */

	    value: function applyStyle(properties, override) {
	      var k,
	          transforms,
	          v,
	          _style = Object.keys(this._style).length,
	          override = override || false;

	      transforms = [];
	      for (k in properties) {
	        v = properties[k];
	        if (utils.transformProperties.contains(k)) {
	          transforms.push([k, v]);
	          if (_style < 1 || override) {
	            this._style[k] = v;
	          }
	          this.style[k] = v;
	        } else {
	          v = "" + v + utils.unitForProperty(k, v);
	          // console.log(v);
	          this.style[utils.propertyWithPrefix(k)] = v;
	          if (_style < 1 || override) {
	            this._style[utils.propertyWithPrefix(k)] = v;
	          }
	          if (v.indexOf("{{absoluteAssetURL}}") >= 0 && window._s4mConfig) {
	            v = v.replace("{{absoluteAssetURL}}", window.MultimediaObjectEditor ? this.data.absoluteAssetURL : window._s4mConfig.absoluteAssetURL);
	          }
	          this.element.style[utils.propertyWithPrefix(k)] = v;
	        }
	      }
	      var z = [0, 1, 2],
	          trans = {
	        x: this._style.translateX ? utils.getNumFromString(this._style.translateX) : 0,
	        y: this._style.translateY ? utils.getNumFromString(this._style.translateY) : 0,
	        z: this._style.translateZ ? utils.getNumFromString(this._style.translateZ) : 0,
	        xU: this._style.translateX ? utils.getUnitFromString(this._style.translateX) : "px",
	        yU: this._style.translateY ? utils.getUnitFromString(this._style.translateY) : "px",
	        zU: this._style.translateZ ? utils.getUnitFromString(this._style.translateZ) : "px"
	      },
	          rot = {
	        value: this._style.rotate ? utils.getNumFromString(this._style.rotate) : 0,
	        u: "deg"
	      },
	          sca = {
	        x: this._style.scaleX ? utils.getNumFromString(this._style.scaleX) : 1,
	        y: this._style.scaleY ? utils.getNumFromString(this._style.scaleY) : 1
	      };

	      if (transforms.length > 0) {
	        v = transforms.map(function (transform) {
	          return utils.transformValueForProperty(transform[0], transform[1]);
	        });

	        v = v.map(function (a, b) {
	          if (a.indexOf("translateX") >= 0) {
	            trans.x = utils.getNumFromString(a);
	            trans.xU = utils.getUnitFromString(a);
	          } else if (a.indexOf("translateY") >= 0) {
	            trans.y = utils.getNumFromString(a);
	            trans.yU = utils.getUnitFromString(a);
	          } else if (a.indexOf("translateZ") >= 0) {
	            trans.z = utils.getNumFromString(a);
	            trans.zU = utils.getUnitFromString(a);
	          }
	          if (a.indexOf("rotate") >= 0) {
	            rot.value = utils.getNumFromString(a);
	          }
	          if (a.indexOf("scaleX") >= 0) {
	            sca.x = utils.getNumFromString(a);
	          } else if (a.indexOf("scaleY") >= 0) {
	            sca.y = utils.getNumFromString(a);
	          } else if (a.indexOf("scale") >= 0) {
	            sca.x = utils.getNumFromString(a);
	            sca.y = utils.getNumFromString(a);
	          }
	        });
	        // console.log(v,trans,rot,sca);
	        // console.log(z);
	        z[0] = "translate3d(" + trans.x + trans.xU + "," + trans.y + trans.yU + "," + trans.z + trans.zU + ")";
	        z[1] = "rotate(" + rot.value + rot.u + ")";
	        z[2] = "scale(" + sca.x + "," + sca.y + ")";
	        // console.log(z);
	        z = z.filter(function (el) {
	          return !/^[0-9]/.test(el);
	        }).join(" ");

	        // this.style[utils.propertyWithPrefix("transform")] = z;
	        // if(_style < 1 || override) {
	        //   this._style[utils.propertyWithPrefix("transform")] = z;
	        // }
	        this.element.style[utils.propertyWithPrefix("transform")] = z;

	        eventManager.dispatchEvent("actualize-style", this._style);
	      }

	      return this;
	    }
	  }, {
	    key: "applyFunctions",


	    /**
	    * @function
	    * Apply the functions as method of the MultimediaObject
	    * @param {object} functions - key = name of functions, value = function body.
	    * @return {object} MultimediaObject
	    */

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
	  }, {
	    key: "applyAttributes",


	    /**
	    * @function
	    * Apply the attributes to the DOMElement and attributes propertie of the MultimediaObject
	    * @param {object} attributes - key = name of attribute, value = value.
	    * @return {object} MultimediaObject
	    */

	    value: function applyAttributes(attributes) {
	      if (attributes) {
	        for (var attr in attributes) {
	          var replaced = attributes[attr];
	          if (typeof attributes[attr] === "string" && attributes[attr].indexOf("{{absoluteAssetURL}}") >= 0 && window._s4mConfig) {
	            replaced = attributes[attr].replace("{{absoluteAssetURL}}", window.MultimediaObjectEditor ? this.data.absoluteAssetURL : window._s4mConfig.absoluteAssetURL);
	          }
	          this.attributes[attr] = attributes[attr];
	          this.element.setAttribute(attr, replaced || attributes[attr]);
	        }
	      } else {
	        for (var _attr in this.attributes) {
	          var _replaced = this.attributes[_attr];
	          if (typeof this.attributes[_attr] === "string" && this.attributes[_attr].indexOf("{{absoluteAssetURL}}") >= 0 && window._s4mConfig) {
	            _replaced = this.attributes[_attr].replace("{{absoluteAssetURL}}", window.MultimediaObjectEditor ? this.data.absoluteAssetURL : window._s4mConfig.absoluteAssetURL);
	          }
	          this.element.setAttribute(_attr, _replaced || this.attributes[_attr]);
	        }
	      }
	      return this;
	    }
	  }, {
	    key: "applyBreakpoints",


	    /**
	    * @function
	    * Apply the breakpoints
	    * @param {array} breakpoints - breakpoint object {{querie,style}}
	    * @return {object} MultimediaObject
	    */

	    value: function applyBreakpoints() {
	      var _this = this;

	      var breakpoints = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

	      if (this.breakpoints.length > 0 || breakpoints.length > 0) {
	        breakpoints.forEach(function (breakpoint, index) {
	          if (_this.breakpoints.indexOf(breakpoint) === -1) {
	            _this.breakpoints.push(breakpoint);
	          }
	        });
	        this.checkBreakpoints();
	      }
	      return this;
	    }
	  }, {
	    key: "applyEvents",


	    /**
	    * @function
	    * Apply the events to the DOMElement and events propertie of the MultimediaObject
	    * @param {object} attributes - key = name of event, value = function.
	    * @return {object} MultimediaObject
	    */

	    value: function applyEvents(events) {
	      var _this2 = this;

	      if (events) {
	        var _loop = function _loop(evt) {
	          if (!_this2.events[evt] && !_this2._events[evt]) {
	            _this2.events[evt] = events[evt];
	            _this2._events[evt] = _this2.transformEvent(events[evt]);
	            if (utils.checkEvent(evt) && evt !== "swipe") {
	              _this2.element.addEventListener(evt, _this2._events[evt]);
	            } else if (evt === "swipe") {
	              (function () {
	                var detecttouch = !!('ontouchstart' in window) || !!('ontouchstart' in document.documentElement) || !!window.ontouchstart || !!window.onmsgesturechange || window.DocumentTouch && window.document instanceof window.DocumentTouch,
	                    ob = _this2;
	                userData = {};

	                ob.evtStarted = false;
	                _this2.evtStart = function (e) {
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
	                _this2.evtEnd = function (e) {
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
	                  userData.inMotion = e.type == 'touchmove' || e.type == 'mousemove';
	                  userData.direction = Math.abs(userData.dx) > Math.abs(userData.dy) ? ('' + userData.dx).indexOf('-') != -1 ? 'left' : 'right' : ('' + userData.dy).indexOf('-') != -1 ? 'top' : 'bottom';
	                  ob.events[evt].apply(ob, [e, userData]);
	                  if (userData.inMotion == false) {
	                    ob.evtStarted = false;
	                  }
	                };
	                if (detecttouch) {
	                  _this2.element.addEventListener('touchstart', _this2.evtStart, false);
	                  _this2.element.addEventListener('touchmove', _this2.evtEnd, false);
	                  _this2.element.addEventListener('touchend', _this2.evtEnd, false);
	                } else {
	                  _this2.element.addEventListener('mousedown', _this2.evtStart, false);
	                  _this2.element.addEventListener('mousemove', _this2.evtEnd, false);
	                  _this2.element.addEventListener('mouseup', _this2.evtEnd, false);
	                }
	              })();
	            } else {
	              _this2.addListener(evt, _this2.events[evt]);
	            }
	          }
	        };

	        for (var evt in events) {
	          var userData;

	          _loop(evt);
	        }
	      } else {
	        if (Object.keys(this.events).length > 0) {
	          for (var evt in this.events) {
	            this._events[evt] = this.transformEvent(this.events[evt]);
	            if (utils.checkEvent(evt)) {
	              this.element.addEventListener(evt, this._events[evt]);
	            } else {
	              this.addListener(evt, this.events[evt]);
	            }
	          }
	        }
	      }
	      return this;
	    }
	  }, {
	    key: "removeEvent",


	    /**
	    * @function
	    * Remove an event by eventName
	    * @param {string} eventName - name of the event
	    * @return {object} MultimediaObject
	    */

	    value: function removeEvent(eventName) {
	      if (utils.checkEvent(eventName)) {
	        if (this.events[eventName]) {
	          this.element.removeEventListener(eventName, this._events[eventName]);
	          delete this.events[eventName];
	          delete this._events[eventName];
	        } else {
	          console.log("Event does not exist");
	        }
	      } else if (eventName === "swipe") {
	        this.element.removeEventListener('touchstart', this.evtStart);
	        this.element.removeEventListener('touchmove', this.evtEnd);
	        this.element.removeEventListener('touchend', this.evtEnd);
	        this.element.removeEventListener('mousedown', this.evtStart);
	        this.element.removeEventListener('mousemove', this.evtEnd);
	        this.element.removeEventListener('mouseup', this.evtEnd);
	        delete this.events[eventName];
	        delete this._events[eventName];
	      } else {
	        if (this.events[eventName]) {
	          this.removeListener(eventName, this._events[eventName]);
	          delete this.events[eventName];
	          delete this._events[eventName];
	        } else {
	          console.log("Event does not exist");
	        }
	      }
	      return this;
	    }
	  }, {
	    key: "deactivateEvent",
	    value: function deactivateEvent(eventName) {
	      if (this.events[eventName]) {
	        if (utils.checkEvent(eventName)) {
	          this.element.removeEventListener(eventName, this._events[eventName]);
	        } else {
	          this.removeListener(eventName, this._events[eventName]);
	        }
	      } else {
	        console.log("Event does not exist");
	      }
	    }
	  }, {
	    key: "removeFunction",


	    /**
	    * @function
	    * Remove a function by name
	    * @param {string} eventName - name of the function
	    * @return {object} MultimediaObject
	    */

	    value: function removeFunction(functionName) {
	      if (this.functions[functionName]) {
	        delete this.functions[functionName];
	      } else {
	        console.log("Function does not exist");
	      }
	      return this;
	    }
	  }, {
	    key: "removePropertie",


	    /**
	    * @function
	    * Remove a propertie
	    * @param {string} type - type of propertie
	    * @param {string} propertieName - name of the propertie
	    * @return {object} MultimediaObject
	    */

	    value: function removePropertie(type, propertieName) {
	      switch (type) {
	        case "attributes":
	          if (this.attributes[propertieName]) {
	            this.element.setAttribute(propertieName, "");
	            delete this.attributes[propertieName];
	          } else {
	            console.log(propertieName + " attribute does not exist");
	          }
	          break;
	        case "data":
	          if (this.data[propertieName]) {
	            delete this.data[propertieName];
	          } else {
	            console.log(propertieName + " data does not exist");
	          }
	          break;
	        case "style":
	        default:
	          if (this._style[propertieName]) {
	            this.element.style[utils.propertyWithPrefix(propertieName)] = "";
	            this.element.style[propertieName] = "";
	            if (utils.transformProperties.contains(propertieName)) {
	              this.element.style[utils.propertyWithPrefix("transform")] = "";
	              this.element.style.transform = "";
	            }
	            delete this.style[propertieName];
	            delete this._style[propertieName];
	          } else {
	            console.log(propertieName + " style does not exist");
	          }
	      }

	      return this;
	    }
	  }, {
	    key: "transformEvent",


	    /**
	    * @function
	    * tranform event to get access to it with removeEventListener
	    * @param {function} callback - the event you want to transform
	    * @return {function} function
	    */

	    value: function transformEvent(callback) {
	      var parent = this;
	      return function (event) {
	        callback.apply(parent, [event]);
	      };
	    }
	  }, {
	    key: "checkBreakpoints",
	    value: function checkBreakpoints() {
	      var _this3 = this;

	      var winW = window.MultimediaObjectEditor ? "parseInt(getComputedStyle(document.getElementById('" + conf.container + "')).width)" : "window.innerWidth",
	          winH = window.MultimediaObjectEditor ? "parseInt(getComputedStyle(document.getElementById('" + conf.container + "')).height)" : "window.innerHeight";
	      if (this.breakpoints.length > 0) {
	        (function () {
	          var style = {};
	          for (var w in _this3._style) {
	            style[w] = _this3._style[w];
	          };
	          _this3.breakpoints.forEach(function (breakpoint, index) {
	            var conditions = [];
	            for (var breaks in breakpoint.querie) {
	              if (breaks === "orientation") {
	                conditions.push("" + (breakpoint.querie[breaks] === "landscape" ? winW + " > " + winH : winH + " > " + winW));
	              } else {
	                conditions.push((/height/.test(breaks) ? winH : winW) + " " + (/min/.test(breaks) ? ">=" : "<=") + " " + parseInt(breakpoint.querie[breaks]));
	              }
	            }
	            var evaluatedRule = "";

	            conditions.forEach(function (rule, index) {
	              if (index >= 1) {
	                evaluatedRule += " && " + rule;
	              } else {
	                evaluatedRule += rule;
	              }
	            });

	            // console.log(evaluatedRule);

	            evaluatedRule = new Function("return " + evaluatedRule);
	            // console.log(evaluatedRule(), breakpoint);
	            if (evaluatedRule()) {
	              for (var s in breakpoint.style) {
	                style[s] = breakpoint.style[s];
	              }
	            }
	          });
	          if (_this3.computedAnimations.length > 0) {
	            for (var _w in _this3.computedAnimations[_this3.currentIteration]) {
	              style[_w] = _this3.computedAnimations[_this3.currentIteration][_w];
	            };
	          }
	          _this3.applyStyle(style);
	        })();
	      }
	    }
	  }, {
	    key: "generate",


	    /**
	    * @function
	    * Generates the DOMElement based on type parameter
	    * @param {string} type - type of DOMElement
	    * @return {object} MultimediaObject
	    */

	    value: function generate(type) {
	      var _this4 = this;

	      this.element = document.createElement(type);
	      this.type = type;
	      window.addEventListener("resize", function () {
	        _this4.checkBreakpoints();
	      });
	      eventManager.addListener("resize-scene", function () {
	        _this4.checkBreakpoints();
	      });
	      return this;
	    }
	  }, {
	    key: "appendElementTo",


	    /**
	    * @function
	    * append MultimediaObject.element to container parameter
	    * @param {DOMElement or MultimediaObject} container - the container to append to
	    * @return {object} MultimediaObject
	    */

	    value: function appendElementTo(container) {
	      var _this5 = this;

	      if (container) {
	        if (container instanceof MultimediaObject) {
	          container.element.appendChild(this.element);
	        } else {
	          container.appendChild(this.element);
	        }
	        this.DOMParent = container;
	        var childsLength = this.childs.length,
	            i = 0;
	        // console.log(childsLength);
	        if (childsLength > 0) {
	          this.childs.forEach(function (child, index) {
	            child.DOMParent = _this5;
	            child.appendElementTo(_this5);
	          });
	        }
	      } else {
	        document.body.appendChild(this.element);
	        this.DOMParent = document.body;
	        var _childsLength = this.childs.length,
	            _i = 0;
	        // console.log(childsLength);
	        if (_childsLength > 0) {
	          this.childs.forEach(function (child, index) {
	            child.DOMParent = _this5;
	            child.appendElementTo(_this5);
	          });
	        }
	      }
	      if (this.initializer) {
	        this.initializer();
	      }
	      // console.log(this.name,this.childs);
	      return this;
	    }
	  }, {
	    key: "add",


	    /**
	    * @function
	    * add children to MultimediaObject
	    * @param {DOMElement} child - the child to add
	    * @return {object} MultimediaObject
	    */

	    value: function add(child) {
	      this.childs.push(child);
	      if (child instanceof MultimediaObject) {
	        this.element.appendChild(child.element);
	      } else {
	        this.element.appendChild(child);
	      }
	      child.DOMParent = this;
	      eventManager.dispatchEvent("actualize-DOM-elements");
	      return this;
	    }
	  }, {
	    key: "remove",


	    /**
	    * @function
	    * removes a child from a MultimediaObject
	    * @param {DOMElement} child - the child to remove
	    * @return {object} MultimediaObject
	    */

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
	      eventManager.dispatchEvent("actualize-DOM-elements");
	      return this;
	    }
	  }, {
	    key: "getComputedStyle",


	    /**
	    * @function
	    * get the computed style of a CSS propertie
	    * @param {string} propertie - the css propertie
	    * @return {string} css - pixel value
	    */

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
	  }, {
	    key: "preInterpolateStep",


	    /**
	    * @function
	    * pre interpolate animations steps for interpolation
	    * @param {int} fps - the framerate to use as base for the frame computation
	    * @return {object} MultimediaObject
	    */

	    value: function preInterpolateStep(fps) {
	      this.getSortedSteps();
	      var totalAnimationTime = utils.getMaxOfArray(this.numericSteps),
	          totalAnimationIteration = Math.floor(totalAnimationTime * fps);

	      this.animatedProps = {};
	      var lastStep = void 0;

	      for (var secIndex = 0; secIndex < this.numericSteps.length; secIndex++) {
	        var second = this.numericSteps[secIndex].toFixed(2);
	        var easing = void 0;
	        // console.log("animations : ", this.animations);

	        for (var prop in this.animations[second]) {
	          if (prop !== "easing") {
	            if (!this.animatedProps[prop]) {
	              this.animatedProps[prop] = {};
	              this.animatedProps[prop].label = prop;
	              this.animatedProps[prop].steps = {};
	            }

	            if (!this.animatedProps[prop].steps[second]) {
	              this.animatedProps[prop].steps[second] = {};
	            }
	            var stepPropKeys = Object.keys(this.animatedProps[prop].steps),
	                lastStepProp = stepPropKeys.length > 1 ? stepPropKeys[stepPropKeys.length - 2] : undefined;

	            lastStep = lastStepProp ? this.animatedProps[prop].steps[lastStepProp] : undefined;

	            if (/color/ig.test(prop)) {
	              var colorObj = utils.transformToColor(this.animations[second][prop]);
	              this.animatedProps[prop].steps[second].startValue = lastStep ? lastStep.endValue : this._style[prop] ? utils.transformToColor(this._style[prop]) : { r: 0, g: 0, b: 0 };
	              this.animatedProps[prop].steps[second].unit = typeof this.animations[second][prop] === "string" ? utils.getUnitFromString(this.animations[second][prop] || "") : "";
	              this.animatedProps[prop].steps[second].endValue = colorObj;
	              this.animatedProps[prop].steps[second].changeInValue = {
	                r: this.animatedProps[prop].steps[second].endValue.r - this.animatedProps[prop].steps[second].startValue.r,
	                g: this.animatedProps[prop].steps[second].endValue.g - this.animatedProps[prop].steps[second].startValue.g,
	                b: this.animatedProps[prop].steps[second].endValue.b - this.animatedProps[prop].steps[second].startValue.b,
	                a: this.animatedProps[prop].steps[second].endValue.a - this.animatedProps[prop].steps[second].startValue.a
	              };
	              this.animatedProps[prop].steps[second].initIteration = lastStepProp ? Math.floor(lastStepProp * fps) : 0;
	              this.animatedProps[prop].steps[second].totalStepIteration = Math.floor(second * fps - this.animatedProps[prop].steps[second].initIteration);
	              this.animatedProps[prop].steps[second].easing = this.animations[second].easing;
	              this.animatedProps[prop].steps[second].currentIteration = 0;
	            } else if (!/\d/g.test(this.animations[second][prop])) {
	              this.animatedProps[prop].steps[second].startValue = lastStep ? lastStep.endValue : this._style[prop] ? this._style[prop] : "auto";
	              this.animatedProps[prop].steps[second].unit = "";
	              this.animatedProps[prop].steps[second].endValue = this.animations[second][prop];
	              this.animatedProps[prop].steps[second].changeInValue = this.animatedProps[prop].steps[second].endValue;
	              this.animatedProps[prop].steps[second].initIteration = lastStepProp ? Math.floor(lastStepProp * fps) : 0;
	              this.animatedProps[prop].steps[second].totalStepIteration = Math.floor(second * fps) - this.animatedProps[prop].steps[second].initIteration;
	              this.animatedProps[prop].steps[second].easing = this.animations[second].easing;
	              this.animatedProps[prop].steps[second].currentIteration = 0;
	            } else {
	              this.animatedProps[prop].steps[second].startValue = parseFloat(lastStep ? lastStep.endValue : this._style[prop] ? parseFloat(this._style[prop]) : 0);
	              this.animatedProps[prop].steps[second].unit = typeof this.animations[second][prop] === "string" && /px|%/g.test(this.animations[second][prop]) ? utils.getUnitFromString(this.animations[second][prop] || "") : "";
	              this.animatedProps[prop].steps[second].endValue = parseFloat(this.animations[second][prop]);
	              this.animatedProps[prop].steps[second].changeInValue = parseFloat(this.animatedProps[prop].steps[second].endValue - this.animatedProps[prop].steps[second].startValue);
	              this.animatedProps[prop].steps[second].initIteration = lastStepProp ? Math.floor(lastStepProp * fps) : 0;
	              this.animatedProps[prop].steps[second].totalStepIteration = Math.floor(second * fps) - this.animatedProps[prop].steps[second].initIteration;
	              this.animatedProps[prop].steps[second].easing = this.animations[second].easing;
	              this.animatedProps[prop].steps[second].currentIteration = 0;
	            }
	            // console.log(this.animations[second][prop],this.animatedProps[prop].steps[second].endValue);
	          }
	        }
	      }

	      // console.log(this.animatedProps);

	      this.computedAnimations = !this.computedAnimations || [];

	      for (var _prop in this.animatedProps) {
	        for (var iteration = 0; iteration <= totalAnimationIteration; iteration++) {
	          var propNumericSteps = Object.keys(this.animatedProps[_prop].steps),
	              iterationSeconds = iteration / totalAnimationIteration * totalAnimationTime,
	              secondsElapsed = isFinite(iterationSeconds) ? Number(iterationSeconds).toFixed(2) : 0,
	              stepSecond = utils.closest(secondsElapsed, propNumericSteps);

	          if (!this.computedAnimations[iteration]) {
	            this.computedAnimations[iteration] = {};
	          }
	          // console.log(this.animatedProps[prop].steps[stepSecond]);
	          if (/color/ig.test(_prop)) {
	            var _easing = this.animatedProps[_prop].steps[stepSecond].easing || "linearEase",
	                actualIteration = this.animatedProps[_prop].steps[stepSecond].currentIteration,
	                startValue = this.animatedProps[_prop].steps[stepSecond].startValue,
	                endValue = this.animatedProps[_prop].steps[stepSecond].endValue,
	                changeInValue = this.animatedProps[_prop].steps[stepSecond].changeInValue,
	                totalIterationValue = this.animatedProps[_prop].steps[stepSecond].totalStepIteration,
	                r = actualIteration < totalIterationValue ? parseInt(Easings[_easing](actualIteration, startValue.r, changeInValue.r, totalIterationValue)) : endValue.r,
	                g = actualIteration < totalIterationValue ? parseInt(Easings[_easing](actualIteration, startValue.g, changeInValue.g, totalIterationValue)) : endValue.g,
	                b = actualIteration < totalIterationValue ? parseInt(Easings[_easing](actualIteration, startValue.b, changeInValue.b, totalIterationValue)) : endValue.b,
	                a = actualIteration < totalIterationValue ? Number(Easings[_easing](actualIteration, startValue.a, changeInValue.a, totalIterationValue).toFixed(2)) : endValue.a;

	            this.computedAnimations[iteration][_prop] = "rgba(" + r + "," + g + "," + b + "," + a + ")";
	            // console.log(this.computedAnimations[iteration][prop]);
	          } else if (!/\d/g.test(this.animatedProps[_prop].steps[stepSecond].startValue)) {
	            var _easing2 = this.animatedProps[_prop].steps[stepSecond].easing || "linearEase",
	                _actualIteration = this.animatedProps[_prop].steps[stepSecond].currentIteration,
	                _startValue = this.animatedProps[_prop].steps[stepSecond].startValue,
	                _endValue = this.animatedProps[_prop].steps[stepSecond].endValue,
	                _changeInValue = this.animatedProps[_prop].steps[stepSecond].changeInValue,
	                _totalIterationValue = this.animatedProps[_prop].steps[stepSecond].totalStepIteration,
	                value = _actualIteration < _totalIterationValue - 1 ? _startValue : _endValue;
	            // console.log(prop,this.animatedProps[prop].steps[stepSecond].initIteration,iteration,actualIteration,totalIterationValue,totalAnimationIteration);

	            this.computedAnimations[iteration][_prop] = value + this.animatedProps[_prop].steps[stepSecond].unit;
	          } else {
	            var _easing3 = this.animatedProps[_prop].steps[stepSecond].easing || "linearEase",
	                _actualIteration2 = this.animatedProps[_prop].steps[stepSecond].currentIteration,
	                _startValue2 = this.animatedProps[_prop].steps[stepSecond].startValue,
	                _endValue2 = this.animatedProps[_prop].steps[stepSecond].endValue,
	                _changeInValue2 = this.animatedProps[_prop].steps[stepSecond].changeInValue,
	                _totalIterationValue2 = this.animatedProps[_prop].steps[stepSecond].totalStepIteration,
	                _value = _actualIteration2 < _totalIterationValue2 - 1 ? Easings[_easing3](_actualIteration2, _startValue2, _changeInValue2, _totalIterationValue2) : _endValue2;
	            // console.log(prop,this.animatedProps[prop].steps[stepSecond].initIteration,iteration,actualIteration,totalIterationValue,totalAnimationIteration);

	            this.computedAnimations[iteration][_prop] = _value + this.animatedProps[_prop].steps[stepSecond].unit;
	          }

	          if (iteration >= this.animatedProps[_prop].steps[stepSecond].initIteration && this.animatedProps[_prop].steps[stepSecond].currentIteration <= this.animatedProps[_prop].steps[stepSecond].totalStepIteration) {
	            this.animatedProps[_prop].steps[stepSecond].currentIteration++;
	          }
	        }
	      }

	      // console.log(this.computedAnimations);
	      return this;
	    }
	  }, {
	    key: "interpolateStep",


	    /**
	    * @function
	    * frame interpolation, takes the value present at a certain frame in the interpolatedSteps array and apply it as style
	    * needs an animation loop
	    * @param {int} currentIteration - the current frame
	    * @param {float} seconds - the current frame
	    * @param {int} fps - the framerate to preinterpolate if needed
	    * @return {object} MultimediaObject
	    */

	    value: function interpolateStep(currentIteration, seconds, fps) {
	      var animationsLength = this.computedAnimations.length;
	      // console.log(animationsLength,currentIteration);
	      if (animationsLength <= 0) {
	        this.preInterpolateStep(fps);
	      }
	      // console.log(this.computedAnimations[currentIteration]);
	      if (currentIteration <= 1 && !this.animationStarted) {
	        eventManager.dispatchEvent(this.uuid + "-animationStart");
	        this.currentIteration = currentIteration;
	        this.applyStyle(this.computedAnimations[currentIteration]);
	      }
	      if (animationsLength > currentIteration) {
	        this.animated = true;
	        this.currentIteration = currentIteration;
	        this.applyStyle(this.computedAnimations[currentIteration]);
	        this.checkBreakpoints();
	      }
	      if (animationsLength === currentIteration) {
	        this.stopAnimation();
	        this.currentIteration = animationsLength - 1;
	        eventManager.dispatchEvent(this.uuid + "-animationEnd");
	      }
	      // console.log(animationsLength, currentIteration, this.animationStarted);

	      return this;
	    }
	  }, {
	    key: "restartAnimation",
	    value: function restartAnimation() {
	      this.stopAnimation();
	      this.counter = 0;
	      this.runAnimation();
	    }
	  }, {
	    key: "startAnimation",
	    value: function startAnimation() {
	      this.animationStarted = true;
	      this.runAnimation();
	      this.childs.forEach(function (child) {
	        child.startAnimation();
	      });
	    }
	  }, {
	    key: "stopAnimation",
	    value: function stopAnimation() {
	      this.animationStarted = false;
	      this.animated = false;
	      window.cancelAnimationFrame(this.rafID);
	      // this.childs.forEach(function(child){
	      //   child.stopAnimation();
	      // });
	    }
	  }, {
	    key: "runAnimation",
	    value: function runAnimation() {
	      var _this6 = this;

	      this.rafID = window.requestAnimationFrame(function (time) {
	        _this6.runAnimation();
	      });
	      if (Object.keys(this.animations).length > 0) {
	        this.now = performance.now() || Date.now();
	        this.delta = this.now - this.then;
	        if (!this.animationStarted) {
	          this.animationStarted = true;
	          this.totalTime = Number(this.getSortedSteps()[this.getSortedSteps().length - 1]);
	          this.totalIteration = this.totalTime * this.fps;
	        } else {
	          if (this.delta > this.interval) {
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
	    }
	  }, {
	    key: "addListener",
	    value: function addListener(listener, fn) {
	      var that = this;
	      return eventManager.addListener(this.uuid + "-" + listener, function () {
	        return fn.call(that);
	      });
	    }
	  }, {
	    key: "removeListener",
	    value: function removeListener(listener, fn) {
	      if (fn instanceof Function) {
	        return eventManager.removeListener(this.uuid + "-" + listener, fn);
	      } else {
	        return eventManager.removeListener(this.uuid + "-" + listener, this[fn]);
	      }
	    }
	  }, {
	    key: "dispatchEvent",
	    value: function dispatchEvent(eventName, params, glob) {
	      if (glob) {
	        return eventManager.dispatchEvent(eventName, params, this);
	      } else {
	        return eventManager.dispatchEvent(this.uuid + "-" + eventName, params, this);
	      }
	    }
	  }, {
	    key: "addAnimationProperties",
	    value: function addAnimationProperties(propertieArray) {
	      var _parent = this,
	          existingProp = Object.keys(this.animatedProps),
	          time = Number(this.timeline.secondsElapsed);

	      time = time === 0 ? 0.02 : time;

	      propertieArray.forEach(function (refProp, index) {
	        if (existingProp.indexOf(refProp) === -1) {
	          if (!_parent.animations[time]) {
	            _parent.animations[time] = {};
	          }
	          _parent.animations[time][refProp] = 0;
	        }
	      });
	      this.preInterpolateStep(this.timeline.fps || this.fps);
	      if (this.timeline) {
	        this.timeline.computeSteps();
	      }
	      if (this.timeline.UI) {
	        this.timeline.UI.insertInterface();
	      }
	      return this;
	    }
	  }, {
	    key: "deleteAnimationProperties",
	    value: function deleteAnimationProperties(propertieArray) {
	      var _parent = this;

	      propertieArray.forEach(function (refProp, index) {
	        for (var step in _parent.animations) {
	          for (var prop in _parent.animations[step]) {
	            if (prop === refProp) {
	              delete _parent.animations[step][prop];
	            }
	          }
	        }
	      });
	      this.preInterpolateStep(this.timeline.fps || this.fps);
	      if (this.timeline) {
	        this.timeline.computeSteps();
	      }
	      if (this.timeline.UI) {
	        this.timeline.UI.drawTimelineProperties();
	        this.timeline.UI.actualizeAnimationUI();
	        this.timeline.UI.listenScroll();
	      }
	      return this;
	    }
	  }, {
	    key: "getSortedSteps",
	    value: function getSortedSteps() {
	      var numericSteps = Object.keys(this.animations).map(function (val, index) {
	        return parseFloat(val);
	      });
	      numericSteps.sort(function (a, b) {
	        return a - b;
	      });
	      this.numericSteps = numericSteps;
	      for (var t in this.animations) {
	        // console.log(t);
	        if (!/\d\.\d{2}/.test(t)) {
	          this.animations[parseFloat(t).toFixed(2)] = this.animations[t];
	          delete this.animations[t];
	        } else if (Object.keys(this.animations[t]).length === 0) {
	          delete this.animations[t];
	        }
	      }
	      return this.numericSteps;
	    }
	  }, {
	    key: "getTotalAnimationTime",
	    value: function getTotalAnimationTime() {
	      this.getSortedSteps();
	      this.totalAnimationTime = utils.getMaxOfArray(this.numericSteps);
	      return this.totalAnimationTime;
	    }
	  }, {
	    key: "exportToJSON",
	    value: function exportToJSON() {
	      var ob = {};
	      ob.exportedEvents = {};
	      ob.exportedFunctions = {};
	      ob.childs = [];

	      for (var p in this) {
	        if (typeof this[p] !== "undefined" && this[p] !== null) {
	          if (typeof this[p] !== "function" && !this[p].element && !this[p].children && !this[p].elements && !/exportedFunctions|exportedEvents|childs|interval|then|now|delta|animated|animationStarted|currentIteration|computedAnimations|totalTime|secondsElapsed|rafID|numericSteps|counter|totalIteration|animationStarted|direction|coords|bounds|geo|infowindow|map|marker|shop/.test(p)) {
	            ob[p] = this[p];
	          }
	        }
	      }

	      for (var evt in this.events) {
	        var txt = this.events[evt].toString(),
	            args = txt.slice(txt.indexOf("(") + 1, txt.indexOf(")")).split(","),
	            body = txt.slice(txt.indexOf("{") + 1, txt.lastIndexOf("}")).replace(/\s(?!.)/gm, "");
	        ob.exportedEvents[evt] = { args: args.map(function (el) {
	            return el.replace(/\s+|\n+|(\/\*\*\/\n)+/g, "");
	          }), body: body };
	      }

	      for (var func in this.functions) {
	        var _txt = this.functions[func].toString(),
	            _args = _txt.slice(_txt.indexOf("(") + 1, _txt.indexOf(")")).split(","),
	            _body = _txt.slice(_txt.indexOf("{") + 1, _txt.lastIndexOf("}")).replace(/\s(?!.)/gm, "");
	        ob.exportedFunctions[func] = { args: _args.map(function (el) {
	            return el.replace(/\s+|\n+|(\/\*\*\/\n)+/g, "");
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
	      ob.animations = this.animations;
	      ob.load = true;
	      ob.type = this.type;
	      ob.data.absoluteAssetURL = this.data.absoluteAssetURL || "./";

	      // console.log(ob);
	      return ob;
	    }
	  }, {
	    key: "loadFromJSON",
	    value: function loadFromJSON(json) {
	      var _this7 = this;

	      for (var key in json) {
	        this[key] = json[key];
	      }

	      for (var evt in json.exportedEvents) {
	        var args = json.exportedEvents[evt].args.map(function (el) {
	          return el.replace(/\s+|\n+|(\/\*\*\/\n)+/g, "");
	        }),
	            body = json.exportedEvents[evt].body;
	        this.events[evt] = new Function(args, body);
	      }

	      for (var func in json.exportedFunctions) {
	        var _args2 = json.exportedFunctions[func].args.map(function (el) {
	          return el.replace(/\s+|\n+|(\/\*\*\/\n)+/g, "");
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
	            child.data.absoluteAssetURL = child.data.absoluteAssetURL || "";
	          }
	          _this7.childs[index] = new MultimediaObject(child);
	          _this7.childs[index].DOMParent = _this7;
	        });
	      }

	      this.uuid = utils.generateUUID();
	      this.data = json.data || {};
	      this.type = json.type;
	      this.data.absoluteAssetURL = json.data ? json.data.absoluteAssetURL : "";
	      if (window._s4mConfig) {
	        if (window._s4mConfig.absoluteAssetURL !== "undefined" && window._s4mConfig.absoluteAssetURL !== "") {
	          this.data.absoluteAssetURL = window._s4mConfig.absoluteAssetURL;
	        } else if (typeof json.data.absoluteAssetURL !== "undefined" && json.data.absoluteAssetURL !== "" && json.data.absoluteAssetURL !== "./") {
	          window._s4mConfig.absoluteAssetURL = json.data.absoluteAssetURL;
	        }
	      } else {
	        this.data = json.data || {};
	        this.data.absoluteAssetURL = typeof json.data.absoluteAssetURL !== "undefined" && json.data.absoluteAssetURL !== "" ? json.data.absoluteAssetURL : "./";
	      }
	      // console.log(this.name, window._s4mConfig.absoluteAssetURL);
	    }
	  }]);

	  return MultimediaObject;
	}();

	;

	module.exports = MultimediaObject;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

	// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

	// MIT license

	module.exports = function () {
	    var lastTime = 0;
	    var vendors = ['ms', 'moz', 'webkit', 'o'];
	    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
	        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
	    }

	    if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
	        var currTime = new Date().getTime();
	        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	        var id = window.setTimeout(function () {
	            callback(currTime + timeToCall);
	        }, timeToCall);
	        lastTime = currTime + timeToCall;
	        return id;
	    };

	    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
	        clearTimeout(id);
	    };
	}();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Set = __webpack_require__(3);

	var cacheFn = function cacheFn(func) {
	  var data;
	  data = {};
	  return function () {
	    var i, k, key, len, result;
	    key = "";
	    for (i = 0, len = arguments.length; i < len; i++) {
	      k = arguments[i];
	      key += k.toString() + ",";
	    }
	    result = data[key];
	    if (!result) {
	      data[key] = result = func.apply(this, arguments);
	    }
	    return result;
	  };
	};

	var utils = {
	  Atoms: function Atoms() {
	    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "block";

	    var types = {
	      "block": "div",
	      "div": "div",
	      "header": "header",
	      "footer": "footer",
	      "aside": "aside",
	      "article": "article",
	      "main": "main",
	      "nav": "nav",
	      "navigation": "nav",
	      "span": "span",
	      "text": "p",
	      "p": "p",
	      "paragraphe": "p",
	      "ulist-container": "ul",
	      "ulist": "ul",
	      "ul": "ul",
	      "unordered-list": "ul",
	      "olist-container": "ol",
	      "olist": "ol",
	      "ol": "ol",
	      "ordered-list": "ol",
	      "list-element": "li",
	      "li": "li",
	      "code": "pre",
	      "pre": "pre",
	      "input": "input",
	      "textarea": "textarea",
	      "form": "form",
	      "image": "img",
	      "img": "img",
	      "button": "button",
	      "iframe": "iframe",
	      "video": "video",
	      "canvas": "canvas",
	      "audio": "audio"
	    };
	    return types[type];
	  },
	  convertLeftToTime: function convertLeftToTime(left, totalTime) {
	    var parentWidth = parseInt(window.getComputedStyle(document.getElementById("timeline-interface"), null).width),
	        percentageLeftFromPixel = left * 100 / parentWidth,
	        timeFromLeft = percentageLeftFromPixel / 98 * totalTime;
	    // console.log(left, parentWidth, timeFromLeft);
	    return parseFloat(timeFromLeft).toFixed(2);
	  },
	  concatObject: function concatObject() {
	    for (var _len = arguments.length, objects = Array(_len), _key = 0; _key < _len; _key++) {
	      objects[_key] = arguments[_key];
	    }

	    var ret = {};
	    var len = arguments.length;
	    for (var i = 0; i < len; i++) {
	      for (var p in objects[i]) {
	        if (objects[i].hasOwnProperty(p)) {
	          ret[p] = objects[i][p];
	        }
	      }
	    }
	    return ret;
	  },
	  checkEvent: function checkEvent(evt) {
	    return (/click|mousedown|mouseup|mousemove|change|touchstart|touchmove|touchend|input|focus|dlclick|mouseenter|mouseleave|mouseover|blur|search|submit|play|pause|canplay|progress/ig.test(evt)
	    );
	  },
	  getElementsWithAttribute: function getElementsWithAttribute(attribute, value, element) {
	    var matchingElements = [];
	    var allElements = element ? element instanceof Array ? element : document.querySelectorAll(element) : document.getElementsByTagName('*');
	    for (var i = 0, n = allElements.length; i < n; i++) {
	      var attrValue = allElements[i].getAttribute(attribute);
	      if (allElements[i].getAttribute(attribute) !== null) {
	        // Element exists with attribute. Add to array.
	        if (value) {
	          if (allElements[i].getAttribute(attribute) === value) {
	            matchingElements.push(allElements[i]);
	          }
	        } else {
	          matchingElements.push(allElements[i]);
	        }
	      }
	    }
	    return matchingElements;
	  },
	  getObjectUnderCursor: function getObjectUnderCursor(elements, cursorPosition, callback) {
	    var ret = false;
	    elements.forEach(function (object, index) {
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
	    return '#' + Math.floor(Math.random() * 16777215).toString(16);
	  },

	  closest: function closest(num, arr) {
	    var sortedArr = arr.sort(function (a, b) {
	      return a - b;
	    });
	    for (var i = 0; i < sortedArr.length; i++) {
	      if (num < sortedArr[i]) {
	        return sortedArr[i];
	      }
	    }
	    return sortedArr[sortedArr.length - 1];
	  },

	  pxProperties: new Set('marginTop,marginLeft,marginBottom,marginRight,paddingTop,paddingLeft,paddingBottom,paddingRight,top,left,bottom,right,translateX,translateY,translateZ,perspectiveX,perspectiveY,perspectiveZ,width,height,maxWidth,maxHeight,minWidth,minHeight,borderRadius'.split(',')),
	  degProperties: new Set('rotate,rotateX,rotateY,rotateZ,skew,skewX,skewY,skewZ'.split(',')),
	  transformProperties: new Set('translate,translateX,translateY,translateZ,scale,scaleX,scaleY,scaleZ,rotate,rotateX,rotateY,rotateZ,rotateC,rotateCX,rotateCY,skew,skewX,skewY,skewZ,perspective'.split(',')),
	  styleProperties: new Set('opacity,z-index'.split(',')),

	  isUnitProp: function isUnitProp(prop) {
	    return (/position|background|display|visibility|opacity|scale|transform-origin|font-weight|line-height|letter-spacing|z-index|outline|text-align|skew|rotate|transform|overflow|border-style|border-color|word/.test(prop)
	    );
	  },

	  constrain: function constrain(value, min, max) {
	    if (min > value) {
	      return min;
	    } else if (max < value) {
	      return max;
	    }
	    return value;
	  },

	  getRandomInt: function getRandomInt(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	  },

	  applyDefaults: function applyDefaults(options, defaults) {
	    var k, results, v;
	    results = [];
	    for (k in defaults) {
	      v = defaults[k];
	      results.push(options[k] != null ? options[k] : options[k] = v);
	    }
	    return results;
	  },

	  clone: function clone(o) {
	    var k, newO, v;
	    newO = {};
	    for (k in o) {
	      v = o[k];
	      newO[k] = v;
	    }
	    return newO;
	  },

	  roundf: function roundf(v, decimal) {
	    var d;
	    d = Math.pow(10, decimal);
	    return Math.round(v * d) / d;
	  },

	  toDashed: function toDashed(str) {
	    return str.replace(/([A-Z])/g, function ($1) {
	      return "-" + $1.toLowerCase();
	    });
	  },

	  prefixFor: cacheFn(function (property) {
	    var i, j, k, len, len1, prefix, prop, propArray, propertyName, ref;
	    if (document.body.style[property] !== void 0) {
	      return '';
	    }
	    propArray = property.split('-');
	    propertyName = "";
	    for (i = 0, len = propArray.length; i < len; i++) {
	      prop = propArray[i];
	      propertyName += prop.substring(0, 1).toUpperCase() + prop.substring(1);
	    }
	    ref = ["Webkit", "Moz", "ms"];
	    for (j = 0, len1 = ref.length; j < len1; j++) {
	      prefix = ref[j];
	      k = prefix + propertyName;
	      if (document.body.style[k] !== void 0) {
	        return prefix;
	      }
	    }
	    return '';
	  }),

	  propertyWithPrefix: cacheFn(function (property) {
	    var prefix;
	    prefix = utils.prefixFor(property);
	    if (prefix === 'Moz') {
	      return "" + prefix + (property.substring(0, 1).toUpperCase() + property.substring(1));
	    }
	    if (prefix !== '') {
	      return "-" + prefix.toLowerCase() + "-" + utils.toDashed(property);
	    }
	    return utils.toDashed(property);
	  }),

	  unitForProperty: function unitForProperty(k, v) {
	    if (typeof v !== 'number') {
	      return '';
	    }
	    if (utils.pxProperties.contains(k)) {
	      return 'px';
	    } else if (utils.degProperties.contains(k)) {
	      return 'deg';
	    }
	    return '';
	  },

	  getMaxOfArray: function getMaxOfArray(numArray) {
	    /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max */
	    return Math.max.apply(null, numArray);
	  },


	  transformValueForProperty: function transformValueForProperty(k, v) {
	    var match, unit;
	    match = ("" + v).match(/^([0-9.-]*)([^0-9]*)$/);
	    if (match != null) {
	      v = match[1];
	      unit = match[2];
	    } else {
	      v = parseFloat(v);
	    }
	    v = utils.roundf(parseFloat(v), 10);
	    if (unit == null || unit === "") {
	      unit = utils.unitForProperty(k, v);
	    }
	    return k + "(" + v + unit + ")";
	  },

	  generateUUID: function generateUUID() {
	    var d = new Date().getTime();
	    if (window.performance && typeof window.performance.now === "function") {
	      d += performance.now(); //use high-precision timer if available
	    }
	    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	      var r = (d + Math.random() * 16) % 16 | 0;
	      d = Math.floor(d / 16);
	      return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
	    });
	    return uuid;
	  },

	  getNumFromString: function getNumFromString(str) {
	    var num = str.match(/-(?=\d)|\d+|\.\d+/g);
	    return num !== null ? parseFloat(num.join("")) : str;
	  },

	  getUnitFromString: function getUnitFromString(str) {
	    var u = str.match(/%|px/g),
	        unit = u !== null ? u[0] : "px";
	    return unit;
	  },

	  hexToR: function hexToR(h) {
	    return parseInt(utils.cutHex(h).substring(0, 2), 16);
	  },
	  hexToG: function hexToG(h) {
	    return parseInt(utils.cutHex(h).substring(2, 4), 16);
	  },
	  hexToB: function hexToB(h) {
	    return parseInt(utils.cutHex(h).substring(4, 6), 16);
	  },
	  cutHex: function cutHex(h) {
	    return h.charAt(0) == "#" ? h.substring(1, 7) : h;
	  },
	  rgb2hex: function rgb2hex(red, green, blue) {
	    var rgb = blue | green << 8 | red << 16;
	    return '#' + (0x1000000 + rgb).toString(16).slice(1);
	  },

	  transformToColor: function transformToColor(propertie) {
	    var colorObj = void 0;
	    if (propertie[0] === "#") {
	      colorObj = {
	        r: utils.hexToR(propertie),
	        g: utils.hexToG(propertie),
	        b: utils.hexToB(propertie),
	        a: 1
	      };
	    } else {
	      var par = typeof propertie === "string" ? propertie.indexOf("\(") : -1;
	      if (par >= 0) {
	        propertie = propertie.slice(par + 1, propertie.length - 1);
	      }
	      var rgba = typeof propertie === "string" ? propertie.split(",") : [0, 0, 0, 0];
	      colorObj = {
	        r: parseInt(rgba[0]),
	        g: parseInt(rgba[1]),
	        b: parseInt(rgba[2]),
	        a: parseFloat(rgba[3] || 1)
	      };
	    }
	    return colorObj;
	  }

	};

	module.exports = utils;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	var Set = function Set(array) {
	  this.obj = {};
	  if (array) {
	    this.add(array);
	  }
	};

	Set.prototype = {
	  contains: function contains(v) {
	    return this.obj[v] === 1;
	  },
	  add: function add(array) {
	    var i, len, v;
	    for (i = 0, len = array.length; i < len; i++) {
	      v = array[i];
	      this.obj[v] = 1;
	    }
	  }
	};

	module.exports = Set;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	var Easing = {
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
			if (t == 0) return b;if ((t /= d) == 1) return b + c;if (!p) p = d * .3;
			if (a < Math.abs(c)) {
				a = c;var s = p / 4;
			} else var s = p / (2 * Math.PI) * Math.asin(c / a);
			return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		},
		easeOutElastic: function easeOutElastic(t, b, c, d) {
			var s = 1.70158;var p = 0;var a = c;
			if (t == 0) return b;if ((t /= d) == 1) return b + c;if (!p) p = d * .3;
			if (a < Math.abs(c)) {
				a = c;var s = p / 4;
			} else var s = p / (2 * Math.PI) * Math.asin(c / a);
			return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
		},
		easeInOutElastic: function easeInOutElastic(t, b, c, d) {
			var s = 1.70158;var p = 0;var a = c;
			if (t == 0) return b;if ((t /= d / 2) == 2) return b + c;if (!p) p = d * (.3 * 1.5);
			if (a < Math.abs(c)) {
				a = c;var s = p / 4;
			} else var s = p / (2 * Math.PI) * Math.asin(c / a);
			if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
			return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
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
				return c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b;
			} else if (t < 2.5 / 2.75) {
				return c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b;
			} else {
				return c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b;
			}
		},
		easeInOutBounce: function easeInOutBounce(t, b, c, d) {
			if (t < d / 2) return Easing.easeInBounce(t * 2, 0, c, d) * .5 + b;
			return Easing.easeOutBounce(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
		}
	};

	module.exports = Easing;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

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
	    };
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

	var eventManager = new EventManager();

	module.exports = eventManager;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	/*!
	  * $script.js JS loader & dependency manager
	  * https://github.com/ded/script.js
	  * (c) Dustin Diaz 2014 | License MIT
	  */
	(function (e, t) {
	  typeof module != "undefined" && module.exports ? module.exports = t() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (t), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : this[e] = t();
	})("$script", function () {
	  function p(e, t) {
	    for (var n = 0, i = e.length; n < i; ++n) {
	      if (!t(e[n])) return r;
	    }return 1;
	  }function d(e, t) {
	    p(e, function (e) {
	      return t(e), 1;
	    });
	  }function v(e, t, n) {
	    function g(e) {
	      return e.call ? e() : u[e];
	    }function y() {
	      if (! --h) {
	        u[o] = 1, s && s();for (var e in f) {
	          p(e.split("|"), g) && !d(f[e], g) && (f[e] = []);
	        }
	      }
	    }e = e[i] ? e : [e];var r = t && t.call,
	        s = r ? t : n,
	        o = r ? e.join("") : t,
	        h = e.length;return setTimeout(function () {
	      d(e, function t(e, n) {
	        if (e === null) return y();!n && !/^https?:\/\//.test(e) && c && (e = e.indexOf(".js") === -1 ? c + e + ".js" : c + e);if (l[e]) return o && (a[o] = 1), l[e] == 2 ? y() : setTimeout(function () {
	          t(e, !0);
	        }, 0);l[e] = 1, o && (a[o] = 1), m(e, y);
	      });
	    }, 0), v;
	  }function m(n, r) {
	    var i = e.createElement("script"),
	        u;i.onload = i.onerror = i[o] = function () {
	      if (i[s] && !/^c|loade/.test(i[s]) || u) return;i.onload = i[o] = null, u = 1, l[n] = 2, r();
	    }, i.async = 1, i.src = h ? n + (n.indexOf("?") === -1 ? "?" : "&") + h : n, t.insertBefore(i, t.lastChild);
	  }var e = document,
	      t = e.getElementsByTagName("head")[0],
	      n = "string",
	      r = !1,
	      i = "push",
	      s = "readyState",
	      o = "onreadystatechange",
	      u = {},
	      a = {},
	      f = {},
	      l = {},
	      c,
	      h;return v.get = m, v.order = function (e, t, n) {
	    (function r(i) {
	      i = e.shift(), e.length ? v(i, r) : v(i, t, n);
	    })();
	  }, v.path = function (e) {
	    c = e;
	  }, v.urlArgs = function (e) {
	    h = e;
	  }, v.ready = function (e, t, n) {
	    e = e[i] ? e : [e];var r = [];return !d(e, function (e) {
	      u[e] || r[i](e);
	    }) && p(e, function (e) {
	      return u[e];
	    }) ? t() : !function (e) {
	      f[e] = f[e] || [], f[e][i](t), n && n(r);
	    }(e.join("|")), v;
	  }, v.done = function (e) {
	    v([null], e);
	  }, v;
	});

/***/ }
/******/ ]);