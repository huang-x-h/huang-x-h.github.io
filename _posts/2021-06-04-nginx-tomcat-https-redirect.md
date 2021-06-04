---
layout: post
comments: true
title: Spring OAuth2认证https重定向问题
tags: java oauth spring
---

# Spring OAuth2认证https重定向问题 #

----------

关于`Nginx`配置`SSL`后，代理配置后端服务，`SpringBoot`通过通过`request.getScheme()`获取到`http`而不是`https`的问题

解决方式如下：

1. `Nginx` 代理配置增加如下内容

```
proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Scheme $scheme;
proxy_set_header X-Forwarded-Proto  $scheme;
```

2. `SpringBoot`工程里 `application.properties` 增加如下配置

```
server.tomcat.protocol-header=X-Forwarded-Proto # Header that holds the incoming protocol, usually named "X-Forwarded-Proto".
server.tomcat.protocol-header-https-value=https # Value of the protocol header that indicates that the incoming request uses SSL.
server.tomcat.remote-ip-header=X-Forwarded-For # Name of the http header from which the remote ip is extracted. For instance `X-FORWARDED-FOR`
```
