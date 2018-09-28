# Node

- 核心模块：EventEmitter, Stream, FS, Net和全局对象
- 全局对象：process, console, Buffer和exports
- `exports`和`module.exports`区别
- `exports` 是 `module.exports` 的一个引用
- module.exports 初始值为一个空对象 {}，所以 exports 初始值也是 {}
- require 引用模块后，返回的是 module.exports 而不是 exports

## 单线程优点
Node.js依托于v8引擎，都是以单线程为基础的。单线程资源占用小。单线程避免了传统PHP那样频繁创建、切换线程的开销，使执行速度更加迅速

## I/O的异步和非阻塞
Node.js是如何做到I/O的异步和非阻塞的呢
- 其实Node在底层访问I/O还是多线程的。Node可以借助livuv来来实现多线程。
- 如果我们非要让Node.js支持多线程，还是提倡使用官方的做法，利用libuv库来实现。
- cluster可以用来让Node.js充分利用多核cpu的性能

## 并行与并发，进程与线程

- 并发 (Concurrent) = 2 队列对应 1 咖啡机.
- 并行 (Parallel) = 2 队列对应 2 咖啡机.
- 线程是进程下的执行者，一个进程至少会开启一个线程（主线程），也可以开启多个线程。

## Nodejs优缺点

优点：
1. 事件驱动，异步编程，占用内存少
2. npm设计得好

缺点：
1. Debug 很困难。没有 stack trace，出了问题很难查找问题的原因；
2. 如果设计不好，很容易让代码充满 callback，代码不优雅；
3. 可靠性低；
4. 单进程，单线程，只支持单核CPU，不能充分的利用多核CPU服务器。
