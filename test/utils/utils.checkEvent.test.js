/* global utils */

describe("utils.checkEvent", () => {
  const eventsList = ["click", "mousedown", "mouseup", "mousemove", "change", "touchstart", "touchmove", "touchend", "input", "focus", "dlclick", "mouseenter", "mouseleave", "mouseover", "mouseout", "blur", "search", "submit", "play", "pause", "canplay", "progress"];
  const falseList = ["test", "", " ", "myCustomEvent", 0];

  eventsList.forEach((event) => {
    it(`should return true ${event}`, () => {
      expect(utils.checkEvent(event)).toBe(true);
    });
  });

  falseList.forEach((falseEvent) => {
    it(`should return false for ${falseEvent}`, () => {
      expect(utils.checkEvent(falseEvent)).toBe(false);
    });
  });
});
