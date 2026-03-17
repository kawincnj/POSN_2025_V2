#include <bits/stdc++.h>
using namespace std;

void merge(vector<int> &v, int left, int mid, int right, vector<int> &temp) {
    
    int i = left;  
    int j = mid;   

    while (i < mid && j < right) {
        if (v[i] <= v[j]) {
            temp.push_back(v[i]);
            i++;
        } else {
            temp.push_back(v[j]);
            j++;
        }
    }

    while (i < mid) temp.push_back(v[i++]);
    while (j < right) temp.push_back(v[j++]);

    for (int k = 0; k < temp.size(); k++) {
        v[left + k] = temp[k];
    }
}

int main(){
    int n;
    n = 8;
    vector<int> temp;
    // cin >> n;
    vector<int> v = {4 ,5 ,2 ,5 ,19 ,3 ,23 ,3};
    // for(auto &i : v){
    //     cin >> i;
    // }
    
    for (int width = 1; width < n; width *= 2) {
        for (int i = 0; i < n; i += 2 * width) {
            int left = i;
            int mid = min(i + width, n);
            int right = min(i + 2 * width, n);
            temp.clear();
            merge(v, left, mid, right, temp);
        }
    }

    for(auto &i : v){
        cout << i << ' ';
    }
    return 0;
}