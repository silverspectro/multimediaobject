import MultimediaObject from './index';

import DOMDriver from './drivers/drivers/DOM';

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
    const drivers = [
      {
        id: 'test',
        init: () => {},
      },
      {
        id: 'test2',
        init: () => {},
      }
    ];
    mo.loadDrivers(drivers);

    expect(mo.findDriver('test')).toEqual(0);
    expect(mo.findDriver('test2')).toEqual(1);
    expect(mo.findDriver('test2', false)).toEqual(drivers[1]);
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
        init: () => {},
      },
    ]);

    expect(mo.findDriver('test')).toEqual(0);
    expect(mo.drivers).toHaveLength(1);
    expect(mo.data.drivers.test).toBeUndefined();

    mo.loadDrivers([
      {
        id: 'test',
        init: () => {},
      },
    ]);

    expect(mo.drivers).toHaveLength(1);
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
        init: () => {},
      },
      {
        id: 'test2',
        init: () => {},
      }
    ]);

    expect(mo.drivers).toHaveLength(2);

    mo.removeDriver('test');

    expect(mo.drivers).toHaveLength(1);

    expect(mo.drivers).toHaveLength(1);
    mo.removeDriver('test');
    expect(console.error).toHaveBeenCalled();
    console.error = originalError;
  });
});

describe('MultimediaObject.init', () => {
  test('should load all drivers and trigger there init method', () => {
    const originalInit = DOMDriver.init;
    DOMDriver.init = jest.fn();

    const mo = new MultimediaObject({
      drivers: [DOMDriver],
    });

    expect(DOMDriver.init).toHaveBeenCalledWith(mo.data.drivers.DOM);

    DOMDriver.init = originalInit;
  });
  test('should keep old driver data unless erased', () => {
    const originalInit = DOMDriver.init;
    DOMDriver.init = jest.fn();
    const domdata = {
      type: 'input',
    };
    const mo = new MultimediaObject({
      drivers: [DOMDriver],
      data: {
        drivers: {
          DOM: domdata,
        },
      }
    });

    expect(DOMDriver.init).toHaveBeenCalledWith(domdata);

    DOMDriver.init = originalInit;
  });
});

describe('MultimediaObject.setAbsoluteUrl', () => {

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

  test('should copy type if present, else put div', () => {
    const params = {
      type: 'video',
    };
    const mo = new MultimediaObject(params);
    expect(mo.type).toEqual('video');

    const mo2 = new MultimediaObject();
    expect(mo2.type).toEqual('div');
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

  test('should not throw error if function is badly formed', () => {
    const originalError = console.error;
    console.error = jest.fn();

    const params = {
      exportedFunctions: {
        "logMe": {
          "args": ["test"],
          "body": "return test var function"
        },
      },
    };

    expect(() => new MultimediaObject(params)).not.toThrow();

    const mo = new MultimediaObject(params);

    expect(mo.functions.logMe).toBeInstanceOf(Function);
    expect(console.error).toHaveBeenCalled();
    console.error = originalError;
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