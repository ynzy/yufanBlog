# Angular Library 快速入门
`Angular CLI`集成`ng-packagr`构建生成 `Angular` 库.**ng-packagr** 是由 `David Herges` 创建的一个很棒的工具，用于将你的库代码转换成官方约定的Angular 包格式。

接下来的内容中，你将体验创建一个自己的 Angular 库的具体过程。并且，为了避免陷入不必要的麻烦，创建的过程中我会着重强调一些实用的规则。

相应的[GitHub 代码](https://github.com/ynzy/angular-study/tree/AngularLibrary)

## 1.介绍
通过`ng new` Angular CLI 为我们创建了一个新的工作区(workspace).

在这个 Angular workspace中我们将创建两个项目：
  * A library Project
    * 这是包含我们想要创建的组件和服务的库。
    * 这些代码是我们可以发布到npm等第三方库提供商的。
  * An application project
    * 这个项目用来测试展示我们的库。有时候此项目用作库的文档说明或者用例演示。
这里还会有 Angular CLI 默认为我们创建的 e2e 测试项目，不过本文中我们将忽略它。

现在我们已经对我们的 Angular workspace 有了一个大概的认识，接下来是本教程一些具体的目标：

## 2.目标
* 使用 Angular CLI 创建一个与我们打算创建的库名称一样的工作区(workspace)：yufan-packages
* 创建名为yufan-packages的应用
* 创建名为yufan的库
* 使用zy作为库前缀
* 在yufan-packages里导入yufan库并使用

## 3.创建 Angular 工作区
我们的第一个目标是创建一个名为example-ng6-lib的Angular 工作区。
```cmd
ng new yufan-packages
cd yufan-packages
ng serve --open
```
## 4.配置angular.json
在我们进行下一步创建库之前，先让我们快速的看一下 Angular 配置文件:angular.json
```js
"projects": {
    "yufan-packages": {
      ...
    }
},
```
目前为止，我们创建了一个project
* yufan-packages:这是我们打算用来测试库的应用项目
请记住，我们告诉 CLI 创建名为:yufan-packages的工作空间.

一旦我们创建了我们的库，对应的条目将添加到这个 projects 对象中。
## 5.创建库模块
现在让我们在工作区创建名为yufan的库。

    ng g library yufan --prefix=zy

上面我们使用了`--prefix`选项，使得库元素特定的前缀。否则将默认使用 `zy` 作为前缀。

generate library 具体做了什么呢？
* 在angular.json文件中添加yufan project条目
* 在package.json中为 ng-packagr 添加相应的依赖
* 在tsconfig.json文件里为 yufan 添加构建路径的引用
* 在projects/yufan路径下创建初始源代码

我们可以再具体深入地看看各自做了啥？

仔细瞧瞧`angular.json`,你会发现`projects`下面多了一条记录：`yufan`

这里有几个值得注意的元素：

* `projectType`:项目类型:`library` 和`application`.
* `root`:指向库项目的根文件夹。
* `sourceRoot`:指向存放库的实际源代码的根路径。
* `prefix`:CLI 生成组件的选择器前缀标识符
* `architect`:包含很多个部分比如`build,test和lint`,这些设置告诉 Angular CLI 如何处理相应的 process.请注意，在构建的部分，使用的是`ng-packagr`.

### ng-packagr dependency in package.json
当我们创建库的时候 Angular CLI 自己就已经意识到它需要用到ng-packagr，所以它在我们的工作区 package.json 里面添加了相应的devDependencies:

    "ng-packagr": "^5.1.0",

### build path in tsconfig.json
当我们想测试我们的 ynzy 的时候，我们希望能像引入第三方库一样使用它，而不是作为应用的一组文件集。通常，当我们在项目中使用第三方类库时，我们通过npm install将库安装到node_modules文件夹内。

尽管如此，example-ng6-lib 并不会安装到node_modules，而是将被构建到我们工作空间的dist文件夹的子文件夹中。Angular CLI 把这个文件夹添加到tsconfig.json中使得它可以作为一个库导入到应用中。

```js
"paths": {
  "yufan": [
    "dist/yufan"
  ],
  "yufan/*": [
    "dist/yufan/*"
  ]
}
```
### yufan 源代码
**src**文件夹位于`projects/yufan`. Angular CLI 默认为新库创建了一个包含服务和组件的模块，此外还有另外一些文件：
* `package.json`:这是针对库的特定 `package.json` 文件。当库作为一个**npm**包发布时，这个文件一会一同发布，所以当别人通过 npm 使用我们的库时，就会安装这个文件里指定的依赖。
* `public_api.ts`:这就是所谓的入口文件。它定义了我们库的哪些部分是外部可见的，可以在外部直接调用的。你可能会问：这不是模块中的`export`做的事情吗？的确是的，但这可能比那更复杂一点。我们会在后面再讨论这个。
* `ng-package.json`:`ng-packagr`的配置文件。如果是在以前，我们需要熟悉它的内容。但是现在，新的 Angular CLI 足以告诉 `ng-packagr` 在哪里找到我们的入口文件以及在哪里构建我们的库。
## 6.构建库
在使用我们新创建的库之前，我们需要对它进行编译：

    ng build yufan

## 7.在项目应用中使用库
构建一个库的核心思想之一就是，我们通常有一个和库一起构建的应用程序，以便测试它。

这里yufan-packages将会使用我们的库。

### 导入 yufan 模块
修改AppModule模块：`src\app\app.module.ts`

把`YufanModule`添加到imports数组中。可能你使用的 IDE 会提示你引入相应的模块文件，但是请不要相信它！我们应该通过库名称导入它：

    import { YufanModule } from "yufan";

这是可行的，因为当以名称导入库时，Angular CLI 首先查找`tsconfig.json paths`，然后是 `node_modules`。
:::warning
在测试应用程序中，使用名称而不是单独的文件来导入库。
:::
至此，app.module.ts 文件应该差不多像这样：
```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { YufanModule } from "yufan";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    YufanModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
### 使用 yufan 组件
简单起见，我们在 AppComponent 模板里面使用类库默认创建的组件。

我们替换 AppComponent 模板的下半部分代码：
```html
<!-- src\app\app.component.html -->
<zy-yufan></zy-yufan>
```
最后运行`ng serve`查看效果。
## 8.拓展我们的库
到目前为止我们已经知道如何构建并运行测试我们的类库。接下来给我们的类库添加一个新的组件。

下面是将要进行的步骤：

1. 在类库中创建新的组件
2. 将创建的组件在模块文件中导出
3. 将新的组件添加到入口文件总
4. 重新编译我们的类库
5. 在测试应用中使用新的组件

### 创建类库组件

通过`--project`选项告诉 Angular CLI 我们想要给指定的类库项目创建新的组件。现在创建一个简单的名叫`header`的类库组件：
```
 ng g component components/header --project=yufan
```
创建组件时，添加`components`文件夹，方便以后区分组件，服务等库用途

CLI 自动帮我们创建了这个组件并将它添加到类库模块文件(projects\yufan\src\lib\yufan.module.ts)的declarations数组中.
### 从类库模块中导出组件
我们创建的类库组件如何给他人使用呢？

需要将我们创建的组件从yufan模块中导出
```ts
import { NgModule } from '@angular/core';
import { YufanComponent } from './yufan.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [YufanComponent, HeaderComponent],
  imports: [
  ],
  exports: [YufanComponent,HeaderComponent]
})
export class YufanModule { }
```
之后我们还需要在 `public-api.ts` 中导出新建的组件：
```ts
/*
 * Public API Surface of yufan
 */

