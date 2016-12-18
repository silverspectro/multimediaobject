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


require("./lib/raf");
var utils = require("./utils/utils"),
    Easings = require("./utils/easings"),
    eventManager = require("./lib/customEventManager"),
    requireScript = require("./lib/requireScript");

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


class MultimediaObject {
  constructor(type = "block", name = "multimediaObject", fps=60) {
    if(typeof type === "object") {
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
      this.then = performance.now () || Date.now();
      this.interval = 1000/this.fps;
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
      this.then = performance.now () || Date.now();
      this.interval = 1000/this.fps;
      this.totalIteration = 0;
      this.counter = 0;

      this.reverse = false;
      this.repeat = 0;
      this.animationStarted = false;

      this.init();
      this.addDefaultParameters();
    }
  };

  /**
  * @function
  * Inititalize the MultimediaObject
  * generates the DOMElement, applyAttributes, sorts animations steps
  */

  init() {
    this.generate(utils.Atoms(this.type));
    this.element.innerHTML = this.innerHTML;
    this.getSortedSteps();
    if(!window.MultimediaObjectEditor) {
      if(window._s4mConfig) {
        this.appendElementTo(document.getElementById(window._s4mConfig.containerId));
      } else {
        this.appendElementTo();
      }
    }
    if(!this.attributes.id) {
      this.applyAttributes({
        id : this.name
      });
    }
  };

  addDefaultParameters() {
    if(conf.defaultAttributes[this.type]) {
      for(let key in conf.defaultAttributes[this.type]) {
        if(!this.attributes[key]) {
          this.attributes[key] = conf.defaultAttributes[this.type][key];
        }
      }
    }
    this.applyAttributes();
  };

  /**
  * @function
  * Require dependencies and add it to a dependencie bundle
  * @param {object} dependencies - the dependencies to fetch
  * @return {object} MultimediaObject
  */

  applyDependencies(dependency){
    if(dependency) {
      let depIndex = this.dependencies.indexOf(dependency);
      if(depIndex < 0) {
        this.dependencies.push(dependency);
      }
    }
    return this;
  };

  removeDependencies(dependency) {
    let depIndex = this.dependencies.indexOf(dependency);
    if(depIndex >= 0) {
      this.dependencies.splice(depIndex,1);
    }
    return this;
  };

  requireDependencies(callback){
    if(this.dependencies.length > 0) {
      requireScript(this.dependencies, "dependencies");
      requireScript.ready("dependencies", callback);
    } else {
      callback();
    }
  };

  /**
  * @function
  * Add a global style object to the page
  * @param {string} id - the id or class to which bind the style
  * @param {object} style - the CSS style properties to apply
  * @return {object} MultimediaObject
  */

  addGlobalStyle(style, callback) {
    let styleMarkup = document.createElement("style"),
        styleText = style;

    styleMarkup.innerHTML = styleText;
    styleMarkup.id = this.uuid + "-style";
    styleMarkup.type = "text/css";
    document.head.appendChild(styleMarkup);

    if(callback) {
      window.setTimeout(callback,100);
    }

    return this;
  };

  /**
  * @function
  * Apply the object in parameter as style properties
  * @param {object} properties - the CSS style properties to apply
  * @return {object} MultimediaObject
  */

