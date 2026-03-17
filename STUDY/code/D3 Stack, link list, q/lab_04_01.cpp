/*
โจทย์ 4.1 — Easy
โจทย์: กำหนด string ที่เป็นอักขระพิมพ์เล็กทั้งหมด โดยให้ตรวจว่าสามารถจัดเรียงตัวอักษรใหม่ให้กลายเป็น palindrome ได้หรือไม่ ถ้าได้พิมพ์ "YES" ถ้าไม่ได้พิมพ์ "NO"

ตัวอย่าง:

"aabb"   → YES  (เรียงใหม่เป็น abba)
"aab"    → YES  (เรียงใหม่เป็น aba)
"abc"    → NO

Constraints: |s| ≤ 100,000

*/
#include <bits/stdc++.h>
using namespace std;

int main() {
    int a[1000] = {0};
    string s;

   cin >> s;
   for(auto &i : s){
    a[i] ++;
   }
   int odd= 0;
   for(auto &i : a){
    if(i% 2 != 0) odd++;
   }
   cout << ((odd > 1) ? "NO" : "YES");

    return 0;
}