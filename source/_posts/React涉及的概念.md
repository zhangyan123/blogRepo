---
title: React创新语法JSX
date: 2016-10-16 14:30:00
tags: javaScript
categories:
  - 前端开发
  - 框架
  - React
---

 # 解决什么问题 # 
 生来为了解决在开发中数据随时间变化的复杂用户界面，优化状态替换机制
 # 主张 #
 一次学习，随处可用
 # 编写react组件 #
 编写react组件通常需要写一个继承自React.Component的类，并在render()中返回你要展示的视图    
 但，如果这个组件只有一个render()方法，可以将其改为更为简洁的无状态函数，这也是[Airbnb编码规范](https://github.com/libertyAlone/airbnb-javascript-style-guide-cn)推荐的。