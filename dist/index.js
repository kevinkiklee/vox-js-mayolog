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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _logger = __webpack_require__(1);

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  function loadSampleLogEntries(numberOfEntries) {
    numberOfEntries = numberOfEntries || 1000;
    var oReq = new XMLHttpRequest();
    oReq.addEventListener('load', function () {
      var key = '';
      var words = this.responseText.split('\n');
      for (var i = 0; i < numberOfEntries; i++) {
        var log = [];
        var data = {};
        var wordCount = Math.max(Math.floor(Math.random() * 30), 5);
        for (var j = 0; j < wordCount; j++) {
          log.push(words[Math.floor(Math.random() * words.length)]);
          if (Math.random() > 0.8) {
            key = words[Math.floor(Math.random() * words.length)];
            data[key] = Math.random() > 0.5 ? Math.random() : key;
          }
        }
        MayoLog.log(log.join(' '), data);
      }

      MayoLog.toConsole();
      MayoLog.findWithDataAttribute(key);
      MayoLog.sendToServer('http://httpbin.org/post');
    });
    oReq.open('GET', 'https://gist.githubusercontent.com/banderson623/87f8c70cdc7ae900cd268299e4807c87/raw/f3412dcadb4ad69e664f7f8f26210589b86ea113/positive-words.txt');
    oReq.send();
  }

  var MayoLog = new _logger2.default();
  loadSampleLogEntries(5);
}); /* eslint-disable */

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable no-console */


var _chancify = __webpack_require__(2);

var _chancify2 = _interopRequireDefault(_chancify);

var _hasKey = __webpack_require__(3);

var _hasKey2 = _interopRequireDefault(_hasKey);

var _makeXHR = __webpack_require__(4);

var _makeXHR2 = _interopRequireDefault(_makeXHR);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Logger = function () {
  function Logger() {
    _classCallCheck(this, Logger);

    this.startTime = new Date();
    this.logEntries = [];
  }

  _createClass(Logger, [{
    key: 'log',
    value: function log() {
      var _log = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Unknown entry';

      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var time = new Date() - this.startTime;
      var logEntry = { time: time, log: _log, data: data };

      this.logEntries.push(logEntry);
      return logEntry;
    }
  }, {
    key: 'toConsole',
    value: function toConsole() {
      var logEntries = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.logEntries;

      var parsedLogEntries = this.parseLogEntries(logEntries);

      this.printHeader('=-=-=-=-= Logger! =-=-=-=-=');
      this.printToConsole(parsedLogEntries);
      return parsedLogEntries;
    }
  }, {
    key: 'findWithDataAttribute',
    value: function findWithDataAttribute() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      var filteredEntries = this.logEntries.filter(function (_ref) {
        var data = _ref.data;
        return (0, _hasKey2.default)(data, key);
      });
      var parsedLogEntries = this.parseLogEntries(filteredEntries);

      this.printHeader('=-=-=- Search Result -=-=-=');
      this.printToConsole(parsedLogEntries);
      return filteredEntries;
    }
  }, {
    key: 'sendToServer',
    value: function sendToServer() {
      var _this = this;

      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      var sendLog = (0, _chancify2.default)(_makeXHR2.default, 0.5);
      var options = {
        type: 'POST',
        url: url,
        data: this.logEntries,
        success: function success() {
          return _this.printHeader('=-=-=- Log Submitted -=-=-=', 'lightgreen');
        },
        error: function error() {
          return _this.printHeader('=-=-=- Submit Failed -=-=-=', 'red');
        }
      };

      sendLog(options);
    }
  }, {
    key: 'parseLogEntries',
    value: function parseLogEntries() {
      var logEntries = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      return logEntries.map(function (_ref2, index) {
        var time = _ref2.time,
            log = _ref2.log,
            data = _ref2.data;
        return '[' + (index + 1) + '] (' + time + 'ms) ' + log + ' ' + JSON.stringify(data);
      });
    }
  }, {
    key: 'printToConsole',
    value: function printToConsole() {
      var parsedLogEntries = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      parsedLogEntries.forEach(function (logEntry) {
        return console.log(logEntry);
      });
    }
  }, {
    key: 'printHeader',
    value: function printHeader() {
      var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'cyan';

      console.log('%c' + text, 'color: ' + color);
    }
  }]);

  return Logger;
}();

exports.default = Logger;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function chancify(n,c){return function(){Math.random()<=c&&n.apply(void 0,arguments)}}module.exports=chancify;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var hasKey = function hasKey(object, targetKey) {
  if (object.length === 0) {
    return false;
  }

  var keys = Object.keys(object);

  if (keys.includes(targetKey)) {
    return true;
  }

  var children = keys.reduce(function (objects, key) {
    if (_typeof(object[key]) === 'object') {
      objects.push(object[key]);
    }

    return objects;
  }, []);

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var child = _step.value;

      if (hasKey(child, targetKey)) {
        return true;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return false;
};

exports.default = hasKey;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/* eslint-disable no-undef, no-console */
var makeXHR = function makeXHR() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var defaults = {
    type: 'GET',
    url: 'http://httbin.org/get',
    data: {},
    success: function success() {},
    error: function error() {}
  };

  var _defaults$options = _extends({}, defaults, options),
      type = _defaults$options.type,
      url = _defaults$options.url,
      data = _defaults$options.data,
      success = _defaults$options.success,
      error = _defaults$options.error;

  var xhr = new XMLHttpRequest();
  xhr.open(type, url, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        success();
      } else {
        error();
      }
    }
  };

  xhr.send(JSON.stringify(data));
};

exports.default = makeXHR;

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map