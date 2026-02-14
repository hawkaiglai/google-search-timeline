'use client';

import { useState, useEffect } from 'react';

interface PreloadImageOptions {
  priority?: number;
  onLoad?: (src: string) => void;
  onError?: (src: string, error: Error) => void;
}

interface PreloadStatus {
  loaded: string[];
  failed: string[];
  pending: string[];
  isLoading: boolean;
  progress: number;
}

export function usePreloadImages(
  sources: string[],
  options: PreloadImageOptions = {}
): PreloadStatus {
  const { onLoad, onError } = options;
  
  const [status, setStatus] = useState<PreloadStatus>({
    loaded: [],
    failed: [],
    pending: sources,
    isLoading: true,
    progress: 0,
  });

  useEffect(() => {
    if (sources.length === 0) {
      setStatus({
        loaded: [],
        failed: [],
        pending: [],
        isLoading: false,
        progress: 100,
      });
      return;
    }

    let cancelled = false;
    const loadedImages: string[] = [];
    const failedImages: string[] = [];

    const preloadImage = (src: string): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        
        img.onload = () => {
          if (!cancelled) {
            loadedImages.push(src);
            if (onLoad) onLoad(src);
          }
          resolve();
        };
        
        img.onerror = () => {
          if (!cancelled) {
            failedImages.push(src);
            if (onError) onError(src, new Error(`Failed to load image: ${src}`));
          }
          resolve();
        };
        
        img.src = src;
      });
    };

    const preloadAll = async () => {
      await Promise.all(sources.map(preloadImage));
      
      if (!cancelled) {
        setStatus({
          loaded: loadedImages,
          failed: failedImages,
          pending: [],
          isLoading: false,
          progress: 100,
        });
      }
    };

    preloadAll();

    return () => {
      cancelled = true;
    };
  }, [sources, onLoad, onError]);

  return status;
}
