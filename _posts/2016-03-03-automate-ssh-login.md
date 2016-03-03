---
layout: post
comments: true
title: SSH自动登录
date: 2016/3/3 13:47:29 
last_modify_date: 2016/3/3 14:13:14 
categories: linux
tags: linux
---

如何实现 `ssh` 自动登录服务器，以及让服务器执行本地 `shell` 脚本

## 场景需求

服务器A，上面部署了钩子服务器，这个钩子服务器是结合 `gitlab` 的 `WebHooks` 使用的，比如项目在进行 `push` 时，触发一些自动脚本执行，编译/重部署等

服务器B，上面部署了一套运行环境

用户需求，开发人员在 `gitlab` 上进行发布版本分支 `push` 提交代码时，要能自动去重新编译部署服务器B的运行环境

这时编写钩子脚本时，需要 `ssh` 到服务器B上去执行编译部署

但是在使用 `ssh` 登录服务器时，比如 `ssh id@server` 会提示需要输入密码

    $ ssh id@server
    id@server's password:

这样不能实现自动化执行

## 解决方法

1. 在服务器A上，使用 `ssh-keygen` 生成无密码的的 `SSH key`，一路回车

        $ ssh-keygen -t rsa -b 2048
        Generating public/private rsa key pair.
        Enter file in which to save the key (/home/username/.ssh/id_rsa): 
        Enter passphrase (empty for no passphrase): 
        Enter same passphrase again: 
        Your identification has been saved in /home/username/.ssh/id_rsa.
        Your public key has been saved in /home/username/.ssh/id_rsa.pub.

2. 再使用 `ssh-copy-id` 拷贝到目标服务器上，也就是服务器B

        $ ssh-copy-id id@server
        id@server's password: 

    这时会在目标服务器上的写入 `.ssh/authorized_keys`

3. 完成了自动 `ssh` 登录后，还要实现让目标服务器自动执行本地的脚本，只要执行如下命令

        ssh id@server 'bash -s' < local_script.sh


> 参考链接
> 
> http://serverfault.com/questions/241588/how-to-automate-ssh-login-with-password
> http://stackoverflow.com/questions/305035/how-to-use-ssh-to-run-shell-script-on-a-remote-machine