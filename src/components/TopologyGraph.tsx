'use client';

import { useLabStatus, type LinuxLabStatus } from '@/lib/useLabStatus';
import { linuxLab, topologySubnets, topologyNodes, type TopoNode, type TopoNodeType } from '@/data/portfolio';

const W = 940;
const H = 580;
const cx = W / 2;

// Daylight Ops light palette for the diagram. Subnet colors are overridden here
// (the data carries the old dark-theme cyan/green) so the light topology reads
// as slate-blue + green on white rather than neon on dark.
const SUBNET_COLOR: Record<string, string> = { lan: '#2c5bd6', lab200: '#1e8a5a' };
const C = {
  surface: '#ffffff',
  surface2: '#f7f9fb',
  border: '#dbe1e9',
  ink: '#161d27',
  inkDim: '#586577',
  inkFaint: '#8a96a6',
  accent: '#2c5bd6',
  accentWash: '#eaf0fc',
  done: '#1e8a5a',
};
const subColor = (id: string): string => SUBNET_COLOR[id] ?? C.accent;

const chain = {
  internet: { y: 34 },
  router: { y: 78, w: 130, h: 34 },
  nat: { y: 124, w: 150, h: 34 },
  pfsense: { y: 176, w: 230, h: 70 },
};
const pfBottom = chain.pfsense.y + chain.pfsense.h;

