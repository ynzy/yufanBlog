const utils = require('../../../../utils/index');
const children = ['let和const命令', '变量的解构赋值','字符串的扩展',
'函数的扩展','对象的扩展','对象的新增方法','Symbol','Set和Map数据结构',
'Proxy','Promise对象','Iterator和for...of循环','Generator函数的语法',
'Generator函数的异步应用','async函数','Class的基本语法','Class的继承',
'Module的语法','Module的加载实现','编程风格','读懂ECMAScript规格','装饰器',

]
module.exports =[
    utils.genSidebar('ECMAScript6学习', children, false ),
];
