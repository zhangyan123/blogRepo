---
title: 常见pollyfills
date: 2016-10-20 16:30:09
tags: javaScript
categories:
  - 前端开发
  - javaScript
  - 内建对象的扩展
---
## 常见内建对象扩展项
>讨论：基于相关内建原型来增加自定义方法这种技术，最常用且最能被接受的例子，是实现让老式浏览器支持新功能，而且应该是已经被ECMAScript委员会标准化了的，为现代浏览器所实现的新功能，例如让老版IE支持ES5中的方法，这种扩展叫做shims或者pollyfills.
<strong>注：</strong>使用自定义方法扩展内建对象原型时，一定要检查该方法是否已经存在，不存在情况下才扩展此方法。
下面罗列几个常见pollyfills：    
-  trim()
 ```  
   if(typeof String.prototype.trim !=='function'){
     String.prototype.trim = function(){
       return this.replace(/^\s+|\s+$/g,'');
     };
   }
```
-  create()
```
if(typeof Object.create !== 'function'){
  Object.create = function(o){
    var F =function(){};
      F.prototype=o;
      return new F（）;
    
  }
}
```
-  isArray()
if(typeof Array.isArray !== 'function'){
  Array.isArray = function(o){
    if(Object.prototype.toString.call(o)=== "[object Array]"){
      return true;
    }else{
      return false;
    }
  }
}

