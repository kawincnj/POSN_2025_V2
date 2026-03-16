/*
โจทย์ 3.1 — Frequency Count 
โจทย์: กำหนดจำนวนเต็ม N ตัว ให้พิมพ์แต่ละค่าที่ไม่ซ้ำพร้อม frequency โดย เรียงตามค่า

ตัวอย่าง:

Input:  5 3 1 3 5 5 2
Output:
1 -> 1
2 -> 1
3 -> 2
5 -> 3
ควรใช้ map หรือ unordered_map? เพราะอะไร?

*/

#include <stdio.h>
#include <map>
using namespace std;
map<int, int> myMap;

int main() {
    int n, x;
   
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &x);
        myMap[x] ++;
    }
    for(auto &[k, v]: myMap){
        printf("%d -> %d\n", k, v);
    }

    return 0;
}