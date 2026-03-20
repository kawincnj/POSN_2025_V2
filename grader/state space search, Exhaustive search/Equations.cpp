#include <bits/stdc++.h>
using namespace std;

void find_ans(vector<int> v){
    for(int i = -sqrt(v[2]); i<= sqrt(v[2]); i++){
        for(int j = -sqrt(v[2]); j<= sqrt(v[2]); j++){
            int k = v[0] -i - j;
            if(i+j+k == v[0] && i*i+j*j+k*k==v[2] && i*j*k == v[1]){
                cout << i << ' ' << j << ' ' << k << '\n'; return;
            }
        }
    } cout << "No solution.\n";
}

int main(){
    int n; cin >>n;
    vector<vector<int>> v;
    for(int i =0;i <n; i++){
        vector<int> temp(3);
        for(auto &i: temp){
            cin >> i;
        }
        v.push_back(temp);
    }

    for(auto &i :v){
        find_ans(i);
    }

    return 0;
}