'use client';

import React from 'react';
import { SpiralGeometry } from './SpiralGeometry';
import type { SpiralStrand as SpiralStrandType } from '@/types';

interface SpiralStrandProps {
  strand: SpiralStrandType;
}

export function SpiralStrand({ strand }: SpiralStrandProps) {
  const config = {
    startRadius: 2,
    endRadius: 8,
    height: 20,
    turns: 8,
    segments: 200,
    tubeRadius: strand.thickness,
    startYear: strand.startYear,
    endYear: strand.endYear,
    rotationSpeed: 0.001,
    cameraAutoRotate: true,
  };

  return (
    <group>
      <SpiralGeometry config={config} color={strand.color} />
    </group>
  );
}
