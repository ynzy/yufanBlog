---
title: vue项目如何部署在后台服务器上
date: 2019-04-24 22:04:37
categories: 项目部署
tags: [Vue]
---

# 简述
* vue项目打包后发给后台部署到后台服务器上，出现了很多问题，在此做一些总结
* 环境
  * 前台：build打包后的dist文件夹
  * 后台：jetty服务器
## 遇到的问题
1. 后台问访问地址是什么
* 什么是访问地址
  * 一般访问地址构成：ip+端口号+项目名+html文件名(192.168.0.11:8080/projectName/index.html)
* 一般服务器要放多个项目，不会在服务器根路径存放文件，所以会创建一个文件夹，对应项目名称
* 一般前台build打包之后的是没有配置访问地址的，那么默认的访问地址是后台服务器的本机地址,也就是服务器地址+端口号+静态根路径(项目名)+html名
![服务器文件路径](https://upload-images.jianshu.io/upload_images/13505073-08254b4229215281.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
1. dist文件部署之后无法正常访问
* 前端文件放到服务器之后出现无法找到资源文件的问题，开始认为是前台没有配置项目名称导致找不到资源，对前端配置做了更改
  * vue2.0`config-index.js`中build配置项`assetsRoot`默认为打包文件到当前路径下的dist文件，修改为了

```js
index: path.resolve(__dirname, '../dist/projectNmae/index.html'),
// Paths
assetsRoot: path.resolve(__dirname, '../projectNmae/dist'),
assetsSubDirectory: 'static',
assetsPublicPath: './',
```
  * build之后，文件统一放在了`dist/projectNmae`文件夹中，以为projectName就是项目文件名
* 尝试之后并非如此，后台的jetty服务器有项目文件夹有一个对应的配置文件
![项目文件夹对应的配置文件.png](https://upload-images.jianshu.io/upload_images/13505073-72212abf74aec053.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE Configure PUBLIC "-//Jetty//Configure//EN" "http://www.eclipse.org/jetty/configure_9_3.dtd">
<Configure class="org.eclipse.jetty.webapp.WebAppContext">
<!-- 这里对应的才是访问地址的项目名称 -->
	<Set name="contextPath">/ProjectName</Set>
    <!-- 这里配置项不清楚，但也配成了一样的 -->
	<Set name="war"><Property name="jetty.webapps" default="."/>/ProjectName</Set>
</Configure>
```

* 后台修改之后启动可以访问到，由于前台项目本身的一些缺陷，正常访问之后被莫名拦截了，未能正常跳转到login页面，所以在跳转login页面的路由上加上了项目名称，`window.location.href="project/#/login";`
* 最后项目部署访问成功