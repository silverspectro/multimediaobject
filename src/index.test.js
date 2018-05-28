import MultimediaObject from './index';

describe('MultimediaObject.constructor', () => {
  test('should instanciate a MultimediaObject', () => {
    const mo = new MultimediaObject();

    expect(mo).toBeInstanceOf(MultimediaObject);
    expect(mo.name).toEqual(`multimediaobject-${mo.uuid}`);
  });
});

describe('MultimediaObject.findDriver', () => {
  test('should find driver by id', () => {
    const mo = new MultimediaObject();

    mo.loadDrivers([
      {
        id: 'test',
      },
      {
        id: 'test2',
      }
    ]);

    expect(mo.findDriver('test')).toEqual(0);
    expect(mo.findDriver('test2')).toEqual(1);
    expect(mo.findDriver('test2', false)).toEqual({ id: 'test2' });
  });
  test('should create drivers array if not present', () => {
    const mo = new MultimediaObject();
    expect(mo.data.drivers).toBeUndefined();
    mo.findDriver('test');
    expect(mo.data.drivers).toEqual([]);
  });
});

describe('MultimediaObject.loadDrivers', () => {
  test('should add drivers to array if not already present', () => {
    const mo = new MultimediaObject();
    
    const originalError = console.error;
    console.error = jest.fn();

    mo.loadDrivers([
      {
        id: 'test',
      },
    ]);

    expect(mo.findDriver('test')).toEqual(0);
    expect(mo.data.drivers).toHaveLength(1);

    mo.loadDrivers([
      {
        id: 'test',
      },
    ]);

    expect(mo.data.drivers).toHaveLength(1);
    expect(console.error).toHaveBeenCalled();

    console.error = originalError;
  });
  test('should throw if not array', () => {
    const mo = new MultimediaObject();
    expect(() => mo.loadDrivers('test')).toThrowError(/should be of type/);
  });
});

describe('MultimediaObject.removeDriver', () => {
  test('should remove a driver by id if present', () => {
    const mo = new MultimediaObject();

    const originalError = console.error;
    console.error = jest.fn();

    mo.loadDrivers([
      {
        id: 'test',
      },
      {
        id: 'test2',
      }
    ]);

    expect(mo.data.drivers).toHaveLength(2);

    mo.removeDriver({ id: 'test' });

    expect(mo.data.drivers).toHaveLength(1);

    expect(mo.data.drivers).toHaveLength(1);
    mo.removeDriver({ id: 'test' });
    expect(console.error).toHaveBeenCalled();
    console.error = originalError;
  });
  test('should throw if not id', () => {
    const mo = new MultimediaObject();
    expect(() => mo.removeDriver('test')).toThrowError();
  });
});

// describe('MultimediaObject init', () => {
//   const types = [
//     'div',
//     'input',
//     'form',
//     'img',
//     'iframe',
//     'video',
//     'audio',
//   ];

//   types.forEach((type) => {
//     const ob = new MultimediaObject({ type });
//     test.skip(`should generate a DOMElement based on the type ${type}`, () => {
//       expect(ob.element.nodeName).toEqual(type.toUpperCase());
//     });
//   });

//   test.skip('should append the element to the body', () => {
//     const ob2 = new MultimediaObject();
//     expect(document.getElementById(ob2.uuid)).toEqual(ob2.element);
//   });
// });

describe('NultimediaObject.setAbsoluteUrl', () => {

  afterEach(() => {
    delete window.MultimediaObjectEditor;
    delete window._s4mConfig;
  });

  test('should not apply anything if window[configuration.namespace] is undefined', () => {
    window.MultimediaObjectEditor = true;
    window._s4mConfig = {};

    const data = {
      template: false,
      load: true,
    };

    const mo = new MultimediaObject(data);

    expect(mo.data.absoluteAssetURL).toBeUndefined();
  });

  test('should set absoluteAssetURL if window[namespace].absoluteAssetURL is set and no template', () => {
    window.MultimediaObjectEditor = true;
    window._s4mConfig = {};
    window._s4mConfig.absoluteAssetURL = 'test';

    const data = {
      template: false,
      load: true,
    };

    const mo = new MultimediaObject(data);

    expect(mo.data.absoluteAssetURL).toEqual('test');
  });

  test('should apply templateURL if it is set', () => {
    window.MultimediaObjectEditor = true;
    window._s4mConfig = {};
    window._s4mConfig.absoluteAssetURL = 'test';

    const data = {
      load: true,
      data: {
        templateURL: 'test',
        template: true,
      },
    };

    const mo = new MultimediaObject(data);

    expect(mo.data.absoluteAssetURL).toEqual('test');
  });

  test('should apply window[namespace].absoluteAssetURL if it is set on non MultimediaObjectEditor context', () => {
    window._s4mConfig = {};
    window._s4mConfig.absoluteAssetURL = 'test';

    const data = {
      load: true,
      data: {
        templateURL: 'failed test !',
        template: true,
      },
    };

    const mo = new MultimediaObject(data);

    expect(mo.data.absoluteAssetURL).toEqual('test');
  });

  test('should apply \'./\' if window[namespace].absoluteAssetURL is not set on non MultimediaObjectEditor context', () => {
    window._s4mConfig = {
      absoluteAssetURL: 'undefined',
    };
    const data = {
      load: true,
      data: {
        templateURL: 'test',
      },
    };

    const mo = new MultimediaObject(data);
    expect(mo.data.absoluteAssetURL).toEqual('./');
  });
});

