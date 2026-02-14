'use client';

import React from 'react';
import type { SpiralMaterialProps } from '@/types';

export function SpiralMaterial({
  color,
  metalness,
  roughness,
  opacity,
  transparent,
  emissive,
  emissiveIntensity,
}: SpiralMaterialProps) {
  return (
    <meshStandardMaterial
      color={color}
      metalness={metalness}
      roughness={roughness}
      opacity={opacity}
      transparent={transparent}
      emissive={emissive}
      emissiveIntensity={emissiveIntensity}
    />
  );
}
