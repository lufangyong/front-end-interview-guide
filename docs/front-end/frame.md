# 框架

vue 官方：[对比其他框架](https://cn.vuejs.org/v2/guide/comparison.html)

## react 和 vue 的区别

相同点：

- 都支持服务端渲染
- 都有 Virtual DOM，组件化开发，通过 props 参数进行父子组件数据的传递，都实现 webComponents 规范
- 数据驱动视图
- 都有支持 native 的方案，React 的 React native，Vue 的 weex

不同点：

- React 严格上只针对 MVC 的 view 层，Vue 则是 MVVM 模式
- virtual DOM 不一样
  vue 会跟踪每一个组件的依赖关系，不需要重新渲染整个组件树。而对于 React 而言，每当应用的状态被改变时，全部子组件都会重新渲染。当然，这可以通过 shouldComponentUpdate 这个生命周期方法来进行控制，
- 组件写法不一样
  React 推荐的做法是 JSX + inline style，也就是把 HTML 和 CSS 全都写进 JavaScript 了，即”all in js”
  Vue 推荐的是使用 `webpack + vue-loader` 的单文件组件格式，即 html,css,js 写在同一个文件；
- 数据绑定：Vue 有实现了双向数据绑定，React 数据流动是单向的
- state 对象在 react 应用中是不可变的，需要使用 setState 方法更新状态；在 Vue 中，state 对象并不是必须的，数据由 data 属性在 Vue 对象中进行管理。

## react

### react 的优缺点

我觉得这优缺点就因人而异，见仁见智了。

优点：

- 可以通过函数式方法描述视图组件（好处：相同的输入会得到同样的渲染结果，不会有副作用；组件不会被实例化，整体渲染性能得到提升）
- 集成虚拟 DOM（性能好）
- 单向数据流（好处是更容易追踪数据变化排查问题
- 一切都是 component：代码更加模块化，重用代码更容易，可维护性高
- 大量拥抱 es6 新特性
- jsx

缺点：

- jsx 的一个问题是，渲染函数常常包含大量逻辑，最终看着更像是程序片段，而不是视觉呈现。后期如果发生需求更改，维护起来工作量将是巨大的
- 大而全，上手有难度

### jsx 的优缺点

- 允许使用熟悉的语法来定义 HTML 元素树
- JSX 让小组件更加简单、明了、直观。
- 更加语义化且易懂的标签
- JSX 本质是对 JavaScript 语法的一个扩展，看起来像是某种模板语言，但其实不是。但正因为形似 HTML，描述 UI 就更直观了，也极大地方便了开发；
- 在 React 中 babel 会将 JSX 转换为`React.createElement`函数调用，然后将 JSX 转换为正确的 JSON 对象（VDOM 也是一个“树”形的结构）
- React/JSX 乍看之下，觉得非常啰嗦，但使用 JavaScript 而不是模板语法来开发（模板语法比较有局限性），赋予了开发者许多编程能力。

### dom diff 算法和虚拟 DOM

React 中的 render 方法，返回一个 DOM 描述，结果仅仅是轻量级的 js 对象。

Reactjs 只在调用 setState 的时候会更新 dom，而且还是先更新 Virtual Dom，然后和实际 DOM 比较，最后再更新实际 DOM。

React.js 厉害的地方并不是说它比 DOM 快（这句话本来就是错的），而是说不管你数据怎么变化，我都可以以最小的代价来更新 DOM。方法就是我在内存里面用新的数据刷新一个虚拟的 DOM 树，然后新旧 DOM 树进行比较，找出差异，再更新到真正的 DOM 树上。

当我们修改了 DOM 树上一些节点对应绑定的 state，React 会立即将它标记为“脏状态”。在事件循环的最后才重新渲染所有的脏节点。在实际的代码中，会对新旧两棵树进行一个深度优先的遍历，这样每个节点都会有一个唯一的标记，每遍历到一个节点就把该节点和新的的树进行对比。如果有差异的话就记录到一个对象里面，最后把差异应用到真正的 DOM 树上。

算法实现

1. 步骤一：用 JS 对象模拟 DOM 树
2. 步骤二：比较两棵虚拟 DOM 树的差异
3. 步骤三：把差异应用到真正的 DOM 树上

这就是所谓的 diff 算法

dom diff 采用的是增量更新的方式，类似于打补丁。React 需要为数据添加 key 来保证虚拟 DOM diff 算法的效率。key 属性可以帮助 React 定位到正确的节点进行比较，从而大幅减少 DOM 操作次数，提高了性能。

`virtual dom`，也就是虚拟节点。它通过 JS 的 Object 对象模拟 DOM 中的节点，然后再通过特定的 render 方法将其渲染成真实的 DOM 节点。

[怎么更好的理解虚拟 dom?](http://react-china.org/t/dom/638)

#### 为什么 js 对象模拟 DOM 会比 js 操作 DOM 来得快

为了解决频繁操作 DOM 导致 Web 应用效率下降的问题，React 提出了“虚拟 DOM”（virtual DOM）的概念。Virtual DOM 是使用 JavaScript 对象模拟 DOM 的一种对象结构。DOM 树中所有的信息都可以用 JavaScript 表述出来，例如：

```html
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
```

可以用以下 JavaScript 对象来表示：

```js
{
  tag: 'ul',
  children: [{
    tag: 'li', children: ['Item 1'],
    tag: 'li', children: ['Item 2'],
    tag: 'li', children: ['Item 3']
  }]
}
```

这样可以避免直接频繁地操作 DOM，只需要在 js 对象模拟的虚拟 DOM 进行比对，再将更改的部分应用到真实的 DOM 树上

### react 组件性能优化

使用 PureRenderMixin、shouldComponentUpdate 来避免不必要的虚拟 DOM diff，在 render 内部优化虚拟 DOM 的 diff 速度，以及让 diff 结果最小化。

### react 组件间的数据传递

1. 兄弟组件不能直接相互传送数据，此时可以将数据挂载在父组件中，由两个组件共享

2. 子组件向父组件通讯，可以通过父组件定义事件（回调函数），子组件调用该函数，通过实参的形式来改变父组件的数据来通信

```javascript
//子组件
this.props.onCommentSubmit({author, content, date:new Date().getTime()});
//父组件
render(){
    return(
      <div className="m-index">
        <div>
          <h1>评论</h1>
        </div>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} />
      </div>
    )
}
```

3. 非父子组件间的通信：可以使用全局事件来实现组件间的沟通，React 中可以引入 eventProxy 模块，利用`eventProxy.trigger()`方法发布消息，`eventProxy.on()`方法监听并接收消息。
4. 组件间层级太深，可以使用上下文方式，让子组件直接访问祖先的数据或函数，通过`this.context.xx`

### 无状态组件

无状态组件其实本质上就是一个函数，传入 props 即可，没有 state，也没有生命周期方法。组件本身对应的就是 render 方法。例子如下：

```javascript
function Title({ color = 'red', text = '标题' }) {
  let style = {
    color: color
  }
  return <div style={style}>{text}</div>
}
```

无状态组件不会创建对象，故比较省内存。没有复杂的生命周期方法调用，故流程比较简单。没有 state，也不会重复渲染。它本质上就是一个函数而已。

对于没有状态变化的组件，React 建议我们使用无状态组件。总之，能用无状态组件的地方，就用无状态组件。

### 高阶组件

高阶组件（HOC）是函数接受一个组件，返回一个新组件。其前身其实是用 ES5 创建组件时可用的 mixin 方法，但是在 react 版本升级过程中，使用 ES6 语法创建组件时，认为 mixin 是反模式，影响了 react 架构组件的封装稳定性，增加了不可控的复杂度，逐渐被 HOC 所替代。
实现高阶组件的方式有：

#### 属性代理

```javascript
import React, { Component } from 'React'
//高阶组件定义
const HOC = WrappedComponent =>
  class WrapperComponent extends Component {
    render() {
      return <WrappedComponent {...this.props} />
    }
  }
//普通的组件
class WrappedComponent extends Component {
  render() {
    //....
  }
}

//高阶组件使用
export default HOC(WrappedComponent)
```

#### 反向继承

反向继承是指返回的组件去继承之前的组件(这里都用 WrappedComponent 代指)

```javascript
const HOC = WrappedComponent =>
  class extends WrappedComponent {
    render() {
      return super.render()
    }
  }
```

我们可以看见返回的组件确实都继承自 WrappedComponent,那么所有的调用将是反向调用的(例如:super.render())，这也就是为什么叫做反向继承。

### react 事件和传统事件有什么区别吗

React 实现了一个“合成事件”层（synthetic event system），这个事件模型保证了和 W3C 标准保持一致，所以不用担心有什么诡异的用法，并且这个事件层消除了 IE 与 W3C 标准实现之间的兼容问题。

“合成事件”还提供了额外的好处：

事件委托

“合成事件”会以事件委托（event delegation）的方式绑定到组件最上层，并且在组件卸载（unmount）的时候自动销毁绑定的事件。

### react 组件生命周期

react 组件更新过程：

props/state change：

1. componentWillReceiveProps(nextProps)

只要是父组件的 render 被调用，在 render 中被渲染的子组件就会经历更新的过程。不管父组件传给子组件的 props 有没有改变，都会触发子组件的此函数被调用。注意：通过 setState 方法触发的更新不会调用此函数

2. shouldComponentUpdate(nextProps,nextState)
3. componentWillUpdate
4. render
5. componentDidUpdate

## vue

### vue 双向绑定底层实现原理

vue.js 采用数据劫持的方式，结合发布者-订阅者模式，通过`Object.defineProperty()`来劫持各个属性的 setter，getter 以监听属性的变动，在数据变动时发布消息给订阅者，触发相应的监听回调：

[关于 vue2.0 的实现源码剖析(一)](https://github.com/hawx1993/tech-blog/issues/11)

### vue 虚拟 DOM 和 react 虚拟 DOM 的区别

在渲染过程中，会跟踪每一个组件的依赖关系，不需要重新渲染整个组件树。而对于 React 而言，每当应用的状态被改变时，全部子组件都会重新渲染。
在 React 应用中，当某个组件的状态发生变化时，它会以该组件为根，重新渲染整个组件子树。

如要避免不必要的子组件的重新渲染，你需要在所有可能的地方使用 PureComponent，或是手动实现`shouldComponentUpdate` 方法

在 React 中，数据流是自上而下单向的从父节点传递到子节点，所以组件是简单且容易把握的，子组件只需要从父节点提供的 props 中获取数据并渲染即可。如果顶层组件的某个 prop 改变了，React 会递归地向下遍历整棵组件树，重新渲染所有使用这个属性的组件。

### v-show 和 v-if 区别

与 v-if 不同的是，无论 v-show 的值为 true 或 false，元素都会存在于 HTML 代码中；而只有当 v-if 的值为 true，元素才会存在于 HTML 代码中

### vue 组件通信

非父子组件间通信，Vue 有提供 Vuex，以状态共享方式来实现同信，对于这一点，应该注意考虑平衡，从整体设计角度去考量，确保引入她的必要。

父传子: `this.$refs.xxx`
子传父: `this.$parent.xxx`

还可以通过`$emit`方法出发一个消息，然后`$on`接收这个消息

### 你如何评价 vue

框架能够让我们跑的更快，但只有了解原生的 JS 才能让我们走的更远。

vue 专注于 MVVM 中的 viewModel 层，通过双向数据绑定，把 view 层和 Model 层连接了起来。核心是用数据来驱动 DOM。这种把 directive 和 component 混在一起的设计有一个非常大的问题，它导致了很多开发者滥用 Directive（指令），出现了到处都是指令的情况。

优点：

1. 不需要 setState，直接修改数据就能刷新页面，而且不需要 react 的 shouldComponentUpdate 就能实现最高效的渲染路径。
2. 渐进式的开发模式，模版方式->组件方式->路由整合->数据流整合->服务器渲染。上手的曲线更加平滑简单，而且不像 react 一上来就是组件全家桶
3. v-model 给开发后台管理系统带来极大的便利，反观用 react 开发后台就是个杯具
4. html，css 与 js 比 react 更优雅地结合在一个文件上。

缺点：

1. 指令太多
2. 自带模板扩展不方便
3. 组件的属性传递没有 react 的直观和明显

### 说说你对 MVVM 的理解

- Model 层代表数据模型，可以在 Model 中定义数据修改和操作业务逻辑；
- view 代表 UI 组件。负责将数据模型转换成 UI 展现出来
- ViewModel 是一个同步 View 和 Model 的对象

用户操作 view 层，view 数据变化会同步到 Model，Model 数据变化会立即反应到 view 中。viewModel 通过双向数据绑定把 view 层和 Model 层连接了起来

### 为什么选择 vue

- reactjs 的全家桶方式，实在太过强势，而自己定义的 JSX 规范，揉和在 JS 的组件框架里，导致如果后期发生页面改版工作，工作量将会巨大。
- vue 的核心：数据绑定 和 视图组件。
- Vue 的数据驱动：数据改变驱动了视图的自动更新，传统的做法你得手动改变 DOM 来改变视图，vuejs 只需要改变数据，就会自动改变视图，一个字：爽。再也不用你去操心 DOM 的更新了，这就是 MVVM 思想的实现。
- 视图组件化：把整一个网页的拆分成一个个区块，每个区块我们可以看作成一个组件。网页由多个组件拼接或者嵌套组成

### vue 中 mixin 与 extend 区别

全局注册混合对象，会影响到所有之后创建的 vue 实例，而`Vue.extend`是对单个实例进行扩展。

mixin 混合对象（组件复用）

同名钩子函数（bind，inserted，update，componentUpdate，unbind）将混合为一个数组，因此都将被调用，混合对象的钩子将在组件自身钩子之前调用

`methods`，`components`，`directives`将被混为同一个对象。两个对象的键名（方法名，属性名）冲突时，取组件（而非 mixin）对象的键值对

### 双向绑定和单向数据绑定的优缺点

单向数据流

- 只有 UI 控件 才存在双向，非 UI 控件 只有单向。
- 单向绑定的优点是可以带来单向数据流，这样的好处是流动方向可以跟踪，流动单一，没有状态, 这使得单向绑定能够避免状态管理在复杂度上升时产生的各种问题, 程序的调试会变得相对容易。
- 单向数据流更利于状态的维护及优化，更利于组件之间的通信，更利于组件的复用

双向数据流的优点：

无需进行和单向数据绑定的那些 CRUD（Create，Retrieve，Update，Delete）操作；
双向绑定在一些需要实时反应用户输入的场合会非常方便
用户在视图上的修改会自动同步到数据模型中去，数据模型中值的变化也会立刻同步到视图中去；

双向数据流的缺点：

- 双向数据流是自动管理状态的, 但是在实际应用中会有很多不得不手动处理状态变化的逻辑, 使得程序复杂度上升无法追踪局部状态的变化
- 双向数据流，值和 UI 绑定，但由于各种数据相互依赖相互绑定，导致数据问题的源头难以被跟踪到

Vue 虽然通过 v-model 支持双向绑定，但是如果引入了类似 redux 的 vuex，就无法同时使用 v-model。

双绑跟单向绑定之间的差异只在于，双向绑定把数据变更的操作隐藏在框架内部，调用者并不会直接感知。

```html
<input v-model="something">
<!-- 等价于以下内容 -->
<input :value="something" @input="something = $event.target.value">
```

也就是说，你只需要在组件中声明一个 name 为 value 的 props，并且通过触发 input 事件传入一个值，就能修改这个 value。

## 前端路由实现方式

两种实现前端路由的方式

- HTML5 History 两个新增的 API：history.pushState 和 history.replaceState，两个 API 都会操作浏览器的历史记录，而不会引起页面的刷新。
- Hash 就是 url 中看到 # ,我们需要一个根据监听哈希变化触发的事件( hashchange) 事件。我们用 window.location 处理哈希的改变时不会重新渲染页面，而是当作新页面加到历史记录中，这样我们跳转页面就可以在 hashchange 事件中注册 ajax 从而改变页面内容。

可以为 hash 的改变添加监听事件：

```js
window.addEventListener('hashchange', funcRef, false)
```

优点

- 从性能和用户体验的层面来比较的话，后端路由每次访问一个新页面的时候都要向服务器发送请求，然后服务器再响应请求，这个过程肯定会有延迟。而前端路由在访问一个新页面的时候仅仅是变换了一下路径而已，没有了网络延迟，对于用户体验来说会有相当大的提升。
- 前端路由的优点有很多，比如页面持久性，像大部分音乐网站，你都可以在播放歌曲的同时，跳转到别的页面而音乐没有中断，再比如前后端彻底分离。
  开发一个前端路由，主要考虑到页面的可插拔、页面的生命周期、内存管理等。

缺点

- 使用浏览器的前进，后退键的时候会重新发送请求，没有合理地利用缓存。
- History interface 提供了两个新的方法：`pushState()`, `replaceState()`使得我们可以对浏览器历史记录栈进行修改：

```js
window.history.pushState(stateObject, title, URL)
window.history.replaceState(stateObject, title, URL)
```
