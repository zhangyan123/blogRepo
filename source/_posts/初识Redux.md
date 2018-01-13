---
title: 初识Redux
date: 2016-10-20 12:30:01
tags: javaScript
categories:
  - 前端开发
  - 框架
  - React
---
# 为什么要react-redux? #
理解使用action创建函数封装逻辑是react与redux配合的最佳实践，当所有的逻辑处理都被转移到redux中时，react就可以只负责渲染界面并发起action创建函数了。
## Action ##
`Action`是JS一个普通的对象`{type: ‘type类型’}`其中type属性的值必须为一个字符串（用于描述将要执行的动作）；    
## Reducer ##
`Reducer`是一个纯函数，形式为（state,action）=>state,它的作用在于根据当前state和处理器action计算出下一个state并返回（等同于更新state）
*  纯函数    
   与外界的通信渠道“一进一出”只有参数一个入口，只有return一个出口，内部计算不可造成外部变量变化，更不能直接修改参数（尤其不能去改state），不能在内部调用API或路由跳转。
*  纯函数
   简单理解，它只负责对参数按照指定方式计算并返回计算结果，不做任何复杂的功能性处理。
## Store ##
`Store`负责更新、查询、订阅state等多个工作，Store是全局唯一的，它将action、reducer、state等联系在了一起。
*  生成store需要redux中的createStore方法：`import { createStore } from ‘redux’`,let store=createStore(reducer);
*  提供getState()获取当前state值
*  提供dispatch(action)发起action更新state
*  提供subscribe(listener)订阅执行reducer之后的回调函数
## 思考 ##
普通发起action的过程可以视为：根据实际条件判断action.type->生成对应action对象->发起action store.dispatch(action)。
我们知道react灵活之处在于通过更新state方便得更新页面元素，这样的更新过程未免过于繁琐，最好可以使用一个函数执行全部操作（从判断逻辑到发起指令）。

## 使用Redux Thunk优化Action创建函数 ##
*  Redux Thunk中间件可以让action创建函数先不反回action对象，而是返回一个函数（这个函数接受store的两个方法dispatch和getState），通过这个函数延迟dispatch或者在满足指定条件的情况下dispatch。
*  激活Redux Thunk中间件，只需要在createStore中加入applyMiddleware(thunk)；

## 优雅建立React与Redux之间的桥梁 ##
react-redux是链接组件与状态的第三方库，它不仅可以给组件树中任意一组件绑定state和方法，还进行了性能优化，避免了不必要的重新渲染。    

最佳实践：
  *  所有组件的顶层使用Provider组件给整个程序提供store；
  *  使用connect()将state和action创建函数绑定到组件当中。    
一个connect()用例： 
```   
export default connect (
  state => ({counter: state.counter}),//第一个参数是一个函数，将state中的counter传递给组件的counter属性
  dispatch =>bindActionCreators(ActionCreators.dispatch)//第二个参数用意是将action创建函数绑定到组件的props中
)(Counter);
```
## Provider和connect的工作原理 ##
*  使用connect传递数据目的是实现跨级传递，操作上只需要两步：①顶层组件声明childContextTypes(如果不声明则无法使用getChildContext()),将需要传递的数据通过顶层组件中的getChildContext(){return data：this.data}放进context中；②需要使用context的子组件中声明contextTypes(如果声明则context对象为空)就可以直接通过context对象获取对应的属性值了。
*  Provider只是一个使用context传递数据的react组件，它负责给程序 提供store，而connect()则负责生成新的名为Connect的组件，Connect组件在context中拿到store中获取的state和dispatch,最后讲state和经过dispatch加工的action创建函数连接到组件上。
*  高阶组件（higher-order-Components）是一个函数，它接受React组件作为参数，并返回一个新的React组件。
*  connect是一个嵌套函数，运行connect（）后生成一个高阶组件，接受需要绑定state及经过dispatch处理的action创建函数的组件，生成绑定好的同名组件。
*  connect性能优化：我们知道state发生变化时组件会重新渲染，可以优化的地方在于哪里变化哪里repaint,一个页面中使用多个connect为不同的组件绑定不同的state中数据，则可以将组件之间隔离开，不会“一改全改”。

  


