/* global utils */

describe('utils.getNumFromString', () => {
  it("should return -34 from 'reatesa-34eafd'", () => {
    expect(utils.getNumFromString('reatesa-34eafd')).toEqual(-34);
  });
  it("should return 34 from 'reatesa34eafd'", () => {
    expect(utils.getNumFromString('reatesa34eafd')).toEqual(34);
  });
  it("should return 34.54 from 'reatesa34.54eafd'", () => {
    expect(utils.getNumFromString('reatesa34.54eafd')).toEqual(34.54);
  });
  it("should return -34.54 from 'reatesa-34eafd'", () => {
    expect(utils.getNumFromString('reatesa-34.54eafd')).toEqual(-34.54);
  });
  it("should return -34.5417 from 'reatesa-34.eafd17'", () => {
    expect(utils.getNumFromString('reatesa-34.54eafd17')).toEqual(-34.5417);
  });
  it("should return 345417 from 'reatesa34eafd17'", () => {
    expect(utils.getNumFromString('reatesa3454eafd17')).toEqual(345417);
  });
  it("should return '' from ''", () => {
    expect(utils.getNumFromString('')).toEqual('');
  });
  it("should return '' from null", () => {
    expect(utils.getNumFromString(null)).toEqual('');
  });
  it("should return '' from undefined", () => {
    expect(utils.getNumFromString(undefined)).toEqual('');
  });
});
