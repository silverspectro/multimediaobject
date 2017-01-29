import { closest } from '../../src/utils/utils';


describe('utils.closest', () => {
  const baseArray = [0, 4, 7, 67, 14, 145, 35.23, 14.5, 1350, 135.35];
  const refArray = [-5, 3, 123, 8.2, 26, 2500, 0, 5.5, 2];
  const response = [0, 4, 135.35, 7, 35.23, 1350, 0, 7, 4];
  for (let x = 0; x < refArray.length; x++) {
    it(`should return the closest (to superior) of the element in the array corresponding to the value ${refArray[x]}`, () => {
      expect(closest(refArray[x], baseArray)).toEqual(response[x]);
    });
  }
});