describe('MultimediaObject.loadFromJSON', () => {
  test('should copy all keys if they are not ["events", "functions", "childs"]', () => {
    const params = {
      name: 'test',
      titi: 'test',
      randomKey: {
        test: 'inside',
      },
      childs: [
        {
          name: 'test',
          titi: 'test',
          randomKey: {
            test: 'inside',
          },
        }
      ],
      events: {
        test: 'lol',
      },
      functions: {
        test: 'lol',
      },
      test: undefined,
    };

    const mo = new MultimediaObject(params);

    expect(mo.name).toEqual('test');
    expect(mo.titi).toEqual('test');
    expect(mo.randomKey).toBeTruthy();
    expect(mo.randomKey.test).toEqual('inside');
    expect(mo.childs).not.toEqual(params.childs);
    expect(mo.events).not.toEqual(params.events);
    expect(mo.functions).not.toEqual(params.functions);
    expect(mo.test).toBeUndefined();
  });

  test('should copy type if present, else put block', () => {
    const params = {
      type: 'video',
    };
    const mo = new MultimediaObject(params);
    expect(mo.type).toEqual('video');

    const mo2 = new MultimediaObject();
    expect(mo2.type).toEqual('block');
  });

  test('should unserialize events and add them to this.events', () => {
    const params = {
      exportedEvents: {
        "click": {
          "args": [""],
          "body": "return 'test'"
        },
      },
    };

    const mo = new MultimediaObject(params);

    expect(mo.events).toHaveProperty('click');
    expect(mo.events.click).toBeInstanceOf(Function);
    expect(mo.events.click()).toEqual('test');
  });

  test('should unserialize functions and add them to this.functions', () => {
    const params = {
      exportedFunctions: {
        "logMe": {
          "args": ["test"],
          "body": "return test"
        },
      },
    };

    const mo = new MultimediaObject(params);

    expect(mo.functions).toHaveProperty('logMe');
    expect(mo.functions.logMe).toBeInstanceOf(Function);
    expect(mo.functions.logMe('test')).toEqual('test');
  });

  test('should unserialize childs and add them as new MultimediaObjects and add ["load", "DOMParent", "DOMParentUUID"] keys', () => {
    const params = {
      childs: [
        {
          name: 'test',
          titi: 'test',
          randomKey: {
            test: 'inside',
          },
        },
        {
          name: 'test2',
        }
      ],
    };

    const mo = new MultimediaObject(params);

    expect(mo.childs).toHaveLength(2);
    expect(mo.childs[0]).toBeTruthy();
    expect(mo.childs[1]).toBeTruthy();
    expect(mo.childs[0]).toBeInstanceOf(MultimediaObject);
    expect(mo.childs[1]).toBeInstanceOf(MultimediaObject);
    expect(mo.childs[0].name).toEqual('test');
    expect(mo.childs[1].name).toEqual('test2');
    expect(mo.childs[0].load).toEqual(true);
    expect(mo.childs[1].load).toEqual(true);

    expect(mo.childs[0].titi).toEqual('test');
    expect(mo.childs[0].randomKey).toBeTruthy();
    expect(mo.childs[0].randomKey.test).toEqual('inside');
  });

  test('should convert booleans in data', () => {
    const data = {
      test: "false",
      test1: "true",
    };

    const mo = new MultimediaObject({
      data,
    });

    expect(mo.data.test).toEqual(false);
    expect(mo.data.test1).toEqual(true);
  });
});