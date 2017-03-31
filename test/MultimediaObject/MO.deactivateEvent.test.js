/* globals MultimediaObject */

describe('MO.deactivateEvent', () => {
  const normalEvents = {
    click: () => {},
    mousedown: () => {},
    mouseup: () => {},
    mousemove: () => {},
    change: () => {},
    touchstart: () => {},
    touchmove: () => {},
    touchend: () => {},
    input: () => {},
    focus: () => {},
    dlclick: () => {},
    mouseenter: () => {},
    mouseleave: () => {},
    mouseover: () => {},
    mouseout: () => {},
    blur: () => {},
    search: () => {},
    submit: () => {},
    play: () => {},
    pause: () => {},
    canplay: () => {},
    progress: () => {},
  };
  const customEvents = {
    test: arg => arg,
    log: arg => arg,
  };

  describe('spy on normal events', () => {
    let ob;
    beforeEach(() => {
      ob = new MultimediaObject({
        type: 'video',
        attributes: {
          autoplay: true,
        },
      });
      ob.applyEvents(normalEvents);
      spyOn(ob.element, 'removeEventListener');
    });
    it('should have deactivated events but kept them in events', () => {
      const oldFunc = [];
      for (const eventName in ob.events) {
        oldFunc.push(ob._events[eventName]);
        ob.deactivateEvent(eventName);
      }
      let ind = 0;
      for (const event in normalEvents) {
        expect(ob.events[event]).toBeDefined();
        expect(ob._events[event]).toBeDefined();
        expect(ob.element.removeEventListener.calls.all()[ind]).toEqual({ object: ob.element, args: [event, oldFunc[ind]], returnValue: undefined });
        ind++;
      }
    });
  });

  describe('spy on custom events', () => {
    let ob;
    beforeEach(() => {
      ob = new MultimediaObject({
        type: 'video',
        attributes: {
          autoplay: true,
        },
      });
      ob.applyEvents(customEvents);
      for (const eventName in ob.events) {
        ob.deactivateEvent(eventName);
      }
    });
    for (const event in customEvents) {
      it('should have deactivated custom events but kept them in events', () => {
        expect(ob.events[event]).toBeDefined();
        expect(ob._events[event]).toBeDefined();
      });
    }
  });
});
