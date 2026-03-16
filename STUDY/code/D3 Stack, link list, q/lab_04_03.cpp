/*
โจทย์ 4.3 — Hard
โจทย์: มีงาน N ชิ้น แต่ละชิ้นมี เวลามาถึง a[i] และ เวลาที่ใช้ประมวลผล p[i] โปรเซสเซอร์ตัวเดียวรับงานแบบ FIFO (ตามเวลามาถึง) ถ้ามาพร้อมกันให้เรียงตามลำดับ input ให้หา เวลาที่ทำงานแต่ละชิ้นเสร็จ

ตัวอย่าง:

N=4
งาน  มาถึง  ใช้เวลา
 1     0      3
 2     1      2
 3     0      1
 4     5      2

Output (เวลาที่เสร็จ):
Task 1: 3
Task 3: 4     (มาเวลา 0, ต่อคิวหลังงาน 1)
Task 2: 6     (มาเวลา 1, ต่อคิวหลังงาน 3)
Task 4: 7     (มาเวลา 5, แต่โปรเซสเซอร์ว่างเวลา 6 → เริ่มเวลา 6 เสร็จเวลา 8)
รอก่อน — ลอง verify output ด้านบนดูว่าถูกต้องไหม ถ้าผิดให้แก้ก่อนแล้วค่อยเขียนโค้ด

Constraints: N ≤ 100,000

*/

#include <stdio.h>
#include <stdlib.h>
#define MAXN 100005

struct Task {
    int id, arrival, process;
};

Task tasks[MAXN];

int cmp(const void *a, const void *b) {
    Task *ta = (Task*)a, *tb = (Task*)b;
    if (ta->arrival != tb->arrival) return ta->arrival - tb->arrival;
    return 0;  // ปรับแก้ให้ เวลามาถึงเท่ากัน → รักษาลำดับ input
}

int main() {
    int n;
   
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        tasks[i].id = i+1;
        scanf("%d %d", &tasks[i].arrival, &tasks[i].process);
    }

    qsort(tasks, n, sizeof(Task), cmp);

    // TODO: จำลองโปรเซสเซอร์ด้วย queue

    return 0;
}