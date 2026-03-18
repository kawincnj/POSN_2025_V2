#include <bits/stdc++.h>
using namespace std;

struct Node{
    int data;
    Node *left;
    Node *right;
};

Node *creatNode(int data){
    Node *node = new Node;
    node->left = NULL;
    node->right = NULL;
    node->data = data;
    return node;

}

Node *insert(Node *root, int data){
    if(root == NULL) return creatNode(data);
    if(root->data > data){root->left = insert(root->left, data);}
    else {root->right = insert(root->right, data);}
    return root;
}

void preorder(Node *root){
    if(root == NULL) return;
    cout << root-> data<< ' ';
    preorder(root->left);
    preorder(root->right);
}

void inorder(Node *root){
    if(root == NULL) return;
    inorder(root->left);
    cout << root-> data<< ' ';
    inorder(root->right);
}

void postorder(Node *root){
    if(root == NULL) return;
    postorder(root->left);
    postorder(root->right);
    cout << root->data << ' ';
}

int search(Node *root,int key){
    int find = 0;
    if(root == NULL) return 0;
    if(root->data == key) return 1;
    if(key < root->data) return search(root->left, key);
    else return search(root->right, key);
}
Node *root = NULL;
int main(){
    int n; cin >> n;
    for(int i =0; i<n; i++){
        int x; cin >>x;
        if(x == 1){
            int y; cin >>y;
            root = insert(root, y);
        }else if(x == 2){
            int y; cin>> y;
            cout << (search(root, y) ? "true" : "false") << '\n'; 
        }else if(x == 3){
            preorder(root); cout << '\n';
        }else if(x == 4){
            postorder(root); cout << '\n';
        }else if(x == 5){
            inorder(root); cout << '\n';
        }
    }


    return 0;
}