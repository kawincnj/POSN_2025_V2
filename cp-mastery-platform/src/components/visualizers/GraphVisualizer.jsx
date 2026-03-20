import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw } from 'lucide-react';

const INITIAL_NODES = [
  { id: 0, x: 250, y: 50 },
  { id: 1, x: 150, y: 150 },
  { id: 2, x: 350, y: 150 },
  { id: 3, x: 100, y: 250 },
  { id: 4, x: 200, y: 250 },
  { id: 5, x: 300, y: 250 },
  { id: 6, x: 400, y: 250 },
];

const INITIAL_EDGES = [
  { source: 0, target: 1 }, { source: 0, target: 2 },
  { source: 1, target: 3 }, { source: 1, target: 4 },
  { source: 2, target: 5 }, { source: 2, target: 6 },
];

const ADJ_LIST = {
  0: [1, 2],
  1: [3, 4],
  2: [5, 6],
  3: [], 4: [], 5: [], 6: []
};

const SPEED_MS = 800;

const GraphVisualizer = () => {
  const [visited, setVisited] = useState(new Set());
  const [current, setCurrent] = useState(null);
  const [queue, setQueue] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const isRunningRef = useRef(false);
  
  useEffect(() => {
    return () => {
      isRunningRef.current = false;
    };
  }, []);

  const reset = () => {
    isRunningRef.current = false;
    setVisited(new Set());
    setCurrent(null);
    setQueue([]);
    setIsRunning(false);
  };

  const runBFS = async () => {
    if (isRunning) return;
    setIsRunning(true);
    isRunningRef.current = true;
    
    const q = [0];
    const v = new Set();
    v.add(0);
    setQueue([...q]);
    setVisited(new Set(v));

    while (q.length > 0) {
      if (!isRunningRef.current) return;
      
      const node = q.shift();
      setCurrent(node);
      setQueue([...q]);
      
      await new Promise(r => setTimeout(r, SPEED_MS));

      if (!isRunningRef.current) return;

      for (const neighbor of ADJ_LIST[node]) {
        if (!v.has(neighbor)) {
          v.add(neighbor);
          q.push(neighbor);
          setVisited(new Set(v));
          setQueue([...q]);
          await new Promise(r => setTimeout(r, SPEED_MS / 2));
          if (!isRunningRef.current) return;
        }
      }
    }
    
    setCurrent(null);
    setIsRunning(false);
    isRunningRef.current = false;
  };

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-xl bg-card">
      <div className="flex gap-2">
        <button
          onClick={reset}
          className="p-2 rounded-md hover:bg-accent transition-colors"
          title="Reset Graph"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
        <button
          onClick={runBFS}
          disabled={isRunning}
          className="p-2 rounded-md hover:bg-accent disabled:opacity-50 text-green-500 transition-colors"
          title="Start BFS"
        >
          <Play className="w-5 h-5" />
        </button>
        <span className="self-center text-sm font-medium">BFS Traversal</span>
      </div>

      <div className="relative h-[350px] w-full border rounded-lg bg-muted/10 overflow-hidden flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 500 350">
          {INITIAL_EDGES.map((edge, i) => {
            const start = INITIAL_NODES.find(n => n.id === edge.source);
            const end = INITIAL_NODES.find(n => n.id === edge.target);
            return (
              <line
                key={i}
                x1={start.x} y1={start.y}
                x2={end.x} y2={end.y}
                stroke="currentColor"
                className="text-muted-foreground/30"
                strokeWidth="2"
              />
            );
          })}

          {INITIAL_NODES.map((node) => {
            const isVisited = visited.has(node.id);
            const isCurrent = current === node.id;
            const isInQueue = queue.includes(node.id);

            return (
              <g key={node.id} className="transition-all duration-500">
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="20"
                  className={`transition-colors duration-500 ${
                    isCurrent ? 'fill-yellow-500 stroke-yellow-600' :
                    isVisited ? 'fill-primary stroke-primary' :
                    isInQueue ? 'fill-blue-400 stroke-blue-500' :
                    'fill-card stroke-border'
                  }`}
                  strokeWidth="2"
                />
                <text
                  x={node.x}
                  y={node.y}
                  dy=".3em"
                  textAnchor="middle"
                  className={`text-xs font-bold pointer-events-none select-none transition-colors duration-500 ${
                    (isVisited || isCurrent || isInQueue) ? 'fill-primary-foreground' : 'fill-foreground'
                  }`}
                >
                  {node.id}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      
      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground justify-center bg-muted/5 p-2 rounded-md">
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full border bg-card"></div> Unvisited</div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-blue-400"></div> In Queue</div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-yellow-500"></div> Current</div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-primary"></div> Visited</div>
      </div>
    </div>
  );
};

export default GraphVisualizer;
