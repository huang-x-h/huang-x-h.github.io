---
layout: post
comments: true
title: jQuery.proxy 使用陷阱
tags: jquery
---

使用 `jQuery` 在给方法绑定作用域时，一般都是 `$.proxy(fn, context)`，但是这个在某些情况下会有意料不到的坑

<!-- more -->

使用 `jQuery` 对元素绑定事件处理时，如果绑定的函数处理是同一个

**场景**

```html
<button type="button" class="js-click">Click me</button>
<button type="button" class="js-remove">Remove</button>
<script>
	var context1 = {say: 'I am Lilei'};
	var context2 = {say: 'I am Hanmeimei'};
	function foo() {
		console.log(this.say);
	}

	var foo1 = $.proxy(foo, context1);
	var foo2 = $.proxy(foo, context2);

	$('.js-click').on('click', foo1).on('click', foo2);

	$('.js-remove').on('click', function(e) {
		$('.js-click').off('click', foo2)
	})
</script>
```

**期望**

1. 页面加载执行，点击 `Click me` 按钮，输出 `I am Lilei/I am Hanmeimei`
2. 点击 `Remove` 按钮，移除 `foo2` 监听函数处理，这时候再去点击 `Click me` 按钮，应该输出 `I am Lilei`，实际结果却是什么都没有输出

**分析**

查看 `proxy` 方法源码 https://github.com/jquery/jquery/blob/master/src/core.js#L420-L445

```js
// Set the guid of unique handler to the same of original handler, so it can be removed
proxy.guid = fn.guid = fn.guid || jQuery.guid++;
```

在进行作用域代理时会添加 `guid`，先判断原函数是否有 `guid`, 如果有就直接用，没有则创建赋值到原函数里

而这个 `guid` 在事件移除时会去做比对判断

查看 `event` 源码 https://github.com/jquery/jquery/blob/master/src/event.js#L220-L291

```js
var j, origCount, tmp,
	events, t, handleObj,
	special, handlers, type, namespaces, origType,
	elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

if ( !elemData || !( events = elemData.events ) ) { // 获取元素所有事件监听处理
	return;
}

...

// Remove matching events
origCount = j = handlers.length;
while ( j-- ) { // 递归处理
	handleObj = handlers[ j ];

	if ( ( mappedTypes || origType === handleObj.origType ) && // 判断监听事件类型
		( !handler || handler.guid === handleObj.guid ) && // 判断 guid 
		( !tmp || tmp.test( handleObj.namespace ) ) &&
		( !selector || selector === handleObj.selector ||
			selector === "**" && handleObj.selector ) ) {
		handlers.splice( j, 1 );

		if ( handleObj.selector ) {
			handlers.delegateCount--;
		}
		if ( special.remove ) {
			special.remove.call( elem, handleObj );
		}
	}
}
```

那么再分析下之前的示例代码

1. `foo1` 代理定义时创建 `guid` 到自己和原函数 `foo` 里
2. `foo2` 代理定义时，则直接取用 `foo` 里的 `guid`, 也就是同 `foo1`
3. `$('.js-click').off('click', foo2)` 移除 `foo2` 函数处理时，由于 `foo1` 的监听事件和 `guid` 同 `foo2`，递归判断监听函数时就会移除

**处理**

采用 `Function.prototype.bind` 或者 `lodash.bind` 来处理 

做一下代码修改 `$.proxy(foo, context)` 改用 `bind` 来做，即 `foo.bind(context)`

```js
var foo1 = foo.bind(context1);
var foo2 = foo.bind(context2);
```
 
这时重复上面步骤，达到预期效果