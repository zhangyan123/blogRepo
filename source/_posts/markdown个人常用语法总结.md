---
title: markdown个人常用语法总结
date: 2016-9-1 16:22:05
tags: 写作
categories:
  - 写作
  - markdown
---
>为了方便写作查找，查阅文档之后总结出自己常用的markdown语法如下  

# 使用#标记标题 #

## 无序列表  
 
* 星号*可以标记列表
+ 加号+也可以标记列表
- 减号-也可以标记列表

## 有序列表  
1. 数字接英文点号，每项后面记得加至少两个空格   

>在首行出现数字-英文句点-空白时  
>
>eg:<code>1987. </code>应写为<code>1987\\.</code>以与列表格式进行区分  


## 代码及区块 
* >\>区块引用

* 分行方式为每行结尾至少两个空格键+回车键    
* 使用pre+code包裹，可以保持代码粘贴时的缩进格式   
 * * *
 - - -
 
* 如上的分割线使用<code>\* \* \*</code>或者<code>- - -</code>单独一行制成,符号之间可以自由添加空格
* `html`可以直接使用tab上面的<code>`</code>包裹小段代码作为代码引用的标志，注意不要与<code>'</code>英文单引号混淆
 
    
## 嵌入带连接的元素  
* [myBlog](https://zhangyan123.github.io/"dailyblog")
以上内联链接制作方式如下  
<code>\[myBlog](https://zhangyan123.github.io/"dailyblog")</code>支持相对路径
相似的图片嵌入，形式上只是在链接前面加一个感叹号!

* ![myBlog](/images/default-1.png)  
以上图片嵌入的制作方式如下  
<code>\!\[myBlog](https://zhangyan123.github.io/images/default-1.png)</code>
* 直接嵌入一个暴露的连接<http://example.com> 可以使用<code>< http://example.com \></code>方式，同样的嵌入邮箱地址可以使用直接使用<code>< address@example.com \></code>  

## 强调
>我们会发现markdown语法中<code>*</code>与<code>-</code>具有很多互通的功能，上文中提到的无序列表、分割线均如此，此处要说明的强调标记方式中易与此规律混淆，请务必分清减号-与下滑线_的适用场景。   

* <code> \*需要强调的文字\*</code>与 <code> \_需要强调的文字\_</code>都可以实现_需要强调的文字_的效果，注意是下划线不是减号。  
* <code> \*\*需要强调的文字\*\*</code>与 <code> \_\_需要强调的文字\_\_</code>都可以实现__需要强调的文字__的效果，再次强调是下划线不是减号。  
* ~~删除线~~
  
## 表格
<pre><code>| 排序方法 | 平均情况 | 最好情况 | 最坏情况 | 辅助空间 | 稳定性 |//表头
|:-----|:-----|:-----|:-----|:-----|:-----|//对齐方式|:-----|左对齐，|:-----:|居中，|-----:|右对齐

| 冒泡排序 | O(n²) | O(nlogn) | O(n²) | O(1) | 稳定 |//单元格数据
| 简单选择 | O(n²) | O(n²) | O(n²) | O(1) | 稳定 |
| 直接插入 | O(n²) | O(n) | O(n²) | O(1) | 稳定 |
| 希尔排序 | O(nlogn)~O(n²) | O(n^1.3) | O(n²) | O(1) | 不稳定 |
| 堆排序 | O(nlogn) | O(nlogn) | O(nlogn) | O(1) | 不稳定 |
| 归并排序 | O(nlogn) | O(nlogn) | O(nlogn) | O(n) | 不稳定 |
| 快速排序 | O(nlogn) | O(nlogn) | O(n²) | O(nlogn)~O(n) | 不稳定 |</code></pre> 

| 排序方法 | 平均情况 | 最好情况 | 最坏情况 | 辅助空间 | 稳定性 |
|:-----|:-----|:-----|:-----|:-----|:-----|
| 冒泡排序 | O(n²) | O(nlogn) | O(n²) | O(1) | 稳定 |
| 简单选择 | O(n²) | O(n²) | O(n²) | O(1) | 稳定 |
| 直接插入 | O(n²) | O(n) | O(n²) | O(1) | 稳定 |
| 希尔排序 | O(nlogn)~O(n²) | O(n^1.3) | O(n²) | O(1) | 不稳定 |
| 堆排序 | O(nlogn) | O(nlogn) | O(nlogn) | O(1) | 不稳定 |
| 归并排序 | O(nlogn) | O(nlogn) | O(nlogn) | O(n) | 不稳定 |
| 快速排序 | O(nlogn) | O(nlogn) | O(n²) | O(nlogn)~O(n) | 不稳定 |     

<div style="color：white;background:#ccc;"><h2>备注<h2><em>markdown文档中可以直接使用html标签和css样式,你会发现写在markdown中的样式直接应用在了文档中</em></div> 
