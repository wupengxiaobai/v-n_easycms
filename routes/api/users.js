//  @login & register
const express = require("express")
const router = express.Router()
const jwt = require('jsonwebtoken');
const passport = require('passport')
const User = require('../../db/models/users')
const keys = require('../../config/keys')

router.get('/emailIsExist', async (req, res) => {
    // console.log('query: ', req.query)
    let emailIsExist = await User.emailIsExist(req.query)

    console.log('emailIsExist: ', emailIsExist)
    if (!(emailIsExist - 0)) {
        res.send({
            code: 0,
            msg: "邮箱可使用，未注册!"
        })
        return
    }
    res.send({
        code: -1,
        msg: "邮箱已被注册！"
    })
})

//  $router POST api/users/register
//  @desc json 数据 
//  @access public
router.post('/register', async (req, res) => {
    console.log('register:', req.body)
    //  查询数据库中是否存在该邮箱
    let ret = await User.register(req.body)
    res
        .status(ret.status)
        .json({
            code: ret.code,
            msg: ret.msg
        })
})

//  $router POST api/users/login
//  @desc token jwt(jsonWebToken) passport
//  @access public
router.post('/login', async (req, res) => {
    let ret = await User.login(req.body);
    if (ret.code == 0) { //  校验登录成功
        let rule = {
            id: ret.data.id,
            email: ret.data.email,
            nickname: ret.data.nickname,
            avatar: ret.data.avatar,
            jurisdiction: ret.data.jurisdiction
        }
        //  制作token并返回给前端
        jwt.sign(rule, keys.secretOrKey, {
            expiresIn: 3600
        }, (err, token) => {
            if (err) throw err
            res.json({
                success: true,
                token: 'Bearer ' + token
            })
        })
    } else {
        res.json({
            status: ret.status,
            code: ret.code,
            msg: ret.msg
        })
    }


})

//  $router GET    api/users/current 
//  @desc   json   current user
//  @access private  
router.get('/current', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    // console.log('userInfo: ' + JSON.stringify(req.user))
    res.json({
        id: req.user.id,
        nickname: req.user.nickname,
        email: req.user.email,
        jurisdiction: req.user.jurisdiction
    })
})

module.exports = router