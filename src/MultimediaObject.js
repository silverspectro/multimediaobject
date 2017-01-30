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


import raf from './lib/raf';
import utils from './utils/utils';
import Easings from './utils/easings';
import staticData from './config/data.static';
import eventManager from './lib/customEventManager';
import requireScript from './lib/requireScript';
import config from './config/config';

raf();
const conf = config();
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


export default class MultimediaObject {
  constructor(type = 'block', name = 'multimediaObject', fps = 60) {
    if (typeof type === 'object') {
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
        0.02: {},
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
      this.selectedAnimation = 'default';
      this.currentAnimation = {};
      this.breakpoints = [];
      this.animated = false;
      this.computedAnimations = [];
      this.childs = [];
      this.dependencies = [];
      this.animatedProps = {
        0.02: {},
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

  init() {
    this.generate(utils.Atoms(this.type));
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
        this.addListener('startAfterPreload', () => this.startAnimation(), true);
      }
    }
    if (this.attributes && !this.attributes.id) {
      this.applyAttributes({
        id: this.name,
      });
    }
  }

  addDefaultParameters() {
    if (conf.defaultAttributes[this.type] && !this.load) {
      for (const key in conf.defaultAttributes[this.type]) {
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

  checkDep(dependency, pushOrSplice = 'push') {
    const depIndex = this.dependencies.indexOf(dependency);
    switch (pushOrSplice) {
      case 'splice' :
        if (depIndex >= 0) {
          this.dependencies.splice(depIndex, 1);
        }
        break;
      case 'push' :
      default :
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

  applyDependencies(dependencies) {
    dependencies = dependencies || this.dependencies;
    if (dependencies instanceof Array) {
      dependencies.forEach((dep) => {
        this.checkDep(dep);
      });
    } else {
      this.checkDep(dependencies);
    }
    return this;
  }

  removeDependencies(dependencies) {
    dependencies = dependencies || this.dependencies;
    if (dependencies instanceof Array) {
      dependencies.forEach((dep) => {
        this.checkDep(dep, 'splice');
      });
    } else {
      this.checkDep(dependencies, 'splice');
    }
    return this;
  }

  requireDependencies(callback) {
    if (this.dependencies.length > 0) {
      requireScript(this.dependencies, 'dependencies');
      requireScript.ready('dependencies', callback);
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

  addGlobalStyle(style, callback) {
    const styleMarkup = document.createElement('style');
    const styleText = style;

    styleMarkup.innerHTML = styleText;
    styleMarkup.id = `${this.uuid}-style`;
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

  applyStyle(properties = this.style, override) {
    let k;
    const transforms = [];
    let v;
    const _style = Object.keys(this._style).length;
    override = override || false;

    for (k in properties) {
      v = properties[k];
      if (utils.transformProperties.contains(k)) {
        transforms.push([k, v]);
        const val = utils.transformValueForProperty(k, v);
        const treatedVal = `${val.value}${val.unit}`;
        if (_style < 1 || override) {
          this._style[k] = treatedVal;
        }
        this.style[k] = treatedVal;
      } else if (utils.pxProperties.contains(k)) {
        const val = `${utils.getNumFromString(v)}${utils.unitForProperty(k, v)}`;
        if (_style < 1 || override) {
          this._style[k] = val;
        }
        this.style[k] = val;
        this.element.style[k] = val;
      } else if (utils.styleProperties.contains(k)) {
        if (_style < 1 || override) {
          this._style[k] = v;
        }
        this.style[k] = v;
        this.element.style[k] = v;
      } else {
        const val = `${v}${utils.unitForProperty(k, v)}`;
        // console.log(v);
        this.style[utils.propertyWithPrefix(k)] = val;
        if (_style < 1 || override) {
          this._style[utils.propertyWithPrefix(k)] = val;
        }
        if (v.indexOf('{{absoluteAssetURL}}') >= 0 && window[conf.namespace]) {
          v = v.replace('{{absoluteAssetURL}}', window.MultimediaObjectEditor ? this.data.absoluteAssetURL : window[conf.namespace].absoluteAssetURL);
        }
        this.element.style[utils.propertyWithPrefix(k)] = v;
      }
    }

    let z = [0, 1, 2, 3];
    const trans = {
      x: this._style.translateX ? utils.getNumFromString(this._style.translateX) : 0,
      y: this._style.translateY ? utils.getNumFromString(this._style.translateY) : 0,
      z: this._style.translateZ ? utils.getNumFromString(this._style.translateZ) : 0,
      xU: this._style.translateX ? utils.getUnitFromString(this._style.translateX) : 'px',
      yU: this._style.translateY ? utils.getUnitFromString(this._style.translateY) : 'px',
      zU: this._style.translateZ ? utils.getUnitFromString(this._style.translateZ) : 'px',
    };
    const rot = {
      value: this._style.rotate ? utils.getNumFromString(this._style.rotate) : 0,
      u: 'deg',
    };
    const ske = {
      x: this._style.skewX ? utils.getNumFromString(this._style.skewX) : 0,
      y: this._style.skewY ? utils.getNumFromString(this._style.skewY) : 0,
      u: 'deg',
    };
    const sca = {
      x: this._style.scaleX ? utils.getNumFromString(this._style.scaleX) : 1,
      y: this._style.scaleY ? utils.getNumFromString(this._style.scaleY) : 1,
    };

    if (transforms.length > 0) {
      v = (transforms.map(transform => utils.transformValueForProperty(transform[0], transform[1]).string));

      v.forEach((a) => {
        if (a.indexOf('translateX') >= 0 || a.indexOf('translate-x') >= 0) {
          trans.x = utils.getNumFromString(a);
          trans.xU = utils.getUnitFromString(a);
        } else if (a.indexOf('translateY') >= 0 || a.indexOf('translate-y') >= 0) {
          trans.y = utils.getNumFromString(a);
          trans.yU = utils.getUnitFromString(a);
        } else if (a.indexOf('translateZ') >= 0 || a.indexOf('translate-z') >= 0) {
          trans.z = utils.getNumFromString(a);
          trans.zU = utils.getUnitFromString(a);
        }
        if (a.indexOf('rotate') >= 0) {
          rot.value = utils.getNumFromString(a);
        }
        if (a.indexOf('scaleX') >= 0 || a.indexOf('scale-x') >= 0) {
          sca.x = utils.getNumFromString(a);
        } else if (a.indexOf('scaleY') >= 0 || a.indexOf('scale-y') >= 0) {
          sca.y = utils.getNumFromString(a);
        } else if (a.indexOf('scale') >= 0) {
          sca.x = utils.getNumFromString(a);
          sca.y = utils.getNumFromString(a);
        }
        if (a.indexOf('skewX') >= 0 || a.indexOf('skew-x') >= 0) {
          ske.x = utils.getNumFromString(a);
        } else if (a.indexOf('skewY') >= 0 || a.indexOf('skew-y') >= 0) {
          ske.y = utils.getNumFromString(a);
        } else if (a.indexOf('skew') >= 0) {
          ske.x = utils.getNumFromString(a);
          ske.y = utils.getNumFromString(a);
        }
      });
      // console.log(z);
      z[0] = `translate3d(${trans.x}${trans.xU},${trans.y}${trans.yU},${trans.z}${trans.zU})`;
      z[1] = `rotate(${rot.value}${rot.u})`;
      z[2] = `skew(${ske.x}${ske.u},${ske.y}${ske.u})`;
      z[3] = `scale(${sca.x},${sca.y})`;
      // console.log(z);
      z = z.filter(el => !/^[0-9]/.test(el)).join(' ');

      this.element.style[utils.propertyWithPrefix('transform')] = z;
    }
    eventManager.dispatchEvent('actualize-style', this._style);

    return this;
  }

  /**
  * @function
  * Apply the functions as method of the MultimediaObject
  * @param {object} functions - key = name of functions, value = function body.
  * @return {object} MultimediaObject
  */

  applyFunctions(functions) {
    if (functions) {
      for (const func in functions) {
        this[func] = functions[func];
        this.functions[func] = functions[func];
      }
    } else {
      for (const func in this.functions) {
        this[func] = this.functions[func];
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

  applyAttributes(attributes) {
    if (attributes) {
      for (const attr in attributes) {
        let replaced = attributes[attr];
        if (typeof attributes[attr] === 'string' && attributes[attr].indexOf('{{absoluteAssetURL}}') >= 0 && window[conf.namespace]) {
          replaced = attributes[attr].replace('{{absoluteAssetURL}}', window.MultimediaObjectEditor ? this.data.absoluteAssetURL : window[conf.namespace].absoluteAssetURL);
        }
        this.attributes[attr] = attributes[attr];
        this.element.setAttribute(attr, (replaced || attributes[attr]));
      }
    } else {
      for (const attr in this.attributes) {
        let replaced = this.attributes[attr];
        if (typeof this.attributes[attr] === 'string' && this.attributes[attr].indexOf('{{absoluteAssetURL}}') >= 0 && window[conf.namespace]) {
          replaced = this.attributes[attr].replace('{{absoluteAssetURL}}', window.MultimediaObjectEditor ? this.data.absoluteAssetURL : window[conf.namespace].absoluteAssetURL);
        }
        this.element.setAttribute(attr, (replaced || this.attributes[attr]));
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

  applyBreakpoints(breakpoints = []) {
    if (this.breakpoints.length > 0 || breakpoints.length > 0) {
      breakpoints.forEach((breakpoint, index) => {
        if (this.breakpoints.indexOf(breakpoint) === -1) {
          this.breakpoints.push(breakpoint);
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

  applyEvents(events) {
    const applySwipeEvent = (evt) => {
      let detecttouch = !!('ontouchstart' in window) || !!('ontouchstart' in document.documentElement) || !!window.ontouchstart || !!window.onmsgesturechange || (window.DocumentTouch && window.document instanceof window.DocumentTouch),
        ob = this;
      let userData = {};
      ob.evtStarted = false;
      this.evtStart = function (e) {
        e.preventDefault();
        const event = e.changedTouches ? e.changedTouches[0] : e;
        ob.evtStarted = true;
        userData = {
          start: {
            left: event.pageX,
            top: event.pageY,
          },
        };
      };
      this.evtEnd = function (e) {
        e.preventDefault();
        if (!ob.evtStarted) {
          return;
        }
        const event = e.changedTouches ? e.changedTouches[0] : e;
        userData.end = {
          left: event.pageX,
          top: event.pageY,
        };
        userData.dx = userData.end.left - userData.start.left;
        userData.dy = userData.end.top - userData.start.top;
        userData.angle = Math.atan2(userData.dy, userData.dx);
        userData.angle *= 180 / Math.PI;
        userData.inMotion = (e.type === 'touchmove' || e.type === 'mousemove');
        userData.direction = Math.abs(userData.dx) > Math.abs(userData.dy) ? (`${userData.dx}`).indexOf('-') !== -1 ? 'left' : 'right' : (`${userData.dy}`).indexOf('-') !== -1 ? 'top' : 'bottom';
        ob.events[evt].apply(ob, [e, userData]);
        if (userData.inMotion === false) {
          ob.evtStarted = false;
        }
      };
      if (detecttouch) {
        this.element.addEventListener('touchstart', this.evtStart, false);
        this.element.addEventListener('touchmove', this.evtEnd, false);
        this.element.addEventListener('touchend', this.evtEnd, false);
      } else {
        this.element.addEventListener('mousedown', this.evtStart, false);
        this.element.addEventListener('mousemove', this.evtEnd, false);
        this.element.addEventListener('mouseup', this.evtEnd, false);
      }
    };
    if (events) {
      for (const evt in events) {
        this.events[evt] = events[evt];
        this._events[evt] = this.transformEvent(events[evt]);
        if (utils.checkEvent(evt) && evt !== 'swipe') {
          this.element.addEventListener(evt, this._events[evt]);
        } else if (evt === 'swipe') {
          applySwipeEvent(evt);
        } else {
          this.addListener(evt, this.events[evt]);
        }
      }
    } else if (Object.keys(this.events).length > 0) {
      for (const evt in this.events) {
        if (evt === 'swipe') {
          applySwipeEvent(evt);
        } else {
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

  /**
  * @function
  * Remove an event by eventName
  * @param {string} eventName - name of the event
  * @return {object} MultimediaObject
  */

  removeEvent(eventName) {
    if (utils.checkEvent(eventName)) {
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

  deactivateEvent(eventName) {
    if (this.events[eventName]) {
      if (utils.checkEvent(eventName)) {
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

  removeFunction(functionName) {
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

  removePropertie(type, propertieName) {
    switch (type) {
      case 'attributes' :
        if (this.attributes[propertieName]) {
          this.element.removeAttribute(propertieName);
          delete this.attributes[propertieName];
        } else {
          console.log(`${propertieName} attribute does not exist`);
        }
        break;
      case 'data' :
        if (this.data[propertieName]) {
          delete this.data[propertieName];
        } else {
          console.log(`${propertieName} data does not exist`);
        }
        break;
      case 'style' :
      default :
        if (this._style[propertieName]) {
          this.element.style[utils.propertyWithPrefix(propertieName)] = '';
          this.element.style[propertieName] = '';
          if (utils.transformProperties.contains(propertieName)) {
            this.element.style[utils.propertyWithPrefix('transform')] = '';
            this.element.style.transform = '';
          }
          delete this.style[propertieName];
          delete this._style[propertieName];
          const containsTransformProps = (() => {
            let keys = Object.keys(this._style),
              hasTransform = false;
            for (let key = 0; key < keys.length; key++) {
              if (utils.transformProperties.contains(keys[key])) {
                hasTransform = true;
                break;
              }
            }
            return hasTransform;
          })();
          if (!containsTransformProps) {
            delete this.style.transform;
            delete this._style.transform;
            delete this.style[utils.propertyWithPrefix('transform')];
            delete this._style[utils.propertyWithPrefix('transform')];
          }
        } else if (this.style[propertieName]) {
          if (utils.transformProperties.contains(propertieName)) {
            this.element.style[utils.propertyWithPrefix('transform')] = '';
            this.element.style.transform = '';
          }
          this.element.style[utils.propertyWithPrefix(propertieName)] = '';
          this.element.style[propertieName] = '';
          delete this.style[propertieName];
        } else {
          console.log(`${propertieName} style does not exist`);
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

  transformEvent(callback) {
    const parent = this;
    return function (event) { callback.apply(parent, [event]); };
  }

  checkBreakpoints() {
    let winW = window.MultimediaObjectEditor ? `parseInt(getComputedStyle(document.getElementById('${conf.container}')).width)` : 'window.innerWidth',
      winH = window.MultimediaObjectEditor ? `parseInt(getComputedStyle(document.getElementById('${conf.container}')).height)` : 'window.innerHeight';
    if (this.breakpoints.length > 0) {
      const style = {};
      for (const w in this._style) {
        style[w] = this._style[w];
      }
      this.breakpoints.forEach((breakpoint, index) => {
        const conditions = [];
        for (const breaks in breakpoint.querie) {
          if (breaks === 'orientation') {
            conditions.push(`${breakpoint.querie[breaks] === 'landscape' ? `${winW} > ${winH}` : `${winH} > ${winW}`}`);
          } else {
            conditions.push(`${/height/.test(breaks) ? winH : winW} ${/min/.test(breaks) ? '>=' : '<='} ${parseInt(breakpoint.querie[breaks])}`);
          }
        }
        let evaluatedRule = '';

        conditions.forEach((rule, index) => {
          if (index >= 1) {
            evaluatedRule += ` && ${rule}`;
          } else {
            evaluatedRule += rule;
          }
        });
        evaluatedRule = new Function(`return ${evaluatedRule}`);
        if (evaluatedRule()) {
          for (const s in breakpoint.style) {
            style[s] = breakpoint.style[s];
          }
        }
      });
      if (this.computedAnimations.length > 0) {
        for (const w in this.computedAnimations[this.currentIteration]) {
          style[w] = this.computedAnimations[this.currentIteration][w];
        }
      }
      this.applyStyle(style);
    }
  }

  /**
  * @function
  * Generates the DOMElement based on type parameter
  * @param {string} type - type of DOMElement
  * @return {object} MultimediaObject
  */

  generate(type) {
    this.element = document.createElement(type);
    this.type = type;
    window.addEventListener('resize', () => {
      this.checkBreakpoints();
    });
    eventManager.addListener('resize-scene', () => {
      this.checkBreakpoints();
    });
    return this;
  }

  /**
  * @function
  * append MultimediaObject.element to container parameter
  * @param {DOMElement or MultimediaObject} container - the container to append to
  * @return {object} MultimediaObject
  */

  appendElementTo(container) {
    if (container) {
      if (container instanceof MultimediaObject) {
        container.element.appendChild(this.element);
      } else {
        container.appendChild(this.element);
      }
      this.DOMParent = container;
      let childsLength = this.childs.length,
        i = 0;

      if (childsLength > 0) {
        this.childs.forEach((child, index) => {
          child.DOMParent = this;
          child.appendElementTo(this);
        });
      }
    } else {
      document.body.appendChild(this.element);
      this.DOMParent = document.body;
      let childsLength = this.childs.length,
        i = 0;

      if (childsLength > 0) {
        this.childs.forEach((child, index) => {
          child.DOMParent = this;
          child.appendElementTo(this);
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

  add(child) {
    this.childs.push(child);
    if (child instanceof MultimediaObject) {
      this.element.appendChild(child.element);
    } else {
      this.element.appendChild(child);
    }
    child.DOMParent = this;
    eventManager.dispatchEvent('actualize-DOM-elements');
    return this;
  }

  /**
  * @function
  * removes a child from a MultimediaObject
  * @param {DOMElement} child - the child to remove
  * @return {object} MultimediaObject
  */

  remove(child) {
    const elementIndex = this.childs.indexOf(child);
    if (elementIndex >= 0) {
      this.childs.splice(elementIndex, 1);
      if (child instanceof MultimediaObject) {
        this.element.removeChild(child.element);
      } else {
        this.element.removeChild(child);
      }
      child.DOMParent = null;
    }
    eventManager.dispatchEvent('actualize-DOM-elements');
    return this;
  }

  /**
  * @function
  * get the computed style of a CSS propertie
  * @param {string} propertie - the css propertie
  * @return {string} css - pixel value
  */

  getComputedStyle(propertie) {
    return getComputedStyle(this.element, null).getPropertyValue(propertie);
  }

  /**
  * @function
  * pre interpolate animations steps for interpolation
  * @param {int} fps - the framerate to use as base for the frame computation
  * @return {object} MultimediaObject
  */

  preInterpolateStep(fps) {
    this.getSortedSteps();
    let isAnimatedEvent = (string) => {
        if (Object.keys(this._events).join().indexOf(string) >= 0) {
          return true;
        }
        return false;
      },
      totalAnimationTime = utils.getMaxOfArray(this.numericSteps),
      totalAnimationIteration = Math.floor(totalAnimationTime * fps);

    this.animatedProps = {};
    let lastStep;

    for (let secIndex = 0; secIndex < this.numericSteps.length; secIndex++) {
      const second = this.numericSteps[secIndex].toFixed(2);
      let easing;
      // console.log("animations : ", this.currentAnimation);

      for (const prop in this.currentAnimation[second]) {
        if (prop !== 'easing') {
          if (!this.animatedProps[prop]) {
            this.animatedProps[prop] = {};
            this.animatedProps[prop].label = prop;
            this.animatedProps[prop].steps = {};
          }

          if (!this.animatedProps[prop].steps[second]) {
            this.animatedProps[prop].steps[second] = {};
          }
          let stepPropKeys = Object.keys(this.animatedProps[prop].steps),
            lastStepProp = stepPropKeys.length > 1 ? stepPropKeys[stepPropKeys.length - 2] : undefined;

          lastStep = lastStepProp ? this.animatedProps[prop].steps[lastStepProp] : undefined;

          if (/color/ig.test(prop)) {
            const colorObj = utils.transformToColor(this.currentAnimation[second][prop]);
            this.animatedProps[prop].steps[second].startValue = lastStep ? lastStep.endValue : (this._style[prop] ? utils.transformToColor(this._style[prop]) : { r: 0, g: 0, b: 0 });
            this.animatedProps[prop].steps[second].unit = typeof this.currentAnimation[second][prop] === 'string' ? utils.getUnitFromString(this.currentAnimation[second][prop] || '') : '';
            this.animatedProps[prop].steps[second].endValue = colorObj;
            this.animatedProps[prop].steps[second].changeInValue = {
              r: this.animatedProps[prop].steps[second].endValue.r - this.animatedProps[prop].steps[second].startValue.r,
              g: this.animatedProps[prop].steps[second].endValue.g - this.animatedProps[prop].steps[second].startValue.g,
              b: this.animatedProps[prop].steps[second].endValue.b - this.animatedProps[prop].steps[second].startValue.b,
              a: this.animatedProps[prop].steps[second].endValue.a - this.animatedProps[prop].steps[second].startValue.a,
            };
            this.animatedProps[prop].steps[second].initIteration = lastStepProp ? Math.floor(lastStepProp * fps) : 0;
            this.animatedProps[prop].steps[second].totalStepIteration = Math.floor(second * fps - this.animatedProps[prop].steps[second].initIteration);
            this.animatedProps[prop].steps[second].easing = this.currentAnimation[second].easing;
            this.animatedProps[prop].steps[second].currentIteration = 0;
          } else if (!/\d/g.test(this.currentAnimation[second][prop])) {
            this.animatedProps[prop].steps[second].startValue = lastStep ? lastStep.endValue : (this._style[prop] ? this._style[prop] : 'auto');
            this.animatedProps[prop].steps[second].unit = '';
            this.animatedProps[prop].steps[second].endValue = this.currentAnimation[second][prop];
            this.animatedProps[prop].steps[second].changeInValue = this.animatedProps[prop].steps[second].endValue;
            this.animatedProps[prop].steps[second].initIteration = lastStepProp ? Math.floor(lastStepProp * fps) : 0;
            this.animatedProps[prop].steps[second].totalStepIteration = Math.floor(second * fps) - this.animatedProps[prop].steps[second].initIteration;
            this.animatedProps[prop].steps[second].easing = this.currentAnimation[second].easing;
            this.animatedProps[prop].steps[second].currentIteration = 0;
          } else {
            this.animatedProps[prop].steps[second].startValue = parseFloat(lastStep ? lastStep.endValue : (this._style[prop] ? (parseFloat(this._style[prop])) : 0));
            this.animatedProps[prop].steps[second].unit = typeof this.currentAnimation[second][prop] === 'string' && /px|%/g.test(this.currentAnimation[second][prop]) ? utils.getUnitFromString(this.currentAnimation[second][prop] || '') : '';
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

    for (const prop in this.animatedProps) {
      if (!isAnimatedEvent(prop)) {
        for (let iteration = 0; iteration <= totalAnimationIteration; iteration++) {
          let propNumericSteps = Object.keys(this.animatedProps[prop].steps),
            iterationSeconds = (iteration / totalAnimationIteration) * totalAnimationTime,
            secondsElapsed = isFinite(iterationSeconds) ? Number(iterationSeconds).toFixed(2) : 0,
            stepSecond = utils.closest(secondsElapsed, propNumericSteps);

          if (!this.computedAnimations[iteration]) {
            this.computedAnimations[iteration] = {};
          }
          if (/color/ig.test(prop)) {
            let easing = this.animatedProps[prop].steps[stepSecond].easing || 'linearEase',
              actualIteration = this.animatedProps[prop].steps[stepSecond].currentIteration,
              startValue = this.animatedProps[prop].steps[stepSecond].startValue,
              endValue = this.animatedProps[prop].steps[stepSecond].endValue,
              changeInValue = this.animatedProps[prop].steps[stepSecond].changeInValue,
              totalIterationValue = this.animatedProps[prop].steps[stepSecond].totalStepIteration,
              r = actualIteration < totalIterationValue ? parseInt(Easings[easing](actualIteration, startValue.r, changeInValue.r, totalIterationValue)) : endValue.r,
              g = actualIteration < totalIterationValue ? parseInt(Easings[easing](actualIteration, startValue.g, changeInValue.g, totalIterationValue)) : endValue.g,
              b = actualIteration < totalIterationValue ? parseInt(Easings[easing](actualIteration, startValue.b, changeInValue.b, totalIterationValue)) : endValue.b,
              a = actualIteration < totalIterationValue ? Number(Easings[easing](actualIteration, startValue.a, changeInValue.a, totalIterationValue).toFixed(2)) : endValue.a;

            this.computedAnimations[iteration][prop] = `rgba(${r},${g},${b},${a})`;
            // console.log(this.computedAnimations[iteration][prop]);
          } else if (!/\d/g.test(this.animatedProps[prop].steps[stepSecond].startValue)) {
            let easing = this.animatedProps[prop].steps[stepSecond].easing || 'linearEase',
              actualIteration = this.animatedProps[prop].steps[stepSecond].currentIteration,
              startValue = this.animatedProps[prop].steps[stepSecond].startValue,
              endValue = this.animatedProps[prop].steps[stepSecond].endValue,
              changeInValue = this.animatedProps[prop].steps[stepSecond].changeInValue,
              totalIterationValue = this.animatedProps[prop].steps[stepSecond].totalStepIteration,
              value = actualIteration < totalIterationValue - 1 ? startValue : endValue;
                // console.log(prop,this.animatedProps[prop].steps[stepSecond].initIteration,iteration,actualIteration,totalIterationValue,totalAnimationIteration);

            this.computedAnimations[iteration][prop] = value + this.animatedProps[prop].steps[stepSecond].unit;
          } else {
            let easing = this.animatedProps[prop].steps[stepSecond].easing || 'linearEase',
              actualIteration = this.animatedProps[prop].steps[stepSecond].currentIteration,
              startValue = this.animatedProps[prop].steps[stepSecond].startValue,
              endValue = this.animatedProps[prop].steps[stepSecond].endValue,
              changeInValue = this.animatedProps[prop].steps[stepSecond].changeInValue,
              totalIterationValue = this.animatedProps[prop].steps[stepSecond].totalStepIteration,
              value = actualIteration < totalIterationValue - 1 ? Easings[easing](actualIteration, startValue, changeInValue, totalIterationValue) : endValue;
                // console.log(prop,this.animatedProps[prop].steps[stepSecond].initIteration,iteration,actualIteration,totalIterationValue,totalAnimationIteration);

            this.computedAnimations[iteration][prop] = value + this.animatedProps[prop].steps[stepSecond].unit;
          }

          if (iteration >= this.animatedProps[prop].steps[stepSecond].initIteration && this.animatedProps[prop].steps[stepSecond].currentIteration <= this.animatedProps[prop].steps[stepSecond].totalStepIteration) {
            this.animatedProps[prop].steps[stepSecond].currentIteration++;
          }
        }
      } else {
        for (const sec in this.animatedProps[prop].steps) {
          const iterationSec = Math.floor(Number(sec) * this.fps);
          if (!this.computedAnimations[iterationSec]) {
            this.computedAnimations[iterationSec] = {};
          }
          this.computedAnimations[iterationSec][prop] = this.animatedProps[prop].steps[sec].endValue;
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

  interpolateStep(currentIteration, seconds, fps) {
    const animationsLength = this.computedAnimations.length;
    // console.log(animationsLength,currentIteration);
    if (animationsLength <= 0) {
      this.preInterpolateStep(fps);
    }
    // console.log(this.computedAnimations[currentIteration]);
    if (currentIteration <= 1 && !this.animationStarted) {
      eventManager.dispatchEvent(`${this.uuid}-animationStart`);
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
      eventManager.dispatchEvent(`${this.uuid}-animationEnd`);
    }
  // console.log(animationsLength, currentIteration, this.animationStarted);

    return this;
  }

  applyIteration() {
    if (this.computedAnimations[this.currentIteration]) {
      const style = Object.create(this.computedAnimations[this.currentIteration]);
      for (const key in this.computedAnimations[this.currentIteration]) {
        if (!utils.isAnimatableProp(key)) {
          this.dispatchEvent(key, { value: this.computedAnimations[this.currentIteration][key] });
          delete style[key];
        }
      }
      this.applyStyle(style);
    }
  }

  restartAnimation() {
    this.stopAnimation();
    this.counter = 0;
    this.runAnimation();
  }

  startAnimation() {
    this.animationStarted = true;
    this.runAnimation();
    // this.childs.forEach(function(child){
    //   if(child.data.autostart){
    //     child.startAnimation();
    //   }
    // });
  }

  stopAnimation() {
    this.animationStarted = false;
    this.animated = false;
    // this.counter = 0;
    window.cancelAnimationFrame(this.rafID);
    // this.childs.forEach(function(child){
    //   child.stopAnimation();
    // });
  }

  runAnimation() {
    this.rafID = window.requestAnimationFrame((time) => { this.runAnimation(); });
    if (Object.keys(this.currentAnimation).length > 0) {
      this.now = performance.now() || Date.now();
      this.delta = this.now - this.then;
      if (!this.animationStarted) {
        this.animationStarted = true;
        this.totalTime = Number(this.getSortedSteps()[this.getSortedSteps().length - 1]);
        this.totalIteration = this.totalTime * this.fps;
      } else if (this.delta > this.interval) {
        this.then = this.now - (this.delta % this.interval);

        if (!this.reverse) {
          this.counter++;
        } else {
          if (this.counter <= 0) {
            this.counter = this.totalIteration;
              // console.log(this.counter);
          }
          this.counter--;
        }

        let sec = performance.now() || Date.now(),
          dateSec = new Date(sec - this.startTime),
          iterationSeconds = (this.counter / this.totalIteration) * this.totalTime;

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

  addListener(listener, fn, glob) {
    glob = glob || /global/ig.test(listener);
    if (glob) {
      return eventManager.addListener(listener, fn);
    }
    return eventManager.addListener(`${this.uuid}-${listener}`, fn);
  }

  removeListener(listener, fn, glob) {
    glob = glob || /global/ig.test(listener);
    if (glob) {
      if (fn instanceof Function) {
        return eventManager.removeListener(listener, fn);
      }
      return eventManager.removeListener(listener, this[fn]);
    } else if (fn instanceof Function) {
      return eventManager.removeListener(`${this.uuid}-${listener}`, fn);
    }
    return eventManager.removeListener(`${this.uuid}-${listener}`, this[fn]);
  }

  dispatchEvent(eventName, params, glob) {
    glob = glob || /global/ig.test(eventName);
    if (glob) {
      return eventManager.dispatchEvent(eventName, params, this);
    }
    return eventManager.dispatchEvent(`${this.uuid}-${eventName}`, params, this);
  }

  changeAnimation(animationName) {
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

  addAnimationProperties(propertieArray) {
    let _parent = this,
      existingProp = Object.keys(this.animatedProps),
      time = this.timeline ? Number(this.timeline.secondsElapsed) : 0;

    time = time === 0 ? 0.00 : time;
    propertieArray.forEach((refProp, index) => {
      let prop = refProp.key || refProp,
        value = refProp.value || this._style[prop] || 0;

      if (existingProp.indexOf(prop) === -1) {
        if (!this.currentAnimation[time]) {
          this.currentAnimation[time] = {};
        }
        this.currentAnimation[time][prop] = value;
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

  deleteAnimationProperties(propertieArray) {
    propertieArray.forEach((refProp, index) => {
      for (const step in this.currentAnimation) {
        for (const prop in this.currentAnimation[step]) {
          if (prop === refProp) {
            delete this.currentAnimation[step][prop];
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

  deleteAnimationKeyframe(time, prop) {
    if (this.currentAnimation[time]) {
      if (prop) {
        delete this.currentAnimation[time][prop];
      } else {
        delete this.currentAnimation[time];
      }
      if (Object.keys(this.currentAnimation[time]).length === 1) {
        delete this.currentAnimation[time];
      }
      this.animations[this.selectedAnimation] = this.currentAnimation;
      this.preInterpolateStep(this.timeline.fps || this.fps);
      if (this.timeline) {
        this.timeline.computeSteps();
      }
      this.dispatchEvent('actualize-timeline-elements', {}, true);
    } else {
      console.log(`animation at ${time} don't exist`);
    }

    return this;
  }

  addAnimationKeyframe(time, prop, value) {
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

  getSortedSteps() {
    const numericSteps = Object.keys(this.currentAnimation).map((val, index) => parseFloat(val));
    numericSteps.sort((a, b) => a - b);
    this.numericSteps = numericSteps;
    for (const t in this.currentAnimation) {
      // console.log(t);
      if (!/\d\.\d{2}/.test(t)) {
        this.currentAnimation[parseFloat(t).toFixed(2)] = this.currentAnimation[t];
        delete this.currentAnimation[t];
      } else if (Object.keys(this.currentAnimation[t]).length === 0) {
        delete this.currentAnimation[t];
      }
    }
    return this.numericSteps;
  }

  getTotalAnimationTime() {
    this.getSortedSteps();
    this.totalAnimationTime = utils.getMaxOfArray(this.numericSteps);
    return this.totalAnimationTime;
  }

  exportToJSON() {
    const ob = {};
    ob.exportedEvents = {};
    ob.exportedFunctions = {};
    ob.childs = [];

    for (const p in this) {
      if (typeof this[p] !== 'undefined' && this[p] !== null) {
        if (typeof this[p] !== 'function' && !this[p].element && !this[p].children && !this[p].elements && !/exportedFunctions|exportedEvents|childs|interval|then|now|delta|animated|animationStarted|currentIteration|computedAnimations|totalTime|secondsElapsed|rafID|numericSteps|counter|totalIteration|animationStarted|direction|coords|bounds|geo|infowindow|map|marker|shop/.test(p)) {
          ob[p] = this[p];
        }
      }
    }

    for (const evt in this.events) {
      let txt = this.events[evt].toString(),
        args = txt.slice(txt.indexOf('(') + 1, txt.indexOf(')')).split(','),
        body = txt.slice(txt.indexOf('{') + 1, txt.lastIndexOf('}'));
      ob.exportedEvents[evt] = { args: args.map(el => el.replace(/\s+|\n+|(\/\*\*\/\n)+/g, '')), body };
    }

    for (const func in this.functions) {
      let txt = this.functions[func].toString(),
        args = txt.slice(txt.indexOf('(') + 1, txt.indexOf(')')).split(','),
        body = txt.slice(txt.indexOf('{') + 1, txt.lastIndexOf('}'));
      ob.exportedFunctions[func] = { args: args.map(el => el.replace(/\s+|\n+|(\/\*\*\/\n)+/g, '')), body };
    }

    this.childs.forEach((child) => {
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

  setAbsoluteAssetURL(json) {
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

  loadFromJSON(json) {
    for (const key in json) {
      if (key === 'animations' && !json.animations.default) {
        this.currentAnimation = json.animations;
        this.animations = {};
        this.animations.default = json.animations;
      } else {
        this[key] = json[key];
      }
    }

    for (const evt in json.exportedEvents) {
      let args = json.exportedEvents[evt].args.map(el => el.replace(/\s+|\n+|(\/\*\*\/\n)+/g, '')),
        body = json.exportedEvents[evt].body;
      this.events[evt] = new Function(args, body);
    }

    for (const func in json.exportedFunctions) {
      let args = json.exportedFunctions[func].args.map(el => el.replace(/\s+|\n+|(\/\*\*\/\n)+/g, '')),
        body = json.exportedFunctions[func].body;
      this.functions[func] = new Function(args, body);
    }
    if (json.childs) {
      json.childs.forEach((child, index) => {
        child.load = true;
        if (json.data) {
          child.data = child.data || {};
          // child.data.absoluteAssetURL = json.data.absoluteAssetURL || "";
          child.data.autostart = eval(child.data.autostart);
          child.data.absoluteAssetURL = child.data.absoluteAssetURL || '';
        }
        child.DOMParent = this;
        this.childs[index] = new MultimediaObject(child);
      });
    }

    this.uuid = utils.generateUUID();
    this.data = json.data || {};
    this.type = json.type;
    this.data.absoluteAssetURL = json.data && json.data.absoluteAssetURL ? json.data.absoluteAssetURL : '';
    this.data.autostart = json.data ? eval(json.data.autostart) : true;
    this.setAbsoluteAssetURL(json);
  }
}

module.exports = MultimediaObject;
