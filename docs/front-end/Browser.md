# Browser

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

## 跨域
什么是同源策略即限制

同源策略限制从一个源加载的文档或脚本如何与与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的关键的安全机制。

- 一个源包括：协议(http\https)、域名(www.xxx.xxx)、端口(default:80)
- 只要源不同就跨域了

限制
- Cookie、LocalStorage和IndexDB无法读取
- DOM无法获得
- AJAX请求不能发送

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

