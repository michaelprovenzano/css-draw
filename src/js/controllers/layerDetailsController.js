import LayerDetailsView from '../views/layerDetailsView';

class LayerDetailsController {
  constructor(layer) {
    this.view = new LayerDetailsView();
    if (layer) {
      this.model = layer.model;
      this.layer = layer;
    }

    // Bindings
    this.setActiveLayer = this.setActiveLayer.bind(this);
    this.setAll = this.setAll.bind(this);
    this.updateAll = this.updateAll.bind(this);

    // Event Listeners
    this.view.layerDetailsElement.addEventListener('input', this.setAll);
  }

  getNumberValue(element) {
    return parseInt(this.view.getValue(element));
  }

  setActiveLayer(layer) {
    if (layer) {
      this.model = layer.model;
      this.layer = layer;
    } else {
      this.layer = undefined;
      this.model = undefined;
    }
  }

  setInactiveLayer() {
    this.model = undefined;
    this.layer = undefined;
  }

  setAll() {
    let data = this.model;

    data.left = this.getNumberValue('elementX');
    data.top = this.getNumberValue('elementY');
    data.type = this.view.getValue('elementType');
    data.rotation = this.getNumberValue('elementRotation');
    data.width = this.getNumberValue('elementWidth');
    data.height = this.getNumberValue('elementHeight');

    if (this.layer) this.layer.update();
  }

  updateAll() {
    let data;
    !this.model ? (data = {}) : (data = this.model);

    this.view.setValue('elementX', data.left);
    this.view.setValue('elementY', data.top);
    this.view.setValue('elementType', data.type);
    this.view.setValue('elementRotation', data.rotation);
    this.view.setValue('elementWidth', data.width);
    this.view.setValue('elementHeight', data.height);
    // this.view.setValue('elementFillType', 'Solid Color');
  }
}

export default LayerDetailsController;
