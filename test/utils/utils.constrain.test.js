import utils from '../../src/utils/utils';


describe('utils.constrain', () => {
  it('should constrain 0.54235 between 0 and 1', () => {
    expect(utils.constrain(0.54235, 0, 1)).toEqual(0.54235);
  });
  it('should constrain 0.54235 between 0 and 0.5', () => {
    expect(utils.constrain(0.54235, 0, 0.5)).toEqual(0.5);
  });
  it('should constrain -5 between -3 and 1', () => {
    expect(utils.constrain(-5, -3, 1)).toEqual(-3);
  });
  it('should constrain -2 between -3 and 1', () => {
    expect(utils.constrain(-2, -3, 1)).toEqual(-2);
  });
});
