// Enhanced metadata for topics - merged into curriculum at runtime
export const topicEnhancements = {
  'intro-getting-started': {
    tags: ['beginner', 'fundamentals', 'complexity', 'problem-types'],
    timeComplexity: 'Varies',
    codeSnippets: [
      {
        name: 'Fast I/O Template',
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
}`,
        pythonTutorCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    // Demonstrate fast I/O
    int a = 5, b = 3;
    cout << "Sum: " << a + b << endl;
    cout << "Product: " << a * b << endl;
    return 0;
}`
      }
    ],
    whyLearn: `Competitive Programming sharpens your algorithmic thinking and problem-solving speed — skills that directly transfer to technical interviews and real-world engineering.
- Top tech companies (Google, Meta, etc.) use CP-style questions in interviews
- CP trains you to think in terms of time/space trade-offs before writing code
- Understanding problem types lets you instantly recognize which algorithm to apply, saving precious contest time
- The complexity cheat sheet alone will save you from TLE (Time Limit Exceeded) in 90% of contests`,
    whenToUse: `### Before Every Contest
- Review the complexity cheat sheet to calibrate your approach
- Make sure your template is ready and tested

### When Stuck on a Problem
- Re-read the constraints — they often hint at the expected complexity
- Classify the problem type to narrow down which technique to try`,
    commonMistakes: `- Not reading constraints carefully — solving O(N^2) when N=10^6 requires O(N log N)
- Jumping to code before understanding the full problem statement
- Forgetting edge cases: N=0, N=1, maximum values
- Using \`int\` when the answer requires \`long long\` (values > 2×10^9)
- Not testing with sample inputs before submitting`,
    relatedTopics: ['intro-io-tricks', 'algo-complete-search', 'algo-greedy'],
    practiceProblems: [
      { name: 'A+B Problem', source: 'Kattis', difficulty: 'Easy', url: 'https://open.kattis.com/problems/aplusb' },
      { name: 'Hello World!', source: 'Kattis', difficulty: 'Easy', url: 'https://open.kattis.com/problems/hello' },
    ],
  },

  'intro-io-tricks': {
    tags: ['I/O', 'macros', 'debugging', 'overflow'],
    whyLearn: `Fast I/O can make the difference between AC and TLE. Many contestants lose points not because of wrong algorithms, but because their I/O is too slow.
- \`cin/cout\` without sync can be 10x slower than \`scanf/printf\`
- Debug macros save hours of debugging — professional contestants all use them
- Understanding overflow prevents the most common "wrong answer" mistakes in contests`,
    whenToUse: `### Use Fast I/O When
- The problem has large input (N > 10^5)
- You're using C++ with cin/cout (always add sync_with_stdio(false))

### Use Debug Macros When
- Your solution gives WA on hidden test cases
- You need to trace variable values without manually writing cerr statements`,
    commonMistakes: `- Mixing scanf/printf with cin/cout after disabling sync
- Forgetting cin.tie(NULL) which can cause output buffering issues
- Using endl instead of '\\n' (endl flushes the buffer, much slower)
- Overflow in intermediate calculations: (a*b) can overflow even if the result fits in long long`,
    relatedTopics: ['intro-getting-started'],
    codeSnippets: [
      {
        name: 'Debug Macros',
        code: `// Debug macro (remove before submission)
#ifdef LOCAL
#define debug(x) cerr << #x << " = " << (x) << endl
#define debugv(v) { cerr << #v << " = ["; for(auto& x : v) cerr << x << " "; cerr << "]" << endl; }
#else
#define debug(x)
#define debugv(v)
#endif`,
        pythonTutorCode: null,
      },
      {
        name: 'Fast I/O Patterns',
        code: `// Reading until EOF
int x;
while (scanf("%d", &x) != EOF) {
    // process x
}

// Reading number of test cases
int T;
scanf("%d", &T);
while (T--) {
    // solve each test case
}`,
        pythonTutorCode: `#include <iostream>
using namespace std;

int main() {
    // Demonstrate reading test cases
    int T = 3;
    for (int t = 1; t <= T; t++) {
        int a = t * 10, b = t * 5;
        cout << "Test " << t << ": " << a + b << endl;
    }
    return 0;
}`
      },
      {
        name: 'Overflow-Safe Math',
        code: `// Overflow-safe multiplication under modulo
ll mulmod(ll a, ll b, ll mod) {
    return ((__int128)a * b) % mod;
}`,
        pythonTutorCode: `#include <iostream>
using namespace std;
typedef long long ll;

ll mulmod(ll a, ll b, ll mod) {
    return ((a % mod) * (b % mod)) % mod;
}

int main() {
    ll a = 1000000007LL;
    ll b = 999999937LL;
    ll mod = 1000000007LL;
    cout << "mulmod(" << a << ", " << b << ", " << mod << ") = " << mulmod(a, b, mod) << endl;
    return 0;
}`
      }
    ],
  },

  'ds-linear': {
    tags: ['array', 'vector', 'stack', 'queue', 'deque', 'bitmask'],
    timeComplexity: 'O(1) access',
    whyLearn: `Linear data structures are the foundation of ALL competitive programming. You will use vectors and stacks in virtually every problem.
- **Bitmask** is one of the most powerful CP techniques — it lets you represent subsets as integers, enabling O(2^N) enumeration
- Understanding when to use stack vs queue vs deque is critical for BFS/DFS and sliding window problems
- These structures appear in 80%+ of all CP problems as building blocks`,
    whenToUse: `### Use Vector When
- You need a dynamic array with random access
- You're storing adjacency lists for graphs

### Use Stack When
- Processing parentheses, expression evaluation, DFS
- Monotonic stack for "next greater element" problems

### Use Queue When
- BFS traversal
- Level-order processing

### Use Deque When
- Sliding window minimum/maximum
- You need push/pop from both ends

### Use Bitmask When
- N ≤ 20 and you need to enumerate all subsets
- DP over subsets (bitmask DP)`,
    commonMistakes: `- Using 1 << j with j >= 32 causes undefined behavior — use 1LL << j for long long bitmasks
- Forgetting that vector::push_back can invalidate iterators
- Using stack/queue when deque would be more appropriate
- Not clearing data structures between test cases in multi-test-case problems`,
    complexityAnalysis: `### Time Complexity
- **Array/Vector access**: O(1)
- **Vector push_back**: Amortized O(1)
- **Stack/Queue push/pop**: O(1)
- **Deque push/pop (both ends)**: O(1)

### Space Complexity
- **Bitmask**: O(1) for up to 32/64 elements (int/long long)
- **Vector of N elements**: O(N)`,
    relatedTopics: ['ds-sorting', 'ds-stl', 'algo-complete-search'],
    practiceProblems: [
      { name: 'Balanced Brackets', source: 'HackerRank', difficulty: 'Easy', url: 'https://www.hackerrank.com/challenges/balanced-brackets' },
      { name: 'Next Greater Element I', source: 'LeetCode', difficulty: 'Easy', url: 'https://leetcode.com/problems/next-greater-element-i/' },
    ],
    codeSnippets: [
      {
        name: 'Bitmask Operations',
        code: `int setBit(int S, int j) { return S | (1 << j); }
bool isSet(int S, int j) { return (S >> j) & 1; }
int clearBit(int S, int j) { return S & ~(1 << j); }
int toggleBit(int S, int j) { return S ^ (1 << j); }
int lowBit(int S) { return S & -S; }
int countBits(int S) { return __builtin_popcount(S); }

// Iterate over all subsets of a bitmask
for (int subset = S; subset > 0; subset = (subset - 1) & S) {
    // process subset
}`,
        pythonTutorCode: `#include <iostream>
using namespace std;

int main() {
    int S = 0b1011; // set = {0, 1, 3}
    cout << "S = " << S << " (binary: 1011)" << endl;

    // Set bit 2
    S = S | (1 << 2);
    cout << "After setting bit 2: " << S << endl;

    // Check bit 1
    cout << "Bit 1 is set? " << ((S >> 1) & 1) << endl;

    // Count set bits
    cout << "Number of set bits: " << __builtin_popcount(S) << endl;

    // Iterate over all subsets
    cout << "All subsets of " << S << ": ";
    for (int sub = S; sub > 0; sub = (sub - 1) & S) {
        cout << sub << " ";
    }
    cout << endl;
    return 0;
}`
      },
      {
        name: 'Stack (LIFO)',
        code: `// Stack usage example
stack<int> st;
st.push(10); st.push(20);
int top = st.top(); st.pop();`,
        pythonTutorCode: `#include <iostream>
#include <stack>
using namespace std;

int main() {
    stack<int> st;
    st.push(10);
    st.push(20);
    st.push(30);

    cout << "Stack (top to bottom):" << endl;
    while (!st.empty()) {
        cout << "  top = " << st.top() << endl;
        st.pop();
    }
    return 0;
}`
      },
      {
        name: 'Queue & Deque',
        code: `// Queue usage example
queue<int> q;
q.push(10); q.push(20);
int front = q.front(); q.pop();

// Deque usage example (sliding window min/max)
deque<int> dq;
dq.push_back(10); dq.push_front(5);
int f = dq.front(); dq.pop_front();`,
        pythonTutorCode: `#include <iostream>
#include <queue>
#include <deque>
using namespace std;

int main() {
    // Queue demo
    queue<int> q;
    q.push(10); q.push(20); q.push(30);
    cout << "Queue (FIFO):" << endl;
    while (!q.empty()) {
        cout << "  front = " << q.front() << endl;
        q.pop();
    }

    // Deque demo
    deque<int> dq;
    dq.push_back(10);
    dq.push_front(5);
    dq.push_back(20);
    cout << "Deque: front=" << dq.front() << " back=" << dq.back() << endl;
    return 0;
}`
      }
    ],
  },

  'ds-sorting': {
    tags: ['sorting', 'comparator', 'STL', 'counting-sort'],
    timeComplexity: 'O(N log N)',
    whyLearn: `Sorting is the single most useful preprocessing step in competitive programming. Once data is sorted, many problems become trivially solvable.
- Binary search requires sorted data — and binary search solves a huge class of problems
- Greedy algorithms almost always start with sorting
- Two-pointer technique works on sorted arrays
- Understanding custom comparators lets you sort complex objects for interval scheduling, sweep line, etc.`,
    whenToUse: `### Sort First When
- You need to find duplicates, pairs, or ranges
- The problem asks for the k-th smallest/largest
- You're doing a greedy algorithm (sort by deadline, end time, etc.)
- You want to apply binary search or two pointers

### Use Counting Sort When
- Values are in a small range [0, K) and you need O(N) time
- You need a stable sort with linear time`,
    commonMistakes: `- Writing your own sort instead of using std::sort (it's highly optimized)
- Incorrect comparator: must define strict weak ordering (if a < b is true, b < a must be false)
- Forgetting that std::sort is not stable — use stable_sort if order of equal elements matters
- Sorting when you only need the k-th element — use nth_element for O(N) average`,
    complexityAnalysis: `### Time Complexity
- **std::sort**: O(N log N) guaranteed (IntroSort)
- **std::stable_sort**: O(N log N) but uses extra memory
- **std::nth_element**: O(N) average for finding k-th element
- **Counting sort**: O(N + K) where K is the value range

### Space Complexity
- **std::sort**: O(log N) for recursion stack
- **Counting sort**: O(K) for the count array`,
    relatedTopics: ['ds-linear', 'algo-greedy', 'ds-stl'],
    practiceProblems: [
      { name: 'Sort Colors', source: 'LeetCode', difficulty: 'Medium', url: 'https://leetcode.com/problems/sort-colors/' },
      { name: 'Custom Sort String', source: 'LeetCode', difficulty: 'Medium', url: 'https://leetcode.com/problems/custom-sort-string/' },
    ],
    codeSnippets: [
      {
        name: 'STL Sort & Comparators',
        code: `vector<int> v = {5, 2, 8, 1, 9};
sort(v.begin(), v.end()); // ascending
sort(v.begin(), v.end(), greater<int>()); // descending

// Sort pairs by second element
vector<pair<int,int>> vp = {{1,3},{2,1},{3,2}};
sort(vp.begin(), vp.end(), [](const auto& a, const auto& b) {
    return a.second < b.second;
});`,
        pythonTutorCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {5, 2, 8, 1, 9};

    sort(v.begin(), v.end());
    cout << "Ascending: ";
    for (int x : v) cout << x << " ";
    cout << endl;

    sort(v.begin(), v.end(), greater<int>());
    cout << "Descending: ";
    for (int x : v) cout << x << " ";
    cout << endl;

    // Sort pairs by second element
    vector<pair<int,int>> vp = {{1,3},{2,1},{3,2}};
    sort(vp.begin(), vp.end(), [](const auto& a, const auto& b) {
        return a.second < b.second;
    });
    cout << "Pairs sorted by second: ";
    for (auto [a,b] : vp) cout << "(" << a << "," << b << ") ";
    cout << endl;
    return 0;
}`
      },
      {
        name: 'Counting Sort',
        code: `void countingSort(vector<int>& arr, int maxVal) {
    vector<int> count(maxVal + 1, 0);
    for (int x : arr) count[x]++;
    int idx = 0;
    for (int i = 0; i <= maxVal; i++)
        while (count[i]--) arr[idx++] = i;
}`,
        pythonTutorCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> arr = {4, 2, 2, 8, 3, 3, 1};
    int maxVal = 8;

    cout << "Before: ";
    for (int x : arr) cout << x << " ";
    cout << endl;

    vector<int> count(maxVal + 1, 0);
    for (int x : arr) count[x]++;
    int idx = 0;
    for (int i = 0; i <= maxVal; i++)
        while (count[i]-- > 0) arr[idx++] = i;

    cout << "After:  ";
    for (int x : arr) cout << x << " ";
    cout << endl;
    return 0;
}`
      }
    ],
  },

  'ds-stl': {
    tags: ['map', 'set', 'priority-queue', 'unordered', 'STL'],
    timeComplexity: 'O(log N)',
    whyLearn: `The C++ STL gives you production-quality implementations of balanced BSTs, hash tables, and heaps — all in a single line of code.
- **map/set** give you sorted, unique storage with O(log N) operations — essential for coordinate compression and ordered queries
- **priority_queue** is the backbone of Dijkstra's algorithm and many greedy problems
- **unordered_map/set** give O(1) average — critical when log factor causes TLE
- Knowing which container to use can cut your solution from 50 lines to 5`,
    whenToUse: `### Use map/set When
- You need sorted keys or the ability to find lower_bound/upper_bound
- Coordinate compression or discrete events

### Use unordered_map/set When
- You only need insert/find/erase and O(1) matters
- Hash-based counting or memoization

### Use priority_queue When
- You need repeated access to the min/max element
- Dijkstra's algorithm, Huffman coding, event simulation
- Merge K sorted lists`,
    commonMistakes: `- Using map when unordered_map would be 5x faster (and vice versa when you need ordering)
- Forgetting that priority_queue is a MAX-heap by default — use greater<int> for min-heap
- Modifying map keys after insertion (undefined behavior)
- unordered_map can degrade to O(N) with adversarial hash collisions — use custom hash in competitive settings`,
    relatedTopics: ['ds-linear', 'ds-sorting', 'graph-sssp'],
    practiceProblems: [
      { name: 'Top K Frequent Elements', source: 'LeetCode', difficulty: 'Medium', url: 'https://leetcode.com/problems/top-k-frequent-elements/' },
      { name: 'Kth Largest Element', source: 'LeetCode', difficulty: 'Medium', url: 'https://leetcode.com/problems/kth-largest-element-in-a-stream/' },
    ],
  },

  'ds-union-find': {
    tags: ['union-find', 'disjoint-set', 'DSU', 'connectivity'],
    timeComplexity: 'O(α(N)) ≈ O(1)',
    whyLearn: `Union-Find is one of the most elegant and powerful data structures in CP. It answers "are these two elements connected?" in near-constant time.
- Essential for Kruskal's MST algorithm
- Solves dynamic connectivity problems that would otherwise need complex graph algorithms
- With path compression + union by rank, it's practically O(1) per operation
- Appears frequently in ICPC and IOI problems involving grouping or merging`,
    whenToUse: `### Use Union-Find When
- You need to merge groups and check if two elements are in the same group
- Building a Minimum Spanning Tree (Kruskal's)
- Online connectivity queries (add edges, check connected)
- Detecting cycles in an undirected graph

### Don't Use When
- You need to split groups (Union-Find doesn't support efficient split)
- You need to find the shortest path (use BFS/Dijkstra instead)`,
    commonMistakes: `- Forgetting path compression — without it, operations can be O(N)
- Not using union by rank/size — this prevents degenerate linear chains
- Implementing find without recursion but forgetting to compress all nodes on the path
- Confusing the representative (root) with the actual element`,
    complexityAnalysis: `### Time Complexity (with path compression + union by rank)
- **Find**: O(α(N)) amortized — α is the inverse Ackermann function, effectively O(1)
- **Union**: O(α(N)) amortized
- **N operations total**: O(N × α(N)) ≈ O(N)

### Without optimizations
- **Find**: O(N) worst case (linear chain)
- Path compression alone: O(log N) amortized`,
    relatedTopics: ['graph-mst', 'graph-basics', 'graph-scc'],
    practiceProblems: [
      { name: 'Number of Provinces', source: 'LeetCode', difficulty: 'Medium', url: 'https://leetcode.com/problems/number-of-provinces/' },
      { name: 'Redundant Connection', source: 'LeetCode', difficulty: 'Medium', url: 'https://leetcode.com/problems/redundant-connection/' },
      { name: 'Road Construction', source: 'CSES', difficulty: 'Easy', url: 'https://cses.fi/problemset/task/1676' },
    ],
    codeSnippets: [
      {
        name: 'Union-Find (DSU)',
        code: `struct UnionFind {
    vector<int> p, rank_;
    int components;
    UnionFind(int n) : p(n), rank_(n, 0), components(n) {
        iota(p.begin(), p.end(), 0);
    }
    int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
    bool same(int a, int b) { return find(a) == find(b); }
    void unite(int a, int b) {
        a = find(a); b = find(b);
        if (a == b) return;
        if (rank_[a] < rank_[b]) swap(a, b);
        p[b] = a;
        if (rank_[a] == rank_[b]) rank_[a]++;
        components--;
    }
};`,
        pythonTutorCode: `#include <iostream>
#include <vector>
#include <numeric>
using namespace std;

struct UnionFind {
    vector<int> p, rank_;
    int components;
    UnionFind(int n) : p(n), rank_(n, 0), components(n) {
        iota(p.begin(), p.end(), 0);
    }
    int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
    bool same(int a, int b) { return find(a) == find(b); }
    void unite(int a, int b) {
        a = find(a); b = find(b);
        if (a == b) return;
        if (rank_[a] < rank_[b]) swap(a, b);
        p[b] = a;
        if (rank_[a] == rank_[b]) rank_[a]++;
        components--;
    }
};

int main() {
    UnionFind uf(6);
    cout << "Initial components: " << uf.components << endl;

    uf.unite(0, 1); cout << "Unite 0-1, components: " << uf.components << endl;
    uf.unite(2, 3); cout << "Unite 2-3, components: " << uf.components << endl;
    uf.unite(1, 3); cout << "Unite 1-3, components: " << uf.components << endl;

    cout << "0 and 3 connected? " << (uf.same(0,3) ? "YES" : "NO") << endl;
    cout << "0 and 4 connected? " << (uf.same(0,4) ? "YES" : "NO") << endl;

    uf.unite(4, 5); cout << "Unite 4-5, components: " << uf.components << endl;
    uf.unite(0, 5); cout << "Unite 0-5, components: " << uf.components << endl;
    return 0;
}`
      }
    ],
  },

  'ds-segment-tree': {
    tags: ['segment-tree', 'range-query', 'lazy-propagation', 'RMQ'],
    timeComplexity: 'O(log N)',
    whyLearn: `Segment Tree is the Swiss Army knife of range queries. It handles range sum, range min/max, range update, and much more — all in O(log N).
- The go-to data structure when you need both point/range updates AND range queries
- With lazy propagation, it handles range updates efficiently
- It's more flexible than Fenwick Tree — supports min, max, GCD, and custom merge operations
- A must-know for IOI, ICPC, and Codeforces Division 1 problems`,
    whenToUse: `### Use Segment Tree When
- You need range queries (sum, min, max, GCD) with point updates — O(log N) each
- You need range updates + range queries — add lazy propagation
- The merge operation is associative (can combine two halves)

### Use Fenwick Tree Instead When
- You only need range sum or prefix sum queries (Fenwick is simpler and faster in practice)

### Don't Use When
- The array is static — use prefix sums or sparse table for O(1) queries`,
    commonMistakes: `- Off-by-one in node indexing (1-based vs 0-based)
- Forgetting to push down lazy values before querying children
- Building the tree with wrong merge function
- Using 2*N space instead of 4*N — the tree can need up to 4N nodes
- Not initializing leaf nodes properly`,
    complexityAnalysis: `### Time Complexity
- **Build**: O(N)
- **Point Update**: O(log N)
- **Range Query**: O(log N)
- **Range Update (lazy)**: O(log N)

### Space Complexity
- O(4N) for the tree array
- O(4N) additional for lazy array if using lazy propagation`,
    relatedTopics: ['ds-fenwick', 'ds-linear', 'algo-dnc'],
    practiceProblems: [
      { name: 'Range Sum Query - Mutable', source: 'LeetCode', difficulty: 'Medium', url: 'https://leetcode.com/problems/range-sum-query-mutable/' },
      { name: 'Range Minimum Queries I', source: 'CSES', difficulty: 'Easy', url: 'https://cses.fi/problemset/task/1647' },
      { name: 'Dynamic Range Sum Queries', source: 'CSES', difficulty: 'Easy', url: 'https://cses.fi/problemset/task/1648' },
    ],
  },

  'ds-fenwick': {
    tags: ['fenwick', 'BIT', 'binary-indexed-tree', 'prefix-sum', 'range-query'],
    timeComplexity: 'O(log N)',
    whyLearn: `Fenwick Tree (Binary Indexed Tree) is simpler to implement than Segment Tree and often faster in practice for prefix sum queries.
- Only ~10 lines of code for a fully functional implementation
- Perfect for problems involving prefix sums with point updates
- Lower constant factor than Segment Tree for sum queries
- Can be extended to 2D for matrix prefix sum queries`,
    whenToUse: `### Use Fenwick Tree When
- You need prefix sum queries with point updates
- Counting inversions in an array
- Range sum queries (decompose into two prefix sums)
- Online frequency counting

### Use Segment Tree Instead When
- You need range min/max/GCD queries (Fenwick only supports sum-like operations)
- You need range updates with lazy propagation`,
    commonMistakes: `- Using 0-based indexing — Fenwick Tree requires 1-based indexing
- Forgetting to add 1 when converting from 0-based array indices
- Confusing update (add delta) with set (replace value)
- Not allocating enough space (need N+1 for 1-based indexing)`,
    complexityAnalysis: `### Time Complexity
- **Point Update**: O(log N)
- **Prefix Sum Query**: O(log N)
- **Range Sum Query**: O(log N) — query(r) - query(l-1)

### Space Complexity
- O(N) — much less than Segment Tree's O(4N)

### vs Segment Tree
- Fenwick is ~2-5x faster in practice for sum queries
- Fenwick uses 4x less memory`,
    relatedTopics: ['ds-segment-tree', 'ds-linear'],
    practiceProblems: [
      { name: 'Range Sum Query - Mutable', source: 'LeetCode', difficulty: 'Medium', url: 'https://leetcode.com/problems/range-sum-query-mutable/' },
      { name: 'Count of Smaller Numbers After Self', source: 'LeetCode', difficulty: 'Hard', url: 'https://leetcode.com/problems/count-of-smaller-numbers-after-self/' },
    ],
  },

  'algo-complete-search': {
    tags: ['brute-force', 'backtracking', 'permutation', 'recursion', 'pruning'],
    timeComplexity: 'O(2^N) or O(N!)',
    whyLearn: `Complete Search is the first technique you should consider for any problem. If the constraints allow brute force, it's the safest approach.
- Many contest problems (especially "easy" ones) are solvable with well-optimized brute force
- Backtracking with pruning can handle surprisingly large inputs
- It's the foundation for understanding why DP and greedy are needed (they optimize complete search)
- When you can't find a clever solution, a pruned backtracking might pass within time limits`,
    whenToUse: `### Use Complete Search When
- N ≤ 20 (bitmask enumeration: 2^20 = ~10^6)
- N ≤ 10 (permutation enumeration: 10! = ~3.6×10^6)
- The problem explicitly asks for "all" solutions
- You can't find a DP or greedy approach and constraints are small

### Pruning Strategies
- Skip branches that can't lead to a better answer
- Use bounding (branch and bound)
- Break symmetry — don't explore equivalent states
- Sort to enable early termination`,
    commonMistakes: `- Not estimating complexity before coding — brute force with N=10^6 won't work
- Forgetting to prune — even small pruning can reduce runtime by 10-100x
- Not restoring state when backtracking (forgetting to "undo" changes)
- Generating all permutations when you only need subsets (or vice versa)
- Using recursion without memoization when subproblems overlap (that's DP!)`,
    relatedTopics: ['algo-dp-intro', 'algo-greedy', 'ds-linear'],
    practiceProblems: [
      { name: 'Subsets', source: 'LeetCode', difficulty: 'Medium', url: 'https://leetcode.com/problems/subsets/' },
      { name: 'Permutations', source: 'LeetCode', difficulty: 'Medium', url: 'https://leetcode.com/problems/permutations/' },
      { name: 'N-Queens', source: 'LeetCode', difficulty: 'Hard', url: 'https://leetcode.com/problems/n-queens/' },
    ],
    codeSnippets: [
      {
        name: 'Enumerate Subsets (Bitmask)',
        code: `// Enumerate all subsets of {0, 1, ..., n-1}
for (int mask = 0; mask < (1 << n); mask++) {
    // mask represents a subset
    for (int j = 0; j < n; j++)
        if (mask & (1 << j))
            // element j is in the subset
}`,
        pythonTutorCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n = 3;
    vector<string> items = {"A", "B", "C"};

    cout << "All subsets of {A, B, C}:" << endl;
    for (int mask = 0; mask < (1 << n); mask++) {
        cout << "  { ";
        for (int j = 0; j < n; j++)
            if (mask & (1 << j))
                cout << items[j] << " ";
        cout << "}" << endl;
    }
    cout << "Total subsets: " << (1 << n) << endl;
    return 0;
}`
      },
      {
        name: 'Generate Permutations',
        code: `// Generate all permutations
void permute(vector<int>& arr, int l, int r) {
    if (l == r) {
        // process arr
        return;
    }
    for (int i = l; i <= r; i++) {
        swap(arr[l], arr[i]);
        permute(arr, l + 1, r);
        swap(arr[l], arr[i]); // backtrack
    }
}`,
        pythonTutorCode: `#include <iostream>
#include <vector>
using namespace std;

int count_perms = 0;

void permute(vector<int>& arr, int l, int r) {
    if (l == r) {
        count_perms++;
        cout << "  [";
        for (int i = 0; i <= r; i++) cout << arr[i] << (i<r?",":"");
        cout << "]" << endl;
        return;
    }
    for (int i = l; i <= r; i++) {
        swap(arr[l], arr[i]);
        permute(arr, l + 1, r);
        swap(arr[l], arr[i]);
    }
}

int main() {
    vector<int> arr = {1, 2, 3};
    cout << "All permutations of [1,2,3]:" << endl;
    permute(arr, 0, arr.size() - 1);
    cout << "Total: " << count_perms << endl;
    return 0;
}`
      },
      {
        name: 'N-Queens (Backtracking)',
        code: `// N-Queens backtracking
int ans = 0;
void solve(int r, int n, int cols, int diag1, int diag2) {
    if (r == n) { ans++; return; }
    for (int c = 0; c < n; c++) {
        if ((cols & (1<<c)) || (diag1 & (1<<(r+c))) || (diag2 & (1<<(r-c+n))))
            continue;
        solve(r+1, n, cols|(1<<c), diag1|(1<<(r+c)), diag2|(1<<(r-c+n)));
    }
}`,
        pythonTutorCode: `#include <iostream>
using namespace std;

int ans = 0;

void solve(int r, int n, int cols, int diag1, int diag2) {
    if (r == n) { ans++; return; }
    for (int c = 0; c < n; c++) {
        if ((cols & (1<<c)) || (diag1 & (1<<(r+c))) || (diag2 & (1<<(r-c+n))))
            continue;
        solve(r+1, n, cols|(1<<c), diag1|(1<<(r+c)), diag2|(1<<(r-c+n)));
    }
}

int main() {
    for (int n = 1; n <= 8; n++) {
        ans = 0;
        solve(0, n, 0, 0, 0);
        cout << n << "-Queens solutions: " << ans << endl;
    }
    return 0;
}`
      }
    ],
  },

  'algo-dnc': {
    tags: ['divide-and-conquer', 'merge-sort', 'binary-search', 'recursion'],
    timeComplexity: 'O(N log N)',
    whyLearn: `Divide and Conquer turns impossible problems into simple ones by breaking them into smaller pieces.
- Binary Search is the most important D&C algorithm — it reduces O(N) search to O(log N)
- Merge Sort is the classic D&C example and is used for counting inversions
- D&C optimization can speed up certain DP problems from O(N^2) to O(N log N)
- Understanding the recurrence T(n) = 2T(n/2) + O(n) = O(n log n) builds intuition for complexity`,
    whenToUse: `### Use Binary Search When
- The answer is monotonic — if f(x) is true, then f(x+1) is true (or vice versa)
- "Find the minimum/maximum value such that..." — binary search on the answer
- The search space is sorted or can be made monotonic

### Use D&C When
- The problem can be split into independent subproblems of the same type
- Merge step combines results efficiently
- Counting inversions, closest pair of points`,
    commonMistakes: `- Binary search off-by-one: use lo < hi vs lo <= hi depending on whether you want the first true or last true
- Binary search infinite loop: make sure lo or hi changes every iteration
- Not handling the merge step correctly in merge sort
- Applying D&C when the subproblems aren't independent (that's DP, not D&C)`,
    relatedTopics: ['ds-sorting', 'algo-complete-search', 'algo-dp-intro'],
    practiceProblems: [
      { name: 'Binary Search', source: 'LeetCode', difficulty: 'Easy', url: 'https://leetcode.com/problems/binary-search/' },
      { name: 'Merge Sort (Count Inversions)', source: 'CSES', difficulty: 'Medium', url: 'https://cses.fi/problemset/task/1631' },
      { name: 'Aggressive Cows', source: 'SPOJ', difficulty: 'Medium', url: 'https://www.spoj.com/problems/AGGRCOW/' },
    ],
  },

  'algo-greedy': {
    tags: ['greedy', 'interval-scheduling', 'sorting', 'optimal'],
    timeComplexity: 'O(N log N)',
    whyLearn: `Greedy algorithms are elegant, efficient, and often the intended solution for medium-difficulty contest problems.
- When a greedy approach works, it's usually the simplest and fastest solution
- Classic patterns: interval scheduling, Huffman coding, coin change (when it works)
- The challenge is **proving** that greedy works — not all locally optimal choices lead to globally optimal solutions
- Many real-world optimization problems have greedy solutions`,
    whenToUse: `### Greedy Works When
- **Optimal substructure**: An optimal solution contains optimal solutions to subproblems
- **Greedy choice property**: A locally optimal choice leads to a globally optimal solution
- You can prove by exchange argument or induction that greedy is correct

### Classic Greedy Patterns
- Sort by end time for interval scheduling (maximize non-overlapping intervals)
- Sort by deadline for job scheduling
- Kruskal's MST (sort edges by weight)
- Huffman coding (always merge smallest frequencies)`,
    commonMistakes: `- Assuming greedy works without proof — many problems look greedy but require DP
- The coin change problem is NOT always greedy (e.g., coins {1, 3, 4} and amount 6)
- Incorrect sorting criteria — the wrong comparator leads to wrong answers
- Not considering edge cases where greedy fails (e.g., ties in sorting)`,
    relatedTopics: ['ds-sorting', 'algo-dp-intro', 'graph-mst'],
    practiceProblems: [
      { name: 'Activity Selection', source: 'GeeksForGeeks', difficulty: 'Easy', url: 'https://practice.geeksforgeeks.org/problems/activity-selection-1587115620/1' },
      { name: 'Jump Game', source: 'LeetCode', difficulty: 'Medium', url: 'https://leetcode.com/problems/jump-game/' },
      { name: 'Minimum Number of Platforms', source: 'GeeksForGeeks', difficulty: 'Medium', url: 'https://practice.geeksforgeeks.org/problems/minimum-platforms-1587115620/1' },
    ],
  },

  'algo-dp-intro': {
    tags: ['dynamic-programming', 'memoization', 'tabulation', 'optimal-substructure'],
    timeComplexity: 'O(N×S)',
    whyLearn: `Dynamic Programming is the most important technique in competitive programming. It appears in almost every contest at every level.
- DP solves problems that brute force can't — by remembering previously computed results
- It's the #1 topic in coding interviews at top companies
- Understanding the two key properties (optimal substructure + overlapping subproblems) unlocks a huge class of problems
- Most "count the ways" and "minimize/maximize" problems are DP`,
    whenToUse: `### Use DP When
- The problem has **optimal substructure**: optimal solution can be built from optimal sub-solutions
- The problem has **overlapping subproblems**: the same sub-problem is solved multiple times
- You see keywords: "minimum cost", "maximum profit", "count the number of ways", "is it possible"

### DP Approach
1. Define the state: what does dp[i] or dp[i][j] represent?
2. Find the recurrence: how does dp[i] relate to smaller subproblems?
3. Set base cases: what are dp[0], dp[1], etc.?
4. Determine the order: bottom-up (tabulation) or top-down (memoization)?
5. Optimize space if possible (often only need previous row)`,
    commonMistakes: `- Not clearly defining what the DP state represents
- Wrong recurrence relation — always verify with small examples
- Forgetting base cases or setting them incorrectly
- Bottom-up iteration order that uses not-yet-computed values
- Not considering the dimensions needed (1D vs 2D vs 3D DP)
- Trying to use DP when greedy works (over-complicating)`,
    complexityAnalysis: `### Time Complexity
- **States × Transitions per state**
- Fibonacci: O(N) states × O(1) transition = O(N)
- Coin Change: O(N×M) where N = amount, M = number of coins
- LCS: O(N×M) where N, M are string lengths
- Knapsack: O(N×W) where N = items, W = capacity

### Space Optimization
- If dp[i] only depends on dp[i-1], use two arrays or rolling variables
- Can reduce O(N×M) space to O(M) in many cases`,
    relatedTopics: ['algo-dp-advanced', 'algo-complete-search', 'algo-greedy'],
    practiceProblems: [
      { name: 'Climbing Stairs', source: 'LeetCode', difficulty: 'Easy', url: 'https://leetcode.com/problems/climbing-stairs/' },
      { name: 'Coin Change', source: 'LeetCode', difficulty: 'Medium', url: 'https://leetcode.com/problems/coin-change/' },
      { name: 'Longest Common Subsequence', source: 'LeetCode', difficulty: 'Medium', url: 'https://leetcode.com/problems/longest-common-subsequence/' },
      { name: 'Dice Combinations', source: 'CSES', difficulty: 'Easy', url: 'https://cses.fi/problemset/task/1633' },
    ],
    codeSnippets: [
      {
        name: 'Fibonacci (Memoization)',
        code: `// Top-Down: Fibonacci with memoization
int memo[100];
memset(memo, -1, sizeof(memo));
int fib(int n) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];
    return memo[n] = fib(n-1) + fib(n-2);
}`,
        pythonTutorCode: `#include <iostream>
