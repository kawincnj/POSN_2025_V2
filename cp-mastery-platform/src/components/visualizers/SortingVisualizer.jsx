import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw } from 'lucide-react';

const SPEED_MS = {
  slow: 500,
  normal: 200,
  fast: 50,
};

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [speed, setSpeed] = useState('normal');
  
  // State for visualization
  const [activeIndex, setActiveIndex] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  
  const isSortingRef = useRef(false);
  const arrayRef = useRef([]);

  useEffect(() => {
    resetArray();
    return () => {
      isSortingRef.current = false;
    };
  }, []);

  useEffect(() => {
    arrayRef.current = array;
  }, [array]);

  const resetArray = () => {
    isSortingRef.current = false;
    const newArray = Array.from({ length: 15 }, (_, i) => ({
      id: `item-${i}-${Math.random()}`,
      value: Math.floor(Math.random() * 90) + 10
    }));
    setArray(newArray);
    setSortedIndices([]);
    setActiveIndex([]);
    setSorting(false);
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const bubbleSort = async () => {
    if (sorting) return;
    setSorting(true);
    isSortingRef.current = true;
    
    let tempArr = [...arrayRef.current];
    let len = tempArr.length;

    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - i - 1; j++) {
        if (!isSortingRef.current) return;
        
        setActiveIndex([j, j + 1]);
        await sleep(SPEED_MS[speed]);

        if (tempArr[j].value > tempArr[j + 1].value) {
          let t = tempArr[j];
          tempArr[j] = tempArr[j + 1];
          tempArr[j + 1] = t;
          setArray([...tempArr]);
          await sleep(SPEED_MS[speed]);
        }
      }
      setSortedIndices(prev => [...prev, tempArr[len - i - 1].id]);
    }
    
    setSorting(false);
    isSortingRef.current = false;
    setActiveIndex([]);
    setSortedIndices(tempArr.map(item => item.id));
  };

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-xl bg-card">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          <button
            onClick={resetArray}
            className="p-2 rounded-md hover:bg-accent transition-colors"
            title="Reset Array"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          <button
            onClick={bubbleSort}
            disabled={sorting}
            className="p-2 rounded-md hover:bg-accent disabled:opacity-50 text-green-500 transition-colors"
            title="Start Sorting"
          >
            <Play className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Speed:</span>
          <select 
            value={speed} 
            onChange={(e) => setSpeed(e.target.value)}
            className="h-8 rounded-md border border-input bg-background px-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
            disabled={sorting}
          >
            <option value="slow">Slow</option>
            <option value="normal">Normal</option>
            <option value="fast">Fast</option>
          </select>
        </div>
      </div>

      <div className="h-64 flex items-end justify-center gap-1 bg-muted/20 rounded-lg p-4 relative overflow-hidden">
        {array.map((item, idx) => (
          <motion.div
            key={item.id}
            layout
            transition={{ type: "spring", stiffness: 500, damping: 30, mass: 1 }}
            className={`w-8 rounded-t-md flex items-end justify-center pb-1 text-[10px] font-bold text-white transition-colors duration-300 ${
              sortedIndices.includes(item.id) ? 'bg-green-500' :
              activeIndex.includes(idx) ? 'bg-yellow-500' : 'bg-primary'
            }`}
            style={{ height: `${item.value}%` }}
          >
            <span className="sm:inline hidden">{item.value}</span>
          </motion.div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground text-center italic">
        Visualization of Bubble Sort. Stable keys used for smooth animations.
      </p>
    </div>
  );
};

export default SortingVisualizer;
