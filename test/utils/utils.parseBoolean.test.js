describe('utils.parseBoolean', () => {
  const booleans = [true, 'true', '', 'l', [], [10], ['10'], {}, { test: 'test' }, undefined];
  const notBooleans = [false, 'false', null];

  booleans.forEach((bool) => {
    it('should return true', () => {
      expect(parseBoolean(bool)).toBe(true);
    });
  });

  notBooleans.forEach((bool) => {
    it('should return false', () => {
      expect(parseBoolean(bool)).toBe(false);
    });
  });
});
