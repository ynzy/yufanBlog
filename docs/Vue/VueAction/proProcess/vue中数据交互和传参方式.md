---
title: vue中数据交互和传参方式
date: 2019-03-03 14:50:07
# img: http://pl7h7g4ko.bkt.clouddn.com/18760162_p0.jpg
categories: 脚手架
tags: [Vue-cli]
---

<!-- # vue中数据交互和传参方式 -->
## 一、介绍
通过vue-music-app项目，初步熟悉vue中的数据交互和传参方式，此项目中使用到了
vuex，vue-router，props，solt传参方式进行页面传参，以及如何设置代理服务器对访问的ip地址进行管理
，并且使用到了vant按需引入轮播图组件。

[源码地址](https://github.com/ynzy/vue-project/tree/master/vue-music-app)

## 二、传参方式
### 1、插槽分发内容
* 定义一个组件，在组件内写入`<slot></slot>`标签，当调用组件时，组件中如果有内容，则会替换slot标签渲染数据。
* 新建一个slider组件：
```
<template>
  <!-- TODO:vue通过ref设置dom元素，通过$refs方法获取此dom节点 -->
  <div class="slider" ref="slider">
    <div class="sliderGroup" ref="sliderGroup">
      <slot></slot>
    </div>
  </div>
</template>
```

* 新建一个recommend.vue组件，调用slider组件

  ```
  <template>
    <div class="recommend">
      <h2 class="recommendlist">推荐歌单</h2>
      <slider>
        <!-- TODO:使用插槽,通过组件的slot标签，替换数据 -->
        <div v-for="item in slider" :key="item.id">
          {{ item.songName }}
        </div>
      </slider>
  </div>
  </template>
  <script>
  import slider from "./slider.vue";
  export default {
    data() {
      return { 
        slider: []
      };
    },
    components: {  //调用slider组件
      slider
    },
    methods: {
        getSlider() {  //获取数据存储在slider数组中
          this.$axios.get("http://www.wanandroid.com/tools/mockapi/9664/songlist").then(resp => {
            if (resp.status == 200) {
              this.slider = resp.data;
            }
          });
        },
    }
  </script>
  ```

  ![页面效果.png](https://upload-images.jianshu.io/upload_images/13505073-e3539c75d7ee9299.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 2、通过props进行父子组件传参

* 有些时候，我们定义一个组件，在多个地方调用，而所需展示的数据不同，可以通过props传参方式对组件进行页面渲染

* 新建一个Songlist.vue组件

```
<!-- 不同数据调用此模板 -->
<template>
  <div>
    <ul>
      <li class="songli" v-for="item in songList" @click="selectSong(item)">
        <div class="songinfor">
          <p class="title">{{item.songName}}</p>
          <p class="singer" style="font-size:12px;color:#888">{{item.singer}}</p>
        </div>
        <p class="start">
          <img src="../../static/img/start.png">
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    props: ["songList"],  //通过props接收父组件传送的数据
};
</script>
```

* 新建一个recommend.vue,调用子组件SongList

```
<template>
  <div class="recommend">
      <!-- TODO:动态绑定数据songList数据，子组件通过props接收数据 -->
    <songList :song-list="songList"></songList>  
    	
  </div>
</template>
<script>
import songList from "./Songlist.vue"
export default {
  data() {
    return { 
      songList: []
    };
  },
  components: {
    songList,
  },
  methods: {
    getSongList() {
      this.$axios.get("http://www.wanandroid.com/tools/mockapi/9664/recommend").then(resp => {
        if (resp.status == 200) {
          this.songList = resp.data;
        }
      });
    }
  }
};
</script>
```

![页面效果.png](https://upload-images.jianshu.io/upload_images/13505073-a447d0175d80d847.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

* 新建一个Hot.vue组件，也调用子组件Songlist

```
<template>
  <div id="hot">	
		<div class="banner">
			热门歌曲
		</div>
        <!-- 动态绑定数据hotList数据 -->
		<songList :song-list="hotList"></songList>
	</div>
</template>

<script>
import songList from "./Songlist.vue"
    export default {
        		data() {
			return {hotList: []}
		},
		methods: {
			getHotList() {
				 this.$axios.get("http://www.wanandroid.com/tools/mockapi/9664/recommend").then(resp => {
					 
                    if (resp.status == 200) {
                    	this.hotList = resp.data;
                    }
                });
			}
        },
        mounted() {
            this.getHotList()
        },
        components: {
            songList
        }
    }
</script>
```

![页面效果.png](https://upload-images.jianshu.io/upload_images/13505073-b754df0159ac607c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 3、使用vue-router进行页面传参
* 点击某个菜单项，跳转到另一个组件页面时可以使用vue-router进行传参
* 对路由进行配置
![路由配置.png](https://upload-images.jianshu.io/upload_images/13505073-63cd4d2cd00d4d86.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
* 在songList组件添加点击事件跳转查看详情页

```
<!-- 不同数据调用此模板 -->
<template>
  <div>
    <ul>
      <li class="songli" v-for="item in songList" @click="selectSong(item)">
        <div class="songinfor">
          <p class="title">{{item.songName}}</p>
          <p class="singer" style="font-size:12px;color:#888">{{item.singer}}</p>
        </div>
        <p class="start">
          <img src="../../static/img/start.png">
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    props: ["songList"],
    methods: {
        selectSong(item) {
            // 直接调用$router.push,实现携带参数的跳转
            // this.$router.push({
            //     "name" : "Detail",  //发送跳转页面名字
            //     "params" : {item,item} //TODO: 通过路由的params进行传参
            // })
            this.$router.push({
                "path": "/detail/:item",
                "query": {item: JSON.stringify(item)}  //TODO: 通过路由的query进行传参
            })
        },
    }
};
</script>
```

* 新建detail.vue组件，接收页面传参

```
<template>
    <transition name="slider">
        <div class="detail">
                <div class="songimg">
                    <img :src="songDetail.songImgSrc">
                </div>
                <div class="songtitle">
                    {{songDetail.songName}}
                </div>
                <div class="songaudio">
                    <audio autoplay="autoplay">
                        <source src="static/song/song.ogg" type="audio/ogg" />
                        <source src="static/song/song.mp3" type="audio/mpeg" />
                    </audio>
                </div>
            </div>
    </transition>
</template>
<script>
    export default {
        data() {
            return {
                songDetail: {}
            }
        },
        mounted () {
            //TODO:parmas传参不可以刷新，会丢失数据，query可以刷新页面
            // console.log(this.$route.params) //$route接收传递的参数
            // this.songDetail = this.$route.params.item  //TODO: params接收路由传递的参数
            this.songDetail = JSON.parse(this.$route.query.item); //TODO: query接收路由传递的参数
        },
    }
</script>
```

### 4、使用vuex进行数据管理
* 使用vuex可以更好的管理数据状态，使数据得到共享
* 安装vuex `npm install vuex --save`
* 新建store文件夹，同一组织store文件
![store文件结构.png](https://upload-images.jianshu.io/upload_images/13505073-b8ff747ee5b2c8b6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
##### (1) 在main.js引入store

```
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store/index'  //导入store主文件index

Vue.prototype.$axios = axios  //将axios添加到vue的原型上，所有vue实例上都可以使用axios

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,  //添加在vue实例上
  router,
  components: { App },
  template: '<App/>'
})
```

##### (2) 编写store文件夹
  * index.js

  ```
  import Vue from 'vue'
  import Vuex from 'vuex'
  import getters from './getters'
  import state from './state'
  import mutations from './mutations'
  import actions from './action'
  Vue.use(Vuex)

  export default new Vuex.Store({
      getters,
      state,
      mutations,
      actions
  })
  ```
  * state.js  //数据管理
  ```
  const state = {
  	song: {}
  }
  export default {
      state
  }
  ```
  * getters.js  //管理数据状态，相当于computed(计算)属性
  ```
  const getters={
    getSong(state){
      return state.song;
    }
  }
  export default getters;
  ```
  * actions.js  //提交数据变化，一把用于异步获取数据，相当于methods(方法)属性
  ```
  import types from './types.js'
  import axios from 'axios'

  const actions = {
    getSongAsync({commit,state}) {
      axios.get("/recommend/").then(resp => {
        if (resp.status == 200) {
          commit(types.GET_SONG, resp.data);  //提交突变
        }
      });
    }
  }

  export default actions;
  ```

  * mutations.js //改变数据状态，也就相当于对state数据进行更新

  ```
  import types from './types'
  
  const mutations = {
  	[types.GET_SONG](state,data) {
          state.song = data
          console.log(data)
  	}
  }
  export default mutations
  ```

  * types.js  //定义方法名常量，管理方法名

  ```
  const GET_SONG = "GET_SONG"  
  export default {
      GET_SONG
  }
  ```

##### (3) 在detail.vue组件调用state中的数据

```
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["getSong"])  //此数据可以直接在页面模板调用
  },
  created() {
    this.$store.dispatch("getSongAsync");  //页面初始化时发送事件
  }
};
</script>
```

## 三、引入Vant
### Vant按需引入组件
[官方网址](https://youzan.github.io/vant/#/zh-CN/intro)
##### 1、安装
`npm i vant -S`
* babel-plugin-import 是一款 babel 插件，它会在编译过程中将 import 的写法自动转换为按需引入的方式

```
# 安装 babel-plugin-import 插件
npm i babel-plugin-import -D
```

```
// .babelrc 中配置
// 注意：webpack 1 无需设置 libraryDirectory
{
  "plugins": [
    ["import", {
      "libraryName": "vant",
      "libraryDirectory": "es",
      "style": true
    }]
  ]
}
```

>!注意：配置 babel-plugin-import 插件后将不允许导入所有组件
##### 2、新建--src/vant-components.js按需使用swiper组件

```
import Vue from 'vue'

import { Swipe, SwipeItem } from 'vant';

Vue.use(Swipe).use(SwipeItem);
```

##### 3、在main引入vant-components.js即可在所有页面使用引入的组件
![引入组件.png](https://upload-images.jianshu.io/upload_images/13505073-6696122287b34157.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
##### 4、此时就可以在vue组件中使用vant的swipe组件了
![使用组件.png](https://upload-images.jianshu.io/upload_images/13505073-132545809587e068.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 四、配置代理服务器
### 编译打包前要做的事
##### 1、修改文件--config/index.js
* 找到build中`assetsPublicPath`选项进行修改
![修改assetsPublicPath选项.png](https://upload-images.jianshu.io/upload_images/13505073-c6c836fa4a06e0e4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
##### 2、修改文件--config/index.js，进行代理服务器配置
* 找到dev中的`proxyTable`进行代理服务器配置，统一管理接口

```
proxyTable: {
  '/song': {  //匹配项,放在项目调用中
    target: 'http://www.wanandroid.com/tools/mockapi/9664/songlist', // 接口域名
    // secure: false,  // 如果是https接口，需要配置这个参数
    changeOrigin: true, //是否跨域
    pathRewrite: { //重写地址
      '^/song': '' //因为接口中没有这个匹配项，所以要重写地址，才能正常访问
    }
  },
}
```

##### 3、修改文件--build/utils.js
* 找到`ExtractTextPlugin.extract`，添加`publicPath`选项

```
if (options.extract) {
    return ExtractTextPlugin.extract({
      publicPath: '../../',  //TODO:css中用到资源时需要加的属性
      use: loaders,
      fallback: 'vue-style-loader'
    })
  } else {
    return ['vue-style-loader'].concat(loaders)
  }
```


