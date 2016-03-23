---
layout: post
comments: true
title: RequireJS请求模块路径后缀名问题
tags: javascript requirejs
---

今天在使用`RequireJS`被问到一个问题

同事使用`require`请求模块地址，写绝对路径和相对路径都不需要添加文件后缀名`.js`，后来自己验证，怎么都不行，仔细问了下，发现原来是他在`config`配置了`paths`映射。

仔细查看了相关代码`nameToUrl`方法内，说的很清楚

    req.jsExtRegExp = /^\/|:|\?|\.js$/; 
    ...
   
    //If a colon is in the URL, it indicates a protocol is used and it is just
    //an URL to a file, or if it starts with a slash, contains a query arg (i.e. ?)
    //or ends with .js, then assume the user meant to use an url and not a module id.
    //The slash is important for protocol-less URLs as well as full paths.
    if (req.jsExtRegExp.test(moduleName)) {
      //Just a plain path, not module name lookup, so just return it.
      //Add extension if it is included. This is a bit wonky, only non-.js things pass
      //an extension, this method probably needs to be reworked.
      url = moduleName + (ext || '');
    } else {
      ...

      //Join the path parts together, then figure out if baseUrl is needed.
      url = syms.join('/');
      url += (ext || (/^data\:|\?/.test(url) || skipExt ? '' : '.js'));
      url = (url.charAt(0) === '/' || url.match(/^[\w\+\.\-]+:/) ? '' : config.baseUrl) + url;
    }

- `require`请求相对路径模块，是可以不写`.js`，内部会自动添加
- `require`请求以有`:`,`/`打头,`.js`结尾的模块，是要添加后缀名的
- 而在`require.config`里配置`paths`时，这里写绝对路径模块，可以省略不用写

		require.config({
	      baseUrl: './',
	      paths: {
	        'resource': '/directory/resource'
	      }
	    });
	
	    require(['resource'], function (resource) {
	    });
		// 请求地址会转换为/directory/resource.js



