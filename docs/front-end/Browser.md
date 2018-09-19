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
### 什么是同源策略即限制
同源策略限制从一个源加载的文档或脚本如何与与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的关键的安全机制。

- 一个源包括：协议(http\https)、域名(www.xxx.xxx)、端口(default:80)
- 只要源不同就跨域了

限制
- Cookie、LocalStorage和IndexDB无法读取
- DOM无法获得
- AJAX请求不能发送

