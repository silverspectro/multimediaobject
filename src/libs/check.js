export default ({
  validate(input, schema) {
    const keys = Object.keys(schema);

    keys.forEach(() => {
      this.check(input[key], schema[key]);
    });

    return null;
  },
  check(input, source) {
    if (typeof input === 'string') {
      return this.checkString(input, source);
    }
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
  logError(error) {
    const message = `ValidationError: ${error.input} must respect ${error.source}`;
    if (!error.valid) {
      return new TypeError(message);
    } else {
      return true;
    }
  }
});