# Angular 表单 
**input、checkbox、radio、select、 textarea**
```html
<h2>人员登记系统</h2>
<div class="people_list">
  <ul>
    <!-- 双向绑定 -->
    <li>姓名：<input class="form_input" type="text" [(ngModel)]="peopleInfo.username"></li>
    <!-- 单选按钮，选择某一项时的value会赋值给双向绑定的值 -->
    <li>性别：
      <label for="sex1">男</label>
      <input type="radio" value='1' [(ngModel)]="peopleInfo.sex" id="sex1" name="sex">
      <label for="sex2">女</label>
      <input type="radio" value='2' [(ngModel)]="peopleInfo.sex" id="sex2" name="sex">
    </li>
    <!-- 下拉菜单，首选项为双向绑定的值，下拉菜单数据为数组 -->
    <li>居住城市：
      <select name="city" id="city" [(ngModel)]="peopleInfo.city">
        <option [value]="item" *ngFor="let item of peopleInfo.cityList">{{item}}</option>
      </select>
    </li>
    <!-- 多选框：数组循环，被选中的值ngModel值变为true -->
    <li>
      爱好：
      <span *ngFor="let item of peopleInfo.hobby;let key=index">
        <input type="checkbox" [(ngModel)]="item.checked" [id]="'check'+key">
        <label for="'check'+key">{{item.title}}</label>
        &nbsp;&nbsp;
      </span>
    </li>
    <!-- 双向绑定 -->
    <li>
      备注：
      <textarea name="mark" id="mark" [(ngModel)]="peopleInfo.mark" cols="30" rows="4"></textarea>
    </li>
  </ul>
  <div>
    <button (click)="handleSubmit()">获取表单内容</button>
    <pre style="margin-top: 30px;">{{peopleInfo | json}}</pre>
  </div>
</div>
```
```ts
public peopleInfo:any={
  username: '',
  sex: '1',
  cityList: ['北京','上海','深圳'],
  city: '北京',
  hobby:[{
    title: '吃饭',
    checked: false
  },{
    title: '睡觉',
    checked: true
  },{
    title: '敲代码',
    checked: false
  }],
  mark: ''
}
handleSubmit() {
  console.log(this.peopleInfo)
}
```
