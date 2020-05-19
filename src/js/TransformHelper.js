import Point from './Point';

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
    this.target = shape;
    shape.transformHelper = this;
    this.top = shape.top - this.borderWidth;
    this.left = shape.left - this.borderWidth;
    this.height = shape.height + this.borderWidth * 2;
    this.width = shape.width + this.borderWidth * 2;
    this.transformOrigin = shape.center;
    this.rotation = this.target.rotation;

    const element = `
    <div class="transform-helper" id="transform-helper-box" style="top:${this.top}px; left:${this.left}px; width:${this.width}px; height:${this.height}px; transform: rotate(${this.rotation}deg); z-index:10000">
      <div class="transform-origin" style="top:${this.transformOrigin.y}px; left:${this.transformOrigin.x}px; transform: translate(-50%, -50%)"></div>
			<div class="anchor top-left corner"></div>
			<div class="anchor top-right corner"></div>
			<div class="anchor bottom-left corner"></div>
			<div class="anchor bottom-right corner"></div>
		</div>`;
    this.target.element.insertAdjacentHTML('beforebegin', element);
    this.box = this.target.element.previousSibling;
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
    this.width = this.target.width + this.borderWidth * 2;
    this.height = this.target.height + this.borderWidth * 2;
    this.top = this.target.top - this.borderWidth;
    this.left = this.target.left - this.borderWidth;
    this.center = this.target.center;
    this.transformOrigin = this.target.transformOrigin;
    this.rotation = this.target.rotation;

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
