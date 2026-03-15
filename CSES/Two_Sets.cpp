#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    ll n;
    vector<int> v;
    vector<int> v1;
    cin >> n;
    ll sum = ((n*n+n)/2);
    if (sum % 2 == 1){
        cout << "NO";
    }else{
        cout << "YES" << '\n';
        ll cnt = 0;
        for(ll i =  n; i >= 1; i --){
            if(cnt +i <=  sum/2){
                cnt += i;
                v.push_back(i);
            }else{ v1.push_back(i);}
        }
        cout << size(v) << '\n';
        for(auto &i: v){cout << i << ' ';}
        cout << '\n'<< size(v1) << '\n';
        for(auto &i: v1){cout << i << ' ';}

    }

    
    return 0;
}