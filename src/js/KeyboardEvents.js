import KeyMap from './KeyMap';

class KeyHandler {
  constructor() {
    this.keysDown = new KeyMap();
    this.actions = {
      delete: ['delete'],
      duplicate: ['control', 'd'],
      group: ['control', 'g'],
      groupingMode: ['shift'],
      layerForward: ['arrowup'],
      layerBackward: ['arrowdown'],
      layerToFront: ['control', 'arrowup'],
      layerToBack: ['control', 'arrowdown'],
    };
    this.on = {};

    this.getAction = this.getAction.bind(this);
    this.getKeys = this.getKeys.bind(this);
    this.keydown = this.keydown.bind(this);
    this.keyup = this.keyup.bind(this);

    document.addEventListener('keydown', this.keydown);
    document.addEventListener('keyup', this.keyup);
  }

  getAction() {
    let keys = this.getKeys();

    keys = keys.sort().join(' ');
    let actionKeys = Object.keys(this.actions);

    for (let action of actionKeys) {
      let thisActionKeys = this.actions[action].sort().join(' ');
      if (thisActionKeys === keys) return action;
    }
  }

  getKeys() {
    let keysDown = [];
    let keys = Object.keys(this.keysDown);

    for (let key of keys) {
      if (this.keysDown[key]) keysDown.push(key);
    }

    return keysDown;
  }

  keydown(event) {
    this.keysDown.keydown(event);
    let action = this.getAction();

    try {
      let func = this.on[action];
      func();
    } catch (error) {}
  }

  keyup(event) {
    this.keysDown.keyup(event);
  }
}

export default KeyHandler;
