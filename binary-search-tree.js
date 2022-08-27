class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new Node(value);
    if (this.root) {
      let currentNode = this.root;
      while (true) {
        if (newNode.value < currentNode.value) {
          // Left
          if (!currentNode.left) {
            currentNode.left = newNode;
            return this;
          }
          currentNode = currentNode.left;
        } else {
          // Right
          if (newNode.value > currentNode.value) {
            if (!currentNode.right) {
              currentNode.right = newNode;
              return this;
            }
            currentNode = currentNode.right;
          }
        }
      }
    } else {
      this.root = newNode;
    }
  }

  lookup(value) {
    if (value !== undefined) {
      if (!this.root) {
        return false;
      }
      let currentNode = this.root;

      while (currentNode) {
        // Left
        if (value < currentNode.value) {
          currentNode = currentNode.left;
        } else if (value > currentNode.value) {
          currentNode = currentNode.right;
        } else if (value === currentNode.value) {
          return currentNode;
        }
      }
      return false;
    }
  }

  remove(value) {
    if (!this.root) {
      return false;
    }
    let currentNode = this.root;
    let parentNode = null;
    while (currentNode) {
      if (value < currentNode.value) {
        parentNode = currentNode;
        currentNode = currentNode.left;
      } else if (value > currentNode.right) {
        parentNode = currentNode;
        currentNode = currentNode.right;
      } else if (value === currentNode.value) {
        // We have a match

        // Option 1: no right child
        if (currentNode.right === null) {
          if (parentNode === null) {
            this.root = currentNode.left;
          } else {
            // if parent > current, make current left child
            // a child of parent
            if (currentNode.value < parentNode.value) {
              parentNode.left = currentNode.left;
              // if parent < current, make left child a right
              /// child of parent
            } else if (currentNode.value > parentNode.value) {
              parentNode.right = currentNode.left;
            }
          }
          // Option 2: Right child which does not have the left child
        } else if (currentNode.right.left === null) {
          if (parentNode === null) {
            this.root = currentNode.left;
          } else {
            currentNode.right.left = currentNode.left;

            // if parent > current, make right child
            // of the left the parent
            if (currentNode.value < parentNode.value) {
              parentNode.left = currentNode.right;

              // if parent < current, make right child a right child
              // of the parent
            } else if (currentNode.value > parentNode.value) {
              parentNode.right = currentNode.right;
            }
          }
          // Right
        } else {
          // Option 3: Right child that has a left child
          let leftMost = currentNode.right.left;
          let leftMostParent = currentNode.right;
          while (leftMost.left !== null) {
            leftMostParent = leftMost;
            leftMost = leftMost.left;
          }

          // Parent left subtree is now leftmost
          // right subtree
          leftMostParent.left = leftMost.right;
          leftMost.left = currentNode.left;
          leftMost.right = currentNode.right;

          if (parentNode === null) {
            this.root = leftMost;
          } else {
            if (currentNode.value < parentNode.value) {
              parentNode.left = leftMost;
            } else if (currentNode.value > parentNode.value) {
              parentNode.right = leftMost;
            }
          }
        }
        return true;
      }
    }
  }

  breadthFisrtSearch() {
    let currentNode = this.root;
    if (currentNode === null) {
      return [];
    }
    let list = [];
    let queue = [];
    queue.push(currentNode);

    while (queue.length > 0) {
      currentNode = queue.shift();
      console.log(currentNode.value);
      list.push(currentNode.value);

      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }
    console.log(list);
    return list;
  }

  breadthFisrtSearchRecursive(queue, list) {
    if (!queue.length) {
      return list;
    }

    let currentNode = queue.shift();
    list.push(currentNode.value);

    if (currentNode.left) {
      queue.push(currentNode.left);
    }

    if (currentNode.right) {
      queue.push(currentNode.right);
    }

    return this.breadthFisrtSearchRecursive(queue, list);
  }

  DfsInOrder() {
    return traverseInOrder(this.root, []);
  }

  DfsPreOrder() {
    return traversePreOrder(this.root, []);
  }

  DfsPostOrder() {
    return traversePostOrder(this.root, []);
  }
}

function traverseInOrder(node, list) {
  if (node.left) {
    traverseInOrder(node.left, list);
  }
  list.push(node.value);
  if (node.right) {
    traverseInOrder(node.right, list);
  }
  return list;
}

function traversePreOrder(node, list) {
  list.push(node.value);
  if (node.left) {
    traversePreOrder(node.left, list);
  }
  if (node.right) {
    traversePreOrder(node.right, list);
  }
  return list;
}

function traversePostOrder(node, list) {
  if (node.left) {
    traversePostOrder(node.left, list);
  }
  if (node.right) {
    traversePostOrder(node.right, list);
  }
  list.push(node.value);
  return list;
}

const myBinarySearchTree = new BinarySearchTree();
myBinarySearchTree.insert(9);
myBinarySearchTree.insert(4);
myBinarySearchTree.insert(6);
myBinarySearchTree.insert(20);
myBinarySearchTree.insert(170);
myBinarySearchTree.insert(15);
myBinarySearchTree.insert(1);
//myBinarySearchTree.breadthFisrtSearch();
console.log(
  myBinarySearchTree.breadthFisrtSearchRecursive([myBinarySearchTree.root], [])
);

function traverse(node) {
  const tree = { value: node.value };
  tree.left = node.left === null ? null : traverse(node.left);
  tree.right = node.right === null ? null : traverse(node.right);
  return tree;
}
