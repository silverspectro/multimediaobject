describe('isEmpty', () => {
  const testEmptyObject = {};
  const testFullObject = {
    accessKey: '',
    assignedSlot: null,
  };
  const testCreatedNewObject = Object.create({});

  it('should return true if object is empty', () => {
    expect(isEmpty(testEmptyObject)).toBe(true);
  });
  it('should return false if object is not empty', () => {
    expect(isEmpty(testFullObject)).toBe(false);
  });
  it('should return true if object is empty and prototyped', () => {
    expect(isEmpty(testCreatedNewObject)).toBe(true);
  });
  it('should return true if array is empty', () => {
    expect(isEmpty([])).toBe(true);
  });
  it('should return false if array is not empty', () => {
    expect(isEmpty([10])).toBe(false);
  });
  it('should return true if null', () => {
    expect(isEmpty(null)).toBe(true);
  });
});
