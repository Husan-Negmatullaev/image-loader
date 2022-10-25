// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/watermarkjs/dist/watermark.js":[function(require,module,exports) {
var define;
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["watermark"] = factory();
	else
		root["watermark"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1).default;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var style_image_namespaceObject = {};
__webpack_require__.r(style_image_namespaceObject);
__webpack_require__.d(style_image_namespaceObject, "atPos", function() { return atPos; });
__webpack_require__.d(style_image_namespaceObject, "lowerRight", function() { return lowerRight; });
__webpack_require__.d(style_image_namespaceObject, "upperRight", function() { return upperRight; });
__webpack_require__.d(style_image_namespaceObject, "lowerLeft", function() { return lowerLeft; });
__webpack_require__.d(style_image_namespaceObject, "upperLeft", function() { return upperLeft; });
__webpack_require__.d(style_image_namespaceObject, "center", function() { return center; });
var text_namespaceObject = {};
__webpack_require__.r(text_namespaceObject);
__webpack_require__.d(text_namespaceObject, "atPos", function() { return text_atPos; });
__webpack_require__.d(text_namespaceObject, "lowerRight", function() { return text_lowerRight; });
__webpack_require__.d(text_namespaceObject, "lowerLeft", function() { return text_lowerLeft; });
__webpack_require__.d(text_namespaceObject, "upperRight", function() { return text_upperRight; });
__webpack_require__.d(text_namespaceObject, "upperLeft", function() { return text_upperLeft; });
__webpack_require__.d(text_namespaceObject, "center", function() { return text_center; });

// CONCATENATED MODULE: ./lib/functions/index.js
/**
 * Return a function that executes a sequence of functions from left to right,
 * passing the result of a previous operation to the next
 *
 * @param {...funcs}
 * @return {Function}
 */
function sequence() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  return function (value) {
    return funcs.reduce(function (val, fn) {
      return fn.call(null, val);
    }, value);
  };
}
/**
 * Return the argument passed to it
 *
 * @param {Mixed} x
 * @return {Mixed}
 */

function identity(x) {
  return x;
}
// CONCATENATED MODULE: ./lib/image/index.js
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }


/**
 * Set the src of an image object and call the resolve function
 * once it has loaded
 *
 * @param {Image} img
 * @param {String} src
 * @param {Function} resolve
 */

function setAndResolve(img, src, resolve) {
  img.onload = function () {
    return resolve(img);
  };

  img.src = src;
}
/**
 * Given a resource, return an appropriate loading function for it's type
 *
 * @param {String|File|Image} resource
 * @return {Function}
 */


function getLoader(resource) {
  var type = _typeof(resource);

  if (type === 'string') {
    return loadUrl;
  }

  if (resource instanceof Image) {
    return identity;
  }

  return loadFile;
}
/**
 * Used for loading image resources asynchronously and maintaining
 * the supplied order of arguments
 *
 * @param {Array} resources - a mixed array of urls, File objects, or Image objects
 * @param {Function} init - called at the beginning of resource initialization
 * @return {Promise}
 */

function image_load(resources, init) {
  var promises = [];

  for (var i = 0; i < resources.length; i++) {
    var resource = resources[i];
    var loader = getLoader(resource);
    var promise = loader(resource, init);
    promises.push(promise);
  }

  return Promise.all(promises);
}
/**
 * Load an image by its url
 *
 * @param {String} url
 * @param {Function} init - an optional image initializer
 * @return {Promise}
 */

function loadUrl(url, init) {
  var img = new Image();
  typeof init === 'function' && init(img);
  return new Promise(function (resolve) {
    img.onload = function () {
      return resolve(img);
    };

    img.src = url;
  });
}
/**
 * Return a collection of images from an
 * array of File objects
 *
 * @param {File} file
 * @return {Promise}
 */

