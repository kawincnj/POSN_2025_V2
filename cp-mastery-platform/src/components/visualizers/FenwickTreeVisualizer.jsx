import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';

const FenwickTreeVisualizer = () => {
  const initialArr = [0, 3, 1, 5, 2, 4, 7, 2, 6]; // 1-indexed, index 0 unused
  const [arr, setArr] = useState([...initialArr]);
  const [ft, setFt] = useState(() => buildFT(initialArr));
  const [queryIdx, setQueryIdx] = useState(5);
  const [queryResult, setQueryResult] = useState(null);
  const [hlQuery, setHlQuery] = useState([]);
  const [hlUpdate, setHlUpdate] = useState([]);

  function buildFT(a) {
    const n = a.length;
    const t = Array(n).fill(0);
    for (let i = 1; i < n; i++) {
      let idx = i;
      while (idx < n) {
        t[idx] += a[i];
        idx += idx & (-idx);
      }
    }
    return t;
  }

  const handleQuery = () => {
    let sum = 0;
    const visited = [];
    let i = queryIdx;
    while (i > 0) {
      visited.push(i);
      sum += ft[i];
      i -= i & (-i);
    }
    setQueryResult(sum);
    setHlQuery(visited);
    setHlUpdate([]);
  };

  const handlePointUpdate = (idx, newVal) => {
    const diff = newVal - arr[idx];
    const newArr = [...arr];
    newArr[idx] = newVal;

    const newFt = [...ft];
    const visited = [];
    let i = idx;
    while (i < newArr.length) {
      visited.push(i);
      newFt[i] += diff;
      i += i & (-i);
    }

    setArr(newArr);
    setFt(newFt);
    setHlUpdate(visited);
    setHlQuery([]);
    setQueryResult(null);
  };

  const reset = () => {
    setArr([...initialArr]);
    setFt(buildFT(initialArr));
    setQueryResult(null);
    setHlQuery([]);
    setHlUpdate([]);
  };

  const n = arr.length - 1; // actual size (1-indexed)

  // Show which range each FT cell covers
  const getRange = (i) => {
    const lowbit = i & (-i);
    return [i - lowbit + 1, i];
  };

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-xl bg-card">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button onClick={reset} className="p-2 rounded-md hover:bg-accent"><RotateCcw className="w-5 h-5" /></button>
          <span className="text-sm font-medium">Fenwick Tree (1-indexed)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Prefix sum [1..</span>
          <input type="number" min={1} max={n} value={queryIdx}
            onChange={e => setQueryIdx(Math.min(n, Math.max(1, parseInt(e.target.value) || 1)))}
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

      {/* Original array */}
      <div>
        <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Original Array</p>
        <div className="flex gap-1 justify-center">
          {arr.slice(1).map((val, idx) => {
            const i = idx + 1;
            return (
              <div key={i} className="flex flex-col items-center gap-0.5">
                <input type="number" value={val}
                  onChange={e => handlePointUpdate(i, parseInt(e.target.value) || 0)}
                  className="w-10 h-9 rounded-lg border-2 bg-background text-center text-sm font-mono font-bold border-border" />
                <span className="text-[10px] text-muted-foreground">[{i}]</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fenwick Tree */}
      <div>
        <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Fenwick Tree (BIT)</p>
        <div className="flex gap-1 justify-center">
          {ft.slice(1).map((val, idx) => {
            const i = idx + 1;
            const isQueryHL = hlQuery.includes(i);
            const isUpdateHL = hlUpdate.includes(i);
            const [rl, rr] = getRange(i);
            return (
              <div key={i} className="flex flex-col items-center gap-0.5">
                <div className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-mono font-bold transition-all duration-300 border-2 ${
                  isQueryHL ? 'bg-primary text-primary-foreground border-primary scale-105 shadow-lg' :
                  isUpdateHL ? 'bg-yellow-400 text-yellow-900 border-yellow-500 scale-105 shadow-md' :
                  'bg-card border-border'
                }`}>
                  {val}
                </div>
                <span className="text-[9px] text-muted-foreground">ft[{i}]</span>
                <span className="text-[8px] text-muted-foreground/60">[{rl}..{rr}]</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Binary representation showing lowbit */}
      <div className="bg-muted/20 rounded-lg p-3">
        <p className="text-[10px] font-bold uppercase text-muted-foreground mb-2">Index Binary & Lowbit</p>
        <div className="flex gap-1 justify-center flex-wrap">
          {Array.from({ length: n }, (_, i) => i + 1).map(i => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-[10px] font-mono text-muted-foreground">{i.toString(2).padStart(4, '0')}</span>
              <span className="text-[9px] font-mono text-primary">lowbit={i & (-i)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground justify-center">
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-primary" /> Query path</div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-yellow-400" /> Update path</div>
      </div>
    </div>
  );
};

export default FenwickTreeVisualizer;
