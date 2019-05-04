---
title: 'easy-mock本地部署过程'
date: 2019-03-13 21:53:32
author: 张勇
categories: 模拟数据
tags: [mock]
---

### 背景：

 easy-mock 是常用的mock数据网站， 但是随着用户越来越多，easy-mock的接口响应速度有点时候会很慢(也跟本地网络环境有关)，而且接口也不稳定，时不时就挂了。。。

### 需求： 

  公司里有一台专门搭建内网服务器的机子，供开发者使用，所以想把easy-mock部署到本地，这样接口的稳定性和响应速度得到了保证，而且对团队开发也很有帮助。

### 实施：

首先先看easy-mock本地部署的官方介绍，[https://github.com/easy-mock/easy-mock/blob/dev/README.zh-CN.md](https://github.com/easy-mock/easy-mock/blob/dev/README.zh-CN.md).官网介绍的步骤，大致分为以下几步：
1. 安装 node（>=v8.9） & MongoDB（>=v3.4） & Redis（>=v4.0）
2. 安装 easy-mock，更改配置文件
3. 启动 easy-mock，测试项目是否可以正常启动，能的话就可以先 Ctrl + C了
4. 启动 MongoDB 和 Redis
5. npm run build，然后用 PM2 启动 app.js

#### 1.先装node
这一步不多讲了，之前有一篇[nvm版本管理和nrm下载源管理](https://ynzy.github.io/2019/02/10/nvm%E7%89%88%E6%9C%AC%E7%AE%A1%E7%90%86%E5%92%8Cnrm%E4%B8%8B%E8%BD%BD%E6%BA%90%E7%AE%A1%E7%90%86/)讲到了如何安装管理node版本和npm下载源。我用的是8.15.0，已经放到公司服务器上，

#### 2.安装MongoDB

* 安装包: 百度链接：https://pan.baidu.com/s/1M7HhtTRW8fE1Oknb0o4TgA  提取码：kz8x 
* [win版MongoDB安装教程](http://baijiahao.baidu.com/s?id=1601512248926547477&wfr=spider&for=pc)
* MongoDB配置环境变量里面写的不清楚，我在这里重写下，

```
MONGO_HOME = C:\Program Files\MongoDB\Server\3.4\bin
Path = %MONGO_HOME%
```

* 推荐使用可视化工具管理数据库，清晰明了，我现找了一个，全是英文看不懂，但也能凑活用了，如果有更好的希望推荐下。
* 教程网址[Robo 3T,mongoDB可视化工具](https://www.jianshu.com/p/1194de9859d0)

#### 3.安装redis

* 可以直接从[https://redis.io/download](https://redis.io/download)下载安装包,解压到根目录下面的 opt 文件夹下， 可以根据自己的需求改动 redis.conf 文件，然后输入命令 redis-server，就可以正常启动 redis 了。上面的百度链接里面也有压缩包。

#### 4.安装easy-mock

* 最后要安装的就是 easy-mock，git clone 下来，然后 npm install，安装依赖，npm run dev启动项目，config/default.json 可以自定义的配置，当然不配置倒也没关系，easy-mock会自动使用 MongoDB 和 redis，不需要其他操作。easy-mock 会默认启动在 7300 下面，打开服务器的ip+port，查看 easy-mock 是否正常启动，正常启动了说明安装阶段大功告成！
* 自定义配置:在--config下创建local.json文件,

```
{
  "port": 7300, //easymock项目启动的端口
  "host": "0.0.0.0",
  "pageSize": 30,
  "proxy": false,
  "db": "mongodb://localhost/easy-mock", // 不需要自己新建数据库，在启动的easymock新建接口即可
  "unsplashClientId": "",
  "redis": {
    "port": 6379, //redis端口
    "host": "localhost"
  },
  "blackList": {
    "projects": [], // projectId，例："5a4495e16ef711102113e500"
    "ips": [] // ip，例："127.0.0.1"
  },
  "rateLimit": { // https://github.com/koajs/ratelimit
    "max": 1000,
    "duration": 1000
  },
  "jwt": {
    "expire": "14 days",
    "secret": "shared-secret"
  },
  "upload": {
    "types": [".jpg", ".jpeg", ".png", ".gif", ".json", ".yml", ".yaml"],
    "size": 5242880,
    "dir": "../public/upload",
    "expire": {
      "types": [".json", ".yml", ".yaml"],
      "day": -1
    }
  },
  "fe": {
    "copyright": "",
    "storageNamespace": "easy-mock_",
    "timeout": 25000,
    "publicPath": "/dist/"
  }
}
```

#### 5.部署阶段：

1. 全局安装pm2

```
npm install pm2 -g 
```

2. 编译easy-mock文件

```
npm run build
```

3. 启动

```
pm2 start app.js -i 4
```

4. 查看

```
pm2 list
```

5. 访问ip+port

```
http://192.168.1.6:7300
```

从此再也不用担心easy-mock官网不定时的崩掉了

#### 参考网址

[easy-mock 本地部署过程](https://www.jianshu.com/p/1650c2b9eec9)
[Easy Mock部署使用](https://my.oschina.net/guol/blog/1531704)
[使用pm2自动化部署node项目](http://www.cnblogs.com/lentoo/p/9539137.html)


