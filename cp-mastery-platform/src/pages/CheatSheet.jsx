import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { topics, categories } from '../data/curriculum';
import { Clock, Copy, Check, ChevronDown, ChevronUp, Search, Filter } from 'lucide-react';

const COMPLEXITY_TABLE = [
  { n: 'N ≤ 10', complexity: 'O(N!)', techniques: 'Permutation, Backtracking' },
  { n: 'N ≤ 20', complexity: 'O(2^N)', techniques: 'Bitmask DP, Backtracking with pruning' },
  { n: 'N ≤ 100', complexity: 'O(N^3)', techniques: 'Floyd-Warshall, Matrix multiplication' },
  { n: 'N ≤ 500', complexity: 'O(N^3)', techniques: 'DP on intervals, some graph algorithms' },
  { n: 'N ≤ 5,000', complexity: 'O(N^2)', techniques: 'Simple DP, brute force pairs' },
  { n: 'N ≤ 100,000', complexity: 'O(N log N)', techniques: 'Sorting, Segment Tree, Binary Search' },
  { n: 'N ≤ 1,000,000', complexity: 'O(N)', techniques: 'Linear scan, two pointers, hashing' },
  { n: 'N ≤ 10^9', complexity: 'O(log N) or O(1)', techniques: 'Binary Search, Math formula' },
  { n: 'N ≤ 10^18', complexity: 'O(log N)', techniques: 'Fast exponentiation, Binary Search' },
];

const DS_REFERENCE = [
  { name: 'Array / Vector', ops: 'Access O(1), Push O(1)*, Insert O(N)', use: 'General storage, adjacency lists' },
  { name: 'Stack', ops: 'Push/Pop O(1)', use: 'DFS, expression parsing, monotonic stack' },
  { name: 'Queue', ops: 'Push/Pop O(1)', use: 'BFS, level-order traversal' },
  { name: 'Deque', ops: 'Push/Pop both ends O(1)', use: 'Sliding window min/max, 0-1 BFS' },
  { name: 'Priority Queue', ops: 'Push/Pop O(log N)', use: 'Dijkstra, greedy, K-th element' },
  { name: 'Set / Map', ops: 'Insert/Find/Erase O(log N)', use: 'Sorted storage, coordinate compression' },
  { name: 'Unordered Set/Map', ops: 'Insert/Find/Erase O(1) avg', use: 'Hash counting, memoization' },
  { name: 'Union-Find (DSU)', ops: 'Find/Union O(α(N)) ≈ O(1)', use: 'Connectivity, Kruskal MST' },
  { name: 'Segment Tree', ops: 'Update/Query O(log N)', use: 'Range sum/min/max with updates' },
  { name: 'Fenwick Tree (BIT)', ops: 'Update/Query O(log N)', use: 'Prefix sums with updates, inversions' },
];

const ALGO_REFERENCE = [
  { category: 'Sorting', algorithms: [
    { name: 'std::sort', time: 'O(N log N)', space: 'O(log N)', topicId: 'ds-sorting' },
    { name: 'Counting Sort', time: 'O(N + K)', space: 'O(K)', topicId: 'ds-sorting' },
  ]},
  { category: 'Searching', algorithms: [
    { name: 'Binary Search', time: 'O(log N)', space: 'O(1)', topicId: 'algo-dnc' },
    { name: 'Linear Search', time: 'O(N)', space: 'O(1)', topicId: null },
  ]},
  { category: 'Graph Traversal', algorithms: [
    { name: 'BFS', time: 'O(V + E)', space: 'O(V)', topicId: 'graph-traversal' },
    { name: 'DFS', time: 'O(V + E)', space: 'O(V)', topicId: 'graph-traversal' },
    { name: 'Topological Sort', time: 'O(V + E)', space: 'O(V)', topicId: 'graph-topo-sort' },
  ]},
  { category: 'Shortest Path', algorithms: [
    { name: 'BFS (unweighted)', time: 'O(V + E)', space: 'O(V)', topicId: 'graph-traversal' },
    { name: "Dijkstra's", time: 'O((V+E) log V)', space: 'O(V)', topicId: 'graph-sssp' },
    { name: 'Bellman-Ford', time: 'O(V × E)', space: 'O(V)', topicId: 'graph-bellman-ford' },
    { name: 'Floyd-Warshall', time: 'O(V³)', space: 'O(V²)', topicId: 'graph-floyd' },
    { name: '0-1 BFS', time: 'O(V + E)', space: 'O(V)', topicId: 'graph-traversal' },
  ]},
  { category: 'MST', algorithms: [
    { name: "Kruskal's", time: 'O(E log E)', space: 'O(V)', topicId: 'graph-mst' },
    { name: "Prim's", time: 'O((V+E) log V)', space: 'O(V)', topicId: 'graph-mst' },
  ]},
  { category: 'Dynamic Programming', algorithms: [
    { name: 'Fibonacci / Linear DP', time: 'O(N)', space: 'O(N) or O(1)', topicId: 'algo-dp-intro' },
    { name: '0/1 Knapsack', time: 'O(N × W)', space: 'O(N × W)', topicId: 'algo-dp-intro' },
    { name: 'LIS', time: 'O(N log N)', space: 'O(N)', topicId: 'algo-dp-advanced' },
    { name: 'Bitmask DP', time: 'O(2^N × N)', space: 'O(2^N × N)', topicId: 'algo-dp-advanced' },
  ]},
  { category: 'String', algorithms: [
    { name: 'KMP', time: 'O(N + M)', space: 'O(M)', topicId: 'string-kmp' },
    { name: 'String Hashing', time: 'O(N) build, O(1) query', space: 'O(N)', topicId: 'string-basics' },
    { name: 'Suffix Array', time: 'O(N log N)', space: 'O(N)', topicId: 'string-suffix' },
    { name: 'Edit Distance', time: 'O(N × M)', space: 'O(N × M)', topicId: 'string-dp' },
  ]},
  { category: 'Math', algorithms: [
    { name: 'Sieve of Eratosthenes', time: 'O(N log log N)', space: 'O(N)', topicId: 'math-primes' },
    { name: 'GCD (Euclidean)', time: 'O(log N)', space: 'O(1)', topicId: 'math-gcd-mod' },
    { name: 'Fast Exponentiation', time: 'O(log N)', space: 'O(1)', topicId: 'math-gcd-mod' },
    { name: 'nCr (precomputed)', time: 'O(1) query', space: 'O(N)', topicId: 'math-combinatorics' },
  ]},
];

