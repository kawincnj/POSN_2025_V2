import React, { useState, useCallback } from 'react';
import { Play, RotateCcw, Plus } from 'lucide-react';

const UnionFindVisualizer = () => {
  const N = 8;
  const [parent, setParent] = useState(() => Array.from({ length: N }, (_, i) => i));
  const [rank, setRank] = useState(() => Array(N).fill(0));
  const [highlight, setHighlight] = useState([]);
  const [log, setLog] = useState(['Initialize: each element is its own set']);
  const [inputA, setInputA] = useState('');
  const [inputB, setInputB] = useState('');

  const find = useCallback((p, i) => {
    const path = [i];
    let cur = i;
    while (p[cur] !== cur) {
      cur = p[cur];
      path.push(cur);
    }
    return { root: cur, path };
  }, []);

  const reset = () => {
    setParent(Array.from({ length: N }, (_, i) => i));
    setRank(Array(N).fill(0));
    setHighlight([]);
    setLog(['Initialize: each element is its own set']);
  };

  const handleUnion = () => {
    const a = parseInt(inputA), b = parseInt(inputB);
    if (isNaN(a) || isNaN(b) || a < 0 || a >= N || b < 0 || b >= N) return;

    const newP = [...parent];
    const newR = [...rank];

    const findRoot = (x) => {
      while (newP[x] !== x) x = newP[x];
      return x;
    };

    const rootA = findRoot(a);
    const rootB = findRoot(b);

    if (rootA === rootB) {
      setLog(prev => [`Union(${a}, ${b}): Already in same set (root=${rootA})`, ...prev.slice(0, 9)]);
      setHighlight([a, b, rootA]);
      return;
    }

    if (newR[rootA] < newR[rootB]) {
      newP[rootA] = rootB;
    } else if (newR[rootA] > newR[rootB]) {
      newP[rootB] = rootA;
    } else {
      newP[rootB] = rootA;
      newR[rootA]++;
    }

    // Path compression for a and b
    let x = a;
    while (newP[x] !== findRoot(a) && newP[x] !== x) {
      const next = newP[x];
      newP[x] = newR[rootA] >= newR[rootB] ? rootA : rootB;
      x = next;
    }

    setParent(newP);
    setRank(newR);
    setHighlight([a, b]);
    setLog(prev => [`Union(${a}, ${b}): Merged sets`, ...prev.slice(0, 9)]);
    setInputA('');
    setInputB('');
  };

  const handleFind = () => {
    const a = parseInt(inputA);
    if (isNaN(a) || a < 0 || a >= N) return;
    const { root, path } = find(parent, a);
    setHighlight(path);
    setLog(prev => [`Find(${a}) = ${root} (path: ${path.join(' → ')})`, ...prev.slice(0, 9)]);
  };

  // Build tree structure for visualization
  const getChildren = (node) => {
    return Array.from({ length: N }, (_, i) => i).filter(i => parent[i] === node && i !== node);
  };

  const roots = Array.from({ length: N }, (_, i) => i).filter(i => parent[i] === i);

  const renderTree = (node, x, y, spread) => {
    const children = getChildren(node);
    const isHighlighted = highlight.includes(node);
    const elements = [];

    // Draw edges to children
    children.forEach((child, idx) => {
      const childX = x + (idx - (children.length - 1) / 2) * spread;
      const childY = y + 60;
      elements.push(
        <line key={`edge-${node}-${child}`} x1={x} y1={y} x2={childX} y2={childY}
          stroke="currentColor" className="text-muted-foreground/40" strokeWidth="2" />
      );
      elements.push(...renderTree(child, childX, childY, spread / 2));
    });

    // Draw node
    elements.push(
      <g key={`node-${node}`}>
        <circle cx={x} cy={y} r="18"
          className={`transition-colors duration-300 ${
            isHighlighted ? 'fill-yellow-500 stroke-yellow-600' : 'fill-primary/20 stroke-primary'
          }`} strokeWidth="2" />
        <text x={x} y={y} dy=".35em" textAnchor="middle"
          className={`text-xs font-bold select-none ${isHighlighted ? 'fill-white' : 'fill-foreground'}`}>
          {node}
        </text>
      </g>
    );

    return elements;
  };

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-xl bg-card">
      <div className="flex flex-wrap items-center gap-2">
        <button onClick={reset} className="p-2 rounded-md hover:bg-accent transition-colors" title="Reset">
          <RotateCcw className="w-5 h-5" />
        </button>
        <input type="number" min="0" max={N - 1} placeholder="a" value={inputA}
          onChange={e => setInputA(e.target.value)}
          className="w-14 h-8 rounded-md border bg-background px-2 text-sm text-center" />
        <input type="number" min="0" max={N - 1} placeholder="b" value={inputB}
          onChange={e => setInputB(e.target.value)}
          className="w-14 h-8 rounded-md border bg-background px-2 text-sm text-center" />
        <button onClick={handleUnion}
          className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
          Union(a, b)
        </button>
        <button onClick={handleFind}
          className="px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground text-sm font-medium hover:opacity-90">
          Find(a)
        </button>
      </div>

      <div className="relative h-[250px] w-full border rounded-lg bg-muted/10 overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 600 250">
          {roots.map((root, idx) => {
            const spacing = 600 / (roots.length + 1);
            const x = spacing * (idx + 1);
            return renderTree(root, x, 40, Math.min(80, spacing / 2));
          })}
        </svg>
      </div>

      <div className="bg-muted/20 rounded-lg p-3 max-h-32 overflow-y-auto">
        <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Operation Log</p>
        {log.map((entry, i) => (
          <p key={i} className={`text-xs font-mono ${i === 0 ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
            {entry}
          </p>
        ))}
      </div>
    </div>
  );
};

export default UnionFindVisualizer;
