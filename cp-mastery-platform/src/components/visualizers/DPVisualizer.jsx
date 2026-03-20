import React, { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

const PROBLEMS = {
  fibonacci: {
    name: 'Fibonacci',
    description: 'dp[i] = dp[i-1] + dp[i-2]',
    compute: (n) => {
      const steps = [];
      const dp = Array(n + 1).fill(0);
      dp[0] = 0; dp[1] = 1;
      steps.push({ dp: [...dp], active: [0, 1], msg: 'Base cases: dp[0]=0, dp[1]=1' });
      for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
        steps.push({ dp: [...dp], active: [i], deps: [i - 1, i - 2], msg: `dp[${i}] = dp[${i - 1}] + dp[${i - 2}] = ${dp[i - 1]} + ${dp[i - 2]} = ${dp[i]}` });
      }
      return steps;
    },
    defaultN: 10
  },
  coinChange: {
    name: 'Coin Change',
    description: 'Min coins to make amount (coins: 1, 3, 4)',
    compute: (amount) => {
      const coins = [1, 3, 4];
      const steps = [];
      const dp = Array(amount + 1).fill(Infinity);
      dp[0] = 0;
      steps.push({ dp: dp.map(v => v === Infinity ? '∞' : v), active: [0], msg: 'Base case: dp[0]=0 (0 coins for amount 0)' });
      for (let i = 1; i <= amount; i++) {
        for (const c of coins) {
          if (c <= i && dp[i - c] + 1 < dp[i]) {
            dp[i] = dp[i - c] + 1;
          }
        }
        steps.push({
          dp: dp.map(v => v === Infinity ? '∞' : v),
          active: [i],
          deps: coins.filter(c => c <= i).map(c => i - c),
          msg: `dp[${i}] = ${dp[i] === Infinity ? '∞' : dp[i]} (min coins for amount ${i})`
        });
      }
      return steps;
    },
    defaultN: 10
  },
  lis: {
    name: 'LIS (Longest Increasing Subsequence)',
    description: 'Array: [3, 1, 4, 1, 5, 9, 2, 6]',
    compute: () => {
      const arr = [3, 1, 4, 1, 5, 9, 2, 6];
      const n = arr.length;
      const steps = [];
      const dp = Array(n).fill(1);
      steps.push({ dp: [...dp], arr, active: [0], msg: 'Initialize all dp[i]=1 (each element alone)' });
      for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
          if (arr[j] < arr[i]) {
            dp[i] = Math.max(dp[i], dp[j] + 1);
          }
        }
        steps.push({
          dp: [...dp], arr,
          active: [i],
          deps: Array.from({ length: i }, (_, j) => j).filter(j => arr[j] < arr[i]),
          msg: `dp[${i}] (val=${arr[i]}) = ${dp[i]}`
        });
      }
      return steps;
    },
    defaultN: 8
  }
};

const DPVisualizer = () => {
  const [problem, setProblem] = useState('fibonacci');
  const [steps, setSteps] = useState([]);
  const [stepIdx, setStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const prob = PROBLEMS[problem];
    setSteps(prob.compute(prob.defaultN));
    setStepIdx(0);
    setIsPlaying(false);
  }, [problem]);

  useEffect(() => {
    if (isPlaying && stepIdx < steps.length - 1) {
      intervalRef.current = setTimeout(() => setStepIdx(prev => prev + 1), 600);
    } else {
      setIsPlaying(false);
    }
    return () => clearTimeout(intervalRef.current);
  }, [isPlaying, stepIdx, steps.length]);

  const currentStep = steps[stepIdx] || { dp: [], active: [], msg: '' };

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-xl bg-card">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <select value={problem} onChange={e => setProblem(e.target.value)}
            className="h-8 rounded-md border bg-background px-2 text-sm">
            {Object.entries(PROBLEMS).map(([key, val]) => (
              <option key={key} value={key}>{val.name}</option>
            ))}
          </select>
          <span className="text-xs text-muted-foreground hidden sm:inline">{PROBLEMS[problem].description}</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => { setStepIdx(0); setIsPlaying(false); }}
            className="p-1.5 rounded-md hover:bg-accent"><RotateCcw className="w-4 h-4" /></button>
          <button onClick={() => setStepIdx(Math.max(0, stepIdx - 1))}
            className="p-1.5 rounded-md hover:bg-accent" disabled={stepIdx === 0}>
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={() => { setIsPlaying(!isPlaying); }}
            className="p-1.5 rounded-md hover:bg-accent text-green-500">
            <Play className="w-4 h-4" />
          </button>
          <button onClick={() => setStepIdx(Math.min(steps.length - 1, stepIdx + 1))}
            className="p-1.5 rounded-md hover:bg-accent" disabled={stepIdx >= steps.length - 1}>
            <ChevronRight className="w-4 h-4" />
          </button>
          <span className="text-xs text-muted-foreground ml-2">Step {stepIdx + 1}/{steps.length}</span>
        </div>
      </div>

      {/* Array values (for LIS) */}
      {currentStep.arr && (
        <div className="flex gap-1 justify-center">
          {currentStep.arr.map((val, i) => (
            <div key={`arr-${i}`} className="flex flex-col items-center gap-0.5">
              <span className="text-[10px] text-muted-foreground">arr[{i}]</span>
              <div className="w-10 h-8 flex items-center justify-center rounded border bg-muted/30 text-xs font-mono">
                {val}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DP Table */}
      <div className="flex gap-1 justify-center flex-wrap">
        {currentStep.dp.map((val, i) => {
          const isActive = currentStep.active?.includes(i);
          const isDep = currentStep.deps?.includes(i);
          return (
            <div key={`dp-${i}`} className="flex flex-col items-center gap-0.5">
              <span className="text-[10px] text-muted-foreground">dp[{i}]</span>
              <div className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-bold font-mono transition-all duration-300 border-2 ${
                isActive ? 'bg-primary text-primary-foreground border-primary scale-110 shadow-lg' :
                isDep ? 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-400 text-yellow-700 dark:text-yellow-300' :
                'bg-card border-border'
              }`}>
                {val}
              </div>
            </div>
          );
        })}
      </div>

      {/* Arrows showing dependencies */}
      {currentStep.deps && currentStep.active && (
        <div className="flex justify-center gap-2 text-xs text-muted-foreground">
          {currentStep.deps.map(d => (
            <span key={d} className="px-2 py-0.5 rounded bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300">
              dp[{d}]
            </span>
          ))}
          <span>→</span>
          {currentStep.active.map(a => (
            <span key={a} className="px-2 py-0.5 rounded bg-primary/20 text-primary font-bold">
              dp[{a}]
            </span>
          ))}
        </div>
      )}

      {/* Step message */}
      <div className="bg-muted/20 rounded-lg p-3">
        <p className="text-sm font-mono text-center">{currentStep.msg}</p>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary transition-all duration-300 rounded-full"
          style={{ width: `${((stepIdx + 1) / steps.length) * 100}%` }} />
      </div>
    </div>
  );
};

export default DPVisualizer;
