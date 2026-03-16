#include <stdio.h>
#define MAXN 100

int q[MAXN];
int front = 0, rear = 0, size = 0;

int isEmpty() { return size == 0; }
int isFull()  { return size == MAXN; }

void enqueue(int x) {
    if(isFull()) {;}
    else{
        size ++;
        q[rear] = x;
        rear ++;

    }
    
}

int dequeue() {
    if(isEmpty()) {return -1;}
    int a = front++;
    size--;
    return q[a];
    
}

// ===== Test =====
int main() {
    enqueue(10); enqueue(20); enqueue(30);
    printf("dequeue = %d\n", dequeue());  // expect 10
    printf("dequeue = %d\n", dequeue());  // expect 20
    enqueue(40);
    printf("dequeue = %d\n", dequeue());  // expect 30
    printf("dequeue = %d\n", dequeue());  // expect 40
    return 0;
}