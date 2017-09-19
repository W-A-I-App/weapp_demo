const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'wx2919b8ba28ae4f7d',
    database: 'cAuth',
    char: 'utf8mb4',
    multipleStatements: true
  }
});
let str_current
let ii = 0
function get(ctx, next) {
  knex.select().from('test_chenglei').then(ctx => {
    console.log(ctx)
    console.log(ctx[0].open_id)
    str_current = ctx[ii].open_id
    ii = ii +1
    console.log(ii)
  })
  ctx.state.data = {
    msg: str_current
  }
}
module.exports = {
  get
}