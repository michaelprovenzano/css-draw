import GroupModel from '../models/groupModel';
import GroupView from '../views/groupView';
import LayerController from './layerController';

class Group extends LayerController {
  constructor(options) {
    super(options);

    this.model = new GroupModel(options);
    this.view = new GroupView(options);
    this.type = 'group';
    options.hasOwnProperty('temp') ? (this.temp = options.temp) : (this.temp = false);

    // Bindings
    this.add = this.add.bind(this);
    this.clearClickPosition = this.clearClickPosition.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.updateGroupBounds = this.updateGroupBounds.bind(this);
  }

  add(layersArray, parent) {
    this.model.add(layersArray);

    // This adds an element to the dom for the transformHelper to reference
    if (parent) {
      this.view.add(parent, this.model);
      this.model.setBoundsFromElement(this.view.element);
    }

    // Relative properties must always be set
    this.setRelativeProperties();
  }

  clearClickPosition() {
    this.model.clearClickPosition();
  }

  getLayers() {
    return this.model.getLayers();
  }

  moveLayerBackward(layer) {
    this.model.moveLayerBackward(layer);
  }

  moveLayerForward(layer) {
    this.model.moveLayerForward(layer);
  }

  removeLayer(layer) {
    this.model.removeLayer(layer);
  }

  setPermanant() {
    this.visible = true;
    this.temp = false;
    this.sortByZIndex();
  }

  setPosition(left, top) {
    this.model.setPosition(left, top);
    this.update();

    this.model.setLayerPositions();
    this.updateLayers();
  }

  // setRotation(degrees) {
  //   this.model.setRotation(degrees);
  //   this.update();

  //   this.model.setLayerRotations();

  // }

  setSize(width, height, origin) {
    this.model.setSize(width, height, origin);
    this.update();

    this.model.setLayerSizes();
    this.model.setLayerPositions();
    this.updateLayers();
  }

  // unGroupAllLayers() {
  //   let nestedLayers = this.getLayers();
  //   this.model.unGroupAllLayers();
  //   this.view.remove();

  //   return nestedLayers;
  // }

  sortByZIndex() {
    this.model.layers.sort((cur, prev) => {
      return cur.model.zIndex - prev.model.zIndex;
    });
  }

  unGroupLayer(layer) {
    this.model.unGroupLayer(layer);
  }

  updateGroupBounds() {
    // Update the group bounds
    this.model.updateGroupBounds();

    // Set the relative properties based on new bounds
    this.setRelativeProperties();
  }

  updateLayers() {
    this.model.updateLayers();
  }
}

export default Group;
