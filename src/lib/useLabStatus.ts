'use client';

import { useEffect, useState } from 'react';
import { adLab } from '@/data/portfolio';

export type PhaseStatus = 'done' | 'next' | 'planned' | 'stretch';

export interface LabPhase {
  id: number;
  title: string;
  status: PhaseStatus;
  track: 'build-out' | 'stretch';
  path: string;
}

export interface LabStatus {
  generatedAt: string;
  guideBaseUrl: string;
  summary: {
    total: number;
    buildOutTotal: number;
    buildOutDone: number;
    done: number;
    next: number;
    planned: number;
    stretch: number;
  };
  phases: LabPhase[];
}

export interface UseLabStatus {
  data: LabStatus | null;
  failed: boolean;
}

/**
 * Fetches the live AD lab status once from adLab.statusUrl (an absolute URL,
 * so no basePath prefixing is needed). Both the prominent top-of-page strip
 * and the detailed ADLabProgress section call this hook. Each call still issues
 * its own fetch, but they hit the same URL, so the browser HTTP cache serves the
 * second request from cache rather than re-downloading. Returns null data while
 * loading and a failed flag on any network or non-OK response.
 */
export function useLabStatus(): UseLabStatus {
  const [data, setData] = useState<LabStatus | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(adLab.statusUrl)
      .then((r) => (r.ok ? (r.json() as Promise<LabStatus>) : Promise.reject(new Error('fetch failed'))))
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, failed };
}
