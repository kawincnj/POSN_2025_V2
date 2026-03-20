#include <bits/stdc++.h>
using namespace std;

void able(pair<int, vector<int>> p){
    vector<bool> v(p.first + 1, false);
    v[0] = true;
    for(int i =0; i<p.second.size(); i++){
        for(int j =p.first; j >= 0; j--){
            if(v[j])
                if(j + p.second[i] <= p.first)
                    v[j + p.second[i]] = true;
        }
    }
    if(v[p.first]) cout << "YES!\n";
    else cout << "NO\n";

}

int main(){
    cin.tie(0) -> sync_with_stdio(0);
    vector<pair<int, vector<int>>> v;
    int n; cin >>n;
    for(int i =0; i< n; i++){
        pair<int, vector<int>> temp;
        int val; int len; cin >> val >> len;
        temp.first = val;
        for(int j =0; j< len; j++){
            int x; cin >> x;
            temp.second.push_back(x);
        }
        v.push_back(temp);
    }
    for(auto &i: v){
        able(i);
    }

    return 0;
}