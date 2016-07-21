import expect from 'expect';

import toPath from '../src/toPath';

describe( 'toPath', () => {
  it( 'should return correct path from circle points', () => {
    const points = [
      { x: 50, y: 30, moveTo: true },
      { x: 50, y: 70, curve: { type: 'arc', rx: 20, ry: 20, sweepFlag: 1 }},
      { x: 50, y: 30, curve: { type: 'arc', rx: 20, ry: 20, sweepFlag: 1 }},
    ];

    const expectedPath = 'M50,30A20,20,0,0,1,50,70A20,20,0,0,1,50,30Z';

    const path = toPath( points );

    expect( path ).toEqual( expectedPath );
  });

  it( 'should return correct path from ellipse points', () => {
    const points = [
      { x: 100, y: 180, moveTo: true },
      { x: 100, y: 420, curve: { type: 'arc', rx: 65, ry: 120, sweepFlag: 1 }},
      { x: 100, y: 180, curve: { type: 'arc', rx: 65, ry: 120, sweepFlag: 1 }},
    ];

    const expectedPath = 'M100,180A65,120,0,0,1,100,420A65,120,0,0,1,100,180Z';

    const path = toPath( points );

    expect( path ).toEqual( expectedPath );
  });

  it( 'should return correct path from line points', () => {
    const points = [
      { x: 10, y: 70, moveTo: true },
      { x: 50, y: 200 },
    ];

    const expectedPath = 'M10,70L50,200';

    const path = toPath( points );

    expect( path ).toEqual( expectedPath );
  });

  it( 'should return correct path from path points', () => {
    const points = [
      { x: 20, y: 20, moveTo: true },
      { x: 70, y: 20 },
      { x: 70, y: 40 },
      { x: 90, y: 30 },
      { x: 50, y: 30 },
      { x: 50, y: 50 },
      { x: 40, y: 30 },
      { x: 20, y: 20 },
    ];

    const expectedPath = 'M20,20H70V40L90,30H50V50L40,30Z';

    const path = toPath( points );

    expect( path ).toEqual( expectedPath );
  });

  it( 'should return correct path from path points (with moveto)', () => {
    const points = [
      { x: 20, y: 20, moveTo: true },
      { x: 20, y: 50 },
      { x: 50, y: 20, moveTo: true },
      { x: 50, y: 50 },
      { x: 80, y: 20, moveTo: true },
      { x: 80, y: 50 },
      { x: 110, y: 20, moveTo: true },
      { x: 110, y: 50 },
    ];

    const expectedPath = 'M20,20V50M50,20V50M80,20V50M110,20V50';

    const path = toPath( points );

    expect( path ).toEqual( expectedPath );
  });

  it( 'should return correct path from path points (with arcs)', () => {
    const points = [
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

    const expectedPath = 'M20,20H70V40A2,2,0,0,1,80,35L90,30H50V50A5,5,45,1,0,45,40L40,30Z';

    const path = toPath( points );

    expect( path ).toEqual( expectedPath );
  });

  it( 'should return correct path from path points (with cubic beziers)', () => {
    const points = [
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

    const expectedPath = 'M20,20H70V40C70,45,80,40,80,35L90,30H50V50C55,47,50,43,45,40L40,30Z';

    const path = toPath( points );

    expect( path ).toEqual( expectedPath );
  });

  it( 'should return correct path from path points (with shorthand cubic beziers)', () => {
    const points = [
      { x: 100, y: 100, moveTo: true },
      { x: 200, y: 100, curve: { type: 'cubic', x1: 125, y1: 50, x2: 175, y2: 50 }},
      { x: 300, y: 100, curve: { type: 'cubic', x1: 225, y1: 150, x2: 300, y2: 110 }},
    ];

    const expectedPath = 'M100,100C125,50,175,50,200,100C225,150,300,110,300,100';

    const path = toPath( points );

    expect( path ).toEqual( expectedPath );
  });

  it( 'should return correct path from path points (with quadratic beziers)', () => {
    const points = [
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

    const expectedPath = 'M20,20H70V40Q70,45,80,35L90,30H50V50Q55,47,45,40L40,30Z';

    const path = toPath( points );

    expect( path ).toEqual( expectedPath );
  });

  it( 'should return correct path from path points (with shorthand quadratic beziers)', () => {
    const points = [
      { x: 300, y: 400, moveTo: true },
      { x: 600, y: 400, curve: { type: 'quadratic', x1: 450, y1: 200 }},
      { x: 900, y: 500, curve: { type: 'quadratic', x1: 750, y1: 600 }},
      { x: 1000, y: 500, curve: { type: 'quadratic', x1: 1050, y1: 400 }},
    ];

    const expectedPath = 'M300,400Q450,200,600,400Q750,600,900,500Q1050,400,1000,500';

    const path = toPath( points );

    expect( path ).toEqual( expectedPath );
  });

  it( 'should return correct path from path points (with moveTo last point)', () => {
    const points = [
      { x: 100, y: 0, moveTo: true },
      { x: 100, y: 100 },
      { x: 200, y: 0, moveTo: true },
      { x: 200, y: 100 },
      { x: 0, y: 0 },
      { x: 0, y: 100 },
      { x: 100, y: 0, moveTo: true },
    ];

    const expectedPath = 'M100,0V100M200,0V100L0,0V100';

    const path = toPath( points );

    expect( path ).toEqual( expectedPath );
  });

  it( 'should return correct path from polyline points', () => {
    const points = [
      { x: 20, y: 30, moveTo: true },
      { x: 50, y: 90 },
      { x: 20, y: 90 },
      { x: 50, y: 30 },
    ];

    const expectedPath = 'M20,30L50,90H20L50,30';

    const path = toPath( points );

    expect( path ).toEqual( expectedPath );
  });

  it( 'should return correct path from polygon points', () => {
    const points = [
      { x: 20, y: 30, moveTo: true },
      { x: 50, y: 90 },
      { x: 20, y: 90 },
      { x: 50, y: 30 },
      { x: 20, y: 30 },
    ];

    const expectedPath = 'M20,30L50,90H20L50,30Z';

    const path = toPath( points );

    expect( path ).toEqual( expectedPath );
  });

  it( 'should return correct path from rect points', () => {
    const points = [
      { x: 10, y: 10, moveTo: true },
      { x: 60, y: 10 },
      { x: 60, y: 30 },
      { x: 10, y: 30 },
      { x: 10, y: 10 },
    ];

    const expectedPath = 'M10,10H60V30H10Z';

    const path = toPath( points );

    expect( path ).toEqual( expectedPath );
  });

  it( 'should return correct path from rect points (with corner radius)', () => {
    const points = [
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

    const expectedPath = 'M55,50H545A5,10,0,0,1,550,60V240A5,10,0,0,1,545,250H55A5,10,0,0,1,50,240V60A5,10,0,0,1,55,50Z';

    const path = toPath( points );

    expect( path ).toEqual( expectedPath );
  });

  it ( 'should return correct path from circle shape', () => {
    const shape = { type: 'circle', cx: 50, cy: 50, r: 20 };

    const expectedPath = 'M50,30A20,20,0,0,1,50,70A20,20,0,0,1,50,30Z';

    const path = toPath( shape );

    expect( path ).toEqual( expectedPath );
  });

  it ( 'should return correct paths from g shape', () => {
    const shape = { type: 'g', shapes: [
      { type: 'circle', cx: 50, cy: 50, r: 20 },
      { type: 'line', x1: 10, y1: 70, x2: 50, y2: 200 },
    ]};

    const expectedPaths = [
      'M50,30A20,20,0,0,1,50,70A20,20,0,0,1,50,30Z',
      'M10,70L50,200',
    ];

    const paths = toPath( shape );

    expect( paths ).toEqual( expectedPaths );
  });

  it ( 'should return correct paths from a group of points', () => {
    const points = [
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

    const expectedPaths = [
      'M50,30A20,20,0,0,0,50,70A20,20,0,0,0,50,30Z',
      'M10,70L50,200',
    ];

    const paths = toPath( points );

    expect( paths ).toEqual( expectedPaths );
  });
});
