# 数据结构

## 栈
数组是计算机科学中最常用的数据结构。我们知道，可以在数组的任意位置上删除或添加元素。然而，有时候我们还需要一种在添加或删除元素时有更多控制的数据结构。有两种数据结构类似于数组，但在添加和删除元素时更为可控。它们就是栈和队列。

### 栈数据结构
栈是一种遵从后进先出（LIFO）原则的有序集合。新添加的或待删除的元素都保存在栈的
同一端，称作栈顶，另一端就叫栈底。在栈里，新元素都靠近栈顶，旧元素都接近栈底。

在现实生活中也能发现很多栈的例子。例如，下图里的一摞书或者餐厅里堆放的盘子。

### 创建栈
```js
class Stack {
  constructor() {
    this.stack = []
  }
  // 添加一个（或几个）新元素到栈顶
  push(item) {
    this.stack.push(item)
  }
  // 移除栈顶的元素，同时返回被移除的元素
  pop() {
    this.stack.pop()
  }
  // 返回栈顶的元素，不对栈做任何修改（这个方法不会移除栈顶的元素，仅仅返回它）
  peek() {
    return this.stack[this.getCount() - 1]
  }
  // 如果栈里没有任何元素就返回 true ，否则返回 false
  isEmpty() {
    return this.getCount() === 0
  }
  // 返回栈里的元素个数。这个方法和数组的 length 属性很类似
  size() {
    return this.stack.length
  }
  // 移除栈里的所有元素
  clear() {
    this.stack = [];
  }
}
```

### 应用
[选取了 LeetCode 上序号为 20 的题目](https://leetcode-cn.com/problems/valid-parentheses/description/)

给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

有效字符串需满足：
1. 左括号必须用相同类型的右括号闭合。
2. 左括号必须以正确的顺序闭合。
3. 注意空字符串可被认为是有效字符串。

```js
function isValid(str) {
  let map = {'(': -1, ')': 1, '{': -2, '}': 2, '[': -3, ']': 3};
  let stack = [];

  for (let i = 0; i < str.length; i++) {
    if (map[str[i]] < 0) {
      stack.push(str[i]);
    } else {
      let last = stack.pop();
      if (map[last] + map[s[i]] != 0) return false;
    }
  }
  if (stack.length > 0) return false;
  return true;
}
```

## 队列
### 队列数据结构
队列是遵循FIFO（First In First Out，先进先出，也称为先来先服务）原则的一组有序的项。
队列在尾部添加新元素，并从顶部移除元素。最新添加的元素必须排在队列的末尾。

在现实中，最常见的队列的例子就是排队：

还有，在电影院、自助餐厅、杂货店收银台，我们也都会排队。排在第一位的人会先接受
服务。

在计算机科学中，一个常见的例子就是打印队列。比如说我们需要打印五份文档。我们会打
开每个文档，然后点击打印按钮。每个文档都会被发送至打印队列。第一个发送到打印队列的文
档会首先被打印，以此类推，直到打印完所有文档。

### 创建队列
```js
class Queue() {
  constructor() {
    this.queue = []
  }
  // 向队列尾部添加一个（或多个）新的项
  enqueue(item) {
    this.queue.push(item)
  }
  // 移除队列的第一（即排在队列最前面的）项，并返回被移除的元素
  dequeue() {
    return this.queue.shift()
  }
  // 返回队列中第一个元素——最先被添加，也将是最先被移除的元素。队列不做任何变动（不移除元素，只返回元素信息——与 Stack 类的 peek 方法非常类似）
  front() {
    return this.queue[0]
  }
  // 如果队列中不包含任何元素，返回 true ，否则返回 false
  isEmpty() {
    return this.queue.length === 0
  }
  // 返回队列包含的元素个数，与数组的 length 属性类似
  size() {
    return this.queue.length
  }
}
```
