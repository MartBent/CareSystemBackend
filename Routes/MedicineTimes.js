/*
    Author: Mart Bent
    Date: 2-6-2021
    Ver: 1.0
*/

var express = require('express');
const router = express.Router();
var db = require('../SqlHelper');
var conn = db.getConnection();
var notifier = require('../Notifier');


router.get('/:patientID', (req, res) =>{
    conn.query(`SELECT * FROM MedicineTime WHERE patient_id = ${req.params.patientID} ORDER BY medicinetime_time ASC`, function (err, result) {
        res.send(result);
    });
});

router.post('/:patientID', (req, res) =>{
    if(!req.query.time)
    {
        res.send("NO TIME PROVIDED");
        return;
    }
    conn.query(`SELECT * FROM MedicineTime where medicinetime_time = "${req.query.time}" AND patient_id = ${req.params.patientID}`,  function (err, result) {
        if(result && result.length < 1)
        {
            let sql  = `INSERT INTO MedicineTime (patient_id, medicinetime_time) VALUES(${req.params.patientID}, "${req.query.time}")`;
            conn.query(sql, function (err, result) {
                if(!err)
                {
                    notifier.notifyTimes(req.params.patientID);
                    res.send("OK");
                }
                else
                {
                    res.send(err);
                }
            });
        }
        else
        {
            res.send("OK");
        }
    });
});

router.delete('/:medicineTimeID', (req, res) =>{
let sql  = `DELETE FROM MedicineTime where medicinetime_id = ${req.params.medicineTimeID}`;
conn.query(sql, function (err, result) {
        if(!err)
        {
            res.send("OK");
        }
        else
        {
            res.send(err);
        }
    });
});

module.exports = router;