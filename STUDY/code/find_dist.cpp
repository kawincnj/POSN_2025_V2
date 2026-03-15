#include <bits/stdc++.h>
using namespace std;

using ll = long long;

class Point {
    private:
        ll x, y;
    public:
        Point(ll a, ll b) {
            x =a; y = b;
        }
        float distance(Point p){
            return pow(pow(p.x -x, 2) + pow(p.y - y, 2), 0.5);
        }
};

int main() {
    Point p1 = Point(1, 2);
    Point p2 = Point(4, 6);
    cout << p1.distance(p2);

    return 0;
}