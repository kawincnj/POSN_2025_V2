#include <bits/stdc++.h>
using namespace std;

int main(){
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    string s, t;
    cin >> s >> t;

    vector<int> cntS(26, 0), cntT(26, 0);
    int qs = 0, qt = 0;

    for(char c : s){
        if(c == '?') qs++;
        else cntS[c - 'a']++;
    }

    for(char c : t){
        if(c == '?') qt++;
        else cntT[c - 'a']++;
    }

    int ans = 0;

    for(int i = 0; i < 26; i++){
        int m = min(cntS[i], cntT[i]);
        ans += m;
        cntS[i] -= m;
        cntT[i] -= m;
    }

    for(int i = 0; i < 26; i++){
        int m = min(qs, cntT[i]);
        ans += m;
        qs -= m;
        cntT[i] -= m;
    }

    for(int i = 0; i < 26; i++){
        int m = min(qt, cntS[i]);
        ans += m;
        qt -= m;
        cntS[i] -= m;
    }

    ans += min(qs, qt);

    cout << ans;
}