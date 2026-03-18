#include <iostream>
using namespace std;

int main(){
    cin.tie(0) -> sync_with_stdio(0);
    int n; int zero = 0;
    cin >> n;
    for(int i =0 ;i <n;i++){
        int x;
        cin >> x;
        x == 0 ?  zero ++ : zero += 0;
    }
    cout << zero ? 1 : 0;

    return 0;
}