---
layout: post
title: Window下Cordova构建Android开发
date: 2014-03-04 22:29:13
categories: android
tags: android cordova
---

# 搭建Cordova环境 #

----------

- 设置JAVA_HOME，如图

![](/images/posts/javahome.png)

- 设置ANT_HOME，如图

![](/images/posts/anthome.png)

- 设置PATH指定安装Android SDK目录，如图

![](/images/posts/path.png)

- 指定SDK安装目录：
`;D:\Android\sdk\platform-tools;D:\Android\sdk\tools`

- 指定java和ant执行目录：`;%JAVA_HOME%\bin;%ANT_HOME%\bin`

- 下载安装[NodeJS](http://nodejs.org/)客户端，执行npm安装cordova

		$npm install -g cordova


# 使用Cordova构建 #

----------

## 创建应用 ##

在命令行下执行如下命令

	$ cordova create hello com.example.hello HelloWorld

第一个参数`hello`指定工程创建目录

第二个参数 `com.example.hello` 提供工程包名结构（反向域名风格），可选，默认是  `io.cordova.hellocordova`

第三个参数 `HelloWorld` 指定应用显示名称，可选，默认是 `HelloCordova`

## 添加平台 ##

在编译工程前，可以指定你所需要的支持的平台（如果要支持ios，则需要在mac上编译）

	$ cd hello
	$ cordova platform add android

运行 `cordova platform ls` 可以列出当前所有平台信息

也可以运行 `cordova platform rm android` 删除指定平台

## 编译应用 ##


	$ cordova build

执行编译生成特定平台工程代码，也可以使用 `cordova build android` 指定编译某个平台

## 测试应用 ##

编译成功后，可运行进行在模拟机或者设备上进行测试

	$ cordova emulate android

运行成功如图

![](/images/posts/emulate.png)

执行如下命令运行到设备中，确保设备打开USB开发者调试功能

	$ cordova run android



# Android SDK修改 #

----------

使用cordova创建的应用可使用Eclipse打开进行修改Android SDK

打开ADT（Android Developer Tools）开发工具，导入工程，如图

![](/images/posts/import.png)

导入成功会有两个工程`hello`和`heelo-Cordovalib`，如图

![](/images/posts/project.png)

然后在Eclipse里进行选择SDK版本编译




> 参考文档：
> 
> [http://cordova.apache.org/docs/en/3.4.0/index.html](http://cordova.apache.org/docs/en/3.4.0/index.html)
> [http://cordova.apache.org](http://cordova.apache.org)