#include <cstring>
using namespace std;

int memo[100];

int fib(int n) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];
    cout << "Computing fib(" << n << ")" << endl;
    return memo[n] = fib(n-1) + fib(n-2);
}

int main() {
    memset(memo, -1, sizeof(memo));
    cout << "fib(8) = " << fib(8) << endl;
    cout << "\\nfib(6) already cached = " << fib(6) << endl;
    return 0;
}`
      },
      {
        name: 'Coin Change (Bottom-Up)',
        code: `// Bottom-Up: Coin Change (minimum coins)
int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, INT_MAX);
    dp[0] = 0;
    for (int i = 1; i <= amount; i++)
        for (int c : coins)
            if (c <= i && dp[i - c] != INT_MAX)
                dp[i] = min(dp[i], dp[i - c] + 1);
    return dp[amount] == INT_MAX ? -1 : dp[amount];
}`,
        pythonTutorCode: `#include <iostream>
#include <vector>
#include <climits>
using namespace std;

int main() {
    vector<int> coins = {1, 3, 4};
    int amount = 6;

    vector<int> dp(amount + 1, INT_MAX);
    dp[0] = 0;
    for (int i = 1; i <= amount; i++) {
        for (int c : coins) {
            if (c <= i && dp[i - c] != INT_MAX)
                dp[i] = min(dp[i], dp[i - c] + 1);
        }
        cout << "dp[" << i << "] = " << (dp[i] == INT_MAX ? -1 : dp[i]) << endl;
    }
    cout << "\\nMin coins for " << amount << " = " << dp[amount] << endl;
    return 0;
}`
      },
      {
        name: '0/1 Knapsack',
        code: `// 0/1 Knapsack
