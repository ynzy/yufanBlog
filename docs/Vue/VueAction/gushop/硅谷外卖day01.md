---
title: 硅谷外卖day01
date: 2019-03-14 22:28:32
author: 张勇
categories: vue项目
tags: [vue]
---
#硅谷外卖项目介绍

前后端分离的SPA应用，前台采用vue全家桶制作webapp，后台使用nodejs,mongoDB开发，后台是直接拿过来用的，我是做前端的，所以只学习前端这一块

[项目地址](https://github.com/ynzy/vue-project/tree/master/gshop)
### 前台技术选型

```
vue,vue-router,axios
vant,swiper,mint-ui
stylus
```
# day01
## 1、搭建项目结构
1. 静态资源导入
  1. --static--css--reset.css，在index.html页面引入即可
  2. 引入阿里图标库，在阿里图标库设计好自己需要用到的图标，生成在线代码直接在index.html引入
  3. 解决点击响应延时 0.3s 问题
   
```
  <link rel="stylesheet" href="/static//css/reset.css">
  <!-- 引入阿里图标库 -->
  <link rel="stylesheet" href="http://at.alicdn.com/t/font_1077199_3kjjxyuafdw.css">
  <!-- TODO: 解决点击响应延时 0.3s 问题 -->
  <script src="https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js"></script>
  <script>
    if ('addEventListener' in document) {
      document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
      }, false);
    }
    if(!window.Promise) {
      document.writeln('<script src="https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js"'+'>'+'<'+'/'+'script>');
    }
  </script>
```

## 2、vue-router的理解和使用
  * router-view/router-link/keep-alive
  * $router: 路由对象，包含一些操作路由的功能函数，来实现编程式导航(路由跳转)
  * $route： 当前路由对象，一些当前路由信息数据容器，path/meta/query/params
1. 路由拆分
  * 拆分路由，当拿到ui图或者静态页面时，要对路由进行布局拆分，知晓，每个页面跳转到哪里，会显示什么
  * 底部导航组件：FooterGuide
  * 此导航路由组件： Msite/Search/Order/Profile
* 路由结构：

```js
 routes: [
    {
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/msite',
      name: 'msite',
      component: Msite,
      meta: {  //配置元数据确定是否显示footer
        showFooter: true
      }
    },
    {
      path: '/order',
      name: 'order',
      component: Order,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
  ]
```  

```js
<template>
  <div>
    <van-tabbar v-model="active" active-color="#07c160">
      <van-tabbar-item to="/msite" icon="shop">外卖</van-tabbar-item>
      <van-tabbar-item to="/search" icon="search">搜索</van-tabbar-item>
      <van-tabbar-item to="/order" icon="column">订单</van-tabbar-item>
      <van-tabbar-item to="/profile" icon="manager">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  components: {},

  computed: {},

  methods: {},
  mounted() {
    //TODO: 监听路由路径，修改相对应的底部的菜单项
    let path = this.$route.path;
    if (path == "/msite") {
        this.active = 0;
      } else if (path == "/search") {
        this.active = 1;
      } else if (path == "/order") {
        this.active = 2;
      } else if (path == "/profile") {
        this.active = 3;
      }
  }
};
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
@import '../../common/stylus/mixins.styl';
</style>
```

* 使用vant的Tabbar组件实现底部导航，由于点击跳转页面，再次刷新页面时，路由页面与底部导航激活的部分不匹配，所以在每次加载页面时，监听当前路由，使底部激活部分与之匹配

2. 抽取组件
有些组件在很多页面都是一样的，只是显示的数据不一样，所有将其抽取出来放在--components公共组件中，通过solt插槽来实现组件通信标签结构，props获取父组件数据，实现多页面公用一个组件
* 头部组件: HeaderTop, 通过slot来实现组件通信标签结构
* 商家列表组件: ShopList
* 示例

```js
//HeaderTop公共组件
<template>
  <header class="header">
    <!-- 使用插槽获取内容 -->
    <slot name="left"></slot> 
    <span class="header_title">
      <span class="header_title_text ellipsis">{{title}}</span>
    </span>
    <slot name="right"></slot>
  </header>
</template>

<script>
export default {
  props: {
    title: String  //从父组件获取标题信息
  }

}
</script>
//Msite父组件
<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop title="昌平区北七家宏福科技园(337省道北)">
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right">
        <span class="header_login_text">登录|注册</span>
      </span>
    </HeaderTop>
      </section>
</template>
<script>
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
export default {
  data() {
    return {};
  },
 components: {
    HeaderTop,
    ShopList
  }
};
</script>
```

3. 登录路由组件
只有路由导航的四个页面需要显示底部菜单，登录组件是不需要显示底部导航的，所以，通过路由的meta属性，配置点击的路由组件显示为true
* 在app页面进行设置

```js
<template>
  <div id="app">
    <router-view/>
    <!-- TODO: 底部菜单组件是否要显示 -->
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>
```
## 3、 后台项目
    启动后台项目: 理解前后台分离
    测试后台接口: 使用postman
    修正接口文档

## 4、前后台交互
* ajax请求：axios
* ajax请求封装： axios + promise

```js
/**
 * ajax请求函数模块
 * 返回值： promise对象(异步返回的数据是: response.data)
 */
import axios from 'axios'
/**
 * @export
 * @param {*} url   //请求地址
 * @param {*} [data={}]  //请求数据对象
 * @param {string} [type='GET']  //请求方法
 */
export default function ajax(url, data = {}, type = 'GET') {
  return new Promise(function (resolve, reject) {
    // 执行异步ajax请求
    let promise
    if (type === 'GET') {
      // 准备url query参数数据
      let dataStr = '' //数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送get请求
      promise = axios.get(url)
    } else {
      // 发送post请求
      promise = axios.post(url, data)
    }
    promise.then(function (response) {
      // 成功了调用resolve()
      resolve(response.data)
    }).catch(function (error) {
      //失败了调用reject()
      reject(error)
    })
  })
}

```

* 接口请求函数封装: 每个后台接口

```js
/**
 * 包含n个接口请求函数的模块
 * 函数的返回值: promise对象
 */
import ajax from './ajax'
const BASE_URL = 'http://localhost:4000'
// const BASE_URL = '/api'

// 1、根据经纬度获取位置详情
export const reqAddress = function (geohash) {
    ajax(`${BASE_URL}/position/${geohash}`)
} 
// 2、获取食品分类列表
export const reqFoodCategorys = () => ajax(BASE_URL+'/index_category')
// 3、根据经纬度获取商铺列表
export const reqShops = (latitude,longitude) => ajax(BASE_URL+'/shops', {longitude, latitude})
// 4、根据经纬度和关键字搜索商铺列表
export const reqSearchShop = (geohash,keyword) => ajax(BASE_URL+'/shops', {geohash, keyword})
// 5、获取一次性验证码
export const reqCaptcha = () => ajax(BASE_URL+'/captcha')
// 6、用户名密码登陆
export const reqPwdLogin = ({name,pwd,captcha}) => ajax(BASE_URL+'/login_pwd',{name,pwd,captcha},'POST')
// 7、发送短信验证码
export const reqSendCode = (phone) => ajax(BASE_URL + '/sendcode', {phone})
// 8、手机号验证码登陆
export const reqSmsLogin = (phone,code) => ajax(BASE_URL + '/login_sms', {phone,code},'POST')
// 9、根据会话获取用户信息
export const reqUserInfo = () => ajax(BASE_URL + '/userinfo')
// 10、用户登出
export const reqLogout = () => ajax(BASE_URL + '/logout')
/**
 * 获取商家信息
 */
export const reqShopInfo = () => ajax('/info')
/**
 * 获取商家评价数组
 */
export const reqShopRatings = () => ajax('/ratings')
/**
 * 获取商家商品数组
 */
export const reqShopGoods = () => ajax('/goods')
```

* 调用

```js
mounted () {
   const result =  reqFoodCategorys()
  //  console.log(result)
  result.then(function(res) {
    console.log(res)
  })
  }
```