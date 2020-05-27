import Point from '../utils/Point';

class GroupModel {
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
    this.active = true;
    this.zIndex = 1;
    this.layers = [];

    // Bindings ///////
    this.add = this.add.bind(this);
    this.makeActive = this.makeActive.bind(this);
    this.setBoundsFromElement = this.setBoundsFromElement.bind(this);
    this.setSize = this.setSize.bind(this);
    this.setRotation = this.setRotation.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.updateAll = this.updateAll.bind(this);
    this.setClickPosition = this.setClickPosition.bind(this);
  }

  add(layers) {
    this.layers.push(...layers);
    this.updateAll();
    return this.layers;
  }

  makeActive(layer) {
    this.active = true;
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

  updateAll() {
    let width, height, top, left;

    // Loop through layers
    this.layers.forEach((layer, i) => {
      let layerProps = layer.getProperties();
      if (i === 0) {
        width = layerProps.width;
        height = layerProps.height;
        top = layerProps.top;
        left = layerProps.left;
      } else {
        if (layerProps.top < top) {
          height += top - layerProps.top;
          top = layerProps.top;
        }
        if (layerProps.left < left) {
          width += left - layerProps.left;
          left = layerProps.left;
        }
        if (layerProps.width > width) {
          width += layerProps.width - width;
        }
        if (layerProps.top + layerProps.height > top + height) {
          height += layerProps.height - height;
        }
      }
      console.log(top);

      this.setSize(width, height);
      this.setPosition(left, top);
    });

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

export default GroupModel;
