/**
 * Title: main.js
 * Description: main.js
 * Author: huang.xinghui
 * Created Date: 14-3-12 下午8:54
 * Copyright: Copyright 2013 ZTESOFT, Inc.
 */
require.config({
  'baseUrl': '/js/lib',
  'paths': {
    'jquery': 'jquery-2.1.0.min',
    'bootstrap': 'bootstrap.min'
  },
  'shim': {
    'bootstrap': ['jquery']
  }
});

require(['jquery', 'bootstrap'], function($) {
  $(document).ready(function() {
    /* Sidebar height set */
    $('.sidebar').css('min-height',$(document).height());
  });
});

// Google Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-48905530-1', 'huang-x-h.github.io');
ga('send', 'pageview');