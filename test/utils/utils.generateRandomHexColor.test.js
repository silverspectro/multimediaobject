import { generateRandomHexColor } from '../../src/utils/utils';


describe('generateRandomHexColor', () => {
  it('should return a string respecting this regex /^#[a-f-0-9]{6}$/', () => {
    let maximumLoop = 100;
    const HEXRegExp = /^#[a-f-A-F-0-9]{6}$/;
    for (;maximumLoop--;) {
      expect(HEXRegExp.test(generateRandomHexColor())).toBe(true);
    }
  });
});
