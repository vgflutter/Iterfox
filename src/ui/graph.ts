import type { Edge as FlowEdge, Node as FlowNode } from '@xyflow/react';
import type { RunState, TaskNode } from '../core/model.js';

export interface TrailData extends Record<string, unknown> {
  title: string;
  subtitle: string;
  status: string;
  kind: string;
  role: string;
  attempt: number;
  criterionId: string;
  contractVersion: number;
  node?: TaskNode;
}
export function graphFor(
  state: RunState,
  criterionId = 'all',
  grouped = false,
): { nodes: FlowNode<TrailData>[]; edges: FlowEdge[] } {
  const criteria = state.contract.criteria.filter(
    (c) => criterionId === 'all' || c.id === criterionId,
  );
  const lane = new Map(criteria.map((c, i) => [c.id, i]));
  const counts = new Map<string, number>();
  const included = state.nodes.filter(
    (n) =>
      lane.has(n.criterionId) &&
      (!grouped ||
        n.kind !== 'verification' ||
        n.status === 'VERIFYING' ||
        n.id ===
          [...state.nodes]
            .reverse()
            .find((t) => t.kind === 'verification' && t.criterionId === n.criterionId)?.id),
  );
  const nodes: FlowNode<TrailData>[] = included.map((n) => {
    const row = counts.get(n.criterionId) ?? 0;
    counts.set(n.criterionId, row + 1);
    return {
      id: n.id,
      type: 'trail',
      position: { x: lane.get(n.criterionId)! * 326, y: row * 139 },
      data: {
        title: n.title,
        subtitle: n.reason,
        kind: n.kind,
        role: n.role,
        status: n.status,
        attempt: n.attempt,
        criterionId: n.criterionId,
        contractVersion: state.contractVersion,
        node: n,
      },
    };
  });
  const bottom = Math.max(...counts.values(), 1) * 139 + 35;
  for (const c of criteria) {
    const status = state.criteria.find((a) => a.id === c.id)!;
    nodes.push({
      id: `acceptance-${c.id}`,
      type: 'trail',
      position: { x: lane.get(c.id)! * 326, y: bottom },
      data: {
        title: c.title,
        subtitle: `Acceptance contract v${state.contractVersion}`,
        kind: 'acceptance',
        role: 'acceptance',
        status: status.status,
        attempt: 0,
        criterionId: c.id,
        contractVersion: state.contractVersion,
      },
    });
  }
  const visible = new Set(nodes.map((n) => n.id));
  const edges: FlowEdge[] = state.edges
    .filter((e) => visible.has(e.source) && visible.has(e.target))
    .map((e) => ({
      id: e.id,
      source: e.source,
      target: e.target,
      type: 'trail',
      data: { kind: e.kind },
      style: { stroke: e.kind === 'repair' ? '#c98d69' : '#485045' },
    }));
  for (const c of criteria) {
    const a = state.criteria.find((a) => a.id === c.id)!;
    const proof = state.evidence.find((e) => e.id === a.evidenceId);
    if (proof && visible.has(proof.nodeId))
      edges.push({
        id: `supports-${c.id}`,
        source: proof.nodeId,
        target: `acceptance-${c.id}`,
        type: 'trail',
        data: { kind: 'supports' },
        style: { stroke: a.status === 'PASSED' ? '#a8bf91' : '#685f40' },
      });
  }
  return { nodes, edges };
}
