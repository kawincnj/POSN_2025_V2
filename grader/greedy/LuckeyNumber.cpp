#include <bits/stdc++.h>
using namespace std;

int main(){
    cin.tie(0)->sync_with_stdio(0);

    int n; cin >> n;
    while(n--){
        int a, b; cin >> a >> b;

        pair<int,int> maxx = {-1, a};

        for(int j = a; j <= b; j++){
            string s = to_string(j);

            int mn = 9, mx = 0;
            for(char c : s){
                mn = min(mn, c - '0');
                mx = max(mx, c - '0');
            }

            int diff = mx - mn;

            if(diff >= maxx.first){
                maxx = {diff, j};
            }
        }

        cout << maxx.second << '\n';
    }
}