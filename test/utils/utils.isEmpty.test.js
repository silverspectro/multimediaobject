import utils from '../../src/utils/utils';


describe('utils.isEmpty', () => {
  const testEmptyObject = {};
  const testFullObject = {
    accessKey: '',
    assignedSlot: null,
  };
  const testCreatedNewObject = Object.create({});

  it('should return true if object is empty', () => {
    expect(utils.isEmpty(testEmptyObject)).toBe(true);
  });
  it('should return false if object is not empty', () => {
    expect(utils.isEmpty(testFullObject)).toBe(false);
  });
  it('should return true if object is empty and prototyped', () => {
    expect(utils.isEmpty(testCreatedNewObject)).toBe(true);
  });
});
