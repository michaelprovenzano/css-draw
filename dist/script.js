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
})({"utils/Point.js":[function(require,module,exports) {
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

var _Point = _interopRequireDefault(require("./utils/Point"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var rotateIcon = "\n<svg width=\"22px\" height=\"22px\" viewBox=\"0 0 22 22\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n        <g id=\"Desktop-HD\" transform=\"translate(-439.000000, -314.000000)\" fill=\"#0D6ECC\" fill-rule=\"nonzero\" stroke=\"#D8D8D8\" stroke-width=\"0.764925529\">\n            <path d=\"M453.296077,319.499304 C447.482837,319.499304 444.499434,322.320361 444.499434,328.296021 L445.939002,328.296021 C446.361459,328.296021 446.703928,328.63849 446.703928,329.060946 C446.703928,329.179697 446.67628,329.296816 446.623173,329.403029 L444.036217,334.576986 C443.847289,334.954844 443.38782,335.108002 443.009962,334.919075 C442.861927,334.845057 442.741891,334.725022 442.667874,334.576986 L440.080917,329.403029 C439.89199,329.025172 440.045148,328.565702 440.423006,328.376775 C440.529219,328.323669 440.646338,328.296021 440.765088,328.296021 L442.204657,328.296021 C442.204657,321.023375 446.243292,317.204508 453.296077,317.204508 L453.296077,315.764926 C453.296077,315.34247 453.638546,315.000001 454.061003,315.000001 C454.179754,315.000001 454.296875,315.027649 454.40309,315.080757 L459.577006,317.667737 C459.954862,317.856666 460.108017,318.316137 459.919087,318.693993 C459.845071,318.842025 459.725038,318.962058 459.577006,319.036075 L454.40309,321.623054 C454.025234,321.811984 453.565763,321.658829 453.376834,321.280973 C453.323726,321.174758 453.296077,321.057637 453.296077,320.938885 L453.296077,319.499304 Z\" id=\"Combined-Shape\"></path>\n        </g>\n    </g>\n</svg>";

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
      // Transform helper pointers
      this.target = shape;
      shape.transformHelper = this; // Set shape to model to get data

      shape = shape.model; // Update the data

      this.top = shape.top - this.borderWidth;
      this.left = shape.left - this.borderWidth;
      this.height = shape.height + this.borderWidth * 2;
      this.width = shape.width + this.borderWidth * 2;
      this.transformOrigin = shape.center;
      this.rotation = shape.rotation;
      this.transformOrigin = shape.transformOrigin; // Generate the html

      var element = "\n    <div class=\"transform-helper\" id=\"transform-helper-box\" style=\"top:".concat(this.top, "px; left:").concat(this.left, "px; width:").concat(this.width, "px; height:").concat(this.height, "px; transform: rotate(").concat(this.rotation, "deg); z-index:10000\">\n      <div class=\"transform-origin\" style=\"top:").concat(this.transformOrigin.y, "px; left:").concat(this.transformOrigin.x, "px; transform: translate(-50%, -50%)\"></div>\n\t\t\t<div class=\"anchor top-left corner\"></div>\n\t\t\t<div class=\"anchor top-right corner\"></div>\n\t\t\t<div class=\"anchor bottom-left corner\"></div>\n      <div class=\"anchor bottom-right corner\"></div>\n      <div class=\"rotate-icon top-left\">").concat(rotateIcon, "</div>\n      <div class=\"rotate-icon top-right\">").concat(rotateIcon, "</div>\n      <div class=\"rotate-icon bottom-left\">").concat(rotateIcon, "</div>\n      <div class=\"rotate-icon bottom-right\">").concat(rotateIcon, "</div>\n      \n    </div>"); // Insert the htmls

      this.target.view.element.insertAdjacentHTML('beforebegin', element); // Set the references on the TranformHelper object

      this.box = this.target.view.element.previousSibling;
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
      this.width = this.target.model.width + this.borderWidth * 2;
      this.height = this.target.model.height + this.borderWidth * 2;
      this.top = this.target.model.top - this.borderWidth;
      this.left = this.target.model.left - this.borderWidth;
      this.center = this.target.model.center;
      this.transformOrigin = this.target.model.transformOrigin;
      this.rotation = this.target.model.rotation;
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
},{"./utils/Point":"utils/Point.js"}],"models/layerModel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Point = _interopRequireDefault(require("../utils/Point"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LayerModel = /*#__PURE__*/function () {
  function LayerModel(options) {
    _classCallCheck(this, LayerModel);

    this.id = options.id;
    this.name = options.name || "Layer ".concat(options.id);
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
    options.hasOwnProperty('visible') ? this.visible = options.visible : this.visible = true;
    this.active = true;
    this.zIndex = 1; // Bindings ///////

    this.getCenter = this.getCenter.bind(this);
    this.makeActive = this.makeActive.bind(this);
    this.makeInactive = this.makeInactive.bind(this);
    this.setBoundsFromElement = this.setBoundsFromElement.bind(this);
    this.setSize = this.setSize.bind(this);
    this.setRelativePosition = this.setRelativePosition.bind(this);
    this.setRelativeProperties = this.setRelativeProperties.bind(this);
    this.setRelativeSize = this.setRelativeSize.bind(this);
    this.setRotation = this.setRotation.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.update = this.update.bind(this);
    this.setClickPosition = this.setClickPosition.bind(this);
  }

  _createClass(LayerModel, [{
    key: "clearClickPosition",
    value: function clearClickPosition() {
      this.clickEvent = undefined;
    }
  }, {
    key: "getCenter",
    value: function getCenter() {
      return new _Point.default(this.width / 2 + this.left, this.height / 2 + this.top);
    }
  }, {
    key: "makeActive",
    value: function makeActive() {
      this.active = true;
    }
  }, {
    key: "makeInactive",
    value: function makeInactive() {
      this.active = false;
    }
  }, {
    key: "setBoundsFromElement",
    value: function setBoundsFromElement(element) {
      var bounds = element.getBoundingClientRect();
      this.bounds = bounds;
    }
  }, {
    key: "setPosition",
    value: function setPosition(left, top) {
      if (this.clickEvent) {
        this.top = top - this.clickEvent.y + (this.bounds.height - this.height) / 2;
        this.left = left - this.clickEvent.x + (this.bounds.width - this.width) / 2;
      } else {
        this.top = top;
        this.left = left;
      }
    }
  }, {
    key: "setSize",
    value: function setSize(width, height, origin) {
      this.width = width;
      this.height = height;
    }
  }, {
    key: "setRelativePosition",
    value: function setRelativePosition(parent) {
      var top = this.relativeTop * parent.height + parent.top;
      var left = this.relativeLeft * parent.width + parent.left;
      this.setPosition(left, top);
    }
  }, {
    key: "setRelativeProperties",
    value: function setRelativeProperties(parent) {
      this.relativeWidth = this.width / parent.width;
      this.relativeHeight = this.height / parent.height;
      this.relativeTop = (this.top - parent.top) / parent.height;
      this.relativeLeft = (this.left - parent.left) / parent.width;
    }
  }, {
    key: "setRelativeSize",
    value: function setRelativeSize(parent) {
      var width = this.relativeWidth * parent.width;
      var height = this.relativeHeight * parent.height;
      this.setSize(width, height);
    }
  }, {
    key: "setRotation",
    value: function setRotation(deg) {
      this.rotation = deg;
    }
  }, {
    key: "setTransformOrigin",
    value: function setTransformOrigin(x, y) {
      x = x - this.left;
      y = y - this.top;
      this.transformOrigin = new _Point.default(x, y);
    }
  }, {
    key: "setColor",
    value: function setColor(color) {
      this.backgroundColor = color;
    }
  }, {
    key: "update",
    value: function update() {
      this.center = new _Point.default(this.width / 2, this.height / 2);
      if (this.element) this.bounds = this.element.getBoundingClientRect();
    }
  }, {
    key: "setClickPosition",
    value: function setClickPosition(event) {
      this.clickEvent = {
        x: event.clientX - this.bounds.x,
        y: event.clientY - this.bounds.y
      }; // console.log(this.bounds);
    }
  }]);

  return LayerModel;
}();

var _default = LayerModel;
exports.default = _default;
},{"../utils/Point":"utils/Point.js"}],"models/shapeModel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _layerModel = _interopRequireDefault(require("./layerModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ShapeModel = /*#__PURE__*/function (_LayerModel) {
  _inherits(ShapeModel, _LayerModel);

  var _super = _createSuper(ShapeModel);

  function ShapeModel(options) {
    _classCallCheck(this, ShapeModel);

    return _super.call(this, options);
  }

  return ShapeModel;
}(_layerModel.default);

var _default = ShapeModel;
exports.default = _default;
},{"./layerModel":"models/layerModel.js"}],"views/layerView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Point = _interopRequireDefault(require("../utils/Point"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LayerView = /*#__PURE__*/function () {
  function LayerView(options) {
    _classCallCheck(this, LayerView);

    // Bindings ///////
    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
  }

  _createClass(LayerView, [{
    key: "add",
    value: function add(parent, shapeObject) {
      this.parent = parent;
      var borderRadius = 'border-radius:';
      shapeObject.borderRadius.forEach(function (radius) {
        return borderRadius += "".concat(radius, "px ");
      });
      if (borderRadius === 'border-radius:0px 0px 0px 0px ') borderRadius = null;
      var element = "<".concat(shapeObject.tag, " class=\"shape ").concat(shapeObject.type, "\" id=\"").concat(shapeObject.id, "\" style=\"top:").concat(shapeObject.top, "px; left:").concat(shapeObject.left, "px; width:").concat(shapeObject.width, "px; height:").concat(shapeObject.height, "px; background:").concat(shapeObject.backgroundColor, "; ").concat(borderRadius, "; z-index:").concat(shapeObject.zIndex, "\"></").concat(shapeObject.tag, ">");
      this.parent.insertAdjacentHTML('beforeend', element);
      this.element = this.parent.lastElementChild;
      return this;
    }
  }, {
    key: "remove",
    value: function remove() {
      var element = document.getElementById(this.element.id);
      if (element) this.element.parentNode.removeChild(element);
      return null;
    }
  }, {
    key: "update",
    value: function update(shape) {
      this.element.style.top = "".concat(shape.top, "px");
      this.element.style.left = "".concat(shape.left, "px");
      this.element.style.width = "".concat(shape.width, "px");
      this.element.style.height = "".concat(shape.height, "px");
      this.element.style.zIndex = "".concat(shape.zIndex);
      this.element.style.backgroundColor = "".concat(shape.backgroundColor);
      this.element.style.transform = "rotate(".concat(shape.rotation, "deg)");
    }
  }]);

  return LayerView;
}();

