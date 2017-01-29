import { applyDefaults } from '../../src/utils/utils';

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
    applyDefaults(testObj, tplObj);
    expect(testObj).toEqual({
      test: 'Hey',
      name: 'test',
      hello: 'yo',
      tweet: 'tos',
    });
  });

  it(`should apply ${JSON.stringify(tplObj)} to ${JSON.stringify(testObj2)}`, () => {
    applyDefaults(testObj2, tplObj);
    expect(testObj2).toEqual({
      name: 'test',
      hello: 'yo',
      tweet: 'tos',
    });
  });
});
