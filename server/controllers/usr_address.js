const fs = require('fs')
const path = require('path')
console.log('\n======================================')
console.log('开始初始化数据库...')

// 初始化 SQL 文件路径
const INIT_DB_FILE_select = path.join(__dirname, './sql/usr_address_select.sql')
const INIT_DB_FILE_insert = path.join(__dirname, './sql/usr_address_insert.sql')
const INIT_DB_FILE_update = path.join(__dirname, './sql/usr_address_update.sql')
const INIT_DB_FILE_delete = path.join(__dirname, './sql/usr_address_delete.sql')

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
let content_update = fs.readFileSync(INIT_DB_FILE_update, 'utf8')
let content_delete = fs.readFileSync(INIT_DB_FILE_delete, 'utf8')

console.log('开始执行 SQL 文件...')
let str_current = {}

async function Select(ctx, next) {
  usr_id = ctx.query.usr_id
  id = ctx.query.id
  console.log(content_select.replace(/\$usr_id/, usr_id))
  if (usr_id){
    content_select = content_select.replace(/\$usr_id/, usr_id);
    content_select = content_select.replace(/\$id/, '\'\'');
  }
  else{
    content_select = content_select.replace(/\$id/, id);
    content_select = content_select.replace(/\$usr_id/, '\'\'');
  }
  console.log(content_select)
  await usr_address.raw(content_select).then(res => {
    str_current = res[0]
  }, err => {
     str_current = err
  })
  ctx.state.data = str_current
}

async function Insert(ctx, next) {
  content_insert = content_insert.replace(/\$usr_id/, ctx.query.usr_id)
  content_insert = content_insert.replace(/\$usr_name/, ctx.query.usr_name)
  content_insert = content_insert.replace(/\$contacter/, ctx.query.contacter)
  content_insert = content_insert.replace(/\$telephone/, ctx.query.telephone)
  content_insert = content_insert.replace(/\$usr_address/, ctx.query.usr_address)
  content_insert = content_insert.replace(/\$first_choice/, ctx.query.first_choice)
  console.log(content_insert)
  usr_address.raw(content_insert).then(res => {
    console.log('数据库执行成功！')
    process.exit(0)
  }, err => {
    throw new Error(err)
  })
}

async function Update(ctx, next) {
  content_update = content_update.replace(/\$id/, ctx.query.id)
  content_update = content_update.replace(/\$first_choice/, ctx.query.first_choice)
  content_update = content_update.replace(/\$usr_name/, ctx.query.usr_name)
  content_update = content_update.replace(/\$contacter/, ctx.query.contacter)
  content_update = content_update.replace(/\$telephone/, ctx.query.telephone)
  content_update = content_update.replace(/\$usr_address/, ctx.query.usr_address)
  console.log(content_update)
  usr_address.raw(content_update).then(res => {
    console.log('数据库执行成功！')
    process.exit(0)
  }, err => {
    throw new Error(err)
  })
}

async function Delete(ctx, next) {
  content_delete = content_delete.replace(/\$id/, ctx.query.id)
  content_delete = content_delete.replace(/\$usr_id/, ctx.query.usr_id)
  console.log(content_delete)
  usr_address.raw(content_delete).then(res => {
    console.log('数据库执行成功！')
    process.exit(0)
  }, err => {
    throw new Error(err)
  })
}

module.exports = {
  Select,
  Insert,
  Update,
  Delete
}
