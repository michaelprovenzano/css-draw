import Point from '../utils/Point';
import LayerModel from './layerModel';

class GroupModel extends LayerModel {
  constructor(options) {
    super(options);
    this.name = options.name || `Group ${options.id}`;
    this.type = 'group';
    this.backgroundColor = 'none';
    this.layers = [];

    // Bindings ///////
    this.add = this.add.bind(this);
    this.clearClickPosition = this.clearClickPosition.bind(this);
    this.updateGroupBounds = this.updateGroupBounds.bind(this);
    this.setLayerPositions = this.setLayerPositions.bind(this);
    this.setLayerSizes = this.setLayerSizes.bind(this);
    this.setRelativeProperties = this.setRelativeProperties.bind(this);
  }

  add(layers) {
    this.layers.forEach(layer => (layer.group = this));
    this.layers.push(...layers);
    this.updateGroupBounds();
    return this.layers;
  }

  clearClickPosition() {
    // Set group clickEvent
    this.clickEvent = undefined;

    // Set layers clickEvent
    this.layers.forEach((layer, i) => {
      layer.clearClickPosition();
    });
  }

  forAllLayers(callback) {
    // Loop through layers
    this.layers.forEach((layer, i) => {
      callback(layer, i);
    });
  }

  getLayers() {
    return this.layers;
  }

  updateGroupBounds() {
    let width, height, top, left;

    // Loop through layers
    this.layers.forEach((layer, i) => {
      let layerProps = layer.getProperties();
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

    this.center = new Point(this.width / 2, this.height / 2);
    if (this.element) this.bounds = this.element.getBoundingClientRect();
  }

  setRelativeProperties() {
    // Loop through layers
    this.layers.forEach((layer, i) => {
      layer.setRelativeProperties(this);
    });
  }

  setLayerSizes() {
    // Loop through layers
    this.layers.forEach((layer, i) => {
      layer.setRelativeSize(this);
    });
  }

  setLayerPositions() {
    // Loop through layers
    this.layers.forEach((layer, i) => {
      layer.setRelativePosition(this);
    });
  }

  unGroupLayer(layer) {
    let index = this.layers.indexOf(layer);
    this.layers.splice(index, 1);
  }

  unGroupAllLayers() {
    this.layers = [];
  }

  updateLayers() {
    // Loop through layers
    this.layers.forEach((layer, i) => {
      layer.update(this);
    });
  }
}

export default GroupModel;
