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
})({"Point.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Point = function Point(x, y) {
  _classCallCheck(this, Point);

  this.x = x, this.y = y;
};

var _default = Point;
exports.default = _default;
},{}],"TransformHelper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Point = _interopRequireDefault(require("./Point"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TransformHelper = /*#__PURE__*/function () {
  function TransformHelper(options) {
    _classCallCheck(this, TransformHelper);

    if (!options) options = {};
    this.borderWidth = options.borderWidth || 1;
    this.boxColor = options.boxColor || 'dodgerblue'; // Bindings ///////////////////

    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.update = this.update.bind(this);
    this.set = this.set.bind(this);
  }

  _createClass(TransformHelper, [{
    key: "add",
    value: function add(shape) {
      this.target = shape;
      shape.transformHelper = this;
      this.top = shape.top - this.borderWidth;
      this.left = shape.left - this.borderWidth;
      this.height = shape.height + this.borderWidth * 2;
      this.width = shape.width + this.borderWidth * 2;
      this.transformOrigin = shape.center;
      this.rotation = this.target.rotation;
      var element = "\n    <div class=\"transform-helper\" id=\"transform-helper-box\" style=\"top:".concat(this.top, "px; left:").concat(this.left, "px; width:").concat(this.width, "px; height:").concat(this.height, "px; transform: rotate(").concat(this.rotation, "deg); z-index:10000\">\n      <div class=\"transform-origin\" style=\"top:").concat(this.transformOrigin.y, "px; left:").concat(this.transformOrigin.x, "px; transform: translate(-50%, -50%)\"></div>\n\t\t\t<div class=\"anchor top-left corner\"></div>\n\t\t\t<div class=\"anchor top-right corner\"></div>\n\t\t\t<div class=\"anchor bottom-left corner\"></div>\n\t\t\t<div class=\"anchor bottom-right corner\"></div>\n\t\t</div>");
      this.target.element.insertAdjacentHTML('beforebegin', element);
      this.box = this.target.element.previousSibling;
      this.origin = this.box.querySelector('.transform-origin');
      return this;
    }
  }, {
    key: "remove",
    value: function remove() {
      if (this.box.parentNode && this.box) this.box.parentNode.removeChild(this.box);

      if (this.target) {
        this.target.transformHelper = null;
        this.target = null;
      }
    }
  }, {
    key: "update",
    value: function update() {
      this.width = this.target.width + this.borderWidth * 2;
      this.height = this.target.height + this.borderWidth * 2;
      this.top = this.target.top - this.borderWidth;
      this.left = this.target.left - this.borderWidth;
      this.center = this.target.center;
      this.transformOrigin = this.target.transformOrigin;
      this.rotation = this.target.rotation;
      this.box.style.top = "".concat(this.top, "px");
      this.box.style.left = "".concat(this.left, "px");
      this.box.style.width = "".concat(this.width, "px");
      this.box.style.height = "".concat(this.height, "px");
      this.box.style.transform = "rotate(".concat(this.rotation, "deg)");
      this.origin.style.left = "".concat(this.transformOrigin.x, "px");
      this.origin.style.top = "".concat(this.transformOrigin.y, "px");
    }
  }, {
    key: "set",
    value: function set(shape) {
      if (this.box) this.remove();
      this.add(shape);
    }
  }]);

  return TransformHelper;
}();

