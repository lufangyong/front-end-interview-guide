# 设计模式

要想成为优秀的前端开发者，会设计模式是必备条件

## 论工程师的设计能力

- 3 年工作经验，面试必考设计能力
- 成为项目负责人，设计能力是必要基础
- 从写好代码，到做好设计，设计模式是必经之路

## 何为设计

- 即按照哪一种思路或者标准来实现功能
- 功能相同，可以有不同的设计方案来实现
- 伴随着需求的增加，设计的作用才能体现出来

## 《UNIX/LINUX 设计哲学》

- 准则 1：小即是美
- 准则 2：让程序做好一件事情
- 准则 3：快速建立模型
- 准则 4：舍弃高效率而取可移植性
- 准则 5：采用纯文本来存储数据
- 准则 6：充分利用软件的杠杆原理（软件复用）
- 准则 7：使用 shell 脚本来提高杠杆效应和移植性
- 准则 8：避免强制性的用户界面
- 准则 9：让每个程序都称为过滤器

## 《UNIX/LINUX 设计哲学》 - 小准则

- 允许用户定制环境
- 尽量使用操作系统内核而轻化
- 使用小写字母尽量简写
- 沉默是金
- 各部分之和大于整体
- 寻求 90%的解决方案

## S O L I D 五大设计原则

- S：单一职责原则
- O：开放封闭原则
- L：里氏置换原则
- I：接口独立原则
- D：依赖导致原则

### S：单一职责原则

- 一个程序只做好一件事
- 如果功能过于复杂就拆分开，每个部分保持独立

### O：开放封闭原则

- 对扩展开放，对修改封闭
- 增加需求时，扩展新代码，而非修改已有代码
- 这是软件设计的终极目标

### L：里氏置换原则

- 子类能够覆盖父类
- 弗雷能出现的地方子类就能出现
- JS 中使用较少（弱类型 & 继承使用较少）

### I：接口独立原则

- 保持接口的单一独立，避免出现“胖接口”
- JS 中没有接口（typescript 列外），使用较少
- 类似与单一职责原则，这里更关注接口

### D：依赖导致原则

- 面向接口编程，依赖与抽象而不是依赖于具体
- 使用方只关注接口而不是管局具体类的实现
- JS 中使用较少（没有接口 & 弱类型）

## 设计原则总结

- S O 体现多
- L I D 体现少，了解其用意

## 用 Promise 来说明 S O

- 单一职责原则：每个 then 中的逻辑只做好一件事
- 开放封闭原则：如果新增需求，扩展 then

```js
// 加载图片
function loadImg() {
  return new Promise((resolve, reject) => {
    let img = document.createElement('img')
    img.onload = function() {
      resolve(img)
    }
    img.onerror = function() {
      reject('图片加载失败')
    }
    img.src = src
  })
}

var src = 'xxx.png'
var result = loadImg(src)

result
  .then(img => {
    // part1
    console.log('img width', img.width)
    return img
  })
  .then(img => {
    // part2
    console.log('img height', img.height)
    return img
  })
  .then(img => {
    // part3
  })
  .catch(err => {
    console.log(err)
  })
```

## 设计模式的分类

总体来说设计模式分为三大类：

- 创建型模式，共五种：工厂方法模式、抽象工厂模式、单例模式、建造者模式、原型模式。
- 结构型模式，共七种：适配器模式、装饰器模式、代理模式、外观模式、桥接模式、组合模式、享元模式。
- 行为型模式，共十一种：策略模式、模板方法模式、观察者模式、迭代子模式、责任链模式、命令模式、备忘录模式、状态模式、访问者模式、中介者模式、解释器模式

## 如何学习设计模式

- 明白每个设计的道理和用意
- 通过经典应用体会它的真正使用场景
- 自己编码时多思考，尽量模仿

## 工厂模式

工厂模式是我们最常用的实例化对象模式了，是用工厂方法代替 new 操作的一种模式。著名的 Jive 论坛 ,就大量使用了工厂模式，工厂模式在 Java 程序系统可以说是随处可见。因为工厂模式就相当于创建实例对象的 new，我们经常要根据类 Class 生成实例对象，如 var a=new A() 工厂模式也是用来创建实例对象的，所以以后 new 时就要多个心眼，是否可以考虑使用工厂模式，虽然这样做，可能多做一些工作，但会给你系统带来更大的可扩展性和尽量少的修改量

#### 模式作用

1. 对象的构建十分复杂
2. 需要依赖具体的环境创建不同实例
3. 处理大量具有相同属性的小对象

#### 注意事项

不能滥用工厂,有时候仅仅是给代码增加复杂度

#### 举个栗子

