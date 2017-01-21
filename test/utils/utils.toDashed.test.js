/* global utils */

describe("utils.toDashed", () => {
  it("should return background-color for input backgroundColor", () => {
    expect(utils.toDashed("backgroundColor")).toEqual("background-color");
  });
  it("should return background-color-plus for input backgroundColorPlus", () => {
    expect(utils.toDashed("backgroundColorPlus")).toEqual("background-color-plus");
  });
  it("should return background for input background", () => {
    expect(utils.toDashed("background")).toEqual("background");
  });
});
