#include <bits/stdc++.h>
using namespace std;

int main() {
    int a, b; cin >> a >> b;
    vector<vector<pair<int, int>>> v(a+1);
    for(int i =0; i< b; i++){
        int x, y,z; cin >> x >> y >> z;
        pair<int, int> temp = {z, y};
        v[x].push_back(temp);
    }

    vector<int> dist(a+1, 1e9);
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    pq.push({0, 1});
    dist[1] = 0;

    while(!pq.empty()){
        pair<int, int> temp = pq.top(); pq.pop();
        for(auto i : v[temp.second]){
            if(dist[i.second] > dist[temp.second] + i.first){
            pq.push({dist[temp.second] + i.first, i.second});
            dist[i.second] = dist[temp.second] + i.first;
        }
        }
    }
    for(int i = 1; i < a+1; i++){
        if(dist[i] == 1e9){ 
            cout << -1 << '\n';
        }else{
            cout << dist[i] << '\n';
        }
    }

    return 0;
}