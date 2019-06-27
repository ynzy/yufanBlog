# 案例京东app搜索缓存数据功能
## 缓存数据实现
1. 创建服务`ng g service services/storage`,封装本地缓存方法
2. app.module.ts 里面引入创建的服务，并且声明
```ts
  import { StorageService } from "./services//storage.service";
  providers: [StorageService], 
```
3. 最后用到的组件里面
```ts
  // 引入服务
  import { StorageService } from "../../services//storage.service";
  //  初始化
  constructor(public storage:StorageService) {
    let s = this.storage.get()
    console.log(s)
  }
```
```html
<div class="search_warpper">
    <div class="title">
        <h3>搜索缓存数据功能</h3>
        <div class="input_search">
            <input type="text" [(ngModel)]="keyWord">
            <button (click)="handleSearch()">搜索</button>
        </div>
    </div>
    <hr>
    <ul class="search_list">
      <li class="search_tag" *ngFor="let item of historyList;let key=index">
        {{item}} 
        <button (click)="deleteHistory(key)">x</button>
      </li>
    </ul>
</div>
```
```ts
import { Component, OnInit } from '@angular/core';
//引入服务
import { StorageService } from "../../services//storage.service";
// !不推荐
// var storage = new StorageService();
// console.log(storage)
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {
  public keyWord:string;
  public historyList:any[]=[
    // '手机','电脑','苹果',
  ];
  constructor(public storage:StorageService) {
    // let s = this.storage.get()
    // console.log(s)
  }

  ngOnInit() {
    // console.log('页面刷新会触发这个生命周期函数')
    var searchlist = this.storage.get('searchlist');
    if(searchlist){
      this.historyList = searchlist;
    }

  }
  handleSearch() {
    //判断输入的值是否存在
    //TODO: indexOf()，如果检索的字符串没有出现，则返回-1
    if(this.historyList.indexOf(this.keyWord)==-1) {
      this.historyList.push(this.keyWord);
      this.storage.set('searchlist',this.historyList);
    }
    this.keyWord=''
    // console.log(this.keyWord)
  }
  deleteHistory(key) {
    this.historyList.splice(key,1)
    this.storage.set('searchlist',this.historyList);
  }
}
```