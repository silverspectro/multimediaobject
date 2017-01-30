import Set from '../lib/Set';
import staticData from '../config/data.static';

export default {
  Atoms(type = 'block') {
    const types = staticData.Atoms;
    return types[type];
  },
  convertLeftToTime(base, left, totalTime) {
    const parentWidth = base;
    const percentageLeftFromPixel = (left * 100) / parentWidth;
    const timeFromLeft = (percentageLeftFromPixel / 98) * totalTime;
    const result = parseFloat(timeFromLeft).toFixed(2);

    return parseFloat(result) > totalTime ? totalTime.toFixed(2) : result;
  },
  concatObject(...objects) {
    const ret = {};
    const len = arguments.length;
    for (let i = 0; i < len; i++) {
      for (const p in objects[i]) {
        if (!ret[p]) {
          ret[p] = objects[i][p];
        }
      }
    }
    return ret;
  },
  checkEvent(evt) {
    return staticData.regex.DOMEvent.test(evt);
  },
  getElementsWithAttribute(attribute, value, element) {
    const matchingElements = [];
    const allElements = element ? (element instanceof Array ? element : document.querySelectorAll(element)) : document.getElementsByTagName('*');
    for (let i = 0, n = allElements.length; i < n; i++) {
      const attrValue = allElements[i].getAttribute(attribute);
      if (attrValue !== null) {
        // Element exists with attribute. Add to array.
        matchingElements.push(allElements[i]);
      }
    }
    return matchingElements;
  },
  getObjectUnderCursor(elements, cursorPosition, callback) {
    let ret = false;
    elements.forEach((object) => {
      const box = object.element ? object.element.getBoundingClientRect() : object.getBoundingClientRect();
      if ((cursorPosition.x >= box.left && cursorPosition.x <= box.right) && (cursorPosition.y >= box.top && cursorPosition.y <= box.bottom)) {
        ret = object;
      }
    });
    if (callback) {
      callback(ret);
    }
    return ret;
  },
  isEmpty(obj) {
    const hasOwnProperty = Object.prototype.hasOwnProperty;

      // null and undefined are "empty"
    if (obj == null) { return true; }

      // Assume if it has a length property with a non-zero value
      // that that property is correct.
    if (obj.length > 0) { return false; }
    if (obj.length === 0) { return true; }

      // Otherwise, does it have any properties of its own?
      // Note that this doesn't handle
      // toString and valueOf enumeration bugs in IE < 9
    for (const key in obj) {
      if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
  },
  generateRandomHexColor() {
    let rndColour = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    while (rndColour.length < 7) {
      rndColour += 'f';
    }
    return rndColour;
  },
  closest(num, arr) {
    const sortedArr = arr.sort((a, b) => a - b);
    let chosen;
    for (let i = 0; i < sortedArr.length; i++) {
      let prevInd = i;
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

  pxProperties: new Set(staticData.sets.pxProperties),
  degProperties: new Set(staticData.sets.degProperties),
  transformProperties: new Set(staticData.sets.transformProperties),
  styleProperties: new Set(staticData.sets.styleProperties),

  isAnimatableProp(prop) {
    return staticData.regex.animatableProps.test(prop);
  },
  constrain(value, min, max) {
    if (min > value) {
      return min;
    }
    if (max < value) {
      return max;
    }
    return value;
  },
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  applyDefaults(options, defaults) {
    for (const k in defaults) {
      options[k] = defaults[k];
    }
    return options;
  },
  clone(o) {
    const newO = {};
    let k;
    let v;

    for (k in o) {
      v = o[k];
      newO[k] = v;
    }
    return newO;
  },
  roundf(v, decimal) {
    const tV = v.toString();
    const preDecimal = tV.match(/^(.+)!?\./) ? tV.match(/^(.+)!?\./)[0] : '0.';
    return Number(`${preDecimal}${v.toString().replace(preDecimal, '').slice(0, decimal)}`);
  },
  toDashed(str) {
    return str.replace(/([A-Z])/g, $1 => `-${$1.toLowerCase()}`);
  },
  prefixFor(property) {
    const propArray = property.split('-');
    const ref = ['Webkit', 'Moz', 'ms'];

    let i;
    let j;
    let k;
    let len;
    let len1;
    let prefix;
    let prop;
    let propertyName;
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
  propertyWithPrefix(property) {
    const prefix = this.prefixFor(property);
    if (prefix === 'Moz') {
      return `${prefix}${property.substring(0, 1).toUpperCase() + property.substring(1)}`;
    }
    if (prefix !== '') {
      return `-${prefix.toLowerCase()}-${this.toDashed(property)}`;
    }
    return this.toDashed(property);
  },
  unitForProperty(k, v) {
    if (this.pxProperties.contains(k)) {
      const unit = this.getUnitFromString(v);
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
  getMaxOfArray(numArray) {
    /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max */
    let result;
    if (numArray instanceof Array && numArray.length > 0) {
      result = Math.max.apply(null, numArray);
    }
    if (!isNaN(result)) {
      return result;
    }
    throw new Error('getMaxOfArray only works on an array');
  },
  transformValueForProperty(k, v) {
    if (!this.transformProperties.contains(k)) {
      throw new Error(`${k} is not a transform property`);
    }
    let value = 0;
    let unit;
    value = typeof v === 'string' && v.indexOf(',') >= 0 ? v.split(',') : this.getNumFromString(v);
    unit = this.unitForProperty(k, v);
    if (k.indexOf('scale') >= 0) {
      unit = '';
    } else if (this.degProperties.contains(k)) {
      unit = 'deg';
    }
    let string = `${k}(${value}${unit})`;
    if (value instanceof Array) {
      value = value.map(val => this.getNumFromString(val));
      let res = '';
      value.forEach((val, index) => {
        res += index > 0 ? `, ${val}${unit}` : `${val}${unit}`;
      });
      string = `${k}(${res})`;
    }
    return { string, unit, value };
  },
  generateUUID() {
    let d = new Date().getTime();
    if (window.performance && typeof window.performance.now === 'function') {
      d += performance.now(); // use high-precision timer if available
    }
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  },
  getNumFromString(str) {
    if (typeof str === 'string') {
      const num = str.match(/-(?=\d)|\d+|\.\d+/g);
      return num !== null ? parseFloat(num.join('')) : 0;
    }
    return typeof parseFloat(str) === 'number' && !isNaN(parseFloat(str)) ? parseFloat(str) : 0;
  },
  getUnitFromString(str) {
    let unit = '';
    if (typeof str === 'string') {
      const u = str.match ? str.match(/%|px|vh|vw|em|deg/g) : null;
      unit = u !== null ? u[0] : '';
    }
    return unit;
  },
  hexToR(h) { return parseInt((this.cutHex(h)).substring(0, 2), 16); },
  hexToG(h) { return parseInt((this.cutHex(h)).substring(2, 4), 16); },
  hexToB(h) { return parseInt((this.cutHex(h)).substring(4, 6), 16); },
  cutHex(h) { return (h.charAt(0) === '#') ? h.substring(1, 7) : h; },
  rgb2hex(red, green, blue) {
    const rgb = blue | (green << 8) | (red << 16);
    return `#${(0x1000000 + rgb).toString(16).slice(1)}`;
  },
  transformToColor(propertie) {
    let colorObj;
    if (propertie[0] === '#') {
      colorObj = {
        r: this.hexToR(propertie),
        g: this.hexToG(propertie),
        b: this.hexToB(propertie),
        a: 1,
      };
    } else {
      const par = typeof propertie === 'string' ? propertie.indexOf('(') : -1;
      if (par >= 0) {
        propertie = propertie.slice(par + 1, propertie.length - 1);
      }
      const rgba = typeof propertie === 'string' ? propertie.split(',') : [0, 0, 0, 0];
      colorObj = {
        r: parseInt(rgba[0], 10),
        g: parseInt(rgba[1], 10),
        b: parseInt(rgba[2], 10),
        a: parseFloat(rgba[3] || 1),
      };
    }
    return colorObj;
  },
  toCamelCase(str) {
    return str
        .replace(/(-.)/g, $1 => $1.substr(1, 1).toUpperCase())
        .replace(/\s/g, '')
        .replace(/^(.)/, $1 => $1.toLowerCase());
  },

};
