import React, { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw, ChevronRight } from 'lucide-react';

const INF = 999;
const N = 5;
const INIT_DIST = [
  [0, 3, INF, 7, INF],
  [INF, 0, 1, INF, INF],
  [INF, INF, 0, INF, 2],
  [INF, INF, INF, 0, 1],
  [INF, 6, INF, INF, 0],
];

const FloydVisualizer = () => {
  const [dist, setDist] = useState(INIT_DIST.map(r => [...r]));
  const [k, setK] = useState(-1);
  const [highlight, setHighlight] = useState(null); // {i, j, k}
  const [isRunning, setIsRunning] = useState(false);
  const [step, setStep] = useState('Initial distance matrix');
  const runRef = useRef(false);

  useEffect(() => () => { runRef.current = false; }, []);

  const reset = () => {
    runRef.current = false;
    setDist(INIT_DIST.map(r => [...r]));
    setK(-1);
    setHighlight(null);
    setIsRunning(false);
    setStep('Initial distance matrix');
  };

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  const run = async () => {
    if (isRunning) return;
    reset();
    await sleep(50);
    setIsRunning(true);
    runRef.current = true;

    const d = INIT_DIST.map(r => [...r]);

    for (let kk = 0; kk < N; kk++) {
      if (!runRef.current) return;
      setK(kk);
      setStep(`Intermediate vertex k = ${kk}`);
      await sleep(600);

      for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
          if (!runRef.current) return;
          if (i === kk || j === kk || i === j) continue;
          if (d[i][kk] < INF && d[kk][j] < INF) {
            const newDist = d[i][kk] + d[kk][j];
            setHighlight({ i, j, k: kk });
            if (newDist < d[i][j]) {
              d[i][j] = newDist;
              setDist(d.map(r => [...r]));
              setStep(`dist[${i}][${j}] = min(${d[i][j]}, dist[${i}][${kk}]+dist[${kk}][${j}]) = ${newDist}`);
              await sleep(400);
            } else {
              await sleep(100);
            }
          }
        }
      }
    }

    setHighlight(null);
    setK(-1);
    if (runRef.current) setStep('Floyd-Warshall complete! All-pairs shortest paths found.');
    setIsRunning(false);
    runRef.current = false;
  };

  const fmt = (v) => v >= INF ? '∞' : v;

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-xl bg-card">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button onClick={reset} className="p-2 rounded-md hover:bg-accent"><RotateCcw className="w-5 h-5" /></button>
          <button onClick={run} disabled={isRunning}
            className="p-2 rounded-md hover:bg-accent disabled:opacity-50 text-green-500">
            <Play className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium">Floyd-Warshall</span>
        </div>
        {k >= 0 && <span className="text-sm font-bold text-primary">k = {k}</span>}
      </div>

      {/* Distance Matrix */}
      <div className="flex justify-center overflow-x-auto">
        <table className="border-collapse">
          <thead>
            <tr>
              <th className="w-8 h-8 text-[10px] text-muted-foreground" />
              {Array.from({ length: N }, (_, j) => (
                <th key={j} className={`w-11 h-8 text-xs font-bold text-center ${
                  highlight?.j === j ? 'text-yellow-500' : 'text-muted-foreground'
                } ${j === k ? 'text-primary' : ''}`}>{j}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dist.map((row, i) => (
              <tr key={i}>
                <td className={`w-8 h-8 text-xs font-bold text-center ${
                  highlight?.i === i ? 'text-yellow-500' : 'text-muted-foreground'
                } ${i === k ? 'text-primary' : ''}`}>{i}</td>
                {row.map((val, j) => {
                  const isHL = highlight && highlight.i === i && highlight.j === j;
                  const isKRow = i === k || j === k;
                  return (
                    <td key={j} className={`w-11 h-10 text-center text-sm font-mono border transition-all duration-200 ${
                      isHL ? 'bg-yellow-400 text-yellow-900 font-bold border-yellow-500 scale-105' :
                      isKRow ? 'bg-primary/10 border-primary/30' :
                      'bg-card border-border'
                    }`}>
                      {fmt(val)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-muted/20 rounded-lg p-3 text-center">
        <p className="text-sm font-mono">{step}</p>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
      </p>
    </div>
  );
};

export default FloydVisualizer;
