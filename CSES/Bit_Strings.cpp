#include <bits/stdc++.h>
using namespace std;

int main(void){
    cin.tie(0)->sync_with_stdio(0);
    long long n;
    cin >>n;
    long long ans = 1;
    for(int i = 0; i < n; i ++ ){
        ans *= 2;
        ans %= 1000000000+7;
    }
    cout << ans;


    return 0;
}