---
title: 硅谷外卖day04
date: 2019-04-02 22:27:46
author: 张勇
categories: vue项目
tags: [vue]
---
[项目地址](https://github.com/ynzy/vue-project/tree/master/gshop)

## 一、ShopGoods组件
#### 1、动态展现列表数据
* 使用mock.js模拟商品数据，实现列表数据展现
#### 2、实现基本列表滑动
* 使用better-scroll
1. 功能：
   * 实现两个列表滑动
   * 凸显当前分类
   * 当滑动右侧列表时，更新当前分类
   * 点击某个分类项，右侧列表滑动到对应的位置
2. 分析：
   * 类名：current类样式标识当前分类
   * 设计一个计算属性：currentIndex，当分类项到此节点，显示current样式
   * 根据哪些数据计算？
     * scrollY：右侧活动的Y坐标轴(滑动过程是实时变化的)
     * tops： 所有右侧分类li的top组成的数组（列表第一次显示后就不再变化）
3. 编码：
   * 在滑动过程中，实时收集scrollY
   * 在列表第一次显示后，收集tops
   * 实现currentIndex的计算逻辑 

```html
<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul ref="menusUl">
          <!-- current -->
          <li
            class="menu-item"
            v-for="(good, index) in goods"
            :key="index"
            :class="{current: index===currentIndex}"
            @click="clickMenuItem(index)"
          >
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li
                class="food-item bottom-border-1px"
                v-for="(food, index) in good.foods"
                :key="index"
                @click="showFood(food)"
              >
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售 {{food.sellCount}} 份</span>
                    <span>好评率 {{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"></CartControl>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart />
    </div>
    <Food :food="food" ref="food"></Food>
  </div>
</template>
```

##### (1)实现列表滑动

```js
import BScroll from "better-scroll"
mounted() {
    this.$store.dispatch("getShopGoods", () => {
      //数据更新后执行
      this.$nextTick(() => {
        this._initScroll();
        this._initTops();
      });
    });
  },
methods: {
    //TODO: methods里放事件相关的函数，加‘_’是为了与事件函数区分开
    //初始化滚动
    _initScroll() {
      //列表显示之后创建
      this.menuScroll = new BScroll(".menu-wrapper", {
        click: true
      });
      this.foodsScroll = new BScroll(".foods-wrapper", {
        probeType: 2, // 因为惯性滑动不会触发
        click: true
      });
      // 给右侧列表绑定scroll监听
      this.foodsScroll.on("scroll", ({ x, y }) => {
        // console.log(x, y);
        //绝对值
        this.scrollY = Math.abs(y);
      });
      // 给右侧列表绑定scroll结束的监听
      this.foodsScroll.on("scrollEnd", ({ x, y }) => {
        // console.log("scrollEnd", x, y);
        this.scrollY = Math.abs(y);
      });
    }

  }
```

##### (2)凸显当前分类，当滑动右侧列表时，更新当前分类
* 当右侧滑动的每个导航在客户区高度顶部时，左侧的菜单栏同步高亮

```html
<li
 class="menu-item"
 v-for="(good, index) in goods"
 :key="index"
 :class="{current: index===currentIndex}"
 @click="clickMenuItem(index)"
>
<script>
   data() {
    return {
      scrollY: 0, // 右侧滑动的Y轴坐标 (滑动过程时实时变化)
      tops: [], // 所有右侧分类li的top组成的数组  (列表第一次显示后就不再变化)
      food: {}, // 需要显示的food
      leftTops: [],
      leftScrollY: 0,
    };
  },
  computed: {
    ...mapState(["goods"]),
    //计算得到当前分类的下标
    currentIndex() {
      // 得到条件数据
      const { scrollY, tops } = this;
      // 根据条件计算产生一个结果
      //TODO: findIndex: 方法返回传入一个测试条件（函数）符合条件的数组第一个元素位置
      const index = tops.findIndex((top, index) => {
        // scrollY>=当前top && scrollY<下一个top
        return scrollY >= top && scrollY < tops[index + 1];
      });
      //计算左侧菜单条滑动位置
      if (index > 7) {
        const leftScrollY = this.leftTops[index - 7];
        this.leftScrollY = leftScrollY;
        this.menuScroll.scrollTo(0, -leftScrollY, 300);
      }
      // 返回结果
      return index;
    }
  },
  methods: {
    //初始化tops
    _initTops() {
      //1. 初始化tops
      const tops = [];
      let top = 0;
      tops.push(top);
      //2. 收集top值
      //找到所有分类li
      const lis = this.$refs.foodsUl.getElementsByClassName("food-list-hook");
      /**
       * 首先 这是创建了一个类数组lis（就是没有具体数据的数组），使用Array.prototype把类数组转换为原型数组，prototype是原型的意思
        为什么要转换为原型数组呢？因为类数组是没有slice()方法的，需要把类数组转换为原型数组才能调用slice()这个方法

        然后 解释 slice()和call()方法
        slice() 方法可从已有的数组中返回选定的元素。 语法 arrayObject.slice(start,end)，在本句中的意思是要去遍历数组
        call() 方法定义：调用一个对象的方法，以另一个对象替换当前对象，在这里的意思大概就是调用原型数组的方法，用原型数组代替当前对象（类数组），
        所以Array.prototype.slice.call(lis)数组就完全变成真正的数组啦！
       */
      Array.prototype.slice.call(lis).forEach(li => {
        top += li.clientHeight; //客户区高度
        tops.push(top);
      });
      //3. 更新数据
      this.tops = tops;
      // console.log(tops);

      //初始化左侧滑动高度
      const leftTops = [];
      let leftTop = 0;
      leftTops.push(leftTop);
      const leftTopLi = this.$refs.menusUl.getElementsByClassName("menu-item");
      Array.prototype.slice.call(leftTopLi).forEach(li => {
        leftTop += li.clientHeight; //客户区高度
        leftTops.push(leftTop);
      });
      this.leftTops = leftTops;
      // console.log(leftTops);
    },
  }
</script>
```

##### (3)点击某个分类项，右侧列表滑动到对应的位置

```js
<script>
methods: {
      clickMenuItem(index) {
      //使用右侧列表滑动到对应的位置
      // 得到目标位置的scrollY
      const scrollY = this.tops[index];
      // 立即更新scrollY(让点击的分类项成为当前分类)
      this.scrollY = scrollY;
      // 平滑滑动右侧列表
      this.foodsScroll.scrollTo(0, -scrollY, 300);
    },
}
</script>
```

## 二、CartControl组件，商品加减组件

```html
<template>
  <div class="cartcontrol">
    <transition name="move">
      <!-- TODO: .stop阻止事件冒泡，点击加减号不再弹出food组件 -->
      <div class="iconfont icon-remove1" v-if="food.count" @click.stop="updateFoodCount(false)"></div>
    </transition>
    <div class="cart-count" v-if="food.count">{{food.count}}</div>
    <div class="iconfont icon-addcontacts" @click.stop="updateFoodCount(true)"></div>
  </div>
</template>

<script>
export default {
  props: {
    food: Object
  },
  computed: {},

  methods: {
    updateFoodCount(isAdd) {
      this.$store.dispatch("updateFoodCount", { isAdd, food: this.food });
    }
  },
  components: {}
};

// actions
  updateFoodCount ({commit}, {isAdd, food}) {
    if(isAdd) {
      commit(INCREMENT_FOOD_COUNT, {food})
    } else {
      commit(DECREMENT_FOOD_COUNT, {food})
    }
  },
// mutations
    [INCREMENT_FOOD_COUNT](state,{food}) {
      if(!food.count) { //第一次增加
      // food.count = 1  // 新增属性(没有数据绑定)

      //TODO: 在已绑定的数据中添加新的数据进行绑定
      Vue.set(food, 'count', 1)  //让新增的属性也有数据绑定
      // 将food添加到cartFoods中
      state.cartFoods.push(food)
      } else {
          food.count++
      }
      /** 
       * p65
       * 1.通过两个引用变量指向同一个对象，通过一个引用变量改变变量内部数据，另外一个引用变量能看见
       * 2.两个引用变量指向同一个对象，让一个引用变量指向另外一个对象，而原来的引用变量的另一个引用变量还是指向原来的对象
      */
  },
</script>
```

1. 问题：更新状态数据, 对应的界面不变化
* 原因： 一般方法给一个已有绑定的对象中添加一个新的属性, 这个属性没有数据绑定
* 解决:
  * Vue.set(obj, 'xxx', value)才有数据绑定
  * this.$set(obj, 'xxx', value)才有数据绑定
## 三、ShopCart组件，购物车组件
1. 使用vuex管理购物项数据: cartFoods
2. 解决几个功能性bug
    * 是什么时候显示和关闭购物车列表
    * 如何计算需要多少元起送
```html
<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="toggleShow">
          <div class="logo-wrapper">
            <!-- 显示总数量 -->
            <div class="logo" :class="{highlight:totalCount}">
              <i class="iconfont icon-shopping" :class="{highlight:totalCount}"></i>
            </div>
            <div class="num" v-if="totalCount">{{totalCount}}</div>
          </div>
          <div class="price" :class="{highlight:totalCount}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{info.minPrice}} 元</div>
        </div>
        <!-- 通过计算属性计算总价格和是否需要的配送费的关系 -->
        <div class="content-right">
          <div class="pay" :class="payClass">{{payText}}</div>
        </div>
      </div>
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="clearCart">清空</span>
        </div>
        <div class="list-content">
          <ul>
            <li class="food" v-for="(food, index) in cartFoods" :key="index">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <CartControl :food="food"/>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="list-mask" v-show="listShow" @click="toggleShow"></div>
  </div>
</template>

<script>
import { Dialog } from 'vant';
import BScroll from "better-scroll";
import { mapState, mapGetters } from "vuex";
import CartControl from "../CartControl/CartControl.vue";

export default {
  data() {
    return {
      isShow: false
    };
  },
  computed: {
    ...mapState(["cartFoods", "info"]),
    ...mapGetters(["totalCount", "totalPrice"]),
    payClass() {
      const { totalPrice } = this;
      const { minPrice } = this.info;
      return totalPrice >= minPrice ? "enough" : "not-enough";
    },
    payText() {
      const { totalPrice } = this;
      const { minPrice } = this.info;
      if (totalPrice === 0) {
        return `￥${minPrice}元起送`;
      } else if (totalPrice < minPrice) {
        return `还差￥${minPrice - totalPrice}元起送`;
      } else {
        return "结算";
      }
    },
    //显示购物车列表项
    listShow() {
      // 如果总数量为0, 直接不显示
      if (this.totalCount === 0) {
        this.isShow = false;
        return false;
      }
      if (this.isShow) {
        this.$nextTick(() => {
          // 实现BScroll的实例是一个单例
          if (!this.scroll) {
            this.scroll = new BScroll(".list-content", {
              click: true
            });
          } else {
            this.scroll.refresh(); // 让滚动条刷新一下: 重新统计内容的高度
          }
        });
      }
      return this.isShow;
    }
  },

  methods: {
    toggleShow() {
      // 只有当总数量大于0时切换
      if (this.totalCount > 0) {
        this.isShow = !this.isShow;
      }
    },
    clearCart() {
      Dialog.confirm({
        title: "提示",
        message: "确定清空购物车？"
      })
        .then(() => {
          this.$store.dispatch('clearCart')
        })
        .catch(() => {
          // on cancel
        });
    }
  },
  components: {
    CartControl
  }
};
</script>
```

## 四、Food组件，食物详情组件
1. 父子组件：
   * 子组件调用父组件的方法: 通过props将方法传递给子组件
   * 父组件调用子组件的方法: 通过ref找到子组件标签对象

```html
<template>
  <div class="food" v-if="isShow">
    <div class="food-content">
      <div class="image-header">
        <img
          :src="food.image"
        >
        <p class="foodpanel-desc">{{food.info}}</p>
        <div class="back" @click="toggleShow">
          <i class="iconfont icon-xiazai6" style="color:#fff"></i>
        </div>
      </div>
      <div class="content">
        <h1 class="title">{{food.name}}</h1>
        <div class="detail">
          <span class="sell-count">月售 {{food.sellCount}} 份</span>
          <span class="rating">好评率 {{food.rating}}%</span>
        </div>
        <div class="price">
          <span class="now">￥{{food.price}}</span>
          <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
        </div>
        <div class="cartcontrol-wrapper">
            <CartControl :food="food"></CartControl>
        </div>
      </div>
    </div>
    <div class="food-cover" @click="toggleShow"></div>
  </div>
</template>

<script>
  import CartControl from '../../components/CartControl/CartControl.vue'
export default {
  props: {
    food: Object
  },
  data () {
    return {
      isShow: false
    }
  },
  computed: {},

  methods: {
    toggleShow () {
      this.isShow = !this.isShow
    }
  },
  components: {
    CartControl
  }
};
</script>

<!-- 调用组件 -->
 <Food :food="food" ref="food"></Food>
 <script>
 //显示点击的food
    showFood(food) {
      //设置food
      this.food = food;
      //显示food组件(在父组件中调用子组件对象的方法)
      console.log(this.$refs.food);
      this.$refs.food.toggleShow();
    }
 </script>
```