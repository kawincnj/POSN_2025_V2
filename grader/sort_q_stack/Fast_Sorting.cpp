#include <bits/stdc++.h>
using namespace std;

int main() {
    cin.tie(0) -> sync_with_stdio(0);

    int n;
    cin >> n;
    int a[n];
    for(auto &i: a){
        cin >> i;
    }
    sort(a,a +n);
    for(auto &i: a){
        cout << i << ' ';
    }
    return 0;

}