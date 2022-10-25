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
})({"jquery.watermark.min.js":[function(require,module,exports) {
/*  @preserve
 *  Project: jQuery plugin Watermark
 *  Description: Add watermark on images use HTML5 and Javascript.
 *  Author: Zzbaivong (devs.forumvi.com)
 *  Version: 1.0.2
 *  License: MIT
 */
!function ($, window, document, undefined) {
  "use strict";

  var pluginName = "watermark",
      defaults = {
    path: "watermark.png",
    dataPath: !1,
    text: "",
    textWidth: 130,
    textSize: 13,
    textColor: "white",
    textBg: "rgba(0, 0, 0, 0.4)",
    gravity: "se",
    opacity: .7,
    margin: 0,
    fullOverlay: !1,
    outputWidth: "auto",
    outputHeight: "auto",
    outputType: "jpeg",
    done: function done(imgURL) {
      this.src = imgURL;
    },
    fail: function fail() {},
    always: function always() {}
  };

  function Plugin(element, options) {
    this.element = element, this.settings = $.extend({}, defaults, options), this._defaults = defaults, this._name = pluginName, this.init();
  }

  $.extend(Plugin.prototype, {
    init: function init() {
      var _this = this,
          ele = _this.element,
          set = _this.settings,
          actualPath = set.dataPath ? $(ele).data(set.dataPath) : set.path,
          wmData = {
        imgurl: actualPath,
        type: "png",
        cross: !0
      },
          imageData = {
        imgurl: ele.src,
        cross: !0,
        type: set.outputType,
        width: set.outputWidth,
        height: set.outputHeight
      };

      0 === actualPath.search(/data:image\/(png|jpg|jpeg|gif);base64,/) && (wmData.cross = !1), 0 === ele.src.search(/data:image\/(png|jpg|jpeg|gif);base64,/) && (imageData.cross = !1);
      var defer = $.Deferred();
      $.when(defer).done(function (imgObj) {
        imageData.wmObj = imgObj, _this.imgurltodata(imageData, function (dataURL) {
          set.done.call(ele, dataURL), set.always.call(ele, dataURL);
        });
      }), "" !== set.text && (wmData.imgurl = _this.textwatermark(), wmData.cross = !1), _this.imgurltodata(wmData, function (imgObj) {
        defer.resolve(imgObj);
      });
    },
    textwatermark: function textwatermark() {
      var _this = this,
          set = this.settings,
          canvas = document.createElement("CANVAS"),
          ctx = canvas.getContext("2d"),
          w = set.textWidth,
          h = set.textSize + 8;

      return canvas.width = w, canvas.height = h, ctx.fillStyle = set.textBg, ctx.fillRect(0, 0, w, h), ctx.fillStyle = set.textColor, ctx.textAlign = "center", ctx.font = "500 " + set.textSize + "px Sans-serif", ctx.fillText(set.text, w / 2, set.textSize + 2), canvas.toDataURL();
    },
    imgurltodata: function imgurltodata(data, callback) {
      var _this = this,
          set = this.settings,
          ele = this.element,
          img = new Image();

      data.cross && (img.crossOrigin = "Anonymous"), img.onload = function () {
        var canvas = document.createElement("CANVAS"),
            ctx = canvas.getContext("2d"),
            w = this.width,
            h = this.height,
            ctxH;

        if (data.wmObj && ("auto" !== data.width && "auto" === data.height && data.width < w ? (h = h / w * data.width, w = data.width) : "auto" === data.width && "auto" !== data.height && data.height < h ? (w = w / h * data.height, h = data.height) : "auto" !== data.width && "auto" !== data.height && data.width < w && data.height < h && (w = data.width, h = data.height)), "w" !== set.gravity && "e" !== set.gravity || data.wmObj ? (canvas.width = w, canvas.height = h, ctxH = 0) : (canvas.width = h, canvas.height = w, ctxH = -h, ctx.rotate(90 * Math.PI / 180)), "jpeg" === data.type && (ctx.fillStyle = "#ffffff", ctx.fillRect(0, 0, w, h)), ctx.drawImage(this, 0, ctxH, w, h), data.wmObj) {
          var op = set.opacity;
          op > 0 && op < 1 && (ctx.globalAlpha = set.opacity);
          var wmW = set.fullOverlay ? w : data.wmObj.width,
              wmH = set.fullOverlay ? h : data.wmObj.height,
              pos = set.margin,
              gLeft,
              gTop;

          switch (set.gravity) {
            case "nw":
              gLeft = pos, gTop = pos;
              break;

            case "n":
              gLeft = w / 2 - wmW / 2, gTop = pos;
              break;

            case "ne":
              gLeft = w - wmW - pos, gTop = pos;
              break;

            case "w":
              gLeft = pos, gTop = h / 2 - wmH / 2;
              break;

            case "e":
              gLeft = w - wmW - pos, gTop = h / 2 - wmH / 2;
              break;

            case "sw":
              gLeft = pos, gTop = h - wmH - pos;
              break;

            case "s":
              gLeft = w / 2 - wmW / 2, gTop = h - wmH - pos;
              break;

            case "c":
              gLeft = w / 2 - wmW / 2, gTop = (h - wmH) / 2;
              break;

            default:
              gLeft = w - wmW - pos, gTop = h - wmH - pos;
          }

          ctx.drawImage(data.wmObj, gLeft, gTop, wmW, wmH);
        }

        var dataURL = canvas.toDataURL("image/" + data.type);
        if ("function" == typeof callback) if (data.wmObj) callback(dataURL);else {
          var wmNew = new Image();
          wmNew.src = dataURL, callback(wmNew);
        }
        canvas = null;
      }, img.onerror = function () {
        return set.fail.call(this, this.src), set.always.call(ele, this.src), !1;
      }, img.src = data.imgurl;
    }
  }), $.fn.watermark = function (options) {
    return this.each(function () {
      $.data(this, "plugin_watermark") || $.data(this, "plugin_watermark", new Plugin(this, options));
    });
  };
}(jQuery, window, document);
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55477" + '/');

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","jquery.watermark.min.js"], null)
//# sourceMappingURL=/jquery.watermark.min.144125f9.js.map