export * from './lib/yufan.service';
export * from './lib/yufan.component';
export * from './lib/yufan.module';
//导出自定义组件
export * from './lib/components/header/header.component';
```
这里需要说明的是，对于组件来说：设置 `@NgModule` 的 `exports` 属性是为了使得元素可见，而添加到`public-api.ts`入口文件是为了使得 `Class` 可见。在完成新建 `HeaderComponent` 组件的导出工作后，我们需要使用下列命令，重新构建 `yufan` 库：
```cmd
$ ng build yufan
```
`yufan`重新构建成功后，我们就可以在模板中使用刚创建的 `HeaderComponent` 组件：
```html
<zy-yufan></zy-yufan>
<zy-header></zy-header>
```
## 9.创建yufan服务
除了创建自定义组件之外，我们也可以创建自定义服务：
```cmd
 ng g service services/data/data --project=yufan
```
以上命令成功执行后，将在 `yufan/src/lib/services/data` 目录下生成一个 `data.service.ts` 文件：
```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
}
```
假设我们的 `DataService` 需要利用 `HttpClient` 从网络上获取对应的数据，这时我们就需要在 `YufanModule` 模块中导入 `HttpClientModule` 模块，且在 `DataService` 注入 `HttpClient` 服务：
```ts
//data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }
}
```
在实际开发中，我们可能需要能够灵活配置 `DataService` 服务中，请求服务器的地址。这里使用过 `Angular Router` 模块的同学，可能已经想到了解决方案：
```ts
// yufan.module.ts
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { YufanComponent } from './yufan.component';
import { HeaderComponent } from './components/header/header.component';
import { BaseConfig,BaseConfigService } from "./services/baseConfig/baseConfig";
import { ModuleWithProviders } from '@angular/compiler/src/core';
@NgModule({
  declarations: [YufanComponent, HeaderComponent],
  imports: [
    HttpClientModule
  ],
  exports: [YufanComponent,HeaderComponent]
})
export class YufanModule {
  static forRoot(config: BaseConfig):ModuleWithProviders {
    return {
      ngModule: YufanModule,
      providers: [
        {
          provide: BaseConfigService,
          useValue: config
        }
      ]
    }
  }
}
```
即通过提供 forRoot() 静态方法，让模块的使用方来配置模块中的 provider。示例中 BaseConfig 接口和 BaseConfigService token 的定义如下：
```ts
// baseConfig.ts
import { InjectionToken } from '@angular/core';

