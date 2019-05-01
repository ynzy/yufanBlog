---
title: nvm版本管理和nrm下载源管理
---

#  一、NVM 介绍
我们可能同时在进行2个 项目，而2个不同的项目所使用的node版本又是不一样的，或者是要用更新的node版本进行试验和学习。这种情况下，对于维护多个版本的node将会是一件非常麻烦的事情，而nvm就是为解决这个问题而产生的，他可以方便的在同一台设备上进行多个node版本之间切换，而这个正是nvm的价值所在，详情可以查看官网[NVM官网](https://github.com/creationix/nvm)。
#  二、NVM 安装
## 1.nvm 下载
首先，如果已经安装过了 node，一定要卸载干净，如果不可以就要重装系统了（说多了都是泪，自己也是遇到了 node 版本问题才开始研究 nvm 的）
直接进入安装包下载地址：[https://github.com/coreybutler/nvm-windows/releases](https://github.com/coreybutler/nvm-windows/releases)，选择nvm-setup.zip，下载后直接安装。
![1](https://upload-images.jianshu.io/upload_images/9989643-782fc61e7d13d273.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/495/format/webp)
![1](https://upload-images.jianshu.io/upload_images/9989643-7a8d4831b2ea94c6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/497/format/webp)
## 2.配置环境变量
![1](https://upload-images.jianshu.io/upload_images/9989643-5f50d9e75945e9aa.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000/format/webp)
## 3.验证是否安装成功
 打开命令行，执行nvm -v命令后，出现一下类似的提示说明安装成功。
 ![1](https://upload-images.jianshu.io/upload_images/9989643-c02e5e0a20388757.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/981/format/webp)
 ## 4.安装 nodejs
  使用`nvm install <version> [<arch>]`命令下载需要的版本。`arch`参数表示系统位数，默认是64位，如果是32位操作系统，需要执行命令：nvm install 6.9.0 32，出现下图表示安装完成：
  ![1](https://upload-images.jianshu.io/upload_images/9989643-1621e43a07b1180c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/879/format/webp)
  ##   5.使用特定版本的 nodejs
 执行`nvm use <version> [<arch>]` 命令开始使用特定版本。比如：nvm use 6.9.0或者nvm use 6.9.0 32
    ![](https://upload-images.jianshu.io/upload_images/9989643-acade8e959fc6416.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/801/format/webp)
##  6.测试版本的切换
刚刚下载了node 6.9.0版本并且成功使用，现在我们下载一个6.10.3版本，然后切换并使用。
![1](https://upload-images.jianshu.io/upload_images/9989643-18d1e1c29f5ed073.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/747/format/webp)
## 7.nvm ls 查看已经安装的版本
![1](https://upload-images.jianshu.io/upload_images/2793567-e3e91b29a53dfa47.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/305/format/webp)
*default nvm 默认使用的版本*   node和stable 当前安装的node的最新的稳定版本*   iojs iojs的最新稳定版本*   lts/* node lts 系列最新的稳定版本*   lts/argon,lts/boron,lts/carbon分别指lts的三个大的版本的最新版本

此时 NVM 已经安装完成正常使用
## 三、nrm 介绍
　开发的npm registry 管理工具 [nrm](https://github.com/Pana/nrm), 能够查看和切换当前使用的registry, 最近NPM经常 down 掉, 这个还是很有用的哈哈
顾名思义，就是说nrm是一个管理npm的工具
# 四、nrm 安装使用
# 1.安装 nrm

```
$ npm install -g nrm
```
# 2.nrm命令
_$_ nrm ls　　// 查看所有的支持源（有*号的表示当前所使用的源,以下[name]表示源的名称）

$ nrm use [name]　　// 将npm下载源切换成指定的源

$ nrm help　　// 查看nrm帮助

$ nrm home [name]　　// 跳转到指定源的官网

如果在你的网络不太理想或者在不能FQ的情况下，又或者收到其他网络限制导致不能使用npm原本的源进行下载时nrm就非常有用了，你只需要
  $ nrm ls
![1](http://wx1.sinaimg.cn/mw690/006jw4xkly1g02ve0u53kj30fm09ewej.jpg)
$ nrm use [name]
![1](http://wx3.sinaimg.cn/mw690/006jw4xkly1g02ve4pyfoj30cp03y0sn.jpg)
即可轻松使用npm进行下载自己所需要的包及工具了。






