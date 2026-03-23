#include <bits/stdc++.h>
using namespace std;

int main(){
    string key = "apple";
    vector<int> v(key.size(), 0);
    int i =0, j= 1;
    while(j < key.size()){
        if(key[i] == key[j]){
            v[j] = i+1;
            j++; i++; 
        }else{
            if(i != 0) {i = v[i - 1];}
            else {j ++;}
        }
    }
    string sent; getline(cin, sent);
    i = 0; j = 0;
    int count = 0;
    while(i < sent.size()){
        if(sent[i] == key[j]){
            i++; j++;
            if(j >= key.size()){
                count ++; j = v[j - 1];
            }
        }else{
            if(j != 0){j = v[j- 1];}
            else{i ++ ;}
        }
    }cout << count;
    

    return 0;
}