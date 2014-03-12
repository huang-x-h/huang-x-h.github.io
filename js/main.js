/**
 * Title: main.js
 * Description: main.js
 * Author: huang.xinghui
 * Created Date: 14-3-12 下午8:54
 * Copyright: Copyright 2013 ZTESOFT, Inc.
 */
require.config({
  'baseUrl': 'js/lib',
  'paths': {
    'jquery': 'jquery-2.1.0.min'
  }
});

require(['jquery'], function($) {
  (function(){
    // 给 window 对象绑定 scroll 事件
    $(window).bind("scroll", function(){

      // 获取网页文档对象滚动条的垂直偏移
      var scrollTopNum = $(document).scrollTop(),
      // 获取浏览器当前窗口的高度
          winHeight = $(window).height(),
          returnTop = $("div.returnTop");

      // 滚动条的垂直偏移大于 0 时显示，反之隐藏
      (scrollTopNum > 0) ? returnTop.fadeIn("fast") : returnTop.fadeOut("fast");

      // 给 IE6 定位
      if (!-[1,]&&!window.XMLHttpRequest) {
        returnTop.css("top", scrollTopNum + winHeight - 200);
      }

    });

    // 点击按钮后，滚动条的垂直方向的值逐渐变为0，也就是滑动向上的效果
    $("div.returnTop").click(function() {
      $("html, body").animate({ scrollTop: 0 }, 100);
    });

  })();
});