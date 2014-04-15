---
layout: post
comments: true
title: 使用ssh_config管理多个ssh账户
date: 2014-04-15 13:50:18 
last_modify_date: 2014-04-15 23:25:22 
categories: ssh
tags: ssh
---

- 一台机器如何实现多个github帐号切换，

- 公司有部署自己git服务器，如何实现个人帐号和公司帐号切换 

这时就需要使用ssh_config

## 生成ssh密钥 ##

首先使用如下命令生成各自的ssh密钥

	ssh-keygen -t rsa -C "your_email@example.com"

按照提示设置保存密钥文件名和密码,详细可参考 [github帮助](https://help.github.com/articles/generating-ssh-keys)

## 配置ssl_config ##

配置文件在`~/.ssh/config`，如果没有就新建一个 `touch ~/.ssh/config`。

`ssl_config`里内容基本语法如下：

	Host 名称(自己决定，方便输入记忆的)
    	HostName 主机名
    	User 登录的用户名
		IdentityFile 密钥路径

一台机器上要维护两个账户访问github，则config配置如下：

	#github huang.xinghui
	Host github.com
		HostName github.com
		User git
    	IdentityFile ~/.ssh/id_rsa

	#github huanglittlebean
	Host github.com-lb
		HostName github.com
		User git
    	IdentityFile ~/.ssh/littlebean_id_rsa

这时要使用`huanglittlebean`用户访问`git@github.com:huanglittlebean/teamwork.git`库时，应使用如下：

	git clone git@github-lb:huanglittlebean/teamwork.git

这时才会使用`littlebean_id_rsa`密钥去访问

> 参考链接：
> [Gist for Multiple SSH Keys setting](https://gist.github.com/jexchan/2351996)

----------


以下是ssh-agent的介绍，摘自于《[通用线程: OpenSSH 密钥管理，第 2 部分](http://www.ibm.com/developerworks/cn/linux/security/openssh/part2)》

- 介绍 ssh-agent

	ssh-agent 是专为既令人愉快又安全的处理 RSA 和 DSA 密钥而设计的特殊程序，它包括在 OpenSSH分发内（请参阅 本系列文章的第 1 部分以得到关于 RSA 和 DSA 认证的介绍）。不同于 ssh ， ssh-agent 是个长时间持续运行的守护进程（daemon），设计它的唯一目的就是对解密的专用密钥进行高速缓存。
	
	ssh 包含的内建支持允许它同 ssh-agent 通信，允许 ssh 不必每次新连接时都提示您要密码才能获取解密的专用密钥。对于 ssh-agent ，您只要使用 ssh-add 把专用密钥添加到 ssh-agent 的高速缓存中。这是个一次性过程；用过 ssh-add 之后， ssh 将从 ssh-agent 获取您的专用密钥，而不会提示要密码短语来烦您了。

- 使用 ssh-agent

	让我们看一下整个 ssh-agent 密钥高速缓存系统的工作过程。 ssh-agent 启动时，在脱离 shell（外壳程序）并继续在后台运行之前它会输出一些重要的环境变量。以下是 ssh-agent 开始时生成的输出的一些示例：

		% ssh-agent
		SSH_AUTH_SOCK=/tmp/ssh-XX4LkMJS/agent.26916; export SSH_AUTH_SOCK;
		SSH_AGENT_PID=26917; export SSH_AGENT_PID;
		echo Agent pid 26917;

	正如您所看到的，事实上 ssh-agent 的输出是一系列 bash 命令；如果这些命令被执行，则将设置两个环境变量：`SSH_AUTH_SOCK` 和 `SSH_AGENT_PID`。内含的 export 命令使这些环境变量对之后运行的任何附加命令都可用。唔， 如果 shell 真对这些行进行计算，这一切才会发生，但是此时它们只是被打印到标准输出（stdout）而已。要使之确定，我们可以象下面这样调用 ssh-agent ：

		eval `ssh-agent`

	这个命令先让 bash 运行 ssh-agent 后对 ssh-agent 的输出进行计算。shell 以这种调用方式（使用反引号，而不是普通的单引号）设置并导出 `SSH_AGENT_PID` 及 `SSH_AUTH_SOCK` 变量，使这些变量对于您在登录会话期间启动的所有新进程都可用。

- 使用 ssh-add
	但是 ssh-agent 启动时高速缓存当然是空的，里面不会有解密的专用密钥。在我们真能使用 ssh-agent 之前，首先还需要使用 ssh-add 命令把我们的专用密钥添加到 ssh-agent 的高速缓存中。下面的示例中，我使用 ssh-add 把我的 ~/.ssh/id_rsa 专用 RSA 密钥添加到 ssh-agent 的高速缓存中：

		# ssh-add ~/.ssh/id_rsa
		Need passphrase for /home/.ssh/id_rsa
		Enter passphrase for /home/.ssh/id_rsa 
		(enter passphrase)

