# 二、ECMAScript6 

ECMAScript简称就是ES,你可以把它看成是一套标准,JavaScript就是实施了这套标准的一门语言,现在主流浏览器使用的是ECMAScript5。

## 1. 作用域变量

作用域就是一个变量的作用范围。也就是你声明一个变量以后,这个变量可以在什么场合下使用 以前的*JavaScript*只有全局作用域，还有一个函数作用域

### 1.1 var的问题

1. var没有块级作用域，定义后在当前闭包中都可以访问，如果变量名重复，就会覆盖前面定义的变量，并且也有可能被其他人更改。

```js
if (true) {
     var a = "a"; // 期望a是某一个值
 }
console.log(a);
```

2. var在for循环标记变量共享，一般在循环中使用的i会被共享，其本质上也是由于没有块级作用域造成的

```js
for (var i = 0; i < 3; i++) {
     setTimeout(function () {
         alert(i);
     }, 0);
 }
```

>结果
>弹窗三次 `3`

### 1.2 块级作用域

在用var定义变量的时候，变量是通过闭包进行隔离的，现在用了let，不仅仅可以通过闭包隔离，还增加了一些块级作用域隔离。 块级作用用一组大括号定义一个块,使用 let 定义的变量在大括号的外面是访问不到的

#### 1.2.1 实现块级作用域

```js
if(true){
    let name = 'zfpx';
}
console.log(name);// ReferenceError: name is not defined
```

#### 1.2.2 不会污染全局对象

```js
if(true){
    let name = 'zfpx';
}
console.log(window.name);  // undefined
```

#### 1.2.3 for循环中也可以使用i

```js
// 嵌套循环不会相互影响
    for (let i = 0; i < 3; i++) {
        console.log("out", i);
        for (let i = 0; i < 2; i++) {
            console.log("in", i);
        }
    }
```

> 结果 out 0 in 0 in 1 out 1 in 0 in 1 out 2 in 0 in 1

#### 1.2.4 重复定义会报错

```js
if(true){
    let a = 1;
    let a = 2; //Identifier 'a' has already been declared
}
```

#### 1.2.5 不存在变量的预解释

```js
for (let i = 0; i < 2; i ++){
    console.log('inner',i);  //i is not defined
    let i = 100;
}
```

#### 1.2.6 闭包的新写法

以前

```js
;(function () {

})();
```

现在

```
{
}
```

## 2. 常量

使用`const`我们可以去声明一个常量，常量一旦赋值就不能再修改了

### 2.1 常量不能重新赋值

```js
const MY_NAME = 'zfpx';
MY_NAME = 'zfpx2';//Assignment to constant variable
```

### 2.2 变量值可改变 

> 注意`const`限制的是不能给变量重新赋值，而变量的值本身是可以改变的,下面的操作是可以的

```js
const names = ['zfpx1'];
names.push('zfpx2');
console.log(names);
```

### 2.3 不同的块级作用域可以多次定义

```js
const A = "0";
{
    const A = "A";
    console.log(A)
}
{
    const A = "B";
    console.log(A)
}
console.log(A)
```

> 结果 A B 0

## 3. 解构

### 3.1 解析数组

解构意思就是分解一个东西的结构,可以用一种类似数组的方式定义N个变量，可以将一个数组中的值按照规则赋值过去。

```js
var [name,age] = ['zfpx',8];
console.log(name,age);
```

### 3.2 嵌套赋值

```js
{
  let [x, [y], z] = [1, [2.1, 2.2]]
  console.log(x, y, z); //1 2.1 undefined
} {
  let [x, [y, z]] = [1, [2.1, 2.2]]
  console.log(x, y, z);  //1 2.1 2.2
}{
  let [json,arr,num] = [{name:'zfpx'},[1,2],[3]]
  console.log(json,arr,num);  //{ name: 'zfpx' } [ 1, 2 ] [ 3 ]
}
```

### 3.3 省略赋值 

```js
  let [ , , x] = [1,2,3]
  console.log(x);  //3
```

### 3.4 解构对象

对象也可以被解构

```js
var obj = {name: 'zhangsan',age:5}
// 对象里的name属性的值会交给name这个变量,age的值会交给age这个变量
var {name,age} = obj;
// 对象里的name属性的值会交给myname这个变量,age的值会交给myage这个变量
let {name: myname,age: myage} = obj
console.log(name,age,myname,myage);
```

### 3.5 默认值

在赋值和传参的时候可以使用默认值

```js
let [a = "a", b = "b", c = new Error('c必须制定')] = [1, , 3]
console.log(a, b, c);
// 以前赋值默认值
function ajax(options) {
  var method = options.method || "get";
  var data = options.data || {};
  //....
}
// 现在
function ajax({ method = "get", data}) {
  console.log(arguments);  //[Arguments] { '0': { method: 'post', data: { name: 'zhangsan' } } }
}
ajax({
  method: 'post',
  data: {"name": "zhangsan"}
})
```

