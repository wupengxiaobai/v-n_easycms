const dbConnect = require('../connect')
const gravatar = require('gravatar');

module.exports = {
    // 注册
    register: async (params) => {
        // 检测邮箱
        let emailSelectRet = await new Promise((resolve, reject) => {
            dbConnect.query(`select * from users where email = '${params.email}'`, (error, result) => {
                if (error) return reject('err in user select', error)
                return resolve(result)
            })
        })

        if (emailSelectRet.length > 0) {
            return {
                status: 404,
                code: -1,
                msg: '邮箱已注册'
            }
        }

        //  注册
        let avatar = gravatar.url(params.avatar, {
            s: '200',
            r: 'pg',
            d: 'mm' //  无头像设置默认全球公认的无设置图标
        });

        let registerRet = await new Promise((resolve, reject) => {
            dbConnect.query(`insert into users values(
                null, '${params.email}', '${params.password}', '${params.nickname}','${avatar}', ${params.jurisdiction?(params.jurisdiction-0):0},'${new Date()}')`, (error, result) => {
                if (error) return reject('err in user insert!' + error)
                return resolve(result)
            })
        }).then(res => {
            return res.insertId
        }).catch(err => {
            console.log('err: ', err)
        })

        if (registerRet) {
            return {
                status: 200,
                code: 0,
                msg: "注册成功"
            }
        } else {
            return {
                status: 404,
                code: -1,
                msg: "注册失败"
            }
        }
    },
    // 登录
    login: async (params) => {
        let {
            email,
            password
        } = params

        let emailRes = await new Promise((resolve, reject) => {
            dbConnect.query(`select * from users where email = '${email}' limit 1`, (error, result) => {
                if (error) return reject('loginErr in select users: ' + error)
                return resolve(result)
            })
        }).then(res => {
            return res
        }).catch(err => {
            return false
        })

        if (emailRes && !emailRes.length) {
            return {
                code: -1,
                status: 404,
                msg: "用户名不存在！"
            }
        }

        if (emailRes[0].password != password) {
            return {
                code: -1,
                status: 404,
                msg: "密码错误！"
            }
        }

        return {
            code: 0,
            data: emailRes[0],
            status: 200,
            msg: "登录成功！"
        }
    },
    // 邮箱是否存在
    emailIsExist: async (query) => {
        let emailSelectRet = await new Promise((resolve, reject) => {
                dbConnect.query(`select * from users where email = '${query.email}'`, (error, result) => {
                    if (error) return reject('err in user select', error)
                    return resolve(result)
                })
            }).then(res => res)
            .catch(err => {
                console.log(err)
            })

        return emailSelectRet.length
    }
}