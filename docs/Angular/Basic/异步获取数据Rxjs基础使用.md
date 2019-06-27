# 异步获取数据Rxjs基础使用
## 一、Rxjs 介绍
* Rxjs是一种针对异步数据流的编程。
* 它将一切数据，包括 HTTP 请求，DOM 事件或者普通数据等包装成流的形式，然后用强大丰富的操作符对流进行处理，使你能以同步编程的方式处理异步数据，并组合不同的操作符来轻松优雅的实现你所需要的功能。
* 目前常见的异步编程的几种方法：
  * 回调函数
  * 事件监听/发布订阅
  * Promise
  * Rxjs
## 二、Promise 和 RxJS 处理异步对比
1. 同步方法
```ts
getData() {
  return 'this is service data'
}
let data:any = this.request.getData();
console.log(data)
```
2. 回调函数处理异步
```ts
getCallbackData(callback) {
  setTimeout(() => {
    var data='张三'
    // return data;
    callback(data)
  }, 1000);
  //先执行到这里，再执行到setTimeout方法里
}
let callbackData = this.request.getCallbackData((data)=>{
  console.log(data)
});
```
3. Promise 处理异步:
```ts
let promise = new Promise(resolve => {
setTimeout(() => {
resolve('---promise timeout---');
}, 2000);
});
promise.then(value => console.log(value));
```
4. RxJS 处理异步：
```ts
import {Observable} from 'rxjs';
let stream = new Observable(observer => {
  setTimeout(() => {
    observer.next('observable timeout');
  }, 2000);
});
stream.subscribe(value => console.log(value));
```
* 从上面列子可以看到 RxJS 和 Promise 的基本用法非常类似，除了一些关键词不同。Promise里面用的是 then() 和 resolve()，而 RxJS 里面用的是 next() 和 subscribe()。
* 从上面例子我们感觉Promise 和 RxJS 的用法基本相似。其实Rxjs相比Promise 要强大很多。比如 Rxjs 中可以中途撤回、Rxjs 可以发射多个值、Rxjs 提供了多种工具函数等等。
## 三、Rxjs unsubscribe 取消订阅
* Promise 的创建之后，动作是无法撤回的。Observable 不一样，动作可以通过 unsbscribe() 方法中途撤回，而且 Observable 在内部做了智能的处理.
* Rxjs 可以通过 unsubscribe() 可以撤回 subscribe 的动作
```ts
let stream = new Observable(observer => {
  let timeout = setTimeout(() => {
    clearTimeout(timeout);
    observer.next('observable timeout');
  }, 2000);
});
let disposable = stream.subscribe(value => console.log(value));
setTimeout(() => {
  //取消执行
  disposable.unsubscribe();
}, 1000);
```
## 四、Rxjs 订阅后多次执行
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如果我们想让异步里面的方法多次执行，这一点 Promise 是做不到的，对于 Promise 来说，最终结果要么 resole（兑现）、要么 reject（拒绝），而且都只能触发一次。如果在同一个 Promise 对象上多次调用 resolve 方法，则会抛异常。而 Observable 不一样，它可以不断地触发下一个值，就像 next() 这个方法的名字所暗示的那样。
* Promise
```ts
let promise = new Promise(resolve => {
  setInterval(() => {
    resolve('---promise setInterval---');
  }, 2000);
});
promise.then(value => console.log(value));
```
* Rxjs
```ts
let stream = new Observable<number>(observer => {
  let count = 0;
  setInterval(() => {
    observer.next(count++);
  }, 1000);
});
stream.subscribe(value => console.log("Observable>"+value));
```
## 五、Rxjs的工具函数map，filter
```ts
import {Observable} from 'rxjs';
import {map,filter} from 'rxjs/operators';
let stream= new Observable<any>(observer => {let count = 0;
  setInterval(() => {
    observer.next(count++);
  }, 1000);
});
stream.pipe(
  filter(val=>val%2==0)
).subscribe(value => console.log("filter>"+value));

stream.pipe(
  filter(val=>val%2==0), 
  map(value => {
    return value * value
  })
).subscribe(value => console.log("map>"+value));
```
## 六、总结：在项目中使用
1. 创建服务，封装Rxjs方法
```ts
//request.service.ts
import { Injectable } from '@angular/core';
import {Observable, observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor() { }
  getData() {
    return 'this is service data'
  }
  getCallbackData(callback) {
    setTimeout(() => {
      var data='张三'
      // return data;
      callback(data)
    }, 1000);
    //先执行到这里，再执行到setTimeout方法里
  }
  getPromiseData() {
    return new Promise((resolve,reject)=>{
      setTimeout(() => {
        var data='张三--promise'
        resolve(data)
      }, 1000);
    })
  }
  getRxjsData() {
    return new Observable((observer)=> {
      setTimeout(() => {
        var data='张三--rxjs'
        observer.next(data);
        // observer.error('数据');
      }, 3000);
    })
  }
  //多次执行
  getPromiseIntervalData() {
    return new Promise((resolve,reject)=>{
      setInterval(() => {
        var data='张三--promiseIntervalData'
        resolve(data)
      }, 1000);
    })
  }
  getRxjsIntervalData(){
    let count=0;
    return new Observable<any>((observer)=>{
        setInterval(() => {
            count++;
            var username='张三--Rxjs-Interval--'+count;
            observer.next(username);     
            // observer.error('数据')        
        }, 1000); 
    })
  }
  //
  getRxjsIntervalNum(){
    let count=0;
    return new Observable<any>((observer)=>{
        setInterval(() => {
            count++;
            observer.next(count);        
        }, 1000); 
    })
  }
}
```
2. 在组件中使用
```ts
import { Component, OnInit } from '@angular/core';
import { RequestService } from "../../services/request/request.service";
import {map,filter} from 'rxjs/operators';
@Component({
  selector: 'app-rx-js',
  templateUrl: './rx-js.component.html',
  styleUrls: ['./rx-js.component.less']
})
export class RxJSComponent implements OnInit {

  constructor(public request:RequestService) { }

  ngOnInit() {
    //1.同步方法
    let data:any = this.request.getData();
    console.log(data)
    //2.callback获取异步数据
    let callbackData = this.request.getCallbackData((data)=>{
      console.log(data)
    });
    //3. promise获取异步数据
    var promiseData = this.request.getPromiseData();
    promiseData.then((data)=> {
      console.log(data)
    })
    //4.rxjs获取异步数据
    var rxjsData = this.request.getRxjsData();
    rxjsData.subscribe((data)=> {
      console.log(data)
    })
    //5.过一秒以后撤回刚才的操作
    var streem= this.request.getRxjsData();
    var d=streem.subscribe((data)=>{
      console.log(data);
    })
    setTimeout(() => {
      d.unsubscribe();
    }, 1000);
    //6.promise多次执行(没有这个能力)
      // var intervalData = this.request.getPromiseIntervalData();
      // intervalData.then((data)=> {
      //   console.log(data)
      // })
    // 7.rxjs多次执行
      // var streemInterval=this.request.getRxjsIntervalData();
      // streemInterval.subscribe((data)=>{
      //     console.log(data);
      // })
    //8、用工具方法对返回的数据进行处理
    
    /*
    var streemNum=this.request.getRxjsIntervalNum();
    streemNum.pipe( //管道
      filter((value)=>{ //过滤数据
        if(value%2==0){
          return true;
        }
      })
    )
    .subscribe((data)=>{
      console.log(data);
    })
    */
   /*
   var streemNum=this.request.getRxjsIntervalNum();
    streemNum.pipe( //管道
      map((value)=>{ //map处理数据
          return value*value;
      })
    )
    .subscribe((data)=>{
      console.log(data);
    })
   */
    //工具方法可以连用
    var streemNum=this.request.getRxjsIntervalNum();
    streemNum.pipe( //管道
      filter((value)=>{ //过滤数据
        if(value%2==0){
          return true;
        }
      }),
      map((value)=>{ //map处理数据
        return value*value;
      })
    )
    .subscribe((data)=>{
      console.log(data);
    })
  }
  
}
```