const CheatSheet = () => {
  const [filter, setFilter] = useState('');
  const [expandedSections, setExpandedSections] = useState(['complexity', 'ds', 'algo']);

  const toggleSection = (id) => {
    setExpandedSections(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const Section = ({ id, title, children, count }) => {
    const isOpen = expandedSections.includes(id);
    return (
      <div className="border rounded-2xl overflow-hidden">
        <button
          onClick={() => toggleSection(id)}
          className="w-full flex items-center justify-between p-5 bg-card hover:bg-accent/30 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold">{title}</h2>
            {count && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">{count}</span>}
          </div>
          {isOpen ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
        </button>
        {isOpen && <div className="p-5 border-t bg-card">{children}</div>}
      </div>
    );
  };

  const filteredAlgoRef = filter
    ? ALGO_REFERENCE.map(cat => ({
        ...cat,
        algorithms: cat.algorithms.filter(a =>
          a.name.toLowerCase().includes(filter.toLowerCase()) ||
          cat.category.toLowerCase().includes(filter.toLowerCase())
        )
      })).filter(cat => cat.algorithms.length > 0)
    : ALGO_REFERENCE;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 py-4">
      <div className="space-y-2">
        <h1 className="text-4xl font-black tracking-tight">Cheat Sheet</h1>
        <p className="text-lg text-muted-foreground">Quick reference for all complexities, data structures, and algorithms.</p>
      </div>

      {/* Filter */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Filter algorithms..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full h-9 pl-9 pr-4 rounded-lg border bg-background text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Complexity Cheat Sheet */}
      <Section id="complexity" title="Constraint → Complexity Guide" count={COMPLEXITY_TABLE.length}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-bold">Constraint</th>
                <th className="text-left py-3 px-4 font-bold">Max Complexity</th>
                <th className="text-left py-3 px-4 font-bold">Typical Techniques</th>
              </tr>
            </thead>
            <tbody>
              {COMPLEXITY_TABLE.map((row, i) => (
                <tr key={i} className="border-b last:border-0 hover:bg-accent/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-primary">{row.n}</td>
                  <td className="py-3 px-4 font-mono">{row.complexity}</td>
                  <td className="py-3 px-4 text-muted-foreground">{row.techniques}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Data Structures */}
      <Section id="ds" title="Data Structure Reference" count={DS_REFERENCE.length}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-bold">Structure</th>
                <th className="text-left py-3 px-4 font-bold">Key Operations</th>
                <th className="text-left py-3 px-4 font-bold">Common Use</th>
              </tr>
            </thead>
            <tbody>
              {DS_REFERENCE.map((row, i) => (
                <tr key={i} className="border-b last:border-0 hover:bg-accent/30 transition-colors">
                  <td className="py-3 px-4 font-semibold">{row.name}</td>
                  <td className="py-3 px-4 font-mono text-xs">{row.ops}</td>
                  <td className="py-3 px-4 text-muted-foreground text-xs">{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Algorithm Reference */}
      <Section id="algo" title="Algorithm Reference" count={ALGO_REFERENCE.reduce((s, c) => s + c.algorithms.length, 0)}>
        <div className="space-y-6">
          {filteredAlgoRef.map(cat => (
            <div key={cat.category}>
              <h3 className="text-sm font-black uppercase tracking-wider text-muted-foreground mb-3">{cat.category}</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-4 font-bold">Algorithm</th>
                      <th className="text-left py-2 px-4 font-bold">Time</th>
                      <th className="text-left py-2 px-4 font-bold">Space</th>
                      <th className="text-left py-2 px-4 font-bold"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cat.algorithms.map((algo, i) => (
                      <tr key={i} className="border-b last:border-0 hover:bg-accent/30 transition-colors">
                        <td className="py-2 px-4 font-semibold">{algo.name}</td>
                        <td className="py-2 px-4 font-mono text-xs text-primary">{algo.time}</td>
                        <td className="py-2 px-4 font-mono text-xs">{algo.space}</td>
                        <td className="py-2 px-4">
                          {algo.topicId && (
                            <Link to={`/topic/${algo.topicId}`} className="text-xs text-primary hover:underline font-medium">
                              Learn →
                            </Link>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default CheatSheet;
