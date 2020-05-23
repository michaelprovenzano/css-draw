import TransformHelper from './TransformHelper';
import Shape from './Shape';
import Layers from './Layers';
import Utils from './Utils';

class Canvas {
  constructor(canvas) {
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
    this.layers = new Layers();
    this.transformHelper = new TransformHelper();
    this.updates = {};
    this.modifiers = {
      altDown: false,
    };

    // BINDINGS ///////////////////////
    this.keydown = this.keydown.bind(this);
    this.keyup = this.keyup.bind(this);
    this.makeActiveLayer = this.makeActiveLayer.bind(this);
    this.mousedown = this.mousedown.bind(this);
    this.mouseup = this.mouseup.bind(this);
    this.mousemove = this.mousemove.bind(this);
    this.drawShape = this.drawShape.bind(this);

    canvas.addEventListener('mousedown', this.mousedown);
    canvas.addEventListener('mouseup', this.mouseup);
    canvas.addEventListener('mousemove', this.mousemove);

    // Key bindings
    document.addEventListener('keydown', this.keydown);
    document.addEventListener('keyup', this.keyup);
  }

  drawShape(options) {
    const shape = new Shape(options);
    const parent = this.element;

    this.makeActiveLayer(shape.add(parent));
    this.layers.add(shape);

    this.transformHelper.set(shape);
    this.id++;
  }

  keydown(event) {
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
        const newLayer = this.layers.duplicate(this.activeLayer, this.id);
        this.makeActiveLayer(newLayer);
        this.id++;
        break;
      default:
        break;
    }
  }

  keyup(event) {
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

  makeActiveLayer(object) {
    if (this.activeLayer) this.activeLayer.active = false;
    this.activeLayer = object;
    this.activeLayer.active = true;
    this.transformHelper.set(this.activeLayer);
    this.updates.changeActiveLayer = true;
  }

  removeActiveLayer() {
    this.activeLayer.active = false;
    this.activeLayer = undefined;
  }

  mousedown(event) {
    this.isMouseDown = true;

    // Initialize these variables
    this.drawStart = copy(this.mousePosition);
    this.drawEnd = copy(this.mousePosition);
    this.transformOrigin = copy(this.mousePosition);

    const shapeOptions = {
      top: this.drawStart.y,
      left: this.drawStart.x,
      height: 0,
      width: 0,
      type: this.shape,
      id: this.id,
      backgroundColor: this.shapeColor,
    };

    if (this.mode === 'draw') this.drawShape(shapeOptions);
    if (this.mode === 'edit') {
      // Get the target layer
      const target = this.layers.getLayerById(event.target.id);

      // If target layer exists and it isn't the helper make it active
      if (target && event.target.id !== 'transform-helper-box') this.makeActiveLayer(target);

      // Attach the helper to the active layer or remove if it doesn't exist
      if (this.activeLayer) {
        this.transformHelper.set(this.activeLayer);
      } else {
        this.transformHelper.remove();
      }

      // Change mode when clicking anchor
      if (event.target.classList.contains('anchor')) {
        if (this.modifiers.altDown) {
          this.editMode = 'rotate';
        } else {
          this.editMode = 'resize';
        }

        // Set global transform origin to correct position
        this.setTransformOrigin(event);

        // Get the rotation angle of initial click
        this.drawStartAngle = rotationAngle(
          this.transformOrigin.x,
          this.transformOrigin.y,
          this.mousePosition.x,
          this.mousePosition.y
        );
        this.drawStartShapeRotation = this.activeLayer.rotation;
      }
    }

    if (this.mode === 'edit' && this.activeLayer && event.target.id === 'transform-helper-box') {
      this.editMode = 'move';
      this.activeLayer.updateOnClick(event);
    }
  }

  mouseup(event) {
    this.isMouseDown = false;
    this.resize = false;
    if (this.activeLayer && this.mode === 'draw') {
      if (this.activeLayer.width === 0 || this.activeLayer.height === 0) {
        this.layers.remove(this.activeLayer);
      }
    }

    if (this.mode === 'edit') this.editMode === 'select';
  }

  mousemove(event) {
    const canvasBounds = this.bounds;
    this.mousePosition = {
      x: event.clientX - canvasBounds.left,
      y: event.clientY - canvasBounds.top,
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
    if (
      this.isMouseDown === true &&
      this.mode === 'edit' &&
      this.editMode === 'move' &&
      this.activeLayer
    ) {
      this.activeLayer.move(this.mousePosition.x, this.mousePosition.y);
    }
  }

  relativeMousePosition() {
    return {
      x: this.mousePosition.x - this.activeLayer.left,
      y: this.mousePosition.y - this.activeLayer.top,
    };
  }

  resizeActiveLayer() {
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

  rotateActiveLayer() {
    let angle = rotationAngle(
      this.transformOrigin.x,
      this.transformOrigin.y,
      this.mousePosition.x,
      this.mousePosition.y
    );

    angle = angle + 180 - this.drawStartAngle + this.drawStartShapeRotation;
    this.activeLayer.setRotation(angle);
  }

  setTransformOrigin(event) {
    if (this.modifiers.altDown) {
      this.transformOrigin = {
        x: this.activeLayer.left + this.activeLayer.width / 2,
        y: this.activeLayer.top + this.activeLayer.height / 2,
      };
      return;
    }
    if (event.target.classList.contains('bottom-right')) {
      this.transformOrigin = {
        x: this.activeLayer.left,
        y: this.activeLayer.top,
      };
    }
    if (event.target.classList.contains('bottom-left')) {
      this.transformOrigin = {
        x: this.activeLayer.left + this.activeLayer.width,
        y: this.activeLayer.top,
      };
    }
    if (event.target.classList.contains('top-left')) {
      this.transformOrigin = {
        x: this.activeLayer.left + this.activeLayer.width,
        y: this.activeLayer.top + this.activeLayer.height,
      };
    }
    if (event.target.classList.contains('top-right')) {
      this.transformOrigin = {
        x: this.activeLayer.left,
        y: this.activeLayer.top + this.activeLayer.height,
      };
    }
  }
}

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

export default Canvas;
