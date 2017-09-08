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

const findIndex = (array, params, one) => {
  if (!(array instanceof Array))
    throw new Error('findBy: can find only in array');
  const length = array.length;
  const results = [];
  let index = 0;

  const cycleParams = (queries, element) => {
    if (typeof queries === 'object') {
      let found = true;
      for (const key in queries) {
        if (!element[key] || queries[key] !== element[key]) {
          found = false;
          continue;
        }
      }
      if (found) {
        results.push(index);
      }
    } else if (queries === element) {
      results.push(index);
    }
    return results;
  };

  while (index < length) {
    if (typeof params === typeof array[index]) {
      cycleParams(params, array[index]);
    }
    if (one && results.length > 0) {
      return results[0];
    }
    index += 1;
  }

  return results;
};

import raf from './lib/raf';
import * as utils from './utils/utils';
import * as Easings from './utils/easings';
import eventManager from './lib/customEventManager';
import requireScript from './lib/requireScript';
import conf from './config/config';

raf();
/**
* Represents a MultimediaObject
* @class MultimediaObject
* @param {object | string} type -  a JSON representing the object or the DOM type of the MultimediaObject
* @param {string} name - the name of the MultimediaObject
* @param {object} data - an object representing the datas which can be internally used by the MultimediaObject
* @param {object} style - an object representing the CSS style of the MultimediaObject, applied at creation
* @param {object} attributes - an object representing the DOM attributes of the MultimediaObject, applied at creation to the DOM Element
* @param {object} events - an object representing the Events provided by the object. Supporting only DOM events for the moment.
* @param {object} animations - a second separated Object representing the MultimediaObject state over time. Each step contain an object with style values wich will be precompiled and applied over time.

* @example
* <caption>Instanciation</caption>
* new MultimediaObject({
*  type: 'div',
*  style: {
*    position: 'absolute',
*    translateX: '10%'
*  },
*  attributes: {
*   id: 'multimediaObject',
*   'data-test': 'test',
*  },
*  events: {
*    click: function(event) {
*       console.log(this);
*       console.log(event);
*    };
*  }
* });
*/

