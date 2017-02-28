describe('utils.parseBoolean', () => {
  const booleans = [true, 'true', '', 'l', [], [10], ['10'], {}, { test: 'test' }];
  const notBooleans = [false, 'false', null, undefined];

  booleans.forEach((bool) => {
    it('should return true', () => {
      expect(parseBoolean(bool)).toBe(true);
    });
  });

  notBooleans.forEach((bool) => {
    it('should return false', () => {
      console.log(bool);
      expect(parseBoolean(bool)).toBe(false);
    });
  });
});
