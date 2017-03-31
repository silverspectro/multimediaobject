describe('MO.appendElementTo', () => {
  it('should append the element to the container', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const ob = new MultimediaObject();

    ob.appendElementTo(container);
    expect(ob.element.parentElement).toEqual(container);
    expect(ob.DOMParent).toEqual(container);
  });

  it('should append the element to the body', () => {
    const ob = new MultimediaObject();

    ob.appendElementTo();
    expect(ob.element.parentElement).toEqual(document.body);
    expect(ob.DOMParent).toEqual(document.body);
  });

  it('should append the element to another MultimediaObject', () => {
    const container = new MultimediaObject();
    container.appendElementTo();
    const ob = new MultimediaObject();

    ob.appendElementTo(container);
    expect(ob.element.parentElement).toEqual(container.element);
    expect(ob.DOMParent).toEqual(container);
    expect(ob.DOMParent instanceof MultimediaObject).toBe(true);
  });

  it('should append the childs', () => {
    const container = new MultimediaObject();

    for (let c = 0; c < 10; c++) {
      container.add(new MultimediaObject());
    }
    container.appendElementTo();

    expect(container.childs.length).toEqual(10);

    container.childs.forEach((child) => {
      expect(child.DOMParent).toEqual(container);
      expect(child.element.parentElement).toEqual(container.element);
    });
  });
});
