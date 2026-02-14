'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { SpiralConfig } from '@/types';
import { use3DScroll } from '@/hooks/use3DScroll';
import spiralVertexShader from '@/three/shaders/spiral.vertex.glsl';
import spiralFragmentShader from '@/three/shaders/spiral.fragment.glsl';

interface SpiralGeometryProps {
  config: SpiralConfig;
  color?: string;
}

export function SpiralGeometry({ config, color = '#4285F4' }: SpiralGeometryProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const progressRef = use3DScroll();

  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(
      Array.from({ length: config.segments }, (_, i) => {
        const t = i / config.segments;
        const y = t * config.height - config.height / 2;
        return new THREE.Vector3(0, y, 0);
      })
    );

    return new THREE.TubeGeometry(curve, config.segments, config.tubeRadius, 16, false);
  }, [config]);

  const uniforms = useMemo(
    () => ({
      uMorphProgress: { value: 0 },
      uTime: { value: 0 },
      uStartRadius: { value: config.startRadius },
      uEndRadius: { value: config.endRadius },
      uHeight: { value: config.height },
      uColor: { value: new THREE.Color(color) },
      uMetalness: { value: 0.8 },
      uRoughness: { value: 0.2 },
    }),
    [config, color]
  );

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
      materialRef.current.uniforms.uMorphProgress.value = progressRef.current;
    }

    if (meshRef.current && config.cameraAutoRotate) {
      meshRef.current.rotation.y += config.rotationSpeed;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={spiralVertexShader}
        fragmentShader={spiralFragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}
