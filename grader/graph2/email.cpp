#include <bits/stdc++.h>
using namespace std;

int main(){
    int a; cin >> a;
    for(int i =0; i< a; i++){
        int m, n, S, T; cin >> n >> m>> S >> T;
            vector<vector<pair<int, int>>> v(n+1);
            for(int j = 0; j < m; j++){
                int q, w, e; cin >> q >> w >> e;
                v[q].push_back({e, w});
                v[w].push_back({e, q});
            }
            vector<int> dist(n+1, 1e9);
            priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
            pq.push({0, S});
            dist[S] = 0;
            while(!pq.empty()){
                pair<int, int> temp = pq.top(); pq.pop();
                for(auto i : v[temp.second]){
                    if(dist[i.second] > dist[temp.second] + i.first){
                        pq.push({dist[temp.second] + i.first, i.second}); 
                        dist[i.second] = dist[temp.second] + i.first;
                    }
                }
            }
            cout << "Case #" << i + 1 << ": " << ( (dist[T] == 1e9 ) ? "unreachable\n" : to_string(dist[T]) + '\n');
        }

    return 0;
}