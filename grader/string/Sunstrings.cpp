#include <bits/stdc++.h>
using namespace std;

vector<int> buildLPS(string pat){
    int m = pat.size();
    vector<int> lps(m, 0);
    int i =0, j = 1;
    while(j < m){
        if(pat[j] == pat[i]){
            lps[j] = i + 1;
            j++; i++;
        }else{
            if(i != 0){i = lps[i - 1];}
            else{ j ++;}
        }
    }
    return lps;
}

bool isSubstring(string txt, string pat){
    vector<int> lps = buildLPS(pat);

    int i = 0, j = 0;
    int n = txt.size(), m = pat.size();

    while(i < n){
        if(txt[i] == pat[j]){
            j++; i++;
            if(j >= m){return true;}
        }else{
            if( j != 0){j = lps[j - 1];}
            else{i ++;}
        }
    }

    return false;
}

int main(){
    int n; cin >> n;
    vector<string> s(n);

    for(auto &i: s) cin >> i;

    sort(s.begin(), s.end(), [](string a, string b){
        return a.size() < b.size();
    });

    for(int i = 0; i < n - 1; i++){
        if(!isSubstring(s[i+1], s[i])){
            cout << "NO\n";
            return 0;
        }
    }

    cout << "YES\n";
    for(auto &i: s){
        cout << i << '\n';
    }

    return 0;
}