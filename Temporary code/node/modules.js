对于Node.js的模块的应用：

JavaScript
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


在开启http服务的情况下： 我们可以使用url模块对请求的路径进行一系列的操作；

JavaScript
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

