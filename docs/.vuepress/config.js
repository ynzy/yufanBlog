const pluginConf = require('../../config/pluginConf')
module.exports = {
    title: '雨凡技术栈',
    description: '一个前端菜鸟的踩坑之路',
    base: "/yufanBlog/",
    plugins:pluginConf,
    themeConfig: {
        nav: [
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
        ],
        sidebar:
        {
            '/about/SelfIntroduction/': [
                {
                    title: '分组',
                    collapsable: false,
                    children: [
                        '',
                        'self1',
                        'self2',
                        'self3',
                        'self4',
                    ]
                }
            ],
            '/about/CurriculumVitae/': [
              '',      /* /bar/ */
              'viate1',
              'viate2',
              'viate3',
            ],
            // fallback
            '/': [
              '',        
            ]
          }
      }
}