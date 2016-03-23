---
layout: post
comments: true
title: 跨域资源共享CORS
tags: javascript
---

`Cross-origin resource sharing (CORS)`跨域资源共享是指允许其他域发起网页请求资源（字体/JavaScript等）机制，该域和资源所在域不同

因为在web应用`Cross-site scripting (XSS)`会引发电脑安全问题，所以跨域的AJAX请求默认是屏蔽的，具体XSS介绍可以参考[维基](http://en.wikipedia.org/wiki/Cross-site_scripting)

## 如何工作
`CORS`的标准描述了新的`HTTP`消息头，它提供浏览器和服务器当他们有权限时访问远程资源。虽然服务器可以执行某些验证和授权，但是通常是浏览器负责这些消息头解析施加限制

## 示例
当支持`CORS`浏览器发送跨域请求时

- 浏览器发送带有`Origin`消息头的请求，`Origin`值为该页面所在的域。如一个`http://www.foo.com`下的页面尝试访问在`bar.com`上的用户数据，那么请求的消息头如下

	Origin: http://www.foo.com
	
- 服务端响应
	- 响应`Access-Control-Allow-Origin`消息头会指明允许哪些域访问
	
		Access-Control-Allow-Origin: http://www.foo.com
		
	- 如果服务不允许跨域请求则返回错误页面
	
	- 设置值为`*`表示允许所有域访问
	
		Access-Control-Allow-Origin: *

## 浏览器支持版本
FireFox3.5+/Chrome3+/Safari4+/IE8&9部分支持/IE10+

如何判断浏览器是否支持`CORS`，可以使用`Modernizr`进行判断

	https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
	
	define(['Modernizr'], function( Modernizr ) {
	  Modernizr.addTest('cors', 'XMLHttpRequest' in window && 'withCredentials' in new XMLHttpRequest());
	});
	
## 如何解决

- 从浏览器上处理，以`Chrome`为例，在启动时添加参数`--disable-web-security`，屏蔽该策略限制，如图

![](/assets/images/posts/disable-web-security.png)

- 从服务器上处理，以`Tomcat7`为例，设置过滤器去修改相应消息头，该过滤器需要求`Tomcat7.0.41+`，CORS_Filter(http://tomcat.apache.org/tomcat-7.0-doc/config/filter.html#CORS_Filter)

	<filter>
	  <filter-name>CorsFilter</filter-name>
	  <filter-class>org.apache.catalina.filters.CorsFilter</filter-class>
	</filter>
	<filter-mapping>
	  <filter-name>CorsFilter</filter-name>
	  <url-pattern>/*</url-pattern>
	</filter-mapping>






