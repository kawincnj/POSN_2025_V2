/*
โจทย์ 4.2 — Medium
โจทย์: มีจำนวนเต็ม N ตัวส่งเข้ามาทีละตัว หลังจากอ่านแต่ละตัวให้พิมพ์จำนวน ค่าที่ไม่ซ้ำกัน ที่เห็นมาจนถึงตอนนี้

ตัวอย่าง:

Input:  7
        3 1 4 1 5 9 2
Output: 1 2 3 3 4 5 6

Constraints: N ≤ 500,000 ค่าอาจติดลบหรือมากถึง 10^9

*/

#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    set<int> s;
    for(int i =1;i<n+1;i++){
        int x;
        cin >> x;
        s.insert(x);
        cout << size(s) << ' ';
    }

    return 0;
}