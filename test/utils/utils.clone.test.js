import utils from '../../src/utils/utils';


describe('utils.clone', () => {
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
    expect(utils.clone(testObj)).toEqual(testObj);
  });

  it(`should return ${JSON.stringify(tplObj)}`, () => {
    expect(utils.clone(testObj2)).toEqual(testObj2);
  });
});
