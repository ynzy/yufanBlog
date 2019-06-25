---
title: 一、初识uni-app
---

## uni-app介绍
uni-app 是一个使用 Vue.js 开发跨平台应用的前端框架，开发者编写一套代码，可编译到iOS、Android、H5、小程序等多个平台。
* Union Application
* 前端框架
* 基于vue.js
* 开发规范同小程序
* 一套代码即可编译到iOS、Android、H5、小程序等多个平台。
## 为什么使用uni-app？
1. 同一套代码编译多端
2. 接近原生，效果更好
3. 开发效率高
4. 开发(人力/维护/时间)成本低
5. 学习成本低(会小程序，vue比较容易)
6. 支持npm与自定义组件
7. 社区活跃，版本迭代快(官方维护频率高，每周)
## HbuilderX介绍
* HbuilderX[官方IDE下载地址](http://www.dcloud.io/hbuilderx.html)
* [uni-app文档快速上手创建项目](https://uniapp.dcloud.io/api/README)
::: warning
运行真机模拟器需要下载插件，如果下载安装失败请重启IDE。
:::
::: warning
运行小程序模拟器需要安装对应的微信开发者工具，并配置小程序ide相关路径
:::
* mac的测试工具
  * 苹果内置的simulator模拟器，需要下载Xcode
## MVC与MVVM设计思想
* MVC
  1. 各部分之间的通信都是单向的。
  2. Model-模型层，数据的增删改查，将新的数据发送到 View，用户得到反馈
  3. View-视图层，前端页面，传送指令到 Controller
  4. Controller-控制层，处理业务，完成业务逻辑后，要求 Model 改变状态

* MVVM
  1. M：模型层，主要负责业务数据相关；
  2. V：视图层，顾名思义，负责视图相关，细分下来就是html+css层；
  3. VM：V与M沟通的桥梁，负责监听M或者V的修改，是实现MVVM双向绑定的要点；
  4. MVVM支持双向绑定，意思就是当M层数据进行修改时，VM层会监测到变化，并且通知V层进行相应的修改，反之修改V层则会通知M层数据进行修改，以此也实现了视图与模型层的相互解耦（独立）；
  5. 当前台View发生变化时，View与VM进行了绑定，VM又与M进行交互，从而使M得到了改变。

## uni-app目录结构

```json
┌─components            uni-app组件目录
│  └─comp-a.vue         可复用的a组件
├─hybrid                存放本地网页的目录，iframe[详见](https://uniapp.dcloud.io/component/web-view)
├─platforms             存放各平台专用页面的目录，[详见](https://uniapp.dcloud.io/platform)
├─pages                 业务页面文件存放的目录
│  ├─index
│  │  └─index.vue       index页面
│  └─list
│     └─list.vue        list页面
├─static                存放应用引用静态资源（如图片、视频等）的地方，注意：静态资源只能存放于此
├─main.js               Vue初始化入口文件
├─App.vue               应用配置，用来配置App全局样式以及监听 [应用生命周期](https://uniapp.dcloud.io/frame?id=%E5%BA%94%E7%94%A8%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)
├─manifest.json         配置应用名称、appid、logo、版本等打包信息，[详见](https://uniapp.dcloud.io/collocation/manifest)
└─pages.json            配置页面路由、导航条、选项卡等页面类信息，[详见](https://uniapp.dcloud.io/collocation/pages)
```

## [pages.json的配置(相当于vue路由)](https://uniapp.dcloud.io/collocation/pages)
属性  | 类型  | 必填 | 描述 | 平台兼容
------- | ------- | ------- | ------- | -------
globalStyle | Object | 否 | 设置默认页面的窗口表现 | 
pages | Object Array | 是 | 设置页面路径及窗口表现 | 
tabBar | Object | 否 | 设置底部 tab 的表现 | 
condition | Object | 否 | 启动模式配置 | 
subPackages | Object Array | 否 | 分包加载配置 | 
preloadRule | Object | 否 | 分包预下载规则 | 微信小程序
workers | String | 否 | Worker 代码放置的目录 | 微信小程序

## 全局样式和局部样式
* app.vue引入的样式是全局样式，每个页面.vue组件写的样式是局部样式
## [应用配置文件manifest.json](https://uniapp.dcloud.io/collocation/manifest)

## [应用的生命周期](https://uniapp.dcloud.io/frame?id=%E5%BA%94%E7%94%A8%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)
函数名 | 说明
------- | -------
onLaunch | 当uni-app 初始化完成时触发（全局只触发一次）
onShow | 当 uni-app 启动，或从后台进入前台显示
onHide | 当 uni-app 从前台进入后台
## [页面的生命周期](https://uniapp.dcloud.io/frame?id=%E9%A1%B5%E9%9D%A2%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)
## [尺寸单位](https://uniapp.dcloud.io/frame?id=%E5%B0%BA%E5%AF%B8%E5%8D%95%E4%BD%8D)
uni-app支持的通用css单位包括px、upx、vh。
* px 即屏幕像素
* upx 是uni-app提供的一种根据屏幕宽度自适应的动态单位。以750宽的屏幕为基准，屏幕变宽，upx实际显示效果会等比放大。
* vh 是视窗高度的百分比

h5端还支持rem；微信端支持rpx（不过等同于upx，建议用upx代替）

App端，在pages.json里的titleNView或页面里写的plus api中涉及的单位，只支持px。**注意此时不支持upx**

开发者可以通过设计稿基准宽度计算页面元素 upx 值，设计稿 1px 与框架样式 1upx 转换公式如下：

设计稿 1px / 设计稿基准宽度 = 框架样式 1upx / 750upx

换言之，页面元素宽度在 uni-app 中的宽度计算公式：

750 * 元素在设计稿中的宽度 / 设计稿基准宽度

**举例说明：**

1. 若设计稿宽度为 750px，元素 A 在设计稿上的宽度为 100px，那么元素 A 在 uni-app 里面的宽度应该设为：750 * 100 / 750，结果为：100upx。
2. 若设计稿宽度为 640px，元素 A 在设计稿上的宽度为 100px，那么元素 A 在 uni-app 里面的宽度应该设为：750 * 100 / 640，结果为：117upx。
3. 若设计稿宽度为 375px，元素 B 在设计稿上的宽度为 200px，那么元素 B 在 uni-app 里面的宽度应该设为：750 * 200 / 375，结果为：400upx。

**Tips**

* 注意 upx 是和宽度相关的单位，屏幕越宽，该值实际像素越大。如**不想根据屏幕宽度缩放**，则应该使用 `px` 单位。
* 如果开发者在字体或高度中也使用了 upx ，那么需注意这样的写法意味着随着屏幕变宽，字体会变大、高度会变大。如果你需要**固定高度**，则应该使用 `px` 。
* 设计师可以用 iPhone6 作为视觉稿的标准。
* 如果设计稿不是750px，HBuilderX提供了**自动换算的工具**，详见：https://ask.dcloud.net.cn/article/35445。
* App端，在pages.json里的titleNView或页面里写的plus api中涉及的单位，**只支持px**，不支持upx。
* 动态绑定的 style 不支持直接使用 upx，需要使用方法转换

## 数据绑定
* v-bind:组件的属性名-> :组件的属性名

## 事件处理器
几乎全支持 [Vue官方文档：事件处理器](https://cn.vuejs.org/v2/guide/events.html)
```
// 事件映射表，左侧为 WEB 事件，右侧为 ``uni-app`` 对应事件
{
    click: 'tap',  指触摸后马上离开
    touchstart: 'touchstart',  手指触摸动作开始
    touchmove: 'touchmove',  手指触摸后移动
    touchcancel: 'touchcancel',  手指触摸动作被打断，如来电提醒，弹窗
    touchend: 'touchend', 手指触摸动作结束
    tap: 'tap',
    longtap: 'longtap',  手指触摸后，超过350ms再离开（推荐使用longpress事件代替）
    input: 'input', 当键盘输入时，触发input事件
    change: 'change',
    submit: 'submit',
    blur: 'blur', 输入框失去焦点时触发
    focus: 'focus', 输入框聚焦时触发
    reset: 'reset',  重置事件
    confirm: 'confirm', 点击完成按钮时触发
    columnchange: 'columnchange',
    linechange: 'linechange',
    error: 'error',
    scrolltoupper: 'scrolltoupper',  向上滚动
    scrolltolower: 'scrolltolower',  向下滚动
    scroll: 'scroll'  滚动事件
}
```
## 条件渲染
完整支持 [Vue官方文档：条件渲染](https://cn.vuejs.org/v2/guide/conditional.html)

## 列表渲染
完整vue列表渲染 [Vue官方文档：列表渲染](https://cn.vuejs.org/v2/guide/list.html)
### key
如果列表中项目的位置会动态改变或者有新的项目添加到列表中，并且希望列表中的项目保持自己的特征和状态（如 `<input>` 中的输入内容，`<switch>` 的选中状态），需要使用 `:key` 来指定列表中项目的唯一的标识符。

* 使用 v-for 循环 array 中 item 的某个 property，该 property 的值需要是列表中唯一的字符串或数字，且不能动态改变。
* 使用 v-for 循环中 item 本身，这时需要 item 本身是一个唯一的字符串或者数字

当数据改变触发渲染层重新渲染的时候，会校正带有 key 的组件，框架会确保他们被重新排序，而不是重新创建，以确保使组件保持自身的状态，并且提高列表渲染时的效率。

## 跨端兼容
uni-app 已将常用的组件、JS API 封装到框架中，开发者按照 uni-app 规范开发即可保证多平台兼容，大部分业务均可直接满足。

但每个平台有自己的一些特性，因此会存在一些无法跨平台的情况。

* 大量写 if else，会造成代码执行性能低下和管理混乱。
* 编译到不同的工程后二次修改，会让后续升级变的很麻烦。

在 C 语言中，通过 #ifdef、#ifndef 的方式，为 windows、mac 等不同 os 编译不同的代码。 uni-app 参考这个思路，为 uni-app 提供了条件编译手段，在一个工程里优雅的完成了平台个性化实现。

### [条件编译](https://uniapp.dcloud.io/platform?id=%E6%9D%A1%E4%BB%B6%E7%BC%96%E8%AF%91)
条件编译是里用特殊的注释作为标记，在编译时根据这些特殊的注释，将注释里面的代码编译到不同平台。

**写法**：以 #ifdef 或 #ifndef 加 **%PLATFORM%** 开头，以 #endif 结尾。
* #ifdef：if defined 仅在某平台存在
* #ifndef：if not defined 除了某平台均存在
* **%PLATFORM%**：平台名称

