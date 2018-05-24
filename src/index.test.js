import MultimediaObject from './index';

describe('MultimediaObject.constructor', () => {
  test('should instanciate a MultimediaObject', () => {
    const mo = new MultimediaObject();

    expect(mo).toBeInstanceOf(MultimediaObject);
    expect(mo.name).toEqual(`multimediaobject-${mo.uuid}`);
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

describe('MultimediaObject.loadFromJSON', () => {
  test('should copy all keys if they are not ["animations", "events", "functions", "childs"]', () => {
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
    };

    const mo = new MultimediaObject(params);

    expect(mo.name).toEqual('test');
    expect(mo.titi).toEqual('test');
    expect(mo.randomKey).toBeTruthy();
    expect(mo.randomKey.test).toEqual('inside');
    expect(mo.childs).not.toEqual(params.childs);
    expect(mo.events).not.toEqual(params.events);
    expect(mo.functions).not.toEqual(params.functions);
  });

  test('should copy animations and add a default animation if "default" key doesn\'t exist (for legacy purpose)', () => {
    const params = {
      animations: {
        '0.01': {
          stepTime: '0.01',
          propertie: 'top',
          stepValue: '10px',
          easing: 'linear',
        },
        '1.00': {
          stepTime: '1.00',
          propertie: 'top',
          stepValue: '100px',
          easing: 'linear',
        },
      },
    };

    const mo = new MultimediaObject(params);

    expect(mo.currentAnimation).toEqual(params.animations);
    expect(mo.animations.default).toEqual(params.animations);
  });

  test('should copy animations and not add default if it exists', () => {
    const params = {
      animations: {
        default : {
          '0.01': {
            stepTime: '0.01',
            propertie: 'top',
            stepValue: '10px',
            easing: 'linear',
          },
          '1.00': {
            stepTime: '1.00',
            propertie: 'top',
            stepValue: '100px',
            easing: 'linear',
          },
        },
      },
    };

    const mo = new MultimediaObject(params);

    expect(mo.currentAnimation).toEqual({});
    expect(mo.selectedAnimation).toEqual('default');
    expect(mo.animations.default).toEqual(params.animations.default);
  });

  test('should copy selectedAnimation if present', () => {
    const params = {
      selectedAnimation: 'test',
    };
    const mo = new MultimediaObject(params);
    expect(mo.selectedAnimation).toEqual('test');
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

  test('should parse repeat value and copy else 0', () => {
    const params = {
      repeat: '10',
    };
    const mo = new MultimediaObject(params);
    expect(typeof mo.repeat).toEqual('number');
    expect(mo.repeat).toEqual(10);

    const mo2 = new MultimediaObject();
    expect(typeof mo2.repeat).toEqual('number');
    expect(mo2.repeat).toEqual(0);
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
    expect(mo.childs[0].DOMParent).toEqual(mo);
    expect(mo.childs[1].DOMParent).toEqual(mo);
    expect(mo.childs[0].DOMParentUUID).toEqual(mo.childs[1].DOMParentUUID);
    expect(mo.childs[0].DOMParentUUID).toEqual(mo.uuid);
    expect(mo.childs[1].DOMParentUUID).toEqual(mo.uuid);

    expect(mo.childs[0].titi).toEqual('test');
    expect(mo.childs[0].randomKey).toBeTruthy();
    expect(mo.childs[0].randomKey.test).toEqual('inside');
  });

  test('should add { "DOMParentUUID": json.DOMParentUUID } to MultimediaObject if in json', () => {
    const params = {
      DOMParentUUID: 'uuid',
    };

    const mo = new MultimediaObject(params);

    expect(mo.DOMParentUUID).toEqual('uuid');
  });

  test('should add { "DOMParentUUID": null } to MultimediaObject if not in json', () => {
    const mo = new MultimediaObject();

    expect(mo.DOMParentUUID).toBeNull();
  });
});