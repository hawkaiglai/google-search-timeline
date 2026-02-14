import { useEffect, useRef } from 'react';
import { useScrollStore } from '@/store/scrollStore';

export function use3DScroll() {
  const progressRef = useRef(0);
  
  useEffect(() => {
    const unsubscribe = useScrollStore.subscribe(
      (state) => state.progress,
      (progress) => {
        progressRef.current = progress;
      }
    );
    
    return unsubscribe;
  }, []);

  return progressRef;
}
