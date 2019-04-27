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