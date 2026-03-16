/*
โจทย์ 2B.2 — Rotting Oranges 
โจทย์: Grid ขนาด N×M มี: 2 = ส้มเน่า, 1 = ส้มสด, 0 = ช่องว่าง
ทุก 1 นาที ส้มเน่าแต่ละลูกจะทำให้ส้มสดที่อยู่ติดกัน 4 ทิศเน่าตาม
หาจำนวนนาทีน้อยสุดที่ทำให้ไม่มีส้มสดเหลืออยู่ ถ้าเป็นไปไม่ได้ให้ตอบ -1

ตัวอย่าง:

2 1 1
1 1 0
0 1 1
คำตอบ: 4

Constraints: N, M ≤ 10

คิดก่อนโค้ด — ตอบคำถามนี้:
ทำไมถึงต้องใช้ BFS ไม่ใช่ DFS? ถ้าใช้ DFS จะเกิดอะไรผิดพลาด?

*/

#include <stdio.h>
#include <string.h>
#define MAXN 15

int grid[MAXN][MAXN];
int dist[MAXN][MAXN];
int qr[MAXN*MAXN], qc[MAXN*MAXN];
int qfront = 0, qrear = 0;

int dx[] = {0, 0, 1, -1};
int dy[] = {1, -1, 0, 0};

int good = 0;
int mn = 0;
int main() {
    int n, m;
    
    scanf("%d %d", &n, &m);
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            scanf("%d", &grid[i][j]);
    
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            if(grid[i][j] == 2){
                qr[qrear] = i; qc[qrear] = j;
                qrear ++;
                dist[i][j] = 0;
            }else if(grid[i][j] == 1) good ++;
    
    while(qfront < qrear){
        int r = qr[qfront];
        int c = qc[qfront];
        qfront ++;

        for(int i =0; i <4; i++){
            int nr = r + dx[i];
            int nc = c + dy[i];

            if(nc >= 0 && nr >= 0 && nr<n && nc<m && grid[nr][nc] == 1 ){
                grid[nr][nc] = 2;
                dist[nr][nc] = dist[r][c] + 1;
                mn = dist[nr][nc];
                qr[qrear] = nr; qc[qrear] = nc;
                qrear ++;
                good --;
            }
        }
    }

    if(! good){printf("%d", mn);}
    else printf("%d", -1);
    

    return 0;
}