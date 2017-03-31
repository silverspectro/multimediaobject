describe('utils.getObjectUnderCursor', () => {
  const getBoundingClientRect = el => el.rect;
  const testingElements = [{
    name: 'box0',
    getBoundingClientRect: () => ({
      top: 100,
      left: 20,
      right: 40,
      bottom: 200,
    }),
  }, {
    name: 'box1',
    getBoundingClientRect: () => ({
      top: 300,
      left: 170,
      right: 300,
      bottom: 400,
    }),
  }, {
    name: 'box2',
    getBoundingClientRect: () => ({
      top: 800,
      left: 20,
      right: 70,
      bottom: 900,
    }),
  }, {
    name: 'box3',
    getBoundingClientRect: () => ({
      top: 50,
      left: 278,
      right: 356,
      bottom: 200,
    }),
  }, {
    name: 'box4',
    getBoundingClientRect: () => ({
      top: 70,
      left: 354,
      right: 785,
      bottom: 73,
    }),
  }];
  const cursorPositions = [
    {
      x: 15,
      y: 150,
    },
    {
      x: 178,
      y: 320,
    },
    {
      x: 378,
      y: 72,
    },
  ];
  const expectations = [
    false,
    testingElements[1],
    testingElements[4],
  ];
  const testFunction = function (ret, index) {
    it(`should return ${JSON.stringify(expectations[index])} for cursor position ${JSON.stringify(ret)}`, () => {
      expect(ret).toEqual(expectations[index]);
    });
  };
  cursorPositions.forEach((cursor, index) => {
    getObjectUnderCursor(testingElements, cursor, (ret) => {
      testFunction(ret, index);
    });
  });
});
