---
layout: post
comments: true
title: XMLHttpRequest跨域预检
categories: javascript
tags: javascript
---

上篇介绍如何解决跨域请求问题，后来在使用过程中发现，通过`XHR`发送`get/post`请求时，都会派发`options`请求，如下图
![](/images/posts/preflight.png)

后来查资料发现是`CORS`里的`preflight`预检机制[HTTP access control (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) by MDN

在`CORS`标准中，定义了新的HTTP消息头`Access-Control-Allow-Origin`，使得服务端可以定义允许通过浏览器请求的域集合。另外，标准定义了当跨域影响用户数据`HTTP`请求(如用`XMLHttpRequest`发送`get/post`)时，浏览器会发送预检请求(`OPTIONS`请求)给服务端征求支持的请求方法，然后根据服务端响应允许才发送真正的请求

`OPTIONS Request Headers`

	OPTIONS /cvbs/api/offer/querySubsPlanList HTTP/1.1
	Host: 10.45.7.243:8080
	Connection: keep-alive
	Pragma: no-cache
	Cache-Control: no-cache
	Access-Control-Request-Method: POST
	Origin: http://localhost:63342
	User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.76 Safari/537.36
	Access-Control-Request-Headers: accept, content-type
	Accept: */*
	Referer: http://localhost:63342/WebContent/index.html
	Accept-Encoding: gzip, deflate, sdch
	Accept-Language: en,zh;q=0.8,en-US;q=0.6,zh-CN;q=0.4

`OPTIONS Response Header` 

	HTTP/1.1 200 OK
	Server: Apache-Coyote/1.1
	Access-Control-Allow-Origin: http://localhost:63342
	Access-Control-Allow-Credentials: true
	Access-Control-Max-Age: 1800
	Access-Control-Allow-Methods: POST
	Access-Control-Allow-Headers: content-type,access-control-request-headers,access-control-request-method,accept,origin,x-requested-with
	Content-Length: 0
	Date: Wed, 11 Mar 2015 05:16:31 GMT




