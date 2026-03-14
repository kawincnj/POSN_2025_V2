#include <bits/stdc++.h>
using namespace std;
using ll =  long long;

int main() {
    ll n, mx;
    cin >> n;
    vector<ll> v(n);
    for(int i =0 ; i < n; i++){
        cin >> v[i];
    }
    ll cnt = 0;
    mx = v[0];
    for(int i = 1; i < n; i++){
        if(v[i] > mx) {
            mx = v[i];  
        }
        else{
            cnt += mx - v[i];
        }
    }
    cout << cnt;

    return 0;
}