#include <bits/stdc++.h>
using namespace std;


int main(){
    cin.tie(0) -> sync_with_stdio(0);
    int n; cin >> n;
    int sum =0;
    for(int i= 0; i< n; i++){
        int x = 0; cin >> x;
        sum += x;
    }
    int r = sum % n;
    if(!r){
        cout << n;
    }else{
        cout << max(r, n-r);
    }
    

    return 0;
}
