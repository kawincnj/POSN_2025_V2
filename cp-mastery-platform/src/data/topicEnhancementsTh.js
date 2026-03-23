// Thai translations for topic enhancements - whyLearn, whenToUse, commonMistakes, complexityAnalysis fields
export const topicEnhancementsTh = {
  'intro-getting-started': {
    whyLearn: `Competitive Programming ช่วยฝึกฝนการคิดเชิงอัลกอริทึมและความเร็วในการแก้ปัญหา ซึ่งเป็นทักษะที่นำไปใช้ได้โดยตรงในการสัมภาษณ์งานด้านเทคนิคและงานวิศวกรรมในชีวิตจริง
- บริษัทเทคโนโลยีชั้นนำ (Google, Meta ฯลฯ) ใช้คำถามแนว CP ในการสัมภาษณ์
- CP ฝึกให้คุณคิดในแง่ของ trade-off ระหว่างเวลาและพื้นที่ก่อนเขียนโค้ด
- การเข้าใจประเภทของปัญหาช่วยให้คุณจำแนกได้ทันทีว่าควรใช้อัลกอริทึมใด ประหยัดเวลาอันมีค่าในการแข่งขัน
- ตาราง Complexity เพียงอย่างเดียวจะช่วยให้คุณหลีกเลี่ยง TLE (Time Limit Exceeded) ได้ในการแข่งขัน 90%`,
    whenToUse: `### ก่อนการแข่งขันทุกครั้ง
- ทบทวนตาราง Complexity เพื่อปรับแนวทางการแก้ปัญหา
- ตรวจสอบให้แน่ใจว่า template พร้อมใช้งานและผ่านการทดสอบแล้ว

### เมื่อติดปัญหา
- อ่าน constraints อีกครั้ง — มักจะบอกใบ้ถึง complexity ที่คาดหวัง
- จำแนกประเภทปัญหาเพื่อจำกัดขอบเขตว่าควรลองเทคนิคใด`,
    commonMistakes: `- ไม่อ่าน constraints อย่างละเอียด — แก้ปัญหาด้วย O(N^2) เมื่อ N=10^6 ต้องใช้ O(N log N)
- กระโดดไปเขียนโค้ดก่อนทำความเข้าใจโจทย์ทั้งหมด
- ลืม edge cases: N=0, N=1, ค่าสูงสุด
- ใช้ \`int\` เมื่อคำตอบต้องการ \`long long\` (ค่า > 2×10^9)
- ไม่ทดสอบกับ sample inputs ก่อนส่งคำตอบ`,
  },

  'intro-io-tricks': {
    whyLearn: `Fast I/O สามารถเป็นตัวตัดสินระหว่าง AC กับ TLE ผู้แข่งหลายคนเสียคะแนนไม่ใช่เพราะอัลกอริทึมผิด แต่เพราะ I/O ช้าเกินไป
- \`cin/cout\` ที่ไม่ได้ sync อาจช้ากว่า \`scanf/printf\` ถึง 10 เท่า
- Debug macros ช่วยประหยัดเวลาในการ debug หลายชั่วโมง — ผู้แข่งมืออาชีพทุกคนใช้สิ่งนี้
- การเข้าใจ overflow ช่วยป้องกันข้อผิดพลาด "wrong answer" ที่พบบ่อยที่สุดในการแข่งขัน`,
    whenToUse: `### ใช้ Fast I/O เมื่อ
- ปัญหามี input จำนวนมาก (N > 10^5)
- คุณใช้ C++ กับ cin/cout (เพิ่ม sync_with_stdio(false) เสมอ)

### ใช้ Debug Macros เมื่อ
- คำตอบของคุณได้ WA กับ test cases ที่ซ่อนอยู่
- คุณต้องการ trace ค่าของตัวแปรโดยไม่ต้องเขียนคำสั่ง cerr เอง`,
    commonMistakes: `- ใช้ scanf/printf ปนกับ cin/cout หลังจากปิด sync แล้ว
- ลืม cin.tie(NULL) ซึ่งอาจทำให้เกิดปัญหา output buffering
- ใช้ endl แทน '\\n' (endl จะ flush buffer ซึ่งช้ากว่ามาก)
- Overflow ในการคำนวณระหว่างทาง: (a*b) สามารถ overflow ได้แม้ว่าผลลัพธ์จะอยู่ใน long long`,
  },

  'ds-linear': {
    whyLearn: `โครงสร้างข้อมูลเชิงเส้นเป็นรากฐานของ Competitive Programming ทั้งหมด คุณจะใช้ vector และ stack ในแทบทุกปัญหา
- **Bitmask** เป็นหนึ่งในเทคนิค CP ที่ทรงพลังที่สุด — ช่วยให้คุณแทน subset ด้วยจำนวนเต็ม ทำให้สามารถ enumerate ได้ใน O(2^N)
- การเข้าใจว่าเมื่อไหร่ควรใช้ stack vs queue vs deque มีความสำคัญมากสำหรับปัญหา BFS/DFS และ sliding window
- โครงสร้างเหล่านี้ปรากฏใน 80%+ ของปัญหา CP ทั้งหมดในฐานะส่วนประกอบพื้นฐาน`,
    whenToUse: `### ใช้ Vector เมื่อ
- คุณต้องการ dynamic array ที่เข้าถึงข้อมูลแบบสุ่มได้
- คุณเก็บ adjacency lists สำหรับกราฟ

### ใช้ Stack เมื่อ
- ประมวลผลวงเล็บ, ประเมินนิพจน์, DFS
- Monotonic stack สำหรับปัญหา "next greater element"

### ใช้ Queue เมื่อ
- BFS traversal
- ประมวลผลแบบ level-order

### ใช้ Deque เมื่อ
- Sliding window minimum/maximum
- คุณต้องการ push/pop จากทั้งสองด้าน

### ใช้ Bitmask เมื่อ
- N ≤ 20 และคุณต้องการ enumerate ทุก subset
- DP over subsets (bitmask DP)`,
    commonMistakes: `- ใช้ 1 << j เมื่อ j >= 32 ทำให้เกิด undefined behavior — ใช้ 1LL << j สำหรับ bitmask แบบ long long
- ลืมว่า vector::push_back สามารถทำให้ iterator เป็นโมฆะได้
- ใช้ stack/queue เมื่อ deque เหมาะสมกว่า
- ไม่เคลียร์โครงสร้างข้อมูลระหว่าง test cases ในปัญหาที่มีหลาย test cases`,
    complexityAnalysis: `### Time Complexity
- **Array/Vector access**: O(1)
- **Vector push_back**: Amortized O(1)
- **Stack/Queue push/pop**: O(1)
- **Deque push/pop (ทั้งสองด้าน)**: O(1)

### Space Complexity
- **Bitmask**: O(1) สำหรับสมาชิกสูงสุด 32/64 ตัว (int/long long)
- **Vector ที่มี N สมาชิก**: O(N)`,
  },

  'ds-sorting': {
    whyLearn: `Sorting เป็นขั้นตอนการประมวลผลเบื้องต้นที่มีประโยชน์มากที่สุดใน Competitive Programming เมื่อข้อมูลถูก sort แล้ว หลายปัญหาสามารถแก้ได้ง่าย
- Binary search ต้องการข้อมูลที่ sort แล้ว — และ binary search แก้ปัญหาได้หลายประเภทมาก
- อัลกอริทึมแบบ Greedy มักจะเริ่มด้วยการ sort เสมอ
- เทคนิค Two-pointer ใช้งานได้กับ array ที่ sort แล้ว
- การเข้าใจ custom comparators ช่วยให้คุณ sort วัตถุที่ซับซ้อนสำหรับ interval scheduling, sweep line ฯลฯ`,
    whenToUse: `### Sort ก่อน เมื่อ
- คุณต้องหาข้อมูลซ้ำ, คู่ หรือช่วง
- โจทย์ถามหาค่าที่เล็กที่สุด/ใหญ่ที่สุดลำดับที่ k
- คุณกำลังทำอัลกอริทึมแบบ Greedy (sort ตาม deadline, end time ฯลฯ)
- คุณต้องการใช้ binary search หรือ two pointers

### ใช้ Counting Sort เมื่อ
- ค่าอยู่ในช่วงเล็ก [0, K) และคุณต้องการเวลา O(N)
- คุณต้องการ stable sort ที่มี linear time`,
    commonMistakes: `- เขียน sort เองแทนที่จะใช้ std::sort (ซึ่งถูก optimize มาอย่างดี)
- Comparator ไม่ถูกต้อง: ต้องเป็น strict weak ordering (ถ้า a < b เป็นจริง แล้ว b < a ต้องเป็นเท็จ)
- ลืมว่า std::sort ไม่ใช่ stable — ใช้ stable_sort ถ้าลำดับของสมาชิกที่เท่ากันมีความสำคัญ
- Sort เมื่อคุณต้องการแค่สมาชิกลำดับที่ k — ใช้ nth_element สำหรับค่าเฉลี่ย O(N)`,
    complexityAnalysis: `### Time Complexity
- **std::sort**: O(N log N) รับประกัน (IntroSort)
- **std::stable_sort**: O(N log N) แต่ใช้หน่วยความจำเพิ่มเติม
- **std::nth_element**: O(N) โดยเฉลี่ยสำหรับการหาสมาชิกลำดับที่ k
- **Counting sort**: O(N + K) โดย K คือช่วงของค่า

### Space Complexity
- **std::sort**: O(log N) สำหรับ recursion stack
- **Counting sort**: O(K) สำหรับ count array`,
  },

  'ds-stl': {
    whyLearn: `C++ STL ให้คุณใช้งาน balanced BST, hash table และ heap ที่มีคุณภาพระดับ production ได้ในโค้ดเพียงบรรทัดเดียว
- **map/set** ให้ที่เก็บข้อมูลที่ sort แล้วและไม่ซ้ำกันด้วยการดำเนินการ O(log N) — จำเป็นสำหรับ coordinate compression และ ordered queries
- **priority_queue** เป็นแกนหลักของ Dijkstra's algorithm และปัญหา greedy หลายข้อ
- **unordered_map/set** ให้ค่าเฉลี่ย O(1) — สำคัญมากเมื่อ log factor ทำให้เกิด TLE
- การรู้ว่าควรใช้ container ใดสามารถลดโค้ดจาก 50 บรรทัดเหลือ 5 บรรทัด`,
    whenToUse: `### ใช้ map/set เมื่อ
- คุณต้องการ key ที่ sort แล้วหรือความสามารถในการหา lower_bound/upper_bound
- Coordinate compression หรือ discrete events

### ใช้ unordered_map/set เมื่อ
- คุณต้องการแค่ insert/find/erase และ O(1) มีความสำคัญ
- การนับแบบ hash-based หรือ memoization

### ใช้ priority_queue เมื่อ
- คุณต้องเข้าถึงสมาชิกที่มีค่า min/max ซ้ำ ๆ
- Dijkstra's algorithm, Huffman coding, event simulation
- รวม K sorted lists`,
    commonMistakes: `- ใช้ map เมื่อ unordered_map เร็วกว่า 5 เท่า (และในทางกลับกันเมื่อคุณต้องการลำดับ)
- ลืมว่า priority_queue เป็น MAX-heap โดยค่าเริ่มต้น — ใช้ greater<int> สำหรับ min-heap
- แก้ไข key ของ map หลังจาก insert แล้ว (undefined behavior)
- unordered_map อาจช้าลงเป็น O(N) เมื่อเกิด hash collision แบบตั้งใจ — ใช้ custom hash ในการแข่งขัน`,
  },

  'ds-union-find': {
    whyLearn: `Union-Find เป็นหนึ่งในโครงสร้างข้อมูลที่สง่างามและทรงพลังที่สุดใน CP มันตอบคำถาม "สองสมาชิกนี้เชื่อมต่อกันหรือไม่?" ได้ในเวลาเกือบคงที่
- จำเป็นสำหรับ Kruskal's MST algorithm
- แก้ปัญหา dynamic connectivity ที่ปกติต้องใช้อัลกอริทึมกราฟที่ซับซ้อน
- ด้วย path compression + union by rank มันเป็น O(1) ในทางปฏิบัติต่อการดำเนินการ
- ปรากฏบ่อยในปัญหา ICPC และ IOI ที่เกี่ยวกับการจัดกลุ่มหรือการรวมกลุ่ม`,
    whenToUse: `### ใช้ Union-Find เมื่อ
- คุณต้องการรวมกลุ่มและตรวจสอบว่าสองสมาชิกอยู่ในกลุ่มเดียวกันหรือไม่
- สร้าง Minimum Spanning Tree (Kruskal's)
- Online connectivity queries (เพิ่มเส้นเชื่อม, ตรวจสอบการเชื่อมต่อ)
- ตรวจจับ cycle ในกราฟ undirected

### อย่าใช้เมื่อ
- คุณต้องแยกกลุ่ม (Union-Find ไม่รองรับการแยกอย่างมีประสิทธิภาพ)
- คุณต้องหาเส้นทางสั้นสุด (ใช้ BFS/Dijkstra แทน)`,
    commonMistakes: `- ลืม path compression — หากไม่มี การดำเนินการอาจเป็น O(N)
- ไม่ใช้ union by rank/size — สิ่งนี้ป้องกันลูกโซ่เชิงเส้นที่ไม่ดี
- ทำ find โดยไม่ใช้ recursion แต่ลืม compress โหนดทั้งหมดบนเส้นทาง
- สับสนระหว่างตัวแทน (root) กับสมาชิกจริง`,
    complexityAnalysis: `### Time Complexity (ด้วย path compression + union by rank)
- **Find**: O(α(N)) amortized — α คือ inverse Ackermann function ซึ่งในทางปฏิบัติเท่ากับ O(1)
- **Union**: O(α(N)) amortized
- **N การดำเนินการทั้งหมด**: O(N × α(N)) ≈ O(N)

### หากไม่มีการ optimize
- **Find**: O(N) กรณีเลวสุด (ลูกโซ่เชิงเส้น)
- Path compression อย่างเดียว: O(log N) amortized`,
  },

  'ds-segment-tree': {
    whyLearn: `Segment Tree เปรียบเสมือนมีดพับ Swiss Army ของ range queries มันจัดการ range sum, range min/max, range update และอื่น ๆ อีกมาก — ทั้งหมดใน O(log N)
- เป็นโครงสร้างข้อมูลหลักเมื่อคุณต้องการทั้ง point/range updates และ range queries
- ด้วย lazy propagation มันจัดการ range updates ได้อย่างมีประสิทธิภาพ
- มีความยืดหยุ่นมากกว่า Fenwick Tree — รองรับ min, max, GCD และ custom merge operations
- เป็นสิ่งที่ต้องรู้สำหรับปัญหา IOI, ICPC และ Codeforces Division 1`,
    whenToUse: `### ใช้ Segment Tree เมื่อ
- คุณต้องการ range queries (sum, min, max, GCD) พร้อม point updates — O(log N) ต่อครั้ง
- คุณต้องการ range updates + range queries — เพิ่ม lazy propagation
- merge operation เป็น associative (สามารถรวมสองครึ่งได้)

### ใช้ Fenwick Tree แทน เมื่อ
- คุณต้องการแค่ range sum หรือ prefix sum queries (Fenwick ง่ายกว่าและเร็วกว่าในทางปฏิบัติ)

### อย่าใช้เมื่อ
- array เป็น static — ใช้ prefix sums หรือ sparse table สำหรับ queries แบบ O(1)`,
    commonMistakes: `- Off-by-one ในการ index โหนด (1-based vs 0-based)
- ลืม push down ค่า lazy ก่อน query โหนดลูก
- สร้าง tree ด้วย merge function ที่ผิด
- ใช้พื้นที่ 2*N แทน 4*N — tree อาจต้องการโหนดถึง 4N โหนด
- ไม่ initialize โหนดใบอย่างถูกต้อง`,
    complexityAnalysis: `### Time Complexity
- **Build**: O(N)
- **Point Update**: O(log N)
- **Range Query**: O(log N)
- **Range Update (lazy)**: O(log N)

### Space Complexity
- O(4N) สำหรับ tree array
- O(4N) เพิ่มเติมสำหรับ lazy array ถ้าใช้ lazy propagation`,
  },

  'ds-fenwick': {
    whyLearn: `Fenwick Tree (Binary Indexed Tree) ง่ายกว่า Segment Tree ในการ implement และมักเร็วกว่าในทางปฏิบัติสำหรับ prefix sum queries
- โค้ดเพียง ~10 บรรทัดสำหรับการ implement ที่ใช้งานได้เต็มรูปแบบ
- เหมาะสำหรับปัญหาที่เกี่ยวข้องกับ prefix sums พร้อม point updates
- ค่าคงที่ที่ต่ำกว่า Segment Tree สำหรับ sum queries
- สามารถขยายเป็น 2D สำหรับ matrix prefix sum queries`,
    whenToUse: `### ใช้ Fenwick Tree เมื่อ
- คุณต้องการ prefix sum queries พร้อม point updates
- นับ inversions ใน array
- Range sum queries (แยกเป็น prefix sums สองตัว)
- การนับความถี่แบบ online

### ใช้ Segment Tree แทน เมื่อ
- คุณต้องการ range min/max/GCD queries (Fenwick รองรับเฉพาะ sum-like operations)
- คุณต้องการ range updates ด้วย lazy propagation`,
    commonMistakes: `- ใช้ 0-based indexing — Fenwick Tree ต้องใช้ 1-based indexing
- ลืมบวก 1 เมื่อแปลงจาก 0-based array indices
- สับสนระหว่าง update (เพิ่ม delta) กับ set (แทนที่ค่า)
- ไม่จองพื้นที่เพียงพอ (ต้องใช้ N+1 สำหรับ 1-based indexing)`,
    complexityAnalysis: `### Time Complexity
- **Point Update**: O(log N)
- **Prefix Sum Query**: O(log N)
- **Range Sum Query**: O(log N) — query(r) - query(l-1)

### Space Complexity
- O(N) — น้อยกว่า O(4N) ของ Segment Tree มาก

### เปรียบเทียบกับ Segment Tree
- Fenwick เร็วกว่า ~2-5 เท่าในทางปฏิบัติสำหรับ sum queries
- Fenwick ใช้หน่วยความจำน้อยกว่า 4 เท่า`,
  },

  'algo-complete-search': {
    whyLearn: `Complete Search เป็นเทคนิคแรกที่คุณควรพิจารณาสำหรับทุกปัญหา ถ้า constraints อนุญาตให้ใช้ brute force มันเป็นวิธีที่ปลอดภัยที่สุด
- ปัญหาการแข่งขันหลายข้อ (โดยเฉพาะข้อ "ง่าย") แก้ได้ด้วย brute force ที่ optimize ดี
- Backtracking พร้อม pruning สามารถจัดการ input ที่ใหญ่อย่างน่าประหลาดใจ
- เป็นรากฐานสำหรับการเข้าใจว่าทำไม DP และ greedy จึงจำเป็น (มันช่วย optimize complete search)
- เมื่อหาคำตอบที่ชาญฉลาดไม่ได้ backtracking ที่มี pruning อาจผ่านภายในเวลาที่กำหนด`,
    whenToUse: `### ใช้ Complete Search เมื่อ
- N ≤ 20 (bitmask enumeration: 2^20 = ~10^6)
- N ≤ 10 (permutation enumeration: 10! = ~3.6×10^6)
- โจทย์ระบุชัดเจนว่าต้องการ "ทุก" คำตอบ
- คุณหา DP หรือ greedy approach ไม่ได้และ constraints มีขนาดเล็ก

### กลยุทธ์ Pruning
- ข้ามสาขาที่ไม่สามารถนำไปสู่คำตอบที่ดีกว่า
- ใช้ bounding (branch and bound)
- ทำลายสมมาตร — ไม่สำรวจ state ที่เทียบเท่ากัน
- Sort เพื่อให้หยุดก่อนเวลาได้`,
    commonMistakes: `- ไม่ประมาณ complexity ก่อนเขียนโค้ด — brute force ที่ N=10^6 ไม่มีทางสำเร็จ
- ลืม prune — แม้แต่การ prune เล็กน้อยก็สามารถลดเวลาทำงานลง 10-100 เท่า
- ไม่คืนสถานะเมื่อ backtrack (ลืม "undo" การเปลี่ยนแปลง)
- สร้าง permutations ทั้งหมดเมื่อต้องการแค่ subsets (หรือในทางกลับกัน)
- ใช้ recursion โดยไม่มี memoization เมื่อ subproblems ซ้อนทับกัน (นั่นคือ DP!)`,
  },

  'algo-dnc': {
    whyLearn: `Divide and Conquer เปลี่ยนปัญหาที่เป็นไปไม่ได้ให้กลายเป็นเรื่องง่ายโดยแบ่งออกเป็นชิ้นเล็ก ๆ
- Binary Search เป็นอัลกอริทึม D&C ที่สำคัญที่สุด — มันลดการค้นหาจาก O(N) เป็น O(log N)
- Merge Sort เป็นตัวอย่าง D&C คลาสสิกและใช้สำหรับนับ inversions
- D&C optimization สามารถเร่ง DP บางปัญหาจาก O(N^2) เป็น O(N log N)
- การเข้าใจ recurrence T(n) = 2T(n/2) + O(n) = O(n log n) สร้างสัญชาตญาณสำหรับ complexity`,
    whenToUse: `### ใช้ Binary Search เมื่อ
- คำตอบเป็น monotonic — ถ้า f(x) เป็นจริง แล้ว f(x+1) ก็เป็นจริง (หรือในทางกลับกัน)
- "หาค่าน้อยสุด/มากสุดที่ทำให้..." — binary search on the answer
- พื้นที่การค้นหาถูก sort แล้วหรือสามารถทำให้เป็น monotonic ได้

### ใช้ D&C เมื่อ
- ปัญหาสามารถแบ่งเป็น subproblems อิสระที่เป็นประเภทเดียวกัน
- ขั้นตอนการ merge รวมผลลัพธ์ได้อย่างมีประสิทธิภาพ
- นับ inversions, หาคู่จุดที่ใกล้ที่สุด`,
    commonMistakes: `- Binary search off-by-one: ใช้ lo < hi vs lo <= hi ขึ้นอยู่กับว่าคุณต้องการค่าแรกที่เป็นจริงหรือค่าสุดท้ายที่เป็นจริง
- Binary search วนลูปไม่สิ้นสุด: ตรวจสอบให้แน่ใจว่า lo หรือ hi เปลี่ยนทุกรอบ
- ไม่จัดการขั้นตอน merge อย่างถูกต้องใน merge sort
- ใช้ D&C เมื่อ subproblems ไม่อิสระ (นั่นคือ DP ไม่ใช่ D&C)`,
  },

  'algo-greedy': {
    whyLearn: `อัลกอริทึมแบบ Greedy มีความสง่างาม มีประสิทธิภาพ และมักเป็นคำตอบที่ตั้งใจไว้สำหรับปัญหาระดับกลางในการแข่งขัน
- เมื่อ greedy approach ใช้ได้ มันมักจะเป็นคำตอบที่ง่ายและเร็วที่สุด
- รูปแบบคลาสสิก: interval scheduling, Huffman coding, coin change (เมื่อใช้ได้)
- ความท้าทายคือการ **พิสูจน์** ว่า greedy ใช้ได้ — ไม่ใช่ทุกทางเลือกที่ดีที่สุดในเฉพาะจุดจะนำไปสู่คำตอบที่ดีที่สุดโดยรวม
- ปัญหา optimization ในโลกจริงหลายปัญหามีคำตอบแบบ greedy`,
    whenToUse: `### Greedy ใช้ได้เมื่อ
- **Optimal substructure**: คำตอบที่ดีที่สุดประกอบด้วยคำตอบที่ดีที่สุดของ subproblems
- **Greedy choice property**: ทางเลือกที่ดีที่สุดในเฉพาะจุดนำไปสู่คำตอบที่ดีที่สุดโดยรวม
- คุณสามารถพิสูจน์ด้วย exchange argument หรือ induction ว่า greedy ถูกต้อง

### รูปแบบ Greedy คลาสสิก
- Sort ตาม end time สำหรับ interval scheduling (เพิ่มจำนวน non-overlapping intervals สูงสุด)
- Sort ตาม deadline สำหรับ job scheduling
- Kruskal's MST (sort edges ตาม weight)
- Huffman coding (รวมความถี่ที่น้อยที่สุดเสมอ)`,
    commonMistakes: `- คิดว่า greedy ใช้ได้โดยไม่พิสูจน์ — หลายปัญหาดูเหมือน greedy แต่ต้องใช้ DP
- ปัญหา coin change ไม่ใช่ greedy เสมอไป (เช่น coins {1, 3, 4} และจำนวนเงิน 6)
- เกณฑ์การ sort ไม่ถูกต้อง — comparator ที่ผิดนำไปสู่คำตอบที่ผิด
- ไม่พิจารณา edge cases ที่ greedy ล้มเหลว (เช่น กรณีเสมอกันในการ sort)`,
  },

  'algo-dp-intro': {
    whyLearn: `Dynamic Programming เป็นเทคนิคที่สำคัญที่สุดใน Competitive Programming มันปรากฏในแทบทุกการแข่งขันในทุกระดับ
- DP แก้ปัญหาที่ brute force ไม่สามารถทำได้ — โดยจดจำผลลัพธ์ที่คำนวณไปแล้ว
- เป็นหัวข้ออันดับ 1 ในการสัมภาษณ์งานที่บริษัทเทคโนโลยีชั้นนำ
- การเข้าใจคุณสมบัติสำคัญสองอย่าง (optimal substructure + overlapping subproblems) จะปลดล็อกปัญหาจำนวนมาก
- ปัญหา "นับจำนวนวิธี" และ "หาค่าน้อยสุด/มากสุด" ส่วนใหญ่เป็น DP`,
    whenToUse: `### ใช้ DP เมื่อ
- ปัญหามี **optimal substructure**: คำตอบที่ดีที่สุดสามารถสร้างจาก sub-solutions ที่ดีที่สุด
- ปัญหามี **overlapping subproblems**: sub-problem เดียวกันถูกแก้ซ้ำหลายครั้ง
- คุณเห็นคำสำคัญ: "ต้นทุนน้อยสุด", "กำไรสูงสุด", "นับจำนวนวิธี", "เป็นไปได้หรือไม่"

### แนวทาง DP
1. กำหนด state: dp[i] หรือ dp[i][j] แทนอะไร?
2. หา recurrence: dp[i] สัมพันธ์กับ subproblems ที่เล็กกว่าอย่างไร?
3. กำหนด base cases: dp[0], dp[1] ฯลฯ คืออะไร?
4. กำหนดลำดับ: bottom-up (tabulation) หรือ top-down (memoization)?
5. Optimize พื้นที่ถ้าเป็นไปได้ (มักต้องการเฉพาะแถวก่อนหน้า)`,
    commonMistakes: `- ไม่กำหนดอย่างชัดเจนว่า DP state แทนอะไร
- Recurrence relation ผิด — ตรวจสอบด้วยตัวอย่างเล็ก ๆ เสมอ
- ลืม base cases หรือตั้งค่าไม่ถูกต้อง
- ลำดับการวนลูป bottom-up ที่ใช้ค่าที่ยังไม่ได้คำนวณ
- ไม่พิจารณามิติที่ต้องการ (1D vs 2D vs 3D DP)
- พยายามใช้ DP เมื่อ greedy ใช้ได้ (ทำให้ซับซ้อนเกินไป)`,
    complexityAnalysis: `### Time Complexity
- **States × Transitions ต่อ state**
- Fibonacci: O(N) states × O(1) transition = O(N)
- Coin Change: O(N×M) โดย N = จำนวนเงิน, M = จำนวนเหรียญ
- LCS: O(N×M) โดย N, M คือความยาวของสตริง
- Knapsack: O(N×W) โดย N = ของ, W = ความจุ

### การ Optimize พื้นที่
- ถ้า dp[i] ขึ้นอยู่กับ dp[i-1] เท่านั้น ใช้ array สองตัวหรือตัวแปรหมุนเวียน
- สามารถลดพื้นที่จาก O(N×M) เป็น O(M) ได้ในหลายกรณี`,
  },

  'algo-dp-advanced': {
    whyLearn: `เทคนิค DP ขั้นสูงปลดล็อกปัญหาที่ยากที่สุดใน Competitive Programming — ปัญหาที่แยกผู้แข่งระดับสูงออกจากคนอื่น
- **Bitmask DP**: แก้ปัญหา subsets (TSP, assignment) ใน O(2^N × N)
- **Interval DP**: Optimal matrix chain multiplication, palindrome partitioning
- **Tree DP**: ปัญหาบน tree ที่คำตอบขึ้นอยู่กับโครงสร้าง subtree
- รูปแบบเหล่านี้ปรากฏใน Codeforces Div 1, IOI และ ICPC finals`,
    whenToUse: `### ใช้ Bitmask DP เมื่อ
- N ≤ 20 และคุณต้องติดตามว่าสมาชิกใดถูก "ใช้" แล้ว
- Traveling Salesman Problem (TSP), ปัญหา assignment
- State = (ตำแหน่งปัจจุบัน, เซตของโหนดที่เยี่ยมชมแล้ว)

### ใช้ Interval DP เมื่อ
- คุณต้องแบ่ง/รวมช่วงอย่างเหมาะสมที่สุด
- Matrix chain multiplication, optimal BST
- State = (จุดปลายซ้าย, จุดปลายขวา)

### ใช้ Tree DP เมื่อ
- ปัญหาถูกกำหนดบนโครงสร้าง tree
- คำตอบขึ้นอยู่กับขนาด subtree, ความลึก หรือสี
- State = (โหนดปัจจุบัน, คุณสมบัติบางอย่าง)`,
    commonMistakes: `- Bitmask DP ที่ N > 20 ช้าเกินไป (2^20 ≈ 10^6 แต่ 2^25 ≈ 3×10^7)
- Interval DP: วนลูปในลำดับที่ผิด (ต้องวนตามความยาวของ interval ไม่ใช่ตาม endpoints)
- Tree DP: ลืมจัดการโหนดใบเป็น base cases
- ไม่รู้จักว่าปัญหามีโครงสร้าง DP เพราะ state space ไม่ชัดเจน`,
  },

  'graph-basics': {
    whyLearn: `กราฟอยู่ทุกหนทุกแห่ง — ตั้งแต่เครือข่ายสังคมไปจนถึงแผนที่ถนนและห่วงโซ่ dependency การเข้าใจการแทนกราฟเป็นรากฐานของอัลกอริทึมกราฟทั้งหมด
- การเลือกการแทนที่ถูกต้อง (adjacency list vs matrix) ส่งผลต่อประสิทธิภาพหลายเท่าตัว
- Adjacency list เป็นค่าเริ่มต้นสำหรับ CP — ใช้พื้นที่ O(V + E) เทียบกับ O(V^2) ของ matrix
- การสร้างแบบจำลองกราฟเป็นศิลปะ — ปัญหาหลายข้อกลายเป็นปัญหากราฟเมื่อคุณกำหนดโหนดและเส้นเชื่อมอย่างถูกต้อง
- การเข้าใจ implicit graphs (state-space search) ปลดล็อกคำตอบเชิงสร้างสรรค์มากมาย`,
    whenToUse: `### ใช้ Adjacency List เมื่อ
- กราฟเป็น sparse (E << V^2) — ซึ่งเป็นปัญหา CP ส่วนใหญ่
- คุณต้องวนรอบ neighbors อย่างมีประสิทธิภาพ

### ใช้ Adjacency Matrix เมื่อ
- กราฟเป็น dense (E ≈ V^2)
- คุณต้องตรวจสอบการมีอยู่ของเส้นเชื่อมใน O(1)
- Floyd-Warshall algorithm ต้องการมัน

### ใช้ Edge List เมื่อ
- คุณรัน Kruskal's MST (sort edges ตาม weight)
- คุณต้องวนรอบเส้นเชื่อมทั้งหมด`,
    commonMistakes: `- ใช้ adjacency matrix สำหรับ V > 10^4 (ต้องใช้หน่วยความจำ V^2)
- ลืมว่าเส้นเชื่อม undirected ต้องเพิ่มในทั้งสองทิศทาง
- ไม่จัดการ self-loops หรือเส้นเชื่อมหลายเส้นระหว่างโหนดเดียวกัน
- ความไม่สอดคล้องของการนับโหนดแบบ 1-based vs 0-based`,
  },

  'graph-traversal': {
    whyLearn: `BFS และ DFS เป็นอัลกอริทึมกราฟพื้นฐานที่สุดสองตัว มันถูกใช้โดยตรงหรือเป็น subroutines ในแทบทุกปัญหากราฟ
- **BFS** หาเส้นทางสั้นสุดในกราฟ unweighted — เป็นประเภทปัญหาที่พบบ่อยมาก
- **DFS** ตรวจจับ cycles, หา connected components, ทำ topological sorting และอื่น ๆ อีกมาก
- สิ่งเหล่านี้เป็น O(V + E) — คุณทำได้ไม่ดีกว่านี้สำหรับการ traverse กราฟ
- การเข้าใจโครงสร้าง BFS/DFS tree เป็นกุญแจสู่อัลกอริทึมขั้นสูง (bridges, articulation points, SCC)`,
    whenToUse: `### ใช้ BFS เมื่อ
- หาเส้นทางสั้นสุดในกราฟ unweighted
- Traverse แบบ level-order
- หาโหนดที่ใกล้ที่สุดที่มีคุณสมบัติบางอย่าง
- Multi-source shortest path (เริ่ม BFS จากทุก source พร้อมกัน)

### ใช้ DFS เมื่อ
- ตรวจจับ cycles ในกราฟ directed/undirected
- หา connected components
- Topological sorting
- หา bridges และ articulation points
- Flood fill บน grids`,
    commonMistakes: `- ใช้ DFS สำหรับเส้นทางสั้นสุด (DFS ไม่รับประกันเส้นทางสั้นสุด!)
- ลืม mark โหนดว่าเยี่ยมชมแล้วก่อนใส่เข้า BFS queue (ทำให้เกิดข้อมูลซ้ำ)
- Stack overflow ใน DFS สำหรับกราฟใหญ่ (V > 10^5) — ใช้ iterative DFS
- BFS บนกราฟ weighted — ใช้ Dijkstra แทน
- ไม่พิจารณากราฟที่ไม่เชื่อมต่อ (รัน BFS/DFS จากทุกโหนดที่ยังไม่ได้เยี่ยมชม)`,
  },

  'graph-topo-sort': {
    whyLearn: `Topological sort เป็นกุญแจสำคัญในการแก้ปัญหา dependency — ทุกครั้งที่คุณมีข้อจำกัด "X ต้องมาก่อน Y"
- Build systems, วิชาบังคับก่อน, การจัดตาราง — ทั้งหมดเป็น topological sort
- มันยังตรวจจับ cycles ในกราฟ directed ด้วย (ถ้า topo sort ล้มเหลว แสดงว่ามี cycle)
- DP on DAGs เป็นการผสมผสานที่ทรงพลัง — topo sort ให้ลำดับที่ถูกต้องในการเติมตาราง DP
- Kahn's algorithm (แบบ BFS) implement ง่ายกว่าและให้ลำดับที่เล็กที่สุดตาม lexicographic order`,
    whenToUse: `### ใช้ Topological Sort เมื่อ
- ปัญหาเกี่ยวข้องกับการจัดลำดับพร้อม dependencies (วิชาบังคับก่อน)
- คุณต้องประมวลผลโหนดในลำดับที่ dependencies ถูกประมวลผลก่อน
- DP บน DAG — topological order ให้ลำดับการคำนวณที่ถูกต้อง
- ตรวจสอบว่ากราฟ directed มี cycles หรือไม่`,
    commonMistakes: `- ใช้ topological sort กับกราฟ undirected (ใช้ได้เฉพาะกับ DAGs เท่านั้น!)
- ลืมตรวจสอบ cycles — ถ้า output ที่ sort แล้วมีน้อยกว่า V โหนด แสดงว่ามี cycle
- ไม่ใช้ Kahn's algorithm เมื่อต้องการลำดับที่เล็กที่สุดตาม lexicographic order (DFS-based ให้ reverse post-order)
- สับสนระหว่าง in-degree กับ out-degree ใน Kahn's algorithm`,
  },

  'graph-sssp': {
    whyLearn: `Dijkstra's algorithm เป็นมาตรฐานทองคำสำหรับเส้นทางสั้นสุดในกราฟ weighted ที่มีเส้นเชื่อม non-negative
- เป็นอัลกอริทึมกราฟที่ถูกถามบ่อยที่สุดทั้งในการแข่งขันและการสัมภาษณ์
- ด้วย priority queue มันทำงานใน O((V+E) log V) — มีประสิทธิภาพสำหรับกราฟ sparse
- การเข้าใจ Dijkstra อย่างลึกซึ้งช่วยให้คุณเข้าใจว่าทำไมเส้นเชื่อมค่าลบถึงทำให้มันเสีย (และเมื่อไหร่ควรใช้ Bellman-Ford)
- ปัญหาในโลกจริงหลายอย่าง (การนำทาง, network routing) ใช้ Dijkstra`,
    whenToUse: `### ใช้ Dijkstra เมื่อ
- หาเส้นทางสั้นสุดจากต้นทางเดียวในกราฟที่มี edge weight เป็น **non-negative**
- กราฟเป็น sparse (E << V^2) — ใช้การ implement แบบ priority queue

### ใช้ BFS แทน เมื่อ
- edge weight ทั้งหมดเป็น 1 (กราฟ unweighted) — BFS ง่ายกว่าและมีประสิทธิภาพเท่ากัน

### ใช้ Bellman-Ford แทน เมื่อ
- กราฟมี edge weight เป็นลบ
- คุณต้องตรวจจับ negative cycles`,
    commonMistakes: `- ใช้ Dijkstra กับ edge weight เป็นลบ (ให้คำตอบผิด!)
- ไม่ใช้ visited/processed array — ประมวลผลโหนดเดียวกันหลายครั้ง
- ใช้ Dijkstra แบบ matrix-based O(V^2) เมื่อ V มีค่ามาก (ใช้ priority queue สำหรับ O((V+E) log V))
- ลืม initialize ระยะทางเป็น infinity
- ใช้ type ผิดสำหรับระยะทาง (int vs long long สำหรับ weight ที่มาก)`,
    complexityAnalysis: `### Time Complexity
- **ด้วย priority queue (binary heap)**: O((V + E) log V)
- **ด้วย Fibonacci heap**: O(V log V + E) — ในทางทฤษฎี ไม่ค่อยใช้ใน CP
- **ด้วย adjacency matrix (dense)**: O(V^2)

### Space Complexity
- O(V + E) สำหรับ adjacency list + distance array + priority queue`,
  },

  'graph-bellman-ford': {
    whyLearn: `Bellman-Ford จัดการสิ่งที่ Dijkstra ทำไม่ได้ — กราฟที่มี edge weight เป็นลบ
- เป็นอัลกอริทึม SSSP มาตรฐานตัวเดียวที่ตรวจจับ negative cycles
- SPFA (Shortest Path Faster Algorithm) เป็นการ optimize ในทางปฏิบัติที่มักเร็วกว่า
- การเข้าใจว่าทำไม V-1 relaxations ถึงเพียงพอ สร้างสัญชาตญาณทฤษฎีกราฟที่ลึกซึ้ง
- จำเป็นสำหรับปัญหาที่เกี่ยวข้องกับกำไร/ขาดทุนบนเส้นเชื่อมหรือ currency exchange arbitrage`,
    whenToUse: `### ใช้ Bellman-Ford เมื่อ
- กราฟมี edge weight เป็นลบ
- คุณต้องตรวจจับ negative cycles (รัน relaxation รอบที่ V — ถ้ามีค่าที่ดีขึ้น แสดงว่ามี negative cycle)
- คุณต้องการเส้นทางสั้นสุดที่มีไม่เกิน K เส้นเชื่อม

### ใช้ SPFA (Bellman-Ford แบบ queue-based) เมื่อ
- คุณต้องการ implementation ที่เร็วกว่าในทางปฏิบัติ (กรณีเลวสุดยังคง O(VE))`,
    commonMistakes: `- รันน้อยกว่า V-1 รอบ (ระยะทางอาจยังไม่สุดท้าย)
- ลืมตรวจสอบ negative cycles หลัง V-1 รอบ
- ใช้ Bellman-Ford เมื่อ Dijkstra ใช้ได้ (ช้าโดยไม่จำเป็น)
- ไม่จัดการกรณีที่ negative cycle ทำให้ระยะทางบางค่าเป็น -infinity`,
  },

  'graph-floyd': {
    whyLearn: `Floyd-Warshall คำนวณเส้นทางสั้นสุดทั้งหมดระหว่างทุกคู่ของ vertices ด้วยโค้ดเพียง 4 บรรทัด
- มีแค่ 3 nested loops — เป็นหนึ่งในอัลกอริทึมกราฟที่ง่ายแต่ทรงพลังที่สุด
- เหมาะสำหรับเมื่อ V ≤ 400 และคุณต้องการระยะทางระหว่างทุกคู่
- ยังคำนวณ transitive closure (ความสามารถในการเข้าถึงระหว่างทุกคู่) ได้ด้วย
- สามารถตรวจจับ negative cycles ได้ (ค่าบนเส้นทแยงมุมกลายเป็นลบ)`,
    whenToUse: `### ใช้ Floyd-Warshall เมื่อ
- V ≤ 400 (เนื่องจาก O(V^3) ≈ 64 ล้านสำหรับ V=400)
- คุณต้องการเส้นทางสั้นสุดระหว่างทุกคู่ของ vertices
- กราฟเป็น dense (มีเส้นเชื่อมมาก)
- คุณต้องการ transitive closure

### ใช้ Dijkstra จากทุก Source แทน เมื่อ
- V > 400 แต่ E เป็น sparse — รัน Dijkstra V ครั้ง: O(V(V+E) log V)`,
    commonMistakes: `- ลูป K (intermediate vertex) ต้องเป็นลูปนอกสุด — นี่คือบัคที่พบบ่อยที่สุด
- Initialize dist[i][i] เป็นค่าอื่นที่ไม่ใช่ 0
- Initialize dist[i][j] เป็น INT_MAX (ทำให้เกิด overflow เมื่อบวก) — ใช้ 1e18 หรือค่า sentinel ที่ใหญ่
- ลืมว่ากราฟต้องใช้การแทนแบบ adjacency matrix`,
  },

  'graph-mst': {
    whyLearn: `Minimum Spanning Tree เชื่อมต่อทุก vertex ด้วย edge weight รวมน้อยที่สุด — เป็นปัญหา optimization พื้นฐาน
- Kruskal's + Union-Find เป็นหนึ่งในการผสมผสานอัลกอริทึมที่สง่างามที่สุดในวิทยาการคอมพิวเตอร์
- MST มีคุณสมบัติพิเศษ: คำตอบเหมือนกันไม่ว่าจะใช้อัลกอริทึมใด
- การประยุกต์ใช้: การออกแบบเครือข่าย, clustering, อัลกอริทึมประมาณค่าสำหรับ TSP
- คุณสมบัติ MST cut property และ cycle property เป็นผลทฤษฎีที่สวยงาม`,
    whenToUse: `### ใช้ Kruskal's เมื่อ
- กราฟเป็น sparse (sort edges, ใช้ Union-Find)
- คุณมี edge list อยู่แล้ว

### ใช้ Prim's เมื่อ
- กราฟเป็น dense (ใช้ adjacency matrix + priority queue)
- คุณต้องการขยาย MST จาก vertex เริ่มต้น`,
    commonMistakes: `- ลืม sort edges ตาม weight ใน Kruskal's
- ไม่ตรวจสอบการเชื่อมต่อ — MST มีอยู่ก็ต่อเมื่อกราฟเชื่อมต่อกัน
- สับสน MST กับ shortest path tree (มันต่างกัน!)
- ใน Prim's ลืม mark vertices ว่า "อยู่ใน MST" แล้วเพื่อหลีกเลี่ยง cycles`,
  },

  'graph-scc': {
    whyLearn: `Strongly Connected Components เผยให้เห็น "โครงสร้างหลัก" ของกราฟ directed — กลุ่มของ vertices ที่สามารถเข้าถึงกันได้ทั้งหมด
- SCC condensation เปลี่ยนกราฟ directed ใด ๆ ให้เป็น DAG ทำให้สามารถใช้ DP และ topo-sort ได้
- Tarjan's algorithm มีความสง่างาม — ใช้ DFS และ stack ในการ traverse เพียงรอบเดียว
- การประยุกต์ใช้จริง: วิเคราะห์ dependencies, หา circular references, 2-SAT
- การเข้าใจ SCC อย่างลึกซึ้งแสดงให้เห็นว่าโครงสร้าง DFS tree เข้ารหัสข้อมูลที่สมบูรณ์อย่างไร`,
    whenToUse: `### ใช้ SCC เมื่อ
- คุณต้องหากลุ่มของ vertices ที่เข้าถึงกันได้
- คุณต้องการย่อกราฟ directed ให้เป็น DAG
- แก้ปัญหา 2-SAT (สร้างแบบจำลองเป็น implication graph, หา SCC)
- ตรวจสอบว่าทุก vertex สามารถเข้าถึงกันได้หรือไม่ (SCC เดียว = ใช่)`,
    commonMistakes: `- สับสน SCC (directed) กับ connected components (undirected)
- ใน Tarjan's: อัพเดต low-link values ไม่ถูกต้อง
- ใน Kosaraju's: ลืม transpose กราฟสำหรับ DFS รอบที่สอง
- ไม่จัดการ condensed DAG อย่างถูกต้องหลังจากหา SCCs แล้ว`,
  },

  'graph-maxflow': {
    whyLearn: `Max Flow / Min Cut เป็นหนึ่งในเครื่องมือสร้างแบบจำลองที่ทรงพลังที่สุดใน Competitive Programming
- ทฤษฎีบท Max-Flow Min-Cut เป็นผลลัพธ์ที่ลึกซึ้ง — maximum flow เท่ากับ minimum cut
- ปัญหาที่ดูไม่เกี่ยวข้องหลายข้อสามารถ reduce เป็น max flow ได้: bipartite matching, edge-disjoint paths, project selection
- Edmonds-Karp รับประกัน O(VE^2) — polynomial และใช้งานได้จริง
- การเข้าใจ flow networks เปิดประตูสู่ linear programming duality`,
    whenToUse: `### ใช้ Max Flow เมื่อ
- คุณต้องการ maximum matching ในกราฟ bipartite
- "จำนวนสูงสุดของ edge-disjoint paths" ระหว่างสองโหนด
- ปัญหา minimum cut (โดยทฤษฎีบท Max-Flow Min-Cut)
- ปัญหา project selection ที่มีกำไรและค่าปรับ`,
    commonMistakes: `- ลืมเพิ่ม reverse edges ที่มี capacity 0 (จำเป็นสำหรับ augmenting paths)
- ใช้ DFS สำหรับ augmenting paths (Ford-Fulkerson อาจเป็น exponential) — ใช้ BFS (Edmonds-Karp)
- ไม่จัดการเส้นเชื่อมหลายเส้นระหว่างโหนดเดียวกันอย่างถูกต้อง
- สับสนระหว่าง flow (ปัจจุบัน) กับ capacity (สูงสุด)`,
  },

  'graph-bipartite': {
    whyLearn: `กราฟ Bipartite สร้างแบบจำลองปัญหา "สองกลุ่ม" — จับคู่พนักงานกับงาน, นักเรียนกับวิชา ฯลฯ
- การตรวจสอบ 2-coloring (กราฟเป็น bipartite หรือไม่?) เป็น BFS/DFS ง่าย ๆ
- Maximum bipartite matching สามารถแก้ได้ด้วย max flow หรือ Hopcroft-Karp
- ทฤษฎีบท König: ในกราฟ bipartite, max matching = min vertex cover
- ปัญหาเหล่านี้ปรากฏบ่อยใน ICPC และสถานการณ์ job assignment`,
    whenToUse: `### ใช้ Bipartite Check เมื่อ
- คุณต้องตรวจสอบว่ากราฟสามารถระบายสี 2 สีได้หรือไม่ (ไม่มีโหนดที่อยู่ติดกันสีเดียวกัน)
- ตรวจสอบว่ากราฟมี cycle ความยาวคี่หรือไม่ (bipartite ก็ต่อเมื่อไม่มี odd cycles)

### ใช้ Bipartite Matching เมื่อ
- กำหนดรายการให้กับช่องที่แต่ละรายการเหมาะกับบางช่อง
- Maximum matching ในกราฟ bipartite
- Minimum vertex cover (โดยทฤษฎีบท König)`,
    commonMistakes: `- ลืมว่า bipartite matching สามารถแก้ด้วย max flow ได้ (ไม่ใช่แค่ augmenting paths)
- ไม่จัดการ components ที่ไม่เชื่อมต่อเมื่อตรวจสอบ bipartiteness
- สับสน bipartite matching กับ general matching (general ต้องใช้ Blossom algorithm)`,
  },

  'math-primes': {
    whyLearn: `จำนวนเฉพาะเป็นหน่วยสร้างพื้นฐานของทฤษฎีจำนวน Sieve of Eratosthenes เป็นหนึ่งในอัลกอริทึมที่มีประสิทธิภาพที่สุดเท่าที่เคยมีมา
- Sieve หาจำนวนเฉพาะทั้งหมดถึง N ใน O(N log log N) — เกือบ linear
- Prime factorization เป็นกุญแจสู่ GCD, LCM, การนับ divisor และ multiplicative functions
- การทดสอบ primality สำหรับจำนวนขนาดใหญ่ใช้ Miller-Rabin
- ปัญหาการแข่งขันหลายข้อเกี่ยวข้องกับทฤษฎีจำนวนที่จำนวนเฉพาะเป็นสิ่งจำเป็น`,
    whenToUse: `### ใช้ Sieve เมื่อ
- คุณต้องการจำนวนเฉพาะทั้งหมดถึง N (N ≤ 10^7 ได้ง่าย)
- คุณต้อง factorize หลายจำนวน (ใช้ smallest prime factor sieve)
- นับ divisors, Euler's totient, Mobius function

### ใช้ Miller-Rabin เมื่อ
- ทดสอบว่าจำนวนขนาดใหญ่ (ถึง 10^18) เป็นจำนวนเฉพาะหรือไม่
- เวอร์ชัน deterministic ที่ใช้ bases เฉพาะใช้ได้กับทุกจำนวน < 3.3×10^24`,
    commonMistakes: `- Sieve สำหรับ N > 10^8 ใช้หน่วยความจำมากเกินไป — ใช้ segmented sieve
- ลืมว่า 1 ไม่ใช่จำนวนเฉพาะ
- Trial division: ตรวจสอบถึง N แทนที่จะถึง sqrt(N) (เสียเวลา)
- Integer overflow เมื่อคูณใน modular arithmetic`,
  },

  'math-gcd-mod': {
    whyLearn: `GCD และ modular arithmetic เป็นพื้นฐานสำคัญของคณิตศาสตร์ใน Competitive Programming
- Euclidean algorithm เป็น O(log N) — เร็วมาก
- Modular inverse จำเป็นทุกครั้งที่คุณหารภายใต้ modulus (พบบ่อยใน combinatorics)
- Extended Euclidean แก้สมการ ax + by = gcd(a,b) — มีประโยชน์สำหรับสมการ Diophantine
- ปัญหา "แสดงคำตอบ mod 10^9+7" เกือบทั้งหมดต้องใช้ modular arithmetic`,
    whenToUse: `### ใช้ GCD เมื่อ
- ทำเศษส่วนให้ง่ายขึ้น
- หา LCM: lcm(a,b) = a / gcd(a,b) * b
- ปัญหาที่เกี่ยวข้องกับการหารลงตัว

### ใช้ Modular Inverse เมื่อ
- คำนวณ nCr mod p (ต้องหาร factorials)
- การหารใด ๆ ภายใต้ prime modulus
- ทฤษฎีบทเล็กของ Fermat: a^(-1) ≡ a^(p-2) mod p`,
    commonMistakes: `- คำนวณ LCM เป็น (a*b)/gcd(a,b) — จะ overflow! ใช้ a/gcd(a,b)*b
- ลืมว่า modular inverse มีอยู่ก็ต่อเมื่อ gcd(a, mod) = 1
- ไม่ทำ mod ในทุกขั้นตอน (intermediate overflow)
- ลบภายใต้ mod โดยไม่บวก mod กลับ: (a - b) % mod อาจเป็นลบ`,
  },

  'math-combinatorics': {
    whyLearn: `Combinatorics คือศิลปะของการนับ "มีกี่วิธี?" เป็นหนึ่งในประเภทปัญหาที่พบบ่อยที่สุดใน CP
- การคำนวณ factorials และ inverse factorials ล่วงหน้าช่วยให้คุณตอบ nCr queries ใน O(1)
- Catalan numbers, Stirling numbers และ derangements เป็นรูปแบบที่เกิดขึ้นซ้ำ
- หลักการ Inclusion-exclusion แก้ปัญหา "นับพร้อมเงื่อนไข"
- การเข้าใจ generating functions ให้ข้อมูลเชิงลึกเกี่ยวกับอัตลักษณ์เชิง combinatorial`,
    whenToUse: `### ใช้การนับโดยตรง เมื่อ
- สูตรเป็นผลคูณง่าย ๆ ของ binomial coefficients
- Stars and bars: แจก N ของเหมือนกันลงใน K ถังที่ต่างกัน

### ใช้ Inclusion-Exclusion เมื่อ
- "นับ X แต่ไม่ใช่ Y" หรือ "นับที่ตรงเงื่อนไขอย่างน้อยหนึ่งข้อ"
- Derangements, surjective functions

### ใช้ DP เมื่อ
- โครงสร้างเชิง combinatorial มี overlapping subproblems
- Catalan numbers, partition numbers`,
    commonMistakes: `- ไม่คำนวณ factorials ล่วงหน้า (การคำนวณ nCr ตั้งแต่ต้นทุกครั้งเป็น O(N))
- Overflow: ทำงานกับ mod 10^9+7 เสมอและใช้ modular inverse สำหรับการหาร
- Off-by-one ใน binomial coefficients (เป็น n choose k หรือ n+1 choose k?)
- ลืมการสลับเครื่องหมายลบใน inclusion-exclusion`,
  },

  'math-game-theory': {
    whyLearn: `ปัญหา Game theory เป็นหนึ่งในปัญหาที่สง่างามที่สุดใน Competitive Programming
- ทฤษฎีบท Sprague-Grundy ลดเกม impartial ใด ๆ ให้เป็น Nim
- คำตอบของ Nim เรียบง่ายอย่างสวยงาม: XOR ขนาดกองทั้งหมด
- การเข้าใจตำแหน่งชนะ/แพ้เป็นกุญแจสำคัญ — ทำงานย้อนกลับจาก base cases
- ปัญหาเหล่านี้ให้ความรู้สึกเหมือนปริศนาและทดสอบการให้เหตุผลเชิงคณิตศาสตร์ที่ลึกซึ้ง`,
    whenToUse: `### ใช้ทฤษฎีบท Nim เมื่อ
- เกมเกี่ยวข้องกับกองหรือ sub-games อิสระหลายกอง
- XOR ของ Grundy values กำหนดผู้ชนะ

### ใช้ Sprague-Grundy เมื่อ
- เกมมีกฎที่ซับซ้อนแต่ยังเป็น impartial (ผู้เล่นทั้งสองมีการเคลื่อนไหวเหมือนกัน)
- คำนวณ Grundy values สำหรับกรณีเล็ก ๆ แล้วหารูปแบบ

### ใช้ Minimax + Alpha-Beta เมื่อ
- เกมไม่ใช่ impartial (การเคลื่อนไหวต่างกันสำหรับแต่ละผู้เล่น)
- N มีขนาดเล็กพอสำหรับการค้นหา game tree`,
    commonMistakes: `- คิดว่าเกมเป็น impartial ทั้งที่ไม่ใช่ (เช่น หมากรุกไม่ใช่ impartial)
- ลืมว่า XOR ของ Grundy values ทั้งหมดกำหนดผู้ชนะ (ไม่ใช่ผลรวม)
- ไม่พิจารณากรณี "ไม่มีการเคลื่อนไหว" — ผู้เล่นที่เคลื่อนไหวไม่ได้จะแพ้ (normal play convention)
- คำนวณ Grundy values แบบ iterative โดยไม่มี memoization`,
  },

  'math-probability': {
    whyLearn: `ปัญหาความน่าจะเป็นและค่าคาดหวังพบได้บ่อยมากขึ้นในการแข่งขันสมัยใหม่
- Linearity of expectation เป็นเทคนิคที่ทรงพลังที่สุด: E[X+Y] = E[X] + E[Y] แม้ว่า X, Y จะขึ้นต่อกัน!
- คุณสมบัตินี้เพียงอย่างเดียวแก้ปัญหาที่ดูเหมือนเป็นไปไม่ได้
- Expected value DP รวมสองเทคนิคที่ทรงพลังเข้าด้วยกัน
- การเข้าใจความน่าจะเป็นให้สัญชาตญาณสำหรับ randomized algorithms`,
    whenToUse: `### ใช้ Linearity of Expectation เมื่อ
- คำนวณค่าคาดหวังของผลรวมของตัวแปรสุ่ม
- ตัวแปรอาจขึ้นต่อกัน — linearity ยังคงใช้ได้!
- ตัวอย่าง: จำนวน inversions ที่คาดหวัง, ระยะทางที่คาดหวัง

### ใช้ DP สำหรับค่าคาดหวัง เมื่อ
- กระบวนการมี states และ transitions ที่มีความน่าจะเป็น
- ตัวอย่าง: จำนวนขั้นตอนที่คาดหวังใน random walk`,
    commonMistakes: `- พยายามคำนวณความน่าจะเป็นของเหตุการณ์ซับซ้อนโดยตรง (ใช้ inclusion-exclusion หรือ DP แทน)
- ลืมว่า E[X+Y] = E[X] + E[Y] เป็นจริงเสมอ (ไม่ต้องการความเป็นอิสระ)
- สับสนค่าคาดหวังกับค่าที่น่าจะเป็นไปได้มากที่สุด
- ไม่จัดการ modular arithmetic สำหรับเศษส่วนความน่าจะเป็น`,
  },

  'string-basics': {
    whyLearn: `อัลกอริทึมสตริงเป็นหมวดหมู่หลักใน Competitive Programming ปรากฏในทุกการแข่งขันสำคัญ
- String hashing ช่วยให้เปรียบเทียบ substring ใน O(1) หลังจากประมวลผลล่วงหน้า O(N)
- Polynomial hashing (Rabin-Karp) เป็นเครื่องมือหลักสำหรับ string matching และการตรวจสอบ palindrome
- การเข้าใจว่าเมื่อไหร่ควรใช้ hashing vs KMP vs suffix structures มีความสำคัญมาก
- ปัญหา "สตริง" หลายข้อจริง ๆ แล้วเป็นปัญหา DP หรือกราฟที่แฝงตัวอยู่`,
    whenToUse: `### ใช้ String Hashing เมื่อ
- เปรียบเทียบ substrings ว่าเท่ากันใน O(1)
- หารูปแบบที่ซ้ำหรือ palindromes
- ต้องการเครื่องมือ string matching ที่เร็วและใช้งานทั่วไป

### ใช้ Built-in Functions เมื่อ
- การดำเนินการง่าย ๆ: find, substr, compare
- constraints ของปัญหามีขนาดเล็ก (N ≤ 10^4)`,
    commonMistakes: `- Hash collisions: ใช้ double hashing (สอง mods ที่ต่างกัน) เสมอเพื่อความปลอดภัย
- เลือก hash base ที่ไม่ดี (ใช้จำนวนเฉพาะ > 26 เช่น 31 หรือ 37)
- ไม่จัดการ modular arithmetic อย่างระมัดระวัง (เศษเหลือที่เป็นลบ)
- ใช้ string concatenation ในลูป (O(N^2) — ใช้ ostringstream หรือ reserve)`,
  },

  'string-kmp': {
    whyLearn: `KMP (Knuth-Morris-Pratt) เป็นมาตรฐานทองคำสำหรับ exact string matching — O(N+M) โดยไม่มี hash collisions
- Prefix function (failure function) คือข้อมูลเชิงลึกสำคัญ — มันบอกว่าควร "ย้อนกลับ" ไปไกลแค่ไหนเมื่อไม่ตรง
- ต่างจาก hashing, KMP ไม่มี false positives — เป็น deterministic
- Prefix function เองแก้ปัญหาได้หลายข้อ: หา periods, คำนวณ borders ฯลฯ
- การเข้าใจ KMP สร้างสัญชาตญาณสำหรับอัลกอริทึมที่ซับซ้อนกว่าที่ใช้ automata`,
    whenToUse: `### ใช้ KMP เมื่อ
- Exact pattern matching: หาทุกตำแหน่งที่ pattern P ปรากฏใน text T
- หา shortest period ของสตริง
- คำนวณ longest prefix ที่เป็น suffix ด้วย (prefix function)

### ใช้ Hashing แทน เมื่อ
- คุณต้องเปรียบเทียบ substrings ที่แตกต่างกันหลายตัว (ยืดหยุ่นกว่า)
- ปัญหาต้องการ approximate matching หรือ wildcard matching`,
    commonMistakes: `- Off-by-one ในการคำนวณ failure function
- ไม่เข้าใจว่า KMP ประมวลผลแต่ละตัวอักษรอย่างมากสองครั้ง (amortized O(1) ต่อตัวอักษร)
- ต่อ pattern + text โดยไม่มีตัวคั่น (ใช้ P + '#' + T)
- สับสน KMP กับ Z-algorithm (ทั้งคู่แก้ pattern matching แต่ prefix function ต่างจาก Z-values)`,
  },

  'string-dp': {
    whyLearn: `String DP แก้ปัญหาที่เทคนิคสตริงอื่นทำไม่ได้ — edit distance, LCS, palindrome partitioning
- Edit distance (Levenshtein distance) ใช้ใน spell checkers, DNA alignment และ diff tools
- Longest Common Subsequence (LCS) ปรากฏทุกหนทุกแห่ง — ตั้งแต่อัลกอริทึม diff ไปจนถึง bioinformatics
- ปัญหาเหล่านี้แสดงให้เห็นพลังของ 2D DP ได้อย่างสวยงาม
- การเข้าใจ recurrence ช่วยให้คุณปรับใช้กับ custom similarity metrics ได้`,
    whenToUse: `### ใช้ Edit Distance เมื่อ
- วัดว่าสตริงสองตัวคล้ายกันแค่ไหน
- Spell checking, fuzzy matching, DNA sequence alignment

### ใช้ LCS เมื่อ
- หาลำดับย่อยที่ยาวที่สุดที่เหมือนกันในทั้งสองสตริง (ไม่จำเป็นต้องต่อเนื่อง)
- คำนวณ shortest common supersequence (SCS = N + M - LCS)

### ใช้ Palindrome DP เมื่อ
- จำนวนการตัดน้อยสุดเพื่อแบ่งเป็น palindromes
- Longest palindromic subsequence`,
    commonMistakes: `- สับสน substring (ต่อเนื่อง) กับ subsequence (ไม่จำเป็นต้องต่อเนื่อง)
- Base cases ผิด: dp[0][j] และ dp[i][0] ต้อง initialize อย่างระมัดระวัง
- ไม่ optimize พื้นที่เมื่อต้องการเฉพาะแถว dp[i-1]
- ใช้วิธี O(N^3) เมื่อมีวิธี O(N^2) อยู่`,
  },

  'string-suffix': {
    whyLearn: `Suffix arrays เป็นโครงสร้างข้อมูลสตริงที่ทรงพลังที่สุด — แก้ปัญหาที่ปกติต้องใช้อัลกอริทึมที่ซับซ้อน
- Suffix array คือ array ที่ sort แล้วของ suffixes ทั้งหมด — น่าแปลกใจที่ไอเดียง่าย ๆ นี้ทรงพลังอย่างไม่น่าเชื่อ
- เมื่อรวมกับ LCP (Longest Common Prefix) array มันตอบ substring queries ใน O(log N)
- Suffix arrays สามารถนับ distinct substrings, หา longest repeated substrings และอื่น ๆ
- อัลกอริทึมการสร้างแบบ O(N log N) เป็นผลงานชิ้นเอกของการออกแบบอัลกอริทึม`,
    whenToUse: `### ใช้ Suffix Array เมื่อ
- นับ distinct substrings
- หา longest repeated substring
- String matching ด้วย binary search บน suffixes
- เปรียบเทียบ substrings อย่างมีประสิทธิภาพด้วย LCP array

### ใช้วิธีที่ง่ายกว่า เมื่อ
- Pattern matching ง่าย ๆ (ใช้ KMP หรือ hashing)
- ต้องการหาแค่ pattern เดียว (suffix array เกินความจำเป็น)`,
    commonMistakes: `- ใช้การสร้าง suffix array แบบ naive O(N^2 log N) เมื่อต้องการ O(N log N)
- ไม่สร้าง LCP array (ปัญหา suffix array ส่วนใหญ่ต้องการมัน)
- ลืมว่า suffix array เป็น 0-indexed
- ไม่เข้าใจความสัมพันธ์ระหว่าง LCP กับจำนวน distinct substrings`,
  },

  'geometry-points-lines': {
    whyLearn: `Computational geometry เป็นหมวดหมู่ที่มีเอกลักษณ์ใน CP — ต้องการความแม่นยำ การ implement อย่างระมัดระวัง และสัญชาตญาณเชิงเรขาคณิต
- Cross product เป็นเครื่องมือที่สำคัญที่สุดเพียงตัวเดียว: กำหนดทิศทาง พื้นที่ และการเลี้ยว
- การเข้าใจ signed area และ orientation ช่วยในเรื่อง convex hull, polygon area และ point-in-polygon
- ปัญหา floating-point precision เป็นสาเหตุอันดับ 1 ของบัค — เรียนรู้ที่จะใช้ integer arithmetic เมื่อเป็นไปได้
- ปัญหาเรขาคณิตมักมีคะแนนสูงในการแข่งขันเพราะมีคนทำน้อยกว่า`,
    whenToUse: `### ใช้ Cross Product เมื่อ
- กำหนดว่าการเลี้ยวเป็นซ้าย/ขวา/เส้นตรง (orientation test)
- คำนวณพื้นที่สามเหลี่ยมหรือรูปหลายเหลี่ยม
- ตรวจสอบว่าส่วนของเส้นตรงสองเส้นตัดกันหรือไม่

### ใช้ Dot Product เมื่อ
- คำนวณมุมระหว่าง vectors
- Projection ของจุดลงบนเส้นตรง
- ตรวจสอบความตั้งฉาก`,
    commonMistakes: `- ใช้ floating-point เมื่อ integer arithmetic เพียงพอ (หลีกเลี่ยงปัญหา precision!)
- ไม่จัดการจุดที่อยู่บนเส้นตรงเดียวกัน (cross product = 0)
- ลืมว่า cross product ใน 2D ให้ค่า scalar (z-component)
- หารด้วยศูนย์เมื่อเส้นตรงขนานกัน
- ใช้ atan2 สำหรับเปรียบเทียบมุม (ใช้ cross product แทน — ทนทานกว่า)`,
  },

  'geometry-circles-triangles': {
    whyLearn: `ปัญหาวงกลมและสามเหลี่ยมรวมเรขาคณิตเข้ากับพีชคณิต — เป็นความท้าทายที่มีเอกลักษณ์ใน CP
- ปัญหาในโลกจริงหลายข้อ reduce เป็น circle-circle หรือ circle-line intersection
- คุณสมบัติของสามเหลี่ยม (สูตรพื้นที่, วงกลมล้อมรอบ/วงกลมแนบใน) ปรากฏในชุดปัญหา computational geometry
- ปัญหาเหล่านี้ทดสอบความสามารถในการจัดการ floating-point precision อย่างระมัดระวัง`,
    whenToUse: `### ปัญหาวงกลม
- Circle-line intersection, circle-circle intersection
- Minimum enclosing circle (อัลกอริทึมแบบสุ่ม O(N))
- เส้นสัมผัสวงกลม

### ปัญหาสามเหลี่ยม
- พื้นที่โดยใช้ cross product หรือสูตร Heron
- การคำนวณ circumcircle และ incircle
- การทดสอบ point-in-triangle โดยใช้ barycentric coordinates`,
    commonMistakes: `- ไม่จัดการกรณีพิเศษ (จุดที่อยู่บนเส้นตรงเดียวกันสำหรับสามเหลี่ยม, วงกลมที่ทับกัน)
- การเปรียบเทียบ floating-point: ใช้ EPS = 1e-9 สำหรับการตรวจสอบความเท่ากัน
- ลืมจัดการกรณีที่วงกลมไม่ตัดกัน
- ใช้สูตรผิดสำหรับ signed area vs absolute area`,
  },

  'geometry-polygon': {
    whyLearn: `อัลกอริทึมรูปหลายเหลี่ยมเป็นจุดสูงสุดของ computational geometry — convex hull เป็นหนึ่งในอัลกอริทึมที่สำคัญที่สุดในสาขานี้
- Convex hull เป็นขั้นตอนประมวลผลเบื้องต้นสำหรับปัญหาเรขาคณิตหลายข้อ
- พื้นที่ polygon ด้วยสูตร shoelace เป็น O(N) และสง่างาม
- การทดสอบ Point-in-polygon (ray casting) เป็นอัลกอริทึมเชิงปฏิบัติที่มีการประยุกต์ใช้มากมาย
- การเข้าใจ convex vs general polygons ช่วยให้คุณเลือกแนวทางที่ถูกต้อง`,
    whenToUse: `### ใช้ Convex Hull เมื่อ
- หาขอบเขตด้านนอกของเซตจุด
- คำนวณ diameter (คู่ที่ไกลที่สุด) โดยใช้ rotating calipers
- รูปทรงล้อมรอบที่เล็กที่สุด

### ใช้สูตร Shoelace เมื่อ
- คำนวณพื้นที่ของ simple polygon ใด ๆ ใน O(N)

### ใช้ Point-in-Polygon เมื่อ
- ทดสอบว่าจุดอยู่ภายใน polygon หรือไม่ (ray casting สำหรับทั่วไป, binary search สำหรับ convex)`,
    commonMistakes: `- ไม่จัดการจุดที่อยู่บนเส้นตรงเดียวกันใน convex hull (รวมหรือไม่รวมขึ้นอยู่กับปัญหา)
- สูตร Shoelace ให้ signed area — ต้องหาค่าสัมบูรณ์
- ลืมปิด polygon (จุดยอดสุดท้ายเชื่อมกับจุดแรก)
- ใช้ O(N) point-in-convex-polygon เมื่อสามารถใช้ O(log N) ด้วย binary search ได้`,
  },

  'advanced-decomposition': {
    whyLearn: `เทคนิคการแยกปัญหาเป็นเครื่องหมายของ Competitive Programming ระดับผู้เชี่ยวชาญ
- Square root decomposition แบ่งข้อมูลเป็น √N บล็อกสำหรับ queries แบบ O(√N) — ง่ายและทรงพลัง
- Heavy-Light Decomposition ลด tree path queries ให้เป็น segment tree queries
- Centroid decomposition เปิดให้ใช้ divide-and-conquer บน trees
- เทคนิคเหล่านี้ปรากฏในปัญหายากของ Codeforces Div 1 และ ICPC regionals`,
    whenToUse: `### ใช้ √N Decomposition เมื่อ
- คุณต้องการแนวทางง่าย ๆ สำหรับ range queries ที่มี O(√N) ต่อ query
- ปัญหามีการดำเนินการผสมที่ยากจะจัดการด้วย segment trees

### ใช้ Heavy-Light Decomposition เมื่อ
- คุณต้องการ path queries บน tree (sum, max ฯลฯ)
- รวมกับ segment tree สำหรับ O(log^2 N) ต่อ query

### ใช้ Centroid Decomposition เมื่อ
- คุณต้องตอบ path-related queries บน trees
- นับเส้นทางที่มีคุณสมบัติบางอย่าง`,
    commonMistakes: `- ใช้ √N decomposition เมื่อ segment tree เหมาะสมกว่า (และง่ายกว่า)
- HLD: chain decomposition ไม่ถูกต้องหรือไม่จัดการกรณี root
- Centroid decomposition: ลืมลบ centroid ออกจาก tree หลังประมวลผล
- ไม่เลือกขนาดบล็อกที่ถูกต้องสำหรับ √N decomposition (มักเป็น √N แต่บางครั้งต่างออกไป)`,
  },

  'advanced-search': {
    whyLearn: `เทคนิคการค้นหาขั้นสูงช่วยให้คุณแก้ปัญหาที่ใหญ่เกินไปสำหรับ BFS/DFS ธรรมดา
- Meet in the Middle ลดเลขชี้กำลังลงครึ่งหนึ่ง: O(2^(N/2)) แทน O(2^N)
- A* search ใช้ heuristics เพื่อนำทางการค้นหาไปยังเป้าหมาย — เร็วกว่า BFS มากสำหรับ pathfinding
- IDA* รวมประสิทธิภาพด้านหน่วยความจำของ depth-first เข้ากับการนำทางด้วย heuristic ของ A*
- สิ่งเหล่านี้จำเป็นสำหรับปัญหาแก้ปริศนาและ state-space search`,
    whenToUse: `### ใช้ Meet in the Middle เมื่อ
- N ≤ 40 แต่ 2^N ใหญ่เกินไป — แบ่งเป็นสองครึ่งขนาด 20
- Subset sum ที่ N ≤ 40
- ปัญหาใด ๆ ที่คุณสามารถรวมคำตอบจากสองครึ่งได้

### ใช้ A* เมื่อ
- Pathfinding ที่มี heuristic ที่ดี (เช่น Manhattan distance สำหรับ grids)
- State space ใหญ่เกินไปสำหรับ BFS ธรรมดา

### ใช้ IDA* เมื่อ
- หน่วยความจำจำกัด (A* เก็บทุก states ในหน่วยความจำ)
- Branching factor สูง`,
    commonMistakes: `- Meet in the Middle: ไม่ sort/binary-search ครึ่งหลังอย่างมีประสิทธิภาพ
- A*: ใช้ heuristic ที่ inadmissible (ประเมินค่าสูงเกินไป) — ทำลายความ optimal
- IDA*: ไม่เพิ่ม threshold อย่างถูกต้องระหว่างรอบ
- ไม่รู้จักว่าปัญหาสามารถแก้ด้วย BFS ง่าย ๆ แทนการค้นหาขั้นสูง`,
  },
};
