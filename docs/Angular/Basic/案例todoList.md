# 案例todoList
```html
<div class="search_warpper">
    <div class="title">
        <h3>todoList</h3>
        <div class="input_search">
            <input type="text" [(ngModel)]="keyWord" (keydown)="handleAdd($event)">
        </div>
    </div>
    <hr>
    <h3>待办事项</h3>
    <ul class="search_list">
      <li class="search_tag" 
      *ngFor="let item of todoList;let key=index"
      [hidden]="item.status==1"
      >
        <input type="checkbox" [(ngModel)]="item.status" (change)="changeCheckBox()">
        {{item.title}} 
        <button (click)="deleteHistory(key)">x</button>
      </li>
    </ul>
    <h3>已完成事项</h3>
    <ul class="search_list">
        <li class="search_tag" 
        *ngFor="let item of todoList;let key=index"
        [hidden]="item.status==0"
        >
          <input type="checkbox" [(ngModel)]="item.status" (change)="changeCheckBox()">
          {{item.title}} 
          <button (click)="deleteHistory(key)">x</button>
        </li>
      </ul>
  <pre style="margin-top: 30px;">{{todoList | json}}</pre>
</div>
```
```ts
import { Component, OnInit } from '@angular/core';
import { StorageService } from "../../services//storage.service";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.less']
})
export class TodoListComponent implements OnInit {
  public keyWord:string;

  public todoList:any[]=[
  //   {
  //   title: '一条记录',
  //   status:0
  // },{
  //   title: '一条记录',
  //   status:1
  // }
];
  constructor(public storage:StorageService) {
    // let s = this.storage.get()
    // console.log(s)
  }

  ngOnInit() {
    var todoList = this.storage.get('todoList');
    if(todoList) {
      this.todoList = todoList
    }
  }
  handleAdd(e) {
    if(e.keyCode==13) {
      // console.log(e)
      if(!this.todoListHasKeyWord(this.todoList,this.keyWord)) {
        this.todoList.push({
          title:this.keyWord,
          status:0  //0表示待办，1表示已完成
        })
        this.storage.set('todoList',this.todoList);
      }else {
        alert('数据已经存在')
      }
      this.keyWord = ''
    }
  }
  changeCheckBox() {
    // console.log('触发了')
    this.storage.set('todoList',this.todoList);
  }
  deleteHistory(key) {
   this.todoList.splice(key,1)
   this.storage.set('todoList',this.todoList);
  }
  //判断todoList中有的值和输入的值是否相同
  //如果数组里面有keyword返回true，否则返回false
  todoListHasKeyWord(todoList:any,keyWord:any) {
    //异步  会存在问题
    // todoList.forEach(val => {
    //   if(val.title==keyWord) {
    //     return true;
    //   }
    // });
    if(!keyWord) return false;
    for(var i=0;i<todoList.length;i++){
      if(todoList[i].title==keyWord){
        return true;
      }
    }
    return false
  }
}
```