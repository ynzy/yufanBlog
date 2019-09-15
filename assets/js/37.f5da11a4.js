(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{334:function(t,a,e){"use strict";e.r(a);var n=e(5),s=Object(n.a)({},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h2",{attrs:{id:"uni-app介绍"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#uni-app介绍","aria-hidden":"true"}},[t._v("#")]),t._v(" uni-app介绍")]),t._v(" "),e("p",[t._v("uni-app 是一个使用 Vue.js 开发跨平台应用的前端框架，开发者编写一套代码，可编译到iOS、Android、H5、小程序等多个平台。")]),t._v(" "),e("ul",[e("li",[t._v("Union Application")]),t._v(" "),e("li",[t._v("前端框架")]),t._v(" "),e("li",[t._v("基于vue.js")]),t._v(" "),e("li",[t._v("开发规范同小程序")]),t._v(" "),e("li",[t._v("一套代码即可编译到iOS、Android、H5、小程序等多个平台。")])]),t._v(" "),e("h2",{attrs:{id:"为什么使用uni-app？"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#为什么使用uni-app？","aria-hidden":"true"}},[t._v("#")]),t._v(" 为什么使用uni-app？")]),t._v(" "),e("ol",[e("li",[t._v("同一套代码编译多端")]),t._v(" "),e("li",[t._v("接近原生，效果更好")]),t._v(" "),e("li",[t._v("开发效率高")]),t._v(" "),e("li",[t._v("开发(人力/维护/时间)成本低")]),t._v(" "),e("li",[t._v("学习成本低(会小程序，vue比较容易)")]),t._v(" "),e("li",[t._v("支持npm与自定义组件")]),t._v(" "),e("li",[t._v("社区活跃，版本迭代快(官方维护频率高，每周)")])]),t._v(" "),e("h2",{attrs:{id:"hbuilderx介绍"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#hbuilderx介绍","aria-hidden":"true"}},[t._v("#")]),t._v(" HbuilderX介绍")]),t._v(" "),e("ul",[e("li",[t._v("HbuilderX"),e("a",{attrs:{href:"http://www.dcloud.io/hbuilderx.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("官方IDE下载地址"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://uniapp.dcloud.io/api/README",target:"_blank",rel:"noopener noreferrer"}},[t._v("uni-app文档快速上手创建项目"),e("OutboundLink")],1)])]),t._v(" "),e("div",{staticClass:"warning custom-block"},[e("p",[t._v("运行真机模拟器需要下载插件，如果下载安装失败请重启IDE。")])]),t._v(" "),e("div",{staticClass:"warning custom-block"},[e("p",[t._v("运行小程序模拟器需要安装对应的微信开发者工具，并配置小程序ide相关路径")])]),t._v(" "),e("ul",[e("li",[t._v("mac的测试工具\n"),e("ul",[e("li",[t._v("苹果内置的simulator模拟器，需要下载Xcode")])])])]),t._v(" "),e("h2",{attrs:{id:"mvc与mvvm设计思想"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#mvc与mvvm设计思想","aria-hidden":"true"}},[t._v("#")]),t._v(" MVC与MVVM设计思想")]),t._v(" "),e("ul",[e("li",[e("p",[t._v("MVC")]),t._v(" "),e("ol",[e("li",[t._v("各部分之间的通信都是单向的。")]),t._v(" "),e("li",[t._v("Model-模型层，数据的增删改查，将新的数据发送到 View，用户得到反馈")]),t._v(" "),e("li",[t._v("View-视图层，前端页面，传送指令到 Controller")]),t._v(" "),e("li",[t._v("Controller-控制层，处理业务，完成业务逻辑后，要求 Model 改变状态")])])]),t._v(" "),e("li",[e("p",[t._v("MVVM")]),t._v(" "),e("ol",[e("li",[t._v("M：模型层，主要负责业务数据相关；")]),t._v(" "),e("li",[t._v("V：视图层，顾名思义，负责视图相关，细分下来就是html+css层；")]),t._v(" "),e("li",[t._v("VM：V与M沟通的桥梁，负责监听M或者V的修改，是实现MVVM双向绑定的要点；")]),t._v(" "),e("li",[t._v("MVVM支持双向绑定，意思就是当M层数据进行修改时，VM层会监测到变化，并且通知V层进行相应的修改，反之修改V层则会通知M层数据进行修改，以此也实现了视图与模型层的相互解耦（独立）；")]),t._v(" "),e("li",[t._v("当前台View发生变化时，View与VM进行了绑定，VM又与M进行交互，从而使M得到了改变。")])])])]),t._v(" "),e("h2",{attrs:{id:"uni-app目录结构"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#uni-app目录结构","aria-hidden":"true"}},[t._v("#")]),t._v(" uni-app目录结构")]),t._v(" "),e("div",{staticClass:"language-json line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-json"}},[e("code",[t._v("┌─components            uni-app组件目录\n│  └─comp-a.vue         可复用的a组件\n├─hybrid                存放本地网页的目录，iframe"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("详见"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("(https"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//uniapp.dcloud.io/component/web-view)")]),t._v("\n├─platforms             存放各平台专用页面的目录，"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("详见"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("(https"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//uniapp.dcloud.io/platform)")]),t._v("\n├─pages                 业务页面文件存放的目录\n│  ├─index\n│  │  └─index.vue       index页面\n│  └─list\n│     └─list.vue        list页面\n├─static                存放应用引用静态资源（如图片、视频等）的地方，注意：静态资源只能存放于此\n├─main.js               Vue初始化入口文件\n├─App.vue               应用配置，用来配置App全局样式以及监听 "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("应用生命周期"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("(https"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//uniapp.dcloud.io/frame?id=%E5%BA%94%E7%94%A8%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)")]),t._v("\n├─manifest.json         配置应用名称、appid、logo、版本等打包信息，"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("详见"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("(https"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//uniapp.dcloud.io/collocation/manifest)")]),t._v("\n└─pages.json            配置页面路由、导航条、选项卡等页面类信息，"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("详见"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("(https"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//uniapp.dcloud.io/collocation/pages)")]),t._v("\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br"),e("span",{staticClass:"line-number"},[t._v("2")]),e("br"),e("span",{staticClass:"line-number"},[t._v("3")]),e("br"),e("span",{staticClass:"line-number"},[t._v("4")]),e("br"),e("span",{staticClass:"line-number"},[t._v("5")]),e("br"),e("span",{staticClass:"line-number"},[t._v("6")]),e("br"),e("span",{staticClass:"line-number"},[t._v("7")]),e("br"),e("span",{staticClass:"line-number"},[t._v("8")]),e("br"),e("span",{staticClass:"line-number"},[t._v("9")]),e("br"),e("span",{staticClass:"line-number"},[t._v("10")]),e("br"),e("span",{staticClass:"line-number"},[t._v("11")]),e("br"),e("span",{staticClass:"line-number"},[t._v("12")]),e("br"),e("span",{staticClass:"line-number"},[t._v("13")]),e("br"),e("span",{staticClass:"line-number"},[t._v("14")]),e("br")])]),e("h2",{attrs:{id:"pages-json的配置-相当于vue路由"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#pages-json的配置-相当于vue路由","aria-hidden":"true"}},[t._v("#")]),t._v(" "),e("a",{attrs:{href:"https://uniapp.dcloud.io/collocation/pages",target:"_blank",rel:"noopener noreferrer"}},[t._v("pages.json的配置(相当于vue路由)"),e("OutboundLink")],1)]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("属性")]),t._v(" "),e("th",[t._v("类型")]),t._v(" "),e("th",[t._v("必填")]),t._v(" "),e("th",[t._v("描述")]),t._v(" "),e("th",[t._v("平台兼容")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("globalStyle")]),t._v(" "),e("td",[t._v("Object")]),t._v(" "),e("td",[t._v("否")]),t._v(" "),e("td",[t._v("设置默认页面的窗口表现")]),t._v(" "),e("td")]),t._v(" "),e("tr",[e("td",[t._v("pages")]),t._v(" "),e("td",[t._v("Object Array")]),t._v(" "),e("td",[t._v("是")]),t._v(" "),e("td",[t._v("设置页面路径及窗口表现")]),t._v(" "),e("td")]),t._v(" "),e("tr",[e("td",[t._v("tabBar")]),t._v(" "),e("td",[t._v("Object")]),t._v(" "),e("td",[t._v("否")]),t._v(" "),e("td",[t._v("设置底部 tab 的表现")]),t._v(" "),e("td")]),t._v(" "),e("tr",[e("td",[t._v("condition")]),t._v(" "),e("td",[t._v("Object")]),t._v(" "),e("td",[t._v("否")]),t._v(" "),e("td",[t._v("启动模式配置")]),t._v(" "),e("td")]),t._v(" "),e("tr",[e("td",[t._v("subPackages")]),t._v(" "),e("td",[t._v("Object Array")]),t._v(" "),e("td",[t._v("否")]),t._v(" "),e("td",[t._v("分包加载配置")]),t._v(" "),e("td")]),t._v(" "),e("tr",[e("td",[t._v("preloadRule")]),t._v(" "),e("td",[t._v("Object")]),t._v(" "),e("td",[t._v("否")]),t._v(" "),e("td",[t._v("分包预下载规则")]),t._v(" "),e("td",[t._v("微信小程序")])]),t._v(" "),e("tr",[e("td",[t._v("workers")]),t._v(" "),e("td",[t._v("String")]),t._v(" "),e("td",[t._v("否")]),t._v(" "),e("td",[t._v("Worker 代码放置的目录")]),t._v(" "),e("td",[t._v("微信小程序")])])])]),t._v(" "),e("h2",{attrs:{id:"全局样式和局部样式"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#全局样式和局部样式","aria-hidden":"true"}},[t._v("#")]),t._v(" 全局样式和局部样式")]),t._v(" "),e("ul",[e("li",[t._v("app.vue引入的样式是全局样式，每个页面.vue组件写的样式是局部样式")])]),t._v(" "),e("h2",{attrs:{id:"应用配置文件manifest-json"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#应用配置文件manifest-json","aria-hidden":"true"}},[t._v("#")]),t._v(" "),e("a",{attrs:{href:"https://uniapp.dcloud.io/collocation/manifest",target:"_blank",rel:"noopener noreferrer"}},[t._v("应用配置文件manifest.json"),e("OutboundLink")],1)]),t._v(" "),e("h2",{attrs:{id:"应用的生命周期"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#应用的生命周期","aria-hidden":"true"}},[t._v("#")]),t._v(" "),e("a",{attrs:{href:"https://uniapp.dcloud.io/frame?id=%E5%BA%94%E7%94%A8%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F",target:"_blank",rel:"noopener noreferrer"}},[t._v("应用的生命周期"),e("OutboundLink")],1)]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("函数名")]),t._v(" "),e("th",[t._v("说明")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("onLaunch")]),t._v(" "),e("td",[t._v("当uni-app 初始化完成时触发（全局只触发一次）")])]),t._v(" "),e("tr",[e("td",[t._v("onShow")]),t._v(" "),e("td",[t._v("当 uni-app 启动，或从后台进入前台显示")])]),t._v(" "),e("tr",[e("td",[t._v("onHide")]),t._v(" "),e("td",[t._v("当 uni-app 从前台进入后台")])])])]),t._v(" "),e("h2",{attrs:{id:"页面的生命周期"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#页面的生命周期","aria-hidden":"true"}},[t._v("#")]),t._v(" "),e("a",{attrs:{href:"https://uniapp.dcloud.io/frame?id=%E9%A1%B5%E9%9D%A2%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F",target:"_blank",rel:"noopener noreferrer"}},[t._v("页面的生命周期"),e("OutboundLink")],1)]),t._v(" "),e("h2",{attrs:{id:"尺寸单位"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#尺寸单位","aria-hidden":"true"}},[t._v("#")]),t._v(" "),e("a",{attrs:{href:"https://uniapp.dcloud.io/frame?id=%E5%B0%BA%E5%AF%B8%E5%8D%95%E4%BD%8D",target:"_blank",rel:"noopener noreferrer"}},[t._v("尺寸单位"),e("OutboundLink")],1)]),t._v(" "),e("p",[t._v("uni-app支持的通用css单位包括px、upx、vh。")]),t._v(" "),e("ul",[e("li",[t._v("px 即屏幕像素")]),t._v(" "),e("li",[t._v("upx 是uni-app提供的一种根据屏幕宽度自适应的动态单位。以750宽的屏幕为基准，屏幕变宽，upx实际显示效果会等比放大。")]),t._v(" "),e("li",[t._v("vh 是视窗高度的百分比")])]),t._v(" "),e("p",[t._v("h5端还支持rem；微信端支持rpx（不过等同于upx，建议用upx代替）")]),t._v(" "),e("p",[t._v("App端，在pages.json里的titleNView或页面里写的plus api中涉及的单位，只支持px。"),e("strong",[t._v("注意此时不支持upx")])]),t._v(" "),e("p",[t._v("开发者可以通过设计稿基准宽度计算页面元素 upx 值，设计稿 1px 与框架样式 1upx 转换公式如下：")]),t._v(" "),e("p",[t._v("设计稿 1px / 设计稿基准宽度 = 框架样式 1upx / 750upx")]),t._v(" "),e("p",[t._v("换言之，页面元素宽度在 uni-app 中的宽度计算公式：")]),t._v(" "),e("p",[t._v("750 * 元素在设计稿中的宽度 / 设计稿基准宽度")]),t._v(" "),e("p",[e("strong",[t._v("举例说明：")])]),t._v(" "),e("ol",[e("li",[t._v("若设计稿宽度为 750px，元素 A 在设计稿上的宽度为 100px，那么元素 A 在 uni-app 里面的宽度应该设为：750 * 100 / 750，结果为：100upx。")]),t._v(" "),e("li",[t._v("若设计稿宽度为 640px，元素 A 在设计稿上的宽度为 100px，那么元素 A 在 uni-app 里面的宽度应该设为：750 * 100 / 640，结果为：117upx。")]),t._v(" "),e("li",[t._v("若设计稿宽度为 375px，元素 B 在设计稿上的宽度为 200px，那么元素 B 在 uni-app 里面的宽度应该设为：750 * 200 / 375，结果为：400upx。")])]),t._v(" "),e("p",[e("strong",[t._v("Tips")])]),t._v(" "),e("ul",[e("li",[t._v("注意 upx 是和宽度相关的单位，屏幕越宽，该值实际像素越大。如"),e("strong",[t._v("不想根据屏幕宽度缩放")]),t._v("，则应该使用 "),e("code",[t._v("px")]),t._v(" 单位。")]),t._v(" "),e("li",[t._v("如果开发者在字体或高度中也使用了 upx ，那么需注意这样的写法意味着随着屏幕变宽，字体会变大、高度会变大。如果你需要"),e("strong",[t._v("固定高度")]),t._v("，则应该使用 "),e("code",[t._v("px")]),t._v(" 。")]),t._v(" "),e("li",[t._v("设计师可以用 iPhone6 作为视觉稿的标准。")]),t._v(" "),e("li",[t._v("如果设计稿不是750px，HBuilderX提供了"),e("strong",[t._v("自动换算的工具")]),t._v("，详见：https://ask.dcloud.net.cn/article/35445。")]),t._v(" "),e("li",[t._v("App端，在pages.json里的titleNView或页面里写的plus api中涉及的单位，"),e("strong",[t._v("只支持px")]),t._v("，不支持upx。")]),t._v(" "),e("li",[t._v("动态绑定的 style 不支持直接使用 upx，需要使用方法转换")])]),t._v(" "),e("h2",{attrs:{id:"数据绑定"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#数据绑定","aria-hidden":"true"}},[t._v("#")]),t._v(" 数据绑定")]),t._v(" "),e("ul",[e("li",[t._v("v-bind:组件的属性名-> :组件的属性名")])]),t._v(" "),e("h2",{attrs:{id:"事件处理器"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#事件处理器","aria-hidden":"true"}},[t._v("#")]),t._v(" 事件处理器")]),t._v(" "),e("p",[t._v("几乎全支持 "),e("a",{attrs:{href:"https://cn.vuejs.org/v2/guide/events.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Vue官方文档：事件处理器"),e("OutboundLink")],1)]),t._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("// 事件映射表，左侧为 WEB 事件，右侧为 ``uni-app`` 对应事件\n{\n    click: 'tap',  指触摸后马上离开\n    touchstart: 'touchstart',  手指触摸动作开始\n    touchmove: 'touchmove',  手指触摸后移动\n    touchcancel: 'touchcancel',  手指触摸动作被打断，如来电提醒，弹窗\n    touchend: 'touchend', 手指触摸动作结束\n    tap: 'tap',\n    longtap: 'longtap',  手指触摸后，超过350ms再离开（推荐使用longpress事件代替）\n    input: 'input', 当键盘输入时，触发input事件\n    change: 'change',\n    submit: 'submit',\n    blur: 'blur', 输入框失去焦点时触发\n    focus: 'focus', 输入框聚焦时触发\n    reset: 'reset',  重置事件\n    confirm: 'confirm', 点击完成按钮时触发\n    columnchange: 'columnchange',\n    linechange: 'linechange',\n    error: 'error',\n    scrolltoupper: 'scrolltoupper',  向上滚动\n    scrolltolower: 'scrolltolower',  向下滚动\n    scroll: 'scroll'  滚动事件\n}\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br"),e("span",{staticClass:"line-number"},[t._v("2")]),e("br"),e("span",{staticClass:"line-number"},[t._v("3")]),e("br"),e("span",{staticClass:"line-number"},[t._v("4")]),e("br"),e("span",{staticClass:"line-number"},[t._v("5")]),e("br"),e("span",{staticClass:"line-number"},[t._v("6")]),e("br"),e("span",{staticClass:"line-number"},[t._v("7")]),e("br"),e("span",{staticClass:"line-number"},[t._v("8")]),e("br"),e("span",{staticClass:"line-number"},[t._v("9")]),e("br"),e("span",{staticClass:"line-number"},[t._v("10")]),e("br"),e("span",{staticClass:"line-number"},[t._v("11")]),e("br"),e("span",{staticClass:"line-number"},[t._v("12")]),e("br"),e("span",{staticClass:"line-number"},[t._v("13")]),e("br"),e("span",{staticClass:"line-number"},[t._v("14")]),e("br"),e("span",{staticClass:"line-number"},[t._v("15")]),e("br"),e("span",{staticClass:"line-number"},[t._v("16")]),e("br"),e("span",{staticClass:"line-number"},[t._v("17")]),e("br"),e("span",{staticClass:"line-number"},[t._v("18")]),e("br"),e("span",{staticClass:"line-number"},[t._v("19")]),e("br"),e("span",{staticClass:"line-number"},[t._v("20")]),e("br"),e("span",{staticClass:"line-number"},[t._v("21")]),e("br"),e("span",{staticClass:"line-number"},[t._v("22")]),e("br"),e("span",{staticClass:"line-number"},[t._v("23")]),e("br")])]),e("h2",{attrs:{id:"条件渲染"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#条件渲染","aria-hidden":"true"}},[t._v("#")]),t._v(" 条件渲染")]),t._v(" "),e("p",[t._v("完整支持 "),e("a",{attrs:{href:"https://cn.vuejs.org/v2/guide/conditional.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Vue官方文档：条件渲染"),e("OutboundLink")],1)]),t._v(" "),e("h2",{attrs:{id:"列表渲染"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#列表渲染","aria-hidden":"true"}},[t._v("#")]),t._v(" 列表渲染")]),t._v(" "),e("p",[t._v("完整vue列表渲染 "),e("a",{attrs:{href:"https://cn.vuejs.org/v2/guide/list.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Vue官方文档：列表渲染"),e("OutboundLink")],1)]),t._v(" "),e("h3",{attrs:{id:"key"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#key","aria-hidden":"true"}},[t._v("#")]),t._v(" key")]),t._v(" "),e("p",[t._v("如果列表中项目的位置会动态改变或者有新的项目添加到列表中，并且希望列表中的项目保持自己的特征和状态（如 "),e("code",[t._v("<input>")]),t._v(" 中的输入内容，"),e("code",[t._v("<switch>")]),t._v(" 的选中状态），需要使用 "),e("code",[t._v(":key")]),t._v(" 来指定列表中项目的唯一的标识符。")]),t._v(" "),e("ul",[e("li",[t._v("使用 v-for 循环 array 中 item 的某个 property，该 property 的值需要是列表中唯一的字符串或数字，且不能动态改变。")]),t._v(" "),e("li",[t._v("使用 v-for 循环中 item 本身，这时需要 item 本身是一个唯一的字符串或者数字")])]),t._v(" "),e("p",[t._v("当数据改变触发渲染层重新渲染的时候，会校正带有 key 的组件，框架会确保他们被重新排序，而不是重新创建，以确保使组件保持自身的状态，并且提高列表渲染时的效率。")]),t._v(" "),e("h2",{attrs:{id:"跨端兼容"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#跨端兼容","aria-hidden":"true"}},[t._v("#")]),t._v(" 跨端兼容")]),t._v(" "),e("p",[t._v("uni-app 已将常用的组件、JS API 封装到框架中，开发者按照 uni-app 规范开发即可保证多平台兼容，大部分业务均可直接满足。")]),t._v(" "),e("p",[t._v("但每个平台有自己的一些特性，因此会存在一些无法跨平台的情况。")]),t._v(" "),e("ul",[e("li",[t._v("大量写 if else，会造成代码执行性能低下和管理混乱。")]),t._v(" "),e("li",[t._v("编译到不同的工程后二次修改，会让后续升级变的很麻烦。")])]),t._v(" "),e("p",[t._v("在 C 语言中，通过 #ifdef、#ifndef 的方式，为 windows、mac 等不同 os 编译不同的代码。 uni-app 参考这个思路，为 uni-app 提供了条件编译手段，在一个工程里优雅的完成了平台个性化实现。")]),t._v(" "),e("h3",{attrs:{id:"条件编译"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#条件编译","aria-hidden":"true"}},[t._v("#")]),t._v(" "),e("a",{attrs:{href:"https://uniapp.dcloud.io/platform?id=%E6%9D%A1%E4%BB%B6%E7%BC%96%E8%AF%91",target:"_blank",rel:"noopener noreferrer"}},[t._v("条件编译"),e("OutboundLink")],1)]),t._v(" "),e("p",[t._v("条件编译是里用特殊的注释作为标记，在编译时根据这些特殊的注释，将注释里面的代码编译到不同平台。")]),t._v(" "),e("p",[e("strong",[t._v("写法")]),t._v("：以 #ifdef 或 #ifndef 加 "),e("strong",[t._v("%PLATFORM%")]),t._v(" 开头，以 #endif 结尾。")]),t._v(" "),e("ul",[e("li",[t._v("#ifdef：if defined 仅在某平台存在")]),t._v(" "),e("li",[t._v("#ifndef：if not defined 除了某平台均存在")]),t._v(" "),e("li",[e("strong",[t._v("%PLATFORM%")]),t._v("：平台名称")])])])},[],!1,null,null,null);a.default=s.exports}}]);