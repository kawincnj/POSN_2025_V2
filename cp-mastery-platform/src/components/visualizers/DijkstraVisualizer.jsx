import React, { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw } from 'lucide-react';

const NODES = [
  { id: 0, x: 80, y: 100, label: 'S' },
  { id: 1, x: 200, y: 50 },
  { id: 2, x: 200, y: 180 },
  { id: 3, x: 340, y: 50 },
  { id: 4, x: 340, y: 180 },
  { id: 5, x: 460, y: 120, label: 'T' },
];

const EDGES = [
  { u: 0, v: 1, w: 4 },
  { u: 0, v: 2, w: 2 },
  { u: 1, v: 2, w: 1 },
  { u: 1, v: 3, w: 5 },
  { u: 2, v: 4, w: 3 },
  { u: 3, v: 5, w: 2 },
  { u: 4, v: 3, w: 1 },
  { u: 4, v: 5, w: 6 },
];

const INF = 999;

const DijkstraVisualizer = () => {
  const [dist, setDist] = useState(Array(6).fill(INF));
  const [visited, setVisited] = useState(new Set());
  const [current, setCurrent] = useState(null);
  const [relaxedEdge, setRelaxedEdge] = useState(null);
  const [parent, setParent] = useState(Array(6).fill(-1));
  const [isRunning, setIsRunning] = useState(false);
  const [log, setLog] = useState([]);
  const runRef = useRef(false);

  useEffect(() => () => { runRef.current = false; }, []);

  const reset = () => {
    runRef.current = false;
    setDist(Array(6).fill(INF));
    setVisited(new Set());
    setCurrent(null);
    setRelaxedEdge(null);
    setParent(Array(6).fill(-1));
    setIsRunning(false);
    setLog([]);
  };

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  const run = async () => {
    if (isRunning) return;
    reset();
    await sleep(50);
    setIsRunning(true);
    runRef.current = true;

    const d = Array(6).fill(INF);
    const vis = new Set();
    const par = Array(6).fill(-1);
    d[0] = 0;
    setDist([...d]);
    const newLog = ['dist[S] = 0'];
    setLog([...newLog]);

    // Build adj list
    const adj = Array.from({ length: 6 }, () => []);
    for (const e of EDGES) {
      adj[e.u].push({ v: e.v, w: e.w });
      adj[e.v].push({ v: e.u, w: e.w });
    }

    for (let iter = 0; iter < 6; iter++) {
      if (!runRef.current) return;

      // Find unvisited node with min dist
      let u = -1;
      for (let i = 0; i < 6; i++)
        if (!vis.has(i) && (u === -1 || d[i] < d[u])) u = i;
      if (u === -1 || d[u] === INF) break;

      setCurrent(u);
      vis.add(u);
      setVisited(new Set(vis));
      const label = NODES[u].label || u;
      newLog.unshift(`Visit node ${label} (dist=${d[u]})`);
      setLog([...newLog]);
      await sleep(800);

      for (const { v, w } of adj[u]) {
        if (!runRef.current) return;
        if (vis.has(v)) continue;

        setRelaxedEdge({ u, v });
        await sleep(400);

        const vLabel = NODES[v].label || v;
        if (d[u] + w < d[v]) {
          d[v] = d[u] + w;
          par[v] = u;
          setDist([...d]);
          setParent([...par]);
          newLog.unshift(`Relax ${label}→${vLabel}: dist[${vLabel}] = ${d[v]}`);
        } else {
          newLog.unshift(`Edge ${label}→${vLabel}: no improvement (${d[u]+w} >= ${d[v]})`);
        }
        setLog([...newLog]);
        await sleep(400);
        setRelaxedEdge(null);
      }
    }

    setCurrent(null);
    if (runRef.current) {
      newLog.unshift(`Done! Shortest path to T = ${d[5]}`);
      setLog([...newLog]);
    }
    setIsRunning(false);
    runRef.current = false;
  };

  // Get shortest path edges
  const pathEdges = new Set();
  {
    let v = 5;
    while (parent[v] !== -1) {
      const u = parent[v];
      pathEdges.add(`${Math.min(u,v)}-${Math.max(u,v)}`);
      v = u;
    }
  }

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-xl bg-card">
      <div className="flex items-center gap-2">
        <button onClick={reset} className="p-2 rounded-md hover:bg-accent"><RotateCcw className="w-5 h-5" /></button>
        <button onClick={run} disabled={isRunning}
          className="p-2 rounded-md hover:bg-accent disabled:opacity-50 text-green-500">
          <Play className="w-5 h-5" />
        </button>
        <span className="text-sm font-medium">Dijkstra's Algorithm</span>
      </div>

      <div className="relative h-[260px] w-full border rounded-lg bg-muted/10 overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 540 240">
          {/* Edges */}
          {EDGES.map((e, i) => {
            const n1 = NODES[e.u], n2 = NODES[e.v];
            const edgeKey = `${Math.min(e.u,e.v)}-${Math.max(e.u,e.v)}`;
            const isPath = pathEdges.has(edgeKey) && !isRunning;
            const isRelaxing = relaxedEdge &&
              ((relaxedEdge.u === e.u && relaxedEdge.v === e.v) || (relaxedEdge.u === e.v && relaxedEdge.v === e.u));
            const mx = (n1.x + n2.x) / 2, my = (n1.y + n2.y) / 2;
            return (
              <g key={i}>
                <line x1={n1.x} y1={n1.y} x2={n2.x} y2={n2.y}
                  strokeWidth={isPath ? 4 : isRelaxing ? 3 : 2}
                  className={`transition-all duration-300 ${
                    isPath ? 'stroke-green-500' : isRelaxing ? 'stroke-yellow-500' : 'stroke-current text-muted-foreground/30'
                  }`} />
                <rect x={mx - 10} y={my - 8} width={20} height={16} rx={4}
                  className="fill-background stroke-border" strokeWidth="1" />
                <text x={mx} y={my + 1} textAnchor="middle" dy=".3em"
                  className="text-[10px] font-bold fill-foreground">{e.w}</text>
              </g>
            );
          })}

          {/* Nodes */}
          {NODES.map((node) => {
            const isVisited = visited.has(node.id);
            const isCurrent = current === node.id;
            const d = dist[node.id];
            return (
              <g key={node.id}>
                <circle cx={node.x} cy={node.y} r="22"
                  className={`transition-all duration-500 ${
                    isCurrent ? 'fill-yellow-500 stroke-yellow-600' :
                    isVisited ? 'fill-green-500 stroke-green-600' :
                    'fill-card stroke-border'
                  }`} strokeWidth="2" />
                <text x={node.x} y={node.y - 3} textAnchor="middle"
                  className={`text-xs font-bold select-none ${
                    (isVisited || isCurrent) ? 'fill-white' : 'fill-foreground'
                  }`}>
                  {node.label || node.id}
                </text>
                <text x={node.x} y={node.y + 10} textAnchor="middle"
                  className={`text-[9px] font-mono select-none ${
                    (isVisited || isCurrent) ? 'fill-white/80' : 'fill-muted-foreground'
                  }`}>
                  {d === INF ? '∞' : d}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="bg-muted/20 rounded-lg p-3 max-h-28 overflow-y-auto">
        <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Log</p>
        {log.slice(0, 8).map((entry, i) => (
          <p key={i} className={`text-xs font-mono ${i === 0 ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
            {entry}
          </p>
        ))}
        {log.length === 0 && <p className="text-xs text-muted-foreground italic">Press Play to run Dijkstra from S</p>}
      </div>

      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground justify-center">
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full border bg-card" /> Unvisited</div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-yellow-500" /> Current</div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-green-500" /> Visited</div>
      </div>
    </div>
  );
};

export default DijkstraVisualizer;
