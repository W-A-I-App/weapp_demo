const fs = require('fs')
const path = require('path')
console.log('\n======================================')
console.log('开始初始化数据库...')

// 初始化 SQL 文件路径
const INIT_DB_FILE = path.join(__dirname, './sql/usr_address.sql')

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

console.log(`准备读取 SQL 文件：${INIT_DB_FILE}`)

// 读取 .sql 文件内容
let content = fs.readFileSync(INIT_DB_FILE, 'utf8')

console.log('开始执行 SQL 文件...')
let str_current = {}
let usr_id
async function get(ctx, next) {
  usr_id = 'chenglei01'
  usr_address.raw(content.replace(/\$usr_id/, usr_id)).then(res => {
    console.log(res)
    console.log(res[0][0].usr_id)
    str_current = res[0]
  }, err => {
     str_current = err
  })
  ctx.state.data = str_current
}
module.exports = {
  get
}