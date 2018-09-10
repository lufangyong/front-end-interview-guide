# CSS

## 盒模型
`box-sizing`属性主要用来控制元素的盒模型的解析模式。默认值是`content-box`
- content-box：让元素维持W3C的标准盒模型。元素的宽度/高度由border + padding + content的宽度/高度决定，设置width/height属性指的是content部分的宽/高
- border-box：让元素维持IE传统盒模型（IE6以下版本和IE6~7的怪异模式）。设置width/height属性指的是border + padding + content
- 应用场景：统一风格的表单元素
表单中有一些input元素其实还是展现的是传统IE盒模型，带有一些默认的样式，而且在不同平台或者浏览器下的表现不一，造成了表单展现的差异。此时我们可以通过box-sizing属性来构建一个风格统一的表单元素。

## 水平垂直居中
行内布局
- line-height + text-align
- vertical-align + text-align

块布局
- position absolute + margin auto
- position absolute + negative margin
- position absolute + translate(-50%, -50%)

## 上下居中
父容器子容器不确定宽高的块级元素，做上下居中
1. flex
```css
#wrap{
	display:flex;
	justify-content:center;
	align-items:center;
}
```

2. tabel
```css
.parent {
   text-align: center;//水平居中
   display: table-cell;
   vertical-align: middle;//垂直居中
}
.child {
    display: inline-block;//防止块级元素宽度独占一行，内联元素可不设置
}
```

3. absolute+transform 水平垂直居中
```html
<div class="parent">
  <div class="child">Demo</div>
</div>

<style>
  .parent {
    position: relative;
  }
  .child {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>
```
4. webkit-box
```css
//对父级元素设置
position: relative;
display: -webkit-box;
-webkit-box-align: center;
-webkit-box-pack: center;
```

[for detail](https://github.com/hawx1993/tech-blog/issues/12)

## 左边定宽右边自适应

1. table(父级元素)与tabel-cell（两个子集元素）

2. flex(父级元素)+flex :1（右边子元素）

3. 左边定宽，并且左浮动；右边设置距离左边的宽度

4. 左边定宽，左边设置position:absolute；右边设置距离左边的宽度

## 三列布局

中间固定两边自适应宽度
1. 采用浮动布局（左边左浮动，右边右浮动，中间margin：0  宽度值）
2. 绝对定位方式（左右绝对定位，左边left0右边right0，中间上同）

## BFC块级格式化上下文

块格式化上下文（block formatting context） 是页面上的一个独立的渲染区域，容器里面的子元素不会在布局上影响到外面的元素。它是决定块盒子的布局及浮动元素相互影响的一个因素。

下列情况将创建一个块格式化上下文：

1. float
2. overflow
3. display（display为inline-block、table-cell）
4. position（absolute 或 fixed）

## BFC的作用

1. 清除内部浮动：对子元素设置浮动后，父元素会发生高度塌陷，也就是父元素的高度变为0。解决这个问题，只需要把把父元素变成一个BFC就行了。常用的办法是给父元素设置overflow:hidden。
2. 上下margin重合问题，可以通过触发BFC来解决

## 清除浮动
清除浮动，实际上是清除父元素的高度塌陷。因为子元素脱离了父元素的文档流，所以，父元素失去了高度，导致了塌陷。要解决这个问题，就是让父元素具有高度。

浮动元素的特性：
- 在正常布局中位于该浮动元素之下的内容，此时会围绕着浮动元素，填满其右侧的空间。
- 浮动到右侧的元素，其他内容将从左侧环绕它（浮动元素影响的不仅是自己，它会影响周围的元素对其进行环绕。float仍会占据其位置，`position:absolute`不占用页面空间 会有重叠问题  ）

1. 在浮动元素末尾添加空标签清除浮动 clear:both （缺点：增加无意义标签）
```html
<div style="clear:both;"></div>
```
2. 给父元素设置 overflow:auto属性
3. after伪元素

## 动画

用js来实现动画，我们一般是借助setTimeout或setInterval这两个函数，以及新的requestAnimationFrame

```javascript
<div id="demo" style="position:absolute; width:100px; height:100px; background:#ccc; left:0; top:0;"></div>

<script>
  var demo = document.getElementById('demo');
  function rander(){
    demo.style.left = parseInt(demo.style.left) + 1 + 'px'; //每一帧向右移动1px
  }
  requestAnimationFrame(function(){
    rander();
    //当超过300px后才停止
    if(parseInt(demo.style.left)<=300) requestAnimationFrame(arguments.callee);
  });
</script>
```
## css3 keyframes
- @keyframes 结合animation
- transition：property  duration timing-function delay

## css实现自适应正方形

- 方案一：CSS3 vw 单位
- 方案二：设置垂直方向的padding撑开容器
- 方案三：利用伪元素的 margin(padding)-top 撑开容器

## position的值

- absolute :生成绝对定位的元素， 相对于最近一级的 定位不是 static 的父元素来进行定位。
- fixed （老IE不支持）生成绝对定位的元素，通常相对于浏览器窗口或 frame 进行定位。
- relative 生成相对定位的元素，相对于其在普通流中的位置进行定位。
- static 默认值。没有定位，元素出现在正常的流中
- sticky 生成粘性定位的元素，容器的位置根据正常文档流计算得出

## 有哪些多屏适配方案

- media query + rem
- flex
- 弹性布局
- flexiable 整体缩放（动态设置缩放系数的方式，
- 让layout viewport与设计图对应，极大地方便了重构，同时也避免了1px的问题）

## HTML5新特性

- 画布(Canvas) API
- 地理(Geolocation) API
- 音频、视频API(audio,video)
- localStorage和sessionStorage
- webworker, websocket
- header,nav,footer,aside,article,section

web worker是运行在浏览器后台的js程序，他不影响主程序的运行，是另开的一个js线程，可以用这个线程执行复杂的数据操作，然后把操作结果通过postMessage传递给主线程，这样在进行复杂且耗时的操作时就不会阻塞主线程了。