function loadFile(file) {
  var reader = new FileReader();
  return new Promise(function (resolve) {
    var img = new Image();

    reader.onloadend = function () {
      return setAndResolve(img, reader.result, resolve);
    };

    reader.readAsDataURL(file);
  });
}
/**
 * Create a new image, optionally configuring it's onload behavior
 *
 * @param {String} url
 * @param {Function} onload
 * @return {Image}
 */

function createImage(url, onload) {
  var img = new Image();

  if (typeof onload === 'function') {
    img.onload = onload;
  }

  img.src = url;
  return img;
}
/**
 * Draw an image to a canvas element
 *
 * @param {Image} img
 * @param {HTMLCanvasElement} canvas
 * @return {HTMLCanvasElement}
 */

function drawImage(img, canvas) {
  var ctx = canvas.getContext('2d');
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
  return canvas;
}
/**
 * Convert an Image object to a canvas
 *
 * @param {Image} img
 * @param {CanvasPool} pool
 * @return {HTMLCanvasElement}
 */


function imageToCanvas(img, pool) {
  var canvas = pool.pop();
  return drawImage(img, canvas);
}
/**
 * Convert an array of image objects
 * to canvas elements
 *
 * @param {Array} images
 * @param {CanvasPool} pool
 * @return {HTMLCanvasElement[]}
 */

function mapToCanvas(images, pool) {
  return images.map(function (img) {
    return imageToCanvas(img, pool);
  });
}
// CONCATENATED MODULE: ./lib/canvas/index.js
/**
 * Get the data url of a canvas
 *
 * @param {HTMLCanvasElement}
 * @param {Paramters} Specifications according to HTMLCanvasElement.toDataURL() Documentation
 * @return {String}
 */
function canvas_dataUrl(canvas) {
  var parameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    type: 'image/png',
    encoderOptions: 0.92
  };
  return canvas.toDataURL(parameters.type, parameters.encoderOptions);
}
// CONCATENATED MODULE: ./lib/blob/index.js

var url = /^data:([^;]+);base64,(.*)$/;
/**
 * Split a data url into a content type and raw data
 *
 * @param {String} dataUrl
 * @return {Array}
 */

function split(dataUrl) {
  return url.exec(dataUrl).slice(1);
}
/**
 * Decode a base64 string
 *
 * @param {String} base64
 * @return {String}
 */

function decode(base64) {
  return window.atob(base64);
}
/**
 * Return a string of raw data as a Uint8Array
 *
 * @param {String} data
 * @return {UInt8Array}
 */

function uint8(data) {
  var length = data.length;
  var uints = new Uint8Array(length);

  for (var i = 0; i < length; i++) {
    uints[i] = data.charCodeAt(i);
  }

  return uints;
}
/**
 * Turns a data url into a blob object
 *
 * @param {String} dataUrl
 * @return {Blob}
 */

var blob_blob = sequence(split, function (parts) {
  return [decode(parts[1]), parts[0]];
}, function (blob) {
  return new Blob([uint8(blob[0])], {
    type: blob[1]
  });
});
// CONCATENATED MODULE: ./lib/style/image/index.js
/**
 * Return a function for positioning a watermark on a target canvas
 *
 * @param {Function} xFn - a function to determine an x value
 * @param {Function} yFn - a function to determine a y value
 * @param {Number} alpha
 * @return {Function}
 */
function atPos(xFn, yFn, alpha) {
  alpha || (alpha = 1.0);
  return function (target, watermark) {
    var context = target.getContext('2d');
    context.save();
    context.globalAlpha = alpha;
    context.drawImage(watermark, xFn(target, watermark), yFn(target, watermark));
    context.restore();
    return target;
  };
}
/**
 * Place the watermark in the lower right corner of the target
 * image
 *
 * @param {Number} alpha
 * @return {Function}
 */

function lowerRight(alpha) {
  return atPos(function (target, mark) {
    return target.width - (mark.width + 10);
  }, function (target, mark) {
    return target.height - (mark.height + 10);
  }, alpha);
}
/**
 * Place the watermark in the upper right corner of the target
 * image
 *
 * @param {Number} alpha
 * @return {Function}
 */

