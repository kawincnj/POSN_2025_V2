#include <bits/stdc++.h>
using namespace std;

int main(){
    string s;
    cin >> s;
    int ct = 1, mx = 0;

    for(int i =0 ; i < size(s); i++){
        char x = s[i];
        if(x == s[i + 1]){
            ct++;
        }else{
            mx = max(mx, ct);
            ct = 1;
        }
    }
    cout << mx;

    return 0;
}