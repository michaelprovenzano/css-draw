import GroupModel from '../models/groupModel';
import GroupView from '../views/groupView';
import LayerController from './layerController';

class Group extends LayerController {
  constructor(options) {
    super(options);

    this.model = new GroupModel(options);
    this.view = new GroupView(options);
    this.type = 'group';

    // Bindings
    this.add = this.add.bind(this);
    this.setPosition = this.setPosition.bind(this);
  }

  add(layersArray, parent) {
    this.model.add(layersArray);
    if (parent) {
      this.view.add(parent, this.model);
      this.model.setBoundsFromElement(this.view.element);
      this.setRelativeProperties();
    }
  }

  setPosition(left, top) {
    this.model.setPosition(left, top);
    this.update();

    this.model.setLayerPositions();
    this.updateLayers();
  }

  setSize(width, height, origin) {
    this.model.setSize(width, height, origin);
    this.update();

    this.model.setLayerSizes();
    this.model.setLayerPositions();
    this.updateLayers();
  }

  updateLayers() {
    this.model.updateLayers();
  }
}

export default Group;
