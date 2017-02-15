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
          src: 'http://www.quirksmode.org/html5/videos/big_buck_bunny.mp4',
          autoplay: true,
        },
      });
      ob.applyEvents(normalEvents);
      for (const event in normalEvents) {
        spyOn(ob.events, event).and.returnValue('test');
      }
    });
    it('should have applied events', () => {
      for (const event in normalEvents) {
        expect(ob.events[event]).toBeDefined();
        ob.events[event]();
        expect(ob.events[event].calls.all()).toEqual([{ object: ob.events, args: [], returnValue: 'test' }]);
      }
    });
  });

  describe('spy on custom events', () => {
    let ob;
    beforeEach(() => {
      ob = new MultimediaObject({
        type: 'video',
        attributes: {
          src: 'http://www.quirksmode.org/html5/videos/big_buck_bunny.mp4',
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
