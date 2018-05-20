/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultimediaObject = undefined;

var _check = __webpack_require__(/*! ./libs/check */ "./src/libs/check.js");

var _check2 = _interopRequireDefault(_check);

var _constructor = __webpack_require__(/*! ./schemas/constructor */ "./src/schemas/constructor.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MultimediaObject = exports.MultimediaObject = function MultimediaObject(config) {
  _classCallCheck(this, MultimediaObject);

  _check2.default.validate(config, _constructor.constructorSchema);

  this.name = config.name;
  this.data = config.data;
};

/***/ }),

/***/ "./src/libs/check.js":
/*!***************************!*\
  !*** ./src/libs/check.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  validate: function validate(input, schema) {
    var _this = this;

    var keys = Object.keys(schema);

    keys.forEach(function () {
      _this.check(input[key], schema[key]);
    });

    return null;
  },
  check: function check(input, source) {
    if (typeof input === 'string') {
      return this.checkString(input, source);
    }
  },
  checkString: function checkString(input, source) {
    if (source instanceof RegExp) {
      return this.logError({
        input: input,
        source: source,
        valid: source.test(input)
      });
    } else {
      return this.logError({
        input: input,
        source: source,
        valid: source === input
      });
    }
  },
  logError: function logError(error) {
    var message = 'ValidationError: ' + error.input + ' must respect ' + error.source;
    if (!error.valid) {
      return new TypeError(message);
    } else {
      return true;
    }
  }
};

/***/ }),

