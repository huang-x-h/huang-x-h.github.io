---
layout: post
comments: true
title: 使用 npm 作用域管理发布包
tags: npm
---

在写 `npm` 包模块时，模块名称难免会有重名，如果已经有人在 `npm` 上注册该模块名，再次 `npm publish` 同名模块时会告知发布失败，这时可以通过 `scope` 作用域来解决

<!-- more -->

`scope` 就像是模块的命名空间，当模板名称以 `@` 字符开头，则表示为作用域包

    @scope/project-name
	
每个 `npm` 用户都有一个以自己用户名为作用域

    @username/project-name
	
## 定义作用域模块

1. 直接修改包名称，以你的用户名作用域开头

		{
			"name": "@username/project-name"
		}
	
2. 使用 `npm init` 初始化 `npm` 模块时，添加 `scope` 参数

		npm init --scope=username
	
3. 如果需要一直定义作用域模块，可以修改 `.npmrc` 配置参数

		npm config set scope username
	
## 发布作用域模块

作用域模块默认发布是私有的，这时如果要发布成公用模块，添加 `access=public` 参数

	npm publish --access=public

## 使用作用域模块

作用域模块发布后，安装该模块，只要加上作用域名即可

	npm install @username/project-name --save
	
然后使用时，也要添加作用域名

	var projectName = require('@username/project-name')

参考文献

> https://docs.npmjs.com/getting-started/scoped-packages