var _default = TransformHelper;
exports.default = _default;
},{"./Point":"Point.js"}],"Shape.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Point = _interopRequireDefault(require("./Point"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Shape = /*#__PURE__*/function () {
  function Shape(options) {
    _classCallCheck(this, Shape);

    this.id = options.id;
    this.name = "Layer ".concat(options.id);
    this.type = options.type || 'rectangle';
    this.tag = options.tag || 'div';
    this.top = options.top;
    this.left = options.left;
    this.width = options.width || 0;
    this.height = options.height || 0;
    this.center = new _Point.default(this.width / 2, this.height / 2);
    this.transformOrigin = this.center;
    this.rotation = options.rotation || 0;
    this.backgroundStyle = options.backgroundStyle || 'color'; // or 'gradient'

    this.backgroundColor = options.backgroundColor || '#000000';
    this.opacity = options.opacity || 1;
    this.borderColor = options.borderColor || '#000000';
    this.borderStyle = options.borderStyle || 'solid';
    this.borderRadius = options.borderRadius || [0, 0, 0, 0];
    this.active = true;
    this.zIndex = 1; // Bindings ///////

    this.add = this.add.bind(this);
    this.setSize = this.setSize.bind(this);
    this.setRotation = this.setRotation.bind(this);
    this.move = this.move.bind(this);
    this.update = this.update.bind(this);
    this.updateOnClick = this.updateOnClick.bind(this);
  }

  _createClass(Shape, [{
    key: "add",
    value: function add(parent) {
      this.parent = parent;
      var borderRadius = 'border-radius:';
      this.borderRadius.forEach(function (radius) {
        return borderRadius += "".concat(radius, "px ");
      });
      if (borderRadius === 'border-radius:0px 0px 0px 0px ') borderRadius = null;
      var element = "<".concat(this.tag, " class=\"shape ").concat(this.type, "\" id=\"").concat(this.id, "\" style=\"top:").concat(this.top, "px; left:").concat(this.left, "px; width:").concat(this.width, "px; height:").concat(this.height, "px; background:").concat(this.backgroundColor, "; ").concat(borderRadius, "; z-index:").concat(this.zIndex, "\"></").concat(this.tag, ">");
      this.parent.insertAdjacentHTML('beforeend', element);
      this.element = this.parent.lastElementChild;
      return this;
    }
  }, {
    key: "move",
    value: function move(left, top) {
      if (!this.clickEvent) return;
      this.top = top - this.clickEvent.y;
      this.left = left - this.clickEvent.x;
      this.update();
    }
  }, {
    key: "setSize",
    value: function setSize(width, height, origin) {
      this.width = width;
      this.height = height;
      this.update();
    }
  }, {
    key: "setRotation",
    value: function setRotation(deg) {
      this.rotation = deg;
      this.update();
    }
  }, {
    key: "setTransformOrigin",
    value: function setTransformOrigin(x, y) {
      this.transformOrigin = new _Point.default(x, y);
    }
  }, {
    key: "setColor",
    value: function setColor(color) {
      this.backgroundColor = color;
      this.element.style.backgroundColor = color;
      this.fillColor = color;
    }
  }, {
    key: "update",
    value: function update() {
      this.element.style.top = "".concat(this.top, "px");
      this.element.style.left = "".concat(this.left, "px");
      this.element.style.width = "".concat(this.width, "px");
      this.element.style.height = "".concat(this.height, "px");
      this.center = new _Point.default(this.width / 2, this.height / 2);
      this.transformOrigin = this.center;
      this.element.style.zIndex = "".concat(this.zIndex);
      this.element.style.transform = "rotate(".concat(this.rotation, "deg)");
      this.bounds = this.element.getBoundingClientRect();
      if (this.transformHelper) this.transformHelper.update();
    }
  }, {
    key: "updateOnClick",
    value: function updateOnClick(event) {
      this.clickEvent = {
        x: event.clientX - this.bounds.x,
        y: event.clientY - this.bounds.y
      };
    }
  }]);

  return Shape;
}();

