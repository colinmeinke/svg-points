import expect from 'expect';

import toPoints from '../src/toPoints';

describe( 'toPoints', () => {
  it( 'should return correct points of a circle', () => {
    const shape = { shape: 'circle', cx: 50, cy: 50, r: 20 };

    const expectedPoints = [
      { x: 50, y: 30 },
      { x: 50, y: 70, curve: { type: 'arc', rx: 20, ry: 20 }},
      { x: 50, y: 30, curve: { type: 'arc', rx: 20, ry: 20 }},
    ];

    const points = toPoints( shape );

    expect( points ).toEqual( expectedPoints );
  });

  it( 'should return correct points of an ellipse', () => {
    const shape = { shape: 'ellipse', cx: 100, cy: 300, rx: 65, ry: 120 };

    const expectedPoints = [
      { x: 100, y: 180 },
      { x: 100, y: 420, curve: { type: 'arc', rx: 65, ry: 120 }},
      { x: 100, y: 180, curve: { type: 'arc', rx: 65, ry: 120 }},
    ];

    const points = toPoints( shape );

    expect( points ).toEqual( expectedPoints );
  });

  it( 'should return correct points of a line', () => {
    const shape = { shape: 'line', x1: 10, x2: 50, y1: 70, y2: 200 };

    const expectedPoints = [
      { x: 10, y: 70 },
      { x: 50, y: 200 },
    ];

    const points = toPoints( shape );

    expect( points ).toEqual( expectedPoints );
  });

  it( 'should return correct points of a path', () => {
    const shape = { shape: 'path', d: 'M20,20h50v20L90,30H50V50l-10,-20z' };

    const expectedPoints = [
      { x: 20, y: 20 },
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

  it( 'should return correct points of a path (with arcs)', () => {
    const shape = { shape: 'path', d: 'M20,20h50v20A2,2,0,0,1,80,35L90,30H50V50a5,5,45,1,0,-5,-10l-5,-10Z' };

    const expectedPoints = [
      { x: 20, y: 20 },
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
    const shape = { shape: 'path', d: 'M20,20h50v20C70,45,80,40,80,35L90,30H50V50c5,-3,0,-7,-5,-10l-5,-10Z' };

    const expectedPoints = [
      { x: 20, y: 20 },
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
    const shape = { shape: 'path', d: 'M100,100S175,50,200,100s100,10,100,0' };

    const expectedPoints = [
      { x: 100, y: 100 },
      { x: 200, y: 100, curve: { type: 'cubic', x1: 125, y1: 50, x2: 175, y2: 50 }},
      { x: 300, y: 100, curve: { type: 'cubic', x1: 225, y1: 150, x2: 300, y2: 110 }},
    ];

    const points = toPoints( shape );

    expect( points ).toEqual( expectedPoints );
  });

  it( 'should return correct points of a path (with quadratic beziers)', () => {
    const shape = { shape: 'path', d: 'M20,20h50v20Q70,45,80,35L90,30H50V50q5,-3,-5,-10l-5,-10Z' };

    const expectedPoints = [
      { x: 20, y: 20 },
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
    const shape = { shape: 'path', d: 'M300,400Q450,200,600,400T900,500t100,0' };

    const expectedPoints = [
      { x: 300, y: 400 },
      { x: 600, y: 400, curve: { type: 'quadratic', x1: 450, y1: 200 }},
      { x: 900, y: 500, curve: { type: 'quadratic', x1: 750, y1: 600 }},
      { x: 1000, y: 500, curve: { type: 'quadratic', x1: 1050, y1: 400 }},
    ];

    const points = toPoints( shape );

    expect( points ).toEqual( expectedPoints );
  });

  it( 'should return correct points of a polygon', () => {
    const shape = { shape: 'polygon', points: '20,30 50,90 20,90 50,30' };

    const expectedPoints = [
      { x: 20, y: 30 },
      { x: 50, y: 90 },
      { x: 20, y: 90 },
      { x: 50, y: 30 },
      { x: 20, y: 30 },
    ];

    const points = toPoints( shape );

    expect( points ).toEqual( expectedPoints );
  });

  it( 'should return correct points of a polyline', () => {
    const shape = { shape: 'polyline', points: '20,30 50,90 20,90 50,30' };

    const expectedPoints = [
      { x: 20, y: 30 },
      { x: 50, y: 90 },
      { x: 20, y: 90 },
      { x: 50, y: 30 },
    ];

    const points = toPoints( shape );

    expect( points ).toEqual( expectedPoints );
  });

  it( 'should return correct points of a rect', () => {
    const shape = { shape: 'rect', height: 20, width: 50, x: 10, y: 10 };

    const expectedPoints = [
      { x: 10, y: 10 },
      { x: 60, y: 10 },
      { x: 60, y: 30 },
      { x: 10, y: 30 },
      { x: 10, y: 10 },
    ];

    const points = toPoints( shape );

    expect( points ).toEqual( expectedPoints );
  });

  it( 'should return correct points of a rect (with corner radius)', () => {
    const shape = { shape: 'rect', height: 200, rx: 5, ry: 10, width: 500, x: 50, y: 50 };

    const expectedPoints = [
      { x: 55, y: 50 },
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
    const shape = { shape: 'g', shapes: [
      { shape: 'circle', cx: 50, cy: 50, r: 20 },
      { shape: 'line', x1: 10, y1: 70, x2: 50, y2: 200 },
    ]};

    const expectedPoints = [
      [
        { x: 50, y: 30 },
        { x: 50, y: 70, curve: { type: 'arc', rx: 20, ry: 20 }},
        { x: 50, y: 30, curve: { type: 'arc', rx: 20, ry: 20 }},
      ],
      [
        { x: 10, y: 70 },
        { x: 50, y: 200 },
      ],
    ];

    const points = toPoints( shape );

    expect( points ).toEqual( expectedPoints );
  });
});
