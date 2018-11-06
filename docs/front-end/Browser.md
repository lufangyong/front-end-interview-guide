# Browser

## DOM 事件

### DOM 事件的级别

- DOM0 element.onclick = function(){};
- DOM2 element.addEventListener('click', function(){}, false);
- DOM3 element.addEventListener('keyup', function(){}, false);

[dom 事件详解](http://www.cnblogs.com/holyson/p/3914406.html)

0 级 DOM,分为 2 个：

**一是在标签内写 onclick 事件**

    <input id="btn1" type="button" value="press me" onclick="alert('thanks');" />

**二是在 JS 中写 noclick=function(){} 函数**

    document.getElementById('bnt1').onclick = function (){ alert('thanks'); }

为什么没有 1 级 DOM

> DOM 级别 1 于 1998 年 10 月 1 日成为 W3C 推荐标准。1 级 DOM 标准中并没有定义事件相关的内容，所以没有所谓的 1 级 DOM 事件模型。在 2 级 DOM 中除了定义了一些 DOM 相关的操作之外还定义了一个事件模型 ，这个标准下的事件模型就是我们所说的 2 级 DOM 事件模型

2 级 DOM

- 添加事件：addEventListener(), 可以为元素添加多个事件处理程序，触发时会按照添加顺序依次调用
- 移除事件：removeEventListener(), 不能移除匿名添加的函数
- 默认第三个参数是 false，冒泡，从下往上

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
  if (ele.attachEvent) {
    ele.attachEvent('on' + ev, fun)
  } else {
    ele.addEventListenr(ev, fun, flag)
  }
}
```

### DOM 事件模型

事件捕捉阶段：事件开始由顶层对象触发，然后逐级向下传播，直到目标的元素；

处于目标阶段：处在绑定事件的元素上；

事件冒泡阶段：事件由具体的元素先接收，然后逐级向上传播，直到不具体的元素；

阻止 冒泡／捕获 `event.stopPropagation()`和 IE 的`event.cancelBubble=true`

捕获是从上往下，冒泡是从下往上

DOM 事件绑定

1. 绑定事件监听函数：addEventListener 和 attchEvent
2. 在 JavaScript 代码中绑定：获取 DOM 元素 `dom.onlick = fn`
3. 在 DOM 元素中直接绑定：`<div onclick = 'fn()'>`

DOM 事件流包括三个阶段：事件捕获阶段、处于目标阶段、事件冒泡阶段。首先发生的事件捕获，为截获事件提供机会。然后是实际的目标接受事件。最后一个阶段是时间冒泡阶段，可以在这个阶段对事件做出响应。

### 描述 DOM 事件捕获的具体流程

- `window -> doucument -> html-body -> ... -> 目标元素`
- 获取 body 节点：`document.body`
- 获取 html 节点：`document.documentElement` 要记住不是 `document.html`

```js
var ev = document.getElementById('ev')
ev.addEventListener(
  'click',
  function() {
    console.log('ev captrue')
  },
  true,
  true
)
window.addEventListener(
  'click',
  function() {
    console.log('window captrue')
  },
  true
)
document.addEventListener(
  'click',
  function() {
    console.log('document captrue')
  },
  true
)
document.documentElement.addEventListener(
  'click',
  function() {
    console.log('html captrue')
  },
  true
)
document.body.addEventListener(
  'click',
  function() {
    console.log('body captrue')
  },
  true
)
// 执行结果为
// window captrue
// document captrue
// html captrue
// body captrue
// ev captrue
```

### Event 对象的常见应用

- evnet.preventDefault()：阻止默认事件
- event.stopPropagation()：阻止冒泡
- event.stoplmmediatepropagation()：
- event.currentTarget：当前所绑定的事件
- enent.target：当前被点击的元素

### 自定义事件

```js
// 创建一个自定义事件
var ev = new Event('custome')
// 给dom节点绑定事件
dom.addEventListener('cuctome', function() {
  console.log('custome')
})
// 触发自定义事件
dom.dispathEvent(ev)
```

### 原生 DOM 操作

- 如需替换 HTML DOM 中的元素，请使用`replaceChild(newnode,oldnode)`方法
- 从父元素中删除子元素 `parent.removeChild(child)`;
- `insertBefore(newItem,existingItem)` 在指定的已有子节点之前插入新的子节点
- `appendChild(newListItem`向元素添加新的子节点，作为最后一个子节点
- document.documentElement - 全部文档
- document.body - 文档的主体

[HTML DOM Element 对象](http://www.w3school.com.cn/jsref/dom_obj_all.asp)

JS 事件：target 与 currentTarget 区别

- target 在事件流的目标阶段；currentTarget 在事件流的捕获，目标及冒泡阶段。只有当事件流处在目标阶段的时候，两个的指向才是一样的， 而当处于捕获和冒泡阶段的时候，
- target 指向被单击的对象而 currentTarget 指向当前事件活动的对象（一般为父级）。

### 事件委托

因为事件具有冒泡机制，因此我们可以利用冒泡的原理，把事件加到父级上，触发执行效果。这样做的好处当然就是提高性能了

最重要的是通过`event.target.nodeName`判断子元素

```javascript
;<div>
  <ul id="bubble">
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
  </ul>
</div>

window.onload = function() {
  var aUl = document.getElementsById('bubble')
  var aLi = aUl.getElementsByTagName('li')

  //不管在哪个事件中，只要你操作的那个元素就是事件源。
  // ie：window.event.srcElement
  // 标准下:event.target
  aUl.onmouseover = function(ev) {
    var ev = ev || window.event
    var target = ev.target || ev.srcElement

    if (target.nodeName.toLowerCase() == 'li') {
      target.style.background = 'blue'
    }
  }
}
```

## 跨域

什么是同源策略即限制

同源策略限制从一个源加载的文档或脚本如何与与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的关键的安全机制。

- 一个源包括：协议(http\https)、域名(www.xxx.xxx)、端口(default:80)
- 只要源不同就跨域了

限制

- Cookie、LocalStorage 和 IndexDB 无法读取
- DOM 无法获得
- AJAX 请求不能发送

:::tip
script、image、iframe 的 src 都不受同源策略的影响。
:::

1. JSONP,回调函数+数据就是 JSON With Padding，简单、易部署。（做法：动态插入 script 标签，设置其 src 属性指向提供 JSONP 服务的 URL 地址，查询字符串中加入 callback 指定回调函数，返回的 JSON 被包裹在回调函数中以字符串的形式被返回，需将 script 标签插入 body 底部）。缺点是只支持 GET，不支持 POST（原因是通过地址栏传参所以只能使用 GET）
2. document.domain 跨子域 （ 例如 a.qq.com 嵌套一个 b.qq.com 的 iframe ，如果 a.qq.com 设置 document.domain 为 qq.com 。b.qq.com 设置 document.domain 为 qq.com， 那么他俩就能互相通信了，不受跨域限制了。 注意：只能跨子域）
3. window.name + iframe ==> http://www.tuicool.com/articles/viMFbqV，支持跨主域。不支持POST
4. HTML5 的 postMessage()方法允许来自不同源的脚本采用异步方式进行有限的通信，可以实现跨文本档、多窗口、跨域消息传递。适用于不同窗口 iframe 之间的跨域
5. CORS（Cross Origin Resource Share）对方服务端设置响应头
6. 服务端代理

在浏览器客户端不能跨域访问，而服务器端调用 HTTP 接口只是使用 HTTP 协议，不会执行 JS 脚本，不需要同源策略，也就没有跨越问题。简单地说，就是浏览器不能跨域，后台服务器可以跨域。（一种是通过 http-proxy-middleware 插件设置后端代理；另一种是通过使用 http 模块发出请求）

CORS 请求默认不发送 Cookie 和 HTTP 认证信息。如果要把 Cookie 发到服务器，一方面要服务器同意，指定`Access-Control-Allow-Credentials`字段。

## Cookie

```javascript
Set-Cookie: value[; expires=date][; domain=domain][; path=path][; secure]
```

如果想让 cookie 存在一段时间，就要为 expires 属性设置为未来的一个用毫秒数表示的过期日期或时间点，expires 默认为设置的 expires 的当前时间。现在已经被 max-age 属性所取代，max-age 用秒来设置 cookie 的生存期。如果 max-age 为 0，则表示删除该 cookie。

cookie 的属性：

- HttpOnly 属性告之浏览器该 cookie 绝不能通过 JavaScript 的 `document.cookie` 属性访问。
- domain 属性可以使多个 web 服务器共享 cookie。
- 只有 path 属性匹配向服务器发送的路径，Cookie 才会发送。必须是绝对路径
- secure 属性用来指定 Cookie 只能在加密协议 HTTPS 下发送到服务器。
- max-age 属性用来指定 Cookie 有效期
- expires 属性用于指定 Cookie 过期时间。它的格式采用 Date.toUTCString()的格式。

浏览器的同源政策规定，两个网址只要域名相同和端口相同，就可以共享 Cookie。

## websocket

WebSocket 使用 ws 或 wss 协议，Websocket 是一个持久化的协议，相对于 HTTP 这种非持久的协议来说。

WebSocket API 最伟大之处在于服务器和客户端可以在给定的时间范围内的任意时刻，相互推送信息。WebSocket 并不限于以 Ajax(或 XHR)方式通信，因为 Ajax 技术需要客户端发起请求，而 WebSocket 服务器和客户端可以彼此相互推送信息；XHR 受到域的限制，而 WebSocket 允许跨域通信。

```javascript
// 创建一个Socket实例
var socket = new WebSocket('ws://localhost:8080')
// 打开Socket
socket.onopen = function(event) {
  // 发送一个初始化消息
  socket.send("I am the client and I'm listening!")
  // 监听消息
  socket.onmessage = function(event) {
    console.log('Client received a message', event)
  }
  // 监听Socket的关闭
  socket.onclose = function(event) {
    console.log('Client notified socket has closed', event)
  }
  // 关闭Socket....
  //socket.close()
}
```

## fetch 和 Ajax

`XMLHttpRequest` 是一个设计粗糙的 API，不符合关注分离（Separation of Concerns）的原则，配置和调用方式非常混乱，而且基于事件的异步模型写起来也没有现代的 Promise，`generator/yield`，`async/await` 友好。

fetch 是浏览器提供的一个新的 web API，它用来代替 Ajax（XMLHttpRequest），其提供了更优雅的接口，更灵活强大的功能。

Fetch 优点主要有：

- 语法简洁，更加语义化
- 基于标准 Promise 实现，支持 `async/await`

```javascript
fetch(url)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(e => console.log('Oops, error', e))
```

## ajax 请求和原理

```javascript
var xhr = new XMLHTTPRequest()
// 请求 method 和 URI
xhr.open('GET', url)
// 请求内容
xhr.send()
// 响应状态
xhr.status
// xhr 对象的事件响应
xhr.onreadystatechange = function() {}
xhr.readyState
// 响应内容
xhr.responseText
```

AJAX 的工作原理

Ajax 的工作原理相当于在用户和服务器之间加了—个中间层(AJAX 引擎),使用户操作与服务器响应异步化。　 Ajax 的原理简单来说通过 XmlHttpRequest 对象来向服务器发异步请求，从服务器获得数据，然后用 javascript 来操作 DOM 而更新页面。

ajax 优缺点

优点：

- 无刷新更新数据
- 异步与服务器通信
- 前后端负载均衡

缺点：

1. ajax 干掉了 Back 和 history 功能，对浏览器机制的破坏
2. 对搜索引擎支持较弱
3. 违背了 URI 和资源定位的初衷
