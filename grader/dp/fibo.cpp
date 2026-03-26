#include <bits/stdc++.h>
using namespace std;

long long fibo(long long x, map<long long, long long> &m)
{
    if (m.find(x) != m.end())
    {
        return m[x];
    }
    else
    {
        return m[x] = fibo(x - 1, m) + fibo(x - 2, m);
    }
}
int main()
{
    map<long long, long long> m = {{0, 0}, {1, 1}, {2, 1}};
    while(1){
        long long x;
        cin >> x;
        if(x < 0){
            cout << "End"; return 0;
        }else{
            cout << "F(" << to_string(x) << ")" << " = " << to_string(fibo(x, m)) <<'\n';
        }
    }

    return 0;
}