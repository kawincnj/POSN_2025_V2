/*
โจทย์ 3.2 — Two Sum 
โจทย์: กำหนดจำนวนเต็ม N ตัว และเป้าหมาย T ให้หาว่ามี index i, j ที่ต่างกัน ทำให้ a[i] + a[j] = T หรือไม่ ถ้ามีให้พิมพ์ index (นับจาก 1) ถ้าไม่มีพิมพ์ "NONE"

ตัวอย่าง:

Input:  N=5, T=9
        2 7 4 3 5
Output: 1 2    (a[1]+a[2] = 2+7 = 9)
Constraints: N ≤ 100,000 ต้องทำได้ใน O(N) เฉลี่ย

คิดก่อนโค้ด — ตอบคำถามนี้:
วิธี naive O(N²) เช็คทุกคู่ แล้ว insight ของ O(N) โดยใช้ hash table คืออะไร?

*/

#include <stdio.h>
#define MAXN 100005
#define HASHSZ 200003  // prime > 2*MAXN

int a[MAXN];

// hash table อย่างง่าย: key -> index+1 (0 หมายถึงว่าง)
int ht_key[HASHSZ];
int ht_val[HASHSZ];

int hash_fn(int key) {
    // รองรับ key ติดลบด้วย
    return ((key % HASHSZ) + HASHSZ) % HASHSZ;
}

void ht_insert(int key, int val) {
    int h = hash_fn(key);
    while (ht_key[h] != 0 && ht_key[h] != key)
        h = (h + 1) % HASHSZ;  // linear probing
    ht_key[h] = key;
    ht_val[h] = val;
}

int ht_get(int key) {
    int h = hash_fn(key);
    while (ht_key[h] != 0 && ht_key[h] != key)
        h = (h + 1) % HASHSZ;
    return (ht_key[h] == key) ? ht_val[h] : -1;
}

int main() {
    int n, t;
   
    scanf("%d %d", &n, &t);
    for (int i = 1; i <= n; i++) scanf("%d", &a[i]);

    // TODO:
    // ระวัง: ห้ามจับคู่ element กับตัวเอง

    printf("NONE\n");
    return 0;
}