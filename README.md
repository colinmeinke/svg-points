# SVG points

A specification for storing SVG shape data in Javascript.

Best paired with the classic
[points library](https://github.com/colinmeinke/points)
for powerful shape manipulation.

**2.3kb gzipped. No dependencies.**

## Example shape

```js
{
  type: 'circle',
  cx: 50,
  cy: 50,
  r: 20
}
```

## Functions

- [toPoints](#topoints) – converts an SVG shape object to a
  [points array](https://github.com/colinmeinke/points)
- [toPath](#topath) – converts an SVG shape object or a
  points array to an SVG path `d` attribute string.
- [valid](#valid) – checks an SVG shape object is
  valid

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
  r: 20
}
```

#### ellipse

```js
{
  type: 'ellipse',
  cx: 100,
  cy: 300,
  rx: 65,
  ry: 120
}
```

#### line

```js
{
  type: 'line',
  x1: 10,
  x2: 50,
  y1: 70,
  y2: 200
}
```

#### path

```js
{
  type: 'path',
  d: 'M20,20h50v20A2,2,0,0,1,80,35L90,30H50V50a5,5,45,1,0-5-10l-5-10Z'
}
```

#### polygon

```js
{
  type: 'polygon',
  points: '20,30 50,90 20,90 50,30'
}
```

#### polyline

```js
{
  type: 'polyline',
  points: '20,30 50,90 20,90 50,30'
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
  ry: 2
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
      r: 20
    },
    {
      type: 'line',
      x1: 10,
      x2: 50,
      y1: 70,
      y2: 200
    }
  ]
}
```

## Installation

```
npm install svg-points
```

## Usage

### toPoints

```js
import { toPoints } from 'svg-points'

const circle = {
  type: 'circle',
  cx: 50,
  cy: 50,
  r: 20
}

const points = toPoints(circle)

console.log(points)

// [
//   { x: 50, y: 30, moveTo: true },
//   { x: 50, y: 70, curve: { type: 'arc', rx: 20, ry: 20, sweepFlag: 1 } },
//   { x: 50, y: 30, curve: { type: 'arc', rx: 20, ry: 20, sweepFlag: 1 } }
// ]
```

Takes an SVG shape object as the only argument, and
returns a new
[points array](https://github.com/colinmeinke/points).

If passing in a group shape object then returns an array of
points arrays.

### toPath

```js
import { toPath } from 'svg-points'

const circle = {
  type: 'circle',
  cx: 50,
  cy: 50,
  r: 20
}

const d = toPath(circle)

console.log(d)

// 'M50,30A20,20,0,0,1,50,70A20,20,0,0,1,50,30Z'
```

Takes either an SVG shape object, or a
[points array](https://github.com/colinmeinke/points),
and returns a SVG path `d` attribute string.

If passing in a group shape object, or an array of
points arrays then returns an array of SVG path `d`
attribute strings.

### valid

```js
import { valid } from 'svg-points'

const ellipse = {
  type: 'ellipse',
  cy: 50,
  rx: 5,
  ry: 10
}

const { errors } = valid(ellipse)

console.log(errors)

// [ 'cx prop is required on a ellipse' ]
```

## CommonJS

This is how you get to the good stuff if you're using
`require`.

```js
const SVGPoints = require('svg-points')
const toPoints = SVGPoints.toPoints
const toPath = SVGPoints.toPath
```

## UMD

And if you just want to smash in a Javascript file you're
also covered. Drop this in place ...

[https://unpkg.com/svg-points/dist/svg-points.min.js](https://unpkg.com/svg-points/dist/svg-points.min.js)

Then access it on the `SVGPoints` global variable.

```js
const toPoints = SVGPoints.toPoints
const toPath = SVGPoints.toPath
```

## Help make this better

[Issues](https://github.com/colinmeinke/svg-points/issues/new)
and pull requests gratefully received!

I'm also on twitter [@colinmeinke](https://twitter.com/colinmeinke).

Thanks :star2:

## License

[ISC](./LICENSE.md).
