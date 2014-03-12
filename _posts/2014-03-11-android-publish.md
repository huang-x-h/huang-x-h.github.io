---
layout: post
title: Window下Cordova构建Android应用发布
date: 2014-03-11 22:29:13
categories: android
tags: android cordova
---

# 发布Android应用 #



1. 首先修改`AndroidManifest.xml`文件(位于platforms/android目录下)

	修改`android:debuggable`值为`false`或者直接删除掉改属性，如下

		ndroid:icon="@drawable/icon" android:label="@string/app_name">

	再使用cordova命令生成发布版本

	$ cordova build --release android

	然后在`platforms/android/ant-build`目录下能看到未签名的APK文件，例如`platforms/android/ant-build/HelloWorld-release-unsigned.apk`。

2.	APK文件签名,如果你已经有签名密钥则可以跳过这一步

	使用JDK的`keytool`命令生成签名密钥

		$ keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000

	备注：确保密钥放置安全，如果丢失了就不能提交更新应用

	使用JDK的`jarsigner`命令签名APK

		$ jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore HelloWorld-release-unsigned.apk alias_name

3.	最后使用`zipaling`工具(由AndroidSDK提供)进行优化APK

		$ zipalign -v 4 HelloWorld-release-unsigned.apk HelloWorld.apk

关于第二步文件签名可以整合到cordova编译里

首先在`platforms/android`目录下新增`ant.properties`文件，添加如下定义

	key.store=E:/developertools/huangxinghui.keystore
	key.alias=huangxinghui

指定密钥存储地方和名称

然后在执行`cordova build --release android`就可以生成已签名APK，例如`platforms\android\ant-build\**-release.apk`

> 参考链接：
> 
> [http://ionicframework.com/docs/guide/publishing.html](http://ionicframework.com/docs/guide/publishing.html)
> 
> [http://developer.android.com/tools/publishing/publishing_overview.html](http://developer.android.com/tools/publishing/publishing_overview.html)