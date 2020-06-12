class copyCSS {
  constructor() {
    this.css = '';

    this.copyCSS = this.copyCSS.bind(this);

    let cssBtn = document.getElementById('copy-css');
    cssBtn.addEventListener('click', this.copyCSS);
  }

  copyCSS() {
    this.setCSS();
    this.copyToClipboard(this.css);
  }

  setCSS() {
    this.css = `body {
  background: lightgray;
}

#canvas {
  display: block;
  position: relative;
  width: 100%;
  height: 100vh;
}

.shape {
  display: inline-block;
  position: absolute;
}

.ellipse {
  border-radius: 50%;
}
`;
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

export default copyCSS;
