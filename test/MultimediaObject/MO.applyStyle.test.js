import utils from '../../src/utils/utils';
import MultimediaObject from '../../src/MultimediaObject';

describe('MultimediaObject applyStyle', () => {
  const style = {
    position: 'absolute',
    width: '15%',
    height: '10%',
    'background-size': 'contain',
    'background-repeat': 'no-repeat',
    'background-position': 'center',
    'background-image': "url('data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAArAAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzExMSA3OS4xNTgzMjUsIDIwMTUvMDkvMTAtMDE6MTA6MjAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDM0JGRTRCMUE1QkYxMUU2OTU1RkIwREZDNzcyNDg2OSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDM0JGRTRCMkE1QkYxMUU2OTU1RkIwREZDNzcyNDg2OSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkMzQkZFNEFGQTVCRjExRTY5NTVGQjBERkM3NzI0ODY5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkMzQkZFNEIwQTVCRjExRTY5NTVGQjBERkM3NzI0ODY5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4AIUFkb2JlAGTAAAAAAQMAEAMDBgkAAAfUAAALGQAADvz/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')",
  };

  const ob = new MultimediaObject();
  ob.applyStyle(style);

  it('should have the style and _style set', () => {
    expect(ob.style).toEqual(style);
    expect(ob._style).toEqual(style);
  });

  const ob2 = new MultimediaObject();
  const style2 = {
    translateX: '10%',
    translateY: '5em',
    translateZ: '15',
    scaleX: '1.2',
    scaleY: '1',
    rotate: '45',
  };
  const _refStyle2 = {
    translateX: '10%',
    translateY: '5em',
    translateZ: '15px',
    scaleX: '1.2',
    scaleY: '1',
    rotate: '45deg',
  };
  const refStyle2 = {
    translateX: '10%',
    translateY: '5em',
    translateZ: '15px',
    scaleX: '1.2',
    scaleY: '1',
    rotate: '45deg',
    transform: 'translate3d(10%, 5em, 15px) rotate(45deg) skew(0deg, 0deg) scale(1.2, 1)',
  };

  ob2.applyStyle(style2, true);

  it('should have processed transform properties in element.style', () => {
    expect(ob2.element.style.transform).toEqual(refStyle2.transform);
  });

  it('should have processed transform properties in _style and style but not applied transform string', () => {
    expect(ob2._style).toEqual(_refStyle2);
    expect(ob2.style).toEqual(_refStyle2);
  });

  const props = [{
    translateX: null,
    'translate-y': null,
    'skew-x': null,
    skewY: 10,
    scaleY: '5vh',
    scaleX: 10,
  }, {
    position: 'absolute',
    marginLeft: 5,
    padding: '5 10',
    paddingLeft: 15,
    float: 'left',
    'font-family': 'Arial, sans',
    outline: 'none',
    zIndex: 10,
  }, {
    position: 'absolute',
    marginLeft: '5%',
    padding: '5em 10px',
    paddingLeft: '15vh',
    float: 'left',
    'border-radius': 10,
    'background-position': 'center top',
    backgroundRepeat: 'no-repeat',
    'background-color': '#ef50a2',
  }, {
    zIndex: 100,
    margin: '0 auto',
  }];
  const refProps = [{
    translateX: '0px',
    'translate-y': '0px',
    'skew-x': '0deg',
    skewY: '10deg',
    scaleY: '5',
    scaleX: '10',
  }, {
    position: 'absolute',
    marginLeft: '5px',
    padding: '5 10',
    paddingLeft: '15px',
    float: 'left',
    'font-family': 'Arial, sans',
    outline: 'none',
    zIndex: 10,
  }, {
    position: 'absolute',
    marginLeft: '5%',
    padding: '5em 10px',
    paddingLeft: '15vh',
    float: 'left',
    'border-radius': '10px',
    'background-position': 'center top',
    backgroundRepeat: 'no-repeat',
    'background-color': '#ef50a2',
  }, {
    zIndex: 100,
    margin: '0 auto',
  }];

  props.forEach((propStyle, index) => {
    const ob3 = new MultimediaObject();
    ob3.applyStyle(propStyle);
    for (const prop in propStyle) {
      if (ob3.style[prop] && ob3._style[prop]) {
        it(`should keep the right units if ${prop} = ${propStyle[prop]}`, () => {
          expect(ob3._style[prop]).toEqual(refProps[index][prop]);
          expect(ob3.style[prop]).toEqual(refProps[index][prop]);
        });
      } else {
        it(`should keep the right units if ${utils.toDashed(prop)} = ${propStyle[prop]}`, () => {
          expect(ob3._style[utils.toDashed(prop)]).toEqual(refProps[index][prop]);
          expect(ob3.style[utils.toDashed(prop)]).toEqual(refProps[index][prop]);
        });
      }
    }
  });
});
