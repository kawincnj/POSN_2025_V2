#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    int sum =0, maxx = -1e9; 
    for(int i =0; i< n ; i++){
        int x; cin >> x;
        if((sum + x ) < 0){sum = 0;}
        else{
            sum+=x;
            maxx = max(sum, maxx);
        }
    }
    cout<< ((maxx > 0) ? maxx : -1);

    return 0;
}