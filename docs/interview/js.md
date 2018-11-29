# js

## 实现一个函数，判断输入是不是回文字符串

```js
function isPalindrome(input) {
  if (typeof input !== 'string') return false
  return input.split('').reverse().join() === input
}
```

## 实现效果，点击容器内的图标，图标边框变成border 1px solid red，点击空白处重置
```js
const box = document.getElementById('box')

function isIcon(target) {
  return target.className.includes('iocn')
}

box.onClick = function (e) {
  e.stopPropagation()
  const target = e.target

  if (isIcon(target)) {
    target.style.border = '1px solid red'
  }

  const doc = document

  doc.onClick = function (e) {
    const children = box.children

    for(let i; i < children.length; i++) {
      if (isIcon(children[i])) {
        children[i].style.border = 'none'
      }
    }
  }
}
```

## 请简单实现双向数据绑定mvvm

```html
<input id="input" />
```

```js
const data = {}
const input = document.getElementById('input')

// defineProperty: 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象
Object.defineProperty(data, 'text', {
  set(value){
    // 当设置值的时候触发的函数,设置的新值通过参数value拿到
    input.value = value
    this.value = value
  }
})

input.onChange = function (e) {
  data.text = e.target.value
}
```

## 实现Storage，使得该对象为单例，并对localStorage进行封装设置值setItem(key,value)和getItem(key)
```js
instance = null

class Storage {
  static getInstance() {
    if (!instance) {
      instance = new Storage()
    }
    return instance
  }

  setItem = (key, value) => localStorage.setItem(key, value)
  getItem = key => localStorage.getItem(key)
}
```

## event loop（事件循环）
首先，js是单线程的，主要的任务是处理用户的交互，而用户的交互无非就是响应DOM的增删改，使用事件队列的形式，一次事件循环只处理一个事件响应，使得脚本执行相对连续，所以有了事件队列，用来储存待执行的事件，那么事件队列的事件从哪里被push进来的呢。那就是另外一个线程叫事件触发线程做的事情了，他的作用主要是在定时触发器线程、异步HTTP请求线程满足特定条件下的回调函数push到事件队列中，等待js引擎空闲的时候去执行，当然js引擎执行过程中有优先级之分，首先js引擎在一次事件循环中，会先执行js线程的主任务，然后会去查找是否有微任务microtask（promise），如果有那就优先执行微任务，如果没有，在去查找宏任务macrotask（setTimeout、setInterval）进行执行