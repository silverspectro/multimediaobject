import Set from '../lib/Set';
import staticData from '../config/data.static';

export const Atoms = (type = 'block') => {
  const types = staticData.Atoms;
  return types[type];
};
export const convertLeftToTime = (base, left, totalTime) => {
  const parentWidth = base;
  const percentageLeftFromPixel = (left * 100) / parentWidth;
  const timeFromLeft = (percentageLeftFromPixel / 98) * totalTime;
  const result = parseFloat(timeFromLeft).toFixed(2);

  return parseFloat(result) > totalTime
        ? totalTime.toFixed(2)
        : result;
};
export const concatObject = (...objects) => {
  const ret = {};
  const len = objects.length;
  for (let i = 0; i < len; i++) {
    for (const p in objects[i]) {
      if (!ret[p]) {
        ret[p] = objects[i][p];
      }
    }
  }
  return ret;
};
export const checkEvent = evt => staticData.regex.DOMEvent.test(evt);
export const getElementsWithAttribute = (attribute, value, element) => {
  const matchingElements = [];
  const allElements = element
        ? (element instanceof Array
            ? element
            : document.querySelectorAll(element))
        : document.getElementsByTagName('*');
  for (let i = 0, n = allElements.length; i < n; i++) {
    const attrValue = allElements[i].getAttribute(attribute);
    if (attrValue !== null) {
            // Element exists with attribute. Add to array.
      matchingElements.push(allElements[i]);
    }
  }
  return matchingElements;
};
export const getObjectUnderCursor = (elements, cursorPosition, callback) => {
  let ret = false;
  elements.forEach((object) => {
    const box = object.element
            ? object.element.getBoundingClientRect()
            : object.getBoundingClientRect();
    if ((cursorPosition.x >= box.left && cursorPosition.x <= box.right) && (cursorPosition.y >= box.top && cursorPosition.y <= box.bottom)) {
      ret = object;
    }
  });
  if (callback) {
    callback(ret);
  }
  return ret;
};
export const isEmpty = (obj) => {
  const hasOwnProperty = Object.prototype.hasOwnProperty;

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
  for (const key in obj) {
    if (hasOwnProperty.call(obj, key)) { return false; }
  }

  return true;
};
export const generateRandomHexColor = () => {
  let rndColour = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  while (rndColour.length < 7) {
    rndColour += 'f';
  }
  return rndColour;
};
export const closest = (num, arr) => {
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
};

export const pxProperties = new Set(staticData.sets.pxProperties);
export const degProperties = new Set(staticData.sets.degProperties);
export const transformProperties = new Set(staticData.sets.transformProperties);
export const styleProperties = new Set(staticData.sets.styleProperties);

