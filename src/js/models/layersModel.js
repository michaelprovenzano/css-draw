import Shape from '../controllers/shapeController';

class Layers {
  constructor(layers) {
    this.layers = layers || [];
    this.updates = {};

    // Bindings //
    this.add = this.add.bind(this);
    this.makeAllInactive = this.makeAllInactive.bind(this);
    this.remove = this.remove.bind(this);
    this.getLayerById = this.getLayerById.bind(this);
    this.getLayerIndex = this.getLayerIndex.bind(this);
  }

  add(layerObject) {
    layerObject.model.zIndex = this.layers.length;
    this.layers.push(layerObject);
  }

  duplicate(layerObject, newId) {
    let layer = this.getLayerById(layerObject.id);

    let newLayer = new Shape(layer.model);

    newLayer.id = newId;
    newLayer.model.id = newId;
    newLayer.zIndex = newId;
    newLayer.model.name = newLayer.model.name + ' copy';

    this.add(newLayer);

    return newLayer;
  }

  getLayerById(id) {
    return this.layers.find(layer => layer.model.id === parseInt(id));
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

  makeAllInactive() {}

  moveLayerForward(layer) {
    const index = this.getLayerIndex(layer);
    if (index !== this.layers.length - 1) {
      // Switch z-index values
      this.layers[index].model.zIndex = index + 1;
      this.layers[index + 1].model.zIndex = index;

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
      this.layers[index - 1].model.zIndex = index;
      this.layers[index].model.zIndex = index - 1;

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
    this.layers.splice(index, 1);
  }

  updateAll() {
    for (let layer of this.layers) {
      layer.update();
    }
  }
}

export default Layers;
