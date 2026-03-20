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
    

    return 0;
}