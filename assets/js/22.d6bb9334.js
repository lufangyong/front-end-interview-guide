(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{186:function(a,v,_){"use strict";_.r(v);var t=_(0),s=Object(t.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var a=this,v=a.$createElement,_=a._self._c||v;return _("div",{staticClass:"content"},[_("h1",{attrs:{id:"常见面试题"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#常见面试题","aria-hidden":"true"}},[a._v("#")]),a._v(" 常见面试题")]),a._v(" "),_("h2",{attrs:{id:"怎么去设计一个组件封装"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#怎么去设计一个组件封装","aria-hidden":"true"}},[a._v("#")]),a._v(" 怎么去设计一个组件封装")]),a._v(" "),_("ol",[_("li",[a._v("组件封装的目的是为了重用，提高开发效率和代码质量")]),a._v(" "),_("li",[a._v("低耦合，单一职责，可复用性，可维护性")]),a._v(" "),_("li",[a._v("前端组件化设计思路")])]),a._v(" "),_("h2",{attrs:{id:"js-异步加载的方式"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#js-异步加载的方式","aria-hidden":"true"}},[a._v("#")]),a._v(" js 异步加载的方式")]),a._v(" "),_("ol",[_("li",[a._v("渲染引擎遇到 script 标签会停下来，等到执行完脚本，继续向下渲染")]),a._v(" "),_("li",[a._v("defer 是“渲染完再执行”，async 是“下载完就执行”，defer 如果有多个脚本，会按照在页面中出现的顺序加载，多个 async 脚本不能保证加载顺序")]),a._v(" "),_("li",[a._v("加载 es6 模块的时候设置 type=module，异步加载不会造成阻塞浏览器，页面渲染完再执行，可以同时加上 async 属性，异步执行脚本（利用顶层的 this 等于 undefined 这个语法点，可以侦测当前代码是否在 ES6 模块之中）")])]),a._v(" "),_("h2",{attrs:{id:"css-动画和-js-动画的差异"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#css-动画和-js-动画的差异","aria-hidden":"true"}},[a._v("#")]),a._v(" css 动画和 js 动画的差异")]),a._v(" "),_("ol",[_("li",[a._v("代码复杂度，js 动画代码相对复杂一些")]),a._v(" "),_("li",[a._v("动画运行时，对动画的控制程度上，js 能够让动画，暂停，取消，终止，css 动画不能添加事件")]),a._v(" "),_("li",[a._v("动画性能看，js 动画多了一个 js 解析的过程，性能不如 css 动画好")])]),a._v(" "),_("h2",{attrs:{id:"xss-与-csrf-两种跨站攻击"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#xss-与-csrf-两种跨站攻击","aria-hidden":"true"}},[a._v("#")]),a._v(" XSS 与 CSRF 两种跨站攻击")]),a._v(" "),_("ol",[_("li",[a._v("xss 跨站脚本攻击，主要是前端层面的，用户在输入层面插入攻击脚本，改变页面的显示，或则窃取网站 cookie，预防方法：不相信用户的所有操作，对用户输入进行一个转义，不允许 js 对 cookie 的读写")]),a._v(" "),_("li",[a._v("csrf 跨站请求伪造，以你的名义，发送恶意请求，通过 cookie 加参数等形式过滤")]),a._v(" "),_("li",[a._v("我们没法彻底杜绝攻击，只能提高攻击门槛")])]),a._v(" "),_("h2",{attrs:{id:"事件委托，目的，功能，写法"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#事件委托，目的，功能，写法","aria-hidden":"true"}},[a._v("#")]),a._v(" 事件委托，目的，功能，写法")]),a._v(" "),_("ol",[_("li",[a._v("把一个或者一组元素的事件委托到它的父层或者更外层元素上")]),a._v(" "),_("li",[a._v("优点，减少内存消耗，动态绑定事件")]),a._v(" "),_("li",[a._v("target 是触发事件的最具体的元素，currenttarget 是绑定事件的元素(在函数中一般等于 this)")])]),a._v(" "),_("h2",{attrs:{id:"线程，进程"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#线程，进程","aria-hidden":"true"}},[a._v("#")]),a._v(" 线程，进程")]),a._v(" "),_("ol",[_("li",[a._v("当系统面临大量用户访问，负载过高的时候，通常会使用增加服务器数量来进行横向扩展，使用集群和负载均衡提高整个系统的处理能力")]),a._v(" "),_("li",[a._v("服务器集群负载均衡原理？")])]),a._v(" "),_("h2",{attrs:{id:"什么是-cdn-缓存"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#什么是-cdn-缓存","aria-hidden":"true"}},[a._v("#")]),a._v(" 什么是 CDN 缓存")]),a._v(" "),_("ol",[_("li",[a._v("CDN 是一种部署策略，根据不同的地区部署类似 nginx 这种服务，会缓存静态资源。前端在项目优化的时候，习惯在讲台资源上加上一个 hash 值，每次更新的时候去改变这个 hash，hash 值变化的时候，服务会去重新取资源")]),a._v(" "),_("li",[a._v("(CDN)是一个经策略性部署的整体系统，包括分布式存储、负载均衡、网络请求的重定向和内容管理 4 个要件")])]),a._v(" "),_("h2",{attrs:{id:"闭包的写法，闭包的作用，闭包的缺点"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#闭包的写法，闭包的作用，闭包的缺点","aria-hidden":"true"}},[a._v("#")]),a._v(" 闭包的写法，闭包的作用，闭包的缺点")]),a._v(" "),_("ol",[_("li",[a._v("使用闭包的目的——隐藏变量，间接访问一个变量,在定义函数的词法作用域外，调用函数")]),a._v(" "),_("li",[a._v("闭包的内存泄露，是 IE 的一个 bug，闭包使用完成之后，收回不了闭包的引用，导致内存泄露")])]),a._v(" "),_("h2",{attrs:{id:"跨域问题，谁限制的跨域，怎么解决"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#跨域问题，谁限制的跨域，怎么解决","aria-hidden":"true"}},[a._v("#")]),a._v(" 跨域问题，谁限制的跨域，怎么解决")]),a._v(" "),_("ol",[_("li",[a._v("浏览器的同源策略导致了跨域")]),a._v(" "),_("li",[a._v("用于隔离潜在恶意文件的重要安全机制")]),a._v(" "),_("li",[a._v("nginx 反向代理（nginx 服务内部配置 Access-Control-Allow-Origin *）")]),a._v(" "),_("li",[a._v("jsonp ，允许 script 加载第三方资源")]),a._v(" "),_("li",[a._v("cors 前后端协作设置请求头部，Access-Control-Allow-Origin 等头部信息")]),a._v(" "),_("li",[a._v("iframe 嵌套通讯，postmessage")])]),a._v(" "),_("h2",{attrs:{id:"javascript-中常见的内存泄露陷阱"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#javascript-中常见的内存泄露陷阱","aria-hidden":"true"}},[a._v("#")]),a._v(" javascript 中常见的内存泄露陷阱")]),a._v(" "),_("ol",[_("li",[a._v("内存泄露会导致一系列问题，比如：运行缓慢，崩溃，高延迟")]),a._v(" "),_("li",[a._v("内存泄露是指你用不到（访问不到）的变量，依然占居着内存空间，不能被再次利用起来")]),a._v(" "),_("li",[a._v("意外的全局变量，这些都是不会被回收的变量（除非设置 null 或者被重新赋值），特别是那些用来临时存储大量信息的变量")]),a._v(" "),_("li",[a._v("周期函数一直在运行，处理函数并不会被回收，jq 在移除节点前都会，将事件监听移除")]),a._v(" "),_("li",[a._v("js 代码中有对 DOM 节点的引用，dom 节点被移除的时候，引用还维持")])]),a._v(" "),_("h2",{attrs:{id:"babel-把-es6-转成-es5-或者-es3-之类的原理是什么"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#babel-把-es6-转成-es5-或者-es3-之类的原理是什么","aria-hidden":"true"}},[a._v("#")]),a._v(" babel 把 ES6 转成 ES5 或者 ES3 之类的原理是什么")]),a._v(" "),_("ol",[_("li",[a._v("它就是个编译器，输入语言是 ES6+，编译目标语言是 ES5")]),a._v(" "),_("li",[a._v("babel 官方工作原理")]),a._v(" "),_("li",[a._v("解析：将代码字符串解析成抽象语法树")]),a._v(" "),_("li",[a._v("变换：对抽象语法树进行变换操作")]),a._v(" "),_("li",[a._v("再建：根据变换后的抽象语法树再生成代码字符串")])]),a._v(" "),_("h2",{attrs:{id:"promise-模拟终止"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#promise-模拟终止","aria-hidden":"true"}},[a._v("#")]),a._v(" Promise 模拟终止")]),a._v(" "),_("ol",[_("li",[a._v("当新对象保持“pending”状态时，原 Promise 链将会中止执行。")]),a._v(" "),_("li",[a._v("return new Promise(()=>{}); // 返回“pending”状态的 Promise 对象")]),a._v(" "),_("li",[a._v("从如何停掉 Promise 链说起(promise 内存泄漏问题)")])]),a._v(" "),_("h2",{attrs:{id:"promise-放在-try-catch-里面有什么结果"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#promise-放在-try-catch-里面有什么结果","aria-hidden":"true"}},[a._v("#")]),a._v(" promise 放在 try catch 里面有什么结果")]),a._v(" "),_("ol",[_("li",[a._v("Promise 对象的错误具有冒泡性质，会一直向后传递，直到被捕获为止，也即是说，错误总会被下一个 catch 语句捕获")]),a._v(" "),_("li",[a._v("当 Promise 链中抛出一个错误时，错误信息沿着链路向后传递，直至被捕获")])]),a._v(" "),_("h2",{attrs:{id:"网站性能优化"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#网站性能优化","aria-hidden":"true"}},[a._v("#")]),a._v(" 网站性能优化")]),a._v(" "),_("ol",[_("li",[a._v("http 请求方面，减少请求数量，请求体积，对应的做法是，对项目资源进行压缩，控制项目资源的 dns 解析在 2 到 4 个域名，提取公告的样式，公共的组件，雪碧图，缓存资源，")]),a._v(" "),_("li",[a._v("压缩资源，提取公共资源压缩，提取 css ，js 公共方法")]),a._v(" "),_("li",[a._v("不要缩放图片，使用雪碧图，使用字体图表（阿里矢量图库）")]),a._v(" "),_("li",[a._v("使用 CDN，抛开无用的 cookie")]),a._v(" "),_("li",[a._v("减少重绘重排，CSS 属性读写分离，最好不要用 js 修改样式，dom 离线更新，渲染前指定图片的大小")]),a._v(" "),_("li",[a._v("js 代码层面的优化，减少对字符串的计算，合理使用闭包，首屏的 js 资源加载放在最底部")])]),a._v(" "),_("h2",{attrs:{id:"js-自定义事件实现"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#js-自定义事件实现","aria-hidden":"true"}},[a._v("#")]),a._v(" js 自定义事件实现")]),a._v(" "),_("ol",[_("li",[a._v("原生提供了 3 个方法实现自定义事件")]),a._v(" "),_("li",[a._v("createEvent，设置事件类型，是 html 事件还是 鼠标事件")]),a._v(" "),_("li",[a._v("initEvent 初始化事件，事件名称，是否允许冒泡，是否阻止自定义事件")]),a._v(" "),_("li",[a._v("dispatchEvent 触发事件")])]),a._v(" "),_("h2",{attrs:{id:"angular-双向数据绑定与-vue-数据的双向数据绑定"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#angular-双向数据绑定与-vue-数据的双向数据绑定","aria-hidden":"true"}},[a._v("#")]),a._v(" angular 双向数据绑定与 vue 数据的双向数据绑定")]),a._v(" "),_("ol",[_("li",[a._v("二者都是 MVVM 模式开发的典型代表")]),a._v(" "),_("li",[a._v("angular 是通过脏检测实现，angular 会将 UI 事件，请求事件，settimeout 这类延迟，的对象放入到事件监测的脏队列，当数据变化的时候，触发 $diget 方法进行数据的更新，视图的渲染")]),a._v(" "),_("li",[a._v("vue 通过数据属性的数据劫持和发布订阅的模式实现，大致可以理解成由 3 个模块组成，observer 完成对数据的劫持，compile 完成对模板片段的渲染，watcher 作为桥梁连接二者，订阅数据变化及更新视图")])]),a._v(" "),_("h2",{attrs:{id:"get-与-post-通讯的区别"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#get-与-post-通讯的区别","aria-hidden":"true"}},[a._v("#")]),a._v(" get 与 post 通讯的区别")]),a._v(" "),_("ol",[_("li",[a._v("Get 请求能缓存，Post 不能")]),a._v(" "),_("li",[a._v("Post 相对 Get 安全一点点，因为 Get 请求都包含在 URL 里，且会被浏览器保存历史纪录，Post 不会，但是在抓包的情况下都是一样的。")]),a._v(" "),_("li",[a._v("Post 可以通过 request body 来传输比 Get 更多的数据，Get 没有这个技术")]),a._v(" "),_("li",[a._v("URL 有长度限制，会影响 Get 请求，但是这个长度限制是浏览器规定的，不是 RFC 规定的")]),a._v(" "),_("li",[a._v("Post 支持更多的编码类型且不对数据类型限制")])]),a._v(" "),_("h2",{attrs:{id:"有没有去研究-webpack-的一些原理和机制，怎么实现的"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#有没有去研究-webpack-的一些原理和机制，怎么实现的","aria-hidden":"true"}},[a._v("#")]),a._v(" 有没有去研究 webpack 的一些原理和机制，怎么实现的")]),a._v(" "),_("ol",[_("li",[a._v("解析 webpack 配置参数，合并从 shell 传入和 webpack.config.js 文件里配置的参数，生产最后的配置结果。")]),a._v(" "),_("li",[a._v("注册所有配置的插件，好让插件监听 webpack 构建生命周期的事件节点，以做出对应的反应。")]),a._v(" "),_("li",[a._v("从配置的 entry 入口文件开始解析文件构建 AST 语法树，找出每个文件所依赖的文件，递归下去。")]),a._v(" "),_("li",[a._v("在解析文件递归的过程中根据文件类型和 loader 配置找出合适的 loader 用来对文件进行转换。")]),a._v(" "),_("li",[a._v("递归完后得到每个文件的最终结果，根据 entry 配置生成代码块 chunk。")]),a._v(" "),_("li",[a._v("输出所有 chunk 到文件系统。")])]),a._v(" "),_("h2",{attrs:{id:"es6-模块与-commonjs-模块的差异"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#es6-模块与-commonjs-模块的差异","aria-hidden":"true"}},[a._v("#")]),a._v(" ES6 模块与 CommonJS 模块的差异")]),a._v(" "),_("ol",[_("li",[a._v("CommonJs 模块输出的是一个值的拷贝，ES6 模块输出的是一个值的引用")]),a._v(" "),_("li",[a._v("CommonJS 模块是运行时加载，ES6 模块是编译时输出接口")]),a._v(" "),_("li",[a._v("ES6 输入的模块变量，只是一个符号链接，所以这个变量是只读的，对它进行重新赋值就会报错")])]),a._v(" "),_("h2",{attrs:{id:"模块加载-amd，cmd，commonjs-modules-2-0-规范"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#模块加载-amd，cmd，commonjs-modules-2-0-规范","aria-hidden":"true"}},[a._v("#")]),a._v(" 模块加载 AMD，CMD，CommonJS Modules/2.0 规范")]),a._v(" "),_("ol",[_("li",[a._v("这些规范的目的都是为了 JavaScript 的模块化开发，特别是在浏览器端的")]),a._v(" "),_("li",[a._v("对于依赖的模块，AMD 是提前执行，CMD 是延迟执行")]),a._v(" "),_("li",[a._v("CMD 推崇依赖就近，AMD 推崇依赖前置")])]),a._v(" "),_("h2",{attrs:{id:"node-事件循环，js-事件循环差异"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#node-事件循环，js-事件循环差异","aria-hidden":"true"}},[a._v("#")]),a._v(" Node 事件循环，js 事件循环差异")]),a._v(" "),_("ol",[_("li",[a._v("Node.js 的事件循环分为 6 个阶段")]),a._v(" "),_("li",[a._v("浏览器和 Node 环境下，microtask 任务队列的执行时机不同")]),a._v(" "),_("li",[a._v("Node.js 中，microtask 在事件循环的各个阶段之间执行")]),a._v(" "),_("li",[a._v("浏览器端，microtask 在事件循环的 macrotask 执行完之后执行")]),a._v(" "),_("li",[a._v("递归的调用 process.nextTick()会导致 I/O starving，官方推荐使用 setImmediate()")])]),a._v(" "),_("h2",{attrs:{id:"浅拷贝和深拷贝的问题"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#浅拷贝和深拷贝的问题","aria-hidden":"true"}},[a._v("#")]),a._v(" 浅拷贝和深拷贝的问题")]),a._v(" "),_("ol",[_("li",[a._v("深拷贝和浅拷贝是只针对 Object 和 Array 这样的复杂类型的")]),a._v(" "),_("li",[a._v("也就是说 a 和 b 指向了同一块内存，所以修改其中任意的值，另一个值都会随之变化，这就是浅拷贝")]),a._v(" "),_("li",[a._v("浅拷贝， ”Object.assign() 方法用于将所有可枚举的属性的值从一个或多个源对象复制到目标对象。它将返回目标对象")]),a._v(" "),_("li",[a._v("深拷贝，JSON.parse()和 JSON.stringify()给了我们一个基本的解决办法。但是函数不能被正确处理")])]),a._v(" "),_("h2",{attrs:{id:"开放性问题"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#开放性问题","aria-hidden":"true"}},[a._v("#")]),a._v(" 开放性问题")]),a._v(" "),_("p",[a._v('开放性问题主要是考察候选人业务积累，是否有自己的思考，思考问题的方式，没有标准答案。不过有些问题挺刁的，哈哈哈哈，比如：" 你见过的最好的代码是什么？ "总之提前准备下没错。')]),a._v(" "),_("ol",[_("li",[a._v("先自我介绍一下，说一下项目的技术栈，以及项目中遇到的一些问题")]),a._v(" "),_("li",[a._v("从整体中，看你对项目的认识，框架的认识和自己思考")]),a._v(" "),_("li",[a._v("项目中有没有遇到什么难点，怎么解决")]),a._v(" "),_("li",[a._v("如果你在创业公司你怎么从 0 开始做（选择什么框架，选择什么构建工具）")]),a._v(" "),_("li",[a._v("说一下你项目中用到的技术栈，以及觉得得意和出色的点，以及让你头疼的点，怎么解决的")]),a._v(" "),_("li",[a._v("一个业务场景，面对产品不断迭代，以及需求的变动该怎么应对，具体技术方案实现")]),a._v(" "),_("li",[a._v("你的学习来源是什么")]),a._v(" "),_("li",[a._v("你觉得哪个框架比较好，好在哪里")]),a._v(" "),_("li",[a._v("你觉得最难得技术难点是什么")]),a._v(" "),_("li",[a._v("你见过的最好的代码是什么")])])])}],!1,null,null,null);s.options.__file="common.md";v.default=s.exports}}]);