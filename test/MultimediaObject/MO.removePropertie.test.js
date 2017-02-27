/* globals MultimediaObject */

describe('MO.removePropertie', () => {
  const attributes = {
    'data-test': 'test',
    class: '.test .me',
  };
  const ob = new MultimediaObject({
    attributes,
  });

  for (const prop in attributes) {
    it(`should remove propertie ${prop} from attributes`, () => {
      ob.removePropertie('attributes', prop);
      expect(ob.attributes[prop]).toBeUndefined();
      expect(ob.element.getAttribute(prop)).toEqual(null);
    });
  }

  const data = {
    'data-test': 'test',
    class: '.test .me',
  };
  const ob2 = new MultimediaObject({
    data,
  });

  for (const prop in data) {
    it(`should remove propertie ${prop} from data`, () => {
      ob2.removePropertie('data', prop);
      expect(ob2.data[prop]).toBeUndefined();
    });
  }

  const style = {
    translateX: '10px',
    left: '50%',
  };
  const ob3 = new MultimediaObject({
    style,
  });

  for (const prop in style) {
    it(`should remove propertie ${prop} from style`, () => {
      ob3.removePropertie('style', prop);
      expect(ob3.attributes[prop]).toBeUndefined();
      expect(ob3.element.getAttribute('style').indexOf(prop)).toEqual(-1);
    });
  }
});
