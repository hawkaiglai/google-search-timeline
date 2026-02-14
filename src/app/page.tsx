'use client';

import type { Milestone } from '@/types';
import React, { useEffect } from 'react';
import { Header, Footer } from '@/components/layout';
import { HeroSection, TimelineSection, AboutSection } from '@/components/sections';
import { useTimelineStore } from '@/store/timelineStore';
import { LoadingSpinner } from '@/components/ui';
import timelineData from '@/data/timeline-content.json';

export default function HomePage() {
  const { setMilestones, isLoading, setLoading } = useTimelineStore();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        setMilestones(timelineData.milestones as Milestone[]);
      } catch (error) {
        console.error('Failed to load timeline data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [setMilestones, setLoading]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner size="lg" text="Loading timeline..." />
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <TimelineSection />
      <AboutSection />
      <Footer />
    </main>
  );
}
