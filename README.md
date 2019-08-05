# node 环境搭建

## 后端笔记
-   路由接口的书写

## 前端笔记
-   路由守卫的使用
-   element-ui 表单自动校验功能
    + message 组件的使用

## 依赖使用笔记
- concurrently 前后端连载（一个命令启动两个服务）
    `npm i concurrently`
    ```js
    //  修改后端package.json
    "scripts": {
        "client-install":"npm install --prefix client",
        "client":"npm start --prefix client",
        "start": "node server.js",
        "server": "nodemon server.js",
        "dev":"concurrently \"npm run server\" \"npm run client\""  // * 使用 npm run dev 启动连载项目
    }

    //  修改前端package.json
    "scripts": {
        "serve": "vue-cli-service serve",
        "build": "vue-cli-service build",
        "lint": "vue-cli-service lint",
        "start":"npm run serve"
    }

    # 启动项目
    npm run dev
    ```

- *jsonwebtoken `获取token(令牌)`
    ```JAVASCRIPT
        jwt.sign(规则,privateKey,过期时间,回调函数)
        jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' }, function(err, token) {
            console.log(token);
        });
    ```
-  *jwt-decode `解析token`
    ```JAVASCRIPT
    jwt_decode(token)
    
    ```

- *passport & passport-jwt `验证token`
    +   安装&初始化
        ```js
        //  安装 npm i passport passport-jwt
        //  引入及配置
        const passport = require('passport')
        app.use(passport.initialize())
        //  引入配置(传递passport)&执行
        require('./config/passport')(passport)
        ```
    +   配置
    ```JS
        //  需要的参数及操作对象
        const keys = require('./keys')
        const dbConnect = require('../db/connect') 
        //  配置开始
        const JwtStrategy = require('passport-jwt').Strategy,
        ExtractJwt = require('passport-jwt').ExtractJwt;
        const opts = {}
        opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
        opts.secretOrKey = keys.secretOrKey;
        //  导出配置函数
        module.exports = (passport) => {
            passport.use(new JwtStrategy(opts, async(jwt_payload, done) => {
                //  jwt_payload -> 自动校验token成功所得的信息
                let user = await new Promise((resolve, reject) => {
                    dbConnect.query(`select * from users where id = ${jwt_payload.id} limit 1`, (error, result) => {
                        if (error) return reject('error:' + error)
                        return resolve(result)
                    })
                }).then(res => {
                    return res[0]
                }).catch(err => {
                    console.log(err)
                })
                if (user.id) {
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            }))
        }
    ```   
    +   使用passport自动校验token
    ```JS
        router.get('/current',passport.authenticate('jwt',{session:false}),(req,res => {
            res.json({
                id:req.user.id,
                nickname:req.user.nickname,
                email:req.user.email,
                jurisdiction:req.user.jurisdiction
            })
        }))
    ```

- bcrypt  password 加密

- gravatar 全球公认头像 

- nodemon 自动保存重启服务器
    `nodemon server.js`

## 数据库操作返回数据
- 插入返回数据
    ```
        OkPacket: {
            fieldCount: 0,
            affectedRows: 1,
            insertId: 2,
            serverStatus: 2,
            warningCount: 0,
            message: '',
            protocol41: true,
            changedRows: 0 
        } 
    ```

# 说明
    -  npm run dev启动
    -  sql数据存在根目录下