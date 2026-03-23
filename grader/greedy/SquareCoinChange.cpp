#include <bits/stdc++.h>
using namespace std;

int main(){
    cin.tie(0) -> sync_with_stdio(0);
    int c; cin >> c;
    int m; cin >> m;
    vector<int> v(m);
    for(auto &i:v){
        cin >> i;
    }
    sort(v.begin(), v.end(), [](int a , int b){return  a > b;});
    int ct = 0;

    int i = 0;
    while(c != 0){
        ct += c/v[i];
        c %= v[i];
        i ++;
    }
    cout << ct;

    

    return 0;
}
