import { topicEnhancements } from './topicEnhancements';

export const categories = [
  {
    id: 'intro',
    title: 'Introduction to CP',
    icon: 'Rocket',
    description: 'Tips, tricks, and competitive programming techniques to get started.'
  },
  {
    id: 'ds',
    title: 'Data Structures',
    icon: 'Database',
    description: 'Libraries and custom structures for organizing data efficiently.'
  },
  {
    id: 'algo',
    title: 'Problem Solving Paradigms',
    icon: 'Zap',
    description: 'Complete Search, Divide & Conquer, Greedy, and Dynamic Programming.'
  },
  {
    id: 'graph',
    title: 'Graph Algorithms',
    icon: 'Share2',
    description: 'Traversal, Shortest Paths, MST, Max Flow, and Special Graphs.'
  },
  {
    id: 'math',
    title: 'Mathematics',
    icon: 'Calculator',
    description: 'Number Theory, Combinatorics, Probability, and Game Theory.'
  },
  {
    id: 'string',
    title: 'String Processing',
    icon: 'Type',
    description: 'String matching, alignment, and suffix structures.'
  },
  {
    id: 'geometry',
    title: 'Computational Geometry',
    icon: 'Triangle',
    description: 'Points, Lines, Circles, Polygons, and Convex Hulls.'
  },
  {
    id: 'advanced',
    title: 'Advanced Topics',
    icon: 'Sparkles',
    description: 'Problem Decomposition, Advanced Search (A*, IDA*), and more.'
  }
];

