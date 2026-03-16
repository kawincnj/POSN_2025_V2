/*
โจทย์ 3.3 — String Frequency + RANK
โจทย์: รับ Q บรรทัด แต่ละบรรทัดเป็น query 1 ใน 3 แบบ

ADD s — เพิ่ม string s เข้า collection (s อาจซ้ำได้)
COUNT s — พิมพ์จำนวนครั้งที่ s ถูก ADD มาแล้วจนถึงตอนนี้
RANK — พิมพ์ string ที่มี frequency สูงสุด 3 อันดับ เรียงตาม frequency มากไปน้อย 
       ถ้า frequency เท่ากัน เรียง lexicographic (a < b < c ...) ถ้ามี string น้อยกว่า 3 ตัว ให้พิมพ์เท่าที่มี
Constraints: Q ≤ 50,000, ความยาว string ≤ 20 ตัวอักษร

ตัวอย่าง Input:
10
ADD apple
ADD banana
ADD apple
COUNT apple
COUNT grape
ADD banana
ADD apple
ADD cherry
RANK
COUNT banana

ตัวอย่าง Output:
2
0
apple 3
banana 2
cherry 1
2

*/

#include <stdio.h>
#include <string.h>
#define HASHSZ 100003
#define MAXLEN 25

typedef struct {
    char key[MAXLEN];
    int  val;
    int  used;
} Entry;

Entry ht[HASHSZ];

unsigned int str_hash(const char *s) {
    unsigned int h = 5381;
    while (*s) h = h * 33 + (unsigned char)(*s++);
    return h % HASHSZ;
}

void add(const char *s) {
    // TODO: หา slot (linear probe) แล้วเพิ่ม count
}

int count(const char *s) {
    // TODO: คืน frequency ของ s
    return 0;
}

void rank_top3() {
    // TODO: scan ht ทั้งหมด หา top 3 ตาม frequency
    // tie-break ด้วย lexicographic order
    // พิมพ์ออกมาไม่เกิน 3 รายการ
}

int main() {
    int q;
   
    scanf("%d", &q);
    while (q--) {
        char op[10], s[MAXLEN];
        scanf("%s", op);
        if (!strcmp(op, "ADD")) {
            scanf("%s", s);
            add(s);
        } else if (!strcmp(op, "COUNT")) {
            scanf("%s", s);
            printf("%d\n", count(s));
        } else if (!strcmp(op, "RANK")) {
            rank_top3();
        }
    }
    return 0;
}