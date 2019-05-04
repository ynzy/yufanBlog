---
title: 硅谷外卖day03
date: 2019-03-25 22:28:52
categories: vue项目
tags: [vue]
---
[项目地址](https://github.com/ynzy/vue-project/tree/master/gshop)
## 一、完成登录注册功能
1. 2种登录方式
   * 手机号/验证码登录
   * 用户名/密码/图片验证码登录
2. 登录的基本流程
   * 表单前台验证，如果不通过，提示
   * 发送ajax请求，得到返回的结果
3. 根据结果的标识(code)来判断登录请求是否成功
    * 1： 不成功，显示提示
    * 0： 成功，保存用户信息，跳转到个人中心路由
```js
async login() {
 let result
 //前台表单验证
 if (this.loginWay) {
   // 发送ajax请求，短信登录
   result = await reqSmsLogin(phone,code)

 } else {
   // 发送ajax请求，密码登录
   result = await reqPwdLogin({name,pwd,captcha})
 }
 //根据结果数据处理
   if(result.code === 0) {
     const user = result.data
     //将user保存到vuex的state中
     this.$store.dispatch('recordUser',user)
     //去个人中心界面
     this.$router.replace('/profile')
   } else {
     //显示新的图形验证码
     this.getCaptcha()
     //显示警告提示
     const msg = result.msg
     this.showAlert(msg)
   }
}

//action.js
  // TODO: 同步记录用户信息
  recordUser ({commit},userInfo) {
    commit(RECEIVE_USER_INFO,{userInfo})
  }
//mutations.js
  [RECEIVE_USER_INFO](state,{userInfo}) {
      state.userInfo = userInfo
  },
```

4. vue自定义事件
   * 监听事件： @eventName="fn"  function fn (data) {//处理}
   * 分发事件： this.$emit('eventName',data)

```html
<!-- AlertTip提示组件 -->
<template>
  <div class="alert_container">
    <section class="tip_text_container">
      <div class="tip_icon">
        <span></span>
        <span></span>
      </div>
      <p class="tip_text">{{alertText}}</p>
      <div class="confrim" @click="closeTip">确认</div>
    </section>
  </div>
</template>

<script>
  export default {
    props: {
      alertText: String
    },

    methods: {
      closeTip() {
        // 分发自定义事件(事件名: closeTip)
        this.$emit('closeTip')
      }
    }
  }
</script>

<!-- login组件调用AlertTip组件 -->
<AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"/>

<script>
  import AlertTip from "../../components/AlertTip/AlertTip.vue";
  export default {
    methods: {
      //关闭警告框
      closeTip() {
        this.alertShow = false;
        this.alertText = '';
      },
    }
  }
</script>
```

4. 注意
   * 使用network查看请求(路径/参数/请求方式/响应数据)
   * 使用vue的chrome插件查看vuex中的state和组件中的数据
   * 使用debugger语句调试代码
   * 实参类型与形参类型的匹配问题

```js
//定义 
fun({a,b,c})  //{a,b,c}是一个对象
//调用
fun({a,b,c})  //也要传对象
```


## 2、自动登录，退出登录
1. 通过会话获取后台用户信息，后台处理session保持登录状态，刷新页面时登录存在

```js
// 根据会话获取用户信息
export const reqUserInfo = () => ajax(BASE_URL + '/userinfo')
  // 异步获取用户信息
  async getUserInfo({commit}) {
    const result = await reqUserInfo()
    if(result.code === 0) {
      const userInfo = result.data
      commit(RECEIVE_USER_INFO,{userInfo})
    }
  },
```

2. 点击退出登录，返回退出登录状态给后台，删除前台用户信息

```js
logout() {
   Dialog.confirm({
     title: "提示",
     message: "确认退出吗"
   })
   .then(() => {
     //请求退出
     this.$store.dispatch("logout");
     Toast('退出成功');
   })
   .catch(() => {
     console.log("点击了取消");
   });
}
//actions
  // 异步登出
  async logout ({commit}) {
    const result = await reqLogout()
    if(result.code === 0) {
      commit(RESET_USER_INFO)
    }
  }
```

## 3、搭建商家整体界面
1. 学会拆分界面路由，看出页面拆分成几个组件
![页面组件和路由拆分](https://upload-images.jianshu.io/upload_images/13505073-5594f277ebd5c5d7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
2. 路由的定义/配置|使用---父子路由，路由重定向

```js
{
   path: '/shop',
   component: Shop,
   children: [
     {
       path: '/shop/goods',
       component: ShopGoods
     },
     {
       path: '/shop/ratings',
       component: ShopRatings
     },
     {
       path: '/shop/info',
       component: ShopInfo
     },
     {
       path: '',
       redirect: '/shop/goods'
     },
   ]
},
```

## 4、模拟(mock)数据/接口
1. 前后台分离的理解
2. mock.js的理解和使用
3. json数据设计的理解
   * JSON分为json对象和json数组，
   * 结构：名称/数据类型
   * 结构 + value值，值可以变，结构不可以变 

```js
//接口
//获取商家信息
export const reqShopInfo = () => ajax('/info')  //mock模拟数据不需要代理api
//获取商家评价数组
export const reqShopRatings = () => ajax('/ratings')
//获取商家商品数组
export const reqShopGoods = () => ajax('/goods')

/*mockServer.js*/
/*
使用mockjs提供mock数据接口
 */
 import Mock from 'mockjs'
 import data from './data.json'
// 返回goods的接口
Mock.mock('/goods',{code: 0, data: data.goods})
// 返回ratings的接口
Mock.mock('/ratings',{code: 0, data: data.ratings})
// 返回info的接口
Mock.mock('/info',{code: 0, data: data.info})
// export default ???  不需要向外暴露任何数据, 只需要保存能执行即可
```

## 5、ShopHeader组件
1. 异步显示数据效果的编码流程
  * ajax
    * ajax请求函数
    * 接口请求函数
  * vuex
    * state
    * mutation-types
    * actions
    * mutations
  * 组件
    * dispatch(): 异步获取后台数据到vuex的state
    * mapState(): 从vuex的state中读取对应的数据
    * 模板中显示
2. 初始化显示异常
   * 情况1：`Cannot read property 'xxx' of undefined"`
   * 原因： 初始值是空对象, 内部没有数据, 而模块中直接显示3层表达式
   * `a.b.xxx`,undefined表示b未定义
   * 解决： 使用v-if指令
  
  ```html
    <!-- 使用v-if判断info是否加载了数据，控制是否显示，三级表达式会出现报错 -->
    <div class="shop-header-discounts" v-if="info.supports" @click="toggleSupportShow">
      <div class="discounts-left">
        <div class="activity" :class="supportClasses[info.supports[0].type]" >
          <span class="content-tag">
            <span class="mini-tag">{{info.supports[0].name}}</span>
          </span>
          <span class="activity-content ellipsis">{{info.supports[0].content}}</span>
        </div>
      </div>
      <div class="discounts-right">{{info.supports.length}} 个优惠</div>
    </div>
```

   * 情况2: `Cannot read property 'xxx' of null"`
   * 原因： 数据定义时使用了`a=null`
   * 解决： 直接使用`a=[]或a={}`定义空对象空数组
3. vue transition动画
