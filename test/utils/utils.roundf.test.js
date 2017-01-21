/* global utils */

describe("utils.roundf", () => {
  const pi = Math.PI;
  const piDecimals = pi.toString().replace("3.", "");
  for (let x = 0; x < 15; x++) {
    const num = Number(parseFloat(`3.${piDecimals.slice(0, x)}`));
    it(`should round the number ${pi} to ${x} decimals so ${num}`, () => {
      expect(utils.roundf(pi, x)).toEqual(num);
    });
  }
  it("should round the number 12354.132 to 2 decimals so 12354.13", () => {
    expect(utils.roundf(12354.132, 2)).toEqual(12354.13);
  });
  it("should round the number 12354.132 to 0 decimals so 12354", () => {
    expect(utils.roundf(12354.132, 0)).toEqual(12354);
  });
});
