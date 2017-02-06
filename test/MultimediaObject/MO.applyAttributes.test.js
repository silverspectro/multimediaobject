/* globals MultimediaObject */

describe('MO.applyAttributes', () => {
  const ob = new MultimediaObject();
  window._s4mConfig = {};
  window._s4mConfig.absoluteAssetURL = 'testURL/';

  it('should have a method called applyAttributes', () => {
    expect(ob.applyAttributes).toBeDefined();
  });

  describe('applies attributes if an attributes obj is passed as arguments', () => {
    const args = {
      class: '.test',
      'data-test': 'test',
      src: '{{absoluteAssetURL}}url',
    };

    ob.applyAttributes(args);

    for (const key in args) {
      it(`should have attribute ${key} equal to ${args[key]}`, () => {
        expect(ob.attributes[key]).toEqual(args[key]);
      });
    }
    it(`should have element.attributes equal to ${args}`, () => {
      for (const key in args) {
        if (key === 'src') continue;
        expect(ob.element.getAttribute(key)).toEqual(args[key]);
      }
    });
    it('should not have replaced {{absoluteAssetURL}} with config.namespace in attributes', () => {
      expect(ob.attributes.src).toEqual('{{absoluteAssetURL}}url');
    });
    it('should have replaced {{absoluteAssetURL}} with config.namespace on element', () => {
      expect(ob.element.getAttribute('src')).toEqual('testURL/url');
    });
  });

  const ob2 = new MultimediaObject({
    attributes: {
      class: '.test',
      'data-test': 'test',
      src: '{{absoluteAssetURL}}url',
    },
  });
  const refArgs = {
    id: 'multimediaObject',
    class: '.test',
    'data-test': 'test',
    src: 'testURL/url',
  };

  describe('applies attributes if no attributes obj is passed as arguments', () => {
    for (const key in refArgs) {
      if (key === 'src') continue;
      it(`should have attributes.${key} equal to ${refArgs[key]}`, () => {
        expect(ob2.attributes[key]).toEqual(refArgs[key]);
      });
    }
    for (const key in refArgs) {
      it(`should have element.attributes.${key} equal to ${refArgs[key]}`, () => {
        expect(ob2.element.getAttribute(key)).toEqual(refArgs[key]);
      });
    }
    it('should not have replaced {{absoluteAssetURL}} with config.namespace', () => {
      expect(ob2.attributes.src).toEqual('{{absoluteAssetURL}}url');
    });
    it('should have replaced {{absoluteAssetURL}} with config.namespace on element', () => {
      expect(ob2.element.getAttribute('src')).toEqual('testURL/url');
    });
  });

  const wrongParams = [null, [], 10];

  wrongParams.forEach((param) => {
    it(`should throw an error with argument ${param}`, () => {
      expect(() => ob2.applyAttributes(param)).toThrow();
    });
  });
});
