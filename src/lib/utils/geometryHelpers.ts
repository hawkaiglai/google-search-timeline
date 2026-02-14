import type { Vector3D, SpiralPoint, SpiralConfig } from '@/types';

export function calculateSpiralPoint(t: number, config: SpiralConfig): SpiralPoint {
  const {
    startRadius,
    endRadius,
    height,
    turns,
    startYear,
    endYear,
  } = config;

  const angle = t * turns * 2 * Math.PI;
  const radius = startRadius + (endRadius - startRadius) * t;
  const y = (t - 0.5) * height;
  const x = radius * Math.cos(angle);
  const z = radius * Math.sin(angle);
  const year = Math.round(startYear + (endYear - startYear) * t);

  return { x, y, z, angle, radius, height: y, year };
}

export function generateSpiralPath(config: SpiralConfig): SpiralPoint[] {
  const points: SpiralPoint[] = [];
  const { segments } = config;

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    points.push(calculateSpiralPoint(t, config));
  }

  return points;
}

export function interpolatePoints(p1: Vector3D, p2: Vector3D, t: number): Vector3D {
  return {
    x: p1.x + (p2.x - p1.x) * t,
    y: p1.y + (p2.y - p1.y) * t,
    z: p1.z + (p2.z - p1.z) * t,
  };
}

export function calculateDistance(p1: Vector3D, p2: Vector3D): number {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const dz = p2.z - p1.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

export function calculateNormal(points: Vector3D[], index: number): Vector3D {
  if (points.length < 3 || index === 0 || index === points.length - 1) {
    return { x: 0, y: 1, z: 0 };
  }

  const prev = points[index - 1];
  const curr = points[index];
  const next = points[index + 1];

  const v1 = {
    x: curr.x - prev.x,
    y: curr.y - prev.y,
    z: curr.z - prev.z,
  };

  const v2 = {
    x: next.x - curr.x,
    y: next.y - curr.y,
    z: next.z - curr.z,
  };

  const normal = crossProduct(v1, v2);
  return normalize(normal);
}

export function crossProduct(v1: Vector3D, v2: Vector3D): Vector3D {
  return {
    x: v1.y * v2.z - v1.z * v2.y,
    y: v1.z * v2.x - v1.x * v2.z,
    z: v1.x * v2.y - v1.y * v2.x,
  };
}

export function dotProduct(v1: Vector3D, v2: Vector3D): number {
  return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
}

export function magnitude(v: Vector3D): number {
  return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
}

export function normalize(v: Vector3D): Vector3D {
  const mag = magnitude(v);
  if (mag === 0) return { x: 0, y: 0, z: 0 };
  return {
    x: v.x / mag,
    y: v.y / mag,
    z: v.z / mag,
  };
}

export function addVectors(v1: Vector3D, v2: Vector3D): Vector3D {
  return {
    x: v1.x + v2.x,
    y: v1.y + v2.y,
    z: v1.z + v2.z,
  };
}

export function subtractVectors(v1: Vector3D, v2: Vector3D): Vector3D {
  return {
    x: v1.x - v2.x,
    y: v1.y - v2.y,
    z: v1.z - v2.z,
  };
}

export function scaleVector(v: Vector3D, scale: number): Vector3D {
  return {
    x: v.x * scale,
    y: v.y * scale,
    z: v.z * scale,
  };
}

export function calculateBezierPoint(
  p0: Vector3D,
  p1: Vector3D,
  p2: Vector3D,
  p3: Vector3D,
  t: number
): Vector3D {
  const mt = 1 - t;
  const mt2 = mt * mt;
  const mt3 = mt2 * mt;
  const t2 = t * t;
  const t3 = t2 * t;

  return {
    x: mt3 * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t3 * p3.x,
    y: mt3 * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t3 * p3.y,
    z: mt3 * p0.z + 3 * mt2 * t * p1.z + 3 * mt * t2 * p2.z + t3 * p3.z,
  };
}

export function calculateCatmullRomPoint(
  p0: Vector3D,
  p1: Vector3D,
  p2: Vector3D,
  p3: Vector3D,
  t: number,
  tension = 0.5
): Vector3D {
  const t2 = t * t;
  const t3 = t2 * t;

  const v0 = scaleVector(subtractVectors(p2, p0), tension);
  const v1 = scaleVector(subtractVectors(p3, p1), tension);

  return {
    x: (2 * p1.x - 2 * p2.x + v0.x + v1.x) * t3 +
       (-3 * p1.x + 3 * p2.x - 2 * v0.x - v1.x) * t2 +
       v0.x * t + p1.x,
    y: (2 * p1.y - 2 * p2.y + v0.y + v1.y) * t3 +
       (-3 * p1.y + 3 * p2.y - 2 * v0.y - v1.y) * t2 +
       v0.y * t + p1.y,
    z: (2 * p1.z - 2 * p2.z + v0.z + v1.z) * t3 +
       (-3 * p1.z + 3 * p2.z - 2 * v0.z - v1.z) * t2 +
       v0.z * t + p1.z,
  };
}

export function generateOrganicPath(
  points: Vector3D[],
  segments = 10,
  tension = 0.5
): Vector3D[] {
  if (points.length < 2) return points;
  
  const result: Vector3D[] = [];
  
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    
    for (let j = 0; j < segments; j++) {
      const t = j / segments;
      result.push(calculateCatmullRomPoint(p0, p1, p2, p3, t, tension));
    }
  }
  
  result.push(points[points.length - 1]);
  return result;
}

export function rotatePoint(point: Vector3D, angle: number, axis: 'x' | 'y' | 'z'): Vector3D {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  
  switch (axis) {
    case 'x':
      return {
        x: point.x,
        y: point.y * cos - point.z * sin,
        z: point.y * sin + point.z * cos,
      };
    case 'y':
      return {
        x: point.x * cos + point.z * sin,
        y: point.y,
        z: -point.x * sin + point.z * cos,
      };
    case 'z':
      return {
        x: point.x * cos - point.y * sin,
        y: point.x * sin + point.y * cos,
        z: point.z,
      };
    default:
      return point;
  }
}
