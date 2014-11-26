---
layout: post
comments: true
title: Git学习资源
date: 2014-04-29 22:42:53
last_modify_date: 2014-06-13 11:23:59 
categories: git
tags: git
---

# 长期维护的Git学习资源

1. [Git Reference](http://gitref.org/)

2. [Git Magic](http://www-cs-students.stanford.edu/~blynn/gitmagic/intl/zh_cn/index.html)

3. [Pro Git](http://git-scm.com/book/)

4. [GotGitHub](http://www.worldhello.net/gotgithub/index.html)

5. [Git Tower](http://www.git-tower.com/learn/)


## 常用命令备忘

- `git diff` 查看尚未暂存的文件更新了那些部分

- `git diff --cached` 查看已经暂存起来的文件和上次提交时的差异

- `git commit`加上-a选项，Git 就会自动把所有**已经跟踪过的**文件暂存起来一并提交，从而跳过 git add 步骤

- `git rm` 要从 Git 中移除某个文件，就必须要从已跟踪文件清单中移除（确切地说，是从暂存区域移除）

- `git mv` 文件移动

		git mv README.txt README

	等同于

		mv README.TXT README
		git rm README.TXT
		git add README

- `git log -p -2` 常用 -p 选项展开显示每次提交的内容差异，用 -2 则仅显示最近的两次更新

- `git log --stat`--stat，仅显示简要的增改行数统计

	还有个常用的 --pretty 选项，可以指定使用完全不同于默认格式的方式展示提交历史。比如用 oneline 将每个提交放在一行显示，这在提交数很大时非常有用。另外还有 short，full 和 fuller 可以用，展示的信息或多或少有些不同

- `git checkout -- <file>` 还原文件取消修改

- `git config --global alias.co checkout` 设置别名

- `git reset --hard 766f` 加载一个旧记录并删除所有比之新的记录

- `git checkout 82f5` 加载一个旧记录.你可以选择只恢复特定文件和目录，通过将其加在命令之后：`git checkout 82f5 some.file another.file`

- `git checkout master~5` 回到倒数第五个保存状态

- `git revert 1b6d` 撤销给定哈希值的提交,本撤销被记录为一个新的提交

## .gitignore 的格式规范如下：

> 所有空行或者以注释符号 ＃ 开头的行都会被 Git 忽略。
> 可以使用标准的 glob 模式匹配。
> 匹配模式最后跟反斜杠（/）说明要忽略的是目录。
> 要忽略指定模式以外的文件或目录，可以在模式前加上惊叹号（!）取反。