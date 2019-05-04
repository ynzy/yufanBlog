---
title: 硅谷外卖day05
date: 2019-04-8 22:40:59
author: 张勇
categories: vue项目
tags: [vue]
---
[项目地址](https://github.com/ynzy/vue-project/tree/master/gshop)
## 一、ShopRatings组件
#### 1、计算满意度
* 计算全部，满意，不满意评价数量

```html
<!-- rating.length为评价总数，设计计算属性positiveSize计算满意的评价,总数-满意=不满意 -->
<div class="rating-type border-1px">
  <span class="block positive " :class="{active:selectType==2 }">
    全部
    <span class="count">{{ratings.length}}</span>
  </span>
  <span class="block positive" :class="{active:selectType==0 }">
    满意
    <span class="count">{{positiveSize}}</span>
  </span>
  <span class="block negative" :class="{active:selectType==1 }">
    不满意
    <span class="count">{{ratings.length - positiveSize}}</span>
  </span>
</div>
<script>
//getters
  //计算满意度，看rateType的值是否为1，是则加一，0则不加
positiveSize(state) {
  return state.ratings.reduce((preTotal, rating) => preTotal + (rating.rateType===0?1:0) ,0)
}
  //js
data() {
  return {
    selectType: 2 // 选择的评价类型: 0满意, 1不满意, 2全部
  }
},
computed: {
  ...mapGetters(['positiveSize']),
}

</script>
```

#### 2、列表的过滤显示
* 查看全部/满意/不满意的评价 && 是否只有内容的评价
* 通过点击按钮改变当前显示状态，设计过滤新数组，判断符合条件的评价显示在页面上

```html
 <div class="ratingselect">
  <div class="rating-type border-1px">
    <!-- 点击改变评价类型值 -->
    <span class="block positive " :class="{active:selectType==2 }"  @click="setSelectType(2)">
      全部
      <span class="count">{{ratings.length}}</span>
    </span>
    <span class="block positive" :class="{active:selectType==0 }"  @click="setSelectType(0)">
      满意
      <span class="count">{{positiveSize}}</span>
    </span>
    <span class="block negative" :class="{active:selectType==1 }" @click="setSelectType(1)">
      不满意
      <span class="count">{{ratings.length - positiveSize}}</span>
    </span>
  </div>
  <!-- 点击改变是否显示有文本的状态 -->
  <div class="switch" :class="{on: onlyShowText}" @click="toggleOnlyShowText">
    <span class="iconfont icon-check"></span>
    <span class="text">只看有内容的评价</span>
  </div>
</div>
<script>
  data() {
    return {
      onlyShowText: true, // 是否只显示有文本的
      selectType: 2 // 选择的评价类型: 0满意, 1不满意, 2全部
    };
  },
  computed: {
    ...mapState(["info", "ratings"]),
    fillterRatings() {
      //1.影响的数据有哪些
      const { ratings, onlyShowText, selectType } = this;
      //产生一个过滤新数组
      return ratings.filter(rating => {
        const {rateType, text} = rating
        /*
         条件1：
          评价类型和评价满意度参数，如果selectType=2，则显示全部，如果selectType和rateType相等，显示当前满意度的评价（满意或者不满意）
          selectType：0/1/2
          rateType： 0/1
          selectType===2 || selectType===rateType
         条件2：
          如果不显示文本，则不用判断text有没有值，选择不显示。如果onlyShowText为true，要看text的值是否大于零进行显示
          onlyShowText： true/false
          text: 有值、没有值
          !onlyShowText取反，为true时不需要判断text有没有值
          !onlyShowText || text.length>0
         */
        return (selectType===2 || selectType===rateType) && (!onlyShowText || text.length>0)
      })
    }
  },
  methods: {
    setSelectType(selectType) {
      this.selectType = selectType;
    },
    toggleOnlyShowText () {
      this.onlyShowText = !this.onlyShowText
    }
  },
</script>
```

## 二、ShopInfo组件
* 实现上下左右滑动，动态计算ul总宽度
* 总宽度=(li宽度+边距宽度)*图片数量-最后一个边距宽度
* 通过watch监视数据更新，数据刷新之后创建滑动对象，

```html
<section class="section">
  <h3 class="section-title">活动与服务</h3>
  <div class="activity">
    <!-- 设计数组，动态计算颜色类 -->
    <div
      class="activity-item"
      :class="supportClasses[support.type]"
      v-for="(support, index) in info.supports"
      :key="index"
    >
      <span class="content-tag">
        <span class="mini-tag">{{support.name}}</span>
      </span>
      <span class="activity-content">{{support.content}}</span>
    </div>
  </div>
</section>
<section class="section">
  <h3 class="section-title">商家实景</h3>
  <div class="pic-wrapper">
    <ul class="pic-list" ref="picUl">
      <li class="pic-item" v-for="(pic, index) in info.pics" :key="index">
        <img width="120" height="90" :src="pic">
      </li>
    </ul>
  </div>
</section>
<script>
data() {
  return {
    supportClasses: ["activity-green", "activity-red", "activity-orange"]
  };
},
methods: {
  _initScroll() {
    //默认上下滑动
    new BSscroll(".shop-info");
    //计算ul宽度，执行水平滑动
    const ul = this.$refs.picUl;
    const liWidth = 120; //li宽度
    const space = 6; //右边距宽度
    const count = this.info.pics.length; //图片数量
    ul.style.width = (liWidth + space) * count - space + "px";
    new BSscroll(".pic-wrapper", {
      scrollX: true // 水平滑动
    });
  }
},
watch: {
  info() {
    // 刷新流程--> 更新数据
    this.$nextTick(() => {
      this._initScroll();
    });
  }
},
mounted() {
  // 如果数据还没有, 直接结束
  if (!this.info.pics) {
    return;
  }
  // 数据有了, 可以创建BScroll对象形成滑动
  this._initScroll();
}
</script>
```

## 三、Search组件
* 根据关键字异步搜索显示匹配的商家列表
* 实现如果没有搜索结果的提示显示，v-if，v-else进行判断
* router-link 通过tag属性改变显示的标签

```html
<template>
  <section class="search">
    <HeaderTop title="搜索"/>
    <form class="search_form" @submit.prevent="search">
      <input
        type="search"
        name="search"
        placeholder="请输入商家或美食名称"
        class="search_input"
        v-model="keyword"
      >
      <input type="submit" name="submit" class="search_submit">
    </form>
    <!-- 定义noSearchShops属性，判断搜索结果是否有数据，有数据则显示，没有数据则显示提示 -->
    <section class="list" v-if="!noSearchShops">
      <ul class="list_container">
        <!--:to="'/shop?id='+item.id"-->
        <!-- tag属性<a>标签将会成为真实的链接 (并且可以获取到正确的跳转)，但是激活的类将会被应用在外部的<li>标签上。
          a标签替换为li标签 -->
        <router-link to="{path:'/shop', query:{id:item.id}}" tag="li"
        v-for="item in searchShops" :key="item.id" class="list_li">
          <section class="item_left">
            <img :src="imgBaseUrl + item.image_path" class="restaurant_img">
          </section>
          <section class="item_right">
            <div class="item_right_text">
              <p>
                <span>{{item.name}}</span>
              </p>
              <p>月售 {{item.month_sales||item.recent_order_num}} 单</p>
              <p>{{item.delivery_fee||item.float_minimum_order_amount}} 元起送 / 距离 {{item.distance}} 公里</p>
            </div>
          </section>
        </router-link>
      </ul>
    </section>
    <div class="search_none" v-else>很抱歉！无搜索结果</div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
export default {
  data() {
    return {
      keyword: '',
      imgBaseUrl: 'http://cangdu.org:8001/img/',
      noSearchShops: false
    };
  },
  computed: {
    ...mapState(['searchShops'])
  },
  watch: {
    searchShops (value) {
      if(!value.length) {  //如果没有数据
        this.noSearchShops = true
      } else {  //如果有数据
        this.noSearchShops = false
      }
    }
  },
  methods: {
    search() {
      //得到搜索关键字,去除字符串的头尾空格
      const keyword = this.keyword.trim()
      //进行搜索
      if (keyword) {
        this.$store.dispatch('searchShops',keyword)
      }
    }
  },
  components: {
    HeaderTop
  }
};
</script>
```

## 四、项目优化
#### 1、缓存路由组件对象
* 通过keep-alive标签，缓存商家信息路由组件中的数据

```html
<template>
  <div>
    <ShopHeader></ShopHeader>
    <div class="tab">
      <div class="tab-item">
        <!-- 是否使用replace模式实现路由跳转 -->
        <router-link to="/shop/goods" replace>点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/ratings" replace>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/info" replace>商家</router-link>
      </div>
    </div>
    <!-- 缓存路由组件对象 -->
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>
```

#### 2、路由组件懒加载
* 使用函数的形式调用组件，实现进入组件时才进行加载，没有进入不加载
* 返回路由组件的函数, 只有执行此函数才会加载路由组件, 这个函数在请求对应的路由路径时才会执行

```js
// import Msite from '@/pages/Msite/Msite'
// import Order from '@/pages/Order/Order'
// import Profile from '@/pages/Profile/Profile'
// import Search from '@/pages/Search/Search'
/**
 * 路由组件懒加载
 * 拆分路由文件，按需加载需要的js
 */
const Msite = () => import('../pages/Msite/Msite.vue')
const Search = () => import('../pages/Search/Search.vue')
const Order = () => import('../pages/Order/Order.vue')
const Profile = () => import('../pages/Profile/Profile.vue')
```

#### 3、图片懒加载
1. 第一种：引入vue-lazyload插件

```js
import loading from './common/imgs/loading.gif'  //引入加载中图片
/**引入图片懒加载 */
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {  //内部自定义一个指令lazy
  loading
})
//使用
<img v-lazy="img">
```

2. 调用vant封装的图片懒加载模块

```js
import loading from './common/imgs/loading.gif'  //引入加载中图片
/**引入vant图片懒加载 */
import { Lazyload } from 'vant';
Vue.use(Lazyload, {
  loading
});

//使用
<img v-lazy="img">
```

#### 4、分析项目打包并优化
* 使用`npm run build --report`生成可视化页面，查看加载包的大小，对其进行优化
* 日期过滤器
  * 使用moment插件格式化日期格式，在build之后发现插件使用少，占用内存多，换用date-fns插件对项目进行优化

![优化前](https://upload-images.jianshu.io/upload_images/13505073-6322ea2083d1b4f2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![优化后](https://upload-images.jianshu.io/upload_images/13505073-a95e9b6fabba232f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```js
import Vue from 'vue'
// import moment from 'moment'
import format from 'date-fns/format'
//自定义过滤器,格式化日期格式
Vue.filter('date-format', function (value, formatStr='YYYY-MM-DD HH:mm:ss') {
    if (!value) return ''
    // return moment(value).format(formatStr)
    return format(value, formatStr)
})

//使用
<div class="time">{{rating.rateTime | date-format}}</div>
```