import expect from 'expect';

import addPoints from '../src/addPoints';

describe( 'addPoints', () => {
  it( 'should add correct number of extra points', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 50, y: 25 },
      { x: -10, y: -100 },
    ];

    expect( addPoints( points, 5 ).length ).toBe( 5 );
  });

  it( 'should add correct extra points at midpoints', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 50, y: 25 },
      { x: -10, y: -100 },
    ];

    const expectedPoints = [
      { x: 0, y: 0 },
      { x: 25, y: 12.5 },
      { x: 50, y: 25 },
      { x: 20, y: -37.5 },
      { x: -10, y: -100 },
    ];

    expect( addPoints( points, 5 )).toEqual( expectedPoints );
  });

  it( 'should add correct extra midpoints at midpoints when less than one per join', () => {
    const points = [
      { x: 50, y: 50 },
      { x: 150, y: 50 },
      { x: 150, y: 150 },
      { x: 50, y: 150 },
      { x: 50, y: 50 },
    ];

    const expectedPoints = [
      { x: 50, y: 50 },
      { x: 100, y: 50 },
      { x: 150, y: 50 },
      { x: 150, y: 150 },
      { x: 50, y: 150 },
      { x: 50, y: 50 },
    ];

    expect( addPoints( points, 6 )).toEqual( expectedPoints );
  });

  it( 'should add correct number of extra points when more than one per join', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 50, y: 25 },
      { x: -10, y: -100 },
    ];

    expect( addPoints( points, 8 ).length ).toBe( 8 );
  });


  it( 'should add correct extra midpoints at midpoints when more than one per join', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 50, y: 25 },
      { x: -10, y: -100 },
    ];

    const expectedPoints = [
      { x: 0, y: 0 },
      { x: 12.5, y: 6.25 },
      { x: 25, y: 12.5 },
      { x: 37.5, y: 18.75 },
      { x: 50, y: 25 },
      { x: 35, y: -6.25 },
      { x: 20, y: -37.5 },
      { x: -10, y: -100 },
    ];

    expect( addPoints( points, 8 )).toEqual( expectedPoints );
  });

  it( 'should only add points between straight lines', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 50, y: 25, curve: { type: 'arc', rx: 1, ry: 1 }},
      { x: 100, y: 100 },
    ];

    const expectedPoints = [
      { x: 0, y: 0 },
      { x: 50, y: 25, curve: { type: 'arc', rx: 1, ry: 1 }},
      { x: 56.25, y: 34.375 },
      { x: 62.5, y: 43.75 },
      { x: 68.75, y: 53.125 },
      { x: 75, y: 62.5 },
      { x: 87.5, y: 81.25 },
      { x: 100, y: 100 },
    ];

    expect( addPoints( points, 8 )).toEqual( expectedPoints );
  });
});