var _default = LayerView;
exports.default = _default;
},{"../utils/Point":"utils/Point.js"}],"views/shapeView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _layerView = _interopRequireDefault(require("./layerView"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ShapeView = /*#__PURE__*/function (_LayerView) {
  _inherits(ShapeView, _LayerView);

  var _super = _createSuper(ShapeView);

  function ShapeView(options) {
    _classCallCheck(this, ShapeView);

    return _super.call(this, options);
  }

  return ShapeView;
}(_layerView.default);

var _default = ShapeView;
exports.default = _default;
},{"./layerView":"views/layerView.js"}],"controllers/layerController.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _layerModel = _interopRequireDefault(require("../models/layerModel"));

var _layerView = _interopRequireDefault(require("../views/layerView"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Layer = /*#__PURE__*/function () {
  function Layer(options) {
    _classCallCheck(this, Layer);

    this.model = new _layerModel.default(options);
    this.view = new _layerView.default();
    this.id = this.model.id; // Bindings

    this.add = this.add.bind(this);
    this.clearClickPosition = this.clearClickPosition.bind(this);
    this.getCenter = this.getCenter.bind(this);
    this.getProperties = this.getProperties.bind(this);
    this.getTransformOrigin = this.getTransformOrigin.bind(this);
    this.makeInactive = this.makeInactive.bind(this);
    this.makeActive = this.makeActive.bind(this);
    this.setClickPosition = this.setClickPosition.bind(this);
    this.setColor = this.setColor.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.setRelativePosition = this.setRelativePosition.bind(this);
    this.setRelativeProperties = this.setRelativeProperties.bind(this);
    this.setRelativeSize = this.setRelativeSize.bind(this);
    this.setRotation = this.setRotation.bind(this);
    this.setSize = this.setSize.bind(this);
    this.setTransformOrigin = this.setTransformOrigin.bind(this);
    this.update = this.update.bind(this);
  }

  _createClass(Layer, [{
    key: "add",
    value: function add(parent) {
      this.view.add(parent, this.model);
      this.model.setBoundsFromElement(this.view.element);
      return this;
    }
  }, {
    key: "clearClickPosition",
    value: function clearClickPosition() {
      this.model.clearClickPosition();
    }
  }, {
    key: "makeInactive",
    value: function makeInactive(layer) {
      this.model.makeInactive();
    }
  }, {
    key: "getCenter",
    value: function getCenter() {
      return this.model.getCenter();
    }
  }, {
    key: "getProperties",
    value: function getProperties() {
      return this.model;
    }
  }, {
    key: "getRotation",
    value: function getRotation() {
      return this.model.rotation;
    }
  }, {
    key: "getTransformOrigin",
    value: function getTransformOrigin() {
      return this.model.transformOrigin;
    }
  }, {
    key: "makeActive",
    value: function makeActive(layer) {
      this.model.makeActive();
    }
  }, {
    key: "remove",
    value: function remove() {
      this.view.remove();
    }
  }, {
    key: "setClickPosition",
    value: function setClickPosition(event) {
      this.model.setClickPosition(event);
      this.update();
    }
  }, {
    key: "setColor",
    value: function setColor(color) {
      this.model.setColor(color);
      this.update();
    }
  }, {
    key: "setPosition",
    value: function setPosition(left, top) {
      this.model.setPosition(left, top);
      this.update();
    }
  }, {
    key: "setRelativePosition",
    value: function setRelativePosition(parent) {
      this.model.setRelativePosition(parent);
    }
  }, {
    key: "setRelativeProperties",
    value: function setRelativeProperties(parent) {
      this.model.setRelativeProperties(parent);
    }
  }, {
    key: "setRelativeSize",
    value: function setRelativeSize(parent) {
      this.model.setRelativeSize(parent);
    }
  }, {
    key: "setRotation",
    value: function setRotation(deg) {
      this.model.setRotation(deg);
      this.update();
    }
  }, {
    key: "setSize",
    value: function setSize(width, height, origin) {
      this.model.setSize(width, height, origin);
      this.update();
    }
  }, {
    key: "setTransformOrigin",
    value: function setTransformOrigin(x, y) {
      this.model.setTransformOrigin(x, y);
      this.update();
    }
  }, {
    key: "setZIndex",
    value: function setZIndex(index) {
      this.model.zIndex = index;
    }
  }, {
    key: "update",
    value: function update() {
      this.model.update();
      this.model.setBoundsFromElement(this.view.element);
      this.view.update(this.model);
      if (this.transformHelper) this.transformHelper.update();
    }
  }]);

  return Layer;
}();

var _default = Layer;
exports.default = _default;
},{"../models/layerModel":"models/layerModel.js","../views/layerView":"views/layerView.js"}],"controllers/shapeController.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _shapeModel = _interopRequireDefault(require("../models/shapeModel"));

var _shapeView = _interopRequireDefault(require("../views/shapeView"));

var _layerController = _interopRequireDefault(require("./layerController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Shape = /*#__PURE__*/function (_LayerController) {
  _inherits(Shape, _LayerController);

  var _super = _createSuper(Shape);

  function Shape(options) {
    var _this;

    _classCallCheck(this, Shape);

    _this = _super.call(this, options);
    _this.type = 'shape';
    return _this;
  }

  return Shape;
}(_layerController.default);

var _default = Shape;
exports.default = _default;
},{"../models/shapeModel":"models/shapeModel.js","../views/shapeView":"views/shapeView.js","./layerController":"controllers/layerController.js"}],"models/groupModel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Point = _interopRequireDefault(require("../utils/Point"));

