var express = require('express');
const router = express.Router();
var db = require('../SqlHelper');
var conn = db.getConnection();

router.get('/', (req, res) =>{
    conn.query("SELECT * FROM Patient", function (err, result) {
        res.send(result);
    });
});

router.get('/:patientID', (req, res) =>{
    conn.query("SELECT * FROM patient WHERE patient_id =" + req.params.patientID, function (err, result) {
        res.send(result);
    });
});

router.post('/', (req, res) =>{
let sql  = `INSERT INTO Patient (patient_firstname, patient_lastname, patient_room_no) VALUES("${req.query.patientFirstname}", "${req.query.patientLastname}",${req.query.roomNumber})`;
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

router.delete('/:nurseID', (req, res) =>{
let sql  = `DELETE FROM Patient where patient_id = ${req.params.patientID}`;
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