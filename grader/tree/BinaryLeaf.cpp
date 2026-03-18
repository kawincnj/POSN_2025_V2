#include <bits/stdc++.h>
using namespace std;

struct Node{
    int left = -999999;
    int right = -999999;
    char pos;
};
map<int, Node> m;

int main() {
    int f;
    int n;
    cin >> f >> n;
    for(int i =0;i <n; i++){
        int a, b;
        char c; cin >> a >> b >>c;
        if(c == 'L'){
            m[a].left = b;
        }else {m[a].right = b;}
        m[b].pos = c;
    }
    int l= 0, r = 0;
    for(auto &[k ,v]: m){
        if(v.left == -999999 && v.right == -999999){
            v.pos == 'L' ? l ++ : r ++;
        }
    }
    cout << l << ' ' << r;
    return 0;
}