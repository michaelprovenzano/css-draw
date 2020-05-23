class LayersPanel {
  constructor({ element, layersListElement }) {
    this.element = element;
    this.layersListElement = layersListElement;

    this.clear = this.clear.bind(this);
    this.render = this.render.bind(this);
  }

  clear() {
    this.layersListElement.innerHTML = '';
  }

  render(layers) {
    this.clear();
    for (let layer of layers) {
      let className = '';
      if (layer.active) className = 'active';
      const html = `<li class="${className}">${layer.name}</li>`;
      this.layersListElement.insertAdjacentHTML('afterbegin', html);
    }
  }
}

export default LayersPanel;
