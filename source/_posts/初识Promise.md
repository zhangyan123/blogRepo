---
title: 初识Promise
date: 2016-10-22 12:30:00
tags: javaScript
categories:
  - 前端开发
  - javaScript
  - ES6
---
功能：Promise是处理异步的优秀方案，它不仅可以通过链式操作帮助我们拜托回调地狱，还可以在链式操作中的任何时刻捕获异常。    
promise支持链式调用：    
![promise](/images/promisePatern.png)

举例：     
```   
// 同步resolve
var promise1 = new Promise(
    (resolve, reject) => {
        resolve("this is promise1 resolve");
    }
).then(
    (msg) => {
        console.log(msg);
    },
    (err) => {
        console.log(err);
    }
);
```
var promise = 这部分可以无视，我仅仅用于代码里标记一下demo的次序。这个例子体现了最基础用法，给resolve传入一个字符串终结当前的Promise的状态，因为Promise被终结，因此该字符串会被回调给then中的(msg) => {...}函数，从而实现串联。
```
// 同步reject
var promise2 = new Promise(
    (resolve, reject) => {
        reject("this is promise2 reject");
    }
).then(
    (msg) => {
        console.log(msg);
    },
    (err) => {
        console.log(err);
    }
);
```
和上个例子差不多，只是调用了reject，这样会回调(err) => {....}。
```
// 同步catch
var promise3 = new Promise(
    (resolve, reject) => {
        reject("this is promise3 reject catch");
    }
).then(
    (msg) => {
        console.log(msg);
    }
).catch(
    (err) => {
        console.log(err);
    }
);
```
如果我没有在then()里提供reject的回调函数，那么这个reject事件会继续向后移动，直到遇到catch会被处理。
```
// 异步resolve
var promise4 = new Promise(
    (resolve, reject) => {
        var promise4_1 = new Promise(
            (resolve, reject) => {
                console.log("promise4_1 starts");
                setTimeout(
                    () => {
                        resolve("this is promise4_1 resolve");
                    },
                    2000
                );
            }
        );
        resolve(promise4_1);
    }
).then(
    (msg) => {
        console.log(msg);
    },
    (err) => {
        console.log(err);
    }
);
```
这里，我故意营造了一个resolve(Promise Object)的例子（也就是promise4_1），这样的话then()会等到这个Promise Object自身的异步流程处理结束后再回调，这相当于为promise4异步流程节外生枝了promise4_1，等枝叶长成后再回到promise4主干继续向后链式处理。
```
// 链式resolve
var promise5 = new Promise(
    (resolve, reject) => {
        var promise4_1 = new Promise(
            (resolve, reject) => {
                console.log("promise5_1 starts");
                setTimeout(
                    () => {
                        resolve("this is promise5_1 resolve");
                    },
                    2000
                );
            }
        );
        resolve(promise4_1);
    }
).then(
    (msg) => {
        console.log(msg);
        var promise5_2 =  new Promise(
            (resolve, reject) => {
                console.log("promise5_2 starts");
                setTimeout(
                    () => {
                        resolve("this is promise5_2 resolve");
                    },
                    2000
                );
            }
        );
        return promise5_2;
    }
).then(
    (msg) => {
        console.log(msg);
        throw new Error();
    }
).catch(
    () => {
        console.log("exception catched after promise5_2 resolved");
    }
);
```
这个例子变得再复杂一些，除了在promise5中节外生枝promise5_1异步处理2秒，在2秒后回到主干后的.then()环节，我通过return返回一个Promise对象再次节外生枝promise5_2异步执行2秒，之后再次回到主干的.then()打印出消息并且抛出了异常，最终由catch捕获。
```
// 并行+链式promise
var promise6 = new Promise(
    (resolve, reject) => {
        var promiseArr = [];
        for (var i = 0; i < 5; ++i) {
            promiseArr.push(new Promise(
                (resolve, reject) => {
                    console.log(`promise6_${i} starts`);
                    ((index) => { // 闭包处理i
                        setTimeout(
                            () => {
                                console.log(`before promise6_${index} resolved`);
                                resolve(`this is promise6_${index} resolve`);
                            },
                            index * 1000
                        );
                    })(i);
                }
            ));
        }
        resolve(Promise.all(promiseArr));
    }
).then(
    (msgArr) => {
        console.log(`promise6 all resolved ${msgArr}`);
    }
);
```
这个例子主要是体验Promise.all()，这个函数其实创建返回了一个Promise对象，内部管理与并发了多个Promise流程（节外生枝了N个树叉），它等待它们全部完成或者任意失败之后会终结自己，在外层通过resolve将Promise.all()返回的集合式Promise对象串联（托管）起来，最终进入下一个then从而可以访问N个树叉的结果集合。
```
// .then()隐式包装resolved Promise
var promise7 = new Promise(
    (resolve, reject) => {
        var promise7_1 = new Promise(
            (resolve, reject) => {
                console.log("promise7_1 starts");
                setTimeout(
                    () => {
                        resolve("this is promise7_1 resolve");
                    },
                    2000
                );
            }
        );
        resolve(promise7_1);
    }
).then(
    (msg) => {
        console.log(msg);
        return "promise7 .then()隐式包装resolved Promise";
    },
    (err) => {
        console.log(err);
    }
).then(
    (word) => {
        console.log(word);
    }
);
```
这个例子除了节外生枝外，主要关注在于第1个.then()中return了一个字符串，它实际被隐式的包装成了一个resolved状态的Promise对象返回（这是我想强调的重点），从而继续链式的调用第2个.then()的(word) => {...}回调函数。
```
// .then()显式包装resolved Promise
var promise8 = new Promise(
    (resolve, reject) => {
        var promise8_1 = new Promise(
            (resolve, reject) => {
                console.log("promise8_1 starts");
                setTimeout(
                    () => {
                        resolve("this is promise8_1 resolve");
                    },
                    2000
                );
            }
        );
        resolve(promise8_1);
    }
).then(
    (msg) => {
        console.log(msg);
        return Promise.resolve("promise8 .then()显式包装resolved Promise");
    },
    (err) => {
        console.log(err);
    }
).then(
    (word) => {
        console.log(word);
    }
);
```
这个例子和上一个例子等价，这里体现了第1个.then()显式调用Promise.resolve返回一个Promise对象，从而第2个.then()回调(word) => {}。
```
// .then()显式包装rejected Promise
var promise9 = new Promise(
    (resolve, reject) => {
        var promise9_1 = new Promise(
            (resolve, reject) => {
                console.log("promise9_1 starts");
                setTimeout(
                    () => {
                        resolve("this is promise9_1 resolve");
                    },
                    2000
                );
            }
        );
        resolve(promise9_1);
    }
).then(
    (msg) => {
        console.log(msg);
        return Promise.reject("promise9 .then()显式包装rejected Promise");
    },
    (err) => {
        console.log(err);
    }
).catch(
    (word) => {
        console.log(word);
    }
);
```
这个例子和上面2个例子相反，我在第1个.then()显式的返回了一个rejected的Promise对象，这是通过Promise.reject包装字符串而成的，因此catch将被调用。

通过最后3个例子，我们应该可以明确的感受到Promise围绕pending,resolved,rejected三个状态实现的异步状态驱动以及串联/并行调用的触发动机与原理。

关于Promise本身的功能就了解这么多，希望后面有机会在React下多多使用，解决一些并发ajax以及串联ajax的异步需求，关键还是找到应用场景进行合理的套用，这是我认为最难的地方。

另外，需要记住Promise是ES6的产物，而未来ES7提出了async/await关键字将对Promise加以利用进一步简化异步编程，它将更接近于协程的理念，更加符合人类的思考习惯，至少我是这么认为的。

