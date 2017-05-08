---
layout: post
comments: true
title: ESLint 共享配置接送
tags: eslint
---

使用 `ESLint` 做项目前端代码检查时，实现自定义配置维护和共享

<!-- more -->

[`ESLint`](http://eslint.org/) 是前端非常广泛用于进行前端代码规范检查工具， 提供了共享配置来实现多项目共享维护

常见开源的有 `eslint-config-standard`, `eslint-config-google`, `eslint-config-airbnb`

## 创建共享配置

1. 创建 `Node` 模块，**模块名称以 `eslint-config-` 开头**，例如：`eslint-config-myconfig`
2. 创建模块定义 index.js
    
	```js
	module.exports = {
		globals: {
			MyGlobal: true
		},

		rules: {
			semi: [2, "always"]
		}
	};
	```
3. 发布 `Node` 模块到 `npm` 上
4. 项目使用，创建 `.eslintrc` 文件

	```json
	{
		"extends": "eslint-config-myconfig"
	}
	```
	或者
	
	```json
	{
		"extends": "myconfig"
	}
	```
	会自动追加 `eslint-config-`

## 共享多个配置

在一个 `Node` 模块里，可以定义多份配置定义

例如在刚刚模块里新建 `my-special-config.js`

```js
module.exports = {
    rules: {
        quotes: [2, "double"];
    }
};
```

那么项目使用时，可以进行如下定义使用

```json
{
    "extends": "myconfig/my-special-config"
}
```

## 命名空间共享配置

在一些情况，希望模块能够挂载在命名空间下，例如创建个人的共享配置 `@username/eslint-config-myconfig`，或者是建立了公司级私有仓库，为了避免和 `npm` 官网上的模块命名冲突，需要最近命名空间等。这个时候该怎么处理呢？

这时候只需修改下包名，以 `myconfig/my-special-config` 为例，我们创建命名空间为 `myconfig`，那么定义包名为 `@myconfig/eslint-config`

项目使用如下

```json
{
    "extends": "@myconfig"
}
```

这时候 `@myconfig` 就会去找 `@myconfig/eslint-config` 模块，如果要引用模块其他配置

```json
{
    "extends": "@myconfig/eslint-config/my-special-config"
}
```

这时候就是去找 `@myconfig/eslint-config` 模块里的 `my-special-config` 配置
