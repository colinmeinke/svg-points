declare module "svg-points" {
  interface CurveArc {
    type: "arc";
    rx: number;
    ry: number;
    xAxisRotation: number;
    largeArcFlag: number;
    sweepFlag: number;
  }

  interface CurveCubic {
    type: "cubic";
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  }

  interface CurveQuadratic {
    type: "quadratic";
    x1: number;
    y1: number;
  }

  type Curve = CurveArc | CurveCubic | CurveQuadratic;

  interface Point {
    x: number;
    y: number;
    moveTo?: true;
    curve?: Curve;
  }

  interface CycleAttrs {
    cx: number;
    cy: number;
    r: number;
  }

  interface Circle extends CycleAttrs {
    type: "circle";
  }

  interface EllipseAttrs {
    cx: number;
    cy: number;
    rx: number;
    ry: number;
  }

  interface Ellipse extends EllipseAttrs {
    type: "ellipse";
  }

  interface LineAttrs {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
  }

  interface Line extends LineAttrs {
    type: "line";
  }

  interface PathAttrs {
    d: string;
  }

  interface Path extends PathAttrs {
    type: "path";
  }

  interface WithPoints {
    points: string[];
  }

  interface Polygon extends WithPoints {
    type: "polygon";
  }

  interface Polyline extends WithPoints {
    type: "polyline";
  }

  interface RectAttrs {
    height: number;
    width: number;
    x: number;
    y: number;
    rx?: number;
    ry?: number;
  }

  interface Rect extends RectAttrs {
    type: "rect";
  }

  interface Group {
    type: "g";
    shapes: ShapeType[];
  }

  type ShapeType = Group | Circle | Ellipse | Line | Rect | Polygon | Polyline | Path;

  export function toPath(shapeOrPoints: ShapeType | Point[]): string;

  export function toPoints(shape: ShapeType): Point[];
}
