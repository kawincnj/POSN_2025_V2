#include <bits/stdc++.h>
using namespace std;

int main(){
    cin.tie(0)->sync_with_stdio(0);

    int n;
    cin >> n;
    vector<vector<int>> ans;
    vector<int> v(n);
    for(auto &i: v){
        cin >> i;
    }
    sort(begin(v), end(v));
    for(int i =0; i <n; i++){
        int j = i+1,k = n-1;
        if(i > 0 && v[i] == v[i-1]) continue;
        while(j < k){
            int sum = v[i] + v[j] + v[k];
            if(sum == 0){
                vector<int> temp = {v[i], v[j], v[k]};
                ans.push_back(temp); j++;k--;
            }
            else if(sum < 0){j++;}
            else if( sum > 0) {k--;}
        }

    }

    if(ans.size()){
        for(auto &i: ans){
            for(auto &j:i){
                cout << j << ' ';
            }cout << '\n';
        }}else cout << 0;

    return 0;
}