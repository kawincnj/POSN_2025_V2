#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> v1, v2;
    bitset<12> b;
    for(int i =0 ;i < 30; i++){
        b.reset();
        cin >> b;
        int n = b.count();
        if(n == 12){
            v1.push_back(i);
        }else if(n<8){v2.push_back(i);}
    }
    cout << v1.size() << ' ';
    for(auto &i: v1){
        cout << i << ' ';
    }
    cout <<'\n' << v2.size() << ' ';
    for(auto &i:v2){
        cout << i << ' ';
    }

    return 0;
}