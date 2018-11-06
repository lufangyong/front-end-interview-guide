# 美团、饿了么面试

## 美团

### 事件循环

> 浏览器中, js 引擎线程会循环从 任务队列 中读取事件并且执行, 这种运行机制称作 Event Loop (事件循环).

- 每个浏览器环境，至多有一个 event loop。
- 一个 event loop 可以有 1 个或多个 task queue(任务队列)
- 先执行同步的代码，然后 js 会跑去消息队列中执行异步的代码，异步完成后，再轮到回调函数，然后是去下个事件循环中执行 setTimeout
- 它从 script(整体代码)开始第一次循环。之后全局上下文进入函数调用栈。直到调用栈清空(只剩全局)，然后执行所有的 micro-task。当所有可执行的 micro-task 执行完毕之后。循环再次从 macro-task 开始，找到其中一个任务队列执行完毕，然后再执行所有的 micro-task，这样一直循环下去。
- 从规范上来讲，setTimeout 有一个 4ms 的最短时间，也就是说不管你设定多少，反正最少都要间隔 4ms 才运行里面的回调。而 Promise 的异步没有这个问题。Promise 所在的那个异步队列优先级要高一些
- Promise 是异步的，是指他的 then()和 catch()方法，Promise 本身还是同步的
- Promise 的任务会在当前事件循环末尾中执行，而 setTimeout 中的任务是在下一次事件循环执行

```javascript
//依次输出 12354
setTimeout(function() {
  console.log(4)
}, 0)
new Promise(function(resolve) {
  console.log(1)
  for (var i = 0; i < 10000; i++) {
    i === 9999 && resolve()
  }
  console.log(2)
}).then(function() {
  console.log(5)
})
console.log(3)
```

### 问题

- xss 和 csrf
- 事件捕获的应用
- jsx 的优点
- webpack loader 和 plugin 区别
- 性能优化
- react 和 vue 的区别
- vue component 和指令的区别
- vue 组件通信
- box-sizing
- jsonp 缺点，为什么不能用 POST
- vue-router 的实现原理
- es6 用了哪些新特性
- cookie 和 localStorage 区别
- git fetch 是干嘛的
- 事件代理和冒泡，捕获
- 304 是干嘛的 具体，405 504 又是干嘛的
- BFC、IFC
- 其他（自我介绍，为啥离职，为啥从美团离职，git 工作流，code review，单元测试）
- react 组件生命周期
- 伪类和伪元素的区别
  - CSS 伪类：逻辑上存在但在文档树中却无须标识的“幽灵”分类
  - CSS 伪元素（`:first-letter，:first-line,:after,:before`）代表了某个元素的子元素，这个子元素虽然在逻辑上存在，但却并不实际存在于文档树中。
  - CSS3 标准要求伪元素使用双冒号
- em 和 rem

## 饿了么面试

### 1. 什么是类数组对象，如何将类数组对象转为真正的数组

- 拥有 length 属性和若干索引属性的对象
- 类数组只有索引值和长度，没有数组的各种方法，所以如果要类数组调用数组的方法，就需要使用 Array.prototype.method.call 来实现。

```javascript
var arrayLike = { 0: 'name', 1: 'age', 2: 'sex', length: 3 }
// 1. slice
Array.prototype.slice.call(arrayLike) // ["name", "age", "sex"]
// 2. splice
Array.prototype.splice.call(arrayLike, 0) // ["name", "age", "sex"]
// 3. ES6 Array.from
Array.from(arrayLike) // ["name", "age", "sex"]
// 4. apply
Array.prototype.concat.apply([], arrayLike)
```

### 2. 跨域

- 域名、端口号、协议，只要有一个不同就存在跨域

### 3. 伪元素和伪类

伪类用于当已有元素处于的某个状态时，为其添加对应的样式，这个状态是根据用户行为而动态变化的。

```css
a:link
:first-child
:nth-child
:focus
:visited
```

伪元素代表了某个元素的子元素，这个子元素虽然在逻辑上存在，但却并不实际存在于文档树中。

### 4. bind 返回什么

- bind() 方法会返回一个新函数, 又叫绑定函数, 当调用这个绑定函数时, 绑定函数会以创建它时传入 bind()
- 方法的第一个参数作为当前的上下文, 即 this, 传入 bind() 方法的第二个及之后的参数加上绑定函数运行时自身的参数按照顺序作为原函数的参数来调用原函数.

```javascript
var x = 8
var o = {
  x: 10,
  getX: function() {
    console.log(this.x)
  }
}
var f = o.getX
f() //8, 由于没有绑定执行时的上下文, this默认指向window, 打印了全局变量x的值
var g = f.bind(o)
g() //10, 绑定this后, 成功的打印了o对象的x属性的值.
```

### 5. git rebase 和 git merge 的区别

merge 操作会生成一个新的节点，之前的提交分开显示。而 rebase 操作不会生成新的节点，是将两个分支融合成一个线性的提交。

### 6. 箭头函数

- 箭头函数没有它自己的 this 值，箭头函数内的 this 值继承自外围作用域
- 箭头函数不能用作构造器，不能和 new 一起使用
- 箭头函数没有原型属性
- yield 关键字不能在箭头函数使用
- 在以下场景中不要使用箭头函数去定义：
  - 定义对象方法、定义原型方法、定义构造函数、定义事件回调函数。

### 7. == 和`===`的区别

- 相等运算符在比较相同类型的数据时，与严格相等运算符完全一样。
- 在比较不同类型的数据时，相等运算符会先将数据进行类型转换，然后再用严格相等运算符比较。

### new 操作符具体做了什么

1. 创建一个空对象，并且 `this` 变量引用该对象，同时继承了该函数的原型（实例对象通过`__proto__`属性指向原型对象；`obj.__proto__ = Base.prototype;`）
2. 属性和方法被加入到 this 引用的对象中

```js
function Animal(name) {
    this.name = name;
}

Animal.prototype.run = function() {
    console.log(this.name + 'can run...');
}

var cat = new Animal('cat');
//模拟过程
new Animal('cat')=function(){
    let obj={};  //创建一个空对象
    obj.__proto__=Animal.prototype;
    //把该对象的原型指向构造函数的原型对象，就建立起原型了：obj->Animal.prototype->Object.prototype->null
    return Animal.call(obj,'cat');// 绑定this到实例化的对象上
}
```

### 谈谈你对组件的看法

一个组件应该有以下特征：

- 可组合（Composeable）：一个组件易于和其它组件一起使用，或者嵌套在另一个组件内部。如果一个组件内部创建了另一个组件，那么说父组件拥有（own）它创建的子组件，通过这个特性，一个复杂的 UI 可以拆分成多个简单的 UI 组件；
- 可重用（Reusable）：每个组件都是具有独立功能的，它可以被使用在多个 UI 场景；
- 可维护（Maintainable）：每个小的组件仅仅包含自身的逻辑，更容易被理解和维护；
- 可测试（Testable）：因为每个组件都是独立的，那么对于各个组件分别测试显然要比对于整个 UI 进行测试容易的多。
