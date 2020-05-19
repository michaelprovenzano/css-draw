import Canvas from './Canvas';
import LayersPanel from './LayersPanel';

class App {
  constructor(options) {
    this.canvas = new Canvas(options.canvas);
    this.layersPanel = new LayersPanel(options.layersPanel);
    this.menu = options.menu;

    this.mousedown = this.mousedown.bind(this);
    this.mouseup = this.mouseup.bind(this);
    this.keydown = this.keydown.bind(this);

    document.addEventListener('mousedown', this.mousedown);
    document.addEventListener('mouseup', this.mouseup);
    document.addEventListener('keydown', this.keydown);
  }

  mousedown(event) {
    this.layersPanel.render(this.canvas.layers.layers);
  }

  mouseup(event) {
    this.layersPanel.render(this.canvas.layers.layers);
  }

  keydown(event) {
    this.layersPanel.render(this.canvas.layers.layers);
  }
}

const appOptions = {
  canvas: document.getElementById('canvas'),
  layersPanel: {
    element: document.getElementById('layers-panel'),
    layersListElement: document.getElementById('layers-panel-list'),
  },
};
const app = new App(appOptions);

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
    console.log(app);
    app.canvas.mode = mode;
    app.canvas.element.className = mode;
  })
);

// Toggle the buttons in the button groups
const btnGroup = [...document.querySelectorAll('.ui-group')];
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
    switch (event.target.getAttribute('data-action')) {
      case 'layer-front':
        app.canvas.layers.moveLayerToFront(app.canvas.activeLayer);
        break;
      case 'layer-forward':
        app.canvas.layers.moveLayerForward(app.canvas.activeLayer);
        break;
      case 'layer-backward':
        app.canvas.layers.moveLayerBackward(app.canvas.activeLayer);
        break;
      case 'layer-back':
        app.canvas.layers.moveLayerToBack(app.canvas.activeLayer);
        break;
      default:
        break;
    }
  })
);

// Set the current layer color
const colorPicker = document.getElementById('shape-color');
colorPicker.addEventListener('input', function () {
  app.canvas.shapeColor = colorPicker.value;
  if (app.canvas.activeLayer) app.canvas.activeLayer.setColor(app.canvas.shapeColor);
});
