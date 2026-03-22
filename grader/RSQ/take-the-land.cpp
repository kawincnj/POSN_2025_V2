#include <bits/stdc++.h>
using namespace std;

int main(){
    int a, b; cin >> a >> b;
    vector<vector<int>> v(a, vector<int>((b), 0));
    for(int i =0; i <a; i++){
        for(int j = 0; j < b; j++){
            int x; cin >> x;
                v[i][j] = (x == 1) ? -999999 : 1;
        }
    }
    int maxx = -1e9;
    for(int i = 0; i< a; i++){
        vector<int> c(b);
        for(int j = i; j< a; j++){
            for(int k = 0; k<b; k++){
                c[k] += v[j][k];
            }

            int sum = 0;
            for(int n = 0; n < b; n++){
                sum += c[n];
                maxx = max(maxx, sum);
                if(sum < 0) {sum = 0;}
            }
        }
    }
    cout << maxx;

    return 0;
}