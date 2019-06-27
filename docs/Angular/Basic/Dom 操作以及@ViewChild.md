# Angular中的dom操作
## 一、Angular中的dom操作(原生js)
```ts
//*视图加载完成以后触发的方法  dom加载完成(建议dom操作放在这里面)
ngAfterViewInit(){
  //获取dom节点时定义变量指定变量类型，不然会报错
  var boxDom:any=document.getElementById('box');
  boxDom.style.color='red'
}
```
## 一、Angular中的dom操作(@ViewChild)
1. 模板中给dom起一个名字
```html
<div #myBox>
测试viewChild
</div>
```
2. 在业务逻辑里面引入ViewChild
```ts
import { Component, OnInit,ViewChild } from '@angular/core';
```
3. 写在类里面
```ts
  //获取dom节点
  @ViewChild('myBox',{static:false}) myBox:any;
```
4. ngAfterViewInit生命周期中获取dom
```ts
  ngAfterViewInit(): void {
    // console.log(this.myBox.nativeElement)
    var mybox:any = this.myBox.nativeElement
    mybox.style.color='#000'
    mybox.style.background='red'
  }
```
## 三、父子组件中通过 @ViewChild 调用子组件的方法
1. 调用子组件给子组件定义一个名称
```html
<app-header #header></app-header>
<button (click)="getrun()">获取子组件的方法</button>
```
2. 引入 ViewChild
```ts
import { Component, OnInit,ViewChild } from '@angular/core';
```
3. ViewChild 和刚才的子组件关联起来
```ts
  //获取一个组件
  @ViewChild('header',{static:false}) header:any;
```
4. 调用子组件
```ts
  getrun() {
    this.header.run()
  }
```