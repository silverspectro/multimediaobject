import { convertLeftToTime } from '../../src/utils/utils';


describe('convertLeftToTime', () => {
  const baseWidth = 100;
  const childrenLeftPosition = 32.7;
  const extremeChildrenLeftPositon = 200;
  const totalTime = 3;

  it('should return a time based parent size and a left position', () => {
    expect(convertLeftToTime(baseWidth, childrenLeftPosition, totalTime))
    .toEqual('1.00');
  });
  it('should not return a time superior to the totalTime if the childrenPositon is to much', () => {
    expect(convertLeftToTime(baseWidth, extremeChildrenLeftPositon, totalTime))
    .toEqual('3.00');
  });
  it('should return 0 if totalTime = 0', () => {
    expect(convertLeftToTime(baseWidth, extremeChildrenLeftPositon, 0))
    .toEqual('0.00');
  });
  it('should return totalTime if baseWidth = 0', () => {
    expect(convertLeftToTime(0, extremeChildrenLeftPositon, totalTime))
    .toEqual(totalTime.toFixed(2));
  });
});
