---
layout: post
comments: true
title: jQuery.offsetParent() vs offsetParent
tags: javascript
---

今天介绍下 `jQuery.offsetParent()` 和 原生 `offsetParent` 的区别，主要是处理问题时遇到到 `element.offsetTop` 和 `$(element).position().top` 返回的值不一样

<!-- more -->

[`offsetTop`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetTop) 定义，它是返回当前元素相对于其 `offsetParent` 元素的顶部的距离

[`jQuery.position()`](https://api.jquery.com/position/) 返回当前元素相对于 `offsetParent` 元素位置(`top/left`)，而这里 `jQuery` 说的 `offsetParent` 不是等同于原生的，`jQuery` 做了替代

接下来详细介绍两者的定义和不同

`HTMLElement.offsetParent` 详细查看 [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent)

> The HTMLElement.offsetParent read-only property returns a reference to the object which is the closest (nearest in the containment hierarchy) positioned containing element. If the element is non-positioned, the nearest table cell or root element (html in standards compliant mode; body in quirks rendering mode) is the offsetParent. offsetParent returns null when the element has style.display set to "none". The offsetParent is useful because offsetTop and offsetLeft are relative to its padding edge.

`HTMLElement.offsetParent 返回一个指向最近的包含该元素的定位元素，如果没有定位元素，则 `offsetParent` 为最近的 table 元素对象或根元素（标准模式下为 html；quirks 模式下为 body）

`HTMLElement.offsetParent` 规则

1. 元素的 `position` 为 `fixed` 或者 `display` 为 `none`, 则 `offsetParent` 为 `null`
2. 元素 `offsetParent` 查找其父节点，如果 `position` 不为 `static` 即 `relative/absolute/fixed`，则为返回该节点
3. 如果为 `static` (`position` 不设置时默认为 `static`)，则继续向上层节点查询进行 `position` 判断
4. 如果没有定位的元素，则 `offsetParent` 为最近的 `table/td` 元素或者跟元素 `body`

`jQuery.offsetParent()` 详细查看 [jQuery](https://api.jquery.com/offsetParent/)

直接看实现代码

```javascript
offsetParent: function() {
  return this.map(function() {
    var offsetParent = this.offsetParent || docElem;

    while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
      jQuery.css( offsetParent, "position" ) === "static" ) ) {
      offsetParent = offsetParent.offsetParent;
    }

    return offsetParent || docElem;
  });
}
```

因此在碰到如下情况时，两者会有很大的不同

```html
<div class="positionRelative">
  <table>
    <tr>
      <td><span>Hello</span></td>
    </tr>
  </table>
</div>
```

- `span.offsetParent` 为 `td`
- `td.offsetParent` 为 `table`
- `tr.offsetParent` 为 `table`
- `$('span').offsetParent()` 为 `div`
- `$('td').offsetParent()` 为 `div`
- `$('tr').offsetParent()` 为 `div`
