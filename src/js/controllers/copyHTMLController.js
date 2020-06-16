class copyHTML {
  constructor() {
    this.element = document.getElementById('canvas');

    this.copyElement = this.copyElement.bind(this);
    this.copyCanvas = this.copyCanvas.bind(this);

    let copyBtn = document.getElementById('copy-html');
    copyBtn.addEventListener('click', this.copyCanvas);
  }

  copyCanvas() {
    this.copyToClipboard(`${this.element.outerHTML}`);
  }

  copyElement(element) {
    const doc = document;
    const text = doc.getElementById(element);

    let range;
    let selection;

    if (doc.body.createTextRange) {
      range = doc.body.createTextRange();
      range.moveToElement(text);
      range.select();
    } else if (window.getSelection) {
      selection = window.getSelection();

      range = doc.createRange();
      range.selectNodeContents(text);

      selection.removeAllRanges();
      selection.addRange(range);
    }

    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    document.getElementById('clickMe').value = 'Copied to clipboard!';
  }

  copyToClipboard(str) {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
}

export default copyHTML;
