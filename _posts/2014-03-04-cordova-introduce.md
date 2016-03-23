---
layout: post
comments: true
title: Window下Cordova构建Android开发
tags: android cordova
---

# 搭建Cordova环境 #

----------

- 设置JAVA_HOME，如图

![](/assets/images/posts/javahome.png)

- 设置ANT_HOME，如图

![](/assets/images/posts/anthome.png)

- 设置PATH指定安装Android SDK目录，如图

![](/assets/images/posts/path.png)

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

工程创建成功时，工程目录结构如下：

	myApp/
	|-- config.xml
	|-- hooks/
	|-- merges/
	| | |-- android/
	| | |-- blackberry10/
	| | `-- ios/
	|-- www/
	|-- platforms/
	| |-- android/
	| |-- blackberry10/
	| `-- ios/
	`-- plugins/

- `hooks` 用于存放工程自定义执行脚本
- `merges` 该目录下的文件根据不同平台覆盖`www`里的内容，示例

		merges/
		|-- ios/
		| `-- app.js
		|-- android/
		| `-- android.js
		www/
		`-- app.js

- `www` 用于存放工程web应用内容，包含html/css/js等，在cordova的prepare阶段会拷贝到各个平台的www目录
- `platforms` 应用包含的平台本地应用目录
- `plugins` cordova插件目录
- `config.xml` 工程配置文件，原生模板文件内容如下：

		<?xml version="1.0" encoding="UTF-8"?>
		<widget xmlns     = "http://www.w3.org/ns/widgets"
		        xmlns:cdv = "http://cordova.apache.org/ns/1.0"
		        id        = "io.cordova.hellocordova"
		        version   = "0.0.1">
		    <name>Hello Cordova</name>
		
		    <description>
		        A sample Apache Cordova application that responds to the deviceready event.
		    </description>
		
		    <author href="http://cordova.io" email="dev@cordova.apache.org">
		        Apache Cordova Team
		    </author>
		
		    <content src="index.html" />
		
		    <access origin="*" />
		</widget>

	`name` 表示用户看到应用的名称

	`content` 应用启示页面

	`preference` 定义一些特性，比如常用的全屏 `<preference name="fullscreen" value="true" />`

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

![](/assets/images/posts/emulate.png)

执行如下命令运行到设备中，确保设备打开USB开发者调试功能

	$ cordova run android



# Android SDK修改 #

----------

使用cordova创建的应用可使用Eclipse打开进行修改Android SDK

打开ADT（Android Developer Tools）开发工具，导入工程，如图

![](/assets/images/posts/import.png)

导入成功会有两个工程`hello`和`heelo-Cordovalib`，如图

![](/assets/images/posts/project.png)

然后在Eclipse里进行选择SDK版本编译




> 参考文档：
> 
> [cordova-cli](https://github.com/apache/cordova-cli)
> 
> [http://cordova.apache.org/docs/en/3.4.0/index.html](http://cordova.apache.org/docs/en/3.4.0/index.html)
>  
> [http://cordova.apache.org](http://cordova.apache.org)
> 
> [https://developer.android.com/sdk/index.html](https://developer.android.com/sdk/index.html)
