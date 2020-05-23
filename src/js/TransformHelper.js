import Point from './utils/Point';

class TransformHelper {
  constructor(options) {
    if (!options) options = {};
    this.borderWidth = options.borderWidth || 1;
    this.boxColor = options.boxColor || 'dodgerblue';

    // Bindings ///////////////////
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.update = this.update.bind(this);
    this.set = this.set.bind(this);
  }

  add(shape) {
    // Transform helper pointers
    this.target = shape;
    shape.transformHelper = this;

    // Set shape to model to get data
    shape = shape.model;

    // Update the data
    this.top = shape.top - this.borderWidth;
    this.left = shape.left - this.borderWidth;
    this.height = shape.height + this.borderWidth * 2;
    this.width = shape.width + this.borderWidth * 2;
    this.transformOrigin = shape.center;
    this.rotation = this.target.rotation;
    this.transformOrigin = shape.transformOrigin;

    // Generate the html
    const element = `
    <div class="transform-helper" id="transform-helper-box" style="top:${this.top}px; left:${this.left}px; width:${this.width}px; height:${this.height}px; transform: rotate(${this.rotation}deg); z-index:10000">
      <div class="transform-origin" style="top:${this.transformOrigin.y}px; left:${this.transformOrigin.x}px; transform: translate(-50%, -50%)"></div>
			<div class="anchor top-left corner"></div>
			<div class="anchor top-right corner"></div>
			<div class="anchor bottom-left corner"></div>
			<div class="anchor bottom-right corner"></div>
    </div>`;

    // Insert the htmls
    this.target.view.element.insertAdjacentHTML('beforebegin', element);

    // Set the references on the TranformHelper object
    this.box = this.target.view.element.previousSibling;
    this.origin = this.box.querySelector('.transform-origin');

    return this;
  }

  remove() {
    if (this.box.parentNode && this.box) this.box.parentNode.removeChild(this.box);
    if (this.target) {
      this.target.transformHelper = null;
      this.target = null;
    }
  }

  update() {
    this.width = this.target.model.width + this.borderWidth * 2;
    this.height = this.target.model.height + this.borderWidth * 2;
    this.top = this.target.model.top - this.borderWidth;
    this.left = this.target.model.left - this.borderWidth;
    this.center = this.target.model.center;
    this.transformOrigin = this.target.model.transformOrigin;
    this.rotation = this.target.model.rotation;

    this.box.style.top = `${this.top}px`;
    this.box.style.left = `${this.left}px`;
    this.box.style.width = `${this.width}px`;
    this.box.style.height = `${this.height}px`;
    this.box.style.transform = `rotate(${this.rotation}deg)`;

    this.origin.style.left = `${this.transformOrigin.x}px`;
    this.origin.style.top = `${this.transformOrigin.y}px`;
  }

  set(shape) {
    if (this.box) this.remove();
    this.add(shape);
  }
}

export default TransformHelper;
