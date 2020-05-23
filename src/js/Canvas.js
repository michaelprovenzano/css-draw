import TransformHelper from './TransformHelper';
import Shape from './controllers/shapeController';
import Layers from './controllers/layersController';
import Point from './utils/Point';

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

    this.layers.makeAllInactive();
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
        this.activeLayer.remove();
        this.activeLayer = undefined;
        this.transformHelper.remove();
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
        this.drawShape(this.layers.model);
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
    // Make the shape on canvas active
    if (this.activeLayer) {
      this.activeLayer.active = false;
      this.layers.makeAllInactive();
    }
    this.activeLayer = object;
    this.activeLayer.makeActive();
    this.transformHelper.set(object);

    // Make the layer in layers panel active
    this.layers.makeActive(this.activeLayer);
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
      transformOrigin: copy(this.mousePosition),
    };

    // HANDLE CANVAS INTERACTIONS
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
      this.activeLayer.setClickPosition(event);
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
      this.resizeLayer(this.activeLayer);
    }
    if (this.isMouseDown && this.editMode === 'resize') {
      this.resizeLayer(this.activeLayer);
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
      this.activeLayer.setPosition(this.mousePosition.x, this.mousePosition.y);
    }
  }

  relativeMousePosition() {
    return {
      x: this.mousePosition.x - this.activeLayer.left,
      y: this.mousePosition.y - this.activeLayer.top,
    };
  }

  resizeLayer(layer) {
    const mousePosition = this.mousePosition;
    const activeLayer = layer.getProperties();
    const transformOrigin = this.transformOrigin;

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
    const activeLayer = this.activeLayer.getProperties();
    const classes = event.target.classList;
    let x, y;

    // MODIFIERS
    if (this.modifiers.altDown) {
      x = activeLayer.left + activeLayer.width / 2;
      y = activeLayer.top + activeLayer.height / 2;

      activeLayer.setTransformOrigin(x, y);
      this.transformOrigin = new Point(x, y);
      this.transformHelper.update();
      return;
    }

    // Normal case
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
    }

    // Set transformation origin
    activeLayer.setTransformOrigin(x, y);
    this.transformOrigin = new Point(x, y);
    this.transformHelper.update();
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
