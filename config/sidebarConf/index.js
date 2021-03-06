//关于
const CurriculumVitae = require('./About/CurriculumVitae/index');
const SelfIntroduction = require('./About/SelfIntroduction/index');
// javascript
const ECMAScript6 = require('./Javascript/ECMAScript6/ECMAScript6')
const TypeScript = require('./Javascript/TypeScript')
//Angular
const Basic = require('./Angular/Basic/basic');
const AngularAction = require('./Angular/AngularAction/tourismTodo');

//vue
const Introduce = require('./Vue/Basic/Introduce');
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
//珠峰架构学习笔记
const Prepare = require('./Zhufeng/Prepare')
const Es6 = require('./Zhufeng/Es6')

//其他
const VuePress = require('./Others/Blog/VuePress');
const Hexo = require('./Others/Blog/Hexo');
const nvmnrm = require('./Others/devEnvironment/nvmnrm');
const mock = require('./Others/analogData/mock');
const uniapp = require('./HybridApp/Dclound/uni-app');
const DcloudAction  = require('./HybridApp/Dclound/DcloudAction');
const Git = require('./Others/Git/Git');

const link = require('../link.js');

module.exports = {
    //关于我
    '/About/CurriculumVitae/': CurriculumVitae,
    '/About/SelfIntroduction/': SelfIntroduction,
    //javascript
    '/Javasctipt/ECMAScript6/': ECMAScript6,
    '/Javasctipt/TypeScript/': TypeScript,
    //Angular 基础
    '/Angular/Basic/': Basic,
    '/Angular/AngularAction/tourismTodo/':AngularAction,
    //vue基础
    '/Vue/Basic/Introduce/': Introduce,
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
    //珠峰架构学习笔记
    '/Zhufeng/Prepare/': Prepare,
    '/Zhufeng/Es6/': Es6,
    //混合开发
    '/HybridApp/Dclound/uni-app/': uniapp,
    '/HybridApp/Dclound/DcloudAction/': DcloudAction,
    //其他
    '/Others/Blog/Hexo/': Hexo,
    '/Others/Blog/VuePress/': VuePress,
    '/Others/devEnvironment/nvmnrm/': nvmnrm,
    '/Others/analogData/mock/': mock,
    '/Others/Git/': Git
    
    // '/about':about
    // '/': ['']
};