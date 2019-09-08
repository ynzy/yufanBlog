# 二次手写promise
* Promise是一个类,可以供使用者调用
## 1. 说明
1. 每次new 一个Promise 都要传递一个执行器(executor),执行器是立即执行的.(只要new了Promise,Promise中的回调函数就会执行)
2. 执行器中有两个参数(函数) `resolve`,`reject`,可以改变Promise状态和改变状态的值
## 2. 参数值
* `value` 是一个任意合法javascript的值(成功的值),包括`undefined,thenable, promise`
* `reason` 表示Promise失败的原因
* `status` 表示此时Promise的状态
## 3.状态
一个promise必须处于三种状态之一： 请求态（`pending`）， 完成态（`fulfilled`），拒绝态（`rejected`）,默认为`pending`,
一旦处于成功或者拒绝态就不能再改变状态

1. 当promise处于请求状态（pending）时
  * promise可以转为`fulfilled`,`rejected`
2. 当promise处于完成状态（fulfilled）时
  * promise不可转为其他状态
  * 必须有一个值,且此值不能改变
3. 当promise处于拒绝状态（rejected）时
  * promise不可转为其他状态
  * 必须有一个原因(reason),且此原因不能改变
> 当抛出错误时throw new Error() 也要进入失败状态
## 4. `then`方法
每一个promise都有一个then方法,用来存取它当前或者最终的值或者原因

promise接收两个参数
```js
Promise.then(onFulfilled, onRejected)
```
1. onFulfilled和onRejected都是可选的参数：
   * 如果 onFulfilled不是函数，必须忽略
   * 如果 onRejected不是函数，必须忽略
```js
onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val;
onRejected = typeof onRejected === 'function' ? onFulfilled : val => val;
```
2. 如果是`onFuulfilled`函数
  * 此函数必须在promise完成(fulfilled)状态后调用,
  * 把promise的值(value)作为第一个参数
3. 如果是`onRejected`函数
  * 此函数必须在promise拒绝(rejected)状态后调用
  * 把promise的reason作为第一个参数
## 5. 异步执行(相当于发布订阅)
* 一个promise中可以执行多次then,当执行异步代码时,promise状态为pending,先执行了then方法,无法获取成功或失败的值.
* 此时先将要执行的方法存起来,当状态为成功或失败时,再将方法依次取出执行

## 6.promise的链式调用
### 6.1. then必须返回一个promise
* then方法只有返回一个promise才能继续then
```js
promise2 = promise1.then(onFulfilled, onRejected);
```
1. 如果执行了`onFulfilled`或者`onRejected`方法,返回一个值x,通过`Promise解决程序(resolvePromise)`来解析此值.
2. 如果`return`抛出了一个异常`e`,`promise2`必须被`rejected`并将e作为返回的错误原因

## 7.promise解析程序(resolvePromise)
* `onFulfilled`或者`onRejected`不能在当前的上下文执行,当执行`resolvePromise`时,
先执行了`new Promise中的内容`,`resolvePromise`无法获取到外面的`promise2`,
为解决此问题,让`promise2`存在:异步执行`resolvePromise`
* 因为链式调用返回的值有多种情况
* 处理x的类型,来决定是调用resolve还是reject
1. 如果promise和x引用同一个对象，则用TypeError作为原因拒绝（reject）
   * 就是自己不能调自己
```js
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
```
2. 如果是一个对象(object)并且不是null,或者是一个函数,暂时认为是一个peomise
  1. 如果x不是一个方法(可能是一个数组等等),那么让x作为返回值返回
  2. 如果取then抛出异常,用e作为reason拒绝（reject）promise 
  3. 声明一个变量then,如果x是promise,x.then方法存在,赋给then变量
  4. 如果是一个函数(是一个promise)
    * 使用call,将x作为this,作为第一个参数,resovle作为第二个参数,reject作为第三个参数
    * resolve被一个y调用,执行`resolve(promise2,y)`递归解析
    * reject被一个r调用,返回r作为原因
    * 如果resolvePromise和 rejectPromise都被调用，或者对同一个参数进行多次调用，第一次调用执行，任何进一步的调用都被忽略
      * 应该给一个标识,默认没有调用成功失败,如果调用了其中之一,就返回true,防止多次调用
3. 如果是一个普通值,直接返回此值


