#include <iostream>

using namespace std;

int werid_algo(long long n){
    if(n == 1) {return 1;}
    if (n % 2 == 1){
        n *= 3;
        n+= 1;
    }else{
        n /= 2;
    }
    cout << n << ' ';
    if(n == 1) {return 1;}
    else { return werid_algo(n);}

}

int main(){
    long long n;
    cin >> n;
    cout << n << ' ';
    werid_algo(n);
    return 0;
}