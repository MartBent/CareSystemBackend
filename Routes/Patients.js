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
    conn.query("SELECT * FROM Patient WHERE patient_id = " + req.params.patientID, function (err, result) {
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

router.put('/:patientID', (req, res) =>{
    if(!req.query.patientFirstname || !req.query.patientLastname || !req.query.roomNumber || !req.params.patientID)
    {
        res.send("Not all fiels are filled: patientFirstname, patientLastname, roomNumber");
        return;
    }
    let sql  = `UPDATE Patient SET patient_firstname = "${req.query.patientFirstname}", patient_lastname = "${req.query.patientLastname}", patient_room_no = "${req.query.roomNumber}" WHERE patient_id = "${req.params.patientID}"`;
    conn.query(sql, function (err, result) {
        if(!err)
        {
            console.log("Updating patient: " + sql);
            res.send("OK");
        }
        else
        {
            res.send(err);
        }
    });
});

router.delete('/:patientID', (req, res) =>{
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