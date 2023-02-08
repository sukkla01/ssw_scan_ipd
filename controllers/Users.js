const jwt = require('jwt-simple')
const md5 = require('md5')
const config = require('../db.config')
const db = require("../config");
const moment = require('moment')

//var time = require('time');

function tokenForUser(user) {
    const timestamp = new Date().getTime()
    return jwt.encode({
        // passowrd: user.fullname,
        username: user.username,
        tel: user.tel,
        tname: user.tname,
        cid: user.cid,
        status : user.status
        // iat: timestamp
    },
        config.secret
    )
}

exports.signin = (req, res, next) => {
    // console.log(req.user)
    res.send({ token: tokenForUser(req.user) })
}



exports.create = async (req, res) => {
    let { body } = req
    console.log(body)
    let d_update = moment().format('YYYY-MM-DD') + ' ' + moment().format('HH:mm:ss')
    var result = ''

    let pass_tmp = md5(body.password);


    const response = await db.query(`SELECT * FROM faststroke_user  where cid='${body.cid}' `);

    if (response.rows.length > 0) {
        let data = {
            msg :'duplicate'
        }
        res.status(402).json(data);
    } else {
        result = await db.query(`INSERT INTO faststroke_user (username,password,pass_md5,cid,tname,tel,d_update,status,dept,platform) VALUES ('${body.username}','${body.password}','${md5(body.password)}','${body.cid}','${body.tname}','${body.tel}','${d_update}','N','${body.dept}','app' ) `);
        res.status(200).json(result.rows);
    }

    


}

exports.create_admin = async (req, res) => {
    let { body } = req
    console.log(body)
    console.log(body.formData)
    let d_update = moment().format('YYYY-MM-DD') + ' ' + moment().format('HH:mm:ss')
    var result = ''

    // let pass_tmp = md5(body.password);


    const response = await db.query(`SELECT * FROM faststroke_user  where cid='${body.formData.cid}' `);
    let status =  body.formData.status ? 'Y' : 'N'

    if (response.rows.length > 0) {
        result = await db.query(`
        UPDATE faststroke_user set 
        tname = '${body.formData.tname}' ,
        username = '${body.formData.username}' ,
        password='${body.formData.password}',
        pass_md5 ='${md5(body.formData.password)}',
        cid ='${body.formData.cid}',
        tel ='${body.formData.tel}',
        status ='${status}',
        dept ='${body.formData.dept}',
        d_update ='${d_update}'
        where cid='${body.formData.cid}'  `)
    } else {
        result = await db.query(`INSERT INTO faststroke_user (username,password,pass_md5,cid,tname,tel,d_update,status,dept) VALUES ('${body.formData.username}','${body.formData.password}','${md5(body.formData.password)}','${body.formData.cid}','${body.formData.tname}','${body.formData.tel}','${d_update}','${status}','${body.formData.dept}' ) `);
    }

    res.status(200).json(result.rows);


}


exports.getUserId = async (req, res) => {
    let cid = req.params.cid
    console.log(cid)
    const response = await db.query(`SELECT *
      FROM faststroke_user 
      WHERE cid ='${cid}'    `);
    res.status(200).json(response.rows);
};


exports.getUserAll = async (req, res) => {
    const response = await db.query(`SELECT *
    FROM faststroke_user  u
    LEFT JOIN faststroke_dept d ON d.hospcode = u.dept
    order by d_update desc   `);
    res.status(200).json(response.rows);
};

exports.del = async (req, res) => {
    let { body } = req
    const response = await db.query(`DELETE FROM faststroke_user WHERE cid ='${body.cid}'  `);
    res.status(200).json(response.rows);
};

exports.updateStatusAll = async (req, res) => {
    const response = await db.query(`update faststroke_user SET status ='Y' WHERE status ='N'  `);
    res.status(200).json(response.rows);
};

exports.updateStatusId = async (req, res) => {
    let { body } = req
    let status = body.status ? 'Y' : 'N'
    console.log(body)
    console.log(status)
    const response = await db.query(`update faststroke_user SET status ='${status}' WHERE cid ='${body.cid}'  `);
    res.status(200).json(response.rows);
};



// exports.findAll = (req, res, next) => {
//     req.getConnection((err, connection) => {
//         if (err) return next(err)
//         var sql = "select * from q.user ";
//         var params = "%" + req.query.term + "%"
//         connection.query(sql, (err, results) => {
//             if (err) return next(err)
//             res.send(results)
//         })
//     })
// }
