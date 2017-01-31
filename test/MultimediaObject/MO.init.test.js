/* globals MultimediaObject */

describe('MultimediaObject init', () => {
  const types = [
    'div',
    'input',
    'form',
    'img',
    'iframe',
    'video',
    'audio',
  ];

  types.forEach((type) => {
    const ob = new MultimediaObject(type);
    it(`should generate a DOMElement based on the type ${type}`, () => {
      expect(ob.element.nodeName).toEqual(type.toUpperCase());
    });
  });

  const ob2 = new MultimediaObject();

  it('should append the element to the body', () => {
    expect(document.getElementById(ob2.name)).toEqual(ob2.element);
  });
});