int knapsack(int W, vector<int>& wt, vector<int>& val, int n) {
    vector<vector<int>> dp(n+1, vector<int>(W+1, 0));
    for (int i = 1; i <= n; i++)
        for (int w = 0; w <= W; w++) {
            dp[i][w] = dp[i-1][w]; // don't take
            if (wt[i-1] <= w)
                dp[i][w] = max(dp[i][w], dp[i-1][w-wt[i-1]] + val[i-1]);
        }
    return dp[n][W];
}`,
        pythonTutorCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int W = 7;
    vector<int> wt = {1, 3, 4, 5};
    vector<int> val = {1, 4, 5, 7};
    int n = wt.size();

    vector<vector<int>> dp(n+1, vector<int>(W+1, 0));
    for (int i = 1; i <= n; i++)
        for (int w = 0; w <= W; w++) {
            dp[i][w] = dp[i-1][w];
            if (wt[i-1] <= w)
                dp[i][w] = max(dp[i][w], dp[i-1][w-wt[i-1]] + val[i-1]);
        }

    cout << "Items (weight, value): ";
    for (int i = 0; i < n; i++) cout << "(" << wt[i] << "," << val[i] << ") ";
    cout << "\\nCapacity: " << W << endl;
    cout << "Max value: " << dp[n][W] << endl;
    return 0;
}`
      }
    ],
  },

  'algo-dp-advanced': {
    tags: ['bitmask-DP', 'interval-DP', 'tree-DP', 'digit-DP', 'knapsack'],
    timeComplexity: 'O(2^N × N)',
    whyLearn: `Advanced DP techniques unlock the hardest problems in competitive programming — the ones that separate top contestants from the rest.
- **Bitmask DP**: Solve problems over subsets (TSP, assignment) in O(2^N × N)
- **Interval DP**: Optimal matrix chain multiplication, palindrome partitioning
- **Tree DP**: Problems on trees where the answer depends on subtree structure
- These patterns appear in Div 1 Codeforces, IOI, and ICPC finals`,
    whenToUse: `### Use Bitmask DP When
- N ≤ 20 and you need to track which elements are "used"
- Traveling Salesman Problem (TSP), assignment problems
- State = (current position, set of visited nodes)

### Use Interval DP When
- You need to optimally split/merge a range
- Matrix chain multiplication, optimal BST
- State = (left endpoint, right endpoint)

### Use Tree DP When
- The problem is defined on a tree structure
- Answer depends on subtree sizes, depths, or colors
- State = (current node, some property)`,
    commonMistakes: `- Bitmask DP with N > 20 is too slow (2^20 ≈ 10^6, but 2^25 ≈ 3×10^7)
- Interval DP: iterating in wrong order (must iterate by interval length, not endpoints)
- Tree DP: forgetting to handle leaf nodes as base cases
- Not recognizing that a problem has DP structure because the state space is non-obvious`,
    relatedTopics: ['algo-dp-intro', 'algo-complete-search', 'graph-basics'],
    practiceProblems: [
      { name: 'Hamiltonian Path (Bitmask DP)', source: 'CSES', difficulty: 'Medium', url: 'https://cses.fi/problemset/task/1690' },
      { name: 'Partition Equal Subset Sum', source: 'LeetCode', difficulty: 'Medium', url: 'https://leetcode.com/problems/partition-equal-subset-sum/' },
    ],
    codeSnippets: [
      {
        name: 'LIS O(N log N)',
        code: `int LIS(vector<int>& a) {
    vector<int> dp;
    for (int x : a) {
        auto it = lower_bound(dp.begin(), dp.end(), x);
        if (it == dp.end()) dp.push_back(x);
        else *it = x;
    }
    return dp.size();
}`,
        pythonTutorCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> a = {3, 1, 4, 1, 5, 9, 2, 6};
    vector<int> dp;

    cout << "Array: ";
    for (int x : a) cout << x << " ";
    cout << endl;

    for (int x : a) {
        auto it = lower_bound(dp.begin(), dp.end(), x);
        if (it == dp.end()) dp.push_back(x);
        else *it = x;
        cout << "Process " << x << " -> tails: ";
        for (int v : dp) cout << v << " ";
        cout << endl;
    }
    cout << "LIS length = " << dp.size() << endl;
    return 0;
}`
      },
      {
        name: 'Bitmask DP (TSP)',
        code: `// TSP: dp[mask][i] = min cost visiting cities in mask, ending at i
int tsp(int n, vector<vector<int>>& dist) {
    int full = (1 << n) - 1;
    vector<vector<int>> dp(1 << n, vector<int>(n, INT_MAX));
    dp[1][0] = 0; // start at city 0

    for (int mask = 1; mask <= full; mask++)
        for (int u = 0; u < n; u++) {
            if (dp[mask][u] == INT_MAX) continue;
            if (!(mask & (1 << u))) continue;
            for (int v = 0; v < n; v++) {
                if (mask & (1 << v)) continue;
                int newMask = mask | (1 << v);
                dp[newMask][v] = min(dp[newMask][v], dp[mask][u] + dist[u][v]);
            }
        }
    // Find min cost to return to start
    int ans = INT_MAX;
    for (int u = 0; u < n; u++)
        if (dp[full][u] != INT_MAX)
            ans = min(ans, dp[full][u] + dist[u][0]);
    return ans;
}`,
        pythonTutorCode: `#include <iostream>
#include <vector>
#include <climits>
using namespace std;

int main() {
    int n = 4;
    vector<vector<int>> dist = {
        {0, 10, 15, 20},
        {10, 0, 35, 25},
        {15, 35, 0, 30},
        {20, 25, 30, 0}
    };

    int full = (1 << n) - 1;
    vector<vector<int>> dp(1 << n, vector<int>(n, INT_MAX));
    dp[1][0] = 0;

    for (int mask = 1; mask <= full; mask++)
        for (int u = 0; u < n; u++) {
            if (dp[mask][u] == INT_MAX || !(mask & (1 << u))) continue;
            for (int v = 0; v < n; v++) {
                if (mask & (1 << v)) continue;
                int newMask = mask | (1 << v);
                dp[newMask][v] = min(dp[newMask][v], dp[mask][u] + dist[u][v]);
            }
        }

    int ans = INT_MAX;
    for (int u = 0; u < n; u++)
        if (dp[full][u] != INT_MAX)
            ans = min(ans, dp[full][u] + dist[u][0]);
    cout << "TSP min cost: " << ans << endl;
    return 0;
}`
      }
    ],
  },

  'graph-basics': {
    tags: ['graph', 'adjacency-list', 'adjacency-matrix', 'representation'],
    timeComplexity: 'O(V + E)',
    whyLearn: `Graphs are everywhere — from social networks to road maps to dependency chains. Understanding graph representation is the foundation for ALL graph algorithms.
- Choosing the right representation (adjacency list vs matrix) affects performance by orders of magnitude
- Adjacency list is the default for CP — it uses O(V + E) space vs O(V^2) for matrix
- Graph modeling is an art — many problems become graph problems when you define nodes and edges correctly
- Understanding implicit graphs (state-space search) unlocks many creative solutions`,
    whenToUse: `### Use Adjacency List When
- The graph is sparse (E << V^2) — which is most CP problems
- You need to iterate over neighbors efficiently

### Use Adjacency Matrix When
- The graph is dense (E ≈ V^2)
- You need O(1) edge existence checks
- Floyd-Warshall algorithm requires it

### Use Edge List When
- You're running Kruskal's MST (sort edges by weight)
- You need to iterate over all edges`,
    commonMistakes: `- Using adjacency matrix for V > 10^4 (needs V^2 memory)
- Forgetting that undirected edges need to be added in BOTH directions
- Not handling self-loops or multiple edges between same nodes
- 1-based vs 0-based vertex numbering inconsistency`,
    relatedTopics: ['graph-traversal', 'graph-sssp', 'graph-mst'],
    practiceProblems: [
      { name: 'Find if Path Exists', source: 'LeetCode', difficulty: 'Easy', url: 'https://leetcode.com/problems/find-if-path-exists-in-graph/' },
      { name: 'Building Roads', source: 'CSES', difficulty: 'Easy', url: 'https://cses.fi/problemset/task/1666' },
    ],
  },

  'graph-traversal': {
    tags: ['BFS', 'DFS', 'connected-components', 'flood-fill', 'cycle-detection'],
    timeComplexity: 'O(V + E)',
    whyLearn: `BFS and DFS are the two most fundamental graph algorithms. They're used directly or as subroutines in almost every graph problem.
- **BFS** finds shortest paths in unweighted graphs — a very common problem type
- **DFS** detects cycles, finds connected components, does topological sorting, and much more
- These are O(V + E) — you can't do better for graph traversal
- Understanding the BFS/DFS tree structure is key to advanced algorithms (bridges, articulation points, SCC)`,
    whenToUse: `### Use BFS When
- Finding shortest path in an unweighted graph
- Level-order traversal
- Finding the nearest node with a certain property
- Multi-source shortest path (start BFS from all sources at once)

### Use DFS When
- Detecting cycles in directed/undirected graphs
- Finding connected components
- Topological sorting
- Finding bridges and articulation points
- Flood fill on grids`,
    commonMistakes: `- Using DFS for shortest path (DFS doesn't guarantee shortest path!)
- Forgetting to mark nodes as visited before pushing to BFS queue (causes duplicates)
- Stack overflow in DFS for large graphs (V > 10^5) — use iterative DFS
- BFS on weighted graphs — use Dijkstra instead
- Not considering disconnected graphs (run BFS/DFS from all unvisited nodes)`,
    relatedTopics: ['graph-basics', 'graph-topo-sort', 'graph-sssp', 'graph-scc'],
    practiceProblems: [
      { name: 'Number of Islands', source: 'LeetCode', difficulty: 'Medium', url: 'https://leetcode.com/problems/number-of-islands/' },
      { name: 'Shortest Path in Binary Matrix', source: 'LeetCode', difficulty: 'Medium', url: 'https://leetcode.com/problems/shortest-path-in-binary-matrix/' },
      { name: 'Counting Rooms', source: 'CSES', difficulty: 'Easy', url: 'https://cses.fi/problemset/task/1192' },
    ],
    codeSnippets: [
      {
        name: 'DFS (Depth First Search)',
        code: `vector<bool> visited;
vector<vector<int>> adj;

void dfs(int u) {
    visited[u] = true;
    for (int v : adj[u])
        if (!visited[v]) dfs(v);
}`,
        pythonTutorCode: `#include <iostream>
#include <vector>
using namespace std;

vector<bool> visited;
vector<vector<int>> adj;

void dfs(int u) {
    visited[u] = true;
    cout << "Visiting node " << u << endl;
    for (int v : adj[u])
        if (!visited[v]) dfs(v);
}

int main() {
    int V = 6;
    adj.resize(V);
    visited.assign(V, false);

    // Build a sample graph:
    // 0 -- 1 -- 3
    // |    |
    // 2    4 -- 5
    adj[0].push_back(1); adj[1].push_back(0);
    adj[0].push_back(2); adj[2].push_back(0);
    adj[1].push_back(3); adj[3].push_back(1);
    adj[1].push_back(4); adj[4].push_back(1);
    adj[4].push_back(5); adj[5].push_back(4);

    cout << "DFS starting from node 0:" << endl;
    dfs(0);
    return 0;
}`
      },
      {
        name: 'BFS (Shortest Path)',
        code: `vector<int> bfs(int s, int V) {
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
}`,
        pythonTutorCode: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

vector<vector<int>> adj;

vector<int> bfs(int s, int V) {
    vector<int> dist(V, -1);
    queue<int> q;
    dist[s] = 0;
    q.push(s);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        cout << "Processing node " << u << " (dist=" << dist[u] << ")" << endl;
        for (int v : adj[u]) {
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
    return dist;
}

int main() {
    int V = 6;
    adj.resize(V);

    // Build a sample graph:
    // 0 -- 1 -- 3
    // |    |
    // 2    4 -- 5
    adj[0].push_back(1); adj[1].push_back(0);
    adj[0].push_back(2); adj[2].push_back(0);
    adj[1].push_back(3); adj[3].push_back(1);
    adj[1].push_back(4); adj[4].push_back(1);
    adj[4].push_back(5); adj[5].push_back(4);

    cout << "BFS from node 0:" << endl;
    vector<int> dist = bfs(0, V);

    cout << "\\nShortest distances from node 0:" << endl;
    for (int i = 0; i < V; i++)
        cout << "  node " << i << ": " << dist[i] << endl;
    return 0;
}`
      },
      {
        name: 'Connected Components',
        code: `int countComponents(int V) {
    visited.assign(V, false);
    int count = 0;
    for (int i = 0; i < V; i++)
        if (!visited[i]) { dfs(i); count++; }
    return count;
}`,
        pythonTutorCode: `#include <iostream>
#include <vector>
using namespace std;

vector<bool> visited;
vector<vector<int>> adj;

void dfs(int u) {
    visited[u] = true;
    for (int v : adj[u])
        if (!visited[v]) dfs(v);
}

int main() {
    int V = 7;
    adj.resize(V);
    visited.assign(V, false);

    // Component 1: 0-1-2
    adj[0].push_back(1); adj[1].push_back(0);
    adj[1].push_back(2); adj[2].push_back(1);

    // Component 2: 3-4
    adj[3].push_back(4); adj[4].push_back(3);

    // Component 3: 5-6
    adj[5].push_back(6); adj[6].push_back(5);

    int count = 0;
    for (int i = 0; i < V; i++) {
        if (!visited[i]) {
            cout << "Found component starting at node " << i << endl;
            dfs(i);
            count++;
        }
    }
    cout << "Total connected components: " << count << endl;
    return 0;
}`
      },
      {
        name: '0-1 BFS',
        code: `vector<int> bfs01(int s, int V) {
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
}`,
        pythonTutorCode: null,
      }
    ],
  },

  'graph-topo-sort': {
    tags: ['topological-sort', 'DAG', 'Kahn', 'dependency', 'ordering'],
    timeComplexity: 'O(V + E)',
    whyLearn: `Topological sort is the key to solving dependency problems — any time you have "X must come before Y" constraints.
- Build systems, course prerequisites, task scheduling — all are topological sort
- It also detects cycles in directed graphs (if topo sort fails, there's a cycle)
- DP on DAGs is a powerful combination — topo sort gives you the correct order to fill DP table
- Kahn's algorithm (BFS-based) is easier to implement and gives lexicographically smallest order`,
    whenToUse: `### Use Topological Sort When
- The problem involves ordering with dependencies (prerequisites)
- You need to process nodes in an order where dependencies are satisfied first
- DP on a DAG — topological order gives the correct computation order
- Detecting if a directed graph has cycles`,
    commonMistakes: `- Applying topological sort to undirected graphs (only works on DAGs!)
- Forgetting to check for cycles — if the sorted output has fewer than V nodes, there's a cycle
- Not using Kahn's algorithm when lexicographically smallest order is needed (DFS-based gives reverse post-order)
- Confusing in-degree with out-degree in Kahn's algorithm`,
    relatedTopics: ['graph-traversal', 'graph-basics', 'algo-dp-intro'],
    practiceProblems: [
      { name: 'Course Schedule', source: 'LeetCode', difficulty: 'Medium', url: 'https://leetcode.com/problems/course-schedule/' },
      { name: 'Course Schedule II', source: 'LeetCode', difficulty: 'Medium', url: 'https://leetcode.com/problems/course-schedule-ii/' },
      { name: 'Course Schedule (CSES)', source: 'CSES', difficulty: 'Easy', url: 'https://cses.fi/problemset/task/1679' },
    ],
    codeSnippets: [
      {
        name: "Kahn's Algorithm (BFS)",
        code: `vector<int> topoSort(int V, vector<vector<int>>& adj) {
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
}`,
        pythonTutorCode: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

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
        cout << "Process node " << u << endl;
        for (int v : adj[u])
            if (--inDeg[v] == 0) q.push(v);
    }
    return order;
}

int main() {
    // DAG: 5->0, 5->2, 4->0, 4->1, 2->3, 3->1
    int V = 6;
    vector<vector<int>> adj(V);
    adj[5].push_back(0); adj[5].push_back(2);
    adj[4].push_back(0); adj[4].push_back(1);
    adj[2].push_back(3); adj[3].push_back(1);

    vector<int> order = topoSort(V, adj);

    cout << "\\nTopological order: ";
    for (int v : order) cout << v << " ";
    cout << endl;

    if ((int)order.size() < V)
        cout << "Cycle detected!" << endl;
    else
        cout << "No cycle (valid DAG)" << endl;
    return 0;
}`
      },
      {
        name: 'DFS-based Topo Sort',
        code: `vector<int> order;
vector<bool> visited;
void dfsTopoSort(int u, vector<vector<int>>& adj) {
    visited[u] = true;
    for (int v : adj[u])
        if (!visited[v]) dfsTopoSort(v, adj);
    order.push_back(u); // push on finish
}
// Reverse order[] for topological order`,
        pythonTutorCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

vector<int> order;
vector<bool> visited;

void dfsTopoSort(int u, vector<vector<int>>& adj) {
    visited[u] = true;
    for (int v : adj[u])
        if (!visited[v]) dfsTopoSort(v, adj);
    order.push_back(u);
}

int main() {
    int V = 6;
    vector<vector<int>> adj(V);
    adj[5].push_back(0); adj[5].push_back(2);
    adj[4].push_back(0); adj[4].push_back(1);
    adj[2].push_back(3); adj[3].push_back(1);

    visited.assign(V, false);
    for (int i = 0; i < V; i++)
        if (!visited[i]) dfsTopoSort(i, adj);

    reverse(order.begin(), order.end());
    cout << "Topological order (DFS): ";
    for (int v : order) cout << v << " ";
    cout << endl;
    return 0;
}`
      }
    ],
  },

  'graph-sssp': {
    tags: ['Dijkstra', 'shortest-path', 'BFS', 'priority-queue', 'SSSP'],
    timeComplexity: 'O((V+E) log V)',
    whyLearn: `Dijkstra's algorithm is the gold standard for shortest path in weighted graphs with non-negative edges.
- It's the most frequently asked graph algorithm in both contests and interviews
- With a priority queue, it runs in O((V+E) log V) — efficient for sparse graphs
- Understanding Dijkstra deeply helps you understand why negative edges break it (and when to use Bellman-Ford)
- Many real-world problems (navigation, network routing) use Dijkstra`,
    whenToUse: `### Use Dijkstra When
- Finding shortest paths from a single source in a graph with **non-negative** edge weights
- The graph is sparse (E << V^2) — use priority queue implementation

### Use BFS Instead When
- All edge weights are 1 (unweighted graph) — BFS is simpler and equally efficient

### Use Bellman-Ford Instead When
- The graph has negative edge weights
- You need to detect negative cycles`,
    commonMistakes: `- Using Dijkstra with negative edge weights (gives wrong answer!)
- Not using a visited/processed array — processing the same node multiple times
- Using a matrix-based O(V^2) Dijkstra when V is large (use priority queue for O((V+E) log V))
- Forgetting to initialize distances to infinity
- Using the wrong type for distances (int vs long long for large weights)`,
    complexityAnalysis: `### Time Complexity
- **With priority queue (binary heap)**: O((V + E) log V)
- **With Fibonacci heap**: O(V log V + E) — theoretical, rarely used in CP
- **With adjacency matrix (dense)**: O(V^2)

### Space Complexity
- O(V + E) for adjacency list + distance array + priority queue`,
    relatedTopics: ['graph-traversal', 'graph-bellman-ford', 'graph-floyd', 'ds-stl'],
    practiceProblems: [
      { name: 'Network Delay Time', source: 'LeetCode', difficulty: 'Medium', url: 'https://leetcode.com/problems/network-delay-time/' },
      { name: 'Shortest Routes I', source: 'CSES', difficulty: 'Easy', url: 'https://cses.fi/problemset/task/1671' },
      { name: 'Path Queries', source: 'CSES', difficulty: 'Medium', url: 'https://cses.fi/problemset/task/1672' },
    ],
    codeSnippets: [
      {
        name: "Dijkstra's Algorithm",
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
}`,
        pythonTutorCode: `#include <iostream>
#include <vector>
#include <queue>
#include <climits>
using namespace std;
typedef pair<int,int> ii;

int main() {
    int V = 5;
    vector<vector<ii>> adj(V);

    // Weighted graph:
    // 0 --(4)--> 1 --(1)--> 3
    // |          |           ^
    // (1)       (2)        (3)
    // v          v           |
    // 2 --(5)--> 4 ----------
    adj[0].push_back({1, 4}); adj[0].push_back({2, 1});
    adj[1].push_back({3, 1}); adj[1].push_back({4, 2});
    adj[2].push_back({4, 5});
    adj[4].push_back({3, 3});

    // Dijkstra from source 0
    vector<int> dist(V, INT_MAX);
    priority_queue<ii, vector<ii>, greater<ii>> pq;
    dist[0] = 0;
    pq.push({0, 0});

    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        cout << "Process node " << u << " (dist=" << d << ")" << endl;
        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }

    cout << "\\nShortest distances from node 0:" << endl;
    for (int i = 0; i < V; i++)
        cout << "  node " << i << ": " << dist[i] << endl;
    return 0;
}`
      },
      {
        name: 'Path Reconstruction',
        code: `// Path reconstruction
vector<int> parent(V, -1);
// In relaxation: parent[v] = u;
vector<int> getPath(int t) {
    vector<int> path;
    for (int v = t; v != -1; v = parent[v])
        path.push_back(v);
    reverse(path.begin(), path.end());
    return path;
}`,
        pythonTutorCode: `#include <iostream>
#include <vector>
#include <queue>
#include <climits>
#include <algorithm>
using namespace std;
typedef pair<int,int> ii;

int main() {
    int V = 5;
    vector<vector<ii>> adj(V);
    adj[0].push_back({1, 4}); adj[0].push_back({2, 1});
    adj[1].push_back({3, 1}); adj[1].push_back({4, 2});
    adj[2].push_back({4, 5});
    adj[4].push_back({3, 3});

    vector<int> dist(V, INT_MAX);
    vector<int> parent(V, -1);
    priority_queue<ii, vector<ii>, greater<ii>> pq;
    dist[0] = 0;
    pq.push({0, 0});

    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                parent[v] = u;
                pq.push({dist[v], v});
            }
        }
    }

    // Reconstruct path to node 3
    int target = 3;
    vector<int> path;
    for (int v = target; v != -1; v = parent[v])
        path.push_back(v);
    reverse(path.begin(), path.end());

    cout << "Shortest path to node " << target << " (cost=" << dist[target] << "): ";
    for (int v : path) cout << v << " ";
    cout << endl;
    return 0;
}`
      }
    ],
  },

  'graph-bellman-ford': {
    tags: ['Bellman-Ford', 'negative-weight', 'negative-cycle', 'SPFA', 'shortest-path'],
    timeComplexity: 'O(V × E)',
    whyLearn: `Bellman-Ford handles what Dijkstra can't — graphs with negative edge weights.
- It's the only standard SSSP algorithm that detects negative cycles
- SPFA (Shortest Path Faster Algorithm) is a practical optimization that's often faster
- Understanding why V-1 relaxations suffice builds deep graph theory intuition
- Essential for problems involving profit/loss on edges or currency exchange arbitrage`,
    whenToUse: `### Use Bellman-Ford When
- The graph has negative edge weights
- You need to detect negative cycles (run V-th relaxation — if anything improves, there's a negative cycle)
- You want shortest paths with at most K edges

### Use SPFA (queue-based Bellman-Ford) When
- You want a faster practical implementation (still O(VE) worst case)`,
    commonMistakes: `- Running fewer than V-1 iterations (distances may not be final)
- Forgetting to check for negative cycles after V-1 iterations
- Using Bellman-Ford when Dijkstra would work (unnecessary slowdown)
- Not handling the case where negative cycle makes some distances -infinity`,
    relatedTopics: ['graph-sssp', 'graph-floyd', 'graph-basics'],
    practiceProblems: [
      { name: 'Cheapest Flights Within K Stops', source: 'LeetCode', difficulty: 'Medium', url: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/' },
      { name: 'Cycle Finding', source: 'CSES', difficulty: 'Medium', url: 'https://cses.fi/problemset/task/1197' },
    ],
    codeSnippets: [
      {
        name: 'Bellman-Ford',
        code: `struct Edge { int u, v, w; };

pair<vector<int>, bool> bellmanFord(int s, int V, vector<Edge>& edges) {
    vector<int> dist(V, INT_MAX);
    dist[s] = 0;

    for (int i = 0; i < V - 1; i++)
        for (auto& [u, v, w] : edges)
            if (dist[u] != INT_MAX && dist[u] + w < dist[v])
                dist[v] = dist[u] + w;

    bool negativeCycle = false;
    for (auto& [u, v, w] : edges)
        if (dist[u] != INT_MAX && dist[u] + w < dist[v])
            negativeCycle = true;

    return {dist, negativeCycle};
}`,
        pythonTutorCode: `#include <iostream>
#include <vector>
#include <climits>
using namespace std;

struct Edge { int u, v, w; };

int main() {
    int V = 5;
    vector<Edge> edges = {
        {0,1,4}, {0,2,1}, {1,3,1},
        {2,1,2}, {2,4,5}, {4,3,-3}
    };

    vector<int> dist(V, INT_MAX);
    dist[0] = 0;

    // Relax V-1 times
    for (int i = 0; i < V - 1; i++) {
        cout << "Iteration " << i+1 << ":" << endl;
        for (auto& e : edges) {
            if (dist[e.u] != INT_MAX && dist[e.u] + e.w < dist[e.v]) {
                dist[e.v] = dist[e.u] + e.w;
                cout << "  Relaxed edge " << e.u << "->" << e.v << " (new dist=" << dist[e.v] << ")" << endl;
            }
        }
    }

    // Check negative cycle
    bool neg = false;
    for (auto& e : edges)
        if (dist[e.u] != INT_MAX && dist[e.u] + e.w < dist[e.v])
            neg = true;

    cout << "\\nDistances: ";
    for (int i = 0; i < V; i++) cout << dist[i] << " ";
    cout << "\\nNegative cycle: " << (neg ? "YES" : "NO") << endl;
    return 0;
}`
      },
      {
        name: 'SPFA',
        code: `vector<int> spfa(int s, int V, vector<vector<pair<int,int>>>& adj) {
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
}`,
        pythonTutorCode: null,
      }
    ],
  },

  'graph-floyd': {
    tags: ['Floyd-Warshall', 'all-pairs', 'shortest-path', 'transitive-closure'],
    timeComplexity: 'O(V^3)',
    whyLearn: `Floyd-Warshall computes ALL shortest paths between ALL pairs of vertices in just 4 lines of code.
- Only 3 nested loops — one of the simplest yet most powerful graph algorithms
- Perfect when V ≤ 400 and you need distances between all pairs
- Also computes transitive closure (reachability between all pairs)
- Can detect negative cycles (diagonal becomes negative)`,
    whenToUse: `### Use Floyd-Warshall When
- V ≤ 400 (since O(V^3) ≈ 64 million for V=400)
- You need shortest paths between ALL pairs of vertices
- The graph is dense (many edges)
- You need transitive closure

### Use Dijkstra from Each Source Instead When
- V > 400 but E is sparse — run Dijkstra V times: O(V(V+E) log V)`,
    commonMistakes: `- The K loop (intermediate vertex) MUST be the outermost loop — this is the most common bug
- Initializing dist[i][i] to anything other than 0
- Initializing dist[i][j] to INT_MAX (causes overflow when adding) — use 1e18 or a large sentinel
- Forgetting that the graph needs an adjacency matrix representation`,
    relatedTopics: ['graph-sssp', 'graph-bellman-ford', 'graph-basics'],
    practiceProblems: [
      { name: 'Shortest Routes II', source: 'CSES', difficulty: 'Easy', url: 'https://cses.fi/problemset/task/1672' },
      { name: 'Find the City', source: 'LeetCode', difficulty: 'Medium', url: 'https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/' },
    ],
    codeSnippets: [
      {
        name: 'Floyd-Warshall',
        code: `// Floyd-Warshall — All Pairs Shortest Paths
const long long INF = 1e18;
// dist[i][j] = weight of edge i->j, or INF if no edge
// dist[i][i] = 0

for (int k = 0; k < V; k++)       // k MUST be outermost!
    for (int i = 0; i < V; i++)
        for (int j = 0; j < V; j++)
            if (dist[i][k] < INF && dist[k][j] < INF)
                dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);`,
        pythonTutorCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    const long long INF = 1e18;
    int V = 4;
    vector<vector<long long>> dist(V, vector<long long>(V, INF));

    // Initialize diagonal
    for (int i = 0; i < V; i++) dist[i][i] = 0;

    // Add edges: 0->1(3), 0->3(7), 1->0(8), 1->2(2), 2->0(5), 2->3(1), 3->0(2)
    dist[0][1]=3; dist[0][3]=7; dist[1][0]=8;
    dist[1][2]=2; dist[2][0]=5; dist[2][3]=1; dist[3][0]=2;

    // Floyd-Warshall
    for (int k = 0; k < V; k++)
        for (int i = 0; i < V; i++)
            for (int j = 0; j < V; j++)
                if (dist[i][k] < INF && dist[k][j] < INF)
                    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);

    cout << "All-pairs shortest distances:" << endl;
    for (int i = 0; i < V; i++) {
        for (int j = 0; j < V; j++) {
            if (dist[i][j] == INF) cout << "INF ";
            else cout << dist[i][j] << "   ";
        }
        cout << endl;
    }
    return 0;
}`
      },
      {
        name: 'Transitive Closure',
        code: `// Transitive Closure (can i reach j?)
// reach[i][j] = true if edge i->j exists
for (int k = 0; k < V; k++)
    for (int i = 0; i < V; i++)
        for (int j = 0; j < V; j++)
            reach[i][j] = reach[i][j] || (reach[i][k] && reach[k][j]);`,
        pythonTutorCode: null,
      }
    ],
  },

  'graph-mst': {
    tags: ['MST', 'Kruskal', 'Prim', 'minimum-spanning-tree', 'greedy'],
    timeComplexity: 'O(E log E)',
    whyLearn: `Minimum Spanning Tree connects all vertices with minimum total edge weight — a fundamental optimization problem.
- Kruskal's + Union-Find is one of the most elegant algorithm combinations in CS
- MST has a unique property: the answer is the same regardless of which algorithm you use
- Applications: network design, clustering, approximation algorithms for TSP
- The MST cut property and cycle property are beautiful theoretical results`,
    whenToUse: `### Use Kruskal's When
- The graph is sparse (sort edges, use Union-Find)
- You already have an edge list

### Use Prim's When
- The graph is dense (use adjacency matrix + priority queue)
- You want to grow the MST from a starting vertex`,
    commonMistakes: `- Forgetting to sort edges by weight in Kruskal's
- Not checking for connectivity — MST only exists if the graph is connected
- Confusing MST with shortest path tree (they're different!)
- In Prim's, forgetting to mark vertices as "in MST" to avoid cycles`,
    relatedTopics: ['ds-union-find', 'graph-basics', 'algo-greedy'],
    practiceProblems: [
      { name: 'Min Cost to Connect All Points', source: 'LeetCode', difficulty: 'Medium', url: 'https://leetcode.com/problems/min-cost-to-connect-all-points/' },
      { name: 'Road Reparation', source: 'CSES', difficulty: 'Easy', url: 'https://cses.fi/problemset/task/1675' },
    ],
    codeSnippets: [
      {
        name: "Kruskal's MST",
        code: `struct Edge {
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
    return mstCost;
}`,
        pythonTutorCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Edge {
    int u, v, w;
    bool operator<(const Edge& o) const { return w < o.w; }
};

int parent_arr[100], rank_arr[100];
int find(int x) { return parent_arr[x] == x ? x : parent_arr[x] = find(parent_arr[x]); }
void unite(int a, int b) {
    a = find(a); b = find(b);
    if (rank_arr[a] < rank_arr[b]) swap(a, b);
    parent_arr[b] = a;
    if (rank_arr[a] == rank_arr[b]) rank_arr[a]++;
}

int main() {
    int V = 5;
    for (int i = 0; i < V; i++) { parent_arr[i] = i; rank_arr[i] = 0; }

    vector<Edge> edges = {{0,1,4},{0,2,1},{1,2,2},{1,3,5},{2,3,8},{3,4,3},{2,4,7}};
    sort(edges.begin(), edges.end());

    long long cost = 0;
    int cnt = 0;
    for (auto& e : edges) {
        if (find(e.u) != find(e.v)) {
            unite(e.u, e.v);
            cost += e.w;
            cnt++;
            cout << "Add edge " << e.u << "-" << e.v << " (w=" << e.w << ")" << endl;
            if (cnt == V - 1) break;
        }
    }
    cout << "MST cost: " << cost << endl;
    return 0;
}`
      },
      {
        name: "Prim's MST",
        code: `long long prim(int V, vector<vector<pair<int,int>>>& adj) {
    vector<bool> inMST(V, false);
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    pq.push({0, 0});
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
}`,
        pythonTutorCode: null,
      }
    ],
  },

  'graph-scc': {
    tags: ['SCC', 'Tarjan', 'Kosaraju', 'strongly-connected', 'directed-graph'],
    timeComplexity: 'O(V + E)',
    whyLearn: `Strongly Connected Components reveal the "backbone" of a directed graph — groups of vertices that can all reach each other.
- SCC condensation turns any directed graph into a DAG, making DP and topo-sort applicable
- Tarjan's algorithm is elegant — it uses DFS and a stack with only one pass
- Real applications: analyzing dependencies, finding circular references, 2-SAT
- Understanding SCC deeply shows you how DFS tree structure encodes rich information`,
    whenToUse: `### Use SCC When
- You need to find groups of mutually reachable vertices
- You want to condense a directed graph into a DAG
- Solving 2-SAT (model as implication graph, find SCC)
- Finding if all vertices can reach each other (single SCC = yes)`,
    commonMistakes: `- Confusing SCC (directed) with connected components (undirected)
- In Tarjan's: incorrectly updating low-link values
- In Kosaraju's: forgetting to transpose the graph for the second DFS
- Not handling the condensed DAG correctly after finding SCCs`,
    relatedTopics: ['graph-traversal', 'graph-topo-sort', 'graph-basics'],
    practiceProblems: [
      { name: 'Planets and Kingdoms', source: 'CSES', difficulty: 'Medium', url: 'https://cses.fi/problemset/task/1682' },
      { name: 'Critical Connections', source: 'LeetCode', difficulty: 'Hard', url: 'https://leetcode.com/problems/critical-connections-in-a-network/' },
    ],
  },

  'graph-maxflow': {
    tags: ['max-flow', 'min-cut', 'Ford-Fulkerson', 'Edmonds-Karp', 'network-flow'],
    timeComplexity: 'O(V × E^2)',
    whyLearn: `Max Flow / Min Cut is one of the most powerful modeling tools in competitive programming.
- The Max-Flow Min-Cut theorem is a deep result — the maximum flow equals the minimum cut
- Many seemingly unrelated problems reduce to max flow: bipartite matching, edge-disjoint paths, project selection
- Edmonds-Karp guarantees O(VE^2) — polynomial and practical
- Understanding flow networks opens the door to linear programming duality`,
    whenToUse: `### Use Max Flow When
- You need maximum matching in a bipartite graph
- "Maximum number of edge-disjoint paths" between two nodes
- Minimum cut problems (by Max-Flow Min-Cut theorem)
- Project selection problems with profits and penalties`,
    commonMistakes: `- Forgetting to add reverse edges with capacity 0 (needed for augmenting paths)
- Using DFS for augmenting paths (Ford-Fulkerson can be exponential) — use BFS (Edmonds-Karp)
- Not handling multiple edges between same nodes correctly
- Confusing flow (current) with capacity (maximum)`,
    relatedTopics: ['graph-bipartite', 'graph-basics', 'graph-traversal'],
    practiceProblems: [
      { name: 'Download Speed', source: 'CSES', difficulty: 'Medium', url: 'https://cses.fi/problemset/task/1694' },
    ],
  },

  'graph-bipartite': {
    tags: ['bipartite', 'matching', '2-coloring', 'Hungarian', 'König'],
    timeComplexity: 'O(V × E)',
    whyLearn: `Bipartite graphs model "two-group" problems — matching workers to jobs, students to courses, etc.
- 2-coloring check (is the graph bipartite?) is a simple BFS/DFS
- Maximum bipartite matching can be solved via max flow or Hopcroft-Karp
- König's theorem: in bipartite graphs, max matching = min vertex cover
- These problems appear frequently in ICPC and job assignment scenarios`,
    whenToUse: `### Use Bipartite Check When
- You need to verify if a graph can be 2-colored (no adjacent same colors)
- Checking if a graph has odd-length cycles (bipartite iff no odd cycles)

### Use Bipartite Matching When
- Assigning items to slots where each item fits certain slots
- Maximum matching in a bipartite graph
- Minimum vertex cover (by König's theorem)`,
    commonMistakes: `- Forgetting that bipartite matching can be solved with max flow (not just augmenting paths)
- Not handling disconnected components when checking bipartiteness
- Confusing bipartite matching with general matching (general requires Blossom algorithm)`,
    relatedTopics: ['graph-maxflow', 'graph-traversal', 'graph-basics'],
  },

  'math-primes': {
    tags: ['primes', 'sieve', 'factorization', 'prime-testing', 'number-theory'],
    timeComplexity: 'O(N log log N)',
    whyLearn: `Prime numbers are the building blocks of number theory. The Sieve of Eratosthenes is one of the most efficient algorithms ever invented.
- Sieve finds all primes up to N in O(N log log N) — nearly linear
- Prime factorization is key to GCD, LCM, divisor counting, and multiplicative functions
- Primality testing for large numbers uses Miller-Rabin
- Many contest problems involve number theory where primes are essential`,
    whenToUse: `### Use Sieve When
- You need all primes up to N (N ≤ 10^7 easily)
- You need to factorize many numbers (use smallest prime factor sieve)
- Counting divisors, Euler's totient, Mobius function

### Use Miller-Rabin When
- Testing if a single large number (up to 10^18) is prime
- The deterministic version with specific bases works for all numbers < 3.3×10^24`,
    commonMistakes: `- Sieve for N > 10^8 uses too much memory — use segmented sieve
- Forgetting that 1 is NOT prime
- Trial division: checking up to N instead of sqrt(N) (wastes time)
- Integer overflow when multiplying in modular arithmetic`,
    relatedTopics: ['math-gcd-mod', 'math-combinatorics'],
    practiceProblems: [
      { name: 'Count Primes', source: 'LeetCode', difficulty: 'Medium', url: 'https://leetcode.com/problems/count-primes/' },
      { name: 'Counting Divisors', source: 'CSES', difficulty: 'Easy', url: 'https://cses.fi/problemset/task/1713' },
    ],
  },

  'math-gcd-mod': {
    tags: ['GCD', 'modular-arithmetic', 'Euclidean', 'modular-inverse', 'extended-GCD'],
    timeComplexity: 'O(log N)',
    whyLearn: `GCD and modular arithmetic are the bread and butter of competitive programming math.
- The Euclidean algorithm is O(log N) — extremely fast
- Modular inverse is needed whenever you divide under a modulus (common in combinatorics)
- Extended Euclidean solves ax + by = gcd(a,b) — useful for Diophantine equations
- Almost all "output answer mod 10^9+7" problems need modular arithmetic`,
    whenToUse: `### Use GCD When
- Simplifying fractions
- Finding LCM: lcm(a,b) = a / gcd(a,b) * b
- Problems involving divisibility

### Use Modular Inverse When
- Computing nCr mod p (need to divide factorials)
- Any division under a prime modulus
- Fermat's little theorem: a^(-1) ≡ a^(p-2) mod p`,
    commonMistakes: `- Computing LCM as (a*b)/gcd(a,b) — this overflows! Use a/gcd(a,b)*b
- Forgetting that modular inverse only exists when gcd(a, mod) = 1
- Not taking mod at every step (intermediate overflow)
- Subtracting under mod without adding mod back: (a - b) % mod can be negative`,
    relatedTopics: ['math-primes', 'math-combinatorics'],
    practiceProblems: [
      { name: 'Common Divisors', source: 'CSES', difficulty: 'Easy', url: 'https://cses.fi/problemset/task/1081' },
      { name: 'Exponentiation II', source: 'CSES', difficulty: 'Medium', url: 'https://cses.fi/problemset/task/1712' },
    ],
  },

  'math-combinatorics': {
    tags: ['combinatorics', 'nCr', 'Pascal', 'Catalan', 'inclusion-exclusion'],
    timeComplexity: 'O(N) precompute',
    whyLearn: `Combinatorics is the art of counting. "How many ways?" is one of the most common problem types in CP.
- Precomputing factorials and inverse factorials lets you answer nCr queries in O(1)
- Catalan numbers, Stirling numbers, and derangements are recurring patterns
- Inclusion-exclusion principle solves "count with constraints" problems
- Understanding generating functions gives deep insight into combinatorial identities`,
    whenToUse: `### Use Direct Counting When
- The formula is a simple product of binomial coefficients
- Stars and bars: distribute N identical items into K distinct bins

### Use Inclusion-Exclusion When
- "Count X but not Y" or "count satisfying at least one condition"
- Derangements, surjective functions

### Use DP When
- The combinatorial structure has overlapping subproblems
- Catalan numbers, partition numbers`,
    commonMistakes: `- Not precomputing factorials (computing nCr from scratch each time is O(N))
- Overflow: always work mod 10^9+7 and use modular inverse for division
- Off-by-one in binomial coefficients (is it n choose k or n+1 choose k?)
- Forgetting the negative sign alternation in inclusion-exclusion`,
    relatedTopics: ['math-gcd-mod', 'math-primes', 'algo-dp-intro'],
    practiceProblems: [
      { name: 'Unique Paths', source: 'LeetCode', difficulty: 'Medium', url: 'https://leetcode.com/problems/unique-paths/' },
      { name: 'Binomial Coefficients', source: 'CSES', difficulty: 'Easy', url: 'https://cses.fi/problemset/task/1079' },
    ],
  },

  'math-game-theory': {
    tags: ['game-theory', 'Sprague-Grundy', 'Nim', 'minimax', 'winning-losing'],
    timeComplexity: 'O(N)',
    whyLearn: `Game theory problems are among the most elegant in competitive programming.
- The Sprague-Grundy theorem reduces ANY impartial game to Nim
- Nim's solution is beautifully simple: XOR all pile sizes
- Understanding winning/losing positions is key — work backwards from base cases
- These problems feel like puzzles and test deep mathematical reasoning`,
    whenToUse: `### Use Nim's Theorem When
- The game involves multiple independent piles/sub-games
- XOR of Grundy values determines the winner

### Use Sprague-Grundy When
- The game has complex rules but is still impartial (both players have same moves)
- Compute Grundy values for small cases, find the pattern

### Use Minimax + Alpha-Beta When
- The game is not impartial (different moves for each player)
- N is small enough for game tree search`,
    commonMistakes: `- Assuming the game is impartial when it's not (e.g., Chess is not impartial)
- Forgetting that the XOR of all Grundy values determines the winner (not sum)
- Not considering the "zero moves" case — the player who can't move loses (normal play convention)
- Computing Grundy values iteratively without memoization`,
    relatedTopics: ['algo-dp-intro', 'math-combinatorics'],
    practiceProblems: [
      { name: 'Nim Game', source: 'LeetCode', difficulty: 'Easy', url: 'https://leetcode.com/problems/nim-game/' },
      { name: 'Nim Game I', source: 'CSES', difficulty: 'Easy', url: 'https://cses.fi/problemset/task/1730' },
    ],
  },

  'math-probability': {
    tags: ['probability', 'expected-value', 'linearity', 'random'],
    timeComplexity: 'O(N)',
    whyLearn: `Probability and expected value problems are increasingly common in modern contests.
- Linearity of expectation is the most powerful trick: E[X+Y] = E[X] + E[Y] even if X,Y are dependent!
- This one property solves problems that seem impossible otherwise
- Expected value DP combines two powerful techniques
- Understanding probability gives intuition for randomized algorithms`,
    whenToUse: `### Use Linearity of Expectation When
- Computing expected value of a sum of random variables
- The variables may be dependent — linearity still works!
- Example: expected number of inversions, expected distance

### Use DP for Expected Value When
- The process has states and transitions with probabilities
- Example: expected number of steps in a random walk`,
    commonMistakes: `- Trying to compute probability of complex events directly (use inclusion-exclusion or DP instead)
- Forgetting that E[X+Y] = E[X] + E[Y] always holds (no independence needed)
- Confusing expected value with most likely value
- Not handling modular arithmetic for probability fractions`,
    relatedTopics: ['math-combinatorics', 'algo-dp-intro'],
  },

  'string-basics': {
    tags: ['string', 'hashing', 'palindrome', 'anagram', 'substring'],
    timeComplexity: 'O(N)',
    whyLearn: `String algorithms are a core category in competitive programming, appearing in every major contest.
- String hashing enables O(1) substring comparison after O(N) preprocessing
- Polynomial hashing (Rabin-Karp) is the go-to for string matching and palindrome checking
- Understanding when to use hashing vs KMP vs suffix structures is crucial
- Many "string" problems are actually DP or graph problems in disguise`,
    whenToUse: `### Use String Hashing When
- Comparing substrings for equality in O(1)
- Finding repeated patterns or palindromes
- Need a fast, general-purpose string matching tool

### Use Built-in Functions When
- Simple operations: find, substr, compare
- The problem constraints are small (N ≤ 10^4)`,
    commonMistakes: `- Hash collisions: always use double hashing (two different mods) for safety
- Choosing a bad hash base (use a prime > 26, like 31 or 37)
- Not handling the modular arithmetic carefully (negative remainders)
- Using string concatenation in a loop (O(N^2) — use ostringstream or reserve)`,
    relatedTopics: ['string-kmp', 'string-dp', 'string-suffix'],
    practiceProblems: [
      { name: 'Longest Common Prefix', source: 'LeetCode', difficulty: 'Easy', url: 'https://leetcode.com/problems/longest-common-prefix/' },
      { name: 'String Hashing', source: 'CSES', difficulty: 'Medium', url: 'https://cses.fi/problemset/task/1753' },
    ],
  },

  'string-kmp': {
    tags: ['KMP', 'pattern-matching', 'prefix-function', 'failure-function'],
    timeComplexity: 'O(N + M)',
    whyLearn: `KMP (Knuth-Morris-Pratt) is the gold standard for exact string matching — O(N+M) with no hash collisions.
- The prefix function (failure function) is the key insight — it tells you how far to "jump back" on mismatch
- Unlike hashing, KMP has no false positives — it's deterministic
- The prefix function itself solves many problems: finding periods, computing borders, etc.
- Understanding KMP builds intuition for more complex automata-based algorithms`,
    whenToUse: `### Use KMP When
- Exact pattern matching: find all occurrences of pattern P in text T
- Finding the shortest period of a string
- Computing the longest prefix which is also a suffix (prefix function)

### Use Hashing Instead When
- You need to compare many different substrings (more flexible)
- The problem needs approximate matching or wildcard matching`,
    commonMistakes: `- Off-by-one in the failure function computation
- Not understanding that KMP processes each character at most twice (amortized O(1) per character)
- Concatenating pattern + text without a separator (use P + '#' + T)
- Confusing KMP with Z-algorithm (both solve pattern matching but the prefix function is different from Z-values)`,
    relatedTopics: ['string-basics', 'string-suffix'],
    practiceProblems: [
      { name: 'Find the Index of First Occurrence', source: 'LeetCode', difficulty: 'Easy', url: 'https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/' },
      { name: 'String Matching', source: 'CSES', difficulty: 'Easy', url: 'https://cses.fi/problemset/task/1753' },
    ],
  },

  'string-dp': {
    tags: ['string-DP', 'edit-distance', 'LCS', 'palindrome', 'alignment'],
    timeComplexity: 'O(N × M)',
    whyLearn: `String DP solves problems that no other string technique can — edit distance, LCS, palindrome partitioning.
- Edit distance (Levenshtein distance) is used in spell checkers, DNA alignment, and diff tools
- Longest Common Subsequence (LCS) appears everywhere — from diff algorithms to bioinformatics
- These problems beautifully demonstrate the power of 2D DP
- Understanding the recurrence helps you adapt it to custom similarity metrics`,
    whenToUse: `### Use Edit Distance When
- Measuring how similar two strings are
- Spell checking, fuzzy matching, DNA sequence alignment

### Use LCS When
- Finding the longest sequence common to both strings (not necessarily contiguous)
- Computing the shortest common supersequence (SCS = N + M - LCS)

### Use Palindrome DP When
- Minimum cuts to partition into palindromes
- Longest palindromic subsequence`,
    commonMistakes: `- Confusing substring (contiguous) with subsequence (not necessarily contiguous)
- Wrong base cases: dp[0][j] and dp[i][0] need careful initialization
- Not optimizing space when only dp[i-1] row is needed
- Using O(N^3) approach when O(N^2) exists`,
    relatedTopics: ['algo-dp-intro', 'string-basics', 'string-kmp'],
    practiceProblems: [
      { name: 'Edit Distance', source: 'LeetCode', difficulty: 'Medium', url: 'https://leetcode.com/problems/edit-distance/' },
      { name: 'Longest Palindromic Subsequence', source: 'LeetCode', difficulty: 'Medium', url: 'https://leetcode.com/problems/longest-palindromic-subsequence/' },
      { name: 'Edit Distance (CSES)', source: 'CSES', difficulty: 'Easy', url: 'https://cses.fi/problemset/task/1639' },
    ],
  },

  'string-suffix': {
    tags: ['suffix-array', 'suffix-tree', 'LCP', 'substring-search'],
    timeComplexity: 'O(N log N)',
    whyLearn: `Suffix arrays are the most powerful string data structure — they solve problems that would otherwise require complex algorithms.
- A suffix array is a sorted array of all suffixes — surprisingly, this simple idea is incredibly powerful
- Combined with LCP (Longest Common Prefix) array, it answers substring queries in O(log N)
- Suffix arrays can count distinct substrings, find longest repeated substrings, and more
- The O(N log N) construction algorithm is a masterpiece of algorithm design`,
    whenToUse: `### Use Suffix Array When
- Counting distinct substrings
- Finding the longest repeated substring
- String matching with binary search on suffixes
- Comparing substrings efficiently with LCP array

### Use Simpler Methods When
- Simple pattern matching (use KMP or hashing)
- Only need to find one pattern (suffix array is overkill)`,
    commonMistakes: `- Using O(N^2 log N) naive suffix array construction when O(N log N) is needed
- Not building the LCP array (most suffix array problems need it)
- Forgetting that suffix array is 0-indexed
- Not understanding the relationship between LCP and distinct substrings count`,
    relatedTopics: ['string-kmp', 'string-basics', 'ds-segment-tree'],
  },

  'geometry-points-lines': {
    tags: ['geometry', 'cross-product', 'dot-product', 'distance', 'orientation'],
    timeComplexity: 'O(1) per operation',
    whyLearn: `Computational geometry is a unique category in CP — it requires precision, careful implementation, and geometric intuition.
- The cross product is the single most important tool: it determines orientation, area, and turns
- Understanding signed area and orientation helps with convex hull, polygon area, and point-in-polygon
- Floating-point precision issues are the #1 source of bugs — learn to use integer arithmetic when possible
- Geometry problems are often worth high points in contests because fewer people attempt them`,
    whenToUse: `### Use Cross Product When
- Determining if a turn is left/right/collinear (orientation test)
- Computing the area of a triangle or polygon
- Checking if two line segments intersect

### Use Dot Product When
- Computing angles between vectors
- Projection of a point onto a line
- Checking perpendicularity`,
    commonMistakes: `- Using floating-point when integer arithmetic suffices (avoid precision issues!)
- Not handling collinear points (cross product = 0)
- Forgetting that cross product in 2D gives a scalar (the z-component)
- Division by zero when lines are parallel
- Using atan2 for angle comparison (use cross product instead — more robust)`,
    relatedTopics: ['geometry-circles-triangles', 'geometry-polygon'],
  },

  'geometry-circles-triangles': {
    tags: ['circle', 'triangle', 'circumscribed', 'inscribed', 'area'],
    timeComplexity: 'O(1) per operation',
    whyLearn: `Circle and triangle problems combine geometry with algebra — they're a unique challenge in CP.
- Many real-world problems reduce to circle-circle or circle-line intersection
- Triangle properties (area formulas, circumscribed/inscribed circles) appear in computational geometry sets
- These problems test your ability to handle floating-point precision carefully`,
    whenToUse: `### Circle Problems
- Circle-line intersection, circle-circle intersection
- Minimum enclosing circle (randomized O(N) algorithm)
- Tangent lines to circles

### Triangle Problems
- Area using cross product or Heron's formula
- Circumcircle and incircle computation
- Point-in-triangle test using barycentric coordinates`,
    commonMistakes: `- Not handling degenerate cases (collinear points for triangle, coincident circles)
- Floating-point comparison: use EPS = 1e-9 for equality checks
- Forgetting to handle the case where circles don't intersect
- Using wrong formula for signed area vs absolute area`,
    relatedTopics: ['geometry-points-lines', 'geometry-polygon'],
  },

  'geometry-polygon': {
    tags: ['polygon', 'convex-hull', 'area', 'point-in-polygon', 'sweep-line'],
    timeComplexity: 'O(N log N)',
    whyLearn: `Polygon algorithms are the culmination of computational geometry — convex hull is one of the most important algorithms in the field.
- Convex hull is a preprocessing step for many geometry problems
- Polygon area using the shoelace formula is O(N) and elegant
- Point-in-polygon testing (ray casting) is a practical algorithm with many applications
- Understanding convex vs general polygons helps you choose the right approach`,
    whenToUse: `### Use Convex Hull When
- Finding the outer boundary of a point set
- Computing the diameter (farthest pair) using rotating calipers
- Minimum enclosing shapes

### Use Shoelace Formula When
- Computing the area of any simple polygon in O(N)

### Use Point-in-Polygon When
- Testing if a point is inside a polygon (ray casting for general, binary search for convex)`,
    commonMistakes: `- Not handling collinear points in convex hull (include or exclude based on problem)
- Shoelace formula gives signed area — take absolute value
- Forgetting to close the polygon (last vertex connects to first)
- Using O(N) point-in-convex-polygon when O(log N) with binary search is possible`,
    relatedTopics: ['geometry-points-lines', 'geometry-circles-triangles'],
    practiceProblems: [
      { name: 'Erect the Fence', source: 'LeetCode', difficulty: 'Hard', url: 'https://leetcode.com/problems/erect-the-fence/' },
    ],
  },

  'advanced-decomposition': {
    tags: ['problem-decomposition', 'sqrt-decomposition', 'heavy-light', 'centroid'],
    timeComplexity: 'O(N√N)',
    whyLearn: `Problem decomposition techniques are the hallmark of expert-level competitive programming.
- Square root decomposition divides data into √N blocks for O(√N) queries — simple and powerful
- Heavy-Light Decomposition reduces tree path queries to segment tree queries
- Centroid decomposition enables divide-and-conquer on trees
- These techniques appear in Codeforces Div 1 hard problems and ICPC regionals`,
    whenToUse: `### Use √N Decomposition When
- You need a simple approach for range queries with O(√N) per query
- The problem has mixed operations that are hard to handle with segment trees

### Use Heavy-Light Decomposition When
- You need path queries on a tree (sum, max, etc.)
- Combining with segment tree for O(log^2 N) per query

### Use Centroid Decomposition When
- You need to answer path-related queries on trees
- Counting paths with certain properties`,
    commonMistakes: `- Using √N decomposition when segment tree is more appropriate (and simpler)
- HLD: incorrect chain decomposition or failing to handle the root case
- Centroid decomposition: forgetting to remove the centroid from the tree after processing
- Not choosing the right block size for √N decomposition (often √N but sometimes different)`,
    relatedTopics: ['ds-segment-tree', 'graph-traversal', 'algo-dnc'],
  },

  'advanced-search': {
    tags: ['A-star', 'IDA-star', 'meet-in-the-middle', 'state-space', 'heuristic'],
    timeComplexity: 'Varies',
    whyLearn: `Advanced search techniques let you solve problems that are too large for plain BFS/DFS.
- Meet in the Middle halves the exponent: O(2^(N/2)) instead of O(2^N)
- A* search uses heuristics to guide search toward the goal — much faster than BFS for pathfinding
- IDA* combines depth-first memory efficiency with A*'s heuristic guidance
- These are essential for puzzle-solving problems and state-space search`,
    whenToUse: `### Use Meet in the Middle When
- N ≤ 40 but 2^N is too large — split into two halves of size 20
- Subset sum with N ≤ 40
- Any problem where you can combine solutions from two halves

### Use A* When
- Pathfinding with a good heuristic (e.g., Manhattan distance for grids)
- The state space is too large for plain BFS

### Use IDA* When
- Memory is limited (A* stores all states in memory)
- The branching factor is high`,
    commonMistakes: `- Meet in the Middle: not sorting/binary-searching the second half efficiently
- A*: using an inadmissible heuristic (overestimates) — breaks optimality
- IDA*: not increasing the threshold correctly between iterations
- Not recognizing when a problem can be solved with simple BFS instead of advanced search`,
    relatedTopics: ['graph-traversal', 'graph-sssp', 'algo-complete-search'],
    practiceProblems: [
      { name: 'Meet in the Middle', source: 'CSES', difficulty: 'Hard', url: 'https://cses.fi/problemset/task/1628' },
    ],
  },
};
