#include <stdio.h>
#define MAXN 100

int stack[MAXN];
int tos = -1;  // indicator of top of stack

void push(int x) {
    tos ++;
    stack[tos] = x;
    // add x to stack, update top
}

int isEmpty() {
    return tos == -1;
}

int pop() {
    if(isEmpty()) {return -1;}
    tos--;
    return stack[tos+1];
    // remove and return top element
    // Handle empty case
}

int top() {
    return stack[tos];
    // return top element without removing
}

// ===== Test =====
int main() {
    push(3); push(7); push(1);
    printf("top = %d\n", top());   // expect 1
    printf("pop = %d\n", pop());   // expect 1
    printf("pop = %d\n", pop());   // expect 7
    push(5);
    printf("top = %d\n", top());   // expect 5
    return 0;
}