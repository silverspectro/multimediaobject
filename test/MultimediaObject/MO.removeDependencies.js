/* globals MultimediaObject */

describe("MultimediaObject removeDependencies", () => {
  const dep1 = "http://google.com";
  const dep2 = ["http://test.com", "https://site.random.com/js"];

  const ob = new MultimediaObject();
  ob.applyDependencies(dep1);
  ob.removeDependencies(dep1);

  it("should have no dependencies", () => {
    expect(ob.dependencies).toEqual([]);
  });

  const ob2 = new MultimediaObject();
  ob2.applyDependencies(dep2);
  ob2.removeDependencies(dep2);

  it(`should have ${dep2} as a dependency`, () => {
    expect(ob2.dependencies).toEqual([]);
  });
});
