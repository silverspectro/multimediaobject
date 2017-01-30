import { transformToColor, generateRandomHexColor, hexToR, hexToG, hexToB } from '../../src/utils/utils';

describe('transformToColor', () => {
  const rndHexColor = generateRandomHexColor();
  for (let x = 0; x < 10; x++) {
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
      expect(generatedObj.r <= 255 && generatedObj.r > 0).toBeTruthy();
    });
    it('object should have g propertie value between 0-255', () => {
      expect(generatedObj.g <= 255 && generatedObj.g > 0).toBeTruthy();
    });
    it('object should have b propertie value between 0-255', () => {
      expect(generatedObj.b <= 255 && generatedObj.b > 0).toBeTruthy();
    });
  }
});
