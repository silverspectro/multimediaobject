import { toCamelCase } from '../../src/utils/utils';


describe('toCamelCase', () => {
  it('should return backgroundColor for input background-color', () => {
    expect(toCamelCase('background-color')).toEqual('backgroundColor');
  });
  it('should return backgroundColorPlus for input background-color-plus', () => {
    expect(toCamelCase('background-color-plus')).toEqual('backgroundColorPlus');
  });
  it('should return background for input background', () => {
    expect(toCamelCase('background')).toEqual('background');
  });
});
