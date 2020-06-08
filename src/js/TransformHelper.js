import Point from './utils/Point';

let rotateIcon = `
<svg width="22px" height="22px" viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Desktop-HD" transform="translate(-439.000000, -314.000000)" fill="#0D6ECC" fill-rule="nonzero" stroke="#D8D8D8" stroke-width="0.764925529">
            <path d="M453.296077,319.499304 C447.482837,319.499304 444.499434,322.320361 444.499434,328.296021 L445.939002,328.296021 C446.361459,328.296021 446.703928,328.63849 446.703928,329.060946 C446.703928,329.179697 446.67628,329.296816 446.623173,329.403029 L444.036217,334.576986 C443.847289,334.954844 443.38782,335.108002 443.009962,334.919075 C442.861927,334.845057 442.741891,334.725022 442.667874,334.576986 L440.080917,329.403029 C439.89199,329.025172 440.045148,328.565702 440.423006,328.376775 C440.529219,328.323669 440.646338,328.296021 440.765088,328.296021 L442.204657,328.296021 C442.204657,321.023375 446.243292,317.204508 453.296077,317.204508 L453.296077,315.764926 C453.296077,315.34247 453.638546,315.000001 454.061003,315.000001 C454.179754,315.000001 454.296875,315.027649 454.40309,315.080757 L459.577006,317.667737 C459.954862,317.856666 460.108017,318.316137 459.919087,318.693993 C459.845071,318.842025 459.725038,318.962058 459.577006,319.036075 L454.40309,321.623054 C454.025234,321.811984 453.565763,321.658829 453.376834,321.280973 C453.323726,321.174758 453.296077,321.057637 453.296077,320.938885 L453.296077,319.499304 Z" id="Combined-Shape"></path>
        </g>
    </g>
</svg>`;

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
      <div class="rotate-icon top-left">${rotateIcon}</div>
      <div class="rotate-icon top-right">${rotateIcon}</div>
      <div class="rotate-icon bottom-left">${rotateIcon}</div>
      <div class="rotate-icon bottom-right">${rotateIcon}</div>
      
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
