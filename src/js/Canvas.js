import TransformHelper from './TransformHelper';
import Shape from './controllers/shapeController';
import Group from './controllers/groupController';
import Layers from './controllers/layersController';
import LayerDetails from './controllers/layerDetailsController';
import Point from './utils/Point';
import KeyHandler from './KeyboardEvents';

class Canvas {
  constructor(canvas) {
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
    this.layers = new Layers();
    this.layerDetails = new LayerDetails();
    this.transformHelper = new TransformHelper();
    this.updates = {};
    this.modifiers = {
      altDown: false,
      shiftDown: false,
    };

    // Initialize the keyboard handler
    this.keyHandler = new KeyHandler();

    // Add functions to keys
    this.keyHandler.on.delete = () => this.deleteLayer(this.activeLayer);
    this.keyHandler.on.duplicate = () => this.duplicateLayer(this.activeLayer);
    this.keyHandler.on.group = () => this.makeGroupPermanant();
    this.keyHandler.on.groupingMode = () => this.changeEditMode('grouping');
    this.keyHandler.on.layerForward = () => this.moveActiveLayerForward();
    this.keyHandler.on.layerBackward = () => this.moveActiveLayerBackward();
    this.keyHandler.on.ungroup = () => this.unGroupAllLayers(this.activeLayer);

    // BINDINGS ///////////////////////
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
    canvas.addEventListener('mousemove', this.mousemove);

    // Key bindings
    document.addEventListener('keydown', this.keydown);
    document.addEventListener('keyup', this.keyup);
  }

  addLayer(options) {
    const shape = new Shape(options);
    const parent = this.element;

    this.layers.makeAllInactive();
    this.makeActiveLayer(shape.add(parent));
    this.layers.add(shape);

    this.transformHelper.set(shape);
    this.id++;
  }

  addGroup(group) {
    group.setPermanant();
    this.layers.setGroupPermanant(group);
  }

  addTempGroup(layers, parent) {
    let options = {
      id: this.id,
      visible: false,
      temp: true,
    };

    const group = new Group(options);

    if (layers) group.add(layers, parent);
    this.layers.add(group);
    layers.forEach(layer => this.layers.groupLayer(layer));

    this.id++;

    return group;
  }

  addLayerToGroup(layer, group) {
    group.add([layer]);
    this.layers.groupLayer(layer);
    return group;
  }

  changeEditMode(mode) {
    this.editMode = mode;
  }

  clearActiveLayer() {
    // Exit if there is not activeLayer
    if (!this.activeLayer) return;

    // Make the layer in layers panel inactive
    this.layers.makeAllInactive();

    // If the activeLayer is a temp group remove it
    if (this.activeLayer.temp) this.layers.remove(this.activeLayer);

    // Make sure the activeLayer is cleared
    this.activeLayer = undefined;

    // Clear the layer details panel
    this.updateLayerDetails();

    // Remove the transformHelper
    this.transformHelper.remove();
  }

