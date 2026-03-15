#include <bits/stdc++.h>
using namespace std;
using ll = long long;

int main() {
    cin.tie(0) -> sync_with_stdio(0);
    string s;
    cin >>s;
    int arr[26] = {0};
    for(ll i =0; i < size(s); i++){
        arr[s[i] - 'A'] ++;
    }

    int len;
    for(auto &i : arr){
        if(i %2 == 0){
            len += i;
        }else{
            cout << i << '\n';
            cout << "NO SOLUTION"; return 0;
        }
    }

    return 0;
}