var _layerModel = _interopRequireDefault(require("./layerModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var GroupModel = /*#__PURE__*/function (_LayerModel) {
  _inherits(GroupModel, _LayerModel);

  var _super = _createSuper(GroupModel);

  function GroupModel(options) {
    var _this;

    _classCallCheck(this, GroupModel);

    _this = _super.call(this, options);
    _this.name = options.name || "Group ".concat(options.id);
    _this.type = 'group';
    _this.backgroundColor = 'none';
    _this.layers = []; // Bindings ///////

    _this.add = _this.add.bind(_assertThisInitialized(_this));
    _this.clearClickPosition = _this.clearClickPosition.bind(_assertThisInitialized(_this));
    _this.updateGroupBounds = _this.updateGroupBounds.bind(_assertThisInitialized(_this));
    _this.setLayerPositions = _this.setLayerPositions.bind(_assertThisInitialized(_this));
    _this.setLayerSizes = _this.setLayerSizes.bind(_assertThisInitialized(_this));
    _this.setRelativeProperties = _this.setRelativeProperties.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(GroupModel, [{
    key: "add",
    value: function add(layers) {
      var _this2 = this,
          _this$layers;

      layers.forEach(function (layer) {
        return layer.group = _this2;
      });

      (_this$layers = this.layers).push.apply(_this$layers, _toConsumableArray(layers));

      this.updateGroupBounds();
      return this.layers;
    }
  }, {
    key: "alignLayersTop",
    value: function alignLayersTop() {
      var startProps = this.layers[0].getProperties(),
          top = startProps.top;
      this.layers.forEach(function (layer) {
        var props = layer.getProperties();
        layer.setPosition(props.left, top);
      });
    }
  }, {
    key: "alignLayersLeft",
    value: function alignLayersLeft() {
      var startProps = this.layers[0].getProperties(),
          left = startProps.left;
      this.layers.forEach(function (layer) {
        var props = layer.getProperties();
        layer.setPosition(left, props.top);
      });
    }
  }, {
    key: "alignLayersRight",
    value: function alignLayersRight() {
      var startProps = this.layers[0].getProperties(),
          right = startProps.left + startProps.width;
      this.layers.forEach(function (layer) {
        var props = layer.getProperties();
        var thisRight = props.left + props.width;
        var difference = thisRight - right;
        layer.setPosition(props.left - difference, props.top);
      });
    }
  }, {
    key: "alignLayersBottom",
    value: function alignLayersBottom() {
      var startProps = this.layers[0].getProperties(),
          bottom = startProps.top + startProps.height;
      this.layers.forEach(function (layer) {
        var props = layer.getProperties();
        var thisBottom = props.top + props.height;
        var difference = thisBottom - bottom;
        layer.setPosition(props.left, props.top - difference);
      });
    }
  }, {
    key: "alignLayersCenterX",
    value: function alignLayersCenterX() {
      var center = this.layers[0].getCenter();
      this.layers.forEach(function (layer) {
        var props = layer.getProperties();
        var thisCenter = layer.getCenter();
        var centerDiff = thisCenter.x - center.x;
        layer.setPosition(props.left - centerDiff, props.top);
      });
    }
  }, {
    key: "alignLayersCenterY",
    value: function alignLayersCenterY() {
      var center = this.layers[0].getCenter();
      this.layers.forEach(function (layer) {
        var props = layer.getProperties();
        var thisCenter = layer.getCenter();
        var centerDiff = thisCenter.y - center.y;
        layer.setPosition(props.left, props.top - centerDiff);
      });
    }
  }, {
    key: "clearClickPosition",
    value: function clearClickPosition() {
      // Set group clickEvent
      this.clickEvent = undefined; // Set layers clickEvent

      this.layers.forEach(function (layer, i) {
        layer.clearClickPosition();
      });
    }
  }, {
    key: "forAllLayers",
    value: function forAllLayers(callback) {
      // Loop through layers
      this.layers.forEach(function (layer, i) {
        callback(layer, i);
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
    key: "getLayers",
    value: function getLayers() {
      return this.layers;
    }
  }, {
    key: "moveLayerBackward",
    value: function moveLayerBackward(layer) {
      var index = this.getLayerIndex(layer);

      if (index > 0) {
        // Switch z-index values
        this.layers[index - 1].model.zIndex = index;
        this.layers[index].model.zIndex = index - 1; // Switch values in array

        var _ref = [this.layers[index], this.layers[index - 1]];
        this.layers[index - 1] = _ref[0];
        this.layers[index] = _ref[1];
      }
    }
  }, {
    key: "moveLayerForward",
    value: function moveLayerForward(layer) {
      var index = this.getLayerIndex(layer);

      if (index !== this.layers.length - 1) {
        // Switch z-index values
        this.layers[index].model.zIndex = index + 1;
        this.layers[index + 1].model.zIndex = index; // Switch values in array

        var _ref2 = [this.layers[index], this.layers[index + 1]];
        this.layers[index + 1] = _ref2[0];
        this.layers[index] = _ref2[1];
      }
    }
  }, {
    key: "updateGroupBounds",
    value: function updateGroupBounds() {
      var width, height, top, left; // Loop through layers

      this.layers.forEach(function (layer, i) {
        var layerProps = layer.getProperties();

        if (i === 0) {
          width = layerProps.width;
          height = layerProps.height;
          top = layerProps.top;
          left = layerProps.left;
        } else {
          if (layerProps.top < top) {
            height += top - layerProps.top;
            top = layerProps.top;
          }

          if (layerProps.left < left) {
            width = width + left - layerProps.left;
            left = layerProps.left;
          }

          if (layerProps.left + layerProps.width > left + width) {
            width = width + layerProps.width - (width + left - layerProps.left);
          }

          if (layerProps.top + layerProps.height > top + height) {
            height = height + layerProps.height - (height + top - layerProps.top);
          }
        }
      });
      this.setSize(width, height);
      this.setPosition(left, top);
      this.center = new _Point.default(this.width / 2, this.height / 2);
      if (this.element) this.bounds = this.element.getBoundingClientRect();
    }
  }, {
    key: "removeLayer",
    value: function removeLayer(layer) {
      var index = this.getLayerIndex(layer);
      this.layers.splice(index, 1);
    }
  }, {
    key: "setRelativeProperties",
    value: function setRelativeProperties() {
      var _this3 = this;

      // Loop through layers
      this.layers.forEach(function (layer, i) {
        layer.setRelativeProperties(_this3);
      });
    }
  }, {
    key: "setLayerSizes",
    value: function setLayerSizes() {
      var _this4 = this;

      // Loop through layers
      this.layers.forEach(function (layer, i) {
        layer.setRelativeSize(_this4);
      });
    }
  }, {
    key: "setLayerPositions",
    value: function setLayerPositions() {
      var _this5 = this;

      // Loop through layers
      this.layers.forEach(function (layer, i) {
        layer.setRelativePosition(_this5);
      });
    }
  }, {
    key: "unGroupLayer",
    value: function unGroupLayer(layer) {
      var index = this.layers.indexOf(layer);
      this.layers.splice(index, 1);
    }
  }, {
    key: "updateLayers",
    value: function updateLayers() {
      var _this6 = this;

      // Loop through layers
      this.layers.forEach(function (layer, i) {
        layer.update(_this6);
      });
    }
  }]);

  return GroupModel;
}(_layerModel.default);

var _default = GroupModel;
exports.default = _default;
},{"../utils/Point":"utils/Point.js","./layerModel":"models/layerModel.js"}],"views/groupView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _layerView = _interopRequireDefault(require("./layerView"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var GroupView = /*#__PURE__*/function (_LayerView) {
  _inherits(GroupView, _LayerView);

  var _super = _createSuper(GroupView);

  function GroupView(options) {
    var _this;

    _classCallCheck(this, GroupView);

    _this = _super.call(this, options); // Bindings ///////

    _this.add = _this.add.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(GroupView, [{
    key: "add",
    value: function add(parent, groupObj) {
      this.parent = parent;
      var element = "<".concat(groupObj.tag, " class=\"shape\" id=\"").concat(groupObj.id, "\" style=\"top:").concat(groupObj.top, "px; left:").concat(groupObj.left, "px; width:").concat(groupObj.width, "px; height:").concat(groupObj.height, "px; pointer-events:none; background:").concat(groupObj.backgroundColor, "; z-index:").concat(groupObj.zIndex, "\"></").concat(groupObj.tag, ">");
      this.parent.insertAdjacentHTML('beforeend', element);
      this.element = this.parent.lastElementChild;
      return this;
    }
  }]);

  return GroupView;
}(_layerView.default);

var _default = GroupView;
exports.default = _default;
},{"./layerView":"views/layerView.js"}],"controllers/groupController.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _groupModel = _interopRequireDefault(require("../models/groupModel"));

var _groupView = _interopRequireDefault(require("../views/groupView"));

var _layerController = _interopRequireDefault(require("./layerController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Group = /*#__PURE__*/function (_LayerController) {
  _inherits(Group, _LayerController);

  var _super = _createSuper(Group);

  function Group(options) {
    var _this;

    _classCallCheck(this, Group);

    _this = _super.call(this, options);
    _this.model = new _groupModel.default(options);
    _this.view = new _groupView.default(options);
    _this.type = 'group';
    options.hasOwnProperty('temp') ? _this.temp = options.temp : _this.temp = false; // Bindings

    _this.add = _this.add.bind(_assertThisInitialized(_this));
    _this.alignLayersTop = _this.alignLayersTop.bind(_assertThisInitialized(_this));
    _this.alignLayersLeft = _this.alignLayersLeft.bind(_assertThisInitialized(_this));
    _this.alignLayersRight = _this.alignLayersRight.bind(_assertThisInitialized(_this));
    _this.alignLayersBottom = _this.alignLayersBottom.bind(_assertThisInitialized(_this));
    _this.alignLayersCenterX = _this.alignLayersCenterX.bind(_assertThisInitialized(_this));
    _this.alignLayersCenterY = _this.alignLayersCenterY.bind(_assertThisInitialized(_this));
    _this.clearClickPosition = _this.clearClickPosition.bind(_assertThisInitialized(_this));
    _this.setPosition = _this.setPosition.bind(_assertThisInitialized(_this));
    _this.updateGroupBounds = _this.updateGroupBounds.bind(_assertThisInitialized(_this));
    var alignTopBtn = document.getElementById('align-top');
    var alignLeftBtn = document.getElementById('align-left');
    var alignRightBtn = document.getElementById('align-right');
    var alignBottomBtn = document.getElementById('align-bottom');
    var alignCenterXBtn = document.getElementById('align-center-x');
    var alignCenterYBtn = document.getElementById('align-center-y');
    alignTopBtn.addEventListener('click', _this.alignLayersTop);
    alignLeftBtn.addEventListener('click', _this.alignLayersLeft);
    alignRightBtn.addEventListener('click', _this.alignLayersRight);
    alignBottomBtn.addEventListener('click', _this.alignLayersBottom);
    alignCenterXBtn.addEventListener('click', _this.alignLayersCenterX);
    alignCenterYBtn.addEventListener('click', _this.alignLayersCenterY);
    return _this;
  }

  _createClass(Group, [{
    key: "add",
    value: function add(layersArray, parent) {
      this.model.add(layersArray); // This adds an element to the dom for the transformHelper to reference

      if (parent) {
        this.view.add(parent, this.model);
        this.model.setBoundsFromElement(this.view.element);
      } // Relative properties must always be set


      this.setRelativeProperties();
    }
  }, {
    key: "alignLayersTop",
    value: function alignLayersTop() {
      this.model.alignLayersTop();
      this.updateGroupBounds();
      this.transformHelper.update();
    }
  }, {
    key: "alignLayersLeft",
    value: function alignLayersLeft() {
      this.model.alignLayersLeft();
      this.updateGroupBounds();
      this.transformHelper.update();
    }
  }, {
    key: "alignLayersRight",
    value: function alignLayersRight() {
      this.model.alignLayersRight();
      this.updateGroupBounds();
      this.transformHelper.update();
    }
  }, {
    key: "alignLayersBottom",
    value: function alignLayersBottom() {
      this.model.alignLayersBottom();
      this.updateGroupBounds();
      this.transformHelper.update();
    }
  }, {
    key: "alignLayersCenterX",
    value: function alignLayersCenterX() {
      this.model.alignLayersCenterX();
      this.updateGroupBounds();
      this.transformHelper.update();
    }
  }, {
    key: "alignLayersCenterY",
    value: function alignLayersCenterY() {
      this.model.alignLayersCenterY();
      this.updateGroupBounds();
      this.transformHelper.update();
    }
  }, {
    key: "clearClickPosition",
    value: function clearClickPosition() {
      this.model.clearClickPosition();
    }
  }, {
    key: "getLayers",
    value: function getLayers() {
      return this.model.getLayers();
    }
  }, {
    key: "moveLayerBackward",
    value: function moveLayerBackward(layer) {
      this.model.moveLayerBackward(layer);
    }
  }, {
    key: "moveLayerForward",
    value: function moveLayerForward(layer) {
      this.model.moveLayerForward(layer);
    }
  }, {
    key: "removeLayer",
    value: function removeLayer(layer) {
      this.model.removeLayer(layer);
    }
  }, {
    key: "setPermanant",
    value: function setPermanant() {
      this.visible = true;
      this.temp = false;
      this.sortByZIndex();
    }
  }, {
    key: "setPosition",
    value: function setPosition(left, top) {
      this.model.setPosition(left, top);
      this.update();
      this.model.setLayerPositions();
      this.updateLayers();
    } // setRotation(degrees) {
    //   this.model.setRotation(degrees);
    //   this.update();
    //   this.model.setLayerRotations();
    // }

  }, {
    key: "setSize",
    value: function setSize(width, height, origin) {
      this.model.setSize(width, height, origin);
      this.update();
      this.model.setLayerSizes();
      this.model.setLayerPositions();
      this.updateLayers();
    } // unGroupAllLayers() {
    //   let nestedLayers = this.getLayers();
    //   this.model.unGroupAllLayers();
    //   this.view.remove();
    //   return nestedLayers;
    // }

  }, {
    key: "sortByZIndex",
    value: function sortByZIndex() {
      this.model.layers.sort(function (cur, prev) {
        return cur.model.zIndex - prev.model.zIndex;
      });
    }
  }, {
    key: "unGroupLayer",
    value: function unGroupLayer(layer) {
      this.model.unGroupLayer(layer);
    }
  }, {
    key: "updateGroupBounds",
    value: function updateGroupBounds() {
      // Update the group bounds
      this.model.updateGroupBounds(); // Set the relative properties based on new bounds

      this.setRelativeProperties();
    }
  }, {
    key: "updateLayers",
    value: function updateLayers() {
      this.model.updateLayers();
    }
  }]);

  return Group;
}(_layerController.default);

var _default = Group;
exports.default = _default;
},{"../models/groupModel":"models/groupModel.js","../views/groupView":"views/groupView.js","./layerController":"controllers/layerController.js"}],"models/layersModel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _shapeController = _interopRequireDefault(require("../controllers/shapeController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Layers = /*#__PURE__*/function () {
  function Layers(layers) {
    _classCallCheck(this, Layers);

    // A nested layer structure
    this.layers = layers || []; // A flattened layer structure

    this.allLayers = layers || []; // Bindings //

    this.add = this.add.bind(this);
    this.includes = this.includes.bind(this);
    this.makeAllInactive = this.makeAllInactive.bind(this);
    this.remove = this.remove.bind(this);
    this.getLayerById = this.getLayerById.bind(this);
    this.getLayerIndex = this.getLayerIndex.bind(this);
  }

  _createClass(Layers, [{
    key: "add",
    value: function add(layerObject) {
      layerObject.model.zIndex = this.layers.length;
      this.layers.push(layerObject);
      this.allLayers.push(layerObject);
    }
  }, {
    key: "duplicate",
    value: function duplicate(layerObject, newId) {
      var layer = this.getLayerById(layerObject.id);
      var newLayer = new _shapeController.default(layer.model);
      newLayer.id = newId;
      newLayer.model.id = newId;
      newLayer.zIndex = newId;
      newLayer.model.name = newLayer.model.name + ' copy';
      this.add(newLayer);
      return newLayer;
    }
  }, {
    key: "flatten",
    value: function flatten(layers) {
      var _this = this;

      var flattened = [];
      layers.map(function (layer) {
        flattened.push(layer);

        if (layer.type === 'group') {
          var _flattened;

          var nested = _this.flatten(layer.getLayers());

          flattened = (_flattened = flattened).concat.apply(_flattened, _toConsumableArray(nested));
        }
      });
      return flattened;
    }
  }, {
    key: "flattenLayers",
    value: function flattenLayers() {
      return this.flatten(this.layers);
    }
  }, {
    key: "getLayerById",
    value: function getLayerById(id) {
      return this.allLayers.find(function (layer) {
        return layer.model.id === parseInt(id);
      });
    }
  }, {
    key: "getLayerIndex",
    value: function getLayerIndex(object, array) {
      var index = -1;
      if (!array) array = this.layers;

      for (var i = 0; i < array.length; i++) {
        var layer = array[i];

        if (layer.id === object.id) {
          index = i;
          break;
        }
      }

      return index;
    }
  }, {
    key: "groupLayer",
    value: function groupLayer(layer) {
      if (this.group) layer.unGroupLayer(layer);
      var index = this.getLayerIndex(layer);
      this.layers.splice(index, 1);
    }
  }, {
    key: "includes",
    value: function includes(layer) {
      return this.layers.includes(layer);
    }
  }, {
    key: "makeAllInactive",
    value: function makeAllInactive() {}
  }, {
    key: "moveLayerForward",
    value: function moveLayerForward(layer) {
      if (layer.group) {
        var group = layer.group;
        group.moveLayerForward(layer);
      } else {
        var index = this.getLayerIndex(layer);

        if (index !== this.layers.length - 1) {
          // Switch z-index values
          this.layers[index].model.zIndex = index + 1;
          this.layers[index + 1].model.zIndex = index; // Switch values in array

          var _ref = [this.layers[index], this.layers[index + 1]];
          this.layers[index + 1] = _ref[0];
          this.layers[index] = _ref[1];
        }
      }

      this.setAllZIndexes();
    }
  }, {
    key: "moveLayerBackward",
    value: function moveLayerBackward(layer) {
      // If the layer is nested in a group, let the group handle moving the layer
      if (layer.group) {
        var group = layer.group;
        group.moveLayerBackward(layer);
      } else {
        // Get the index of the layer
        var index = this.getLayerIndex(layer);

        if (index > 0) {
          // Switch z-index values
          this.layers[index - 1].model.zIndex = index;
          this.layers[index].model.zIndex = index - 1; // Switch values in array

          var _ref2 = [this.layers[index], this.layers[index - 1]];
          this.layers[index - 1] = _ref2[0];
          this.layers[index] = _ref2[1];
        }
      }

      this.setAllZIndexes();
    }
  }, {
    key: "moveLayerToFront",
    value: function moveLayerToFront(layer) {
      var index = this.getLayerIndex(layer);
      this.layers.splice(index, 1);
      this.layers.push(layer);
      this.setAllZIndexes();
    }
  }, {
    key: "moveLayerToBack",
    value: function moveLayerToBack(layer) {
      var index = this.getLayerIndex(layer);
      this.layers.splice(index, 1);
      this.layers.unshift(layer);
      this.setAllZIndexes();
    }
  }, {
    key: "unGroupAllLayers",
    value: function unGroupAllLayers(group) {
      var _this$layers;

      // Get the layers from the group
      var layers = group.getLayers(); // Set the group for each layer to null

      layers.forEach(function (layer) {
        return layer.group = null;
      }); // Get the index of the group in the layers array

      var index = this.getLayerIndex(group); // Insert the layers into the layers array

      (_this$layers = this.layers).splice.apply(_this$layers, [index, 0].concat(_toConsumableArray(layers)));

      console.log(this.layers);
    }
  }, {
    key: "setAllZIndexes",
    value: function setAllZIndexes() {
      // Flatten the groups to deterimine the layer order
      var layers = this.flattenLayers(); // Set the index for each layer based on the order and update

      layers.forEach(function (layer, i) {
        layer.setZIndex(i);
        layer.update();
      });
    }
  }, {
    key: "remove",
    value: function remove(object) {
      // Check if is nested within a group
      if (object.group) {
        var group = object.group;
        group.removeLayer(object);
      } else {
        // Get the index and remove it if it is found (if statement is necessary)
        var index = this.getLayerIndex(object);
        if (index >= 0) this.layers.splice(index, 1);
        index = this.getLayerIndex(object, this.allLayers);
        if (index >= 0) this.allLayers.splice(index, 1);
      }
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
},{"../controllers/shapeController":"controllers/shapeController.js"}],"views/layersView.js":[function(require,module,exports) {
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

var LayersPanelView = /*#__PURE__*/function () {
  function LayersPanelView(listEl, options) {
    _classCallCheck(this, LayersPanelView);

    if (!options) options = {};
    this.element = listEl;
    this.draggedElement = null;
    this.dropFailed = false;
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
      if (event.target.getAttribute('data-list-component') === 'group-expand-btn') {
        event.target.closest('.list-component-group').classList.toggle('collapsed');
        event.target.classList.toggle('expanded');
      }
    }); // Bindings

    this.dragEnd = this.dragEnd.bind(this);
    this.dragStart = this.dragStart.bind(this);
    this.dragOver = this.dragOver.bind(this);
    this.dragLeave = this.dragLeave.bind(this);
    this.drop = this.drop.bind(this);
    this.makeInactive = this.makeInactive.bind(this);
    this.makeAllInactive = this.makeAllInactive.bind(this);
    this.nestElement = this.nestElement.bind(this);
    this.recalculateChildren = this.recalculateChildren.bind(this);
    this.removeDivider = this.removeDivider.bind(this);
    this.setHoverPosition = this.setHoverPosition.bind(this); // Event Listeners

    this.element.addEventListener('dragstart', this.dragStart);
    this.element.addEventListener('drop', this.drop);
    this.element.addEventListener('dragover', this.dragOver);
    this.element.addEventListener('dragleave', this.dragLeave);
    this.element.addEventListener('dragend', this.dragEnd);
  }

  _createClass(LayersPanelView, [{
    key: "addLayer",
    value: function addLayer(layer, options) {
      var html,
          className = '';
      if (layer.active) className = 'active';
      if (!options) options = {};

      if (options.group) {
        html = "\n      <li class=\"list-component-group ".concat(className, "\" draggable=\"true\" data-list-component=\"group\">\n        <div id=\"for-").concat(options.targetId, "\" class=\"group list-component-group-name\" data-list-component=\"group-name\">\n        <span class=\"expand-icon expanded\" data-list-component=\"group-expand-btn\">&rsaquo;</span>\n          ").concat(layer.name, "\n        </div>\n        <ul class=\"list-component-group-body\" data-list-component=\"group-body\"></ul>\n      </li>");
      } else {
        html = "<li id=\"for-".concat(options.targetId, "\" class=\"").concat(className, "\" draggable=\"true\">").concat(layer.name, "</li>");
      }

      this.element.insertAdjacentHTML('afterbegin', html);
      this.recalculateChildren();
    }
  }, {
    key: "dragStart",
    value: function dragStart(event, callback) {
      // Initialize drop failed
      this.dropFailed = true; // Grab the target element index for later

      var targetIndex = this.children.indexOf(event.target);
      event.dataTransfer.setData('text', targetIndex); // Cache it for easy reference

      this.draggedElement = event.target;
      this.draggedElement.classList.add('active-drag');
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
          divider = (_readOnlyError("divider"), event.target.nextElementSibling);
        } else {
          event.target.parentNode.insertBefore(divider, event.target.nextElementSibling);
        }
      }

      if (this.hoverPosition === 'top' && !this.isGroupComponent(event.target)) {
        if (event.target === this.element || event.target === divider) return;

        if (!divider) {
          event.target.insertAdjacentElement('beforebegin', this.divider.element);
          divider = (_readOnlyError("divider"), event.target.nextElementSibling);
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
    key: "dragEnd",
    value: function dragEnd(event) {
      // Reset the style attribute on the layer if the drop failed
      if (this.dropFailed) {
        this.draggedElement.setAttribute('style', '');
        this.removeDivider();
      }

      this.dropSuccess = true;
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
      this.dropFailed = false;
      var targetIndex = event.dataTransfer.getData('text');
      var thisEl = this.children[targetIndex]; // Remove all helper styles/elements

      this.removeDivider();
      event.target.classList.remove('hover');
      this.draggedElement.classList.remove('active-drag');
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
    key: "getLayerElementById",
    value: function getLayerElementById(id) {
      return document.getElementById("for-".concat(id));
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
        target.nextElementSibling.insertAdjacentElement('beforeend', thisEl);
      } else if (target.getAttribute('data-list-component') === 'group') {
        target.lastElementChild.insertAdjacentElement('beforeend', thisEl);
      } else if (target.getAttribute('data-list-component') === 'group-body') {
        target.insertAdjacentElement('beforeend', thisEl);
      } else {
        var li = document.createElement('li');
        li.setAttribute('draggable', 'true');
        li.setAttribute('data-list-component', 'group');
        li.classList.add('list-component-group');
        li.innerHTML = "\n    <div class=\"group list-component-group-name\" data-list-component=\"group-name\">\n    \t<span class=\"expand-icon expanded\" data-list-component=\"group-expand-btn\">&rsaquo;</span>\n    \tgroup\n    </div>";
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
    key: "unNestElement",
    value: function unNestElement(layer) {
      var layerEl = this.getLayerElementById(layer.id);
      if (!layerEl) return;
      layerEl.parentNode.parentNode.parentNode.insertAdjacentElement('beforeend', layerEl);
    }
  }, {
    key: "unNestAllElements",
    value: function unNestAllElements(group) {
      var layers = group.getLayers();

      for (var i = layers.length - 1; i >= 0; i--) {
        var layer = layers[i];
        this.unNestElement(layer);
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
      var layerEl = this.getLayerElementById(layer.id);
      if (!layerEl) return;

      if (layer.type === 'group' && !layer.temp) {
        layerEl.parentNode.parentNode.removeChild(layerEl.parentNode);
      } else {
        layerEl.parentNode.removeChild(layerEl);
      }
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
      var layerEl = this.getLayerElementById(layer.id);
      if (!layerEl) return;

      if (layer.type === 'group') {
        layerEl.parentNode.classList.add('active');
      } else {
        layerEl.classList.add('active');
      }
    }
  }, {
    key: "makeInactive",
    value: function makeInactive(layer) {
      var layerEl = this.getLayerElementById(layer.id);
      if (layerEl) layerEl.classList.remove('active');
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
    key: "moveLayerForward",
    value: function moveLayerForward(layer) {
      var thisLayer = this.getLayerElementById(layer.id);
      if (layer.type === 'group') thisLayer = thisLayer.parentElement;
      thisLayer.previousSibling.insertAdjacentElement('beforebegin', thisLayer);
    }
  }, {
    key: "moveLayerBackward",
    value: function moveLayerBackward(layer) {
      var thisLayer = this.getLayerElementById(layer.id);
      if (layer.type === 'group') thisLayer = thisLayer.parentElement;
      thisLayer.nextElementSibling.insertAdjacentElement('afterend', thisLayer);
    }
  }, {
    key: "moveLayerToFront",
    value: function moveLayerToFront(layer) {
      var thisLayer = this.getLayerElementById(layer.id);
      if (layer.type === 'group') thisLayer = thisLayer.parentElement;
      this.element.insertAdjacentElement('afterbegin', thisLayer);
    }
  }, {
    key: "moveLayerToBack",
    value: function moveLayerToBack(layer) {
      var thisLayer = this.getLayerElementById(layer.id);
      if (layer.type === 'group') thisLayer = thisLayer.parentElement;
      this.element.insertAdjacentElement('beforeend', thisLayer);
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

  return LayersPanelView;
}();

function flattenChildren(arr) {
  var newArr = [];

  for (var i = 0; i < arr.length; i++) {
    newArr.push(arr[i]);
    if (arr[i].children.length > 0) newArr.push.apply(newArr, _toConsumableArray(flattenChildren(_toConsumableArray(arr[i].children))));
  }

  return newArr;
}

var _default = LayersPanelView;
exports.default = _default;
},{}],"controllers/layersController.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _layersModel = _interopRequireDefault(require("../models/layersModel"));

var _layersView = _interopRequireDefault(require("../views/layersView"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LayersPanel = /*#__PURE__*/function () {
  function LayersPanel() {
    _classCallCheck(this, LayersPanel);

    this.model = new _layersModel.default();
    this.view = new _layersView.default(document.getElementById('layers-panel-list')); // Bindings

    this.add = this.add.bind(this);
    this.duplicate = this.duplicate.bind(this);
    this.includes = this.includes.bind(this);
    this.getLayerById = this.getLayerById.bind(this);
    this.makeInactive = this.makeInactive.bind(this);
    this.makeActive = this.makeActive.bind(this);
    this.moveLayerForward = this.moveLayerForward.bind(this);
    this.moveLayerBackward = this.moveLayerBackward.bind(this);
    this.remove = this.remove.bind(this);
  }

  _createClass(LayersPanel, [{
    key: "add",
    value: function add(layer) {
      this.model.add(layer);
      var options = {
        targetId: layer.model.id
      };
      if (layer.model.visible) this.view.addLayer(layer.model, options);
    }
  }, {
    key: "duplicate",
    value: function duplicate(layer, id) {
      var newLayer = this.model.duplicate(layer.model, id);
      var options = {
        targetId: layer.model.id
      };
      this.add(newLayer, options);
      return newLayer;
    }
  }, {
    key: "flattenLayers",
    value: function flattenLayers() {
      var layers = this.model.flattenLayers();
      return layers;
    }
  }, {
    key: "getLayerById",
    value: function getLayerById(id) {
      return this.model.getLayerById(id);
    }
  }, {
    key: "groupLayer",
    value: function groupLayer(layer) {
      this.model.groupLayer(layer);
    }
  }, {
    key: "includes",
    value: function includes(layer) {
      return this.model.includes(layer);
    }
  }, {
    key: "makeAllInactive",
    value: function makeAllInactive() {
      this.view.makeAllInactive();
    }
  }, {
    key: "makeActive",
    value: function makeActive(layer) {
      this.view.makeActive(layer);
    }
  }, {
    key: "makeInactive",
    value: function makeInactive(layer) {
      this.view.makeInactive(layer);
    }
  }, {
    key: "moveLayerForward",
    value: function moveLayerForward(layer) {
      // console.log(this.model.layers);
      // console.log(this.model.allLayers);
      this.model.moveLayerForward(layer);
      this.view.moveLayerForward(layer);
    }
  }, {
    key: "moveLayerBackward",
    value: function moveLayerBackward(layer) {
      // console.log(this.model.layers);
      // console.log(this.model.allLayers);
      this.model.moveLayerBackward(layer);
      this.view.moveLayerBackward(layer);
    }
  }, {
    key: "moveLayerToFront",
    value: function moveLayerToFront(layer) {
      this.model.moveLayerToFront(layer);
      this.view.moveLayerToFront(layer);
    }
  }, {
    key: "moveLayerToBack",
    value: function moveLayerToBack(layer) {
      this.model.moveLayerToBack(layer);
      this.view.moveLayerToBack(layer);
    }
  }, {
    key: "moveLayerToPosition",
    value: function moveLayerToPosition(layer) {}
  }, {
    key: "remove",
    value: function remove(layer) {
      this.model.remove(layer);
      this.view.remove(layer);
      layer.remove();
    }
  }, {
    key: "setGroupPermanant",
    value: function setGroupPermanant(group) {
      var options = {
        targetId: group.model.id,
        group: true
      }; // Create the layer

      this.view.addLayer(group.model, options); // Nest the children in the parent

      var children = group.model.getLayers();
      var parent = this.view.getLayerElementById(group.id);

      if (children) {
        for (var i = children.length - 1; i >= 0; i--) {
          var item = children[i];
          var child = this.view.getLayerElementById(item.id);
          this.view.nestElement(parent, child);
        }
      }
    }
  }, {
    key: "unGroupAllLayers",
    value: function unGroupAllLayers(group) {
      if (!group.temp) this.view.unNestAllElements(group);
      this.model.unGroupAllLayers(group);
      this.remove(group);
    }
  }, {
    key: "unGroupLayer",
    value: function unGroupLayer(layer) {}
  }]);

  return LayersPanel;
}();

var _default = LayersPanel;
exports.default = _default;
},{"../models/layersModel":"models/layersModel.js","../views/layersView":"views/layersView.js"}],"views/layerDetailsView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LayerDetailsView = /*#__PURE__*/function () {
  function LayerDetailsView() {
    _classCallCheck(this, LayerDetailsView);

    this.layerDetailsElement = document.getElementById('layer-details-panel');
    this.elementType = document.getElementById('layer-detail_elementType');
    this.elementX = document.getElementById('layer-detail_elementX');
    this.elementY = document.getElementById('layer-detail_elementY');
    this.elementRotation = document.getElementById('layer-detail_elementRotation');
    this.elementWidth = document.getElementById('layer-detail_elementWidth');
    this.elementHeight = document.getElementById('layer-detail_elementHeight');
    this.elementFillType = document.getElementById('layer-detail_elementFillType');
    this.elementSolidColor = document.getElementById('layer-detail_elementSolidColor'); // Bindings

    this.getValue = this.getValue.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  _createClass(LayerDetailsView, [{
    key: "getValue",
    value: function getValue(element) {
      var value = this[element].value;
      if (!value) value = 0;

      if (this[element].classList.contains('select')) {
        value = this[element].querySelector('.select-box-text').innerText;
        value = value.toLowerCase();
      }

      return value;
    }
  }, {
    key: "setValue",
    value: function setValue(element, value) {
      if (!value) value = '';

      if (this[element].classList.contains('select')) {
        if (value) value = capitalize(value);
        this[element].querySelector('.select-box-text').innerText = value;
      }

      this[element].value = value;
    }
  }]);

  return LayerDetailsView;
}();

var _default = LayerDetailsView;
exports.default = _default;

function capitalize(string) {
  var newString = string.split('');
  newString[0] = newString[0].toUpperCase();
  return newString.join('');
}
},{}],"controllers/layerDetailsController.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _layerDetailsView = _interopRequireDefault(require("../views/layerDetailsView"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LayerDetailsController = /*#__PURE__*/function () {
  function LayerDetailsController(layer) {
    _classCallCheck(this, LayerDetailsController);

    this.view = new _layerDetailsView.default();

    if (layer) {
      this.model = layer.model;
      this.layer = layer;
    } // Bindings


    this.setActiveLayer = this.setActiveLayer.bind(this);
    this.setAll = this.setAll.bind(this);
    this.updateAll = this.updateAll.bind(this); // Event Listeners

    this.view.layerDetailsElement.addEventListener('input', this.setAll);
  }

  _createClass(LayerDetailsController, [{
    key: "getNumberValue",
    value: function getNumberValue(element) {
      return parseInt(this.view.getValue(element));
    }
  }, {
    key: "setActiveLayer",
    value: function setActiveLayer(layer) {
      if (layer) {
        this.model = layer.model;
        this.layer = layer;
      } else {
        this.layer = undefined;
        this.model = undefined;
      }
    }
  }, {
    key: "setInactiveLayer",
    value: function setInactiveLayer() {
      this.model = undefined;
      this.layer = undefined;
    }
  }, {
    key: "setAll",
    value: function setAll() {
      var data = this.model;
      data.left = this.getNumberValue('elementX');
      data.top = this.getNumberValue('elementY');
      data.type = this.view.getValue('elementType');
      data.rotation = this.getNumberValue('elementRotation');
      data.width = this.getNumberValue('elementWidth');
      data.height = this.getNumberValue('elementHeight');
      data.backgroundColor = this.view.elementSolidColor.value;
      if (this.layer) this.layer.update();
    }
  }, {
    key: "updateAll",
    value: function updateAll() {
      var data;
      !this.model ? data = {} : data = this.model;
      this.view.setValue('elementX', data.left);
      this.view.setValue('elementY', data.top);
      this.view.setValue('elementType', data.type);
      this.view.setValue('elementRotation', data.rotation);
      this.view.setValue('elementWidth', data.width);
      this.view.setValue('elementHeight', data.height);
      this.view.setValue('elementSolidColor', data.backgroundColor); // this.view.setValue('elementFillType', 'Solid Color');
    }
  }]);

  return LayerDetailsController;
}();

var _default = LayerDetailsController;
exports.default = _default;
},{"../views/layerDetailsView":"views/layerDetailsView.js"}],"KeyMap.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var KeyMap = /*#__PURE__*/function () {
  function KeyMap() {
    _classCallCheck(this, KeyMap);

    this.alt = false;
    this.ctrl = false;
    this.shift = false;
    this.delete = false;
    this.arrowup = false;
    this.arrowright = false;
    this.arrowdown = false;
    this.arrowleft = false;
    this.a = false;
    this.b = false;
    this.c = false;
    this.d = false;
    this.e = false;
    this.f = false;
    this.g = false;
    this.h = false;
    this.j = false;
    this.k = false;
    this.l = false;
    this.m = false;
    this.n = false;
    this.o = false;
    this.p = false;
    this.q = false;
    this.r = false;
    this.s = false;
    this.t = false;
    this.v = false;
    this.w = false;
    this.x = false;
    this.y = false;
    this.z = false;
  }

  _createClass(KeyMap, [{
    key: "keydown",
    value: function keydown(event) {
      var key = event.key.toLowerCase();
      this[key] = true;
    }
  }, {
    key: "keyup",
    value: function keyup(event) {
      var key = event.key.toLowerCase();
      this[key] = false;
    }
  }]);

  return KeyMap;
}();

var _default = KeyMap;
exports.default = _default;
},{}],"KeyboardEvents.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _KeyMap = _interopRequireDefault(require("./KeyMap"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var KeyHandler = /*#__PURE__*/function () {
  function KeyHandler() {
    _classCallCheck(this, KeyHandler);

    this.keysDown = new _KeyMap.default();
    this.actions = {
      delete: ['delete'],
      duplicate: ['control', 'd'],
      group: ['control', 'g'],
      groupingMode: ['shift'],
      layerForward: ['arrowup'],
      layerBackward: ['arrowdown'],
      layerToFront: ['control', 'arrowup'],
      layerToBack: ['control', 'arrowdown'],
      ungroup: ['shift', 'g']
    }; // If a keypress combination matches an action it will be added to the on handler.
    // This handler can be assigned functions like so:
    // keyHandler.on.delete = function();

    this.on = {};
    this.getAction = this.getAction.bind(this);
    this.getKeys = this.getKeys.bind(this);
    this.keydown = this.keydown.bind(this);
    this.keyup = this.keyup.bind(this);
    document.addEventListener('keydown', this.keydown);
    document.addEventListener('keyup', this.keyup);
  }

  _createClass(KeyHandler, [{
    key: "getAction",
    value: function getAction() {
      var keys = this.getKeys();
      keys = keys.sort().join(' ');
      var actionKeys = Object.keys(this.actions);

      for (var _i = 0, _actionKeys = actionKeys; _i < _actionKeys.length; _i++) {
        var action = _actionKeys[_i];
        var thisActionKeys = this.actions[action].sort().join(' ');
        if (thisActionKeys === keys) return action;
      }
    }
  }, {
    key: "getKeys",
    value: function getKeys() {
      var keysDown = [];
      var keys = Object.keys(this.keysDown);

      for (var _i2 = 0, _keys = keys; _i2 < _keys.length; _i2++) {
        var key = _keys[_i2];
        if (this.keysDown[key]) keysDown.push(key);
      }

      return keysDown;
    }
  }, {
    key: "keydown",
    value: function keydown(event) {
      this.keysDown.keydown(event);
      var action = this.getAction();

      try {
        var func = this.on[action];
        func();
      } catch (error) {}
    }
  }, {
    key: "keyup",
    value: function keyup(event) {
      this.keysDown.keyup(event);
    }
  }, {
    key: "setAction",
    value: function setAction(action, keysArray) {
      this.actions[action] = keysArray;
    }
  }]);

  return KeyHandler;
}();

var _default = KeyHandler;
exports.default = _default;
},{"./KeyMap":"KeyMap.js"}],"Canvas.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _TransformHelper = _interopRequireDefault(require("./TransformHelper"));

