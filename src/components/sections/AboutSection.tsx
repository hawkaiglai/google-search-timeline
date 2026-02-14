'use client';

import React from 'react';
import { FadeIn } from '@/components/animations';
import { cn } from '@/lib/utils';

interface AboutSectionProps {
  className?: string;
}

export function AboutSection({ className }: AboutSectionProps) {
  return (
    <section id="about" className={cn('py-20 bg-white dark:bg-gray-800', className)}>
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-4xl font-bold text-gray-900 dark:text-gray-100">
              About This Project
            </h2>
            <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
              This interactive timeline chronicles the remarkable evolution of Google Search from
              its humble beginnings in 1996 to its current state as the world's most advanced
              information retrieval system.
            </p>
          </div>
        </FadeIn>

        <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
          <FadeIn delay={0.2}>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                29 Years
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Of continuous innovation and improvement
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-600">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                Major Milestones
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Key moments that shaped search technology
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.6}>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-600">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                Interactive
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Explore with scroll-driven animations
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
