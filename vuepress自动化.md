
# 自动化方案
---
## 1.获取对应目录下的文件名
这是一个初步应急的方案，对应 [视频] 地址
创建 `utils/getFilenames.js` 方法：
```js
/**
 * 该文件用于获取一个目录下的所有文件名
 * 2019-4-24 手动获取某个目录下的所有文件名
 * example:  node utils/getFilenames.js
 */
const { readdir, writeFile} = require('fs');
const { resolve } = require('path');

const FOLDERPATH = '/githubBlog/VuePressBlog/docs/about';

//读取文件操作
readdir(FOLDERPATH, (err, files) => {
    let filenames = [];
    //遍历文件名，文件名为README命名为空,其余添加到文件名数组中
    files.forEach(file => {
        if (file === 'README.md') {
            file = `''`;
        } else {
            file = file.replace('.md', ''); //替换文件后缀为空
            file = `'${file}'`;
        }
        filenames.unshift(file)
    });

    //写入操作
    writeFile(resolve(__dirname, './filenames.js'), `[${filenames}]`, () => {
        console.log('文件名获取完成.');
    })
});
```
每次修改了对应的内容后获取该分类的路径，接着修改 FOLDERPATH ，再修改 package.json 文件：
```json
  "scripts": {
    "getname": "node utils/getFilenames.js"
  },
```
之后每次修改完路径后使用 npm run getname 即可获得结果，将数据放入对应的侧边栏配置中即可。

## 2.自动部署到 Github Pages
首先进入 [travis-ci](https://travis-ci.org/) 官网，将对应的项目启用 Travis CI ：