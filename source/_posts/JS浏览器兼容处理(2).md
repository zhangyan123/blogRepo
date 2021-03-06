---
title: 啃掉IE低版本这块硬骨头（二）
date: 2016-10-11 16:40:09
tags: javaScript
categories:
  - 前端开发
  - 兼容性问题
---

# JS浏览器兼容性处理

一、document.formName.item(”itemName”) 问题 

问题说明：IE下，可以使用 document.formName.item(”itemName”) 或 document.formName.elements ["elementName"]；Firefox 下，只能使用document.formName.elements["elementName"]。 
解决方法：统一使用document.formName.elements["elementName"]。 

二、集合类对象问题 

问题说明：IE下，可以使用 () 或 [] 获取集合类对象；Firefox下，只能使用 [ ]获取集合类对象。 
解决方法：统一使用 [] 获取集合类对象。 

三、自定义属性问题 

问题说明：IE下，可以使用获取常规属性的方法来获取自定义属性，也可以使用 getAttribute() 获取自定义属性；Firefox下，只能使用 getAttribute() 获取自定义属性。 
解决方法：统一通过 getAttribute() 获取自定义属性。 

四、eval(”idName”)问题 

问题说明：IE下，可以使用 eval(”idName”) 或 getElementById(”idName”) 来取得 id 为 idName 的HTML对象；Firefox下，只能使用 getElementById(”idName”) 来取得 id 为 idName 的HTML对象。 
解决方法：统一用 getElementById(”idName”) 来取得 id 为 idName 的HTML对象。 

五、变量名与某HTML对象ID相同的问题 

问题说明：IE下，HTML对象的ID可以作为 document 的下属对象变量名直接使用，Firefox下则不能；Firefox下，可以使用与HTML对象ID相同的变量名，IE下则不能。 
解决方法：使用 document.getElementById(”idName”) 代替 document.idName。最好不要取HTML对象ID相同的变量名，以减少错误；在声明变量时，一律加上var关键字，以避免歧义。 

六、const问题 

问题说明：Firefox下，可以使用const关键字或var关键字来定义常量；IE下，只能使用var关键字来定义常量。 
解决方法：统一使用var关键字来定义常量。 

七、input.type属性问题 

问题说明：IE下 input.type 属性为只读；但是Firefox下 input.type 属性为读写。 
解决办法：不修改 input.type 属性。如果必须要修改，可以先隐藏原来的input，然后在同样的位置再插入一个新的input元素。 

八、window.event问题 

问题说明：window.event 只能在IE下运行，而不能在Firefox下运行，这是因为Firefox的event只能在事件发生的现场使用。 
解决方法：在事件发生的函数上加上event参数，在函数体内(假设形参为evt)使用 var myEvent = evt?evt:(window.event?window.event:null) 
示例： 

```
<input type="button" onclick="doSomething(event)"/> 
<script language="javascript"> 
function doSomething(evt) { 
var myEvent = evt?evt:(window.event?window.event:null) 
... 
} ```
九、event.x与event.y问题 

问题说明：IE下，even对象有x、y属性，但是没有pageX、pageY属性；Firefox下，even对象有pageX、pageY属性，但是没有x、y属性。 
解决方法：var myX = event.x ? event.x : event.pageX; var myY = event.y ? event.y:event.pageY; 
如果考虑第8条问题，就改用myEvent代替event即可。 

十、event.srcElement问题 

问题说明：IE下，even对象有srcElement属性，但是没有target属性；Firefox下，even对象有target属性，但是没有srcElement属性。 
解决方法：使用srcObj = event.srcElement ? event.srcElement : event.target; 
如果考虑第8条问题，就改用myEvent代替event即可。 

十一、window.location.href问题 

问题说明：IE或者Firefox2.0.x下，可以使用window.location或window.location.href；Firefox1.5.x下，只能使用window.location。 
解决方法：使用 window.location 来代替 window.location.href。当然也可以考虑使用 location.replace()方法。 

十二、模态和非模态窗口问题 

问题说明：IE下，可以通过showModalDialog和showModelessDialog打开模态和非模态窗口；Firefox下则不能。 
解决方法：直接使用 window.open(pageURL,name,parameters) 方式打开新窗口。 
如果需要将子窗口中的参数传递回父窗口，可以在子窗口中使用window.opener来访问父窗口。如果需要父窗口控制子窗口的话，使用 var subWindow = window.open(pageURL,name,parameters); 来获得新开的窗口对象。 

十三、frame和iframe问题 

以下面的frame为例： 

