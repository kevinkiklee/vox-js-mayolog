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


var _chancify = __webpack_require__(3);

var _chancify2 = _interopRequireDefault(_chancify);

var _hasKey = __webpack_require__(4);

var _hasKey2 = _interopRequireDefault(_hasKey);

var _makeXHR = __webpack_require__(7);

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
      this.logEntries.push({ time: time, log: _log, data: data });
    }
  }, {
    key: 'toConsole',
    value: function toConsole() {
      var logEntries = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.logEntries;
      var isSearch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var logOutput = this.buildLogOutput(logEntries);
      this.printToConsole(logOutput, isSearch);
      return logOutput;
    }
  }, {
    key: 'findWithDataAttribute',
    value: function findWithDataAttribute() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      var logEntries = [];

      this.logEntries.forEach(function (logEntry) {
        if ((0, _hasKey2.default)(logEntry.data, key)) {
          logEntries.push(logEntry);
        }
      });

      this.toConsole(logEntries, true);
      return logEntries;
    }
  }, {
    key: 'sendToServer',
    value: function sendToServer(url) {
      var _this = this;

      var sendLog = (0, _chancify2.default)(_makeXHR2.default, 0.5);

      var params = {
        type: 'POST',
        url: url,
        data: this.logEntries,
        callback: function callback() {
          return _this.colorPrint('=-=-=- Log Submitted -=-=-=', 'lightgreen');
        }
      };

      sendLog(params);
    }
  }, {
    key: 'buildLogOutput',
    value: function buildLogOutput() {
      var logEntries = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      return logEntries.map(function (_ref, index) {
        var time = _ref.time,
            log = _ref.log,
            data = _ref.data;
        return '[' + (index + 1) + '] (' + time + 'ms) ' + log + ' ' + JSON.stringify(data);
      });
    }
  }, {
    key: 'printToConsole',
    value: function printToConsole() {
      var logOutput = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var isSearch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (isSearch) {
        this.colorPrint('=-=-=- Search Result -=-=-=');
      } else {
        this.colorPrint('=-=-=-=-= Logger! =-=-=-=-=');
      }

      logOutput.forEach(function (line) {
        return console.log(line);
      });
    }
  }, {
    key: 'colorPrint',
    value: function colorPrint() {
      var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'cyan';

      console.log('%c' + text, 'color: ' + color);
    }
  }]);

  return Logger;
}();

exports.default = Logger;

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function chancify(n,c){return function(){Math.random()<=c&&n.apply(void 0,arguments)}}module.exports=chancify;


/***/ }),
/* 4 */
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

  var children = [];

  keys.forEach(function (key) {
    if (_typeof(object[key]) === 'object') {
      children.push(object[key]);
    }
  });

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var child = _step.value;

      return hasKey(child, targetKey);
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
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable no-undef, no-console */
var makeXHR = function makeXHR() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var defaults = {
    type: 'GET',
    url: 'http://httbin.org/get',
    data: {},
    callback: function callback() {}
  };

  var _Object$assign = Object.assign({}, defaults, params),
      type = _Object$assign.type,
      url = _Object$assign.url,
      data = _Object$assign.data,
      callback = _Object$assign.callback;

  var xhr = new XMLHttpRequest();
  xhr.open(type, url, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      callback();
    }
  };

  xhr.send(JSON.stringify(data));
};

exports.default = makeXHR;

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map