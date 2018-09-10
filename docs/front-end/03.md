# 前端性能优化

- 前端长列表的性能优化
- 只渲染页面用用户能看到的部分。并且在不断滚动的过程中去除不在屏幕中的元素，不再渲染，从而实现高性能的列表渲染。
- 借鉴着这个想法，我们思考一下。当列表不断往下拉时，web中的dom元素就越多，即使这些dom元素已经离开了这个屏幕，不被用户所看到了，这些dom元素依然存在在那里。导致浏览器在渲染时需要不断去考虑这些dom元素的存在，造成web浏览器的长列表渲染非常低效。因此，实现的做法就是捕捉scroll事件，当dom离开屏幕，用户不再看到时，就将其移出dom tree。
- [前端性能优化最佳实践](https://csspod.com/frontend-performance-best-practices/)

## 单页面应用的优缺点

优点：

1. 用户体验好，快，内容的改变不需要重新加载整个页面
2. 基于上面一点，SPA相对服务器压力小
3. 没有页面切换，就没有白屏阻塞

缺点：

1. 不利于SEO
2. 初次加载耗时增多
3. 导航不可用
4. 容易造成css命名冲突等
5. 页面复杂度提高很多，复杂逻辑难度成倍

为什么不利于SEO？

SPA简单流程，蜘蛛无法执行JS，相应的页面内容无从抓取
```html
<html data-ng-app=”app”>是其标志性的标注。
```
对于这种页面来说，很多都是采用js等搜索引擎无法识别的技术来做的



## 移动端web的兼容性bug

1. 一些情况下对非可点击元素如(label,span)监听click事件，ios下不会触发，css增加cursor:pointer就搞定了。
2. position 在Safari下的两个定位需要都写，只写一个容易发生错乱
3. Input 的placeholder会出现文本位置偏上的情况,input 的placeholder会出现文本位置偏上的情况：PC端设置line-height等于height能够对齐，而移动端仍然是偏上，解决是设置line-height：normal
4. zepto点击穿透问题,引入fastclick解决；event.preventDefault
5. 当输入框在最底部的时候，弹起的虚拟键盘会把输入框挡住。

```js
Element.scrollIntoViewIfNeeded(opt_center)
```

## 浏览器渲染原理解析

1. 首先渲染引擎下载HTML，解析生成DOM Tree
2. 遇到css标签或JS脚本标签就新起线程去下载他们，并继续构建DOM。（其中css是异步下载同步执行）浏览器引擎通过 DOM Tree 和 CSS Rule Tree 构建 Rendering Tree
3. 通过 CSS Rule Tree 匹配 DOM Tree 进行定位坐标和大小，这个过程称为 Flow 或 Layout 。
4. 最终通过调用Native GUI 的 API 绘制网页画面的过程称为 Paint 。


## 重绘与回流
- 当用户在浏览网页时进行交互或通过 js 脚本改变页面结构时，以上的部分操作有可能重复运行，此过程称为 Repaint 或 Reflow。
- 回流是指dom树发生结构变化后，需要重新构建dom结构。
- 重绘是指dom节点样式改变，重新绘制。
- 回流定会带来重绘，重绘不一定有回流。

如何减少浏览器回流：将需要多次重排的元素，position属性设为absolute或fixed，这样此元素就脱离了文档流，它的变化不会影响到其他元素。

## 从输入URL到页面展现

发生HTTP请求的过程

HTTP是一个基于请求与响应，无状态的，应用层的协议，常基于TCP/IP协议传输数据。

- 1.域名解析，查找缓存
  - 查找浏览器缓存（DNS缓存）
  - 查找操作系统缓存（如果浏览器缓存没有，浏览器会从hosts文件查找是否有DNS信息）
  - 查找路由器缓存
  - 查找ISP缓存
- 2.浏览器获得对应的ip地址后，浏览器与远程`Web`服务器通过`TCP`三次握手协商来建立一个`TCP/IP`连接。
- 3.TCP/IP连接建立起来后，浏览器就可以向服务器发送HTTP请求
- 4.服务器处理请求，返回资源（MVC设计模式）
- 5.浏览器处理（加载，解析，渲染）
  - HTML页面加载顺序从上而下
  - 解析文档为有意义的结构，DOM树；解析css文件为样式表对象
  - 渲染。将DOM树进行可视化表示
- 6.绘制网页
  - 浏览器根据HTML和CSS计算得到渲染数，最终绘制到屏幕上

一个完整HTTP请求的过程为：
- DNS Resolving -> TCP handshake -> HTTP Request -> Server -> HTTP Response -> TCP shutdown

[从输入URL到页面加载发生了什么？](https://segmentfault.com/a/1190000006879700#articleHeader7)

##  缓存，存储相关
cookie、localStorage、sessionStorage

cookie优点：
1. 可以解决HTTP无状态的问题，与服务器进行交互

缺点：
1. 数量和长度限制，每个域名最多20条，每个cookie长度不能超过4kb
2. 安全性问题。容易被人拦截
3. 浪费带宽，每次请求新页面，cookie都会被发送过去

cookie和session区别
1. cookie数据存放在客户的浏览器上，session数据放在服务器上。
2. session会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能。考虑到减轻服务器性能方面，应当使用COOKIE。
3. sessionStorage是当前对话的缓存，浏览器窗口关闭即消失，localStorage持久存在，除非清除浏览器缓存。

## 页面缓存原理

页面缓存状态是由http header决定的，一个浏览器请求信息，一个是服务器响应信息。

主要包括Pragma:
- no-cache、Cache-Control、 Expires、 Last-Modified、If-Modified-Since。

## CDN工作原理

CDN做了两件事，一是让用户访问最近的节点，二是从缓存或者源站获取资源

CDN的工作原理：通过dns服务器来实现优质节点的选择，通过缓存来减少源站的压力。

## 网络优化/性能优化

- 使用CDN，让用户访问最近的资源，减少来回传输时间
- 合并压缩CSS、js、图片、静态资源，服务器开启GZIP
- css放顶部，js放底部（css可以并行下载，而js加载之后会造成阻塞）
- 图片预加载和首屏图片之外的做懒加载
- 做HTTP缓存（添加Expires头和配置Etag）用户可以重复使用本地缓存，减少对服务器压力
- 大小超过 10KB 的 css/img 建议外联引用，以细化缓存粒度
- 小于 10k 的图片 base64
- DNS 预解析 DNS-Prefetch
- 预连接 Preconnect

代码层面优化

少用全局变量，减少作用域链查找，缓存DOM查找结果，避免使用with（with会创建自己的作用域，会增加作用域链长度）；多个变量声明合并；减少DOM操作次数；尽量避免在HTML标签中写style属性

避免使用css3渐变阴影效果，尽量使用css3动画，开启硬件加速，不滥用float；避免使用CSS表达式；使用`<link>`来代替`@import`


图片预加载原理

提前加载图片，当用户需要查看时可直接从本地缓存中渲染
```javascript
var imgArr=["1.jpg","2.jpg"];
loadImage(imgArr,callback);
function loadImage(imgArr, callback) {
    var imgNum=imgArr.length,count=0;
    for(var i=0;i<imgNum;i++){
      var img = new Image(); //创建一个Image对象，实现图片的预下载
      img.src = imgArr[i];
      if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
          if(count==imgNum){
          callback();// 直接返回，不用再处理onload事件
         }
 } count++; img.onload=function () { if(count==imgNum){ callback(); } } }//for循环结束}
```
## 缓存相关

1. 浏览器输入 url 之后敲下回车，刷新 F5 与强制刷新(Ctrl + F5)，又有什么区别？

实际上浏览器输入 url 之后敲下回车就是先看本地 cache-control、expires 的情况，刷新(F5)就是忽略先看本地 cache-control、expires 的情况，带上条件 If-None-Match、If-Modified-Since，强制刷新(Ctrl + F5)就是不带条件的访问。

2. etag，cache-control，last-modified

如果比较粗的说先后顺序应该是这样：

- Cache-Control —— 请求服务器之前
- Expires —— 请求服务器之前
- If-None-Match (Etag) —— 请求服务器
- If-Modified-Since (Last-Modified) —— 请求服务器

需要注意的是 如果同时有 etag 和 last-modified 存在，在发送请求的时候会一次性的发送给服务器，没有优先级，服务器会比较这两个信息.

如果expires和cache-control:max-age同时存在，expires会被cache-control 覆盖。

其中Expires和cache-control属于强缓存，last-modified和etag属于协商缓存
强缓存与协商缓存区别：强缓存不发请求到服务器，协商缓存会发请求到服务器。

## 首屏优化

再回到前端渲染遇到首屏渲染问题，除了同构就没有其它解法了吗？总结以下可以通过以下三步解决

分拆打包

现在流行的路由库如 react-router 对分拆打包都有很好的支持。可以按照页面对包进行分拆，并在页面切换时加上一些 loading 和 transition 效果。

1. 首屏内容最好做到静态缓存
2. 首屏内联css渲染
3. 图片懒加载
4. 服务端渲染，首屏渲染速度更快（重点），无需等待js文件下载执行的过程
5. 交互优化（使用加载占位器，在白屏无法避免的时候，为了解决等待加载过程中白屏或者界面闪烁）
6. 图片尺寸大小控制


## 前端渲染的优势

- 局部刷新。无需每次都进行完整页面请求
- 懒加载。如在页面初始时只加载可视区域内的数据，滚动后rp加载其它数据，可以通过 react-lazyload 实现
- 富交互。使用 JS 实现各种酷炫效果
- 节约服务器成本。省电省钱，JS 支持 CDN 部署，且部署极其简单，只需要服务器支持静态文件即可
- 天生的关注分离设计。服务器来访问数据库提供接口，JS 只关注数据获取和展现
- JS 一次学习，到处使用。可以用来开发 Web、Serve、Mobile、Desktop 类型的应用

## 服务端渲染的优势

- 更好的 SEO，由于搜索引擎爬虫抓取工具可以直接查看完全渲染的页面。
- 服务端渲染不需要先下载一堆 js 和 css 后才能看到页面（首屏性能）
- 服务端渲染不用关心浏览器兼容性问题（随意浏览器发展，这个优点逐渐消失）
- 对于电量不给力的手机或平板，减少在客户端的电量消耗很重要

