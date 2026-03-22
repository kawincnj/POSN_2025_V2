#include <bits/stdc++.h>
using namespace std;

int parent[51];
int find_(int x){return (parent[x] == x ? x : find_(parent[x]));}
void connected(int x, int y) {parent[find_(x)] = find_(y);}
bool united(int x, int y) {return find_(x) == find_(y);}

int main() {
    int a, b; cin >> a >> b;
    for(int i = 0; i<a+1; i++){
        parent[i] = i;
    }
    int is =0, no = 0;
    for(int i =0; i < b; i++){
        char c; int x, y;
        cin >> c >> x >> y;
        if(c == 'c') {connected(x, y);}
        else {united(x, y) ? is ++ : no ++;}
    }
    cout << is << ' ' << no;
    return 0;
}