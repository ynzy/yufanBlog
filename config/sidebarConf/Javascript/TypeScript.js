const utils = require('../../../utils/index');
const children = ['什么是TypeScript','原始数据类型','任意值','类型推论','联合类型',
'对象的类型——接口','数组的类型','函数的类型','类型断言','声明文件','内置对象',
'进阶','类','类与接口','泛型','声明合并'
]
module.exports =[
    utils.genSidebar('Typescript学习', children, false ),
];
