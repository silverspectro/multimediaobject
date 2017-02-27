import data from '../../src/config/data.static.js';

describe('MO.generate', () => {
  it('should generate a DOMElement', () => {
    for (const type in data.Atoms) {
      const ob = new MultimediaObject();
      ob.generate(type);
      expect(ob.type).toEqual(data.Atoms[type]);
      expect(ob.element.tagName).toEqual(data.Atoms[type].toUpperCase());
    }
  });
});