var _default = Shape;
exports.default = _default;
},{"./Point":"Point.js"}],"Layers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Shape = _interopRequireDefault(require("./Shape"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Layers = /*#__PURE__*/function () {
  function Layers(layers) {
    _classCallCheck(this, Layers);

    this.layers = layers || [];
    this.updates = {}; // Bindings //

    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.getLayerById = this.getLayerById.bind(this);
    this.getLayerIndex = this.getLayerIndex.bind(this);
  }

  _createClass(Layers, [{
    key: "add",
    value: function add(layerObject) {
      layerObject.zIndex = this.layers.length;
      this.layers.push(layerObject);
      var event = new Event('newlayer', {
        bubbles: true
      });
      document.dispatchEvent(event);
    }
  }, {
    key: "duplicate",
    value: function duplicate(layerObject, newId) {
      var layer = this.getLayerById(layerObject.id);
      var newLayer = new _Shape.default(layer);
      newLayer.id = newId;
      newLayer.zIndex = newId;
      newLayer.name = newLayer.name + ' copy';
      newLayer.add(layer.parent);
      this.add(newLayer);
      newLayer.update();
      return newLayer;
    }
  }, {
    key: "getLayerById",
    value: function getLayerById(id) {
      return this.layers.find(function (layer) {
        return layer.id === parseInt(id);
      });
    }
  }, {
    key: "getLayerIndex",
    value: function getLayerIndex(object) {
      var index = -1;

      for (var i = 0; i < this.layers.length; i++) {
        var layer = this.layers[i];

        if (layer.id === object.id) {
          index = i;
          break;
        }
      }

      return index;
    }
  }, {
    key: "moveLayerForward",
    value: function moveLayerForward(layer) {
      var index = this.getLayerIndex(layer);

      if (index !== this.layers.length - 1) {
        // Switch z-index values
        this.layers[index].zIndex = index + 1;
        this.layers[index + 1].zIndex = index; // Switch values in array

        var _ref = [this.layers[index], this.layers[index + 1]];
        this.layers[index + 1] = _ref[0];
        this.layers[index] = _ref[1];
        // Update both layers
        this.layers[index].update();
        this.layers[index + 1].update();
      }
    }
  }, {
    key: "moveLayerBackward",
    value: function moveLayerBackward(layer) {
      var index = this.getLayerIndex(layer);

      if (index !== 0) {
        // Switch z-index values
        this.layers[index - 1].zIndex = index;
        this.layers[index].zIndex = index - 1; // Switch values in array

        var _ref2 = [this.layers[index], this.layers[index - 1]];
        this.layers[index - 1] = _ref2[0];
        this.layers[index] = _ref2[1];
        // Update both layers
        this.layers[index].update();
        this.layers[index - 1].update();
      }
    }
  }, {
    key: "moveLayerToFront",
    value: function moveLayerToFront(layer) {
      var index = this.getLayerIndex(layer);
      this.layers.splice(index, 1);
      this.layers.push(layer);
      this.layers.forEach(function (layer, i) {
        layer.zIndex = i;
        layer.update();
      });
    }
  }, {
    key: "moveLayerToBack",
    value: function moveLayerToBack(layer) {
      var index = this.getLayerIndex(layer);
      this.layers.splice(index, 1);
      this.layers.unshift(layer);
      this.layers.forEach(function (layer, i) {
        layer.zIndex = i;
        layer.update();
      });
    }
  }, {
    key: "remove",
    value: function remove(object) {
      var index = this.getLayerIndex(object);
      object.transformHelper.remove();
      object.element.parentNode.removeChild(object.element);
      this.layers.splice(index, 1);
      this.updates.removeActiveLayer = true;
    }
  }, {
    key: "updateAll",
    value: function updateAll() {
      var _iterator = _createForOfIteratorHelper(this.layers),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var layer = _step.value;
          layer.update();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }]);

  return Layers;
}();

var _default = Layers;
exports.default = _default;
},{"./Shape":"Shape.js"}],"Utils.js":[function(require,module,exports) {

},{}],"Canvas.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _TransformHelper = _interopRequireDefault(require("./TransformHelper"));

var _Shape = _interopRequireDefault(require("./Shape"));

var _Layers = _interopRequireDefault(require("./Layers"));

