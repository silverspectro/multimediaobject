/* globals MultimediaObject */

describe('MO.applyEvents', () => {
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
          src: 'test',
          autoplay: true,
        },
      });
      ob.applyEvents(normalEvents);
      spyOn(ob.element, 'addEventListener');
    });
    it('should have applied events', () => {
      ob.applyEvents(normalEvents);
      let ind = 0;
      for (const event in normalEvents) {
        expect(ob.events[event]).toBeDefined();
        expect(ob.element.addEventListener.calls.all()[ind]).toEqual({ object: ob.element, args: [event, ob._events[event]], returnValue: undefined });
        ind++;
      }
    });
  });

  describe('spy on swipe event with mousedown', () => {
    let ob;
    beforeEach(() => {
      ob = new MultimediaObject({
        type: 'video',
        attributes: {
          src: 'test',
          autoplay: true,
        },
      });
      ob.applyEvents({
        swipe: (userdata) => {},
      });
      spyOn(ob.element, 'addEventListener');
    });
    it('should apply a swipe event', () => {
      expect(ob.element.addEventListener.calls.all()).toEqual([]);
    });
  });

  describe('spy on swipe event with touch', () => {
    let ob;
    window.ontouchstart = true;
    beforeEach(() => {
      ob = new MultimediaObject({
        type: 'video',
        attributes: {
          src: 'test',
          autoplay: true,
        },
      });
      ob.applyEvents({
        swipe: (userdata) => {},
      });
      spyOn(ob.element, 'addEventListener');
    });
    it('should apply a swipe event', () => {
      expect(ob.element.addEventListener.calls.all()).toEqual([]);
    });
  });

  describe('spy on custom events', () => {
    let ob;
    beforeEach(() => {
      ob = new MultimediaObject({
        type: 'video',
        attributes: {
          src: 'test',
          autoplay: true,
        },
      });
      ob.applyEvents(customEvents);
      const testFunction = (arg) => {
        expect(arg).toEqual('test');
      };
      for (const event in customEvents) {
        ob.addListener(event, testFunction);
      }
    });
    for (const event in customEvents) {
      it('should have applied custom events', () => {
        expect(ob.events[event]).toBeDefined();
        ob.dispatchEvent([event], 'test');
      });
    }
  });
});
