export const topicsTh2 = {
  'algo-complete-search': {
    title: 'Complete Search (Brute Force)',
    description: 'การค้นหาแบบครบทุกกรณีทั้งแบบวนซ้ำและแบบเรียกซ้ำ, การตัดกิ่ง, และ Backtracking',
    content: `### Complete Search คืออะไร?
ลองทุกคำตอบที่เป็นไปได้แล้วเลือกคำตอบที่ดีที่สุด/ถูกต้อง เรียกอีกอย่างว่า "brute force"

### ควรใช้เมื่อไหร่
- เมื่อ N มีขนาดเล็กพอ (N ≤ ~20 สำหรับ exponential, N ≤ ~8 สำหรับ factorial)
- เมื่อไม่มีคำตอบแบบ greedy/DP หรือพิสูจน์ได้ยาก
- ใช้เป็นวิธีแรกเพื่อตรวจสอบความถูกต้องของคำตอบที่ปรับปรุงแล้ว

### การค้นหาแบบวนซ้ำ (Iterative Complete Search)
- ใช้ลูปซ้อนกันสำหรับพื้นที่ค้นหาขนาดเล็ก
- ตัวอย่าง: ปัญหา 2-sum ด้วย O(N²)

### การค้นหาแบบเรียกซ้ำ (Recursive Complete Search / Backtracking)
- สร้างคำตอบทีละขั้น โดยละทิ้งคำตอบบางส่วนที่ไม่สามารถนำไปสู่คำตอบที่ถูกต้องได้
- ปัญหาคลาสสิก: N-Queens, Sudoku solver, การสร้าง permutations/subsets

### การตัดกิ่ง (Pruning)
- ข้ามกิ่งก่อนเวลาถ้าไม่สามารถปรับปรุงคำตอบที่ดีที่สุดในปัจจุบันได้
- สามารถเปลี่ยนจาก exponential เป็นเวลาที่จัดการได้สำหรับ input ในทางปฏิบัติหลายกรณี

### การแจกแจงด้วย Bitmask
- แจกแจง subsets ทั้งหมด 2^N ชุดโดยใช้จำนวนเต็มตั้งแต่ 0 ถึง 2^N - 1
- แต่ละ bit แทนว่าสมาชิกนั้นถูกเลือกหรือไม่`
  },
  'algo-dnc': {
    title: 'Divide and Conquer',
    description: 'Binary Search, Bisection Method, และกลยุทธ์ Divide and Conquer',
    content: `### Binary Search บนอาร์เรย์ที่เรียงลำดับแล้ว
ค้นหาค่าเป้าหมายในอาร์เรย์ที่เรียงลำดับแล้วใน O(log N)

### Binary Search the Answer (Bisection)
ถ้าฟังก์ชัน \`f(x)\` เป็น monotonic (เช่น boolean: TTTTT...FFFFF) เราสามารถใช้ binary search เพื่อหาขอบเขตได้
- กำหนดฟังก์ชัน \`can(x)\` ที่คืนค่า true/false
- ใช้ binary search บนพื้นที่คำตอบ

### การประยุกต์ใช้งานคลาสสิก
- หาค่าต่ำสุดที่ตรงตามเงื่อนไข
- หาค่าสูงสุดของค่าต่ำสุด (เช่น "aggressive cows" — วางวัวเพื่อหาระยะห่างต่ำสุดที่มากที่สุด)
- หาค่าต่ำสุดของค่าสูงสุด (เช่น แบ่งอาร์เรย์ออกเป็น K ส่วนเพื่อให้ผลรวมสูงสุดน้อยที่สุด)

### D&C บนอาร์เรย์
- **Merge Sort**: การเรียงลำดับ O(N log N)
- **Count inversions**: Merge Sort ที่ดัดแปลง
- **Closest pair of points**: O(N log N) ด้วย D&C

### เคล็ดลับ
- ระวัง integer overflow ใน \`(low + high) / 2\` — ใช้ \`low + (high - low) / 2\` แทน
- สำหรับ binary search แบบจำนวนจริง ให้วนซ้ำ ~100 รอบแทนการใช้ epsilon`
  },
  'algo-greedy': {
    title: 'Greedy Algorithms',
    description: 'การเลือกที่เหมาะสมที่สุดเฉพาะที่: interval scheduling, coin change, และอื่นๆ',
    content: `### Greedy คืออะไร?
เลือกตัวเลือกที่เหมาะสมที่สุดเฉพาะที่ในแต่ละขั้นตอน โดยหวังว่าจะได้คำตอบที่เหมาะสมที่สุดโดยรวม

### Greedy ใช้ได้เมื่อไหร่?
- **Greedy choice property**: การเลือกที่เหมาะสมเฉพาะที่นำไปสู่คำตอบที่เหมาะสมโดยรวม
- **Optimal substructure**: คำตอบที่เหมาะสมประกอบด้วยคำตอบที่เหมาะสมของปัญหาย่อย
- ถ้าไม่แน่ใจ ลองพิสูจน์หรือหาตัวอย่างค้าน!

### ปัญหา Greedy คลาสสิก
1. **Interval Scheduling**: เรียงตามเวลาสิ้นสุด เลือก interval ที่ไม่ทับกัน
2. **Coin Change (ระบบเหรียญมาตรฐาน)**: เลือกเหรียญที่มีค่ามากที่สุดก่อน
3. **Huffman Coding**: สร้าง prefix-free code tree ที่เหมาะสมที่สุด
4. **Fractional Knapsack**: เลือกของตามอัตราส่วน value/weight
5. **Activity Selection**: จำนวนกิจกรรมสูงสุดที่ไม่ทับกัน
6. **Load Balancing**: กำหนดงานเพื่อลด max load ให้น้อยที่สุด

### การเรียงลำดับเป็นกุญแจสำคัญ
อัลกอริทึม greedy ส่วนใหญ่เริ่มต้นด้วยการเรียงลำดับตามเกณฑ์บางอย่าง (deadline, เวลาสิ้นสุด, อัตราส่วน ฯลฯ)

### ข้อผิดพลาดที่พบบ่อย
- ใช้ greedy เมื่อต้องใช้ DP (เช่น 0/1 Knapsack)
- ไม่พิสูจน์ greedy choice property`
  },
  'algo-dp-intro': {
    title: 'Dynamic Programming: พื้นฐาน',
    description: 'พื้นฐาน DP: overlapping subproblems, memoization, และ tabulation',
    content: `### DP คืออะไร?
Dynamic Programming แก้ปัญหาด้วยการ:
1. แบ่งออกเป็นปัญหาย่อยที่ซ้ำกัน (overlapping subproblems)
2. เก็บผลลัพธ์ของปัญหาย่อยเพื่อหลีกเลี่ยงการคำนวณซ้ำ

### สองแนวทาง
- **Top-Down (Memoization)**: ใช้การเรียกซ้ำพร้อม cache เขียนได้เป็นธรรมชาติ
- **Bottom-Up (Tabulation)**: ใช้การวนซ้ำ เติมตารางจาก base cases มักจะเร็วกว่า

### ขั้นตอนการแก้ปัญหา DP
1. **กำหนด state**: พารามิเตอร์ใดที่ระบุปัญหาย่อยได้อย่างเฉพาะเจาะจง?
2. **เขียนสูตรเวียนเกิด (recurrence)**: คำตอบของ state หนึ่งสัมพันธ์กับ state ที่เล็กกว่าอย่างไร?
3. **Base cases**: กรณีพื้นฐานที่ง่ายที่สุดคืออะไร?
4. **ลำดับการคำนวณ**: ให้แน่ใจว่า state ที่ต้องการทั้งหมดถูกคำนวณแล้วก่อน
5. **คำตอบ**: state ใดให้คำตอบสุดท้าย?

### ปัญหา DP คลาสสิก
- **Fibonacci**: dp[i] = dp[i-1] + dp[i-2]
- **Coin Change**: จำนวนเหรียญน้อยที่สุดที่รวมได้เท่ากับจำนวนที่ต้องการ
- **0/1 Knapsack**: เพิ่มมูลค่าให้สูงสุดภายในขีดจำกัดน้ำหนัก
- **Longest Increasing Subsequence (LIS)**: O(N log N) ด้วย patience sorting
- **Longest Common Subsequence (LCS)**: dp[i][j] ขึ้นอยู่กับการจับคู่ตัวอักษร

### ความซับซ้อน
- โดยปกติ O(จำนวน states × transitions ต่อ state)`
  },
  'algo-dp-advanced': {
    title: 'DP: เทคนิคขั้นสูง',
    description: 'Bitmask DP, DP on DAG, LIS O(N log N), และการลดพื้นที่หน่วยความจำ',
    content: `### Bitmask DP
ใช้ bitmask เป็น state เพื่อแทนเซตย่อย มีประโยชน์เมื่อ N ≤ 20
- **TSP**: dp[mask][i] = ต้นทุนต่ำสุดในการเยี่ยมเมืองใน mask โดยจบที่เมือง i
- **Assignment problem**: มอบหมาย N งานให้กับ N คนงาน

### DP on DAG
ปัญหา DP ใดๆ ที่มีโครงสร้างเป็น DAG สามารถแก้ได้ด้วย topological sort
- เส้นทางที่ยาวที่สุด/สั้นที่สุดใน DAG

### Longest Increasing Subsequence — O(N log N)
เก็บรายการของ tail elements ที่เล็กที่สุดสำหรับลำดับย่อยเพิ่มขึ้นแต่ละความยาว
- ใช้ \`lower_bound\` สำหรับเพิ่มขึ้นอย่างเคร่งครัด (strictly increasing)
- ใช้ \`upper_bound\` สำหรับไม่ลดลง (non-decreasing)

### การลดพื้นที่หน่วยความจำ (Space Optimization)
- ถ้า dp[i] ขึ้นอยู่กับ dp[i-1] เท่านั้น ให้ใช้สองแถวหรือแถวเดียว
- 0/1 Knapsack: วนน้ำหนักจากมากไปน้อยในอาร์เรย์เดียว

### Range DP
- dp[i][j] = คำตอบสำหรับ subarray/substring [i..j]
- ตัวอย่าง: Matrix Chain Multiplication, optimal BST

### Digit DP
- นับจำนวนใน [0, N] ที่มีคุณสมบัติตัวเลขบางอย่าง
- State: ตำแหน่ง, tight constraint, คุณสมบัติตัวเลขบางอย่าง`
  },
  'graph-basics': {
    title: 'การแทนกราฟ (Graph Representation)',
    description: 'Adjacency list, adjacency matrix, edge list, และ implicit graphs',
    content: `### Adjacency List
- ใช้บ่อยที่สุดใน CP พื้นที่: O(V + E)
- \`vector<vector<int>> adj(V);\` สำหรับกราฟไม่มีน้ำหนัก
- \`vector<vector<pair<int,int>>> adj(V);\` สำหรับกราฟมีน้ำหนัก

### Adjacency Matrix
- พื้นที่: O(V²) เหมาะเมื่อ V มีขนาดเล็ก (≤ 1000) และกราฟหนาแน่น
- \`int adj[V][V];\` — adj[i][j] = น้ำหนักของเส้นเชื่อม i→j (หรือ 0/INF ถ้าไม่มีเส้นเชื่อม)

### Edge List
- เก็บเส้นเชื่อมทั้งหมดเป็น (u, v, w) สามตัว
- มีประโยชน์สำหรับ Kruskal's MST (เรียงเส้นเชื่อมตามน้ำหนัก)

### Implicit Graph
- กราฟที่ถูกกำหนดโดยกฎ ไม่ได้เก็บไว้อย่างชัดเจน
- ตัวอย่าง: Grid ที่เคลื่อนที่ได้ 4 ทิศทาง, state-space search

### คุณสมบัติของกราฟ
- **Directed vs Undirected** (มีทิศทาง vs ไม่มีทิศทาง)
- **Weighted vs Unweighted** (มีน้ำหนัก vs ไม่มีน้ำหนัก)
- **Connected vs Disconnected** (เชื่อมต่อ vs ไม่เชื่อมต่อ)
- **Cyclic vs Acyclic (DAG)** (มีวงจร vs ไม่มีวงจร)
- **Tree**: กราฟเชื่อมต่อไม่มีวงจรที่มี V-1 เส้นเชื่อม
- **Bipartite**: สามารถระบายสี 2 สีได้ (ไม่มีวงจรความยาวคี่)`
  },
  'graph-traversal': {
    title: 'การท่องกราฟ (DFS & BFS)',
    description: 'DFS และ BFS: หัวใจสำคัญของอัลกอริทึมกราฟ',
    content: `### Depth First Search (DFS)
- ใช้การเรียกซ้ำ (หรือ stack อย่างชัดเจน)
- ลงลึกให้มากที่สุดก่อนจะย้อนกลับ
- **เวลา**: O(V + E)
- **การประยุกต์ใช้**: Connected components, การตรวจจับวงจร, topological sort, ตรวจสอบ bipartite, articulation points, bridges

### Breadth First Search (BFS)
- ใช้ queue
- สำรวจทุกโหนดที่ระยะ d ก่อนระยะ d+1
- **เวลา**: O(V + E)
- **การประยุกต์ใช้**: เส้นทางสั้นที่สุดในกราฟไม่มีน้ำหนัก, level-order traversal, flood fill

### คุณสมบัติของ DFS
- **Discovery time** และ **finish time**: มีประโยชน์สำหรับหลายอัลกอริทึม
- **Tree edges, back edges, forward edges, cross edges**
- Back edge มีอยู่ ⟺ มีวงจร (ในกราฟมีทิศทาง)

### BFS บน Grid
- ถือแต่ละช่องเป็นโหนด มี 4 เพื่อนบ้าน
- หาเส้นทางสั้นที่สุดจากต้นทางไปปลายทาง
- Flood fill: หา connected components ใน grid

### 0-1 BFS
- สำหรับกราฟที่มีน้ำหนักเส้นเชื่อมเป็น 0 หรือ 1
- ใช้ deque: ใส่เส้นเชื่อมน้ำหนัก 0 ไว้ด้านหน้า, น้ำหนัก 1 ไว้ด้านหลัง
- O(V + E) แทนที่จะเป็น O((V+E) log V) ของ Dijkstra`
  },
  'graph-topo-sort': {
    title: 'Topological Sort',
    description: 'การเรียงลำดับเชิงเส้นของจุดยอดใน DAG อัลกอริทึมของ Kahn และแนวทางด้วย DFS',
    content: `### Topological Sort คืออะไร?
การเรียงลำดับเชิงเส้นของจุดยอดใน DAG โดยที่สำหรับทุกเส้นเชื่อมมีทิศทาง u→v, u มาก่อน v

### ควรใช้เมื่อไหร่
- การจัดตารางงานที่มีการพึ่งพากัน
- วิชาบังคับก่อน (prerequisite)
- ระบบ build / ลำดับการ compile
- DP on DAG (ประมวลผลตาม topological order)

### สองแนวทาง
1. **Kahn's Algorithm (BFS)**: ประมวลผลโหนดที่มี in-degree เป็น 0 ลบออกแล้วลด in-degree ของเพื่อนบ้าน
2. **แนวทางด้วย DFS**: ทำ DFS แล้ว push เข้า stack เมื่อเสร็จ ลำดับกลับของ finish order = topological order

### การตรวจจับวงจร
- ถ้า Kahn's algorithm ไม่ได้ประมวลผลทุกโหนด → มีวงจร
- ถ้า DFS พบ back edge → มีวงจร

### การนับเส้นทางใน DAG
- ประมวลผลโหนดตาม topological order
- dp[v] = ผลรวมของ dp[u] สำหรับทุกเส้นเชื่อม u→v`
  },
  'graph-sssp': {
    title: 'Dijkstra\'s Algorithm (SSSP)',
    description: 'เส้นทางสั้นที่สุดจากจุดเดียวในกราฟมีน้ำหนักที่ไม่มีเส้นเชื่อมน้ำหนักลบ',
    content: `### Dijkstra's Algorithm
- สำหรับกราฟมีน้ำหนักที่มีน้ำหนักเส้นเชื่อม**ไม่เป็นลบ**
- ใช้ priority queue (min-heap) สำหรับการเลือกแบบ greedy
- **เวลา**: O((V + E) log V) ด้วย binary heap

### วิธีการทำงาน
1. ตั้ง dist[source] = 0, อื่นๆ ทั้งหมด = INF
2. Push (0, source) เข้า priority queue
3. Pop โหนดที่มีระยะทางน้อยที่สุด สำหรับแต่ละเพื่อนบ้าน ทำ relax เส้นเชื่อม
4. ทำซ้ำจนกว่า queue จะว่าง

### หมายเหตุสำคัญ
- **ใช้ไม่ได้**กับน้ำหนักเส้นเชื่อมที่เป็นลบ (ใช้ Bellman-Ford แทน)
- การ implement แบบ "lazy" (push รายการซ้ำเข้าไป) เขียนง่ายกว่าและเร็วพอสำหรับ CP
- เพื่อสร้างเส้นทางกลับ ให้เก็บ parent[v] = u เมื่อ relax เส้นเชื่อม u→v

### รูปแบบอื่นๆ
- **Modified Dijkstra**: ติดตาม state เพิ่มเติม (เช่น จำนวนเส้นเชื่อมที่ใช้)
- **Multi-source**: Push ทุกจุดเริ่มต้นด้วยระยะทาง 0 ตั้งแต่แรก`
  },
  'graph-bellman-ford': {
    title: 'Bellman-Ford & SPFA',
    description: 'SSSP กับน้ำหนักลบและการตรวจจับวงจรน้ำหนักลบ',
    content: `### Bellman-Ford Algorithm
- ใช้ได้กับ**น้ำหนักเส้นเชื่อมที่เป็นลบ**
- สามารถตรวจจับ**วงจรน้ำหนักลบ** (negative weight cycles) ได้
- **เวลา**: O(V × E) — ช้ากว่า Dijkstra

### วิธีการทำงาน
1. ตั้ง dist[source] = 0, อื่นๆ ทั้งหมด = INF
2. ทำซ้ำ V-1 รอบ: relax เส้นเชื่อมทั้งหมด
3. หลังจาก V-1 รอบ เส้นทางสั้นที่สุดทั้งหมดจะถูกพบ (ถ้าไม่มีวงจรน้ำหนักลบ)
4. ทำอีกหนึ่งรอบ: ถ้ายังมีเส้นเชื่อมใดที่สามารถ relax ได้ → มีวงจรน้ำหนักลบ

### SPFA (Shortest Path Faster Algorithm)
- Bellman-Ford ที่ปรับปรุงด้วยการใช้ queue
- กรณีเฉลี่ยเร็วกว่ามาก แต่กรณีแย่ที่สุดยังคงเป็น O(V × E)
- Push โหนดเข้า queue เฉพาะเมื่อยังไม่อยู่ใน queue

### ควรใช้เมื่อไหร่
- น้ำหนักเส้นเชื่อมเป็นลบ → Bellman-Ford หรือ SPFA
- ต้องการตรวจจับวงจรน้ำหนักลบ → Bellman-Ford
- น้ำหนักทั้งหมดไม่เป็นลบ → ใช้ Dijkstra (เร็วกว่า)`
  },
  'graph-floyd': {
    title: 'Floyd-Warshall (APSP)',
    description: 'เส้นทางสั้นที่สุดทุกคู่ใน O(V³) และตรวจจับวงจรน้ำหนักลบได้',
    content: `### Floyd-Warshall Algorithm
คำนวณเส้นทางสั้นที่สุดระหว่างจุดยอด**ทุกคู่**
- **เวลา**: O(V³)
- **พื้นที่**: O(V²)
- ใช้ได้กับน้ำหนักลบ (สามารถตรวจจับวงจรน้ำหนักลบได้)

### วิธีการทำงาน
สำหรับแต่ละจุดยอดตัวกลาง k (0 ถึง V-1):
  สำหรับแต่ละคู่ (i, j):
    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])

### แนวคิดสำคัญ
หลังจากพิจารณาจุดยอด 0..k เป็นตัวกลางแล้ว dist[i][j] คือเส้นทางสั้นที่สุดจาก i ไป j ที่ใช้เฉพาะจุดยอด 0..k เป็นโหนดตัวกลาง

### การตรวจจับวงจรน้ำหนักลบ
ถ้า dist[i][i] < 0 สำหรับจุดยอด i ใดๆ หลังจากอัลกอริทึมทำงานเสร็จ แสดงว่ามีวงจรน้ำหนักลบ

### ควรใช้เมื่อไหร่
- V ≤ ~400 (เนื่องจาก O(V³))
- ต้องการเส้นทางสั้นที่สุดทุกคู่
- เขียนง่ายกว่าการรัน Dijkstra V รอบ

### การประยุกต์ใช้
- Transitive closure (ความสามารถในการเข้าถึง)
- เส้นทาง Minimax / Maximin
- หาเส้นผ่านศูนย์กลาง (diameter) ของกราฟ`
  },
  'graph-mst': {
    title: 'Minimum Spanning Tree',
    description: 'อัลกอริทึมของ Kruskal และ Prim สำหรับหา MST',
    content: `### MST คืออะไร?
Spanning tree ของกราฟเชื่อมต่อที่มีน้ำหนักรวมของเส้นเชื่อมน้อยที่สุด มีเส้นเชื่อมพอดี V-1 เส้น

### Kruskal's Algorithm — O(E log E)
1. เรียงเส้นเชื่อมทั้งหมดตามน้ำหนัก
2. สำหรับแต่ละเส้นเชื่อม (u, v, w) ตามลำดับ:
   - ถ้า u และ v อยู่คนละ component (ใช้ Union-Find) ให้เพิ่มเส้นเชื่อมนี้เข้า MST
3. หยุดเมื่อ MST มี V-1 เส้นเชื่อม

### Prim's Algorithm — O(E log V)
1. เริ่มจากจุดยอดใดก็ได้ เพิ่มเข้า MST
2. จากเส้นเชื่อมทั้งหมดที่เชื่อมจุดยอดใน MST กับจุดยอดนอก MST ให้เลือกเส้นที่น้ำหนักน้อยที่สุด
3. เพิ่มจุดยอดใหม่เข้า MST ทำซ้ำจนกว่าจุดยอดทั้งหมดจะอยู่ใน MST

### ควรเลือกอันไหน?
- **Kruskal**: เขียนง่ายกว่าด้วย Union-Find เหมาะกับกราฟเบาบาง (sparse)
- **Prim**: เหมาะกับกราฟหนาแน่น (dense) implement คล้ายกับ Dijkstra

### รูปแบบอื่นๆ
- **Maximum Spanning Tree**: กลับเครื่องหมายน้ำหนักทั้งหมดหรือเรียงจากมากไปน้อย
- **Minimum Spanning Forest**: เมื่อกราฟไม่เชื่อมต่อ
- **Second Best MST**: หา MST แล้วลองแทนที่แต่ละเส้นเชื่อมใน MST`
  },
  'graph-scc': {
    title: 'Strongly Connected Components',
    description: 'อัลกอริทึมของ Kosaraju และ Tarjan สำหรับหา SCC ในกราฟมีทิศทาง',
    content: `### SCC คืออะไร?
เซตใหญ่สุดของจุดยอดที่ทุกจุดยอดสามารถเข้าถึงจุดยอดอื่นทุกจุดได้ (ในกราฟมีทิศทาง)

### Kosaraju's Algorithm — O(V + E)
1. ทำ DFS บนกราฟเดิม push เข้า stack ตาม finish time
2. สร้าง transpose graph (กลับทิศทางเส้นเชื่อมทั้งหมด)
3. Pop จาก stack แล้วทำ DFS บน transpose graph แต่ละ DFS tree คือ SCC หนึ่งอัน

### Tarjan's Algorithm — O(V + E)
- ทำ DFS ผ่านครั้งเดียวด้วย discovery time และ low-link values
- โหนด u เป็น root ของ SCC ถ้า \`disc[u] == low[u]\`
- ใช้ stack อย่างชัดเจนเพื่อติดตาม SCC ปัจจุบัน

### การประยุกต์ใช้
- **2-SAT**: สร้างแบบจำลองเป็น implication graph แก้ด้วย SCCs
- **DAG Condensation**: แทนที่แต่ละ SCC ด้วยโหนดเดียวเพื่อให้ได้ DAG
- **ความสามารถในการเข้าถึงในกราฟมีทิศทาง**

### Articulation Points & Bridges
- **Articulation point**: การลบออกทำให้กราฟไม่เชื่อมต่อ
- **Bridge**: การลบเส้นเชื่อมนี้ทำให้กราฟไม่เชื่อมต่อ
- ทั้งสองหาได้โดยใช้ DFS ที่ดัดแปลงด้วย low-link values`
  },
  'graph-maxflow': {
    title: 'Max Flow / Min Cut',
    description: 'Ford-Fulkerson method, Edmonds-Karp (BFS), และการประยุกต์ใช้',
    content: `### ปัญหา Max Flow
กำหนดเครือข่ายการไหล (กราฟมีทิศทางพร้อมความจุ) หาการไหลสูงสุดจากต้นทาง s ไปยังปลายทาง t

### Ford-Fulkerson Method
1. ตราบใดที่ยังมีเส้นทางเพิ่ม (augmenting path) จาก s ไป t ใน residual graph:
   - หาคอขวด (bottleneck) ซึ่งคือความจุ residual ต่ำสุดตลอดเส้นทาง
   - อัปเดตการไหลตลอดเส้นทาง

### Edmonds-Karp — O(V × E²)
- Ford-Fulkerson ที่ใช้ BFS เพื่อหา augmenting paths
- รับประกันเวลา O(V × E²)

### Max-Flow Min-Cut Theorem
การไหลสูงสุดเท่ากับความจุของ min cut โดย min-cut แบ่งจุดยอดเป็นสองเซต S และ T ที่ s∈S, t∈T และความจุรวมของเส้นเชื่อมจาก S ไป T น้อยที่สุด

### การประยุกต์ใช้
- Bipartite matching (max matching = max flow)
- เส้นทางที่ไม่มีเส้นเชื่อมร่วมกัน (Edge-disjoint paths)
- Minimum vertex cover (ทฤษฎีบทของ König)
- ปัญหาการเลือกโปรเจกต์ / closure problems`
  },
  'graph-bipartite': {
    title: 'Bipartite Graphs & Matching',
    description: 'การตรวจสอบ Bipartite, maximum bipartite matching, และ Hungarian algorithm',
    content: `### Bipartite Graph
กราฟเป็น bipartite ถ้าจุดยอดสามารถระบายด้วย 2 สีโดยที่ไม่มีจุดยอดที่อยู่ติดกันมีสีเดียวกัน
- เทียบเท่ากับ: กราฟไม่มีวงจรความยาวคี่
- ตรวจสอบด้วย BFS/DFS: ลองระบาย 2 สี

### Maximum Bipartite Matching
หาเซตของเส้นเชื่อมที่มากที่สุดที่ไม่มีจุดยอดร่วมกัน
- **Augmenting Path Algorithm (Kuhn's)**: O(V × E)
- **Hopcroft-Karp**: O(E × √V)
- **ลดรูปเป็น Max Flow**: เพิ่ม source/sink ความจุเป็นหนึ่ง

### ทฤษฎีบทของ König (König's Theorem)
ในกราฟ bipartite:
- Maximum Matching = Minimum Vertex Cover
- Maximum Independent Set = V - Maximum Matching

### การประยุกต์ใช้
- การมอบหมายงาน (คนงานกับงาน)
- Vertex cover
- Edge coloring`
  }
};
