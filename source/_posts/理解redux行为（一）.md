---
title: Redux使用篇
date: 2017-8-02 16:50:05
tags: javaScript
categories:
  - 前端开发
  - 问题及解决方案
  - React使用
---
为了方便在问题中总结提升，特辟【问题与解决】类目，惟愿从哪里跌倒，就不再摔进去。
# 问题
  *  reducer函数中判断分支复杂不易管理与阅读
  *  创建store时传入一个reducer意味着每一个reducer都需要一个store管理数据，后期store维护相当混乱
# 解决
  *  通过combineReducers将多个reducer合并成一个rootReducer，从而创建唯一的store管理众多action请求
  *  将一种类型的actionCreators（eq:用户登录状态login、logout）放在一个文件当中，导出集合
  *  将每一份actionCreators 文件对应的处理函数封装在Handlers对象里，触发action时检测action.type符合Handlers中的哪一项，便执行对应的函数体。

# 总结
  以上解决方案在项目中得到了实践，还包括异步注入reducer等方案，为全局状态管理提供了清晰的思路，后续文章逐项具体讲解（记得带图）。