## 8.测试promise是否符合规范
```js
npx promises-aplus-tests <文件名>
```
测试成功:
![img](https://upload-images.jianshu.io/upload_images/13505073-3e3a867d88d48b2d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 9.value值可能是一个promise
如果一个promise,resolve了一个新的promise,会等待这个内部的promise完成
```js
const Promise = require('./_promise.js')
const p = new Promise((resolve,reject)=> {
  resolve(new Promise((resolve,reject)=> {
    setTimeout(() => {
      resolve('data')
    }, 1000);
  }))
})
p.then(data=> {
  console.log(data); // promise
},err=> {
  console.log(err);
})
```
解决办法: 判断resolve的value是不是promise,如果是promise,就调resolve方法,
```js
 let resolve = value => {
   if(value instanceof Promise) {
     return value.then(resolve,reject)
   }
   if (this.status === PENDING) {
     this.value = value;
     this.status = FULFILLED;
     this.onResolvedCallbacks.forEach(fn => fn());
   }
 };
```
## 10. catch()函数
* 如果promise在任何地方throw一个错误,都可以通过catch捕获到.
* 实现原理:
catch就是then方法的一个别名,调用了err方法
```js
const Promise = require('./_promise.js')
const p = new Promise((resolve,reject)=> {
  resolve(new Promise((resolve,reject)=> {
    setTimeout(() => {
      resolve('data')
    }, 1000);
  }))
})
p.then(data=> {
  throw new Error('一个错误')
},err=> {
  console.log(err);
}).then(null,err=> {
  console.log(err+ '----捕获到了');
})
```
内部实现:
```js
catch(errCallback) {  // 没有成功的then
  return this.then(null,errCallback)
}
```
## 11. static resolve()
* promise 执行成功的简写,`promise.resolve.then()`
* 实现: 返回一个新的promise的resolve方法
```js
static resolve(value) {
    return new Promise((resolve,reject)=> {
      resolve(value)
    })
  }
```
## 12. static reject()
* promise 执行失败的简写,`promise.teject.then()`
* 实现: 返回一个新的promise的reject方法
```js
  static reject(reason) {
    return new Promise((resolve,reject)=> {
      reject(reason)
    })
  }
```
## 13. static all()
* 全部完成才算完成,如果有一个失败了就失败了
* 处理多个异步的并发问题
* 是按照顺序执行的
* 创建一个数组通过处理函数存放所有的结果值,
  * 传入的值如果不是promise,直接将值进行存储 
  * 传入的值如果是一个promise,value.then直到取出值进行存储,如果执行失败,直接reject
  * 创建一个索引项,每有一个成功值就+1,只有索引数等于数组总长度才返回
## 14. static race()
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

## 15. static try()
* 既能捕获同步,又能捕获异步
* 原生Promise不支持
```js

function fn() {
  // throw new Error('err')
  return new Promise((resolve,reject)=> {
    reject('err')
  })
}

Promise.try = function(callback) { //! 28 实现try方法
    // 既能捕获同步,又能捕获异步
    // try返回的是一个promise
    // 如果callback返回的是普通throw new Error(''),那就把callback也变成promise
    return new Promise((resolve,reject)=> {
      return Promise.resolve(callback()).then(resolve,reject)
    })
  }

Promise.try(fn).catch(err=> {
  console.log(err);
})
```
## 16. finally()函数
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

## promise有哪些优缺点
1. 优点:
  * 可以解决异步并发问题,promise.all
  * 链式调用 
2. 缺点
  * 还是基于回调的
  * promise无法终止

## promise 中的链式调用如果中断
* 中断一个promise,就是返回一个等待的promise
```js
let p = new Promise((resolve,reject)=> {
  resolve()
})
let p1 = p.then(()=>{
  console.log('ok');
  return new Promise(()=>{})
})
p1.then(()=> {
  console.log(1);
})
```
## 如何放弃某个promise的执行结果
* 如何将一个成功态改变成失败态
* 创建一个函数,包裹此promise函数,使用promise.race改变此promise的状态,但原状态继续执行,只是放弃了原执行结果
```js
function warp(p1){
  let fail = null;
  let p2 = new Promise((resolve,reject)=> {
    fail = reject //先将p2的reject暴露出去
  })
  let p3 = Promise.race([p1,p2])
  p3.abort = fail
  return p3
}
let p = warp(new Promise((resolve,reject) => {
  setTimeout(() => {
    resolve('ok')
  }, 2000);
}))
p.abort('err')
p.then(data=> {
  console.log(data);
},err=> {
  console.log(err);
})
```
