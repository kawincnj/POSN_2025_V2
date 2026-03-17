#include <bits/stdc++.h>
using namespace std;

vector<string> m = {"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"};

int main(){
    int n;
    cin >> n;
    vector<string> v(n);
    for(auto &i: v){
        cin >> i;
    }
    sort(begin(v), end(v), [](string a, string b){
            if(a.substr(3, 4) != b.substr(3, 4)){
                return a.substr(3) > b.substr(3);
            }else{
                return (find(begin(m), end(m), a.substr(0, 3)) > find(begin(m), end(m), b.substr(0, 3)));
            }
    });

    for(auto &i: v){
        cout << i << '\n';
    }

    return 0;
}