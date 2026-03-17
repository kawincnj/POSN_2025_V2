#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main(){
    cin.tie(0)-> sync_with_stdio(0);
    int n; cin >> n;
    vector<int> s(n+1, 0);
    vector<int> v(n);
    for(int i =0; i<n; i++){
        int x; cin >> x;
        v[i] = x;
        s[i+1] += s[i] + x;
    }
    int min_diff = 2e9, ans_i = 2, ans_j = 2;
    for(int i = 2; i <= n- 1; i++){
        for(int  j = i+1; j<= n; j++){
            int p1 = s[i-1];
            int p2 = s[j-1] - s[i-1];
            int p3 = s[n] - s[j-1];

            int low = min({p1, p2, p3});
            int high = max({p1, p2, p3});
            int diff = high - low;
            if(diff < min_diff){
                min_diff = diff;
                ans_i = i;
                ans_j = j;
            }

        }
    }
    cout << ans_i << ' ' << ans_j;

    return 0;
}