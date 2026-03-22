#include <bits/stdc++.h>
using namespace std;

int main(){
    int n, max_w; cin >> n >>max_w;
    vector<int> w;
    vector<pair<int, int>> v(n);
    for(auto &i : v){
        cin >> i.first >> i.second;
    }

    for(int i =0; i < (1<<v.size()); i++){
        int count = 0;
        int size = 0;
        for(int j =0; j<v.size(); j++){
            if(i & (1 << j)){
                count += v[j].second;
                size += v[j].first;
            }
        }
        if(size <= max_w) w.push_back(count);
    }
    cout << accumulate(w.begin(), w.end(), 0)/ float(w.size()) << setprecision(2);
    
    
 return 0;
}