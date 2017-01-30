import { unitForProperty } from '../../src/utils/utils';
import staticData from '../../src/config/data.static';

describe('unitForProperty', () => {
  const pxPropertiesArray = staticData.sets.pxProperties;
  const degProperties = staticData.sets.degProperties;
  const styleProperties = staticData.sets.styleProperties;
  const wrongArray = [null, undefined, {}, false, true, ['test', 'test'], ''];

  pxPropertiesArray.forEach((prop) => {
    it(`should return 'px' for ${prop}`, () => {
      expect(unitForProperty(prop, 12.54)).toEqual('px');
    });
  });

  degProperties.forEach((prop) => {
    it(`should return 'deg' for ${prop}`, () => {
      expect(unitForProperty(prop, 10)).toEqual('deg');
    });
  });

  styleProperties.forEach((prop) => {
    it(`should return '' for ${prop}`, () => {
      expect(unitForProperty(prop, 10)).toEqual('');
    });
  });

  wrongArray.forEach((prop) => {
    it(`should return '' for ${prop}`, () => {
      expect(unitForProperty(prop, prop)).toEqual('');
    });
  });

  wrongArray.forEach((prop) => {
    it(`should return '' for ${prop} but value 10`, () => {
      expect(unitForProperty(prop, 10)).toEqual('');
    });
  });
});
