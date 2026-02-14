'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { SpiralConfig } from '@/types';
import { use3DScroll } from '@/hooks/use3DScroll';

interface SpiralGeometryProps {
  config: SpiralConfig;
  color?: string;
}

const vertexShader = `
uniform float uMorphProgress;
uniform float uTime;
uniform float uStartRadius;
uniform float uEndRadius;
uniform float uHeight;

varying vec3 vPosition;
varying vec3 vNormal;

vec3 helixPosition(vec3 pos) {
  float t = pos.y / uHeight;
  float radius = mix(uStartRadius, uEndRadius, t);
  float angle = t * 8.0 * 3.14159265359;
  
  return vec3(
    radius * cos(angle),
    pos.y,
    radius * sin(angle)
  );
}

vec3 organicPosition(vec3 pos) {
  float t = pos.y / uHeight;
  float radius = mix(uStartRadius, uEndRadius, t);
  float angle = t * 8.0 * 3.14159265359;
  
  float organicOffset = sin(t * 10.0 + uTime * 0.5) * 0.3;
  float radiusVariation = 1.0 + sin(t * 15.0 + uTime) * 0.15;
  
  return vec3(
    radius * radiusVariation * cos(angle + organicOffset),
    pos.y,
    radius * radiusVariation * sin(angle + organicOffset)
  );
}

void main() {
  vec3 helixPos = helixPosition(position);
  vec3 organicPos = organicPosition(position);
  vec3 finalPosition = mix(helixPos, organicPos, uMorphProgress);
  
  vPosition = finalPosition;
  vNormal = normal;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPosition, 1.0);
}
`;

const fragmentShader = `
uniform vec3 uColor;
uniform float uMetalness;
uniform float uRoughness;
uniform float uTime;

varying vec3 vPosition;
varying vec3 vNormal;

void main() {
  vec3 normal = normalize(vNormal);
  vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
  
  float diffuse = max(dot(normal, lightDir), 0.0);
  float ambient = 0.3;
  
  float glow = sin(vPosition.y * 0.1 + uTime) * 0.5 + 0.5;
  vec3 finalColor = uColor * (ambient + diffuse * 0.7) + vec3(glow * 0.1);
  
  gl_FragColor = vec4(finalColor, 1.0);
}
`;

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
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}
