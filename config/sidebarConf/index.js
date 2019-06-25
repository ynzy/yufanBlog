//关于
const CurriculumVitae = require('./About/CurriculumVitae/index');
const SelfIntroduction = require('./About/SelfIntroduction/index');
//Angular
const Basic = require('./Angular/Basic/basic');

//vue
const BasicGrammar = require('./Vue/Basic/BasicGrammar');
const Computed = require('./Vue/Basic/Computed');
const FormModel = require('./Vue/Basic/FormModel');
const Component = require('./Vue/Basic/Component');
const CustomInstruction = require('./Vue/Basic/CustomInstruction');

const Advance = require('./Vue/Advance/index');
const RenderFaction = require('./Vue/Advance/RenderFaction');
const WebPack = require('./Vue/Advance/WebPack');
const VueRouter = require('./Vue/Advance/VueRouter');

const Vuex = require('./Vue/Advance/Vuex');

const VueAction = require('./Vue/VueAction/index');
const gushop = require('./Vue/VueAction/gushop');
const JFCitySelector = require('./Vue//VueAction/JFCitySelector.js');
const proProcess = require('./Vue//VueAction/proProcess');
const VuePit = require('./Vue/VuePit/index');
//其他
const VuePress = require('./Others/Blog/VuePress');
const Hexo = require('./Others/Blog/Hexo');
const nvmnrm = require('./Others/devEnvironment/nvmnrm');
const mock = require('./Others/analogData/mock');
const uniapp = require('./HybridApp/Dclound/uni-app');

const link = require('../link.js');
module.exports = {
    //关于我
    '/About/CurriculumVitae/': CurriculumVitae,
    '/About/SelfIntroduction/': SelfIntroduction,
    //Angular 基础
    '/Angular/Basic/': Basic,
    //vue基础
    '/Vue/Basic/BasicGrammar/': BasicGrammar,
    '/Vue/Basic/Computed/': Computed,
    '/Vue/Basic/FormModel/': FormModel,
    '/Vue/Basic/Component/': Component,
    '/Vue/Basic/CustomInstruction/': CustomInstruction,
    //vue进阶
    '/Vue/Advance/RenderFaction/': RenderFaction,
    '/Vue/Advance/WebPack/': WebPack,
    '/Vue/Advance/VueRouter/': VueRouter,
    '/Vue/Advance/Vuex/': Vuex,
    //vue实战
    '/Vue/VueAction/gushop/': gushop,
    '/Vue/VueAction/JFCitySelector/': JFCitySelector,
    '/Vue/VueAction/proProcess/': proProcess,
    //vue踩坑
    '/Vue/VuePit/': VuePit,
    //混合开发
    '/HybridApp/Dclound/uni-app/': uniapp,
    //其他
    '/Others/Blog/Hexo/': Hexo,
    '/Others/Blog/VuePress/': VuePress,
    '/Others/devEnvironment/nvmnrm/': nvmnrm,
    '/Others/analogData/mock/': mock

    
    // '/about':about
    // '/': ['']
};