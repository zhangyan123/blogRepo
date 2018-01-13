---
title: ES6声明声明变量的六种方法
date: 2016-10-22 14:30:01
tags: javaScript
categories:
  - 前端开发
  - javaScript
  - ES6
---
## 变量声明大法
ES5中只有两种声明变量的方法：var命令和function命令    
ES6中增加四种特别的声明方式：    
*  let：声明的变量作用域在最近的代码块中，在作用域中不能重复声明同一个变量名，let变量不提升，先声明后使用，声明的全局变量不属于head对象；
*  const：声明一个常量，不可重复声明同一个变量名，变量不提升，先声明后使用，声明的全局变量不属于head对象；
*  import：
*  class：，声明的全局变量不属于head对象。