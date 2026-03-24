#include <bits/stdc++.h>
using namespace std;


int main(){

    int n; cin >> n;
    vector<string> v(n);
    pair<int, int> pos;
    int c; cin >> c >> pos.first >> pos.second;
    for(auto &i : v){
        cin >> i;
    }

    vector<int> visit = {pos.first*10 + pos.second};
    queue<pair<int, int>> q;
    q.push(pos);

    while(!q.empty()){
        
    }

    return 0;
}