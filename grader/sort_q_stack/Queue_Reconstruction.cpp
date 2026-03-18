#include <bits/stdc++.h>
using namespace std;


int main() {
    int n; cin >> n;
    vector<pair<int ,int>> p(n);
    for(int i =0;i<n;i++){
        cin >> p[i].first; cin >> p[i].second;
    }
    sort(begin(p), end(p), [](pair<int, int> a, pair<int, int> b){
        if(a.first == b.first){
            return a.second < b.second;
        } return a.first > b.first;
    });
    vector<pair<int ,int>> ans;
    for(auto &i : p){
        ans.insert(begin(ans)+ i.second, {i.first, i.second});
    }
    for(auto &i: ans){
        cout << i.first << ' ' << i.second << '\n';
    }
    return 0;
}