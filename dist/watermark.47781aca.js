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
})({"watermark.js":[function(require,module,exports) {
/**
 * watermark-js V0.2 by Carlos Cabo 2016
 * https://github.com/carloscabo/watermark-js
 */
// data URI - MDN https://developer.mozilla.org/en-US/docs/data_URIs
// The "data" URL scheme: http://tools.ietf.org/html/rfc2397
// Valid URL Characters: http://tools.ietf.org/html/rfc2396#section2
// Positions
// left top -> 0, 0
// left center -> 0, 0.5
// left bottom -> 0, 1
// right top -> 1, 0
// right center -> 1, 0.5
// right bottom -> 1, 1
// center top -> 0.5, 0
// center center -> 0.5, 0.5
// center bottom -> 0.5, 1
var Watermark = function () {
  function Constructor(user_settings) {
    this.version = 0.1; // Internal data

    this.data = {
      picture: {
        sizes: null
      },
      // Source picture
      results: [],
      // Resulting watermarker images
      watermarks: [],
      // Watermarks to be applied
      pending_watermarks: 0,
      callback: null
    }; // Default settings

    this.settings = {};
    $.extend(true, this.settings, user_settings);
  }

  Constructor.prototype = {
    // Sets base pìcture to work with
    setPicture: function setPicture(url_or_data, sizes) {
      var _t = this.data;
      _t.picture.url = this.addAntiCacheParam(url_or_data);
      if (typeof sizes !== 'undefined') _t.picture.sizes = sizes;
      return this; // Chainning
    },
    // setPicture
    // Adds a watermark element that will be rendered ove the base picture
    // when the .render() methos is called
    addWatermark: function addWatermark(url_or_data, user_options) {
      var _t = this,
          wm = {},
          default_options = {
        position: [0.5, 0.5],
        scale: 1.0,
        opacity: 1.0
      };

      _t.data.pending_watermarks++;
      wm.url = _t.addAntiCacheParam(url_or_data);
      wm.options = $.extend(default_options, user_options);

      _t.data.watermarks.push(wm);

      return this;
    },
    // Clear watermark configurations and results
    // in case you want to make a fresh watermark
    clearWatermarks: function clearWatermarks() {
      var _t = this;

      _t.data.pending_watermarks = 0;
      _t.data.watermarks.length = 0; // faster than = []

      _t.data.results.length = 0; // faster than = []
    },
    // Creates a canvas an return an object with
    // .canvas and .ctx (context)
    createCanvas: function createCanvas(img, sx, sy, sw, sh, dx, dy, dw, dh) {
      var objs = {};
      objs.canvas = document.createElement('canvas');
      objs.canvas.width = dw;
      objs.canvas.height = dh;
      objs.ctx = objs.canvas.getContext('2d');
      objs.ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
      return objs;
    },
    // createCanvas
    // Starts the process of creating the base picture canvas and thumbs
    // Once done it renders the watermarks over the pictures
    // Finally launches the callback function
    render: function render(callback) {
      var _t = this,
          $img = $('<img>');

      _t.data.callback = callback; // The crossOrigin attribute is a CORS settings attribute.
      // Its purpose is to allow images from third-party sites that allow
      // cross-origin access to be used with canvas.
      // Remember enabled cross-origin access in the third-party site,
      // for example if you are using amazon S3 for storage:
      // http://docs.aws.amazon.com/AmazonS3/latest/dev/cors.html#how-do-i-enable-cors

      $img[0].crossOrigin = "Anonymous";
      $img.on('load', function () {
        console.log('Source picture loaded');

        var img = this,
            // Exact copy of picture
        picture = _t.createCanvas(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height); // picture.pos = _t.calculatePositions( img.width, img.height );


        _t.data.results.push(picture); // $('body').append( picture.canvas );
        // Create thumbs


        if (_t.data.picture.sizes !== null) {
          for (var i = 0; i < _t.data.picture.sizes.length; i++) {
            var w = _t.data.picture.sizes[i],
                h = parseInt(img.height / img.width * w, 10);
            picture = _t.createCanvas(img, 0, 0, img.width, img.height, 0, 0, w, h);

            _t.data.results.push(picture); // $('body').append( picture.canvas );
            // console.log(_t.data.watermarks);
            // console.log(w, h);

          }
        }

        _t.renderWatermarks();
      }).attr('src', _t.data.picture.url);
    },
    renderWatermarks: function renderWatermarks() {
      var _t = this;

      for (var i = 0; i < _t.data.watermarks.length; i++) {
        var wm = _t.data.watermarks[i],
            $img = $('<img>'); // The crossOrigin attribute is a CORS settings attribute.
        // Its purpose is to allow images from third-party sites that allow
        // cross-origin access to be used with canvas.
        // Remember enabled cross-origin access in the third-party site,
        // for example if you are using amazon S3 for storage:
        // http://docs.aws.amazon.com/AmazonS3/latest/dev/cors.html#how-do-i-enable-cors

        $img[0].crossOrigin = "Anonymous";
        $img.on('load', function () {
          var wm_img = this,
              wm_obj = _t.createCanvas(wm_img, 0, 0, wm_img.width, wm_img.height, 0, 0, wm_img.width, wm_img.height),
              options = $(this).data('options'),
              scale = options.scale,
              position = options.position,
              w = wm_img.width * scale,
              h = wm_img.height * scale; // $('body').append( wm_obj.canvas );


          for (var j = 0; j < _t.data.results.length; j++) {
            // _t.data.results[j];
            _t.data.results[j].ctx.globalAlpha = options.opacity;

            _t.data.results[j].ctx.drawImage(wm_obj.canvas, (_t.data.results[j].canvas.width - w) * position[0], (_t.data.results[j].canvas.height - h) * position[1], w, h); // $('body').append( _t.data.results[j].canvas );

          }

          _t.data.pending_watermarks--;

          if (_t.data.pending_watermarks === 0) {
            _t.data.callback();
          }
        }).data('options', wm.options).attr('src', wm.url);
      }
    },
    // Returns array of <canvas> elements
    getCanvas: function getCanvas() {
      var _t = this.data.results,
          canvas = [];

      for (var i = 0; i < _t.length; i++) {
        canvas.push(_t[i].canvas);
      }

      return canvas;
    },
    // Returns array of data_urls
    getDataUrls: function getDataUrls(filetype, quality) {
      if (typeof filetype === 'undefined') filetype = 'image/png';
      if (typeof quality === 'undefined') quality = 1.0;
      var data_urls = [],
          canvas = this.getCanvas();

      for (var i = 0; i < canvas.length; i++) {
        data_urls.push(canvas[i].toDataURL(filetype, quality));
      }

      return data_urls;
    },
    // Returns array of <img> elements
    getImgs: function getImgs(filetype, quality) {
      if (typeof filetype === 'undefined') filetype = 'image/png';
      if (typeof quality === 'undefined') quality = 1.0;
      var imgs = [],
          canvas = this.getCanvas();

      for (var i = 0; i < canvas.length; i++) {
        var $img = $('<img>');
        imgs.push($img.attr('src', canvas[i].toDataURL(filetype, quality)));
      }

      return imgs;
    },
    // Utils
    getDataUrlFromImg: function getDataUrlFromImg(img) {
      var canvas = document.createElement('canvas'); // If is JQuery object get DOM element

      if (img instanceof jQuery) img = img[0];
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext('2d').drawImage(img, 0, 0);
      return canvas.toDataURL('image/png');
    },
    // Seems that in some situations loading images from cross-domain resources
    // like S3, even setting CORS correctly gives troubles with the web browser
    // cache. To avoid this will add a timestamp to all the images urls to
    // avoid cache issues
    addAntiCacheParam: function addAntiCacheParam(url_or_data) {
      var is_dataurl_regex = /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i; // Is DataURL, we do nothing

      if (url_or_data.match(is_dataurl_regex)) return url_or_data; // Is a regualar URL, we add a timestamp

      url_or_data += url_or_data.match(/[\?]/g) ? '&' : '?' + 't=' + Date.now();
      return url_or_data;
    }
  };
  return Constructor;
}();
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54082" + '/');

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","watermark.js"], null)
//# sourceMappingURL=/watermark.47781aca.js.map