#include <bits/stdc++.h>
using namespace std;

int main(){

    int n;
    cin >> n;
    vector<int> v(n);
    for(auto &i : v){
        cin >> i;
    }
    int key; cin >> key;
    bool find  = 0;
    for(int i =0; i < ( 1 << v.size()); i++){
        int sum = 0;
        for(int j = 0; j < n; j++){
            if(i & (1 << j)){
                sum += v[j];
            }
            if(sum == key) {find = 1;}
        }   
    }
    cout << (find ? "YES" : "NO");

    return 0;
}