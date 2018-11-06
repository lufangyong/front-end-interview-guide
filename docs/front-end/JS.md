# JS

## 闭包

特性：

1. 函数嵌套函数
2. 函数内部可以引用外部的参数和变量
3. 参数和变量不会被垃圾回收机制回收

闭包的缺点就是常驻内存，会增大内存使用量，使用不当很容易造成内存泄露。

为什么要使用闭包：

1. 为了设计私有方法和变量，避免全局变量污染
2. 希望一个变量长期驻扎在内存中

[详解 js 闭包](https://segmentfault.com/a/1190000000652891)

## 创建对象

第一种：字面量

```js
var o1 = { name: 'o1' }
var o2 = new Object({ name: 'o2' })
```

第二种：构造函数

```js
var M = function(name) {
  this.name = name
}
var o3 = new M('o3')
```

第三种：Object.create

```js
var p = { name: 'o1' }
var o4 = Object.create(p)
```

## 原型链

原型链是由原型、构造函数、实例三者构成
<img :src="$withBase('/prototype.png')" alt="foo">

- 构造函数有原型对象
- 原型对象也是函数，也会有原型对象
- 构造函数访问原型对象 `Fun.prototype`
- 原型对象访问构造函数 `Fun.prototype.constructor`
- 实例化对象 `new Fun()`
- 实例访问它的构造函数的原型对象 `fn.__proto__`
- 构造函数也是函数，它也有构造函数`Function`, 是它的实例

示例代码

```js
var M = function() {}
var f1 = new M()
// 构造函数的原型对象 --> 实例的原型对象
M.prototype === f1.__proto__
// 构造函数的原型对象的构造器 --> 构造函数
M.prototype.constructor = M
//构造函数也是函数，它的构造函数是Function，是它的实例对象，实例就会有__proto__
M.prototype.__proto__ === Function.prototype
```

## instanceof

:::tip
instanceof 运算符用来判断一个构造函数的 prototype 属性所指向的对象是否存在另外一个要检测对象的原型链上
:::

- 确定原型和实例之间的关系
- 用来判断某个构造函数的 prototype(原型)属性是否存在另外一个要检测对象的原型链上

```js
function C(){}

var o = new C(){}
o instanceof C // true 因为Object.getPrototypeOf(o) === C.prototype
```

instanceof 只能用来判断对象和函数，不能用来判断字符串和数字

## isPrototypeOf

作用：检测一个对象是否是另一个对象的原型。或者说一个对象是否被包含在另一个对象的原型链中

```js
var p = { x: 1 } // 定义一个原型对象
var o = Object.create(p) // 使用这个原型创建一个对象
p.isPrototypeOf(o) //=>true：o继承p
Object.prototype.isPrototypeOf(p) // => true p继承自Object.prototype
```

## hasOwnProperty

检测集合成员的所属关系，判断某个属性是否存在于某个对象中。可以通过 in 运算符，hasOwnProperty()来完成

```js
// 定义Animal构造函数
function Animal() {}
// 定义Animal原型
Animal.prototype = {
  species: '动物',
  say: function() {
    console.log('i can say word')
  }
}
// 定义构造函数Cat
function Cat(name, color) {
  this.name = name
  this.color = color
}
var F = function() {}
F.prototype = Animal.prototype
Cat.prototype = new F()
Cat.prototype.constructor = Cat // Cat继承Animal 用F空对象作为媒介

var eh = new Cat('lili', 'white') // 实例化对象

console.log('say' in eh) // =>true
console.log('name' in eh) // =>true
console.log('color' in eh) // =>true
console.log('species' in eh) // =>true

console.log(eh.hasOwnProperty('say')) // =>false  由于say为继承属性  非自有属性
console.log(eh.hasOwnProperty('species')) // =>false 由于species为继承属性  非自有属性
console.log(eh.hasOwnProperty('name')) // =>true
console.log(eh.hasOwnProperty('color')) // =>true

for (var key in eh) {
  console.log(key)
  if (eh.hasOwnProperty(key)) {
    console.log(key) // =>species  say name  color
  }
}
```

## new 运算符

- 一个对象被创建，它继承自 foo.prototype
- 构造函数 foo 被执行，执行的时候，相应的传参会被传入，同时上下文(this)会被指定为这个新实例。new foo 等同于 new foo()，只能在用不传递任何参数的情况
- 如果构造函数返回了一个对象，那么这个对象会取代整个 new 出来的结果，如果构造函数没有返回对象，那么 new 出来的结果为继承 foo.prototype

模拟 new 操作符的背后实现的原理

```js
var new2 = function(func) {
  // 继承它的原型对象
  var o = Object.create(func.prototype)
  // 改变它的上下文
  var k = func.call(o)
  // 如果构造函数返回的是对象就返回这个对象，不是就直接返回继承原型的对象
  if (typeof k === 'object') {
    return k
  } else {
    return o
  }
}
```

## 作用域链

- 作用域链的作用是保证执行环境里有权访问的变量和函数是有序的
- 作用域链的变量只能向上访问
- 变量访问到 window 对象即被终止
- 作用域链向下访问变量是不被允许的

## js 继承方式

- 原型链继承的缺点
- 一是字面量重写原型会中断关系，使用引用类型的原型，并且子类型还无法给超类型传递参数。
- 借用构造函数（类式继承）
  - 借用构造函数虽然解决了刚才两种问题，但没有原型，则复用无从谈起。所以我们需要原型链+借用构造函数的模式，这种模式称为组合继承
- 组合式继承
  - 组合式继承是比较常用的一种继承方法，其背后的思路是 使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承。这样，既通过在原型上定义方法实现了函数复用，又保证每个实例都有它自己的属性。

**如果如不用 es6，比较好的继承方式：**

```js
// Object.create只兼容到ie9
function create(o) {
  if (Object.create) {
    Object.create(o)
  } else {
    function F() {}
    F.prototype = o
    return new F()
  }
}

// 定义一个动物类
function Animal(name) {
  // 属性
  this.name = name
  // 实例方法
  this.sleep = function() {
    console.log(this.name + '正在睡觉！')
  }
}

function Cat(name) {
  Animal.call(this)
  Cat.name = name || 'Tom'
}
// 创建一个独立而且又继承了父类的原型对象
Cat.prototype = create(Animal.prototype)
```

[JavaScript 继承方式详解](https://segmentfault.com/a/1190000002440502)

## 类与实例

类的声明

```js
var Animal = function() {
  this.name = 'Animal'
}
```

es6 中 class 的声明

```js
class Animal2 {
  constructor() {
    this.name = 'Animal2'
  }
}
```

生成实例

```js
new Animal()
new Animal2()
```

## 类与继承

::: tip
万变不离其宗，实现类的继承的原理就是使用原型链的特性，没有原型就不会有构造函数，所以理解原型链是基础
:::

- 借助构造函数实现继承
- 实现的原理：在子类中执行父类，并且改变 this 的指向，把父类的属性和方法挂载到子类中
- 缺点：只能部分继承，继承父类构造函数里面的属性和方法，无法继承父类原型链中的属性和方法

```js
function Parent1() {
  this.name = 'parent1'
}
Parent1.prototype.say = function() {}
function Child1() {
  Parent1.call(this) // apply
  this.type = 'child1'
}
console.log(new Child1(), new Child1.say()) // 这里会报错，Child1没有say方法
```

- 借助原型链实现继承
- 实现原理：把父类中的实例化对象赋值给子类中的原型
- new Child2.**proto** = Child2.prototype
- Child2.prototype = new Parent2();
- 所以实例子类就是变相的实例父类
- 实例子类的原型最终指向父类
- 缺点：子类的原型对象都指向同一个，这是不符合我们的需求的，改变一个，都会改变，失却了面向对象的意义

```js
function Parent2()P{
    this.type = 'patent2';
}
function Child2(){
    this.type = 'child2';
    this.say = [1, 2, 3];
}
Child2.prototype = new Parent2();
var s1 = new Child2():
var s2 = new Child2();
console.log(s1.say(), s2.say());
s1.paly.push(4);
// 改变s1中的say方法，s2也被改变了
// 因为它们共用一个原型对象
// s1.__proto === s2.__proto true
```

- 组合方式
- 结合前面两种方式的继承
- 解决它们之间的缺点

```js
function Parent3() {
  this.name = 'patent3'
  this.say = [1, 2, 3]
}
function Child3() {
  Parent3.call(this)
  this.type = 'child3'
}
// 创建出一个独立而且又继承了父类的原型对象
Child3.prototype = Object.create(Parent3.prototype)
//Child3.prototype = Parent3.prototype 使用的是同一个父类的原型对象，没有独立开来
// 改变子类中的constructor的指向
Child3.prototype.constructor = Child3
```

## async 和 defer

相同：

- `defer`与`async`的相同点是采用并行下载，在下载过程中不会产生阻塞。

不同：

- 在于执行时机，`async`是加载完成后自动执行，而`defer`需要等待页面完成后执行。

## import 与 require

es6 的导入 import 导出 exports 与 require、module.exports 的区别?

- ES6 Module 中导入模块的属性或者方法是强绑定的，包括基础类型；而 CommonJS 则是普通的值传递或者引用传递。
- CommonJS 模块是运行时的，导入导出是通过值的复制来达成的。ES6 的模块是静态的，导入导出实际上是建立符号的映射
- import 必须放在文件最顶部，require 不需要；import 最终会被 babel 编译为 require

## Promise 实现原理

现在回顾下 Promise 的实现过程，其主要使用了设计模式中的观察者模式：

- 通过`Promise.prototype.then`和`Promise.prototype.catch`方法将观察者方法注册到被观察者 Promise 对象中，同时返回一个新的 Promise 对象，以便可以链式调用。
- 被观察者管理内部 pending、fulfilled 和 rejected 的状态转变，同时通过构造函数中传递的 resolve 和 reject 方法以主动触发状态转变和通知观察者。
- `Promise.then()`是异步调用的，这也是 Promise 设计上规定的，其原因在于同步调用和异步调用同时存在会导致混乱。
- 为了暂停当前的 promise，或者要它等待另一个 promise 完成，只需要简单地在 then() 函数中返回另一个 promise。

Promise 的缺点

- 首先，无法取消 Promise，一旦新建它就会立即执行，无法中途取消。
- 其次，如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。
- 第三，当处于 Pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

一般来说，不要在 then 方法里面定义 Reject 状态的回调函数（即 then 的第二个参数），总是使用 catch 方法，理由是更接近同步的写法。
then 的第二个函数参数和 catch 等价

**Promise.all 和 Promise.race 的区别？**

- Promise.all 把多个 promise 实例当成一个 promise 实例,当这些实例的状态都发生改变时才会返回一个新的 promise 实例，才会执行 then 方法。
- Promise.race 只要该数组中的 Promise 对象的状态发生变化（无论是 resolve 还是 reject）该方法都会返回。

## apply、call 和 bind

三者都可以把一个函数应用到其他对象上:

- call、apply 是修改函数的作用域（修改 this 指向），并且立即执行
- bind 是返回了一个新的函数，不是立即执行
- apply 和 call 的区别是 apply 接受数组作为参数
- call 是接受逗号分隔的无限多个参数列表

```javascript
Array.prototype.slice.call(null, args)

function getMax(arr) {
  return Math.max.apply(null, arr)
}
//call
function foo() {
  console.log(this) //{id: 42}
}

foo.call({ id: 42 })
```

如果该方法是非严格模式代码中的函数，则 null 和 undefined 将替换为全局对象，并且原始值将被包装。
当你调用 apply 传递给它 null 时，就像是调用函数而不提供任何对象

## 异步函数

async，Promise，Generator 函数，co 函数库区别

- `async...await`写法最简洁，最符合语义。
- async/await 让异步代码看起来、表现起来更像同步代码，这正是其威力所在。
- async 函数就是 Generator 函数的语法糖，只不过 async 内置了自动执行器。async 函数就是将 Generator 函数的星号（\*）替换成 async，将 yield 替换成 await

**async 函数优点**

1. Generator 函数必须靠执行器，所以才有 CO 函数库，async 函数自带执行器
2. 更好的语义
3. 更广的适用性。co 函数库 yield 后面只能是 Thunk 函数或者 Promise 对象，await 后面可以跟 Promise 对象和原始类型值（等同于同步操作）
4. Generator 函数：可以把它理解成一个函数的内部状态的遍历器，Generator 重点在解决异步回调金字塔问题，巧妙的使用它可以写出看起来同步的代码。

## 观察者模式

JS 里对观察者模式的实现是通过回调来实现的，，它定义了一种一对多的关系，让多个观察者对象同时监听某一个主题对象

观察者模式：

- 对程序中某一个对象的进行实时的观察，当该对象状态发生改变的时候 进行通知
- 我们为什么要用观察者模式呢，主要是可以实现松散耦合的代码，什么意思？就是
- 主体和订阅者之间是相互独立的，其二者可以独立运行。

## 什么是同构

同构(isomorphic/universal)就是使前后端运行同一套代码的意思，后端一般是指 NodeJS 环境。

## ES6

### let 与 var 和 const

- let 为 ES6 新添加申明变量的命令，它类似于 var，但是有以下不同：
- let 命令不存在变量提升，如果在 let 前使用，会导致报错
- 暂时性死区的本质，其实还是块级作用域必须“先声明后使用”的性质。
- let，const 和 class 声明的全局变量不是全局对象的属性。

const 声明的变量与 let 声明的变量类似，它们的不同之处在于，const 声明的变量只可以在声明时赋值，不可随意修改，否则会导致 SyntaxError（语法错误）。

const 只是保证变量名指向的地址不变，并不保证该地址的数据不变。const 可以在多个模块间共享

let 暂时性死区的原因：var 会变量提升，let 不会。

### 箭头函数

- 箭头函数不属于普通的 function，所以没有独立的上下文。箭头函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象。
- 由于箭头函数没有自己的 this，函数对象中的 call、apply、bind 三个方法，无法"覆盖"箭头函数中的 this 值。
- 箭头函数没有原本(传统)的函数有的隐藏 arguments 对象。
- 箭头函数不能当作 generators 使用，使用 yield 会产生错误。

在以下场景中不要使用箭头函数去定义：

- 定义对象方法、定义原型方法、定义构造函数、定义事件回调函数。
- 箭头函数里不但没有 this，也没有 arguments, super ……

### Symbol，Map 和 Set

- Map 对象保存键值对。一个对象的键只能是字符串或者 Symbols，但一个 Map 的键可以是任意值。
- Set 对象允许你存储任何类型的唯一值，Set 对象是值的集合，Set 中的元素只会出现一次
- Symbol 是一种特殊的、不可变的数据类型，可以作为对象属性的标识符使用(Symbol([description]) )

```javascript
let mySet = new Set()
mySet.add(1)
mySet.add('hello')
mySet.add('hello')
console.log(mySet.size) //2
console.log(mySet) //Set {1,'hello'}

//Map保存键值对也不能有重复的
let myMap = new Map()
let key1 = 'China',
  key2 = 'America'
myMap.set(key1, 'welcome')
myMap.set(key2, 'gold bless you')
console.log(myMap) //Map { 'China' => 'welcome', 'America' => 'gold bless you' }
console.log(myMap.get(key1)) //welcome
console.log(myMap.get(key2)) //gold bless you

let mySymbol = Symbol('symbol1')
let mySymbol2 = Symbol('symbol1')
console.log(mySymbol == mySymbol2) //false
//Symbols 在 for...in 迭代中不可枚举。
let obj = {}
obj['c'] = 'c'
obj.d = 'd'
obj[Symbol('a')] = 'a'
obj[Symbol.for('b')] = 'b'
for (let k in obj) {
  console.log(k) //logs 'c' and 'd'
}
```

`for...of`可以用来遍历数组，类数组对象，argument，字符串，Map 和 Set，`for...in`用来遍历对象

### proxy(代理)

Proxy(代理) 是 ES6 中新增的一个特性。Proxy 让我们能够以简洁易懂的方式控制外部对对象的访问。其功能非常类似于设计模式中的代理模式。

使用 Proxy 的好处是：

- 对象只需关注于核心逻辑，一些非核心的逻辑（如：读取或设置对象的某些属性前记录日志；设置对象的某些属性值前，需要验证；某些属性的访问控制等）可以让 Proxy 来做。
- 从而达到关注点分离，降级对象复杂度的目的。

使用方法

```js
var p = new Proxy(target, handler)
```

其中，target 为被代理对象。handler 是一个对象，其声明了代理 target 的一些操作。p 是代理后的对象。

当外界每次对 p 进行操作时，就会执行 handler 对象上的一些方法。handler 能代理的一些常用的方法如下：

- get：读取
- set：修改
- has：判断对象是否有该属性
- construct：构造函数

使用场景：

- 实现私有变量
- 抽离校验模块

实现私有变量，实现了真正的私有变量。代理中把以 \_ 开头的变量都认为是私有的

```js
var api = {
  _secret: 'xxxx',
  _otherSec: 'bbb',
  ver: 'v0.0.1'
}

api = new Proxy(api, {
  get: function(target, key) {
    // 以 _ 下划线开头的都认为是 私有的
    if (key.startsWith('_')) {
      console.log('私有变量不能被访问')
      return false
    }
    return target[key]
  },
  set: function(target, key, value) {
    if (key.startsWith('_')) {
      console.log('私有变量不能被修改')
      return false
    }
    target[key] = value
  },
  has: function(target, key) {
    return key.startsWith('_') ? false : key in target
  }
})

api._secret // 私有变量不能被访问
console.log(api.ver) // v0.0.1
api._otherSec = 3 // 私有变量不能被修改
console.log('_secret' in api) // true
console.log('ver' in api) // false
```

抽离校验模块，实现了在代理中实现设置属性值前做验证。

```js
function Animal() {
  return createValidator(this, animalValidator)
}
var animalValidator = {
  name: function(name) {
    // 动物的名字必须是字符串类型的
    return typeof name === 'string'
  }
}

function createValidator(target, validator) {
  return new Proxy(target, {
    set: function(target, key, value) {
      if (validator[key]) {
        // 符合验证条件
        if (validator[key](value)) {
          target[key] = value
        } else {
          throw Error(`Cannot set ${key} to ${value}. Invalid.`)
        }
      } else {
        target[key] = value
      }
    }
  })
}

var dog = new Animal()
dog.name = 'dog'
console.log(dog.name)
dog.name = 123 // Uncaught Error: Cannot set name to 123. Invalid.
```
