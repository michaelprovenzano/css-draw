import LayerModel from '../models/layerModel';
import LayerView from '../views/layerView';

class Layer {
  constructor(options) {
    this.model = new LayerModel(options);
    this.view = new LayerView();
    this.id = this.model.id;

    // Bindings
    this.add = this.add.bind(this);
    this.clearClickPosition = this.clearClickPosition.bind(this);
    this.getProperties = this.getProperties.bind(this);
    this.getTransformOrigin = this.getTransformOrigin.bind(this);
    this.makeInactive = this.makeInactive.bind(this);
    this.makeActive = this.makeActive.bind(this);
    this.setClickPosition = this.setClickPosition.bind(this);
    this.setColor = this.setColor.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.setRelativePosition = this.setRelativePosition.bind(this);
    this.setRelativeProperties = this.setRelativeProperties.bind(this);
    this.setRelativeSize = this.setRelativeSize.bind(this);
    this.setRotation = this.setRotation.bind(this);
    this.setSize = this.setSize.bind(this);
    this.setTransformOrigin = this.setTransformOrigin.bind(this);
    this.update = this.update.bind(this);
  }

  add(parent) {
    this.view.add(parent, this.model);
    this.model.setBoundsFromElement(this.view.element);
    return this;
  }

  clearClickPosition() {
    this.model.clearClickPosition();
  }

  makeInactive(layer) {
    this.model.makeInactive();
  }

  getProperties() {
    return this.model;
  }

  getRotation() {
    return this.model.rotation;
  }

  getTransformOrigin() {
    return this.model.transformOrigin;
  }

  makeActive(layer) {
    this.model.makeActive();
  }

  remove() {
    this.view.remove();
  }

  setClickPosition(event) {
    this.model.setClickPosition(event);
    this.update();
  }

  setColor(color) {
    this.model.setColor(color);
    this.update();
  }

  setPosition(left, top) {
    this.model.setPosition(left, top);
    this.update();
  }

  setRelativePosition(parent) {
    this.model.setRelativePosition(parent);
  }

  setRelativeProperties(parent) {
    this.model.setRelativeProperties(parent);
  }

  setRelativeSize(parent) {
    this.model.setRelativeSize(parent);
  }

  setRotation(deg) {
    this.model.setRotation(deg);
    this.update();
  }

  setSize(width, height, origin) {
    this.model.setSize(width, height, origin);
    this.update();
  }

  setTransformOrigin(x, y) {
    this.model.setTransformOrigin(x, y);
    this.update();
  }

  update() {
    this.model.update();
    this.model.setBoundsFromElement(this.view.element);
    this.view.update(this.model);
    if (this.transformHelper) this.transformHelper.update();
  }
}

export default Layer;
