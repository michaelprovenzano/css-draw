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
    layers.forEach(layer => (layer.group = this));
    this.layers.push(...layers);
    this.updateGroupBounds();

    return this.layers;
  }

  alignLayersTop() {
    let startProps = this.layers[0].getProperties(),
      top = startProps.top;

    this.layers.forEach(layer => {
      let props = layer.getProperties();
      layer.setPosition(props.left, top);
    });
  }

  alignLayersLeft() {
    let startProps = this.layers[0].getProperties(),
      left = startProps.left;

    this.layers.forEach(layer => {
      let props = layer.getProperties();
      layer.setPosition(left, props.top);
    });
  }

  alignLayersRight() {
    let startProps = this.layers[0].getProperties(),
      right = startProps.left + startProps.width;

    this.layers.forEach(layer => {
      let props = layer.getProperties();
      let thisRight = props.left + props.width;
      let difference = thisRight - right;
      layer.setPosition(props.left - difference, props.top);
    });
  }

  alignLayersBottom() {
    let startProps = this.layers[0].getProperties(),
      bottom = startProps.top + startProps.height;

    this.layers.forEach(layer => {
      let props = layer.getProperties();
      let thisBottom = props.top + props.height;
      let difference = thisBottom - bottom;
      layer.setPosition(props.left, props.top - difference);
    });
  }

  alignLayersCenterX() {
    let center = this.layers[0].getCenter();

    this.layers.forEach(layer => {
      let props = layer.getProperties();
      let thisCenter = layer.getCenter();

      let centerDiff = thisCenter.x - center.x;

      layer.setPosition(props.left - centerDiff, props.top);
    });
  }

  alignLayersCenterY() {
    let center = this.layers[0].getCenter();

    this.layers.forEach(layer => {
      let props = layer.getProperties();
      let thisCenter = layer.getCenter();

      let centerDiff = thisCenter.y - center.y;

      layer.setPosition(props.left, props.top - centerDiff);
    });
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

  getLayerIndex(object) {
    let index = -1;
    for (let i = 0; i < this.layers.length; i++) {
      let layer = this.layers[i];
      if (layer.id === object.id) {
        index = i;
        break;
      }
    }
    return index;
  }

  getLayers() {
    return this.layers;
  }

  moveLayerBackward(layer) {
    const index = this.getLayerIndex(layer);

    if (index > 0) {
      // Switch z-index values
      this.layers[index - 1].model.zIndex = index;
      this.layers[index].model.zIndex = index - 1;

      // Switch values in array
      [this.layers[index - 1], this.layers[index]] = [this.layers[index], this.layers[index - 1]];
    }
  }

  moveLayerForward(layer) {
    const index = this.getLayerIndex(layer);
    if (index !== this.layers.length - 1) {
      // Switch z-index values
      this.layers[index].model.zIndex = index + 1;
      this.layers[index + 1].model.zIndex = index;

      // Switch values in array
      [this.layers[index + 1], this.layers[index]] = [this.layers[index], this.layers[index + 1]];
    }
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

  removeLayer(layer) {
    let index = this.getLayerIndex(layer);
    this.layers.splice(index, 1);
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

  updateLayers() {
    // Loop through layers
    this.layers.forEach((layer, i) => {
      layer.update(this);
    });
  }
}

export default GroupModel;
