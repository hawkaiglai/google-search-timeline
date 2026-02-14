import type * as THREE from 'three';

export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export interface SpiralPoint extends Vector3D {
  year: number;
  angle: number;
  radius: number;
  height: number;
}

export interface SpiralConfig {
  startRadius: number;
  endRadius: number;
  height: number;
  turns: number;
  segments: number;
  tubeRadius: number;
  startYear: number;
  endYear: number;
  rotationSpeed: number;
  cameraAutoRotate: boolean;
}

export interface SpiralMaterialProps {
  color: string | number;
  metalness: number;
  roughness: number;
  opacity: number;
  transparent: boolean;
  emissive?: string | number;
  emissiveIntensity?: number;
}

export interface SpiralStrand {
  id: string;
  name: string;
  color: string;
  startYear: number;
  endYear: number;
  points: SpiralPoint[];
  thickness: number;
  material: SpiralMaterialProps;
}

export interface CameraPosition {
  position: Vector3D;
  target: Vector3D;
  fov: number;
  near: number;
  far: number;
}

export interface SpiralAnimation {
  type: 'rotate' | 'zoom' | 'morph' | 'color-shift';
  duration: number;
  delay: number;
  ease: string;
  from: Record<string, unknown>;
  to: Record<string, unknown>;
}

export interface GeometryHelpers {
  calculateSpiralPoint: (t: number, config: SpiralConfig) => SpiralPoint;
  generateSpiralPath: (config: SpiralConfig) => SpiralPoint[];
  interpolatePoints: (p1: Vector3D, p2: Vector3D, t: number) => Vector3D;
  calculateNormal: (points: Vector3D[], index: number) => Vector3D;
}
