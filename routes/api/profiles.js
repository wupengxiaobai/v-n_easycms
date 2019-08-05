//  @profile(资金相关接口)
const express = require('express')
const router = express.Router()
const Profile = require('../../db/models/profile')
const passport = require('passport')

//  $router get api/profile/test
//  @desc json 测试
//  @asses public
router.get('/test', async (req, res) => {
    res.send({
        msg: 'profile test 测试成功'
    })
})

//  $router POST api/profile/add
//  @desc json 添加资金数据
//  @access private 
router.post('/add', passport.authenticate('jwt', {
    session: false
}), async (req, res) => {
    let addProfileRes = await Profile.addProfile(req.body)
    if (addProfileRes.insertId) {
        res.send({
            status: 200,
            msg: "添加成功！"
        })
    }
})

//  $router GET api/profile
//  @desc json 获取所有资金信息
//  @access private 
router.get('/', passport.authenticate('jwt', {
    session: false
}), async (req, res) => {
    let profileRes = await Profile.getProfileRes()

    if (!profileRes.length) {
        res.send({
            code: -1,
            msg: "没有任何数据！"
        })
    } else {
        res.send({
            code: 0,
            data: profileRes,
            msg: "获取数据成功！"
        })
    }
})

//  $router GET api/profile
//  @desc json 获取单个资金信息
//  @access private 
router.get('/:id', passport.authenticate('jwt', {
    session: false
}), async (req, res) => {
    let profileRes = await Profile.getProfileResById(req.params)

    if (!profileRes.length) {
        res.send({
            status: 404,
            msg: "没有任何数据！"
        })
    } else {
        res.send({
            status: 200,
            data: profiles[0],
            msg: "获取数据成功！"
        })
    }
})

//  $router POST api/profile/edit
//  @desc json 编辑单个资金信息
//  @access private
router.post('/edit/:id', passport.authenticate('jwt', {
    session: false
}), async (req, res) => {
    console.log(req.params, req.body)
    let profileRes = await Profile.editProfile(req.params, req.body)

    if (profileRes.affectedRows) {
        res.send({
            status: 200,
            msg: '修改数据成功！'
        })
    } else {
        res.send({
            status: 404,
            msg: '修改数据失败！'
        })
    }
})

//  $router GET api/profile/delete
//  @desc json 删除单个资金信息
//  @access private
router.get('/delete/:id', passport.authenticate('jwt', {
    session: false
}), async (req, res) => {
    let delProfileRes = await Profile.deleteProfile(req.params)

    if (delProfileRes.affectedRows) {
        res.send({
            code: 0,
            msg: '删除数据成功！'
        })
    } else {
        res.send({
            code: 1,
            msg: '删除数据失败！'
        })
    }
})

module.exports = router