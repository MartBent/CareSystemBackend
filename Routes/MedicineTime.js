var express = require('express');
const router = express.Router();
var db = require('../SqlHelper');
var conn = db.getConnection();
var notifier = require('../Notifier');


router.get('/:patientID', (req, res) =>{
    conn.query("SELECT medicinetime_time FROM MedicineTime WHERE patient_id =" + req.params.patientID, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

router.post('/:patientID', (req, res) =>{
let sql  = `INSERT INTO MedicineTime (patient_id, medicinetime_time) VALUES(${req.params.patientID}, "${req.query.time}")`;
conn.query(sql, function (err, result) {
        res.send("OK");
    });
});

module.exports = router;