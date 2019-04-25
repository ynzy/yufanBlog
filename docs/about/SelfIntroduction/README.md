

# 关于我

导航栏
导航栏可能包含你的页面标题、搜索框、 导航栏链接、多语言切换、仓库链接，它们均取决于你的配置。

## 导航栏链接
你可以通过 themeConfig.nav 增加一些导航栏链接:

// .vuepress/config.js
module.exports = {
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'External', link: 'https://google.com' },
    ]
  }
}
当你提供了一个 items 数组而不是一个单一的 link 时，它将显示为一个 下拉列表 ：

module.exports = {
  themeConfig: {
    nav: [
      {
        text: 'Languages',
        items: [
          { text: 'Chinese', link: '/language/chinese/' },
          { text: 'Japanese', link: '/language/japanese/' }
        ]
      }
    ]
  }
}
此外，你还可以通过嵌套的 items 来在 下拉列表 中设置分组：

module.exports = {
  themeConfig: {
    nav: [
      {
        text: 'Languages',
        items: [
          { text: 'Group1', items: [/*  */] },
          { text: 'Group2', items: [/*  */] }
        ]
      }
    ]
  }
}
## 禁用导航栏
你可以使用 themeConfig.navbar 来禁用所有页面的导航栏：

// .vuepress/config.js
module.exports = {
  themeConfig: {
    navbar: false
  }
}
你也可以通过 YAML front matter 来禁用某个指定页面的导航栏：

---
## 侧边栏
---
想要使 侧边栏（Sidebar）生效，需要配置 themeConfig.sidebar，基本的配置，需要一个包含了多个链接的数组：

// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: [
      '/',
      '/page-a',
      ['/page-b', 'Explicit link text']
    ]
  }
}
你可以省略 .md 拓展名，同时以 / 结尾的路径将会被视为 */README.md，这个链接的文字将会被自动获取到（无论你是声明为页面的第一个 header，还是明确地在 YAML front matter 中指定页面的标题）。如果你想要显示地指定链接的文字，使用一个格式为 [link, text] 的数组。

## 嵌套的标题链接
默认情况下，侧边栏会自动地显示由当前页面的标题（headers）组成的链接，并按照页面本身的结构进行嵌套，你可以通过 themeConfig.sidebarDepth 来修改它的行为。默认的深度是 1，它将提取到 h2 的标题，设置成 0 将会禁用标题（headers）链接，同时，最大的深度为 2，它将同时提取 h2 和 h3 标题。

也可以使用 YAML front matter 来为某个页面重写此值：


## 显示所有页面的标题链接 0.11.0+
默认情况下，侧边栏只会显示由当前活动页面的标题（headers）组成的链接，你可以将 themeConfig.displayAllHeaders 设置为 true 来显示所有页面的标题链接：

module.exports = {
  themeConfig: {
    displayAllHeaders: true // 默认值：false
  }
}
## 活动的标题链接
默认情况下，当用户通过滚动查看页面的不同部分时，嵌套的标题链接和 URL 中的 Hash 值会实时更新，这个行为可以通过以下的配置来禁用：

module.exports = {
  themeConfig: {
    activeHeaderLinks: false, // 默认值：true
  }
}
提示

值得一提的是，当你禁用此选项时，此功能的相应脚本将不会被加载，这是我们性能优化的一个小点。

## 侧边栏分组
你可以通过使用对象来将侧边栏划分成多个组：

// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: [
      {
        title: 'Group 1',   // 必要的
        path: '/foo/',      // 可选的, 应该是一个绝对路径
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          '/'
        ]
      },
      {
        title: 'Group 2',
        children: [ /* ... */ ]
      }
    ]
  }
}
侧边栏的每个子组默认是可折叠的，你可以设置 collapsable: false 来让一个组永远都是展开状态。

一个侧边栏的子组配置同时支持 sidebarDepth 字段用于重写默认显示的侧边栏深度(1)。

提示

从 1.0.0-alpha.36 开始，嵌套的侧边栏分组 beta 也是支持的，但嵌套深度应小于 3，否则在控制台会收到警告。