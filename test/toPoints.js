import expect from 'expect';

import toPoints from '../src/toPoints';

describe( 'toPoints', () => {
  it( 'should return correct points of a circle', () => {
    const shape = { type: 'circle', cx: 50, cy: 50, r: 20 };

    const expectedPoints = [
      { x: 50, y: 30, moveTo: true },
      { x: 50, y: 70, curve: { type: 'arc', rx: 20, ry: 20 }},
      { x: 50, y: 30, curve: { type: 'arc', rx: 20, ry: 20 }},
    ];

    const points = toPoints( shape );

    expect( points ).toEqual( expectedPoints );
  });

  it( 'should return correct points of an ellipse', () => {
    const shape = { type: 'ellipse', cx: 100, cy: 300, rx: 65, ry: 120 };

    const expectedPoints = [
      { x: 100, y: 180, moveTo: true },
      { x: 100, y: 420, curve: { type: 'arc', rx: 65, ry: 120 }},
      { x: 100, y: 180, curve: { type: 'arc', rx: 65, ry: 120 }},
    ];

    const points = toPoints( shape );

    expect( points ).toEqual( expectedPoints );
  });

  it( 'should return correct points of a line', () => {
    const shape = { type: 'line', x1: 10, x2: 50, y1: 70, y2: 200 };

    const expectedPoints = [
      { x: 10, y: 70, moveTo: true },
      { x: 50, y: 200 },
    ];

    const points = toPoints( shape );

    expect( points ).toEqual( expectedPoints );
  });

  it( 'should return correct points of a path', () => {
    const shape = { type: 'path', d: 'M20,20h50v20L90,30H50V50l-10-20z' };

    const expectedPoints = [
      { x: 20, y: 20, moveTo: true },
      { x: 70, y: 20 },
      { x: 70, y: 40 },
      { x: 90, y: 30 },
      { x: 50, y: 30 },
      { x: 50, y: 50 },
      { x: 40, y: 30 },
      { x: 20, y: 20 },
    ];

    const points = toPoints( shape );

    expect( points ).toEqual( expectedPoints );
  });


  it( 'should return correct points of a path (with moveto)', () => {
    const shape = { type: 'path', d: 'M20,20v30m30-30v30M80,20V50M110,20v30' };

    const expectedPoints = [
      { x: 20, y: 20, moveTo: true },
      { x: 20, y: 50 },
      { x: 50, y: 20, moveTo: true },
      { x: 50, y: 50 },
      { x: 80, y: 20, moveTo: true },
      { x: 80, y: 50 },
      { x: 110, y: 20, moveTo: true },
      { x: 110, y: 50 },
    ];

    const points = toPoints( shape );

    expect( points ).toEqual( expectedPoints );
  });

  it( 'should return correct points of a path (with arcs)', () => {
    const shape = { type: 'path', d: 'M20,20h50v20A2,2,0,0,1,80,35L90,30H50V50a5,5,45,1,0-5-10l-5-10Z' };

    const expectedPoints = [
      { x: 20, y: 20, moveTo: true },
      { x: 70, y: 20 },
      { x: 70, y: 40 },
      { x: 80, y: 35, curve: { type: 'arc', rx: 2, ry: 2, sweepFlag: 1 }},
      { x: 90, y: 30 },
      { x: 50, y: 30 },
      { x: 50, y: 50 },
      { x: 45, y: 40, curve: { type: 'arc', rx: 5, ry: 5, largeArcFlag: 1, xAxisRotation: 45 }},
      { x: 40, y: 30 },
      { x: 20, y: 20 },
    ];

    const points = toPoints( shape );

    expect( points ).toEqual( expectedPoints );
  });

  it( 'should return correct points of a path (with cubic beziers)', () => {
    const shape = { type: 'path', d: 'M20,20h50v20C70,45,80,40,80,35L90,30H50V50c5-3,0-7-5-10l-5-10Z' };

    const expectedPoints = [
      { x: 20, y: 20, moveTo: true },
      { x: 70, y: 20 },
      { x: 70, y: 40 },
      { x: 80, y: 35, curve: { type: 'cubic', x1: 70, y1: 45, x2: 80, y2: 40 }},
      { x: 90, y: 30 },
      { x: 50, y: 30 },
      { x: 50, y: 50 },
      { x: 45, y: 40, curve: { type: 'cubic', x1: 55, y1: 47, x2: 50, y2: 43 }},
      { x: 40, y: 30 },
      { x: 20, y: 20 },
    ];

    const points = toPoints( shape );

    expect( points ).toEqual( expectedPoints );
  });

  it( 'should return correct points of a path (with shorthand cubic beziers)', () => {
    const shape = { type: 'path', d: 'M100,100S175,50,200,100s100,10,100,0' };

    const expectedPoints = [
      { x: 100, y: 100, moveTo: true },
      { x: 200, y: 100, curve: { type: 'cubic', x1: 125, y1: 50, x2: 175, y2: 50 }},
      { x: 300, y: 100, curve: { type: 'cubic', x1: 225, y1: 150, x2: 300, y2: 110 }},
    ];

    const points = toPoints( shape );

    expect( points ).toEqual( expectedPoints );
  });

  it( 'should return correct points of a path (with quadratic beziers)', () => {
    const shape = { type: 'path', d: 'M20,20h50v20Q70,45,80,35L90,30H50V50q5-3-5-10l-5-10Z' };

    const expectedPoints = [
      { x: 20, y: 20, moveTo: true },
      { x: 70, y: 20 },
      { x: 70, y: 40 },
      { x: 80, y: 35, curve: { type: 'quadratic', x1: 70, y1: 45 }},
      { x: 90, y: 30 },
      { x: 50, y: 30 },
      { x: 50, y: 50 },
      { x: 45, y: 40, curve: { type: 'quadratic', x1: 55, y1: 47 }},
      { x: 40, y: 30 },
      { x: 20, y: 20 },
    ];

    const points = toPoints( shape );

    expect( points ).toEqual( expectedPoints );
  });

  it( 'should return correct points of a path (with shorthand quadratic beziers)', () => {
    const shape = { type: 'path', d: 'M300,400Q450,200,600,400T900,500t100,0' };

    const expectedPoints = [
      { x: 300, y: 400, moveTo: true },
      { x: 600, y: 400, curve: { type: 'quadratic', x1: 450, y1: 200 }},
      { x: 900, y: 500, curve: { type: 'quadratic', x1: 750, y1: 600 }},
      { x: 1000, y: 500, curve: { type: 'quadratic', x1: 1050, y1: 400 }},
    ];

    const points = toPoints( shape );

    expect( points ).toEqual( expectedPoints );
  });

  it( 'should return correct points of a path (with unspaced negative params)', () => {
    const shape = { type: 'path', d: 'M5-2L-1-4' };

    const expectedPoints = [
      { x: 5, y: -2, moveTo: true },
      { x: -1, y: -4 },
    ];

    const points = toPoints( shape );

    expect( points ).toEqual( expectedPoints );
  });

  it( 'should return correct points of a path (with unspaced decimal params)', () => {
    const shape = { type: 'path', d: 'M5.5.2C-.2.5.7.2.9.2C125,123,171,73.8,247,51.6L10.5,10' };

    const expectedPoints = [
      { x: 5.5, y: 0.2, moveTo: true },
      { x: 0.9, y: 0.2, curve: {
        type: 'cubic',
        x1: -0.2,
        y1: 0.5,
        x2: 0.7,
        y2: 0.2,
      }},
      { x: 247, y: 51.6, curve: {
        type: 'cubic',
        x1: 125,
        y1: 123,
        x2: 171,
        y2: 73.8,
      }},
      { x: 10.5, y: 10 },
    ];

    const points = toPoints( shape );

    expect( points ).toEqual( expectedPoints );
  });

  it( 'should return correct points of a path (with multiple shorthand commands)', () => {
    const shape = { type: 'path', d: 'M0,0L10,10,15,20,20,30' };

    const expectedPoints = [
      { x: 0, y: 0, moveTo: true },
      { x: 10, y: 10 },
      { x: 15, y: 20 },
      { x: 20, y: 30 },
    ];

    const points = toPoints( shape );

    expect( points ).toEqual( expectedPoints );
  });

  it( 'should return correct points of a polygon', () => {
    const shape = { type: 'polygon', points: '20,30 50,90 20,90 50,30' };

    const expectedPoints = [
      { x: 20, y: 30, moveTo: true },
      { x: 50, y: 90 },
      { x: 20, y: 90 },
      { x: 50, y: 30 },
      { x: 20, y: 30 },
    ];

    const points = toPoints( shape );

    expect( points ).toEqual( expectedPoints );
  });

  it( 'should return correct points of a polyline', () => {
    const shape = { type: 'polyline', points: '20,30 50,90 20,90 50,30' };

    const expectedPoints = [
      { x: 20, y: 30, moveTo: true },
      { x: 50, y: 90 },
      { x: 20, y: 90 },
      { x: 50, y: 30 },
    ];

    const points = toPoints( shape );

    expect( points ).toEqual( expectedPoints );
  });

  it( 'should return correct points of a rect', () => {
    const shape = { type: 'rect', height: 20, width: 50, x: 10, y: 10 };

    const expectedPoints = [
      { x: 10, y: 10, moveTo: true },
      { x: 60, y: 10 },
      { x: 60, y: 30 },
      { x: 10, y: 30 },
      { x: 10, y: 10 },
    ];

    const points = toPoints( shape );

    expect( points ).toEqual( expectedPoints );
  });

  it( 'should return correct points of a rect (with corner radius)', () => {
    const shape = { type: 'rect', height: 200, rx: 5, ry: 10, width: 500, x: 50, y: 50 };

    const expectedPoints = [
      { x: 55, y: 50, moveTo: true },
      { x: 545, y: 50 },
      { x: 550, y: 60, curve: { type: 'arc', rx: 5, ry: 10, sweepFlag: 1 }},
      { x: 550, y: 240 },
      { x: 545, y: 250, curve: { type: 'arc', rx: 5, ry: 10, sweepFlag: 1 }},
      { x: 55, y: 250 },
      { x: 50, y: 240, curve: { type: 'arc', rx: 5, ry: 10, sweepFlag: 1 }},
      { x: 50, y: 60 },
      { x: 55, y: 50, curve: { type: 'arc', rx: 5, ry: 10, sweepFlag: 1 }},
    ];

    const points = toPoints( shape );

    expect( points ).toEqual( expectedPoints );
  });

  it ( 'should return correct points of a g', () => {
    const shape = { type: 'g', shapes: [
      { type: 'circle', cx: 50, cy: 50, r: 20 },
      { type: 'line', x1: 10, y1: 70, x2: 50, y2: 200 },
    ]};

    const expectedPoints = [
      [
        { x: 50, y: 30, moveTo: true },
        { x: 50, y: 70, curve: { type: 'arc', rx: 20, ry: 20 }},
        { x: 50, y: 30, curve: { type: 'arc', rx: 20, ry: 20 }},
      ],
      [
        { x: 10, y: 70, moveTo: true },
        { x: 50, y: 200 },
      ],
    ];

    const points = toPoints( shape );

    expect( points ).toEqual( expectedPoints );
  });
});
