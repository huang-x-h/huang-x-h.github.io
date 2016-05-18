---
layout: post
comments: true
title: 文本内容换行样式介绍
tags: css
---

使用 `css` 让内容换行，经常碰到 `word-wrap/word-break/white-space` 这些属性，整理了下其相应属性值介绍，以及使用场景

<!-- more -->

## word-wrap
用来说明当一个不能被分开的字符串太长而不能填充其包裹盒时，为防止其溢出，浏览器是否允许这样的单词中断换行,默认值 `normal`

- `normal`

内容超出在正常的单词结束处换行，不截断英文单词换行

示例

```html
<p style="width: 100px; border: 1px solid #ff5f40;">I have a long word which is testasdfdfjlandfg;lkj;ldfasdf;lkjnasdgf</p>
```

<p style="width: 100px; border: 1px solid #ff5f40;">I have a long word which is testasdfdfjlandfg;lkj;ldfasdf;lkjnasdgf</p>

- `break-word`

内容超出如果行内没有多余的地方容纳该单词到结尾，则该单词被强制分割换行

示例

```html
<p style="width: 100px; border: 1px solid #ff5f40; word-wrap: break-word">I have a long word which is testasdfdfjlandfg;lkj;ldfasdf;lkjnasdgf</p>
```

<p style="width: 100px; border: 1px solid #ff5f40; word-wrap: break-word">I have a long word which is testasdfdfjlandfg;lkj;ldfasdf;lkjnasdgf</p>

## word-break
指定怎样在单词内断行,默认值 `normal`

- `normal`
	
使用默认的断行规则，中文在边界处文字换行，英文单词换行，如果单词长度过长，则撑破容器

示例

```html
<p style="width: 100px; border: 1px solid #ff5f40; word-break: normal">你好，这是中文文字内容。I have a long word which is testasdfdfjlandfg;lkj;ldfasdf;lkjnasdgf</p>
```

<p style="width: 100px; border: 1px solid #ff5f40; word-break: normal">你好，这是中文文字内容。I have a long word which is testasdfdfjlandfg;lkj;ldfasdf;lkjnasdgf</p>

- `break-all`

同 `normal` 只是可以强行截断英文单词

示例

```html
<p style="width: 100px; border: 1px solid #ff5f40; word-break: break-all;">你好，这是中文文字内容。I have a long word which is testasdfdfjlandfg;lkj;ldfasdf;lkjnasdgf</p>
```

<p style="width: 100px; border: 1px solid #ff5f40; word-break: break-all;">你好，这是中文文字内容。I have a long word which is testasdfdfjlandfg;lkj;ldfasdf;lkjnasdgf</p>

- `keep-all`

不允许文字断行，中文把前后标点符号内的内容整个换行，英文以单词换行，过长则撑破容器

示例

```html
<p style="width: 100px; border: 1px solid #ff5f40; word-break: keep-all;">你好，这是中文文字内容。I have a long word which is testasdfdfjlandfg;lkj;ldfasdf;lkjnasdgf</p>
```

<p style="width: 100px; border: 1px solid #ff5f40; word-break: keep-all;">你好，这是中文文字内容。I have a long word which is testasdfdfjlandfg;lkj;ldfasdf;lkjnasdgf</p>

## white-space
描述元素里空白字符处理方式,默认值 `normal`

- `normal`

连续的空白符会被合并,换行符会被当作空白符来处理,内容超出换行

示例

```html
<p style="width: 100px; border: 1px solid #ff5f40; white-space: normal">I have     multiple
        space and a line break</p>
```

<p style="width: 100px; border: 1px solid #ff5f40; white-space: normal">I have     multiple
        space and a line break</p>

- `nowrap`

和 `normal` 一样，连续的空白符会被合并,但文本内的换行无效,内容超出不换行

示例

```html
<p style="width: 100px; border: 1px solid #ff5f40; white-space: nowrap">I have     multiple
        space and a line break</p>
```

<p style="width: 100px; border: 1px solid #ff5f40; white-space: nowrap">I have     multiple
        space and a line break</p>

- `pre`

连续的空白符会被保留,在遇到换行符或者 `<br>` 元素时才会换行,内容超出不换行

示例

```html
<p style="width: 100px; border: 1px solid #ff5f40; white-space: pre">I have     multiple
    space and a line break</p>
```

<p style="width: 100px; border: 1px solid #ff5f40; white-space: pre">I have     multiple
    space and a line break</p>

- `pre-line` 

连续的空白符会被合并,在遇到换行符或者 `<br>` 元素时换行,内容超出换行

示例

```html
<p style="width: 100px; border: 1px solid #ff5f40; white-space: pre-line">I have     multiple
    space and a line break</p>
```

<p style="width: 100px; border: 1px solid #ff5f40; white-space: pre-line">I have     multiple
    space and a line break</p>

- `pre-wrap` 

连续的空白符会被保留,在遇到换行符或者 `<br>` 元素时换行,内容超出换行

示例

```html
<p style="width: 100px; border: 1px solid #ff5f40; white-space: pre-wrap">I have     multiple
    space and a line break</p>
```

<p style="width: 100px; border: 1px solid #ff5f40; white-space: pre-wrap">I have     multiple
    space and a line break</p>

参考文献

> http://www.w3cplus.com/content/css3-word-wrap
> https://developer.mozilla.org/en-US/docs/Web/CSS/word-wrap
> https://developer.mozilla.org/en-US/docs/Web/CSS/white-space
> https://developer.mozilla.org/en-US/docs/Web/CSS/word-break