function upperRight(alpha) {
  return atPos(function (target, mark) {
    return target.width - (mark.width + 10);
  }, function (target, mark) {
    return 10;
  }, alpha);
}
/**
 * Place the watermark in the lower left corner of the target
 * image
 *
 * @param {Number} alpha
 * @return {Function}
 */

function lowerLeft(alpha) {
  return atPos(function (target, mark) {
    return 10;
  }, function (target, mark) {
    return target.height - (mark.height + 10);
  }, alpha);
}
/**
 * Place the watermark in the upper left corner of the target
 * image
 *
 * @param {Number} alpha
 * @return {Function}
 */

function upperLeft(alpha) {
  return atPos(function (target, mark) {
    return 10;
  }, function (target, mark) {
    return 10;
  }, alpha);
}
/**
 * Place the watermark in the center of the target
 * image
 *
 * @param {Number} alpha
 * @return {Function}
 */

function center(alpha) {
  return atPos(function (target, mark) {
    return (target.width - mark.width) / 2;
  }, function (target, mark) {
    return (target.height - mark.height) / 2;
  }, alpha);
}
// CONCATENATED MODULE: ./lib/style/text/index.js
/**
 * Return a function for positioning a watermark on a target canvas
 *
 * @param {Function} xFn - a function to determine an x value
 * @param {Function} yFn - a function to determine a y value
 * @param {String} text - the text to write
 * @param {String} font - same as the CSS font property
 * @param {String} fillStyle
 * @param {Number} alpha
 * @return {Function}
 */
function text_atPos(xFn, yFn, text, font, fillStyle, alpha) {
  alpha || (alpha = 1.0);
  return function (target) {
    var context = target.getContext('2d');
    context.save();
    context.globalAlpha = alpha;
    context.fillStyle = fillStyle;
    context.font = font;
    var metrics = context.measureText(text);
    context.fillText(text, xFn(target, metrics, context), yFn(target, metrics, context));
    context.restore();
    return target;
  };
}
/**
 * Write text to the lower right corner of the target canvas
 *
 * @param {String} text - the text to write
 * @param {String} font - same as the CSS font property
 * @param {String} fillStyle
 * @param {Number} alpha - control text transparency
 * @param {Number} y - height in text metrics is not very well supported. This is a manual value
 * @return {Function}
 */

function text_lowerRight(text, font, fillStyle, alpha, y) {
  return text_atPos(function (target, metrics) {
    return target.width - (metrics.width + 10);
  }, function (target) {
    return y || target.height - 10;
  }, text, font, fillStyle, alpha);
}
/**
 * Write text to the lower left corner of the target canvas
 *
 * @param {String} text - the text to write
 * @param {String} font - same as the CSS font property
 * @param {String} fillStyle
 * @param {Number} alpha - control text transparency
 * @param {Number} y - height in text metrics is not very well supported. This is a manual value
 * @return {Function}
 */

function text_lowerLeft(text, font, fillStyle, alpha, y) {
  return text_atPos(function () {
    return 10;
  }, function (target) {
    return y || target.height - 10;
  }, text, font, fillStyle, alpha);
}
/**
 * Write text to the upper right corner of the target canvas
 *
 * @param {String} text - the text to write
 * @param {String} font - same as the CSS font property
 * @param {String} fillStyle
 * @param {Number} alpha - control text transparency
 * @param {Number} y - height in text metrics is not very well supported. This is a manual value
 * @return {Function}
 */

function text_upperRight(text, font, fillStyle, alpha, y) {
  return text_atPos(function (target, metrics) {
    return target.width - (metrics.width + 10);
  }, function () {
    return y || 20;
  }, text, font, fillStyle, alpha);
}
/**
 * Write text to the upper left corner of the target canvas
 *
 * @param {String} text - the text to write
 * @param {String} font - same as the CSS font property
 * @param {String} fillStyle
 * @param {Number} alpha - control text transparency
 * @param {Number} y - height in text metrics is not very well supported. This is a manual value
 * @return {Function}
 */

