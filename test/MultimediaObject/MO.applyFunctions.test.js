/* globals MultimediaObject */

describe('MO.applyFunctions', () => {
  const args1 = {
    test: () => 'test',
    init: () => 'test',
    applyStyle: () => 'test',
  };
  const args2 = {
    test: arg => arg,
  };
  let ob;
  describe('creating individual spec for spy to work', () => {
    beforeEach(() => {
      ob = new MultimediaObject();
      ob.applyFunctions(args1);
      spyOn(ob, 'test').and.returnValue('test');
    });

    it('should have applied function test', () => {
      expect(ob.test).toBeDefined();
      ob.test();
      expect(ob.test.calls.all()).toEqual([{ object: ob, args: [], returnValue: 'test' }]);
    });

    it('should have not applied function init and applyStyle', () => {
      expect(ob.init).not.toEqual(args1.init);
      expect(ob.applyStyle).not.toEqual(args1.applyStyle);
    });
  });

  describe('creating individual spec for spy to work2', () => {
    beforeEach(() => {
      ob = new MultimediaObject();
      ob.applyFunctions(args1);
      ob.applyFunctions(args2);
      spyOn(ob, 'test').and.returnValue('lol');
    });

    it('should have replaced function test', () => {
      expect(ob.test).toBeDefined();
      ob.test('lol');
      expect(ob.test.calls.all()).toEqual([{ object: ob, args: ['lol'], returnValue: 'lol' }]);
    });
  });
});
