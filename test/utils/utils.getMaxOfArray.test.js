import { getMaxOfArray } from '../../src/utils/utils';

describe('utils.getMaxOfArray', () => {
  const testArrays = [
    [0, -5, 6, 10, 12, 5.5],
    [-3, -4, -7, -1, 0],
    [10, 23.4, 12.6, 23.3, 0.25, -5],
    [-1, -2, -3, -4, -5],
    [null, 0, false, 10, ''],
  ];
  const responseArray = [
    12,
    0,
    23.4,
    -1,
    10,
  ];
  const wrongArray = [
    {},
    [],
    false,
    undefined,
    null,
    [null, false, undefined, ''],
    ['10', '1', undefined, ''],
  ];


  testArrays.forEach((val, index) => {
    it(`should return ${responseArray[index]} from ${val}`, () => {
      expect(getMaxOfArray(val)).toEqual(responseArray[index]);
    });
  });

  wrongArray.forEach((val) => {
    it(`should throw an error from ${val}`, () => {
      expect(() => {
        getMaxOfArray(val);
      }).toThrow();
    });
  });
});