var _Utils = _interopRequireDefault(require("./Utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Canvas = /*#__PURE__*/function () {
  function Canvas(canvas) {
    _classCallCheck(this, Canvas);

    this.element = canvas;
    this.bounds = this.element.getBoundingClientRect();
    this.id = 0;
    this.drawStart = {};
    this.drawEnd = {};
    this.isMouseDown = false;
    this.shape = 'ellipse';
    this.activeLayer = undefined;
    this.mode = 'draw';
    this.editMode = 'select';
    this.layers = new _Layers.default();
    this.transformHelper = new _TransformHelper.default();
    this.updates = {};
    this.modifiers = {
      altDown: false
    }; // BINDINGS ///////////////////////

    this.keydown = this.keydown.bind(this);
    this.keyup = this.keyup.bind(this);
    this.makeActiveLayer = this.makeActiveLayer.bind(this);
    this.mousedown = this.mousedown.bind(this);
    this.mouseup = this.mouseup.bind(this);
    this.mousemove = this.mousemove.bind(this);
    this.drawShape = this.drawShape.bind(this);
    canvas.addEventListener('mousedown', this.mousedown);
    canvas.addEventListener('mouseup', this.mouseup);
    canvas.addEventListener('mousemove', this.mousemove); // Key bindings

    document.addEventListener('keydown', this.keydown);
    document.addEventListener('keyup', this.keyup);
  }

  _createClass(Canvas, [{
    key: "drawShape",
    value: function drawShape(options) {
      var shape = new _Shape.default(options);
      var parent = this.element;
      this.makeActiveLayer(shape.add(parent));
      this.layers.add(shape);
      this.transformHelper.set(shape);
      this.id++;
    }
  }, {
    key: "keydown",
    value: function keydown(event) {
      switch (event.keyCode) {
        // alt
        case 18:
          this.modifiers.altDown = true;
          break;
        // delete

        case 46 || 8:
          this.layers.remove(this.activeLayer);
          break;
        // up

        case 38:
          this.layers.moveLayerForward(this.activeLayer);
          break;

        case 40:
          this.layers.moveLayerBackward(this.activeLayer);
          break;

        case 68:
          var newLayer = this.layers.duplicate(this.activeLayer, this.id);
          this.makeActiveLayer(newLayer);
          this.id++;
          break;

        default:
          break;
      }
    }
  }, {
    key: "keyup",
    value: function keyup(event) {
      switch (event.keyCode) {
        // alt
        case 18:
          this.modifiers.altDown = false;
          this.editMode = 'select';
          break;

        default:
          break;
      }
    }
  }, {
    key: "makeActiveLayer",
    value: function makeActiveLayer(object) {
      if (this.activeLayer) this.activeLayer.active = false;
      this.activeLayer = object;
      this.activeLayer.active = true;
      this.transformHelper.set(this.activeLayer);
      this.updates.changeActiveLayer = true;
    }
  }, {
    key: "removeActiveLayer",
    value: function removeActiveLayer() {
      this.activeLayer.active = false;
      this.activeLayer = undefined;
    }
  }, {
    key: "mousedown",
    value: function mousedown(event) {
      this.isMouseDown = true; // Initialize these variables

      this.drawStart = copy(this.mousePosition);
      this.drawEnd = copy(this.mousePosition);
      this.transformOrigin = copy(this.mousePosition);
      var shapeOptions = {
        top: this.drawStart.y,
        left: this.drawStart.x,
        height: 0,
        width: 0,
        type: this.shape,
        id: this.id,
        backgroundColor: this.shapeColor
      };
      if (this.mode === 'draw') this.drawShape(shapeOptions);

      if (this.mode === 'edit') {
        // Get the target layer
        var target = this.layers.getLayerById(event.target.id); // If target layer exists and it isn't the helper make it active

        if (target && event.target.id !== 'transform-helper-box') this.makeActiveLayer(target); // Attach the helper to the active layer or remove if it doesn't exist

        if (this.activeLayer) {
          this.transformHelper.set(this.activeLayer);
        } else {
          this.transformHelper.remove();
        } // Change mode when clicking anchor


        if (event.target.classList.contains('anchor')) {
          if (this.modifiers.altDown) {
            this.editMode = 'rotate';
          } else {
            this.editMode = 'resize';
          } // Set global transform origin to correct position


          this.setTransformOrigin(event); // Get the rotation angle of initial click

          this.drawStartAngle = rotationAngle(this.transformOrigin.x, this.transformOrigin.y, this.mousePosition.x, this.mousePosition.y);
          this.drawStartShapeRotation = this.activeLayer.rotation;
        }
      }

      if (this.mode === 'edit' && this.activeLayer && event.target.id === 'transform-helper-box') {
        this.editMode = 'move';
        this.activeLayer.updateOnClick(event);
      }
    }
  }, {
    key: "mouseup",
    value: function mouseup(event) {
      this.isMouseDown = false;
      this.resize = false;

      if (this.activeLayer && this.mode === 'draw') {
        if (this.activeLayer.width === 0 || this.activeLayer.height === 0) {
          this.layers.remove(this.activeLayer);
        }
      }

      if (this.mode === 'edit') this.editMode === 'select';
    }
  }, {
    key: "mousemove",
    value: function mousemove(event) {
      var canvasBounds = this.bounds;
      this.mousePosition = {
        x: event.clientX - canvasBounds.left,
        y: event.clientY - canvasBounds.top
      };

      if (this.isMouseDown && this.mode === 'draw') {
        this.resizeActiveLayer();
      }

      if (this.isMouseDown && this.editMode === 'resize') {
        this.resizeActiveLayer();
      }

      if (this.isMouseDown && this.editMode === 'rotate') {
        this.rotateActiveLayer();
      }

      if (this.isMouseDown === true && this.mode === 'edit' && this.editMode === 'move' && this.activeLayer) {
        this.activeLayer.move(this.mousePosition.x, this.mousePosition.y);
      }
    }
  }, {
    key: "relativeMousePosition",
    value: function relativeMousePosition() {
      return {
        x: this.mousePosition.x - this.activeLayer.left,
        y: this.mousePosition.y - this.activeLayer.top
      };
    }
  }, {
    key: "resizeActiveLayer",
    value: function resizeActiveLayer() {
      if (this.mousePosition.x >= this.transformOrigin.x) {
        this.drawWidth = this.mousePosition.x - this.transformOrigin.x;
      } else {
        this.drawWidth = this.transformOrigin.x - this.mousePosition.x;
        this.activeLayer.left = this.transformOrigin.x - this.drawWidth;
      }

      if (this.mousePosition.y >= this.transformOrigin.y) {
        this.drawHeight = this.mousePosition.y - this.transformOrigin.y;
      } else {
        this.drawHeight = this.transformOrigin.y - this.mousePosition.y;
        this.activeLayer.top = this.transformOrigin.y - this.drawHeight;
      }

      this.activeLayer.setSize(this.drawWidth, this.drawHeight);
    }
  }, {
    key: "rotateActiveLayer",
    value: function rotateActiveLayer() {
      var angle = rotationAngle(this.transformOrigin.x, this.transformOrigin.y, this.mousePosition.x, this.mousePosition.y);
      angle = angle + 180 - this.drawStartAngle + this.drawStartShapeRotation;
      this.activeLayer.setRotation(angle);
    }
  }, {
    key: "setTransformOrigin",
    value: function setTransformOrigin(event) {
      if (this.modifiers.altDown) {
        this.transformOrigin = {
          x: this.activeLayer.left + this.activeLayer.width / 2,
          y: this.activeLayer.top + this.activeLayer.height / 2
        };
        return;
      }

      if (event.target.classList.contains('bottom-right')) {
        this.transformOrigin = {
          x: this.activeLayer.left,
          y: this.activeLayer.top
        };
      }

      if (event.target.classList.contains('bottom-left')) {
        this.transformOrigin = {
          x: this.activeLayer.left + this.activeLayer.width,
          y: this.activeLayer.top
        };
      }

      if (event.target.classList.contains('top-left')) {
        this.transformOrigin = {
          x: this.activeLayer.left + this.activeLayer.width,
          y: this.activeLayer.top + this.activeLayer.height
        };
      }

      if (event.target.classList.contains('top-right')) {
        this.transformOrigin = {
          x: this.activeLayer.left,
          y: this.activeLayer.top + this.activeLayer.height
        };
      }
    }
  }]);

  return Canvas;
}();

function copy(object) {
  return JSON.parse(JSON.stringify(object));
}

function rotationAngle(cx, cy, ex, ey) {
  var dy = ey - cy;
  var dx = ex - cx;
  var theta = Math.atan2(dy, dx); // range (-PI, PI]

  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  //if (theta < 0) theta = 360 + theta; // range [0, 360)

  return theta;
}

var _default = Canvas;
exports.default = _default;
},{"./TransformHelper":"TransformHelper.js","./Shape":"Shape.js","./Layers":"Layers.js","./Utils":"Utils.js"}],"LayersPanel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Sortable = /*#__PURE__*/function () {
  function Sortable(listEl, options) {
    _classCallCheck(this, Sortable);

    if (!options) options = {};
    this.element = listEl;
    this.draggedElement = null;
    this.target = null;
    this.hoverPosition = null;
    this.divider = {
      element: document.createElement('li', {
        id: 'divider'
      }),
      active: false
    }; // Initialize

    this.divider.element.classList.add('divider');
    this.children = flattenChildren(_toConsumableArray(listEl.children));
    this.betweenSensitivity = options.betweenSensitivity || 0.2;
    this.children.forEach(function (el) {
      return el.setAttribute('draggable', 'true');
    });
    this.element.addEventListener('click', function (event) {
      if (event.target.getAttribute('data-list-component') === 'group-name' || event.target.getAttribute('data-list-component') === 'group-expand-btn') {
        event.target.closest('.list-component-group').classList.toggle('collapsed');
      }
    }); // Bindings

    this.dragStart = this.dragStart.bind(this);
    this.dragOver = this.dragOver.bind(this);
    this.dragLeave = this.dragLeave.bind(this);
    this.drop = this.drop.bind(this);
    this.makeAllInactive = this.makeAllInactive.bind(this);
    this.nestElement = this.nestElement.bind(this);
    this.recalculateChildren = this.recalculateChildren.bind(this);
    this.removeDivider = this.removeDivider.bind(this);
    this.setHoverPosition = this.setHoverPosition.bind(this); // Event Listeners

    this.element.addEventListener('dragstart', this.dragStart);
    this.element.addEventListener('drop', this.drop);
    this.element.addEventListener('dragover', this.dragOver);
    this.element.addEventListener('dragleave', this.dragLeave);
  }

  _createClass(Sortable, [{
    key: "addLayer",
    value: function addLayer(layer, options) {
      var className = '';
      if (layer.active) className = 'active';
      if (!options) options = {};
      var html = "<li id=\"for-".concat(options.targetId, "\" class=\"").concat(className, "\" draggable=\"true\">").concat(layer.name, "</li>");
      this.element.insertAdjacentHTML('beforeend', html);
      this.recalculateChildren();
    }
  }, {
    key: "dragStart",
    value: function dragStart(event, callback) {
      var targetIndex = this.children.indexOf(event.target);
      event.dataTransfer.setData('text', targetIndex);
      this.draggedElement = event.target;
      this.draggedElement.classList.add('active');
      if (callback) callback();
    }
  }, {
    key: "dragOver",
    value: function dragOver(event, callback) {
      event.preventDefault();
      var divider = this.divider.element;
      this.mousePosition = {
        x: event.clientX,
        y: event.clientY
      };
      this.draggedElement.style.display = 'none';

      if (event.target !== divider && event.target !== this.element && event.target.getAttribute('data-list-component') !== 'group' && event.target.getAttribute('data-list-component') !== 'group-body') {
        // Cache the current target
        if (event) this.target = event.target; // Update the target bounds

        this.targetBounds = event.target.getBoundingClientRect(); // Set the hover position based on new bounds

        this.setHoverPosition();
      }

      if (event.target !== this.element) {
        event.target.classList.remove('hover');
      }

      if (this.hoverPosition === 'bottom' && !this.isGroupComponent(event.target)) {
        if (event.target === this.element || event.target === divider) return;

        if (!divider) {
          event.target.insertAdjacentElement('afterend', this.divider.element);
          divider = (_readOnlyError("divider"), event.target.nextSibling);
        } else {
          event.target.parentNode.insertBefore(divider, event.target.nextSibling);
        }
      }

      if (this.hoverPosition === 'top' && !this.isGroupComponent(event.target)) {
        if (event.target === this.element || event.target === divider) return;

        if (!divider) {
          event.target.insertAdjacentElement('beforebegin', this.divider.element);
          divider = (_readOnlyError("divider"), event.target.nextSibling);
        } else {
          event.target.parentNode.insertBefore(divider, event.target);
        }
      }

      if (this.hoverPosition === 'top' && this.isGroupComponent(event.target, 'group-name')) {
        if (event.target === this.element || event.target === divider) return;

        if (!divider) {
          event.target.parentNode.insertAdjacentElement('beforebegin', this.divider.element);
          divider = (_readOnlyError("divider"), event.target.parentNode.previousSibling);
        } else {
          event.target.parentNode.insertBefore(divider, event.target);
        }
      }

      if (this.hoverPosition === 'center' && !this.isGroupComponent(event.target, 'group') && !this.isGroupComponent(event.target, 'group-body')) {
        if (event.target !== this.element) event.target.classList.add('hover');
        this.removeDivider();
      }

      if (callback) callback();
    }
  }, {
    key: "dragLeave",
    value: function dragLeave(event, callback) {
      event.target.classList.remove('hover');
      if (callback) callback();
    }
  }, {
    key: "drop",
    value: function drop(event, callback) {
      var targetIndex = event.dataTransfer.getData('text');
      var thisEl = this.children[targetIndex]; // Remove all helper styles/elements

      this.removeDivider();
      event.target.classList.remove('hover');
      this.draggedElement.classList.remove('active');
      this.draggedElement.style.removeProperty('display'); // Place element

      if (this.hoverPosition === 'top' && !this.isGroupComponent(this.target)) this.target.insertAdjacentElement('beforebegin', thisEl);
      if (this.hoverPosition === 'bottom' && !this.isGroupComponent(this.target)) this.target.insertAdjacentElement('afterend', thisEl);
      if (this.hoverPosition === 'center') this.nestElement(this.target, thisEl); // Place before group if dropped on top of group name

      if (this.hoverPosition === 'top' && this.isGroupComponent(this.target, 'group-name')) this.target.parentNode.insertAdjacentElement('beforebegin', thisEl);
      event.dataTransfer.clearData();
      this.recalculateChildren(); // Optional callback

      if (callback) callback();
    }
  }, {
    key: "isGroupComponent",
    value: function isGroupComponent(element, type) {
      var thisType = element.getAttribute('data-list-component');
      if (type) return thisType === type;

      if (thisType === 'group' || thisType === 'group-name' || thisType === 'group-body') {
        return true;
      }
    }
  }, {
    key: "nestElement",
    value: function nestElement(target, thisEl) {
      if (target.getAttribute('data-list-component') === 'group-name') {
        target.nextSibling.insertAdjacentElement('beforeend', thisEl);
      } else if (target.getAttribute('data-list-component') === 'group') {
        target.lastChild.insertAdjacentElement('beforeend', thisEl);
      } else if (target.getAttribute('data-list-component') === 'group-body') {
        target.insertAdjacentElement('beforeend', thisEl);
      } else {
        var li = document.createElement('li');
        li.setAttribute('draggable', 'true');
        li.setAttribute('data-list-component', 'group');
        li.classList.add('list-component-group');
        li.innerHTML = "\n<div class=\"group list-component-group-name\" data-list-component=\"group-name\">\n\t<span class=\"expand-icon expanded\" data-list-component=\"group-expand-btn\">&rsaquo;</span>\n\tgroup\n</div>";
        var ul = document.createElement('ul');
        ul.setAttribute('data-list-component', 'group-body');
        ul.classList.add('list-component-group-body');
        li.insertAdjacentElement('beforeend', ul);
        target.insertAdjacentElement('beforebegin', li);
        ul.insertAdjacentElement('afterbegin', target);
        ul.insertAdjacentElement('afterbegin', thisEl);
      }
    }
  }, {
    key: "recalculateChildren",
    value: function recalculateChildren() {
      // Must re-index children to reset correct position
      this.children = flattenChildren(_toConsumableArray(this.element.children));
    }
  }, {
    key: "remove",
    value: function remove(layer) {
      layer.parentNode.removeChild(layer);
    }
  }, {
    key: "removeDivider",
    value: function removeDivider(event) {
      var divider = this.divider.element;
      if (divider.parentNode) divider.parentNode.removeChild(divider);
    }
  }, {
    key: "makeActive",
    value: function makeActive(layer) {
      layer.classList.add('active');
    }
  }, {
    key: "makeAllInactive",
    value: function makeAllInactive() {
      var children = flattenChildren(this.element.children);
      children.forEach(function (child) {
        return child.classList.remove('active');
      });
    }
  }, {
    key: "setHoverPosition",
    value: function setHoverPosition(event) {
      if (this.mousePosition.y > this.targetBounds.top + this.targetBounds.height - this.targetBounds.height * this.betweenSensitivity) {
        this.hoverPosition = 'bottom';
      } else if (this.mousePosition.y < this.targetBounds.top + this.targetBounds.height * this.betweenSensitivity) {
        this.hoverPosition = 'top';
      } else {
        this.hoverPosition = 'center';
      }
    }
  }]);

  return Sortable;
}();