## 4. 字符串

### 4.1 模板字符串

模板字符串用反引号(数字1左边的那个键)包含，其中的变量用`${}`括起来

```js
var name = 'zfpx',age = 8;
let desc = `${name} is ${age} old!`;
console.log(desc);

//所有模板字符串的空格和换行，都是被保留的
var str = `<ul>
<li>a</li>
<li>b</li>
</ul>`;
console.log(str);
```

> 其中的变量会用变量的值替换掉

```js
function replace(desc){
  return desc.replace(/\$\{([^}]+)\}/g,function(matched,key){
    return eval(key);
  });
}
```

### 4.2 带标签的模板字符串

可以在模板字符串的前面添加一个标签，这个标签可以去处理模板字符串 标签其实就是一个函数,函数可以接收两个参数,一个是`strings`,就是模板字符串里的每个部分的字符 还有一个参数可以使用`rest`的形式`values`,这个参数里面是模板字符串里的值

```js
var name = "zfpx", age = 8;
function desc(strings,...values) {
  console.log(strings,values);
}
desc`${name}is${age}`
```

### 4.3 字符串新方法

* includes()：返回布尔值，表示是否找到了参数字符串。
* startsWith()：返回布尔值，表示参数字符串是否在源字符串的头部。
* endsWith()：返回布尔值，表示参数字符串是否在源字符串的尾部。

```js
var s = 'zfpx'
console.log(s.includes('p'));    //true
console.log(s.startsWith('z'));  //true
console.log(s.endsWith('x'));   //true
```

第二个参数，表示开始搜索的位置

```js
var s = 'zfpx'
console.log(s.includes('p',2));  // true
console.log(s.startsWith('z',0)); //true
console.log(s.endsWith('x',2)); //false
```

> endsWith的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束

### 4.4 repeat

repeat方法返回一个新字符串，表示将原字符串重复n次。

```js
'x'.repeat(3);
'x'.repeat(0);
```

## 5. 函数

### 5.1 默认参数

可以给定义的函数接收的参数设置默认的值 在执行这个函数的时候，如果不指定函数的参数的值，就会使用参数的这些默认的值

```js
function ajax(url,method='GET',dataType="json"){
  console.log(url);
  console.log(method);
  console.log(dataType);
}
```

### 5.2 展开操作符

把...放在数组前面可以把一个数组进行展开,可以把一个数组直接传入一个函数而不需要使用`apply`

```js
//传入参数
let print = function(a,b,c) {
  console.log(a,b,c);  
}
print([1,2,3]); //[ 1, 2, 3 ] undefined undefined
print(...[1,2,3])  //1 2 3

// 可以代替apply
var m1 = Math.max.apply(null, [8,9,4,1])
var m2 = Math.max(...[8,9,4,1])

// 可以替代concat
var arr1 = [1,3];
var arr2 = [3,5];
var arr3 = arr1.concat(arr2)
var arr4 = [...arr1, ...arr2]
console.log(arr3); //[ 1, 3, 3, 5 ]
console.log(arr4);   //[ 1, 3, 3, 5 ]

//类数组的转数组
function max(a,b,c) {
  console.log(...arguments);  //[Arguments] { '0': 1, '1': 2, '2': 4 }
  console.log(Math.max(...arguments)); //4
}
max(1,2,4)
```

### 5.3 剩余操作符

剩余操作符可以把其余的参数的值都放到一个叫`b`的数组里面

```js
let rest = function(a,...rest){
    console.log(a,rest);
}
rest(1,2,3); //1 [ 2, 3 ]
```

### 5.4 解构参数

```js
let destruct = function ({name,age}) {
  console.log(name,age);  //afpx 6

}
destruct({name:'afpx',age:6})
```

### 5.5 函数的名字

ECMAScript 6 给函数添加了一个`name`属性

```js
var desc = function descname(){}
console.log(desc.name);
```

### 5.6 箭头函数

箭头函数简化了函数的的定义方式，一般以 "=>" 操作符左边为输入的参数，而右边则是进行的操作以及返回的值`inputs=>output`

```js
[1,2,3].forEach(val => console.log(val)););
```

> 输入参数如果多于一个要用()包起来，函数体如果有多条语句需要用{}包起来

箭头函数根本没有自己的this，导致内部的this就是外层代码块的this。 正是因为它没有this，从而避免了this指向的问题。

```js
var person = {
    name:'zfpx',
    getName:function(){
-        setTimeout(function(){console.log(this);},1000); //在浏览器执行的话this指向window
+        setTimeout(() => console.log(this),1000);//在浏览器执行的话this指向person
    }
}
person.getName();
```

