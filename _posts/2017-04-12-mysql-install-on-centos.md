---
layout: post
comments: true
title: CentOS install mysql rpm
tags: mysql
---

`CentOS` 如何通过 `rpm` 手动安装 `mysql`

<!-- more -->

1. Download mysql

https://dev.mysql.com/downloads/mysql/

找到对应系统版本，这里是 Red Hat Enterprise Linux 7 / Oracle Linux 7 (x86, 64-bit), RPM Bundle

2. Unpackage Bundle

解压压缩包，按顺序安装

```sh
$ rpm -i mysql-community-libs-*
$ rpm -i mysql-community-common-*
$ rpm -i mysql-community-client-*
$ rpm -i mysql-community-server-*
```

附各模块包含义

| Package Name | Summary |
| --- | --- |
| mysql-community-server | Database server and related tools |
| mysql-community-client | MySQL client applications and tools |
| mysql-community-common | Common files for server and client libraries |
| mysql-community-devel	| Development header files and libraries for MySQL database client applications |
| mysql-community-libs | Shared libraries for MySQL database client applications |
| mysql-community-libs-compat | Shared compatibility libraries for previous MySQL installations |
| mysql-community-embedded | MySQL embedded library |
| mysql-community-embedded-devel | Development header files and libraries for MySQL as an embeddable library |
| mysql-community-test | Test suite for the MySQL server |

3. Start mysql

`$ sudo service mysqld start`

4. Configuration

安装好后，`mysql` 默认给 `root` 用户生成临时密码

`$ sudo grep 'temporary password' /var/log/mysqld.log`

通过命令获取对应密码，登录进行修改 `root` 密码

`$ mysql -uroot -p`

执行命令修改

`mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY ‘MyPassword@123’;`

例如这修改密码为 `MyPassword@123`，密码规则比较严格，必须一个大写字母，一个小写字母，一个数字，一个特殊字符，长度大于等于8个字符

到这里 `mysql` 就已经安装成功了，服务器上也能访问

但是到自己电脑使用 `mysql` 客户端工具访问 `root` 用户发现访问不了

这是因为 `mysql` 默认是不允许 `root` 用户进行远程连接访问，实际项目环境上也都会新建用户名，也就不存在这个问题

如果想开启 `root` 用户的远程连接，执行如下数据库命令

```sh
mysql> CREATE USER 'root'@'%' IDENTIFIED BY 'yourpassword';
mysql> GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';
mysql> FLUSH PRIVILEGES;
```

这样，随便哪个客户端都可以使用 `root` 用户连接了

> 参考文章
>
> https://dev.mysql.com/doc/refman/5.7/en/linux-installation-rpm.html
>
>https://stackoverflow.com/questions/14779104/how-to-allow-remote-connection-to-mysql
