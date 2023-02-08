const jwt = require('jwt-simple')
const md5 = require('md5')
const config = require('../db.config')
const db = require("../config");
const moment = require('moment')



exports.getDrugScanIpd = async (req, res) => {
    // let date1 = req.params.date1

    const response = await db.query(`SELECT i.hn, s.ipt_doctor_scan_id,s.an,rxdate,scan_datetime,scan_staff,concat(p.pname,p.fname,' ',p.lname) AS tname ,  
    w.name as wname  ,  t.ipt_doctor_scan_type_name,a.bedno,s.ipt_doctor_scan_type_id,display_color
    FROM ipt_doctor_scan   s
    LEFT JOIN ipt i ON i.an = s.an
    LEFT JOIN patient p ON p.hn = i.hn
    LEFT JOIN ward w ON w.ward = i.ward
    LEFT JOIN iptadm a ON a.an = i.an
    LEFT JOIN ipt_doctor_scan_type_ict9 t ON t.ipt_doctor_scan_type_id = s.ipt_doctor_scan_type_id
    WHERE   rxdate = CURRENT_DATE   order by  scan_datetime  desc`);

    res.status(200).json(response.rows);
};


exports.updateTypeId = async (req, res) => {
    let { body } = req
    console.log()
    const response = await db.query(`UPDATE  ipt_doctor_scan  SET  ipt_doctor_scan_type_id ='${body.scan_type_id}'  WHERE ipt_doctor_scan_id ='${body.ipt_doctor_scan_id}'    `);
    res.status(200).json(response.rows);
};


exports.getDrugScanIpdSearch = async (req, res) => {
    let txtsearch = req.params.txtsearch

    const response = await db.query(`SELECT i.hn, s.ipt_doctor_scan_id,s.an,rxdate,scan_datetime,scan_staff,concat(p.pname,p.fname,' ',p.lname) AS tname ,  
    w.name as wname  ,  t.ipt_doctor_scan_type_name,a.bedno,s.ipt_doctor_scan_type_id,display_color
    FROM ipt_doctor_scan   s
    LEFT JOIN ipt i ON i.an = s.an
    LEFT JOIN patient p ON p.hn = i.hn
    LEFT JOIN ward w ON w.ward = i.ward
    LEFT JOIN iptadm a ON a.an = i.an
    LEFT JOIN ipt_doctor_scan_type_ict9 t ON t.ipt_doctor_scan_type_id = s.ipt_doctor_scan_type_id
    WHERE     concat(i.hn,s.an) like '%` + txtsearch + `%'   `);

    res.status(200).json(response.rows);
};
