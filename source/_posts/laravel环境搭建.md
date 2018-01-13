---
title: lavarel<一>环境搭建
date: 2016-8-31 16:22:10
tags: larabel
categories: 
 - 前端开发
 - 框架
 - Laravel
---

<!-- more -->
<p>lavarel学习场所[lavarel学院](http://laravelacademy.org/)下载文档查看安装与配置方法</p>

 1. 安装wamp，确保php版本要大于等于5.59；
 2. 安装composer，通过composer安装laravel`。composer global require "laravel/installer"`确保~/.composer/vendor/bin在系统路径中，否则不能在任意路径调用 laravel 命令。；
 3. 安装好以上环境，可以使用git clone已有的项目到本地，将public指定为服务器的根目录，便可以在本地查看项目，并使用git分布式管理项目了。
 4. 更改完服务器根目录之后，localhost页面显示缺少依赖文件，进入项目文件夹，`composer update`可以解决此问题。<br/>
