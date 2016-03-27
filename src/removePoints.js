
const isBetween = ( a, b, c ) => {
  if ( b.curve || c.curve ) {
    return false;
  }

  const crossProduct =
    ( c.y - a.y ) *
    ( b.x - a.x ) -
    ( c.x - a.x ) *
    ( b.y - a.y );

  if ( Math.abs( crossProduct ) > Number.EPSILON ) {
    return false;
  }

  const dotProduct =
    ( c.x - a.x ) *
    ( b.x - a.x ) +
    ( c.y - a.y ) *
    ( b.y - a.y );

  if ( dotProduct < 0 ) {
    return false;
  }

  const squaredLengthBA =
    ( b.x - a.x ) *
    ( b.x - a.x ) +
    ( b.y - a.y ) *
    ( b.y - a.y );

  if ( dotProduct > squaredLengthBA ) {
    return false;
  }

  return true;
};

const removePoints = points => {
  const result = [];

  for ( let i = 0, l = points.length; i < l; i++ ) {
    const a = result[ result.length - 1 ];
    const b = points[ i + 1 ];
    const c = points[ i ];

    if ( !( a && b && c ) || !( isBetween( a, b, c ))) {
      result.push( c );
    }
  }

  return result;
};

export default removePoints;
