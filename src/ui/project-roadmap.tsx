import React, { useEffect, useId, useRef, useState } from 'react';
import type { ProjectMilestone } from '../shared/projects.js';

type RoadmapBox = Pick<DOMRectReadOnly, 'left' | 'top' | 'right' | 'bottom'>;
type RoadmapCard = RoadmapBox & { id: string; stage: number };
type Point = { x: number; y: number };

/** Route through measured row gaps, using the reserved gutter when cards intervene. */
export function routeRoadmapConnection(
  source: RoadmapCard,
  target: RoadmapCard,
  cards: readonly RoadmapCard[],
  stages: readonly RoadmapBox[],
  width: number,
): string {
  const sourcePeers = cards.filter((card) => card.stage === source.stage);
  const targetPeers = cards.filter((card) => card.stage === target.stage);
  const rowBottom = Math.max(
    ...sourcePeers
      .filter((card) => card.top < source.bottom && card.bottom > source.top)
      .map((card) => card.bottom),
  );
  const nextTop = Math.min(
    stages[source.stage + 1].top,
    ...sourcePeers.filter((card) => card.top >= rowBottom).map((card) => card.top),
  );
  const rowTop = Math.min(
    ...targetPeers
      .filter((card) => card.top < target.bottom && card.bottom > target.top)
      .map((card) => card.top),
  );
  const previousBottom = Math.max(
    stages[target.stage - 1].bottom,
    ...targetPeers.filter((card) => card.bottom <= rowTop).map((card) => card.bottom),
  );
  const start = { x: (source.left + source.right) / 2, y: source.bottom };
  const end = { x: (target.left + target.right) / 2, y: target.top - 5 };
  const exitY = (rowBottom + nextTop) / 2;
  const entryY = (previousBottom + rowTop) / 2;
  const compact = [start, { x: start.x, y: exitY }, { x: end.x, y: exitY }, end];
  // Include stroke clearance. Checking every other card also covers skipped
  // stages and earlier/later wrapped siblings of either endpoint.
  const blocked = cards.some(
    (card) =>
      card.id !== source.id &&
      card.id !== target.id &&
      compact.slice(1).some((point, index) => {
        const previous = compact[index];
        return (
          Math.max(previous.x, point.x) >= card.left - 2 &&
          Math.min(previous.x, point.x) <= card.right + 2 &&
          Math.max(previous.y, point.y) >= card.top - 2 &&
          Math.min(previous.y, point.y) <= card.bottom + 2
        );
      }),
  );
  const gutter = (Math.max(...stages.map((stage) => stage.right)) + width) / 2;
  const points: Point[] = blocked
    ? [
        start,
        { x: start.x, y: exitY },
        { x: gutter, y: exitY },
        { x: gutter, y: entryY },
        { x: end.x, y: entryY },
        end,
      ]
    : compact;
  return points.map((point, index) => `${index ? 'L' : 'M'} ${point.x} ${point.y}`).join(' ');
}

