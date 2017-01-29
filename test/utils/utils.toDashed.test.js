import { toDashed } from '../../src/utils/utils';


describe('toDashed', () => {
  it('should return background-color for input backgroundColor', () => {
    expect(toDashed('backgroundColor')).toEqual('background-color');
  });
  it('should return background-color-plus for input backgroundColorPlus', () => {
    expect(toDashed('backgroundColorPlus')).toEqual('background-color-plus');
  });
  it('should return background for input background', () => {
    expect(toDashed('background')).toEqual('background');
  });
});
