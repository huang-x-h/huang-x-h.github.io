---
layout: post
comments: true
title: Sencha Touch协同Cordova构建开发Android应用
date: 2014-03-20 14:12:02 
last_modify_date: 2014-03-20 15:44:29 
categories: cordova sencha
tags: cordova sencha
---

准备环境：

- Windows7
- JDK 7
- NodeJS
- Cordova
- [Ruby1.9.3](http://rubyinstaller.org/)
- [Sencha Cmd](http://www.sencha.com/products/sencha-cmd/)
- Android SDK Tools

下载安装Sencha Cmd，在命令行输入`sencha help`，返回信息表示安装成功。


1. 创建应用 

		sencha -sdk /path/to/SenchaTouch generate app MyApp /path/to/MyApp

	`/path/to/SenchaTouch` 指定SenchaTouch路径

	`MyApp` 指定应用名称

	`/path/to/MyApp` 指定创建目录名称

	这时SenchCmd会生成一个种子工程，包含所需要的文件，如图

	![](/images/posts/sencha-seed.png)

	具体目录和文件含义，摘自于http://docs.sencha.com/touch/2.3.1/#!/guide/command_app
	
		.sencha/                # Sencha-specific files (for example configuration)
		    app/                # Application-specific content
		        sencha.cfg      # Configuration file for Sencha Cmd
		        plugin.xml      # Plugin for Sencha Cmd
		    workspace/          # Workspace-specific content (see below)
		        sencha.cfg      # Configuration file for Sencha Cmd
		        plugin.xml      # Plugin for Sencha Cmd
		
		touch/                  # A copy of the Sencha Touch SDK
		    cmd/                # Sencha Touch-specific content for Sencha Cmd
		        sencha.cfg      # Configuration file for Sencha Cmd
		        plugin.xml      # Plugin for Sencha Cmd
		    src/                # The Sench Touch source
		    sencha-touch-*.js   # Pre-compiled and bootstrap files
		    ...
		
		app                     # Your application's source code in MVC structure
		    controller
		    model
		    profile
		    store
		    view
		        Main.js         # The main view of the application
		
		resources
		    css
		        app.css         # The main stylesheet, compiled from app.scss
		
		    sass
		        app.scss        # The Sass file which compiles to app.css above,
		                        # includes Sencha Touch theme by default
		
		    icons               # Application icons for all mobile devices
		                        # When replacing these default images with your own,
		                        # make sure the file name and the dimension stays exactly the same
		        ...
		    loading             # Application start-up screens for iOS devices
		                        # Similarly to icons, make sure the file names and
		                        # dimension stays the same
		        ...
		    images              # Put other images used by your application here
		
		index.html
		app.js                  # Contains application's initialization logic
		app.json                # Application descriptor
		packager.json           # Configuration for native packaging

2. cordova初始化

	在初始化cordova之前需要修改SechaCmd一个配置文件 `/path/SenchaCmd/Sencha/Cmd/4.0.2.67/extensions/cmd-cordova-packager/cmd-cordova-packager.plugin.xml`

	在文件135行中，原先是 `<copy file="${app.cordova.www.dir}/config.xml" todir="${app.dir}"/>` 修改为 `<copy file="${app.cordova.dir}/config.xml" todir="${app.dir}"/>`

	相应Bug描述可参考 [Sencha Cmd Cordova init problem](http://www.sencha.com/forum/showthread.php?281298-Sencha-Cmd-Cordova-init-problem)

	切换到应用目录下
	
		cd /path/to/MyApp
		sencha cordova init [AppID]

	`AppID` 指的是包名路径，如下显示
	
		Sencha Cmd v4.0.2.67
		[INF] 
		[INF] sencha-cordova-init:
		[INF] 
		[INF] init-cordova:
		[INF]      [echo] Adding Cordova to Application
		[INF]      [echo] Adding Cordova template files
		[INF]      [echo] Adding Native properties
		[INF] [x-property-file] Updating property file: /path/to/MyApp\.sencha\app\native.properties
		[INF] [x-property-file] Updating property file: /path/to/MyApp\.sencha\app\build.properties
		[INF]      [echo] Patching build.xml for Cordova Support
		[INF]      [echo] Building Cordova App
		[INF] [shellscript] 
		[INF] [shellscript] /path/to/MyApp>cordova create "/path/to/MyApp/cordova" com.littlebean LittleBean 
		[INF] [shellscript] Creating a new cordova project with name "LittleBean" and id "com.littlebean" at location "/path/to/MyApp\cordova"
		[INF]      [echo] Adding Cordova config.xml to App
		[INF]      [copy] Copying 1 file to /path/to/MyApp
		[INF]      [echo] Adding cordova.js to app.json
		[INF]      [echo] Adding config.xml to Resources in app.json
		


	默认创建的是ios，这时需要修改`cordova.local.properties`文件内容
	
		cordova.platforms=android

3. 打包应用 
	
		sencha app build native

	这时Sencha Cmd会进行编译sass样式文件，打包压缩js文件到cordova目录下，在使用cordova来编译生成apk应用

额外介绍

`sencha web start` 启动一个简单http服务器，查看官方Sench Touch的示例时，可以在根目录下运行此命令，即可通过 `http://localhost:1841/examples/kitchensink/index.html` 来访问示例应用

	Sencha Cmd v4.0.2.67
	[INF] Starting shutdown listener socket
	[INF] Listening for stop requests on: 61195
	[INF] Mapping http://localhost:1841/ to ....
	[INF] Starting http://localhost:1841
	[INF] jetty-8.1.7.v20120910
	[INF] NO JSP Support for /, did not find org.apache.jasper.servlet.JspServlet
	[INF] started o.e.j.w.WebAppContext{/,file:/path/sencha/touch-2.3.1/}
	[INF] started o.e.j.w.WebAppContext{/,file:/path/sencha/touch-2.3.1/}
	[INF] Started SelectChannelConnector@0.0.0.0:1841


`sencha app upgrade` 用于当应用使用旧版本的Sencha Cmd编译生成时，使用新的Sencha Cmd编译，需要先运行此命令应用升级

> 参考链接
> 
> [Introduction to Sencha Cmd](http://docs.sencha.com/touch/2.3.1/#!/guide/command)