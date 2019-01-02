const http = require("http");

let items = [];

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // 设置跨域的域名，* 代表允许任意域名跨域
  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // 设置 header 类型
  res.setHeader("Content-Type", "application/json"); // 跨域允许的请求方式
  //

  switch (req.method) {
    case "OPTIONS":
      res.statusCode = 200;
      res.end();
      break;
    case "GET":
      res.write(JSON.stringify(items));
      res.end();
      break;
    case "POST":
      let item = "";
      req.on("data", chunk => {
        item += chunk;
      });
      req.on("end", () => {
        item = JSON.parse(item);
        items.push(item.item);
        res.write(JSON.stringify(items));
        res.end();
      });
      break;
  }
});

server.listen(8899);
