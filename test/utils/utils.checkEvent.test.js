/* global utils */

describe("utils.checkEvent", () => {
  const eventsList = ["click", "mousedown", "mouseup", "mousemove", "change", "touchstart", "touchmove", "touchend", "input", "focus", "dlclick", "mouseenter", "mouseleave", "mouseover", "mouseout", "blur", "search", "submit", "play", "pause", "canplay", "progress"];

  it("should return true for every events passed in the list", () => {
    eventsList.forEach((event) => {
      expect(utils.checkEvent(event))
      .toBe(true);
    });
  });
});
