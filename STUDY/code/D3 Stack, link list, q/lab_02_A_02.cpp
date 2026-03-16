/*
โจทย์ 2A.2 — Next Greater Element
โจทย์: กำหนด array a[0..n-1] สำหรับแต่ละ element ให้หา element ถัดไปที่มีค่ามากกว่า ทางขวามือ ถ้าไม่มีให้ตอบ -1

ตัวอย่าง:

Input:  11 4 5 2 10 8
Output: -1 5 10 10 -1 -1
Constraints: N ≤ 100,000 ต้องทำได้ใน O(N)

*/

#include <stdio.h>
#include <time.h>
#define MAXN 100005



int a[MAXN], ans[MAXN];
int stack[MAXN], tos = -1;

void push(int c)  { stack[++tos] = c; }
char pop()         { return stack[tos--]; }
char top()         { return stack[tos]; }
int  isEmpty()     { return tos == -1; }

int main() {
    int n;

    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);

    clock_t t;
    t = clock();

    // TODO Understanding
    for(int i = n - 1; i >= 0; i--){
        while(!isEmpty() && top() <= a[i])
            pop();

        ans[i] = isEmpty() ? -1 : top();

        push(a[i]);
    }

    fprintf(stderr, "Taken: %.4f secs\n", (double)(clock() - t) / CLOCKS_PER_SEC);

    for (int i = 0; i < n; i++) printf("%d ", ans[i]);
    printf("\n");

    return 0;
}