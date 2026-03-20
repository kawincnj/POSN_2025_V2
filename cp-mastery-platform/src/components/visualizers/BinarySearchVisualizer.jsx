import React, { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw } from 'lucide-react';

const BinarySearchVisualizer = () => {
  const [array] = useState([2, 5, 8, 12, 16, 23, 38, 42, 56, 72, 91]);
  const [target, setTarget] = useState(23);
  const [lo, setLo] = useState(-1);
  const [hi, setHi] = useState(-1);
  const [mid, setMid] = useState(-1);
  const [found, setFound] = useState(null);
  const [steps, setSteps] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const runRef = useRef(false);

  const reset = () => {
    runRef.current = false;
    setLo(-1); setHi(-1); setMid(-1);
    setFound(null); setSteps([]);
    setIsRunning(false);
  };

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  const runSearch = async () => {
    if (isRunning) return;
    reset();
    await sleep(100);
    setIsRunning(true);
    runRef.current = true;

    let l = 0, r = array.length - 1;
    const newSteps = [];

    while (l <= r && runRef.current) {
      const m = Math.floor((l + r) / 2);
      setLo(l); setHi(r); setMid(m);

      if (array[m] === target) {
        newSteps.push(`mid=${m}, arr[${m}]=${array[m]} == ${target}. Found!`);
        setSteps([...newSteps]);
        setFound(m);
        setIsRunning(false);
        runRef.current = false;
        return;
      } else if (array[m] < target) {
        newSteps.push(`mid=${m}, arr[${m}]=${array[m]} < ${target}. Search right half.`);
        setSteps([...newSteps]);
        await sleep(1000);
        l = m + 1;
      } else {
        newSteps.push(`mid=${m}, arr[${m}]=${array[m]} > ${target}. Search left half.`);
        setSteps([...newSteps]);
        await sleep(1000);
        r = m - 1;
      }
    }

    if (runRef.current) {
      newSteps.push(`Not found! lo > hi, search space exhausted.`);
      setSteps([...newSteps]);
      setFound(-1);
    }
    setIsRunning(false);
    runRef.current = false;
  };

  useEffect(() => () => { runRef.current = false; }, []);

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-xl bg-card">
      <div className="flex flex-wrap items-center gap-3">
        <button onClick={reset} className="p-2 rounded-md hover:bg-accent"><RotateCcw className="w-5 h-5" /></button>
        <label className="text-sm text-muted-foreground">Target:</label>
        <input type="number" value={target} onChange={e => { reset(); setTarget(parseInt(e.target.value) || 0); }}
          className="w-16 h-8 rounded-md border bg-background px-2 text-sm text-center" disabled={isRunning} />
        <button onClick={runSearch} disabled={isRunning}
          className="p-2 rounded-md hover:bg-accent disabled:opacity-50 text-green-500">
          <Play className="w-5 h-5" />
        </button>
      </div>

      <div className="flex gap-1 justify-center items-end pt-4">
        {array.map((val, i) => {
          const isMid = i === mid;
          const isInRange = i >= lo && i <= hi && lo >= 0;
          const isFound = i === found;
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              {/* Pointers */}
              <div className="h-5 text-[10px] font-bold">
                {i === lo && i === hi && lo >= 0 && <span className="text-blue-500">L=H</span>}
                {i === lo && i !== hi && lo >= 0 && <span className="text-blue-500">Lo</span>}
                {i === hi && i !== lo && hi >= 0 && <span className="text-red-500">Hi</span>}
              </div>
              {isMid && <div className="text-[10px] font-bold text-yellow-500">Mid ↓</div>}
              {!isMid && <div className="h-4" />}
              <div className={`w-12 h-12 flex items-center justify-center rounded-lg text-sm font-bold font-mono transition-all duration-500 border-2 ${
                isFound ? 'bg-green-500 text-white border-green-600 scale-110 shadow-lg shadow-green-500/30' :
                isMid ? 'bg-yellow-400 text-yellow-900 border-yellow-500 scale-105 shadow-md' :
                isInRange ? 'bg-primary/10 border-primary/40' :
                'bg-muted/30 border-border opacity-40'
              }`}>
                {val}
              </div>
              <span className="text-[10px] text-muted-foreground">[{i}]</span>
            </div>
          );
        })}
      </div>

      {found !== null && (
        <div className={`text-center text-sm font-bold ${found >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {found >= 0 ? `Found ${target} at index ${found}!` : `${target} not found in array`}
        </div>
      )}

      <div className="bg-muted/20 rounded-lg p-3 max-h-28 overflow-y-auto">
        <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Steps</p>
        {steps.map((step, i) => (
          <p key={i} className={`text-xs font-mono ${i === steps.length - 1 ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
            {i + 1}. {step}
          </p>
        ))}
        {steps.length === 0 && <p className="text-xs text-muted-foreground italic">Press Play to start binary search</p>}
      </div>

      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground justify-center">
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-primary/10 border border-primary/40" /> In Range</div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-yellow-400" /> Mid</div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-green-500" /> Found</div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-muted/30 opacity-40 border" /> Eliminated</div>
      </div>
    </div>
  );
};

export default BinarySearchVisualizer;
