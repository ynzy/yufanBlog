# 手写Promise

* [Promises/A+](https://promisesaplus.com/)

* [Promise A+中文翻译](https://juejin.im/post/5b6161e6f265da0f8145fb72)

## 什么是Promise
写一个普通的Promise前要先知道什么是Promise:

* Promise是一个类
  1. 每次new 一个Promise 都要传递一个执行器(executor),执行器是立即执行的(只要new Promise就执行)
  2. 执行器函数中有两个参数 resolve,reject
  3. 默认Promise 三个状态 pendding => resolve 表示成功了;reject 表示失败了
  4. 如果一旦成功了 不能改变成失败;一旦失败了,不能再成功了;只有当前状态是pendding时才可以更改状态
     * 进入失败的方式,调用reject(), 抛出错误 throw new Error();
  5. 每个Promise都有一个then方法

```js
//! 3.默认Promise三个状态: pendding,fulfiled,reject
const PENDDING = 'pendding';  // 等待
const FULFILLED = 'fulfilled';  // 成功
const REJECT = 'reject';  // 失败

class Promise {
  constructor(executor) {
    
    this.value = undefined;  //成功的信息
    this.reason = undefined; //失败的信息
    this.status = PENDDING;  //状态值
    //! 2.执行器中有两个参数 resolve,reject
    let resolve = (value) => { 
      //! 4.只有当前状态是pendding时才可以更改状态
      if (this.status === PENDDING) {
        this.value = value;
        this.status = FULFILLED
      }
    }
    let reject = (reason) => {
      if (this.status === PENDDING) {
        this.reason = reason;
        this.status = REJECT
      }
    }
    
    //* 这里可能会发生一个异常(throw new Error)
    try {
      //! 1. 创建一个promise executor会立即执行
      executor(resolve, reject);
    } catch (e) {
      reject(e)
    }

  }
  //! 5.每个Promise都有一个then方法, then方法会判断当前的状态,去执行相应的方法
  then(onFulfilled, onReject) {
    //* then中有两个方法,成功(onFulfilled),失败(onReject)
    if (this.status === FULFILLED) {
      onFulfilled(this.value)
    }
    if (this.status === REJECT) {
      onReject(this.reason)
    }
    if (this.status === PENDDING) {

    }
  }
}

// 导出当前类 commonjs定义方式
module.exports = Promise
```

使用:

```js
let Promise = require('./promise')
let p = new Promise((resolve, reject) => {
    resolve('我有钱')
    // reject('我没钱')
    // throw new Error('失败');  //如果抛出异常,也会执行失败
})
// 没有完全解决回调问题
p.then(data => {  //成功的回调
  console.log('success' + data);
}, err => {  // 失败的回调
  console.log('err' + err);
})
```
## Promise的异步调用问题
* 此时的Promise类是一个同步执行函数,当进行一步执行时就无法执行了,而且根据规范中**一个promise中可以执行多个then方法**.

```js
let Promise = require('./promise')
let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('我有钱')
    // reject('我没钱')
    // throw new Error('失败');  //如果抛出异常,也会执行失败
  }, 1000);
})
// 没有完全解决回调问题
p.then(data => {  //成功的回调
  console.log('success' + data);
}, err => {  // 失败的回调
  console.log('err' + err);
})
p.then(data => {  //成功的回调
  console.log('success' + data);
}, err => {  // 失败的回调
  console.log('err' + err);
})
p.then(data => {  //成功的回调
  console.log('success' + data);
}, err => {  // 失败的回调
  console.log('err' + err);
})
```

执行结果:没有执行结果

原因:是因为setTimeout是异步执行,Premise处于pendding状态,无法返回结果,通过发布订阅模式,定义当结果为成功` this.onResolvedCallbacks = [];`的存储空间,和当结果为失败`this.onRejectCallbacks = [];`的存储空间,存储多次then方法中的执行函数(也就是订阅),当异步函数执行时也就是发布者发布时,立即执行订阅的方法.

```js
//! 3.默认Promise三个状态: pendding,fulfiled,reject
const PENDDING = 'pendding';  // 等待
const FULFILLED = 'fulfilled';  // 成功
const REJECT = 'reject';  // 失败

class Promise {
  constructor(executor) {
    
    this.value = undefined;  //成功的信息
    this.reason = undefined; //失败的信息
    this.status = PENDDING;  //状态值
    //! 6.一个promise中可以执行多次then(异步执行,相当于发布订阅模式)
    this.onResolvedCallbacks = [];
    this.onRejectCallbacks = [];
    //! 2.执行器中有两个参数 resolve,reject
    let resolve = (value) => { 
      //! 4.只有当前状态是pendding时才可以更改状态
      if (this.status === PENDDING) {
        this.value = value;
        this.status = FULFILLED
        this.onResolvedCallbacks.forEach(fn => fn())  //发布, 有可能resolve在then的后面执行,此时先将方法存起来,到时候成功了,依次执行这些函数
      }
    }
    let reject = (reason) => {
      if (this.status === PENDDING) {
        this.reason = reason;
        this.status = REJECT
        this.onRejectCallbacks.forEach(fn => fn())
      }
    }
    
    //* 这里可能会发生一个异常(throw new Error)
    try {
      //! 1. 创建一个promise executor会立即执行
      executor(resolve, reject);
    } catch (e) {
      reject(e)
    }

  }
  //! 5.每个Promise都有一个then方法, then方法会判断当前的状态,去执行相应的方法
  then(onFulfilled, onReject) {
    //* then中有两个方法,成功(onFulfilled),失败(onReject)
    if (this.status === FULFILLED) {
      onFulfilled(this.value)
    }
    if (this.status === REJECT) {
      onReject(this.reason)
    }
      //* 判断状态为等待状态时,也就是异步执行发布订阅
    if (this.status === PENDDING) {
      this.onResolvedCallbacks.push(() => {  //* 订阅
        //* 使用箭头函数是因为在这个函数中还可以做一些其他的事情
        // todo...
        onFulfilled(this.value)
      })
      this.onRejectCallbacks.push(() => {
        onReject(this.reason)
      })
    }
  }
}

// 导出当前类 commonjs定义方式
module.exports = Promise
```

## Promise的链式调用
* 原理
1. 如果返回一个普通值,会走下一个then的成功
2. 如果抛出错误  会走then失败的方法
3. 如果是promise 就让promise执行采用他的状态
4. 是返回了一个新的Promise 来实现链式调用

* node中读取多个文件,原生的方法 都是通过函数的第一个参数来控制

```js
let fs = require('fs');
fs.readFile('./name.txt','utf8',(err,data)=> {
  if(err) {
    return console.log(err);
  }
  fs.readFile(data,'utf8',(err,data)=> {
    if(err) {
      return console.log(err);
    }
    console.log(data);

  })
})
```

* 改造成promise

如果需要改造成promise,就先将回调的方法,改造成promise

```js
function readFile(...args) {
  return new Promise((resolve, reject) => {
    fs.readFile(...args, function (err, data) {
      if (err) reject(err)
      resolve(data)
    })
  })
}
//链式调用 
readFile('./name.txt', 'utf8').then(data => {
 return readFile(data,'utf8')
}).then(data=> {
  console.log(data);
},err=> {
  console.log(err);
})
```

* 手写实现其原理

1. 如果返回一个普通值,会走下一个then的成功
2. 如果抛出错误  会走then失败的方法
3. 如果是promise 就让promise执行采用他的状态
4. 是返回了一个新的Promise 来实现链式调用

基于上面的第6步继续写

```js
//! 3.默认Promise三个状态: pendding,fulfiled,reject
const PENDDING = 'pendding';  // 等待
const FULFILLED = 'fulfilled';  // 成功
const REJECT = 'reject';  // 失败
//* promise的处理函数
//! 10.x可能是个普通值,可能是个promise
const resolvePromise = (promise2, x, resolve, reject) => {
  //* 处理x的类型,来决定是调用resolve还是reject
  //! 12.自己等待自己,会进入死循环,报错,进行判断
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  //! 13.判断x 是不是一个普通值, 先认为你是一个promise
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    //! 14.可能是promise 如何判断是不是promise ,通过then判断
    try { //! 16.取then的时候有可能抛出异常,Objec.defineProperty()
      let then = x.then; //! 15.看一看有没有then方法
      let called; //! 18.默认没有调用成功和 失败,如果调用了就返回,防止多次调用
      //* 判断then是不是一个方法
      if(typeof then === 'function') { // {then:function(){}}
        // 是promise
        // x.then(()=>{},()=>{}) //* 不能这样写
        then.call(x,y=> {  // 如果是一个promise,就采用这个promise的结果
          if(called) return
          called = true;
          //! 17.y 有可能还是一个promise  实现递归解析
          resolvePromise(promise2,y,resolve,reject)  
        },r=>{
          if(called) return
          called = true;
          reject(r)
        })
      }else {
        resolve(x)// 常量直接抛出去即可
      }
    } catch (e) {
      if(called) return
      called = true;
      reject(e);  //取then抛出异常,就报错
    }

  } else {
    resolve(x) //! 13.不是promise,就是普通值了,直接返回
  }
    
}
class Promise {
  constructor(executor) {
    this.value = undefined;  //成功的信息
    this.reason = undefined; //失败的信息
    this.status = PENDDING;  //状态值
    //! 6.一个promise中可以执行多次then(异步执行,相当于发布订阅模式)
    this.onResolvedCallbacks = [];
    this.onRejectCallbacks = [];
    //! 2.执行器中有两个参数 resolve,reject
    let resolve = (value) => {
      //! 4.只有当前状态是pendding时才可以更改状态
      if (this.status === PENDDING) {
        this.value = value;
        this.status = FULFILLED
        this.onResolvedCallbacks.forEach(fn => fn())  //发布, 有可能resolve在then的后面执行,此时先将方法存起来,到时候成功了,依次执行这些函数
      }
    }
    let reject = (reason) => {
      if (this.status === PENDDING) {
        this.reason = reason;
        this.status = REJECT
        this.onRejectCallbacks.forEach(fn => fn())
      }
    }

    //* 这里可能会发生一个异常(throw new Error)
    try {
      //! 1. 创建一个promise executor会立即执行
      executor(resolve, reject);
    } catch (e) {
      reject(e)
    }

  }
  //! 5.每个Promise都有一个then方法, then方法会判断当前的状态,去执行相应的方法
  then(onFulfilled, onReject) {
    //* then中有两个方法,成功(onFulfilled),失败(onReject)
	//! 19.可选参数,如果没有传onFulfilled,onReject就给一个默认参数即可
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val=>val;
    onReject = typeof onReject === 'function' ? onReject : err=>{throw err};

    //! 7.返回promise才会有then方法,then方法调用后应该返还一个新的promise,以供连续调用
    //* 执行完new Promise里面之后才返回promise2,执行过程中,promise2是undefined,需要加一个定时器
    let promise2 = new Promise((resolve, reject) => {
      //! 8.应该在返回的promise中 取到上一次的状态, 来决定这个promise2是成功还是失败
      if (this.status === FULFILLED) {
        //! 9.捕获异常 (如果链式调用中抛出异常throw new Error('err'))
        //! 11.当前onFulfilled,onRejected不能在当前的上下文执行,为了确保promise2存在,需要异步一下
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            //! 10.在外部处理x的值
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e)
          }
        })
      }
      if (this.status === REJECT) {
        setTimeout(() => {
          try {
            let x = onReject(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
      if (this.status === PENDDING) {
        this.onResolvedCallbacks.push(() => {  //* 订阅
          //* 使用箭头函数是因为在这个函数中还可以做一些其他的事情
          // todo...
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
        this.onRejectCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onReject(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
      }
    })
    return promise2

  }
}

// 导出当前类 commonjs定义方式
module.exports = Promise
```

使用

```js

let Promise = require('./promise')
/**
 * 链式调用 
 * 1. 如果返回一个普通值,会走下一个then的成功
 * 2. 如果抛出错误  会走then失败的方法
 * 3. 如果是promise 就让promise执行采用他的状态
 * 4. 是返回了一个新的Promise 来实现链式调用
 */
const p = new Promise((resolve,reject)=>{
    // resolve(new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('hello')
            // reject('hello')
        },1000)
    // }))
    
})
// let obj = {}
// Object.defineProperty(obj,'then', {
//     get() {
//         throw new Error('失败')
//     }
// })
let promise2 = p.then(data=> {
    return new Promise((resolve,reject)=> {
        setTimeout(() => {
            resolve('222')
        }, 1000);
    })
})
promise2.then(data => {
    console.log(data);
},err=> {
    console.log(err);
})
```

## 测试写的Promise是否符合规范

全局安装测试插件

```js
npm i promises-aplus-tests -g
```

在要测试的代码中加入如下代码:

```js
//! 20.测试Promise是否符合规范
Promise.deferred = function(){
  let dfd = {};
  dfd.promise = new Promise((resolve,reject)=>{
    dfd.resolve = resolve;
    dfd.reject = reject
  })
  return dfd;
}
```

开始测试:

```js
promises-aplus-tests promise.js
```
![测试成功.png](https://upload-images.jianshu.io/upload_images/13505073-3e3a867d88d48b2d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## resolve了一个新的promise问题

```js
const Promise = require('./promise.js')
const p = new Promise((resolve,reject)=> {
  resolve(new Promise((resolve,reject)=> {
    setTimeout(() => {
      resolve('data')
    }, 1000);
  }))
})
p.then(data=> {
  console.log(data);
},err=> {
  console.log(err);
})
```

返回的结果是一个promise等待对象,也就是resolve的值是一个新的promise,会等到这个内部的promise完成

需要给value值加一个判断是否是Promise实现递归解析

```js
let resolve = value => {
//! 21.如果一个promise resolve了一个新的promise 会等到这个内部的promise完成
  if(value instanceof Promise) {
    return value.then(resolve,reject)  //和resolvePromise功能是一样的
  }
  ...
 }
```

## catch方法

```js
const Promise = require('./promise.js')
const p = new Promise((resolve,reject)=> {
  resolve(new Promise((resolve,reject)=> {
    setTimeout(() => {
      resolve('data')
    }, 1000);
  }))
})
p.then(data=> {
  throw new Error('err')
},err=> {
  console.log(err);
}).catch(err=> {
  console.log(err);
}).then(data=> {
  console.log(data);
})
```

catch方法其实就是一个没有成功的then,并不会影响后续then方法的执行

在我们的库中加入catch方法

```js
catch(errCallback) {  //! 22.没有成功的then
    return this.then(null,errCallback)
  }
```

## Promise的静态方法

有的时候我们为了方便调用,可以直接调用类上的成功失败方法

```js
Promise.resolve(123).then(data=> {
  console.log(123);
})
```

```js
Promise.reject(123).then(null,err=> {
  console.log(err);
})
```

实现:在执行方法时返回了一个新的promise

```js
  static resolve(value) {  //! 23. 创建了一个成功的promise
    return new Promise((resolve,reject)=> {
      resolve(value);
    })
  }
  static reject(value) { //! 24.创建了一个失败的promise
    return new Promise((resolve,reject)=> {
      reject(value);
    })
  }
```

## all方法

1. 全部完成才算完成,如果有一个失败了就失败了
2. 处理多个异步的并发问题
3. 是按照顺序执行的

```js
//* 判断是不是Promise
const isPromise = value => {
  if ((typeof value === 'object' && value !== null) || typeof value === 'function') {
    return typeof value.then === 'function'
  }
  return false
}
Class Promise {
    ...
static all(promises) {  //! 25.实现all方法
    return new Promise((resolve, reject) => {
      let arr = [];  //存放最终结果的
      let i = 0;
      let processData = (index, data) => { //处理数据
        arr[index] = data; //将数据放到数组中,成功的数量和传入的数量相等的时候将结果抛出去即可
        if (++i === promises.length) {
          resolve(arr)
        }
      }
      for (let i = 0; i < promises.length; i++) {
        const current = promises[i];  //获取当前的每一项
        if (isPromise(current)) { //如果是promise .. 
          current.then(data => {
            processData(i, data)
          }, err => reject)
        } else {
          processData(i, current)
        }
      }
    })
  }
}
```

使用:

```js
const Promise = require('./promise.js')
let fs = require('fs').promises
/**
 * promise.all
 * 1. 全部完成才算完成,如果有一个失败了就失败了
 * 2. 处理多个异步的并发问题
 * 3. 是按照顺序执行的
 */
Promise.all(
  [fs.readFile('./name.txt', 'utf8'),

  fs.readFile('./age.txt', 'utf8'),1, 2, 3,]
).then(data => {
  console.log(data);
})
```

## static race() 方法
* 如果有普通值谁先执行完成先执行谁
* 有一个成功就成功 有一个失败就失败
```js
  static race(promises) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        const current = promises[i];
        if (isPromise(current)) {
          current.then(() => {
            resolve(current)
          }, err => {
            reject(err)
          })
        } else {
          resolve(current)
        }
      }
    })
  }
```
* 使用:
```js
let p1 = new Promise((resolve,reject)=> {
  setTimeout(() => {
    reject('ok1')
  }, 1000);
})

let p2 = new Promise((resolve,reject)=> {
  setTimeout(() => {
    resolve('ok2')
  }, 2000);
})

Promise.race([p1,p2,2]).then(data=>{
  console.log(data);
  
},err=> {
  console.log('---'+err);
})
```

## Promise.finally()方法
* 不管成功还是失败,都会执行
* 如果finally返回一个新的promise,会等待这个promise完成
* 并且可以继续链式调用
```js
Promise.prototype.finally = function(callback) { //! 26实现finally方法
    return this.then(val => {
      // 等待finally中的函数执行完毕,继续执行,finally函数可能返回一个promise,用promise.resolve等待返回
      return Promise.resolve(callback()).then((value)=>{ //todo这里的value没有返回出去,外部无法获取其值
        return val
      })
    },err => {
      return Promise.resolve(callback()).then(()=>{throw err})
    })
  }
```
* 使用
```js
Promise.resolve('resolve').finally(()=> {
  console.log(2);
  return new Promise((resolve,reject) => {
    resolve('1')
  })
}).then(data=> {
  console.log(data);
},err=> {
  console.log(err);
})
```

## static try()
* 既能捕获同步,又能捕获异步
* 原生Promise不支持
```js
Promise.try = function(callback) { //! 28 实现try方法
    // 既能捕获同步,又能捕获异步
    // try返回的是一个promise
    // 如果callback返回的是普通throw new Error(''),那就把callback也变成promise
    return new Promise((resolve,reject)=> {
      return Promise.resolve(callback()).then(resolve,reject)
    })
  }
```
* 使用:
```js
function fn() {
  // throw new Error('err')
  return new Promise((resolve,reject)=> {
    reject('err')
  })
}
Promise.try(fn).catch(err=> {
  console.log(err);
})
```