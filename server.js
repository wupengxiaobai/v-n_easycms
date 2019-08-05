const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const passport = require('passport')
const users = require('./routes/api/users')
const profiles = require("./routes/api/profiles")

// 配置、使用 bodyParser 中间件
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())


//  passport 初始化及配置
app.use(passport.initialize())
require("./config/passport")(passport)

//  路由接口挂载
app.use('/api/users', users) //  用户操作相关路由
app.use('/api/profiles', profiles) //  资金数据相关路由


//  端口配置
const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})