describe('transformValueForProperty', () => {
  const transformArray = [
    {
      translateX: 10,
      scale: '1.2, 1.1',
      skewX: 10,
    },
    {
      translate: '10, 15',
      scale: '1px, 10em',
      skew: '10, 5',
    },
    {
      translateX: '10%',
      translateY: '10em',
      translateZ: 10,
      scaleX: '1px',
      scaleY: '1.5',
      skewX: '10em',
      skewY: 5,
    },
    {
      translateX: null,
      translateY: undefined,
      translateZ: 'undefined',
      scaleX: null,
      scaleY: {},
      skewX: ['lol'],
      skewY() {
        return 10;
      },
    },
  ];
  const refArray = [
    {
      translateX: {
        string: 'translateX(10px)',
        unit: 'px',
        value: 10,
      },
      scale: {
        string: 'scale(1.2, 1.1)',
        unit: '',
        value: [1.2, 1.1],
      },
      skewX: {
        string: 'skewX(10deg)',
        unit: 'deg',
        value: 10,
      },
    },
    {
      translate: {
        string: 'translate(10px, 15px)',
        unit: 'px',
        value: [10, 15],
      },
      scale: {
        string: 'scale(1, 10)',
        unit: '',
        value: [1, 10],
      },
      skew: {
        string: 'skew(10deg, 5deg)',
        unit: 'deg',
        value: [10, 5],
      },
    },
    {
      translateX: {
        string: 'translateX(10%)',
        unit: '%',
        value: 10,
      },
      translateY: {
        string: 'translateY(10em)',
        unit: 'em',
        value: 10,
      },
      translateZ: {
        string: 'translateZ(10px)',
        unit: 'px',
        value: 10,
      },
      scaleX: {
        string: 'scaleX(1)',
        unit: '',
        value: 1,
      },
      scaleY: {
        string: 'scaleY(1.5)',
        unit: '',
        value: 1.5,
      },
      skewX: {
        string: 'skewX(10deg)',
        unit: 'deg',
        value: 10,
      },
      skewY: {
        string: 'skewY(5deg)',
        unit: 'deg',
        value: 5,
      },
    },
    {
      translateX: {
        string: 'translateX(0px)',
        unit: 'px',
        value: 0,
      },
      translateY: {
        string: 'translateY(0px)',
        unit: 'px',
        value: 0,
      },
      translateZ: {
        string: 'translateZ(0px)',
        unit: 'px',
        value: 0,
      },
      scaleX: {
        string: 'scaleX(0)',
        unit: '',
        value: 0,
      },
      scaleY: {
        string: 'scaleY(0)',
        unit: '',
        value: 0,
      },
      skewX: {
        string: 'skewX(0deg)',
        unit: 'deg',
        value: 0,
      },
      skewY: {
        string: 'skewY(0deg)',
        unit: 'deg',
        value: 0,
      },
    },
  ];

  transformArray.forEach((style, index) => {
    for (const property in style) {
      it(`should return ${refArray[index][property]} from ${property} and ${style[property]}`, () => {
        expect(transformValueForProperty(property, style[property])).toEqual(refArray[index][property]);
      });
    }
  });
});
