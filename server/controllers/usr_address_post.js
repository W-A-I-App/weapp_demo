const fs = require('fs')
const path = require('path')
console.log('\n======================================')
console.log('开始初始化数据库...')

// 初始化 SQL 文件路径
const INIT_DB_FILE_post = path.join(__dirname, './sql/usr_address_post.sql')

const usr_address = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'wx2919b8ba28ae4f7d',
    database: 'weapp',
    char: 'utf8mb4',
    multipleStatements: true
  }
});

console.log(`准备读取 SQL 文件：${INIT_DB_FILE_post}`)

// 读取 .sql 文件内容
let content_post = fs.readFileSync(INIT_DB_FILE_post, 'utf8')

console.log('开始执行 SQL 文件...')
let str_current = {}
let usr_id
async function post(ctx, next) {
  console.log(content_post)
  console.log(ctx.query.id)
  content_post.replace(/\$id/, ctx.query.id)
  content_post.replace(/\$usr_id/, ctx.query.usr_id)
  content_post.replace(/\$usr_name/, ctx.query.usr_name)
  content_post.replace(/\$usr_adress/, ctx.query.usr_adress)
  content_post.replace(/\$first_choice/, ctx.query.first_choice)
  console.log(content_post)
  usr_address.raw(content_post).then(res => {
    console.log(res)
    console.log(res[0][0].usr_id)
    str_current = res[0]
  }, err => {
    str_current = err
  })
  ctx.state.data = str_current
}
module.exports = {
  post
}