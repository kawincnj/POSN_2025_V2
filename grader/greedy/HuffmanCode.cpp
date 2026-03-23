#include <bits/stdc++.h>
using namespace std;

int main(){
    int n;
    cin >> n;
    
    for(int i =0; i< n; i++){char c; cin >> c;}
    
    
    priority_queue<int, vector<int>, greater<int>> pq;
    for(int i =0; i < n; i++){
        int x; cin >> x;
        pq.push(x);
    }
    
    long long ans = 0;
    while(pq.size() > 1){
        int a = pq.top(); pq.pop();
        int b =  pq.top(); pq.pop();
        int merged = a + b;
        ans += merged;
        pq.push(merged);
    }
    
    cout << ans;
    return 0;
}