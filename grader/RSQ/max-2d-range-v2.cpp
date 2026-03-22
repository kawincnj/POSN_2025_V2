#include <bits/stdc++.h>
using namespace std;

int main() {

    int n; cin >> n;
    vector<vector<int>> v(n, vector<int>(n, 0));
    for(int i = 0; i<n; i++){
        for(int j = 0; j<n; j++){
            cin >> v[i][j];
        }
    }
    int maxx = -1e9;
    for(int i =0; i< n; i++){
        vector<int> c(n, 0);
        for(int j = i; j<n; j++){
            for(int k = 0; k < n; k++){
                c[k] += v[j][k];
            }
            int sum = 0;
            for(int m = 0; m < n; m++){
                    sum += c[m];
                    maxx = max(sum, maxx);
                    if(sum < 0) {sum = 0;}
            }
        }
    }

    cout << maxx;

    return 0;
}   