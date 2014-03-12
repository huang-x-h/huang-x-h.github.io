---
layout: post
comments: true
title: Cordova开发设置应用图标和启动画面
date: 2014-03-12 22:29:13
categories: android
tags: android cordova
---

# 配置应用图标 #

----------
在cordova创建的工程中，图标的目录是在`www/res/icons`

Android平台图标分为低、中、高和超高四种图标大小，命名如下

	android/icon-36-ldpi.png
    android/icon-48-mdpi.png
    android/icon-72-hdpi.png
    android/icon-96-xhdpi.png

iOS平台图标分为72px for iPads和57px for iPhone以及对应双倍大小，命名如下

	ios/icon-57-2x.png
    ios/icon-57.png
    ios/icon-72-2x.png
    ios/icon-72.png

# 配置启动画面 #

----------
启动页面的目录是在`www/res/screens`

Android平台纵向(portrait)和横向(landscape)启动图片(低、中、高和超高)定义如下：

	android/screen-hdpi-landscape.png
    android/screen-hdpi-portrait.png
    android/screen-ldpi-landscape.png
    android/screen-ldpi-portrait.png
    android/screen-mdpi-landscape.png
    android/screen-mdpi-portrait.png
    android/screen-xhdpi-landscape.png
    android/screen-xhdpi-portrait.png

图片大小定义：

- xlarge (xhdpi): 至少 960 × 720
- large (hdpi): 至少 640 × 480
- medium (mdpi): 至少 470 × 320
- small (ldpi): 至少 426 × 320

iOS平台相同分为iPhone/iPod和iPad，启动图片定义如下：

	ios/screen-ipad-landscape-2x.png
    ios/screen-ipad-landscape.png
    ios/screen-ipad-portrait-2x.png
    ios/screen-ipad-portrait.png
    ios/screen-iphone-landscape-2x.png
    ios/screen-iphone-landscape.png
    ios/screen-iphone-portrait-2x.png
    ios/screen-iphone-portrait.png
    ios/screen-iphone-portrait-568h-2x.png

568h的文件是应用于iPhone5及更高屏幕

# Android平台启动页面配置 #

----------
修改工程`config.xml`文件，添加如下选项

	<preference name="SplashScreen" value="screen" />
	<preference name="SplashScreenDelay" value="10000" />

第一行配置启动画面文件名称，默认是screen，表示访问`platforms/android/res/drawable*/screen.png`

第二行配置启动画面显示停留时间，默认是3000ms

最后为了更好的用户体验，应用页面应该添加监听`deviceready`事件调用`navigator.splashscreen.hide()`来移除启动画面。需要安装`SplashScreen`插件才可以进行调用

	cordova plugin add org.apache.cordova.splashscreen

> 参考链接：
> 
> [Icons and Splash Screens](http://cordova.apache.org/docs/en/3.4.0/config_ref_images.md.html#Icons%20and%20Splash%20Screens)
> 
> [cordova plugin](http://plugins.cordova.io/)