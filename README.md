# SVG points

A specification for storing SVG shape data in Javascript.
Includes functions for converting to and from a
[point object shape array](https://github.com/colinmeinke/points).

**2.3kb gzipped. No dependencies.**

## Example shape

```js
{
  type: 'circle',
  cx: 50,
  cy: 50,
  r: 20,
}
```

## Specification

A SVG shape is an object that includes a `type` property
that can take one of the following strings.

- [`circle`](#circle)
- [`ellipse`](#ellipse)
- [`line`](#line)
- [`path`](#path)
- [`polygon`](#polygon)
- [`polyline`](#polyline)
- [`rect`](#rect)
- [`g`](#g)

It also maps all the other required SVG attributes for that
particular shape to object properties.

### Shape types

#### circle

```js
{
  type: 'circle',
  cx: 50,
  cy: 50,
  r: 20,
}
```

#### ellipse

```js
{
  type: 'ellipse',
  cx: 100,
  cy: 300,
  rx: 65,
  ry: 120,
}
```

#### line

```js
{
  type: 'line',
  x1: 10,
  x2: 50,
  y1: 70,
  y2: 200,
}
```

#### path

```js
{
  type: 'path',
  d: 'M20,20h50v20A2,2,0,0,1,80,35L90,30H50V50a5,5,45,1,0-5-10l-5-10Z',
}
```

#### polygon

```js
{
  type: 'polygon',
  points: '20,30 50,90 20,90 50,30',
}
```

#### polyline

```js
{
  type: 'polyline',
  points: '20,30 50,90 20,90 50,30',
}
```

#### rect

```js
{
  type: 'rect',
  height: 20,
  width: 50,
  x: 10,
  y: 10,
  rx: 2,
  ry: 2,
}
```

The properties `rx` and `ry` are optional and if missing are
assumed to be `0`.

#### g

```js
{
  type: 'g',
  shapes: [
    {
      type: 'circle',
      cx: 50,
      cy: 50,
      r: 20,
    },
    {
      type: 'line',
      x1: 10,
      x2: 50,
      y1: 70,
      y2: 200,
    },
  ],
}
```

## Installation

```
npm install svg-points
```

## Usage

### toPoints

```js
import { toPoints } from 'svg-points';
const points = toPoints( shape );
```

Takes an SVG shape object as the only argument, and
returns a new
[point object shape array](https://github.com/colinmeinke/points).

If passing in a group shape object then returns an array of
point object shape arrays.

### toPath

```js
import { toPath } from 'svg-points';
const pathFromShape = toPath( shape );
const pathFromPoints = toPath( points );
```

Takes either an SVG shape object, or a
[point object shape array](https://github.com/colinmeinke/points),
and returns a SVG path `d` attribute string.

If passing in a group shape object, or an array of
point object shape arrays then returns an array of
SVG path `d` attribute strings.

## CommonJS

This is how you get to the good stuff if you're using
`require`.

```js
const SVGPoints = require( 'svg-points' );
const toPoints = SVGPoints.toPoints;
const toPath = SVGPoints.toPath;
```

## UMD

And if you just want to smash in a Javascript file you're
also covered. Drop this in place ...

[https://npmcdn.com/svg-points@2.0.1/dist/svg-points.min.js](https://npmcdn.com/svg-points@2.0.1/dist/svg-points.min.js)

Then access it on the `SVGPoints` global variable.

```js
const toPoints = SVGPoints.toPoints;
const toPath = SVGPoints.toPath;
```

## Help make this better

[Issues](https://github.com/colinmeinke/svg-points/issues/new)
and pull requests gratefully received!

I'm also on twitter [@colinmeinke](https://twitter.com/colinmeinke).

Thanks :star2:

## License

[ISC](./LICENSE.md).