  applyStyle(properties, override) {
    var k, transforms, v,
        _style = Object.keys(this._style).length,
        override = override || false;

    transforms = [];
    for (k in properties) {
      v = properties[k];
      if (utils.transformProperties.contains(k)) {
        transforms.push([k, v]);
        if( _style < 1 || override) {
          this._style[k] = v;
        }
        this.style[k] = v;
      } else {
        v = "" + v + (utils.unitForProperty(k, v));
        // console.log(v);
        this.style[utils.propertyWithPrefix(k)] = v;
        if(_style < 1 || override) {
          this._style[utils.propertyWithPrefix(k)] = v;
        }
        if(v.indexOf("{{absoluteAssetURL}}") >= 0 && window._s4mConfig) {
          v = v.replace("{{absoluteAssetURL}}", window.MultimediaObjectEditor ? this.data.absoluteAssetURL : window._s4mConfig.absoluteAssetURL);
        }
        this.element.style[utils.propertyWithPrefix(k)] = v;
      }
    }
    let z = [0,1,2],
        trans = {
          x : this._style.translateX ? utils.getNumFromString(this._style.translateX) : 0,
          y : this._style.translateY ? utils.getNumFromString(this._style.translateY) : 0,
          z : this._style.translateZ ? utils.getNumFromString(this._style.translateZ) : 0,
          xU : this._style.translateX ? utils.getUnitFromString(this._style.translateX) : "px",
          yU : this._style.translateY ? utils.getUnitFromString(this._style.translateY) : "px",
          zU : this._style.translateZ ? utils.getUnitFromString(this._style.translateZ) : "px"
        },
        rot = {
          value : this._style.rotate ? utils.getNumFromString(this._style.rotate) : 0,
          u : "deg"
        },
        sca = {
          x : this._style.scaleX ? utils.getNumFromString(this._style.scaleX) : 1,
          y : this._style.scaleY ? utils.getNumFromString(this._style.scaleY) : 1
        };

    if (transforms.length > 0) {
      v = (transforms.map(function(transform) {
        return utils.transformValueForProperty(transform[0], transform[1]);
      }));

      v = v.map(function(a, b){
        if(a.indexOf("translateX") >= 0) {
          trans.x = utils.getNumFromString(a);
          trans.xU = utils.getUnitFromString(a);
        } else if (a.indexOf("translateY") >= 0) {
          trans.y = utils.getNumFromString(a);
          trans.yU = utils.getUnitFromString(a);
        } else if (a.indexOf("translateZ") >= 0) {
          trans.z = utils.getNumFromString(a);
          trans.zU = utils.getUnitFromString(a);
        }
        if(a.indexOf("rotate") >= 0) {
          rot.value = utils.getNumFromString(a);
        }
        if(a.indexOf("scaleX") >= 0) {
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
      z[0] = `translate3d(${trans.x}${trans.xU},${trans.y}${trans.yU},${trans.z}${trans.zU})`;
      z[1] = `rotate(${rot.value}${rot.u})`;
      z[2] = `scale(${sca.x},${sca.y})`;
      // console.log(z);
      z = z.filter(function(el){return !/^[0-9]/.test(el)}).join(" ");

      // this.style[utils.propertyWithPrefix("transform")] = z;
      // if(_style < 1 || override) {
      //   this._style[utils.propertyWithPrefix("transform")] = z;
      // }
      this.element.style[utils.propertyWithPrefix("transform")] = z;

      eventManager.dispatchEvent("actualize-style", this._style);
    }

    return this;
  };

  /**
  * @function
  * Apply the functions as method of the MultimediaObject
  * @param {object} functions - key = name of functions, value = function body.
  * @return {object} MultimediaObject
  */

  applyFunctions(functions) {
    if(functions) {
      for(let func in functions) {
        this[func] = functions[func];
        this.functions[func] = functions[func];
      }
    } else {
      for(let func in this.functions) {
        this[func] = this.functions[func];
      }
    }
    return this;
  };

  /**
  * @function
  * Apply the attributes to the DOMElement and attributes propertie of the MultimediaObject
  * @param {object} attributes - key = name of attribute, value = value.
  * @return {object} MultimediaObject
  */

  applyAttributes(attributes) {
    if(attributes) {
      for(let attr in attributes) {
        let replaced = attributes[attr];
        if(typeof attributes[attr] === "string" && attributes[attr].indexOf("{{absoluteAssetURL}}") >= 0 && window._s4mConfig) {
          replaced = attributes[attr].replace("{{absoluteAssetURL}}", window.MultimediaObjectEditor ? this.data.absoluteAssetURL : window._s4mConfig.absoluteAssetURL);
        }
        this.attributes[attr] = attributes[attr];
        this.element.setAttribute(attr, (replaced || attributes[attr]));
      }
    } else {
      for(let attr in this.attributes) {
        let replaced = this.attributes[attr];
        if(typeof this.attributes[attr] === "string" && this.attributes[attr].indexOf("{{absoluteAssetURL}}") >= 0 && window._s4mConfig) {
          replaced = this.attributes[attr].replace("{{absoluteAssetURL}}", window.MultimediaObjectEditor ? this.data.absoluteAssetURL : window._s4mConfig.absoluteAssetURL);
        }
        this.element.setAttribute(attr, (replaced || this.attributes[attr]));
      }
    }
    return this;
  };

  /**
  * @function
  * Apply the breakpoints
  * @param {array} breakpoints - breakpoint object {{querie,style}}
  * @return {object} MultimediaObject
  */

  applyBreakpoints(breakpoints=[]) {
    if(this.breakpoints.length > 0 || breakpoints.length > 0) {
      breakpoints.forEach((breakpoint,index)=>{
        if(this.breakpoints.indexOf(breakpoint) === -1) {
          this.breakpoints.push(breakpoint);
        }
      });
      this.checkBreakpoints();
    }
    return this;
  };

  /**
  * @function
  * Apply the events to the DOMElement and events propertie of the MultimediaObject
  * @param {object} attributes - key = name of event, value = function.
  * @return {object} MultimediaObject
  */

  applyEvents(events) {
    if(events) {
      for(let evt in events) {
        if(!this.events[evt] && !this._events[evt]) {
          this.events[evt] = events[evt];
          this._events[evt] = this.transformEvent(events[evt]);
          if(utils.checkEvent(evt) && evt !== "swipe") {
            this.element.addEventListener(evt, this._events[evt]);
          } else if(evt === "swipe") {
            let detecttouch = !!('ontouchstart' in window) || !!('ontouchstart' in document.documentElement) || !!window.ontouchstart || !!window.onmsgesturechange || (window.DocumentTouch && window.document instanceof window.DocumentTouch),
            ob = this;
            var userData = {};
            ob.evtStarted = false;
            this.evtStart = function(e) {
              e.preventDefault();
              let event = e.changedTouches ? e.changedTouches[0] : e;
              ob.evtStarted = true;
              userData = {
                start: {
                  left: event.pageX,
                  top: event.pageY
                }
              };
            };
            this.evtEnd = function(e) {
              e.preventDefault();
              if (!ob.evtStarted) {
                return;
              }
              let event = e.changedTouches ? e.changedTouches[0] : e;
              userData.end = {
                left: event.pageX,
                top: event.pageY
              };
              userData.dx = userData.end.left - userData.start.left;
              userData.dy = userData.end.top - userData.start.top;
              userData.angle = Math.atan2(userData.dy, userData.dx);
              userData.angle *= 180 / Math.PI;
              userData.inMotion = (e.type == 'touchmove' || e.type == 'mousemove');
              userData.direction = Math.abs(userData.dx) > Math.abs(userData.dy) ? ('' + userData.dx).indexOf('-') != -1 ? 'left' : 'right' : ('' + userData.dy).indexOf('-') != -1 ? 'top' : 'bottom';
              ob.events[evt].apply(ob,[e,userData]);
              if (userData.inMotion == false) {
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
          } else {
            this.addListener(evt, this.events[evt]);
          }
        }
      }
    } else {
      if(Object.keys(this.events).length > 0) {
        for(let evt in this.events) {
          this._events[evt] = this.transformEvent(this.events[evt]);
          if(utils.checkEvent(evt)) {
            this.element.addEventListener(evt, this._events[evt]);
          } else {
            this.addListener(evt, this.events[evt]);
          }
        }
      }
    }
    return this;
  };

  /**
  * @function
  * Remove an event by eventName
  * @param {string} eventName - name of the event
  * @return {object} MultimediaObject
  */

  removeEvent(eventName) {
    if(utils.checkEvent(eventName)) {
      if(this.events[eventName]) {
        this.element.removeEventListener(eventName, this._events[eventName]);
        delete this.events[eventName];
        delete this._events[eventName];
      } else {
        console.log("Event does not exist");
      }
    } else if(eventName === "swipe") {
      this.element.removeEventListener('touchstart', this.evtStart);
      this.element.removeEventListener('touchmove', this.evtEnd);
      this.element.removeEventListener('touchend', this.evtEnd);
      this.element.removeEventListener('mousedown', this.evtStart);
      this.element.removeEventListener('mousemove', this.evtEnd);
      this.element.removeEventListener('mouseup', this.evtEnd);
      delete this.events[eventName];
      delete this._events[eventName];
    } else {
      if(this.events[eventName]) {
        this.removeListener(eventName, this._events[eventName]);
        delete this.events[eventName];
        delete this._events[eventName];
      } else {
        console.log("Event does not exist");
      }
    }
    return this;
  };

  deactivateEvent(eventName) {
    if(this.events[eventName]) {
      if(utils.checkEvent(eventName)) {
        this.element.removeEventListener(eventName, this._events[eventName]);
      } else {
        this.removeListener(eventName, this._events[eventName]);
      }

    } else {
      console.log("Event does not exist");
    }
  };

  /**
  * @function
  * Remove a function by name
  * @param {string} eventName - name of the function
  * @return {object} MultimediaObject
  */

  removeFunction(functionName) {
    if(this.functions[functionName]) {
      delete this.functions[functionName];
    } else {
      console.log("Function does not exist");
    }
    return this;
  };

  /**
  * @function
  * Remove a propertie
  * @param {string} type - type of propertie
  * @param {string} propertieName - name of the propertie
  * @return {object} MultimediaObject
  */

  removePropertie(type, propertieName) {
    switch(type) {
      case "attributes" :
        if(this.attributes[propertieName]) {
          this.element.setAttribute(propertieName, "");
          delete this.attributes[propertieName];
        } else {
          console.log(propertieName + " attribute does not exist");
        }
        break;
      case "data" :
        if(this.data[propertieName]) {
          delete this.data[propertieName];
        } else {
          console.log(propertieName + " data does not exist");
        }
        break;
      case "style" :
      default :
        if(this._style[propertieName]) {
          this.element.style[utils.propertyWithPrefix(propertieName)] = "";
          this.element.style[propertieName] = "";
          if(utils.transformProperties.contains(propertieName)){
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
  };


  /**
  * @function
  * tranform event to get access to it with removeEventListener
  * @param {function} callback - the event you want to transform
  * @return {function} function
  */

  transformEvent(callback) {
    let parent = this;
    return function(event){callback.apply(parent, [event])};
  };

  checkBreakpoints() {
    let winW = window.MultimediaObjectEditor ? "parseInt(getComputedStyle(document.getElementById('"+conf.container+"')).width)" : "window.innerWidth",
        winH = window.MultimediaObjectEditor ? "parseInt(getComputedStyle(document.getElementById('"+conf.container+"')).height)" : "window.innerHeight";
    if(this.breakpoints.length > 0) {
      let style = {};
      for(let w in this._style) {
        style[w] = this._style[w];
      };
      this.breakpoints.forEach((breakpoint, index)=>{
        let conditions = [];
        for(let breaks in breakpoint.querie) {
          if(breaks === "orientation") {
            conditions.push(`${breakpoint.querie[breaks] === "landscape" ? winW + " > " + winH : winH + " > " + winW}`);
          } else {
            conditions.push(`${/height/.test(breaks) ? winH : winW} ${/min/.test(breaks) ? ">=" : "<="} ${parseInt(breakpoint.querie[breaks])}`);
          }
        }
        let evaluatedRule = "";

        conditions.forEach((rule,index)=>{
          if(index >= 1) {
            evaluatedRule += " && " + rule;
          } else {
            evaluatedRule += rule;
          }
        });

        // console.log(evaluatedRule);

        evaluatedRule = new Function("return " + evaluatedRule);
        // console.log(evaluatedRule(), breakpoint);
        if(evaluatedRule()) {
          for(let s in breakpoint.style) {
            style[s] = breakpoint.style[s];
          }
        }
      });
      if(this.computedAnimations.length > 0) {
        for(let w in this.computedAnimations[this.currentIteration]) {
          style[w] = this.computedAnimations[this.currentIteration][w];
        };
      }
      this.applyStyle(style);
    }
  };

  /**
  * @function
  * Generates the DOMElement based on type parameter
  * @param {string} type - type of DOMElement
  * @return {object} MultimediaObject
  */

  generate(type) {
    this.element = document.createElement(type);
    this.type = type;
    window.addEventListener("resize", ()=>{
      this.checkBreakpoints();
    });
    eventManager.addListener("resize-scene", ()=>{
      this.checkBreakpoints();
    });
    return this;
  };

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
          i =  0;
      // console.log(childsLength);
      if(childsLength > 0) {
        this.childs.forEach((child,index)=>{
          child.DOMParent = this;
          child.appendElementTo(this);
        });
      }
    } else {
      document.body.appendChild(this.element);
      this.DOMParent = document.body;
      let childsLength = this.childs.length,
          i =  0;
      // console.log(childsLength);
      if(childsLength > 0) {
        this.childs.forEach((child,index)=>{
          child.DOMParent = this;
          child.appendElementTo(this);
        });
      }
    }
    if(this.initializer) {
      this.initializer();
    }
    // console.log(this.name,this.childs);
    return this;
  };

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
    eventManager.dispatchEvent("actualize-DOM-elements");
    return this;
  };

  /**
  * @function
  * removes a child from a MultimediaObject
  * @param {DOMElement} child - the child to remove
  * @return {object} MultimediaObject
  */

  remove(child) {
    let elementIndex = this.childs.indexOf(child);
    if(elementIndex >= 0) {
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
  };

  /**
  * @function
  * get the computed style of a CSS propertie
  * @param {string} propertie - the css propertie
  * @return {string} css - pixel value
  */

  getComputedStyle(propertie) {
    return getComputedStyle(this.element, null).getPropertyValue(propertie);
  };

  /**
  * @function
  * pre interpolate animations steps for interpolation
  * @param {int} fps - the framerate to use as base for the frame computation
  * @return {object} MultimediaObject
  */

  preInterpolateStep(fps) {
    this.getSortedSteps();
    let totalAnimationTime = utils.getMaxOfArray(this.numericSteps),
        totalAnimationIteration = Math.floor(totalAnimationTime*fps);

    this.animatedProps = {};
    let lastStep;

    for(let secIndex = 0; secIndex < this.numericSteps.length; secIndex++) {
      let second = this.numericSteps[secIndex].toFixed(2);
      let easing;
      // console.log("animations : ", this.animations);

      for(let prop in this.animations[second]) {
        if(prop !== "easing") {
          if(!this.animatedProps[prop]) {
            this.animatedProps[prop] = {};
            this.animatedProps[prop].label = prop;
            this.animatedProps[prop].steps = {};
          }

          if(!this.animatedProps[prop].steps[second]) {
            this.animatedProps[prop].steps[second] = {};
          }
          let stepPropKeys = Object.keys(this.animatedProps[prop].steps),
              lastStepProp = stepPropKeys.length > 1 ? stepPropKeys[stepPropKeys.length-2] : undefined;

          lastStep = lastStepProp ? this.animatedProps[prop].steps[lastStepProp] : undefined;

          if(/color/ig.test(prop)){
            let colorObj = utils.transformToColor(this.animations[second][prop]);
            this.animatedProps[prop].steps[second].startValue = lastStep ? lastStep.endValue : (this._style[prop] ? utils.transformToColor(this._style[prop]) : {r:0,g:0,b:0});
            this.animatedProps[prop].steps[second].unit = typeof this.animations[second][prop] === "string" ? utils.getUnitFromString(this.animations[second][prop] || "") : "";
            this.animatedProps[prop].steps[second].endValue = colorObj;
            this.animatedProps[prop].steps[second].changeInValue = {
              r : this.animatedProps[prop].steps[second].endValue.r - this.animatedProps[prop].steps[second].startValue.r,
              g : this.animatedProps[prop].steps[second].endValue.g - this.animatedProps[prop].steps[second].startValue.g,
              b : this.animatedProps[prop].steps[second].endValue.b - this.animatedProps[prop].steps[second].startValue.b,
              a : this.animatedProps[prop].steps[second].endValue.a - this.animatedProps[prop].steps[second].startValue.a
            };
            this.animatedProps[prop].steps[second].initIteration = lastStepProp ? Math.floor(lastStepProp*fps) : 0;
            this.animatedProps[prop].steps[second].totalStepIteration = Math.floor(second*fps - this.animatedProps[prop].steps[second].initIteration);
            this.animatedProps[prop].steps[second].easing = this.animations[second].easing;
            this.animatedProps[prop].steps[second].currentIteration = 0;
          } else if(!/\d/g.test(this.animations[second][prop])) {
            this.animatedProps[prop].steps[second].startValue = lastStep ? lastStep.endValue : (this._style[prop] ? this._style[prop] : "auto");
            this.animatedProps[prop].steps[second].unit = "";
            this.animatedProps[prop].steps[second].endValue = this.animations[second][prop];
            this.animatedProps[prop].steps[second].changeInValue = this.animatedProps[prop].steps[second].endValue;
            this.animatedProps[prop].steps[second].initIteration = lastStepProp ? Math.floor(lastStepProp*fps) : 0;
            this.animatedProps[prop].steps[second].totalStepIteration = Math.floor(second*fps) - this.animatedProps[prop].steps[second].initIteration;
            this.animatedProps[prop].steps[second].easing = this.animations[second].easing;
            this.animatedProps[prop].steps[second].currentIteration = 0;
          } else {
            this.animatedProps[prop].steps[second].startValue = parseFloat(lastStep ? lastStep.endValue : (this._style[prop] ? (parseFloat(this._style[prop])) : 0));
            this.animatedProps[prop].steps[second].unit = typeof this.animations[second][prop] === "string" && /px|%/g.test(this.animations[second][prop]) ? utils.getUnitFromString(this.animations[second][prop] || "") : "";
            this.animatedProps[prop].steps[second].endValue = parseFloat(this.animations[second][prop]);
            this.animatedProps[prop].steps[second].changeInValue = parseFloat(this.animatedProps[prop].steps[second].endValue - this.animatedProps[prop].steps[second].startValue);
            this.animatedProps[prop].steps[second].initIteration = lastStepProp ? Math.floor(lastStepProp*fps) : 0;
            this.animatedProps[prop].steps[second].totalStepIteration = Math.floor(second*fps) - this.animatedProps[prop].steps[second].initIteration;
            this.animatedProps[prop].steps[second].easing = this.animations[second].easing;
            this.animatedProps[prop].steps[second].currentIteration = 0;
          }
          // console.log(this.animations[second][prop],this.animatedProps[prop].steps[second].endValue);
        }
      }
    }

    // console.log(this.animatedProps);

    this.computedAnimations = !this.computedAnimations || [];

    for(let prop in this.animatedProps) {
      for(let iteration = 0; iteration <= totalAnimationIteration; iteration++) {
        let propNumericSteps = Object.keys(this.animatedProps[prop].steps),
            iterationSeconds = (iteration/totalAnimationIteration)*totalAnimationTime,
            secondsElapsed = isFinite(iterationSeconds) ? Number(iterationSeconds).toFixed(2) : 0,
            stepSecond = utils.closest(secondsElapsed, propNumericSteps);

        if(!this.computedAnimations[iteration]) {
          this.computedAnimations[iteration] = {};
        }
        // console.log(this.animatedProps[prop].steps[stepSecond]);
        if(/color/ig.test(prop)) {
          let easing = this.animatedProps[prop].steps[stepSecond].easing || "linearEase",
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
        } else if(!/\d/g.test(this.animatedProps[prop].steps[stepSecond].startValue)) {
          let easing = this.animatedProps[prop].steps[stepSecond].easing || "linearEase",
              actualIteration = this.animatedProps[prop].steps[stepSecond].currentIteration,
              startValue = this.animatedProps[prop].steps[stepSecond].startValue,
              endValue = this.animatedProps[prop].steps[stepSecond].endValue,
              changeInValue = this.animatedProps[prop].steps[stepSecond].changeInValue,
              totalIterationValue = this.animatedProps[prop].steps[stepSecond].totalStepIteration,
              value = actualIteration < totalIterationValue-1 ? startValue : endValue;
              // console.log(prop,this.animatedProps[prop].steps[stepSecond].initIteration,iteration,actualIteration,totalIterationValue,totalAnimationIteration);

          this.computedAnimations[iteration][prop] = value + this.animatedProps[prop].steps[stepSecond].unit;
        } else {
          let easing = this.animatedProps[prop].steps[stepSecond].easing || "linearEase",
              actualIteration = this.animatedProps[prop].steps[stepSecond].currentIteration,
              startValue = this.animatedProps[prop].steps[stepSecond].startValue,
              endValue = this.animatedProps[prop].steps[stepSecond].endValue,
              changeInValue = this.animatedProps[prop].steps[stepSecond].changeInValue,
              totalIterationValue = this.animatedProps[prop].steps[stepSecond].totalStepIteration,
              value = actualIteration < totalIterationValue-1 ? Easings[easing](actualIteration, startValue, changeInValue, totalIterationValue) : endValue;
              // console.log(prop,this.animatedProps[prop].steps[stepSecond].initIteration,iteration,actualIteration,totalIterationValue,totalAnimationIteration);

          this.computedAnimations[iteration][prop] = value + this.animatedProps[prop].steps[stepSecond].unit;
        }

        if(iteration >= this.animatedProps[prop].steps[stepSecond].initIteration && this.animatedProps[prop].steps[stepSecond].currentIteration <= this.animatedProps[prop].steps[stepSecond].totalStepIteration) {
          this.animatedProps[prop].steps[stepSecond].currentIteration++;
        }
      }
    }

    // console.log(this.computedAnimations);
    return this;
  };

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
    let animationsLength = this.computedAnimations.length;
    // console.log(animationsLength,currentIteration);
    if(animationsLength <= 0) {
      this.preInterpolateStep(fps);
    }
    // console.log(this.computedAnimations[currentIteration]);
    if(currentIteration <= 1 && !this.animationStarted) {
      eventManager.dispatchEvent(this.uuid + "-animationStart");
      this.currentIteration = currentIteration;
      this.applyStyle(this.computedAnimations[currentIteration]);
    }
    if(animationsLength > currentIteration) {
      this.animated = true;
      this.currentIteration = currentIteration;
      this.applyStyle(this.computedAnimations[currentIteration]);
      this.checkBreakpoints();
    }
    if(animationsLength === currentIteration) {
      this.stopAnimation();
      this.currentIteration = animationsLength-1;
      eventManager.dispatchEvent(this.uuid + "-animationEnd");
    }
  // console.log(animationsLength, currentIteration, this.animationStarted);

    return this;
  };

  restartAnimation() {
    this.stopAnimation();
    this.counter = 0;
    this.runAnimation();
  };

  startAnimation() {
    this.animationStarted = true;
    this.runAnimation();
    this.childs.forEach(function(child){
      child.startAnimation();
    });
  };

  stopAnimation() {
    this.animationStarted = false;
    this.animated = false;
    window.cancelAnimationFrame(this.rafID);
    // this.childs.forEach(function(child){
    //   child.stopAnimation();
    // });
  };

  runAnimation(){
    this.rafID = window.requestAnimationFrame((time) => { this.runAnimation() });
    if(Object.keys(this.animations).length > 0) {
      this.now = performance.now() || Date.now();
      this.delta = this.now - this.then;
      if(!this.animationStarted) {
        this.animationStarted = true;
        this.totalTime = Number(this.getSortedSteps()[this.getSortedSteps().length-1]);
        this.totalIteration = this.totalTime * this.fps;
      } else {
        if(this.delta > this.interval) {
          this.then = this.now - (this.delta % this.interval);

          if(!this.reverse) {
            this.counter++;
          } else {
            if(this.counter <= 0) {
              this.counter = this.totalIteration;
              // console.log(this.counter);
            }
            this.counter--;
          }

          let sec = performance.now() || Date.now(),
              dateSec = new Date(sec - this.startTime),
              iterationSeconds = (this.counter/this.totalIteration)*this.totalTime;

          this.secondsElapsed = isFinite(iterationSeconds) ? Number(iterationSeconds).toFixed(2) : 0;

          // console.log(this.secondsElapsed, this.totalIteration);

          this.interpolateStep(this.counter, this.secondsElapsed, this.fps);

          if(this.counter >= this.totalIteration && !this.reverse) {
            if(this.repeat > 0 && this.repeatCounter < this.repeat) {
              this.counter = 0;
              this.repeatCounter++;
            }
          } else if(this.counter == 1 && this.reverse) {
            if(this.repeat > 0 && this.repeatCounter < this.repeat) {
              this.counter = 0;
              this.repeatCounter++;
            }
          }
        // console.log(this.secondsElapsed);
        }
      }
    }
  };

  addListener(listener, fn) {
    let that = this;
    return eventManager.addListener(this.uuid + "-" + listener, ()=>fn.call(that));
  };

  removeListener(listener, fn) {
    if(fn instanceof Function) {
      return eventManager.removeListener(this.uuid + "-" + listener, fn);
    } else {
      return eventManager.removeListener(this.uuid + "-" + listener, this[fn]);
    }
  };

  dispatchEvent(eventName, params, glob) {
    if(glob) {
      return eventManager.dispatchEvent(eventName, params, this);
    } else {
      return eventManager.dispatchEvent(this.uuid + "-" + eventName, params, this);
    }

  };

  addAnimationProperties(propertieArray) {
    let _parent = this,
        existingProp = Object.keys(this.animatedProps),
        time = Number(this.timeline.secondsElapsed);

    time = time === 0 ? 0.02 : time;

    propertieArray.forEach(function(refProp, index){
      if(existingProp.indexOf(refProp) === -1) {
        if(!_parent.animations[time]) {
          _parent.animations[time] = {};
        }
        _parent.animations[time][refProp] = 0;
      }
    });
    this.preInterpolateStep(this.timeline.fps || this.fps);
    if(this.timeline) {
      this.timeline.computeSteps();
    }
    if(this.timeline.UI) {
      this.timeline.UI.insertInterface();
    }
    return this;
  };

  deleteAnimationProperties(propertieArray) {
    let _parent = this;

    propertieArray.forEach(function(refProp, index){
      for(let step in _parent.animations) {
        for(let prop in _parent.animations[step]) {
          if(prop === refProp) {
            delete _parent.animations[step][prop];
          }
        }
      }
    });
    this.preInterpolateStep(this.timeline.fps || this.fps);
    if(this.timeline) {
      this.timeline.computeSteps();
    }
    if(this.timeline.UI) {
      this.timeline.UI.drawTimelineProperties();
      this.timeline.UI.actualizeAnimationUI();
      this.timeline.UI.listenScroll();
    }
    return this;
  };

  getSortedSteps() {
    let numericSteps = Object.keys(this.animations).map(function(val,index){return parseFloat(val)});
    numericSteps.sort(function(a,b){return a-b});
    this.numericSteps = numericSteps;
    for(let t in this.animations) {
      // console.log(t);
      if(!/\d\.\d{2}/.test(t)) {
        this.animations[parseFloat(t).toFixed(2)] = this.animations[t];
        delete this.animations[t];
      } else if(Object.keys(this.animations[t]).length === 0) {
        delete this.animations[t];
      }
    }
    return this.numericSteps;
  };

  getTotalAnimationTime() {
    this.getSortedSteps();
    this.totalAnimationTime = utils.getMaxOfArray(this.numericSteps);
    return this.totalAnimationTime;
  };

  exportToJSON() {
    var ob = {};
    ob.exportedEvents = {};
    ob.exportedFunctions = {};
    ob.childs = [];

    for(let p in this) {
      if(typeof this[p] !== "undefined" && this[p] !== null) {
        if(typeof this[p] !== "function" && !this[p].element && !this[p].children && !this[p].elements && !/exportedFunctions|exportedEvents|childs|interval|then|now|delta|animated|animationStarted|currentIteration|computedAnimations|totalTime|secondsElapsed|rafID|numericSteps|counter|totalIteration|animationStarted|direction|coords|bounds|geo|infowindow|map|marker|shop/.test(p)) {
          ob[p] = this[p];
        }
      }
    }

    for(let evt in this.events) {
      let txt = this.events[evt].toString(),
          args = txt.slice(txt.indexOf("(")+1, txt.indexOf(")")).split(","),
          body = txt.slice(txt.indexOf("{") + 1, txt.lastIndexOf("}")).replace(/\s(?!.)/gm,"");
      ob.exportedEvents[evt] = { args : args.map((el)=>el.replace(/\s+|\n+|(\/\*\*\/\n)+/g,"")), body : body};
    }

    for(let func in this.functions) {
      let txt = this.functions[func].toString(),
          args = txt.slice(txt.indexOf("(")+1, txt.indexOf(")")).split(","),
          body = txt.slice(txt.indexOf("{") + 1, txt.lastIndexOf("}")).replace(/\s(?!.)/gm,"");
      ob.exportedFunctions[func] = { args : args.map((el)=>el.replace(/\s+|\n+|(\/\*\*\/\n)+/g,"")), body : body};
    }

    this.childs.forEach(function(child){
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
  };

  loadFromJSON(json) {
    for(let key in json) {
        this[key] = json[key];
    }

    for(let evt in json.exportedEvents) {
      let args = json.exportedEvents[evt].args.map((el)=>el.replace(/\s+|\n+|(\/\*\*\/\n)+/g,"")),
          body = json.exportedEvents[evt].body;
      this.events[evt] = new Function(args,body);
    }

    for(let func in json.exportedFunctions) {
      let args = json.exportedFunctions[func].args.map((el)=>el.replace(/\s+|\n+|(\/\*\*\/\n)+/g,"")),
          body = json.exportedFunctions[func].body;
      this.functions[func] = new Function(args,body);
    }
    if(json.childs) {
      json.childs.forEach((child,index)=>{
        child.load = true;
        if(json.data) {
          child.data = child.data || {};
          // child.data.absoluteAssetURL = json.data.absoluteAssetURL || "";
          child.data.absoluteAssetURL = child.data.absoluteAssetURL || "";
        }
        this.childs[index] = new MultimediaObject(child);
        this.childs[index].DOMParent = this;
      });
    }

    this.uuid = utils.generateUUID();
    this.data = json.data || {};
    this.type = json.type;
    this.data.absoluteAssetURL = json.data ? json.data.absoluteAssetURL : "";
    if(window._s4mConfig) {
      if(window._s4mConfig.absoluteAssetURL !== "undefined" && window._s4mConfig.absoluteAssetURL !== "") {
        this.data.absoluteAssetURL = window._s4mConfig.absoluteAssetURL;
      } else if(typeof json.data.absoluteAssetURL !== "undefined" && json.data.absoluteAssetURL !== "" && json.data.absoluteAssetURL !== "./") {
        window._s4mConfig.absoluteAssetURL = json.data.absoluteAssetURL;
      }
    } else {
      this.data = json.data || {};
      this.data.absoluteAssetURL = typeof json.data.absoluteAssetURL !== "undefined" && json.data.absoluteAssetURL !== "" ? json.data.absoluteAssetURL : "./";
    }
    // console.log(this.name, window._s4mConfig.absoluteAssetURL);
  };
};

module.exports = MultimediaObject;