### 5.7 数组的新方法

#### 5.7.1 from

将一个数组或者类数组变成数组,会复制一份

```js
let newArr = Array.from(oldArr);
```

#### 5.7.2 Array.of

of是为了将一组数值,转换为数组

```js
console.log(Array(3),Array(3).length); //[ <3 empty items> ] 3
console.log(Array.of(3),Array.of(3).length);  //[ 3 ] 1
```

#### 5.7.3 copyWithin

Array.prototype.copyWithin(target, start = 0, end = this.length) 覆盖目标的下标 开始的下标 结束的后一个的下标

```js
[1, 2, 3, 4, 5].copyWithin(0, 1, 2);
```

#### 5.7.4 find

查到对应的元素和索引

```js
let arr = [1, 2, 3,3, 4, 5, 6, 6]
let find = arr.find((item, index, arr) => {
  return item === 6
})
let findIndex = arr.find((item, index, arr) => {
  return item === 6 
})
console.log(find, findIndex);
```

#### 5.7.5 fill

就是填充数组的意思 会更改原数组 Array.prototype.fill(value, start, end = this.length);
* value：填充值。
* start：填充起始位置，可以省略。
* end：填充结束位置，可以省略，实际结束位置是end-1。

```js
let arr = [1,2,3,4,5]
arr.fill('a',2,3)
console.log(arr);  //[ 1, 2, 'a', 4, 5 ]
```

#### 5.7.5 map

#### 5.7.6 reduce

#### 5.7.7 filter

#### 5.7.8 forEach 

## 6. 对象

### 6.1 对象字面量

如果你想在对象里添加跟变量名一样的属性，并且属性的值就是变量表示的值就可以直接在对象里加上这些属性

```js
let name = 'zfpx';
let age = 8;
let getName = function(){
    console.log(this.name);
}
let person = {
    name,
    age,
    getName
}
person.getName();
```

### 6.2 Object.is

对比两个值是否相等

```js
console.log(Object.is(NaN,NaN));
```

### 6.3 Object.assign

把多个对象的属性复制到一个对象中,第一个参数是复制的对象,从第二个参数开始往后,都是复制的源对象

```js
var name = { name: 'zfpx' }
var age = { age: 54 }
var obj = {}
Object.assign(obj, name, age)
console.log(obj);
//克隆对象
function clone(obj) {
  return Object.assign({}, obj)
}
```

### 6.4 Object.setPrototypeOf

将一个指定的对象的原型设置为另一个对象或者null

```js
var obj1 = { name: 'zfpx' }
var obj2 = { name: 'zfpx2' }
var obj = {}
Object.setPrototypeOf(obj,obj1)
console.log(obj.name)  //zfpx
console.log(Object.getPrototypeOf(obj));  //{ name: 'zfpx' }
Object.setPrototypeOf(obj,obj2)
console.log(obj.name)  //zfpx2
console.log(Object.getPrototypeOf(obj));  //{ name: 'zfpx2' }
```

### 6.5 proto

直接在对象表达式中设置prototype

```js
var obj1  = {name:'zfpx1'};
var obj3 = {
    __proto__:obj1
}
console.log(obj3.name);
console.log(Object.getPrototypeOf(obj3));
```

### 6.6 super

通过super可以调用prototype上的属性或方法

```js
let person = {
  eat() {
    return 'milk'
  }
}
let student = {
  __proto__:person,
  eat() {
    return super.eat()+ 'bread'
  }
}
console.log(student.eat());
```

## 7. 类

### 7.1 class

使用`class`这个关键词定义一个类,基于这个类创建实例以后会自动执行`constructor`方法,此方法可以用来初始化

```js
class Person {
  constructor(name) {
    this.name = name;
  }
  getName() {
    console.log(this.name);
  }
}
let person = new Person('zhufeng')
person.getName()
```

### 7.2 get与set

`getter`可以用来得获取属性，`setter`可以去设置属性

```js
class Person {
    constructor(){
        this.hobbies = [];
    }
    set hobby(hobby){
        this.hobbies.push(hobby);
    }
    get hobby(){
        return this.hobbies;
    }
}
let person = new Person();
person.hobby = 'basketball';
person.hobby = 'football';
console.log(person.hobby);
```

### 7.3 静态方法-static 

在类里面添加静态的方法可以使用`static`这个关键词，静态方法就是不需要实例化类就能使用的方法

```js
class Person {
   static add(a,b){
       return a+b;
   }
}
console.log(Person.add(1,2));
```

### 7.4 继承extends

