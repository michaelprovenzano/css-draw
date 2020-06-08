class KeyMap {
  constructor() {
    this.alt = false;
    this.ctrl = false;
    this.shift = false;
    this.delete = false;
    this.arrowup = false;
    this.arrowright = false;
    this.arrowdown = false;
    this.arrowleft = false;
    this.a = false;
    this.b = false;
    this.c = false;
    this.d = false;
    this.e = false;
    this.f = false;
    this.g = false;
    this.h = false;
    this.j = false;
    this.k = false;
    this.l = false;
    this.m = false;
    this.n = false;
    this.o = false;
    this.p = false;
    this.q = false;
    this.r = false;
    this.s = false;
    this.t = false;
    this.v = false;
    this.w = false;
    this.x = false;
    this.y = false;
    this.z = false;
  }

  keydown(event) {
    let key = event.key.toLowerCase();
    this[key] = true;
  }

  keyup(event) {
    let key = event.key.toLowerCase();
    this[key] = false;
  }
}

export default KeyMap;
