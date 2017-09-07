/* globals MultimediaObject */

describe('MO.applyBreakpoints', () => {
  const container = document.createElement('div');
  container.id = 'scene';
  container.style.position = 'absolute';
  document.body.appendChild(container);

  const breakpointsArray = [
    [
      {
        querie: {
          'max-width': '500px',
        },
        style: {
          width: '100%',
          'background-color': 'rgb(209, 146, 5)',
        },
      },
      {
        querie: {
          'max-height': '200px',
        },
        style: {
          top: '0%',
        },
      },
    ],
    [
      {
        querie: {
          orientation: 'landscape',
        },
        style: {
          width: '100%',
          'background-color': 'rgb(209, 146, 5)',
        },
      },
      {
        querie: {
          'max-height': '200px',
        },
        style: {
          top: '0%',
        },
      },
    ],
  ];

  breakpointsArray.forEach((breakpoint) => {
    const ob = new MultimediaObject({
      type: 'div',
      style: {
        position: 'absolute',
        width: '50%',
        height: '50%',
        left: '50%',
        top: '50%',
        translateX: '-50%',
        translateY: '-50%',
        'background-color': 'rgb(46, 161, 45)',
      },
    });
    ob.appendElementTo(container);

    it(`should apply the breakpoints ${JSON.stringify(breakpoint)} and change the style`, () => {
      window.MultimediaObjectEditor = true;
      container.style.width = '400px';
      container.style.height = '200px';

      ob.applyBreakpoints(breakpoint);
      breakpoint.forEach((queries) => {
        for (const propertie in queries.style) {
          expect(ob.style[propertie]).toEqual(queries.style[propertie]);
          expect(ob.element.style[propertie]).toEqual(queries.style[propertie]);
        }
      });
      ob.breakpoints = [];
      ob.applyBreakpoints();
    });

    it(`should apply only certain breakpoints ${JSON.stringify(breakpoint)}`, () => {
      window.MultimediaObjectEditor = true;
      container.style.width = '400px';
      container.style.height = '300px';

      ob.applyBreakpoints(breakpoint);
      breakpoint.forEach((queries, index) => {
        if (index > 0) {
          for (const propertie in queries.style) {
            expect(ob.style[propertie]).toEqual(ob.style[propertie]);
          }
        } else {
          for (const propertie in queries.style) {
            expect(ob.style[propertie]).toEqual(queries.style[propertie]);
          }
        }
      });
      ob.breakpoints = [];
      ob.applyBreakpoints();
    });

    it(`should not apply the breakpoints ${JSON.stringify(breakpoint)}`, () => {
      window.MultimediaObjectEditor = true;
      container.style.width = '800px';
      container.style.height = '800px';

      ob.applyBreakpoints(breakpoint);
      breakpoint.forEach((queries) => {
        for (const propertie in queries.style) {
          expect(ob.style[propertie]).toEqual(ob.style[propertie]);
        }
      });
      ob.breakpoints = [];
      ob.applyBreakpoints();
    });
  });

  describe('check if animation', () => {
    let originalTimeout;
    beforeEach(() => {
      originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });
    afterEach(function() {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    const queries = [
      {
        querie: {
          'max-width': '500px',
        },
        style: {
          width: '100%',
          'background-color': 'rgb(209, 146, 5)',
        },
      },
      {
        querie: {
          'max-height': '200px',
        },
        style: {
          top: '0%',
        },
      },
    ];
    const ob = new MultimediaObject({
      type: 'div',
      style: {
        position: 'absolute',
        width: '50%',
        height: '50%',
        left: '50%',
        top: '50%',
        translateX: '-50%',
        translateY: '-50%',
        'background-color': 'rgb(46, 161, 45)',
      },
      animations: {
        1: {
          left: '100%',
          translateX: '-100%',
        },
      },
      breakpoints: queries,
    });
    ob.appendElementTo(container);

    it('should apply the breakpoints', (done) => {
      window.MultimediaObjectEditor = false;
      container.style.width = '400px';
      container.style.height = '200px';

      ob.startAnimation();

      window.setTimeout(() => {
        expect(ob.style.left).toEqual('70.83333333333333%');
        expect(ob.style.translateX).toEqual('-70.83333333333333%');
        done();
      }, 410);
    });
  });
});
