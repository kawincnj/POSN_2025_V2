#include <bits/stdc++.h>
using namespace std;

int main(){

    int  n;
    cin >> n;
    vector<int> v(n);
    for(auto &i :v){
        cin>> i;
    }
    vector<int> dp(n, 1);

    for(int i =0; i<n ; i++){
        for(int j = 0; j< i; j++){
            if(v[i] > v[j]){
                dp[i] = max(dp[i], dp[j] + 1);
            }
        }
    }
    auto ans = max_element(dp.begin(), dp.end());
    cout << *ans;

    return 0;
}