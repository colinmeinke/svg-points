const toPoints = ({ shape, ...attributes }) => {
  switch ( shape ) {
    case 'circle':
      return getPointsFromCircle( attributes );
    case 'ellipse':
      return getPointsFromEllipse( attributes );
    case 'line':
      return getPointsFromLine( attributes );
    case 'path':
      return getPointsFromPath( attributes );
    case 'polygon':
      return getPointsFromPolygon( attributes );
    case 'polyline':
      return getPointsFromPolyline( attributes );
    case 'rect':
      return getPointsFromRect( attributes );
    case 'g':
      return getPointsFromG( attributes );
    default:
      throw new Error( 'Not a valid shape type' );
  }
};

const getPointsFromCircle = ({ cx, cy, r }) => {
  return [
    { x: cx, y: cy - r, moveTo: true },
    { x: cx, y: cy + r, curve: { type: 'arc', rx: r, ry: r }},
    { x: cx, y: cy - r, curve: { type: 'arc', rx: r, ry: r }},
  ];
};

const getPointsFromEllipse = ({ cx, cy, rx, ry }) => {
  return [
    { x: cx, y: cy - ry, moveTo: true },
    { x: cx, y: cy + ry, curve: { type: 'arc', rx, ry }},
    { x: cx, y: cy - ry, curve: { type: 'arc', rx, ry }},
  ];
};

const getPointsFromLine = ({ x1, x2, y1, y2 }) => {
  return [
    { x: x1, y: y1, moveTo: true },
    { x: x2, y: y2 },
  ];
};

const validCommands = /[MmLlHhVvCcSsQqTtAaZz]/g;

const commandLengths = {
  m: 2,
  l: 2,
  h: 1,
  v: 1,
  c: 6,
  s: 4,
  q: 4,
  t: 2,
  a: 7,
  z: 0,
};

const optionalArcKeys = [ 'xAxisRotation', 'largeArcFlag', 'sweepFlag' ];

const getCommands = d => d.match( validCommands );

const getParams = d => d.split( validCommands )
  .map( v => v.replace( /[0-9]+-/g, m => `${ m.slice( 0, -1 )} -` ))
  .map( v => v.replace( /.[0-9]+/g, m => `${ m } ` ))
  .map( v => v.trim())
  .filter( v => v.length > 0 )
  .map( v => v.split( /[ ,]+/ )
    .map( parseFloat )
    .filter( n => !isNaN( n ))
  );

