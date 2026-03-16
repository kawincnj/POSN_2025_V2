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
#define MAXVAL 1000001

int freq[MAXVAL];

int main() {
    int n, x;
   
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &x);
        // TODO: บันทึก frequency
    }

    // TODO: พิมพ์แต่ละค่าและ frequency ตามลำดับ
    return 0;
}