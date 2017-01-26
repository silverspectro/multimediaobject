/* globals MultimediaObject config*/
const conf = config();
window._s4mConfig = {};

describe("MultimediaObject applyDefaultParameters", () => {
  const types = [
    "div",
    "input",
    "form",
    "img",
    "iframe",
    "video",
    "audio",
  ];

  types.forEach((type) => {
    const ob = new MultimediaObject(type);
    const matchAttributes = conf.defaultAttributes[type] || {};
    matchAttributes.id = "multimediaObject";
    it(`should contain ${matchAttributes} in .attributes`, () => {
      expect(ob.attributes).toEqual(matchAttributes);
    });
    it(`should contain ${matchAttributes} in .element.attributes`, () => {
      for (const key in matchAttributes) {
        expect(ob.element.getAttribute(key)).toEqual(matchAttributes[key]);
      }
    });
  });

  const ob2 = new MultimediaObject();

  it("should set data.autostart to true by default", () => {
    expect(ob2.data.autostart).toBe(true);
  });
  it("should set data.absoluteAssetURL to undefined", () => {
    expect(ob2.data.absoluteAssetURL).toEqual(undefined);
  });

  const ob3 = new MultimediaObject({
    data: {
      autostart: false,
    },
  });

  it("should keep data.autostart to what it was set", () => {
    expect(ob3.data.autostart).toBe(false);
  });
  it("should set data.absoluteAssetURL to './'", () => {
    expect(ob3.data.absoluteAssetURL).toEqual("./");
  });

  const ob4 = new MultimediaObject({
    data: {
      autostart: "false",
      absoluteAssetURL: "http://test.com",
    },
  });

  it("should keep data.autostart to what it was set even if it's a string", () => {
    expect(ob4.data.autostart).toBe(false);
  });
  it("should set data.absoluteAssetURL to 'http://test.com'", () => {
    expect(ob4.data.absoluteAssetURL).toEqual("http://test.com");
  });

  window._s4mConfig.absoluteAssetURL = "http://namespace.com";
  const ob5 = new MultimediaObject({
    data: {},
  });

  it("should not throw an error event if autostart is not set", () => {
    expect(ob5.data.autostart).toBe(true);
  });
  it("should set data.absoluteAssetURL to 'http://namespace.com'", () => {
    expect(ob5.data.absoluteAssetURL).toEqual("http://namespace.com");
  });

  const ob6 = new MultimediaObject({});

  it("should not throw an error event if nothing i set", () => {
    expect(ob6.data.autostart).toBe(true);
  });
});
