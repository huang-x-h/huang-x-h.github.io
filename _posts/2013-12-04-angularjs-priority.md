---
layout: post
title: AngularJS指令优先级
date: 2013-12-04 14:07:13
categories: javascript
tags: angularjs
---

# AngularJS中priority和terminal使用介绍 #

----------


priority （指令优先级）

> When there are multiple directives defined on a single DOM element, sometimes it is necessary to specify the order in which the directives are applied. The priority is used to sort the directives before their compile functions get called. Priority is defined as a number. Directives with greater numerical priority are compiled first. Pre-link functions are also run in priority order, but post-link functions are run in reverse order. The order of directives with the same priority is undefined. The default priority is 0.

当多个指令作用在**同一个dom元素**上时，优先级用于控制指令编译函数执行顺序。数值越高则越优先执行。Pre-link（预链接函数）执行按照优先级顺序，而Post-link（后链接函数）执行按照相反顺序。

terminal（指令终止）

> If set to true then the current priority will be the last set of directives which will execute (any directives at the current priority will still execute as the order of execution on same priority is undefined).

如果这个参数设置为true，则表示大于等于当前优先级的指令都会执行，低于的则不会执行

以下给个示例：

html code:

    <p my-directive1 my-directive2 my-directive3></p>

javascript code:

    app.directive('myDirective1', function() {
        return {
          restrict: 'A',
          compile: function($element, attrs, transclude) {
            return {
              pre: function preLink(scope, iElement, iAttrs, controller) { console.log('myDirective1 pre') },
              post: function postLink(scope, iElement, iAttrs, controller) { console.log('myDirective1 post') }
            }
          }
        }
      }).directive('myDirective2', function() {
          return {
            restrict: 'A',
            priority: 100,
            compile: function($element, attrs, transclude) {
              return {
                pre: function preLink(scope, iElement, iAttrs, controller) { console.log('myDirective2 pre') },
                post: function postLink(scope, iElement, iAttrs, controller) { console.log('myDirective2 post') }
              }
            }
          }
        }).directive('myDirective3', function() {
            return {
              restrict: 'A',
              priority: 10,
              terminal: true,
              compile: function($element, attrs, transclude) {
                return {
                  pre: function preLink(scope, iElement, iAttrs, controller) { console.log('myDirective3 pre') },
                  post: function postLink(scope, iElement, iAttrs, controller) { console.log('myDirective3 post') }
                }
              }
            }
          });

控制台输出：

    myDirective2 pre  myDirective3 pre  myDirective3 post  myDirective2 post 
