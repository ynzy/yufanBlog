# AntDesign框架使用
## 初始化配置
`ng add ng-zorro-antd`
## 后台管理界面布局
```html
<nz-layout>
  <!-- 侧边栏 -->
  <nz-sider nzCollapsible [(nzCollapsed)]="isCollapsed" [nzTrigger]="triggerTemplate">
    <div class="logo">
      <a [routerLink]="[ '/home' ]">
        <img src="https://ng.ant.design/assets/img/logo.svg" alt="">
        <span>后台管理系统</span>
      </a>
    </div>
    <ul nz-menu [nzTheme]="'dark'" [nzMode]="'inline'" [nzInlineCollapsed]="isCollapsed">
      <li nz-submenu>
        <span title><i nz-icon type="user"></i><span class="nav-text">用户管理</span></span>
        <ul>
          <li nz-menu-item>
            <a [routerLink]="[ '/user/list' ]" routerLinkActive="active">用户列表</a>
          </li>
          <li nz-menu-item>
              <a [routerLink]="[ '/user/ajaxlist' ]" routerLinkActive="active">ajax请求分页</a>
            </li>
          <li nz-menu-item>
              <a [routerLink]="[ '/user/vip' ]" routerLinkActive="active">Vip用户</a>            
            </li>
        </ul>
      </li>
      <li nz-submenu>
        <span title><i nz-icon type="team"></i><span class="nav-text">Team</span></span>
        <ul>
          <li nz-menu-item>Team 1</li>
          <li nz-menu-item>Team 2</li>
        </ul>
      </li>
      <li nz-menu-item>
        <span><i nz-icon type="file"></i><span class="nav-text">File</span></span>
      </li>
    </ul>
  </nz-sider>
  <nz-layout>
    <!-- 头部区域 -->
    <nz-header style="background: #fff; padding:0;">
      <i class="trigger" nz-icon [type]="isCollapsed ? 'menu-unfold' : 'menu-fold'"
        (click)="isCollapsed = !isCollapsed"></i>
        <nz-dropdown class="header_menu">
            <a nz-dropdown>管理员<i nz-icon type="down"></i> </a>
            <ul nz-menu nzSelectable>
              <li nz-menu-item>
                <a>退出</a>
              </li>
              <li nz-menu-item>
                <a>Github</a>
              </li>
            </ul>
          </nz-dropdown>
    </nz-header>
    <!-- 内容区域 -->
    <nz-content style="margin:0 16px;">
      <nz-breadcrumb style="margin:16px 0;">
        <!-- 历史导航 -->
        <nz-breadcrumb-item>User</nz-breadcrumb-item>
        <nz-breadcrumb-item>Bill</nz-breadcrumb-item>
      </nz-breadcrumb>
      <!-- 右侧内容区域 -->
      <div style="padding:24px; background: #fff; min-height: 360px;">
        <router-outlet></router-outlet>
      </div>
    </nz-content>
    <nz-footer style="text-align: center;">Ant Design ©2019 Implement By Angular</nz-footer>
  </nz-layout>
</nz-layout>
<ng-template #trigger>
  <i nz-icon type="up"></i>
</ng-template>
```
```ts
//路由配置
{ 
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: 'list', component: UserlistComponent },
      { path: 'ajaxlist', component: AjaxlistComponent },
      { path: 'vip', component: VipComponent },
      { path: 'add', component: AdduserComponent },
      { path: 'edit', component: EdituserComponent },
      { path: '**', redirectTo: 'list'}
    ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
 ``` 
