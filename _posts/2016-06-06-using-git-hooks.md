---
layout: post
comments: true
title: 使用 git hooks 实现自动代码检查
tags: git
---

一般在多人协同开发项目时，都会做代码检查(如 `eslint` )以及代码测试(如 `jasmine`)，通常的处理方式使用持续集成( `CI` 代码提交触发自动构建)来做。
今天介绍在 `git` 下，使用 `git hooks` 钩子来实现

<!-- more -->

## Git hooks
钩子是指在特定操作时触发自定义脚本

在 `git init` 初始化仓库时，`git` 就会在当前目录下生成 `.git` 的文件夹，而在这个 `.git` 文件夹中会有一个 `hooks` 的目录。

在这个 `hooks` 目录里，会自动创建一些示例脚本，所有的示例脚本都是 `Shell` 脚本，以 `.sample` 作为后缀名

例如 `commit-msg.sample`

```shell
#!/bin/sh
#
# An example hook script to check the commit log message.
# Called by "git commit" with one argument, the name of the file
# that has the commit message.  The hook should exit with non-zero
# status after issuing an appropriate message if it wants to stop the
# commit.  The hook is allowed to edit the commit message file.
#
# To enable this hook, rename this file to "commit-msg".

# Uncomment the below to add a Signed-off-by line to the message.
# Doing this in a hook is a bad idea in general, but the prepare-commit-msg
# hook is more suited to it.
#
# SOB=$(git var GIT_AUTHOR_IDENT | sed -n 's/^\(.*>\).*$/Signed-off-by: \1/p')
# grep -qs "^$SOB" "$1" || echo "$SOB" >> "$1"

# This example catches duplicate Signed-off-by lines.

test "" = "$(grep '^Signed-off-by: ' "$1" |
	 sort | uniq -c | sed -e '/^[ 	]*1[ 	]/d')" || {
	echo >&2 Duplicate Signed-off-by lines.
	exit 1
}
```

`Git` 提供两组钩子：客户端和服务端，相关 `Git` 提供钩子信息查看 [`Pro git`](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)

那么回归当上面问题，如何使用客户端钩子来完成提交之前代码检查和自测呢

- 定义钩子触发动作

	这里设计用户 `git push` 提交到服务器时执行。那么在本地仓库 `.git/hooks` 目录下创建 `pre-push` 文本文件

- 定义钩子脚本内容

	脚本采用 `Shell` 来写

```shell
#!/bin/sh
grunt eslint
ret=$?

if [ $ret -eq 0 ]
then
  exit 0
else
  echo "Runing grunt eslint failed, please fixed the error first."
  exit 1
fi
```

- 用户提交，如果 `grunt eslint` 不过，则会提交失败，给予错误信息，这时只要用户解决了错误信息，就可以提交成功了

这时有同学会问 "你这是在本地仓库里的 `.git` 目录设置，其他协同人员如何同步这些钩子脚本呢？"

有两种办法，第一种直接把拷贝这些钩子脚本，第二种使用 [`husky`](https://github.com/typicode/husky)第三方库来支持（有兴趣的同学可以去看看源代码，就是根据 `package.json` 定义的钩子和钩子执行的命令 `npm run` 写到对应钩子脚本里）

这样就实现通过 `Git hooks` 钩子指定代码提交之前做一些代码检查的工作

参考文献

> https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks
> https://github.com/typicode/husky
