class LayerDetailsView {
  constructor() {
    this.layerDetailsElement = document.getElementById('layer-details-panel');
    this.elementType = document.getElementById('layer-detail_elementType');
    this.elementX = document.getElementById('layer-detail_elementX');
    this.elementY = document.getElementById('layer-detail_elementY');
    this.elementRotation = document.getElementById('layer-detail_elementRotation');
    this.elementWidth = document.getElementById('layer-detail_elementWidth');
    this.elementHeight = document.getElementById('layer-detail_elementHeight');
    this.elementFillType = document.getElementById('layer-detail_elementFillType');

    // Bindings
    this.getValue = this.getValue.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  getValue(element) {
    let value = this[element].value;
    if (!value) value = 0;
    if (this[element].classList.contains('select')) {
      value = this[element].querySelector('.select-box-text').innerText;
      value = value.toLowerCase();
    }
    return value;
  }

  setValue(element, value) {
    if (!value) value = '';
    if (this[element].classList.contains('select')) {
      if (value) value = capitalize(value);
      this[element].querySelector('.select-box-text').innerText = value;
    }
    this[element].value = value;
  }
}

export default LayerDetailsView;

function capitalize(string) {
  let newString = string.split('');
  newString[0] = newString[0].toUpperCase();

  return newString.join('');
}