const getPointsFromPath = ({ d }) => {
  const commands = getCommands( d );
  const params = getParams( d );

  const points = [];

  let moveTo;

  for ( let i = 0, l = commands.length; i < l; i++ ) {
    const command = commands[ i ];
    const commandLength = commandLengths[ command.toLowerCase() ];

    let relative = false;

    if ( commandLength > 0 ) {
      const commandParams = params.shift();
      const iterations = commandParams.length / commandLength;

      for ( let j = 0; j < iterations; j++ ) {
        const prevPoint = i === 0 ? null : points[ points.length - 1 ];

        switch ( command ) {
          case 'm':
            relative = true;

          case 'M':
            const x = ( relative ? prevPoint.x : 0 ) + commandParams.shift();
            const y = ( relative ? prevPoint.y : 0 ) + commandParams.shift();

            moveTo = { x, y };

            points.push({ x, y, moveTo: true });

            break;

          case 'l':
            relative = true;

          case 'L':
            points.push({
              x: ( relative ? prevPoint.x : 0 ) + commandParams.shift(),
              y: ( relative ? prevPoint.y : 0 ) + commandParams.shift(),
            });

            break;

          case 'h':
            relative = true;

          case 'H':
            points.push({
              x: ( relative ? prevPoint.x : 0 ) + commandParams.shift(),
              y: prevPoint.y,
            });

            break;

          case 'v':
            relative = true;

          case 'V':
            points.push({
              x: prevPoint.x,
              y: ( relative ? prevPoint.y : 0 ) + commandParams.shift(),
            });

            break;

          case 'a':
            relative = true;

          case 'A':
            points.push({
              curve: {
                type: 'arc',
                rx: commandParams.shift(),
                ry: commandParams.shift(),
                xAxisRotation: commandParams.shift(),
                largeArcFlag: commandParams.shift(),
                sweepFlag: commandParams.shift(),
              },
              x: ( relative ? prevPoint.x : 0 ) + commandParams.shift(),
              y: ( relative ? prevPoint.y : 0 ) + commandParams.shift(),
            });

            for ( let k of optionalArcKeys ) {
              if ( points[ i ][ 'curve' ][ k ] === 0 ) {
                delete points[ i ][ 'curve' ][ k ];
              }
            }

            break;

          case 'c':
            relative = true;

          case 'C':
            points.push({
              curve: {
                type: 'cubic',
                x1: ( relative ? prevPoint.x : 0 ) + commandParams.shift(),
                y1: ( relative ? prevPoint.y : 0 ) + commandParams.shift(),
                x2: ( relative ? prevPoint.x : 0 ) + commandParams.shift(),
                y2: ( relative ? prevPoint.y : 0 ) + commandParams.shift(),
              },
              x: ( relative ? prevPoint.x : 0 ) + commandParams.shift(),
              y: ( relative ? prevPoint.y : 0 ) + commandParams.shift(),
            });

            break;

          case 's':
            relative = true;

          case 'S':
            const sx2 = ( relative ? prevPoint.x : 0 ) + commandParams.shift();
            const sy2 = ( relative ? prevPoint.y : 0 ) + commandParams.shift();
            const sx = ( relative ? prevPoint.x : 0 ) + commandParams.shift();
            const sy = ( relative ? prevPoint.y : 0 ) + commandParams.shift();

            const diff = {};

            let sx1;
            let sy1;

            if ( prevPoint.curve && prevPoint.curve.type === 'cubic' ) {
              diff.x = Math.abs( prevPoint.x - prevPoint.curve.x2 );
              diff.y = Math.abs( prevPoint.y - prevPoint.curve.y2 );
              sx1 = prevPoint.x < prevPoint.curve.x2 ? prevPoint.x - diff.x : prevPoint.x + diff.x;
              sy1 = prevPoint.y < prevPoint.curve.y2 ? prevPoint.y - diff.y : prevPoint.y + diff.y;
            } else {
              diff.x = Math.abs( sx - sx2 );
              diff.y = Math.abs( sy - sy2 );
              sx1 = sx < sx2 ? prevPoint.x - diff.x : prevPoint.x + diff.x;
              sy1 = sy < sy2 ? prevPoint.y + diff.y : prevPoint.y - diff.y;
            }

            points.push({ curve: { type: 'cubic', x1: sx1, y1: sy1, x2: sx2, y2: sy2 }, x: sx, y: sy });

            break;

          case 'q':
            relative = true;

          case 'Q':
            points.push({
              curve: {
                type: 'quadratic',
                x1: ( relative ? prevPoint.x : 0 ) + commandParams.shift(),
                y1: ( relative ? prevPoint.y : 0 ) + commandParams.shift(),
              },
              x: ( relative ? prevPoint.x : 0 ) + commandParams.shift(),
              y: ( relative ? prevPoint.y : 0 ) + commandParams.shift(),
            });

            break;

          case 't':
            relative = true;

          case 'T':
            const tx = ( relative ? prevPoint.x : 0 ) + commandParams.shift();
            const ty = ( relative ? prevPoint.y : 0 ) + commandParams.shift();

            let tx1;
            let ty1;

            if ( prevPoint.curve && prevPoint.curve.type === 'quadratic' ) {
              const diff = {
                x: Math.abs( prevPoint.x - prevPoint.curve.x1 ),
                y: Math.abs( prevPoint.y - prevPoint.curve.y1 ),
              };

              tx1 = prevPoint.x < prevPoint.curve.x1 ? prevPoint.x - diff.x : prevPoint.x + diff.x;
              ty1 = prevPoint.y < prevPoint.curve.y1 ? prevPoint.y - diff.y : prevPoint.y + diff.y;
            } else {
              tx1 = prevPoint.x;
              ty1 = prevPoint.y;
            }

            points.push({ curve: { type: 'quadratic', x1: tx1, y1: ty1 }, x: tx, y: ty });

            break;
        }
      }
    } else {
      points.push({ x: moveTo.x, y: moveTo.y });
    }
  }

  return points;
};

const getPointsFromPolygon = ({ points }) => {
  return getPointsFromPoints({ closed: true, points });
};

const getPointsFromPolyline = ({ points }) => {
  return getPointsFromPoints({ closed: false, points });
};

const getPointsFromPoints = ({ closed, points }) => {
  const numbers = points.split( /[\s,]+/ ).map( n => parseFloat( n ));

  const p = numbers.reduce(( arr, point, i ) => {
    if ( i % 2 === 0 ) {
      arr.push({ x: point });
    } else {
      arr[( i - 1 ) / 2 ].y = point;
    }

    return arr;
  }, []);

  if ( closed ) {
    p.push({ ...p[ 0 ]});
  }

  p[ 0 ].moveTo = true;

  return p;
};

const getPointsFromRect = ({ height, rx, ry, width, x, y }) => {
  if ( rx || ry ) {
    return getPointsFromRectWithCornerRadius({
      height,
      rx: rx ? rx : ry,
      ry: ry ? ry : rx,
      width,
      x,
      y,
    });
  }

  return getPointsFromBasicRect({ height, width, x, y });
};

const getPointsFromBasicRect = ({ height, width, x, y }) => {
  return [
    { x, y, moveTo: true },
    { x: x + width, y },
    { x: x + width, y: y + height },
    { x, y: y + height },
    { x, y },
  ];
};

const getPointsFromRectWithCornerRadius = ({ height, rx, ry, width, x, y }) => {
  const curve = { type: 'arc', rx, ry, sweepFlag: 1 };

  return [
    { x: x + rx, y, moveTo: true },
    { x: x + width - rx, y },
    { x: x + width, y: y + ry, curve },
    { x: x + width, y: y + height - ry },
    { x: x + width - rx, y: y + height, curve },
    { x: x + rx, y: y + height },
    { x, y: y + height - ry, curve },
    { x, y: y + ry },
    { x: x + rx, y, curve },
  ];
};

const getPointsFromG = ({ shapes }) => shapes.map( s => toPoints( s ));

export default toPoints;
