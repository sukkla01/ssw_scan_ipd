const passport = require('passport');
const LocalStrategy = require('passport-local')
const JwtStrategy = require('passport-jwt').Strategy,
     ExtractJwt = require('passport-jwt').ExtractJwt
const md5 = require('md5');

const db = require('../config')
const config = require('../db.config')
const localOptions = { passReqToCallback: true }
const localLogin = new LocalStrategy(localOptions, function (req, username, password, done) {
    db.query(`select username,pass_md5,dept,tname,cid,status,tel from faststroke_user where  username= '${username}' `, (err, row) => {

           console.log(row.rows[0].pass_md5)
           console.log( md5(password))
        if (err) return console.log(err)

        if (!row.rows.length) return done(null, false)
        
        if (row.rows[0].pass_md5 !== md5(password)) {
            
            return done(null, false)
            
        } else {
            console.log(row.rows[0])
            return done(null, row.rows[0])
        }
    });
//    let aa = {
//         username: 'ict009',
//         password: 'ph634k',
//         dept: '1042',
//         tname: 'สุจินต์ สุกกล้า',
//         email: 'ict009@swsalary.com'
//       }
//       return done(null, aa)
})
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('token'),
    secretOrKey: config.secret,
    passReqToCallback: true
};
const jwtRoute = new JwtStrategy(jwtOptions, function (req, payload, done) {
    // console.log(payload.username)
    db.query(`select username,password,dept,tname,cid,status,tel,pass_md5 from faststroke_user where  username= '${payload.username}' `, (err, row) => {
        // console.log(row)
        if (err) return console.log(err)
        if (!row.rows.length) return done(null, false);
        
        return done(null, row.rows[0])
    });

})
passport.use(localLogin)
passport.use(jwtRoute)