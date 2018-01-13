---
title: 啃掉IE低版本这块硬骨头（一）
date: 2016-10-10 15:00:10
tags: javaScript
categories:
  - 前端开发
  - 兼容性问题
---

# JS浏览器兼容性处理

*  兼容事件处理
   >按照DOM Level2的建议，事件传播分三个阶段（现代浏览器统一实现了这三个阶段）：先是捕获标签，然后到达对象，再冒泡。document出发寻找到事件源之后再返回到document，但是实际捕获事件时我们使用冒泡机制，在<code>addEventListener()</code>方法中体现为第三个参数置为<code>false</code>。     
   由于绝大多数浏览器完全实现了DOM1标准,但事件方面的标准化是在DOM2中才完成的,导致IE9之前的版本与其他浏览器在这方面表现存在差异.      

   -  IE9之前的事件监听
   添加监听器：IE5开始使用attachEvent()方法，更早版本只能使用内嵌在html中的属性方法，eg:<code>element.onclick=function(){//这是事件处理器}</code>
   -  事件源 <code>srcElement</code>
   -  阻止冒泡 <code>cancelBubble=ture;</code>IE只支持冒泡机制
   -  阻止默认行为 <code>returnValue=false;</code>
   -  取消事件监听 <code>detachEvent()</code>相对于现代浏览器中的<code>removeEventListener()</code>      
   基于以上分析,整理跨浏览器事件处理器如下:     
   <pre>function callback(e){
     var e=e||window.event;
     var target=e.target||e.srcElement;
     console.log(target.nodeName);
   }
   if(document.addEventListener){
     document.addEventListener('click',callback,false);
   }else if(document.attachEvent){
     document.attachEvent('click',callback);
   }else{
     document.onclick=callback;
   }</pre>
   

*  异步请求
   我们知道目前非常熟悉的Ajax是通过XMLHttpRequest对象来进行Http请求的，在IE7之前这个对象不存在，我们可以使用的类似对象是ActiveXobject,eq:<code>var xhr = new ActiveXobject('MSXML2.XMLHTTP.3.0')</code>   参数中的字符串是一个版本标识符，实际上XHR对象有几个不同的版本，应该根据用户客户端对版本的支持情况创建不同的XHR对象.     
   根据以上分析编写异步请求AJAX工具集如下：     
   <pre>function request(url,message,callback()){
     var versions=[
       'MSXML2.XMLHTTP.3.0',
       'MSXML2.XMLHTTP',
       'Microsoft.XMLHTTP'
     ];
     var xhr;
     if(XHRHttpRequest){
       xhr=new XMLHttpRequest();
     }else{
       for(var i=0;i< versions.length;i++){
         try{
           xhr=new ActiveXobject(versions[i]);
           break;
         }catch(e){}
       }
     }
     xhr.onreadystatechange = (function(myxhr){
        return function(){
          if(myxhr.readyState ====4 && myxhr.status ===200){
            callback(xhr);
          }
        }
     })(xhr);
     xhr.open('post',url,true);//true代表了异步请求
     xhr.send(message);
   }</pre> 

*  css机制      
  -   <strong> 兼容性处理要点 ：</strong>
      1. DOCTYPE 影响 CSS 处理 

      2. FF: 设置 padding 后， div 会增加 height 和 width， 但 IE 不会， 故需要用 !important 多设一个 height 和 width 

      3. FF: 支持 !important， IE 则忽略， 可用 !important 为 FF 特别设置样式 

      4. div 的垂直居中问题: vertical-align:middle; 将行距增加到和整个DIV一样高 line-height:200px; 然后插入文字，就垂直居中了。缺点是要控制内容不要换行 

      5. 在mozilla firefox和IE中的BOX模型解释不一致导致相差2px解决方法： 

          div{margin:30px!important;margin:28px;} 

          注意这两个margin的顺序一定不能写反，!important这个属性IE不能识别，但别的浏览器可以识别。所以在IE下其实解释成这样： 

          div{maring:30px;margin:28px} 

          重复定义的话按照最后一个来执行，所以不可以只写margin:XXpx!important; 

  -  <strong>浏览器差异:</strong> 
        1. ul和ol列表缩进问题 

        消除ul、ol等列表的缩进时，样式应写成：list-style:none;margin:0px;padding:0px; 
        其中margin属性对IE有效，padding属性对FireFox有效。 

        [注]经验证，在IE中，设置margin:0px可以去除列表的上下左右缩进、空白以及列表编号或圆点，设置padding对样式没有影响；在 Firefox 中，设置margin:0px仅仅可以去除上下的空白，设置padding:0px后仅仅可以去掉左右缩进，还必须设置list- style:none才 能去除列表编号或圆点。也就是说，在IE中仅仅设置margin:0px即可达到最终效果，而在Firefox中必须同时设置margin:0px、 padding:0px以及list-style:none三项才能达到最终效果。 

        2. CSS透明问题 

        IE：filter:progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=60)。 
        FF：opacity:0.6。 
        [注] 最好两个都写，并将opacity属性放在下面。 

        3. CSS圆角问题 

        IE：ie7以下版本不支持圆角。 
        FF： -moz-border-radius:4px，或者-moz-border-radius-topleft:4px;-moz- border- radius-topright:4px;-moz-border-radius-bottomleft:4px;-moz- border- radius- bottomright:4px;。 
        [注] 圆角问题是CSS中的经典问题，建议使用JQuery框架集来设置圆角，让这些复杂的问题留给别人去想吧。不过jQuery的圆角只看到支持整个区域的圆角，没有支持边框的圆角，不过这个边框的圆角可以通过一些简单的手段来实现，下次有机会介绍下。 

        4. cursor:hand VS cursor:pointer 

        问题说明：firefox不支持hand，但ie支持pointer ，两者都是手形指示。 
        解决方法：统一使用pointer。 

        5. 字体大小定义不同 

        对字体大小small的定义不同，Firefox中为13px，而IE中为16px，差别挺大。 

        解决方法：使用指定的字体大小如14px。 

        并列排列的多个元素（图片或者链接）的div和div之间，代码中的空格和回车在firefox中都会被忽略，而IE中却默认显示为空格（约3px）。 

        6. CSS双线凹凸边框 
        IE：border:2px outset;。 
        FF： -moz-border-top-colors: #d4d0c8 white;-moz-border-left-colors: #d4d0c8 white;-moz-border-right-colors:#404040 #808080;-moz-border-bottom-colors:#404040 #808080; 

  -  <strong>浏览器bug:</strong> 
        1. IE的双边距bug 

        设置为float的div在ie下设置的margin会加倍。这是一个ie6都存在的bug。 

        解决方案：在这个div里面加上display:inline; 

        例如： 

        <code><#div id=”imfloat”></code> 

        相应的css为 

        <pre>#IamFloat{ 
        float:left; 
        margin:5px;/*IE下理解为10px*/ 
        display:inline;/*IE下再理解为5px*/ 
        } 
        #IamFloat{ 
        float:left; 
        margin:5px;/*IE下理解为10px*/ 
        display:inline;/*IE下再理解为5px*/ 
        }</pre> 

        关于CSS中的问题实在太多了，甚至同样的CSS定义在不同的页面标准中的显示效果都是不一样的。一个合乎发展的建议是，页面采用标准XHTML标准编写，较少使用table，CSS定义尽量依照标准DOM，同时兼顾IE、Firefox、Opera等主流浏览器。很多情况下，FF和 Opera的CSS解释标准更贴近CSS标准，也更具有规范性。 

        2. IE选择符空格BUG 
        一个空格也可以使样式失效。 
        ```<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 /Transitional//EN//www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
        <html xmlns="//www.w3.org/1999/xhtml"> 
        <head> 
        <title></title> 
        <style type="text/css"> 
        <!-- 
        p{font-size:12px;} 
        p:first-letter{font-size:300%} 
        --> 
        </style> 
        </head> 
        <body> 
        <p>对于世界而言，你是一个人；但是对于某个人，你是他的整个世界。纵然伤心，也不要愁眉不展，因为你不知是谁会爱上你的笑容。</p> 
        </body> 
        </html>```

        这段代码对`<p>`的首字符样式定义在IE6上看是没有效果的（IE7没测试），而在p:first-letter和{font-size:300%}加上空格，也就是p:first-letter {font-size:300%}后，显示就正常了。但是同样的代码，在FireFox下看是正常的。按道理说，p:first-letter{font-size:300%}的写法是没错的。那么问题出在哪里呢？答案是伪类中的连字符”-”。IE有个BUG，在处理伪类时，如果伪类的名称中带有连字符”-”，伪类名称后面就得跟一个空格，不然样式的定义就无效。而在FF中，加不加空格都可以正常处理。

*  SSE(Server-sent Events)全新HTML5服务器推送事件技术，很明显只有现代浏览器才支持



