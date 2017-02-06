import { checkIfObject } from '../../src/utils/utils';

describe('utils.checkIfObject', () => {
  const wrongArgs = [
    undefined,
    null,
    [],
    'test',
    '',
    'undefined',
    'null',
  ];

  wrongArgs.forEach((arg) => {
    it(`should throw an error with ${arg}`, () => {
      expect(() => {
        checkIfObject(arg, Object.keys(arg), 'this is an error message');
      }).toThrow();
    });
  });

  it('should not stop flow if arg is an object', () => {
    expect(() => {
      checkIfObject({}, Object.keys({}), 'this is an error message');
      return true;
    }).toBeTruthy();
    const testObj = {
      test: 'test',
    };
    expect(() => {
      checkIfObject(testObj, Object.keys(testObj), 'this is an error message');
      return true;
    }).toBeTruthy();
  });
});
