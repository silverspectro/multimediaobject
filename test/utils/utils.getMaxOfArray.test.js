describe('utils.getMaxOfArray', () => {
  const testArrays = [
    [0, -5, 6, 10, 12, 5.5],
    [-3, -4, -7, -1, 0],
    [10, 23.4, 12.6, 23.3, 0.25, -5],
    [-1, -2, -3, -4, -5],
    [null, 0, false, 10, ''],
    ['10', '1', undefined, ''],
    [null, false, undefined, ''],
  ];
  const responseArray = [
    12,
    0,
    23.4,
    -1,
    10,
    10,
    0,
  ];
  const wrongArray = [
    {},
    false,
    undefined,
    null,
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
