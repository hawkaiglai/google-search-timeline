'use client';

import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/utils/dateHelpers';
import { CategoryBadge } from '@/components/ui';
import { disableScroll, enableScroll } from '@/lib/utils/scrollHelpers';
import type { Milestone } from '@/types';

interface MilestoneModalProps {
  milestone: Milestone | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MilestoneModal({ milestone, isOpen, onClose }: MilestoneModalProps) {
  useEffect(() => {
    if (isOpen) {
      disableScroll();
    } else {
      enableScroll();
    }

    return () => {
      enableScroll();
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !milestone) return null;

  const { title, description, longDescription, year, month, day, category, impact, images, sources, tags } = milestone;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white shadow-2xl dark:bg-gray-800 m-4">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-lg bg-white/90 p-2 text-gray-600 hover:bg-gray-100 dark:bg-gray-800/90 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {images && images.length > 0 && (
          <div className="aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
            <img
              src={images[0].url}
              alt={images[0].alt}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="p-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {formatDate(year, month, day)}
            </span>
            <CategoryBadge category={category} />
          </div>

          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
            {title}
          </h2>

          <p className="mb-4 text-gray-700 dark:text-gray-300">
            {longDescription || description}
          </p>

          {tags && tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {tags.map(tag => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {sources && sources.length > 0 && (
            <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-700">
              <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
                Sources
              </h3>
              <ul className="space-y-2">
                {sources.map((source, index) => (
                  <li key={index}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                    >
                      {source.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
