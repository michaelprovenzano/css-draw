class GroupView {
  constructor(options) {
    // Bindings ///////
    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
  }

  add(parent, groupObj) {
    this.parent = parent;

    const element = `<${groupObj.tag} class="shape" id="${groupObj.id}" style="top:${groupObj.top}px; left:${groupObj.left}px; width:${groupObj.width}px; height:${groupObj.height}px; background:${groupObj.backgroundColor}; z-index:${groupObj.zIndex}"></${groupObj.tag}>`;
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
    this.element.style.backgroundColor = `${shape.backgroundColor}`;
    this.element.style.transform = `rotate(${shape.rotation}deg)`;
  }
}

export default GroupView;
