import Point from '../utils/Point';

class LayerModel {
  constructor(options) {
    this.id = options.id;
    this.name = options.name || `Layer ${options.id}`;
    this.type = options.type || 'rectangle';
    this.tag = options.tag || 'div';
    this.top = options.top;
    this.left = options.left;
    this.width = options.width || 0;
    this.height = options.height || 0;
    this.center = new Point(this.width / 2, this.height / 2);
    this.transformOrigin = this.center;
    this.rotation = options.rotation || 0;
    this.backgroundStyle = options.backgroundStyle || 'color'; // or 'gradient'
    this.backgroundColor = options.backgroundColor || '#000000';
    this.opacity = options.opacity || 1;
    this.borderColor = options.borderColor || '#000000';
    this.borderStyle = options.borderStyle || 'solid';
    this.borderRadius = options.borderRadius || [0, 0, 0, 0];
    options.hasOwnProperty('visible') ? (this.visible = options.visible) : (this.visible = true);
    this.active = true;
    this.zIndex = 1;

    // Bindings ///////
    this.makeActive = this.makeActive.bind(this);
    this.makeInactive = this.makeInactive.bind(this);
    this.setBoundsFromElement = this.setBoundsFromElement.bind(this);
    this.setSize = this.setSize.bind(this);
    this.setRelativePosition = this.setRelativePosition.bind(this);
    this.setRelativeProperties = this.setRelativeProperties.bind(this);
    this.setRelativeSize = this.setRelativeSize.bind(this);
    this.setRotation = this.setRotation.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.update = this.update.bind(this);
    this.setClickPosition = this.setClickPosition.bind(this);
  }

  clearClickPosition() {
    this.clickEvent = undefined;
  }

  makeActive() {
    this.active = true;
  }

  makeInactive() {
    this.active = false;
  }

  setBoundsFromElement(element) {
    const bounds = element.getBoundingClientRect();
    this.bounds = bounds;
  }

  setPosition(left, top) {
    if (this.clickEvent) {
      this.top = top - this.clickEvent.y;
      this.left = left - this.clickEvent.x;
    } else {
      this.top = top;
      this.left = left;
    }
  }

  setSize(width, height, origin) {
    this.width = width;
    this.height = height;
  }

  setRelativePosition(parent) {
    let top = this.relativeTop * parent.height + parent.top;
    let left = this.relativeLeft * parent.width + parent.left;
    this.setPosition(left, top);
  }

  setRelativeProperties(parent) {
    this.relativeWidth = this.width / parent.width;
    this.relativeHeight = this.height / parent.height;
    this.relativeTop = (this.top - parent.top) / parent.height;
    this.relativeLeft = (this.left - parent.left) / parent.width;
  }

  setRelativeSize(parent) {
    let width = this.relativeWidth * parent.width;
    let height = this.relativeHeight * parent.height;
    this.setSize(width, height);
  }

  setRotation(deg) {
    this.rotation = deg;
  }

  setTransformOrigin(x, y) {
    x = x - this.left;
    y = y - this.top;
    this.transformOrigin = new Point(x, y);
  }

  setColor(color) {
    this.backgroundColor = color;
  }

  update() {
    this.center = new Point(this.width / 2, this.height / 2);
    if (this.element) this.bounds = this.element.getBoundingClientRect();
  }

  setClickPosition(event) {
    this.clickEvent = {
      x: event.clientX - this.bounds.x,
      y: event.clientY - this.bounds.y,
    };
  }
}

export default LayerModel;
