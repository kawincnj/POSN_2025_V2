import React, { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw, Shuffle } from 'lucide-react';

const randomPoints = () => {
  const pts = [];
  for (let i = 0; i < 15; i++) {
    pts.push({ x: 40 + Math.random() * 420, y: 30 + Math.random() * 240 });
  }
  return pts;
};

const ConvexHullVisualizer = () => {
  const [points, setPoints] = useState(randomPoints);
  const [hull, setHull] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(-1);
  const [checking, setChecking] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState('Click Play to compute convex hull (Andrew\'s Monotone Chain)');
  const runRef = useRef(false);

  useEffect(() => () => { runRef.current = false; }, []);

  const reset = () => {
    runRef.current = false;
    setHull([]);
    setCurrentIdx(-1);
    setChecking(-1);
    setIsRunning(false);
    setStatus('Click Play to compute convex hull');
  };

  const regenerate = () => {
    reset();
    setPoints(randomPoints());
  };

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  const cross = (o, a, b) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);

  const run = async () => {
    if (isRunning) return;
    reset();
    await sleep(50);
    setIsRunning(true);
    runRef.current = true;

    const sorted = [...points].sort((a, b) => a.x - b.x || a.y - b.y);
    const n = sorted.length;
    const h = [];

    setStatus('Building lower hull (left to right)...');
    await sleep(500);

    // Lower hull
    for (let i = 0; i < n; i++) {
      if (!runRef.current) return;
      setCurrentIdx(i);
      while (h.length >= 2 && cross(h[h.length - 2], h[h.length - 1], sorted[i]) <= 0) {
        setChecking(h.length - 1);
        setStatus(`Non-left turn detected, removing point`);
        await sleep(300);
        h.pop();
        setHull([...h]);
      }
      h.push(sorted[i]);
      setHull([...h]);
      setChecking(-1);
      await sleep(250);
    }

    const lowerSize = h.length;
    setStatus('Building upper hull (right to left)...');
    await sleep(500);

    // Upper hull
    for (let i = n - 2; i >= 0; i--) {
      if (!runRef.current) return;
      setCurrentIdx(i);
      while (h.length > lowerSize && cross(h[h.length - 2], h[h.length - 1], sorted[i]) <= 0) {
        setChecking(h.length - 1);
        setStatus(`Non-left turn detected, removing point`);
        await sleep(300);
        h.pop();
        setHull([...h]);
      }
      h.push(sorted[i]);
      setHull([...h]);
      setChecking(-1);
      await sleep(250);
    }

    h.pop(); // remove last (duplicate of first)
    setHull([...h]);
    setCurrentIdx(-1);
    setChecking(-1);

    if (runRef.current) {
      setStatus(`Convex hull complete! ${h.length} vertices on hull.`);
    }
    setIsRunning(false);
    runRef.current = false;
  };

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-xl bg-card">
      <div className="flex items-center gap-2">
        <button onClick={reset} className="p-2 rounded-md hover:bg-accent"><RotateCcw className="w-5 h-5" /></button>
        <button onClick={run} disabled={isRunning}
          className="p-2 rounded-md hover:bg-accent disabled:opacity-50 text-green-500">
          <Play className="w-5 h-5" />
        </button>
        <button onClick={regenerate} disabled={isRunning}
          className="p-2 rounded-md hover:bg-accent disabled:opacity-50">
          <Shuffle className="w-5 h-5" />
        </button>
        <span className="text-sm font-medium">Convex Hull</span>
      </div>

      <div className="relative h-[320px] w-full border rounded-lg bg-muted/10 overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 500 310">
          {/* Hull edges */}
          {hull.length >= 2 && hull.map((p, i) => {
            if (i === 0) return null;
            const prev = hull[i - 1];
            return (
              <line key={`hull-${i}`} x1={prev.x} y1={prev.y} x2={p.x} y2={p.y}
                stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.7" />
            );
          })}
          {/* Close hull */}
          {hull.length >= 3 && !isRunning && (
            <line x1={hull[hull.length - 1].x} y1={hull[hull.length - 1].y}
              x2={hull[0].x} y2={hull[0].y}
              stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.7" />
          )}

          {/* Fill hull */}
          {hull.length >= 3 && !isRunning && (
            <polygon points={hull.map(p => `${p.x},${p.y}`).join(' ')}
              fill="hsl(var(--primary))" opacity="0.1" />
          )}

          {/* All points */}
          {points.map((p, i) => {
            const sorted = [...points].sort((a, b) => a.x - b.x || a.y - b.y);
            const isOnHull = hull.some(h => Math.abs(h.x - p.x) < 0.01 && Math.abs(h.y - p.y) < 0.01);
            const isCurrent = currentIdx >= 0 && sorted[currentIdx] && Math.abs(sorted[currentIdx].x - p.x) < 0.01 && Math.abs(sorted[currentIdx].y - p.y) < 0.01;
            return (
              <circle key={i} cx={p.x} cy={p.y} r={isCurrent ? 7 : isOnHull ? 6 : 4}
                className={`transition-all duration-300 ${
                  isCurrent ? 'fill-yellow-500 stroke-yellow-600' :
                  isOnHull ? 'fill-primary stroke-primary' :
                  'fill-muted-foreground/50 stroke-muted-foreground/50'
                }`} strokeWidth="1" />
            );
          })}
        </svg>
      </div>

      <div className="bg-muted/20 rounded-lg p-3 text-center">
        <p className="text-sm font-mono">{status}</p>
      </div>
    </div>
  );
};

export default ConvexHullVisualizer;
