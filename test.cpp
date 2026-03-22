#include <bits/stdc++.h>
using namespace std;
using ll = long long;

void update(int pos, int val, int n, vector<int> &ft){
    for(; pos < n; pos += pos &(-pos)){
        ft[pos] += val; 
    }
}

int query(int pos, vector<int> &ft){
    int sum = 0;
    for(; pos > 0; pos -= pos &(-pos)){
        sum += ft[pos];
    }
    return sum;
}

int range(int l, int r, vector<int> &ft){
    return (query(r, ft) - query(l-1, ft));
}

int main(){
    cin.tie(0)-> sync_with_stdio(0);
    bitset<12> b;
    cin >> b;
    b.reset();
    cout << b;
    return 0;
}