function flattenChildren(arr) {
  var newArr = [];

  for (var i = 0; i < arr.length; i++) {
    newArr.push(arr[i]);
    if (arr[i].children.length > 0) newArr.push.apply(newArr, _toConsumableArray(flattenChildren(_toConsumableArray(arr[i].children))));
  }

  return newArr;
}

var _default = Sortable;
exports.default = _default;
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _Canvas = _interopRequireDefault(require("./Canvas"));

var _LayersPanel = _interopRequireDefault(require("./LayersPanel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var App = /*#__PURE__*/function () {
  function App(options) {
    _classCallCheck(this, App);

    this.canvas = new _Canvas.default(options.canvas);
    this.layersPanel = new _LayersPanel.default(options.layersListElement);
    this.menu = options.menu;
    this.updates = [];
    this.handleUpdates = this.handleUpdates.bind(this);
    this.mousedown = this.mousedown.bind(this);
    this.mouseup = this.mouseup.bind(this);
    this.keydown = this.keydown.bind(this);
    this.newlayer = this.newlayer.bind(this);
    document.addEventListener('newlayer', this.newlayer);
    document.addEventListener('mousedown', this.mousedown);
    document.addEventListener('mouseup', this.mouseup);
    document.addEventListener('keydown', this.keydown);
  }

  _createClass(App, [{
    key: "changeactivelayer",
    value: function changeactivelayer() {
      var layerId = "for-".concat(this.canvas.activeLayer.id);
      var layer = document.getElementById(layerId);
      this.layersPanel.makeAllInactive();
      this.layersPanel.makeActive(layer);
    }
  }, {
    key: "handleUpdates",
    value: function handleUpdates() {
      var _this = this;

      this.pullUpdates(this.canvas);
      this.pullUpdates(this.canvas.layers);
      this.updates.forEach(function (update) {
        switch (update) {
          case 'changeActiveLayer':
            _this.changeactivelayer();

            break;

          case 'removeActiveLayer':
            _this.removeactivelayer();

            break;

          default:
            break;
        }

        _this.updates = [];
      });
    }
  }, {
    key: "pullUpdates",
    value: function pullUpdates(module) {
      var updates = module.updates;
      if (!module.updates) return;
      var keys = Object.keys(updates);

      for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
        var key = _keys[_i];

        if (updates[key] === true) {
          this.updates.push(key);
          updates[key] = null;
        }
      }
    }
  }, {
    key: "mousedown",
    value: function mousedown(event) {
      this.handleUpdates();

      if (event.target.id) {
        var id = event.target.id;
        var layerId = id.split('-')[1];
        var layer = this.canvas.layers.getLayerById(layerId);
        if (layer) this.canvas.makeActiveLayer(layer);
      }
    }
  }, {
    key: "mouseup",
    value: function mouseup(event) {
      this.handleUpdates();
    }
  }, {
    key: "newlayer",
    value: function newlayer(event) {
      this.layersPanel.makeAllInactive();
      this.layersPanel.addLayer(this.canvas.activeLayer, {
        targetId: this.canvas.activeLayer.id
      });
    }
  }, {
    key: "removeactivelayer",
    value: function removeactivelayer() {
      var layerId = "for-".concat(this.canvas.activeLayer.id);
      var layer = document.getElementById(layerId);
      this.layersPanel.makeAllInactive();
      this.layersPanel.remove(layer);
    }
  }, {
    key: "keydown",
    value: function keydown(event) {
      this.handleUpdates();
    }
  }]);

  return App;
}();

