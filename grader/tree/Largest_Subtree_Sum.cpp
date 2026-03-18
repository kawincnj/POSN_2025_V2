#include <bits/stdc++.h>
using namespace std;

map<int, vector<int>> m;

int subtreesum(int node){
    int sum = node;
    if(m.find(node) == end(m)) return sum;
    for(int child: m[node]){
        sum += subtreesum(child);
    }
    return sum;

}

int main(){
    int n; cin >> n>>n;
    for(int i = 0; i<n-1; i++){
        int a, b; cin >> a >> b;
        m[a].push_back(b);
    }
    int maxx = -1e9;
    for(auto &[i, j]: m){
        maxx = max(maxx, subtreesum(i));
    }
    cout << maxx;
    return 0;
}