'use client';

import { useEffect, useRef, useState } from 'react';
import { publicAsset } from '@/lib/paths';

export function LogBackground() {
  const [log, setLog] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(publicAsset('logs/system.log'))
      .then((r) => (r.ok ? r.text() : ''))
      .then((text) => {
        if (!cancelled) setLog(text);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!log) return;
    const node = containerRef.current;
    const hero = document.getElementById('top');
    if (!node || !hero) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        node.style.opacity = entry.isIntersecting ? '0.07' : '0';
      },
      { threshold: 0 }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, [log]);

  if (!log) return null;

  return (
    <div ref={containerRef} aria-hidden="true" className="log-background">
      <pre className="log-background-stream">
        {log}
        {'\n'}
        {log}
      </pre>
    </div>
  );
}
