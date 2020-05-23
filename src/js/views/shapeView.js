import Point from '../utils/Point';

class ShapeView {
  constructor(options) {
    // Bindings ///////
    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
  }

  add(parent, shapeObject) {
    this.parent = parent;
    let borderRadius = 'border-radius:';
    shapeObject.borderRadius.forEach(radius => (borderRadius += `${radius}px `));
    if (borderRadius === 'border-radius:0px 0px 0px 0px ') borderRadius = null;

    const element = `<${shapeObject.tag} class="shape ${shapeObject.type}" id="${shapeObject.id}" style="top:${shapeObject.top}px; left:${shapeObject.left}px; width:${shapeObject.width}px; height:${shapeObject.height}px; background:${shapeObject.backgroundColor}; ${borderRadius}; z-index:${shapeObject.zIndex}"></${shapeObject.tag}>`;
    this.parent.insertAdjacentHTML('beforeend', element);
    this.element = this.parent.lastElementChild;
    return this;
  }

  remove() {
    this.element.parentNode.removeChild(this.element);
    return null;
  }

  update(shape) {
    this.element.style.top = `${shape.top}px`;
    this.element.style.left = `${shape.left}px`;
    this.element.style.width = `${shape.width}px`;
    this.element.style.height = `${shape.height}px`;
    this.element.style.zIndex = `${shape.zIndex}`;
    this.element.style.transform = `rotate(${shape.rotation}deg)`;
  }
}

export default ShapeView;
