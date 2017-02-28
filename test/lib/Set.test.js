import Set from '../../src/lib/Set';

describe('testing Set', () => {
  const firstArray = ['test1', 'test2', 'test3', 'test4', 'test5'];
  const set1 = new Set(firstArray);

  describe(`should create a set containing an obj propertie with every value of the array ${firstArray}`, () => {
    firstArray.forEach((value) => {
      it(`should have the propertie ${value} set to 1`, () => {
        expect(set1.obj[value]).toEqual(1);
      });
    });
  });

  describe('should create a set containing having a method contain and add', () => {
    it('should have the method add', () => {
      expect(set1.add).toBeDefined();
    });
    it('should have the method contains', () => {
      expect(set1.contains).toBeDefined();
    });
  });

  describe(`contains should return true for every value of ${firstArray}`, () => {
    firstArray.forEach((value) => {
      it(`should return true for ${value}`, () => {
        expect(set1.contains(value)).toBe(true);
      });
    });
  });

  const set2 = new Set();

  describe('add should append values to obj if they don\'t already exists', () => {
    const testArray1 = ['valeur numero 1', 'valeur numero 2'];
    set2.add(testArray1);
    set2.add(testArray1);

    testArray1.forEach((value) => {
      it(`should return true for ${value}`, () => {
        expect(set2.contains(value)).toBe(true);
      });
      it('should have a lenght of 2', () => {
        expect(Object.keys(set2.obj).length).toEqual(2);
      });
    });
  });

  describe('attepting to add other than array, string or number should throw an Error', () => {
    const goodTypes = ['test', 1, ['test', 'test2']];
    const badTypes = [{ test: 'test' }, {}, null, undefined];

    goodTypes.forEach((value) => {
      const set3 = new Set();
      set3.add(value);

      it(`should have added ${value} to set3.obj`, () => {
        if (value instanceof Array) {
          value.forEach((val) => {
            expect(set3.contains(val)).toBe(true);
          });
        } else {
          expect(set3.contains(value)).toBe(true);
        }
      });
    });

    badTypes.forEach((value) => {
      const set3 = new Set();

      it(`should throw an Error for attempting to add ${value}`, () => {
        expect(() => {
          set3.add(value);
        }).toThrow();
      });
    });
  });
});
