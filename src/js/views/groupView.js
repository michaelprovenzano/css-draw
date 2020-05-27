import LayerView from './layerView';

class GroupView extends LayerView {
  constructor(options) {
    super(options);
    // Bindings ///////
    this.add = this.add.bind(this);
  }

  add(parent, groupObj) {
    this.parent = parent;

    const element = `<${groupObj.tag} class="shape" id="${groupObj.id}" style="top:${groupObj.top}px; left:${groupObj.left}px; width:${groupObj.width}px; height:${groupObj.height}px; background:${groupObj.backgroundColor}; z-index:${groupObj.zIndex}"></${groupObj.tag}>`;
    this.parent.insertAdjacentHTML('beforeend', element);
    this.element = this.parent.lastElementChild;
    console.log(this);

    return this;
  }

  remove() {
    console.log(this.element);

    this.element.parentNode.removeChild(this.element);
    return null;
  }
}

export default GroupView;
