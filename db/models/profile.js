const dbConnect = require('../connect')

module.exports = {
    // 添加
    addProfile: async (params) => {
        // console.log('params: ' + JSON.stringify(params))
        let profileData = {
            type: params.type,
            describe: params.describe,
            income: params.income,
            expend: params.expend,
            cash: params.cash,
            remark: params.remark,
            createTime: +new Date
        }

        let addProfileRes = await new Promise((resolve, reject) => {
            dbConnect.query(`insert into profiles values(null,'${profileData.type}','${profileData.describe}','${profileData.income}','${profileData.expend}','${profileData.cash}','${profileData.remark}',${profileData.createTime})`, (error, result) => {
                if (error) return reject('error: ' + error)
                return resolve(result)
            })
        }).then(res => {
            return res
        }).catch(err => {
            console.log(err)
        })

        return addProfileRes
    },
    //  获取所有
    getProfileRes: async () => {
        let profiles = await new Promise((resolve, reject) => {
            dbConnect.query(`select * from profiles`, (error, results) => {
                if (error) return reject('error: ' + error)
                return resolve(results)
            })
        }).then(res => {
            return res
        }).catch(err => {
            console.log(err)
        })
        return profiles
    },
    //  获取单个
    getProfileResById: async (params) => {
        let profiles = await new Promise((resolve, reject) => {
            dbConnect.query(`select * from profiles where id = ${params.id}`, (error, results) => {
                if (error) return reject('error: ' + error)
                return resolve(results)
            })
        }).then(res => {
            return res
        }).catch(err => {
            console.log(err)
        })

        return profiles
    },
    //  编辑
    editProfile: async (params, body) => {
        console.log(params, body)
        let profileData = {
            type: body.type,
            describe: body.describe,
            income: body.income,
            expend: body.expend,
            cash: body.cash,
            remark: body.remark,
            createTime: +new Date
        }
        let profileRes = await new Promise((resolve, reject) => {
                dbConnect.query(`update profiles set type='${profileData.type}',\`describe\`='${profileData.describe}',income='${profileData.income}',expend='${profileData.expend}',cash='${profileData.cash}',remark='${profileData.remark}',createTime='${profileData.createTime}' where id=${params.id}`, (error, results) => {
                    if (error) return reject('error edit in profiles : ' + error)
                    return resolve(results)
                })
            }).then(res => {
                return res
            })
            .catch(err => {
                console.log(err)
            })

        return profileRes
    },
    //  删除
    deleteProfile: async (params) => {
        let delProfileRes = await new Promise((resolve, reject) => {
                dbConnect.query(`delete from profiles where id = ${params.id}`, (error, results) => {
                    if (error) return reject('error delete in profiles: ' + error)
                    return resolve(results)
                })
            })
            .then(res => res)
            .catch(err => {
                console.log(err)
            })

        // console.log('profile: ', delProfileRes)
        return delProfileRes
    }
}