```js
class Person {
   constructor(name){
     this.name = name;
   }
}
class Teacher extends Person{
    constructor(name,age){
        super(name);
        this.age = age;
    }
}
var teacher = new Teacher('zfpx',8);
console.log(teacher.name,teacher.age);
```

## 8.生成器(Generator)与迭代器(Iterator)

Generator是一个特殊的函数，执行它会返回一个Iterator对象。 通过遍历迭代器， `Generator`函数运行后会返回一个遍历器对象，而不是普通函数的返回值。

### 8.1 Iterators模拟

迭代器有一个next方法，每次执行的时候会返回一个对象 对象里面有两个属性，一个是`value`表示返回的值，还有就是布尔值`done`,表示是否迭代完成

```js
function buy(books) {
  let i = 0;
  return {
    next() {
      let done = i == books.length; // 如果数组长度等于i,说明迭代完成
      let value = !done ? books[i++] : undefined;  //没有迭代完,就把当前的数组中的数据传出,迭代完成为undefined
      return {
        value: value,
        done: done
      }
    }
  }
}
let interators = buy(['js','html'])
var curr;
do {
  curr = interators.next();
  console.log(curr);
}while (!curr.done)

```

### 8.2 Generators

生成器用于创建迭代器

```js
function* buy(books) {
  for(let i=0;i<books.length;i++){
    yield books[i]
  }
}

let buying = buy(['js','css','html'])
let curr;
do {
  curr = buying.next();
  console.log(curr);
}while (!curr.done)
```

## 9.集合 

### 9.1 Set

一个`Set`是一堆东西的集合,`Set`有点像数组,不过跟数组不一样的是，`Set`里面不能有重复的内容

```js
var books = new Set();
books.add('js')
books.add('js')  //添加重复元素集合的元素个数不会改变
books.add('html')
books.forEach(book =>{
  console.log(book);
})
console.log(books.size);  //集合中元数的个数
console.log(books.has('js'));  // 怕段集合中是否有此元素
books.delete('js')
console.log(books.size);  //集合中元数的个数
console.log(books.has('js'));  // 怕段集合中是否有此元素
books.clear(); //清空 set
console.log(books.size);
```

### 9.2 Map

可以使用 Map 来组织这种名值对的数据

```js
var books = new Map();
books.set('js', {name: 'js'})  //向map中添加元素
books.set('html', {name: 'html'})
console.log(books);
console.log(books.size);  //查看集合中的元素个数
console.log(books.get('js')); //通过key获取值
books.delete('js')  //通过key删除指定元素
console.log(books.has('js'));  // 判断map中有没有这个key
books.clear();//清空 set
console.log(books.size);
```

## 10.模块

可以根据应用的需求把代码分成不同的模块 每个模块里可以导出它需要让其它模块使用的东西 在其它模块里面可以导入这些模块导出的东西

### 10.1 模块

在浏览器中使用模块需要借助 导出

```js
export var name = 'zfpx';
export var age = 8;
```

导入

```js
//import {name,age} from './school.js';
import * as school from './school.js';
console.log(school.name,school.age);
```

在页面中引用

```js
<script src="https://google.github.io/traceur-compiler/bin/traceur.js"></script>
<script src="https://google.github.io/traceur-compiler/bin/BrowserSystem.js"></script>
<script src="https://google.github.io/traceur-compiler/src/bootstrap.js"></script>
<script type="module" src="index.js"></script>
```

### 10.2 重命名

导出时重命名

```js
function say(){
    console.log('say');
}
export {say as say2};
```

导入时重命名

```js
import {say2 as say3} from './school.js';
```

### 10.3 默认导出

每个模块都可以有一个默认要导出的东西 导出

```js
export default function say(){
    console.log('say');
}
```

导入

```js
import say from './school.js';
```

### 11 深度克隆

```js
var parent = {
  age: 5,
  hobby: [1, 2, 3],
  home: {city: '北京'},
};

var child = extendDeep(parent);
child.age = 6;
child.hobby.push('4');
child.home.city = '广东';
console.log('child ', child); //[1, 2, 3, 4]
console.log('parent ', parent);
function extend(parent) {
  let child;
  if (Object.prototype.toString.call(parent) == '[object Object]') {
    child = {};
    for (let key in parent) {
      child[key] = extend(parent[key])
    }
  } else if (Object.prototype.toString.call(parent) == '[object Array]') {
    child = parent.map(item => extend(item));
  } else {
    return parent;
  }
  return child;
}

function extendDeep(parent, child) {
  child = child || {};
  for (var key in parent) {
    if (typeof parent[key] === "object") {
      child[key] = (Object.prototype.toString.call(parent[key]) === "[object Array]") ? [] : {};
      extendDeep(parent[key], child[key]);
    } else {
      child[key] = parent[key];
    }
  }
  return child;
}
```

