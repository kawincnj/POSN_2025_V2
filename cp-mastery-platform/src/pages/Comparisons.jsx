import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { topics } from '../data/curriculum';
import { ArrowRight, Check, X, Minus } from 'lucide-react';

const COMPARISONS = [
  {
    id: 'shortest-path',
    title: 'Shortest Path Algorithms',
    description: 'Dijkstra vs Bellman-Ford vs Floyd-Warshall vs BFS',
    columns: ['Feature', 'BFS', "Dijkstra's", 'Bellman-Ford', 'Floyd-Warshall'],
    rows: [
      ['Type', 'SSSP', 'SSSP', 'SSSP', 'All-Pairs'],
      ['Time', 'O(V+E)', 'O((V+E)logV)', 'O(V×E)', 'O(V³)'],
      ['Negative weights', 'no', 'no', 'yes', 'yes'],
      ['Negative cycle detect', 'no', 'no', 'yes', 'yes'],
      ['Weighted graphs', 'no', 'yes', 'yes', 'yes'],
      ['Best for', 'Unweighted', 'Non-negative sparse', 'Negative edges', 'Dense, all pairs'],
      ['Max V', '~10^6', '~10^5', '~10^4', '~400'],
    ],
    topicIds: ['graph-traversal', 'graph-sssp', 'graph-bellman-ford', 'graph-floyd'],
  },
  {
    id: 'sorting',
    title: 'Sorting Algorithms',
    description: 'When to use which sorting method',
    columns: ['Feature', 'std::sort', 'stable_sort', 'nth_element', 'Counting Sort'],
    rows: [
      ['Time', 'O(N log N)', 'O(N log N)', 'O(N) avg', 'O(N+K)'],
      ['Stable', 'no', 'yes', 'no', 'yes'],
      ['In-place', 'yes', 'no', 'yes', 'no'],
      ['Extra space', 'O(log N)', 'O(N)', 'O(1)', 'O(K)'],
      ['Best for', 'General purpose', 'Preserve order', 'K-th element only', 'Small value range'],
    ],
    topicIds: ['ds-sorting'],
  },
  {
    id: 'mst',
    title: 'MST: Kruskal vs Prim',
    description: "When to use Kruskal's vs Prim's algorithm",
    columns: ['Feature', "Kruskal's", "Prim's"],
    rows: [
      ['Time', 'O(E log E)', 'O((V+E) log V)'],
      ['Approach', 'Edge-based (greedy)', 'Vertex-based (greedy)'],
      ['Data structure', 'Union-Find', 'Priority Queue'],
      ['Best for', 'Sparse graphs', 'Dense graphs'],
      ['Input format', 'Edge list', 'Adjacency list'],
      ['Extra', 'Easy to implement', 'Can start from any vertex'],
    ],
    topicIds: ['graph-mst'],
  },
  {
    id: 'dp-approach',
    title: 'Top-Down vs Bottom-Up DP',
    description: 'Memoization vs tabulation approaches',
    columns: ['Feature', 'Top-Down (Memo)', 'Bottom-Up (Tabulation)'],
    rows: [
      ['Approach', 'Recursive + cache', 'Iterative, fill table'],
      ['Ease of writing', 'Usually easier', 'Requires ordering insight'],
      ['Stack overflow risk', 'Yes (deep recursion)', 'No'],
      ['Space optimization', 'Hard', 'Easy (rolling array)'],
      ['Computes all states?', 'Only needed ones', 'All states'],
      ['Speed', 'Slower (function calls)', 'Faster (no overhead)'],
      ['Best for', 'Complex state spaces', 'When all states needed'],
    ],
    topicIds: ['algo-dp-intro'],
  },
  {
    id: 'range-query',
    title: 'Range Query Structures',
    description: 'Prefix Sum vs Fenwick Tree vs Segment Tree vs Sparse Table',
    columns: ['Feature', 'Prefix Sum', 'Fenwick Tree', 'Segment Tree', 'Sparse Table'],
    rows: [
      ['Build', 'O(N)', 'O(N log N)', 'O(N)', 'O(N log N)'],
      ['Point update', 'O(N)', 'O(log N)', 'O(log N)', 'N/A (static)'],
      ['Range query', 'O(1)', 'O(log N)', 'O(log N)', 'O(1)'],
      ['Range update', 'N/A', 'O(log N)*', 'O(log N) (lazy)', 'N/A'],
      ['Supports min/max', 'no', 'no', 'yes', 'yes'],
      ['Space', 'O(N)', 'O(N)', 'O(4N)', 'O(N log N)'],
      ['Best for', 'Static sums', 'Sum with updates', 'Any range op', 'Static min/max'],
    ],
    topicIds: ['ds-fenwick', 'ds-segment-tree'],
  },
  {
    id: 'search-paradigm',
    title: 'Complete Search vs Greedy vs DP',
    description: 'Choosing the right problem-solving paradigm',
    columns: ['Feature', 'Complete Search', 'Greedy', 'Dynamic Programming'],
    rows: [
      ['Guarantee', 'Always correct', 'Needs proof', 'Always correct'],
      ['Speed', 'Slowest', 'Fastest', 'Middle'],
      ['Constraint hint', 'N ≤ 20', 'N ≤ 10^6', 'N ≤ 5000'],
      ['Key property', 'Try everything', 'Greedy choice', 'Optimal substructure'],
      ['Overlapping sub?', 'Yes (wasteful)', 'N/A', 'Yes (cached)'],
      ['Implementation', 'Recursion/bitmask', 'Sort + iterate', 'Table/memoization'],
      ['When to use', 'Small input', 'Proven greedy', 'Overlapping + optimal'],
    ],
    topicIds: ['algo-complete-search', 'algo-greedy', 'algo-dp-intro'],
  },
  {
    id: 'string-matching',
    title: 'String Matching Algorithms',
    description: 'KMP vs Hashing vs Suffix Array',
    columns: ['Feature', 'Naive', 'KMP', 'String Hashing', 'Suffix Array'],
    rows: [
      ['Time', 'O(N×M)', 'O(N+M)', 'O(N+M)', 'O(N log N) build'],
      ['False positives', 'no', 'no', 'Possible (collisions)', 'no'],
      ['Preprocessing', 'None', 'O(M) failure fn', 'O(N) hash build', 'O(N log N)'],
      ['Multiple patterns', 'Slow', 'One at a time', 'O(1) per compare', 'Binary search'],
      ['Best for', 'Simple cases', 'Single pattern', 'Many comparisons', 'Complex queries'],
    ],
    topicIds: ['string-kmp', 'string-basics', 'string-suffix'],
  },
];

