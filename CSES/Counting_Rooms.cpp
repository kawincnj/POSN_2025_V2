#include <bits/stdc++.h>
using namespace std;

int main(){
    int a, b, room = 0; cin >> a >> b;
    vector<string> v(a);
    vector<vector<bool>> visit(a, vector<bool>(b, 0));
    vector<pair<int, int>> m = {{-1, 0}, {1, 0}, {0, 1}, {0, -1}};

    for(int i =0; i< a; i++){
        cin >> v[i];
    }

    for(int i = 0; i < a; i++){
        for(int j = 0 ; j < b;j ++){
            if(visit[i][j] || v[i][j] == '#' ) {continue;}
            queue<pair<int, int>> q; q.push({i, j});
            while(!q.empty()){
                int x = q.front().first, y = q.front().second; q.pop();
                for(auto d : m){
                    if(x + d.first < 0 || x + d.first >= a || y + d.second < 0 || y + d.second >= b
                    || visit[x + d.first][y + d.second] || v[x + d.first][y + d.second] == '#') continue;
                    q.push({x + d.first, y + d.second });
                    visit[x + d.first][y + d.second] = 1;
                }
            } room ++;

        }
    } cout << room;


    return 0;
}