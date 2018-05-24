import uuid from 'uuid';

const uuidRegExp = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/, 'i');

describe('libs/uuid', () => {
  const randomsID = new Set();
  test('should create 1000 different ids that respect the regex /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i', () => {
    for (let x = 0; x < 1000; x++) {
      const id = uuid();
      expect(uuidRegExp.test(id)).toBe(true);
      expect(randomsID.has(id)).toBe(false);
      randomsID.add(id);
    }
  });
});