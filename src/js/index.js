import Canvas from './Canvas';
import CopyCSS from './controllers/copyCSSController';
import CopyHTML from './controllers/copyHTMLController';
import customSelect from './views/customSelect';

class App {
  constructor(options) {
    this.canvas = new Canvas(options.canvas);
    this.menu = options.menu;
    this.updates = [];
    this.copyCSS = new CopyCSS();
    this.copyHTML = new CopyHTML();

    // Bindings
    this.handleUpdates = this.handleUpdates.bind(this);
    this.mousedown = this.mousedown.bind(this);
    this.mouseup = this.mouseup.bind(this);
    this.keydown = this.keydown.bind(this);

    // Event Listeners
    document.addEventListener('mousedown', this.mousedown);
    document.addEventListener('mouseup', this.mouseup);
    document.addEventListener('keydown', this.keydown);
  }

  handleUpdates() {}

  pullUpdates(module) {}

  mousedown(event) {
    // HANDLE LAYERS PANEL INTERACTIONS
    if (event.target.closest(`#${this.canvas.layers.view.element.id}`)) {
      let id = event.target.id.split('-')[1];

      let thisLayer = this.canvas.layers.getLayerById(id);
      if (thisLayer) this.canvas.makeActiveLayer(thisLayer);
    }
  }

  mouseup(event) {}

  keydown(event) {}
}

const appOptions = {
  canvas: document.getElementById('canvas'),
  layersListElement: document.getElementById('layers-panel-list'),
};

const app = new App(appOptions);

customSelect();

//TODO: EXPORT THESE INTO A UI CLASS
const shapeBtns = [...document.querySelectorAll('.shape-btn')];
shapeBtns.forEach(el =>
  el.addEventListener('click', function () {
    app.canvas.shape = el.getAttribute('data-shape');
  })
);

const modeBtns = [...document.querySelectorAll('.mode')];
modeBtns.forEach(el =>
  el.addEventListener('click', function () {
    const mode = el.getAttribute('data-mode');
    app.canvas.mode = mode;
    app.canvas.element.className = mode;
  })
);

// Toggle the buttons in the button groups
const btnGroup = [...document.querySelectorAll('.ui-group-toggle')];
btnGroup.forEach(group =>
  group.addEventListener('click', function (event) {
    const btns = [...group.children];
    btns.forEach(btn => btn.classList.remove('active'));
    const btn = event.target.closest('button');
    if (btn) btn.classList.add('active');
  })
);

const actionBtns = [...document.querySelectorAll('.btn-action')];
actionBtns.forEach(btn =>
  btn.addEventListener('click', function (event) {
    const button = event.target.closest('button');
    let activeLayer = app.canvas.activeLayer;

    switch (button.getAttribute('data-action')) {
      case 'group':
        app.canvas.makeGroupPermanant(activeLayer);
        break;
      case 'ungroup':
        app.canvas.unGroupAllLayers(activeLayer);
        break;
      case 'layer-front':
        app.canvas.layers.moveLayerToFront(activeLayer);
        break;
      case 'layer-forward':
        app.canvas.layers.moveLayerForward(activeLayer);
        break;
      case 'layer-backward':
        app.canvas.layers.moveLayerBackward(activeLayer);
        break;
      case 'layer-back':
        app.canvas.layers.moveLayerToBack(activeLayer);
        break;
      default:
        break;
    }
  })
);

// Set the current layer color
// const colorPicker = document.getElementById('shape-color');
