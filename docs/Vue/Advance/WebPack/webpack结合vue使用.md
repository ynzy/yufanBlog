# webpack结合vue使用

## 在webpack中配置.vue组件页面的解析
1. 运行`yarn add vue -S`将vue安装为运行依赖;
2. 运行`yarn add vue-loader vue-template-compiler -D`将解析转换vue的包安装为开发依赖;
3. 运行`yarn add style-loader css-loader -D`将解析转换CSS的包安装为开发依赖，因为.vue文件中会写CSS样式；
4. 在`webpack.config.js`中，添加如下`module`规则：
```js
module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.vue$/, use: 'vue-loader' }
    ]
  }
```
5. 创建`App.js`组件页面
```html
 <template>
   <!-- 注意：在 .vue 的组件中，template 中必须有且只有唯一的根元素进行包裹，一般都用 div 当作唯一的根元素 -->
   <div>
     <h1>这是APP组件 - {{msg}}</h1>
     <h3>我是h3</h3>
   </div>
 </template>
 <script>
 // 注意：在 .vue 的组件中，通过 script 标签来定义组件的行为，需要使用 ES6 中提供的 export default 方式，导出一个vue实例对象
 export default {
   data() {
     return {
       msg: 'OK'
     }
   }
 }
 </script>
 <style scoped>
 h1 {
   color: red;
 }
 </style>
```
6. 创建`main.js`入口文件
```js
 // 导入 Vue 组件
 import Vue from 'vue'
 // 导入 App组件
 import App from './components/App.vue'
 // 创建一个 Vue 实例，使用 render 函数，渲染指定的组件
 var vm = new Vue({
   el: '#app',
   render: c => c(App)
 });
```
7. 在`index.html`页面中添加vue控制区域
```html
  <div id="app"></div>
```
## 在使用webpack构建的Vue项目中使用模板对象
1. 在`webpack.config.js`中添加`resolve`属性：
```js
resolve: {
 extensions: ['.js', '.vue', '.json'],//在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试访问文件是否存在.
 alias: { //配置项通过别名来把原导入路径映射成一个新的导入路径
   'vue$': 'vue/dist/vue.esm.js'
 }
}
```
2. 在`webpack.config.js`中`plugins`配置vue插件：
```js
const VueLoaderPlugin = require('vue-loader/lib/plugin');

plugins: [
  ...
  new VueLoaderPlugin(), //配置vueloader插件
]
```
## 在vue组件页面中，集成vue-router路由模块
1. 运行`yarn add vue-router -S`将vue安装为运行依赖;
2. 导入路由模块：
```js
import VueRouter from 'vue-router'
```
3. 安装路由模块：
```js
Vue.use(VueRouter);
```
4. 创建使用路由对象:
```js
import Vue from 'vue'
import VueRouter from 'vue-router'

import login from './component/login.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {path: '/', redirect: '/login'},
    {path: '/login', component: login},
  ]
})

export default router
```
5. 将路由对象，挂载到 Vue 实例上:
```js
import router from './router.js'

var vm = new Vue({
  el: '#app',
  router,
  render: c => c(App)
})
```
7. 在app.vue组件中添加`router-view`
```html
<template>
  <div>
    <router-view></router-view>
  </div>
</template>
```