import parseBooleans from './parseBooleans';

describe('libs/parseBooleans', () => {
  const booleans = [true, 'true', '', 'l', [], [10], ['10'], {}, { test: 'test' }, 'undefined'];
  const notBooleans = [false, 'false', null, undefined];

  booleans.forEach((bool) => {
    test(`should return true for value ${bool}`, () => {
      expect(parseBooleans(bool)).toBe(true);
    });
  });

  notBooleans.forEach((bool) => {
    test(`should return false for value ${bool}`, () => {
      expect(parseBooleans(bool)).toBe(false);
    });
  });
});
