
const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
    const {page, openid} = ctx.request.query
    const size = 5
    const mysqlSelect = mysql('books')
                  .select('books.*', 'cSessionInfo.user_info')
                  .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id')
                  .orderBy('books.count', 'desc')
    let books
    if(openid){
        // 根据opid过滤
        books = await mysqlSelect.where('books.openid', openid)
    }else{
        // 全部图书 分页
        books = await mysqlSelect.limit(size).offset(Number(page) * size)
        // books = await mysqlSelect
        // console.log(books)
    }
    // .orderBy('id','desc')
    ctx.state.data = {
        // list:books
        list: books.map(v => {
            const info = JSON.parse(v.user_info)
            return Object.assign({}, v, {
                user_info: {
                    nickName: info.nickName
                }
            })
        })
    }
}
