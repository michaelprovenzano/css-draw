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

  flattenLayers() {
    let layers = this.model.flattenLayers();
    return layers;
  }

  getLayerById(id) {
    return this.model.getLayerById(id);
  }

  groupLayer(layer) {
    this.model.groupLayer(layer);
  }

  includes(layer) {
    return this.model.includes(layer);
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
    // console.log(this.model.layers);
    // console.log(this.model.allLayers);

    this.model.moveLayerForward(layer);
    this.view.moveLayerForward(layer);
  }

  moveLayerBackward(layer) {
    // console.log(this.model.layers);
    // console.log(this.model.allLayers);

    this.model.moveLayerBackward(layer);
    this.view.moveLayerBackward(layer);
  }

  moveLayerToFront(layer) {
    this.model.moveLayerToFront(layer);
    this.view.moveLayerToFront(layer);
  }

  moveLayerToBack(layer) {
    this.model.moveLayerToBack(layer);
    this.view.moveLayerToBack(layer);
  }

  moveLayerToPosition(layer) {}

  remove(layer) {
    this.model.remove(layer);
    this.view.remove(layer);
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

    if (children) {
      for (let i = children.length - 1; i >= 0; i--) {
        let item = children[i];
        let child = this.view.getLayerElementById(item.id);
        this.view.nestElement(parent, child);
      }
    }
  }

  unGroupAllLayers(group) {
    this.view.unNestAllElements(group);
    this.model.unGroupAllLayers(group);
    this.remove(group);
  }

  unGroupLayer(layer) {}
}

export default LayersPanel;
