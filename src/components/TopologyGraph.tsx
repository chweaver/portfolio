'use client';

import { useLabStatus, type LinuxLabStatus } from '@/lib/useLabStatus';
import { linuxLab, topologySubnets, topologyNodes, type TopoNode, type TopoNodeType } from '@/data/portfolio';

const W = 940;
const H = 580;
const cx = W / 2;

const chain = {
  internet: { y: 34 },
  router: { y: 78, w: 130, h: 34 },
  nat: { y: 124, w: 150, h: 34 },
  pfsense: { y: 176, w: 230, h: 70 },
};
const pfBottom = chain.pfsense.y + chain.pfsense.h;

const boxTop = 312;
const boxH = 240;
const boxes: Record<string, { x: number; w: number }> = {
  lan: { x: 24, w: 470 },
  lab200: { x: 514, w: 196 },
  iot: { x: 730, w: 186 },
};

const CARD_W = 138;
const CARD_H = 84;
const GAP = 14;

type Placed = TopoNode & { x: number; y: number; color: string };

function layout(): Placed[] {
  const placed: Placed[] = [];
  for (const sn of topologySubnets) {
    const box = boxes[sn.id];
    if (!box) continue;
    // pfSense is drawn once as the central router box, so skip it as a card.
    const members = topologyNodes.filter((n) => n.subnet === sn.id && n.type !== 'firewall');
    const perRow = Math.max(1, Math.floor((box.w + GAP) / (CARD_W + GAP)));
    members.forEach((n, i) => {
      const rowCount = Math.min(perRow, members.length);
      const rowTotal = rowCount * CARD_W + (rowCount - 1) * GAP;
      const rowStart = box.x + (box.w - rowTotal) / 2;
      placed.push({
        ...n,
        color: sn.color,
        x: rowStart + (i % perRow) * (CARD_W + GAP),
        y: boxTop + 50 + Math.floor(i / perRow) * (CARD_H + GAP),
      });
    });
  }
  return placed;
}

function boxCenter(id: string): number {
  const b = boxes[id];
  return b.x + b.w / 2;
}

function Icon({ type, color }: { type: TopoNodeType; color: string }) {
  const common = { fill: 'none', stroke: color, strokeWidth: 1.4 } as const;
  switch (type) {
    case 'firewall':
      return <path d="M0 1h14v3H0z M0 5h6v3H0z M8 5h6v3H8z M0 9h14v3H0z" fill={color} opacity={0.9} />;
    case 'server':
      return (
        <g>
          <rect x={0} y={0} width={14} height={5} rx={1} fill={color} opacity={0.9} />
          <rect x={0} y={7} width={14} height={5} rx={1} fill={color} opacity={0.55} />
          <circle cx={3} cy={2.5} r={1} fill="#0a0e14" />
          <circle cx={3} cy={9.5} r={1} fill="#0a0e14" />
        </g>
      );
    case 'workstation':
      return (
        <g>
          <rect x={0} y={0} width={14} height={9} rx={1} {...common} />
          <path d="M5 11h4M7 9v2" {...common} />
        </g>
      );
    case 'iot':
      return (
        <g>
          <circle cx={7} cy={9} r={2} fill={color} />
          <path d="M3 6a6 6 0 0 1 8 0 M5 8a3 3 0 0 1 4 0" fill="none" stroke={color} strokeWidth={1.3} />
        </g>
      );
  }
}

type NodeState = 'done' | 'progress' | 'pending' | 'established' | 'idle';

