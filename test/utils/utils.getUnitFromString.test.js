/* global utils */

describe("utils.getUnitFromString", () => {
  const units = ["%", "px", "vh", "vw", "em"];
  units.forEach((unit) => {
    it(`should return ${unit} from '17${unit}'`, () => {
      expect(utils.getUnitFromString(`17${unit}`)).toEqual(unit);
    });
  });
  it("should return px from '17tata'", () => {
    expect(utils.getUnitFromString("17tata")).toEqual("px");
  });
  it("should return px from ''", () => {
    expect(utils.getUnitFromString("")).toEqual("px");
  });
});
