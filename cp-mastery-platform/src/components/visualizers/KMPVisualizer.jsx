import React, { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw } from 'lucide-react';

const KMPVisualizer = () => {
  const [text, setText] = useState('ABABDABACDABABCABAB');
  const [pattern, setPattern] = useState('ABABCABAB');
  const [textIdx, setTextIdx] = useState(-1);
  const [patIdx, setPatIdx] = useState(-1);
  const [offset, setOffset] = useState(0);
  const [matches, setMatches] = useState([]);
  const [fail, setFail] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState('Enter text and pattern, then press Play');
  const runRef = useRef(false);

  useEffect(() => () => { runRef.current = false; }, []);

  const reset = () => {
    runRef.current = false;
    setTextIdx(-1);
    setPatIdx(-1);
    setOffset(0);
    setMatches([]);
    setFail([]);
    setIsRunning(false);
    setStatus('Enter text and pattern, then press Play');
  };

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  const run = async () => {
    if (isRunning || !text || !pattern) return;
    reset();
    await sleep(50);
    setIsRunning(true);
    runRef.current = true;

    // Build failure function
    const m = pattern.length;
    const f = Array(m).fill(0);
    for (let i = 1; i < m; i++) {
      let j = f[i - 1];
      while (j > 0 && pattern[i] !== pattern[j]) j = f[j - 1];
      if (pattern[i] === pattern[j]) j++;
      f[i] = j;
    }
    setFail(f);
    setStatus('Built failure function: [' + f.join(', ') + ']');
    await sleep(1000);

    // KMP search
    const n = text.length;
    let j = 0;
    const foundMatches = [];

    for (let i = 0; i < n; i++) {
      if (!runRef.current) return;

      while (j > 0 && text[i] !== pattern[j]) {
        setStatus(`Mismatch at text[${i}]='${text[i]}' vs pattern[${j}]='${pattern[j]}'. Jump j=${f[j-1]}`);
        j = f[j - 1];
        setOffset(i - j);
        setPatIdx(j);
        await sleep(300);
      }

      if (text[i] === pattern[j]) {
        j++;
      }

      setTextIdx(i);
      setPatIdx(j);
      setOffset(i - j + 1);

      if (j === m) {
        foundMatches.push(i - m + 1);
        setMatches([...foundMatches]);
        setStatus(`Match found at index ${i - m + 1}!`);
        await sleep(600);
        j = f[j - 1];
        setOffset(i - j + 1);
      } else {
        setStatus(`Comparing text[${i}]='${text[i]}' with pattern[${j > 0 ? j - 1 : 0}]`);
      }

      await sleep(200);
    }

    if (runRef.current) {
      setStatus(`Done! Found ${foundMatches.length} match(es) at positions: [${foundMatches.join(', ')}]`);
    }
    setIsRunning(false);
    runRef.current = false;
  };

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-xl bg-card">
      <div className="flex flex-wrap items-center gap-2">
        <button onClick={reset} className="p-2 rounded-md hover:bg-accent"><RotateCcw className="w-5 h-5" /></button>
        <button onClick={run} disabled={isRunning}
          className="p-2 rounded-md hover:bg-accent disabled:opacity-50 text-green-500">
          <Play className="w-5 h-5" />
        </button>
        <div className="flex-1 flex flex-col gap-1 min-w-0">
          <input value={text} onChange={e => { reset(); setText(e.target.value.toUpperCase()); }}
            placeholder="Text" disabled={isRunning}
            className="h-7 rounded border bg-background px-2 text-xs font-mono w-full" />
          <input value={pattern} onChange={e => { reset(); setPattern(e.target.value.toUpperCase()); }}
            placeholder="Pattern" disabled={isRunning}
            className="h-7 rounded border bg-background px-2 text-xs font-mono w-full" />
        </div>
      </div>

      {/* Text and Pattern alignment */}
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          {/* Index row */}
          <div className="flex gap-0">
            {text.split('').map((_, i) => (
              <div key={`idx-${i}`} className="w-7 text-center text-[9px] text-muted-foreground/60">{i}</div>
            ))}
          </div>
          {/* Text row */}
          <div className="flex gap-0">
            {text.split('').map((ch, i) => {
              const isMatch = matches.some(m => i >= m && i < m + pattern.length);
              const isCurrent = i === textIdx;
              return (
                <div key={`t-${i}`} className={`w-7 h-7 flex items-center justify-center text-xs font-mono font-bold border transition-all duration-200 ${
                  isMatch ? 'bg-green-400 text-green-900 border-green-500' :
                  isCurrent ? 'bg-yellow-300 text-yellow-900 border-yellow-500' :
                  'bg-card border-border'
                }`}>{ch}</div>
              );
            })}
          </div>
          {/* Pattern row (offset) */}
          <div className="flex gap-0 mt-0.5">
            {Array.from({ length: text.length }, (_, i) => {
              const pi = i - offset;
              if (pi >= 0 && pi < pattern.length) {
                const isMatched = pi < patIdx;
                const isCurrent = pi === patIdx - 1 || (pi === patIdx && textIdx >= 0);
                return (
                  <div key={`p-${i}`} className={`w-7 h-7 flex items-center justify-center text-xs font-mono font-bold border transition-all duration-200 ${
                    isMatched ? 'bg-primary/20 border-primary/50 text-primary' :
                    isCurrent ? 'bg-yellow-200 border-yellow-400 text-yellow-800' :
                    'bg-muted/30 border-border'
                  }`}>{pattern[pi]}</div>
                );
              }
              return <div key={`p-${i}`} className="w-7 h-7" />;
            })}
          </div>
        </div>
      </div>

      {/* Failure function */}
      {fail.length > 0 && (
        <div>
          <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Failure Function</p>
          <div className="flex gap-0 justify-center">
            {pattern.split('').map((ch, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-7 h-6 flex items-center justify-center text-[10px] font-mono border bg-card border-border">{ch}</div>
                <div className="w-7 h-6 flex items-center justify-center text-[10px] font-mono font-bold border bg-muted/30 border-border text-primary">{fail[i]}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-muted/20 rounded-lg p-3 text-center">
        <p className="text-xs font-mono">{status}</p>
      </div>

      {matches.length > 0 && (
        <p className="text-xs text-center text-green-500 font-bold">
          Matches at: [{matches.join(', ')}]
        </p>
      )}
    </div>
  );
};

export default KMPVisualizer;
