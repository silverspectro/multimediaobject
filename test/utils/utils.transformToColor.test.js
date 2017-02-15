import { transformToColor, generateRandomHexColor, hexToR, hexToG, hexToB, getRandomInt } from '../../src/utils/utils';

describe('transformToColor', () => {
  for (let x = 0; x < 12; x++) {
    const rndHexColor = generateRandomHexColor();
    const colorObj = {
      r: hexToR(rndHexColor),
      g: hexToG(rndHexColor),
      b: hexToB(rndHexColor),
      a: 1,
    };
    const generatedObj = transformToColor(rndHexColor);
    it(`should return ${colorObj} from ${rndHexColor}`, () => {
      expect(generatedObj).toEqual(colorObj);
    });
    it('object should have r propertie value between 0-255', () => {
      expect(generatedObj.r <= 256 && generatedObj.r > 0).toBeTruthy();
    });
    it('object should have g propertie value between 0-255', () => {
      expect(generatedObj.g <= 256 && generatedObj.g > 0).toBeTruthy();
    });
    it('object should have b propertie value between 0-255', () => {
      expect(generatedObj.b <= 256 && generatedObj.b > 0).toBeTruthy();
    });
  }
  for (let x = 0; x < 12; x++) {
    const r = getRandomInt(0, 255);
    const g = getRandomInt(0, 255);
    const b = getRandomInt(0, 255);
    const a = Number(parseFloat(Math.random()).toFixed(2));
    const randomRGBA = `rgba(${r},${g},${b},${a})`;
    const colorObj = {
      r,
      g,
      b,
      a,
    };
    const generatedObj = transformToColor(randomRGBA);
    it(`should return ${colorObj} from ${randomRGBA}`, () => {
      expect(generatedObj).toEqual(colorObj);
    });
    it('object should have r propertie value between 0-255', () => {
      expect(generatedObj.r <= 256 && generatedObj.r >= 0).toBeTruthy();
    });
    it('object should have g propertie value between 0-255', () => {
      expect(generatedObj.g <= 256 && generatedObj.g >= 0).toBeTruthy();
    });
    it('object should have b propertie value between 0-255', () => {
      expect(generatedObj.b <= 256 && generatedObj.b >= 0).toBeTruthy();
    });
    it('object should have a propertie value between 0-1', () => {
      expect(generatedObj.a <= 1 && generatedObj.a >= 0).toBeTruthy();
    });
  }
});
