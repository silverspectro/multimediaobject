const type = (obj) => {
  const text = obj.constructor.toString();
  return text.match(/function (.*)\(/)[1];
};

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
    if (typeof array !== 'string' && typeof array !== 'number' && type(array).indexOf('Array') < 0) {
      throw new Error('you can only add an array, a string or a number');
    }
    if (typeof array === 'string' || typeof array === 'number') {
      this.obj[array] = 1;
    } else {
      for (i = 0, len = array.length; i < len; i++) {
        v = array[i];
        this.obj[v] = 1;
      }
    }
  }
}
