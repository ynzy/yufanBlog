const secretKeyConf = require('./secretKeyConf')
module.exports = {
    '@vuepress/back-to-top': true,
    '@vuepress/pwa': {
        serviceWorker: true,
        updatePopup: {
          message: "发现新内容可用.",
          buttonText: "刷新"
        }
    },
    '@vuepress/google-analytics':{
        'ga': secretKeyConf.ga
    }
}