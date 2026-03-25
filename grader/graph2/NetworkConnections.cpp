#include <bits/stdc++.h>
using namespace std;

int find(int x, vector<int> &v){ return (v[x] == x ?  x : find(v[x], v));}
void unite(int x, int y, vector<int> &v) {v[find(x, v)] = find(y, v);}
bool check (int x, int y, vector<int> &v) {return (find(x, v) == find(y,v));}

int main() {
    int a, b; cin >> a >> b;
    vector<int> v(a + 1);
    for(int i =0; i< a; i++){
        v[i] = i;
    }

    int Q = 0, U = 0;
    for(int i =0; i< b; i++){
        char x; int y, z; cin >> x >> y >> z;
        if(x == 'c'){
            unite(y, z, v);
        }else{
            check(y, z, v) ? Q ++ : U++;
        }
    }
    cout << Q << ' ' << U;

    return 0;
}