var appOptions = {
  canvas: document.getElementById('canvas'),
  layersListElement: document.getElementById('layers-panel-list')
};
var app = new App(appOptions);

var shapeBtns = _toConsumableArray(document.querySelectorAll('.shape-btn'));

shapeBtns.forEach(function (el) {
  return el.addEventListener('click', function () {
    app.canvas.shape = el.getAttribute('data-shape');
  });
});

var modeBtns = _toConsumableArray(document.querySelectorAll('.mode'));

modeBtns.forEach(function (el) {
  return el.addEventListener('click', function () {
    var mode = el.getAttribute('data-mode');
    console.log(app);
    app.canvas.mode = mode;
    app.canvas.element.className = mode;
  });
}); // Toggle the buttons in the button groups

var btnGroup = _toConsumableArray(document.querySelectorAll('.ui-group'));

btnGroup.forEach(function (group) {
  return group.addEventListener('click', function (event) {
    var btns = _toConsumableArray(group.children);

    btns.forEach(function (btn) {
      return btn.classList.remove('active');
    });
    var btn = event.target.closest('button');
    if (btn) btn.classList.add('active');
  });
});

var actionBtns = _toConsumableArray(document.querySelectorAll('.btn-action'));

actionBtns.forEach(function (btn) {
  return btn.addEventListener('click', function (event) {
    switch (event.target.getAttribute('data-action')) {
      case 'layer-front':
        app.canvas.layers.moveLayerToFront(app.canvas.activeLayer);
        break;

      case 'layer-forward':
        app.canvas.layers.moveLayerForward(app.canvas.activeLayer);
        break;

      case 'layer-backward':
        app.canvas.layers.moveLayerBackward(app.canvas.activeLayer);
        break;

      case 'layer-back':
        app.canvas.layers.moveLayerToBack(app.canvas.activeLayer);
        break;

      default:
        break;
    }
  });
}); // Set the current layer color

var colorPicker = document.getElementById('shape-color');
colorPicker.addEventListener('input', function () {
  app.canvas.shapeColor = colorPicker.value;
  if (app.canvas.activeLayer) app.canvas.activeLayer.setColor(app.canvas.shapeColor);
});
},{"./Canvas":"Canvas.js","./LayersPanel":"LayersPanel.js"}],"../../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49503" + '/');

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
},{}]},{},["../../node_modules/parcel/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/script.js.map