module.exports = {
    // npm run build时将默认生成的dist文件夹下所有文件输出到指定地址中
    outputDir: __dirname + '/../server/admin',
    // 生产环境下指定静态文件的相对地址
    publicPath: process.env.NODE_ENV === 'production' ? '/admin/' : '/'
}