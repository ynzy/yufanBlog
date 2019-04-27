# 前言
VuePress是尤大为了支持 Vue 及其子项目的文档需求而写的一个项目，VuePress界面十分简洁，并且非常容易上手，一个小时就可以将项目架构搭好。现在已经有很多这种类型的文档，如果你有写技术文档的项目的需求，VuePress绝对可以成为你的备选项之一。

### VuePress特性：
* 为技术文档而优化的 内置 Markdown 拓展
* 在 Markdown 文件中使用 Vue 组件的能力
* Vue 驱动的自定义主题系统
* 自动生成 Service Worker
* Google Analytics 集成
* 基于 Git 的 “最后更新时间”
* 多语言支持
* 默认主题包含：
建议先看一下[官方文档1.x](https://v1.vuepress.vuejs.org/zh/)

# 环境准备
## Windows
1. 安装 [cmder](https://cmder.net/),[使用教程](https://blog.csdn.net/mynamepg/article/details/81233120)
解压完成后复制其路径地址，将其添加到环境变量。
使用 `Win + R` 键快速启动 `cmder`，若成功则添加环境变量成功。
2. 安装 [git](https://git-scm.com/)
安装包一路 `next` 即可，在桌面上右键出现 `git bash here` 或命令行中输入 `git --version` 能够得到具体的版本信息则安装成功。
3. 安装 [nodejs](https://nodejs.org/en/)
安装包同样一路 `next` 即可，在命令行输入 `node -v` ，若得到具体版本信息则安装成功。
4. 安装 [yarn](https://yarnpkg.com/zh-Hans/docs/install#windows-stable)
安装完成后，在命令行输入 `yarn --version` ， 若得到具体版本信息则安装成功。
5. 创建项目
* 创建项目可以分为两种形式：
    * 远程仓库
        ```
        # xxx 为你的远程仓库连接
        git clone xxx
        cd your_project_name
        npm init -y
        ```
    * 本地仓库
      ```
      # xxx 为你的远程仓库连接
      npm init your_project_name -y
      cd your_project_name
      git remote add origin xxx
      ```
6. 安装 [vuepress](https://v1.vuepress.vuejs.org/zh/guide/getting-started.html)
```
# 全局安装
yarn global add vuepress@next # 或者：npm install -g vuepress@next

# 本地安装
yarn add -D vuepress@next # 或者：npm install -D vuepress@next
```
7. 配置 `package.json` 脚本
如果你的文档不是在 docs 下，可以按照你的设置来：
```
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```
上面配置完后，可以进行测试：
```
yarn docs:dev # 或者：npm run docs:dev
```
若能在浏览器中正常访问，则表示安装成功。
# 搭建及优化
## 1.配置路由及导航
关于文件是如何渲染为对应的路由的：

文件的相对路径 | 页面路由地址
---------|----------
/README.md | /
/guide/README.md | /guide/
/config.md | /config.html

* 了解了这个基本的概念后，就可以去配置对应的导航了。具体的导航栏配置介绍可以看 [官方文档](https://v1.vuepress.vuejs.org/zh/theme/default-theme-config.html#%E5%AF%BC%E8%88%AA%E6%A0%8F)
* 在实践后发现，若将所有内容放置在 `docs/.vuepress/config.js` 下将会很臃肿，难以阅读与维护，推荐将其分离开，在根目录下新建一个 `config` 文件夹：
```
// docs/.vuepress/config.js
const navConf = require('../../config/navConf.js');

module.exports = {
  themeConfig: {
    nav: navConf
  },
}
```
* 举个例子：
```
module.exports = [
    { text: 'Home', link: '/' },
    { text: 'Guide', link: '/guide/' },
    { text: 'External', link: 'https://google.com' },
    {
        text: 'Languages',
        items: [
            { text: 'Chinese', link: '/language/chinese/' },
            { text: 'Japanese', link: '/language/japanese/' }
        ]
    },
    {
        text: '关于',
        items: [
            { text: '关于我', items: [
            { text: '个人介绍', link: '/about/SelfIntroduction/' },
            ]},
            { text: '个人简历', items: [
            { text: '简历', link: '/about/CurriculumVitae/' }
            ]}
        ]
    }
]
```
## 2.配置侧边栏
* 侧边栏比导航栏要更为繁琐一些。具体的导航栏配置介绍可以看 [官方文档](https://v1.vuepress.vuejs.org/zh/theme/default-theme-config.html#%E4%BE%A7%E8%BE%B9%E6%A0%8F)。
* 首先在 docs 文件夹下新建你需要的目录及文件：
```js
about
├── CurriculumVitae
│   ├── viate1.md
│   ├── viate2.md
│   ├── viate3.md
│   └── README.md
├── SelfIntroduction
    ├── self1.md
    └── README.md
```
* 配置 `config` 文件，当文章很多的情况下，还集中在 config 文件中，那就得炸了：
```
// docs/.vuepress/config.js
const sidebarConf = require('../../config/sidebarConf/index.js');

module.exports = {
  themeConfig: {
    sidebar: sidebarConf
  },
}
```
* 文章需要进行分类，所以会分成更多的子文件，通过 index.js 进行管理：
```js
# config/sidebarConf

sidebarConf
├── about
│   ├── algorithm
│   │   └── index.js
│   ├── clean
│   │   └── index.js
│   ├── git
│   │   └── index.js
│   └── interview
│       └── index.js

```

```js
// config/sidebarConf/index.js

const CurriculumVitae = require('./about/CurriculumVitae/index');
const SelfIntroduction = require('./about/SelfIntroduction/index');

module.exports = {
    '/about/CurriculumVitae/': CurriculumVitae,
    '/about/SelfIntroduction/': SelfIntroduction,
   // 根目录下的 sidebar, 对于所有未匹配到的都会应用该 sidebar
  // '/': [''] // 此处选择禁用
};

// config/sidebarConf/about/CurriculumVitae/index.js
const utils = require('../../../../utils/index');
const children = ['', 'viate1', 'viate2','viate3']
module.exports =[
    utils.genSidebar('个人简历', children, false ),
];

//genSidebar 函数：
// utils/index.js
const utils = {
  //生成侧边栏
  genSidebar: function(title, children = [''], collapsable = true, sidebarDepth = 1) {
    return {
      title,   // 必要的
      children,
      collapsable, // 可选的, 默认值是 true,
      sidebarDepth,    // 可选的, 默认值是 1
    }
  }
};
module.exports = utils;
```
## 3.SEO配置
* 基本配置可以帮助我们做好网站的 SEO，更容易被搜索到。具体的基本配置介绍可以看 [官方文档](https://v1.vuepress.vuejs.org/zh/guide/basic-config.html#%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)

```js
// docs/.vuepress/config.js
module.exports = {
  title: '飞跃高山与大洋的鱼',
  description: '飞跃高山与大洋的鱼的文档, vuepress 文档',
}
```
## 4.更新时间与静态资源
* 更新时间，如果按照文档进行配置的话时间格式是非中文的风格，解决很简单：
```js
// 添加多语言，改为国内即可
module.exports = {
  locales: {
    '/': {
      lang: 'zh-CN', 
    }
  },
  themeConfig: {
    lastUpdated: '上次更新',
  },
}
```

* 所有的静态资源都需要放置在 .vuepress/public 目录下，你也可以为它们建立分类文件夹（这里不好的效果是在预览本地的 Markdown 文件时无法看到图片）：
```
public
├── apple-touch-icon.png
├── app.png
├── base
│   └── interview
│       └── 1468042984788341.png
├── favicon-32x32.png
├── favicon.ico
├── FrontEnd
│   └── javascript
│       ├── es6_20190112123602.png
│       └── es6_20190112124206.png
├── manifest.json
```
## 5.部署到 github 并关联到自定义域名
具体的部署介绍可以看[官方文档](https://v1.vuepress.vuejs.org/zh/guide/deploy.html#github-pages)
我这里没有自定义域名，使用的githuPage,发布到的是`https://<USERNAME>.github.io/yufanBlog/`,
所以需要再配置文件设置`base`属性，指定`yufanBlog`仓库
```js
# .vurpress/config.js 
base: "/yufanBlog/",
```

```sh
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:shanyuhai123/documents.git master:gh-pages

cd -

```

# 6. 添加 Git 仓库和编辑链接
参考文档同上:

```js
// docs/.vuepress/config.js

module.exports = {
  themeConfig: {
    // 你的 Git 项目地址，添加后会在导航栏的最后追加
    repo: 'shanyuhai123/documents',
    // 启用编辑
    editLinks: true,
    // 编辑按钮的 Text
    editLinkText: '编辑文档！',
    // 编辑文档的所在目录
    docsDir: 'docs',
    // 假如文档放在一个特定的分支下：
    // docsBranch: 'master',
  },
}
```

# 7.域名解析
关于域名解析详情可以去看 [视频](https://www.bilibili.com/video/av43316513?p=6) （第五个视频中的解析方式存在问题）。
解析方式需要改为 CNAME 的形式：