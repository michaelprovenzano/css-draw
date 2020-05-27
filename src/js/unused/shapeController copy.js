import ShapeModel from '../models/shapeModel';
import ShapeView from '../views/shapeView';

class Shape {
  constructor(options) {
    this.model = new ShapeModel(options);
    this.view = new ShapeView();
    this.id = this.model.id;

    // Bindings
    this.add = this.add.bind(this);
    this.getProperties = this.getProperties.bind(this);
    this.getTransformOrigin = this.getTransformOrigin.bind(this);
    this.makeActive = this.makeActive.bind(this);
    this.setClickPosition = this.setClickPosition.bind(this);
    this.setColor = this.setColor.bind(this);
    this.setPosition = this.setPosition.bind(this);
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

  getProperties() {
    return this.model;
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

export default Shape;
