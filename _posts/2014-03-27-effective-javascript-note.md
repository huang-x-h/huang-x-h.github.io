---
layout: post
comments: true
title: Effective JavaScript笔记
tags: javascript
---

1. 启用严格模式，`use strict` 指令只有在脚本或函数的顶部才能生效。

	示例一：

		// file1.js
		"use strict";
		function f() {
		  // ...
		}

	示例二：

		function f(x) {
		  "use strict";
		  // ...
		}
2. 理解JavaScript的浮点数
	- JavaScript的数字都是双精度的浮点数
	- 整数仅仅是浮点数的一个子集，而不是一个单独的数据类型
	- 位运算符将数字是为32位的有符号整数
	- 当心浮点运算中的精度陷进

	示例一：

		(0.1 + 0.2) + 0.3; // 0.6000000000000001
		0.1 + (0.2 + 0.3); // 0.6
3. 当心隐式的强制转换
	- 对象通过valueOf方法强制转换为数字，通过toString方法强制转换为字符串
	- 判断一个值是否为定义，应该使用typeof或undefined进行比较而不是使用真值运算
4. 原始类型优于封装对象
	- JavaScript有5个原始类型：Boolean，Number，String，null和undefined
5. 避免对混合类型使用 `==` 运算符

	<table class="table table-bordered">
	  <thead>
        <tr>
          <th>参数类型1</td>
          <th>参数类型2</td>
          <th>强制转换</td>
        </tr>
	  </thead>
	  <tbody>
        <tr>
          <td>null</td>
          <td>undefined</td>
          <td>不转换，总是返回true</td>
        </tr>
        <tr>
          <td>null或undefined</td>
          <td>其他非null或undefined的类型</td>
          <td>不转换，总是返回true</td>
        </tr>
        <tr>
          <td>原始类型：String、Number或Boolean</td>
          <td>Date对象</td>
          <td>将原始类型转换为数字；将Date对象转换为原始类型（优先尝试toString方法，在尝试valueOf方法）</td>
        </tr>
        <tr>
          <td>原始类型：String、Number或Boolean</td>
          <td>非Date对象</td>
          <td>将原始类型转换为数字；将非Date对象转换为原始类型（优先尝试valueOf方法，在尝试toString方法）</td>
        </tr>
        <tr>
          <td>原始类型：String、Number或Boolean</td>
          <td>原始类型：String、Number或Boolean </td>
          <td>将原始类型转换为数字</td>
        </tr>
	  </tbody>
	</table>
6. 了解分号插入的局限
	- 仅在 `}` 标记之前、一行的结束和程序的结束处推倒分号
	- 仅在紧接着的标记不能被解析的时候推倒分号
	- 在以`(`、`[`、`+`、`-`或`/`字符开头的语句前绝不能省略分号
	- 在`return`、`throw`、`break`、 `continue`、 `++`或`--`的参数之前绝不能换行
7. 尽量少用全局对象
	- 避免全局对象添加属性
	- 使用全局对象来做平台特性检测
8. 始终声明局部变量
9. 避免使用`with`
	- 使用简短的变量名代替重复访问的对象
10. 理解闭包
	- JavaScript允许你引用在当前函数以外定义的变量
	- 即使外部函数已经返回，当前函数仍然可以引用在外部函数定义的变量
	- 闭包可以更新外部变量的值
11. 理解变量声明提升
	- JavaScript不支持块级作用域，只有函数作用域
	- 在代码块中的变量声明会被隐式地提升到封闭函数的顶部
	- 重复声明的变量被视为单个变量
12. 使用立即执行的函数表达式(IIFE)创建局部作用域
13. 高级函数是那些将函数作为参数或返回值的函数
14. 使用`call`方法和`apply`方法
15. 永远不要修改`arguments`对象
	- 使用`[].slice.call(arguments)`将`arguments`对象赋值到一个真正的数组中再进行修改
	- 当引用`arguments`时当心函数嵌套层级
16. 使用`bind`方法实现函数柯里化
	- 将函数与其参数的一个子集绑定的技术称为函数柯里化
17. 理解`prototype`、`getPrototypeOf`和`__proto__`之间的不同
	- `C.prototype`属性是`new C()`创建的对象的原型
	- `Object.getPrototypeOf(obj)`是ES5中检索对象原型的标准函数
	- `obj.__proto__`是检索对象原型的非标准方法
	- **类是由一个构造函数和一个关联的原型最成的一种设计模式**
18. 使构造函数与`new`操作符无关
	- 通过使用`new`操作符或者`Object.create`方法在构造函数定义中调用自身使得该构造函数与调用语法无关
	- 当一个函数期望使用`new`操作符调用时，清晰地文档化该函数
	
	示例一：

		function User(name, passwordHash) {
		  var self = this instanceof User ? this : Object.create(User.prototype);
		  self.name = name;
		  self.passwordHash = passwordHash;
		
		  return self;
		}
19. 在原型中存储方法
	- 将方法存储在原型中优于存储在实例对象中
	- 将可变的实例状态存储在示例对象中
20. 使用闭包存储私用变量
21. 认识到`this`变量的隐式绑定问题
	- `this`变量的作用域总是由其最近的封闭函数所确定
	- 使用一个局部变量(通常命名为`self`、`me`或`that`)使得`this`绑定对于内部函数是可用的
22. 在子类的构造函数中调用父类的构造函数
	- 在子类构造函数中显示地传入`this`作为显示的接收者调用父类的构造函数
	- 使用`Object.create`函数来构造子类的原型对象以避免调用弗雷的构造函数
	
	示例一：
	
		function SpaceShip(scence, x, y) {
		  Actor.call(this, scence, x, y);
		  this.points = 0;
		}
	
		SpaceShip.prototype = Object.create(Actor.prototype);
23. 不要重用父类的属性名
24. 避免继承基础类
25. 使用`Object`的直接实例构造轻量级的字典
26. 使用数组而不要使用字典来存储有序集合
27. 数组迭代要优先使用`for`循环而不是`for...in`循环
	- 使用迭代方法(`Array.prototype.forEach`和`Array.prototype.map`)替换`for`循环是的代码更可读，并且避免了重复循环控制逻辑
28. 在类数组对象上复用通用的数组方法
	- 类数组对象有两个简单的规则
		- 具有一个范围在0到2^32-1的整型`length`属性
		- `length`属性大于该对象的最大索引。索引是一个范围在0到2^32-2的整数，它的字符串表示的是该对象中的一个key
		
	示例一：

		var result = Array.prototype.map.call('abc', function(s) {
		  return s.toUpperCase();
		}); // ['A', 'B', 'C]
29. 对异步循环使用递归
	- 循环不能是一部的
	- 使用递归函数在事件循环的单独轮次中执行迭代
	- 在时间循环的单独轮次中执行递归，并不会导致调用堆栈溢出
	 
	示例一：

		// 接收一个URL的数组并尝试一次下载每个文件直到有一个文件被成功下载
		function downloadOneAsync(urls, onsuccess, onfailure) {
		  var n = urls.length;
	
		  function tryNextURL(i) {
			if (i >= n) {
			  onfailure('all downloads failed');
			  return;
			}
			downloadAsync(urls[i], onsuccess, function() {
			  tryNextURL(i + 1);
			});
		  }
	
		  tryNextURL(0);
		}
