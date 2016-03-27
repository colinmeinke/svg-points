import expect from 'expect';

import removePoints from '../src/removePoints';

describe( 'removePoints', () => {
  it( 'should remove midpoint', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 25, y: 0 },
      { x: 50, y: 0 },
    ];

    const expectedPoints = [
      { x: 0, y: 0 },
      { x: 50, y: 0 },
    ];

    expect( removePoints( points )).toEqual( expectedPoints );
  });

  it( 'should remove multiple midpoints', () => {
    const points = [
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 3 },
      { x: 4, y: 4 },
    ];

    const expectedPoints = [
      { x: 1, y: 1 },
      { x: 4, y: 4 },
    ];

    expect( removePoints( points )).toEqual( expectedPoints );
  });

  it( 'should not remove midpoint if curve', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 25, y: 0, curve: { type: 'arc', rx: 1, ry: 1 }},
      { x: 50, y: 0 },
    ];

    expect( removePoints( points )).toEqual( points );
  });

  it( 'should remove duplicate point', () => {
    const points = [
      { x: 0, y: 10 },
      { x: 25, y: 0 },
      { x: 25, y: 0 },
      { x: 50, y: 50 },
    ];

    const expectedPoints = [
      { x: 0, y: 10 },
      { x: 25, y: 0 },
      { x: 50, y: 50 },
    ];

    expect( removePoints( points )).toEqual( expectedPoints );
  });

  it( 'should remove multiple duplicate points', () => {
    const points = [
      { x: 0, y: 10 },
      { x: 25, y: 0 },
      { x: 25, y: 0 },
      { x: 25, y: 0 },
      { x: 50, y: 50 },
    ];

    const expectedPoints = [
      { x: 0, y: 10 },
      { x: 25, y: 0 },
      { x: 50, y: 50 },
    ];

    expect( removePoints( points )).toEqual( expectedPoints );
  });

  it( 'should not remove duplicate point if curve', () => {
    const points = [
      { x: 0, y: 10 },
      { x: 25, y: 0 },
      { x: 25, y: 0, curve: { type: 'arc', rx: 1, ry: 1 }},
      { x: 50, y: 50 },
    ];

    expect( removePoints( points )).toEqual( points );
  });
});