function text_upperLeft(text, font, fillStyle, alpha, y) {
  return text_atPos(function () {
    return 10;
  }, function () {
    return y || 20;
  }, text, font, fillStyle, alpha);
}
/**
 * Write text to the center of the target canvas
 *
 * @param {String} text - the text to write
 * @param {String} font - same as the CSS font property
 * @param {String} fillStyle
 * @param {Number} alpha - control text transparency
 * @param {Number} y - height in text metrics is not very well supported. This is a manual value
 * @return {Function}
 */

function text_center(text, font, fillStyle, alpha, y) {
  return text_atPos(function (target, metrics, ctx) {
    ctx.textAlign = 'center';
    return target.width / 2;
  }, function (target, metrics, ctx) {
    ctx.textBaseline = 'middle';
    return target.height / 2;
  }, text, font, fillStyle, alpha);
}
// CONCATENATED MODULE: ./lib/style/index.js


/**
 * @typedef {Object} DrawResult
 * @property {HTMLCanvasElement} canvas - the end result of a draw
 * @property {HTMLCanvasElement[]} sources - the sources used in the draw
 */

var style_image = style_image_namespaceObject;
var style_text = text_namespaceObject;
/**
 * Create a DrawResult by apply a list of canvas elements to a draw function
 *
 * @param {Function} draw - the draw function used to create a DrawResult
 * @param {HTMLCanvasElement} sources - the canvases used by the draw function
 * @return {DrawResult}
 */

function style_result(draw, sources) {
  var canvas = draw.apply(null, sources);
  return {
    canvas: canvas,
    sources: sources
  };
}
// CONCATENATED MODULE: ./lib/object/index.js
/**
 * Extend one object with the properties of another
 *
 * @param {Object} first
 * @param {Object} second
 * @return {Object}
 */
function extend(first, second) {
  var secondKeys = Object.keys(second);
  secondKeys.forEach(function (key) {
    return first[key] = second[key];
  });
  return first;
}
/**
 * Create a shallow copy of the object
 *
 * @param {Object} obj
 * @return {Object}
 */

function clone(obj) {
  return extend({}, obj);
}
// CONCATENATED MODULE: ./lib/canvas/pool.js
/**
 * An immutable canvas pool allowing more efficient use of canvas resources
 *
 * @typedef {Object} CanvasPool
 * @property {Function} pop - return a promise that will evaluate to a canvas
 * @property {Number} length - the number of available canvas elements
 * @property {HTMLCanvasElement[]} elements - the canvas elements used by the pool
 * @property {Function} clear - empty the pool of canvas elements
 * @property {Function} release - free a pool up for release and return the data url
 */

/**
 * Create a CanvasPool with the given size
 *
 * @param {Number} size
 * @param {HTMLCanvasElement[]} elements
 * @param {EventEmitter} eventEmitter
 * @return {CanvasPool}
 */
function CanvasPool() {
  var canvases = [];
  return {
    /**
     * Get the next available canvas from the pool
     *
     * @return {HTMLCanvasElement}
     */
    pop: function pop() {
      if (this.length === 0) {
        canvases.push(document.createElement('canvas'));
      }

      return canvases.pop();
    },

    /**
     * Return the number of available canvas elements in the pool
     *
     * @return {Number}
     */
    get length() {
      return canvases.length;
    },

    /**
     * Return a canvas to the pool. This function will clear the canvas for reuse
     *
     * @param {HTMLCanvasElement} canvas
     * @return {String}
     */
    release: function release(canvas) {
      var context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
      canvases.push(canvas);
    },

    /**
     * Empty the pool, destroying any references to canvas objects
     */
    clear: function clear() {
      canvases.splice(0, canvases.length);
    },

    /**
     * Return the collection of canvases in the pool
     *
     * @return {HTMLCanvasElement[]}
     */
    get elements() {
      return canvases;
    }

  };
}
var shared = CanvasPool();
/* harmony default export */ var canvas_pool = (shared);
// CONCATENATED MODULE: ./lib/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return watermark; });






