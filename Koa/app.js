const Koa = require('koa');
const json = require('koa-json');
const mysql = require('mysql');
const router = require('koa-router')();
const app = new Koa();

app.use(json());


const connection = mysql.createConnection({
    host : 'localhost',
    port : 3306,
    database : 'testNode',
    user : 'root',
    password : 'root'
})

router.get('/search', ctx => {
    const searchSql = `SELECT * FROM user`;
    connection.query(searchSql, (err, res) => {
        if (err) throw err;
        console.log(res);
    })

})

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())
app.listen(8000, () => {
    console.log("server run at localhost:8000")
});