```js
//工厂应该有厂长,来决定运行哪条生产线
// 消费者->子类
var gongchang = {} //定义工厂
//工厂生产衣服方法
gongchang.chanyifu = function(argument) {
  this.gongren = 50 //工人属数量
  this.shengchangxiaolv = 2 //生产效率
  console.log('我们有' + this.gongren + '个工人')
  console.log('生产了' + this.gongren * this.shengchangxiaolv + '件衣服')
}
//工厂生产鞋子方法
gongchang.chanxie = function() {
  console.log('产鞋子')
}
gongchang.yunshu = function() {
  console.log('运输')
}
gongchang.changzhang = function(para) {
  return new gongchang[para]()
  //构造函数模式 单例模式
}
var me = gongchang.changzhang('chanyifu') //我们有50个工人 生产了100件衣服
```

## 单例模式

单例模式是一种常用的软件设计模式。在它的核心结构中只包含一个被称为单例类的特殊类。通过单例模式可以保证系统中一个类只有一个实例而且该实例易于外界访问，从而方便对实例个数的控制并节约系统资源。如果希望在系统中某个类的对象只能存在一个，单例模式是最好的解决方案。

#### 模式作用:

1. 模块间通信
2. 系统中某个类的对象只能存在一个
3. 保护自己的属性和方法

#### 注意事项:

- 注意 this 的使用

#### 举个栗子

```js
// 1.独立的对象 建2个 一个xiaowang 一个xiaoli
// 2.让xiaoli跟xiaowang通过门铃互相通信
// 3.先看一下小wang家有没有门,如果没有门直接通过门铃通讯dididi,如果没有先建门
// 4.两个单例之间开始通信
var xiaowang = (function(argument) {
  var xiaowangjia = function(message) {
    this.menling = message
  }
  var men
  var info = {
    sendMessage: function(message) {
      if (!men) {
        men = new xiaowangjia(message)
      }
      return men
    }
  }
  return info
})()
var xiaoli = {
  callXiaoming: function(msg) {
    var _xw = xiaowang.sendMessage(msg)
    console.log(_xw.menling)
    _xw = null
  }
}
xiaoli.callXiaoming('dididi') //dididi
```

页面中有若干按钮,如果用$('#id').click(function(){ }),如果逻辑特别多会很乱,数据间通信困难,改用单例模式如下:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>单例模式</title>
    <script src="http://cdn.bootcss.com/jquery/3.0.0-alpha1/jquery.min.js"></script>
</head>
<body>
    <button id="a">a</button>
    <button id="d">d</button>
    <script>
    $(function() {
        var top = {
            init: function() {
                this.render();
                this.bind();
            },
            a: 4,
            render: function() {
                var me = this;
                me.btna = $("#a");
            },
            bind: function() {
                var me = this;
                me.btna.click(function() {
                    me.test()
                })
            },
            test: function() {
                a = 5;
                console.log(a)
            }
        }
        var banner = {
            init: function() {
                this.render();
                this.bind();
            },
            a: 4,
            render: function() {
                var me = this;
                me.btnd = $("#d");
            },
            bind: function() {
                var me = this;
                me.btna.click(function() {
                    me.test()
                })
            },
            test: function() {
                top.a = 6;
                console.log(top.a)
            }
        }
        top.init();
        banner.init();
    })
    </script>
</body>
</html>
```

## 观察者模式

观察者模式（Observer）完美的将观察者和被观察的对象分离开。举个例子，用户界面可以作为一个观察者，业务数据是被观察者，用户界面观察业务数据的变化，发现数据变化后，就显示在界面上。面向对象设计的一个原则是：系统中的每个类将重点放在某一个功能上，而不是其他方面。一个对象只做一件事情，并且将他做好。观察者模式在模块之间划定了清晰的界限，提高了应用程序的可维护性和重用性。

观察者设计模式定义了对象间的一种一对多的依赖关系，以便一个对象的状态发生变化时，所有依赖于它的对象都得到通知并自动刷新。

#### 模式作用:

1. 支持简单的广播通信,自动通知所有已经订阅过的对象
2. 页面载入后目标对象很容易与观察者存在一种动态关联,增加了灵活性
3. 目标对象与观察者之间的抽象耦合关系能够单独扩展以及重用

#### 注意事项:

- 监听要在触发之前

#### 举个栗子

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>观察者模式</title>
	<script src="http://cdn.bootcss.com/jquery/3.0.0-alpha1/jquery.min.js"></script>
</head>
<body>
	<script>
		~(function(){
			var o=$({});
			$.jianting=function(){
				o.on.apply(o,arguments)
			}
			$.fabu=function(){
				o.trigger.apply(o,arguments)
			}
			$.qingchu=function(){
				o.off.apply(o,arguments)
			}
		})()
		$.jianting('myEvent',function(e,a,b,c){
			alert(a+"||"+b+'||'+c);
		})
		setTimeout(function(){
			$.fabu('myEvent',[1,2,3])
		},1000)
	</script>
</body>
</html>
```