/***/ "./src/schemas/constructor.js":
/*!************************************!*\
  !*** ./src/schemas/constructor.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var constructor = exports.constructor = {
  name: new RegExp("/^[a-zA-Z0-9\-_]$/"),
  data: Object
};

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9saWJzL2NoZWNrLmpzIiwid2VicGFjazovLy8uL3NyYy9zY2hlbWFzL2NvbnN0cnVjdG9yLmpzIl0sIm5hbWVzIjpbIk11bHRpbWVkaWFPYmplY3QiLCJjb25maWciLCJjaGVjayIsInZhbGlkYXRlIiwiY29uc3RydWN0b3JTY2hlbWEiLCJuYW1lIiwiZGF0YSIsImlucHV0Iiwic2NoZW1hIiwia2V5cyIsIk9iamVjdCIsImZvckVhY2giLCJrZXkiLCJzb3VyY2UiLCJjaGVja1N0cmluZyIsIlJlZ0V4cCIsImxvZ0Vycm9yIiwidmFsaWQiLCJ0ZXN0IiwiZXJyb3IiLCJtZXNzYWdlIiwiVHlwZUVycm9yIiwiY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25FQTs7OztBQUVBOzs7Ozs7SUFHYUEsZ0IsV0FBQUEsZ0IsR0FDWCwwQkFBWUMsTUFBWixFQUFvQjtBQUFBOztBQUNsQkMsa0JBQU1DLFFBQU4sQ0FBZUYsTUFBZixFQUF1QkcsOEJBQXZCOztBQUVBLE9BQUtDLElBQUwsR0FBWUosT0FBT0ksSUFBbkI7QUFDQSxPQUFLQyxJQUFMLEdBQVlMLE9BQU9LLElBQW5CO0FBQ0QsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JDWGE7QUFDZEgsVUFEYyxvQkFDTEksS0FESyxFQUNFQyxNQURGLEVBQ1U7QUFBQTs7QUFDdEIsUUFBTUMsT0FBT0MsT0FBT0QsSUFBUCxDQUFZRCxNQUFaLENBQWI7O0FBRUFDLFNBQUtFLE9BQUwsQ0FBYSxZQUFNO0FBQ2pCLFlBQUtULEtBQUwsQ0FBV0ssTUFBTUssR0FBTixDQUFYLEVBQXVCSixPQUFPSSxHQUFQLENBQXZCO0FBQ0QsS0FGRDs7QUFJQSxXQUFPLElBQVA7QUFDRCxHQVRhO0FBVWRWLE9BVmMsaUJBVVJLLEtBVlEsRUFVRE0sTUFWQyxFQVVPO0FBQ25CLFFBQUksT0FBT04sS0FBUCxLQUFpQixRQUFyQixFQUErQjtBQUM3QixhQUFPLEtBQUtPLFdBQUwsQ0FBaUJQLEtBQWpCLEVBQXdCTSxNQUF4QixDQUFQO0FBQ0Q7QUFDRixHQWRhO0FBZWRDLGFBZmMsdUJBZUZQLEtBZkUsRUFlS00sTUFmTCxFQWVhO0FBQ3pCLFFBQUlBLGtCQUFrQkUsTUFBdEIsRUFBOEI7QUFDNUIsYUFBTyxLQUFLQyxRQUFMLENBQWM7QUFDbkJULG9CQURtQjtBQUVuQk0sc0JBRm1CO0FBR25CSSxlQUFPSixPQUFPSyxJQUFQLENBQVlYLEtBQVo7QUFIWSxPQUFkLENBQVA7QUFLRCxLQU5ELE1BTU87QUFDTCxhQUFPLEtBQUtTLFFBQUwsQ0FBYztBQUNuQlQsb0JBRG1CO0FBRW5CTSxzQkFGbUI7QUFHbkJJLGVBQU9KLFdBQVdOO0FBSEMsT0FBZCxDQUFQO0FBS0Q7QUFDRixHQTdCYTtBQThCZFMsVUE5QmMsb0JBOEJMRyxLQTlCSyxFQThCRTtBQUNkLFFBQU1DLGdDQUE4QkQsTUFBTVosS0FBcEMsc0JBQTBEWSxNQUFNTixNQUF0RTtBQUNBLFFBQUksQ0FBQ00sTUFBTUYsS0FBWCxFQUFrQjtBQUNoQixhQUFPLElBQUlJLFNBQUosQ0FBY0QsT0FBZCxDQUFQO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsYUFBTyxJQUFQO0FBQ0Q7QUFDRjtBQXJDYSxDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0FULElBQU1FLG9DQUFjO0FBQ3pCakIsUUFBTSxJQUFJVSxNQUFKLENBQVcsb0JBQVgsQ0FEbUI7QUFFekJULFFBQU1JO0FBRm1CLENBQXBCLEMiLCJmaWxlIjoiTXVsdGltZWRpYU9iamVjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCBjaGVjayBmcm9tICcuL2xpYnMvY2hlY2snO1xuXG5pbXBvcnQgeyBjb25zdHJ1Y3RvclNjaGVtYSB9IGZyb20gJy4vc2NoZW1hcy9jb25zdHJ1Y3Rvcic7XG5cblxuZXhwb3J0IGNsYXNzIE11bHRpbWVkaWFPYmplY3Qge1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICBjaGVjay52YWxpZGF0ZShjb25maWcsIGNvbnN0cnVjdG9yU2NoZW1hKTtcblxuICAgIHRoaXMubmFtZSA9IGNvbmZpZy5uYW1lO1xuICAgIHRoaXMuZGF0YSA9IGNvbmZpZy5kYXRhO1xuICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgKHtcbiAgdmFsaWRhdGUoaW5wdXQsIHNjaGVtYSkge1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhzY2hlbWEpO1xuXG4gICAga2V5cy5mb3JFYWNoKCgpID0+IHtcbiAgICAgIHRoaXMuY2hlY2soaW5wdXRba2V5XSwgc2NoZW1hW2tleV0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG4gIGNoZWNrKGlucHV0LCBzb3VyY2UpIHtcbiAgICBpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHRoaXMuY2hlY2tTdHJpbmcoaW5wdXQsIHNvdXJjZSk7XG4gICAgfVxuICB9LFxuICBjaGVja1N0cmluZyhpbnB1dCwgc291cmNlKSB7XG4gICAgaWYgKHNvdXJjZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgcmV0dXJuIHRoaXMubG9nRXJyb3Ioe1xuICAgICAgICBpbnB1dCxcbiAgICAgICAgc291cmNlLFxuICAgICAgICB2YWxpZDogc291cmNlLnRlc3QoaW5wdXQpLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmxvZ0Vycm9yKHtcbiAgICAgICAgaW5wdXQsXG4gICAgICAgIHNvdXJjZSxcbiAgICAgICAgdmFsaWQ6IHNvdXJjZSA9PT0gaW5wdXQsXG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIGxvZ0Vycm9yKGVycm9yKSB7XG4gICAgY29uc3QgbWVzc2FnZSA9IGBWYWxpZGF0aW9uRXJyb3I6ICR7ZXJyb3IuaW5wdXR9IG11c3QgcmVzcGVjdCAke2Vycm9yLnNvdXJjZX1gO1xuICAgIGlmICghZXJyb3IudmFsaWQpIHtcbiAgICAgIHJldHVybiBuZXcgVHlwZUVycm9yKG1lc3NhZ2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbn0pOyIsImV4cG9ydCBjb25zdCBjb25zdHJ1Y3RvciA9IHtcbiAgbmFtZTogbmV3IFJlZ0V4cChcIi9eW2EtekEtWjAtOVxcLV9dJC9cIiksXG4gIGRhdGE6IE9iamVjdCxcbn07Il0sInNvdXJjZVJvb3QiOiIifQ==