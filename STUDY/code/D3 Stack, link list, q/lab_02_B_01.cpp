/*
โจทย์ 2B.1 — BFS บน Grid 
โจทย์: กำหนด grid ขนาด N×M ให้หาเส้นทางสั้นสุด (จำนวนก้าว) จาก S ไปยัง E โดยช่องที่เป็น # คือกำแพง

ตัวอย่าง (grid 4×5):

S . . # .
. # . # .
. # . . .
. . . # E
คำตอบ: 9 ก้าว

Algorithm BFS (เติมให้สมบูรณ์):

ใส่ช่องเริ่มต้นเข้า queue, mark visited, dist=0
while queue ไม่ว่าง:
    cell = ดึงออกจาก queue
    สำหรับเพื่อนบ้านทั้ง 4 ทิศ:
        ถ้าอยู่ใน grid AND ไม่ใช่กำแพง AND ยังไม่เยี่ยม:
            mark visited
            dist[neighbor] = dist[cell] + 1
            ใส่ neighbor เข้า queue

*/

#include <stdio.h>
#include <string.h>
#define MAXN 105

char grid[MAXN][MAXN];
int  dist[MAXN][MAXN];
int  vis[MAXN][MAXN];
int  qr[MAXN*MAXN], qc[MAXN*MAXN];  // queue stores (row, col)
int  qfront, qrear;

int dx[] = {0, 0, 1, -1};
int dy[] = {1, -1, 0, 0};

int main() {
    int n, m;
    
    scanf("%d %d", &n, &m);
    for (int i = 0; i < n; i++) scanf("%s", grid[i]);

    int sr, sc, er, ec;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++) {
            if (grid[i][j] == 'S') { sr=i; sc=j; }
            if (grid[i][j] == 'E') { er=i; ec=j; }
        }

    memset(dist, -1, sizeof(dist));
    memset(vis,   0, sizeof(vis));
    qfront = qrear = 0;

    // TODO: BFS from (sr, sc) to (er, ec)
    // Initialize queue, mark start
    // Process queue, expand neighbors
    // Print dist[er][ec]

    printf("%d\n", dist[er][ec]);
    return 0;
}