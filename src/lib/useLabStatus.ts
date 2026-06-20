'use client';

import { useEffect, useState } from 'react';
import { adLab } from '@/data/portfolio';

export type PhaseStatus = 'done' | 'next' | 'planned' | 'stretch';

// ---- AD lab guide shape (one status per phase file) ----------------------
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

// ---- Linux lab guide shape (labs, each with several phases) ---------------
export interface LinuxPhase {
  id: string;
  labId: string;
  labTitle: string;
  title: string;
  status: PhaseStatus;
  anchor: string;
}

export interface LinuxLabEntry {
  id: string;
  title: string;
  order: number;
  path: string;
  status: PhaseStatus;
  pct: number;
  phasesTotal: number;
  phasesDone: number;
}

export interface LinuxLabStatus {
  generatedAt: string;
  guideBaseUrl: string;
  summary: {
    totalLabs: number;
    labsComplete: number;
    totalPhases: number;
    phasesDone: number;
    phasesNext: number;
    phasesPlanned: number;
    overallPct: number;
  };
  labs: LinuxLabEntry[];
  phases: LinuxPhase[];
}

export interface UseRemoteJson<T> {
  data: T | null;
  failed: boolean;
}

/**
 * Fetch a JSON status document once from an absolute URL (so no basePath
 * prefixing is needed). One shared hook for both labs: the AD lab guide and the
 * Linux lab guide each publish a lab-status.json with their site, and the
 * portfolio reads whichever URL it is given. Multiple callers of the same URL
 * are de-duped by the browser HTTP cache. Returns null while loading and a
 * failed flag on any network or non-OK response.
 *
 * Defaults to the AD lab guide so existing call sites (`useLabStatus()`) keep
 * working unchanged; pass a URL and type argument for the Linux lab guide.
 */
export function useLabStatus<T = LabStatus>(url: string = adLab.statusUrl): UseRemoteJson<T> {
  const [data, setData] = useState<T | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(url)
      .then((r) => (r.ok ? (r.json() as Promise<T>) : Promise.reject(new Error('fetch failed'))))
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [url]);

  return { data, failed };
}
