#include <bits/stdc++.h>
using namespace std;

int main(){
    int n; cin >> n;
    bool is_minus = true;
    vector<int>v(n);
    for(int i =1; i<n; i++){
        cin >> v[i] ; v[i] += v[i-1];
        if(v[i] > 0) {is_minus = false;}
    }
    if(is_minus){cout << 0; return 0;}
    pair<int, int>p;
    int max = -1e9;
    for(int i = 1 ; i < n; i++){
        for(int  j = i; j < n; j ++){
            int x;
            x = v[j] - v[i-1];
            if(x > max ||( x == max && j - i > p.second - p.first)){
                max = x;
                p = {i, j};
            }
        }
    }
    cout << p.first << ' ' << p.second+1;

    return 0;
}