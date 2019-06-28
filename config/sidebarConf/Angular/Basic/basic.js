const utils = require('../../../../utils/index');
const children = ['创建应用', '创建组件及模板','angular表单',
'案例todoList','案例京东app搜索缓存数据功能','Dom 操作以及@ViewChild',
'组件通信','生命周期函数','异步获取数据Rxjs基础使用',
'Angular数据交互','路由和导航','案例无人点餐系统',
'自定义模块','路由模块懒加载','AntDesign框架使用','富文本插件ngx-quill']
module.exports =[
    utils.genSidebar('构建应用基础', children, false ),
];
