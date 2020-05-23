import LayersPanelModel from '../models/layersModel';
import LayersPanelView from '../views/layersView';

class LayersPanel {
  constructor() {
    this.model = new LayersPanelModel();
    this.view = new LayersPanelView(document.getElementById('layers-panel-list'));

    // Bindings
    this.add = this.add.bind(this);
    this.duplicate = this.duplicate.bind(this);
    this.getLayerById = this.getLayerById.bind(this);
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

    this.view.addLayer(layer.model, options);
  }

  duplicate(layer) {
    this.model.duplicate(layer.model);
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

  moveLayerForward(layer) {}

  moveLayerBackward(layer) {}

  remove(layer) {
    this.model.remove(layer.model);
    this.view.remove(layer.model);
  }
}

export default LayersPanel;
