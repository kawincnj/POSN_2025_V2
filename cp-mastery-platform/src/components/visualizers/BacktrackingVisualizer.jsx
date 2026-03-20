import React, { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw } from 'lucide-react';

const BacktrackingVisualizer = () => {
  const [n, setN] = useState(6);
  const [board, setBoard] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [solutions, setSolutions] = useState(0);
  const [steps, setSteps] = useState(0);
  const [status, setStatus] = useState('Place N queens so no two attack each other');
  const runRef = useRef(false);

  useEffect(() => {
    reset();
    return () => { runRef.current = false; };
  }, [n]);

  const reset = () => {
    runRef.current = false;
    setBoard(Array(n).fill(-1));
    setIsRunning(false);
    setSolutions(0);
    setSteps(0);
    setStatus('Place N queens so no two attack each other');
  };

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  const isSafe = (queens, row, col) => {
    for (let r = 0; r < row; r++) {
      if (queens[r] === col) return false;
      if (Math.abs(queens[r] - col) === Math.abs(r - row)) return false;
    }
    return true;
  };

  const solve = async () => {
    if (isRunning) return;
    reset();
    await sleep(50);
    setIsRunning(true);
    runRef.current = true;
    let totalSolutions = 0;
    let totalSteps = 0;
    const queens = Array(n).fill(-1);

    const backtrack = async (row) => {
      if (!runRef.current) return;
      if (row === n) {
        totalSolutions++;
        setSolutions(totalSolutions);
        setStatus(`Solution #${totalSolutions} found!`);
        await sleep(800);
        return;
      }

      for (let col = 0; col < n; col++) {
        if (!runRef.current) return;
        totalSteps++;
        setSteps(totalSteps);

        queens[row] = col;
        setBoard([...queens]);

        if (isSafe(queens, row, col)) {
          setStatus(`Row ${row}: trying col ${col} - Safe!`);
          await sleep(totalSolutions === 0 ? 120 : 40);
          await backtrack(row + 1);
          if (!runRef.current) return;
        } else {
          setStatus(`Row ${row}: trying col ${col} - Conflict!`);
          await sleep(totalSolutions === 0 ? 60 : 15);
        }
        queens[row] = -1;
        setBoard([...queens]);
      }
    };

    await backtrack(0);
    if (runRef.current) {
      setStatus(`Done! Found ${totalSolutions} solutions in ${totalSteps} steps.`);
    }
    setIsRunning(false);
    runRef.current = false;
  };

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-xl bg-card">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button onClick={reset} className="p-2 rounded-md hover:bg-accent"><RotateCcw className="w-5 h-5" /></button>
          <button onClick={solve} disabled={isRunning}
            className="p-2 rounded-md hover:bg-accent disabled:opacity-50 text-green-500">
            <Play className="w-5 h-5" />
          </button>
          <label className="text-sm text-muted-foreground">N:</label>
          <select value={n} onChange={e => setN(parseInt(e.target.value))} disabled={isRunning}
            className="h-8 rounded-md border bg-background px-2 text-sm">
            {[4, 5, 6, 7, 8].map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
        <div className="flex gap-4 text-xs text-muted-foreground">
          <span>Solutions: <span className="font-bold text-green-500">{solutions}</span></span>
          <span>Steps: <span className="font-bold text-primary">{steps}</span></span>
        </div>
      </div>

      {/* Chess board */}
      <div className="flex justify-center">
        <div className="inline-grid gap-0" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
          {Array.from({ length: n * n }, (_, idx) => {
            const row = Math.floor(idx / n);
            const col = idx % n;
            const isDark = (row + col) % 2 === 1;
            const hasQueen = board[row] === col;
            const isConflict = hasQueen && !isSafe(board, row, col) && board.slice(0, row).some(c => c >= 0);

            return (
              <div key={idx}
                className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-lg transition-all duration-200 ${
                  isDark ? 'bg-primary/20' : 'bg-card border border-border/50'
                } ${isConflict ? 'bg-red-300 dark:bg-red-900/50' : ''}`}>
                {hasQueen && (
                  <span className={`text-base sm:text-xl transition-all ${isConflict ? 'text-red-600' : 'text-primary'}`}>
                    ♛
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-muted/20 rounded-lg p-3 text-center">
        <p className="text-sm font-mono">{status}</p>
      </div>
    </div>
  );
};

export default BacktrackingVisualizer;
