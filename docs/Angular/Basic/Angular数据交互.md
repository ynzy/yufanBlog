# Angular 中的数据交互（get jsonp post）
* Angular5.x 以后 get、post 和和服务器交互使用的是 HttpClientModule 模块。
* 在 app.module.ts 中引入 HttpClientModule 并注入
```ts
import {HttpClientModule} from '@angular/common/http';
imports: [
  BrowserModule,
  HttpClientModule
]
```
## 一、Angular get 请求数据
1. 在用到的地方引入 HttpClient 并在构造函数声明
```ts
import {HttpClient} from "@angular/common/http";
constructor(public http:HttpClient) { }
```
2. get 请求数据
```ts
var api = "http://a.itying.com/api/productlist";
this.http.get(api).subscribe(response => {
  console.log(response);
});
```
## 二、Angular post 提交数据
1. 在用到的地方引入 HttpClient、HttpHeaders 并在构造函数声明 HttpClient
```ts
import {HttpClient,HttpHeaders} from "@angular/common/http";
constructor(public http:HttpClient) { }
```
2. post 提交数据
```ts
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
var api = "http://127.0.0.1:3000/doLogin";
this.http.post(api,{username:'张三',age:'20'},httpOptions).subscribe(response => {
  console.log(response);
});
```
## 三、Angular Jsonp 请求数据
1. 在 app.module.ts 中引入 HttpClientModule、HttpClientJsonpModule 并注入
```ts
import {HttpClientModule,HttpClientJsonpModule} from '@angular/common/http';
imports: [
  BrowserModule,
  HttpClientModule,
  HttpClientJsonpModule
]
```
2. 在用到的地方引入 HttpClient 并在构造函数声明
```ts
import {HttpClient} from "@angular/common/http";
constructor(public http:HttpClient) { }
```
3. jsonp 请求数据
```ts
//jsonp请求 服务器必须支持jsonp
  var api = "http://a.itying.com/api/productlist";
  this.http.jsonp(api,'callback').subscribe(response => {
    console.log(response);
  });
```
## 四、Angular 中使用第三方模块 axios 请求数据
1. 安装 axios
`cnpm install axios --save`
2. 封装 axios
```ts
// 封装axios，httpaxios.service.ts
import { Injectable } from '@angular/core';
//引入axios
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class HttpaxiosService {

  constructor() { }
  get(api) {
    return axios.get(api)
            .then(function (response) {
              // handle success
              // console.log(response);
              return response.data
            })
  }
  post(api,params){
    return axios.post(api, params)
            .then(function (response) {
              return response.data
            })
            .catch(function (error) {
              console.log(error);
            });
  }
}
```
3. 调用封装axios的请求方法
```ts
//使用服务里面的axios获取数据
import { HttpaxiosService } from "../../services/httpAxios/httpaxios.service";
constructor(public aixos:HttpaxiosService) { }
getAxiosData() {
    var api = "http://a.itying.com/api/productlist";
    this.aixos.get(api).then((data)=> {
      console.log(data)
    }) 
  }
postAxiosData() {
  var api = "http://127.0.0.1:3000/doLogin";
  this.aixos.post(api,{ username: '张三', age: '20' }).then((data)=> {
    console.log(data)
  }) 
}
```