/**
 * A configuration type for the watermark function
 *
 * @typedef {Object} Options
 * @property {Function} init - an initialization function that is given Image objects before loading (only applies if resources is a collection of urls)
 * @property {ImageFormat} type - specify the image format to be used when retrieving result (only supports "image/png" or "image/jpeg", default "image/png")
 * @property {Number} encoderOptions - specify the image compression quality from 0 to 1 (default 0.92)
 * @property {Number} poolSize - number of canvas elements available for drawing,
 * @property {CanvasPool} pool - the pool used. If provided, poolSize will be ignored
 */

/**
 * @constant
 * @type {Options}
 */

var defaults = {
  init: function init() {},
  type: 'image/png',
  encoderOptions: 0.92
};
/**
 * Merge the given options with the defaults
 *
 * @param {Options} options
 * @return {Options}
 */

function mergeOptions(options) {
  return extend(clone(defaults), options);
}
/**
 * Release canvases from a draw result for reuse. Returns
 * the dataURL from the result's canvas
 *
 * @param {DrawResult} result
 * @param {CanvasPool} pool
 * @return  {String}
 */


function release(result, pool, parameters) {
  var canvas = result.canvas,
      sources = result.sources;
  var dataURL = canvas_dataUrl(canvas, parameters);
  sources.forEach(pool.release);
  return dataURL;
}
/**
 * Return a watermark object
 *
 *
 * @param {Array} resources - a collection of urls, File objects, or Image objects
 * @param {Options} options - a configuration object for watermark
 * @param {Promise} promise - optional
 * @return {Object}
 */


function watermark(resources) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var promise = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var opts = mergeOptions(options);
  promise || (promise = image_load(resources, opts.init));
  return {
    /**
     * Convert the watermarked image into a dataUrl. The draw
     * function is given all images as canvas elements in order
     *
     * @param {Function} draw
     * @return {Object}
     */
    dataUrl: function dataUrl(draw) {
      var promise = this.then(function (images) {
        return mapToCanvas(images, canvas_pool);
      }).then(function (canvases) {
        return style_result(draw, canvases);
      }).then(function (result) {
        return release(result, canvas_pool, {
          type: opts.type,
          encoderOptions: opts.encoderOptions
        });
      });
      return watermark(resources, opts, promise);
    },

    /**
     * Load additional resources
     *
     * @param {Array} resources - a collection of urls, File objects, or Image objects
     * @param {Function} init - an initialization function that is given Image objects before loading (only applies if resources is a collection of urls)
     * @return {Object}
     */
    load: function load(resources, init) {
      var promise = this.then(function (resource) {
        return image_load([resource].concat(resources), init);
      });
      return watermark(resources, opts, promise);
    },

    /**
     * Render the current state of the watermarked image. Useful for performing
     * actions after the watermark has been applied
     *
     * @return {Object}
     */
    render: function render() {
      var promise = this.then(function (resource) {
        return image_load([resource]);
      });
      return watermark(resources, opts, promise);
    },

    /**
     * Convert the watermark into a blob
     *
     * @param {Function} draw
     * @return {Object}
     */
    blob: function blob(draw) {
      var promise = this.dataUrl(draw).then(blob_blob);
      return watermark(resources, opts, promise);
    },

    /**
     * Convert the watermark into an image using the given draw function
     *
     * @param {Function} draw
     * @return {Object}
     */
    image: function image(draw) {
      var promise = this.dataUrl(draw).then(createImage);
      return watermark(resources, opts, promise);
    },

    /**
     * Delegate to the watermark promise
     *
     * @return {Promise}
     */
    then: function then() {
      for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
        funcs[_key] = arguments[_key];
      }

      return promise.then.apply(promise, funcs);
    }
  };
}
;
/**
 * Style functions
 */

watermark.image = style_image;
watermark.text = style_text;
/**
 * Clean up all canvas references
 */

watermark.destroy = function () {
  return canvas_pool.clear();
};

