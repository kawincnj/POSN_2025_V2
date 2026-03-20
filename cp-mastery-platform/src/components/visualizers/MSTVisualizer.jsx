import React, { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw } from 'lucide-react';

const NODES = [
  { id: 0, x: 100, y: 60 },
  { id: 1, x: 250, y: 40 },
  { id: 2, x: 400, y: 60 },
  { id: 3, x: 80, y: 180 },
  { id: 4, x: 250, y: 200 },
  { id: 5, x: 420, y: 180 },
];

const EDGES = [
  { u: 0, v: 1, w: 4 },
  { u: 0, v: 3, w: 2 },
  { u: 1, v: 2, w: 3 },
  { u: 1, v: 3, w: 5 },
  { u: 1, v: 4, w: 1 },
  { u: 2, v: 4, w: 6 },
  { u: 2, v: 5, w: 2 },
  { u: 3, v: 4, w: 3 },
  { u: 4, v: 5, w: 4 },
];

const MSTVisualizer = () => {
  const [mstEdges, setMstEdges] = useState(new Set());
  const [currentEdge, setCurrentEdge] = useState(null);
  const [rejectedEdge, setRejectedEdge] = useState(null);
  const [components, setComponents] = useState(Array.from({ length: 6 }, (_, i) => i));
  const [isRunning, setIsRunning] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [log, setLog] = useState([]);
  const runRef = useRef(false);

  useEffect(() => () => { runRef.current = false; }, []);

  const reset = () => {
    runRef.current = false;
    setMstEdges(new Set());
    setCurrentEdge(null);
    setRejectedEdge(null);
    setComponents(Array.from({ length: 6 }, (_, i) => i));
    setIsRunning(false);
    setTotalCost(0);
    setLog([]);
  };

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  const run = async () => {
    if (isRunning) return;
    reset();
    await sleep(50);
    setIsRunning(true);
    runRef.current = true;

    const sorted = [...EDGES].sort((a, b) => a.w - b.w);
    const parent = Array.from({ length: 6 }, (_, i) => i);
    const rank = Array(6).fill(0);
    const newLog = ['Kruskal: Sort edges by weight'];
    setLog([...newLog]);
    await sleep(600);

    const find = (x) => {
      while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; }
      return x;
    };

    const mst = new Set();
    let cost = 0;

    for (const edge of sorted) {
      if (!runRef.current) return;
      setCurrentEdge(edge);
      newLog.unshift(`Consider edge ${edge.u}-${edge.v} (w=${edge.w})`);
      setLog([...newLog]);
      await sleep(800);

      const ru = find(edge.u), rv = find(edge.v);
      if (ru !== rv) {
        // Union
        if (rank[ru] < rank[rv]) parent[ru] = rv;
        else if (rank[ru] > rank[rv]) parent[rv] = ru;
        else { parent[rv] = ru; rank[ru]++; }

        mst.add(`${edge.u}-${edge.v}`);
        setMstEdges(new Set(mst));
        cost += edge.w;
        setTotalCost(cost);
        setComponents([...parent]);
        newLog.unshift(`  Added! (cost so far: ${cost})`);
        setLog([...newLog]);

        if (mst.size === 5) break;
      } else {
        setRejectedEdge(edge);
        newLog.unshift(`  Rejected (would create cycle)`);
        setLog([...newLog]);
        await sleep(500);
        setRejectedEdge(null);
      }
      setCurrentEdge(null);
      await sleep(300);
    }

    if (runRef.current) {
      newLog.unshift(`MST complete! Total cost = ${cost}`);
      setLog([...newLog]);
    }
    setCurrentEdge(null);
    setIsRunning(false);
    runRef.current = false;
  };

  // Color nodes by component
  const getNodeColor = (id) => {
    const colors = ['fill-blue-500', 'fill-green-500', 'fill-purple-500', 'fill-orange-500', 'fill-pink-500', 'fill-cyan-500'];
    const root = (() => {
      let x = id;
      while (components[x] !== x) x = components[x];
      return x;
    })();
    return colors[root % colors.length];
  };

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-xl bg-card">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button onClick={reset} className="p-2 rounded-md hover:bg-accent"><RotateCcw className="w-5 h-5" /></button>
          <button onClick={run} disabled={isRunning}
            className="p-2 rounded-md hover:bg-accent disabled:opacity-50 text-green-500">
            <Play className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium">Kruskal's MST</span>
        </div>
        {totalCost > 0 && <span className="text-sm font-bold text-primary">Total: {totalCost}</span>}
      </div>

      <div className="relative h-[260px] w-full border rounded-lg bg-muted/10 overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 500 260">
          {EDGES.map((e, i) => {
            const n1 = NODES[e.u], n2 = NODES[e.v];
            const key = `${e.u}-${e.v}`;
            const isMST = mstEdges.has(key);
            const isCurrent = currentEdge && currentEdge.u === e.u && currentEdge.v === e.v;
            const isRejected = rejectedEdge && rejectedEdge.u === e.u && rejectedEdge.v === e.v;
            const mx = (n1.x + n2.x) / 2, my = (n1.y + n2.y) / 2;
            return (
              <g key={i}>
                <line x1={n1.x} y1={n1.y} x2={n2.x} y2={n2.y}
                  strokeWidth={isMST ? 4 : isCurrent ? 3 : 2}
                  className={`transition-all duration-300 ${
                    isMST ? 'stroke-green-500' :
                    isRejected ? 'stroke-red-400' :
                    isCurrent ? 'stroke-yellow-500' :
                    'stroke-current text-muted-foreground/20'
                  }`} />
                <rect x={mx - 10} y={my - 8} width={20} height={16} rx={4}
                  className="fill-background stroke-border" strokeWidth="1" />
                <text x={mx} y={my + 1} textAnchor="middle" dy=".3em"
                  className="text-[10px] font-bold fill-foreground">{e.w}</text>
              </g>
            );
          })}

          {NODES.map((node) => (
            <g key={node.id}>
              <circle cx={node.x} cy={node.y} r="20"
                className={`${getNodeColor(node.id)} transition-colors duration-500`}
                stroke="white" strokeWidth="2" />
              <text x={node.x} y={node.y} dy=".35em" textAnchor="middle"
                className="text-xs font-bold fill-white select-none">{node.id}</text>
            </g>
          ))}
        </svg>
      </div>

      <div className="bg-muted/20 rounded-lg p-3 max-h-28 overflow-y-auto">
        {log.slice(0, 8).map((entry, i) => (
          <p key={i} className={`text-xs font-mono ${i === 0 ? 'text-primary font-bold' : 'text-muted-foreground'}`}>{entry}</p>
        ))}
        {log.length === 0 && <p className="text-xs text-muted-foreground italic">Press Play to run Kruskal's MST</p>}
      </div>

      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground justify-center">
        <div className="flex items-center gap-1"><div className="w-3 h-1 bg-green-500 rounded" /> MST Edge</div>
        <div className="flex items-center gap-1"><div className="w-3 h-1 bg-yellow-500 rounded" /> Considering</div>
        <div className="flex items-center gap-1"><div className="w-3 h-1 bg-red-400 rounded" /> Rejected</div>
      </div>
    </div>
  );
};

export default MSTVisualizer;
