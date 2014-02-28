---
layout: post
title: RequireJS笔记
date: 2014-02-20
categories: javascript
tags: requirejs
---

# RequireJS #

----------


RequireJS采用模块化定义,避免全局变量,实现[AMD](https://github.com/amdjs/amdjs-api/wiki/AMD)(Asynchronous Module Definition)异步模块加载

[CommonJS](http://wiki.commonjs.org/wiki/CommonJS) 是一个志于构建 JavaScript 生态圈的组织。

CommonJS和RequireJS的模块语法不一样

CommonJS模块定义

	define(function(require, exports, module) {
	  //Put traditional CommonJS module content here
	  var someModule = require("someModule");
	  var anotherModule = require("anotherModule");

	  exports.asplode = function() {
	    someModule.doTehAwesome();
	    anotherModule.doMoarAwesome();
	  };
	});

RequireJS模块定义

- 简单对象

		define({
		    color: "black",
		    size: "unisize"
		});

- 函数定义

		define(function () {
		    //Do setup work here
		
		    return {
		        color: "black",
		        size: "unisize"
		    }
		});

- 有依赖关系的函数定义

		define(["./cart", "./inventory"], function(cart, inventory) {
          //return an object to define the "my/shirt" module.
          return {
	        color: "blue",
	        size: "large",
	        addToCart: function() {
	          inventory.decrement(this);
	          cart.add(this);
	        }
          }
	    });

- 内置模块有三个 `require`, `exports`, `module`,可以书写成CommonJS模块定义格式，RequireJS加载会根据`Function.prototype.toString`正则匹配分析模块依赖和定义

# RequireJS语法 #

----------


三个全局函数`requirejs`,`require`,`define`; `requirejs`等同于`require`

- `requirejs`函数定义

		requirejs(
		  //依赖模块数组
		  ['dependency'],
		  //回调处理函数 
		  function (dependency) {}
		);
	

- `requirejs`加载javascript文件原理

		var head = document.getElementsByTagName('head')[0],
      	  script = document.createElement('script');
	
		script.src = url;
		head.appendChild(script);

- `define`函数定义

		define(
		  	//模块名称,建议不要自己定义
		    "types/Manager",
		
		    //依赖模块数组
		    ["types/Employee"],
		
		    //当所有依赖模块加载完毕执行处理函数，参数就是依赖的模块
		    function (Employee) {
		        function Manager () {
		            this.reports = [];
		        }
		
		        //This will now work
		        Manager.prototype = new Employee();
		
		        //return the Manager constructor function so it can be used by
		        //other modules.
		        return Manager;
		    }
		);

# RequireJS配置 #

----------


- `data-main` 属性，定义RequireJS启动脚本，main.js是**异步加载**

    `<script data-main="scripts/main.js" src="scripts/require.js"></script>`

	可以这里面定义baseUrl（根目录）和paths配置
	如果给的模块id包含如下字符，则不会采用baseUrl+paths的方式去加载模块

	> Ends in ".js".
	> 
	> Starts with a "/".
	> 
	> Contains an URL protocol, like "http:" or "https:".


- `baseUrl`查找模块文件根目录，如果没有配置则使用加载requirejs的HTML页面所在目录

		requirejs.config({
		  'baseUrl': '/javascripts/',
		});

- `paths` 用于映射不能在baseUrl下找到的模块名称，设置路径是相对于baseUrl的。如果以"/"或者ul(如"http:")开头，则不是

		requirejs.config({
		  'baseUrl': '/javascripts/',
		  'paths': {
		    'foo': 'app/foo'
		  }
		});

- `bundles` 集合(在2.1.1引入)使用一个module ID来制定多个module IDs
	
		requirejs.config({
		  bundles: {
	        'primary': ['main', 'util', 'text', 'text!template.html'],
	        'secondary': ['text!secondary.html']
	      }
		});

- `shim` 垫片针对没有使用AMD规范编写的脚本进行配置依赖关系、导出和加载初始化。它是一个权宜之策用于非模块代码，推荐还是模块化的好。[example-jquery-shim](https://github.com/requirejs/example-jquery-shim)

- `map` 映射，根据模块id配置加载不同模块文件。只能用于全路径模块id，相对路径(`../some/thing`)则是无效的。

		requirejs.config({
		  'map': {
		    'app/some/newmodule': {
		      'module': 'app/some/module1.1'
		    },
		    'app/some/oldmodule': {
		      'module': 'app/some/module1.0'
		    }
		  }
		}

- [`config`](http://requirejs.org/docs/api.html#config-moduleconfig) 传递配置信息到模块里

- [`packages`](http://requirejs.org/docs/api.html#packages) 从包中加载模块,遵循[CommonJS Package](http://wiki.commonjs.org/wiki/Packages/1.1)规范

- `nodeIdCompat` 设置为`true`，表示Node针对`example.js`和`example`处理为相同module id

- `waitSeconds` 加载脚本超时时间，设置为`0`则取消超时，默认是`7s`

- `context` 加载上下文，可用于在一个页面里加载不同版本的模块文件

- `deps` 定义要依赖加载的模块

- `callback` 在deps数组加载完成执行

- `enforceDefine` 设置为`true`，则在加载脚本中没有模块化则报错

- `xhtml` 设置为`true`,则采用`document.createElementNS()`方式去创建脚本元素

- `urlArgs` 定义添加查询参数到RequireJS去获取资源，可用于消除浏览器缓存

- `scriptType` 设置script标签的type属性值，默认是"text/javascript"

- `skipDataMain` 在2.1.9引入，用于控制是否忽略data-main属性


# RequireJS异常处理 #

----------


- [`require([])`异常处理](http://requirejs.org/docs/api.html#errbacks)

		require(['jquery'], function ($) {
		  //Do something with $ here
		}, function (err) {
		  //The errback, error callback
		  //The error has a list of modules that failed
		});


- [`paths`配置异常处理](http://requirejs.org/docs/api.html#pathsfallbacks)

		requirejs.config({
		  //To get timely, correct error triggers in IE, force a define/shim exports check.
		  enforceDefine: true,
		  paths: {
		    jquery: [
		      'http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min',
		      //If the CDN location fails, load from this location
		      'lib/jquery'
		    ]
		  }
		});

- `requirejs.onError`全局异常处理

		requirejs.onError = function (err) {
		  console.log(err.requireType);
		  if (err.requireType === 'timeout') {
		    console.log('modules: ' + err.requireModules);
		  }
		
		  throw err;
		};

# RequireJS插件 #

----------


RequireJS允许通过一系列插件来实现加载不同类型资源，常用的比如`text!`文本插件和`i18n!`国际化插件。[plugins list](https://github.com/jrburke/requirejs/wiki/Plugins)

通过在模块名称`!`前指定插件名称 `plugin!resource`，如：

	require(['foo!something/for/foo'], function (something) {
	    //something is a reference to the resource
	    //'something/for/foo' that was loaded by foo.js.
	});

- `text!` 文本插件，自动处理以`text!`为前缀模块。github:[https://github.com/requirejs/text](https://github.com/requirejs/text)

- `i18n!` 国际化插件。根据配置的语言，如果没有配置根据navigator.language来寻找资源文件

- `css!` github:[https://github.com/guybedford/require-css](https://github.com/guybedford/require-css)

- `tpl!` underscore模板插件。github:[https://github.com/dciccale/requirejs-underscore-tpl](https://github.com/dciccale/requirejs-underscore-tpl)

插件开发可参考[http://requirejs.org/docs/plugins.html](http://requirejs.org/docs/plugins.html)

# RequireJS优化 #

----------


[`optimizer`](http://requirejs.org/docs/optimization.html)优化工具能做如下内容

- 关联脚本合成并压缩

- 优化css内联所用的`@import`删除注释

[构建参数说明](https://github.com/jrburke/r.js/blob/master/build/example.build.js)