/***/ })
/******/ ]);
});
},{}],"upload.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upload = upload;

var _watermarkjs = _interopRequireDefault(require("watermarkjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function bytesToSize(bytes) {
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (!bytes) return "0 Bytes";
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i)) + " " + sizes[i];
}

function upload(selector) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var files = [];
  var input = document.querySelector(selector);
  var wrapperPreview = document.createElement("div");
  wrapperPreview.className = "wrapper-preview";
  var openButton = document.createElement("button");
  openButton.className = "btn";
  openButton.textContent = "Открыть";

  if (options.multi) {
    input.setAttribute("multiple", true);
  }

  if (options.accept && Array.isArray(options.accept)) {
    input.setAttribute("accept", options.accept.join(","));
  }

  input.insertAdjacentElement("afterend", wrapperPreview);
  input.insertAdjacentElement("afterend", openButton);

  var inputTrigger = function inputTrigger() {
    return input.click();
  };

  var changeTrigger = function changeTrigger(event) {
    if (!event.target.files.length) return;
    files = Array.from(event.target.files); // wrapperPreview.innerHTML = '';

    files.forEach(function (file, index) {
      if (!file.type.match("image")) return;
      var reader = new FileReader();

      reader.onload = function (ev) {
        var src = ev.target.result; // console.log(ev.target.result);
        // wrapperPreview.insertAdjacentHTML("afterbegin", `
        //     <div class="wrapper-preview__image">
        //         <div class="wrapper-preview__remove" data-name="${file.name}">&times;</div>
        //         <!-- <img src="${src}" alt="${file.name}" class="wrapper-preview__source" /> -->
        //         <div class="wrapper-preview__info">
        //             <span class="wrapper-preview__file-name">${file.name}</span>
        //             ${bytesToSize(file.size)}
        //         </div>
        //     </div>
        //     `)
        // console.log(src);
        // console.log(ev);

        (0, _watermarkjs.default)([src, 'small.png']).image(_watermarkjs.default.image.lowerRight(1)).then(function (img) {
          var imagePreview = "\n                            <div class=\"wrapper-preview__image\">\n                                <div class=\"wrapper-preview__remove\" data-name=\"".concat(file.name, "\">&times;</div>\n                                <img src=\"").concat(img.src, "\" alt=\"").concat(file.name, "\" class=\"wrapper-preview__source\" />\n                                <div class=\"wrapper-preview__info\">\n                                   <span class=\"wrapper-preview__file-name\">").concat(file.name, "</span>\n                                    ").concat(bytesToSize(file.size), "\n                                </div>\n                            </div>\n                        ");
          wrapperPreview.insertAdjacentHTML("afterbegin", imagePreview);
        });
      }; // wmark.init({
      //     position: "bottom-left", // default "bottom-right"
      //     opacity: 70, // default 50
      //     className: "wrapper-preview__source", // default "watermark"
      //     path: "./qr.png"
      // });


      reader.readAsDataURL(file);
    });
  };

  function removeImage(event) {
    var tergetItem = event.target;
    if (!tergetItem.dataset.name) return;
    var name = tergetItem.dataset.name;
    files = files.filter(function (file) {
      return file.name !== name;
    });
    var block = wrapperPreview.querySelector("[data-name=\"".concat(name, "\"]")).closest(".wrapper-preview__image");
    block.classList.add("_removing");
    var inteerval = setInterval(function () {
      block.remove();
      clearInterval(inteerval);
    }, 300);
  }

  wrapperPreview.addEventListener("click", removeImage);
  openButton.addEventListener("click", inputTrigger);
  input.addEventListener("change", changeTrigger);
}
},{"watermarkjs":"node_modules/watermarkjs/dist/watermark.js"}],"app.js":[function(require,module,exports) {
"use strict";

var _upload = require("./upload.js");

(0, _upload.upload)("#file", {
  multi: true,
  accept: ['.png', '.jpg', '.jpeg', '.gif'],
  removeAllIcon: true
});
},{"./upload.js":"upload.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51792" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map