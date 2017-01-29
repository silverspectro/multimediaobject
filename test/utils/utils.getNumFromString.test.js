import { getNumFromString } from '../../src/utils/utils';


describe('getNumFromString', () => {
  it("should return -34 from 'reatesa-34eafd'", () => {
    expect(getNumFromString('reatesa-34eafd')).toEqual(-34);
  });
  it("should return 34 from 'reatesa34eafd'", () => {
    expect(getNumFromString('reatesa34eafd')).toEqual(34);
  });
  it("should return 34.54 from 'reatesa34.54eafd'", () => {
    expect(getNumFromString('reatesa34.54eafd')).toEqual(34.54);
  });
  it("should return -34.54 from 'reatesa-34eafd'", () => {
    expect(getNumFromString('reatesa-34.54eafd')).toEqual(-34.54);
  });
  it("should return -34.5417 from 'reatesa-34.eafd17'", () => {
    expect(getNumFromString('reatesa-34.54eafd17')).toEqual(-34.5417);
  });
  it("should return 345417 from 'reatesa34eafd17'", () => {
    expect(getNumFromString('reatesa3454eafd17')).toEqual(345417);
  });
  it("should return '' from ''", () => {
    expect(getNumFromString('')).toEqual(0);
  });
  it("should return '' from null", () => {
    expect(getNumFromString(null)).toEqual(0);
  });
  it("should return '' from undefined", () => {
    expect(getNumFromString(undefined)).toEqual(0);
  });
});