## 代理模式:

代理模式的定义：为其他对象提供一种代理以控制对这个对象的访问。在某些情况下，一个对象不适合或者不能直接引用另一个对象，而代理对象可以在客户端和目标对象之间起到中介的作用。

#### 模式作用:

1. 远程代理(一个对象将不同空间的对象进行局部代理)
2. 虚拟代理(根据需要创建开销很大的对象如渲染网页暂时用占位图代替真图)
3. 安全代理(控制真实对象的访问权限)
4. 智能指引(调用对象代理处理另外一些事情如垃圾回收机制)

#### 注意事项:

- 不能滥用代理,有时候仅仅是给代码增加复杂度

#### 举个栗子

```js
//代理模式需要3方
//1.买家
function maijia(name) {
  this.name = name
}
// 2.中介 卖房
function zhongjie() {}
zhongjie.prototype.maifang = function() {
  new fangdong(new maijia('小明')).maifang('20万')
}
// 3.房东 坐等收钱
function fangdong(maijia) {
  this.maijia_name = maijia.name
  this.maifang = function(money) {
    console.log('收到了来自[' + this.maijia_name + ']' + money + '人民币')
  }
}
new zhongjie().maifang() //收到了来自[小明]20万人民币
```

虚拟代理实现图片预加载

虚拟代理是把一些开销很大的对象,延迟到真正需要到它的时候才去创建

在 web 开发中,图片预加载是一种常用的技术,如果直接给某个 img 标签节点设置 src 属性,由于图片过大或者网络不佳,图片的往往有段时间会是一片空白.常用的做法是先用一张 loading 图片占位,然后用异步的方式加载图片,等图片加在好了再把它填充到 img 节点了,这种场景就很适合使用虚拟代理

```js
var myImage = (function() {
  var imgNode = new Image()
  document.body.appendChild(imgNode)
  return {
    setSrc: function(src) {
      imgNode.src = src
    }
  }
})()
var proxyImage = (function() {
  var img = new Image()
  img.onload = function() {
    myImage.setSrc(this.src)
  }
  return {
    setSrc: function(src) {
      myImage.setSrc('loading.gif')
      img.src = src
    }
  }
})()
proxyImage.setSrc('http://www.baidu.com/img/bdlogo.png')
```

## 命令模式

在软件系统中，“行为请求者”与“行为实现者”通常呈现一种“紧耦合”。但在某些场合，比如要对行为进行“记录、撤销/重做、事务”等处理，这种无法抵御变化的紧耦合是不合适的。在这种情况下，如何将“行为请求者”与“行为实现者”解耦？将一组行为抽象为对象，实现二者之间的松耦合。这就是命令模式（Command Pattern）。

#### 注意事项:

- 不需要接口一致,直接调用函数即可,以免造成浪费

#### 举个栗子

```js
var lian={};
lian.paobing=function(pao_num){
	console.log(pao_num+"炮"+"开始战斗");
}
lian.bubing=function(bubing_num){
	console.log(bubing_num+"人"+"开始战斗")
}
lian.lianzhang=function(mingling){
	lian[mingling.type](mingling.num)
}
lian.lianzhang({
	type:"paobing",
	num:"100"
})
lian.lianzhang({
	type:"bubing",
	num:"50"
}
```

## 外观模式

外观模式（Facade），为子系统中的一组接口提供一个一致的界面，定义一个高层接口，这个接口使得这一子系统更加容易使用。

#### 模式作用:

1. 在设计初期,应该有意识地将不同的两个层分离,比如经典的三层结构
2. 在开发阶段,子系统往往因为不断的重构演化而变得越来越复杂,增加外观模式可以提供一个简单的接口,减少他们之间的依赖
3. 在维护一个遗留的大型系统时,为系统开发一个外观 Facade 类,为设计粗糙和高度复杂的遗留代码一共比较清晰的接口,让新系统和 Facade 类对象交互

#### 注意事项:

