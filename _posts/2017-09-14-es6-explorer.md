---
layout: post
comments: true
title: ES6 Explorer
tags: javascript
---

JavaScript 里的变量和函数提升

<!-- more -->

## 块作用域 (let | const)

### let

示例：
```js
// Function Scope
function varTest() {
  var x = 1
  if (true) {
    var x = 2
    console.log(x) //output: 2
  }

  console.log(x) //output: 1
}

// Block Scope
function letText() {
  var x = 1
  if (true) {
    let x = 2
    console.log(x) //output: 2
  }

  console.log(x) //output: 1
}
```

清洁内部函数代码
```js
for (let i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i)
  }, 1)
}
// output: 0, 1, 2, 3, 4

for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i)
  }, 1)
}
// output: 5, 5, 5, 5, 5

// 如果要达到我们上面效果得用闭包来保存变量值
for (var i = 0; i < 5; i++) {
  (function (i) {
    setTimeout(function () {
      console.log(i)
    }, 1)
  })(i)
}
// output: 0, 1, 2, 3, 4
```

**注意点**

1. 函数或者块里不能重复定义 `let` 变量

```js
if (true) {
  let foo
  let foo // Uncaught SyntaxError: Identifier 'foo' has already been declared
}
```

2. `let` 定义不会变量提升（Variable Hoisting）

```js
(function foo() {
  console.log(bar) // undefined
  console.log(foo) // Uncaught ReferenceError: foo is not defined
  var bar = 1
  let foo = 2
})()
```

### const 常量

示例：
```js
const MY_FAV = 7

// Uncaught TypeError: Assignment to constant variable.
MY_FAV = 20

// 也可以定义在对象上
const MY_OBJECT = { 'key': 'value' }

// Uncaught TypeError: Assignment to constant variable.
MY_OBJECT = { 'other': 'value' }

// 但是对象的键值可以修改
MY_OBJECT.key = 'otherVlaue'
```

## 解构

### 对象解构

1. 赋值

```js
var o = {p: 42, q: true};
var {p, q} = o; // 变量名需等同于对象的键值

console.log(p); // 42
console.log(q); // true
```

2. 赋值新变量名

```js
var o = {p: 42, q: true};
var {p: foo, q: bar} = o;

console.log(foo); // 42
console.log(bar); // true
```

3. 默认值

```js
var {a = 10, b = 5} = {a: 3};

console.log(a); // 3
console.log(b); // 5
```

4. 展开对象剩余部分

```js
let {a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40}
a; // 10
b; // 20
rest; // { c: 30, d: 40 }
```

### 数组解构

1. 变量赋值

```js
var foo = ['one', 'two', 'three'];

var [one, two, three] = foo;
console.log(one); // "one"
console.log(two); // "two"
console.log(three); // "three"
```

2. 提供默认值

```js
var a, b;

[a=5, b=7] = [1];
console.log(a); // 1
console.log(b); // 7
```

3. 方便变量交换

```js
var a = 1;
var b = 3;

// 之前交换得通过额外临时变量处理
[a, b] = [b, a];
console.log(a); // 3
console.log(b); // 1
```

4. 忽略值

```js
function f() {
  return [1, 2, 3];
}

var [a, , b] = f();
console.log(a); // 1
console.log(b); // 3
```

5. 展开数组剩余部分

```js
var [a, ...b] = [1, 2, 3];
console.log(a); // 1
console.log(b); // [2, 3]
```

**注意** `...` 只能放在最后变量定义

## 箭头函数

基本语法

```js
(param1, param2, …, paramN) => { statements }
(param1, param2, …, paramN) => expression
// 第二种定义等同于 (param1, param2, …, paramN) => { return expression }
singleParam => { statements } // 单个参数
() => { statements } // 无参数
```

箭头函数两个点：1) 函数定义更为简短 2）不再绑定 this

```js
var arr = [ 1, 2, 3]
arr.map(function (item) { return item + 1 }) // output: 2, 3, 4

// 使用箭头函数
arr.map(item => item + 1)
```

```js
function Person() {
  var that = this
  that.age = 0

  setInterval(function growUp() {
    that.age++
  }, 1000)
}

// 使用箭头函数
function Person(){
  this.age = 0

  setInterval(() => {
    this.age++
  }, 1000)
}

var p = new Person();
```

**注意**

1. 箭头函数使用 `call|apply` 方法时，只能传递参数，`this` 是忽略的

```js
var adder = {
  base: 1,

  add: function(a) {
    var f = v => v + this.base;
    return f(a);
  },

  addThruCall: function(a) {
    var f = v => v + this.base;
    var b = {
      base: 2
    };

    return f.call(b, a);
  }
};

console.log(adder.add(1)); //output: 2
console.log(adder.addThruCall(1)); //output: 2
```

2. 箭头函数没有绑定 `arguments`

```js
function foo() {
  var f = (i) => arguments[0] + i; // 这里的 arguments 是 foo 函数的
  return f(2);
}

foo(1); // 3
```

3. 箭头函数不能做为构造函数

```js
var Foo = () => {};
var foo = new Foo(); // Uncaught TypeError: Foo is not a constructor
```

4. 箭头函数没有原型链

```js
var Foo = () => {};
console.log(Foo.prototype); // undefined
```

参考资料

> http://adripofjavascript.com/blog/drips/variable-and-function-hoisting
>
> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function
