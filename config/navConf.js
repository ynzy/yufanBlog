const link = require('./link');
module.exports = [
    // {
    //     text: 'Html',
    //     items: [
    //         { text: '元素', items: [
    //             { text: '文档元信息', link: '/Html/' },
    //             { text: '语义相关内容', link: '/Html/' },
    //             { text: '链接', link: '/Html/' },
    //             { text: '替换型元素', link: '/Html/' },
    //             { text: '表格', link: '/Html/' },
    //             { text: '总集', link: '/Html/' },
    //         ]},
    //         { text: '表单', items: [
    //             { text: '表单', link: '/Html/' }
    //         ]},
    //         { text: '语言', items: [
    //             { text: '实体', link: '/Html/' },
    //             { text: '命名空间', link: '/Html/' },
    //         ]}
    //     ]
    // },
    // {
    //     text: 'Css',
    //     items: [
    //         { text: '语言', items: [
    //             { text: '@rule', link: '/Css/' },
    //             { text: '选择器', link: '/Css/' },
    //             { text: '单位', link: '/Css/' },
    //         ]},
    //         { text: '功能', items: [
    //             { text: '布局', link: '/Css/' },
    //             { text: '绘制', link: '/Css/' },
    //             { text: '交互', link: '/Css/' }
    //         ]},
    //     ]
    // },
    {
        text: 'Javasctipt',
        items: [{
                text: 'ECMAScript6',
                items: [{
                    text: 'ES6学习',
                    link: '/Javasctipt/ECMAScript6/let和const命令'
                }, ]
            },
            {
                text: 'TypeScript',
                items: [{
                    text: 'TypeScript入门',
                    link: '/Javasctipt/TypeScript/什么是TypeScript'
                }, ]
            },
            // { text: '运行时', items: [
            //     { text: '数据结构', link: '/Javasctipt/' },
            //     { text: '执行过程', link: '/Javasctipt/' },
            // ]},
            // { text: '文法', items: [
            //     { text: '词法', link: '/Javasctipt/' },
            //     { text: '语法', link: '/Javasctipt/' }
            // ]},
            // { text: '语义', items: [
            //     { text: '语义', link: '/Javasctipt/' },
            // ]},
        ]
    },
    // {
    //     text: '浏览器API',
    //     items: [
    //         { text: '实现原理', items: [
    //             { text: '解析', link: '/BrowserAPI/' },
    //             { text: '构建DOM树', link: '/BrowserAPI/' },
    //             { text: '计算css', link: '/BrowserAPI/' },
    //             { text: '渲染、合成和绘制', link: '/BrowserAPI/' },
    //         ]},
    //         { text: 'API', items: [
    //             { text: 'DOM', link: '/BrowserAPI/' },
    //             { text: 'CSSOM', link: '/BrowserAPI/' },
    //             { text: '事件', link: '/BrowserAPI/' },
    //             { text: 'API总集合', link: '/BrowserAPI/' },
    //         ]},
    //     ]
    // },
    // {
    //     text: '前端工程实践',
    //     items: [
    //         { text: '性能', link: '/EngineeringPractice/' },
    //         { text: '工具链', link: '/EngineeringPractice/' },
    //         { text: '持续集成', link: '/EngineeringPractice/' },
    //         { text: '搭建系统', link: '/EngineeringPractice/' },
    //         { text: '架构与基础库', link: '/EngineeringPractice/' },
    //     ]
    // },
    {
        text: 'Angular',
        items: [{
                text: '基础篇',
                items: [{
                    text: '构建应用',
                    link: '/Angular/Basic/创建应用/'
                }, ]
            },
            {
                text: '实战篇',
                items: [{
                    text: '旅游清单项目',
                    link: '/Angular/AngularAction/tourismTodo/旅游清单项目/'
                }, ]
            },
        ]
    },
    {
        text: 'Vue',
        items: [{
                text: '基础篇',
                items: [{
                        text: 'vue介绍',
                        link: '/Vue/Basic/Introduce/vue介绍'
                    },
                    {
                        text: '基础语法',
                        link: '/Vue/Basic/BasicGrammar/'
                    },
                    {
                        text: '计算属性',
                        link: '/Vue/Basic/Computed/'
                    },
                    {
                        text: '表单与v-model',
                        link: '/Vue/Basic/FormModel/'
                    },
                    {
                        text: '组件',
                        link: '/Vue/Basic/Component/'
                    },
                    {
                        text: '自定义指令',
                        link: '/Vue/Basic/CustomInstruction/'
                    },
                ]
            },
            {
                text: '进阶篇',
                items: [{
                        text: 'Render函数',
                        link: '/Vue/Advance/RenderFaction/'
                    },
                    {
                        text: 'webpack',
                        link: '/Vue/Advance/WebPack/WebPack基础使用方式'
                    },
                    {
                        text: 'Vue-router',
                        link: '/Vue/Advance/VueRouter/'
                    },
                    {
                        text: 'Vuex',
                        link: '/Vue/Advance/Vuex/'
                    },
                ]
            },
            {
                text: '实战',
                items: [{
                        text: '硅谷外卖',
                        link: '/Vue/VueAction/gushop/硅谷外卖day01/'
                    },
                    {
                        text: '仿美团项目',
                        link: '/Vue/VueAction/JFCitySelector/'
                    },
                    {
                        text: '项目总结',
                        link: '/Vue/VueAction/proProcess/vue-cli3项目创建-配置-发布/'
                    },
                ]
            },
            {
                text: 'Vue踩坑',
                items: [{
                    text: '踩坑',
                    link: '/Vue/VuePit/'
                }, ]
            },
        ]
    },
    {
        text: '珠峰架构学习笔记',
        items: [{
                text: '预习资料',
                items: [{
                    text: '预习资料',
                    link: '/Zhufeng/Prepare/01-Async'
                }, ]
            },
            {
                text: 'javascript高级',
                items: [{
                    text: '高阶函数异步编程',
                    link: '/Zhufeng/Es6/1_Async'
                }, ]
            },

        ]
    },
    {
        text: '混合开发',
        items: [
            // { text: 'apicloud', items: [
            //     { text: 'apicloud学习', link: '/HybridApp/' },
            //     { text: 'apicloud踩坑', link: '/HybridApp/' },
            // ]},
            {
                text: 'Dcloud',
                items: [{
                        text: 'uni-app',
                        link: '/HybridApp/Dclound/uni-app/初识uni-app/'
                    },
                    {
                        text: 'Dcloud实战',
                        link: '/HybridApp/Dclound/DcloudAction/超英电影预热项目/'
                    },
                    {
                        text: 'Dcloud踩坑',
                        link: '/HybridApp/Dclound/DcloudPit/'
                    },
                ]
            },
        ]
    },
    {
        text: '其他综合',
        items: [{
                text: '开发环境',
                items: [{
                        text: 'nvm/nrm',
                        link: '/Others/devEnvironment/nvmnrm/'
                    },
                    {
                        text: 'nodeJs',
                        link: '/Others/devEnvironment/nodejs/'
                    },
                ]
            },
            {
                text: '开发工具',
                items: [{
                        text: 'VScode',
                        link: '/Others/devTool/VScode/'
                    },
                    {
                        text: 'WebStorm',
                        link: '/Others/devTool/WebStorm/'
                    },
                ]
            },
            {
                text: '博客',
                items: [{
                        text: 'hexo',
                        link: '/Others/Blog/Hexo/'
                    },
                    {
                        text: 'VuePress',
                        link: '/Others/Blog/VuePress/vuepress基础搭建/'
                    },
                ]
            },
            {
                text: '模拟数据',
                items: [{
                    text: 'mockjs',
                    link: '/Others/analogData/mock/easy-mock本地部署过程/'
                }, ]
            },
            {
                text: 'git相关',
                items: [{
                    text: 'git学习',
                    link: '/Others/Git/git基础'
                }, ]
            },
        ]
    },
    {
        text: '关于',
        items: [{
                text: '关于我',
                items: [{
                    text: '个人介绍',
                    link: '/About/SelfIntroduction/'
                }, ]
            },
            {
                text: '个人简历',
                items: [{
                    text: '简历',
                    link: '/About/CurriculumVitae/'
                }]
            }
        ]
    }
]