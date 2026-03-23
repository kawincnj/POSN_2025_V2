#include <bits/stdc++.h>
using namespace std;

int main(){
    cin.tie(0) -> sync_with_stdio(0);

    int n;
    cin >> n;
    vector<pair<int, int>> v(n);
    for(auto &i : v){
        cin >> i.first;
    }
    for(auto &i : v){
        cin >> i.second;
    }
    int w; cin >> w;
    sort(v.begin(), v.end(), [](pair<int, int> a, pair<int, int> b){
        if(a.second/float(a.first) == b.second/float(b.first)) {return a.first < b.first;}
        return (a.second/float(a.first) > b.second/float(b.first));
    });

    int val =0, sum = 0;
    for(int i =0; i< n; i++){
        if((sum + v[i].first) <= w){
            sum += v[i].first;
            val += v[i].second;
        }else{
            val += (v[i].second/float(v[i].first)) * (w - sum); break;
        }
    }
    cout << val;

    return 0;
}
