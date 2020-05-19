import Point from './Point';

class Shape {
  constructor(options) {
    this.id = options.id;
    this.name = `Layer ${options.id}`;
    this.type = options.type || 'rectangle';
    this.tag = options.tag || 'div';
    this.top = options.top;
    this.left = options.left;
    this.width = options.width || 0;
    this.height = options.height || 0;
    this.center = new Point(this.width / 2, this.height / 2);
    this.transformOrigin = this.center;
    this.rotation = options.rotation || 0;
    this.backgroundColor = options.backgroundColor || '#000000';
    this.active = true;
    this.zIndex = 1;

    // Bindings ///////
    this.add = this.add.bind(this);
    this.setSize = this.setSize.bind(this);
    this.setRotation = this.setRotation.bind(this);
    this.move = this.move.bind(this);
    this.update = this.update.bind(this);
    this.updateOnClick = this.updateOnClick.bind(this);
  }

  add(parent) {
    this.parent = parent;
    const element = `<${this.tag} class="shape ${this.type}" id="${this.id}" style="top:${this.top}px; left:${this.left}px; width:${this.width}px; height:${this.height}px; background:${this.backgroundColor}; z-index:${this.zIndex}"></${this.tag}>`;
    this.parent.insertAdjacentHTML('beforeend', element);
    this.element = this.parent.lastElementChild;
    return this;
  }

  move(left, top) {
    if (!this.clickEvent) return;
    this.top = top - this.clickEvent.y;
    this.left = left - this.clickEvent.x;
    this.update();
  }

  setSize(width, height, origin) {
    this.width = width;
    this.height = height;
    this.update();
  }

  setRotation(deg) {
    this.rotation = deg;
    this.update();
  }

  setTransformOrigin(x, y) {
    this.transformOrigin = new Point(x, y);
  }

  setColor(color) {
    this.backgroundColor = color;
    this.element.style.backgroundColor = color;
    this.fillColor = color;
  }

  update() {
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.center = new Point(this.width / 2, this.height / 2);
    this.transformOrigin = this.center;
    this.element.style.zIndex = `${this.zIndex}`;
    this.element.style.transform = `rotate(${this.rotation}deg)`;
    this.bounds = this.element.getBoundingClientRect();
    if (this.transformHelper) this.transformHelper.update();
  }

  updateOnClick(event) {
    this.clickEvent = {
      x: event.clientX - this.bounds.x,
      y: event.clientY - this.bounds.y,
    };
  }
}

export default Shape;
