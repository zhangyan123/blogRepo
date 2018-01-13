---
title: 浅析 XMLHttPRequest API与Fetch API
date: 2016-11-01 16:46:00
tags: javaScript
categories:
  - 前端开发
  - javaScript
  - 异步编程
---

# WHAT
  XMLHttpRequest与Fetch是两个实现客户端与服务器之间实现数据通信的API（由浏览器提供），他们以这样的顺序排放体现了js异步通信的进化。总之，就是两个发**异步请求**的工具。
  * 我们知道Ajax的出现更新了世人对js编程本领的认知，js不再是只会弹框而惹人厌小角色，网页局部更新的实现令前端工程师振奋，哪里要变点哪里，so easy!
  * 以往我们谈及Ajax使用的API都是XMLHttpRequest，这是一个以XML开头的单词，但是传输的格式不止于XML,目前使用较多的是JSON，HTML,或纯文本。
  * IE5，IE6没有在他们的脚本语言中定义XMLHttpRequest对象的标识符，当时IE5，IE6发布时，XMLHttpRequest标识符本身还不是一个标准。如果XMLHttpRequest标识符不存在，通过对象检测可以获得向后兼容性。微软在2006年发布的IE7时，定义了XMLHttpRequest对象标识符。
  *  随着跨浏览器JS库(例如jQuery)流行，开发者再调用XMLHttpRequest功能时不用再直接接触底层API。
  *  先来看看直接使用XHR对象发请求的示例

```
    var xmlhttp,
     data=new FormData();
     data.append('mail','15527216125@163.com');
     data.append('password','123456')

    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
       
    }else if(window.ActiveXObject){
     var versions=[
       'MSXML2.XMLHTTP.3.0',
       'MSXML2.XMLHTTP',
       'Microsoft.XMLHTTP'
     ];
     for(var i=0;i< versions.length;i++){
         try{
           xmlhttp=new ActiveXobject(versions[i]);
           break;
         }catch(e){}
       }

    }
     xmlhttp.onreadystatechange = function () {
        if ( xmlhttp.readyState == 4 && xmlhttp.status == 200 ) {
          console.log(JSON.parse(xmlhttp.responseText);
　　　　}
    };
        xmlhttp.open("post", '/login' , false);    //初始化XHR对象，readystate=1
        xmlhttp.send(data);    //参数用于传输data readystate=2
       // xmlhttp.abort();  //停止请求，用于多次连续点击处理及时禁止回调

    XHR2简易写法（不含兼容性检测）
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/login');
    xhr.responseType = 'json';

    xhr.onload = function() {
      console.log(xhr.response);
    };

    xhr.onerror = function() {
      console.log("Booo");
    };

    xhr.send(data);

```

封装之后：

```
    function request(url,message,callback()){
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
   }

jQuery：

$.ajax({
  url: '/login',
  method: 'post',
  data:{mail:'15527216125@163.com',password:'123456'},
  success:function(res){console.log(res)}
  
});
   
fetch: 

fetch('/login',{method:'post',body:data})    //返回一个promise对象  返回的response对象需要使用response对象的方法转化为JSON对象或者text等类型供使用
                                        .then(function(res){return res.text()})//同样返回一个promise，实现链式调用
                                        .then(function(res2){console.log(res2)});

```

以上简单介绍了一个简单的异步请求。    

# WHY

通过前面的演示我们看到发送一个异步请求有很多方式，那么为什么非要用fetch取代XHR呢？多大仇？    
不想说起promise的，但是不讲Promise就讲不下去了。。。      
promise的出现是为了解决**回调地狱**
简化~
思考：假如func3执行的条件是func1和func2均执行完毕，其中func1和fun2均是异步请求，异步请求不确定什么时候结束。。。要么就定个定时器循环检测全局flag是否赋值，要么就是放进回调耦合在一起。

```
(func1(){   //纯纯的伪代码
    $.ajax({
      //...
      success:function(){
//fun2
      $.ajax({
        //...
        success:function(){
          func3;
        }
      });
      }
    })
})();

```

```

fetch(...).then(fun2)
          .then(fun3)//各依赖有序执行

```
# HOW
参考：    
  *  [promise](http://es6.ruanyifeng.com/#docs/promise#Promise-prototype-then)
  *  [generator-async](http://es6.ruanyifeng.com/#docs/generator-async)
  *  [Fetch](https://jakearchibald.com/2015/thats-so-fetch/)

# 问题：
  * 使用标准的ES6 Promise你无法收集进入信息或中断请求。
  * 使用XMLHttpRequest你可以模拟进度（监听progress事件），也可以取消请求（使用abort()方法）。 但是，如果有必要你也可以使用Promise来包裹它。
  * 目前Chrome 42+, Opera 29+, 和Firefox 39+都支持Fetch。微软也考虑在未来的版本中支持Fetch。 讽刺的是，当IE浏览器终于微响应实现了progress事件的时候，XMLHttpRequest也走到了尽头。 目前，如果你需要支持IE的话，你需要使用一个[polyfill](https://github.com/github/fetch)库。

