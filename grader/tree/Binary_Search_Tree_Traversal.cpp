#include <bits/stdc++.h>
using namespace std;

struct Node {
    int data;
    Node* left;
    Node* right;
};

Node *creatNode(int idata){
   Node *node = new Node;
   node->data = idata;
   node->left =NULL;
   node-> right=NULL;
   return node;
}

Node *insert(Node *root, int data){
    if(root == NULL){
        return creatNode(data);
    }
    if(data < root->data){
        root->left =  insert(root->left, data);
    }else{
        root->right=  insert(root->right, data);
    }
    return root;
}

Node *root = NULL;

void inorder(Node* root){
    if(root == NULL) return;
    inorder(root->left);
    cout << root-> data << ' ';
    inorder(root->right);
}

void preorder(Node* root){
    if(root == NULL) return;
    cout << root->data << ' ';
    preorder(root->left);
    preorder(root->right);
}

void postorder(Node* root){
    if(root == NULL) return;
    postorder(root->left);
    postorder(root->right);
    cout << root->data << ' ';
}

int height(Node *root){
    if(root == NULL) return 0;
    int leftHeight = 1 + height(root->left);
    int rightHeight = 1 + height(root->right);
    return max(leftHeight, rightHeight);
}

int main(){
    int x;
    while (1)
    {
        cin >> x;
        if( x ==0 && root == NULL){cout << "What is emptier, my heart or this tree?"; return 0;}
        if(x == 0) break;
        root = insert(root, x);
    }
    cout << "Height: "<< height(root) -1;
    cout << '\n';
    cout << "Preorder: "; preorder(root);
    cout << '\n';
    cout << "Inorder: " ;inorder(root);
    cout << '\n';
    cout << "Postorder: "; postorder(root);

    return 0;
}