/** A read-only DAG. Native buttons and the text links remain usable without SVG. */
export function ProjectRoadmap({
  milestones,
  selectedId,
  disabled,
  select,
}: {
  milestones: ProjectMilestone[];
  selectedId?: string;
  disabled: boolean;
  select: (id: string) => void;
}) {
  const diagram = useRef<HTMLDivElement>(null);
  const marker = useId().replace(/:/g, '');
  const [connections, setConnections] = useState<string[]>([]);
  const byId = new Map(milestones.map((item) => [item.id, item]));
  const ranks = new Map<string, number>();
  function rank(id: string): number {
    if (ranks.has(id)) return ranks.get(id)!;
    const dependencies = byId.get(id)?.dependsOn ?? [];
    const level = dependencies.length ? 1 + Math.max(...dependencies.map(rank)) : 0;
    ranks.set(id, level);
    return level;
  }
  const levels: ProjectMilestone[][] = [];
  for (const milestone of milestones) (levels[rank(milestone.id)] ??= []).push(milestone);

  useEffect(() => {
    const root = diagram.current;
    if (!root) return;
    function measure() {
      if (!root) return;
      const bounds = root.getBoundingClientRect();
      // Projects stays mounted while another view is open. Measure again when
      // ResizeObserver sees it become visible instead of retaining zero geometry.
      if (!bounds.width) return;
      const relative = (rect: DOMRect): RoadmapBox => ({
        left: rect.left - bounds.left,
        right: rect.right - bounds.left,
        top: rect.top - bounds.top,
        bottom: rect.bottom - bounds.top,
      });
      const stageElements = [...root.querySelectorAll<HTMLOListElement>('.project-graph')];
      const stages = stageElements.map((stage) => relative(stage.getBoundingClientRect()));
      const cards = stageElements.flatMap((stage, index) =>
        [...stage.querySelectorAll<HTMLButtonElement>('[data-milestone-id]')].map((button) => ({
          ...relative(button.getBoundingClientRect()),
          id: button.dataset.milestoneId!,
          stage: index,
        })),
      );
      const buttons = new Map(cards.map((card) => [card.id, card]));
      setConnections(
        milestones.flatMap((milestone) => {
          const target = buttons.get(milestone.id);
          if (!target) return [];
          return milestone.dependsOn.flatMap((id) => {
            const source = buttons.get(id);
            if (!source) return [];
            return [routeRoadmapConnection(source, target, cards, stages, bounds.width)];
          });
        }),
      );
    }
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    root.querySelectorAll('.project-graph').forEach((stage) => observer.observe(stage));
    root.querySelectorAll('[data-milestone-id]').forEach((button) => observer.observe(button));
    measure();
    return () => observer.disconnect();
  }, [milestones]);

  return (
    <>
      <div ref={diagram} className="project-roadmap">
        <svg className="project-roadmap-connections" aria-hidden="true">
          <defs>
            <marker
              id={marker}
              markerUnits="userSpaceOnUse"
              markerWidth="8"
              markerHeight="8"
              refX="7"
              refY="4"
              orient="auto"
            >
              <path d="M 0 0 L 8 4 L 0 8 z" fill="currentColor" />
            </marker>
          </defs>
          {connections.map((path, index) => (
            <path key={index} d={path} markerEnd={`url(#${marker})`} />
          ))}
        </svg>
        {levels.map((level, index) => (
          <ol className="project-graph" key={index} aria-label={`Roadmap stage ${index + 1}`}>
            {level.map((item) => (
              <li key={item.id}>
                <button
                  className={`project-milestone ${item.status}`}
                  data-milestone-id={item.id}
                  disabled={disabled}
                  aria-pressed={item.id === selectedId}
                  onClick={() => select(item.id)}
                >
                  <span className="project-status">
                    {item.status === 'reviewed'
                      ? 'Operator reviewed'
                      : item.status === 'active'
                        ? 'Active milestone'
                        : 'Planned'}
                  </span>
                  <strong>{item.title}</strong>
                  <span className="project-dependencies">
                    {item.dependsOn.length
                      ? `Requires: ${item.dependsOn.map((id) => byId.get(id)?.title ?? id).join(', ')}`
                      : 'No prerequisites'}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        ))}
      </div>
      {milestones.some((item) => item.dependsOn.length > 0) && (
        <details className="project-graph-links">
          <summary>Dependency links in text</summary>
          <p className="muted">Prerequisite → dependent milestone</p>
          <ul aria-label="Milestone dependency links">
            {milestones.flatMap((item) =>
              item.dependsOn.map((id) => (
                <li key={`${id}:${item.id}`}>
                  <button
                    className="project-text-button"
                    disabled={disabled}
                    onClick={() => select(id)}
                  >
                    {byId.get(id)?.title ?? id}
                  </button>
                  <span aria-label="must be reviewed before"> → </span>
                  <button
                    className="project-text-button"
                    disabled={disabled}
                    onClick={() => select(item.id)}
                  >
                    {item.title}
                  </button>
                </li>
              )),
            )}
          </ul>
        </details>
      )}
    </>
  );
}