(1)访问frame对象 
IE：使用window.frameId或者window.frameName来访问这个frame对象； 
Firefox：使用window.frameName来访问这个frame对象； 
解决方法：统一使用 window.document.getElementById(”frameId”) 来访问这个frame对象； 
(2)切换frame内容 
在IE和Firefox中都可以使用 window.document.getElementById(”frameId”).src = “webjx.com.html”或 window.frameName.location = “webjx.com.html”来切换frame的内容； 
如果需要将frame中的参数传回父窗口，可以在frame中使用parent关键字来访问父窗口。 

十四、body载入问题 

问题说明：Firefox的body对象在body标签没有被浏览器完全读入之前就存在；而IE的body对象则必须在body标签被浏览器完全读入之后才存在。 
[注] 这个问题尚未实际验证，待验证后再来修改。 
[注] 经验证，IE6、Opera9以及FireFox2中不存在上述问题，单纯的JS脚本可以访问在脚本之前已经载入的所有对象和元素，即使这个元素还没有载入完成。 

十五、事件委托方法 

问题说明：IE下，使用 `document.body.onload = inject;` 其中`function inject()`在这之前已被实现；在Firefox下，使用 `document.body.onload = inject()`; 
解决方法：统一使用 `document.body.onload=new Function('inject()'); `或者 `document.body.onload = function(){/* 这里是代码 */} `
[注意] Function和function的区别 

十六、访问的父元素的区别 

问题说明：在IE下，使用 obj.parentElement 或 obj.parentNode 访问obj的父结点；在firefox下，使用 obj.parentNode 访问obj的父结点。 
解决方法：因为firefox与IE都支持DOM，因此统一使用obj.parentNode 来访问obj的父结点。 

十七、innerText的问题. 

问题说明：<strong> innerText在IE中能正常工作，但是innerText在FireFox中却不行。 </strong>
解决方法：在非IE浏览器中使用textContent代替innerText。 
示例： 

```
if(navigator.appName.indexOf("Explorer") >-1){ 
document.getElementById('element').innerText = "my text"; 
} else{ 
document.getElementById('element').textContent = "my text"; 
} 
```
[注] innerHTML 同时被ie、firefox等浏览器支持，其他的，如outerHTML等只被ie支持，最好不用。 

十八、Table操作问题 

问题说明：ie、firefox以及其它浏览器对于 table 标签的操作都各不相同，在ie中不允许对table和tr的innerHTML赋值，使用js增加一个tr时，使用appendChild方法也不管用。document.appendChild在往表里插入行时FIREFOX支持，IE不支持 
解决办法：把行插入到TBODY中，不要直接插入到表 
解决方法： 

//向table追加一个空行： 

```
var row = otable.insertRow(-1); 
var cell = document.createElement("td"); 
cell.innerHTML = ""; 
cell.className = "XXXX"; 
row.appendChild(cell); 
```
[注] 建议使用JS框架集来操作table，如JQuery。 

十九、对象宽高赋值问题 

问题说明：FireFox中类似 obj.style.height = imgObj.height 的语句无效。 
解决方法：统一使用 obj.style.height = imgObj.height + ‘px'; 

二十、setAttribute('style','color:red;') 
FIREFOX支持(除了IE，现在所有浏览器都支持)，IE不支持 
解决办法：不用setAttribute('style','color:red') 
而用object.style.cssText = ‘color:red;'(这写法也有例外) 
最好的办法是上面种方法都用上，万无一失 

二一、类名设置 
setAttribute('class','styleClass') 
FIREFOX支持，IE不支持(指定属性名为class，IE不会设置元素的class属性，相反只使用setAttribute时IE自动识CLASSNAME属性) 
解决办法： 
```
setAttribute('class','styleClass') 

setAttribute('className','styleClass')
```

或者直接 `object.className='styleClass'`; 

IE和FF都支持object.className。 

二二、用setAttribute设置事件 
`var obj = document.getElementById('objId')`; 
`obj.setAttribute('onclick','funcitonname();')`; 
FIREFOX支持，IE不支持 
解决办法： 
IE中必须用点记法来引用所需的事件处理程序,并且要用赋予匿名函数 
如下： 
```
var obj = document.getElementById('objId'); 
obj.onclick=function(){fucntionname();};
```
这种方法所有浏览器都支持 

二三、建立单选钮 
IE以外的浏览器 
```
var rdo = document.createElement('input'); 
rdo.setAttribute('type','radio'); 
rdo.setAttribute('name','radiobtn'); 
rdo.setAttribute('value','checked');
 ```

IE: 
```var rdo =document.createElement(”<input name=”radiobtn” type=”radio” value=”checked” />”); ```
解决办法： 
这一点区别和前面的都不一样。这次完全不同，所以找不到共同的办法来解决，那么只有IF-ELSE了 
万幸的是，IE可以识别出document的uniqueID属性，别的浏览器都不可以识别出这一属性。问题解决。
