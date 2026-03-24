# POSN 2025 Camp - Complete Study Guide & Revision Notes

> **Camp Duration:** 14 - 28 March 2026
> **Grader:** [http://grader1.cs.sci.ku.ac.th/](http://grader1.cs.sci.ku.ac.th/)

---

## Table of Contents

1. [Day 1-2: C++ STL (Basic + Intermediate + Advanced)](#day-1-2-c-stl)
2. [Day 3: Linked Lists, Hashing, Stacks and Queues](#day-3-linked-lists-hashing-stacks-and-queues)
3. [Day 4: Sorting Algorithms and Complexity Analysis](#day-4-sorting-algorithms-and-complexity-analysis)
4. [Day 5: Trees, Spanning Tree, Binary Search Tree, Heaps](#day-5-trees-spanning-tree-bst-heaps)
5. [Day 6: Review 1](#day-6-review-1)
6. [Day 7: State Space Search, Exhaustive Search](#day-7-state-space-search-exhaustive-search)
7. [Day 8: Bitsets, Bitmarks, RSQ, Union-Find, Disjoint-Set](#day-8-bitsets-bitmasks-rsq-union-find)
8. [Day 9: String / Pattern Matching (KMP, Rabin-Karp, Horspool's)](#day-9-string--pattern-matching)
9. [Day 10: Greedy Algorithms, Divide and Conquer](#day-10-greedy-algorithms-divide-and-conquer)
10. [Day 11: Graph Algorithms - Definition, Adjacency Matrix/List, DFS, BFS](#day-11-graph-algorithms-basics)
11. [Day 12: Graph Algorithms - MST, Kruskal's, Prim's, Dijkstra's, TSP, Topological Sort](#day-12-graph-algorithms-advanced)
12. [Day 13: Dynamic Programming](#day-13-dynamic-programming)
13. [Day 14: Review 2](#day-14-review-2)

---

## Day 1-2: C++ STL

**Date:** Sat 14 - Sun 15 Mar | **Slides:** `study_file/C++ STL.pptx`

### Key Concepts

- **Containers:**
  - **Sequence:** `vector`, `deque`, `list`, `array`
  - **Associative:** `set`, `map`, `multiset`, `multimap`
  - **Unordered:** `unordered_set`, `unordered_map`
  - **Adaptor:** `stack`, `queue`, `priority_queue`
- **Iterators:** `begin()`, `end()`, `rbegin()`, `rend()`
- **Algorithms:** `sort()`, `find()`, `binary_search()`, `lower_bound()`, `upper_bound()`, `next_permutation()`
- **Pairs & Tuples:** `pair<T1,T2>`, `make_pair()`, structured bindings
- **Lambda Functions:** Custom comparators for sorting

### Important Patterns

```cpp
// Custom sort by last digit
sort(a.begin(), a.end(), [](int x, int y) {
    return x % 10 < y % 10;
});

// Using map for frequency counting
map<int, int> freq;
for (auto x : arr) freq[x]++;

// Priority queue (min-heap)
priority_queue<int, vector<int>, greater<int>> pq;
```

### Practice Problems

| Problem | Location | Description |
|---------|----------|-------------|
| find_dist | `STUDY/code/D1-2 STL/find_dist.cpp` | Distance between 2D points |
| sort_by_last_num | `STUDY/code/D1-2 STL/sort_by_last_num.cpp` | Sort by last digit with lambda |
| find_duplicate_num | `STUDY/code/D1-2 STL/find_duplicate_num.cpp` | Find duplicates in array |

### Online Practice

- [CSES Problem Set - Introductory](https://cses.fi/problemset/) (Weird Algorithm, Missing Number, Repetitions, Increasing Array, Permutations, etc.)

---

## Day 3: Linked Lists, Hashing, Stacks and Queues

**Date:** Mon 16 Mar | **Slides:** `study_file/POSN - Pointers Linked Lists Stack and Queue.pdf`, `study_file/POSN - STL Stack and Queue.pdf`, `study_file/POSN - Hash.pdf`

### Key Concepts

- **Stack (LIFO):** `push()`, `pop()`, `top()`, `empty()`
  - Applications: bracket matching, expression evaluation, DFS
- **Queue (FIFO):** `push()`, `pop()`, `front()`, `empty()`
  - Applications: BFS, job scheduling, level-order traversal
- **Linked List:** Node-based dynamic data structure, pointer manipulation
- **Hashing:** Hash function, collision handling (chaining, open addressing)
  - `unordered_map` / `unordered_set` for O(1) average lookup

### Important Patterns

```cpp
// Bracket matching with stack
stack<char> s;
for (char c : str) {
    if (c == '(' || c == '[' || c == '{') s.push(c);
    else {
        if (s.empty() || !match(s.top(), c)) return false;
        s.pop();
    }
}
return s.empty();

// BFS on grid
queue<pair<int,int>> q;
q.push({startR, startC});
while (!q.empty()) {
    auto [r, c] = q.front(); q.pop();
    for (auto [dr, dc] : dirs) { /* explore neighbors */ }
}
```

### Practice Problems

| Problem | Location | Description |
|---------|----------|-------------|
| Stack Implementation | `STUDY/code/D3/lab_01_01.cpp` | Basic stack with push/pop |
| Queue Implementation | `STUDY/code/D3/lab_01_02.cpp` | Basic queue with enqueue/dequeue |
| Bracket Matching | `STUDY/code/D3/lab_02_A_01.cpp` | Validate nested brackets `()[]{}` |
| Next Greater Element | `STUDY/code/D3/lab_02_A_02.cpp` | Stack-based O(N) solution |
| BFS on Grid | `STUDY/code/D3/lab_02_B_01.cpp` | Shortest path S to E on grid |
| Rotting Oranges | `STUDY/code/D3/lab_02_B_02.cpp` | Multi-source BFS on grid |
| Frequency Count | `STUDY/code/D3/lab_03_01.cpp` | Count occurrences sorted |
| Two Sum | `STUDY/code/D3/lab_03_02.cpp` | O(N) hash table solution |
| String Frequency + Rank | `STUDY/code/D3/lab_03_03.cpp` | ADD/COUNT/RANK queries |
| Palindrome Check | `STUDY/code/D3/lab_04_01.cpp` | Can string form palindrome? |
| Distinct Values | `STUDY/code/D3/lab_04_02.cpp` | Count unique values in stream |
| Job Scheduling | `STUDY/code/D3/lab_04_03.cpp` | FIFO processor queue simulation |

### Online Practice

- [CSES - Palindrome Reorder](https://cses.fi/problemset/task/1755)
- [LeetCode 3 - Longest Substring Without Repeating](https://leetcode.com/problems/longest-substring-without-repeating-characters/)

---

## Day 4: Sorting Algorithms and Complexity Analysis

**Date:** Tue 17 Mar | **Slides:** `study_file/Sorting-69.pdf`

### Key Concepts

- **O(n^2) Sorts:** Bubble Sort, Selection Sort, Insertion Sort
- **O(n log n) Sorts:** Merge Sort, Quick Sort, Heap Sort
- **Special Sorts:** Counting Sort O(n+k), Radix Sort O(d*(n+k))
- **Complexity Analysis:** Big-O, Big-Omega, Big-Theta
- **std::sort()** uses IntroSort (hybrid of QuickSort, HeapSort, InsertionSort) - O(n log n)
- **Stable vs Unstable:** `stable_sort()` preserves relative order of equal elements

### Important Patterns

```cpp
// Merge sort (divide & conquer)
void mergeSort(int arr[], int l, int r) {
    if (l >= r) return;
    int mid = (l + r) / 2;
    mergeSort(arr, l, mid);
    mergeSort(arr, mid + 1, r);
    merge(arr, l, mid, r);
}

// Custom struct sorting
sort(dates.begin(), dates.end(), [](Date& a, Date& b) {
    if (a.year != b.year) return a.year > b.year;
    return a.month < b.month;
});
```

### Practice Problems

| Problem | Location | Description |
|---------|----------|-------------|
| Fast Sorting | `grader/sort_q_stack/Fast_Sorting.cpp` | Basic std::sort |
| Merge Sort | `grader/sort_q_stack/New_Merge_Sort.cpp` | Merge sort implementation |
| Sort Dates | `grader/sort_q_stack/sortDate.cpp` | Custom comparator sorting |
| Duplicate-3 | `grader/sort_q_stack/Duplicate-3.cpp` | Elements appearing >= n/3 times |
| Zero Testing | `grader/sort_q_stack/Zero_Testing.cpp` | Count zeros in array |
| 3Sum | `grader/sort_q_stack/3Sum.cpp` | Two-pointer after sorting |
| Queue Reconstruction | `grader/sort_q_stack/Queue_Reconstruction.cpp` | Sort + insert strategy |

### Online Practice

- [CSES - Sorting and Searching section](https://cses.fi/problemset/)
- Grader: [http://grader1.cs.sci.ku.ac.th/](http://grader1.cs.sci.ku.ac.th/)

---

## Day 5: Trees, Spanning Tree, BST, Heaps

**Date:** Wed 18 Mar | **Slides:** `study_file/1-Tree.pdf`, `study_file/2-BinarySearchTree.pdf`, `study_file/3-Heap.pdf`, `study_file/4-Spanning_tree.pdf`

### Key Concepts

- **Tree Properties:** N nodes, N-1 edges, unique path between any two nodes
- **Binary Tree Traversals:**
  - **Inorder** (Left, Root, Right) - gives sorted order for BST
  - **Preorder** (Root, Left, Right) - copy/serialize tree
  - **Postorder** (Left, Right, Root) - delete/evaluate tree
  - **Level-order** - BFS with queue
- **Binary Search Tree (BST):**
  - Search, Insert, Delete: O(h) where h = height
  - Balanced BST: h = O(log n)
- **Heap (Priority Queue):**
  - Max-Heap: parent >= children
  - Min-Heap: parent <= children
  - Insert/Delete: O(log n), Get min/max: O(1)
- **Spanning Tree:** Subgraph connecting all vertices with minimum edges

### Important Patterns

```cpp
// BST Insert
Node* insert(Node* root, int val) {
    if (!root) return new Node(val);
    if (val < root->val) root->left = insert(root->left, val);
    else root->right = insert(root->right, val);
    return root;
}

// Tree traversal (inorder)
void inorder(Node* root) {
    if (!root) return;
    inorder(root->left);
    cout << root->val << " ";
    inorder(root->right);
}
```

### Practice Problems

| Problem | Location | Description |
|---------|----------|-------------|
| BST v2 | `grader/tree/Binary_Search_Tree_v2.cpp` | BST insert implementation |
| BST Traversal | `grader/tree/Binary_Search_Tree_Traversal.cpp` | All tree traversals |
| Largest Subtree Sum | `grader/tree/Largest_Subtree_Sum.cpp` | DFS to find max subtree sum |
| Binary Leaf | `grader/tree/BinaryLeaf.cpp` | Count leaf nodes |

### Online Practice

- Grader: [http://grader1.cs.sci.ku.ac.th/](http://grader1.cs.sci.ku.ac.th/)
- [CSES - Tree Algorithms](https://cses.fi/problemset/)

---

## Day 6: Review 1

**Date:** Thu 19 Mar

Review of Days 1-5: STL, Data Structures, Sorting, Trees.

---

## Day 7: State Space Search, Exhaustive Search

**Date:** Fri 20 Mar | **Slides:** `study_file/01-CompleteSearch.pdf`, `study_file/02-StateSpaceSearch.pdf`

### Key Concepts

- **Complete/Exhaustive Search:** Try all possibilities
  - Brute force enumeration
  - Recursive backtracking
  - Bitmask enumeration (2^n subsets)
- **State Space Search:**
  - Define state, transitions, initial state, goal state
  - **BFS** for shortest path (unweighted)
  - **DFS** for existence/enumeration
- **Pruning:** Cut branches early when they can't lead to a solution
- **Backtracking:** Try, recurse, undo (used for permutations, N-Queens, Sudoku)

### Important Patterns

```cpp
// Bitmask subset enumeration
for (int mask = 0; mask < (1 << n); mask++) {
    int sum = 0;
    for (int i = 0; i < n; i++)
        if (mask & (1 << i)) sum += arr[i];
    if (sum == target) found = true;
}

// Backtracking template
void solve(int idx, State& state) {
    if (isGoal(state)) { record(); return; }
    for (auto& choice : choices(idx)) {
        apply(state, choice);
        solve(idx + 1, state);
        undo(state, choice);  // backtrack
    }
}
```

### Practice Problems

| Problem | Location | Description |
|---------|----------|-------------|
| Equations | `grader/state space search/Equations.cpp` | Find i,j,k satisfying 3 equations |
| pls_ans_me | `grader/state space search/pls_ans_me.cpp` | Subset sum with DP |
| make_prime | `grader/state space search/make_prime.cpp` | BFS to transform number to prime |
| Midnight Museum | `grader/state space search/Midnight_Museum.cpp` | Bitmask knapsack backtracking |

### Online Practice

- Grader: [http://grader1.cs.sci.ku.ac.th/](http://grader1.cs.sci.ku.ac.th/)
- [CSES - Introductory Problems](https://cses.fi/problemset/) (Two Sets, Bit Strings)

---

## Day 8: Bitsets, Bitmasks, RSQ, Union-Find

**Date:** Sat 21 Mar | **Slides:** `study_file/bitset-bitmask-book.pdf`, `study_file/rsq-book.pdf`, `study_file/fenwick-tree-book.pdf`, `study_file/fenwick-tree-slide.pdf`, `study_file/union-find-book.pdf`, `study_file/union-find-slides.pdf`

### Key Concepts

#### Bitmask & Bitset
- **Bit operations:** `&` (AND), `|` (OR), `^` (XOR), `~` (NOT), `<<` (shift left), `>>` (shift right)
- **Check bit i:** `(x >> i) & 1`
- **Set bit i:** `x | (1 << i)`
- **Clear bit i:** `x & ~(1 << i)`
- **Toggle bit i:** `x ^ (1 << i)`
- **C++ bitset<N>:** `count()`, `set()`, `reset()`, `flip()`, `test()`

#### Range Sum Query (RSQ)
- **Prefix Sum:** O(n) build, O(1) query - `sum(l,r) = prefix[r] - prefix[l-1]`
- **2D Prefix Sum:** Inclusion-exclusion for rectangle sum
- **Fenwick Tree (BIT):** O(n) build, O(log n) update & query
- **Kadane's Algorithm:** Maximum subarray sum in O(n)

#### Union-Find (Disjoint Set Union)
- **find(x):** With path compression
- **union(x, y):** With union by rank/size
- Both operations amortized O(alpha(n)) ~ O(1)

### Important Patterns

```cpp
// Fenwick Tree
void update(int i, int delta) {
    for (; i <= n; i += i & (-i)) bit[i] += delta;
}
int query(int i) {
    int sum = 0;
    for (; i > 0; i -= i & (-i)) sum += bit[i];
    return sum;
}

// Union-Find with path compression + union by rank
int find(int x) {
    if (parent[x] != x) parent[x] = find(parent[x]);
    return parent[x];
}
void unite(int x, int y) {
    x = find(x); y = find(y);
    if (x == y) return;
    if (rank[x] < rank[y]) swap(x, y);
    parent[y] = x;
    if (rank[x] == rank[y]) rank[x]++;
}

// Kadane's Algorithm
int maxSum = arr[0], cur = arr[0];
for (int i = 1; i < n; i++) {
    cur = max(arr[i], cur + arr[i]);
    maxSum = max(maxSum, cur);
}
```

### Practice Problems

| Problem | Location | Description |
|---------|----------|-------------|
| Subset Sum (Bitmask) | `grader/BitSet/subSetSum.cpp` | Generate all 2^n subsets |
| Attendance | `grader/BitSet/attandence.cpp` | Bitset count for tracking |
| Network | `grader/BitSet/network.cpp` | Union-Find connectivity |
| Powerset | `grader/BitSet/powersetWithBitmask.cpp` | Print all subsets |
| Split | `grader/BitSet/split.cpp` | Split binary into two numbers |
| Sum Between | `grader/RSQ/sum-between.cpp` | Prefix sum range query |
| Max 2D Range | `grader/RSQ/max-2d-range-v2.cpp` | 2D Kadane's algorithm |
| Take the Land | `grader/RSQ/take-the-land.cpp` | 2D max subarray with forbidden cells |
| Game Player | `grader/RSQ/GamePlayer.cpp` | Max subarray sum variant |
| Joyride | `grader/RSQ/joyride.cpp` | Longest max subarray |

### Online Practice

- Grader: [http://grader1.cs.sci.ku.ac.th/](http://grader1.cs.sci.ku.ac.th/)
- [CSES - Range Queries](https://cses.fi/problemset/)

---

## Day 9: String / Pattern Matching

**Date:** Sun 22 Mar | **Slides:** `study_file/PatternMatching.pdf`

### Key Concepts

- **Naive Pattern Matching:** O(n*m) - check every position
- **KMP (Knuth-Morris-Pratt):** O(n+m)
  - Build LPS (Longest Proper Prefix which is also Suffix) array
  - Use LPS to skip characters on mismatch
- **Rabin-Karp:** O(n+m) average with hashing
  - Rolling hash to compare pattern hash with window hash
  - Handles multiple pattern search efficiently
- **Horspool's Algorithm:** O(n*m) worst, O(n/m) best
  - Bad character shift table
  - Compares pattern right-to-left

### Important Patterns

```cpp
// KMP - Build LPS array
vector<int> buildLPS(string& pat) {
    int m = pat.size();
    vector<int> lps(m, 0);
    int len = 0, i = 1;
    while (i < m) {
        if (pat[i] == pat[len]) { lps[i++] = ++len; }
        else if (len) { len = lps[len - 1]; }
        else { lps[i++] = 0; }
    }
    return lps;
}

// KMP Search
void KMPSearch(string& text, string& pat) {
    auto lps = buildLPS(pat);
    int i = 0, j = 0;
    while (i < text.size()) {
        if (text[i] == pat[j]) { i++; j++; }
        if (j == pat.size()) {
            cout << "Found at " << i - j << endl;
            j = lps[j - 1];
        } else if (i < text.size() && text[i] != pat[j]) {
            j ? j = lps[j - 1] : i++;
        }
    }
}
```

### Practice Problems

| Problem | Location | Description |
|---------|----------|-------------|
| Forbidden Fruit | `grader/string/ForbiddenFruit.cpp` | KMP - build LPS array |
| First Match | `grader/string/FirstMatch.cpp` | KMP - find first occurrence |
| Sunstrings | `grader/string/Sunstrings.cpp` | KMP - count all occurrences |
| All Matches | `grader/string/AllMatches.cpp` | KMP - return all match positions |

### Online Practice

- Grader: [http://grader1.cs.sci.ku.ac.th/](http://grader1.cs.sci.ku.ac.th/)
- [CSES - String Algorithms](https://cses.fi/problemset/)

---

## Day 10: Greedy Algorithms, Divide and Conquer

**Date:** Mon 23 Mar | **Slides:** `study_file/GreedyTechnique.pdf`, `study_file/DivideAndConquer.pdf`

### Key Concepts

#### Greedy
- **Greedy Choice Property:** Locally optimal choice leads to globally optimal
- **Common Patterns:**
  - Activity/Interval Scheduling (sort by end time)
  - Fractional Knapsack (sort by value/weight ratio)
  - Huffman Coding (priority queue, merge two smallest)
  - Coin Change (sort descending, take as many as possible - only works with specific coin sets!)

#### Divide and Conquer
- **Pattern:** Divide into subproblems -> Solve recursively -> Combine results
- **Examples:** Merge Sort, Quick Sort, Binary Search, Maximum Subarray Sum
- **Master Theorem:** T(n) = aT(n/b) + O(n^d)

### Important Patterns

```cpp
// Fractional Knapsack
sort(items.begin(), items.end(), [](Item& a, Item& b) {
    return (double)a.value / a.weight > (double)b.value / b.weight;
});
double totalValue = 0;
for (auto& item : items) {
    if (capacity >= item.weight) {
        totalValue += item.value;
        capacity -= item.weight;
    } else {
        totalValue += item.value * ((double)capacity / item.weight);
        break;
    }
}

// Huffman Coding
priority_queue<int, vector<int>, greater<int>> pq;
for (int f : freq) pq.push(f);
int cost = 0;
while (pq.size() > 1) {
    int a = pq.top(); pq.pop();
    int b = pq.top(); pq.pop();
    cost += a + b;
    pq.push(a + b);
}
```

### Practice Problems

| Problem | Location | Description |
|---------|----------|-------------|
| Huffman Code | `grader/greedy/HuffmanCode.cpp` | Huffman coding with priority queue |
| Fractional Knapsack | `grader/greedy/FractionalKnapsack.cpp` | Sort by value/weight ratio |
| Square Coin Change | `grader/greedy/SquareCoinChange.cpp` | Greedy coin change |
| Pair of Characters | `grader/greedy/PairOfCharacter.cpp` | Character pairing/matching |
| Lucky Number | `grader/greedy/LuckeyNumber.cpp` | Max product of min/max digits |
| Oasis | `grader/greedy/Oasis.cpp` | Greedy selection in range |
| Ann Like Equal | `grader/greedy/AnnLikeEqual.cpp` | Min operations to equalize |
| Max Subarray (D&C) | `grader/DivideAndConquer/maxSumSubseq.cpp` | Kadane's / D&C variant |

### Online Practice

- Grader: [http://grader1.cs.sci.ku.ac.th/](http://grader1.cs.sci.ku.ac.th/)
- [CSES - Sorting and Searching](https://cses.fi/problemset/) (activity scheduling problems)

---

## Day 11: Graph Algorithms - Basics

**Date:** Tue 24 Mar | **Slides:** `study_file/41UndirectedGraphs.pdf`, `study_file/42DirectedGraphs.pdf`

### Key Concepts

- **Graph Representations:**
  - **Adjacency Matrix:** O(V^2) space, O(1) edge check
  - **Adjacency List:** O(V+E) space, O(degree) edge check
  - **Edge List:** O(E) space, useful for Kruskal's
- **BFS (Breadth-First Search):**
  - Uses queue, explores level by level
  - Finds shortest path in unweighted graphs
  - Time: O(V+E)
- **DFS (Depth-First Search):**
  - Uses stack/recursion, explores as deep as possible
  - Detects cycles, finds connected components
  - Time: O(V+E)
- **Directed Graphs:** Topological sort, strongly connected components
- **Topological Sort:** Linear ordering of vertices in DAG
  - Kahn's algorithm (BFS with in-degree) or DFS-based

### Important Patterns

```cpp
// BFS
vector<int> bfs(int start, vector<vector<int>>& adj) {
    vector<int> dist(n, -1);
    queue<int> q;
    dist[start] = 0;
    q.push(start);
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

// Topological Sort (Kahn's)
vector<int> topoSort(vector<vector<int>>& adj, vector<int>& indeg) {
    queue<int> q;
    for (int i = 0; i < n; i++)
        if (indeg[i] == 0) q.push(i);
    vector<int> order;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        order.push_back(u);
        for (int v : adj[u])
            if (--indeg[v] == 0) q.push(v);
    }
    return order;
}
```

### Practice Problems

| Problem | Location | Description |
|---------|----------|-------------|
| Flood Fill | `grader/graph/graph-flood-fill.cpp` | BFS flood fill on grid |
| Map (Max Distance) | `grader/graph/map.cpp` | BFS max distance from node 0 |

### Online Practice

- Grader: [http://grader1.cs.sci.ku.ac.th/](http://grader1.cs.sci.ku.ac.th/)
- [CSES - Graph Algorithms](https://cses.fi/problemset/) (Building Roads, Message Route, Labyrinth, etc.)

---

## Day 12: Graph Algorithms - Advanced

**Date:** Wed 25 Mar | **Slides:** `study_file/43MinimumSpanningTrees.pdf`, `study_file/43DemoKruskal.pdf`, `study_file/43DemoPrim.pdf`, `study_file/43DemoGreedy.pdf`, `study_file/44ShortestPaths.pdf`, `study_file/44DemoDijkstra.pdf`, `study_file/44DemoBellmanFord.pdf`, `study_file/44DemoAcyclicSP.pdf`, `study_file/45FloydWarshall.pdf`

### Key Concepts

#### Minimum Spanning Tree (MST)
- **Kruskal's Algorithm:** Sort edges by weight, add edge if no cycle (Union-Find) - O(E log E)
- **Prim's Algorithm:** Grow tree from source, always pick cheapest edge to new vertex - O(E log V)

#### Shortest Paths
- **Dijkstra's Algorithm:** Single source, non-negative weights - O((V+E) log V) with priority queue
- **Bellman-Ford:** Single source, handles negative weights - O(V*E)
- **Floyd-Warshall:** All pairs shortest paths - O(V^3)
- **DAG Shortest Path:** Topological sort + relaxation - O(V+E)

#### TSP (Travelling Salesman Problem)
- NP-hard, exact solution O(n! or 2^n * n) with bitmask DP
- Approximation and heuristic approaches for large n

### Important Patterns

```cpp
// Dijkstra's Algorithm
vector<long long> dijkstra(int src, vector<vector<pair<int,int>>>& adj) {
    vector<long long> dist(n, LLONG_MAX);
    priority_queue<pair<long long,int>, vector<pair<long long,int>>, greater<>> pq;
    dist[src] = 0;
    pq.push({0, src});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}

// Kruskal's MST
sort(edges.begin(), edges.end()); // sort by weight
int mstCost = 0;
for (auto& [w, u, v] : edges) {
    if (find(u) != find(v)) {
        unite(u, v);
        mstCost += w;
    }
}

// Floyd-Warshall
for (int k = 0; k < n; k++)
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
```

### Online Practice

- Grader: [http://grader1.cs.sci.ku.ac.th/](http://grader1.cs.sci.ku.ac.th/)
- [CSES - Graph Algorithms](https://cses.fi/problemset/) (Shortest Routes I/II, Road Reparation, etc.)

---

## Day 13: Dynamic Programming

**Date:** Thu 26 Mar

### Key Concepts

- **Optimal Substructure:** Optimal solution contains optimal solutions to subproblems
- **Overlapping Subproblems:** Same subproblems solved multiple times
- **Top-Down (Memoization):** Recursive + cache results
- **Bottom-Up (Tabulation):** Fill table iteratively from base cases

#### Classic DP Problems

| Problem | State | Recurrence | Time |
|---------|-------|------------|------|
| Fibonacci | `dp[i]` | `dp[i] = dp[i-1] + dp[i-2]` | O(n) |
| 0/1 Knapsack | `dp[i][w]` | `dp[i][w] = max(dp[i-1][w], dp[i-1][w-wt[i]] + val[i])` | O(nW) |
| Coin Change (min) | `dp[amount]` | `dp[a] = min(dp[a], dp[a-coin]+1)` | O(n*amount) |
| Coin Change (count) | `dp[amount]` | `dp[a] += dp[a-coin]` | O(n*amount) |
| LCS | `dp[i][j]` | if match: `dp[i-1][j-1]+1`, else: `max(dp[i-1][j], dp[i][j-1])` | O(n*m) |
| LIS | `dp[i]` | `dp[i] = max(dp[j]+1)` for j < i, a[j] < a[i] | O(n^2) or O(n log n) |
| Edit Distance | `dp[i][j]` | insert/delete/replace costs | O(n*m) |
| Matrix Chain | `dp[i][j]` | `min(dp[i][k] + dp[k+1][j] + cost)` | O(n^3) |
| Subset Sum | `dp[i][s]` | `dp[i][s] = dp[i-1][s] \|\| dp[i-1][s-a[i]]` | O(n*S) |

### Important Patterns

```cpp
// 0/1 Knapsack (space-optimized)
vector<int> dp(W + 1, 0);
for (int i = 0; i < n; i++)
    for (int w = W; w >= wt[i]; w--)  // reverse order!
        dp[w] = max(dp[w], dp[w - wt[i]] + val[i]);

// Coin Change (minimum coins)
vector<int> dp(amount + 1, INT_MAX);
dp[0] = 0;
for (int coin : coins)
    for (int a = coin; a <= amount; a++)
        if (dp[a - coin] != INT_MAX)
            dp[a] = min(dp[a], dp[a - coin] + 1);

// LCS (Longest Common Subsequence)
vector<vector<int>> dp(n+1, vector<int>(m+1, 0));
for (int i = 1; i <= n; i++)
    for (int j = 1; j <= m; j++)
        dp[i][j] = (a[i-1] == b[j-1])
            ? dp[i-1][j-1] + 1
            : max(dp[i-1][j], dp[i][j-1]);

// LIS (O(n log n) with binary search)
vector<int> lis;
for (int x : arr) {
    auto it = lower_bound(lis.begin(), lis.end(), x);
    if (it == lis.end()) lis.push_back(x);
    else *it = x;
}
// lis.size() is the length of LIS

// Top-down memoization template
map<State, int> memo;
int solve(State s) {
    if (isBase(s)) return baseValue;
    if (memo.count(s)) return memo[s];
    int res = /* recursive computation */;
    return memo[s] = res;
}
```

### Tips for DP
1. **Identify the state:** What info do you need to describe a subproblem?
2. **Write the recurrence:** How does the answer relate to smaller subproblems?
3. **Base cases:** What are the trivial cases?
4. **Order of computation:** Bottom-up must fill in the right order
5. **Space optimization:** Often can reduce from 2D to 1D

### Online Practice

- [CSES - Dynamic Programming](https://cses.fi/problemset/) (Dice Combinations, Minimizing Coins, Coin Combinations I/II, Grid Paths, Book Shop, etc.)
- [Grader](http://grader1.cs.sci.ku.ac.th/)
- [LeetCode DP Problems](https://leetcode.com/tag/dynamic-programming/)

---

## Day 14: Review 2

**Date:** Fri 27 Mar

Review of Days 7-13: State Space Search, Bitsets/RSQ/Union-Find, String Matching, Greedy, D&C, Graphs, DP.

---

## Quick Reference: Complexity Cheat Sheet

| Algorithm | Time | Space |
|-----------|------|-------|
| Binary Search | O(log n) | O(1) |
| Merge Sort | O(n log n) | O(n) |
| Quick Sort | O(n log n) avg | O(log n) |
| BFS / DFS | O(V+E) | O(V) |
| Dijkstra (heap) | O((V+E) log V) | O(V) |
| Bellman-Ford | O(V*E) | O(V) |
| Floyd-Warshall | O(V^3) | O(V^2) |
| Kruskal's MST | O(E log E) | O(V) |
| Prim's MST (heap) | O(E log V) | O(V) |
| KMP | O(n+m) | O(m) |
| Union-Find | O(alpha(n)) per op | O(n) |
| Fenwick Tree | O(log n) per op | O(n) |
| Prefix Sum | O(n) build, O(1) query | O(n) |

---

## All Grader & Practice Links

| Platform | Link |
|----------|------|
| Camp Grader | [http://grader1.cs.sci.ku.ac.th/](http://grader1.cs.sci.ku.ac.th/) |
| CSES Problem Set | [https://cses.fi/problemset/](https://cses.fi/problemset/) |
| LeetCode | [https://leetcode.com/](https://leetcode.com/) |
| UVa Online Judge | [https://onlinejudge.org/](https://onlinejudge.org/) |

---

*Good luck on the exam (Sat 28 Mar)!*
