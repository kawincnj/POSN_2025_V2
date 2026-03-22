#include <bits/stdc++.h>
using namespace std;

int main(){
    int n; cin >> n;
    int a[n];
    for(auto &i: a){
        cin >> i;
    }
    for(int i= 0; i< (1 << n); i++){
        for(int j =0; j < n; j++){
            if(i & (1 << j)){
                cout << a[j] << ' ';
            }
        }
        cout << '\n';
    }

    return 0;
}