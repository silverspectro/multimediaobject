/* globals MultimediaObject */
import MultimediaObject from '../../src/MultimediaObject';

describe('MultimediaObject applyDependencies', () => {
  const ob = new MultimediaObject();
  const dep1 = 'http://google.com';
  const dep2 = ['http://test.com', 'https://site.random.com/js'];

  it('should have no dependencies', () => {
    expect(ob.dependencies).toEqual([]);
  });

  const ob2 = new MultimediaObject();
  ob2.applyDependencies(dep1);

  it(`should have ${dep1} as a dependency`, () => {
    expect(ob2.dependencies).toEqual([dep1]);
  });

  const ob3 = new MultimediaObject();
  ob3.applyDependencies(dep2);

  it(`should have ${dep2} as a dependency`, () => {
    expect(ob3.dependencies).toEqual(dep2);
  });

  const ob4 = new MultimediaObject();
  ob4.dependencies = dep2;
  ob4.applyDependencies();

  it(`should have ${dep2} as a dependency if called with no arguments and set before as a property`, () => {
    expect(ob4.dependencies).toEqual(dep2);
  });
});
