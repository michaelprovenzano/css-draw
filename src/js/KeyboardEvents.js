class ModifierKeys {
  constructor() {
    this.alt = false;
    this.shift = false;
    this.delete = false;
    this.up = false;
    this.down = false;
    this.d = false;
    this.keydown = this.keydown.bind(this);

    document.addEventListener('keydown', this.keydown);
  }

  keydown(event) {
    switch (event.keyCode) {
      // shift
      case 16:
        this.shift = true;
        break;
      // alt
      case 18:
        this.alt = true;
        break;
      // up
      case 38:
        this.up = true;
        break;
      // down
      case 40:
        this.down = true;
        break;
      // delete
      case 46 || 8:
        this.delete = true;
        break;
      case 68:
        const newLayer = this.layers.duplicate(this.activeLayer, this.id);
        newLayer.add(this.element);
        this.makeActiveLayer(newLayer);
        this.transformHelper.set(newLayer);
        this.id++;
        break;
      default:
        break;
    }
  }

  keyup(event) {
    switch (event.keyCode) {
      // alt
      case 18:
        this.modifiers.altDown = false;
        this.editMode = 'select';
        break;
      // shift
      case 16:
        this.modifiers.shiftDown = false;
        this.editMode = 'select';
        break;
      default:
        break;
    }
  }
}
