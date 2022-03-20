---
layout: post
comments: true
title: Java请求代理设置
tags: java
---

# Java请求代理设置 #

----------

需求：云平台划分两个域，互联网域（能访问互联网资源），公共域（不能访问互联网资源），两个域之间可以通过网闸拉通互访，这时公共域采用容器部署的 `Java` 服务需要访问互联网 `API` 接口资源

处理方式：

在互联网域部署一个前置机做为正向代理(`Squid`)，然后公共域设置 `http` 请求代理

`Java` 为 `HTTP` 、`HTTPS` 、`FTP` 和 `SOCKS` 协议提供了相关代理设置

- `HTTP` 代理设置
  - `http.proxyHost` 代理 `IP` 地址
  - `http.proxyPort` 代理端口，默认 `80`
  - `http.nonProxyHosts` 不做代理请求地址列表，采用管道符 "|" 进行分割；可以使用通配符，通配模式以 "*" 开始或者结束

- `HTTPS` 代理设置
  - `https.proxyHost` 代理 `IP` 地址
  - `https.proxyPort` 代理端口，默认 `443`
  - `https.nonProxyHosts` 不做代理请求地址列表，采用管道符 "|" 进行分割；可以使用通配符，通配模式以 "*" 开始或者结束

- `FTP` 代理设置
  - `ftp.proxyHost` 代理 `IP` 地址
  - `ftp.proxyPort` 代理端口，默认 `80`
  - `ftp.nonProxyHosts` 不做代理请求地址列表，采用管道符 "|" 进行分割；可以使用通配符，通配模式以 "*" 开始或者结束

- `SOCKS` 代理设置
  - `socksProxyHost` `socks` 代理 `IP` 地址
  - `socksProxyPort` `socks` 代理端口

在启动 `Java` 命令参数设置

`java -Dhttp.proxyHost=127.0.0.1 -Dhttp.proxyPort=2345 -Dhttp.nonProxyHosts="localhost|host.example.com"`