var _shapeController = _interopRequireDefault(require("./controllers/shapeController"));

var _groupController = _interopRequireDefault(require("./controllers/groupController"));

var _layersController = _interopRequireDefault(require("./controllers/layersController"));

var _layerDetailsController = _interopRequireDefault(require("./controllers/layerDetailsController"));

var _Point = _interopRequireDefault(require("./utils/Point"));

var _KeyboardEvents = _interopRequireDefault(require("./KeyboardEvents"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Canvas = /*#__PURE__*/function () {
  function Canvas(canvas) {
    var _this = this;

    _classCallCheck(this, Canvas);

    this.element = canvas;
    this.bounds = this.element.getBoundingClientRect();
    this.id = 0;
    this.drawStart = {};
    this.drawEnd = {};
    this.isMouseDown = false;
    this.shape = 'rectangle';
    this.activeLayer = undefined;
    this.mode = 'draw';
    this.editMode = 'select';
    this.layers = new _layersController.default();
    this.layerDetails = new _layerDetailsController.default();
    this.transformHelper = new _TransformHelper.default();
    this.updates = {};
    this.modifiers = {
      altDown: false,
      shiftDown: false
    }; // Initialize the keyboard handler

    this.keyHandler = new _KeyboardEvents.default(); // Add functions to keys

    this.keyHandler.on.delete = function () {
      return _this.deleteLayer(_this.activeLayer);
    };

    this.keyHandler.on.duplicate = function () {
      return _this.duplicateLayer(_this.activeLayer);
    };

    this.keyHandler.on.group = function () {
      return _this.makeGroupPermanant();
    };

    this.keyHandler.on.groupingMode = function () {
      return _this.changeEditMode('grouping');
    };

    this.keyHandler.on.layerForward = function () {
      return _this.moveActiveLayerForward();
    };

    this.keyHandler.on.layerBackward = function () {
      return _this.moveActiveLayerBackward();
    };

    this.keyHandler.on.ungroup = function () {
      return _this.unGroupAllLayers(_this.activeLayer);
    }; // BINDINGS ///////////////////////


    this.addLayer = this.addLayer.bind(this);
    this.addTempGroup = this.addTempGroup.bind(this);
    this.duplicateLayer = this.duplicateLayer.bind(this);
    this.keyup = this.keyup.bind(this);
    this.makeActiveLayer = this.makeActiveLayer.bind(this);
    this.mousedown = this.mousedown.bind(this);
    this.mouseup = this.mouseup.bind(this);
    this.mousemove = this.mousemove.bind(this);
    this.updateLayerDetails = this.updateLayerDetails.bind(this);
    canvas.addEventListener('mousedown', this.mousedown);
    canvas.addEventListener('mouseup', this.mouseup);
    canvas.addEventListener('mousemove', this.mousemove); // Key bindings

    document.addEventListener('keydown', this.keydown);
    document.addEventListener('keyup', this.keyup);
  }

  _createClass(Canvas, [{
    key: "addLayer",
    value: function addLayer(options) {
      var shape = new _shapeController.default(options);
      var parent = this.element;
      this.layers.makeAllInactive();
      this.makeActiveLayer(shape.add(parent));
      this.layers.add(shape);
      this.transformHelper.set(shape);
      this.id++;
    }
  }, {
    key: "addGroup",
    value: function addGroup(group) {
      group.setPermanant();
      this.layers.setGroupPermanant(group);
    }
  }, {
    key: "addTempGroup",
    value: function addTempGroup(layers, parent) {
      var _this2 = this;

      var options = {
        id: this.id,
        visible: false,
        temp: true
      };
      var group = new _groupController.default(options);
      if (layers) group.add(layers, parent);
      this.layers.add(group);
      layers.forEach(function (layer) {
        return _this2.layers.groupLayer(layer);
      });
      this.id++;
      return group;
    }
  }, {
    key: "addLayerToGroup",
    value: function addLayerToGroup(layer, group) {
      group.add([layer]);
      this.layers.groupLayer(layer);
      return group;
    }
  }, {
    key: "changeEditMode",
    value: function changeEditMode(mode) {
      this.editMode = mode;
    }
  }, {
    key: "clearActiveLayer",
    value: function clearActiveLayer() {
      // Exit if there is not activeLayer
      if (!this.activeLayer) return; // Make the layer in layers panel inactive

      this.layers.makeAllInactive(); // If the activeLayer is a temp group remove it

      if (this.activeLayer.temp) this.layers.remove(this.activeLayer); // Make sure the activeLayer is cleared

      this.activeLayer = undefined; // Clear the layer details panel

      this.updateLayerDetails(); // Remove the transformHelper

      this.transformHelper.remove();
    }
  }, {
    key: "deleteLayer",
    value: function deleteLayer(layer) {
      // If layer is group, delete all containing layers before deleting the group
      if (layer.type === 'group') {
        var layers = layer.getLayers();
        layers.forEach(function (curLayer) {
          // this.layers.remove(curLayer); // Remove from layers panel
          curLayer.remove(); // Remove layer shape
        });
      }

      this.layers.remove(layer); // Remove from layers panel

      this.activeLayer.remove(); // Remove layer shape

      this.activeLayer = undefined;
      this.transformHelper.remove();
      this.updateLayerDetails();
    }
  }, {
    key: "duplicateLayer",
    value: function duplicateLayer(layer) {
      var newLayer = this.layers.duplicate(layer, this.id);
      newLayer.add(this.element);
      this.makeActiveLayer(newLayer);
      this.transformHelper.set(newLayer);
      this.id++;
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
        // shift

        case 16:
          this.modifiers.shiftDown = false;
          this.editMode = 'select';
          break;

        default:
          break;
      }
    }
  }, {
    key: "makeActiveLayer",
    value: function makeActiveLayer(object) {
      var _this3 = this;

      // Update group bounds first
      if (object.type === 'group') object.updateGroupBounds(); // Make the shape on canvas active

      if (this.activeLayer) {
        this.activeLayer.active = false;
        this.layers.makeAllInactive();
      }

      this.activeLayer = object;
      this.activeLayer.makeActive();
      this.transformHelper.set(object); // Make the layer in layers panel active

      this.layers.makeActive(this.activeLayer);

      if (object.type === 'group' && object.temp) {
        var layers = object.getLayers();
        layers.forEach(function (layer) {
          return _this3.layers.makeActive(layer);
        });
      }

      this.updateLayerDetails();
    }
  }, {
    key: "makeGroupPermanant",
    value: function makeGroupPermanant() {
      if (this.activeLayer.temp && this.activeLayer.type === 'group') this.addGroup(this.activeLayer);
    }
  }, {
    key: "mousedown",
    value: function mousedown(event) {
      this.isMouseDown = true; // Initialize these variables

      this.drawStart = copy(this.mousePosition);
      this.drawEnd = copy(this.mousePosition);
      this.transformOrigin = copy(this.mousePosition); // Inital shape options

      var shapeOptions = {
        top: this.drawStart.y,
        left: this.drawStart.x,
        height: 0,
        width: 0,
        type: this.shape,
        id: this.id,
        backgroundColor: this.shapeColor,
        transformOrigin: copy(this.mousePosition)
      }; // HANDLE CANVAS INTERACTIONS

      if (this.mode === 'draw') this.addLayer(shapeOptions);

      if (this.mode === 'edit' && this.editMode !== 'grouping') {
        // Get the target layer
        var target = this.layers.getLayerById(event.target.id); // If target layer exists and it isn't the helper make it active

        if (target && event.target.id !== 'transform-helper-box') this.makeActiveLayer(target); // If the click is on the canvas clear the active layer

        if (event.target.id === this.element.id) {
          if (this.activeLayer.temp) this.unGroupAllLayers(this.activeLayer);
          this.clearActiveLayer();
        } // Attach the helper to the active layer or remove if it doesn't exist


        if (this.activeLayer) {
          this.transformHelper.set(this.activeLayer);
        } else {
          this.transformHelper.remove();
        } // Change mode when clicking anchor


        if (event.target.classList.contains('anchor')) {
          this.editMode = 'resize'; // Set global transform origin to correct position

          this.setTransformOrigin(event);
        } // Change mode when clicking rotate


        var rotateIcon = event.target.closest('.rotate-icon');

        if (rotateIcon) {
          this.editMode = 'rotate'; // Set global transform origin to correct position

          this.setTransformOrigin(event); // Get the rotation angle of initial click

          this.drawStartAngle = rotationAngle(this.transformOrigin.x, this.transformOrigin.y, this.mousePosition.x, this.mousePosition.y);
          this.drawStartShapeRotation = this.activeLayer.getRotation();
        }
      }

      if (this.mode === 'edit' && this.editMode === 'grouping') {
        var group; // Get the target layer

        var _target = this.layers.getLayerById(event.target.id);

        if (this.activeLayer.temp) {
          // If the active layer is a temp group assign it to group
          group = this.activeLayer; // Add the layer to temp group if temp group exists

          this.addLayerToGroup(_target, group);
        } else {
          // Group the activelayer and target layer in a temporary group
          group = this.addTempGroup([this.activeLayer, _target], this.element);
        } // If target layer exists and it isn't the helper make it active


        if (_target && event.target.id !== 'transform-helper-box') this.makeActiveLayer(group); // Attach the helper to the active layer or remove if it doesn't exist

        if (this.activeLayer) {
          this.transformHelper.set(this.activeLayer);
        } else {
          this.transformHelper.remove();
        }
      }

      if (this.mode === 'edit' && this.activeLayer && event.target.id === 'transform-helper-box') {
        this.editMode = 'move';
        this.activeLayer.setClickPosition(event);
      }
    }
  }, {
    key: "mouseup",
    value: function mouseup(event) {
      this.isMouseDown = false;
      this.resize = false; // Clear the click position after releasing the object - enables accurate manipulation of size/position/rotation of groups and their contents

      if (this.activeLayer) this.activeLayer.clearClickPosition();

      if (this.activeLayer && this.mode === 'draw') {
        var layer = this.activeLayer.getProperties(); // If the shapes dimensions is 0 0 then remove it

        if (layer.width === 0 || layer.height === 0) {
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
        this.resizeLayer(this.activeLayer);
        this.updateLayerDetails();
      }

      if (this.isMouseDown && this.editMode === 'resize') {
        this.resizeLayer(this.activeLayer);
        this.updateLayerDetails();
      }

      if (this.isMouseDown && this.editMode === 'rotate') {
        this.rotateActiveLayer();
        this.updateLayerDetails();
      }

      if (this.isMouseDown === true && this.mode === 'edit' && this.editMode === 'move' && this.activeLayer) {
        this.activeLayer.setPosition(this.mousePosition.x, this.mousePosition.y);
        this.updateLayerDetails();
      }
    }
  }, {
    key: "moveActiveLayerForward",
    value: function moveActiveLayerForward() {
      this.layers.moveLayerForward(this.activeLayer);
      this.activeLayer.update();
    }
  }, {
    key: "moveActiveLayerBackward",
    value: function moveActiveLayerBackward() {
      this.layers.moveLayerBackward(this.activeLayer);
      this.activeLayer.update();
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
    key: "removeActiveLayer",
    value: function removeActiveLayer() {
      this.activeLayer.active = false;
      this.activeLayer = undefined;
    }
  }, {
    key: "removeGroup",
    value: function removeGroup(group) {
      this.layers.remove(group); // this.makeActiveLayer();
    }
  }, {
    key: "resizeLayer",
    value: function resizeLayer(layer) {
      var mousePosition = this.mousePosition;
      var activeLayer = layer.getProperties();
      var transformOrigin = this.transformOrigin;

      if (mousePosition.x >= transformOrigin.x) {
        this.drawWidth = mousePosition.x - transformOrigin.x;
      } else {
        this.drawWidth = transformOrigin.x - mousePosition.x;
        activeLayer.left = transformOrigin.x - this.drawWidth;
      }

      if (mousePosition.y >= transformOrigin.y) {
        this.drawHeight = mousePosition.y - transformOrigin.y;
      } else {
        this.drawHeight = transformOrigin.y - mousePosition.y;
        activeLayer.top = transformOrigin.y - this.drawHeight;
      }

      layer.setSize(this.drawWidth, this.drawHeight);
      layer.setTransformOrigin(transformOrigin.x, transformOrigin.y);
      this.transformHelper.update();
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
      var activeLayer = this.activeLayer.getProperties();
      var classes = event.target.classList;
      var x, y; // Rotation

      if (this.editMode === 'rotate') {
        x = activeLayer.left + activeLayer.width / 2;
        y = activeLayer.top + activeLayer.height / 2;
        activeLayer.setTransformOrigin(x, y);
        this.transformOrigin = new _Point.default(x, y);
        this.transformHelper.update();
        return;
      } // Normal case


      if (classes.contains('bottom-right')) {
        x = activeLayer.left;
        y = activeLayer.top;
      }

      if (classes.contains('bottom-left')) {
        x = activeLayer.left + activeLayer.width;
        y = activeLayer.top;
      }

      if (classes.contains('top-left')) {
        x = activeLayer.left + activeLayer.width;
        y = activeLayer.top + activeLayer.height;
      }

      if (classes.contains('top-right')) {
        x = activeLayer.left;
        y = activeLayer.top + activeLayer.height;
      } // Set transformation origin


      activeLayer.setTransformOrigin(x, y);
      this.transformOrigin = new _Point.default(x, y);
      this.transformHelper.update();
    }
  }, {
    key: "unGroupAllLayers",
    value: function unGroupAllLayers(group) {
      if (group.type !== 'group') return;
      this.layers.unGroupAllLayers(group);
      this.transformHelper.remove();
    }
  }, {
    key: "updateLayerDetails",
    value: function updateLayerDetails() {
      // Put the active layer in the layer details panel
      this.layerDetails.setActiveLayer(this.activeLayer); // Update the layer details panel

      this.layerDetails.updateAll();
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
},{"./TransformHelper":"TransformHelper.js","./controllers/shapeController":"controllers/shapeController.js","./controllers/groupController":"controllers/groupController.js","./controllers/layersController":"controllers/layersController.js","./controllers/layerDetailsController":"controllers/layerDetailsController.js","./utils/Point":"utils/Point.js","./KeyboardEvents":"KeyboardEvents.js"}],"controllers/copyCSSController.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var copyCSS = /*#__PURE__*/function () {
  function copyCSS() {
    _classCallCheck(this, copyCSS);

    this.css = '';
    this.copyCSS = this.copyCSS.bind(this);
    var cssBtn = document.getElementById('copy-css');
    cssBtn.addEventListener('click', this.copyCSS);
  }

  _createClass(copyCSS, [{
    key: "copyCSS",
    value: function copyCSS() {
      this.setCSS();
      this.copyToClipboard(this.css);
    }
  }, {
    key: "setCSS",
    value: function setCSS() {
      this.css = "body {\n  background: lightgray;\n}\n\n#canvas {\n  display: block;\n  position: relative;\n  width: 100%;\n  height: 100vh;\n}\n\n.shape {\n  display: inline-block;\n  position: absolute;\n}\n\n.ellipse {\n  border-radius: 50%;\n}\n";
    }
  }, {
    key: "copyToClipboard",
    value: function copyToClipboard(str) {
      var el = document.createElement('textarea');
      el.value = str;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
  }]);

  return copyCSS;
}();

var _default = copyCSS;
exports.default = _default;
},{}],"controllers/copyHTMLController.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var copyHTML = /*#__PURE__*/function () {
  function copyHTML() {
    _classCallCheck(this, copyHTML);

    this.element = document.getElementById('canvas');
    this.copyElement = this.copyElement.bind(this);
    this.copyCanvas = this.copyCanvas.bind(this);
    var copyBtn = document.getElementById('copy-html');
    copyBtn.addEventListener('click', this.copyCanvas);
  }

  _createClass(copyHTML, [{
    key: "copyCanvas",
    value: function copyCanvas() {
      this.copyToClipboard("".concat(this.element.outerHTML));
    }
  }, {
    key: "copyElement",
    value: function copyElement(element) {
      var doc = document;
      var text = doc.getElementById(element);
      var range;
      var selection;

      if (doc.body.createTextRange) {
        range = doc.body.createTextRange();
        range.moveToElement(text);
        range.select();
      } else if (window.getSelection) {
        selection = window.getSelection();
        range = doc.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
      }

      document.execCommand('copy');
      window.getSelection().removeAllRanges();
      document.getElementById('clickMe').value = 'Copied to clipboard!';
    }
  }, {
    key: "copyToClipboard",
    value: function copyToClipboard(str) {
      var el = document.createElement('textarea');
      el.value = str;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
  }]);

  return copyHTML;
}();

var _default = copyHTML;
exports.default = _default;
},{}],"views/customSelect.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function customSelect() {
  var dropdowns = document.querySelectorAll('.select');
  var dropdownChange = new Event('input');
  dropdowns.forEach(function (dropdown) {
    dropdown.addEventListener('click', toggleDropdown);
  });

  function toggleDropdown(event) {
    var dropdown = event.target.closest('.select');
    var dropdownOptions = dropdown.querySelector('.select-options');
    var dropdownBoxText = dropdown.querySelector('.select-box-text');
    var option = event.target.closest('.select-options-item');

    if (option) {
      if (dropdownBoxText.innerText !== option.innerText) {
        dropdownBoxText.innerText = option.innerText;
        dropdown.dispatchEvent(dropdownChange);
      }
    }

    dropdown.classList.toggle('active');
    dropdownOptions.classList.toggle('hidden');
  }
}

var _default = customSelect;
exports.default = _default;
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _Canvas = _interopRequireDefault(require("./Canvas"));

var _copyCSSController = _interopRequireDefault(require("./controllers/copyCSSController"));

var _copyHTMLController = _interopRequireDefault(require("./controllers/copyHTMLController"));

var _customSelect = _interopRequireDefault(require("./views/customSelect"));

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
    this.menu = options.menu;
    this.updates = [];
    this.copyCSS = new _copyCSSController.default();
    this.copyHTML = new _copyHTMLController.default(); // Bindings

    this.handleUpdates = this.handleUpdates.bind(this);
    this.mousedown = this.mousedown.bind(this);
    this.mouseup = this.mouseup.bind(this);
    this.keydown = this.keydown.bind(this); // Event Listeners

    document.addEventListener('mousedown', this.mousedown);
    document.addEventListener('mouseup', this.mouseup);
    document.addEventListener('keydown', this.keydown);
  }

  _createClass(App, [{
    key: "handleUpdates",
    value: function handleUpdates() {}
  }, {
    key: "pullUpdates",
    value: function pullUpdates(module) {}
  }, {
    key: "mousedown",
    value: function mousedown(event) {
      // HANDLE LAYERS PANEL INTERACTIONS
      if (event.target.closest("#".concat(this.canvas.layers.view.element.id))) {
        var id = event.target.id.split('-')[1];
        var thisLayer = this.canvas.layers.getLayerById(id);
        if (thisLayer) this.canvas.makeActiveLayer(thisLayer);
      }
    }
  }, {
    key: "mouseup",
    value: function mouseup(event) {}
  }, {
    key: "keydown",
    value: function keydown(event) {}
  }]);

  return App;
}();

