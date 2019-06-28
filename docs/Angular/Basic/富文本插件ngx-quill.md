# 富文本插件ngx-quill的使用
## 1、安装
* `npm install --save ngx-quill`
* 安装@angular/core，@angular/common，@angular/forms，@angular/platform-browser，quill和rxjs等同行的依赖性插件
:::warning
`npm install --save quill`必须安装此依赖
:::
## 2、在index.html引入css
```html
<link href="https://cdn.quilljs.com/1.2.2/quill.snow.css" rel="stylesheet">
```
## 3、在模块中引入
```ts
import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    ...
    QuillModule
    ...
  ],
})
export class xxxModule { }
```
## 4、在对应的html中引入
```html
<quill-editor 
  (onEditorCreated)="EditorCreated($event)" 
  [(ngModel)]='textDetail'>
</quill-editor>
```
## 5、在component中实现图片上传的处理器
```ts
public editor;

EditorCreated(quill) {
    const toolbar = quill.getModule('toolbar');
    toolbar.addHandler('image', this.imageHandler.bind(this));
    this.editor = quill;
  }

imageHandler() {
    const Imageinput = document.createElement('input');
    Imageinput.setAttribute('type', 'file');
    Imageinput.setAttribute('accept','image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
    Imageinput.classList.add('ql-image');
    Imageinput.addEventListener('change', () => {
      const file = Imageinput.files[0];
      const data: FormData = new FormData();
      data.append('file', file, file.name);
      const header = new Headers();
      header.append('Accept', 'application/json');
      const options = new RequestOptions({ headers: header });
      if (Imageinput.files != null && Imageinput.files[0] != null) {
        this.http.post('http://xxxx/upload', data, options)
        .map(res => res.json())
        .subscribe(res => {
          const range = this.editor.getSelection(true);
          const index = range.index + range.length;
          this.editor.insertEmbed(range.index, 'image', 'http://'+res.url);
        });
      }
    });
    Imageinput.click();
```
## 6、自定义菜单项
```html
<quill-editor>
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
```
* 链接(简书)：[ngx-quill富文本框使用+图片上传](https://www.jianshu.com/p/a7ded48ac974)