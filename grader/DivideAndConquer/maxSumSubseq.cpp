#include <bits/stdc++.h>
using namespace std;

int main(){
    cin.tie(0) -> sync_with_stdio(0);
    int n; cin >> n;
    int sum = 0; int maxx = -1e9;
    for(int i = 0; i< n; i++){
        int x;
        cin >> x;
        if(x + sum > 0){
            sum += x;
        }else{
            sum = 0;
        } 
        maxx = max(maxx, sum);
    }
    cout << maxx;
    

    return 0;
}
