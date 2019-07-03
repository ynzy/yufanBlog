# 1、let 和 const 命令
## 1.let 命令

### let声明变量
* 只在let命令所在代码块内有效
```js
{
  let a = 10;
  var b = 1;
}
a // ReferenceError: a is not defined.
b // 1

for (let i = 0; i < 10; i++) {
  // ...
}
console.log(i);
// ReferenceError: i is not defined
```
### 不存在变量提升
* let所声明的变量一定要在声明后使用，否则报错。
```js
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;
```
### 暂时性死区
* 只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。
* 使用let命令声明变量之前，该变量都是不可用的
```js
if (true) {
  // TDZ开始
  tmp = 'abc'; // ReferenceError
  console.log(tmp); // ReferenceError

  let tmp; // TDZ结束
  console.log(tmp); // undefined

  tmp = 123;
  console.log(tmp); // 123
}
```
### 不允许重复声明
* let不允许在相同作用域内，重复声明同一个变量。
```js
// 报错
function func() {
  let a = 10;
  var a = 1;
}

// 报错
function func() {
  let a = 10;
  let a = 1;
}

function func(arg) {
  let arg;
}
func() // 报错

function func(arg) {
  {
    let arg;
  }
}
func() // 不报错
```
## 2.块级作用域
### 为什么需要块级作用域？
* ES5 只有全局作用域和函数作用域，没有块级作用域，这带来很多不合理的场景。
1. 内层变量可能会覆盖外层变量。
```js
var tmp = new Date();

function f() {
  console.log(tmp);
  if (false) {
    var tmp = 'hello world';
  }
}

f(); // undefined
```
* 原因：变量提升，导致内层的tmp变量覆盖了外层的tmp变量。
2. 用来计数的循环变量泄露为全局变量。
```js
var s = 'hello';

for (var i = 0; i < s.length; i++) {
  console.log(s[i]);
}

console.log(i); // 5
```
* 代码中，变量i只用来控制循环，但是循环结束后，它并没有消失，泄露成了全局变量。
### ES6的块级作用域
* let为javascript新增了块级作用域
* ES6允许块级作用域的任意嵌套
```js
{{{{
  {let insane = 'Hello World'}
  console.log(insane); // 报错
}}}};
```
* 内层作用域可以定义外层作用域的同名变量。
```js
{{{{
  let insane = 'Hello World';
  {let insane = 'Hello World'}
}}}};
```
* 块级作用域的出现，实际上使得获得广泛应用的立即执行函数表达式（IIFE）不再必要了。
```js
// IIFE 写法
(function () {
  var tmp = ...;
  console.log(tmp)
}());

// 块级作用域写法
{
  let tmp = ...;
  console.log(tmp)
}
```
### 块级作用域和函数声明
 1. 允许在块级作用域内声明函数。
 2. 函数声明类似于var，即会提升到全局作用域或函数作用域的头部。
 3. 同时，函数声明还会提升到所在的块级作用域的头部。
* 考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是函数声明语句。
```js
// 块级作用域内部的函数声明语句，建议不要使用
{
  let a = 'secret';
  function f() {
    return a;
  }
}

// 块级作用域内部，优先使用函数表达式
{
  let a = 'secret';
  let f = function () {
    return a;
  };
}
```
* ES6 的块级作用域必须有大括号，如果没有大括号，JavaScript 引擎就认为不存在块级作用域。
```js
// 第一种写法，报错
if (true) let x = 1;

// 第二种写法，不报错
if (true) {
  let x = 1;
}
```
## 3.const命令
### 基本用法
1. const声明一个只读的常量。一旦声明，常量的值就不能改变。
```js
const PI = 3.1415;
PI // 3.1415

PI = 3;
// TypeError: Assignment to constant variable.
```
  * 上面代码表明改变常量的值会报错。
2. const声明的变量不得改变值，这意味着，const一旦声明变量，就必须立即初始化，不能留到以后赋值。
```js
const foo;
// SyntaxError: Missing initializer in const declaration
```
  * 对于const来说，只声明不赋值，就会报错。
3. const的作用域与let命令相同：只在声明所在的块级作用域内有效。
```js
if (true) {
  const MAX = 5;
}
MAX // Uncaught ReferenceError: MAX is not defined
```
4. const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。
```js
if (true) {
  console.log(MAX); // ReferenceError
  const MAX = 5;
}
```
5. const声明的常量，也与let一样不可重复声明。
```js
var message = "Hello!";
let age = 25;

// 以下两行都会报错
const message = "Goodbye!";
const age = 30;
```
### 本质
const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，const只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。
```js
const foo = {};

// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop // 123

// 将 foo 指向另一个对象，就会报错
foo = {}; // TypeError: "foo" is read-only
```
上面代码中，常量foo储存的是一个地址，这个地址指向一个对象。不可变的只是这个地址，即不能把foo指向另一个地址，但对象本身是可变的，所以依然可以为其添加新属性。
```js
const a = [];
a.push('Hello'); // 可执行
a.length = 0;    // 可执行
a = ['Dave'];    // 报错
```
上面代码中，常量a是一个数组，这个数组本身是可写的，但是如果将另一个数组赋值给a，就会报错。
## 4.顶层对象的属性
* var命令和function命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。也就是说，从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩。
```js
var a = 1;
// 如果在 Node 的 REPL 环境，可以写成 global.a
// 或者采用通用方法，写成 this.a
window.a // 1

let b = 1;
window.b // undefined
```
代码中，全局变量a由var命令声明，所以它是顶层对象的属性；全局变量b由let命令声明，所以它不是顶层对象的属性，返回undefined。
## 5.globalThis对象
JavaScript 语言存在一个顶层对象，它提供全局环境（即全局作用域），所有代码都是在这个环境中运行。但是，顶层对象在各种实现里面是不统一的。
- 浏览器里面，顶层对象是window，但 Node 和 Web Worker 没有window。
- 浏览器和 Web Worker 里面，self也指向顶层对象，但是 Node 没有self。
- Node 里面，顶层对象是global，但其他环境都不支持。
* 综上所述，很难找到一种方法，可以在所有情况下，都取到顶层对象。下面是两种勉强可以使用的方法。
```js
// 方法一
(typeof window !== 'undefined'
   ? window
   : (typeof process === 'object' &&
      typeof require === 'function' &&
      typeof global === 'object')
     ? global
     : this);

// 方法二
var getGlobal = function () {
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
};
```
* 垫片库[global-this](https://github.com/ungap/global-this)模拟了这个提案，可以在所有环境拿到globalThis。