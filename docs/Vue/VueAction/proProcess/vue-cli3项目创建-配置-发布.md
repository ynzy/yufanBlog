---
title: vue-cli3 项目创建-配置-发布
date: 2019-02-28 21:56:05
author: 张勇
# img: http://pl7h7g4ko.bkt.clouddn.com/18760162_p0.jpg
categories: 脚手架
tags: [Vue-cli]
---

## 一、使用的技术
> vue-cli3
> vuex
> axios
> 采用的数据接口，easy-mock
## 二、初始化项目
* 首先需要安装vue-cli3,[官方教程](https://cli.vuejs.org/zh/guide/installation.html)
* 初始化安装，并成功启动,
* 初始化项目默认安装router
![创建vue](https://upload-images.jianshu.io/upload_images/13505073-f363a00b6f8a8341.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/576/format/webp)
![创建vue](https://upload-images.jianshu.io/upload_images/13505073-a3f0202c13195228.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/570/format/webp)
```
vue init webpack itany
cd itany
npm install
npm install less less-loader -D  //生产依赖
npm install vuex axios -S       //开发依赖
npm run dev
```
![vue](https://upload-images.jianshu.io/upload_images/7704547-e0d94506f32722cd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/530/format/webp)

## 三、项目结构
* 项目文件介绍
```
|-- build                            // 项目构建(webpack)相关代码
|   |-- build.js                     // 生产环境构建代码
|   |-- check-version.js             // 检查node、npm等版本
|   |-- utils.js                     // 构建工具相关
|   |-- vue-loader.conf.js           // webpack loader配置
|   |-- webpack.base.conf.js         // webpack基础配置
|   |-- webpack.dev.conf.js          // webpack开发环境配置,构建开发本地服务器
|   |-- webpack.prod.conf.js         // webpack生产环境配置
|-- config                           // 项目开发环境配置
|   |-- dev.env.js                   // 开发环境变量
|   |-- index.js                     // 项目一些配置变量
|   |-- prod.env.js                  // 生产环境变量
|-- src                              // 源码目录
|   |-- assets                       // 静态资源
|   |-- components                   // vue公共组件
|   |-- router                       // vue的路由管理
|   |-- App.vue                      // 页面入口文件
|   |-- main.js                      // 程序入口文件，加载各种公共组件
|-- static                           // 静态文件，比如一些图片，json数据等
|-- .babelrc                         // ES6语法编译配置
|-- .editorconfig                    // 定义代码格式
|-- .gitignore                       // git上传需要忽略的文件格式
|-- .postcsssrc                       // postcss配置文件
|-- README.md                        // 项目说明
|-- index.html                       // 入口页面
|-- package.json                     // 项目基本信息,包依赖信息等
```
* 自定义修改项目结构
```
|-- src                              // 源码目录
|   |-- common                       // 公共的文件
|   |   |-- css
|   |   |-- js
|   |   |-- images
|   |-- components                   // vue公共组件
|   |-- router                       // vue的路由管理
|   |-- store                        // vuex数据状态管理
|   |   |-- modules       // 存储数据模块，每个模块都可以拥有自己的state、getters、actions、mutations
|   |   |   |-- seller.js  // 一个模块
|   |   |-- actions.js    // 公共的方法（动作）
|   |   |-- getters.js    // 获取公共的属性
|   |   |-- mutations.js  // 公共的数据变化
|   |   |-- index.js      // vuex初始化入口
|   |   |-- types.js      // 存储方法名（大写）
|   |-- App.vue                      // 页面入口文件
|   |-- main.js                      // 程序入口文件，加载各种公共组件
|-- static
|   |-- css                          //添加静态资源
|   |   |-- reset.css
```
![项目结构](https://upload-images.jianshu.io/upload_images/13505073-ba38588610b37509.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 四、删除替换多余文件及代码

### 1、修改文件--src/App.vue
    ```
    <template>
        <div id="app">
            <v-header></v-header>
            <router-view></router-view>
        </div>
    </template>

    <script>
    import Header from './components/header/Header.vue'
    export default {
    name: 'App',
    components: {
        'v-header': Header
    }
    }
    </script>
    ```

### 2、修改文件--router/inedx.js
* 删除路由配置

```
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
   
  ]
})
```
### 3、添加文件--components/header/Header.vue
```
<template>
    <div>
        欢迎来到我的世界
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="less" scoped>

</style>
```
### 4、删除--components/HelloWorld.vue
### 5、启动项目预览
![](https://upload-images.jianshu.io/upload_images/13505073-aa6c0baf7863a0ed.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 五、完善vuex结构
### 1、新建文件vuex--src/store/index.js
```
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import seller from './modules/seller'

Vue.use(Vuex);

export default new Vuex.Store({
    getters,
    actions,
    modules: {
        seller
    }
})
```
### 2、引入vuex--src/main.js
```
import Vue from 'vue'
import App from './App'
import router from './router'

import store from './store/index.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
```
### 3、新建文件--src/store/getter.js
```
const getters={
}
export default getters;
```
### 4、新建文件--scr/store/types.js
```
const GET_SELLER = "GET_SELLER"
export default {
  GET_SELLER,
}
```
### 5、新建文件--src/store/meodules/seller.js
```
import types from "../types"
import axios from "axios"

const state = {  //数据源
    seller: {}
}

const getters= {  //获取数据
    seller(state) {
        return state.seller
    }
}

const actions = {  //执行发生的动作，提交一个变化
    getSeller({commit,state}) {
        axios.get('https://easy-mock.com/mock/5c74af248a68351906bd9aaf/example/seller').then(resp => {
            // console.log(resp)
            if(resp.data.success==200) {  
                commit(types.GET_SELLER,resp.data.seller)
            }
        })
    }
}

const mutations= {  //更新数据源
    [types.GET_SELLER](state,data) {
        state.seller = data
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
```
### 6、修改文件--src/components/header/Header.Vue
```
<template>
    <div class="header">
        <img :src="seller.avatar" alt="altText"/>
        <br>
        {{seller.name}}
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
    export default {
        created () {
            this.$store.dispatch('getSeller');  //执行变化，发送actions
        },
        computed: {
            //对象展开运算符，获取seller数据
            ...mapGetters(['seller'])
        }
    }
</script>

<style lang="less" scoped>
.header {
    img {
        width: 64px;
        height: 64px;
    }
}
</style>
```
### 7、运行效果
![](https://upload-images.jianshu.io/upload_images/13505073-9e6894da99ea7210.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)