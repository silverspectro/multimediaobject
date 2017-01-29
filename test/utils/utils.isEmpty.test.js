import { isEmpty } from '../../src/utils/utils';


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
});
