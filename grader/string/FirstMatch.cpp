#include <bits/stdc++.h>
using namespace std;

int main(){
    cin.tie(0) -> sync_with_stdio(0);
    int x; cin >> x >> x;
    string s, key; cin >> s >> key;
    vector<int> v(key.size(), 0);

    int i = 0, j = 1;
    while(j < key.size()){
        if(key[i] == key[j]){
            v[j] = i+1;
            i ++; j++;
        }else{
            if(i != 0){i = v[i-1];}
            else{ j ++; }
        }
    }
    i = 0; j = 0;
    while(i < s.size()){
        if(s[i] == key[j]){
            i ++; j++;
            if(j >= key.size()){
                cout << (i - j); return 0;
            }
        }else{
            if(j != 0){j = v[j-1];}
            else{i ++ ;}
        }
    }cout << -1;

    return 0;
}