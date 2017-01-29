import { getUnitFromString } from '../../src/utils/utils';


describe('getUnitFromString', () => {
  const units = ['%', 'px', 'vh', 'vw', 'em'];
  units.forEach((unit) => {
    it(`should return ${unit} from '17${unit}'`, () => {
      expect(getUnitFromString(`17${unit}`)).toEqual(unit);
    });
  });
  it("should return px from '17tata'", () => {
    expect(getUnitFromString('17tata')).toEqual('px');
  });
  it("should return px from ''", () => {
    expect(getUnitFromString('')).toEqual('px');
  });
});
