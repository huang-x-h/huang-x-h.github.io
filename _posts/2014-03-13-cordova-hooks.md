---
layout: post
comments: true
title: Cordova钩子
date: 2014-03-13 11:20:06 
last_modify_date: 2014-03-15 22:50:14 
categories: cordova
tags: cordova
---

在上一篇Cordova设置应用图标和启动画面那篇中，虽然按照官方的文档设置了，但是没有起效，因为cordova内部没有实现这个功能，参看[Apache Cordova / CB-6108](https://issues.apache.org/jira/browse/CB-6108)

这时可以使用cordova的钩子来实现这个功能，实现脚本参看[Three hooks your Cordova/PhoneGap project needs](http://devgirl.org/2013/11/12/three-hooks-your-cordovaphonegap-project-needs/)

分析其处理icon和screen的截取针对Android的脚本代码

	#!/usr/bin/env node
	var fs = require('fs');
	var path = require('path');
	var rootdir = process.argv[2];
	var filestocopy = [
	    {
	      "www/res/icons/android/icon-48-mdpi.png": "platforms/android/res/drawable/icon.png"
	    },
	    {
	      "www/res/icons/android/icon-36-ldpi.png": "platforms/android/res/drawable-hdpi/icon.png"
	    },
	    {
	      "www/res/icons/android/icon-48-mdpi.png": "platforms/android/res/drawable-ldpi/icon.png"
	    },
	    {
	      "www/res/icons/android/icon-72-hdpi.png": "platforms/android/res/drawable-mdpi/icon.png"
	    },
	    {
	      "www/res/icons/android/icon-96-xhdpi.png": "platforms/android/res/drawable-xhdpi/icon.png"
	    },
	    {
	      "www/res/screens/android/screen-mdpi-portrait.png": "platforms/android/res/drawable/screen.png"
	    },
	    {
	      "www/res/screens/android/screen-hdpi-portrait.png": "platforms/android/res/drawable-hdpi/screen.png"
	    },
	    {
	      "www/res/screens/android/screen-ldpi-portrait.png": "platforms/android/res/drawable-mdpi/screen.png"
	    },
	    {
	      "www/res/screens/android/screen-mdpi-portrait.png": "platforms/android/res/drawable-xhdpi/screen.png"
	    },
	    {
	      "www/res/screens/android/screen-xhdpi-portrait.png": "platforms/android/res/drawable-xhdpi/screen.png"
	    }
	  ];
	
	filestocopy.forEach(function (obj) {
	  Object.keys(obj).forEach(function (key) {
	    var val = obj[key];
	    var srcfile = path.join(rootdir, key);
	    var destfile = path.join(rootdir, val);
	
	    if (key.indexOf('android') != -1) {
	      if (fs.existsSync(srcfile)) {
	        fs.createReadStream(srcfile).pipe(fs.createWriteStream(destfile));
	      }
	    }
	  });
	});

第一行指定脚本用node执行

第四行直接调用process.argv[2]获取工程的根目录，为什么呢？可以参看`cordova-cli/src/hookers.js`中`function execute_scripts_serially(scripts, root, dir, opts)`函数和`cordova-cli/src/superspawn.js`d的`spawn`方法

后面就只执行文件读写拷贝了。

以下是针对cordova钩子的一些介绍


## 钩子目录结构 ##

hooks目录下有以下子目录

	after_build/
    after_compile/
    after_docs/
    after_emulate/
    after_platform_add/
    after_platform_rm/
    after_platform_ls/
    after_plugin_add/
    after_plugin_ls/
    after_plugin_rm/
    after_plugin_search/
    after_prepare/
    after_run/
    after_serve/
    before_build/
    before_compile/
    before_docs/
    before_emulate/
    before_platform_add/
    before_platform_rm/
    before_platform_ls/
    before_plugin_add/
    before_plugin_ls/
    before_plugin_rm/
    before_plugin_search/
    before_prepare/
    before_run/
    before_serve/
    pre_package/ <-- Windows 8 and Windows Phone only.

在写执行脚本可以通过以数字开头来进行由小到大的顺序调用控制，内部实现代码在[cordova-cli/src/hooker.js](https://github.com/apache/cordova-cli/blob/master/src/hooker.js)：

	function compareNumbers(a, b) {
	    return isNaN (parseInt(a))
	        ? a.toLowerCase().localeCompare(b.toLowerCase ? b.toLowerCase(): b)
	        : parseInt(a) > parseInt(b) ? 1 : parseInt(a) < parseInt(b) ? -1 : 0;
	}
