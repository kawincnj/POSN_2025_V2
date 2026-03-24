#include <bits/stdc++.h>
using namespace std;

int V, E;
vector<vector<int>> vec(100);
bool visited[100] = {false};

void bfs (int u) {
    queue<int> q;

    visited[u] = true;
    q.push(u);

    while (!q.empty()) {
        int v = q.front();
        q.pop();
        if (v != 0) cout << v << " ";

        for (int w : vec[v]) {
            if (!visited[w]) {
                visited[w] = true;
                q.push(w);
            }
        }
    }
}

int main() {
    cin >> V >> E;

    for (int i = 0; i < E; i++) {
        int vi, wi;
        cin >> vi >> wi;

        vec[vi].push_back(wi);
        vec[wi].push_back(vi);
    }

    bfs(0);


}