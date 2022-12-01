---
layout: post
comments: true
title: Safari无法播放mp4视频问题
tags: mp4, safari
---

# 0x01 背景

`mp4` 文件流通过 `<video>` 标签引入播放，用户反馈在安卓下访问正常播放，但通过 `iPhone` 访问则播放失败

# 0x02 分析

![](/assets/images/posts/safari-byte-range.png)

通过排查分析 `Safari` 浏览器针对 `mp4` 流播放需要支持 `byte-range` 请求方式，[参考](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/CreatingVideoforSafarioniPhone/CreatingVideoforSafarioniPhone.html#//apple_ref/doc/uid/TP40006514-SW6)

`mp4` 文件流是通过后端 `SpringMVC` 代理文件流输出，通过 `curl --range 0-99 http://ip:port/test.mov -o /dev/null` 请求返回失败，显然是不支持 `Range` 请求

`SpringMVC` 在 `Controllers` 上支持 `Range` 请求是在 `5.0 RC4` 版本以上，对应 `SpringBoot`

![](/assets/images/posts/springmvc-support-range.png)

# 0x03 处理方式

修改 `mp4` 文件流支持 `Range` 请求即可