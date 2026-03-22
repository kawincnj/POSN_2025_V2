#include <bits/stdc++.h>
using namespace std;

int main() {

        int n, l, h; cin >> n >> l >> h;
        vector<int> v(n+1, 0);
        for(int i = 1; i<n+1; i++){
            int x; cin >> x;
            v[i] = x + v[i-1];
        }
        int sum = 0;
        for(int i = 1; i<n+1; i++){
            for(int j =i; j<n+1; j++){
                int val = v[j] - v[i-1];
                if(val>= l && val <= h){
                    sum ++;
                }
            }
        }
        cout << sum;

    return 0;
}