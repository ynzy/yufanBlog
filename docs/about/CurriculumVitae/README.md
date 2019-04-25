# 个人简历

自动生成侧栏
如果你希望自动生成一个仅仅包含了当前页面标题（headers）链接的侧边栏，你可以通过 YAML front matter 来实现：

---
sidebar: auto
---
你也可以通过配置来在所有页面中启用它：

// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: 'auto'
  }
}
在 多语言 模式下, 你也可以将其应用到某一特定的语言下：

// .vuepress/config.js
module.exports = {
  themeConfig: {
     '/zh/': {
       sidebar: 'auto'
     }
  }
}
# 禁用侧边栏
你可以通过 YAML front matter 来禁用指定页面的侧边栏：

---
sidebar: false
---
# 搜索框
# 内置搜索
你可以通过设置 themeConfig.search: false 来禁用默认的搜索框，或是通过 themeConfig.searchMaxSuggestions 来调整默认搜索框显示的搜索结果数量：

module.exports = {
  themeConfig: {
    search: false,
    searchMaxSuggestions: 10
  }
}
你可以通过 YAML front matter 来对单独的页面禁用内置的搜索框：

---
search: false
---
提示

内置搜索只会为页面的标题、h2 和 h3 构建搜索索引，如果你需要全文搜索，你可以使用 Algolia 搜索。

# Algolia 搜索
你可以通过 themeConfig.algolia 选项来用 Algolia 搜索 替换内置的搜索框。要启用 Algolia 搜索，你需要至少提供 apiKey 和 indexName：

module.exports = {
  themeConfig: {
    algolia: {
      apiKey: '<API_KEY>',
      indexName: '<INDEX_NAME>'
    }
  }
}
注意

不同于开箱即用的 内置搜索，Algolia 搜索 需要你在使用之前将你的网站提交给它们用于创建索引。

更多选项请参考 Algolia DocSearch 的文档。

# 最后更新时间
你可以通过 themeConfig.lastUpdated 选项来获取每个文件最后一次 git 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部：

module.exports = {
  themeConfig: {
    lastUpdated: 'Last Updated', // string | boolean
  }
}
请注意，themeConfig.lastUpdated 默认是关闭的，如果给定一个字符串，它将会作为前缀显示（默认值是：Last Updated）。

使用须知

由于 lastUpdated 是基于 git 的, 所以你只能在一个基于 git 的项目中启用它。此外，由于使用的时间戳来自 git commit，因此它将仅在给定页的第一次提交之后显示，并且仅在该页面后续提交更改时更新。