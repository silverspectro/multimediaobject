import Set from '../../src/lib/Set';

describe('utils.generateUUID', () => {
  const randomsID = new Set();
  it('should create 1000 different ids that respect the regex /^.{8}-.{4}-.{4}-.{4}-.{12}$/', () => {
    for (let x = 0; x < 1000; x++) {
      const id = generateUUID();
      expect(/^.{8}-.{4}-.{4}-.{4}-.{12}$/.test(id)).toBe(true);
      expect(randomsID.contains(id)).toBe(false);
      randomsID.add(id);
    }
  });
});
