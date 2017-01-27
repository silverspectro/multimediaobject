import utils from '../../src/utils/utils';

describe('utils.applyDefaults', () => {
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

  it(`should apply ${JSON.stringify(tplObj)} to ${JSON.stringify(testObj)}`, () => {
    utils.applyDefaults(testObj, tplObj);
    expect(testObj).toEqual({
      test: 'Hey',
      name: 'test',
      hello: 'yo',
      tweet: 'tos',
    });
  });

  it(`should apply ${JSON.stringify(tplObj)} to ${JSON.stringify(testObj2)}`, () => {
    utils.applyDefaults(testObj2, tplObj);
    expect(testObj2).toEqual({
      name: 'test',
      hello: 'yo',
      tweet: 'tos',
    });
  });
});
