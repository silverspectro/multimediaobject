import { concatObject } from '../../src/utils/utils';


describe('concatObject', () => {
  const obj1 = {
    test: 'lol',
    test2: 'test',
  };
  const obj2 = {
    test3: 'test3',
  };
  const obj3 = {
    test: 'lol-xptdr',
    test2: 'test-test',
  };
  const obj4 = {
    test: 'lol-xptdr',
    test4: 'test-test',
  };
  const refObj = {
    test: 'lol',
    test2: 'test',
    test3: 'test3',
  };
  const refObj2 = {
    test: 'lol',
    test2: 'test',
    test3: 'test3',
    test4: 'test-test',
  };

  it('should concatenate 2 objects', () => {
    const resultObj = concatObject(obj1, obj2);
    expect(resultObj).toEqual(refObj);
  });

  it('should not overwrite already defined keys', () => {
    const resultObj = concatObject(obj1, obj3);
    expect(resultObj).toEqual(obj1);
  });

  it('should concatenate multiple objects and not overwrite already defined keys', () => {
    const resultObj2 = concatObject(obj1, obj2, obj3, obj4);
    expect(resultObj2).toEqual(refObj2);
  });
});
