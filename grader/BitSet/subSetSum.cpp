#include <bits/stdc++.h>
using namespace std;

int main(){
    int n; cin >> n;
    vector<int> v(n);
    for(auto &i : v){
        cin  >>i;
    }
    int key; cin >> key;

    for(int i =0; i< (1 << n); i++){
        int sum = 0;
        for(int  j =0; j < n; j++){
            if(i & (1 << j)){
                sum += v[j];
            }
            if(sum == key){
                cout << "YES";
                return 0;
            }
        }
    }

    cout << "NO";
    return 0;
}