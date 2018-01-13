---
title: ES5新增常用特性
date: 2016-10-12 16:47:09
tags: javaScript
categories:
  - 前端开发
  - javaScript
  - JS进步史
---

## 简介 ##
ECMAScript 5.1 (或仅 ES5) 是ECMAScript(基于JavaScript的规范)标准最新修正。 与HTML5规范进程本质类似，ES5通过对现有JavaScript方法添加语句和原生ECMAScript对象做合并实现标准化。ES5还引入了一个语法的严格变种，被称为”严格模式(strict mode)”。

本文介绍一些有用的改变和添加。

## 浏览器支持 ##
随着Opera 11.60的发布, 所有5大浏览器都支持ES5, 除了一些实现的bugs. 除非另有说明，本文中提到的的一切可以用在以下浏览器版本（或更高）：

-  Opera 11.60
-  Internet Explorer 9*
-  Firefox 4
-  Safari 5.1**
-  Chrome 13
-  IE9不支持严格模式 — IE10 添加
-  Safari 5.1 仍不支持 Function.prototype.bind, 尽管 Function.prototype.bind现在已经被Webkit所支持。

## ES5的严格模式 ##
严格模式给作者提供了选择一个限制性更强语言变种的方式——给作者提供额外的可靠性给用户提供额外的安全性。在JS文件或是函数的顶部添加"use strict"即可启用严格模式。因为"use strict"就是个字符串，因此其会被旧版浏览器安全地忽视。
```
"use strict";
function strict(){
  "use strict";
  //...
}

function sloppy(){
  eval("window.foo = 'bar'");
}
```
在严格模式下运行脚本，不少导致提醒或buggy行为的事情会抛出错误，例如：

未声明的变量赋值抛出一个ReferenceError, 而不是创建一个全局变量。
不止一次对对象字面量分配相同的属性会抛出SyntaxError.
使用with语句抛出SyntaxError.
MDSN的严格模式文章有个关于所有这些差异很有用的总结表格。

## 新增JSON ##
ES5提供一个全局的JSON对象，用来序列化(JSON.stringify)和反序列化(JSON.parse)对象为JSON格式。

对于老的浏览器，可以考虑使用Douglas Crockford的json2.js, 可以让旧的浏览器实现同样的功能（原始支持功能测试后）。

JSON.parse(text [, reviver])

JSON.parse接受文本(JSON格式)并转换成一个ECMAScript值。该可选的reviver参数是有带有key和value两个参数的函数，其作用于结果——让过滤和转换返回值成为可能。

``` var result = JSON.parse('{"a": 1, "b": "2"}');
//Object
 result.b
//"2"
```
如果我们想确保解析的值是个整数，我们可以使用reviver方法。
```
var result = JSON.parse('{"a": 1, "b": "2"}', function(key, value){
  if (typeof value == 'string'){
    return parseInt(value);
  } else {
    return value; 
  }
})

>> result.b
2
JSON.stringify(value [, replacer [, space]])
```
JSON.stringify允许作者接受一个ECMAScript值然后转换成JSON格式的字符串。 在其最简单的形式中，JSON.stringify接受一个值返回一个字符串，
```
 var mike = JSON.stringify({mike: "taylor"})
//undefined

mike
//'{"mike": "taylor"}'

typeof mike
//"string"
```
如果我们需要改变值字符串化的方式，或是对我们选择的提供过滤，我们可以将其传给replacer函数。例如，我们想过滤出即将被字符串化的对象中值为13的属性：
```
var nums = {
  "first": 7,
  "second": 14,
  "third": 13
}

var luckyNums = JSON.stringify(nums, function(key, value){
  if (value == 13) {
    return undefined;
  } else {
    return value;
  }
});

>> luckyNums
'{"first": 7, "second": 14}'
```
如果replacer方法返回undefined, 则键值对就不会包含在最终的JSON中。我们同样可以传递一个space参数以便获得返回结果的可读性帮助。space参数可以是个数字，表明了作缩进的JSON字符串或字符串每个水平上缩进的空格数。如果参数是个超过10的数值，或是超过10个字符的字符串，将导致取数值10或是截取前10个字符。
```
var luckyNums = JSON.stringify(nums, function(key, value) {
  if (value == 13) {
    return undefined;
  } else {
    return value;
  }
}, 2);

>> luckyNums
'{
  "first":7,
  "second":14
}'
```
## 对象新增方法 ##
下面的方法是添加到Object上的构造器：

