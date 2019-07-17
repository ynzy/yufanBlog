# 关于git提交规范
良好的Commit Message有利于代码审查，能更快速查找变更记录，并且可以直接生成Change log。
* 在接手新项目时候
  * 你希望看到的git commit记录是这样的?
  * 还是这样的?? WTF!?
Commit Message的写法规范：[AngularJS Git Commit Message Conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#)的格式。
## angular规范
为了规范代码提交的说明，这里我们使用`angular`的规范写法：
```js
<type>(<scope>): <subject> #header
// 空一行
<body>
// 空一行
<footer> 
```
## 格式讲解
### Header
**Header**部分只有一行，包括三个字段：type（必需）、scope（可选）和subject（必需）。

总的来说，关键就是header这部分，至于`<body>`和`<footer>`可省略

例如:
```
feat:新增财务报表
```
### type
用于说明本次commit的类别，只允许使用下面7个标识

* feat：新功能（feature）
* fix：修补bug
* docs：文档（documentation）
* style： 格式（不影响代码运行的变动）
* refactor：重构（即不是新增功能，也不是修改bug的代码变动）
* test：增加测试
* chore：构建过程或辅助工具的变动
:::tip
注意:如果type为feat和fix，则该 commit 将肯定出现在 Change log 之中。其他情况（docs、chore、style、refactor、test）由你决定，要不要放入 Change log，建议是不要。
:::
### scope
用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。
例如:
```git
git commit -m "feat(module:user):添加用户模块"
```
此提交记录中的`module:user`说明提交的代码影响的是`user模块`内容.
### subject
是 commit 目的的简短描述，不超过50个字符。
```
以动词开头，使用第一人称现在时，比如change，而不是changed或changes
第一个字母小写
结尾不加句号（.）
```
## 使用commitizen来执行规范
1. 全局安装commitizennode模块
```js
npm install -g commitizen
```
2. 在项目目录下运行命令
```js
commitizen init cz-conventional-changelog --save --save-exact
```
3. 运行完以上一律使用`git cz` 代替`git commit`来提交代码,同时会显示一下选项来自动生成符合格式的`commit message`.
```js
