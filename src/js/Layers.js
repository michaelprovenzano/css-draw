import Shape from './Shape';

class Layers {
  constructor(layers) {
    this.layers = layers || [];
    this.updates = {};

    // Bindings //
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.getLayerById = this.getLayerById.bind(this);
    this.getLayerIndex = this.getLayerIndex.bind(this);
  }

  add(layerObject) {
    layerObject.zIndex = this.layers.length;
    this.layers.push(layerObject);

    var event = new Event('newlayer', { bubbles: true });
    document.dispatchEvent(event);
  }

  duplicate(layerObject, newId) {
    let layer = this.getLayerById(layerObject.id);
    let newLayer = new Shape(layer);

    newLayer.id = newId;
    newLayer.zIndex = newId;
    newLayer.name = newLayer.name + ' copy';

    newLayer.add(layer.parent);
    this.add(newLayer);
    newLayer.update();
    return newLayer;
  }

  getLayerById(id) {
    return this.layers.find(layer => layer.id === parseInt(id));
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

  moveLayerForward(layer) {
    const index = this.getLayerIndex(layer);
    if (index !== this.layers.length - 1) {
      // Switch z-index values
      this.layers[index].zIndex = index + 1;
      this.layers[index + 1].zIndex = index;

      // Switch values in array
      [this.layers[index + 1], this.layers[index]] = [this.layers[index], this.layers[index + 1]];

      // Update both layers
      this.layers[index].update();
      this.layers[index + 1].update();
    }
  }

  moveLayerBackward(layer) {
    const index = this.getLayerIndex(layer);
    if (index !== 0) {
      // Switch z-index values
      this.layers[index - 1].zIndex = index;
      this.layers[index].zIndex = index - 1;

      // Switch values in array
      [this.layers[index - 1], this.layers[index]] = [this.layers[index], this.layers[index - 1]];

      // Update both layers
      this.layers[index].update();
      this.layers[index - 1].update();
    }
  }

  moveLayerToFront(layer) {
    const index = this.getLayerIndex(layer);

    this.layers.splice(index, 1);
    this.layers.push(layer);

    this.layers.forEach((layer, i) => {
      layer.zIndex = i;
      layer.update();
    });
  }

  moveLayerToBack(layer) {
    const index = this.getLayerIndex(layer);

    this.layers.splice(index, 1);
    this.layers.unshift(layer);

    this.layers.forEach((layer, i) => {
      layer.zIndex = i;
      layer.update();
    });
  }

  remove(object) {
    let index = this.getLayerIndex(object);

    object.transformHelper.remove();

    object.element.parentNode.removeChild(object.element);
    this.layers.splice(index, 1);
    this.updates.removeActiveLayer = true;
  }

  updateAll() {
    for (let layer of this.layers) {
      layer.update();
    }
  }
}

export default Layers;
