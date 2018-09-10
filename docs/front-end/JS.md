# JS

## 闭包

特性：
1. 函数嵌套函数
2. 函数内部可以引用外部的参数和变量
3. 参数和变量不会被垃圾回收机制回收

闭包的缺点就是常驻内存，会增大内存使用量，使用不当很容易造成内存泄露。

为什么要使用闭包：

为了设计私有方法和变量，避免全局变量污染
希望一个变量长期驻扎在内存中

[详解js闭包]( https://segmentfault.com/a/1190000000652891)

## 原型链

当从一个对象那里调取属性或方法时，如果该对象自身不存在这样的属性或方法，就会去自己关联的`prototype`对象那里寻找，如果prototype没有，就会去prototype关联的前辈prototype那里寻找，如果再没有则继续查找`Prototype.Prototype`引用的对象，依次类推，直到Prototype.….Prototype为undefined（Object的Prototype就是undefined）从而形成了所谓的“原型链”。

其中foo是Function对象的实例。而Function的原型对象同时又是Object的实例。这样就构成了一条原型链。

## instanceof
确定原型和实例之间的关系

用来判断某个构造函数的prototype属性是否存在另外一个要检测对象的原型链上

对象的`__proto__`指向自己构造函数的prototype。`obj.__proto__.__proto__...`的原型链由此产生，包括我们的操作符instanceof正是通过探测`obj.__proto__.__proto__... === Constructor.prototype`来验证obj是否是Constructor的实例。

```js
function C(){}

var o = new C(){}
//true 因为Object.getPrototypeOf(o) === C.prototype
o instanceof C
```
instanceof只能用来判断对象和函数，不能用来判断字符串和数字

## isPrototypeOf

用于测试一个对象是否存在于另一个对象的原型链上。

判断父级对象   可检查整个原型链

## 作用域链

作用域链的作用是保证执行环境里有权访问的变量和函数是有序的，作用域链的变量只能向上访问，变量访问到window对象即被终止，作用域链向下访问变量是不被允许的。

## js继承方式

- 原型链继承的缺点
 - 一是字面量重写原型会中断关系，使用引用类型的原型，并且子类型还无法给超类型传递参数。
- 借用构造函数（类式继承）
  - 借用构造函数虽然解决了刚才两种问题，但没有原型，则复用无从谈起。所以我们需要原型链+借用构造函数的模式，这种模式称为组合继承
- 组合式继承
  - 组合式继承是比较常用的一种继承方法，其背后的思路是 使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承。这样，既通过在原型上定义方法实现了函数复用，又保证每个实例都有它自己的属性。

[JavaScript继承方式详解](https://segmentfault.com/a/1190000002440502)

## ES6
### let与var和const

- let为ES6新添加申明变量的命令，它类似于var，但是有以下不同：
- let命令不存在变量提升，如果在let前使用，会导致报错
- 暂时性死区的本质，其实还是块级作用域必须“先声明后使用”的性质。
- let，const和class声明的全局变量不是全局对象的属性。

const声明的变量与let声明的变量类似，它们的不同之处在于，const声明的变量只可以在声明时赋值，不可随意修改，否则会导致SyntaxError（语法错误）。

const只是保证变量名指向的地址不变，并不保证该地址的数据不变。const可以在多个模块间共享

let 暂时性死区的原因：var 会变量提升，let 不会。

### 箭头函数

- 箭头函数不属于普通的 function，所以没有独立的上下文。箭头函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
- 由于箭头函数没有自己的this，函数对象中的call、apply、bind三个方法，无法"覆盖"箭头函数中的this值。
- 箭头函数没有原本(传统)的函数有的隐藏arguments对象。
- 箭头函数不能当作generators使用，使用yield会产生错误。

在以下场景中不要使用箭头函数去定义：

- 定义对象方法、定义原型方法、定义构造函数、定义事件回调函数。
- 箭头函数里不但没有 this，也没有 arguments, super ……

### Symbol，Map和Set

- Map 对象保存键值对。一个对象的键只能是字符串或者 Symbols，但一个 Map 的键可以是任意值。
- Set 对象允许你存储任何类型的唯一值，Set对象是值的集合，Set中的元素只会出现一次
- Symbol 是一种特殊的、不可变的数据类型，可以作为对象属性的标识符使用(Symbol([description]) )

```javascript
let mySet = new Set()
mySet.add(1)
mySet.add('hello')
mySet.add('hello')
console.log(mySet.size);//2
console.log(mySet);//Set {1,'hello'}

//Map保存键值对也不能有重复的
let myMap = new Map();
let key1 = 'China',key2 = 'America';
myMap.set(key1,'welcome')
myMap.set(key2,'gold bless you')
console.log(myMap);//Map { 'China' => 'welcome', 'America' => 'gold bless you' }
console.log(myMap.get(key1));//welcome
console.log(myMap.get(key2));//gold bless you

let mySymbol = Symbol('symbol1');
let mySymbol2 = Symbol('symbol1');
console.log(mySymbol == mySymbol2);//false
//Symbols 在 for...in 迭代中不可枚举。
let obj = {}
obj['c'] = 'c'
obj.d ='d'
obj[Symbol('a')] = 'a'
obj[Symbol.for('b')] = 'b'
for(let k in obj){
    console.log(k);//logs 'c' and 'd'
}
```

`for...of`可以用来遍历数组，类数组对象，argument，字符串，Map和Set，`for...in`用来遍历对象

### proxy(代理)
Proxy(代理) 是 ES6 中新增的一个特性。Proxy 让我们能够以简洁易懂的方式控制外部对对象的访问。其功能非常类似于设计模式中的代理模式。

使用 Proxy 的好处是：
- 对象只需关注于核心逻辑，一些非核心的逻辑（如：读取或设置对象的某些属性前记录日志；设置对象的某些属性值前，需要验证；某些属性的访问控制等）可以让 Proxy 来做。
- 从而达到关注点分离，降级对象复杂度的目的。

使用方法
```js
var p = new Proxy(target, handler);
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

实现私有变量，实现了真正的私有变量。代理中把以 _ 开头的变量都认为是私有的
```js
var api = {
  _secret: 'xxxx',
  _otherSec: 'bbb',
  ver: 'v0.0.1'
};

api = new Proxy(api, {
  get: function(target, key) {
    // 以 _ 下划线开头的都认为是 私有的
    if (key.startsWith('_')) {
      console.log('私有变量不能被访问');
      return false;
    }
    return target[key];
  },
  set: function(target, key, value) {
    if (key.startsWith('_')) {
      console.log('私有变量不能被修改');
      return false;
    }
    target[key] = value;
  },
  has: function(target, key) {
    return key.startsWith('_') ? false : (key in target);
  }
});

api._secret; // 私有变量不能被访问
console.log(api.ver); // v0.0.1
api._otherSec = 3; // 私有变量不能被修改
console.log('_secret' in api); // true
console.log('ver' in api); // false
```

抽离校验模块，实现了在代理中实现设置属性值前做验证。
```js
function Animal() {
  return createValidator(this, animalValidator);
}
var animalValidator = {
  name: function(name) {
    // 动物的名字必须是字符串类型的
    return typeof name === 'string';
  }
};

function createValidator(target, validator) {
  return new Proxy(target, {
    set: function(target, key, value) {
      if (validator[key]) {
        // 符合验证条件
        if (validator[key](value)) {
          target[key] = value;
        } else {
          throw Error(`Cannot set ${key} to ${value}. Invalid.`);
        }
      } else {
        target[key] = value
      }
    }
  });
}

var dog = new Animal();
dog.name = 'dog';
console.log(dog.name);
dog.name = 123; // Uncaught Error: Cannot set name to 123. Invalid.
```

## 跨域
:::tip
script、image、iframe的src都不受同源策略的影响。
:::

1. JSONP,回调函数+数据就是 JSON With Padding，简单、易部署。（做法：动态插入script标签，设置其src属性指向提供JSONP服务的URL地址，查询字符串中加入 callback 指定回调函数，返回的 JSON 被包裹在回调函数中以字符串的形式被返回，需将script标签插入body底部）。缺点是只支持GET，不支持POST（原因是通过地址栏传参所以只能使用GET）
2. document.domain 跨子域 （ 例如a.qq.com嵌套一个b.qq.com的iframe ，如果a.qq.com设置document.domain为qq.com 。b.qq.com设置document.domain为qq.com， 那么他俩就能互相通信了，不受跨域限制了。 注意：只能跨子域）
3. window.name + iframe ==> http://www.tuicool.com/articles/viMFbqV，支持跨主域。不支持POST
4. HTML5的postMessage()方法允许来自不同源的脚本采用异步方式进行有限的通信，可以实现跨文本档、多窗口、跨域消息传递。适用于不同窗口iframe之间的跨域
5. CORS（Cross Origin Resource Share）对方服务端设置响应头
6. 服务端代理

在浏览器客户端不能跨域访问，而服务器端调用HTTP接口只是使用HTTP协议，不会执行JS脚本，不需要同源策略，也就没有跨越问题。简单地说，就是浏览器不能跨域，后台服务器可以跨域。（一种是通过http-proxy-middleware插件设置后端代理；另一种是通过使用http模块发出请求）

CORS请求默认不发送Cookie和HTTP认证信息。如果要把Cookie发到服务器，一方面要服务器同意，指定`Access-Control-Allow-Credentials`字段。

## Cookie

```javascript
Set-Cookie: value[; expires=date][; domain=domain][; path=path][; secure]
```

如果想让cookie存在一段时间，就要为expires属性设置为未来的一个用毫秒数表示的过期日期或时间点，expires默认为设置的expires的当前时间。现在已经被max-age属性所取代，max-age用秒来设置cookie的生存期。如果max-age为0，则表示删除该cookie。

cookie的属性：
- HttpOnly属性告之浏览器该 cookie 绝不能通过 JavaScript 的 `document.cookie` 属性访问。
- domain属性可以使多个web服务器共享cookie。
- 只有path属性匹配向服务器发送的路径，Cookie 才会发送。必须是绝对路径
- secure属性用来指定Cookie只能在加密协议HTTPS下发送到服务器。
- max-age属性用来指定Cookie有效期
- expires属性用于指定Cookie过期时间。它的格式采用Date.toUTCString()的格式。

浏览器的同源政策规定，两个网址只要域名相同和端口相同，就可以共享Cookie。

## websocket

WebSocket 使用ws或wss协议，Websocket是一个持久化的协议，相对于HTTP这种非持久的协议来说。

WebSocket API最伟大之处在于服务器和客户端可以在给定的时间范围内的任意时刻，相互推送信息。WebSocket并不限于以Ajax(或XHR)方式通信，因为Ajax技术需要客户端发起请求，而WebSocket服务器和客户端可以彼此相互推送信息；XHR受到域的限制，而WebSocket允许跨域通信。

```javascript
// 创建一个Socket实例
var socket = new WebSocket('ws://localhost:8080');
// 打开Socket
socket.onopen = function(event) {
  // 发送一个初始化消息
  socket.send('I am the client and I\'m listening!');
  // 监听消息
  socket.onmessage = function(event) {
    console.log('Client received a message',event);
  };
  // 监听Socket的关闭
  socket.onclose = function(event) {
    console.log('Client notified socket has closed',event);
  };
  // 关闭Socket....
  //socket.close()
};
```

## async和defer

defer 与 async 的相同点是采用并行下载，在下载过程中不会产生阻塞。区别在于执行时机，async 是加载完成后自动执行，而 defer 需要等待页面完成后执行。

## 观察者模式

JS里对观察者模式的实现是通过回调来实现的，，它定义了一种一对多的关系，让多个观察者对象同时监听某一个主题对象

观察者模式：
- 对程序中某一个对象的进行实时的观察，当该对象状态发生改变的时候 进行通知
- 我们为什么要用观察者模式呢，主要是可以实现松散耦合的代码，什么意思？就是
- 主体和订阅者之间是相互独立的，其二者可以独立运行。

## fetch和Ajax

`XMLHttpRequest` 是一个设计粗糙的 API，不符合关注分离（Separation of Concerns）的原则，配置和调用方式非常混乱，而且基于事件的异步模型写起来也没有现代的 Promise，`generator/yield`，`async/await` 友好。

fetch 是浏览器提供的一个新的 web API，它用来代替 Ajax（XMLHttpRequest），其提供了更优雅的接口，更灵活强大的功能。

Fetch 优点主要有：
- 语法简洁，更加语义化
- 基于标准 Promise 实现，支持 `async/await`

```javascript
fetch(url).then(response => response.json())
  .then(data => console.log(data))
  .catch(e => console.log("Oops, error", e))
```

##  ajax请求和原理

```javascript
var xhr = new XMLHTTPRequest();
// 请求 method 和 URI
xhr.open('GET', url);
// 请求内容
xhr.send();
// 响应状态
xhr.status
// xhr 对象的事件响应
xhr.onreadystatechange = function() {}
xhr.readyState
// 响应内容
xhr.responseText
```
AJAX的工作原理

Ajax的工作原理相当于在用户和服务器之间加了—个中间层(AJAX引擎),使用户操作与服务器响应异步化。　Ajax的原理简单来说通过XmlHttpRequest对象来向服务器发异步请求，从服务器获得数据，然后用javascript来操作DOM而更新页面。

ajax优缺点

优点：
- 无刷新更新数据
- 异步与服务器通信
- 前后端负载均衡

缺点：

1. ajax干掉了Back和history功能，对浏览器机制的破坏
2. 对搜索引擎支持较弱
3. 违背了URI和资源定位的初衷

## Promise实现原理

现在回顾下Promise的实现过程，其主要使用了设计模式中的观察者模式：

- 通过`Promise.prototype.then`和`Promise.prototype.catch`方法将观察者方法注册到被观察者Promise对象中，同时返回一个新的Promise对象，以便可以链式调用。
- 被观察者管理内部pending、fulfilled和rejected的状态转变，同时通过构造函数中传递的resolve和reject方法以主动触发状态转变和通知观察者。
- `Promise.then()`是异步调用的，这也是Promise设计上规定的，其原因在于同步调用和异步调用同时存在会导致混乱。
- 为了暂停当前的 promise，或者要它等待另一个 promise 完成，只需要简单地在 then() 函数中返回另一个 promise。

Promise 也有一些缺点。首先，无法取消 Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。第三，当处于 Pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

一般来说，不要在then方法里面定义Reject状态的回调函数（即then的第二个参数），总是使用catch方法，理由是更接近同步的写法。
then的第二个函数参数和catch等价

Promise.all和Promise.race的区别？

Promise.all 把多个promise实例当成一个promise实例,当这些实例的状态都发生改变时才会返回一个新的promise实例，才会执行then方法。

Promise.race 只要该数组中的 Promise 对象的状态发生变化（无论是resolve还是reject）该方法都会返回。

## apply、call和bind

参考答案：三者都可以把一个函数应用到其他对象上，
- call、apply是修改函数的作用域（修改this指向），并且立即执行
- bind是返回了一个新的函数，不是立即执行
- apply和call的区别是apply接受数组作为参数
- call是接受逗号分隔的无限多个参数列表

```javascript
Array.prototype.slice.call(null, args)

function getMax(arr){
  return Math.max.apply(null, arr);
}
//call
function foo() {
  console.log(this);//{id: 42}
}

foo.call({ id: 42 });
```
如果该方法是非严格模式代码中的函数，则null和undefined将替换为全局对象，并且原始值将被包装。
当你调用apply传递给它null时，就像是调用函数而不提供任何对象

## 异步函数
async，Promise，Generator函数，co函数库区别

- `async...await`写法最简洁，最符合语义。
- async/await让异步代码看起来、表现起来更像同步代码，这正是其威力所在。
- async 函数就是 Generator 函数的语法糖，只不过async内置了自动执行器。async 函数就是将 Generator 函数的星号（*）替换成 async，将 yield 替换成 await

async函数优点

1. Generator 函数必须靠执行器，所以才有CO函数库，async函数自带执行器
2. 更好的语义
3. 更广的适用性。co函数库yield后面只能是Thunk函数或者Promise对象，await后面可以跟Promise对象和原始类型值（等同于同步操作）
4. Generator 函数：可以把它理解成一个函数的内部状态的遍历器，Generator重点在解决异步回调金字塔问题，巧妙的使用它可以写出看起来同步的代码。

## co函数库

- co可以说是给generator增加了promise实现。co是利用Generator的方式实现了`async/await`（co返回Promise对象，async也返回Promise对象，co内部的generator函数即async，yield相当于await）
- co 函数库其实就是将两种自动执行器（Thunk 函数和 Promise 对象），包装成一个库。
- co函数接收一个Generator生成器函数作为参数。执行co函数的时候，生成器函数内部的逻辑像async函数调用时一样被执行。不同之处只是这里的await变成了yield（产出）。

```javascript
co(function* () {
  var result = yield Promise.resolve(true);
  return result;
}).then(function (value) {
  console.log(value);
}, function (err) {
  console.error(err.stack);
});
```
Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件监听——更合理和更强大。

promise catch函数和then第二个函数参数：

```javascript
promise.catch();
// 等价于
promise.then(null, function(reason){});
```

有许多场景是异步的：
1. 事件监听，如click，onload等事件
2. 定时器  setTimeout和setInterval
3. ajax请求

js异步编程模型（es5）：

- 回调函数（callback）陷入回调地狱，解耦程度特别低
- 事件监听（Listener）JS 和浏览器提供的原生方法基本都是基于事件触发机制的
- 发布/订阅（观察者模式）把事件全部交给控制器管理，可以完全掌握事件被订阅的次数，以及订阅者的信息，管理起来特别方便。
- Promise 对象实现方式

async函数与Promise、Generator函数一样，是用来取代回调函数、解决异步操作的一种方法。它本质上是Generator函数的语法糖。

Promise，generator/yield，await/async 都是现在和未来 JS 解决异步的标准做法

## 什么是同构

同构(isomorphic/universal)就是使前后端运行同一套代码的意思，后端一般是指 NodeJS 环境。

## import与require

es6的导入import导出exports与require、module.exports的区别
- ES6 Module 中导入模块的属性或者方法是强绑定的，包括基础类型；而 CommonJS 则是普通的值传递或者引用传递。
- CommonJS模块是运行时的，导入导出是通过值的复制来达成的。ES6的模块是静态的，导入导出实际上是建立符号的映射
- import必须放在文件最顶部，require不需要；import最终会被babel编译为require

## DOM事件

### DOM事件的级别
- DOM0 element.onclick = function(){};
- DOM2 element.addEventListener('click', function(){}, false);
- DOM3 element.addEventListener('keyup', function(){}, false);

[dom事件详解](http://www.cnblogs.com/holyson/p/3914406.html)

0级DOM,分为2个：

**一是在标签内写onclick事件**

    <input id="btn1" type="button" value="press me" onclick="alert('thanks');" />

**二是在JS中写noclick=function(){} 函数**

    document.getElementById('bnt1').onclick = function (){ alert('thanks'); }


为什么没有1级DOM

> DOM级别1于1998年10月1日成为W3C推荐标准。1级DOM标准中并没有定义事件相关的内容，所以没有所谓的1级DOM事件模型。在2级DOM中除了定义了一些DOM相关的操作之外还定义了一个事件模型 ，这个标准下的事件模型就是我们所说的2级DOM事件模型

2级DOM
- 添加事件：addEventListener(), 可以为元素添加多个事件处理程序，触发时会按照添加顺序依次调用
- 移除事件：removeEventListener(), 不能移除匿名添加的函数
- 默认第三个参数是false，冒泡，从下往上

**它们都有三个参数**：

    第一个参数是事件名（如click）；
    第二个参数是事件处理程序函数；
    第三个参数如果是true则表示在捕获阶段调用，为false表示在冒泡阶段调用。

    IE写法：
    document.getElementById("myTest").attachEvent("onclick", function(){alert(1)});
    标准写法：
    document.getElementById("myTest").addEventListener("click", function(){alert(1)}, false);

封装一个添加事件的方法
```js
    function addEvent(ele, ev, fun, flag) {
        if(ele.attachEvent){
            ele.attachEvent('on' + ev, fun);
        } else{
            ele.addEventListenr(ev, fun, flag);
        }
    }
```

### DOM事件模型
事件捕捉阶段：事件开始由顶层对象触发，然后逐级向下传播，直到目标的元素；

处于目标阶段：处在绑定事件的元素上；

事件冒泡阶段：事件由具体的元素先接收，然后逐级向上传播，直到不具体的元素；

阻止 冒泡／捕获 `event.stopPropagation()`和IE的`event.cancelBubble=true`

捕获是从上往下，冒泡是从下往上

DOM事件绑定
1. 绑定事件监听函数：addEventListener和attchEvent
2. 在JavaScript代码中绑定：获取DOM元素 `dom.onlick = fn`
3. 在DOM元素中直接绑定：`<div onclick = 'fn()'>`

DOM事件流包括三个阶段：事件捕获阶段、处于目标阶段、事件冒泡阶段。首先发生的事件捕获，为截获事件提供机会。然后是实际的目标接受事件。最后一个阶段是时间冒泡阶段，可以在这个阶段对事件做出响应。


### 描述DOM事件捕获的具体流程
- `window -> doucument -> html-body -> ... -> 目标元素`
- 获取body节点：`document.body`
- 获取html节点：`document.documentElement` 要记住不是 `document.html`

```js
var ev = document.getElementById('ev');
ev.addEventListener('click', function(){
	console.log('ev captrue');
},true, true);
window.addEventListener('click', function(){
	console.log('window captrue');
}, true);
document.addEventListener('click', function(){
	console.log('document captrue');
}, true);
document.documentElement.addEventListener('click', function(){
	console.log('html captrue');
}, true);
document.body.addEventListener('click', function(){
	console.log('body captrue');
}, true);
// 执行结果为
// window captrue
// document captrue
// html captrue
// body captrue
// ev captrue
```

### Event对象的常见应用
- evnet.preventDefault()：阻止默认事件
- event.stopPropagation()：阻止冒泡
- event.stoplmmediatepropagation()：
- event.currentTarget：当前所绑定的事件
- enent.target：当前被点击的元素

### 自定义事件

```js
// 创建一个自定义事件
var ev = new Event('custome');
// 给dom节点绑定事件
dom.addEventListener('cuctome', function(){
    console.log('custome');
});
// 触发自定义事件
dom.dispathEvent(ev);
```

### 原生DOM操作

- 如需替换 HTML DOM 中的元素，请使用` replaceChild(newnode,oldnode) `方法
- 从父元素中删除子元素 `parent.removeChild(child)`;
- `insertBefore(newItem,existingItem)` 在指定的已有子节点之前插入新的子节点
- `appendChild(newListItem`向元素添加新的子节点，作为最后一个子节点
- document.documentElement - 全部文档
- document.body - 文档的主体

[HTML DOM Element 对象](http://www.w3school.com.cn/jsref/dom_obj_all.asp)

JS事件：target与currentTarget区别
- target在事件流的目标阶段；currentTarget在事件流的捕获，目标及冒泡阶段。只有当事件流处在目标阶段的时候，两个的指向才是一样的， 而当处于捕获和冒泡阶段的时候，
- target指向被单击的对象而currentTarget指向当前事件活动的对象（一般为父级）。


### 事件委托

因为事件具有冒泡机制，因此我们可以利用冒泡的原理，把事件加到父级上，触发执行效果。这样做的好处当然就是提高性能了

最重要的是通过`event.target.nodeName`判断子元素

```javascript
<div>
    <ul id = "bubble">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
    </ul>
</div>

   window.onload = function () {
        var aUl = document.getElementsById("bubble");
        var aLi = aUl.getElementsByTagName("li");

        //不管在哪个事件中，只要你操作的那个元素就是事件源。
        // ie：window.event.srcElement
        // 标准下:event.target
        aUl.onmouseover = function (ev) {
            var ev = ev || window.event;
            var target = ev.target || ev.srcElement;

            if(target.nodeName.toLowerCase() == "li"){
                target.style.background = "blue";
            }
        };
   };
```


## Node

- 核心模块：EventEmitter, Stream, FS, Net和全局对象
- 全局对象：process, console, Buffer和exports
- `exports`和`module.exports`区别
- `exports` 是 `module.exports` 的一个引用
- module.exports 初始值为一个空对象 {}，所以 exports 初始值也是 {}
- require 引用模块后，返回的是 module.exports 而不是 exports

### 单线程优点
Node.js依托于v8引擎，都是以单线程为基础的。单线程资源占用小。单线程避免了传统PHP那样频繁创建、切换线程的开销，使执行速度更加迅速

### I/O的异步和非阻塞
Node.js是如何做到I/O的异步和非阻塞的呢
- 其实Node在底层访问I/O还是多线程的。Node可以借助livuv来来实现多线程。
- 如果我们非要让Node.js支持多线程，还是提倡使用官方的做法，利用libuv库来实现。
- cluster可以用来让Node.js充分利用多核cpu的性能

### 并行与并发，进程与线程

- 并发 (Concurrent) = 2 队列对应 1 咖啡机.
- 并行 (Parallel) = 2 队列对应 2 咖啡机.
- 线程是进程下的执行者，一个进程至少会开启一个线程（主线程），也可以开启多个线程。

### Nodejs优缺点

优点：
1. 事件驱动，异步编程，占用内存少
2. npm设计得好

缺点：
1. Debug 很困难。没有 stack trace，出了问题很难查找问题的原因；
2. 如果设计不好，很容易让代码充满 callback，代码不优雅；
3. 可靠性低；
4. 单进程，单线程，只支持单核CPU，不能充分的利用多核CPU服务器。