export interface BaseConfig {
  dataUrl: string;
}

export const BaseConfigService = new InjectionToken<BaseConfig>(
  "TestLibConfig"
);
```
注册完 BaseConfigService provider 后，我们需要更新

首先，将我们的服务通过`public-api.ts`导出
```ts
// public-api.ts
/*
 * Public API Surface of yufan
 */

export * from './lib/yufan.service';
export * from './lib/yufan.component';
export * from './lib/yufan.module';
//导出自定义组件
export * from './lib/components/header/header.component';
//导出服务
export * from './lib/services/baseConfig/baseConfig';
export * from './lib/services/data/data.service';


```
然后在我们的`DataService`引入`BaseConfigService`
```ts
// data.service.ts
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BaseConfigService } from "../../../public-api";
@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  constructor(
    @Inject(BaseConfigService) private config,
    private http:HttpClient) { }
    getData() {
      return this.http.get(this.config.dataUrl);
    }
}
```
更新完 `DataService` 服务，我们在 `AppModule` 根模块导入 `YufanModule` 模块的时候，配置 `dataUrl` 属性，具体如下：
```ts
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    YufanModule.forRoot({
      dataUrl: `https://jsonplaceholder.typicode.com/todos/1`
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
```
这个时候forRoot会报错，`类型“typeof YufanModule”上不存在属性“forRoot”`,因为我们的yufan库还没有重新编译，没有forRoot属性。进行重新编译`ng build yufan`

现在我们的服务可以在我们的yufan库中使用，也可以在项目中使用
* yufan库中，在`YufanComponent`组件中使用
```js
// yufan.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from "./services/data/data.service";
@Component({
  selector: 'zy-yufan',
  template: `
    <p>
      yufan works!
    </p>
  `,
  styles: []
})
export class YufanComponent implements OnInit {

  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.dataService.getData().subscribe(console.log)
  }
}
```
* 在项目中的`GetdataComponent`组件中使用
```ts
// getdata.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from "yufan";
@Component({
  selector: 'app-getdata',
  templateUrl: './getdata.component.html',
  styleUrls: ['./getdata.component.less']
})
export class GetdataComponent implements OnInit {

  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.dataService.getData().subscribe(console.log)
  }

}
```
以上代码成功运行后，你将会在控制台看到以下输出信息：
```js
{userId: 1, id: 1, title: "delectus aut autem", completed: false}
```
## 10.将库，发布npm包
1. 创建一个npm的账号
发布包之前你必须要注册一个npm的账号

注册(输入用户名，密码，邮箱。注册成功会自动登录)
```js
npm adduser
```
2. 登录(输入用户名，密码就可登陆成功)
```js
npm login
```
证明是否登录成功：
```js
npm who am i
```
3. 发布(注意发布必须是登录状态下)
```js
npm publish
```
### 报错信息
1. This package has been marked as private
```js
npm ERR! This package has been marked as private
npm ERR! Remove the 'private' field from the package.json to publish it.
```
说是这个包被标记为私有
* 处理方案：`删除 package.json文件的 "private": true,`

参考资料：
* [Angular Library系列](https://suchenrain.github.io/posts/8912/)
* [Angular Library 快速入门](http://www.semlinker.com/ng-library-quickstart/#%E5%88%9B%E5%BB%BA-sf-lib-%E7%BB%84%E4%BB%B6)
* [npm包发布](https://blog.csdn.net/sinat_36422236/article/details/85051588)
* [一分钟教你发布npm包](https://www.jianshu.com/p/7bba18925fbf)