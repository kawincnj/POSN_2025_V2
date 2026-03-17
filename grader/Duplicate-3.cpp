#include <bits/stdc++.h>
using namespace std;

int main() {
    int n; cin >> n;
    int arr[100001] = {0};
    for(int i =0;i <n; i++){
        int x; cin >> x;
        arr[x] ++;
    }

    for(int i =0;i <100001; i++){
        if((arr[i]) != 0 && (arr[i] >= n/3)){
            cout << i << ' ';
        }
    }

    return 0;
}