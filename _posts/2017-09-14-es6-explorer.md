---
layout: post
comments: true
title: ES6 Explorer
tags: javascript
---

`ES6` 特性探索

<!-- more -->

目录

- [块作用域](#%E5%9D%97%E4%BD%9C%E7%94%A8%E5%9F%9F-let--const)
  - [let](#let)
  - [const 常量](#const-%E5%B8%B8%E9%87%8F)
- [解构](#%E8%A7%A3%E6%9E%84)
  - [对象解构](#%E5%AF%B9%E8%B1%A1%E8%A7%A3%E6%9E%84)
  - [数组解构](#%E6%95%B0%E7%BB%84%E8%A7%A3%E6%9E%84)
- [箭头函数](#%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0)
- [参数处理](#%E5%8F%82%E6%95%B0%E5%A4%84%E7%90%86)
- [符号 Symbol](#%E7%AC%A6%E5%8F%B7-symbol)
  - [特性](#%E7%89%B9%E6%80%A7)
  - [方法](#%E6%96%B9%E6%B3%95)
  - [内置 `Symbol`](#%E5%86%85%E7%BD%AE-symbol)
- [类 Class](#%E7%B1%BB-class)
- [模块 Module](#%E6%A8%A1%E5%9D%97-module)
- [模版字符串 Template strings](#%E6%A8%A1%E7%89%88%E5%AD%97%E7%AC%A6%E4%B8%B2-template-strings)
  - [语法](#%E8%AF%AD%E6%B3%95)
  - [标签模版字符串 Tagged template literals](#%E6%A0%87%E7%AD%BE%E6%A8%A1%E7%89%88%E5%AD%97%E7%AC%A6%E4%B8%B2-tagged-template-literals)
- [Proxy 代理](#proxy-%E4%BB%A3%E7%90%86)
  - [语法](#%E8%AF%AD%E6%B3%95-1)
- [Reflect 反射](#reflect-%E5%8F%8D%E5%B0%84)
- [Generator](#generator)
- [Promise](#promise)
- [Map／Set／WeakMap／WeakSet](#map%EF%BC%8Fset%EF%BC%8Fweakmap%EF%BC%8Fweakset)
  - [Map 键值对集合](#map-%E9%94%AE%E5%80%BC%E5%AF%B9%E9%9B%86%E5%90%88)
  - [Set 存储唯一值集合](#set-%E5%AD%98%E5%82%A8%E5%94%AF%E4%B8%80%E5%80%BC%E9%9B%86%E5%90%88)
  - [WeakMap 弱引用键键值对集合](#weakmap-%E5%BC%B1%E5%BC%95%E7%94%A8%E9%94%AE%E9%94%AE%E5%80%BC%E5%AF%B9%E9%9B%86%E5%90%88)
  - [WeakSet 弱引用集合](#weakset-%E5%BC%B1%E5%BC%95%E7%94%A8%E9%9B%86%E5%90%88)

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

## 参数处理

1. 默认参数

```js
function foo(x, y=1) {
  console.log(x + y)
}

foo(2) //output: 3
foo(2, 2) // output: 4
```

2. 剩余参数 (rest parameters)

语法

```js
function foo(arg0, ...restArgs) {
  console.log(arg0, restArgs.length)
}

foo(1, 2, 3, 4, 5) // output: 1 4
```

**注意** 剩余参数只能是最后一个命名参数

```js
let x1 = (arg0, ...rest, arg1) {
  console.log(rest) // Uncaught SyntaxError: Unexpected token ...
}
```

3. 命名参数 (named parameters)

```js
function foo(arg0, {opt1, opt2}) {
  console.log(arg0, opt1, opt2)
}

foo(1, {opt1: 2, opt2: 3}) // output: 1 2 3
```

## 符号 Symbol

`symbol` 是一种基本数据类型，`symbol` 值可用于定义对象属性，语法 `Symbol([description])`，参数是字符串类型

### 特性
1. 每一个 `Symbol()` 返回的 `symbol` 都是唯一的

```js
let sym1 = Symbol()
let sym2 = Symbol('me')
let sym3 = Symbol('me')

console.log(sym2 === sym3) // output: false
```

2. `symbol` 不能使用 `new` 进行创建

```js
let sym = new Symbol(); // Uncaught TypeError: Symbol is not a constructor
```

3. `symbol` 不能被枚举

`for ... in` 循环不能枚举出 `symbol`，可以通过 `Object.getOwnPropertySymbols()` 获取

```js
var obj = {}
obj.a = 'a'
obj['b'] = 'b'
obj[Symbol('a')] = 'symbol a'

for (var key in obj) {
  console.log(key) // output: a b
}

Object.getOwnPropertySymbols(obj) // [Symbol('a')]
```

4. `Symbol` 键属性在 `JSON.stringify` 输出时会被忽略

```js
JSON.stringify(obj) // "{"a":"a","b":"b"}"
```

### 方法

1. `Symbol.for(key)` 根据 `key` 寻找 `symbol` 值，如果存在直接返回，不存在则创建 `key` 全局 `symbol`

```js
Symbol.for('bar') === Symbol.for('bar'); // true
Symbol('bar') === Symbol('bar'); // false
Symbol('bar') === Symbol.for('bar') // false
```

2. `Symbol.keyFor(sym)` 根据 `symbol` 值返回 `key` 值

```js
Symbol.keyFor(Symbol.for('tokenString')) === 'tokenString';  // true
```

### 内置 `Symbol`

- `Symbol.iterator` 一个返回一个对象默认迭代器的方法。使用 `for...of`
- `Symbol.toStringTag` 用于对象的默认描述的字符串值。使用 `Object.prototype.toString()`
- ...

更多参考 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

## 类 Class

类定义，构造函数，原型函数，静态函数

```js
class [className] [extends] {
  // class body
}
```

1. 函数可以提升，而类不能提升

```js
var p = new Person() // Uncaught ReferenceError: Person is not defined

class Person {

}
```

2. 类构造函数，原型方法和静态方法

```js
class Person {
  constructor(name) {
    this.name = name
  }

  get fullName() {
  }

  say() {
    console.log(`${this.name} say`)
  }

  static gender() {
    console.log('static method')
  }
}

new Person('Lilei').say();
Person.gender();
```

3. 类继承

类只能继承一个，可以通过 `super` 方法父类方法

```js
class Person {
  constructor(name) {
    this.name = name
  }

  say() {
    console.log(`${this.name} say`)
  }
}

class Teacher extends Person {
  say() {
    super()
    console.log(`${this.name} teacher say`)
  }
}
```

只能继承含有构造函数的类，如果想继承普通对象可以通过 `Object.setPrototypeOf`

```js
var Person = {
  say() {
    console.log(`${this.name} say`)
  }
}

class Teacher {
  constructor(name) {
    this.name = name
  }
}

Object.setPrototypeOf(Teacher, Person)

new Teacher('teacher').say()
```

更多参考 [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

## 模块 Module

`ES6` 里模块会用到两个关键字 `import` 和 `export`

1. `export` 导出可以是 `function/class/var/let/const`

```js
function myFunction() {

}
export { myFunction }
export const PI = 3.1415926
```

2. `export` 导出列表

```js
function myFunction() {

}

class myClass {

}

export { myFunction, myClass }
```

**注意** `export` 可以放在文件任意位置，也可以定义多次，不能重复 `export` 同一内容

3. `export/import` 重命名

重命名通过 `as` 关键字实现

```js
import { myFunction as myFun } from './my-moudle.js'
```

```js
function v1() {}

function v2() {}

export {
  v1 as streamV1,
  v2 as streamV2
}
```

4. 默认导出，只能只有一个 `default`

```js
export default myFunction
```

5. 聚集模块

```js
// 从 `my-module` 模块导入，然后导出里面的 `moduleA` 和 `moduleB` 内容
export { moduleA, moduleB } from 'my-module'

// 导入 `my-module` 模块，然后又全部导出
export * from 'my-module'
```

6. 动态引入

`import ('path/module')` 返回 `Promise` 对象。目前已在 `webpack` 上使用

## 模版字符串 Template strings

### 语法

```js
`string text`

`string text line 1
 string text line 2`

`string text ${expression} string text`

tag `string text ${expression} string text`
```

示例

```js
// 多行
`one line,
another line`

// 变量
var name = 'Lilei';
console.log(`My name is ${name}`) // output: My name is Lilei

// 表达式
function compare(a, b) {
  return a > b;
}

var a = 1, b =2;
console.log(`${a} is ${compare(a, b) ? 'greater than' : 'less than'} ${b}`)
// output: 1 is less than 2
```

### 标签模版字符串 Tagged template literals

标签函数，第一个参数是字符串值数组，后面参数为要替换的表达式

```js
var a = 1, b =2;
function myTag(strings, ...values) {
  console.log(strings); // output: ["", " is ", "", raw: Array(3)]
  console.log(values); // output: [1, 2]

  return 'Tag template';
}

myTag`${a} is ${b}`; // output: "Tag template"
```

内置标签函数 `String.raw` 原始字符串

```js
String.raw`Hello \n World` // output:
```

## Proxy 代理

代理可以用在自定义基础操作行为，比如属性取值，属性赋值，属性枚举，方法调用等。内部提供了一系列 `trap` 来自定义操作行为

### 语法

```js
// target 代理对象，可以是对象，包括数组，函数，代理等
// handler 定义代理操作行为执行函数
var p = new Proxy(target, handler)
```

`handler.get` 示例

```js
// handler.get 定义属性取值方式代理
var obj = {
  a: 'a',
  b: 'b'
}

var p = new Proxy(obj, {
  // target 代理目标对象
  // property 对象属性
  // receiver 代理对象
  get: function (target, property, receiver) {
    if (property === 'b') {
      return 'changed'
    }

    return target[property];
  }
});

console.log(p.a) // output: 'a'
console.log(p.b) // output: 'changed'
```

`handler.apply` 示例

```js
// handler.apply 定义函数调用处理
var p = new Proxy(() => {}, {
  // target 代理目标对象
  // thisArg 函数调用 `this` 对象
  // argumentsList 函数调用参数数组
  apply: function (target, thisArg, argumentsList) {
    console.log(argumentsList.join(','));
  }
});

console.log(p(1, 2, 3)) // output: '1,2,3'
```

更多参看 [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

## Reflect 反射

`Reflect` 提供内置对象 `JavaScript` 操作方法解析，这些方法和 `proxy handlers` 一致，比如 `delete` 删除属性操作，`in` 操作判断，属性取值等

示例

```js
// 取值调用
var obj = {a: 'value is a'}
Reflect.get(obj, 'a') // output: 'value is a'

// 构造函数调用
var obj = Reflect.construct(Foo, args);
// 等同于 var obj = new Foo(...args);
```

更多参看 [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect)

## Generator

`Generator` 通过 `function*` 和 `yield` 来实现简化迭代器

语法

```js
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

var g = gen();
console.log(g.next().value);
console.log(g.next().value);
console.log(g.next().value);
// output: 1 2 3
```

`Generator` 结合 `TJ` 大神的 [`co`](https://github.com/tj/co) 库能很方便控制

不过在 `ES7` 引入 `async/await` 之后，基本是替代了 `generator` 方案

## Promise

用于异步操作，返回允诺对象

```js
new Promise(function (resolve, reject) {
  //...
})
```

![Promsie](/assets/images/posts/js-promise.svg)

示例

```js
// serial 窜行执行
function asyncAdd(value) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 100, ++value)
  })
}

asyncAdd(1).then(asyncAdd).then(value => {console.log(value)}) // output: 3
```

`Promise.all(iterable)` 并行执行，当所有都执行成功后，或者其中一个失败则立马返回进行失败处理

```js
Promise.all([asyncAdd(1), asyncAdd(1)]).then(values => {console.log(values)}) // output: (2) [2, 2]
```

`Promise.race(iterable)` 竞争执行，当其中一个执行成功或者失败时返回进入对应处理

```js
// 可用于模拟阀值，如果服务请求超过100s时，直接返回阀值处理
function remote() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, Math.random() * 200, 'remote call')
  })
}

function threshold() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'threshold call')
  })
}

Promise.race([remote(), threshold()]).then(value => {console.log(value)})
```

## Map／Set／WeakMap／WeakSet

### Map 键值对集合

基本类型 (`string, number, boolean, null, undefined, symbol`)或者对象都可以做为键值

```js
var myMap = new Map();

myMap.set('string', 'primitive key');
myMap.set({}, 'object key');
myMap.set(() => {}, 'function key');

console.log(myMap) // output: Map(3) {"string" => "primitive key", {…} => "object key", ƒ => "function key"}
```

`Object` 和 `Map` 对比

1. `Object` 的键只能是 `String/Symbol`
2. `Map` 是可迭代的，而 `Object` 迭代时得判断是否是该对象属性 `hasOwnProperty`
3. `Object` 是有原型 `prototype` 会有一些保留键值
4. `Map` 在键值对频繁插入删除时，性能更好

### Set 存储唯一值集合

提供唯一值存储，值可以是基本类型和对象引用

```js
var mySet = new Set();

mySet.add(1);
mySet.add('a');
mySet.add(1);

console.log(mySet) // output: Set(2) {1, "a"}
```

### WeakMap 弱引用键键值对集合

**注意** 键的类型必须是对象引用，基本类型不可以，值可以是任何值

```js
var myWeakMap = new WeakMap();
var obj = {};

myWeakMap.set(obj, 'object key');
myWeakMap.has(obj) // output: true

myWeakMap.set(1, 'number'); // Uncaught TypeError: Invalid value used as weak map key
```

### WeakSet 弱引用集合

**注意** 集合值只能是对象引用，基本类型不可以

```js
var myWeakSet = new WeakSet();
var obj = {};

myWeakSet.add(obj);
myWeakSet.has(obj); // output: true

myWeakSet.add(1); // Uncaught TypeError: Invalid value used in weak set
```

参考资料

> https://hacks.mozilla.org/category/es6-in-depth/
>
> https://ponyfoo.com/articles/tc39-ecmascript-proposals-future-of-javascript
>
> https://prop-tc39.now.sh/
>
> https://babeljs.io/learn-es2015/
