#include <bits/stdc++.h>
using namespace std;

int main() {
    long long n; cin >> n;
    long long a =0, b = 0; 
    int order = 1;
    for(int i=0; i < 31; i++){
        if(n & (1 << i)){
            if(order % 2){
                a += (1 << i);
            }else{
                b += (1 << i);
            }
            order ++;
        }
    }
    cout << a << ' ' << b;


    return 0;
}