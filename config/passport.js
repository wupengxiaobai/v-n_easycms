const keys = require('./keys')
const dbConnect = require('../db/connect')

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        // console.log('jwt_payload: ' + JSON.stringify(jwt_payload))
        
        let user = await new Promise((resolve, reject) => {
            dbConnect.query(`select * from users where id = ${jwt_payload.id} limit 1`, (error, result) => {
                if (error) return reject('error select in users passportVerity: ' + error)
                return resolve(result)
            })
        }).then(res => {
            return res[0]
        }).catch(err => {
            console.log(err)
        })

        // console.log('user: ' + JSON.stringify(user))
        if (user.id) {
            return done(null, user)
        } else {
            return done(null, false)
        }
    }))
}