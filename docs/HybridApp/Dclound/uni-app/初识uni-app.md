# 初识uni-app

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