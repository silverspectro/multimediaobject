/* globals MultimediaObject */
import MultimediaObject from '../../src/MultimediaObject';

describe('MultimediaObject requireDependencies', () => {
  const dep1 = 'https://code.jquery.com/jquery-3.1.1.min.js';

  const ob = new MultimediaObject();
  ob.applyDependencies(dep1);

  // it("$ should be available", () => {
  //   ob.requireDependencies(($) => {
  //     expect($).toBeDefined();
  //   });
  // });
});
