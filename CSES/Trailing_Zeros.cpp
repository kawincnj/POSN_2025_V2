#include <bits/stdc++.h>
using ll = long long;

using namespace std;

int main(){
    cin.tie(0) -> sync_with_stdio(0);
    ll n;
    cin >> n;

    ll ans=0;

    while (n>=5){
        ll x = n/5;
        ans += x;
        n = x;
    }
    cout << ans;

    return 0;
}