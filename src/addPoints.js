const straightMidPoint = ( a, b ) => {
  const x = a.x === b.x ? 0 : Math.abs( b.x - a.x );
  const y = a.y === b.y ? 0 : Math.abs( b.y - a.y );

  return {
    x: x === 0 ? a.x : ( a.x < b.x ? a.x + x / 2 : a.x - x / 2 ),
    y: y === 0 ? a.y : ( a.y < b.y ? a.y + y / 2 : a.y - y / 2 ),
  };
};

const midPoint = ( a, b ) => {
  if ( !b.curve ) {
    return straightMidPoint( a, b );
  }

  return false;
};

const addPoints = ( points, pointsRequired ) => {
  const p = [ ...points ];

  for ( let i = 1; i < p.length; ) {
    const m = midPoint( p[ i - 1 ], p[ i ]);

    if ( m ) {
      p.splice( i, 0, m );

      if ( p.length === pointsRequired ) {
        return p;
      }

      i += 2;
    } else {
      i++;
    }
  }

  if ( p.length === points.length ) {
    const additionalPoints = pointsRequired - p.length;
    const newPoint = { x: p[ 0 ].x, y: p[ 0 ].y };

    for ( let i = 0; i < additionalPoints; i++ ) {
      p.unshift( newPoint );
    }

    return p;
  }

  return addPoints( p, pointsRequired );
}

export default addPoints;
