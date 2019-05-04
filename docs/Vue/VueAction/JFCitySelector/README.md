---
title: 仿美团项目笔记
date: 2019-03-11 21:47:42
author: 张勇
categories: vue项目
tags: [vue]
---

 在学习仿美团项目时，对于vue结构、组件拆分布局，路由结构划分、提取公共的url接口上又有了新的收获，进行一些总结

## 一、技术选型

```
"axios": "^0.18.0",
"muse-ui": "^3.0.2",   //按需引用
"node-sass": "^4.11.0",
"vant": "^1.6.7",    //全局使用
"vue": "^2.5.2",
"vue-router": "^3.0.1",
"vuex": "^3.1.0",
"less": "^3.9.0",
"less-loader": "^4.1.0",
```

  [项目地址](https://github.com/ynzy/vue-project/tree/master/imitate-meituan)

## 二、src的项目结构

```
|--src
|  |-- api //存放公共的url和封装axios获取数据方法
|  |-- components  //存放公共的组件
|  |-- pages  //存放单个组件的页面
|  |-- Museui.js  //按需引入museui的组件
|  |-- store.js   //进行数据管理
```

## 三、vant和muse-ui的引入

#### main.js
##### 1、全局引入vant

```
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
```

##### 2、按需引入muse-ui

```

import Vue from 'vue';
import 'muse-ui/lib/styles/base.less';
import {
  AppBar,
  Avatar,
  Badge,
  BottomNav,
  Button,
  TextField,
  theme
} from 'muse-ui';
import 'muse-ui/lib/styles/theme.less';

Vue.use(Icon);
Vue.use(Button);
Vue.use(AppBar);
Vue.use(BottomNav);
Vue.use(Paper);
Vue.use(TextField);
Vue.use(Badge);
Vue.use(Avatar);
Vue.use(theme);
//自定义主题
theme.add('teal', {
  primary: '#009688',
  secondary: '#ff4081',
  success: '#4caf50',
  warning: '#ffeb3b',
}, 'light');

theme.use('teal');
```

## 四、tabbar组件实现及路由跳转实现
1. 底部导航菜单栏使用muse-ui的tabbar组件，菜单页面路由通过Main.vue在底部菜单之上实现。

```
<template>
  <div>
    <router-view/>
    <mu-paper class="g-footer">
      <mu-bottom-nav :value="bottomNav">
        <mu-bottom-nav-item to="/home" value="/home" title="首页" icon="home"></mu-bottom-nav-item>
        <mu-bottom-nav-item to="/recent" value="/recent" title="附近" icon="pin_drop"></mu-bottom-nav-item>
        <mu-bottom-nav-item to="/guang" value="/guang" title="逛一逛" icon="language"></mu-bottom-nav-item>
        <mu-bottom-nav-item to="/order" value="/order" title="订单" icon="assignment"></mu-bottom-nav-item>
        <mu-bottom-nav-item to="/me" value="/me" title="我的" icon="account_circle"></mu-bottom-nav-item>
      </mu-bottom-nav>
    </mu-paper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bottomNav: "/home"
    };
  },
  methods: {},
  mounted() {
    //当每次重新挂载(重新刷新)时，重新匹配路由，使导航和路由路径相匹配
    // console.log(this.$route.path);
    let path = this.$route.path;
    if(path=="/")path="/home";
    this.bottomNav = path;
  }
};
</script>
<style lang="less" >
//TODO:由于museui字体图标无法显示，直接引入cdn库
@import "http://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.css";

.g-footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}
.mu-bottom-item {
  min-width: 0.62rem;
}
</style>
```

2. 页面路由结构

```
routes: [
    {
      path: '/',
      component: Main,
      children: [  //TODO: 设置子路由
        {
          path: '',  //设置空路由，父级匹配一个子路由
          name: 'main',
          component: Home
        },
        {
          path: '/home',
          name: 'home',
          component: Home
        },
        {
          path: '/recent',
          name: 'recent',
          component: Recent
        },
        {
          path: '/guang',
          name: 'guang',
          component: Guang
        },
        {
          path: '/order',
          name: 'order',
          component: Order
        },
        {
          path: '/me',
          name: 'me',
          component: Me
        }
      ]
    },
    {
      path: '/meishi',  //单页面路由，不匹配在tabbar上
      name: 'meishi',
      component: MeShi
    }
  ]
```

  * 由于页面刷新时，底部菜单索引自动匹配第一个路由页面，导致页面与底部菜单活跃状态不符，所以页面重新挂载时，获取此时路由的值，重新给底部菜单活跃项赋值。

## 五、页面拆分成组件

* 所有的页面中一部分都拆分成单个组件去进行渲染
* 示例：


## 六、api接口的封装

1. --api--config.js,存放公共的url地址

```
var url = " https://www.easy-mock.com/mock/5c7d08e7b7a08d1246bef9ff/api/"
export {url};
```

2. ---api--shop.js,存放获取商品列表的axios方法

```
import axios from 'axios'
import { url } from './config'
let getShopList = (page) => {
  return axios({
    method: "post",
    url: url + "shopList",
    data: {
      page: page,
      pageSize: 10
    }
  })
}
export {
  getShopList
}
```

3. api接口的使用--pages--home-HomeShop.vue
   
```
<template>
  <div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-card v-for="(item,index) in list" :key="index">
        <div slot="title">
          <strong>{{item.desc}}</strong>
          <div class="distance">< 500m</div>
        </div>
        <div slot="desc">{{item.pos}}{{item.id}}</div>
        <div slot="price">
          <span>￥{{item.price}}</span>
          <van-tag size="medium" type="danger">劲爆</van-tag>
          <div class="workoff">已售{{item.sales}}</div>
        </div>
        <div slot="thumb">
          <img :src="'/static/shoplog/'+ item.imgurl" alt>
        </div>
      </van-card>
    </van-list>
  </div>
</template>
<script>
import { getShopList } from "@/api/shop";  //引入获取商品列表分页数据的方法
export default {
  data() {
    return {
       list: [],
      loading: false,
      finished: false
       page: 0
    };
  },
  mounted() {},
  methods: {
    onLoad() {
      this.page++

      // 数据全部加载完成
      setTimeout(() => {
        getShopList(this.page)
          .then(res => {
            if (res.data.success) {
              //遍历获取的数据添加到商品列表数组中进行渲染
               res.data.shop.forEach(item => {
                 this.list.push(item);
               });
              
              // 加载状态结束
              this.loading = false;
            }
          })
          .catch(function(err) {
            alert("接口错误：" + err);
          });
      }, 2000);
      //如果获取数据长度超过了70,则不再获取数据
      if (this.list.length >= 70) {
        this.finished = true;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.van-list {
  //深度作用选择器: 如果你希望 scoped 样式中的一个选择器能够作用得“更深”，例如影响子组件，你可以使用 >>> 操作符,使用预编译器则使用 "/deep/ "
  /deep/ .van-card {   
    background: #fff;
  }
}
.van-card__price {
  margin-top: 5px;
  width: 100%;
}
.van-card__content {
  strong {
    font-size: 14px;
  }
}
.distance {
  float: right;
  width: 0.6rem;
  text-align: right;
  font-weight: 500;
  color: #000;
}
.workoff {
  float: right;
  width: 0.6rem;
  text-align: right;
  font-weight: 500;
  color: #000;
}
</style>
```

## 七、使用vuex管理数据

* 创建store.js对商品列表的分页数据进行管理

```
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

var state = {
  shop: {
    num: 1,
    list: [],
    page: 0
  }
}

const mutations = {
  setshoplist(state, data) {  //设置商品列表数据
    state.shop.list = state.shop.list.concat(data)  //拼接数组
  },
  nextpage(state){  //下一页
    state.shop.page++;
  }
}

export default new Vuex.Store({
  state,
  mutations
})
```

* 在HomeShop.vue页面使用vuex接收数据

```
<script> 
import { mapState } from "vuex";  //引入vuex数据mapState辅助函数
import { getShopList } from "@/api/shop";  //引入获取商品列表分页数据的方法

export default {
  data() {
    return {
      // list: [],
      loading: false,
      finished: false
      // page: 0
    };
  },
  computed: {
    ...mapState({
      list: state => state.shop.list,  //获取vuex中的list数据
      page: state => state.shop.page   //获取vuex中的分页数据
    })
  },
  mounted() {},
  methods: {
    onLoad() {
      //每次加载刷新，页数加1
      this.$store.commit("nextpage");  //提交页数突变的方法

      // 数据全部加载完成
      setTimeout(() => {
        getShopList(this.page)
          .then(res => {
            if (res.data.success) {
              this.$store.commit("setshoplist", res.data.shop);  //提交商品数据突变方法
              // 加载状态结束
              this.loading = false;
            }
          })
          .catch(function(err) {
            alert("接口错误：" + err);
          });
      }, 2000);
      //如果获取数据长度超过了70,则不再获取数据
      if (this.list.length >= 70) {
        this.finished = true;
      }
    }
  }
};
</script>
```

## 八、制作svg图标，引入自定义图标

1. 使用Ai制作svg图标，保存为svg格式
2. 进入[制作字体图标官网](https://icomoon.io/)
3. ![导入svg图标](https://upload-images.jianshu.io/upload_images/13505073-9ef52fe4d4c425fb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![导入svg图标](https://upload-images.jianshu.io/upload_images/13505073-3fad0e483ac4358d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
4. 也可以选择观望已有的图标，选择之后下方有显示，
![](https://upload-images.jianshu.io/upload_images/13505073-dd2da770c8da4987.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
5. 点击下方*Generate Font F*按钮对选择的图标进行设置，然后下载
![点击preferences进行个性化设置](https://upload-images.jianshu.io/upload_images/13505073-74c8a897cca4700d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
6. 得到解压包以后，把解压的文件放在`assets`文件夹中，此文件夹会被打包编译，
7. 解决样式冲突问题：
  * 由于项目引入了其他ui框架，本身有字体图标，会与自定义图标冲突，需要解决
  * 编写--style.scss文件

```
//TODO: 解决字体图标库与框架的字体图标库的冲突问题
//以"icon-mt-"打头，包含" icon-mt-"的，css3选择器
i[class^="icon-mt-"],i[class*=" icon-mt-"] {
  font-family: '#{$icomoon-font-family}' !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

8. 如果想添加样式直接在--style.scss文件添加

```
.icon-mt-hezuo {
  &:before {
    content: $icon-mt-hezuo;     
    color: $icon-mt-color;
  }
}
//默认没有状态样式，自定义添加
.icon-mt-hezuo:active {
  &:before {
    content: $icon-mt-hezuo;     
    color: red;
  }
}
```
