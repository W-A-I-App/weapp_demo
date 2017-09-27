const fs = require('fs')
const path = require('path')
console.log('\n======================================')
console.log('开始初始化数据库...')

// 初始化 SQL 文件路径
const INIT_DB_FILE_select = path.join(__dirname, './sql/usr_address_select.sql')
const INIT_DB_FILE_insert = path.join(__dirname, './sql/usr_address_insert.sql')

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

// 读取 .sql 文件内容
let content_select = fs.readFileSync(INIT_DB_FILE_select, 'utf8')
let content_insert = fs.readFileSync(INIT_DB_FILE_insert, 'utf8')

console.log('开始执行 SQL 文件...')
let str_current = {}
let usr_id
async function select(ctx, next) {
  usr_id = ctx.query.usr_id
  usr_address.raw(content_select.replace(/\$usr_id/, usr_id)).then(res => {
    str_current = res[0]
  }, err => {
     str_current = err
  })
  ctx.state.data = str_current
}

async function insert(ctx, next) {
  content_insert = content_insert.replace(/\$id/, ctx.query.id)
  content_insert = content_insert.replace(/\$usr_id/, ctx.query.usr_id)
  content_insert = content_insert.replace(/\$usr_name/, ctx.query.usr_name)
  content_insert = content_insert.replace(/\$usr_adress/, ctx.query.usr_adress)
  content_insert = content_insert.replace(/\$first_choice/, ctx.query.first_choice)
  usr_address.raw(content_insert).then(res => {
    console.log('数据库执行成功！')
    process.exit(0)
  }, err => {
    throw new Error(err)
  })
}
module.exports = {
  select,
  insert
}