const unserializeFunction = (serialized) => {
  let args = serialized.args.map(el => el.replace(/\n+|(\/\*\*\/\n)+/g, '').replace(/^(\n+|\t+|\t\n+)(?!\w)$/gm, '').replace(/`/gm, '')),
  body = serialized.body;
  return new Function(args, body);
}


export default class MultimediaObject {
  constructor(type = 'block', name = 'multimediaObject', fps = 60) {
    this.uuid = utils.generateUUID();

    this.data = {};
    this._style = {};
    this.style = {};
    this.attributes = {};
    this.events = {};
    this._events = {};
    this.functions = {};
    this.selectedAnimation = 'default';
    this.currentAnimation = {};
    this.animations = {};
    this.breakpoints = [];
    this.animated = false;
    this.computedAnimations = [];
    this.childs = [];
    this.dependencies = [];
    this.animatedProps = {};
    this.innerHTML = '';

    this.DOMParent = null;
    this.DOMParentUUID = null;

    this.reverse = false;
    this.repeat = 0;

    if (typeof type === 'object') {
      this.uuid = type.uuid || this.uuid;
      this.name = name || type.name;
      this.type = type.type || 'block';

      this.load = true;

      this.loadFromJSON(type);
      this.applyFunctions();

      this.addDefaultParameters();
      this.init();
      this.applyAttributes();
      this.applyStyle();
      this.applyEvents();
      this.applyBreakpoints();
      this.applyDependencies();
      this.changeAnimation(this.selectedAnimation);

    } else {
      this.name = name;
      this.type = type;

      this.init();
      this.addDefaultParameters();
    }

    this.fps = fps;
    this.then = performance.now() || Date.now();
    this.interval = 1000 / this.fps;
    this.totalIteration = 0;
    this.counter = 0;

    this.animationStarted = false;
    this.repeatCounter = 0;

    if(!window.MultimediaObjectEditor) {
      if (this.data.forceStart) {
        this.startAnimation();
      } else if(this.data.autostart && !(this.DOMParent instanceof MultimediaObject)) {
        this.addListener('startAfterPreload', () => {
          this.startAnimation();
        });
      }
    }
  }

  /**
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
    }
    this.applyAttributes({
      id: /multimediaObject(\d+)?/.test(this.name) ? this.uuid : this.name,
    });
    this.addGlobalStyle();
  }

  /**
  * Add the default parameters set in the config file based on the type
  */

  addDefaultParameters() {
    if (conf.defaultAttributes[this.type] && !this.load) {
      for (const key in conf.defaultAttributes[this.type]) {
        if (!this.attributes[key]) {
          this.attributes[key] = conf.defaultAttributes[this.type][key];
        }
      }
    }
    this.data.autostart = typeof this.data.autostart === 'undefined' ? true : utils.parseBoolean(this.data.autostart);
    this.data.forceStart = typeof this.data.forceStart === 'undefined' ? false : utils.parseBoolean(this.data.forceStart);
    if (this.element) {
      this.applyAttributes();
    }
  }

  /**
  * Check dependencies and perform action on the array
  * @param {string} dependency - the dependency
  * @param {string} pushOrSplice - push or splice
  */

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
  * Require dependencies and add it to a dependencie bundle
  * @param {object} dependencies - the dependencies to fetch
  * @return {object} MultimediaObject
  */

  applyDependencies(dependencies = this.dependencies) {
    if (dependencies instanceof Array) {
      dependencies.forEach((dep) => {
        this.checkDep(dep);
      });
    } else {
      this.checkDep(dependencies);
    }
    return this;
  }

  /**
  * Remove dependencies from the dependencies array if it exists
  * @param {array | string} dependencies - the array of dependencies to delete
  */

  removeDependencies(dependencies = this.dependencies) {
    if (dependencies instanceof Array) {
      dependencies.forEach((dep) => {
        this.checkDep(dep, 'splice');
      });
    } else {
      this.checkDep(dependencies, 'splice');
    }
    return this;
  }

  /**
  * Require the dependencies and make them available in a certain context
  * @param {function} callback - the callback with the contexts
  */

  requireDependencies(callback) {
    if (this.dependencies.length > 0) {
      requireScript(this.dependencies, 'dependencies');
      requireScript.ready('dependencies', callback);
    } else {
      callback();
    }
  }

  /**
  * Add a global style object to the page
  * @param {object} style - the CSS style properties to apply
  * @param {function} callback - the callback to execute
  * @return {object} MultimediaObject
  */

  addGlobalStyle(style = this.data.globalStyle, callback) {
    if (!style) {
      return this;
    }
    if (typeof style !== 'string') {
      throw new Error('addGlobalStyle: style is not a string');
    }
    const existingStyle = document.getElementById(`${this.uuid}-style`);
    
    if (existingStyle !== null) {
      document.head.removeChild(existingStyle);
    }

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
  * Apply the object in parameter as style properties
  * @param {object} properties - the CSS style properties to apply
  * @return {object} MultimediaObject
  */

  applyStyle(properties = this.style, override = false) {
    utils.checkIfObject(properties, () => Object.keys(properties), 'style must be an object');
    let k;
    const transforms = [];
    let v;
    const _style = Object.keys(this._style).length;

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
        if (typeof v === 'string' && v.indexOf('{{absoluteAssetURL}}') >= 0 && window[conf.namespace]) {
          v = v.replace('{{absoluteAssetURL}}', window.MultimediaObjectEditor ? this.data.absoluteAssetURL : window[conf.namespace].absoluteAssetURL);
        }
        this.element.style[k] = v;
      } else {
        const val = `${v}${utils.unitForProperty(k, v)}`;
        // console.log(v);
        if (Object.keys(this.events).indexOf(k) < 0) {
          this.style[utils.propertyWithPrefix(k)] = val;
          if (_style < 1 || override) {
            this._style[utils.propertyWithPrefix(k)] = val;
          }
          if (typeof v === 'string' && (v.indexOf('{{absoluteAssetURL}}') >= 0 && window[conf.namespace])) {
            v = v.replace('{{absoluteAssetURL}}', window.MultimediaObjectEditor ? this.data.absoluteAssetURL : window[conf.namespace].absoluteAssetURL);
          }
          this.element.style[utils.propertyWithPrefix(k)] = v;
        }
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
      x: this._style.rotateX ? utils.getNumFromString(this._style.rotateX) : 0,
      y: this._style.rotateY ? utils.getNumFromString(this._style.rotateY) : 0,
      z: this._style.rotateZ ? (utils.getNumFromString(this._style.rotateZ) || utils.getNumFromString(this._style.rotate)) : 0,
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

        if (a.indexOf('rotateX') >= 0 || a.indexOf('rotate-x') >= 0) {
          rot.x = utils.getNumFromString(a);
        } else if (a.indexOf('rotateY') >= 0 || a.indexOf('rotate-y') >= 0) {
          rot.y = utils.getNumFromString(a);
        } else if (a.indexOf('rotateZ') >= 0 || a.indexOf('rotate-z') >= 0) {
          rot.z = utils.getNumFromString(a);
        } else if (a.indexOf('rotate') >= 0) {
          rot.z = utils.getNumFromString(a);
        }

        if (a.indexOf('scaleX') >= 0 || a.indexOf('scale-x') >= 0) {
          sca.x = utils.getNumFromString(a);
        } else if (a.indexOf('scaleY') >= 0 || a.indexOf('scale-y') >= 0) {
          sca.y = utils.getNumFromString(a);
        }
        if (a.indexOf('skewX') >= 0 || a.indexOf('skew-x') >= 0) {
          ske.x = utils.getNumFromString(a);
        } else if (a.indexOf('skewY') >= 0 || a.indexOf('skew-y') >= 0) {
          ske.y = utils.getNumFromString(a);
        }
      });
      // console.log(z);
      z[0] = `translate3d(${trans.x}${trans.xU},${trans.y}${trans.yU},${trans.z}${trans.zU})`;
      z[1] = `rotateX(${rot.x}${rot.u}) rotateY(${rot.y}${rot.u}) rotateZ(${rot.z}${rot.u})`;
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
  * Apply the functions as method of the MultimediaObject
  * @param {object} functions - key = name of functions, value = function body.
  * @return {object} MultimediaObject
  */

  applyFunctions(functions = this.functions) {
    utils.checkIfObject(functions, () => Object.keys(functions), 'functions must be an object');
    for (const func in functions) {
      if (!Object.prototype.hasOwnProperty.call(Object.getPrototypeOf(this), func)) {
        this[func] = functions[func];
        this.functions[func] = functions[func];
      }
    }
    return this;
  }

  /**
  * Apply the attributes to the DOMElement and attributes propertie of the MultimediaObject
  * @param {object} attributes - key = name of attribute, value = value.
  * @return {object} MultimediaObject
  */

  applyAttributes(attributes = this.attributes) {
    utils.checkIfObject(attributes, () => Object.keys(attributes), 'attributes must be an object');
    for (const attr in attributes) {
      let replaced = attributes[attr];
      if (typeof attributes[attr] === 'string' && attributes[attr].indexOf('{{absoluteAssetURL}}') >= 0 && window[conf.namespace]) {
        replaced = attributes[attr].replace('{{absoluteAssetURL}}', window.MultimediaObjectEditor ? this.data.absoluteAssetURL : window[conf.namespace].absoluteAssetURL);
      }
      this.attributes[attr] = attributes[attr];
      if (this.element.getAttribute(attr) !== replaced) this.element.setAttribute(attr, replaced);
    }
    return this;
  }

  /**
  * Apply the breakpoints
  * @param {array} breakpoints - breakpoint object {{querie,style}}
  * @return {object} MultimediaObject
  */

  applyBreakpoints(breakpoints = this.breakpoints) {
    if (breakpoints instanceof Array) {
      breakpoints.forEach((breakpoint) => {
        if (this.breakpoints.indexOf(breakpoint) === -1) {
          this.breakpoints.push(breakpoint);
        }
      });
      this.checkBreakpoints();
    } else {
      throw new Error('breakpoints must be an array');
    }
    return this;
  }

  /**
  * Apply the events to the DOMElement and events propertie of the MultimediaObject
  * @param {object} attributes - key = name of event, value = function.
  * @return {object} MultimediaObject
  */

  applyEvents(events = this.events) {
    const applySwipeEvent = (evt) => {
      const detecttouch = !!('ontouchstart' in window) || !!('ontouchstart' in document.documentElement) || !!window.ontouchstart || !!window.onmsgesturechange || (window.DocumentTouch && window.document instanceof window.DocumentTouch);
      const ob = this;
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
    for (const evt in events) {
      this.events[evt] = events[evt];
      this._events[evt] = events[evt].bind(this);
      if (!window.MultimediaObjectEditor) {
        if (evt === 'swipe') {
          applySwipeEvent(evt);
        } else if (utils.checkEvent(evt)) {
          this.element.addEventListener(evt, this._events[evt]);
        } else {
          this.addListener(evt, this._events[evt]);
        }
      } else if (!utils.checkEvent(evt)) this.addListener(evt, this._events[evt]);
    }
    return this;
  }

  /**
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

  /**
  * Deactivate events without deleting them
  * @param {string} eventName - the event to deactivate
  */

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
  * Remove a function by name
  * @param {string} eventName - name of the function
  * @return {object} MultimediaObject
  */

  removeFunction(functionName) {
    if (this.functions[functionName]) {
      delete this[functionName];
      delete this.functions[functionName];
    } else {
      console.log('Function does not exist');
    }
    return this;
  }

  /**
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
            const keys = Object.keys(this._style);
            let hasTransform = false;
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
        } else if (propertieName) {
          console.log(`${propertieName} style does not exist`);
        }
    }

    return this;
  }


  /**
  * tranform event to get access to it with removeEventListener
  * @param {function} callback - the event you want to transform
  * @return {function} function
  */

  transformEvent(callback) {
    const parent = this;
    return function (event) { callback.apply(parent, [event]); };
  }

  /**
  * check each breakpoints on container or window, and applyStyle
  * if needed
  */

  checkBreakpoints() {
    const winW = window.MultimediaObjectEditor ? `parseInt(getComputedStyle(document.getElementById('${conf.container}')).width)` : 'window.innerWidth';
    const winH = window.MultimediaObjectEditor ? `parseInt(getComputedStyle(document.getElementById('${conf.container}')).height)` : 'window.innerHeight';
    let evaluatedRule;
    if (this.breakpoints.length > 0) {
      const style = {};
      for (const w in this._style) {
        style[w] = this._style[w];
      }
      this.breakpoints.forEach((breakpoint) => {
        const conditions = [];
        for (const breaks in breakpoint.querie) {
          if (breaks === 'orientation') {
            conditions.push(`${breakpoint.querie[breaks] === 'landscape' ? `${winW} > ${winH}` : `${winH} > ${winW}`}`);
          } else {
            conditions.push(`${/height/.test(breaks) ? winH : winW} ${/min/.test(breaks) ? '>=' : '<='} ${parseInt(breakpoint.querie[breaks], 10)}`);
          }
        }
        evaluatedRule = '';

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
      return evaluatedRule() || false;
    }
    return false;
  }

  /**
  * Generates the DOMElement based on type parameter
  * @param {string} type - type of DOMElement
  * @return {object} MultimediaObject
  */

  generate(type) {
    this.element = document.createElement(utils.Atoms(type));
    this.type = utils.Atoms(type);
    window.addEventListener('resize', () => {
      this.checkBreakpoints();
    });
    eventManager.addListener('resize-scene', () => {
      this.checkBreakpoints();
    });
    return this;
  }

  /**
  * remove MultimediaObject.element from container parameter
  */

  removeElement() {
    if (this.DOMParent instanceof MultimediaObject) {
      this.DOMParent.element.removeChild(this.element);
    } else {
      this.DOMParent.removeChild(this.element);
    }
  }

  /**
  * append MultimediaObject.element to container parameter
  * @param {DOMElement | MultimediaObject} container - the container to append to
  * @return {object} MultimediaObject
  */

  appendElementTo(container, appendChild = true) {
    if (container) {
      if (container instanceof MultimediaObject) {
        container.element.appendChild(this.element);
        this.DOMParentUUID = container.uuid;
      } else {
        container.appendChild(this.element);
        this.DOMParentUUID = null;
      }
      this.DOMParent = container;
      const childsLength = this.childs.length;

      if (childsLength > 0 && appendChild) {
        this.childs.forEach((child, index) => {
          child.DOMParent = this;
          child.appendElementTo(this);
        });
      }
    } else {
      document.body.appendChild(this.element);
      this.DOMParent = document.body;
      this.DOMParentUUID = null;
      const childsLength = this.childs.length;

      if (childsLength > 0) {
        this.childs.forEach((child, index) => {
          child.DOMParent = this;
          child.DOMParentUUID = this.uuid;
          child.appendElementTo(this);
        });
      }
    }
    window.setTimeout(() => {
      if (this.initializer) {
        try {
          this.initializer();
        } catch(e) {
          console.error(e);
        }
      }
    }, 0);
    return this;
  }

  /**
  * add children to MultimediaObject
  * @param {DOMElement} child - the child to add
  * @return {object} MultimediaObject
  */

  add(child, appendChild = true) {
    this.childs.push(child);
    if (child instanceof MultimediaObject) {
      if (appendChild) this.element.appendChild(child.element);
    } else {
      if (appendChild) this.element.appendChild(child);
    }
    child.DOMParent = this;
    child.DOMParentUUID = this.uuid;
    return this;
  }

  /**
  * removes a child from a MultimediaObject
  * @param {DOMElement} child - the child to remove
  * @return {object} MultimediaObject
  */

  remove(child) {
    const elementIndex = findIndex(this.childs, { uuid: child.uuid });
    if (elementIndex >= 0) {
      this.childs.splice(elementIndex, 1);
      try {
        if (child instanceof MultimediaObject) {
          this.element.removeChild(child.element);
        } else {
          this.element.removeChild(child);
        }
      } catch(e) {}
    }
    return this;
  }

  /**
  * get the computed style of a CSS propertie
  * @param {string} propertie - the css propertie
  * @return {string} css - pixel value
  */

  getComputedStyle(propertie) {
    return getComputedStyle(this.element, null).getPropertyValue(propertie);
  }

  /**
  * pre interpolate animations steps for interpolation
  * @param {int} fps - the framerate to use as base for the frame computation
  * @return {object} MultimediaObject
  */

  preInterpolateStep(fps = this.fps) {
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
    const eventsKeys = Object.keys(this.events);

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
            this.animatedProps[prop].steps[second].easing = this.currentAnimation[second].easing || 'linearEase';
            this.animatedProps[prop].steps[second].currentIteration = 0;
          } else if (!/\d/g.test(this.currentAnimation[second][prop])) {
            this.animatedProps[prop].steps[second].startValue = lastStep ? lastStep.endValue : (this._style[prop] ? this._style[prop] : 'auto');
            this.animatedProps[prop].steps[second].unit = '';
            this.animatedProps[prop].steps[second].endValue = this.currentAnimation[second][prop];
            this.animatedProps[prop].steps[second].changeInValue = this.animatedProps[prop].steps[second].endValue;
            this.animatedProps[prop].steps[second].initIteration = lastStepProp ? Math.floor(lastStepProp * fps) : 0;
            this.animatedProps[prop].steps[second].totalStepIteration = Math.floor(second * fps) - this.animatedProps[prop].steps[second].initIteration;
            this.animatedProps[prop].steps[second].easing = this.currentAnimation[second].easing || 'linearEase';
            this.animatedProps[prop].steps[second].currentIteration = 0;
          } else {
            this.animatedProps[prop].steps[second].startValue = parseFloat(lastStep ? lastStep.endValue : (this._style[prop] ? (parseFloat(this._style[prop])) : 0));
            this.animatedProps[prop].steps[second].unit = typeof this.currentAnimation[second][prop] === 'string' && /px|%|vw|vh|deg/g.test(this.currentAnimation[second][prop]) ? utils.getUnitFromString(this.currentAnimation[second][prop] || '') : '';
            this.animatedProps[prop].steps[second].endValue = parseFloat(this.currentAnimation[second][prop]);
            this.animatedProps[prop].steps[second].changeInValue = parseFloat(this.animatedProps[prop].steps[second].endValue - this.animatedProps[prop].steps[second].startValue);
            this.animatedProps[prop].steps[second].initIteration = lastStepProp ? Math.floor(lastStepProp * fps) : 0;
            this.animatedProps[prop].steps[second].totalStepIteration = Math.floor(second * fps) - this.animatedProps[prop].steps[second].initIteration;
            this.animatedProps[prop].steps[second].easing = this.currentAnimation[second].easing || 'linearEase';
            this.animatedProps[prop].steps[second].currentIteration = 0;
          }
          // console.log(this.currentAnimation[second][prop],this.animatedProps[prop].steps[second].endValue);
        }
      }
    }

    // console.log(this.animatedProps);

    this.computedAnimations = [];

    for (const prop in this.animatedProps) {
      if (!isAnimatedEvent(prop)) {
        for (let iteration = 0; iteration <= totalAnimationIteration; iteration++) {
          const propNumericSteps = Object.keys(this.animatedProps[prop].steps);
          const iterationSeconds = (iteration / totalAnimationIteration) * totalAnimationTime;
          const secondsElapsed = isFinite(iterationSeconds) ? Number(iterationSeconds).toFixed(2) : 0;
          const stepSecond = utils.closestSuperior(secondsElapsed, propNumericSteps);
          // console.log(stepSecond, secondsElapsed, propNumericSteps);

          if (!this.computedAnimations[iteration]) {
            this.computedAnimations[iteration] = {};
          }
          if (/color/ig.test(prop)) {
            const easing = this.animatedProps[prop].steps[stepSecond] ? this.animatedProps[prop].steps[stepSecond].easing : 'linearEase';
            const actualIteration = this.animatedProps[prop].steps[stepSecond].currentIteration;
            const startValue = this.animatedProps[prop].steps[stepSecond].startValue;
            const endValue = this.animatedProps[prop].steps[stepSecond].endValue;
            const changeInValue = this.animatedProps[prop].steps[stepSecond].changeInValue;
            const totalIterationValue = this.animatedProps[prop].steps[stepSecond].totalStepIteration;
            const r = actualIteration < totalIterationValue ? parseInt(Easings[easing](actualIteration, startValue.r, changeInValue.r, totalIterationValue)) : endValue.r;
            const g = actualIteration < totalIterationValue ? parseInt(Easings[easing](actualIteration, startValue.g, changeInValue.g, totalIterationValue)) : endValue.g;
            const b = actualIteration < totalIterationValue ? parseInt(Easings[easing](actualIteration, startValue.b, changeInValue.b, totalIterationValue)) : endValue.b;
            const a = actualIteration < totalIterationValue ? Number(Easings[easing](actualIteration, startValue.a, changeInValue.a, totalIterationValue).toFixed(2)) : endValue.a;

            this.computedAnimations[iteration][prop] = `rgba(${r},${g},${b},${a})`;
            // console.log(this.computedAnimations[iteration][prop]);
          } else if (!/\d/g.test(this.animatedProps[prop].steps[stepSecond].startValue)) {
            const easing = this.animatedProps[prop].steps[stepSecond] ? this.animatedProps[prop].steps[stepSecond].easing : 'linearEase';
            const actualIteration = this.animatedProps[prop].steps[stepSecond].currentIteration;
            const startValue = this.animatedProps[prop].steps[stepSecond].startValue;
            const endValue = this.animatedProps[prop].steps[stepSecond].endValue;
            const changeInValue = this.animatedProps[prop].steps[stepSecond].changeInValue;
            const totalIterationValue = this.animatedProps[prop].steps[stepSecond].totalStepIteration;
            const value = actualIteration < totalIterationValue - 1 ? startValue : endValue;
                // console.log(prop,this.animatedProps[prop].steps[stepSecond].initIteration,iteration,actualIteration,totalIterationValue,totalAnimationIteration);

            this.computedAnimations[iteration][prop] = value + this.animatedProps[prop].steps[stepSecond].unit;
          } else {
            const easing = this.animatedProps[prop].steps[stepSecond].easing || 'linearEase';
            const actualIteration = this.animatedProps[prop].steps[stepSecond].currentIteration;
            const startValue = this.animatedProps[prop].steps[stepSecond].startValue;
            const endValue = this.animatedProps[prop].steps[stepSecond].endValue;
            const changeInValue = this.animatedProps[prop].steps[stepSecond].changeInValue;
            const totalIterationValue = this.animatedProps[prop].steps[stepSecond].totalStepIteration;
            const value = actualIteration < totalIterationValue - 1 ? Easings[easing](actualIteration, startValue, changeInValue, totalIterationValue) : endValue;
            // console.log(prop,actualIteration, totalIterationValue, value, endValue, stepSecond);

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
  * frame interpolation, takes the value present at a certain frame in the interpolatedSteps array and apply it as style
  * needs an animation loop
  * @param {int} currentIteration - the current frame
  * @param {float} seconds - the current frame
  * @param {int} fps - the framerate to preinterpolate if needed
  * @return {object} MultimediaObject
  */

  interpolateStep(currentIteration, seconds, fps) {
    const animationsLength = this.computedAnimations.length;
    // console.log(animationsLength);
    if (animationsLength <= 0) {
      this.preInterpolateStep(fps);
    }
    // console.log(this.computedAnimations[currentIteration]);
    if (currentIteration <= 1 && !this.animationStarted) {
      eventManager.dispatchEvent(`${this.uuid}-animationStart`);
      this.currentIteration = currentIteration;
      this.applyIteration();
    }
    if (!window.MultimediaObjectEditor) {
      this.childs.forEach((child) => {
        if (!child.animationStarted) {
          child.interpolateStep(currentIteration, seconds, fps);
        }
      });
    }
    if (animationsLength > currentIteration) {
      this.animated = true;
      this.currentIteration = currentIteration;
      this.applyIteration();
      this.checkBreakpoints();
    } else if (currentIteration > animationsLength && animationsLength > 0) {
      this.applyIteration(this.computedAnimations[animationsLength - 1], true);
    }
    if (animationsLength === currentIteration) {
      this.stopAnimation();
      this.currentIteration = animationsLength - 1;
      eventManager.dispatchEvent(`${this.uuid}-animationEnd`);
    }
  // console.log(animationsLength, currentIteration, this.animationStarted);

    return this;
  }

  /**
  * Apply the current iteration
  * @param {object} iteration - the iteration pbject
  */

  applyIteration(iteration = this.computedAnimations[this.currentIteration], end = false) {
    if (iteration) {
      const style = Object.create(iteration);
      for (const key in iteration) {
        if (!utils.isAnimatableProp(key)) {
          if (!end) this.dispatchEvent(key, { value: iteration[key] });
          delete style[key];
        }
      }
      this.applyStyle(style);
    }
  }

  /**
  * Restart the animation
  */

  restartAnimation() {
    this.stopAnimation();
    this.counter = 0;
    this.runAnimation();
  }

  /**
  * start the animation
  */

  startAnimation() {
    this.counter = 0;
    this.runAnimation();
  }

  /**
  * Stop the animation
  */

  stopAnimation() {
    this.animationStarted = false;
    this.animated = false;
    window.cancelAnimationFrame(this.rafID);
  }

  /**
  * The animatiom cycle function
  * @param {number} time - the time om witch iterate
  */

  runAnimation(time) {
    this.rafID = window.requestAnimationFrame(t => this.runAnimation(t));
    if (Object.keys(this.currentAnimation).length > 0 || this.totalTime > 0 && this.childs.length > 0) {
      this.now = performance.now() || Date.now();
      this.delta = this.now - this.then;
      if (!this.animationStarted) {
        this.animationStarted = true;
        const sortedSteps = this.getSortedSteps();
        this.totalTime = sortedSteps.length > 0 ? Number(sortedSteps[sortedSteps.length - 1]) : 0;
        this.totalIteration = Math.floor(this.totalTime * this.fps);
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

        // console.log(this.counter, this.totalIteration);

        this.interpolateStep(this.counter, this.secondsElapsed, this.fps);
        if (this.animationStarted) {
          if (this.counter >= this.totalIteration && !this.reverse) {
            if (this.repeat > 0 && this.repeatCounter < this.repeat) {
              this.repeatCounter++;
              this.restartAnimation();
            } else {
              this.stopAnimation();
            }
          } else if (this.counter === 1 && this.reverse) {
            if (this.repeat > 0 && this.repeatCounter < this.repeat) {
              this.repeatCounter++;
              this.restartAnimation();
            } else {
              this.stopAnimation();
            }
          }
        }
        // console.log(this.secondsElapsed);
      }
    } else {
      this.stopAnimation();
    }
  }

  /**
  * Add an event listener or a custom event
  * @param {string} listener - the name of the event
  * @param {function} fn - the function to execute on event dispatch
  */

  addListener(listener, fn) {
    return eventManager.addListener(`${listener}`, fn);
  }

  /**
  * Remove an event
  * @param {string} listener - the name of the event
  * @param {function} fn - the function to remove
  */

  removeListener(listener, fn) {
    if (fn instanceof Function) {
      return eventManager.removeListener(`${listener}`, fn);
    }
    return eventManager.removeListener(`${listener}`, this[fn]);
  }

  /**
  * Dispatch a custom event
  * @param {string} eventName - the name of the event
  * @param {object} params - the parameter to transmit
  */

  dispatchEvent(eventName, params) {
    return eventManager.dispatchEvent(eventName, params, this);
  }

  /**
  * Change the currentAnimation
  * @param {string} animationName - the animation name on which to switch
  */

  changeAnimation(animationName = 'default') {
    this.selectedAnimation = animationName;
    this.computedSteps = [];
    this.currentAnimation = this.animations[this.selectedAnimation] || {};
    this.animations[this.selectedAnimation] = this.animations[this.selectedAnimation] || this.currentAnimation;

    this.applyStyle(this._style);
    this.stopAnimation();
    this.preInterpolateStep();
  }

  cleanCurrentAnimation() {
    Object.keys(this.currentAnimation).forEach((time) => {
      if (Object.keys(this.currentAnimation[time]).length === 1) delete this.currentAnimation[time];
    });
    this.animations[this.selectedAnimation] = this.currentAnimation;
  }

  /**
  * Add a animation propertie
  * @param {array} propertieArray - the propertie array propertie = { key, value }
  * @param {number} absoluteTime - the time key in which to add the propertie
  */

  addAnimationProperties(propertieArray, propValue, absoluteTime = 0.00) {
    this.cleanCurrentAnimation();
    const existingProp = Object.keys(this.animatedProps);
    this.currentAnimation = this.currentAnimation || {};
    let time = absoluteTime;

    propertieArray.forEach((refProp) => {
      const prop = refProp.key || refProp;
      const value = propValue || refProp.value || this._style[prop] || 0;

      if (existingProp.indexOf(prop) === -1) {
        if (!this.currentAnimation[time]) {
          this.currentAnimation[time] = {};
        }
        this.currentAnimation[time][prop] = value;
      }
    });
    this.animations[this.selectedAnimation] = this.currentAnimation;
    this.preInterpolateStep();
    return this;
  }

  /**
  * Delete an animation propertie
  * @param {array} propertieArray - the propertie array propertie = { key, value }
  */

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
    this.cleanCurrentAnimation();
    this.preInterpolateStep();
    // this.dispatchEvent('actualize-timeline-elements', {}, true);
    return this;
  }

  /**
  * Delete an animation keyframe
  * @param {number} time - the time from which delete the propertie
  * @param {string} prop - the propertie name
  */

  deleteAnimationKeyframe(time, prop) {
    if (this.currentAnimation[time]) {
      if (prop) {
        delete this.currentAnimation[time][prop];
      } else {
        delete this.currentAnimation[time];
      }
      this.cleanCurrentAnimation();
      this.preInterpolateStep();
      // this.dispatchEvent('actualize-timeline-elements', {}, true);
    } else {
      console.log(`animation at ${time} don't exist`);
    }
    return this;
  }

  /**
  * An an animation keyframe
  * @param {number} time - the time from which delete the propertie
  * @param {string} prop - the propertie name
  * @param {string | number} value - the propertie value
  * @param {string} easing - the easing name
  */

  addAnimationKeyframe(time, prop, value, easing) {
    this.currentAnimation = this.currentAnimation || {};
    if (!this.currentAnimation[time]) {
      this.currentAnimation[time] = {};
    }
    this.currentAnimation[time][prop] = value;
    if (easing) this.currentAnimation[time].easing = easing;
    this.cleanCurrentAnimation();
    this.preInterpolateStep();
    // console.log(time, prop, value);
    return this;
  }

  /**
  * Sorts the animations steps
  * @return {array} the numeric array of the steps sorted >=
  */

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
    this.totalTime = this.numericSteps[this.numericSteps.length - 1];
    return this.numericSteps;
  }

  /**
  * Return total animation time
  * @return {number} the total animation time
  */

  getTotalAnimationTime() {
    this.getSortedSteps();
    this.totalAnimationTime = utils.getMaxOfArray(this.numericSteps);
    return this.totalAnimationTime;
  }

  /**
  * Export the object as a reusable JSON
  * @return {object} the JSON representation of the object
  */

  exportToJSON() {
    const ob = {};
    ob.exportedEvents = {};
    ob.exportedFunctions = {};
    ob.childs = [];

    for (const p in this) {
      if (typeof this[p] !== 'undefined' && this[p] !== null) {
        if (typeof this[p] !== 'function' && p !== 'events' && p !== 'functions' && !this[p].element && !this[p].children && !this[p].elements && !/exportedFunctions|exportedEvents|childs|interval|then|now|delta|animated|animationStarted|currentIteration|computedAnimations|secondsElapsed|rafID|numericSteps|counter|totalIteration|animationStarted|direction|coords|bounds|geo|infowindow|map|marker|shop|/.test(p)) {
          ob[p] = this[p];
        }
      }
    }

    for (const evt in this.events) {
      let txt = this.events[evt].toString(),
        args = txt.slice(txt.indexOf('(') + 1, txt.indexOf(')')).split(','),
        body = txt.slice(txt.indexOf('{') + 1, txt.lastIndexOf('}'));
      ob.exportedEvents[evt] = { args: args.map(el => el.replace(/\n+|(\/\*\*\/\n)+/g, '').replace(/^(\n+|\t+|\t\n+)(?!\w)$/gm, '').replace(/`/gm, '')), body };
    }

    for (const func in this.functions) {
      let txt = this.functions[func].toString(),
        args = txt.slice(txt.indexOf('(') + 1, txt.indexOf(')')).split(','),
        body = txt.slice(txt.indexOf('{') + 1, txt.lastIndexOf('}'));
      ob.exportedFunctions[func] = { args: args.map(el => el.replace(/\n+|(\/\*\*\/\n)+/g, '').replace(/^(\n+|\t+|\t\n+)(?!\w)$/gm, '').replace(/`/gm, '')), body };
    }

    this.childs.forEach((child) => {
      const c = child.exportToJSON();
      ob.childs.push(c);
    });

    ob.style = this._style;
    ob.attributes = this.attributes;
    delete ob.attributes.id;
    ob.breakpoints = this.breakpoints;
    ob.dependencies = this.dependencies;
    ob.globalStyle = this.globalStyle;
    ob.data = this.data || {};
    ob.selectedAnimation = this.selectedAnimation;
    ob.animations = this.animations;
    ob.load = true;
    ob.type = this.type;
    ob.uuid = this.uuid;
    ob.name = this.name;
    ob.repeat = this.repeat;
    ob.DOMParentUUID = this.DOMParentUUID;
    ob.data.absoluteAssetURL = this.data.absoluteAssetURL || './';
    return ob;
  }

  /**
  * Set the absoluteAssetURL of the object
  * @param {object} json - the json representation of a MultimediaObject
  */

  setAbsoluteAssetURL() {
    if (window.MultimediaObjectEditor) {
      if (!this.data.template && window[conf.namespace]) {
        if (typeof window[conf.namespace].absoluteAssetURL !== 'undefined' && window[conf.namespace].absoluteAssetURL !== 'undefined' && window[conf.namespace].absoluteAssetURL !== '') {
          this.data.absoluteAssetURL = window[conf.namespace].absoluteAssetURL;
        }
      } else {
        this.data.absoluteAssetURL = this.data.templateURL;
      }
    } else if (!window.MultimediaObjectEditor && window[conf.namespace]) {
      if (typeof window[conf.namespace].absoluteAssetURL !== 'undefined' && window[conf.namespace].absoluteAssetURL !== 'undefined' && window[conf.namespace].absoluteAssetURL !== '') {
        this.data.absoluteAssetURL = window[conf.namespace].absoluteAssetURL;
      } else {
        this.data.absoluteAssetURL = this.data.absoluteAssetURL || './';
      }
    }
  }

  /**
  * load a JSON representation of a MultimediaObject
  * @param {object} json - a json representation of a MultimediaObject
  */

  loadFromJSON(json) {
    for (const key in json) {
      if (key === 'animations' && !json.animations.default) {
        this.currentAnimation = json.animations;
        this.animations.default = json.animations;
      } else if (key !== 'childs') {
        this[key] = json[key];
      }
    }

    for (const evt in json.exportedEvents) {
      this.events[evt] = unserializeFunction(json.exportedEvents[evt]);
    }

    for (const func in json.exportedFunctions) {
      this.functions[func] = unserializeFunction(json.exportedFunctions[func]);
    }
    if (json.childs) {
      json.childs.forEach((child, index) => {
        child.load = true;
        child.data = child.data || {};
        // child.data.absoluteAssetURL = json.data.absoluteAssetURL || "";
        child.data.autostart = utils.parseBoolean(child.data.autostart);
        child.data.forceStart = utils.parseBoolean(child.data.forceStart);
        child.DOMParent = this;
        child.DOMParentUUID = this.uuid;
        this.childs.push(new MultimediaObject(child));
      });
    }

    this.uuid = json.uuid || utils.generateUUID();
    this.DOMParentUUID = json.DOMParentUUID || null;
    this.selectedAnimation = json.selectedAnimation;
    this.data = json.data || {};
    this.type = json.type;
    this.repeat = parseInt(json.repeat, 10);
    this.dependencies = json.dependencies || [];
    this.data.autostart = json.data ? utils.parseBoolean(json.data.autostart) : true;
    this.data.forceStart = json.data ? utils.parseBoolean(json.data.forceStart) : false;
    this.setAbsoluteAssetURL();
  }
}
