export default class Set {
  constructor(array) {
    this.obj = {};
    if (array) {
      this.add(array);
    }
  }

  contains(v) {
    return this.obj[v] === 1;
  }
  add(array) {
    let i;
    let len;
    let v;
    for (i = 0, len = array.length; i < len; i++) {
      v = array[i];
      this.obj[v] = 1;
    }
  }
}