var appOptions = {
  canvas: document.getElementById('canvas'),
  layersListElement: document.getElementById('layers-panel-list')
};
var app = new App(appOptions);
(0, _customSelect.default)(); //TODO: EXPORT THESE INTO A UI CLASS

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
    app.canvas.mode = mode;
    app.canvas.element.className = mode;
  });
}); // Toggle the buttons in the button groups

var btnGroup = _toConsumableArray(document.querySelectorAll('.ui-group-toggle'));

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
    var button = event.target.closest('button');
    var activeLayer = app.canvas.activeLayer;

    switch (button.getAttribute('data-action')) {
      case 'group':
        app.canvas.makeGroupPermanant(activeLayer);
        break;

      case 'ungroup':
        app.canvas.unGroupAllLayers(activeLayer);
        break;

      case 'layer-front':
        app.canvas.layers.moveLayerToFront(activeLayer);
        break;

      case 'layer-forward':
        app.canvas.layers.moveLayerForward(activeLayer);
        break;

      case 'layer-backward':
        app.canvas.layers.moveLayerBackward(activeLayer);
        break;

      case 'layer-back':
        app.canvas.layers.moveLayerToBack(activeLayer);
        break;

      default:
        break;
    }
  });
}); // Set the current layer color
// const colorPicker = document.getElementById('shape-color');
},{"./Canvas":"Canvas.js","./controllers/copyCSSController":"controllers/copyCSSController.js","./controllers/copyHTMLController":"controllers/copyHTMLController.js","./views/customSelect":"views/customSelect.js"}],"../../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49960" + '/');

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