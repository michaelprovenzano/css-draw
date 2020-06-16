import Shape from '../controllers/shapeController';

class Layers {
  constructor(layers) {
    // A nested layer structure
    this.layers = layers || [];

    // A flattened layer structure
    this.allLayers = layers || [];

    // Bindings //
    this.add = this.add.bind(this);
    this.includes = this.includes.bind(this);
    this.makeAllInactive = this.makeAllInactive.bind(this);
    this.remove = this.remove.bind(this);
    this.getLayerById = this.getLayerById.bind(this);
    this.getLayerIndex = this.getLayerIndex.bind(this);
  }

  add(layerObject) {
    layerObject.model.zIndex = this.layers.length;
    this.layers.push(layerObject);
    this.allLayers.push(layerObject);
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

  flatten(layers) {
    let flattened = [];
    layers.map(layer => {
      flattened.push(layer);

      if (layer.type === 'group') {
        let nested = this.flatten(layer.getLayers());
        flattened = flattened.concat(...nested);
      }
    });

    return flattened;
  }

  flattenLayers() {
    return this.flatten(this.layers);
  }

  getLayerById(id) {
    return this.allLayers.find(layer => layer.model.id === parseInt(id));
  }

  getLayerIndex(object, array) {
    let index = -1;
    if (!array) array = this.layers;
    for (let i = 0; i < array.length; i++) {
      let layer = array[i];
      if (layer.id === object.id) {
        index = i;
        break;
      }
    }
    return index;
  }

  groupLayer(layer) {
    if (this.group) layer.unGroupLayer(layer);
    let index = this.getLayerIndex(layer);
    this.layers.splice(index, 1);
  }

  includes(layer) {
    return this.layers.includes(layer);
  }

  makeAllInactive() {}

  moveLayerForward(layer) {
    if (layer.group) {
      let group = layer.group;
      group.moveLayerForward(layer);
    } else {
      const index = this.getLayerIndex(layer);
      if (index !== this.layers.length - 1) {
        // Switch z-index values
        this.layers[index].model.zIndex = index + 1;
        this.layers[index + 1].model.zIndex = index;

        // Switch values in array
        [this.layers[index + 1], this.layers[index]] = [this.layers[index], this.layers[index + 1]];
      }
    }
    this.setAllZIndexes();
  }

  moveLayerBackward(layer) {
    // If the layer is nested in a group, let the group handle moving the layer
    if (layer.group) {
      let group = layer.group;
      group.moveLayerBackward(layer);
    } else {
      // Get the index of the layer
      const index = this.getLayerIndex(layer);

      if (index > 0) {
        // Switch z-index values
        this.layers[index - 1].model.zIndex = index;
        this.layers[index].model.zIndex = index - 1;

        // Switch values in array
        [this.layers[index - 1], this.layers[index]] = [this.layers[index], this.layers[index - 1]];
      }
    }

    this.setAllZIndexes();
  }

  moveLayerToFront(layer) {
    const index = this.getLayerIndex(layer);

    this.layers.splice(index, 1);
    this.layers.push(layer);

    this.setAllZIndexes();
  }

  moveLayerToBack(layer) {
    const index = this.getLayerIndex(layer);

    this.layers.splice(index, 1);
    this.layers.unshift(layer);

    this.setAllZIndexes();
  }

  unGroupAllLayers(group) {
    // Get the layers from the group
    let layers = group.getLayers();

    // Set the group for each layer to null
    layers.forEach(layer => (layer.group = null));

    // Get the index of the group in the layers array
    let index = this.getLayerIndex(group);

    // Insert the layers into the layers array
    this.layers.splice(index, 0, ...layers);

    console.log(this.layers);
  }

  setAllZIndexes() {
    // Flatten the groups to deterimine the layer order
    let layers = this.flattenLayers();

    // Set the index for each layer based on the order and update
    layers.forEach((layer, i) => {
      layer.setZIndex(i);
      layer.update();
    });
  }

  remove(object) {
    // Check if is nested within a group
    if (object.group) {
      let group = object.group;
      group.removeLayer(object);
    } else {
      // Get the index and remove it if it is found (if statement is necessary)
      let index = this.getLayerIndex(object);
      if (index >= 0) this.layers.splice(index, 1);

      index = this.getLayerIndex(object, this.allLayers);
      if (index >= 0) this.allLayers.splice(index, 1);
    }
  }

  updateAll() {
    for (let layer of this.layers) {
      layer.update();
    }
  }
}

export default Layers;
