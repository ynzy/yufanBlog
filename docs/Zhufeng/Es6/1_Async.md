# 从0到1完美诠释异步编程

* 掌握高阶函数的使用,使用高阶函数解决异步问题

* 掌握发布订阅模式和观察者模式

* 掌握promise核心应用,使用promise解决异步编程问题
* 实现一个完整的promise库
* 扩展promise中常见方法,all,race,finally...
* 掌握generator的使用以及co库的应用
* 异步终极解决方案async+await

# 关于函数

## 什么是高阶函数
[gitHub](https://github.com/ynzy/ZhuFeng-Study/tree/master/day01%E6%89%8B%E5%86%99Promise/1.callback)

1. 一个函数的参数,是一个函数(回调)
2. 一个函数返回一个函数(拆分/匿名函数)

## 面向切面编程（AOP)-切片-装饰
[参考链接:JS中AOP的实现和运用](https://www.cnblogs.com/zengyuanjun/p/7429968.html)

在编写js的时候，我们有时会遇到针对某种场景做处理，比如在方法开始的时候校验参数，执行方法前检查权限，或是删除前给出确认提示等等。这些校验方法、权限检测、确认提示，规则可能都是相同的，在每个方法前去调用，显得麻烦，而且不利于统一管理，于是我们想到了面向切面编程（AOP）。



* 示例1:将before函数加载原型上供所有函数调用
```js
// 重写原型上的方法
Function.prototype.before = function(beforeFn) {
  return (...args) => {  //箭头函数中没有this指向,没有arguments,所以会向上级作用域查找,
    beforeFn();
    this(...args);
  }
}

// AOP 切片 装饰
const say = (...args)=> {
  console.log('说话',args);
}

let newSay = say.before(() => {
  console.log('您好');
})
let newSay1 = say.before(() => {
  console.log('天气很好');
})
newSay(1,2,3)
newSay1()
```
* 示例2:写一个函数,传入(目标函数,before函数,after函数)按前后顺序执行
```js
function aopFun(orginFn, beforeFn, afterFn) {
  return (...args) => {
    beforeFn(...args);
    orginFn(...args);
    afterFn();
  }
}

const orgin = (...args) => {
  console.log('我是目标函数', ...args);
}
const newOrgin = aopFun(orgin, () => {
  console.log('我是在函数前执行');
}, () => {
  console.log('我在函数后执行');
})

newOrgin(1, 2, 3)
```

- `say`函数是核心函数,在函数的原型上添加的方法,所有的函数都会共有这个方法.
- `beforeFn`是调用中`say.before(()=>{})`箭头函数,也就是`一个函数的参数,是一个函数`
- 函数原型上的`before`方法`return`一个函数,也就是一个函数返回一个函数.
- 因为箭头函数没有this指向,所以say调用before方法时,this指向say,
- 因为箭头函数没有`arguments`参数,所有所传参数向上查找也就是`say`函数上的参数`...args`

## React事务
[参考链接:React事务机制解析](https://blog.csdn.net/handsomexiaominge/article/details/86183735)

开始的时候 做某件事 结束的时候再做某件事

React内部的事务分为三个阶段initialize, method以及close阶段，会在开始和结束时候分别遍历Wrappers内部的所有初始化方法和close方法。
```
/**
 * <pre>
 *                       wrappers (injected at creation time)
 *                                      +        +
 *                                      |        |
 *                    +-----------------|--------|--------------+
 *                    |                 v        |              |
 *                    |      +---------------+   |              |
 *                    |   +--|    wrapper1   |---|----+         |
 *                    |   |  +---------------+   v    |         |
 *                    |   |          +-------------+  |         |
 *                    |   |     +----|   wrapper2  |--------+   |
 *                    |   |     |    +-------------+  |     |   |
 *                    |   |     |                     |     |   |
 *                    |   v     v                     v     v   | wrapper
 *                    | +---+ +---+   +---------+   +---+ +---+ | invariants
 * perform(anyMethod) | |   | |   |   |         |   |   | |   | | maintained
 * +----------------->|-|---|-|---|-->|anyMethod|---|---|-|---|-|-------->
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | +---+ +---+   +---------+   +---+ +---+ |
 *                    |  initialize                    close    |
 *                    +-----------------------------------------+
 * </pre>
 */
```

对当前核心函数,做包装,核心函数是`anyMethod`,在它的外层可以嵌套无限层包装的函数,一层包装中包括

`initialize`初始化方法和`close`方法,函数执行时,先执行初始化方法,再执行核心函数方法,最后执行关闭方法.

```js
const perform= (anymethod,wrappers) => {
  wrappers.forEach(wrap => { //wrappers是一个数组
    wrap.initilizae();
  });
  anymethod();
  wrappers.forEach(wrap => {
    wrap.close();
  });
}

perform(() => {
  console.log('说话');
},[
  {  // wrapper
    initilizae(){
      console.log('您好');
    },
    close() {
      console.log('再见');
    }
  },
  {  // wrapper2
    initilizae(){
      console.log('您好2');
    },
    close() {
      console.log('再见2');
    }
  }
])
```

## 柯里化函数
[参考链接](https://juejin.im/post/5b8350246fb9a019c372d26d)

* 柯里化: 就是将一个函数拆分成多个函数
* 高阶函数中包含 柯里化  可以保留参数
* 函数柯里化指的是将能够接收多个参数的函数转化为接收单一参数的函数，并且返回接收余下参数且返回结果的新函数的技术。
* 函数柯里化的主要作用和特点就是参数复用、提前返回和延迟执行。

1. 判断类型` Object.prototype.toString.call()` 

```js
const checkType = (type,content) => {
    return Object.prototype.toString.call(content) === `[object ${type}]`
}
console.log(checkType('String','123'));
```
这样写的函数,将判断类型值`String`暴露给用户很不友好,如果可以有一个函数只传入参数就可以判断出类型,这样是不是更加方便.

拆分函数成更细小的两个函数
```js
const checkType = (type) => {
  return (content) => {
    return Object.prototype.toString.call(content) === `[object ${type}]`
  }
}

let isString = checkType('String')
console.log(isString('sdf'));
```
那么现在有个要求,我要判断`Boolean`类型怎么做呢,也封装一个`isBoolean`,那么我再有别的类型判断呢,我们要封装很多这样的判断类型的函数,所以我们可以写一个工具类,把所有判断类型的函数封装在一起,就可以很方便的供使用者调用了.

判断类型实现

```js

const checkType = (type) => {
  return (content) => {
    return Object.prototype.toString.call(content) === `[object ${type}]`
  }
}
// 闭包
let types = ['Number','String','Boolean']
let utils = {}  //工具类
types.forEach(type => {
  utils['is' + type] = checkType(type)
})

console.log(utils.isString('123'));
```

2. 函数柯里化怎么实现


通用的柯里化函数
* 方式一:
```js
const add = (a,b,c,d,e) => {
  return a + b + c + d + e
}
const curring = (fn,arr = []) => {  //空数组接收传递过来的参数合成新数组
  let len = fn.length //函数的长度就是函数参数的个数
  return (...args) => {  //args传进来的参数
    arr = [...arr,...args];  // 相当于arr = arr.concat(args);
    if(arr.length < len) {  //如果arr的长度小于函数参数的长度,则返回这个方法和arr继续等待传参
      return curring(fn,arr)
    }  
    return fn(...arr)
  }
}
let r = curring(add)(1)(2)(3,4)(5)
console.log(r);
```
方式二:
```js
const curry = (fn) => {
  /**
   * 
   * @param {number} rest_num 剩余需要收集的参数数目 
   * @param {array} args_list 参数列表
   */
  const _c = (rest_num, args_list) => {
    if (rest_num <= 0) {
      return fn(...args_list);
    }
    return (...args) => _c(rest_num - args.length, [...args_list, ...args])
  }
  return _c(fn.length, []);
}

// example
const plus = (a, b, c, d) => a + b + c + d;
const curry_plus = curry(plus);
curry_plus(1, 2, 3, 4) // 10
curry_plus(1)(2, 3, 4) // 10
curry_plus(1)(2)(3, 4) // 10
```
 curry函数会返回一个 _c, 在使用者每一次调用 curry_plus 的时候会让 _c 传入的 rest_num 都减去相应的值, 当不再需要收集参数时, 就返回结果

3. 对判断类型的方法进行改造

```js
const checkType = (type,content) => {
  return Object.prototype.toString.call(content) === `[object ${type}]`
}
let types = ['Number','String','Boolean']
let utils = {}  
types.forEach(type => {
  utils['is' + type] = curring(checkType)(type)  //这里使用上一步中的curring方法,先传入一个参数
})
console.log(utils.isString('123')); //再传入一个参数
```

## after函数
[参考:lodash方法之after](https://blog.csdn.net/Anerror/article/details/86618935)

* after可以生成新的函数,等待函数执行达到我的预期时执行
* 该方法会在调用n次之后触发一次func
```js
const after = (times,fn) => {
  return () => {
    if(--times === 0) {  //函数调用三次才会执行回调
      fn();
    }
  }
}

let newAfter = after(3,() => {
  console.log('三次后调用');
})

newAfter();  
newAfter();
newAfter();
// lodash after
```

## 并发问题

我们希望 读取数据 node 异步 会等待同步代码都执行完成后再执行
```js
const fs = require('fs');

let school = {}
fs.readFile('name.txt','utf8',(err,data)=> {
  school['name'] = data
  fs.readFile('age.txt','utf8',(err,data)=> {
    school['age'] = data;
    console.log(school);
  })
})
```

在node中,同步读取两个文件,由于不知道哪个先读取完,哪个后读取完,同步执行时代码未运行完成,存储对象`school`不能获取到读取的文件,如下:

```js
const fs = require('fs');

let school = {}
fs.readFile('name.txt','utf8',(err,data)=> {
  school['name'] = data
})
fs.readFile('age.txt','utf8',(err,data)=> {
  school['age'] = data
})
console.log(school);  // {}
```

并发的问题 如何解决: 

1. 计数器

通过上面的`after`函数,定义执行次数,执行两次以后,读取`school`对象.

```js
const after = (times,fn) => () => --times === 0 &&  fn();

let newAfter = after(2,() => {
  console.log(school);
  
})

fs.readFile('name.txt','utf8',(err,data)=> {
  school['name'] = data;
  newAfter();
})
fs.readFile('age.txt','utf8',(err,data)=> {
  school['age'] = data;
  newAfter();
})
```

2. 使用发布订阅模式

## 发布订阅模式

[参考](https://www.jianshu.com/p/0aacfec05046)

把订阅的事件存储到数组中可以订阅多个事件,只要发布者触发事件,执行函数,订阅者就会接收到

就和用户订阅微信公众号道理一样，一个公众号可以被多个用户同时订阅，当公众号有新增内容时候，只要发布就好了，用户就能接收到最新的内容。

* 发布和订阅直接是没有关系的,订阅将要订阅的事件存储在一个空间中(数组),发布者在存储空间中发布事件.

```js
const fs = require('fs');

let school = {}
let e = {
  arr: [],
  on(fn) {
    this.arr.push(fn)
  },
  emit() {
    this.arr.forEach(fn => fn())
  }
}
e.on(() => {  // 订阅
  console.log('ok');
})
e.on(() => {
  if(Object.keys(school).length ===2){  //* Object.keys返回一个由一个给定对象的自身可枚举属性组成的数组
    console.log(school);
  }
})

fs.readFile('name.txt','utf8',(err,data)=> {
  school['name'] = data;
  e.emit(); //发布
})
fs.readFile('age.txt','utf8',(err,data)=> {
  school['age'] = data;
  e.emit();
})


/**
 * 发布订阅之间并没有关系,
 * 发布者和订阅者是借助第三方空间(arr)存储事件,
 * 订阅的时候就往第三方空间里存放函数
 * 发布的时候就让第三方空间中的函数依次执行
 */
```

订阅者订阅一个事件->只要`school`中的长度等于2,那么就输出数据.

发布者遍历事件数量,发布一次就将遍历的事件执行一次,供订阅者订阅.

## 观察者模式
Observer模式是行为模式之一，它的作用是当一个对象的状态发生变化时，能够自动通知其他关联对象，自动刷新对象状态。

[参考链接:观察者模式](https://www.cnblogs.com/minigrasshopper/p/9134196.html)

 观察者模式 基于 发布订阅 模式

例如:我和我媳妇要观察小宝宝,小宝宝一发生情绪变化就会立即通知给我和我媳妇他有情绪了.

```js
class Sbuject {  // 1.被观察者  小宝宝
  constructor() {
    this.arr = [];  // 存储空间  [o1,o2]
    this.state = '我很开心'  // 被观察者的一个状态
  }
  attach(o) {  // 3.接收观察者,存储在一个数组空间
    this.arr.push(o)
  }
  setState(newState) {  // 4.修改被观察者状态,通知所有观察者更新状态
    this.state = newState
    this.arr.forEach(o => o.updata(newState))
  }
}

class Observer {  // 1.观察者   我 我媳妇
  constructor(name) {
    this.name = name
  }
  updata(newState) {  // 5.观察者订阅更新状态
    console.log(this.name + '小宝宝' +newState);
    
  }
}

// 2. 实例化
let s = new Sbuject('小宝宝');  //小宝宝
let o1 = new Observer('我');
let o2 = new Observer('我媳妇')

s.attach(o1);  // 3.被观察者中添加观察者对象
s.attach(o2);
s.setState('不开心了')  // 4.被观察者修改状态
```

