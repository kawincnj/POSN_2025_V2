import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';

const SegmentTreeVisualizer = () => {
  const [arr, setArr] = useState([2, 1, 5, 3, 4, 7, 2, 6]);
  const [tree, setTree] = useState(() => buildTree([2, 1, 5, 3, 4, 7, 2, 6]));
  const [queryRange, setQueryRange] = useState({ l: 1, r: 5 });
  const [queryResult, setQueryResult] = useState(null);
  const [highlighted, setHighlighted] = useState([]);
  const [mode] = useState('sum');

  function buildTree(a) {
    const n = a.length;
    const t = Array(4 * n).fill(0);
    function build(v, tl, tr) {
      if (tl === tr) { t[v] = a[tl]; return; }
      const tm = Math.floor((tl + tr) / 2);
      build(2 * v, tl, tm);
      build(2 * v + 1, tm + 1, tr);
      t[v] = t[2 * v] + t[2 * v + 1];
    }
    build(1, 0, n - 1);
    return t;
  }

  const handleQuery = () => {
    const { l, r } = queryRange;
    const n = arr.length;
    const visited = [];
    function query(v, tl, tr, ql, qr) {
      if (ql > tr || qr < tl) return 0;
      visited.push(v);
      if (ql <= tl && tr <= qr) return tree[v];
      const tm = Math.floor((tl + tr) / 2);
      return query(2 * v, tl, tm, ql, qr) + query(2 * v + 1, tm + 1, tr, ql, qr);
    }
    const result = query(1, 0, n - 1, l, r);
    setQueryResult(result);
    setHighlighted(visited);
  };

  const handleUpdate = (idx, val) => {
    const newArr = [...arr];
    newArr[idx] = val;
    setArr(newArr);
    setTree(buildTree(newArr));
    setQueryResult(null);
    setHighlighted([]);
  };

  const reset = () => {
    const a = [2, 1, 5, 3, 4, 7, 2, 6];
    setArr(a);
    setTree(buildTree(a));
    setQueryResult(null);
    setHighlighted([]);
  };

  // Visualize the tree as layers
  const renderTree = () => {
    const n = arr.length;
    const layers = [];
    let level = [[1, 0, n - 1]]; // [nodeIdx, tl, tr]

    while (level.length > 0) {
      layers.push(level);
      const next = [];
      for (const [v, tl, tr] of level) {
        if (tl < tr) {
          const tm = Math.floor((tl + tr) / 2);
          next.push([2 * v, tl, tm]);
          next.push([2 * v + 1, tm + 1, tr]);
        }
      }
      level = next;
    }

    return (
      <div className="flex flex-col items-center gap-2 overflow-x-auto py-2">
        {layers.map((layer, li) => (
          <div key={li} className="flex justify-center gap-1" style={{ minWidth: `${layer.length * 60}px` }}>
            {layer.map(([v, tl, tr]) => {
              const isHL = highlighted.includes(v);
              return (
                <div key={v} className={`flex flex-col items-center px-1`}>
                  <div className={`w-12 h-10 flex flex-col items-center justify-center rounded-lg text-xs font-mono transition-all duration-300 border-2 ${
                    isHL ? 'bg-primary text-primary-foreground border-primary shadow-lg scale-105' : 'bg-card border-border'
                  }`}>
                    <span className="font-bold">{tree[v]}</span>
                  </div>
                  <span className="text-[9px] text-muted-foreground mt-0.5">[{tl},{tr}]</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-xl bg-card">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button onClick={reset} className="p-2 rounded-md hover:bg-accent"><RotateCcw className="w-5 h-5" /></button>
          <span className="text-sm font-medium">Range Sum Query</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Query [</span>
          <input type="number" min={0} max={arr.length - 1} value={queryRange.l}
            onChange={e => setQueryRange(p => ({ ...p, l: parseInt(e.target.value) || 0 }))}
            className="w-10 h-7 rounded border bg-background px-1 text-xs text-center" />
          <span className="text-xs text-muted-foreground">,</span>
          <input type="number" min={0} max={arr.length - 1} value={queryRange.r}
            onChange={e => setQueryRange(p => ({ ...p, r: parseInt(e.target.value) || 0 }))}
            className="w-10 h-7 rounded border bg-background px-1 text-xs text-center" />
          <span className="text-xs text-muted-foreground">]</span>
          <button onClick={handleQuery}
            className="px-3 py-1 rounded-md bg-primary text-primary-foreground text-xs font-medium">
            Query
          </button>
          {queryResult !== null && (
            <span className="text-sm font-bold text-primary">= {queryResult}</span>
          )}
        </div>
      </div>

      {/* Array */}
      <div className="flex gap-1 justify-center">
        {arr.map((val, i) => (
          <div key={i} className="flex flex-col items-center gap-0.5">
            <input type="number" value={val}
              onChange={e => handleUpdate(i, parseInt(e.target.value) || 0)}
              className={`w-10 h-9 rounded-lg border-2 bg-background text-center text-sm font-mono font-bold ${
                i >= queryRange.l && i <= queryRange.r ? 'border-primary bg-primary/10' : 'border-border'
              }`} />
            <span className="text-[10px] text-muted-foreground">[{i}]</span>
          </div>
        ))}
      </div>

      {/* Tree visualization */}
      <div className="border rounded-lg bg-muted/10 p-2 overflow-x-auto">
        {renderTree()}
      </div>

      <p className="text-xs text-muted-foreground text-center italic">
        Edit array values to rebuild tree. Query a range to see which nodes are visited.
      </p>
    </div>
  );
};

export default SegmentTreeVisualizer;
