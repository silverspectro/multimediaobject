/* global utils */

describe("utils.generateRandomHexColor", () => {
  it("should return a string respecting this regex /^#[a-f-0-9]{5,6}$/", () => {
    let maximumLoop = 100;
    const HEXRegExp = /^#[a-f-A-F-0-9]{5,6}$/;
    for (;maximumLoop--;) {
      expect(HEXRegExp.test(utils.generateRandomHexColor())).toBe(true);
    }
  });
});
