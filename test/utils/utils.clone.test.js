describe('clone', () => {
  const tplObj = {
    name: 'test',
    hello: 'yo',
    tweet: 'tos',
  };

  const testObj = {
    test: 'Hey',
  };
  const testObj2 = {
    name: 'Test2',
  };

  it(`should return ${JSON.stringify(tplObj)}`, () => {
    expect(clone(testObj)).toEqual(testObj);
  });

  it(`should return ${JSON.stringify(tplObj)}`, () => {
    expect(clone(testObj2)).toEqual(testObj2);
  });
});
