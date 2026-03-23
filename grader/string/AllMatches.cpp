#include <bits/stdc++.h>
using namespace std;

int main(){
    int x; cin >> x >> x;
    string s, tar; cin >> tar >> s;
    vector<int> v(s.size(), 0); 
    int i =0, j = 1;
    while( j < s.size()){
        if(s[j] == s[i]){
            v[j] = i+1;
            j ++; i++;
        }else{
            if(i != 0){i = v[i-1];}
            else {j++;}
        }
    }
    i = 0; j = 0;
    while(i < tar.size()){
        if(tar[i] == s[j]){
            i++; j++;
            if(j >= s.size()){
                cout << (i - j) << '\n';
                j = v[j - 1];
            }
        }else{
            if(j != 0){
                j = v[j - 1];
            }else{
                i++;
            }
        }
    }cout << -1;

    return 0;
}