const Comparisons = () => {
  const [activeComparison, setActiveComparison] = useState(null);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 py-4">
      <div className="space-y-2">
        <h1 className="text-4xl font-black tracking-tight">Algorithm Comparisons</h1>
        <p className="text-lg text-muted-foreground">Side-by-side comparisons to help you choose the right algorithm.</p>
      </div>

      <div className="space-y-6">
        {COMPARISONS.map(comp => {
          const isOpen = activeComparison === comp.id;
          return (
            <div key={comp.id} className="border rounded-2xl overflow-hidden shadow-sm">
              <button
                onClick={() => setActiveComparison(isOpen ? null : comp.id)}
                className="w-full flex items-center justify-between p-6 bg-card hover:bg-accent/30 transition-colors text-left"
              >
                <div>
                  <h2 className="text-xl font-bold">{comp.title}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{comp.description}</p>
                </div>
                {isOpen ? <X className="w-5 h-5 text-muted-foreground" /> : <ArrowRight className="w-5 h-5 text-muted-foreground" />}
              </button>

              {isOpen && (
                <div className="border-t bg-card">
                  <div className="overflow-x-auto p-4">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          {comp.columns.map((col, i) => (
                            <th key={i} className={`py-3 px-4 text-left font-bold ${i === 0 ? 'text-muted-foreground' : 'text-primary'}`}>
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {comp.rows.map((row, i) => (
                          <tr key={i} className="border-b last:border-0 hover:bg-accent/20 transition-colors">
                            {row.map((cell, j) => (
                              <td key={j} className={`py-3 px-4 ${j === 0 ? 'font-semibold text-muted-foreground' : ''} ${
                                cell === 'yes' ? 'text-green-600 dark:text-green-400 font-bold' :
                                cell === 'no' ? 'text-red-500 dark:text-red-400' :
                                cell === 'N/A' ? 'text-muted-foreground italic' : ''
                              }`}>
                                {cell === 'yes' ? <Check className="w-4 h-4 inline" /> :
                                 cell === 'no' ? <X className="w-4 h-4 inline" /> :
                                 cell === 'N/A' ? <Minus className="w-4 h-4 inline" /> :
                                 cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {comp.topicIds.length > 0 && (
                    <div className="px-6 pb-4 flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-muted-foreground font-medium">Related:</span>
                      {comp.topicIds.map(tid => {
                        const t = topics.find(x => x.id === tid);
                        return t ? (
                          <Link key={tid} to={`/topic/${tid}`} className="text-xs font-semibold text-primary hover:underline bg-primary/5 px-2 py-1 rounded-lg">
                            {t.title}
                          </Link>
                        ) : null;
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comparisons;
