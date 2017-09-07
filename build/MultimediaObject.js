var MultimediaObject = (function () {
'use strict';

/* eslint-disable */
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

var raf = (function () {
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
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/* eslint-disable */
var type = function type(obj) {
  var text = obj.constructor.toString();
  return text.match(/function (.*)\(/)[1];
};

var Set = function () {
  function Set(array) {
    classCallCheck(this, Set);

    this.obj = {};
    if (array) {
      this.add(array);
    }
  }

  createClass(Set, [{
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

var pxPropertiesArray = ['baselineShift', 'border', 'backgroundPositionX', 'backgroundPositionY', 'borderBottom', 'borderBottomLeftRadius', 'borderBottomRightRadius', 'borderBottomWidth', 'borderImageOutset', 'borderImageWidth', 'borderLeft', 'borderLeftWidth', 'borderRadius', 'borderRight', 'borderRightWidth', 'borderSpacing', 'borderTop', 'borderTopLeftRadius', 'borderTopRightRadius', 'borderTopWidth', 'borderWidth', 'bottom', 'columnGap', 'columnRule', 'columnRuleWidth', 'columnWidth', 'cx', 'cy', 'flexBasis', 'fontSize', 'left', 'letterSpacing', 'lineHeight', 'marginBottom', 'marginLeft', 'marginRight', 'marginTop', 'maxHeight', 'maxWidth', 'minHeight', 'minWidth', 'motion', 'offset', 'offsetDistance', 'outlineOffset', 'outlineWidth', 'paddingBottom', 'paddingLeft', 'paddingRight', 'paddingTop', 'perspective', 'r', 'right', 'rx', 'ry', 'shapeMargin', 'size', 'strokeDasharray', 'strokeDashoffset', 'strokeWidth', 'tabSize', 'textIndent', 'top', 'width', 'height', 'wordSpacing', 'x', 'y', 'baseline-shift', 'border-bottom', 'border-bottom-left-radius', 'border-bottom-right-radius', 'border-bottom-width', 'border-image-outset', 'border-image-width', 'border-left', 'border-left-width', 'border-radius', 'border-right', 'border-right-width', 'border-spacing', 'border-top', 'border-top-left-radius', 'border-top-right-radius', 'border-top-width', 'border-width', 'column-gap', 'column-rule', 'column-rule-width', 'column-width', 'flex-basis', 'font-size', 'letter-spacing', 'line-height', 'margin-bottom', 'margin-left', 'margin-right', 'margin-top', 'max-height', 'max-width', 'min-height', 'min-width', 'offset-distance', 'padding-bottom', 'padding-left', 'padding-right', 'padding-top', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-width', 'tab-size', 'text-indent', 'word-spacing', 'translateX', 'translateY', 'translateZ', 'translate-x', 'translate-y', 'translate-z', 'translate', 'background-position-x', 'background-position-y'];

var stylePropertiesArray = ['background', 'flex', 'flexGrow', 'flexShrink', 'objectPosition', 'transformOrigin', 'alignContent', 'alignItems', 'alignSelf', 'alignmentBaseline', 'all', 'animation', 'animationDelay', 'animationDirection', 'animationDuration', 'animationFillMode', 'animationIterationCount', 'animationName', 'animationPlayState', 'animationTimingFunction', 'backfaceVisibility', 'background', 'backgroundAttachment', 'backgroundBlendMode', 'backgroundClip', 'backgroundColor', 'backgroundImage', 'backgroundOrigin', 'backgroundPosition', 'backgroundRepeat', 'backgroundRepeatX', 'backgroundRepeatY', 'borderBottomColor', 'borderBottomStyle', 'borderCollapse', 'borderColor', 'borderImage', 'borderImageRepeat', 'borderImageSlice', 'borderImageSource', 'borderLeftColor', 'borderLeftStyle', 'borderRightColor', 'borderRightStyle', 'borderStyle', 'borderTopColor', 'borderTopStyle', 'boxShadow', 'boxSizing', 'breakAfter', 'breakBefore', 'breakInside', 'bufferedRendering', 'captionSide', 'clear', 'clip', 'clipPath', 'color', 'columnCount', 'columnFill', 'columnRuleColor', 'columnRuleStyle', 'columnSpan', 'columns', 'contain', 'content', 'counterIncrement', 'counterReset', 'cursor', 'd', 'direction', 'display', 'emptyCells', 'fill', 'fillOpacity', 'fillRule', 'filter', 'flexDirection', 'flexFlow', 'flexWrap', 'float', 'floodColor', 'floodOpacity', 'font', 'fontFamily', 'fontFeatureSettings', 'fontKerning', 'fontStretch', 'fontStyle', 'fontVariant', 'fontVariantCaps', 'fontVariantLigatures', 'fontVariantNumeric', 'fontWeight', 'hyphens', 'imageRendering', 'isolation', 'justifyContent', 'lightingColor', 'listStyle', 'listStyleImage', 'listStylePosition', 'listStyleType', 'marker', 'markerEnd', 'markerMid', 'markerStart', 'mask', 'maskType', 'maxZoom', 'minZoom', 'mixBlendMode', 'objectFit', 'offsetPath', 'offsetRotation', 'opacity', 'order', 'orientation', 'orphans', 'outline', 'outlineColor', 'outlineStyle', 'overflow', 'overflowWrap', 'overflowX', 'overflowY', 'page', 'pageBreakAfter', 'pageBreakBefore', 'pageBreakInside', 'paintOrder', 'perspectiveOrigin', 'pointerEvents', 'position', 'quotes', 'resize', 'shapeImageThreshold', 'shapeOutside', 'shapeRendering', 'speak', 'src', 'stopColor', 'stopOpacity', 'stroke', 'strokeLinecap', 'strokeLinejoin', 'strokeMiterlimit', 'strokeOpacity', 'tableLayout', 'textAlign', 'textAlignLast', 'textAnchor', 'textCombineUpright', 'textDecoration', 'textOrientation', 'textOverflow', 'textRendering', 'textShadow', 'textSizeAdjust', 'textTransform', 'touchAction', 'transform', 'transformStyle', 'transition', 'transitionDelay', 'transitionDuration', 'transitionProperty', 'transitionTimingFunction', 'unicodeBidi', 'unicodeRange', 'userSelect', 'userZoom', 'vectorEffect', 'visibility', 'vertical-align', 'verticalAlign', 'webkitAppearance', 'whiteSpace', 'willChange', 'wordBreak', 'wordWrap', 'writingMode', 'zIndex', 'zoom', 'flex-grow', 'flex-shrink', 'object-position', 'transform-origin', 'align-content', 'align-items', 'align-self', 'alignment-baseline', 'animation-delay', 'animation-direction', 'animation-duration', 'animation-fill-mode', 'animation-iteration-count', 'animation-name', 'animation-play-state', 'animation-timing-function', 'backface-visibility', 'background-attachment', 'background-blend-mode', 'background-clip', 'background-color', 'background-image', 'background-origin', 'background-position', 'background-repeat', 'background-repeat-x', 'background-repeat-y', 'border-bottom-color', 'border-bottom-style', 'border-collapse', 'border-color', 'border-image', 'border-image-repeat', 'border-image-slice', 'border-image-source', 'border-left-color', 'border-left-style', 'border-right-color', 'border-right-style', 'border-style', 'border-top-color', 'border-top-style', 'box-shadow', 'box-sizing', 'break-after', 'break-before', 'break-inside', 'buffered-rendering', 'caption-side', 'clip-path', 'clip-rule', 'color-interpolation', 'color-interpolation-filters', 'color-rendering', 'column-count', 'column-fill', 'column-rule-color', 'column-rule-style', 'column-span', 'counter-increment', 'counter-reset', 'dominant-baseline', 'empty-cells', 'fill-opacity', 'fill-rule', 'flex-direction', 'flex-flow', 'flex-wrap', 'flood-color', 'flood-opacity', 'font-family', 'font-feature-settings', 'font-kerning', 'font-stretch', 'font-style', 'font-variant', 'font-variant-caps', 'font-variant-ligatures', 'font-variant-numeric', 'font-weight', 'image-rendering', 'justify-content', 'lighting-color', 'list-style', 'list-style-image', 'list-style-position', 'list-style-type', 'marker-end', 'marker-mid', 'marker-start', 'mask-type', 'max-zoom', 'min-zoom', 'mix-blend-mode', 'object-fit', 'offset-path', 'offset-rotation', 'outline-color', 'outline-style', 'overflow-wrap', 'overflow-x', 'overflow-y', 'page-break-after', 'page-break-before', 'page-break-inside', 'paint-order', 'perspective-origin', 'pointer-events', 'shape-image-threshold', 'shape-outside', 'shape-rendering', 'stop-color', 'stop-opacity', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'table-layout', 'text-align', 'text-align-last', 'text-anchor', 'text-combine-upright', 'text-decoration', 'text-orientation', 'text-overflow', 'text-rendering', 'text-shadow', 'text-size-adjust', 'text-transform', 'touch-action', 'transform-style', 'transition-delay', 'transition-duration', 'transition-property', 'transition-timing-function', 'unicode-bidi', 'unicode-range', 'user-select', 'user-zoom', 'vector-effect', 'webkit-app-region', 'webkit-appearance', 'webkit-background-clip', 'webkit-background-origin', 'webkit-border-after', 'webkit-border-after-color', 'webkit-border-after-style', 'webkit-border-before', 'webkit-border-before-color', 'webkit-border-before-style', 'webkit-border-end', 'webkit-border-end-color', 'webkit-border-end-style', 'webkit-border-image', 'webkit-border-start', 'webkit-border-start-color', 'webkit-border-start-style', 'webkit-box-align', 'webkit-box-decoration-break', 'webkit-box-direction', 'webkit-box-flex', 'webkit-box-flex-group', 'webkit-box-lines', 'webkit-box-ordinal-group', 'webkit-box-orient', 'webkit-box-pack', 'webkit-box-reflect', 'webkit-column-break-after', 'webkit-column-break-before', 'webkit-column-break-inside', 'webkit-font-smoothing', 'webkit-highlight', 'webkit-hyphenate-character', 'webkit-line-break', 'webkit-line-clamp', 'webkit-locale', 'webkit-margin-after-collapse', 'webkit-margin-before-collapse', 'webkit-margin-bottom-collapse', 'webkit-margin-collapse', 'webkit-margin-top-collapse', 'webkit-mask', 'webkit-mask-box-image', 'webkit-mask-box-image-repeat', 'webkit-mask-box-image-slice', 'webkit-mask-box-image-source', 'webkit-mask-clip', 'webkit-mask-composite', 'webkit-mask-image', 'webkit-mask-origin', 'webkit-mask-repeat', 'webkit-mask-repeat-x', 'webkit-mask-repeat-y', 'webkit-print-color-adjust', 'webkit-rtl-ordering', 'webkit-ruby-position', 'webkit-tap-highlight-color', 'webkit-text-combine', 'webkit-text-decorations-in-effect', 'webkit-text-emphasis', 'webkit-text-emphasis-color', 'webkit-text-emphasis-position', 'webkit-text-emphasis-style', 'webkit-text-fill-color', 'webkit-text-orientation', 'webkit-text-security', 'webkit-text-stroke-color', 'webkit-user-drag', 'webkit-user-modify', 'webkit-writing-mode', 'white-space', 'will-change', 'word-break', 'word-wrap', 'writing-mode', 'z-index', 'zoom'];

var staticData = {
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
    animatableProps: new RegExp('background-position-|background-size|background-color|translate|scale|rotate|skew|margin-|padding-|top|left|right|bottom|color|font-size|width|height|opacity|width|height', 'gi')
  },
  sets: {
    pxProperties: pxPropertiesArray,
    degProperties: ['rotate', 'rotate-x', 'rotate-y', 'rotate-z', 'rotate-x', 'rotate-y', 'rotate-z', 'skew', 'skewX', 'skewY', 'skewZ', 'skew-x', 'skew-y', 'skew-z'],
    transformProperties: ['translate', 'translateX', 'translateY', 'translateZ', 'translateX', 'translate-x', 'translateY', 'translate-y', 'translate-z', 'scale', 'scaleX', 'scaleY', 'scaleZ', 'scale-x', 'scale-y', 'scale-z', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'rotate-x', 'rotate-y', 'rotate-z', 'skew', 'skewX', 'skewY', 'skewZ', 'skew-x', 'skew-y', 'skew-z'],
    styleProperties: stylePropertiesArray
  }
};

/* eslint-disable */
var Atoms = function Atoms() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'block';

  var types = staticData.Atoms;
  return types[type];
};


var checkIfObject = function checkIfObject(toCheck, tryStatement, errorMessage) {
  var error = function error() {
    throw new Error(errorMessage);
  };
  try {
    tryStatement();
  } catch (err) {
    error();
  } finally {
    if (!toCheck || toCheck === null || typeof toCheck === 'string' || typeof toCheck === 'number' || toCheck instanceof Array) {
      error();
    }
  }
};
var parseBoolean = function parseBoolean(string) {
  if (typeof string === 'undefined' || string === '') {
    return true;
  }
  if (string === 'false' || Boolean(string) === false) {
    return false;
  }
  return Boolean(string);
};
var checkEvent = function checkEvent(evt) {
  return staticData.regex.DOMEvent.test(evt);
};




var closestSuperior = function closestSuperior(num, arr) {
  var sortedArr = arr.sort(function (a, b) {
    return a - b;
  });
  for (var i = 0; i < sortedArr.length; i++) {
    if (parseFloat(num) < parseFloat(sortedArr[i])) {
      return sortedArr[i];
    }
  }
  return sortedArr[sortedArr.length - 1];
};


var pxProperties = new Set(staticData.sets.pxProperties);
var degProperties = new Set(staticData.sets.degProperties);
var transformProperties = new Set(staticData.sets.transformProperties);
var styleProperties = new Set(staticData.sets.styleProperties);

var isAnimatableProp = function isAnimatableProp(prop) {
  return staticData.regex.animatableProps.test(prop);
};



var getNumFromString = function getNumFromString(str) {
  if (typeof str === 'string') {
    var num = str.match(/-(?=\d)|\d+|\.\d+/g);
    return num !== null ? parseFloat(num.join('')) : 0;
  }
  return typeof parseFloat(str) === 'number' && !isNaN(parseFloat(str)) ? parseFloat(str) : 0;
};
var getUnitFromString = function getUnitFromString(str) {
  var unit = '';
  if (typeof str === 'string') {
    var u = str.match ? str.match(/%|px|vh|vw|em|deg/g) : null;
    unit = u !== null ? u[0] : '';
  }
  return unit;
};


var toDashed = function toDashed(str) {
  return str.replace(/([A-Z])/g, function ($1) {
    return '-' + $1.toLowerCase();
  });
};
var prefixFor = function prefixFor(property) {
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
};
var propertyWithPrefix = function propertyWithPrefix(property) {
  var prefix = prefixFor(property);
  if (prefix === 'Moz') {
    return '' + prefix + (property.substring(0, 1).toUpperCase() + property.substring(1));
  }
  if (prefix !== '') {
    return '-' + prefix.toLowerCase() + '-' + toDashed(property);
  }
  return toDashed(property);
};
var unitForProperty = function unitForProperty(k, v) {
  if (pxProperties.contains(k)) {
    var unit = getUnitFromString(v);
    return unit !== '' ? unit : 'px';
  } else if (degProperties.contains(k)) {
    return 'deg';
  } else if (transformProperties.contains(k)) {
    return '';
  } else if (styleProperties.contains(k)) {
    return '';
  }
  return '';
};
var getMaxOfArray = function getMaxOfArray(numArray) {
  /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max */
  if (numArray instanceof Array) {
    var result = void 0;
    var arrayOfNumber = numArray.filter(function (el) {
      return !isNaN(parseFloat(el));
    });
    if (arrayOfNumber.length > 0) {
      result = Math.max.apply(null, arrayOfNumber);
    }
    result = isNaN(result) ? 0 : result;
    return result;
  }
  throw new Error('getMaxOfArray only works on an array');
};
var transformValueForProperty = function transformValueForProperty(k, v) {
  if (!transformProperties.contains(k)) {
    throw new Error(k + ' is not a transform property');
  }
  var value = 0;
  var unit = void 0;
  value = typeof v === 'string' && v.indexOf(',') >= 0 ? v.split(',') : getNumFromString(v);
  unit = unitForProperty(k, v);
  if (k.indexOf('scale') >= 0) {
    unit = '';
  } else if (degProperties.contains(k)) {
    unit = 'deg';
  }
  var string = k + '(' + value + unit + ')';
  if (value instanceof Array) {
    value = value.map(function (val) {
      return getNumFromString(val);
    });
    var res = '';
    value.forEach(function (val, index) {
      res += index > 0 ? ', ' + val + unit : '' + val + unit;
    });
    string = k + '(' + res + ')';
  }
  return { string: string, unit: unit, value: value };
};
var generateUUID = function generateUUID() {
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
};
var cutHex = function cutHex(h) {
  return h.charAt(0) === '#' ? h.substring(1, 7) : h;
};
var hexToR = function hexToR(h) {
  return parseInt(cutHex(h).substring(0, 2), 16);
};
var hexToG = function hexToG(h) {
  return parseInt(cutHex(h).substring(2, 4), 16);
};
var hexToB = function hexToB(h) {
  return parseInt(cutHex(h).substring(4, 6), 16);
};

var transformToColor = function transformToColor(propertie) {
  var colorObj = void 0;
  if (propertie[0] === '#') {
    colorObj = {
      r: hexToR(propertie),
      g: hexToG(propertie),
      b: hexToB(propertie),
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
};

/* eslint-disable */
var linearEase = function linearEase(currentIteration, startValue, changeInValue, totalIterations) {
  return changeInValue * currentIteration / totalIterations + startValue;
};
var easeInQuad = function easeInQuad(t, b, c, d) {
  return c * (t /= d) * t + b;
};
var easeOutQuad = function easeOutQuad(t, b, c, d) {
  return -c * (t /= d) * (t - 2) + b;
};
var easeInOutQuad = function easeInOutQuad(t, b, c, d) {
  if ((t /= d / 2) < 1) return c / 2 * t * t + b;
  return -c / 2 * (--t * (t - 2) - 1) + b;
};
var easeInCubic = function easeInCubic(t, b, c, d) {
  return c * (t /= d) * t * t + b;
};
var easeOutCubic = function easeOutCubic(t, b, c, d) {
  return c * ((t = t / d - 1) * t * t + 1) + b;
};
var easeInOutCubic = function easeInOutCubic(t, b, c, d) {
  if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
  return c / 2 * ((t -= 2) * t * t + 2) + b;
};
var easeInQuart = function easeInQuart(t, b, c, d) {
  return c * (t /= d) * t * t * t + b;
};
var easeOutQuart = function easeOutQuart(t, b, c, d) {
  return -c * ((t = t / d - 1) * t * t * t - 1) + b;
};
var easeInOutQuart = function easeInOutQuart(t, b, c, d) {
  if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
  return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
};
var easeInQuint = function easeInQuint(t, b, c, d) {
  return c * (t /= d) * t * t * t * t + b;
};
var easeOutQuint = function easeOutQuint(t, b, c, d) {
  return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
};
var easeInOutQuint = function easeInOutQuint(t, b, c, d) {
  if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
  return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
};
var easeInSine = function easeInSine(t, b, c, d) {
  return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
};
var easeOutSine = function easeOutSine(t, b, c, d) {
  return c * Math.sin(t / d * (Math.PI / 2)) + b;
};
var easeInOutSine = function easeInOutSine(t, b, c, d) {
  return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
};
var easeInExpo = function easeInExpo(t, b, c, d) {
  return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
};
var easeOutExpo = function easeOutExpo(t, b, c, d) {
  return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
};
var easeInOutExpo = function easeInOutExpo(t, b, c, d) {
  if (t == 0) return b;
  if (t == d) return b + c;
  if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
  return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
};
var easeInCirc = function easeInCirc(t, b, c, d) {
  return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
};
var easeOutCirc = function easeOutCirc(t, b, c, d) {
  return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
};
var easeInOutCirc = function easeInOutCirc(t, b, c, d) {
  if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
  return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
};
var easeInElastic = function easeInElastic(t, b, c, d) {
  var s = 1.70158;var p = 0;var a = c;
  if (t == 0) return b;if ((t /= d) == 1) return b + c;if (!p) p = d * 0.3;
  if (a < Math.abs(c)) {
    a = c;var s = p / 4;
  } else var s = p / (2 * Math.PI) * Math.asin(c / a);
  return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
};
var easeOutElastic = function easeOutElastic(t, b, c, d) {
  var s = 1.70158;var p = 0;var a = c;
  if (t == 0) return b;if ((t /= d) == 1) return b + c;if (!p) p = d * 0.3;
  if (a < Math.abs(c)) {
    a = c;var s = p / 4;
  } else var s = p / (2 * Math.PI) * Math.asin(c / a);
  return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
};
var easeInOutElastic = function easeInOutElastic(t, b, c, d) {
  var s = 1.70158;var p = 0;var a = c;
  if (t == 0) return b;if ((t /= d / 2) == 2) return b + c;if (!p) p = d * (0.3 * 1.5);
  if (a < Math.abs(c)) {
    a = c;var s = p / 4;
  } else var s = p / (2 * Math.PI) * Math.asin(c / a);
  if (t < 1) return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
  return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
};
var easeInBack = function easeInBack(t, b, c, d, s) {
  if (s == undefined) s = 1.70158;
  return c * (t /= d) * t * ((s + 1) * t - s) + b;
};
var easeOutBack = function easeOutBack(t, b, c, d, s) {
  if (s == undefined) s = 1.70158;
  return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
};
var easeInOutBack = function easeInOutBack(t, b, c, d, s) {
  if (s == undefined) s = 1.70158;
  if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
  return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
};
var easeInBounce = function easeInBounce(t, b, c, d) {
  return c - easeOutBounce(d - t, 0, c, d) + b;
};
var easeOutBounce = function easeOutBounce(t, b, c, d) {
  if ((t /= d) < 1 / 2.75) {
    return c * (7.5625 * t * t) + b;
  } else if (t < 2 / 2.75) {
    return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
  } else if (t < 2.5 / 2.75) {
    return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
  }
  return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
};
var easeInOutBounce = function easeInOutBounce(t, b, c, d) {
  if (t < d / 2) return easeInBounce(t * 2, 0, c, d) * 0.5 + b;
  return easeOutBounce(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
};

var Easings = Object.freeze({
	linearEase: linearEase,
	easeInQuad: easeInQuad,
	easeOutQuad: easeOutQuad,
	easeInOutQuad: easeInOutQuad,
	easeInCubic: easeInCubic,
	easeOutCubic: easeOutCubic,
	easeInOutCubic: easeInOutCubic,
	easeInQuart: easeInQuart,
	easeOutQuart: easeOutQuart,
	easeInOutQuart: easeInOutQuart,
	easeInQuint: easeInQuint,
	easeOutQuint: easeOutQuint,
	easeInOutQuint: easeInOutQuint,
	easeInSine: easeInSine,
	easeOutSine: easeOutSine,
	easeInOutSine: easeInOutSine,
	easeInExpo: easeInExpo,
	easeOutExpo: easeOutExpo,
	easeInOutExpo: easeInOutExpo,
	easeInCirc: easeInCirc,
	easeOutCirc: easeOutCirc,
	easeInOutCirc: easeInOutCirc,
	easeInElastic: easeInElastic,
	easeOutElastic: easeOutElastic,
	easeInOutElastic: easeInOutElastic,
	easeInBack: easeInBack,
	easeOutBack: easeOutBack,
	easeInOutBack: easeInOutBack,
	easeInBounce: easeInBounce,
	easeOutBounce: easeOutBounce,
	easeInOutBounce: easeInOutBounce
});

/* eslint-disable */
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
    if (this.listeners[event]) {
      var fnIndex = this.listeners[event].indexOf(fn);
      if (fnIndex > 0) {
        this.listeners[event].splice(fnIndex, 1);
      }
    }
    return this;
  }
};

var eventManager = new EventManager();

/* eslint-disable */
/*!
  * $script.js JS loader & dependency manager
  * https://github.com/ded/script.js
  * (c) Dustin Diaz 2014 | License MIT
  */
var doc = document;
var head = doc.getElementsByTagName('head')[0];
var s = 'string';
var f = false;
var push = 'push';
var readyState = 'readyState';
var onreadystatechange = 'onreadystatechange';
var list = {};
var ids = {};
var delay = {};
var scripts = {};
var scriptpath = void 0;
var urlArgs = void 0;

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

var $script = function $script(paths, idOrDone, optDone) {
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
};

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

var conf = {
  namespace: '_s4mConfig',
  container: 'scene',
  defaultAttributes: {
    video: {
      src: '',
      type: 'video/mp4',
      controls: 'true',
      muted: 'true',
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

var findIndex = function findIndex(array, params, one) {
  if (!(array instanceof Array)) throw new Error('findBy: can find only in array');
  var length = array.length;
  var results = [];
  var index = 0;

  var cycleParams = function cycleParams(queries, element) {
    if ((typeof queries === 'undefined' ? 'undefined' : _typeof(queries)) === 'object') {
      var found = true;
      for (var key in queries) {
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
    if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) === _typeof(array[index])) {
      cycleParams(params, array[index]);
    }
    if (one && results.length > 0) {
      return results[0];
    }
    index += 1;
  }

  return results;
};

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

var unserializeFunction = function unserializeFunction(serialized) {
  var args = serialized.args.map(function (el) {
    return el.replace(/\n+|(\/\*\*\/\n)+/g, '').replace(/^(\n+|\t+|\t\n+)(?!\w)$/gm, '').replace(/`/gm, '');
  }),
      body = serialized.body;
  return new Function(args, body);
};

var MultimediaObject = function () {
  function MultimediaObject() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'block';

    var _this = this;

    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'multimediaObject';
    var fps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 60;
    classCallCheck(this, MultimediaObject);

    this.uuid = generateUUID();

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

    if ((typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object') {
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

    this.reverse = false;
    this.repeat = 0;
    this.animationStarted = false;
    this.repeatCounter = 0;

    if (!window.MultimediaObjectEditor) {
      if (this.data.autostart && this.data.forceStart && !(this.DOMParent instanceof MultimediaObject)) {
        this.startAnimation();
      } else if (this.data.autostart) {
        this.addListener('startAfterPreload', function () {
          return _this.startAnimation();
        });
      }
    }
  }

  /**
  * Inititalize the MultimediaObject
  * generates the DOMElement, applyAttributes, sorts animations steps
  */

  createClass(MultimediaObject, [{
    key: 'init',
    value: function init() {
      this.generate(Atoms(this.type));
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
        id: /multimediaObject(\d+)?/.test(this.name) ? this.uuid : this.name
      });
      this.addGlobalStyle();
    }

    /**
    * Add the default parameters set in the config file based on the type
    */

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
      this.data.autostart = typeof this.data.autostart === 'undefined' ? true : parseBoolean(this.data.autostart);
      this.data.forceStart = typeof this.data.forceStart === 'undefined' ? false : parseBoolean(this.data.forceStart);
      if (this.element) {
        this.applyAttributes();
      }
    }

    /**
    * Check dependencies and perform action on the array
    * @param {string} dependency - the dependency
    * @param {string} pushOrSplice - push or splice
    */

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
    * Require dependencies and add it to a dependencie bundle
    * @param {object} dependencies - the dependencies to fetch
    * @return {object} MultimediaObject
    */

  }, {
    key: 'applyDependencies',
    value: function applyDependencies() {
      var _this2 = this;

      var dependencies = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.dependencies;

      if (dependencies instanceof Array) {
        dependencies.forEach(function (dep) {
          _this2.checkDep(dep);
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

  }, {
    key: 'removeDependencies',
    value: function removeDependencies() {
      var _this3 = this;

      var dependencies = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.dependencies;

      if (dependencies instanceof Array) {
        dependencies.forEach(function (dep) {
          _this3.checkDep(dep, 'splice');
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

  }, {
    key: 'requireDependencies',
    value: function requireDependencies(callback) {
      if (this.dependencies.length > 0) {
        $script(this.dependencies, 'dependencies');
        $script.ready('dependencies', callback);
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

  }, {
    key: 'addGlobalStyle',
    value: function addGlobalStyle() {
      var style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.data.globalStyle;
      var callback = arguments[1];

      if (!style) {
        return this;
      }
      if (typeof style !== 'string') {
        throw new Error('addGlobalStyle: style is not a string');
      }
      var existingStyle = document.getElementById(this.uuid + '-style');

      if (existingStyle !== null) {
        document.head.removeChild(existingStyle);
      }

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
    * Apply the object in parameter as style properties
    * @param {object} properties - the CSS style properties to apply
    * @return {object} MultimediaObject
    */

  }, {
    key: 'applyStyle',
    value: function applyStyle() {
      var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.style;
      var override = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      checkIfObject(properties, function () {
        return Object.keys(properties);
      }, 'style must be an object');
      var k = void 0;
      var transforms = [];
      var v = void 0;
      var _style = Object.keys(this._style).length;

      for (k in properties) {
        v = properties[k];
        if (transformProperties.contains(k)) {
          transforms.push([k, v]);
          var val = transformValueForProperty(k, v);
          var treatedVal = '' + val.value + val.unit;
          if (_style < 1 || override) {
            this._style[k] = treatedVal;
          }
          this.style[k] = treatedVal;
        } else if (pxProperties.contains(k)) {
          var _val = '' + getNumFromString(v) + unitForProperty(k, v);
          if (_style < 1 || override) {
            this._style[k] = _val;
          }
          this.style[k] = _val;
          this.element.style[k] = _val;
        } else if (styleProperties.contains(k)) {
          if (_style < 1 || override) {
            this._style[k] = v;
          }
          this.style[k] = v;
          if (typeof v === 'string' && v.indexOf('{{absoluteAssetURL}}') >= 0 && window[conf.namespace]) {
            v = v.replace('{{absoluteAssetURL}}', window.MultimediaObjectEditor ? this.data.absoluteAssetURL : window[conf.namespace].absoluteAssetURL);
          }
          this.element.style[k] = v;
        } else {
          var _val2 = '' + v + unitForProperty(k, v);
          // console.log(v);
          if (Object.keys(this.events).indexOf(k) < 0) {
            this.style[propertyWithPrefix(k)] = _val2;
            if (_style < 1 || override) {
              this._style[propertyWithPrefix(k)] = _val2;
            }
            if (typeof v === 'string' && v.indexOf('{{absoluteAssetURL}}') >= 0 && window[conf.namespace]) {
              v = v.replace('{{absoluteAssetURL}}', window.MultimediaObjectEditor ? this.data.absoluteAssetURL : window[conf.namespace].absoluteAssetURL);
            }
            this.element.style[propertyWithPrefix(k)] = v;
          }
        }
      }

      var z = [0, 1, 2, 3];
      var trans = {
        x: this._style.translateX ? getNumFromString(this._style.translateX) : 0,
        y: this._style.translateY ? getNumFromString(this._style.translateY) : 0,
        z: this._style.translateZ ? getNumFromString(this._style.translateZ) : 0,
        xU: this._style.translateX ? getUnitFromString(this._style.translateX) : 'px',
        yU: this._style.translateY ? getUnitFromString(this._style.translateY) : 'px',
        zU: this._style.translateZ ? getUnitFromString(this._style.translateZ) : 'px'
      };
      var rot = {
        x: this._style.rotateX ? getNumFromString(this._style.rotateX) : 0,
        y: this._style.rotateY ? getNumFromString(this._style.rotateY) : 0,
        z: this._style.rotateZ ? getNumFromString(this._style.rotateZ) || getNumFromString(this._style.rotate) : 0,
        u: 'deg'
      };
      var ske = {
        x: this._style.skewX ? getNumFromString(this._style.skewX) : 0,
        y: this._style.skewY ? getNumFromString(this._style.skewY) : 0,
        u: 'deg'
      };
      var sca = {
        x: this._style.scaleX ? getNumFromString(this._style.scaleX) : 1,
        y: this._style.scaleY ? getNumFromString(this._style.scaleY) : 1
      };

      if (transforms.length > 0) {
        v = transforms.map(function (transform) {
          return transformValueForProperty(transform[0], transform[1]).string;
        });

        v.forEach(function (a) {
          if (a.indexOf('translateX') >= 0 || a.indexOf('translate-x') >= 0) {
            trans.x = getNumFromString(a);
            trans.xU = getUnitFromString(a);
          } else if (a.indexOf('translateY') >= 0 || a.indexOf('translate-y') >= 0) {
            trans.y = getNumFromString(a);
            trans.yU = getUnitFromString(a);
          } else if (a.indexOf('translateZ') >= 0 || a.indexOf('translate-z') >= 0) {
            trans.z = getNumFromString(a);
            trans.zU = getUnitFromString(a);
          }

          if (a.indexOf('rotateX') >= 0 || a.indexOf('rotate-x') >= 0) {
            rot.x = getNumFromString(a);
          } else if (a.indexOf('rotateY') >= 0 || a.indexOf('rotate-y') >= 0) {
            rot.y = getNumFromString(a);
          } else if (a.indexOf('rotateZ') >= 0 || a.indexOf('rotate-z') >= 0) {
            rot.z = getNumFromString(a);
          } else if (a.indexOf('rotate') >= 0) {
            rot.z = getNumFromString(a);
          }

          if (a.indexOf('scaleX') >= 0 || a.indexOf('scale-x') >= 0) {
            sca.x = getNumFromString(a);
          } else if (a.indexOf('scaleY') >= 0 || a.indexOf('scale-y') >= 0) {
            sca.y = getNumFromString(a);
          }
          if (a.indexOf('skewX') >= 0 || a.indexOf('skew-x') >= 0) {
            ske.x = getNumFromString(a);
          } else if (a.indexOf('skewY') >= 0 || a.indexOf('skew-y') >= 0) {
            ske.y = getNumFromString(a);
          }
        });
        // console.log(z);
        z[0] = 'translate3d(' + trans.x + trans.xU + ',' + trans.y + trans.yU + ',' + trans.z + trans.zU + ')';
        z[1] = 'rotateX(' + rot.x + rot.u + ') rotateY(' + rot.y + rot.u + ') rotateZ(' + rot.z + rot.u + ')';
        z[2] = 'skew(' + ske.x + ske.u + ',' + ske.y + ske.u + ')';
        z[3] = 'scale(' + sca.x + ',' + sca.y + ')';
        // console.log(z);
        z = z.filter(function (el) {
          return !/^[0-9]/.test(el);
        }).join(' ');

        this.element.style[propertyWithPrefix('transform')] = z;
      }
      eventManager.dispatchEvent('actualize-style', this._style);

      return this;
    }

    /**
    * Apply the functions as method of the MultimediaObject
    * @param {object} functions - key = name of functions, value = function body.
    * @return {object} MultimediaObject
    */

  }, {
    key: 'applyFunctions',
    value: function applyFunctions() {
      var functions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.functions;

      checkIfObject(functions, function () {
        return Object.keys(functions);
      }, 'functions must be an object');
      for (var func in functions) {
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

  }, {
    key: 'applyAttributes',
    value: function applyAttributes() {
      var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.attributes;

      checkIfObject(attributes, function () {
        return Object.keys(attributes);
      }, 'attributes must be an object');
      for (var attr in attributes) {
        var replaced = attributes[attr];
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

  }, {
    key: 'applyBreakpoints',
    value: function applyBreakpoints() {
      var _this4 = this;

      var breakpoints = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.breakpoints;

      if (breakpoints instanceof Array) {
        breakpoints.forEach(function (breakpoint) {
          if (_this4.breakpoints.indexOf(breakpoint) === -1) {
            _this4.breakpoints.push(breakpoint);
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

  }, {
    key: 'applyEvents',
    value: function applyEvents() {
      var _this5 = this;

      var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.events;

      var applySwipeEvent = function applySwipeEvent(evt) {
        var detecttouch = !!('ontouchstart' in window) || !!('ontouchstart' in document.documentElement) || !!window.ontouchstart || !!window.onmsgesturechange || window.DocumentTouch && window.document instanceof window.DocumentTouch;
        var ob = _this5;
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
      for (var evt in events) {
        this.events[evt] = events[evt];
        this._events[evt] = events[evt].bind(this);
        if (!window.MultimediaObjectEditor) {
          if (evt === 'swipe') {
            applySwipeEvent(evt);
          } else if (checkEvent(evt)) {
            this.element.addEventListener(evt, this._events[evt]);
          } else {
            this.addListener(evt, this._events[evt]);
          }
        } else if (!checkEvent(evt)) this.addListener(evt, this._events[evt]);
      }
      return this;
    }

    /**
    * Remove an event by eventName
    * @param {string} eventName - name of the event
    * @return {object} MultimediaObject
    */

  }, {
    key: 'removeEvent',
    value: function removeEvent(eventName) {
      if (checkEvent(eventName)) {
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

  }, {
    key: 'deactivateEvent',
    value: function deactivateEvent(eventName) {
      if (this.events[eventName]) {
        if (checkEvent(eventName)) {
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

  }, {
    key: 'removeFunction',
    value: function removeFunction(functionName) {
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
            this.element.style[propertyWithPrefix(propertieName)] = '';
            this.element.style[propertieName] = '';
            if (transformProperties.contains(propertieName)) {
              this.element.style[propertyWithPrefix('transform')] = '';
              this.element.style.transform = '';
            }
            delete this.style[propertieName];
            delete this._style[propertieName];
            var containsTransformProps = function () {
              var keys = Object.keys(_this6._style);
              var hasTransform = false;
              for (var key = 0; key < keys.length; key++) {
                if (transformProperties.contains(keys[key])) {
                  hasTransform = true;
                  break;
                }
              }
              return hasTransform;
            }();
            if (!containsTransformProps) {
              delete this.style.transform;
              delete this._style.transform;
              delete this.style[propertyWithPrefix('transform')];
              delete this._style[propertyWithPrefix('transform')];
            }
          } else if (this.style[propertieName]) {
            if (transformProperties.contains(propertieName)) {
              this.element.style[propertyWithPrefix('transform')] = '';
              this.element.style.transform = '';
            }
            this.element.style[propertyWithPrefix(propertieName)] = '';
            this.element.style[propertieName] = '';
            delete this.style[propertieName];
          } else if (propertieName) {
            console.log(propertieName + ' style does not exist');
          }
      }

      return this;
    }

    /**
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

    /**
    * check each breakpoints on container or window, and applyStyle
    * if needed
    */

  }, {
    key: 'checkBreakpoints',
    value: function checkBreakpoints() {
      var winW = window.MultimediaObjectEditor ? 'parseInt(getComputedStyle(document.getElementById(\'' + conf.container + '\')).width)' : 'window.innerWidth';
      var winH = window.MultimediaObjectEditor ? 'parseInt(getComputedStyle(document.getElementById(\'' + conf.container + '\')).height)' : 'window.innerHeight';
      var evaluatedRule = void 0;
      if (this.breakpoints.length > 0) {
        var style = {};
        for (var w in this._style) {
          style[w] = this._style[w];
        }
        this.breakpoints.forEach(function (breakpoint) {
          var conditions = [];
          for (var breaks in breakpoint.querie) {
            if (breaks === 'orientation') {
              conditions.push('' + (breakpoint.querie[breaks] === 'landscape' ? winW + ' > ' + winH : winH + ' > ' + winW));
            } else {
              conditions.push((/height/.test(breaks) ? winH : winW) + ' ' + (/min/.test(breaks) ? '>=' : '<=') + ' ' + parseInt(breakpoint.querie[breaks], 10));
            }
          }
          evaluatedRule = '';

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
        if (this.computedAnimations.length > 0) {
          for (var _w in this.computedAnimations[this.currentIteration]) {
            style[_w] = this.computedAnimations[this.currentIteration][_w];
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

  }, {
    key: 'generate',
    value: function generate(type) {
      var _this7 = this;

      this.element = document.createElement(Atoms(type));
      this.type = Atoms(type);
      window.addEventListener('resize', function () {
        _this7.checkBreakpoints();
      });
      eventManager.addListener('resize-scene', function () {
        _this7.checkBreakpoints();
      });
      return this;
    }

    /**
    * remove MultimediaObject.element from container parameter
    */

  }, {
    key: 'removeElement',
    value: function removeElement() {
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

  }, {
    key: 'appendElementTo',
    value: function appendElementTo(container) {
      var _this8 = this;

      var appendChild = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (container) {
        if (container instanceof MultimediaObject) {
          container.element.appendChild(this.element);
          this.DOMParentUUID = container.uuid;
        } else {
          container.appendChild(this.element);
          this.DOMParentUUID = null;
        }
        this.DOMParent = container;
        var childsLength = this.childs.length;

        if (childsLength > 0 && appendChild) {
          this.childs.forEach(function (child, index) {
            child.DOMParent = _this8;
            child.appendElementTo(_this8);
          });
        }
      } else {
        document.body.appendChild(this.element);
        this.DOMParent = document.body;
        this.DOMParentUUID = null;
        var _childsLength = this.childs.length;

        if (_childsLength > 0) {
          this.childs.forEach(function (child, index) {
            child.DOMParent = _this8;
            child.DOMParentUUID = _this8.uuid;
            child.appendElementTo(_this8);
          });
        }
      }
      window.setTimeout(function () {
        if (_this8.initializer) {
          try {
            _this8.initializer();
          } catch (e) {
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

  }, {
    key: 'add',
    value: function add(child) {
      var appendChild = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

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

  }, {
    key: 'remove',
    value: function remove(child) {
      var elementIndex = findIndex(this.childs, { uuid: child.uuid });
      if (elementIndex >= 0) {
        this.childs.splice(elementIndex, 1);
        try {
          if (child instanceof MultimediaObject) {
            this.element.removeChild(child.element);
          } else {
            this.element.removeChild(child);
          }
        } catch (e) {}
      }
      return this;
    }

    /**
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
    * pre interpolate animations steps for interpolation
    * @param {int} fps - the framerate to use as base for the frame computation
    * @return {object} MultimediaObject
    */

  }, {
    key: 'preInterpolateStep',
    value: function preInterpolateStep() {
      var _this9 = this;

      var fps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.fps;

      this.getSortedSteps();
      var isAnimatedEvent = function isAnimatedEvent(string) {
        if (Object.keys(_this9._events).join().indexOf(string) >= 0) {
          return true;
        }
        return false;
      },
          totalAnimationTime = getMaxOfArray(this.numericSteps),
          totalAnimationIteration = Math.floor(totalAnimationTime * fps);

      this.animatedProps = {};
      var lastStep = void 0;
      var eventsKeys = Object.keys(this.events);

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
            var stepPropKeys = Object.keys(this.animatedProps[prop].steps),
                lastStepProp = stepPropKeys.length > 1 ? stepPropKeys[stepPropKeys.length - 2] : undefined;

            lastStep = lastStepProp ? this.animatedProps[prop].steps[lastStepProp] : undefined;

            if (/color/ig.test(prop)) {
              var colorObj = transformToColor(this.currentAnimation[second][prop]);
              this.animatedProps[prop].steps[second].startValue = lastStep ? lastStep.endValue : this._style[prop] ? transformToColor(this._style[prop]) : { r: 0, g: 0, b: 0 };
              this.animatedProps[prop].steps[second].unit = typeof this.currentAnimation[second][prop] === 'string' ? getUnitFromString(this.currentAnimation[second][prop] || '') : '';
              this.animatedProps[prop].steps[second].endValue = colorObj;
              this.animatedProps[prop].steps[second].changeInValue = {
                r: this.animatedProps[prop].steps[second].endValue.r - this.animatedProps[prop].steps[second].startValue.r,
                g: this.animatedProps[prop].steps[second].endValue.g - this.animatedProps[prop].steps[second].startValue.g,
                b: this.animatedProps[prop].steps[second].endValue.b - this.animatedProps[prop].steps[second].startValue.b,
                a: this.animatedProps[prop].steps[second].endValue.a - this.animatedProps[prop].steps[second].startValue.a
              };
              this.animatedProps[prop].steps[second].initIteration = lastStepProp ? Math.floor(lastStepProp * fps) : 0;
              this.animatedProps[prop].steps[second].totalStepIteration = Math.floor(second * fps - this.animatedProps[prop].steps[second].initIteration);
              this.animatedProps[prop].steps[second].easing = this.currentAnimation[second].easing || 'linearEase';
              this.animatedProps[prop].steps[second].currentIteration = 0;
            } else if (!/\d/g.test(this.currentAnimation[second][prop])) {
              this.animatedProps[prop].steps[second].startValue = lastStep ? lastStep.endValue : this._style[prop] ? this._style[prop] : 'auto';
              this.animatedProps[prop].steps[second].unit = '';
              this.animatedProps[prop].steps[second].endValue = this.currentAnimation[second][prop];
              this.animatedProps[prop].steps[second].changeInValue = this.animatedProps[prop].steps[second].endValue;
              this.animatedProps[prop].steps[second].initIteration = lastStepProp ? Math.floor(lastStepProp * fps) : 0;
              this.animatedProps[prop].steps[second].totalStepIteration = Math.floor(second * fps) - this.animatedProps[prop].steps[second].initIteration;
              this.animatedProps[prop].steps[second].easing = this.currentAnimation[second].easing || 'linearEase';
              this.animatedProps[prop].steps[second].currentIteration = 0;
            } else {
              this.animatedProps[prop].steps[second].startValue = parseFloat(lastStep ? lastStep.endValue : this._style[prop] ? parseFloat(this._style[prop]) : 0);
              this.animatedProps[prop].steps[second].unit = typeof this.currentAnimation[second][prop] === 'string' && /px|%|vw|vh|deg/g.test(this.currentAnimation[second][prop]) ? getUnitFromString(this.currentAnimation[second][prop] || '') : '';
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

      for (var _prop in this.animatedProps) {
        if (!isAnimatedEvent(_prop)) {
          for (var iteration = 0; iteration <= totalAnimationIteration; iteration++) {
            var propNumericSteps = Object.keys(this.animatedProps[_prop].steps);
            var iterationSeconds = iteration / totalAnimationIteration * totalAnimationTime;
            var secondsElapsed = isFinite(iterationSeconds) ? Number(iterationSeconds).toFixed(2) : 0;
            var stepSecond = closestSuperior(secondsElapsed, propNumericSteps);
            // console.log(stepSecond, secondsElapsed, propNumericSteps);

            if (!this.computedAnimations[iteration]) {
              this.computedAnimations[iteration] = {};
            }
            if (/color/ig.test(_prop)) {
              var _easing = this.animatedProps[_prop].steps[stepSecond] ? this.animatedProps[_prop].steps[stepSecond].easing : 'linearEase';
              var actualIteration = this.animatedProps[_prop].steps[stepSecond].currentIteration;
              var startValue = this.animatedProps[_prop].steps[stepSecond].startValue;
              var endValue = this.animatedProps[_prop].steps[stepSecond].endValue;
              var changeInValue = this.animatedProps[_prop].steps[stepSecond].changeInValue;
              var totalIterationValue = this.animatedProps[_prop].steps[stepSecond].totalStepIteration;
              var r = actualIteration < totalIterationValue ? parseInt(Easings[_easing](actualIteration, startValue.r, changeInValue.r, totalIterationValue)) : endValue.r;
              var g = actualIteration < totalIterationValue ? parseInt(Easings[_easing](actualIteration, startValue.g, changeInValue.g, totalIterationValue)) : endValue.g;
              var b = actualIteration < totalIterationValue ? parseInt(Easings[_easing](actualIteration, startValue.b, changeInValue.b, totalIterationValue)) : endValue.b;
              var a = actualIteration < totalIterationValue ? Number(Easings[_easing](actualIteration, startValue.a, changeInValue.a, totalIterationValue).toFixed(2)) : endValue.a;

              this.computedAnimations[iteration][_prop] = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
              // console.log(this.computedAnimations[iteration][prop]);
            } else if (!/\d/g.test(this.animatedProps[_prop].steps[stepSecond].startValue)) {
              var _easing2 = this.animatedProps[_prop].steps[stepSecond] ? this.animatedProps[_prop].steps[stepSecond].easing : 'linearEase';
              var _actualIteration = this.animatedProps[_prop].steps[stepSecond].currentIteration;
              var _startValue = this.animatedProps[_prop].steps[stepSecond].startValue;
              var _endValue = this.animatedProps[_prop].steps[stepSecond].endValue;
              var _changeInValue = this.animatedProps[_prop].steps[stepSecond].changeInValue;
              var _totalIterationValue = this.animatedProps[_prop].steps[stepSecond].totalStepIteration;
              var value = _actualIteration < _totalIterationValue - 1 ? _startValue : _endValue;
              // console.log(prop,this.animatedProps[prop].steps[stepSecond].initIteration,iteration,actualIteration,totalIterationValue,totalAnimationIteration);

              this.computedAnimations[iteration][_prop] = value + this.animatedProps[_prop].steps[stepSecond].unit;
            } else {
              var _easing3 = this.animatedProps[_prop].steps[stepSecond].easing || 'linearEase';
              var _actualIteration2 = this.animatedProps[_prop].steps[stepSecond].currentIteration;
              var _startValue2 = this.animatedProps[_prop].steps[stepSecond].startValue;
              var _endValue2 = this.animatedProps[_prop].steps[stepSecond].endValue;
              var _changeInValue2 = this.animatedProps[_prop].steps[stepSecond].changeInValue;
              var _totalIterationValue2 = this.animatedProps[_prop].steps[stepSecond].totalStepIteration;
              var _value = _actualIteration2 < _totalIterationValue2 - 1 ? Easings[_easing3](_actualIteration2, _startValue2, _changeInValue2, _totalIterationValue2) : _endValue2;
              // console.log(prop,actualIteration, totalIterationValue, value, endValue, stepSecond);

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
      // console.log(animationsLength);
      if (animationsLength <= 0) {
        this.preInterpolateStep(fps);
      }
      // console.log(this.computedAnimations[currentIteration]);
      if (currentIteration <= 1 && !this.animationStarted) {
        eventManager.dispatchEvent(this.uuid + '-animationStart');
        this.currentIteration = currentIteration;
        this.applyIteration();
      }
      if (!window.MultimediaObjectEditor) {
        this.childs.forEach(function (child) {
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
        eventManager.dispatchEvent(this.uuid + '-animationEnd');
      }
      // console.log(animationsLength, currentIteration, this.animationStarted);

      return this;
    }

    /**
    * Apply the current iteration
    * @param {object} iteration - the iteration pbject
    */

  }, {
    key: 'applyIteration',
    value: function applyIteration() {
      var iteration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.computedAnimations[this.currentIteration];
      var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      // console.log(iteration);
      if (iteration) {
        var style = Object.create(iteration);
        for (var key in iteration) {
          if (!isAnimatableProp(key)) {
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

  }, {
    key: 'restartAnimation',
    value: function restartAnimation() {
      this.stopAnimation();
      this.counter = 0;
      this.runAnimation();
    }

    /**
    * start the animation
    */

  }, {
    key: 'startAnimation',
    value: function startAnimation() {
      this.counter = 0;
      this.runAnimation();
    }

    /**
    * Stop the animation
    */

  }, {
    key: 'stopAnimation',
    value: function stopAnimation() {
      this.animationStarted = false;
      this.animated = false;
      window.cancelAnimationFrame(this.rafID);
    }

    /**
    * The animatiom cycle function
    * @param {number} time - the time om witch iterate
    */

  }, {
    key: 'runAnimation',
    value: function runAnimation(time) {
      var _this10 = this;

      this.rafID = window.requestAnimationFrame(function (time) {
        return _this10.runAnimation(time);
      });
      if (Object.keys(this.currentAnimation).length > 0 || this.totalTime > 0 && this.childs.length > 0) {
        this.now = performance.now() || Date.now();
        this.delta = this.now - this.then;
        if (!this.animationStarted) {
          this.animationStarted = true;
          var sortedSteps = this.getSortedSteps();
          this.totalTime = sortedSteps.length > 0 ? Number(sortedSteps[sortedSteps.length - 1]) : 0;
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

          // console.log(this.counter, this.totalIteration);

          this.interpolateStep(this.counter, this.secondsElapsed, this.fps);
          if (this.counter >= this.totalIteration && !this.reverse) {
            if (this.repeat > 0 && this.repeatCounter < this.repeat) {
              this.repeatCounter++;
              this.restartAnimation();
            } else {
              this.stopAnimation();
            }
          } else if (this.counter == 1 && this.reverse) {
            if (this.repeat > 0 && this.repeatCounter < this.repeat) {
              this.repeatCounter++;
              this.restartAnimation();
            } else {
              this.stopAnimation();
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

  }, {
    key: 'addListener',
    value: function addListener(listener, fn) {
      return eventManager.addListener('' + listener, fn);
    }

    /**
    * Remove an event
    * @param {string} listener - the name of the event
    * @param {function} fn - the function to remove
    */

  }, {
    key: 'removeListener',
    value: function removeListener(listener, fn) {
      if (fn instanceof Function) {
        return eventManager.removeListener('' + listener, fn);
      }
      return eventManager.removeListener('' + listener, this[fn]);
    }

    /**
    * Dispatch a custom event
    * @param {string} eventName - the name of the event
    * @param {object} params - the parameter to transmit
    */

  }, {
    key: 'dispatchEvent',
    value: function dispatchEvent(eventName, params) {
      return eventManager.dispatchEvent(eventName, params, this);
    }

    /**
    * Change the currentAnimation
    * @param {string} animationName - the animation name on which to switch
    */

  }, {
    key: 'changeAnimation',
    value: function changeAnimation() {
      var animationName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';

      this.selectedAnimation = animationName;
      this.computedSteps = [];
      this.currentAnimation = this.animations[this.selectedAnimation] || {};
      this.animations[this.selectedAnimation] = this.animations[this.selectedAnimation] || this.currentAnimation;

      this.applyStyle(this._style);
      this.stopAnimation();
      this.preInterpolateStep();
    }
  }, {
    key: 'cleanCurrentAnimation',
    value: function cleanCurrentAnimation() {
      var _this11 = this;

      Object.keys(this.currentAnimation).forEach(function (time) {
        if (Object.keys(_this11.currentAnimation[time]).length === 1) delete _this11.currentAnimation[time];
      });
      this.animations[this.selectedAnimation] = this.currentAnimation;
    }

    /**
    * Add a animation propertie
    * @param {array} propertieArray - the propertie array propertie = { key, value }
    * @param {number} absoluteTime - the time key in which to add the propertie
    */

  }, {
    key: 'addAnimationProperties',
    value: function addAnimationProperties(propertieArray, propValue) {
      var _this12 = this;

      var absoluteTime = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.00;

      this.cleanCurrentAnimation();
      var existingProp = Object.keys(this.animatedProps);
      this.currentAnimation = this.currentAnimation || {};
      var time = absoluteTime;

      propertieArray.forEach(function (refProp) {
        var prop = refProp.key || refProp;
        var value = propValue || refProp.value || _this12._style[prop] || 0;

        if (existingProp.indexOf(prop) === -1) {
          if (!_this12.currentAnimation[time]) {
            _this12.currentAnimation[time] = {};
          }
          _this12.currentAnimation[time][prop] = value;
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

  }, {
    key: 'deleteAnimationKeyframe',
    value: function deleteAnimationKeyframe(time, prop) {
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
        console.log('animation at ' + time + ' don\'t exist');
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

  }, {
    key: 'addAnimationKeyframe',
    value: function addAnimationKeyframe(time, prop, value, easing) {
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

  }, {
    key: 'getSortedSteps',
    value: function getSortedSteps() {
      var numericSteps = Object.keys(this.currentAnimation).map(function (val, index) {
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

  }, {
    key: 'getTotalAnimationTime',
    value: function getTotalAnimationTime() {
      this.getSortedSteps();
      this.totalAnimationTime = getMaxOfArray(this.numericSteps);
      return this.totalAnimationTime;
    }

    /**
    * Export the object as a reusable JSON
    * @return {object} the JSON representation of the object
    */

  }, {
    key: 'exportToJSON',
    value: function exportToJSON() {
      var ob = {};
      ob.exportedEvents = {};
      ob.exportedFunctions = {};
      ob.childs = [];

      for (var p in this) {
        if (typeof this[p] !== 'undefined' && this[p] !== null) {
          if (typeof this[p] !== 'function' && p !== 'events' && p !== 'functions' && !this[p].element && !this[p].children && !this[p].elements && !/exportedFunctions|exportedEvents|childs|interval|then|now|delta|animated|animationStarted|currentIteration|computedAnimations|secondsElapsed|rafID|numericSteps|counter|totalIteration|animationStarted|direction|coords|bounds|geo|infowindow|map|marker|shop|/.test(p)) {
            ob[p] = this[p];
          }
        }
      }

      for (var evt in this.events) {
        var txt = this.events[evt].toString(),
            args = txt.slice(txt.indexOf('(') + 1, txt.indexOf(')')).split(','),
            body = txt.slice(txt.indexOf('{') + 1, txt.lastIndexOf('}'));
        ob.exportedEvents[evt] = { args: args.map(function (el) {
            return el.replace(/\n+|(\/\*\*\/\n)+/g, '').replace(/^(\n+|\t+|\t\n+)(?!\w)$/gm, '').replace(/`/gm, '');
          }), body: body };
      }

      for (var func in this.functions) {
        var _txt = this.functions[func].toString(),
            _args = _txt.slice(_txt.indexOf('(') + 1, _txt.indexOf(')')).split(','),
            _body = _txt.slice(_txt.indexOf('{') + 1, _txt.lastIndexOf('}'));
        ob.exportedFunctions[func] = { args: _args.map(function (el) {
            return el.replace(/\n+|(\/\*\*\/\n)+/g, '').replace(/^(\n+|\t+|\t\n+)(?!\w)$/gm, '').replace(/`/gm, '');
          }), body: _body };
      }

      this.childs.forEach(function (child) {
        var c = child.exportToJSON();
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

  }, {
    key: 'setAbsoluteAssetURL',
    value: function setAbsoluteAssetURL() {
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

  }, {
    key: 'loadFromJSON',
    value: function loadFromJSON(json) {
      var _this14 = this;

      for (var key in json) {
        if (key === 'animations' && !json.animations.default) {
          this.currentAnimation = json.animations;
          this.animations.default = json.animations;
        } else if (key !== 'childs') {
          this[key] = json[key];
        }
      }

      for (var evt in json.exportedEvents) {
        this.events[evt] = unserializeFunction(json.exportedEvents[evt]);
      }

      for (var func in json.exportedFunctions) {
        this.functions[func] = unserializeFunction(json.exportedFunctions[func]);
      }
      if (json.childs) {
        json.childs.forEach(function (child, index) {
          child.load = true;
          child.data = child.data || {};
          // child.data.absoluteAssetURL = json.data.absoluteAssetURL || "";
          child.data.autostart = parseBoolean(child.data.autostart);
          child.data.forceStart = parseBoolean(child.data.forceStart);
          child.DOMParent = _this14;
          child.DOMParentUUID = _this14.uuid;
          _this14.childs.push(new MultimediaObject(child));
        });
      }

      this.uuid = json.uuid || generateUUID();
      this.DOMParentUUID = json.DOMParentUUID || null;
      this.selectedAnimation = json.selectedAnimation;
      this.data = json.data || {};
      this.type = json.type;
      this.repeat = parseInt(json.repeat, 10);
      this.dependencies = json.dependencies || [];
      this.data.autostart = json.data ? parseBoolean(json.data.autostart) : true;
      this.data.forceStart = json.data ? parseBoolean(json.data.forceStart) : false;
      this.setAbsoluteAssetURL();
    }
  }]);
  return MultimediaObject;
}();

return MultimediaObject;

}());