Object.getPrototypeOf
Object.getOwnPropertyDescriptor
Object.getOwnPropertyNames
Object.create
Object.defineProperty(定义属性描述)
  -  在ES3中，除了一些内置属性（例如Math.PI），对象的属性是可以在任何时候都进行增删改查的，在ES5中，这种原本内建属性才有的特权被普适话，ES5引入属性描述符的概念，我们可以通过它对定义的属性有更大的控制权。属性描述符是每个属性都具备的一个描述对象，是对象就可以有属性和方法，但属性描述符对象的成员是确定的，为避免歧义，我们可以叫这些成员为特性；
  -  了解下属性描述符中的特性：
     -  value 存放属性值
     -  writable  是否可写
     -  enumberable 是否可枚举
     -  configurable 是否可删除
     -  set() 更新属性时调用
     -  get() 获取属性时调用
  -  举例：
  ```
  var person={};
  person.leds=2;
  ```
  以上ES3风格的代码等价为     
  ```
  var person={};
  Object.defineProperty(person,"legs",{
    value:2,
    writable:true,
    configurable:true,
    enumrable:true

  });如上所示，除了value默认为undefined其他特性均默认为false,这意味着，通过这种方式定义属性时需显示设定他们值为true。
  ```
Object.defineProperties
Object.seal
Object.freeze
Object.preventExtensions
Object.isSealed
Object.isFrozen
Object.isExtensible
Object.keys
这些新增的好处之一是对象的属性有了更多控制，例如哪些是允许被修改的，哪些是可以枚举的，哪些是可以删除的等。这个的实现通过程序访问对象的属性描述符(property descriptors). 例如：
```
var cat = {};

Object.defineProperty(cat, "name", {
  value: "Maru",
  writable: false,
  enumerable: true,
  configurable: false
});

Object.defineProperty(cat, "skill", {
  value: "exploring boxes",
  writable: true,
  enumerable: true,
  configurable: true
});
```
对于我们的cat对象, 其名字name不能被改变，但是会出现在for-in循环中。在其他方面，Maru擅长探索盒子(exploring boxes), 但是可以在将来改变，因为skill属性是writable和configurable的。

在之后的文章我们将详细探讨所有附加的对象。

## 数组新增方法 ##
以下方法添加到了Arrayprototype对象上:
Array.prototype.indexOf
Array.prototype.lastIndexOf
Array.prototype.every
Array.prototype.some
Array.prototype.forEach
Array.prototype.map
Array.prototype.filter
Array.prototype.reduce
Array.prototype.reduceRight
关于ES5数组”extras” Dmitry Soshnikov写过一篇有深度的参考文章。

Dmitry的文章中有一个没有提到，就是Array.isArray, 正如你看到的，这厮直接写在了Array构造器上，而不是prototype对象上。Array.isArray会按照你所期待的那样去做 — 这是一个根据参数的[[Class]]内部属性是否是”Array”返回true或false.
```
Array.isArray("NO U")
>> false

Array.isArray(["NO", "U"])
>> true
```
在ES3中，唯一可靠的确定一个值是数组的方式就是使用“the Miller Device”, 即比对一个数组其内在的[[Class]]属性。
```
Object.prototype.toString.apply(value) === '[object Array]'
Function.prototype.bind(thisArg [, arg1 [, arg2, …]])
Function.prototype.bind返回一个新的函数对象，该函数对象的this绑定到了thisArg参数上。从本质上讲，这允许你在其他对象链中执行一个函数。

function locate(){
  console.log(this.location);
}

function Maru(location){
  this.location = location;
}

var kitty = new Maru("cardboard box");

var locateMaru = locate.bind(kitty);

locateMaru();
```
在这个例子中，我们将Maru对象的上下文应用在location函数中。因为location是个全局对象的属性，其this值就是全局对象(window)。在这种情况下，我们向上寻找cat, 并不是Location对象，因为我们可以通过绑定的总是kitty的this值创建一个新方法locateMaru.

## 补充参考 ##
ECMAScript 5 对象和属性 by John Resig
理解JavaScript函数调用和”this” by Yehuda Katz
JavaScript严格模式 by Angus Croll
ECMA-262-5详细 介绍 by Dmitry Soshnikov
ECMAScript 5 兼容性表 by Juriy Zaytsev
本文许可自Creative Commons Attribution 3.0 Unported许可。

本文转载自张鑫旭-鑫空间-鑫生活[http://www.zhangxinxu.com](http://www.zhangxinxu.com/wordpress/?p=2148
)



