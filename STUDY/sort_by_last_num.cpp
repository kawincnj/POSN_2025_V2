#include <bits/stdc++.h>

using namespace std;

int main() {
    int arr[] = {27, 72, 100, 15, 93};
    sort(begin(arr), end(arr), [](int a, int b){
        a %= 10;
        b %= 10;
        return a < b;
    });
    for(int i =0; i < size(arr); i++){
        cout << *(arr + i) << ' ';
    }
    return 0;
}