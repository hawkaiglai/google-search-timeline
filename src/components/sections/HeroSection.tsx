'use client';

import React from 'react';
import { FadeIn, SlideIn } from '@/components/animations';
import { ScrollHint } from '@/components/ui';
import { SpiralVisualization } from '@/components/spiral';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  return (
    <section className={cn('relative h-screen w-full overflow-hidden', className)}>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800" />
      
      <div className="absolute inset-0 opacity-30">
        <SpiralVisualization />
      </div>

      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <FadeIn duration={1} delay={0.2}>
            <h1 className="mb-6 text-5xl font-bold text-gray-900 dark:text-gray-100 md:text-7xl">
              The Evolution of
              <span className="block bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Google Search
              </span>
            </h1>
          </FadeIn>

          <SlideIn direction="up" duration={0.8} delay={0.5}>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600 dark:text-gray-400">
              An interactive journey through 29 years of innovation, from a simple search box
              to the world's most powerful information retrieval system.
            </p>
          </SlideIn>

          <FadeIn duration={0.6} delay={0.8}>
            <div className="flex items-center justify-center gap-4">
              <a
                href="#timeline"
                className="rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition-all hover:bg-blue-700 hover:shadow-lg"
              >
                Explore Timeline
              </a>
              <a
                href="#about"
                className="rounded-lg border-2 border-gray-300 px-8 py-3 font-medium text-gray-700 transition-all hover:border-gray-400 dark:border-gray-600 dark:text-gray-300"
              >
                Learn More
              </a>
            </div>
          </FadeIn>
        </div>
      </div>

      <ScrollHint />
    </section>
  );
}