export function TopologyGraph() {
  const { data } = useLabStatus<LinuxLabStatus>(linuxLab.statusUrl);
  const doneSet = new Set((data?.labs ?? []).filter((l) => l.status === 'done').map((l) => l.id));
  const liveSet = new Set((data?.labs ?? []).filter((l) => l.status === 'next').map((l) => l.id));

  function stateFor(n: TopoNode): NodeState {
    const labs = n.labs ?? [];
    if (!labs.length) return n.established ? 'established' : 'idle';
    if (labs.every((l) => doneSet.has(l))) return 'done';
    if (labs.some((l) => doneSet.has(l) || liveSet.has(l))) return 'progress';
    return 'pending';
  }

  const placed = layout();

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto"
      role="img"
      aria-label="Homelab network topology: internet through pfSense to the LAN, LAB200, and IoT subnets, with Linux servers marked complete as their lab finishes"
    >
      <defs>
        <marker id="topo-arrow" viewBox="0 -5 10 10" refX="8" refY="0" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,-5L10,0L0,5" fill="#475569" />
        </marker>
        <style>{`
          .topo-flow { stroke-dasharray: 5 6; animation: topoflow 1.4s linear infinite; }
          @keyframes topoflow { to { stroke-dashoffset: -22; } }
          @media (prefers-reduced-motion: reduce) { .topo-flow { animation: none; } }
        `}</style>
      </defs>

      {/* Subnet group boxes */}
      {topologySubnets.map((sn) => {
        const b = boxes[sn.id];
        return (
          <g key={sn.id}>
            <rect x={b.x} y={boxTop} width={b.w} height={boxH} rx={14} fill={`${sn.color}0d`} stroke={sn.color} strokeOpacity={0.3} />
            <text x={b.x + 16} y={boxTop + 26} fill={sn.color} fontSize={11} fontFamily="var(--font-jetbrains, ui-monospace)" letterSpacing={0.5}>
              {sn.label}
            </text>
          </g>
        );
      })}

      {/* pfSense -> subnet connectors with animated flow */}
      {topologySubnets.map((sn) => (
        <line key={`edge-${sn.id}`} className="topo-flow" x1={cx} y1={pfBottom} x2={boxCenter(sn.id)} y2={boxTop} stroke={sn.color} strokeOpacity={0.5} strokeWidth={1.5} />
      ))}

      {/* Top chain */}
      <circle cx={cx} cy={chain.internet.y} r={20} fill="#0f141b" stroke="#1f2937" />
      <text x={cx} y={chain.internet.y + 4} textAnchor="middle" fill="#9ca3af" fontSize={10} fontFamily="ui-monospace">internet</text>

      <rect x={cx - chain.router.w / 2} y={chain.router.y} width={chain.router.w} height={chain.router.h} rx={6} fill="#0f141b" stroke="#1f2937" />
      <text x={cx} y={chain.router.y + 22} textAnchor="middle" fill="#9ca3af" fontSize={10.5} fontFamily="ui-monospace">home router</text>

      <rect x={cx - chain.nat.w / 2} y={chain.nat.y} width={chain.nat.w} height={chain.nat.h} rx={6} fill="#0f141b" stroke="#1f2937" />
      <text x={cx} y={chain.nat.y + 22} textAnchor="middle" fill="#9ca3af" fontSize={10.5} fontFamily="ui-monospace">VMnet8 (NAT)</text>

      <rect x={cx - chain.pfsense.w / 2} y={chain.pfsense.y} width={chain.pfsense.w} height={chain.pfsense.h} rx={8} fill="#0f141b" stroke="#22d3ee" strokeWidth={1.5} />
      <text x={cx} y={chain.pfsense.y + 26} textAnchor="middle" fill="#22d3ee" fontSize={12.5} fontFamily="ui-monospace" fontWeight={600}>pfSense CE 2.7.x</text>
      <text x={cx} y={chain.pfsense.y + 44} textAnchor="middle" fill="#9ca3af" fontSize={10} fontFamily="ui-monospace">LAN .100.1 · LAB200 .200.1</text>

      <line x1={cx} y1={chain.internet.y + 20} x2={cx} y2={chain.router.y} stroke="#475569" markerEnd="url(#topo-arrow)" />
      <line x1={cx} y1={chain.router.y + chain.router.h} x2={cx} y2={chain.nat.y} stroke="#475569" markerEnd="url(#topo-arrow)" />
      <line x1={cx} y1={chain.nat.y + chain.nat.h} x2={cx} y2={chain.pfsense.y} stroke="#475569" markerEnd="url(#topo-arrow)" />

      {/* Node cards */}
      {placed.map((n) => {
        const state = stateFor(n);
        const isDone = state === 'done';
        const isProgress = state === 'progress';
        const stroke = isDone ? '#10b981' : n.color;
        const stateLabel =
          state === 'done' ? 'complete' : state === 'progress' ? 'in progress' : state === 'pending' ? 'pending' : null;
        return (
          <g key={n.id} transform={`translate(${n.x}, ${n.y})`} style={{ transition: 'all 0.3s ease' }}>
            <rect
              width={CARD_W}
              height={CARD_H}
              rx={7}
              fill="#141b24"
              stroke={stroke}
              strokeOpacity={isDone ? 1 : isProgress ? 0.9 : 0.4}
              strokeWidth={isDone ? 2 : 1}
              strokeDasharray={isProgress ? '4 3' : undefined}
              style={isDone ? { filter: 'drop-shadow(0 0 6px rgba(16,185,129,0.45))' } : undefined}
            />
            <g transform="translate(12, 13)">
              <Icon type={n.type} color={n.color} />
            </g>
            <text x={CARD_W - 12} y={22} textAnchor="end" fill="#e5e7eb" fontSize={11.5} fontFamily="ui-monospace">{n.label}</text>
            <text x={CARD_W - 12} y={40} textAnchor="end" fill={n.color} fontSize={11} fontFamily="ui-monospace">{n.ip}</text>
            {n.role && (
              <text x={CARD_W - 12} y={58} textAnchor="end" fill="#6b7280" fontSize={9.5} fontFamily="ui-monospace">{n.role}</text>
            )}
            {stateLabel && (
              <text x={12} y={CARD_H - 10} fill={isDone ? '#10b981' : isProgress ? '#22d3ee' : '#6b7280'} fontSize={9} fontFamily="ui-monospace">
                {stateLabel}
              </text>
            )}
            {n.established && (
              <text x={CARD_W - 12} y={CARD_H - 10} textAnchor="end" fill="#6b7280" fontSize={8.5} fontFamily="ui-monospace">established</text>
            )}
            {isDone && (
              <g transform={`translate(${CARD_W - 16}, ${CARD_H - 16})`}>
                <circle r={9} fill="#10b981" />
                <path d="M-4 0l3 3l5 -6" fill="none" stroke="#0a0e14" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}