## 静态分页表格(自定义选择项)
```html
<!-- 
[nzData]	数据数组
[nzBordered]	是否展示外边框和列边框
[nzShowSizeChanger]	是否可以改变 nzPageSize
(nzCurrentPageDataChange)	当前页面展示数据改变的回调函数
(nzPageIndexChange)	当前页码改变时的回调函数
 -->
<nz-table
#rowSelectionTable
nzBordered 
nzShowSizeChanger
[nzData]="listOfAllData"
(nzCurrentPageDataChange)="currentPageDataChange($event)"
>
<thead>
  <tr>
    <!-- 
      [nzShowCheckbox]	是否添加checkbox
      [nzShowRowSelection]	是否显示下拉选择
      [nzSelections]	下拉选择的内容 text 及回调函数 onSelect
      [nzChecked]	checkbox 是否被选中，可双向绑定
      [nzIndeterminate]	checkbox indeterminate 状态
      (nzCheckedChange)	选中的回调
     -->
    <th
      nzShowCheckbox
      nzShowRowSelection
      [nzSelections]="listOfSelection"
      [(nzChecked)]="isAllDisplayDataChecked"
      [nzIndeterminate]="isIndeterminate"
      (nzCheckedChange)="checkAll($event)"
    ></th>
    <th>姓名</th>
    <th>年龄</th>
    <th>地址</th>
  </tr>
</thead>
<tbody>
  <tr *ngFor="let data of rowSelectionTable.data">
    <td nzShowCheckbox [(nzChecked)]="mapOfCheckedId[data.id]" (nzCheckedChange)="refreshStatus()"></td>
    <td>{{ data.name }}</td>
    <td>{{ data.age }}</td>
    <td>{{ data.address }}</td>
  </tr>
</tbody>
</nz-table>
```
```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {
  listOfSelection = [
    {
      text: '选择所有行',
      onSelect: () => {
        this.checkAll(true);
      }
    },
    {
      text: '选择偶数行',
      onSelect: () => {
        this.listOfDisplayData.forEach((data, index) => (this.mapOfCheckedId[data.id] = index % 2 !== 0));
        this.refreshStatus();
      }
    },
    {
      text: '选择单数行',
      onSelect: () => {
        this.listOfDisplayData.forEach((data, index) => (this.mapOfCheckedId[data.id] = index % 2 === 0));
        this.refreshStatus();
      }
    }
  ];
  isAllDisplayDataChecked = false;  //是否全选
  isIndeterminate = false;  //选中的状态
  listOfDisplayData: any[] = []; //显示的数据
  listOfAllData: any[] = [];  //所有数据
  mapOfCheckedId: { [key: string]: boolean } = {};  //每行是否选中的状态

  constructor() { }
  currentPageDataChange($event: Array<{ id: number; name: string; age: number; address: string }>): void {
    // console.log($event)
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }
  //刷新状态，判断是否全部选中，和部分选中状态
  refreshStatus(): void {
    // console.log(this.isAllDisplayDataChecked)
    /*
      every() 方法使用指定函数检测数组中的所有元素：
      如果数组中检测到有一个元素不满足，则整个表达式返回 false ，且剩余的元素不会再进行检测。
      如果所有元素都满足条件，则返回 true。
      some() 方法会依次执行数组的每个元素：
      如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测。
      如果没有满足条件的元素，则返回false。
    */
    this.isAllDisplayDataChecked = this.listOfDisplayData.every(item =>
      this.mapOfCheckedId[item.id]
    );
    this.isIndeterminate =
      this.listOfDisplayData.some(item =>
        this.mapOfCheckedId[item.id]
      ) && !this.isAllDisplayDataChecked;
  }
  //全选和反选
  checkAll(value: boolean): void {
    // console.log(value)
    this.listOfDisplayData.forEach(item => (this.mapOfCheckedId[item.id] = value));
    this.refreshStatus();
  }

  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      this.listOfAllData.push({
        id: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`
      });
    }
  }

}
```
## ajax获取分页数据
```html
<nz-table #rowSelectionTable nzShowPagination nzShowSizeChanger [nzHideOnSinglePage]="true" [nzData]="listOfAllData"
  [nzLoading]="loading" [nzTotal]="total" [(nzPageIndex)]="pageIndex" [(nzPageSize)]="pageSize"
  (nzPageIndexChange)="searchData()" (nzPageSizeChange)="searchData(true)"
  (nzCurrentPageDataChange)="currentPageDataChange($event)">
  <thead>
    <tr>
      <th nzShowCheckbox [(nzChecked)]="isAllDisplayDataChecked" [nzIndeterminate]="isIndeterminate"
        (nzCheckedChange)="checkAll($event)"></th>
      <th>标题</th>
      <th>用户名</th>
      <th>分类id</th>
      <th>操作</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let data of rowSelectionTable.data">
      <td nzShowCheckbox [(nzChecked)]="mapOfCheckedId[data.id]" [nzDisabled]="data.disabled"
        (nzCheckedChange)="refreshStatus()"></td>
      <td>{{ data.title }}</td>
      <td>{{ data.username }}</td>
      <td>{{ data.catid }}</td>
      <td>
        <a [routerLink]="[ '/user/edit' ]">
          <button nz-button nzType="primary">
            编辑
          </button>
        </a>
      </td>
    </tr>
  </tbody>
</nz-table>
```
```ts
import { Component, OnInit } from '@angular/core';

import { HttpClient } from "@angular/common/http";

