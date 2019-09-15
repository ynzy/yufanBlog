# Generator/yield与 async await
为了写出更优雅、更易维护的代码，为了解决异步的嵌套问题，真是操碎了心，先是出了个Promise，然后又是Generator、yield组合，直到ES7的async、await组合。好在事情一直在向好的方向反正。

## Generator
[生成器](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator)对象是由function* 返回的，并且符合[可迭代协议和迭代器协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols)。

这里有几个概念生成器、可迭代协议、迭代器协议。具体的概念可以点击链接查看MDN文档。

* function*: 定义一个生成器函数，返回一个Generator对象(返回迭代器)；
* 可迭代协议： 允许 JavaScript 对象去定义或定制它们的迭代行为；
* 迭代器协议： 定义了一种标准的方式来产生一个有限或无限序列的值；当一个对象被认为是一个迭代器时，它实现了一个 next() 的方法，next()返回值如下：
```js
{
 done:true,//false迭代是否结束，
 value:v,//迭代器返回值
}
```
从这几个基本的概念我们可以了解到，生成器是对象是可以迭代的(**生成器就是生成迭代器**)，那么为什么要可以迭代、可以迭代解决了什么问题。
* 示例
```js
// 生成器,返回值叫迭代器
function * read() {
  yield 1; //产出
  yield 2;
  yield 3;
}
// interator 迭代器
let it = read()
console.log(it); //Generator对象
console.log(it.next()); //{ value: 1, done: false }
console.log(it.next());
console.log(it.next());
console.log(it.next()); // { value: undefined, done: true }
```
定义一个生成器函数`function * read() {}`,执行之后的返回值`it`是一个Generator对象(也就是interator 迭代器),它实现了一个`next()`方法,当迭代结束时,返回值是`{ value: undefined, done: true }`
## 迭代
* 将类数组转化成数组
```js
// 类数组定义: 1.索引 2.长度
console.log([...{ // ...默认调生成器方法
    0: 1,
    1: 2,
    2: 3,
    length: 3,
    [Symbol.iterator]() { //生成器方法
      let len = this.length;
      let index = 0;
      // 返回迭代器, 是有next方法, 而且方法执行后 ,需要返回 value,done
      return {
        next: ()=> {
          return {value: this[index], done: index++ === len}
        }
      }
    }
  }]);
```
`...`相当于`for of`遍历数组,`...`遍历类数组,必须要给当前对象 提供一个生成器方法`[Symbol.iterator]() {}`
* 使用generator优化
```js
console.log([...{ // ...默认调生成器方法
    0: 1,
    1: 2,
    2: 3,
    length: 3,
    [Symbol.iterator]: function *() {
      let index = 0;
      while(index !== this.length) {
        yield this[index++]
      }
    }
  }]);
```

## next方法的参数
yield表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，`该参数就会被当作上一个yield表达式的返回值`(第一次next参数没有任何意义)。
```js
function* read() {
    let a = yield 1;
    console.log(a + '--');
    let b = yield 2;
}

let it = read();
console.log(it.next()); // { value: 1, done: false }第一次next参数没有任何意义
console.log(it.next(100));
// 返回结果
//{ value: 1, done: false }
// 100--
// { value: 2, done: false }
```
## throw()
throw()是将yield表达式替换成一个throw语句。
```js
function* read() {
  try {
    let a = yield 1;
  } catch (e) {
    console.log('错误'+e);
  }

}

let it = read();
console.log(it.next());
it.throw('xxx')
// 返回结果
// { value: 1, done: false }
// 错误xxx
```

## 示例:读取文件
```js
const fs = require('fs').promises
function * read() {
  let content = yield fs.readFile('./name.txt','utf-8');
  let age = yield fs.readFile(content,'utf-8');
  console.log(age);
  
  return age
}
let it = read();
it.next().value.then(data=> {
  // 这里的data是第一个yield的返回值,it.next(data),content的值为data
  it.next(data).value.then(data=> {
    // 这里的data是第二个yield的返回值,it.next(data),age的值为data
   let r =  it.next(data)
   // 最后返回结果return
    console.log(r);
  })
},err=> {
  console.log(err);
})
```

## co库的使用
```js
let co = require('co')
co(read()).then(data=> {
  console.log(data);
})
```
### 核心原理
```js
function co (it) {
  return new Promise((resolve,reject) => {
    //! 异步迭代需要先提供一个next方法
    function next(data) {
      let {value,done} = it.next(data);
      if(!done) { //如果没有完成yield
        // value可能不是promise,比如对象,将其封装成promise
        Promise.resolve(value).then(data => {
          next(data);
        },err=> {
          it.throw(err)
        })
      }else {
        resolve(value)
      }
    }
    next();
  })
}
```
> 异步迭代需要先提供一个next方法
## async/await
generator可以简化异步的编码，减少嵌套，而async、await组合起来使用，可以更进一步，类似以上的代码，使用async、await改写如下

async + await 其实是 generator + co的语法糖

```js
const fs = require('fs').promises
async function read() {
try {
  let content = await fs.readFile('./name.txt1','utf-8');
  let age = await fs.readFile(content,'utf-8');
  let xx = await {age: age+10}
  return xx
} catch (e) {
  console.log(e);
  
}
}
read().then(data => {
  console.log(data);
},err => {
  console.log(err);
})
```
捕获错误有两种方式:
* 使用try-catch
* promise.then中输出错误
* 错误会就近被抛出,以上两种方式都使用,只会在最近的try-catch中捕获输出错误