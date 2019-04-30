const CurriculumVitae = require('./About/CurriculumVitae/index');
const SelfIntroduction = require('./About/SelfIntroduction/index');

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


const VuePit = require('./Vue/VuePit/index');





module.exports = {
    //关于我
    '/About/CurriculumVitae/': CurriculumVitae,
    '/About/SelfIntroduction/': SelfIntroduction,
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
    //vue踩坑
    '/Vue/VuePit/': VuePit,


    
    // '/about':about
    // '/': ['']
};