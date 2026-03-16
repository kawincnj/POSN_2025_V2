/*
โจทย์ 2A.1 — Bracket Matching
โจทย์: กำหนด string ของวงเล็บ ()[]{} ให้ตรวจว่า string นั้น valid หรือไม่
Valid หมายถึง วงเล็บเปิดทุกตัวมีวงเล็บปิดที่ถูกต้องและเรียงลำดับถูกต้อง

ตัวอย่าง:

"([]{})"  → VALID
"([)]"    → INVALID  (วงเล็บสลับกัน)
"{[]"     → INVALID  (วงเล็บเปิดไม่มีปิด)

*/

#include <stdio.h>
#include <string.h>
#include <iostream>
#define MAXN 1000
using namespace std;

char stack[MAXN];
int tos = -1;

void push(char c)  { stack[++tos] = c; }
char pop()         { return stack[tos--]; }
char top()         { return stack[tos]; }
int  isEmpty()     { return tos == -1; }

// ===== Task 1: Implement isMatch() =====
// Return 1 if (open, close) is a valid bracket pair, 0 otherwise.
// Valid pairs: () [] {}
// Hint: use && and || to check all three cases.
int isMatch(char open, char close) {
    return ((open == '(') && (close == ')')) ||
            ((open == '[') && (close == ']')) ||
            ((open == '{') && (close == '}'));
}

// ===== Task 2: Implement isValid() =====
// Return 1 if string s has valid bracket nesting, 0 otherwise.
//
// Think before coding:
//   - What should happen when you see an open bracket?
//   - What should happen when you see a close bracket?
//   - What does an empty stack at the end mean?
int isValid(char *s) {
    for(int i = 0; s[i] != '\0'; i++){
        ;
    }

    // TODO
}

int main() {
    // ===== Original =====
    printf("%d\n", isValid("([]{})" ));  // expect 1 — basic valid nesting
    printf("%d\n", isValid("([)]"   ));  // expect 0 — wrong pair
    printf("%d\n", isValid("{[]"    ));  // expect 0 — unclosed open
    printf("%d\n", isValid(""       ));  // expect 1 — empty string
    puts("");

    // ===== Missing cases =====
    printf("%d\n", isValid(")"      ));  // expect 0 — close with empty stack
    printf("%d\n", isValid("((()))" ));  // expect 1 — deeply nested
    printf("%d\n", isValid("((()"   ));  // expect 0 — multiple unclosed opens
    printf("%d\n", isValid("()"     ));  // expect 1 — simplest valid
    return 0;
}