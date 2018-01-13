---
title: React创新语法JSX
date: 2016-10-14 14:30:09
tags: javaScript
categories:
  - 前端开发
  - 框架
  - React
---

* ## 类似HTML ##
  HTML标签可以相互嵌套,支持大部分符合HTML规范的属性,支持以<code>data-</code>为前缀的自定义属性(自定义属性不加此前缀时React不予显示);
*  ## javaScript表达式 ##
  JSX允许在闭合标签中使用JS表达式,但要被{}所包裹,js表达式必须有返回值,因此不能再{}中直接使用if-else语句,但可以使用||和&&这样的比较运算符,
  如果确实要使用if-else语句,可以将其写在函数中,然后在{}中调用;
*  ## 样式 ##
   JSX内联样式也是用style属性定义的,但属性值是- 样式对象 -而非字符串,并且样式对象中的属性名需要使用驼峰命名法;
   eg:
   ```
   function demo(){
       return(
           <li>
               <h3>样式</h3>
               <p style={{ color: 'red',fontSize:'14px'}}>内联样式不是字符串,而是对象</p>
           </li>
       );
   }
   ```
*  ## 注释 ##
   JSX中注释内容写法与html相同,但要包裹在{}中;
   eg:{/*这里是注释内容*/}
*  ## 数组 ##
   JSX中的数组会自动展开,但是每一项的key属性值必须不同。
