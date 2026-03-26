#include <bits/stdc++.h>
using namespace std;

int main(){
    vector<int> v;
    while(1){
        string x;
        cin >>x;
        if(x == "done"){break;}
        v.push_back(stoi(x));
    }
    if(v.size() == 0) {cout << 0; return 0;}
    int sum = v[0], maxx = v[0];
    for(int i =1; i < v.size(); i++){
        sum = max(v[i], v[i] + sum);
        maxx = max(maxx, sum);
    }
    cout << maxx;
    return 0;
}