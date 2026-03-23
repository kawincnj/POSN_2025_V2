#include <bits/stdc++.h>
using namespace std;

int main(){
    cin.tie(0)->sync_with_stdio(0);

    vector<int> v1(27, 0), v2(27, 0);
    int n; cin >> n;

    for(int i = 0; i < n; i++){
        char c; cin >> c;
        if(c == '?') v1[26]++;
        else v1[c - 'a']++;
    }

    for(int i = 0; i < n; i++){
        char c; cin >> c;
        if(c == '?') v2[26]++;
        else v2[c - 'a']++;
    }

    int ans = 0;

    for(int i = 0; i < 26; i++){
        int m = min(v1[i], v2[i]);
        ans += m;
        v1[i] -= m;
        v2[i] -= m;
    }

    for(int i = 0; i < 26; i++){
        int m = min(v1[26], v2[i]);
        ans += m;
        v1[26] -= m;
        v2[i] -= m;
    }

    for(int i = 0; i < 26; i++){
        int m = min(v2[26], v1[i]);
        ans += m;
        v2[26] -= m;
        v1[i] -= m;
    }

    ans += min(v1[26], v2[26]);

    cout << ans;
}