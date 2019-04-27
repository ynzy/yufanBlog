# 插件列表
为了方便的统一管理 plugin，需要对 `docs/.vuepress/config.js` 进行配置：
```js
// docs/.vuepress/config.js
const pluginConf = require('../../config/pluginConf.js');

module.exports = {
  plugins: pluginConf,
}

```
件的很多服务都需要对 `head` 标签进行修改：
```js
// docs/.vuepress/config.js
const headConf = require('../../config/headConf.js');

module.exports = {
  head: headConf,
}
```
之后就可以去修改 `config/pluginConf.js` 和 `config/headConf.js` 文件了。
## 1. PWA
具体的 PWA 配置介绍可以看 [官方文档](https://v1.vuepress.vuejs.org/zh/plugin/official/plugin-pwa.html)
```js
module.exports = {
  '@vuepress/pwa': {
    serviceWorker: true,
    updatePopup: {
      message: "发现新内容可用.",
      buttonText: "刷新",
      // 自定义弹窗
      // popupComponent: 'MySWUpdatePopup',
    }
  },
};
```
#### PWA NOTES：
>`serviceWorker` 选项仅仅用来控制 service worker，为了让你的网站完全地兼容 PWA，你需要在 `.vuepress/public` 提供 Manifest 和 icons，更多细节，请参见 [MDN docs about the Web App Manifest.](https://developer.mozilla.org/en-US/docs/Web/Manifest) 此外，只有您能够使用 SSL 部署您的站点时才能启用此功能，因为 service worker 只能在 HTTPs 的 URL 下注册。
​-- VuePress 官网

因为使用的 Github Pages 服务，所以即使使用 CNAME 后也依然保持 SSL 状态。
[Manifest](https://www.bilibili.com/video/av43316513/?p=9) 第六个视频其实存在一些问题，在第九个 视频 中解决了，利用 [App Manifest Generator](https://app-manifest.firebaseapp.com/) 直接生成即可。

参考示例：
```json
{
  "name": "飞跃高山与大洋的鱼",
  "short_name": "山与海",
  "description": "飞跃高山与大洋的鱼的文档",
  "theme_color": "#2196f3",
  "background_color": "#2196f3",
  "display": "standalone",
  "start_url": "index.html",
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```
还需要获取一下 [favicons](https://realfavicongenerator.net/) 等：
```js
// config/headConf.js

module.exports = [
  ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
  ['link', { rel: 'icon', href: '/favicon-32x32.png' }],
  ['link', { rel: 'manifest', href: '/manifest.json' }],
  ['meta', { name: 'theme-color', content: '#ffffff' }],
];
```
## 2.添加评论插件
[Valine官方](https://valine.js.org/quickstart.html)
安装Valine包
```
npm install leancloud-storage --save
npm install valine --save
```
评论需要按照你的需求来：如果你希望所有评论可以在 Github 可见，那么使用 [Gitalk](https://juejin.im/post/5c9e30fb6fb9a05e1c4cecf6) 吧，正好有一篇新鲜出炉的文章；如果你想要所有非 Github 用户也可以评论的话可以使用 [Valine](https://valine.js.org/)。

这边利用的其实 主题的继承 ，通过修改 VuePress 的默认主题来实现需要的功能.
首先修改默认主题下的 Page 组件（这意味着你不能随便使用 npm install 了）：
```html
<!-- node_modules/@vuepress/theme-default/components/Page.vue  -->

      </p>
    </div>

    <slot name="bottom"/>
    <Valine></Valine>
  </main>
</template>

```

接着创建 Valine 组件，对于评论组件有以下要求：
1. 在 README.md 文件中可以关闭评论；
2. 在不同的路由显示不同的评论

```
<!-- docs/.vuepress/components/Valine.vue -->

<template>
  <div class="ValineComment" v-if="comment">
    <hr>
    <span :id="page.path" class="leancloud-visitors" :data-flag-title="page.title">
      <em class="post-meta-item-text">文章阅读量 </em>
      <i class="leancloud-visitors-count">1000000+</i>
    </span>
    <div id="vcomments"></div>
  </div>
</template>

<script>
export default {
  computed: {
    comment: function () {
      let { comment } = this.$frontmatter;
      if (typeof comment === 'undefined') {
        return true;
      }
      return comment;
    },
    page: function () {
      let { path = '/', title = '首页' } = this.$page;
      return { path, title };
    }
  },
  mounted() {
    this.renderValine()
  },
  watch: {
    '$route': {
      handler: function (to, from) {
        if (to.path !== from.path) {
          this.$nextTick(() => {
            this.renderValine();
          })
        }
      }
    }
  },
  methods: {
    renderValine() {
      if (typeof window !== 'undefined') {
        this.window = window;
        window.AV = require('leancloud-storage');
      }
      const secretKeyConf = require('../../../config/secretKeyConf.js');
      const Valine = require('valine');
      new Valine({
        el: '#vcomments' ,
        appId: secretKeyConf.appId,
        appKey: secretKeyConf.appKey,
        notify:false,
        verify:false,
        avatar:'retro',
        path: window.location.pathname,
        meta: ['nick','mail','link'],
        pageSize: 10,
        visitor: true,
        placeholder: '欢迎留言...' 
      });
    }
  }
}
</script>

<style lang="stylus" scoped>
.ValineComment {
  padding 0 2rem;
}
.leancloud-visitors {
  display inline-block
  margin-bottom 1rem;
}
</style>
```

## 3. Back-to-top
具体的 Back-to-top 配置介绍可以看 [官方文档](https://v1.vuepress.vuejs.org/zh/plugin/official/plugin-back-to-top.html)
安装：
```npm
yarn add -D @vuepress/plugin-back-to-top@next
# OR npm install -D @vuepress/plugin-back-to-top@next
```
使用：
```js
// config/pluginConf.js

module.exports = {
  '@vuepress/back-to-top': true,
};
```
效果图：
![效果](/docs/.vuepress/public/images/blog/Back-to-top.png)
## 4. google-analytics
具体的 google-analytics 配置介绍可以看 [官方文档](https://v1.vuepress.vuejs.org/zh/plugin/official/plugin-google-analytics.html)
你需要去 Google 获取对应的 [key](https://analytics.google.com/analytics/web/?authuser=0#/provision/SignUp) 。
![google-analytics获取key](/docs/.vuepress/public/images/blog/google-analyticsid.png)
![google-analytics获取key](/docs/.vuepress/public/images/blog/google-analyticsid2.png)
#### 安装
```
yarn add -D @vuepress/plugin-google-analytics@next
# OR npm install -D @vuepress/plugin-google-analytics@next
```
使用：
```js
// config/pluginConf.js
// 此处引申出的隐私问题在最后有说明

const secretKeyConf = require('./secretKeyConf.js');

module.exports = {
  '@vuepress/google-analytics': {
    'ga': secretKeyConf.ga
  }
};
```