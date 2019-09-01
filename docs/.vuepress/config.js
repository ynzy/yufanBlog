const pluginConf = require('../../config/pluginConf');
const navConf = require('../../config/navConf');
const sidebarConf = require('../../config/sidebarConf/index');
const headConf = require('../../config/headConf');
module.exports = {
  title: '雨凡技术栈',
  description: '一个前端菜鸟的踩坑之路',
  base: "/yufanBlog/",
  locales: {
    '/': {
      lang: 'zh-CN',
    }
  },
  // head: headConf,
  plugins: pluginConf,
  themeConfig: {
    nav: navConf,
    sidebar: sidebarConf,
    lastUpdated: '上次更新',
    // 你的 Git 项目地址，添加后会在导航栏的最后追加
    repo: 'ynzy/yufanBlog',
    // 启用编辑
    editLinks: true,
    // 编辑按钮的 Text
    editLinkText: '在 GitHub 上编辑此页',
    // 编辑文档的所在目录
    docsDir: 'docs',
    // 假如文档放在一个特定的分支下：
    // docsBranch: 'master',
  },
  markdown: {
    lineNumbers: true
  }
}