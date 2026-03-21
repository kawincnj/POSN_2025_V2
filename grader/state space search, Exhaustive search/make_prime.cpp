#include <bits/stdc++.h>
using namespace std;

bool is_prime(long long n){
    if(n <= 1) return false;
    if(n == 2) return true;
    for(long long i = 2; i<sqrt(n)+1; i++){
        if(n %i == 0 && n!= i){return false;}
    }return true;
}

int main(){
    string x; cin >>x;
    set<string> s;
    queue<string> q;
    q.push(x); s.insert(x);
    int level = 0;

    while(!q.empty()){
        int sz = q.size();
        for(int i =0; i<sz; i++){
            string cur = q.front(); q.pop();
            if(is_prime(stoll(cur))) {cout << level; return 0;}
            for(int j = 0; j <cur.size(); j++){
                string sub = cur.substr(0, j) + cur.substr(j+1);
                if(!sub.empty() && s.count(sub) == 0){
                    q.push(sub); s.insert(sub);
                }
            }
        } level++;

    } cout << -1;

    return 0;
}