export const isAnimatableProp = prop => staticData.regex.animatableProps.test(prop);
export const constrain = (value, min, max) => {
  if (min > value) {
    return min;
  }
  if (max < value) {
    return max;
  }
  return value;
};
export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
export const applyDefaults = (options, defaults) => {
  for (const k in defaults) {
    options[k] = defaults[k];
  }
  return options;
};
export const getNumFromString = (str) => {
  if (typeof str === 'string') {
    const num = str.match(/-(?=\d)|\d+|\.\d+/g);
    return num !== null
            ? parseFloat(num.join(''))
            : 0;
  }
  return typeof parseFloat(str) === 'number' && !isNaN(parseFloat(str))
        ? parseFloat(str)
        : 0;
};
export const getUnitFromString = (str) => {
  let unit = '';
  if (typeof str === 'string') {
    const u = str.match
            ? str.match(/%|px|vh|vw|em|deg/g)
            : null;
    unit = u !== null
            ? u[0]
            : '';
  }
  return unit;
};
export const clone = (o) => {
  const newO = {};
  let k;
  let v;

  for (k in o) {
    v = o[k];
    newO[k] = v;
  }
  return newO;
};
export const roundf = (v, decimal) => {
  const tV = v.toString();
  const preDecimal = tV.match(/^(.+)!?\./)
        ? tV.match(/^(.+)!?\./)[0]
        : '0.';
  return Number(`${preDecimal}${v.toString().replace(preDecimal, '').slice(0, decimal)}`);
};
export const toDashed = str => str.replace(/([A-Z])/g, $1 => `-${$1.toLowerCase()}`);
export const prefixFor = (property) => {
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
};
export const propertyWithPrefix = (property) => {
  const prefix = prefixFor(property);
  if (prefix === 'Moz') {
    return `${prefix}${property.substring(0, 1).toUpperCase() + property.substring(1)}`;
  }
  if (prefix !== '') {
    return `-${prefix.toLowerCase()}-${toDashed(property)}`;
  }
  return toDashed(property);
};
export const unitForProperty = (k, v) => {
  if (pxProperties.contains(k)) {
    const unit = getUnitFromString(v);
    return unit !== ''
            ? unit
            : 'px';
  } else if (degProperties.contains(k)) {
    return 'deg';
  } else if (transformProperties.contains(k)) {
    return '';
  } else if (styleProperties.contains(k)) {
    return '';
  }
  return '';
};
export const getMaxOfArray = (numArray) => {
    /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max */
  let result;
  if (numArray instanceof Array && numArray.length > 0) {
    result = Math.max.apply(null, numArray);
  }
  if (!isNaN(result)) {
    return result;
  }
  throw new Error('getMaxOfArray only works on an array');
};
export const transformValueForProperty = (k, v) => {
  if (!transformProperties.contains(k)) {
    throw new Error(`${k} is not a transform property`);
  }
  let value = 0;
  let unit;
  value = typeof v === 'string' && v.indexOf(',') >= 0
        ? v.split(',')
        : getNumFromString(v);
  unit = unitForProperty(k, v);
  if (k.indexOf('scale') >= 0) {
    unit = '';
  } else if (degProperties.contains(k)) {
    unit = 'deg';
  }
  let string = `${k}(${value}${unit})`;
  if (value instanceof Array) {
    value = value.map(val => getNumFromString(val));
    let res = '';
    value.forEach((val, index) => {
      res += index > 0
                ? `, ${val}${unit}`
                : `${val}${unit}`;
    });
    string = `${k}(${res})`;
  }
  return { string, unit, value };
};
export const generateUUID = () => {
  let d = new Date().getTime();
  if (window.performance && typeof window.performance.now === 'function') {
    d += performance.now(); // use high-precision timer if available
  }
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x'
            ? r
            : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
};
export const cutHex = h => (h.charAt(0) === '#') ? h.substring(1, 7) : h;
export const hexToR = h => parseInt((cutHex(h)).substring(0, 2), 16);
export const hexToG = h => parseInt((cutHex(h)).substring(2, 4), 16);
export const hexToB = h => parseInt((cutHex(h)).substring(4, 6), 16);
export const rgb2hex = (red, green, blue) => {
  const rgb = blue | (green << 8) | (red << 16);
  return `#${(0x1000000 + rgb).toString(16).slice(1)}`;
};
export const transformToColor = (propertie) => {
  let colorObj;
  if (propertie[0] === '#') {
    colorObj = {
      r: hexToR(propertie),
      g: hexToG(propertie),
      b: hexToB(propertie),
      a: 1,
    };
  } else {
    const par = typeof propertie === 'string'
            ? propertie.indexOf('(')
            : -1;
    if (par >= 0) {
      propertie = propertie.slice(par + 1, propertie.length - 1);
    }
    const rgba = typeof propertie === 'string'
            ? propertie.split(',')
            : [0, 0, 0, 0];
    colorObj = {
      r: parseInt(rgba[0], 10),
      g: parseInt(rgba[1], 10),
      b: parseInt(rgba[2], 10),
      a: parseFloat(rgba[3] || 1),
    };
  }
  return colorObj;
};
export const toCamelCase = str => str.replace(/(-.)/g, $1 => $1.substr(1, 1).toUpperCase()).replace(/\s/g, '').replace(/^(.)/, $1 => $1.toLowerCase());
