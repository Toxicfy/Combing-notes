// 变量&&函数 提升

console.log(a); //undefined
var a = 1;
//我们使用了未被声明的变量，这就是提升，但是仅仅是声明提前，赋值没有
// 等价于 ==>
var a;
console.log(a);
a = 1;


// ------------------------

var a = 10;
var a;
console.log(a); // 10
// 等价于 ==>
var a;
var a;
a = 10;
console.log(a);


// -------------------------
console.log(a);

function a() {};
var a = 1;
// 函数也会被提升,并且优先于变量提升
// 等价于 ==>
function a() {}
var a;
console.log(a);
a = 1


// ======= let and const =================
var a = 1;
let b = 2;
const c = 3;
console.log(window.a, window.b, window.c);// 1, undefined, undefined

function test(){
    console.log(a); // a is undefined --- 暂时性死区，我们不能在声明前就使用变量
    let a;
}

test();


// 实际上：提升存在的根本原因就是为了解决函数间互相调用的情况