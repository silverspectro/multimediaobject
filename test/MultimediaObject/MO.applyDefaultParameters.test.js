/* globals MultimediaObject config*/
const conf = config();

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
  });
});