export interface Data {
  id: number;
  name: string;
  age: number;
  address: string;
}
@Component({
  selector: 'app-ajaxlist',
  templateUrl: './ajaxlist.component.html',
  styleUrls: ['./ajaxlist.component.scss']
})
export class AjaxlistComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  listOfAllData: Data[] = [];
  loading = true;

  isAllDisplayDataChecked = false;
  isOperating = false;
  isIndeterminate = false;
  listOfDisplayData: Data[] = [];
  
  mapOfCheckedId: { [key: string]: boolean } = {};
  numberOfChecked = 0;
  constructor(public http:HttpClient) { }
  currentPageDataChange($event: Data[]): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData
      .every(item => this.mapOfCheckedId[item.id]);
    this.isIndeterminate =
      this.listOfDisplayData.some(item => this.mapOfCheckedId[item.id]) &&
      !this.isAllDisplayDataChecked;
    this.numberOfChecked = this.listOfAllData.filter(item => this.mapOfCheckedId[item.id]).length;
  }

  checkAll(value: boolean): void {
    this.listOfDisplayData.forEach(item => (this.mapOfCheckedId[item.id] = value));
    this.refreshStatus();
  }

  operateData(): void {
    this.isOperating = true;
    setTimeout(() => {
      this.listOfAllData.forEach(item => (this.mapOfCheckedId[item.id] = false));
      this.refreshStatus();
      this.isOperating = false;
    }, 1000);
  }
  searchData(reset: boolean = false) {
    if(reset) {
      this.pageIndex = 1;
    }
    var api='http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page='+this.pageIndex;    
    this.loading = true
    this.http.get(api).subscribe((res:any) => {
      this.loading = false;
      console.log(res)
      this.listOfAllData = res.result
    })
  }
  ngOnInit() {
    this.searchData()
  }

}
```
## 表单输入
```html
<div class="form_input">
  <ul class="input_list">
    <li><input nz-input placeholder="请输入姓名" [(ngModel)]="inputData.inputValue" /></li>
    <li><nz-input-number [(ngModel)]="inputData.age" [nzMin]="1" [nzMax]="100" [nzStep]="1"></nz-input-number></li>
    <li>性别：
      <nz-radio-group [(ngModel)]="inputData.sex">
        <label nz-radio nzValue="0">男</label>
        <label nz-radio nzValue="1">女</label>
      </nz-radio-group>
    </li>
    <li>爱好：
      <nz-checkbox-group [(ngModel)]="inputData.checkOptions" ></nz-checkbox-group>
    </li>
    <li>等级：
        <nz-select style="width: 120px;" [(ngModel)]="inputData.vipcheckedOption" nzAllowClear nzPlaceHolder="Choose">
          <nz-option 
            *ngFor="let item of options"
            [nzValue]="item" 
            [nzLabel]="item.label">
          </nz-option>
        </nz-select>
    </li>
    <li>日期：
        <nz-date-picker [(ngModel)]="inputData.date" (ngModelChange)="onChange($event)"></nz-date-picker>
    </li>
    <li>
        <quill-editor [(ngModel)]="inputData.content">
          <div quill-editor-toolbar>
            <span class="ql-formats">
              <select class="ql-font">
                <option value="aref">Aref Ruqaa</option>
                <option value="mirza">Mirza</option>
                <option selected>Roboto</option>
              </select>
              <select class="ql-align" [title]="'Aligment'">
                <option selected></option>
                <option value="center"></option>
                <option value="right"></option>
                <option value="justify"></option>
              </select>
              <select class="ql-align" [title]="'Aligment2'">
                <option selected></option>
                <option value="center"></option>
                <option value="right"></option>
                <option value="justify"></option>
              </select>
            </span>
            <span class="ql-formats">
              <div id="counter"></div>
            </span>

            <span class="ql-formats">

              <button type="button" class="ql-header" value="1"></button>
            </span>

            <span class="ql-formats">

              <button type="button" class="ql-header" value="2"></button>
            </span>

            <span title="超链接" class="ql-formats">
              <button type="button" class="ql-link"></button>
            </span>

           
          </div>
        </quill-editor>
    </li>
  </ul>
  <button nz-button nzType="primary" (click)="handleSubmit()">提交</button>
  <div><pre>{{inputData | json}}</pre></div>
</div>
```
```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent implements OnInit {
  //select框
  options= [
    { value: 'vip11', label: 'vip1' },
    { value: 'vip22', label: 'vip2' }
  
  ] 

  inputData:any={
    inputValue:'',
    age:''  ,
    sex:'0',
    checkOptions: [
      { label: 'php', value: 'php', checked: true },
      { label: 'java', value: 'java' },
      { label: 'h5', value: 'h5'  }
    ],
    vipcheckedOption:this.options[0],
    date:'',
    content: ''
  }
  constructor() { }

  ngOnInit() {
  }
  onChange(e:Date) {
    console.log(e)
    var date = new Date(e)
    console.log(date.getTime())
    // this.inputData.date = date.getTime();
  }
  handleSubmit() {
    console.log(this.inputData)
  }
}
```