const boxTop = 312;
const boxH = 240;
// Two subnets fill the canvas: LAN (DC01, WS01, ubuntu) on the left,
// LAB200 (rocky) on the right. LAN is wider because it holds more hosts.
const boxes: Record<string, { x: number; w: number }> = {
  lan: { x: 24, w: 560 },
  lab200: { x: 604, w: 312 },
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
        color: subColor(sn.id),
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
          <circle cx={3} cy={2.5} r={1} fill={C.surface} />
          <circle cx={3} cy={9.5} r={1} fill={C.surface} />
        </g>
      );
    case 'workstation':
      return (
        <g>
          <rect x={0} y={0} width={14} height={9} rx={1} {...common} />
          <path d="M5 11h4M7 9v2" {...common} />
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
      aria-label="Homelab network topology: internet through pfSense to the LAN and LAB200 subnets, with Linux servers marked complete as their lab finishes"
    >
      <defs>
        <marker id="topo-arrow" viewBox="0 -5 10 10" refX="8" refY="0" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,-5L10,0L0,5" fill={C.inkFaint} />
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
        const col = subColor(sn.id);
        return (
          <g key={sn.id}>
            <rect x={b.x} y={boxTop} width={b.w} height={boxH} rx={14} fill={`${col}0d`} stroke={col} strokeOpacity={0.35} />
            <text x={b.x + 16} y={boxTop + 26} fill={col} fontSize={11} fontFamily="var(--font-plex-mono, ui-monospace)" letterSpacing={0.5}>
              {sn.label}
            </text>
          </g>
        );
      })}

      {/* pfSense -> subnet connectors with animated flow */}
      {topologySubnets.map((sn) => (
        <line key={`edge-${sn.id}`} className="topo-flow" x1={cx} y1={pfBottom} x2={boxCenter(sn.id)} y2={boxTop} stroke={subColor(sn.id)} strokeOpacity={0.55} strokeWidth={1.5} />
      ))}

      {/* Top chain */}
      <circle cx={cx} cy={chain.internet.y} r={20} fill={C.surface} stroke={C.border} />
      <text x={cx} y={chain.internet.y + 4} textAnchor="middle" fill={C.inkDim} fontSize={10} fontFamily="ui-monospace">internet</text>

      <rect x={cx - chain.router.w / 2} y={chain.router.y} width={chain.router.w} height={chain.router.h} rx={6} fill={C.surface} stroke={C.border} />
      <text x={cx} y={chain.router.y + 22} textAnchor="middle" fill={C.inkDim} fontSize={10.5} fontFamily="ui-monospace">home router</text>

      <rect x={cx - chain.nat.w / 2} y={chain.nat.y} width={chain.nat.w} height={chain.nat.h} rx={6} fill={C.surface} stroke={C.border} />
      <text x={cx} y={chain.nat.y + 22} textAnchor="middle" fill={C.inkDim} fontSize={10.5} fontFamily="ui-monospace">VMnet8 (NAT)</text>

      <rect x={cx - chain.pfsense.w / 2} y={chain.pfsense.y} width={chain.pfsense.w} height={chain.pfsense.h} rx={8} fill={C.accentWash} stroke={C.accent} strokeWidth={1.5} />
      <text x={cx} y={chain.pfsense.y + 26} textAnchor="middle" fill={C.accent} fontSize={12.5} fontFamily="ui-monospace" fontWeight={600}>pfSense CE 2.7.x</text>
      <text x={cx} y={chain.pfsense.y + 44} textAnchor="middle" fill={C.inkDim} fontSize={10} fontFamily="ui-monospace">LAN .100.1 · LAB200 .200.1</text>

      <line x1={cx} y1={chain.internet.y + 20} x2={cx} y2={chain.router.y} stroke={C.inkFaint} markerEnd="url(#topo-arrow)" />
      <line x1={cx} y1={chain.router.y + chain.router.h} x2={cx} y2={chain.nat.y} stroke={C.inkFaint} markerEnd="url(#topo-arrow)" />
      <line x1={cx} y1={chain.nat.y + chain.nat.h} x2={cx} y2={chain.pfsense.y} stroke={C.inkFaint} markerEnd="url(#topo-arrow)" />

      {/* Node cards */}
      {placed.map((n) => {
        const state = stateFor(n);
        const isDone = state === 'done';
        const isProgress = state === 'progress';
        const stroke = isDone ? C.done : n.color;
        const stateLabel =
          state === 'done' ? 'complete' : state === 'progress' ? 'in progress' : state === 'pending' ? 'pending' : null;
        return (
          <g key={n.id} transform={`translate(${n.x}, ${n.y})`} style={{ transition: 'all 0.3s ease' }}>
            <rect
              width={CARD_W}
              height={CARD_H}
              rx={7}
              fill={C.surface}
              stroke={stroke}
              strokeOpacity={isDone ? 1 : isProgress ? 0.9 : 0.5}
              strokeWidth={isDone ? 2 : 1}
              strokeDasharray={isProgress ? '4 3' : undefined}
              style={isDone ? { filter: 'drop-shadow(0 2px 6px rgba(30,138,90,0.28))' } : { filter: 'drop-shadow(0 1px 2px rgba(20,40,80,0.06))' }}
            />
            <g transform="translate(12, 13)">
              <Icon type={n.type} color={n.color} />
            </g>
            <text x={CARD_W - 12} y={22} textAnchor="end" fill={C.ink} fontSize={11.5} fontFamily="ui-monospace">{n.label}</text>
            <text x={CARD_W - 12} y={40} textAnchor="end" fill={n.color} fontSize={11} fontFamily="ui-monospace">{n.ip}</text>
            {n.role && (
              <text x={CARD_W - 12} y={58} textAnchor="end" fill={C.inkFaint} fontSize={9.5} fontFamily="ui-monospace">{n.role}</text>
            )}
            {stateLabel && (
              <text x={12} y={CARD_H - 10} fill={isDone ? C.done : isProgress ? C.accent : C.inkFaint} fontSize={9} fontFamily="ui-monospace">
                {stateLabel}
              </text>
            )}
            {n.established && (
              <text x={CARD_W - 12} y={CARD_H - 10} textAnchor="end" fill={C.inkFaint} fontSize={8.5} fontFamily="ui-monospace">established</text>
            )}
            {isDone && (
              <g transform={`translate(${CARD_W - 16}, ${CARD_H - 16})`}>
                <circle r={9} fill={C.done} />
                <path d="M-4 0l3 3l5 -6" fill="none" stroke={C.surface} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}
