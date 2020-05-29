import LayersPanelModel from '../models/layersModel';
import LayersPanelView from '../views/layersView';

class LayersPanel {
  constructor() {
    this.model = new LayersPanelModel();
    this.view = new LayersPanelView(document.getElementById('layers-panel-list'));

    // Bindings
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

  add(layer) {
    this.model.add(layer);

    const options = {
      targetId: layer.model.id,
    };

    if (layer.model.visible) this.view.addLayer(layer.model, options);
  }

  duplicate(layer, id) {
    let newLayer = this.model.duplicate(layer.model, id);

    const options = {
      targetId: layer.model.id,
    };

    this.add(newLayer, options);

    return newLayer;
  }

  includes(layer) {
    return this.model.includes(layer);
  }

  getLayerById(id) {
    return this.model.getLayerById(id);
  }

  makeAllInactive() {
    this.view.makeAllInactive();
  }

  makeActive(layer) {
    this.view.makeActive(layer);
  }

  makeInactive(layer) {
    this.view.makeInactive(layer);
  }

  moveLayerForward(layer) {
    this.model.moveLayerForward(layer);
    this.view.moveLayerForward(layer);
  }

  moveLayerBackward(layer) {
    this.model.moveLayerBackward(layer);
    this.view.moveLayerBackward(layer);
  }

  moveLayerToFront(layer) {
    console.log(layer);
  }

  moveLayerToBack(layer) {
    console.log(layer);
  }

  moveLayerToPosition(layer) {}

  remove(layer) {
    this.model.remove(layer.model);
    this.view.remove(layer.model);
  }

  setGroupPermanant(group) {
    const options = {
      targetId: group.model.id,
      group: true,
    };

    // Create the layer
    this.view.addLayer(group.model, options);

    // Nest the children in the parent
    let children = group.model.getLayers();
    let parent = this.view.getLayerElementById(group.id);

    if (children)
      children.forEach(item => {
        let child = this.view.getLayerElementById(item.id);
        this.view.nestElement(parent, child);
      });
  }
}

export default LayersPanel;