- 外观模式被开发者连续使用时会产生一定的性能问题,因为每次调用时都要检测功能的可用性(PS:可用函数的惰性加载来解决

#### 举个栗子

```js
function stopEvent(e) {
  // 同时阻止事件默认行为和时间冒泡
  e.stopPropagation()
  e.preventDefault()
}
// stopEvent本身就是外观
$('#btn').click(function(e) {
  stopEvent(e)
})
```

## 迭代器模式

迭代器模式（Iterator），提供一种方法顺序访问一个聚合对象中的各种元素，而又不暴露该对象的内部表示。

#### 模式作用:

1. 为遍历不同的集合结构提供一个统一的接口,从而支持同样的算法在不同的集合结构上进行操作
2. 对于集合内部结果常常变化各异,我们不想暴露其内部结构的话,但又想让客户代码透明地访问其中的元素,这种情况下我们可以使用迭代器模式

#### 注意事项:

- 一般的迭代,我们至少要有 2 个方法,hasNext()和 Next(),这样才能做到遍历所有对象
- 遍历的同时更改迭代器所在的集合结构可能会导致问题(比如 C#的 foreach 不允许修改 item)

#### 举个栗子

```js
var arr = ['1', '2', '3']
var diedai = (function() {
  var length = arr.length,
    index = 0
  return {
    hasNext: function() {
      return index < length
    },
    next: function() {
      var data = arr[index]
      index = index + 1
      return data
    },
    reset: function() {
      index = 0
    }
  }
})()
while (diedai.hasNext()) {
  console.log(diedai.next()) //1,2,3
}
```

## 适配器模式

在计算机编程中，适配器模式（有时候也称包装样式或者包装）将一个类的接口适配成用户所期待的。一个适配允许通常因为接口不兼容而不能在一起工作的类工作在一起，做法是将类自己的接口包裹在一个已存在的类中。

#### 模式作用:

1. 使用一个已经存在的对象,但其方法与接口不符合你的要求
2. 创建一个可复用的对象,该对象可以与其他不相关或不可见的对象协同工作
3. 使用一个已经存在的一个或多个对象,但是不能进行继承已匹配它的接口

#### 注意事项:

- 与代理模式的区别,代理模式是不改变原接口,适配模式是原接口不符合规范

```js
function pp() {
  this.test = function() {
    console.log('test')
  }
}
pp.prototype.gogo = function() {
  console.log('gogo')
}
function shipeiqi() {
  var s = new pp()
  var aa = {
    test: function() {
      s.test()
    },
    gogo: function() {
      s.gogo()
    }
  }
  return aa
}
var aa = shipeiqi()
aa.test() //test
```

## 原型模式

原型模式(prototype)是指原型实例指向对象的种类,并且通过拷贝这些原型创建新的对象

#### 模式作用:

1. 原型对象本身就是有效地利用了每个构造器创建的对象

#### 注意事项:

- 注意的依然是浅拷贝和深拷贝的问题,免得出现引用问题
- 现有的文献里查看原型模式的定义,没有针对 JavaScript 的,你可能发现很多讲解的都是关于类的,但是现实情况是基于原型继承的 JavaScript 完全避免了类(class)的概念

#### 举个栗子

```js
//原型
var myobj = {
  str: 'mystring',
  num: 1,
  myarr: [
    30,
    {
      arrgo: 'i am arr'
    }
  ],
  obj: {
    innerobj: {
      test: 25
    },
    innerstr: 'myobjInnerstr'
  }
}
```

浅拷贝

```js
function clone(obj) {
  var ret = {}
  for (k in obj) {
    ret[k] = obj[k]
  }
  return ret
}
var result = clone(myobj)
result.obj.innerstr = 'outter'
console.log(result)
console.log(myobj)
//此时会发现修改了result也会导致myobj受到影响
```

深拷贝

```js
function clone(obj) {
  var ret, k, b
  if ((b = obj instanceof Array) || obj instanceof Object) {
    ret = b ? [] : {}
    for (k in obj) {
      if (obj[k] instanceof Array || obj[k] instanceof Object) {
        ret[k] = clone(obj[k])
      } else {
        ret[k] = obj[k]
      }
    }
  }
  return ret
}
var result = clone(myobj)
result.obj.innerstr = 'outter'
console.log(result)
console.log(myobj)
```

## 中介者模式

中介者模式（Mediator Pattern）：定义一个中介对象来封装系列对象之间的交互。中介者使各个对象不需要显示地相互引用，从而使其耦合性松散，而且可以独立地改变他们之间的交互。
(注意:中介者模式和代理模式字面意思相近,但却是完全不同的模式)

#### 模式作用:

1. 在软件开发中,中介者是一个行为设计模式,通过提供一个统一的接口让系统不同部分进行通信.一般,如果系统有很多子模块需要直接沟通,都要创建一个中央控制点让其各模块通过中央控制点进行交互.中介者模式可以让这些子模块不需要直接沟通,从而达到进行解耦的目的.

#### 注意事项:

- 当系统出现了多对多交互复杂的对象群时,先不急于使用中介者模式,而是思考一下是不是系统设计有问题.

#### 举个栗子

```js
//飞机
var feiji = function(name) {
  this.name = name
}
feiji.prototype.send = function(msg, to) {
  console.log(this.name + '发送了信息')
  tatai.send(msg, to)
}
feiji.prototype.jieshou = function(msg) {
  console.log(this.name + '[接收到]' + msg)
}
//塔台
var tatai = {
  all: {},
  zhuce: function(f) {
    this.all[f.name] = f
  },
  send: function(msg, to) {
    this.all[to.name].jieshou(msg)
  }
}
var feiji1 = new feiji('feiji1')
var feiji2 = new feiji('feiji2')
tatai.zhuce(feiji1)
tatai.zhuce(feiji2)
feiji1.send('我马上降落,还有200米', feiji2)
//feiji1发送了信息
//feiji2[接收到]我马上降落,还有200米
```

## 策略模式

策略模式定义了算法家族,分别封装起来,让他们之间可以相互替换,此模式让方法的变化不会影响到使用算法的客户

#### 模式作用:

1. 所有的这些算法都是做相同的事情，只是实现不同。
2. 以相同的方式调用所有的方法，减少了各种算法类与使用算法类之间的耦合。
3. 单独定义算法类，也方便了单元测试。

#### 注意事项:

- 不仅可以封装算法，也可以用来封装几乎任何类型的规则，是要在分析过程中需要在不同时间应用不同的业务规则，就可以考虑是要策略模式来处理各种变化。

#### 举个栗子

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>策略模式</title>
  <script src="http://cdn.bootcss.com/jquery/3.0.0-alpha1/jquery.min.js"></script>
</head>
<body>
  <input type="text" id="input">
<script>
var $input=$('#input');
var check={
  isEmpty:function(argument){
    //逻辑代码
    return false;
  },
  isTel:function(){
    //逻辑代码
    return true;
  }
}
var ise=check.isEmpty($input.val());
var isTel=check.isTel($input.val());
console.log(ise);//false;
console.log(isTel);//true
</script>
</body>
</html>
```

## 模版方法模式

模版方法是一种只需使用继承就可以实现的非常简单的模式

模版方法模式由两部分结构组成,第一部分是抽象父类,第二部分是具体的实现子类.通常在抽象父类中封装了子类的算法框架,包括实现一些公共方法以及封装子类中所有方法的执行顺序.子类通过继承这个抽象类,也继承了整个算法结构,并且可以选择重写父类的方法

#### 模式作用:

1. 一次性实现一个算法的不变的部分,并将可变的行为留给子类来实现
2. 各子类中公共的行为应被提取出来并集中到一个公共父类中,避免代码重复,不同之处分离为新的操作,最后用一个钩子的模版方法来替换这些不同的代码
3. 控制子类扩展,模版方法只在特定点调用”hook”操作,这样就允许在这些点进行扩展

#### 注意事项

- 和策略模式不同,模版方法使用继承来改变算法的一部分,而策略模式使用委托来改变整个算法

#### 举个栗子

Coffee of Tea

咖啡与茶是一个经典的例子,经常用来讲解模版方法模式

先泡一杯咖啡

首先,我们先来泡一杯咖啡,如果没有什么太个性化的的需求,泡咖啡的步骤通常如下:

1. 把水煮沸
2. 用沸水煮咖啡
3. 把咖啡倒进杯子
4. 加糖和牛奶
   通过下面这段代码,我们就能得到一杯香浓的咖啡:

```js
var Coffee = function() {}
Coffee.prototype.boilWater = function() {
  console.log('把水煮沸')
}
Coffee.prototype.brewCoffeeGriends = function() {
  console.log('用沸水冲泡咖啡')
}
Coffee.prototype.pourInCup = function() {
  console.log('把咖啡倒进杯子')
}
Coffee.prototype.addSugarAndMilk = function() {
  console.log('加糖和牛奶')
}
Coffee.prototype.init = function() {
  this.boilWater()
  this.brewCoffeeGriends()
  this.pourInCup()
  this.addSugarAndMilk()
}
var coffee = new Coffee()
coffee.init()
```

泡一壶茶

接下来,开始准备我们的茶,泡茶的步骤跟泡咖啡的步骤相差并不大:

1. 把水煮沸
2. 用沸水浸泡茶叶
3. 把茶水倒进杯子
4. 加柠檬
   同样用一段代码来实现泡茶的步骤:

```js
var Tea = function() {}
Tea.prototype.boilWater = function() {
  console.log('把水煮沸')
}
Tea.prototype.steepTeaBag = function() {
  console.log('用沸水浸泡茶叶')
}
Tea.prototype.pourInCup = function() {
  console.log('把茶水倒进杯子')
}
Tea.prototype.addLemon = function() {
  console.log('加柠檬')
}
Tea.prototype.init = function() {
  this.boilWater()
  this.steepTeaBag()
  this.pourInCup()
  this.addLemon()
}
var tea = new Tea()
tea.init()
```

分类出共同点

现在我们分别泡好了一杯咖啡和一壶茶,经过思考和比较,我们发现咖啡和茶的冲泡过程是大同小异的.

我们找到泡咖啡和泡茶主要有以下不同点

- 原料不同.一个是咖啡,一个是茶,但我们可以把它们抽象为”饮料”
- 泡的方式不同.咖啡是冲泡,而茶叶是浸泡,我们可以把它们都抽象为”泡”
- 加入的调料不同.一个是糖和牛奶,一个是柠檬,但我们可以把它们都抽象为”调料”

经过抽象之后,不管是泡咖啡还是泡茶,我们都能整理为下面四步:

1. 把水煮沸
2. 用沸水冲泡饮料
3. 把饮料倒进杯子
4. 加调料
   所以,不管是冲泡还是浸泡,我们都能给它一个新的方法名称,比如说 brew().同理,不管是加糖和牛奶,还是加柠檬,我们都可以称之为 addCoundiments()

让我们忘记最开始创建的 Coffee 和 Tea 类.现在可以创建一个抽象父类来表示泡一杯饮料的整个过程.不论是 Coffee 还是 Tea,都被我们用 Beverage 来表示,代码如下:

使用模版方法:

```js
var Beverage = function() {}
Beverage.prototype.boilWater = function() {
  console.log('把水煮沸')
}
Beverage.prototype.brew = function() {
  throw new Error('子类必须重写brew方法')
}
Beverage.prototype.pourInCup = function() {
  throw new Error('子类必须重写pourInCup方法')
}
Beverage.prototype.addCondiments = function() {
  throw new Error('子类必须重写addCondiments方法')
}
Beverage.prototype.init = function() {
  this.boilWater()
  this.brew()
  this.pourInCup()
  this.addCondiments()
}
```

创建 Coffee 子类和 Tea 子类

```js
var Coffee = function() {}
Coffee.prototype = new Beverage()
Coffee.prototype.brew = function() {
  console.log('用沸水煮咖啡')
}
Coffee.prototype.pourInCup = function() {
  console.log('把咖啡倒进杯子')
}
Coffee.prototype.addCondiments = function() {
  console.log('加糖和牛奶')
}
var coffee = new Coffee()
coffee.init()
```

现在我们的 Coffee 类已经完成了,接下来依葫芦画瓢,创建我们的 Tea 类:

```js
var Tea = function() {}
Tea.prototype = new Beverage()
Tea.prototype.brew = function() {
  console.log('用沸水煮咖啡')
}
Tea.prototype.pourInCup = function() {
  console.log('把咖啡倒进杯子')
}
Tea.prototype.addCondiments = function() {
  console.log('加糖和牛奶')
}
var tea = new Tea()
tea.init()
```

在上面的例子中,到底谁才是所谓的模版方法呢?答案是 Beverage.prptotype.init

Beverage.prptotype.init 被称为模版方法的原因是,该方法封装了子类的算法框架,它作为一个算法的模版,指导子类以何种顺序去执行哪些方法.在 Beverage.prptotype.init 方法中,算法内的每一个步骤都清楚地展示在我们眼前.

钩子方法

通过模版方法模式,我们在父类中封装了子类的算法框架.这些算法框架在正常状态下适用于大多数子类的,但如果有一些特别”个性”的子类呢?比如我们在饮料类 Beverage 中封装了饮料的冲泡顺序:

1. 把水煮沸
2. 用沸水冲泡饮料
3. 把饮料倒进杯子
4. 加调料

这四个冲泡饮料的步骤适用于咖啡和茶,在我们的饮料店里,根据这 4 个步骤制作出来的咖啡和茶,一直顺利地提供给绝大部分客人享用.但有一些客人喝咖啡是不加调料的(糖和牛奶)的.既然 Bverage 作为父类,已经规定好了冲泡饮料的 4 个步骤,那么有什么办法可以让子类不受这个约束呢?
钩子方法(hook)可以用来解决这个问题,放置钩子是隔离变化的一种常见手段.我们在父类中容易变化的地方放置钩子,钩子可以有一个默认的实现,究竟要不要”挂钩”,这由子类自行决定.钩子方法的返回结构决定了模版方法后面的执行步骤,也就是程序接下来的走向,这样一来,程序就拥有了变化的可能.

在这个例子里,我们把挂钩的名字定位 customerWantsCondiments,接下来将挂钩放入 Beverage 类,看看我们如何得到一杯不需要糖和牛奶的咖啡,代码如下:

```js
var Beverage = function() {}
Beverage.prototype.boilWater = function() {
  console.log('把水煮沸')
}
Beverage.prototype.brew = function() {
  throw new Error('子类必须重写brew方法')
}
Beverage.prototype.pourInCup = function() {
  throw new Error('子类必须重写pourInCup方法')
}
Beverage.prototype.addCondiments = function() {
  throw new Error('子类必须重写addCondiments方法')
}
Beverage.prototype.customerWantsCondiments = function() {
  return true //默认需要饮料
}
Beverage.prototype.init = function() {
  this.boilWater()
  this.brew()
  this.pourInCup()
  if (this.customerWantsCondiments()) {
    this.addCondiments()
  }
}
var Coffee = function() {}
Coffee.prototype = new Beverage()
Coffee.prototype.brew = function() {
  console.log('用沸水煮咖啡')
}
Coffee.prototype.pourInCup = function() {
  console.log('把咖啡倒进杯子')
}
Coffee.prototype.addCondiments = function() {
  console.log('加糖和牛奶')
}
Beverage.prototype.customerWantsCondiments = function() {
  return window.confirm('请问要加调料吗?')
}
var coffee = new Coffee()
coffee.init()
```

在 JavaScript 中,我们很多时候不需要依样画瓢地实现一个模版方法模式,高阶函数是更好的选择.

## 职责链模式

责任链模式是一种设计模式。在责任链模式里，很多对象由每一个对象对其下家的引用而连接起来形成一条链。请求在这个链上传递，直到链上的某一个对象决定处理此请求。发出这个请求的客户端并不知道链上的哪一个对象最终处理这个请求，这使得系统可以在不影响客户端的情况下动态地重新组织和分配责任。

#### 模式作用:

1. dom 的冒泡有些类似职责链
2. nodejs 当 controller 有很多负责操作逻辑的时候拆分中间件
3. 解耦发送者和接收者

#### 注意事项:

- JavaScript 中的每一次【.】是有代价的,在有必要的时候应用

#### 举个栗子

```js
//老板
function laoban(xiangmujingli) {
  if (xiangmujingli) {
    this.xiangmujingli = xiangmujingli
  }
}
laoban.prototype.write = function(todo) {
  this.xiangmujingli.write(todo)
}
//项目经理
function xiangmujingli(coder) {
  if (coder) {
    this.coder = coder
  }
}
xiangmujingli.prototype.write = function(todo) {
  this.coder.write(todo)
}
// 程序员
function coder(todo) {}
coder.prototype.write = function(todo) {
  console.log('coding...' + todo)
}
//begin发起coder来结束
var begin = new laoban(new xiangmujingli(new coder()))
begin.write('php')
```

## 组合模式

组合模式，将对象组合成树形结构以表示“部分-整体”的层次结构，组合模式使得用户对单个对象和组合对象的使用具有一致性。掌握组合模式的重点是要理解清楚 “部分/整体” 还有 ”单个对象“ 与 “组合对象” 的含义。

组合模式可以让客户端像修改配置文件一样简单的完成本来需要流程控制语句来完成的功能。

经典案例：系统目录结构，网站导航结构等。

#### 模式作用:

1. 你想表示对象的部分-整体层次结构时
2. 你希望用户忽略组合对象和单个对象的不同,用户将统一地使用组合结构中的所有对象(方法)

#### 注意事项:

- 该模式经常和装饰者模式一起使用,它们通常有一个公共的父类(也就是原型),因此装饰必须支持具有 add,remove,getChild 操作的 component 接口

#### 举个栗子

文件夹和文件之间的关系,非常适合用组合模式来描述.文件夹里既可以包含文件,又可以包含其他文件夹,最终可能组合成一棵树,组合模式在文件夹的应用中有一下两层好处.

例如,我在同事的移动硬盘里找到了一些电子书,想把它们复制到 F 盘中的学习资料文件夹.在复制这些电子书的时候,我并不需要考虑这批文件的类型,不管它们是单独的电子书还是被放在了文件夹中.组合模式让 Ctrl+V,Ctrl+C 成为了一个统一的操作.

当我用杀毒软件扫描该文件夹时,往往不会关心里面有多少文件和子文件夹,组合模式使得我们只需要操作最外层的文件夹进行扫描

现在我们来编写代码,首先分别定义好文件夹 Folder 和文件 File 这两个类.见如下代码:

```js
/***********Folder***********/
var Folder = function(name) {
  this.name = name
  this.files = []
}
Folder.prototype.add = function(file) {
  this.files.push(file)
}
Folder.prototype.scan = function() {
  console.log('开始扫描文件夹:' + this.name)
  for (var i = 0; (file = this.files[i]); i++) {
    file.scan()
  }
}
/***********File***********/
var File = function(name) {
  this.name = name
}
File.prototype.add = function() {
  throw new Error('文件下面不能添加文件')
}
File.prototype.scan = function() {
  console.log('开始扫描文件:' + this.name)
}
```

接下来创建一些文件夹和文件对象,并且让它们组合成一棵树,这棵树就是我们 F 盘里的现有文件目录结构:

```js
var folder = new Folder('学习资料')
var folder1 = new Folder('JavaScript')
var folder2 = new Folder('JQuery')
var file1 = new File('JavaScript设计模式与开发实践')
var file2 = new File('精通JQuery')
var file3 = new File('重构与模式')
folder1.add(file1)
folder2.add(file2)
folder.add(folder1)
folder.add(folder2)
folder.add(file3)
```

在的需求是把移动硬盘里的文件和文件夹都复制到这棵树中,假设我们已经得到了这些文件对象:

```js
var folder3 = new Folder('Nodejs')
var file4 = new File('深入浅出Node.js')
folder3.add(file4)
var file5 = new File('JavaScript语言精髓与编程实践')
folder.add(folder3)
folder.add(file5)
```

通过这个例子,我们再次看到客户是如何同等对待组合对象和叶对象.在添加一批文件的操作过程中,客户不用分辨它们到底是文件还是文件夹.新增加的文件和文件夹能够很容易地添加到原来的树结构中,和树里已有的对象一起工作

我们改变了树的结构,添加了新的数据,却不用修改任何一句原有的代码,这是符合开放-封闭原则的.
运用了组合模式之后,扫描整个文件夹的操作也是轻而易举的,我们只需要操作树的最顶端对象

`folder.scan()`

执行结果如下如所示:

```bash
$ node 组合模式
开始扫描文件夹：学习资料
开始扫描文件夹：JavaScript
开始扫描文件：JavaScript设计模式与开发实践
开始草棉文件夹：Jquery
开始扫描文件：精通Jquery
开始扫描文件：重构与模式
开始扫描文件夹：Nodejs
开始扫描文件：深入浅出Node.js
开始扫描文件：JavaScript语言精髓与编程实战
```

一些值得注意的地方

1. 组合模式不是父子关系

   组合模式的树形结构容易让人误以为组合对象和叶对象是父子关系,这是不正确的.

   组合模式是一种 HAS-A(聚合)的关系,而不是 IS-A.组合对象包含一组叶对象,但 Leaf 并不是 composite 的子类.组合对象把请求委托给它所包含的所有叶对象,它们能够合作的关键是拥有相同的接口.

2. 和叶对象操作的一致性

组合模式除了要求组合对象和叶对象拥有相同的接口之外,还有一个必要条件,就是对一组叶对象的操作必须具有一致性.

比如公司要给全体员工发放元旦的过节费 1000 块,这个场景可以运用组合模式,但如果公司给今天过生日的员工发送一封生日祝福的邮件,组合模式在这里就没有用武之地了,除非先把今天过生日的员工挑选出来.只有用一致的方式对待列表中的每个叶对象的时候,才适合使用组合模式

3. 双向映射关系

发放过节费的通知步骤是从公司到各个部门,再到各个小组,最后到每个员工的邮箱里.这本身是个组合模式的好例子,但要考虑的一种情况是,也许某些员工属于多个组织架构.比如某位架构师既隶属于开发组,又隶属于架构组,对象之间的关系并不是严格意义上的层次结构,在这种情况下,是不适合使用组合模式的额,该架构师很可能会收到两份过节费.

这种复合情况下我们必须给父节点和子节点建立双向映射关系,一个简单的方法是给小组和员工对象都增加集合来保存对方的引用.但是这种相互间的引用相当复杂,而且对象之间产生了过多的耦合性,修改或者删除一个对象都变得困难,此时我们可以引入中介者模式来管理这些对象

4. 用职责链模式来提高组合模式性能

组合模式中,如果树的结构比较复杂,节点数量很多,在遍历树的过程中,性能方面也许表现得不够理想.有时候我们确实可以借助一些技巧,在实际操作中避免遍历整棵树,有一种现成的方案是借助职责链模式.职责链模式一般需要我们手动去设置链条,但在组合模式中,父对象和自对象之间实际上形成了天然的职责链.让请求顺着链条从父对象往子对象传递,或者是反过来从子对象往父对象传递,直到遇到可以处理该请求的对象为止,这也是职责链模式的经典运用场景之一.
