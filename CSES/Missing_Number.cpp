#include <bits/stdc++.h>

using namespace std;

int main() {
    long long m;
    cin >> m;
    vector<int> v(m-1);
    for (int i = 0; i < m-1; i ++){
        cin >> v[i];
    }
    sort(begin(v), end(v));

    for(int i =0; i < m; i ++){
        if (v[i] != i + 1){
            cout << i + 1;
            break;
        }
    }

    return 0;
}