  deleteLayer(layer) {
    // If layer is group, delete all containing layers before deleting the group
    if (layer.type === 'group') {
      let layers = layer.getLayers();

      layers.forEach(curLayer => {
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

  duplicateLayer(layer) {
    const newLayer = this.layers.duplicate(layer, this.id);
    newLayer.add(this.element);
    this.makeActiveLayer(newLayer);
    this.transformHelper.set(newLayer);
    this.id++;
  }

  keyup(event) {
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

  makeActiveLayer(object) {
    // Update group bounds first
    if (object.type === 'group') object.updateGroupBounds();

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

    if (object.type === 'group' && object.temp) {
      let layers = object.getLayers();
      layers.forEach(layer => this.layers.makeActive(layer));
    }

    this.updateLayerDetails();
  }

  makeGroupPermanant() {
    if (this.activeLayer.temp && this.activeLayer.type === 'group') this.addGroup(this.activeLayer);
  }

  mousedown(event) {
    this.isMouseDown = true;

    // Initialize these variables
    this.drawStart = copy(this.mousePosition);
    this.drawEnd = copy(this.mousePosition);
    this.transformOrigin = copy(this.mousePosition);

    // Inital shape options
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
    if (this.mode === 'draw') this.addLayer(shapeOptions);
    if (this.mode === 'edit' && this.editMode !== 'grouping') {
      // Get the target layer
      const target = this.layers.getLayerById(event.target.id);

      // If target layer exists and it isn't the helper make it active
      if (target && event.target.id !== 'transform-helper-box') this.makeActiveLayer(target);

      // If the click is on the canvas clear the active layer
      if (event.target.id === this.element.id) {
        if (this.activeLayer.temp) this.unGroupAllLayers(this.activeLayer);
        this.clearActiveLayer();
      }

      // Attach the helper to the active layer or remove if it doesn't exist
      if (this.activeLayer) {
        this.transformHelper.set(this.activeLayer);
      } else {
        this.transformHelper.remove();
      }

      // Change mode when clicking anchor
      if (event.target.classList.contains('anchor')) {
        this.editMode = 'resize';

        // Set global transform origin to correct position
        this.setTransformOrigin(event);
      }

      // Change mode when clicking rotate
      let rotateIcon = event.target.closest('.rotate-icon');
      if (rotateIcon) {
        this.editMode = 'rotate';

        // Set global transform origin to correct position
        this.setTransformOrigin(event);

        // Get the rotation angle of initial click
        this.drawStartAngle = rotationAngle(
          this.transformOrigin.x,
          this.transformOrigin.y,
          this.mousePosition.x,
          this.mousePosition.y
        );

        this.drawStartShapeRotation = this.activeLayer.getRotation();
      }
    }
    if (this.mode === 'edit' && this.editMode === 'grouping') {
      let group;

      // Get the target layer
      let target = this.layers.getLayerById(event.target.id);

      if (this.activeLayer.temp) {
        // If the active layer is a temp group assign it to group
        group = this.activeLayer;

        // Add the layer to temp group if temp group exists
        this.addLayerToGroup(target, group);
      } else {
        // Group the activelayer and target layer in a temporary group
        group = this.addTempGroup([this.activeLayer, target], this.element);
      }

      // If target layer exists and it isn't the helper make it active
      if (target && event.target.id !== 'transform-helper-box') this.makeActiveLayer(group);

      // Attach the helper to the active layer or remove if it doesn't exist
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

  mouseup(event) {
    this.isMouseDown = false;
    this.resize = false;

    // Clear the click position after releasing the object - enables accurate manipulation of size/position/rotation of groups and their contents
    if (this.activeLayer) this.activeLayer.clearClickPosition();

    if (this.activeLayer && this.mode === 'draw') {
      let layer = this.activeLayer.getProperties();

      // If the shapes dimensions is 0 0 then remove it
      if (layer.width === 0 || layer.height === 0) {
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
    if (
      this.isMouseDown === true &&
      this.mode === 'edit' &&
      this.editMode === 'move' &&
      this.activeLayer
    ) {
      this.activeLayer.setPosition(this.mousePosition.x, this.mousePosition.y);
      this.updateLayerDetails();
    }
  }

  moveActiveLayerForward() {
    this.layers.moveLayerForward(this.activeLayer);
    this.activeLayer.update();
  }

  moveActiveLayerBackward() {
    this.layers.moveLayerBackward(this.activeLayer);
    this.activeLayer.update();
  }

  relativeMousePosition() {
    return {
      x: this.mousePosition.x - this.activeLayer.left,
      y: this.mousePosition.y - this.activeLayer.top,
    };
  }

  removeActiveLayer() {
    this.activeLayer.active = false;
    this.activeLayer = undefined;
  }

  removeGroup(group) {
    this.layers.remove(group);
    // this.makeActiveLayer();
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

    // Rotation
    if (this.editMode === 'rotate') {
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

  unGroupAllLayers(group) {
    if (group.type !== 'group') return;
    this.layers.unGroupAllLayers(group);
    this.transformHelper.remove();
  }

  updateLayerDetails() {
    // Put the active layer in the layer details panel
    this.layerDetails.setActiveLayer(this.activeLayer);

    // Update the layer details panel
    this.layerDetails.updateAll();
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