const _rawTopics = [
  // ==========================================
  // Chapter 1: Introduction to CP
  // ==========================================
  {
    id: 'intro-getting-started',
    categoryId: 'intro',
    title: 'Getting Started in CP',
    difficulty: 'Beginner',
    description: 'Competitive Programming overview: types of problems, online judges, and tips.',
    content: `### What is Competitive Programming?
Competitive Programming (CP) is a mind sport where contestants solve well-defined algorithmic problems within time and memory limits.

### Types of Problems
- **Ad Hoc**: No standard algorithm needed, just careful implementation.
- **Complete Search (Brute Force)**: Try all possibilities.
- **Divide & Conquer**: Split problem, solve halves, combine.
- **Greedy**: Make locally optimal choices.
- **Dynamic Programming**: Overlapping subproblems with optimal substructure.
- **Graph**: Model problem as a graph and apply graph algorithms.
- **Mathematics**: Number theory, combinatorics, geometry.
- **String Processing**: Pattern matching, suffix structures.

### Tips for Success
1. **Read the problem carefully** — reread until you understand all constraints.
2. **Identify the problem type** — classify before coding.
3. **Estimate complexity** — ensure your solution fits within time limit. A modern computer can do ~100M–400M simple operations per second.
4. **Code incrementally** — test with sample inputs first.
5. **Use appropriate I/O** — \`scanf/printf\` in C++ is faster than \`cin/cout\`.

### Complexity Cheat Sheet
- N ≤ 20: O(2^N) or O(N! ) — backtracking, bitmask DP
- N ≤ 100: O(N^3) — Floyd-Warshall, matrix operations
- N ≤ 1,000: O(N^2) — simple DP, brute force pairs
- N ≤ 100,000: O(N log N) — sorting, segment trees
- N ≤ 1,000,000: O(N) — linear scans, counting
- N ≤ 10^9: O(log N) or O(1) — binary search, math formulas`,
    visualizer: 'none',
    code: `// Fast I/O Template for Competitive Programming
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
typedef pair<int,int> ii;
typedef vector<int> vi;
typedef vector<ii> vii;

#define REP(i,a,b) for(int i=(a);i<(b);i++)
#define pb push_back
#define all(x) (x).begin(),(x).end()
#define sz(x) (int)(x).size()

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // Your solution here

    return 0;
}`
  },
  {
    id: 'intro-io-tricks',
    categoryId: 'intro',
    title: 'I/O & Common Tricks',
    difficulty: 'Beginner',
    description: 'Fast I/O, common macros, and debugging techniques for CP.',
    content: `### Fast I/O
- C++: Use \`ios_base::sync_with_stdio(false); cin.tie(NULL);\`
- Or use \`scanf/printf\` for even faster I/O.
- Java: Use \`BufferedReader\` instead of \`Scanner\`.

### Useful Macros & Typedefs
- \`typedef long long ll;\` — avoid overflow for large numbers.
- \`typedef pair<int,int> ii;\` — common pair shorthand.
- \`#define REP(i,a,b) for(int i=(a);i<(b);i++)\`

### Overflow Prevention
- For N up to 10^9, use \`long long\` (64-bit).
- Be careful with intermediate multiplication: \`(a * b) % MOD\` can overflow if a,b are int.

### Common Pitfalls
- **Off-by-one errors**: Array indexing, loop bounds.
- **Uninitialized variables**: Always initialize arrays.
- **Integer overflow**: Use \`long long\` when needed.
- **Wrong data type**: \`int\` vs \`long long\`, \`float\` vs \`double\`.

### Debugging Tips
- Print intermediate values to stderr: \`cerr << "debug: " << x << endl;\`
- Use assertions: \`assert(x >= 0);\`
- Test with edge cases: empty input, maximum values, minimum values.`,
    visualizer: 'none',
    code: `// Debug macro (remove before submission)
#ifdef LOCAL
#define debug(x) cerr << #x << " = " << (x) << endl
#define debugv(v) { cerr << #v << " = ["; for(auto& x : v) cerr << x << " "; cerr << "]" << endl; }
#else
#define debug(x)
#define debugv(v)
#endif

// Overflow-safe multiplication under modulo
ll mulmod(ll a, ll b, ll mod) {
    return ((__int128)a * b) % mod;
}

// Reading until EOF
int x;
while (scanf("%d", &x) != EOF) {
    // process x
}

// Reading number of test cases
int T;
scanf("%d", &T);
while (T--) {
    // solve each test case
}`
  },

  // ==========================================
  // Chapter 2: Data Structures
  // ==========================================
  {
    id: 'ds-linear',
    categoryId: 'ds',
    title: 'Linear Data Structures',
    difficulty: 'Beginner',
    description: 'Arrays, vectors, linked lists, stacks, queues, and deques.',
    content: `### Static & Dynamic Arrays
- **Static Array**: \`int arr[100];\` — fixed size, O(1) access.
- **Dynamic Array**: \`vector<int> v;\` — resizable, amortized O(1) push_back.

### Bitmask (Lightweight Set)
Using an integer to represent a set of booleans. Each bit represents presence/absence.
- **Set bit**: \`S |= (1 << j)\`
- **Check bit**: \`T = S & (1 << j)\`
- **Clear bit**: \`S &= ~(1 << j)\`
- **Toggle bit**: \`S ^= (1 << j)\`
- **Lowest set bit**: \`S & (-S)\`
- **Count set bits**: \`__builtin_popcount(S)\`

### Stack (LIFO)
- Push/Pop from top in O(1). Used in DFS, expression evaluation, backtracking.

### Queue (FIFO)
- Push to back, pop from front in O(1). Used in BFS.

### Deque (Double-Ended Queue)
- Push/Pop from both ends in O(1). Used in sliding window problems.

### Linked List
- Rarely needed in CP. Use \`std::list\` if needed for O(1) insertion/deletion with iterator.`,
    visualizer: 'none',
    code: `// Common Bitmask operations
int setBit(int S, int j) { return S | (1 << j); }
bool isSet(int S, int j) { return (S >> j) & 1; }
int clearBit(int S, int j) { return S & ~(1 << j); }
int toggleBit(int S, int j) { return S ^ (1 << j); }
int lowBit(int S) { return S & -S; }
int countBits(int S) { return __builtin_popcount(S); }

// Iterate over all subsets of a bitmask
for (int subset = S; subset > 0; subset = (subset - 1) & S) {
    // process subset
}

// Stack usage example
stack<int> st;
st.push(10); st.push(20);
int top = st.top(); st.pop();

// Queue usage example
queue<int> q;
q.push(10); q.push(20);
int front = q.front(); q.pop();

// Deque usage example (sliding window min/max)
deque<int> dq;
dq.push_back(10); dq.push_front(5);
int f = dq.front(); dq.pop_front();`
  },
  {
    id: 'ds-sorting',
    categoryId: 'ds',
    title: 'Sorting Algorithms',
    difficulty: 'Beginner',
    description: 'Bubble Sort, Merge Sort, and using STL sort with custom comparators.',
    content: `### Why Sorting Matters
Many problems become much easier after sorting. Sorting is O(N log N) and is a building block for many algorithms.

### Bubble Sort — O(N²)
Compare adjacent elements and swap if out of order. Simple but slow.

### Merge Sort — O(N log N)
Divide array in half, sort each half recursively, then merge. Stable sort.

### STL Sort — O(N log N)
C++ \`std::sort\` uses IntroSort (hybrid of QuickSort, HeapSort, InsertionSort). Always prefer this in CP.

### Custom Comparators
Use a lambda or comparison function to sort by custom criteria.

### Counting Sort — O(N + K)
When values are in a small range [0, K), count occurrences. Linear time.

### When to Use What
- **General purpose**: \`std::sort\` or \`std::stable_sort\`
- **Partial sort**: \`std::nth_element\` for O(N) average
- **Already nearly sorted**: Insertion sort or \`std::sort\` (handles this well)`,
    visualizer: 'sorting',
    code: `// STL Sort with custom comparator
vector<int> v = {5, 2, 8, 1, 9};
sort(v.begin(), v.end()); // ascending
sort(v.begin(), v.end(), greater<int>()); // descending

// Sort pairs by second element
vector<pair<int,int>> vp = {{1,3},{2,1},{3,2}};
sort(vp.begin(), vp.end(), [](const auto& a, const auto& b) {
    return a.second < b.second;
});

// Sort struct
struct Event {
    int start, end;
    bool operator<(const Event& o) const {
        return end < o.end; // sort by end time (greedy)
    }
};

// Counting Sort
void countingSort(vector<int>& arr, int maxVal) {
    vector<int> count(maxVal + 1, 0);
    for (int x : arr) count[x]++;
    int idx = 0;
    for (int i = 0; i <= maxVal; i++)
        while (count[i]--) arr[idx++] = i;
}`
  },
  {
    id: 'ds-stl',
    categoryId: 'ds',
    title: 'STL: Maps, Sets, Priority Queues',
    difficulty: 'Beginner',
    description: 'C++ STL containers: map, set, unordered variants, and priority_queue.',
    content: `### Balanced BST: map / set
- \`std::map<K,V>\` — sorted key-value pairs. O(log N) insert/find/erase.
- \`std::set<T>\` — sorted unique elements. O(log N) operations.
- \`std::multiset<T>\` — allows duplicates.

### Hash Table: unordered_map / unordered_set
- O(1) average insert/find/erase. But O(N) worst case.
- Use when you don't need sorted order.

### Priority Queue (Heap)
- \`priority_queue<int>\` — max-heap by default.
- \`priority_queue<int, vector<int>, greater<int>>\` — min-heap.
- O(log N) push/pop, O(1) top.

### When to Use What
- Need sorted order or lower_bound/upper_bound → \`map\` / \`set\`
- Need fast lookup only → \`unordered_map\` / \`unordered_set\`
- Need min/max element quickly → \`priority_queue\`
- Need both min and max → \`set\` with \`begin()\` and \`rbegin()\``,
    visualizer: 'none',
    code: `// Map example
map<string, int> freq;
freq["hello"]++;
if (freq.count("hello")) cout << freq["hello"];

// Set with lower_bound
set<int> s = {1, 3, 5, 7, 9};
auto it = s.lower_bound(4); // points to 5
auto it2 = s.upper_bound(5); // points to 7

// Priority Queue (Min-Heap for Dijkstra)
priority_queue<pair<int,int>, vector<pair<int,int>>, greater<pair<int,int>>> pq;
pq.push({0, start});
while (!pq.empty()) {
    auto [dist, node] = pq.top(); pq.pop();
    // process...
}

// Multiset (can erase one occurrence)
multiset<int> ms = {1, 2, 2, 3};
ms.erase(ms.find(2)); // removes ONE 2, not all
// ms is now {1, 2, 3}

// Unordered map (faster but unordered)
unordered_map<int, int> mp;
mp[42] = 100;`
  },
  {
    id: 'ds-union-find',
    categoryId: 'ds',
    title: 'Union-Find Disjoint Sets (UFDS)',
    difficulty: 'Intermediate',
    description: 'Efficiently manage disjoint sets with union by rank and path compression.',
    content: `### The Problem
Given N items, dynamically group them into disjoint sets and answer: "Are items i and j in the same set?"

### Operations
1. **Find(i)**: Return the representative (root) of the set containing i.
2. **Union(i, j)**: Merge the sets containing i and j.

### Optimizations
- **Path Compression**: During Find, make every node point directly to root. Flattens the tree.
- **Union by Rank**: Attach the shorter tree under the root of the taller tree.
- With both optimizations: nearly O(1) amortized per operation (inverse Ackermann).

### Applications
- Kruskal's MST algorithm
- Connected components in dynamic graphs
- Checking if adding an edge creates a cycle
- Network connectivity queries`,
    visualizer: 'unionfind',
    code: `struct UnionFind {
    vector<int> p, rank_, size_;
    int components;

    UnionFind(int n) : components(n) {
        rank_.assign(n, 0);
        size_.assign(n, 1);
        p.resize(n);
        iota(p.begin(), p.end(), 0); // p[i] = i
    }

    int find(int i) {
        return (p[i] == i) ? i : (p[i] = find(p[i])); // path compression
    }

    bool same(int i, int j) {
        return find(i) == find(j);
    }

    void unite(int i, int j) {
        int x = find(i), y = find(j);
        if (x == y) return;
        if (rank_[x] < rank_[y]) swap(x, y);
        p[y] = x;                    // union by rank
        size_[x] += size_[y];
        if (rank_[x] == rank_[y]) rank_[x]++;
        components--;
    }

    int getSize(int i) { return size_[find(i)]; }
};`
  },
  {
    id: 'ds-segment-tree',
    categoryId: 'ds',
    title: 'Segment Tree',
    difficulty: 'Advanced',
    description: 'Range queries (sum, min, max) and point/range updates in O(log N).',
    content: `### Concept
A binary tree where each node stores information about a range [L, R] of the original array.
- **Root**: stores info for [0, N-1]
- **Leaves**: store individual elements [i, i]
- **Internal nodes**: merge info from children

### Operations (all O(log N))
1. **Build**: Construct tree from array in O(N).
2. **Point Update**: Change one element and update affected nodes.
3. **Range Query**: Query aggregate (sum/min/max) over [L, R].

### Lazy Propagation
For **range updates** (e.g., add value to all elements in [L, R]):
- Store pending updates in lazy array.
- Push updates down only when needed.
- Enables O(log N) range updates + range queries.

### Common Uses
- Range Sum Query (RSQ)
- Range Minimum/Maximum Query (RMQ)
- Count of elements in range
- Range assignment / addition with lazy propagation`,
    visualizer: 'segmenttree',
    code: `class SegTree {
    int n;
    vector<long long> tree, lazy;

    void build(vector<int>& a, int v, int tl, int tr) {
        if (tl == tr) { tree[v] = a[tl]; return; }
        int tm = (tl + tr) / 2;
        build(a, 2*v, tl, tm);
        build(a, 2*v+1, tm+1, tr);
        tree[v] = tree[2*v] + tree[2*v+1];
    }

    void push(int v, int tl, int tr) {
        if (lazy[v]) {
            int tm = (tl + tr) / 2;
            apply(2*v, tl, tm, lazy[v]);
            apply(2*v+1, tm+1, tr, lazy[v]);
            lazy[v] = 0;
        }
    }

    void apply(int v, int tl, int tr, long long val) {
        tree[v] += val * (tr - tl + 1);
        lazy[v] += val;
    }

    void update(int v, int tl, int tr, int l, int r, long long val) {
        if (l > tr || r < tl) return;
        if (l <= tl && tr <= r) { apply(v, tl, tr, val); return; }
        push(v, tl, tr);
        int tm = (tl + tr) / 2;
        update(2*v, tl, tm, l, r, val);
        update(2*v+1, tm+1, tr, l, r, val);
        tree[v] = tree[2*v] + tree[2*v+1];
    }

    long long query(int v, int tl, int tr, int l, int r) {
        if (l > tr || r < tl) return 0;
        if (l <= tl && tr <= r) return tree[v];
        push(v, tl, tr);
        int tm = (tl + tr) / 2;
        return query(2*v, tl, tm, l, r) + query(2*v+1, tm+1, tr, l, r);
    }

public:
    SegTree(vector<int>& a) : n(a.size()), tree(4*a.size()), lazy(4*a.size(), 0) {
        build(a, 1, 0, n-1);
    }
    void update(int l, int r, long long val) { update(1, 0, n-1, l, r, val); }
    long long query(int l, int r) { return query(1, 0, n-1, l, r); }
};`
  },
  {
    id: 'ds-fenwick',
    categoryId: 'ds',
    title: 'Fenwick Tree (BIT)',
    difficulty: 'Advanced',
    description: 'Binary Indexed Tree for prefix sums and point updates in O(log N).',
    content: `### Concept
A Fenwick Tree (Binary Indexed Tree) is a compact data structure for:
- **Point update**: Add a value to element at index i.
- **Prefix query**: Compute sum of elements from index 1 to i.
- Both operations in O(log N).

### How It Works
Each index i is responsible for a range of elements determined by the lowest set bit of i.
- \`i & (-i)\` gives the lowest set bit — this determines the range size.
- To query prefix sum: walk from i toward 0, subtracting lowest bit each time.
- To update: walk from i toward N, adding lowest bit each time.

### Advantages over Segment Tree
- Much simpler to implement (10 lines vs 50+).
- Uses only N+1 space (vs 4N for segment tree).
- Faster constant factor.

### Limitations
- Can only do prefix queries (not arbitrary range min/max without modifications).
- For range sum: query(r) - query(l-1).`,
    visualizer: 'fenwick',
    code: `class FenwickTree {
    vector<int> ft;
    int n;
public:
    FenwickTree(int n) : n(n), ft(n + 1, 0) {}

    // Add val to index i (1-indexed)
    void update(int i, int val) {
        for (; i <= n; i += i & (-i))
            ft[i] += val;
    }

    // Sum from index 1 to i (1-indexed)
    int query(int i) {
        int sum = 0;
        for (; i > 0; i -= i & (-i))
            sum += ft[i];
        return sum;
    }

    // Sum from index l to r (1-indexed)
    int query(int l, int r) {
        return query(r) - query(l - 1);
    }
};

// Usage: Count inversions
int countInversions(vector<int>& a) {
    int n = a.size(), inv = 0;
    FenwickTree ft(n);
    // Coordinate compress a first...
    for (int i = n - 1; i >= 0; i--) {
        inv += ft.query(a[i] - 1);
        ft.update(a[i], 1);
    }
    return inv;
}`
  },

  // ==========================================
  // Chapter 3: Problem Solving Paradigms
  // ==========================================
  {
    id: 'algo-complete-search',
    categoryId: 'algo',
    title: 'Complete Search (Brute Force)',
    difficulty: 'Beginner',
    description: 'Iterative and recursive complete search, pruning, and backtracking.',
    content: `### What is Complete Search?
Try all possible solutions and pick the best/valid one. Also called "brute force."

### When to Use
- When N is small enough (N ≤ ~20 for exponential, N ≤ ~8 for factorial).
- When no greedy/DP solution exists or is hard to prove.
- As a first approach to verify correctness of optimized solutions.

### Iterative Complete Search
- Nested loops for small search spaces.
- Example: 2-sum problem with O(N²).

### Recursive Complete Search (Backtracking)
- Build solution incrementally, abandoning partial solutions that can't lead to valid results.
- Classic problems: N-Queens, Sudoku solver, generating permutations/subsets.

### Pruning
- Skip branches early if they can't improve the current best.
- Can turn exponential into manageable time for many practical inputs.

### Bitmask Enumeration
- Enumerate all 2^N subsets using integers from 0 to 2^N - 1.
- Each bit represents whether an element is included.`,
    visualizer: 'backtracking',
    code: `// Generate all subsets using bitmask
void allSubsets(int n) {
    for (int mask = 0; mask < (1 << n); mask++) {
        // mask represents a subset
        for (int i = 0; i < n; i++)
            if (mask & (1 << i))
                printf("%d ", i);
        printf("\\n");
    }
}

// Generate all permutations
void permutations(vector<int>& arr, int l) {
    if (l == arr.size()) {
        // process permutation in arr
        return;
    }
    for (int i = l; i < arr.size(); i++) {
        swap(arr[l], arr[i]);
        permutations(arr, l + 1);
        swap(arr[l], arr[i]); // backtrack
    }
}

// N-Queens (Backtracking with pruning)
int row[20], ans = 0;
bool col[20], diag1[40], diag2[40];

void solve(int r, int n) {
    if (r == n) { ans++; return; }
    for (int c = 0; c < n; c++) {
        if (!col[c] && !diag1[r-c+n] && !diag2[r+c]) {
            col[c] = diag1[r-c+n] = diag2[r+c] = true;
            row[r] = c;
            solve(r + 1, n);
            col[c] = diag1[r-c+n] = diag2[r+c] = false;
        }
    }
}`
  },
  {
    id: 'algo-dnc',
    categoryId: 'algo',
    title: 'Divide and Conquer',
    difficulty: 'Intermediate',
    description: 'Binary Search, Bisection Method, and D&C strategies.',
    content: `### Binary Search on Sorted Array
Search for a target in a sorted array in O(log N).

### Binary Search the Answer (Bisection)
If a function \`f(x)\` is monotonic (e.g., boolean: TTTTT...FFFFF), we can binary search for the boundary.
- Define a \`can(x)\` function that returns true/false.
- Binary search on the answer space.

### Classic Applications
- Finding the minimum value that satisfies a condition.
- Maximizing the minimum (e.g., "aggressive cows" — place cows to maximize minimum distance).
- Minimizing the maximum (e.g., divide array into K parts to minimize max sum).

### D&C on Arrays
- **Merge Sort**: O(N log N) sorting.
- **Count inversions**: Modified merge sort.
- **Closest pair of points**: O(N log N) with D&C.

### Tips
- Be careful with integer overflow in \`(low + high) / 2\` — use \`low + (high - low) / 2\`.
- For real-valued binary search, iterate ~100 times instead of using epsilon.`,
    visualizer: 'binarysearch',
    code: `// Binary Search the Answer
// Find minimum x in [lo, hi] such that can(x) is true
long long binarySearchAnswer(long long lo, long long hi) {
    long long ans = hi;
    while (lo <= hi) {
        long long mid = lo + (hi - lo) / 2;
        if (can(mid)) {
            ans = mid;
            hi = mid - 1;
        } else {
            lo = mid + 1;
        }
    }
    return ans;
}

// Binary search in STL
vector<int> v = {1, 3, 5, 7, 9};
bool found = binary_search(v.begin(), v.end(), 5);
auto it = lower_bound(v.begin(), v.end(), 4); // first >= 4 → points to 5
auto it2 = upper_bound(v.begin(), v.end(), 5); // first > 5 → points to 7

// Real-valued binary search
double lo = 0, hi = 1e9;
for (int iter = 0; iter < 100; iter++) {
    double mid = (lo + hi) / 2;
    if (check(mid)) hi = mid;
    else lo = mid;
}
// answer is lo (or hi)`
  },
  {
    id: 'algo-greedy',
    categoryId: 'algo',
    title: 'Greedy Algorithms',
    difficulty: 'Intermediate',
    description: 'Making locally optimal choices: interval scheduling, coin change, and more.',
    content: `### What is Greedy?
Make the locally optimal choice at each step, hoping to find the global optimum.

### When Does Greedy Work?
- **Greedy choice property**: A locally optimal choice leads to a globally optimal solution.
- **Optimal substructure**: An optimal solution contains optimal solutions to subproblems.
- If unsure, try to prove it or find a counterexample!

### Classic Greedy Problems
1. **Interval Scheduling**: Sort by end time, pick non-overlapping intervals.
2. **Coin Change (canonical systems)**: Pick largest denomination first.
3. **Huffman Coding**: Build optimal prefix-free code tree.
4. **Fractional Knapsack**: Take items by value/weight ratio.
5. **Activity Selection**: Maximum number of non-overlapping activities.
6. **Load Balancing**: Assign tasks to minimize max load.

### Sorting is Key
Most greedy algorithms start with sorting by some criterion (deadline, end time, ratio, etc.).

### Common Mistakes
- Applying greedy when DP is needed (e.g., 0/1 Knapsack).
- Not proving the greedy choice property.`,
    visualizer: 'none',
    code: `// Interval Scheduling: max non-overlapping intervals
struct Interval {
    int start, end;
    bool operator<(const Interval& o) const {
        return end < o.end; // sort by end time
    }
};

int maxIntervals(vector<Interval>& intervals) {
    sort(intervals.begin(), intervals.end());
    int count = 0, lastEnd = -1;
    for (auto& it : intervals) {
        if (it.start >= lastEnd) {
            count++;
            lastEnd = it.end;
        }
    }
    return count;
}

// Fractional Knapsack
double fractionalKnapsack(vector<pair<int,int>>& items, int W) {
    // items: {value, weight}
    sort(items.begin(), items.end(), [](auto& a, auto& b) {
        return (double)a.first/a.second > (double)b.first/b.second;
    });
    double totalValue = 0;
    for (auto& [v, w] : items) {
        if (W >= w) {
            totalValue += v;
            W -= w;
        } else {
            totalValue += (double)v * W / w;
            break;
        }
    }
    return totalValue;
}`
  },
  {
    id: 'algo-dp-intro',
    categoryId: 'algo',
    title: 'Dynamic Programming: Basics',
    difficulty: 'Intermediate',
    description: 'DP fundamentals: overlapping subproblems, memoization, and tabulation.',
    content: `### What is DP?
Dynamic Programming solves problems by:
1. Breaking them into overlapping subproblems.
2. Storing results of subproblems to avoid recomputation.

### Two Approaches
- **Top-Down (Memoization)**: Recursive with a cache. Natural to write.
- **Bottom-Up (Tabulation)**: Iterative, fill table from base cases. Usually faster.

### Steps to Solve a DP Problem
1. **Define state**: What parameters uniquely identify a subproblem?
2. **Write recurrence**: How does the answer to a state relate to smaller states?
3. **Base cases**: What are the trivial cases?
4. **Order of computation**: Ensure all needed states are computed first.
5. **Answer**: Which state gives the final answer?

### Classic DP Problems
- **Fibonacci**: dp[i] = dp[i-1] + dp[i-2]
- **Coin Change**: Minimum coins to make amount.
- **0/1 Knapsack**: Maximize value within weight limit.
- **Longest Increasing Subsequence (LIS)**: O(N log N) with patience sorting.
- **Longest Common Subsequence (LCS)**: dp[i][j] based on matching characters.

### Complexity
- Usually O(number of states × transitions per state).`,
    visualizer: 'dp',
    code: `// Top-Down: Fibonacci with memoization
int memo[100];
memset(memo, -1, sizeof(memo));
int fib(int n) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];
    return memo[n] = fib(n-1) + fib(n-2);
}

// Bottom-Up: Coin Change (minimum coins)
int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, INT_MAX);
    dp[0] = 0;
    for (int i = 1; i <= amount; i++)
        for (int c : coins)
            if (c <= i && dp[i - c] != INT_MAX)
                dp[i] = min(dp[i], dp[i - c] + 1);
    return dp[amount] == INT_MAX ? -1 : dp[amount];
}

// 0/1 Knapsack
int knapsack(int W, vector<int>& wt, vector<int>& val, int n) {
    vector<vector<int>> dp(n+1, vector<int>(W+1, 0));
    for (int i = 1; i <= n; i++)
        for (int w = 0; w <= W; w++) {
            dp[i][w] = dp[i-1][w]; // don't take
            if (wt[i-1] <= w)
                dp[i][w] = max(dp[i][w], dp[i-1][w-wt[i-1]] + val[i-1]);
        }
    return dp[n][W];
}`
  },
  {
    id: 'algo-dp-advanced',
    categoryId: 'algo',
    title: 'DP: Advanced Techniques',
    difficulty: 'Advanced',
    description: 'Bitmask DP, DP on DAG, LIS O(N log N), and space optimization.',
    content: `### Bitmask DP
Use bitmask as a state to represent subsets. Useful when N ≤ 20.
- **TSP**: dp[mask][i] = min cost to visit cities in mask, ending at city i.
- **Assignment problem**: Assign N tasks to N workers.

### DP on DAG
Any DP with a DAG structure can be solved via topological sort.
- Longest/shortest path in DAG.

### Longest Increasing Subsequence — O(N log N)
Maintain a list of smallest tail elements for increasing subsequences of each length.
- Use \`lower_bound\` for strictly increasing.
- Use \`upper_bound\` for non-decreasing.

### Space Optimization
- If dp[i] only depends on dp[i-1], use two rows or a single row.
- 0/1 Knapsack: iterate weight backwards in single array.

### Range DP
- dp[i][j] = answer for subarray/substring [i..j].
- Example: Matrix Chain Multiplication, optimal BST.

### Digit DP
- Count numbers in [0, N] with certain digit properties.
- State: position, tight constraint, some digit property.`,
    visualizer: 'dp',
    code: `// LIS in O(N log N)
int LIS(vector<int>& a) {
    vector<int> dp;
    for (int x : a) {
        auto it = lower_bound(dp.begin(), dp.end(), x);
        if (it == dp.end()) dp.push_back(x);
        else *it = x;
    }
    return dp.size();
}

// Bitmask DP: Travelling Salesman Problem
int n; // number of cities
int dist[20][20];
int dp[1 << 20][20];

int tsp(int mask, int u) {
    if (mask == (1 << n) - 1) return dist[u][0]; // return to start
    if (dp[mask][u] != -1) return dp[mask][u];
    int ans = INT_MAX;
    for (int v = 0; v < n; v++)
        if (!(mask & (1 << v)))
            ans = min(ans, dist[u][v] + tsp(mask | (1 << v), v));
    return dp[mask][u] = ans;
}

// Space-optimized 0/1 Knapsack
int knapsack1D(int W, vector<int>& wt, vector<int>& val, int n) {
    vector<int> dp(W + 1, 0);
    for (int i = 0; i < n; i++)
        for (int w = W; w >= wt[i]; w--) // iterate backwards!
            dp[w] = max(dp[w], dp[w - wt[i]] + val[i]);
    return dp[W];
}`
  },

  // ==========================================
  // Chapter 4: Graph Algorithms
  // ==========================================
  {
    id: 'graph-basics',
    categoryId: 'graph',
    title: 'Graph Representation',
    difficulty: 'Beginner',
    description: 'Adjacency list, adjacency matrix, edge list, and implicit graphs.',
    content: `### Adjacency List
- Most common in CP. Space: O(V + E).
- \`vector<vector<int>> adj(V);\` for unweighted.
- \`vector<vector<pair<int,int>>> adj(V);\` for weighted.

### Adjacency Matrix
- Space: O(V²). Good when V is small (≤ 1000) and graph is dense.
- \`int adj[V][V];\` — adj[i][j] = weight of edge i→j (or 0/INF if no edge).

### Edge List
- Store all edges as (u, v, w) triples.
- Useful for Kruskal's MST (sort edges by weight).

### Implicit Graph
- Graph defined by rules, not explicitly stored.
- Example: Grid with 4-directional movement, state-space search.

### Graph Properties
- **Directed vs Undirected**
- **Weighted vs Unweighted**
- **Connected vs Disconnected**
- **Cyclic vs Acyclic (DAG)**
- **Tree**: Connected acyclic graph with V-1 edges.
- **Bipartite**: Can be 2-colored (no odd cycles).`,
    visualizer: 'none',
    code: `// Adjacency List (most common)
int V, E;
vector<vector<pair<int,int>>> adj(V); // weighted
// Read edges
for (int i = 0; i < E; i++) {
    int u, v, w;
    scanf("%d %d %d", &u, &v, &w);
    adj[u].push_back({v, w});
    adj[v].push_back({u, w}); // undirected
}

// Adjacency Matrix
int mat[1000][1000];
memset(mat, 0, sizeof(mat));
mat[u][v] = w; // directed edge u→v with weight w

// Edge List (for Kruskal)
struct Edge {
    int u, v, w;
    bool operator<(const Edge& o) const { return w < o.w; }
};
vector<Edge> edges;

// Implicit Graph (Grid BFS)
int dx[] = {0,0,1,-1};
int dy[] = {1,-1,0,0};
// neighbor of (r,c) is (r+dx[d], c+dy[d]) for d=0..3`
  },
  {
    id: 'graph-traversal',
    categoryId: 'graph',
    title: 'Graph Traversal (DFS & BFS)',
    difficulty: 'Intermediate',
    description: 'DFS and BFS: the backbone of graph algorithms.',
    content: `### Depth First Search (DFS)
- Uses recursion (or explicit stack).
- Goes as deep as possible before backtracking.
- **Time**: O(V + E).
- **Applications**: Connected components, cycle detection, topological sort, bipartite check, articulation points, bridges.

### Breadth First Search (BFS)
- Uses a queue.
- Explores all nodes at distance d before distance d+1.
- **Time**: O(V + E).
- **Applications**: Shortest path in unweighted graph, level-order traversal, flood fill.

### DFS Properties
- **Discovery time** and **finish time**: useful for many algorithms.
- **Tree edges, back edges, forward edges, cross edges**.
- Back edge exists ⟺ cycle exists (in directed graph).

### BFS on Grid
- Treat each cell as a node, 4 neighbors.
- Find shortest path from source to destination.
- Flood fill: find connected components in grid.

### 0-1 BFS
- For graphs with edge weights 0 or 1.
- Use deque: push weight-0 edges to front, weight-1 edges to back.
- O(V + E) instead of O((V+E) log V) for Dijkstra.`,
    visualizer: 'graph',
    code: `// DFS
vector<bool> visited;
vector<vector<int>> adj;

void dfs(int u) {
    visited[u] = true;
    for (int v : adj[u])
        if (!visited[v]) dfs(v);
}

// BFS (shortest path in unweighted graph)
vector<int> bfs(int s, int V) {
    vector<int> dist(V, -1);
    queue<int> q;
    dist[s] = 0;
    q.push(s);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
    return dist;
}

// Counting connected components
int countComponents(int V) {
    visited.assign(V, false);
    int count = 0;
    for (int i = 0; i < V; i++)
        if (!visited[i]) { dfs(i); count++; }
    return count;
}

// 0-1 BFS
vector<int> bfs01(int s, int V) {
    vector<int> dist(V, INT_MAX);
    deque<int> dq;
    dist[s] = 0;
    dq.push_front(s);
    while (!dq.empty()) {
        int u = dq.front(); dq.pop_front();
        for (auto [v, w] : adj_weighted[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                if (w == 0) dq.push_front(v);
                else dq.push_back(v);
            }
        }
    }
    return dist;
}`
  },
  {
    id: 'graph-topo-sort',
    categoryId: 'graph',
    title: 'Topological Sort',
    difficulty: 'Intermediate',
    description: 'Linear ordering of DAG vertices. Kahn\'s algorithm and DFS-based approach.',
    content: `### What is Topological Sort?
A linear ordering of vertices in a DAG such that for every directed edge u→v, u comes before v.

### When to Use
- Task scheduling with dependencies.
- Course prerequisites.
- Build systems / compilation order.
- DP on DAG (process in topological order).

### Two Approaches
1. **Kahn's Algorithm (BFS)**: Process nodes with in-degree 0. Remove them and decrease neighbors' in-degree.
2. **DFS-based**: Do DFS, push to stack on finish. Reverse of finish order = topological order.

### Cycle Detection
- If Kahn's algorithm doesn't process all nodes → cycle exists.
- If DFS finds a back edge → cycle exists.

### Counting Paths in DAG
- Process nodes in topological order.
- dp[v] = sum of dp[u] for all u→v edges.`,
    visualizer: 'none',
    code: `// Kahn's Algorithm (BFS-based)
vector<int> topoSort(int V, vector<vector<int>>& adj) {
    vector<int> inDeg(V, 0);
    for (int u = 0; u < V; u++)
        for (int v : adj[u]) inDeg[v]++;

    queue<int> q;
    for (int i = 0; i < V; i++)
        if (inDeg[i] == 0) q.push(i);

    vector<int> order;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        order.push_back(u);
        for (int v : adj[u])
            if (--inDeg[v] == 0) q.push(v);
    }
    // if order.size() < V, cycle exists!
    return order;
}

// DFS-based Topological Sort
vector<int> order;
vector<bool> visited;
void dfsTopoSort(int u) {
    visited[u] = true;
    for (int v : adj[u])
        if (!visited[v]) dfsTopoSort(v);
    order.push_back(u); // push on finish
}
// Reverse order[] for topological order`
  },
  {
    id: 'graph-sssp',
    categoryId: 'graph',
    title: 'Dijkstra\'s Algorithm (SSSP)',
    difficulty: 'Intermediate',
    description: 'Single-source shortest paths in weighted graphs with non-negative edges.',
    content: `### Dijkstra's Algorithm
- For weighted graphs with **non-negative** edge weights.
- Uses a priority queue (min-heap) for greedy selection.
- **Time**: O((V + E) log V) with binary heap.

### How It Works
1. Set dist[source] = 0, all others = INF.
2. Push (0, source) to priority queue.
3. Pop minimum distance node. For each neighbor, relax the edge.
4. Repeat until queue is empty.

### Important Notes
- Does NOT work with negative edge weights (use Bellman-Ford instead).
- The "lazy" implementation (pushing duplicate entries) is simpler and fast enough for CP.
- To reconstruct the path, store parent[v] = u when relaxing edge u→v.

### Variants
- **Modified Dijkstra**: Track additional state (e.g., number of edges used).
- **Multi-source**: Push all sources with distance 0 initially.`,
    visualizer: 'dijkstra',
    code: `typedef pair<int,int> ii;

vector<int> dijkstra(int s, int V, vector<vector<ii>>& adj) {
    vector<int> dist(V, INT_MAX);
    priority_queue<ii, vector<ii>, greater<ii>> pq;
    dist[s] = 0;
    pq.push({0, s});

    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue; // lazy deletion
        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}

// Path reconstruction
vector<int> parent(V, -1);
// In relaxation: parent[v] = u;
vector<int> getPath(int t) {
    vector<int> path;
    for (int v = t; v != -1; v = parent[v])
        path.push_back(v);
    reverse(path.begin(), path.end());
    return path;
}`
  },
  {
    id: 'graph-bellman-ford',
    categoryId: 'graph',
    title: 'Bellman-Ford & SPFA',
    difficulty: 'Intermediate',
    description: 'SSSP with negative weights and negative cycle detection.',
    content: `### Bellman-Ford Algorithm
- Works with **negative edge weights**.
- Can detect **negative weight cycles**.
- **Time**: O(V × E) — slower than Dijkstra.

### How It Works
1. Set dist[source] = 0, all others = INF.
2. Repeat V-1 times: relax ALL edges.
3. After V-1 iterations, all shortest paths are found (if no negative cycle).
4. One more iteration: if any edge can still be relaxed → negative cycle exists.

### SPFA (Shortest Path Faster Algorithm)
- Optimized Bellman-Ford using a queue.
- Average case much faster, but worst case still O(V × E).
- Push a node to queue only if it's not already in the queue.

### When to Use
- Negative edge weights → Bellman-Ford or SPFA.
- Need to detect negative cycles → Bellman-Ford.
- All non-negative weights → use Dijkstra (faster).`,
    visualizer: 'none',
    code: `// Bellman-Ford
struct Edge { int u, v, w; };

pair<vector<int>, bool> bellmanFord(int s, int V, vector<Edge>& edges) {
    vector<int> dist(V, INT_MAX);
    dist[s] = 0;

    // Relax all edges V-1 times
    for (int i = 0; i < V - 1; i++)
        for (auto& [u, v, w] : edges)
            if (dist[u] != INT_MAX && dist[u] + w < dist[v])
                dist[v] = dist[u] + w;

    // Check for negative cycle
    bool negativeCycle = false;
    for (auto& [u, v, w] : edges)
        if (dist[u] != INT_MAX && dist[u] + w < dist[v])
            negativeCycle = true;

    return {dist, negativeCycle};
}

// SPFA (queue-optimized Bellman-Ford)
vector<int> spfa(int s, int V, vector<vector<pair<int,int>>>& adj) {
    vector<int> dist(V, INT_MAX);
    vector<bool> inQueue(V, false);
    queue<int> q;
    dist[s] = 0; q.push(s); inQueue[s] = true;

    while (!q.empty()) {
        int u = q.front(); q.pop(); inQueue[u] = false;
        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                if (!inQueue[v]) { q.push(v); inQueue[v] = true; }
            }
        }
    }
    return dist;
}`
  },
  {
    id: 'graph-floyd',
    categoryId: 'graph',
    title: 'Floyd-Warshall (APSP)',
    difficulty: 'Intermediate',
    description: 'All-pairs shortest paths in O(V³). Also detects negative cycles.',
    content: `### Floyd-Warshall Algorithm
Computes shortest paths between ALL pairs of vertices.
- **Time**: O(V³)
- **Space**: O(V²)
- Works with negative edges (can detect negative cycles).

### How It Works
For each intermediate vertex k (0 to V-1):
  For each pair (i, j):
    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])

### Key Insight
After considering vertices 0..k as intermediates, dist[i][j] is the shortest path from i to j using only vertices 0..k as intermediate nodes.

### Negative Cycle Detection
If dist[i][i] < 0 for any vertex i after the algorithm, there's a negative cycle.

### When to Use
- V ≤ ~400 (since O(V³)).
- Need all pairs of shortest paths.
- Simpler to code than running Dijkstra V times.

### Applications
- Transitive closure (reachability).
- Minimax / Maximin paths.
- Finding the diameter of a graph.`,
    visualizer: 'floyd',
    code: `// Floyd-Warshall
const int INF = 1e9;
int dist[500][500];

void floydWarshall(int V) {
    // Initialize: dist[i][j] = weight of edge i→j, or INF if no edge
    // dist[i][i] = 0

    for (int k = 0; k < V; k++)
        for (int i = 0; i < V; i++)
            for (int j = 0; j < V; j++)
                if (dist[i][k] < INF && dist[k][j] < INF)
                    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);

    // Check negative cycle: dist[i][i] < 0 for some i
}

// Transitive Closure (can i reach j?)
bool reach[500][500];
void transitiveClosure(int V) {
    for (int k = 0; k < V; k++)
        for (int i = 0; i < V; i++)
            for (int j = 0; j < V; j++)
                reach[i][j] = reach[i][j] || (reach[i][k] && reach[k][j]);
}

// Minimax path (minimize the maximum edge weight on path)
for (int k = 0; k < V; k++)
    for (int i = 0; i < V; i++)
        for (int j = 0; j < V; j++)
            dist[i][j] = min(dist[i][j], max(dist[i][k], dist[k][j]));`
  },
  {
    id: 'graph-mst',
    categoryId: 'graph',
    title: 'Minimum Spanning Tree',
    difficulty: 'Intermediate',
    description: 'Kruskal\'s and Prim\'s algorithms for finding MST.',
    content: `### What is MST?
A spanning tree of a connected graph with minimum total edge weight. It has exactly V-1 edges.

### Kruskal's Algorithm — O(E log E)
1. Sort all edges by weight.
2. For each edge (u, v, w) in sorted order:
   - If u and v are in different components (using Union-Find), add this edge to MST.
3. Stop when MST has V-1 edges.

### Prim's Algorithm — O(E log V)
1. Start from any vertex. Add it to MST.
2. From all edges connecting MST to non-MST vertices, pick the minimum weight edge.
3. Add the new vertex to MST. Repeat until all vertices are in MST.

### Which to Choose?
- **Kruskal**: Simpler with Union-Find. Better for sparse graphs.
- **Prim**: Better for dense graphs. Similar to Dijkstra implementation.

### Variants
- **Maximum Spanning Tree**: Negate all weights or sort descending.
- **Minimum Spanning Forest**: When graph is disconnected.
- **Second Best MST**: Find MST, then try replacing each MST edge.`,
    visualizer: 'mst',
    code: `// Kruskal's MST
struct Edge {
    int u, v, w;
    bool operator<(const Edge& o) const { return w < o.w; }
};

long long kruskal(int V, vector<Edge>& edges) {
    sort(edges.begin(), edges.end());
    UnionFind uf(V);
    long long mstCost = 0;
    int edgeCount = 0;

    for (auto& [u, v, w] : edges) {
        if (!uf.same(u, v)) {
            uf.unite(u, v);
            mstCost += w;
            edgeCount++;
            if (edgeCount == V - 1) break;
        }
    }
    return mstCost; // -1 if edgeCount < V-1 (disconnected)
}

// Prim's MST
long long prim(int V, vector<vector<pair<int,int>>>& adj) {
    vector<bool> inMST(V, false);
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    pq.push({0, 0}); // {weight, vertex}
    long long mstCost = 0;
    int count = 0;

    while (!pq.empty() && count < V) {
        auto [w, u] = pq.top(); pq.pop();
        if (inMST[u]) continue;
        inMST[u] = true;
        mstCost += w;
        count++;
        for (auto [v, wt] : adj[u])
            if (!inMST[v]) pq.push({wt, v});
    }
    return mstCost;
}`
  },
  {
    id: 'graph-scc',
    categoryId: 'graph',
    title: 'Strongly Connected Components',
    difficulty: 'Advanced',
    description: 'Kosaraju\'s and Tarjan\'s algorithms for finding SCCs in directed graphs.',
    content: `### What is an SCC?
A maximal set of vertices where every vertex is reachable from every other vertex (in a directed graph).

### Kosaraju's Algorithm — O(V + E)
1. Do DFS on original graph, push to stack by finish time.
2. Build transpose graph (reverse all edges).
3. Pop from stack and do DFS on transpose. Each DFS tree is an SCC.

### Tarjan's Algorithm — O(V + E)
- Single pass DFS with discovery time and low-link values.
- A node u is root of SCC if \`disc[u] == low[u]\`.
- Uses an explicit stack to track current SCC.

### Applications
- **2-SAT**: Model as implication graph, solve via SCCs.
- **DAG Condensation**: Replace each SCC with a single node to get a DAG.
- **Reachability in directed graphs**.

### Articulation Points & Bridges
- **Articulation point**: Removing it disconnects the graph.
- **Bridge**: Removing the edge disconnects the graph.
- Both found using modified DFS with low-link values.`,
    visualizer: 'none',
    code: `// Tarjan's SCC
int disc[MAXN], low[MAXN], timer_ = 0;
bool onStack[MAXN];
stack<int> st;
vector<vector<int>> sccs;

void tarjanDFS(int u) {
    disc[u] = low[u] = timer_++;
    st.push(u); onStack[u] = true;

    for (int v : adj[u]) {
        if (disc[v] == -1) {
            tarjanDFS(v);
            low[u] = min(low[u], low[v]);
        } else if (onStack[v]) {
            low[u] = min(low[u], disc[v]);
        }
    }

    if (disc[u] == low[u]) { // root of SCC
        vector<int> scc;
        while (true) {
            int v = st.top(); st.pop();
            onStack[v] = false;
            scc.push_back(v);
            if (v == u) break;
        }
        sccs.push_back(scc);
    }
}

// Bridges (cut edges)
void bridgeDFS(int u, int parent) {
    disc[u] = low[u] = timer_++;
    for (int v : adj[u]) {
        if (disc[v] == -1) {
            bridgeDFS(v, u);
            low[u] = min(low[u], low[v]);
            if (low[v] > disc[u])
                printf("Bridge: %d - %d\\n", u, v);
        } else if (v != parent) {
            low[u] = min(low[u], disc[v]);
        }
    }
}`
  },
  {
    id: 'graph-maxflow',
    categoryId: 'graph',
    title: 'Max Flow / Min Cut',
    difficulty: 'Advanced',
    description: 'Ford-Fulkerson method, Edmonds-Karp (BFS), and applications.',
    content: `### Max Flow Problem
Given a flow network (directed graph with capacities), find the maximum flow from source s to sink t.

### Ford-Fulkerson Method
1. While there exists an augmenting path from s to t in the residual graph:
   - Find the bottleneck (minimum residual capacity along path).
   - Update flow along the path.

### Edmonds-Karp — O(V × E²)
- Ford-Fulkerson with BFS to find augmenting paths.
- Guarantees O(V × E²) time.

### Max-Flow Min-Cut Theorem
The maximum flow equals the minimum cut capacity. A min-cut partitions vertices into two sets S and T where s∈S, t∈T, and the total capacity of edges from S to T is minimized.

### Applications
- Bipartite matching (max matching = max flow).
- Edge-disjoint paths.
- Minimum vertex cover (König's theorem).
- Project selection / closure problems.`,
    visualizer: 'none',
    code: `// Edmonds-Karp (Max Flow with BFS)
const int INF = 1e9;
int cap[MAXN][MAXN]; // capacity
int flow_[MAXN][MAXN]; // current flow

int bfs(int s, int t, int V, vector<int>& parent) {
    fill(parent.begin(), parent.end(), -1);
    parent[s] = s;
    queue<pair<int,int>> q;
    q.push({s, INF});

    while (!q.empty()) {
        auto [u, f] = q.front(); q.pop();
        for (int v = 0; v < V; v++) {
            if (parent[v] == -1 && cap[u][v] - flow_[u][v] > 0) {
                parent[v] = u;
                int new_flow = min(f, cap[u][v] - flow_[u][v]);
                if (v == t) return new_flow;
                q.push({v, new_flow});
            }
        }
    }
    return 0;
}

int maxFlow(int s, int t, int V) {
    int totalFlow = 0;
    vector<int> parent(V);
    int aug;
    while ((aug = bfs(s, t, V, parent)) > 0) {
        totalFlow += aug;
        int u = t;
        while (u != s) {
            int prev = parent[u];
            flow_[prev][u] += aug;
            flow_[u][prev] -= aug;
            u = prev;
        }
    }
    return totalFlow;
}`
  },
  {
    id: 'graph-bipartite',
    categoryId: 'graph',
    title: 'Bipartite Graphs & Matching',
    difficulty: 'Advanced',
    description: 'Bipartite checking, maximum bipartite matching, and Hungarian algorithm.',
    content: `### Bipartite Graph
A graph is bipartite if vertices can be colored with 2 colors such that no two adjacent vertices share the same color.
- Equivalent: graph has no odd-length cycles.
- Check with BFS/DFS: try 2-coloring.

### Maximum Bipartite Matching
Find the maximum set of edges with no shared vertices.
- **Augmenting Path Algorithm (Kuhn's)**: O(V × E).
- **Hopcroft-Karp**: O(E × √V).
- **Max Flow reduction**: Add source/sink, unit capacities.

### König's Theorem
In a bipartite graph:
- Maximum Matching = Minimum Vertex Cover.
- Maximum Independent Set = V - Maximum Matching.

### Applications
- Job assignment (workers to tasks).
- Vertex cover.
- Edge coloring.`,
    visualizer: 'none',
    code: `// Bipartite check with BFS
bool isBipartite(int V) {
    vector<int> color(V, -1);
    for (int i = 0; i < V; i++) {
        if (color[i] != -1) continue;
        queue<int> q;
        q.push(i); color[i] = 0;
        while (!q.empty()) {
            int u = q.front(); q.pop();
            for (int v : adj[u]) {
                if (color[v] == -1) {
                    color[v] = 1 - color[u];
                    q.push(v);
                } else if (color[v] == color[u]) return false;
            }
        }
    }
    return true;
}

// Kuhn's Algorithm (Maximum Bipartite Matching)
int match_[MAXN];
bool used[MAXN];

bool tryKuhn(int u) {
    for (int v : adj[u]) {
        if (!used[v]) {
            used[v] = true;
            if (match_[v] == -1 || tryKuhn(match_[v])) {
                match_[v] = u;
                return true;
            }
        }
    }
    return false;
}

int maxMatching(int n) {
    memset(match_, -1, sizeof(match_));
    int result = 0;
    for (int u = 0; u < n; u++) {
        memset(used, false, sizeof(used));
        if (tryKuhn(u)) result++;
    }
    return result;
}`
  },

  // ==========================================
  // Chapter 5: Mathematics
  // ==========================================
  {
    id: 'math-primes',
    categoryId: 'math',
    title: 'Prime Numbers & Sieve',
    difficulty: 'Intermediate',
    description: 'Primality testing, Sieve of Eratosthenes, and prime factorization.',
    content: `### Primality Testing
- **Trial division**: Check divisibility up to √N. O(√N).
- **Miller-Rabin**: Probabilistic test for very large numbers.

### Sieve of Eratosthenes — O(N log log N)
Find all primes up to N:
1. Create boolean array [0..N], all true initially.
2. For each i from 2 to √N: if i is prime, mark all multiples of i as composite.
3. Remaining true entries are primes.

### Prime Factorization — O(√N)
Divide N by each prime factor, counting multiplicity.

### Useful Facts
- Number of primes ≤ N is approximately N / ln(N).
- Every integer > 1 has a unique prime factorization (Fundamental Theorem of Arithmetic).
- Number of divisors of N = product of (exponent + 1) for each prime factor.
- Sum of divisors uses formula: Π(p^(e+1) - 1)/(p - 1).

### Sieve of Smallest Prime Factor
Store the smallest prime factor for each number. Allows O(log N) factorization.`,
    visualizer: 'none',
    code: `// Sieve of Eratosthenes
vector<bool> sieve(int n) {
    vector<bool> is_prime(n + 1, true);
    is_prime[0] = is_prime[1] = false;
    for (int i = 2; i * i <= n; i++)
        if (is_prime[i])
            for (int j = i * i; j <= n; j += i)
                is_prime[j] = false;
    return is_prime;
}

// Prime Factorization in O(sqrt(N))
vector<pair<int,int>> factorize(int n) {
    vector<pair<int,int>> factors;
    for (int i = 2; i * i <= n; i++) {
        int cnt = 0;
        while (n % i == 0) { n /= i; cnt++; }
        if (cnt) factors.push_back({i, cnt});
    }
    if (n > 1) factors.push_back({n, 1});
    return factors;
}

// Number of divisors
int numDivisors(int n) {
    int result = 1;
    for (auto [p, e] : factorize(n))
        result *= (e + 1);
    return result;
}

// Sieve of Smallest Prime Factor (for fast factorization)
vector<int> spf(int n) {
    vector<int> sp(n + 1);
    iota(sp.begin(), sp.end(), 0);
    for (int i = 2; i * i <= n; i++)
        if (sp[i] == i) // i is prime
            for (int j = i * i; j <= n; j += i)
                if (sp[j] == j) sp[j] = i;
    return sp;
}`
  },
  {
    id: 'math-gcd-mod',
    categoryId: 'math',
    title: 'GCD, LCM & Modular Arithmetic',
    difficulty: 'Intermediate',
    description: 'Euclidean algorithm, Extended Euclid, modular inverse, and fast exponentiation.',
    content: `### GCD & LCM
- **GCD(a, b)**: Euclidean algorithm — O(log min(a, b)).
- **LCM(a, b)** = a / GCD(a, b) × b (divide first to avoid overflow).

### Extended Euclidean Algorithm
Find x, y such that ax + by = GCD(a, b).
- Used to find modular inverse.

### Modular Arithmetic
- (a + b) % m = ((a % m) + (b % m)) % m
- (a × b) % m = ((a % m) × (b % m)) % m
- (a - b) % m = ((a % m) - (b % m) + m) % m
- Division: a / b ≡ a × b^(-1) (mod m), where b^(-1) is the modular inverse.

### Modular Inverse
- If m is prime: b^(-1) ≡ b^(m-2) (mod m) — Fermat's little theorem.
- General: Use Extended Euclidean (works when GCD(b, m) = 1).

### Fast Exponentiation — O(log n)
Compute a^n mod m efficiently using binary exponentiation.

### Euler's Totient (phi)
phi(n) = number of integers in [1, n] coprime with n.
- If p is prime: phi(p) = p - 1.
- phi(p^k) = p^k - p^(k-1).
- phi is multiplicative: phi(a × b) = phi(a) × phi(b) if GCD(a,b) = 1.`,
    visualizer: 'none',
    code: `// GCD & LCM
int gcd(int a, int b) { return b == 0 ? a : gcd(b, a % b); }
// Or use __gcd(a, b) in C++
long long lcm(long long a, long long b) { return a / gcd(a, b) * b; }

// Extended Euclidean: ax + by = gcd(a,b)
int extgcd(int a, int b, int &x, int &y) {
    if (b == 0) { x = 1; y = 0; return a; }
    int x1, y1;
    int g = extgcd(b, a % b, x1, y1);
    x = y1;
    y = x1 - (a / b) * y1;
    return g;
}

// Fast Exponentiation: a^n mod m
long long power(long long a, long long n, long long m) {
    long long res = 1;
    a %= m;
    while (n > 0) {
        if (n & 1) res = res * a % m;
        a = a * a % m;
        n >>= 1;
    }
    return res;
}

// Modular Inverse (m must be prime)
long long modInverse(long long a, long long m) {
    return power(a, m - 2, m);
}

// Euler's Totient
int phi(int n) {
    int result = n;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            while (n % i == 0) n /= i;
            result -= result / i;
        }
    }
    if (n > 1) result -= result / n;
    return result;
}`
  },
  {
    id: 'math-combinatorics',
    categoryId: 'math',
    title: 'Combinatorics',
    difficulty: 'Intermediate',
    description: 'Fibonacci, Binomial Coefficients, Catalan Numbers, and counting techniques.',
    content: `### Fibonacci Numbers
F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2).
- O(N) with DP, O(log N) with matrix exponentiation.
- Appears in nature, Zeckendorf's representation, Fibonacci coding.

### Binomial Coefficients — C(n, k)
Number of ways to choose k items from n items.
- C(n, k) = n! / (k! × (n-k)!)
- Pascal's Triangle: C(n, k) = C(n-1, k-1) + C(n-1, k).
- For large n with mod prime p: precompute factorials and inverse factorials.

### Catalan Numbers
C(n) = C(2n, n) / (n+1). First few: 1, 1, 2, 5, 14, 42, 132, ...
- Number of valid parenthesizations of n pairs.
- Number of distinct BSTs with n nodes.
- Number of paths from (0,0) to (n,n) that don't cross the diagonal.

### Counting Principles
- **Addition rule**: |A ∪ B| = |A| + |B| - |A ∩ B|.
- **Multiplication rule**: Independent choices multiply.
- **Inclusion-Exclusion**: Count by adding/subtracting overlapping sets.
- **Stars and Bars**: x₁ + x₂ + ... + xₖ = n with xᵢ ≥ 0 has C(n+k-1, k-1) solutions.`,
    visualizer: 'none',
    code: `// Binomial Coefficients with modular arithmetic
const int MOD = 1e9 + 7;
const int MAXN = 200005;
long long fact[MAXN], inv_fact[MAXN];

void precompute() {
    fact[0] = 1;
    for (int i = 1; i < MAXN; i++)
        fact[i] = fact[i-1] * i % MOD;
    inv_fact[MAXN-1] = power(fact[MAXN-1], MOD-2, MOD);
    for (int i = MAXN-2; i >= 0; i--)
        inv_fact[i] = inv_fact[i+1] * (i+1) % MOD;
}

long long C(int n, int k) {
    if (k < 0 || k > n) return 0;
    return fact[n] % MOD * inv_fact[k] % MOD * inv_fact[n-k] % MOD;
}

// Catalan number
long long catalan(int n) {
    return C(2*n, n) % MOD * power(n+1, MOD-2, MOD) % MOD;
}

// Fibonacci with matrix exponentiation
typedef vector<vector<long long>> Matrix;
Matrix multiply(Matrix& A, Matrix& B, long long mod) {
    int n = A.size();
    Matrix C(n, vector<long long>(n, 0));
    for (int i = 0; i < n; i++)
        for (int k = 0; k < n; k++)
            for (int j = 0; j < n; j++)
                C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % mod;
    return C;
}

long long fib(long long n, long long mod) {
    if (n <= 1) return n;
    Matrix base = {{1,1},{1,0}};
    Matrix result = {{1,0},{0,1}}; // identity
    n--;
    while (n > 0) {
        if (n & 1) result = multiply(result, base, mod);
        base = multiply(base, base, mod);
        n >>= 1;
    }
    return result[0][0];
}`
  },
  {
    id: 'math-game-theory',
    categoryId: 'math',
    title: 'Game Theory',
    difficulty: 'Advanced',
    description: 'Nim game, Sprague-Grundy theorem, and minimax strategy.',
    content: `### Combinatorial Game Theory
Two players take turns. The player who cannot move loses (normal play convention).

### Nim Game
Given piles of stones, players alternately take any number of stones from one pile.
- **Winning condition**: XOR of all pile sizes ≠ 0 → first player wins.
- **Losing condition**: XOR = 0 → second player wins (first player is in a losing position).

### Sprague-Grundy Theorem
Every impartial game is equivalent to a Nim pile of some size (the Grundy number).
- **Grundy number**: G(state) = mex{G(next states)}, where mex is the minimum excludant.
- **mex**: Smallest non-negative integer not in the set.
- Composite games: XOR all Grundy numbers.

### Minimax
For two-player zero-sum games with perfect information:
- Maximizer picks move that maximizes score.
- Minimizer picks move that minimizes score.
- With alpha-beta pruning: significant speedup.

### Common Game Types
- **Nim variants**: Changing allowed moves changes Grundy values.
- **Green Hackenbush**: Graph theory meets game theory.`,
    visualizer: 'none',
    code: `// Nim Game: XOR of pile sizes
bool nimWinner(vector<int>& piles) {
    int xorSum = 0;
    for (int p : piles) xorSum ^= p;
    return xorSum != 0; // true = first player wins
}

// Sprague-Grundy: compute Grundy number
int grundy(int state, vector<int>& memo) {
    if (memo[state] != -1) return memo[state];
    set<int> reachable;
    for (int next : getNextStates(state))
        reachable.insert(grundy(next, memo));
    // mex: smallest non-negative integer not in reachable
    int mex = 0;
    while (reachable.count(mex)) mex++;
    return memo[state] = mex;
}

// Minimax with Alpha-Beta Pruning
int minimax(int depth, bool isMax, int alpha, int beta) {
    if (depth == 0 || isTerminal()) return evaluate();

    if (isMax) {
        int best = INT_MIN;
        for (auto& move : getMoves()) {
            doMove(move);
            best = max(best, minimax(depth-1, false, alpha, beta));
            undoMove(move);
            alpha = max(alpha, best);
            if (beta <= alpha) break; // beta cutoff
        }
        return best;
    } else {
        int best = INT_MAX;
        for (auto& move : getMoves()) {
            doMove(move);
            best = min(best, minimax(depth-1, true, alpha, beta));
            undoMove(move);
            beta = min(beta, best);
            if (beta <= alpha) break; // alpha cutoff
        }
        return best;
    }
}`
  },
  {
    id: 'math-probability',
    categoryId: 'math',
    title: 'Probability & Expected Value',
    difficulty: 'Advanced',
    description: 'Probability fundamentals, expected value, and DP with probability.',
    content: `### Basic Probability
- P(A) = favorable outcomes / total outcomes.
- P(A ∪ B) = P(A) + P(B) - P(A ∩ B).
- P(A ∩ B) = P(A) × P(B) if A, B are independent.
- P(A|B) = P(A ∩ B) / P(B) — conditional probability.

### Expected Value
E[X] = Σ xᵢ × P(xᵢ).
- **Linearity of expectation**: E[X + Y] = E[X] + E[Y] (ALWAYS true, even if X,Y are dependent!).
- This is incredibly powerful. You don't need independence.

### DP with Probability
- State: current situation.
- Transition: probability of each next state.
- E[state] = Σ P(transition) × (cost + E[next_state]).

### Useful Formulas
- **Geometric distribution**: Expected tries until success = 1/p.
- **Coupon collector**: Expected time to collect all n types = n × H(n), where H(n) = 1 + 1/2 + ... + 1/n.
- **Birthday paradox**: With ~√(365) ≈ 23 people, >50% chance of shared birthday.`,
    visualizer: 'none',
    code: `// Expected value DP example:
// Expected number of die rolls to reach position N on a board
// Moving 1-6 steps per roll

double expectedRolls(int n) {
    vector<double> dp(n + 1, 0);
    // dp[i] = expected rolls from position i to reach n
    for (int i = n - 1; i >= 0; i--) {
        dp[i] = 1; // one roll
        double sum = 0;
        int cnt = 0;
        for (int d = 1; d <= 6 && i + d <= n; d++) {
            sum += dp[i + d];
            cnt++;
        }
        if (cnt > 0) dp[i] += sum / cnt;
        else dp[i] = 1e18; // can't reach
    }
    return dp[0];
}

// Coupon Collector: expected tries to collect all n types
double couponCollector(int n) {
    double expected = 0;
    for (int i = 1; i <= n; i++)
        expected += (double)n / i;
    return expected;
}`
  },

  // ==========================================
  // Chapter 6: String Processing
  // ==========================================
  {
    id: 'string-basics',
    categoryId: 'string',
    title: 'String Basics & Ad Hoc',
    difficulty: 'Beginner',
    description: 'String manipulation, character operations, and common ad hoc string problems.',
    content: `### C++ String Operations
- \`s.length()\` or \`s.size()\` — O(1).
- \`s.substr(pos, len)\` — extract substring.
- \`s.find(pattern)\` — find first occurrence (returns \`string::npos\` if not found).
- \`s += t\` — concatenate.
- Comparison: lexicographic by default.

### Character Operations
- \`isalpha(c)\`, \`isdigit(c)\`, \`isalnum(c)\`
- \`toupper(c)\`, \`tolower(c)\`
- \`c - 'a'\` — convert to 0-25 index.

### Common String Problems
- **Palindrome check**: Compare s with reverse(s).
- **Anagram check**: Sort both strings and compare, or use frequency array.
- **String rotation**: s is rotation of t iff t is substring of s+s.
- **Caesar cipher**: Shift each character by k positions.

### Tokenization & Parsing
- \`stringstream\` for splitting by spaces.
- \`getline(cin, s)\` for reading entire line.
- Manual parsing with indices for complex formats.`,
    visualizer: 'none',
    code: `// Palindrome check
bool isPalindrome(const string& s) {
    int l = 0, r = s.size() - 1;
    while (l < r) {
        if (s[l] != s[r]) return false;
        l++; r--;
    }
    return true;
}

// Frequency count
vector<int> charFreq(const string& s) {
    vector<int> freq(26, 0);
    for (char c : s) freq[c - 'a']++;
    return freq;
}

// String rotation check
bool isRotation(const string& s, const string& t) {
    return s.size() == t.size() && (s + s).find(t) != string::npos;
}

// Tokenize by delimiter
vector<string> split(const string& s, char delim) {
    vector<string> tokens;
    stringstream ss(s);
    string token;
    while (getline(ss, token, delim))
        tokens.push_back(token);
    return tokens;
}

// String hashing (polynomial rolling hash)
long long hashString(const string& s) {
    const long long MOD = 1e9 + 7, BASE = 31;
    long long h = 0, pw = 1;
    for (char c : s) {
        h = (h + (c - 'a' + 1) * pw) % MOD;
        pw = pw * BASE % MOD;
    }
    return h;
}`
  },
  {
    id: 'string-kmp',
    categoryId: 'string',
    title: 'KMP String Matching',
    difficulty: 'Intermediate',
    description: 'Knuth-Morris-Pratt algorithm for efficient pattern matching in O(N+M).',
    content: `### The Problem
Find all occurrences of pattern P (length M) in text T (length N).

### Naive Approach — O(N × M)
Try every starting position. Too slow for large inputs.

### KMP Algorithm — O(N + M)
Key idea: preprocess the pattern to build a **failure function** (also called prefix function or KMP table).
- \`fail[i]\` = length of longest proper prefix of P[0..i] that is also a suffix.
- When a mismatch occurs at P[j], we don't restart from scratch. Instead, jump to \`fail[j-1]\`.

### How Failure Function Works
- If characters match: \`fail[i] = fail[i-1] + 1\`.
- If mismatch: follow chain of failures until match or reach 0.

### Applications
- Count occurrences of pattern in text.
- Find all pattern positions.
- Period of a string: if (n - fail[n-1]) divides n, then (n - fail[n-1]) is the smallest period.`,
    visualizer: 'kmp',
    code: `// KMP: Build failure function
vector<int> buildKMP(const string& pattern) {
    int m = pattern.size();
    vector<int> fail(m, 0);
    for (int i = 1; i < m; i++) {
        int j = fail[i - 1];
        while (j > 0 && pattern[i] != pattern[j])
            j = fail[j - 1];
        if (pattern[i] == pattern[j]) j++;
        fail[i] = j;
    }
    return fail;
}

// KMP: Search pattern in text
vector<int> kmpSearch(const string& text, const string& pattern) {
    vector<int> fail = buildKMP(pattern);
    vector<int> matches;
    int n = text.size(), m = pattern.size();
    int j = 0;
    for (int i = 0; i < n; i++) {
        while (j > 0 && text[i] != pattern[j])
            j = fail[j - 1];
        if (text[i] == pattern[j]) j++;
        if (j == m) {
            matches.push_back(i - m + 1); // match at index i-m+1
            j = fail[j - 1];
        }
    }
    return matches;
}

// String period using KMP
int smallestPeriod(const string& s) {
    vector<int> fail = buildKMP(s);
    int n = s.size();
    int period = n - fail[n - 1];
    if (n % period == 0) return period;
    return n; // no repeating period
}`
  },
  {
    id: 'string-dp',
    categoryId: 'string',
    title: 'String DP: Edit Distance & LCS',
    difficulty: 'Intermediate',
    description: 'Edit distance (Levenshtein), Longest Common Subsequence, and string alignment.',
    content: `### Edit Distance (Levenshtein Distance)
Minimum operations (insert, delete, replace) to transform string A into string B.
- dp[i][j] = edit distance between A[0..i-1] and B[0..j-1].
- If A[i-1] == B[j-1]: dp[i][j] = dp[i-1][j-1]
- Otherwise: dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])

### Longest Common Subsequence (LCS)
Longest sequence that appears in both strings (not necessarily contiguous).
- dp[i][j] = LCS length of A[0..i-1] and B[0..j-1].
- If A[i-1] == B[j-1]: dp[i][j] = dp[i-1][j-1] + 1
- Otherwise: dp[i][j] = max(dp[i-1][j], dp[i][j-1])

### Longest Common Substring
Longest contiguous substring appearing in both strings.
- dp[i][j] = length of common substring ending at A[i-1] and B[j-1].
- If A[i-1] == B[j-1]: dp[i][j] = dp[i-1][j-1] + 1, else dp[i][j] = 0.

### String Alignment
- Similar to edit distance with different costs for gap penalties, mismatches, and matches.
- Used in bioinformatics (DNA sequence alignment).`,
    visualizer: 'dp',
    code: `// Edit Distance
int editDistance(const string& a, const string& b) {
    int n = a.size(), m = b.size();
    vector<vector<int>> dp(n+1, vector<int>(m+1));
    for (int i = 0; i <= n; i++) dp[i][0] = i;
    for (int j = 0; j <= m; j++) dp[0][j] = j;

    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++) {
            if (a[i-1] == b[j-1])
                dp[i][j] = dp[i-1][j-1];
            else
                dp[i][j] = 1 + min({dp[i-1][j], dp[i][j-1], dp[i-1][j-1]});
        }
    return dp[n][m];
}

// LCS (with reconstruction)
string LCS(const string& a, const string& b) {
    int n = a.size(), m = b.size();
    vector<vector<int>> dp(n+1, vector<int>(m+1, 0));

    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++) {
            if (a[i-1] == b[j-1]) dp[i][j] = dp[i-1][j-1] + 1;
            else dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
        }

    // Reconstruct
    string result;
    int i = n, j = m;
    while (i > 0 && j > 0) {
        if (a[i-1] == b[j-1]) { result += a[i-1]; i--; j--; }
        else if (dp[i-1][j] > dp[i][j-1]) i--;
        else j--;
    }
    reverse(result.begin(), result.end());
    return result;
}`
  },
  {
    id: 'string-suffix',
    categoryId: 'string',
    title: 'Suffix Array & LCP',
    difficulty: 'Advanced',
    description: 'Suffix Array construction in O(N log N) and Longest Common Prefix array.',
    content: `### Suffix Array
A sorted array of all suffixes of a string, represented by their starting indices.
- For string "banana": suffixes sorted are "a", "ana", "anana", "banana", "na", "nana".
- Suffix Array = [5, 3, 1, 0, 4, 2].

### Construction — O(N log N)
- Use radix sort with doubling technique.
- Start with single characters, then sort by pairs of ranks, doubling the prefix length each iteration.

### Longest Common Prefix (LCP) Array
LCP[i] = length of longest common prefix between suffix[i] and suffix[i-1] in the sorted order.
- Kasai's algorithm computes LCP array in O(N) given the suffix array.

### Applications
- **Longest repeated substring**: max(LCP array).
- **Number of distinct substrings**: N×(N+1)/2 - sum(LCP array).
- **Pattern matching**: Binary search on suffix array + LCP for O(M log N) matching.
- **Longest common substring of two strings**: Concatenate with separator, build SA + LCP.`,
    visualizer: 'none',
    code: `// Suffix Array: O(N log^2 N) construction
vector<int> buildSuffixArray(const string& s) {
    int n = s.size();
    vector<int> sa(n), rank_(n), tmp(n);
    iota(sa.begin(), sa.end(), 0);
    for (int i = 0; i < n; i++) rank_[i] = s[i];

    for (int k = 1; k < n; k <<= 1) {
        auto cmp = [&](int a, int b) {
            if (rank_[a] != rank_[b]) return rank_[a] < rank_[b];
            int ra = a + k < n ? rank_[a + k] : -1;
            int rb = b + k < n ? rank_[b + k] : -1;
            return ra < rb;
        };
        sort(sa.begin(), sa.end(), cmp);
        tmp[sa[0]] = 0;
        for (int i = 1; i < n; i++)
            tmp[sa[i]] = tmp[sa[i-1]] + cmp(sa[i-1], sa[i]);
        rank_ = tmp;
    }
    return sa;
}

// Kasai's Algorithm: LCP array in O(N)
vector<int> buildLCP(const string& s, const vector<int>& sa) {
    int n = s.size();
    vector<int> rank_(n), lcp(n, 0);
    for (int i = 0; i < n; i++) rank_[sa[i]] = i;

    int h = 0;
    for (int i = 0; i < n; i++) {
        if (rank_[i] > 0) {
            int j = sa[rank_[i] - 1];
            while (i + h < n && j + h < n && s[i+h] == s[j+h]) h++;
            lcp[rank_[i]] = h;
            if (h > 0) h--;
        }
    }
    return lcp;
}

// Number of distinct substrings
long long distinctSubstrings(const string& s) {
    auto sa = buildSuffixArray(s);
    auto lcp = buildLCP(s, sa);
    long long n = s.size();
    long long total = n * (n + 1) / 2;
    for (int x : lcp) total -= x;
    return total;
}`
  },

  // ==========================================
  // Chapter 7: Computational Geometry
  // ==========================================
  {
    id: 'geometry-points-lines',
    categoryId: 'geometry',
    title: 'Points, Lines & Vectors',
    difficulty: 'Intermediate',
    description: 'Point representation, vector operations, cross product, and line geometry.',
    content: `### Point Representation
Use \`struct Point { double x, y; };\` or \`pair<double,double>\`.

### Vector Operations
- **Addition**: (a.x + b.x, a.y + b.y)
- **Subtraction**: (a.x - b.x, a.y - b.y)
- **Dot product**: a.x × b.x + a.y × b.y = |a||b|cos(θ)
- **Cross product**: a.x × b.y - a.y × b.x = |a||b|sin(θ)
  - Positive → b is counter-clockwise from a
  - Negative → b is clockwise from a
  - Zero → collinear

### Lines
- **General form**: ax + by + c = 0 (preferred for exact arithmetic).
- Given two points (x1,y1) and (x2,y2): a = y1-y2, b = x2-x1, c = x1×y2 - x2×y1.
- **Slope-intercept**: y = mx + b (avoid due to vertical lines).

### Line Intersection
Solve system of equations. Use cross product to check if parallel.

### Distance
- **Point to point**: √((x2-x1)² + (y2-y1)²)
- **Point to line**: |ax + by + c| / √(a² + b²)
- **Point to segment**: Check if projection falls on segment, otherwise distance to closer endpoint.

### Floating Point Tips
- Use \`EPS = 1e-9\` for comparisons.
- Prefer integer arithmetic when possible (use cross product instead of angles).`,
    visualizer: 'none',
    code: `const double EPS = 1e-9;

struct Point {
    double x, y;
    Point(double x = 0, double y = 0) : x(x), y(y) {}
    Point operator-(const Point& p) const { return {x-p.x, y-p.y}; }
    Point operator+(const Point& p) const { return {x+p.x, y+p.y}; }
    Point operator*(double t) const { return {x*t, y*t}; }
    double dot(const Point& p) const { return x*p.x + y*p.y; }
    double cross(const Point& p) const { return x*p.y - y*p.x; }
    double norm() const { return sqrt(x*x + y*y); }
};

// Distance from point to line (defined by two points a, b)
double distToLine(Point p, Point a, Point b) {
    Point ab = b - a, ap = p - a;
    return fabs(ab.cross(ap)) / ab.norm();
}

// Distance from point to segment
double distToSegment(Point p, Point a, Point b) {
    Point ab = b - a, ap = p - a;
    double t = ap.dot(ab) / ab.dot(ab);
    t = max(0.0, min(1.0, t));
    Point closest = a + ab * t;
    return (p - closest).norm();
}

// Line intersection (returns true if lines intersect)
bool lineIntersect(Point a, Point b, Point c, Point d, Point& result) {
    double A1 = b.y - a.y, B1 = a.x - b.x, C1 = A1*a.x + B1*a.y;
    double A2 = d.y - c.y, B2 = c.x - d.x, C2 = A2*c.x + B2*c.y;
    double det = A1*B2 - A2*B1;
    if (fabs(det) < EPS) return false; // parallel
    result.x = (C1*B2 - C2*B1) / det;
    result.y = (A1*C2 - A2*C1) / det;
    return true;
}

// Orientation: 0=collinear, 1=CW, 2=CCW
int orientation(Point p, Point q, Point r) {
    double v = (q - p).cross(r - p);
    if (fabs(v) < EPS) return 0;
    return v > 0 ? 2 : 1;
}`
  },
  {
    id: 'geometry-circles-triangles',
    categoryId: 'geometry',
    title: 'Circles & Triangles',
    difficulty: 'Intermediate',
    description: 'Circle properties, triangle area, circumscribed/inscribed circles.',
    content: `### Circle
- Defined by center (cx, cy) and radius r.
- Equation: (x - cx)² + (y - cy)² = r²
- Area = π × r², Circumference = 2 × π × r.

### Circle-Line Intersection
- Distance from center to line ≤ r → intersection.
- Solve quadratic equation for exact points.

### Circle-Circle Intersection
- Distance between centers d:
  - d > r1 + r2: no intersection
  - d = r1 + r2: external tangent
  - |r1 - r2| < d < r1 + r2: two intersection points
  - d = |r1 - r2|: internal tangent
  - d < |r1 - r2|: contained

### Triangle Properties
- **Area** = ½|cross product| = ½|x1(y2-y3) + x2(y3-y1) + x3(y1-y2)|
- **Heron's formula**: Area = √(s(s-a)(s-b)(s-c)) where s = (a+b+c)/2.
- **Circumscribed circle**: Passes through all 3 vertices. R = abc / (4 × Area).
- **Inscribed circle**: Tangent to all 3 sides. r = Area / s.

### Useful Facts
- Sum of angles in triangle = 180° = π radians.
- Law of cosines: c² = a² + b² - 2ab×cos(C).
- Law of sines: a/sin(A) = b/sin(B) = c/sin(C) = 2R.`,
    visualizer: 'none',
    code: `// Triangle area using cross product
double triangleArea(Point a, Point b, Point c) {
    return fabs((b - a).cross(c - a)) / 2.0;
}

// Heron's formula
double heronArea(double a, double b, double c) {
    double s = (a + b + c) / 2.0;
    return sqrt(s * (s-a) * (s-b) * (s-c));
}

// Check if point is inside circle
bool insideCircle(Point p, Point center, double r) {
    return (p - center).dot(p - center) <= r * r + EPS;
}

// Minimum enclosing circle (Welzl's algorithm) — O(N) expected
// ... (randomized incremental)

// Circumscribed circle of triangle
pair<Point, double> circumscribedCircle(Point a, Point b, Point c) {
    double D = 2.0 * (a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y));
    double ux = ((a.x*a.x + a.y*a.y) * (b.y - c.y) +
                 (b.x*b.x + b.y*b.y) * (c.y - a.y) +
                 (c.x*c.x + c.y*c.y) * (a.y - b.y)) / D;
    double uy = ((a.x*a.x + a.y*a.y) * (c.x - b.x) +
                 (b.x*b.x + b.y*b.y) * (a.x - c.x) +
                 (c.x*c.x + c.y*c.y) * (b.x - a.x)) / D;
    Point center = {ux, uy};
    double radius = (a - center).norm();
    return {center, radius};
}`
  },
  {
    id: 'geometry-polygon',
    categoryId: 'geometry',
    title: 'Polygons & Convex Hull',
    difficulty: 'Advanced',
    description: 'Polygon area, convexity test, point-in-polygon, and convex hull algorithms.',
    content: `### Polygon Representation
Ordered list of vertices (usually counter-clockwise).

### Polygon Area (Shoelace Formula)
Area = ½|Σ(xᵢ × yᵢ₊₁ - xᵢ₊₁ × yᵢ)| for i = 0 to n-1 (cyclic).

### Polygon Perimeter
Sum of distances between consecutive vertices.

### Convexity Check
A polygon is convex if all cross products of consecutive edge vectors have the same sign.

### Point in Polygon
- **Convex polygon**: Binary search on angles → O(log N).
- **General polygon**: Ray casting — count intersections with edges. Odd = inside.
- **Winding number**: More robust alternative.

### Convex Hull — O(N log N)
Smallest convex polygon containing all points.

### Graham's Scan Algorithm
1. Find the bottom-most point (leftmost if tie) as pivot.
2. Sort other points by polar angle with respect to pivot.
3. Process points: maintain a stack. If new point makes a non-left turn with top two stack points, pop the top.

### Andrew's Monotone Chain
1. Sort points by (x, y).
2. Build lower hull (left to right).
3. Build upper hull (right to left).
4. Combine.`,
    visualizer: 'convexhull',
    code: `// Polygon Area (Shoelace formula)
double polygonArea(vector<Point>& poly) {
    double area = 0;
    int n = poly.size();
    for (int i = 0; i < n; i++) {
        int j = (i + 1) % n;
        area += poly[i].x * poly[j].y;
        area -= poly[j].x * poly[i].y;
    }
    return fabs(area) / 2.0;
}

// Convex Hull: Andrew's Monotone Chain — O(N log N)
vector<Point> convexHull(vector<Point> pts) {
    int n = pts.size(), k = 0;
    if (n < 3) return pts;
    sort(pts.begin(), pts.end(), [](const Point& a, const Point& b) {
        return a.x < b.x || (a.x == b.x && a.y < b.y);
    });

    vector<Point> hull(2 * n);
    // Lower hull
    for (int i = 0; i < n; i++) {
        while (k >= 2 && (hull[k-1] - hull[k-2]).cross(pts[i] - hull[k-2]) <= 0) k--;
        hull[k++] = pts[i];
    }
    // Upper hull
    for (int i = n - 2, t = k + 1; i >= 0; i--) {
        while (k >= t && (hull[k-1] - hull[k-2]).cross(pts[i] - hull[k-2]) <= 0) k--;
        hull[k++] = pts[i];
    }
    hull.resize(k - 1);
    return hull;
}

// Point in convex polygon: O(log N) with binary search
// Point in general polygon: Ray casting O(N)
bool pointInPolygon(Point p, vector<Point>& poly) {
    int n = poly.size();
    bool inside = false;
    for (int i = 0, j = n - 1; i < n; j = i++) {
        if ((poly[i].y > p.y) != (poly[j].y > p.y) &&
            p.x < (poly[j].x - poly[i].x) * (p.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
            inside = !inside;
    }
    return inside;
}`
  },

  // ==========================================
  // Chapter 8: Advanced Topics
  // ==========================================
  {
    id: 'advanced-decomposition',
    categoryId: 'advanced',
    title: 'Problem Decomposition',
    difficulty: 'Advanced',
    description: 'Breaking complex problems into multiple components and combining solutions.',
    content: `### Multi-Component Problems
Many contest problems require combining 2-3 well-known algorithms.

### Approach
1. **Identify components**: Read the problem carefully. What sub-problems does it contain?
2. **Solve each component**: Apply the appropriate algorithm for each part.
3. **Combine**: Connect the outputs, respecting dependencies.

### Common Combinations
- **Graph + DP**: Find shortest paths, then use DP on the result.
- **Geometry + Sorting**: Sort points, then apply geometric algorithms.
- **Number Theory + DP**: Precompute primes/factors, then use DP.
- **Binary Search + Greedy/DP**: Binary search the answer, validate with greedy or DP.
- **BFS/DFS + Union-Find**: Traverse graph while maintaining components.

### Tips
- Think about what data structure would help bridge two algorithms.
- Precomputation is key — compute what you can upfront.
- Practice recognizing these patterns in past contest problems.`,
    visualizer: 'none',
    code: `// Example: Binary Search + Greedy validation
// Problem: Split array into K subarrays minimizing max sum

bool canSplit(vector<int>& arr, int k, long long maxSum) {
    int parts = 1;
    long long curSum = 0;
    for (int x : arr) {
        if (x > maxSum) return false;
        if (curSum + x > maxSum) {
            parts++;
            curSum = x;
        } else {
            curSum += x;
        }
    }
    return parts <= k;
}

long long minMaxSum(vector<int>& arr, int k) {
    long long lo = *max_element(arr.begin(), arr.end());
    long long hi = accumulate(arr.begin(), arr.end(), 0LL);
    long long ans = hi;
    while (lo <= hi) {
        long long mid = lo + (hi - lo) / 2;
        if (canSplit(arr, k, mid)) {
            ans = mid;
            hi = mid - 1;
        } else {
            lo = mid + 1;
        }
    }
    return ans;
}`
  },
  {
    id: 'advanced-search',
    categoryId: 'advanced',
    title: 'Advanced Search: A* & IDA*',
    difficulty: 'Advanced',
    description: 'A* algorithm, Iterative Deepening, and IDA* for state-space search.',
    content: `### A* Search
- Best-first search with f(n) = g(n) + h(n).
  - g(n): cost from start to current node.
  - h(n): heuristic estimate from current to goal.
- If h(n) is admissible (never overestimates) → A* finds optimal solution.
- If h(n) is also consistent (h(n) ≤ cost(n,n') + h(n')) → nodes are expanded at most once.

### Iterative Deepening DFS (IDS)
- Run DFS with increasing depth limits: 1, 2, 3, ...
- Combines BFS's optimality with DFS's memory efficiency.
- Overhead is small because most nodes are at the deepest level.

### IDA* (Iterative Deepening A*)
- Combine IDS with A*'s heuristic.
- Set threshold = h(start). Do DFS, pruning if f(n) > threshold.
- If not found, increase threshold to minimum f(n) that exceeded threshold.
- Very memory efficient (linear in depth).

### When to Use
- **BFS/Dijkstra**: When state space fits in memory.
- **A***: When a good heuristic exists and state space is large.
- **IDA***: When state space is very large (puzzle solving, planning).

### Classic Problems
- 15-puzzle (4×4 sliding puzzle) — IDA* with Manhattan distance heuristic.
- Rubik's cube — IDA*.
- Pathfinding in games — A*.`,
    visualizer: 'none',
    code: `// A* Search (generic)
struct State {
    int cost, heuristic;
    // ... state representation
    int f() const { return cost + heuristic; }
    bool operator>(const State& o) const { return f() > o.f(); }
};

int aStar(State start, State goal) {
    priority_queue<State, vector<State>, greater<State>> pq;
    map<StateKey, int> best; // best g-cost for each state
    pq.push(start);
    best[start.key()] = 0;

    while (!pq.empty()) {
        State cur = pq.top(); pq.pop();
        if (cur == goal) return cur.cost;
        if (cur.cost > best[cur.key()]) continue;

        for (State next : cur.neighbors()) {
            if (!best.count(next.key()) || next.cost < best[next.key()]) {
                best[next.key()] = next.cost;
                pq.push(next);
            }
        }
    }
    return -1; // not found
}

// IDA* (Iterative Deepening A*)
int threshold;
int dfs(State cur, int g) {
    int f = g + cur.heuristic;
    if (f > threshold) return f;
    if (cur.isGoal()) return -1; // found!

    int minExceeded = INT_MAX;
    for (State next : cur.neighbors()) {
        int result = dfs(next, g + next.stepCost);
        if (result == -1) return -1;
        minExceeded = min(minExceeded, result);
    }
    return minExceeded;
}

int idaStar(State start) {
    threshold = start.heuristic;
    while (true) {
        int result = dfs(start, 0);
        if (result == -1) return threshold; // found at this depth
        if (result == INT_MAX) return -1; // no solution
        threshold = result;
    }
}`
  }
];

// Merge topic enhancements into base topics
export const topics = _rawTopics.map(topic => ({
  ...topic,
  ...(topicEnhancements[topic.id] || {}),
}));
