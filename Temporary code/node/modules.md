#对于 Node.js 的模块的应用：

```JavaScript
const http = require("http");
const {parse} = require("url");

const server = http.createServer((request, response) => {
    //下面的代码在服务开启的时候一直运行

    console.log(parse(request.url));
    // 设置相应头--状态/相应类型/字符编码
    response.setHeader("200",{"Content-Type":"text/html",charset:"UTF-8"});
    response.write("Hello Url Modules");//写入信息
    response.end();//结束相应
});

server.listen(8080,"127.0.0.1");
```

在开启 http 服务的情况下： 我们可以使用 url 模块对请求的路径进行一系列的操作；

```JavaScript
const http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs");

http.createServer((request, response) => {
    response.setHeader("200", {"Content-Type": "text/html", charSet: "UTF-8"});

    const filePath = path
        .join(path.resolve(process.argv[2] || "."), url.parse(request.url).pathname);

    fs.stat(filePath, ((err, stats) => {
        if (!err && stats.isFile()) { //没有错误并且是一个文件
            fs.createReadStream(filePath).pipe(response);
        } else if (!err && stats.isDirectory()) {//没有错误是一个目录，默认加载index.html
            fs.readdir(filePath, ((err1, files) => {
                const defaultName = "index.html";
                if (files.includes(defaultName)) {
                    fs.createReadStream(path.join(filePath, defaultName)).pipe(response);
                }
            }))
        } else {
            response.write("404");
            response.end();
        }
    }))

}).listen(8000);

```

fs 模块

```JavaScript
const fs = require('fs');
const log = console.log.bind(this);
//基础操作
fs.mkdir(); //创建文件目录
fs.rmdir(); //删除文件目录(空文件夹)
fs.unlink(); //删除文件
//覆盖写入
fs.writeFile('index.js', "data ", err => {
    err ? log(err) : log('success');
});
//追加写入
fs.appendFile('index.js', 'append data', err => {
    err ? log(err) : log('append success');
});


//判断文件是否存在、可读、可写   --- 值得注意的是：适用于判断而不操作该文件，如果操作就直接在操作中处理错误；
let {F_OK, R_OK, W_OK_} = fs.constants;
mode = F_OK || R_OK || W_OK_;
fs.access("a.js", mode, err => {
    if (err) console.log(err.code); //ENOENT
});

//判断文件属性
fs.stat('./1/1.js', (err, stats) => { //判断基于 stats 的方法或者属性
    if (err) console.log(err);
    // stats.isFile()
    // stats.isDirectory()
    console.log(stats.isDirectory(), stats.isFile())
});

//读取文件
fs.readFile("index.js", (err, data) => {
    err ? log(err) : log(data); // data (buffer)
});
//读取目录
fs.readdir('node_modules',(err, files) => {
    if (err) log(err);
    console.log(files); //['1.js','2.js]
});

//rename(重命名、剪切)
fs.rename("index.js", "test/index.js", err => {
  err ? log(err) : log("success");
});
```
