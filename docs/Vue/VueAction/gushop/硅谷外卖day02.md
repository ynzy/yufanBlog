---
title: 硅谷外卖day02
date: 2019-03-17 22:28:42
author: 张勇
categories: vue项目
tags: [vue]
---
[项目地址](https://github.com/ynzy/vue-project/tree/master/gshop)
## 一、异步数据
#### 1、封装ajax：（第一天已写，这个很重要）
  * 要学会promise+axios封装ajax请求的函数
  * 要能封装每个接口对应的请求函数(根据接口定义ajax请求函数)
  * 解决ajax的跨域问题：配置代理，对代理的理解。
  * 配置--config--index.js

```js
proxyTable: {
  '/api': { // 匹配所有以 '/api'开头的请求路径
    target: 'http://localhost:3000', // 代理目标的基础路径
    changeOrigin: true, // 支持跨域
    pathRewrite: {// 重写路径: 去掉路径中开头的'/api'
      '^/api': ''
    }
  }
}
```

#### 2、vuex编码:
  1. 创建所有相关的模块: store/index|state|mutations|actions|getters|mutations-types
  2. 设计state：也就是从后台获取的数据存储在state中
      * 出现问题：对于暴露导入的理解

```js
const state = {}
export default state
import state from './xxx.js'
//暴露时没有加{},在import时也不需要加{}
const state = {}
export default {state}
//export default {} 导出的是对象，那么引入的时候就要 import {state} from './xxx.js'
```

  3. 实现actions，此文件是用来异步获取数据的
      * 定义异步action： async/await
      * 流程： 发送ajax获取数据，commit提交给mutation
  4. 实现mutation：给状态赋值，也就是更新state数据
  5. 实现index:创建store对象(固定的模式)
  6. main.js: 配置store
#### 3、组件异步显示数据
1. 异步获取数据
    * 在mounted()通过$store.dispatch('actionName')来异步获取后台数据到state中
    * mapActions(['getAddress'])以数组形式映射模块中的方法，在mounted中调用也可以异步获取后台数据

```js
import { mapActions } from "vuex";
methods: {
 //TODO: 方法2.以数组形式映射模块中的方法
 ...mapActions(['getAddress'])
},
mounted () {
 //TODO: 方法1.含有异步操作，例如向后台提交数据
 // this.$store.dispatch('getAddress')
 this.getAddress();
}
```

2. 读取数据
    * mapState(['...'])读取state中数据到组件中
3. 显示数据
    * 在模板中显示xxx数据
#### 4、模板中显示数据的来源
1. data：自身的数据(内部改变)
2. props:外部传入的数据(外部改变)
3. computed： 根据data/props/别的compute/state/getters(计算的数据)
#### 5、异步显示轮播图
1. 通过vuex获取foodCategorys数据(发请求，读取)
2. 对获取的数据进行整合计算(一维变特定的二维数据)

```js
  computed: {
    ...mapState(["categorys"]),
    /*
      根据categorys一维数组生成一个2维数组
      小数组中的元素个数最大是8
       */
    categorysArr() {
      //解构赋值
      const { categorys } = this;
      // 准备空的2维数组
      const arr = [];
      // 准备一个小数组(最大长度为8)
      let minArr = [];
      categorys.forEach(c => {
        // 如果当前小数组已经满了, 创建一个新的
        if (minArr.length === 8) {
          minArr = [];
        }
        // 如果minArr是空的, 将小数组保存到大数组中
        if (minArr.length === 0) {
          arr.push(minArr);
        }
        // 将当前分类保存到小数组中
        minArr.push(c);
      });
      return arr;
    }
  },
```

3. 通过双循环对二维数组进行遍历显示,如果没有数据时，显示预加载图片

```html
<nav class="msite_nav">
 <!-- 判断是否有数据 -->
 <div class="swiper-container" v-if="categorys.length">
   <div class="swiper-wrapper">
     <!-- 第一层遍历二维数组 -->
     <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">
       <!-- 第二层遍历，对二维数组中的一维数组遍历 -->
       <a href="javascript:" class="link_to_food" v-for="(category, index) in categorys" :key="index">
         <div class="food_container">
           <img :src="baseImageUrl+category.image_url">
         </div>
         <span>{{category.title}}</span>
       </a>
     </div>

   </div>
   <!-- Add Pagination -->
   <div class="swiper-pagination"></div>
 </div>
 <!-- 没有数据时显示预加载svg -->
 <img src="./images/msite_back.svg" alt="back" v-else >
</nav>
```

4. 使用Swiper显示轮播图，如何在界面更新之后创建Swiper对象？
    * 使用watch+$nextTick(),监视显示的数据，如果数据有值立即更新

```js
  watch: {
    categorys(value) {
      // categorys数组中有数据了, 在异步更新界面之前执行
      // 使用setTimeout可以实现效果, 但不是太好
      /*setTimeout(() => {
       //创建一个Swiper实例对象，实现轮播
        new Swiper(".swiper-container", {
          loop: true, // 循环模式选项,可以循环轮播
          // 如果需要分页器
          pagination: {
            el: ".swiper-pagination"
          }
        });
      }, 100);*/
       // 界面更新就立即创建Swiper对象
        this.$nextTick(() => {// TODO: 一旦完成界面更新, 立即调用(此条语句要写在数据更新之后)
          // 创建一个Swiper实例对象, 来实现轮播
          new Swiper('.swiper-container', {
            loop: true, // 可以循环轮播
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
          }) 
        })
    }
  }
```

## 二、登录/注册：界面相关效果
1. 切换登录方式
* 初始化一个boolean值(longinWay)，true为短信登录，false为密码登录
* 使用@click方法设置boolean值
* 定义一个class类绑定此布尔值控制表单显示选择
`loginWay: true  //true代表短信登陆, false代表密码`
![登录方式切换.png](https://upload-images.jianshu.io/upload_images/13505073-07a17e145f6da30b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![登录方式切换.gif](https://upload-images.jianshu.io/upload_images/13505073-78b784c1c53b2722.gif?imageMogr2/auto-orient/strip)
2. 手机号合法检查，发送验证码倒计时
* 通过计算属性验证输入的手机号是否正确，正确时可以点击发送获取验证码,`right_phone`类改变字的颜色

```html
 <section class="login_message">
  <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
  <!-- 计算属性验证输入的手机号是否正确，正确则能点击获取验证码，添加显示状态。 -->
  <!-- 表单里面的button默认行为是提交表单，要取消默认行为 -->
  <!-- 三目运算，模板字符串，如果时间大于0则显示当前秒数 -->
  <button
    :disabled="!rightPhone"
    class="get_verification"
    :class="{right_phone: rightPhone}"
    @click.prevent="getCode"
  >{{computeTime>0? `已发送(${computeTime}s)` :'获取验证码'}}</button>
</section>
```
```js
data() {
  return {
    phone: "", // 手机号
    computeTime: 0, //计时时间
  }
},
computed: {
    rightPhone() {
      //使用计算属性测试输入的手机号是否正确，正确则显示类名
      return /^1\d{10}$/.test(this.phone);
    }
  },
methods: {
  //异步获取验证码
  getCode() {
    //如果当时没有计时
    if (!this.computeTime) {
      //启动倒计时
      this.computeTime = 30;
      //TODO: 间歇调用
      const intervalId = setInterval(() => {
        this.computeTime--;
        if (this.computeTime <= 0) {
          clearInterval(intervalId);
        }
      }, 1000);
    }
  }
}
```
![手机号码检车，发送验证码倒计时.gif](https://upload-images.jianshu.io/upload_images/13505073-01bd15d53c5cefce.gif?imageMogr2/auto-orient/strip)
3. 切换显示或隐藏密码
* 通过两个输入框，一个按钮，改变密码的显示与隐藏状态

`showPwd: false, //是否显示密码`
```html
<section class="login_verification">
  <!-- 切换密码显示隐藏状态，改变按钮选择状态，默认为隐藏 -->
  <input type="text" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd">
  <input type="password" maxlength="8" placeholder="密码" v-if="!showPwd" v-model="pwd">
  <!-- 点击改变类的状态和圆圈的移动 -->
  <div class="switch_button" :class="showPwd?'on': 'off'" @click="showPwd = !showPwd">
    <div class="switch_circle" :class="{right:showPwd}"></div>
    <span class="switch_text">{{showPwd?'abc':'...'}}</span>
  </div>
</section>
```
![密码显示和隐藏.gif](https://upload-images.jianshu.io/upload_images/13505073-0c36bbad3e5565b9.gif?imageMogr2/auto-orient/strip)
4. 前台验证提示
* 学会如何使用模板组件
* 调用--components-AlertTip-AlertTip.vue组件，使用提示框组件

```html
<!-- 提示模板组件 -->
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
      alertText: String  //传入的参数
    },

    methods: {
      closeTip() {
        // 分发自定义事件(事件名: closeTip)
        this.$emit('closeTip')
      }
    }
  }
</script>
```
```html
<form @submit.prevent="login">
</form>
<!-- 调用组件，@closeTip自定义事件 -->
<AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"/>
```
```js
import AlertTip from "../../components/AlertTip/AlertTip.vue";
data() {
  return {
      alertText: "", //提示文本
      alertShow: false //是否显示警告框
  }
}
methods: {
  //展示提示框
  showAlert(alertText) {
    this.alertShow = true;
    this.alertText = alertText;
  },
 //关闭警告框
  closeTip() {
    this.alertShow = false;
    this.alertText = '';
  },
  //异步登录
  login() {
    //前台表单验证
    if (this.loginWay) {
      //短信登录
      const { phone, code } = this;
      if (!this.rightPhone) {
        //手机号不正确
        this.showAlert("手机号不正确");
      } else if (!/^\d{6}$/.test(code)) {
        alert(this.code)
        //验证码必须是6位数字
        this.showAlert("验证码必须是6位数字");
      }
    } else {
      //密码登录
      const { name, pwd, captcha } = this;
      if (!this.name) {
        //用户名必须指定
        this.showAlert("用户名必须指定");
      } else if (!this.pwd) {
        //密码必须指定
        this.showAlert("密码必须指定");
      } else if (!this.captcha) {
        //图形验证码必须指定
        this.showAlert("图形验证码必须指定");
      }
    }
  }  
}
```

## 三、前后台交互相关问题
1. 如何查看你的应用是否发送某个ajax请求？
    * 浏览器的network
![查看network](https://upload-images.jianshu.io/upload_images/13505073-f8431b542cc6969e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
2. 发ajax请求404怎么办
    * 查看请求路径的对错
    * 单利是否生效(配置和重启)
    * 服务器应用是否运行
3. 后台返回了数据，但页面没有显示？
    * vuex中是否有数据
    * 组件是否读取了数据
