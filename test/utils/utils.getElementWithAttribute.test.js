describe('utils.getElementsWithAttribute', () => {
  const container = document.createElement('div');
  const elements = [
    document.createElement('div'),
    document.createElement('div'),
    document.createElement('div'),
    document.createElement('div'),
    document.createElement('div'),
    document.createElement('div'),
    document.createElement('div'),
    document.createElement('div'),
    document.createElement('div'),
    document.createElement('div'),
  ];

  document.body.appendChild(container);

  elements.forEach((el, index) => {
    el.setAttribute('data-pirouette', `test-${index}`);
    if (index >= 8) {
      el.setAttribute('selected', 'selected');
      container.appendChild(el);
    } else {
      document.body.appendChild(el);
    }
  });

  it('should return the correct elements for just an attribute', () => {
    expect(getElementsWithAttribute('data-pirouette').length).toEqual(10);
  });
  it('should return the correct elements for attribute + value', () => {
    expect(getElementsWithAttribute('selected', 'selected').length).toEqual(2);
  });
});
