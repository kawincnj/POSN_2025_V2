#include <bits/stdc++.h>
using namespace std;

int main() {
    int n,m;
    cin >> n >> m;

    vector<int> hasChild(n+1,0);

    for(int i=0;i<m;i++){
        int a,b;
        cin >> a >> b;
        hasChild[a] = 1;
    }

    int leaf = 0;

    for(int i=1;i<=n;i++){
        if(hasChild[i] == 0)
            leaf++;
    }

    cout << leaf;
}