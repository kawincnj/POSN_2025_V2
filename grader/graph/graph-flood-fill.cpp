#include <bits/stdc++.h>
using namespace std;
vector<pair<int, int>> trav = {{0,1}, {0, -1}, {1,0}, {-1, 0}}; 

int main(){
    int n; cin >> n;
    vector<string> v(n);
    pair<int, int> pos;
    char c; cin >> c;
    cin >> pos.first >> pos.second;
    for(int i=0; i<n; i++){
        cin>>v[i];
    }

    queue<pair<int, int>> q;
    char ch = v[pos.first][pos.second];
    q.push(pos);

    while(!q.empty()){
        int x1=q.front().first, y1=q.front().second;
        q.pop();
        v[x1][y1] = c;

        for(int i=0; i<4; i++){
            int x2=x1+trav[i].first, y2=y1+trav[i].second;

            if(x2<0 or x2>=n or y2<0 or y2>=n) continue;
            if(v[x2][y2]!=ch) continue;
            if(v[x2][y2]==c) continue;

            q.push({x2, y2});
            v[x2][y2]=c;
        }
        
    }

    for(int i=0; i<n; i++){
        for(int j=0; j<n; j++){
            cout << v[i][j];
        }
        cout << "\n";
    }

    return 0;
}