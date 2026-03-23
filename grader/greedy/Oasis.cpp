#include <bits/stdc++.h>
using namespace std;

int main(){
    cin.tie(0) -> sync_with_stdio(0);
    int n; int w; cin >> n >> w;
    vector<int> v(n);
    for(auto &i : v){
        cin >> i;
    }
    sort(v.begin(), v.end());
    int sum = 0; int cnt = 0;
    for(auto &i : v){
        if(sum + i <= w){
            sum += i;
            cnt ++;
        }
    }
    cout << cnt;

    return 0;
}
