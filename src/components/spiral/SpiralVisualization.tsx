'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { SpiralGeometry } from './SpiralGeometry';
import { SpiralControls } from './SpiralControls';
import { SPIRAL_CONFIG } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface SpiralVisualizationProps {
  className?: string;
}

export function SpiralVisualization({ className }: SpiralVisualizationProps) {
  return (
    <div className={cn('h-screen w-full', className)}>
      <Canvas
        camera={{ position: [15, 10, 15], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          
          <SpiralGeometry config={SPIRAL_CONFIG} color="#4285F4" />
          <SpiralControls autoRotate autoRotateSpeed={0.5} />
          
          <fog attach="fog" args={['#f8f9fa', 20, 50]} />
        </Suspense>
      </Canvas>
    </div>
  );
}
