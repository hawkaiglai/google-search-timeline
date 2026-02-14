'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';
import { generateSpiralPath } from '@/lib/utils/geometryHelpers';
import type { SpiralConfig } from '@/types';

interface SpiralGeometryProps {
  config: SpiralConfig;
  color?: string;
}

export function SpiralGeometry({ config, color = '#4285F4' }: SpiralGeometryProps) {
  const points = useMemo(() => {
    const spiralPoints = generateSpiralPath(config);
    return spiralPoints.map(p => new THREE.Vector3(p.x, p.y, p.z));
  }, [config]);

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(points);
  }, [points]);

  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, config.segments, config.tubeRadius, 16, false);
  }, [curve, config.segments, config.tubeRadius]);

  return (
    <mesh geometry={tubeGeometry}>
      <meshStandardMaterial
        color={color}
        metalness={0.6}
        roughness={0.3}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}
