---
layout: post
comments: true
title: navigatorToUrl报Security error #3769错误 
date: 2014-10-23 18:51:29 
last_modify_date: 2014-10-23 19:27:48 
categories: flex
tags: flex,navigatorToUrl
---

在flex中一般使用navigateToUrl请求服务下载内容，最近客户反映下载失败(flash15)。而本机测试都是好的(flash11)，可以进行请求下载

没有任何思路，求助大谷歌，发现flash安全机制提高了[https://bugbase.adobe.com/index.cfm?event=bug&id=3759971](https://bugbase.adobe.com/index.cfm?event=bug&id=3759971)

以下摘自文中`chris.campbell`解释

> Our security model does not allow a movie to send HTTP headers across domains, unless the player has confirmed the receiving domain permits it with a cross domain policy file ( see http://adobe.ly/1oy1g8e ).

> 我们安全策略模型是不允许跨域进行发送HTTP消息头，除非接收到跨域策略文件进行允许

> With navigateToUrl() we are unable to detect server-side redirects, so we are unable to confirm the actual recipient has permits HTTP headers. To resolve this, we elected to block HTTP headers from all navigateToUrl requests.

> 而是用`navigateToUrl()`我们无法检测到服务端重定向了，不能确定接收方是否允许http请求。因此，我们选择禁止HTTP消息头

> As noted by several customers, this has proved to be overly restrictive, so we are going to relax the restriction to allow simple headers with navigateToUrl requests. 

> 正如一些用户指出，这个过于限制了，所以我们又进行放松限制，允许一些简单的消息头

> Simple headers are defined by Cross-Origin Resource Sharing (http://bit.ly/1oy1kVp) as:

> 这些消息头在跨域资源共享有相关定义

> A header is said to be a simple header if the header field name is an ASCII case-insensitive match for Accept, Accept-Language, or Content-Language or if it is an ASCII case-insensitive match for Content-Type and the header field value media type (excluding parameters) is an ASCII case-insensitive match for application/x-www-form-urlencoded, multipart/form-data, ortext/plain.

> 一个称之为简单消息头定义如下，属性名只能是`Accept`,`Accept-Language`,`Content-Language`以及`Content-Type`，而当属性名是`Content-Type`时，值只能为`application/x-www-form-urlencoded`, `multipart/form-data`, `ortext/plain`,以上字符不区分大小写

> In an upcoming Flash Player build, navigateToUrl() will be changed to throw the exception only when called with an URLRequest containing non-simple headers. We're shooting to get this change in for our July release but this will of course depend on our testing results. We'll be getting this into a public beta as soon as possible (possibly as soon as the next week or two.)

> 后续flash版本`navigateToUrl`当`URLRequest`包含非简单消息头时会抛出异常

产品系统在定义请求消息体时，`URLRequest`设置`method`为`post`方式，而后设置`content-type`值为`application/octet-stream`,导致在flash13+上报Security error #3769错误

解决办法，删除消息头`content-type`的定义，测试通过没有异常





