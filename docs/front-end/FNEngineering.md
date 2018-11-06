# 前端工程化

## 说说你对前端工程化的理解

- 前端工程化不外乎两点，规范和自动化。
- 规范:
  - 包括 团队开发规范，模块化开发，组件化开发，组件仓库，性能优化，部署，测试，开发流程，开发工具，脚手架，git 工作流，团队协作
- 自动化:
  - 构建工具、持续集成、系统测试、日志统计、上线部署、敏捷开发、性能优化、基础框架

## webpack 问题相关

### loader 和 plugin 区别

loader 用于加载某些资源文件，因为 webpack 本身只能打包 CommonJS 规范的 js 文件，对于其他资源，例如 css，图片等，是没有办法加载的，这就需要对应的 loader 将资源转换
plugin 用于扩展 webpack 的功能，直接作用于 webpack，loader 只专注于转换文件，而 plugin 不仅局限于资源加载

Loader 只能处理单一文件的输入输出，而 Plugin 则可以对整个打包过程获得更多的灵活性，譬如 ExtractTextPlugin，它可以将所有文件中的 css 剥离到一个独立的文件中，这样样式就不会随着组件加载而加载了。

### 什么是 chunk

Webpack 提供一个功能可以拆分模块，每一个模块称为 chunk，这个功能叫做 Code Splitting。你可以在你的代码库中定义分割点，调用 require.ensure，实现按需加载

### 如何开发一个 loader，原理是啥

A loader is a node module exporting a function.

缓存： Webpack Loader 同样可以利用缓存来提高效率，并且只需在一个可缓存的 Loader 上加一句 this.cacheable()
异步：在一个异步的模块中，回传时需要调用 Loader API 提供的回调方法 this.async()

### 打包原理

webpack 打包，最基本的实现方式，是将所有的模块代码放到一个数组里，通过数组 ID 来引用不同的模块

```javascript
/************************************************************************/
/******/ ;[
  /* 0 */
  /***/ function(module, exports, __webpack_require__) {
    __webpack_require__(1)
    __webpack_require__(2)
    console.log('Hello, world!')

    /***/
  },
  /* 1 */
  /***/ function(module, exports) {
    var a = 'a.js'
    console.log("I'm a.js")

    /***/
  },
  /* 2 */
  /***/ function(module, exports) {
    var b = 'b.js'
    console.log("I'm b.js")

    /***/
  }
  /******/
]
```

可以发现入口 entry.js 的代码是放在数组索引 0 的位置，其它 a.js 和 b.js 的代码分别放在了数组索引 1 和 2 的位置，而 webpack 引用的时候，主要通过`__webpack_require__`的方法引用不同索引的模块。

### webpack 和 gulp 的区别

webpack 是一种模块化打包工具，主要用于模块化方案，预编译模块的方案；gulp 是工具链、构建工具，可以配合各种插件做 js 压缩，css 压缩，less 编译 替代手工实现自动化工作。

Grunt/Gulp 更多的是一种工作流；提供集成所有服务的一站式平台；
gulp 可以用来优化前端工作流程。

### 如何写一个 plugin

Compiler 在开始打包时就进行实例化，实例对象里面装着与打包相关的环境和参数，包括 options、plugins 和 loaders 等。

compilation 对象，它继承于 compiler，所以能拿到一切 compiler 的内容。Compilation 表示有关模块资源，已编译资源，Compilation 在每次文件变化重新打包时都进行一次实例化

apply 方法：当安装这个插件的时候，这个 apply 方法就会被 webpack compiler 调用。

```javascript
function HelloWorldPlugin(options) {
  // Setup the plugin instance with options...
}

HelloWorldPlugin.prototype.apply = function(compiler) {
  compiler.plugin('done', function() {
    console.log('Hello World!')
  })
}

module.exports = HelloWorldPlugin
```

### webpack 打包后文件体积过大怎么办？

很多方法：异步加载模块（代码分割）；提取第三方库（使用 cdn 或者 vender）；代码压缩；去除不必要的插件；去除 devtool 选项，dllplugin 等等。

## babel 的原理

- 使用 babylon 解析器对输入的源代码字符串进行解析并生成初始 AST
- 遍历 AST 树并应用各 transformers（plugin） 生成变换后的 AST 树
- 利用 babel-generator 将 AST 树输出为转码后的代码字符串

分为三个阶段：

- 解析：将代码字符串解析成抽象语法树
- 变换：对抽象语法树进行变换操作
- 再建：根据变换后的抽象语法树再生成代码字符串
