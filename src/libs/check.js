import { difference } from 'lodash/array';
const numberRegExp = new RegExp('^[<>]{0,2}\d+$', 'g');

export default ({
  validate(input, schema) {
    const keys = Object.keys(schema);
    const notVarKeys = keys.filter(k => !k.includes('?'));
    const inputKeys = Object.keys(input);
    const keyDifference = difference(notVarKeys, inputKeys);

    if (keyDifference.length > 0) this.logError({
      input,
      source: keys,
      valid: false,
      message: `ValidationError: ${JSON.stringify(input)} missing keys [${keyDifference}]`
    });

    notVarKeys.forEach(key => this.check(input[key], schema[key]));

    return null;
  },
  check(input, source) {
    if (source instanceof Function) this.checkType(input, source);

    if (typeof source === 'string' || source instanceof RegExp) {
      return this.checkString(input, source);
    } else if (numberRegExp.test(source) || this.getType(source) === 'Number') {
      return this.checkNumber(input, source);
    }
  },
  checkType(input, source) {
    const t = input ? `${(this.getType(source)[0]).toLowerCase()}${this.getType(source).slice(1)}` : true;
    const tInput = input ? `${(input.constructor.name[0]).toLowerCase()}${input.constructor.name.slice(1)}` : false;
    if (t !== tInput) {
      return this.logError({
        input,
        source,
        valid: false,
        message: `${JSON.stringify(input)} should be of type ${this.getType(source)}`
      });
    }
    return null;
  },
  checkString(input, source) {
    if (source instanceof RegExp) {
      return this.logError({
        input,
        source,
        valid: source.test(input),
      });
    } else {
      return this.logError({
        input,
        source,
        valid: source === input,
      });
    }
  },
  checkNumber(input, source) {
    return false;
  },
  logError(error) {
    const message = `ValidationError: ${error.input} type:${typeof error.input} must respect ${error.source} type:${typeof error.source}`;
    if (!error.valid) {
      throw new TypeError(error.message || message);
    } else {
      return null;
    }
  },
  getType(source) {
    return source.name || typeof source;
  }
});