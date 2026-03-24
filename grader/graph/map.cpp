#include <bits/stdc++.h>
using namespace std;

int main (){

    int a, b; cin >> a >> b;
    vector<vector<int>> v(a);
    for(int i =0 ; i < b; i++){
        int x, y; cin >> x >> y;
        v[x].push_back(y);
        v[y].push_back(x);
    }

    vector<int> d(a, 0);
    queue<int> q;
    q.push(0);
    int max_n=0;
    while(!q.empty()){
        int a = q.front(); q.pop();
        for(auto i : v[a]){
            if(d[i] != 0 || i == 0) continue;
            d[i] += d[a] + 1; q.push(i);
            max_n = max(d[i], max_n);
        }
    }

    for(int i=1; i<=max_n; i++){
        for(int j=0; j<a; j++){
            if(i==d[j]) cout << j << " ";
        }
        cout << "\n";
    }

    


    return 0;
}