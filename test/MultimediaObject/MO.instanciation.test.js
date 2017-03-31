/* global MultimediaObject */

describe('new Multimediaobject()', () => {
  const ob = new MultimediaObject();
  it('should create a new MultimediaObject', () => {
    expect(ob).toBeDefined();
  });
  it('should be an instance of MultimediaObject', () => {
    expect(ob instanceof MultimediaObject).toBeTruthy();
  });

  describe('testing apply configuration on creation', () => {
    const testConf = {
      name: 'test',
      attributes: {
        'data-test': 'test',
        num: 10,
      },
      style: {
        position: 'absolute',
        top: '10px',
        left: '25px',
        translateX: '55px',
      },
      functions: {
        logMessage(msg) {
          console.log(msg);
        },
      },
      events: {
        click() {
          console.log('test');
        },
      },
    };
    const ob2 = new MultimediaObject(testConf);

    it(`should have attributes equal to ${testConf.attrbutes}`, () => {
      expect(ob2.attributes).toEqual(testConf.attributes);
    });
    it(`should have style equal to ${testConf.style}`, () => {
      expect(ob2.style).toEqual(testConf.style);
    });
    it(`should have name equal to ${testConf.name}`, () => {
      expect(ob2.name).toEqual(testConf.name);
    });
    it(`should have events equal to ${testConf.events}`, () => {
      expect(ob2.events).toEqual(testConf.events);
    });
    it(`should have functions equal to ${testConf.functions}`, () => {
      expect(ob2.functions).toEqual(testConf.functions);
    });
  });

  describe('testing events and functions', () => {
    const testConf = {
      name: 'test',
      attributes: {
        'data-test': 'test',
        num: 10,
      },
      style: {
        position: 'absolute',
        top: '10px',
        left: '25px',
        translateX: '55px',
      },
      functions: {
        logMessage(msg) {
          console.log(msg);
        },
      },
      events: {
        click() {
          console.log('test');
        },
      },
    };
    let ob2;
    beforeEach(() => {
      ob2 = new MultimediaObject(testConf);
      spyOn(ob2, 'logMessage');
      // spyOn(ob2._events, "click");
    });


    it('should not have been called', () => {
      expect(ob2.logMessage.calls.any()).toBe(false);
    });

    it('functions should have the correct context and arguments', () => {
      ob2.logMessage('Hello');
      expect(ob2.logMessage.calls.all()).toEqual([{ object: ob2, args: ['Hello'], returnValue: undefined }]);
    });

    it(`should have a style corresponding to ${JSON.stringify(testConf.style)}`, () => {
      expect(ob2.style).toEqual(testConf.style);
      expect(ob2._style).toEqual(testConf.style);
    });

    // it("events should have the correct context and arguments", () => {
    //   ob2._events.click({});
    //   expect(ob2._events.click.calls.all()).toEqual([{ object: ob2, args: [{}], returnValue: undefined }]);
    // });
  });
});
