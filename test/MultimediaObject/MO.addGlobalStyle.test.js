/* globals MultimediaObject */

describe('MO.addGlobaStyle', () => {
  const ob = new MultimediaObject({
    data: {
      globalStyle: '#test{position:"absolute"}',
    },
  });

  it('should addGlobaStyle to document  based on this.data.globalStyle', () => {
    expect(document.getElementById(`style-${ob.uuid}`)).toBeDefined();
  });

  const ob2 = new MultimediaObject();

  it('should not have called addGlobaStyle', () => {
    expect(document.getElementById(`style-${ob2.uuid}`)).toBe(null);
    expect(ob2.data.globalStyle).toBeUndefined();
  });

  ob2.addGlobalStyle('#test{position:"absolute"}');

  it('should addGlobaStyle to document  based on this.data.globalStyle', () => {
    expect(document.getElementById(`style-${ob.uuid}`)).toBeDefined();
  });

  const ob3 = new MultimediaObject();
  const wrongArgs = [{}, [], undefined, null];

  wrongArgs.forEach((arg) => {
    it(`should throw an error if globalStyle is ${arg}`, () => {
      expect(() => ob3.addGlobalStyle(arg)).toThrow();
    });
  });
});
