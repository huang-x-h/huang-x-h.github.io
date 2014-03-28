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
  'shims': {
    'bootstrap': ['jquery']
  }
});

require(['jquery', 'bootstrap'], function($) {
  $(document).ready(function() {
    /* Sidebar height set */
    $('.sidebar').css('min-height',$(document).height());
  });
});