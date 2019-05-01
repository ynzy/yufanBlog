---
title: 记一次gitHub+hexo+hexo-theme-matery搭建博客
date: 2019-01-12 14:29:31
author: 张勇
# img: http://pl7h7g4ko.bkt.clouddn.com/18699405_p0.jpg
top: true
categories: 博客
tags: [hexo,博客,]        #tag，为文章添加标签，方便搜索
---

![壁纸](http://pl7h7g4ko.bkt.clouddn.com/18699405_p0.jpg ''壁纸'')

# 简述

一天多的时间使用hexo搭建github-pages博客，采用了 [hexo-theme-matery](https://blinkfox.github.io/)主题，总结一下。
<a href="https://blinkfox.github.io/" target="_blank">闪烁之狐</a>

### 1、安装Hexo
```
     $ npm install -g hexo
```
##### 如果觉得安装的比较慢，可以使用cnpm
```
    $ cnpm install -g hexo
```
### 2、部署Hexo
```
    $ hexo init
```
##### 注：这个命令会初始化博客的目录，所以，执行这个命令时，在你想创建的目录下执行，就自动生成到对应目录下。

执行命令生，会在当前命令的路径下，生成以下文件：
```
    .
    ├── .deploy         //执行hexo deploy命令部署到GitHub上的内容目录
    ├── public          //执行hexo generate命令，输出的静态网页内容目录
    ├── scaffolds      //layout模板文件目录，其中的md文件可以添加编辑
    ├── scripts        //扩展脚本目录，这里可以自定义一些javascript脚本
    ├── source         //文章源码目录，该目录下的markdown和html文件均会被hexo处理。该页面对应repo的根目录，404文件、favicon.ico文件，CNAME文件等都应该放这里，该目录下可新建页面目录。  
    |   ├── _drafts    //草稿文章
    |   └── _posts     //发布文章
    ├── themes          //主题文件目录
    ├── _config.yml     //全局配置文件，大多数的设置都在这里
    └── package.json     //应用程序数据，指明hexo的版本等信息
```
### 3、Hexo命令
Hexo下，通过 _config.yml 设置博客，可以想象成我们用的软件里的设置一样，只是它通过一个文件列出这些参数，然后让我们填写和修改。
- 全局设置
在你博客目录下有一个文件名_config.yml，打开可以配置信息。
- 局部设置
在你博客目录下 \\themes\\你使用的主题\\_config.yml
- 写博客相关命令
```
    Hexo常用命令：

    hexo new "postName"       #新建文章
    hexo new page "pageName"  #新建页面
    hexo generate             #生成静态页面至public目录
    hexo server               #开启预览访问端口（默认端口4000，'ctrl + c'关闭server）
    hexo deploy               #将.deploy目录部署到GitHub
```
当然，如果每次输入那么长命令，那么一定想到用简写：
```
    hexo n == hexo new
    hexo g == hexo generate
    hexo s == hexo server
    hexo d == hexo deploy
```
其它的，还可以*复合命令*：
```
    # 生成完毕后自动部署网站,两个命令的作用是相同的
    $ hexo g -d
    $ hexo d -g
```
有时候生成的网页出错了，而生成的rss其实没有清除，那么用下面的命令，在重新生成吧
```
    $ hexo clean
```
当本地调试出现诡异现象时候，请先使用 hexo clean 清理已经生成的静态文件后重试。

>注：Hexo原理就是hexo在执行hexo generate时会在本地先把博客生成的一套静态站点放到public文件夹中，在执行hexo deploy时将其复制到.deploy文件夹中。Github的版本库通常建议同时附上README.md说明文件,但是hexo默认情况下会把所有md文件解析成html文件，所以即使你在线生成了README.md，它也会在你下一次部署时被删去。怎么解决呢？
在执行hexo deploy前把在本地写好的README.md文件复制到.deploy文件夹中，再去执行hexo deploy。

### 4、博客管理

上面命令中，其实生成文章，可以直接把写好的文章插入到目录/_posts 下面，后缀为.MD就行，在文章头部固定格式：
```
    title: Mac提高使用效率的一些方法   #文章的标题，这个才是显示的文章标题，其实文件名不影响
    date: 2015-09-01 20:33:26      #用命令会自动生成，也可以自己写，所以文章时间可以改
    categories: technology         #文章的分类，这个可以自己定义
    tags: [Mac,效率,快捷方式]        #tag，为文章添加标签，方便搜索
    ---
```
当然，里面有很多东西的，如果你专注于写作，那么可以不用太关心了，比如tags标签可以写成下面那样，因为hexo文章的头部文件是用AML来写的。
```
tags:
    - tag1
    - tag2
```
如果在博客文章列表中，不想全文显示，可以增加 , 后面的内容就不会显示在列表。
`<!--more-->`
我使用的[hexo-theme-matery]主题默认有缩略，可以不用加这个代码
### 5、插件
- 安装插件
```
    $ npm install <plugin-name> --save
```

- 萌萌哒插件-[参考链接](https://www.simon96.online/2018/10/12/hexo-tutorial/)
  1.安装插件
  ```
  npm install --save hexo-helper-live2d
  ```
  2.复制你喜欢的模型的名字，例如nipsilon
  3.将以下代码添加到主题配置文件`_config.yml`，修改<你喜欢的模型名字>：
  ```
  live2d:
  enable: true
  scriptFrom: local
  pluginRootPath: live2dw/
  pluginJsPath: lib/
  pluginModelPath: assets/
  tagMode: false
  log: false
  model:
    use: live2d-widget-model-<你喜欢的模型名字>
  display:
    position: right
    width: 150
    height: 300
  mobile:
    show: true
    ```

>参考链接：
[Hexo中文官网](https://hexo.io/zh-cn/)
[bilibili周三Josan](https://space.bilibili.com/362224537?spm_id_from=333.788.b_765f7570696e666f.1)
[闪烁之狐主题](https://github.com/blinkfox/hexo-theme-matery)
[博客-遇见西门](https://www.simon96.online/2018/10/12/hexo-tutorial/)