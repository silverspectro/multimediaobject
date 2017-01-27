if (!Element.prototype.getElementsByClassName) {
  Element.prototype.getElementsByClassName = function (search) {
    let d = this,
      elements,
      pattern,
      i,
      results = [];
    if (d.querySelectorAll) { // IE8
      return d.querySelectorAll(`.${search}`);
    }
    if (d.evaluate) { // IE6, IE7
      pattern = `.//*[contains(concat(' ', @class, ' '), ' ${search} ')]`;
      elements = d.evaluate(pattern, d, null, 0, null);
      while ((i = elements.iterateNext())) {
        results.push(i);
      }
    } else {
      elements = d.getElementsByTagName('*');
      pattern = new RegExp(`(^|\\s)${search}(\\s|$)`);
      for (i = 0; i < elements.length; i++) {
        if (pattern.test(elements[i].className)) {
          results.push(elements[i]);
        }
      }
    }
    return results;
  };
}
let DOMSel;

export const _ = function (selector) {
  return new DOMSelector(selector);
};

DOMSel = _;

var DOMSelector = function (selector) {
  if (selector === window || selector === document || selector.nodeType) {
    this[0] = selector;
    this.length = 1;
    return this;
  }

  let sel;

  if (document.querySelectorAll) {
    sel = document.querySelectorAll(selector);
  } else if (selector.indexOf('#') === 0) {
    sel = [document.getElementById(selector.replace('#', ''))];
  } else if (selector.indexOf('.') === 0) {
    sel = document.getElementsByClassName(selector.replace('.', ''));
  } else {
    sel = document.getElementsByTagName(selector);
  }

  for (var i = 0; i < sel.length; i++) {
    this[i] = sel[i];
  }

  this.length = sel.length;
  return this;
};

DOMSel.fn = DOMSelector.prototype = {};

DOMSel.fn.getStyle = function (elem) {
  for (var i = 0; i < this.length; i++) {
    return getComputedStyle(this[i])[elem];
  }
};

DOMSel.fn.css = function (style, callback) {
  if (typeof style !== 'object') {
    throw 'You must pass in an object';
  }
  for (var i = 0; i < this.length; i++) {
    for (const property in style) {
      this[i].style[property] = style[property];
      if (property == 'transform') {
        this[i].style.webkitTransform = style[property];
      }
    }
  }
  if (callback) {
    callback();
  }
  return this;
};

DOMSel.fn.transition = function (params, callback) {
  if (typeof params !== 'object') {
    throw 'You must pass in an object';
  }
  const that = this;
  let c = 0;
  var params = {
    style: params.style || {},
    duration: params.duration || 0.3,
    delay: params.delay || 0,
    easing: params.easing || 'ease-out',
    stagger: params.stagger || false,
  };
  let tempDelay = params.delay;

  for (var i = 0; i < this.length; i++) {
    if (params.stagger && i > 0)tempDelay += params.delay;
    this[i].style.transition = `all ${params.duration}s ${tempDelay}s ${params.easing}`;
    this[i].style.WebkitTransition = `all ${params.duration}s ${tempDelay}s ${params.easing}`;
    window.setTimeout(() => {
      that[c].style.transition = '';
      that[c].style.WebkitTransition = '';
      c++;
    }, params.stagger ? ((params.duration + tempDelay) * 1000) : ((params.duration + tempDelay) * 1000));
    if (callback && i == this.length - 1) {
      window.setTimeout(callback, (params.duration + tempDelay) * 1000);
    }
  }
  return this.css(params.style);
};

DOMSel.fn.on = function (evt, callback) {
  let isSlide = evt == 'slide',
    detecttouch = !!('ontouchstart' in window) || !!('ontouchstart' in document.documentElement) || !!window.ontouchstart || !!window.onmsgesturechange || (window.DocumentTouch && window.document instanceof window.DocumentTouch);
  for (var i = 0; i < this.length; i++) {
    if (isSlide) {
      var userData = {},
        evtStarted = false,
        evtStart = function (e) {
          e.preventDefault();
          const evt = e.changedTouches ? e.changedTouches[0] : e;
          evtStarted = true;
          userData = {
            start: {
              left: evt.pageX,
              top: evt.pageY,
            },
          };
        },
        evtEnd = function (e) {
          e.preventDefault();
          if (!evtStarted) {
            return;
          }
          const evt = e.changedTouches ? e.changedTouches[0] : e;
          userData.end = {
            left: evt.pageX,
            top: evt.pageY,
          };
          userData.dx = userData.end.left - userData.start.left;
          userData.dy = userData.end.top - userData.start.top;
          userData.angle = Math.atan2(userData.dy, userData.dx);
          userData.angle *= 180 / Math.PI;
          userData.inMotion = (e.type == 'touchmove' || e.type == 'mousemove');
          userData.direction = Math.abs(userData.dx) > Math.abs(userData.dy) ? (`${userData.dx}`).indexOf('-') != -1 ? 'left' : 'right' : (`${userData.dy}`).indexOf('-') != -1 ? 'top' : 'bottom',
            callback.apply(this, [e, userData]);
          if (userData.inMotion == false) {
            evtStarted = false;
          }
        };
      if (detecttouch) {
        this[i].addEventListener('touchstart', evtStart, false);
        this[i].addEventListener('touchmove', evtEnd, false);
        this[i].addEventListener('touchend', evtEnd, false);
      } else {
        this[i].addEventListener('mousedown', evtStart, false);
        this[i].addEventListener('mousemove', evtEnd, false);
        this[i].addEventListener('mouseup', evtEnd, false);
      }
    } else {
      const fn = function (e) {
        callback.apply(this, [e]);
      };
      this[i].addEventListener(evt, fn);
    }
  }
  return this;
};

/**
 * Does the element have a child of the given type (types are ; div, video, img ...)
 * @param  {[type]}   nodeName Type to be found
 * @return {Boolean}           returns true on the first child of the given type found, will return false if nothing found
 */
DOMSel.fn.hasChildOfType = function (nodeName) {
  for (var i = 0; i < this.length; i++) {
    if (this[i].hasChildNodes()) {
      for (var j = 0; j < this[i].childNodes.length; j++) {
        if (nodeName == this[i].childNodes[j].nodeName) {
          return true;
        }
      }
    }
  }
  return false;
};

/**
 * Does the element have a child of the given type (types are ; div, video, img ...)
 * @param  {[type]}   nodeName Type to be found
 * @return {Boolean}           returns true on the first child of the given type found, will return false if nothing found
 */
DOMSel.fn.getChildOfType = function (nodeName) {
  for (var i = 0; i < this.length; i++) {
    if (this[i].hasChildNodes()) {
      for (var j = 0; j < this[i].childNodes.length; j++) {
        if (nodeName == this[i].childNodes[j].nodeName) {
          return this[i].childNodes[j];
        }
      }
    }
  }
  return null;
};

/**
* Constrains a value to a maximum
* @param {int} variable - the variable to constrain
* @param {int} constraint - the contsraint rule
* @return {int} variable
*/

DOMSel.constrain = function (variable, constraint) {
  // console.log(variable, constraint);
  let absVar = Math.abs(variable),
    absConst = Math.abs(constraint);

  if (absVar <= absConst) {
    return variable;
  }
  if (variable < 0) {
    return -constraint;
  }
  return constraint;
};
