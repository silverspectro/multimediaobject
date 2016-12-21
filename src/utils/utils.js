let Set = require("../lib/Set.js");

var cacheFn = function(func) {
  var data;
  data = {};
  return function() {
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
  Atoms : function(type="block"){
    let types = {
      "block" : "div",
      "div" : "div",
      "header" : "header",
      "footer" : "footer",
      "aside" : "aside",
      "article" : "article",
      "main" : "main",
      "nav" : "nav",
      "navigation" : "nav",
      "span" : "span",
      "text" : "p",
      "p" : "p",
      "paragraphe" : "p",
      "ulist-container" : "ul",
      "ulist" : "ul",
      "ul" : "ul",
      "unordered-list" : "ul",
      "olist-container" : "ol",
      "olist" : "ol",
      "ol" : "ol",
      "ordered-list" : "ol",
      "list-element" : "li",
      "li" : "li",
      "code" : "pre",
      "pre" : "pre",
      "input" : "input",
      "textarea" : "textarea",
      "form" : "form",
      "image" : "img",
      "img" : "img",
      "button" : "button",
      "iframe" : "iframe",
      "video" : "video",
      "canvas" : "canvas",
      "audio" : "audio"
    };
    return types[type];
  },
  convertLeftToTime : function(left, totalTime) {
    let parentWidth = parseInt(window.getComputedStyle(document.getElementById("timeline-interface"), null).width),
        percentageLeftFromPixel = (left*100)/parentWidth,
        timeFromLeft = (percentageLeftFromPixel/98)*totalTime;
        // console.log(left, parentWidth, timeFromLeft);
        return parseFloat(timeFromLeft).toFixed(2);
  },
  concatObject : function(...objects) {
    var ret = {};
    var len = arguments.length;
    for (let i=0; i<len; i++) {
      for (let p in objects[i]) {
        if (objects[i].hasOwnProperty(p)) {
          ret[p] = objects[i][p];
        }
      }
    }
    return ret;
  },
  checkEvent : function(evt) {
    return /click|mousedown|mouseup|mousemove|change|touchstart|touchmove|touchend|input|focus|dlclick|mouseenter|mouseleave|mouseover|mouseout|blur|search|submit|play|pause|canplay|progress/ig.test(evt)
  },
  getElementsWithAttribute : function(attribute, value, element) {
    var matchingElements = [];
    var allElements = element ? (element instanceof Array ? element : document.querySelectorAll(element)) : document.getElementsByTagName('*');
    for (var i = 0, n = allElements.length; i < n; i++) {
      let attrValue = allElements[i].getAttribute(attribute);
      if (allElements[i].getAttribute(attribute) !== null) {
        // Element exists with attribute. Add to array.
        if(value) {
          if(allElements[i].getAttribute(attribute) === value) {
            matchingElements.push(allElements[i]);
          }
        } else {
          matchingElements.push(allElements[i]);
        }
      }
    }
    return matchingElements;
  },
  getObjectUnderCursor : function(elements, cursorPosition, callback) {
    let ret = false;
    elements.forEach((object,index) => {
      let box = object.element ? object.element.getBoundingClientRect() : object.getBoundingClientRect();
      if((cursorPosition.x >= box.left && cursorPosition.x <= box.right) && (cursorPosition.y >= box.top && cursorPosition.y <= box.bottom)) {
        ret = object;
      }
    });
    if(callback) {
      callback(ret);
    }
    return ret;
  },
  isEmpty : function(obj) {
      var hasOwnProperty = Object.prototype.hasOwnProperty;

      // null and undefined are "empty"
      if (obj == null){ return true;}

      // Assume if it has a length property with a non-zero value
      // that that property is correct.
      if (obj.length > 0){return false;}
      if (obj.length === 0){return true;}

      // Otherwise, does it have any properties of its own?
      // Note that this doesn't handle
      // toString and valueOf enumeration bugs in IE < 9
      for (var key in obj) {
          if (hasOwnProperty.call(obj, key)) return false;
      }

      return true;
  },

  generateRandomHexColor : function() {
    return '#'+Math.floor(Math.random()*16777215).toString(16);
  },

  closest : function(num, arr) {
    let sortedArr = arr.sort(function(a, b){return a-b});
    for(let i = 0; i < sortedArr.length; i++) {
        if(num < sortedArr[i]) {
          return sortedArr[i];
        }
    }
    return sortedArr[sortedArr.length-1];
  },

  pxProperties : new Set('marginTop,marginLeft,marginBottom,marginRight,paddingTop,paddingLeft,paddingBottom,paddingRight,top,left,bottom,right,translateX,translateY,translateZ,perspectiveX,perspectiveY,perspectiveZ,width,height,maxWidth,maxHeight,minWidth,minHeight,borderRadius'.split(',')),
  degProperties : new Set('rotate,rotateX,rotateY,rotateZ,skew,skewX,skewY,skewZ'.split(',')),
  transformProperties : new Set('translate,translateX,translateY,translateZ,scale,scaleX,scaleY,scaleZ,rotate,rotateX,rotateY,rotateZ,rotateC,rotateCX,rotateCY,skew,skewX,skewY,skewZ,perspective'.split(',')),
  styleProperties : new Set('opacity,z-index'.split(',')),

  isUnitProp : function(prop) {
    return /position|background|display|visibility|opacity|scale|transform-origin|font-weight|line-height|letter-spacing|z-index|outline|text-align|skew|rotate|transform|overflow|border-style|border-color|word/.test(prop);
  },

  isAnimatableProp : function(prop) {
    return /background-color|translate|scale|rotate|skew|margin|padding|top|left|right|bottom|color|font-size|width|height/ig.test(prop);
  },

  constrain : function(value, min, max) {
    if(min > value) {
      return min
    } else if(max < value) {
      return max
    }
    return value
  },

  getRandomInt : function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  applyDefaults : function(options, defaults) {
    var k, results, v;
    results = [];
    for (k in defaults) {
      v = defaults[k];
      results.push(options[k] != null ? options[k] : options[k] = v);
    }
    return results;
  },

  clone : function(o) {
    var k, newO, v;
    newO = {};
    for (k in o) {
      v = o[k];
      newO[k] = v;
    }
    return newO;
  },

  roundf : function(v, decimal) {
    var d;
    d = Math.pow(10, decimal);
    return Math.round(v * d) / d;
  },

  toDashed : function(str) {
    return str.replace(/([A-Z])/g, function($1) {
      return "-" + $1.toLowerCase();
    });
  },

  prefixFor : cacheFn(function(property) {
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

  propertyWithPrefix : cacheFn(function(property) {
    var prefix;
    prefix = utils.prefixFor(property);
    if (prefix === 'Moz') {
      return "" + prefix + (property.substring(0, 1).toUpperCase() + property.substring(1));
    }
    if (prefix !== '') {
      return "-" + (prefix.toLowerCase()) + "-" + (utils.toDashed(property));
    }
    return utils.toDashed(property);
  }),

  unitForProperty : function(k, v) {
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

  getMaxOfArray(numArray) {
    /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max */
    return Math.max.apply(null, numArray);
  },

  transformValueForProperty : function(k, v) {
    var match, unit;
    match = ("" + v).match(/^([0-9.-]*)([^0-9]*)$/);
    if (match != null) {
      v = match[1];
      unit = match[2];
    } else {
      v = parseFloat(v);
    }
    v = utils.roundf(parseFloat(v), 10);
    if ((unit == null) || unit === "") {
      unit = utils.unitForProperty(k, v);
    }
    return k + "(" + v + unit + ")";
  },

  generateUUID : function(){
      var d = new Date().getTime();
      if(window.performance && typeof window.performance.now === "function"){
          d += performance.now(); //use high-precision timer if available
      }
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = (d + Math.random()*16)%16 | 0;
          d = Math.floor(d/16);
          return (c=='x' ? r : (r&0x3|0x8)).toString(16);
      });
      return uuid;
  },

  getNumFromString : function(str) {
      var num = str.match(/-(?=\d)|\d+|\.\d+/g);
      return num !== null ? parseFloat(num.join("")) : str;
  },

  getUnitFromString : function(str) {
    let u = str.match(/%|px/g),
        unit = u !== null ? u[0] : "px";
    return unit;
  },

  hexToR : function(h) {return parseInt((utils.cutHex(h)).substring(0,2),16)},
  hexToG : function(h) {return parseInt((utils.cutHex(h)).substring(2,4),16)},
  hexToB : function(h) {return parseInt((utils.cutHex(h)).substring(4,6),16)},
  cutHex : function(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h},
  rgb2hex : function(red, green, blue) {
      var rgb = blue | (green << 8) | (red << 16);
      return '#' + (0x1000000 + rgb).toString(16).slice(1)
  },

  transformToColor : function(propertie) {
    let colorObj;
    if(propertie[0] === "#") {
      colorObj = {
        r : utils.hexToR(propertie),
        g : utils.hexToG(propertie),
        b : utils.hexToB(propertie),
        a : 1
      }
    } else {
      let par = typeof propertie === "string" ? propertie.indexOf("\(") : -1;
      if(par >= 0) {
        propertie = propertie.slice(par+1,propertie.length-1);
      }
      let rgba = typeof propertie === "string" ? propertie.split(",") : [0,0,0,0];
      colorObj = {
        r : parseInt(rgba[0]),
        g : parseInt(rgba[1]),
        b : parseInt(rgba[2]),
        a : parseFloat(rgba[3] || 1)
      }
    }
    return colorObj;
  },
  toCamelCase : function(str) {
    return str
        .replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
        .replace(/\s/g, '')
        .replace(/^(.)/, function($1) { return $1.toLowerCase(); });
  }

};

module.exports = utils;
