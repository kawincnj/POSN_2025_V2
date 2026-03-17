#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        if(size(s) <=1 ) return size(s);
        int temp_len = 1;
        int len = 0;
        int i = 0, j = 1;
        int v[256] = {0}; v[s[i]] = 1;
        while(j <= (size(s) -1)){
            if(v[s[j]] == 0){
                v[s[j]] =1; j ++; temp_len ++;
                len = max(len, temp_len);
            }else{
                v[s[i]] --;
                i++;    
                temp_len --;
            }
        } return len;

    }
};