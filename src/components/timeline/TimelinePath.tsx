'use client';

import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import type { PathPoint } from '@/types';

interface TimelinePathProps {
  points: PathPoint[];
  className?: string;
  strokeColor?: string;
  strokeWidth?: number;
}

export function TimelinePath({
  points,
  className,
  strokeColor = '#4285F4',
  strokeWidth = 3,
}: TimelinePathProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || points.length < 2) return;

    const svg = svgRef.current;
    const bbox = svg.getBoundingClientRect();
    svg.setAttribute('viewBox', `0 0 ${bbox.width} ${bbox.height}`);
  }, [points]);

  const generatePath = (): string => {
    if (points.length < 2) return '';

    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
      const point = points[i];
      
      if (point.controlX1 !== undefined && point.controlY1 !== undefined) {
        if (point.controlX2 !== undefined && point.controlY2 !== undefined) {
          path += ` C ${point.controlX1} ${point.controlY1}, ${point.controlX2} ${point.controlY2}, ${point.x} ${point.y}`;
        } else {
          path += ` Q ${point.controlX1} ${point.controlY1}, ${point.x} ${point.y}`;
        }
      } else {
        path += ` L ${point.x} ${point.y}`;
      }
    }

    return path;
  };

  return (
    <svg
      ref={svgRef}
      className={cn('absolute inset-0 h-full w-full', className)}
      style={{ pointerEvents: 'none' }}
    >
      <path
        d={generatePath()}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-all duration-300"
      />
    </svg>
  );
}
