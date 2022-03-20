---
layout: post
comments: true
title: 如何快速组合内容生成图片
tags: image, nodejs
---

# 如何快速组合内容生成图片 #

----------

需求：需要把用户二维码和背景图片进行组合，并加上相关文字描述，最后生成一张图进行用户下载保存

处理方式：

针对上面需求可以想到两种处理方式

1. 前端 `Web` 渲染处理 ([html2canvas](https://github.com/niklasvh/html2canvas))

- 采用 `[qrcodejs](https://github.com/davidshimjs/qrcodejs)` 进行二维码生成
- 前端先采用 `html` 进行图片层和文字层的组合拼装，通过 `DOM` 生成好最终图片预览效果
- 再通过 `html2canvas` 进行 `html` 选定内容转成 `canvas`

示例代码：

```js
html2canvas(document.querySelector("#capture")).then(canvas => {
  document.body.appendChild(canvas)
});
```

2. 后端 `NodeJS` 渲染处理 ([sharp](https://sharp.pixelplumbing.com/api-composite))

- 后端采用 `[node-qrcode](https://github.com/soldair/node-qrcode)` 进行二维码生成
- 后端通过 `sharp` 进行图片组合，这里 **文字采用 `SVG`** 的方式进行组合生成最终图片

示例代码：

```js
const sharp = require('sharp');
const qrcode = require('qrcode');

const svgBuffer = Buffer.from(
  `<?xml version="1.0" encoding="UTF-8"?>
  <svg viewBox="0 0 800 120" xmlns="http://www.w3.org/2000/svg">
  <style>
    .heavy { font: bold 60px sans-serif; }
  </style>

  <text x="0" y="65" class="heavy">这是我们能看到的内容</text>
</svg>`,
  'utf8'
);

qrcode.toBuffer('http://something.com', { width: 800 }, (err, buffer) => {
  sharp('./backgroud.jpg')
    .composite([
      { input: buffer, gravity: 'center' },
      { input: svgBuffer, top: 1700, left: 1400 },
    ])
    .toFile('output.png')
    .then((data) => {})
    .catch((err) => {
      console.log(err);
    });
});
```
