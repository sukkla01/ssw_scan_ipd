const jwt = require('jwt-simple')
const md5 = require('md5')
const config = require('../db.config')
const db = require("../config");
const moment = require('moment')


exports.getPcr = async (req, res) => {
    let date1 = req.params.date1
    let tyear = parseInt(moment(date1).format('YY')) + 543;
    tyear = tyear.toString().slice(-2)
    let tmonth = moment(date1).format('MMDD')
    let dateLike = tyear + tmonth
    console.log(dateLike)

    const response = await db.query(`SELECT l.hn,concat(p.pname,p.fname,' ',p.lname) AS tname , o.lab_order_result
    FROM lab_head l
    LEFT JOIN lab_order o ON o.lab_order_number = l.lab_order_number
    LEFT JOIN patient p ON p.hn = l.hn
    LEFT JOIN doctor d ON d.cid =p.cid
    WHERE  order_date ='${date1}'
    AND lab_items_code = 1345
    AND  d.cid is not null
    AND d.active = 'Y'
    ORDER BY  lab_order_result 
     `);

    res.status(200).json(response.rows);
};