---
title: React状态(state)
date: 2016-10-17 14:30:09
tags: javaScript
categories:
  - 前端开发
  - 框架
  - React
---
## State 工作原理##
React.js是把UI当状态的函数,通知React数据变化的方法时调用setState(data,callback)。这个方法会合并data到this.state,
并重新渲染组件。渲染完成后,调用可选的callback回调。大部分情况下不需要提供callback,因为只要组件的状态改变了,React 调用
可选的callback回调。大部分情况下不需要提供callback,因为只要组件的状态改变了,React调用render()负责把界面更新到最新状态。

## getInitialState ##
getInitialState()在整个组件的生命周期中只会执行一次,用来设置组件的初始state,也就是一个对象,这个对象可以通过this.state属性读取。当用户
点击组件,导致状态变化,this.setState方法就修改状态值,自动调用this.render方法,再次渲染组件。

## replaceState() ##
replaceState()与setState()的区别在于它会用第一个参数去替代原状态而非进行合并。
## 哪些组件应该有State ##
大部分组件的工作应该是从props里取数据并渲染出来,但是有时需要对用户输入、服务器请求或者时间变化等做出响应,这时有需要对用户输入、服务器请求
或者时间变化等做出响应,这时才需要使用State。
尝试把尽可能多的组件无状态化,这样做可以可以隔离state,把它放在最合理的地方,也能减少冗余,同时易于解释程序运作过程。
常用的模式时创建多个只负责渲染数据的无状态组件,在它们的上层创建一个有状态组件并把它的状态通过props传给子级,这个有状态的组件封装了所有用户
的交互逻辑,而这些无状态组件则负责声明式的渲染数据。
