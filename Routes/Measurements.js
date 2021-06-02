/*
    Author: Mart Bent
    Date: 2-6-2021
    Ver: 1.0
*/

var express = require('express');
const router = express.Router();
var db = require('../SqlHelper');
var conn = db.getConnection();

router.get('/', (req, res) =>{
      conn.query("SELECT * FROM Measurement order by measurement_date desc", function (err, result) {
      res.send(result);
    });
 });

router.get('/:patientID', (req, res) =>{
  let sql  = "SELECT * FROM Measurement WHERE patient_id ="+req.params.patientID + " order by measurement_date desc";
  conn.query(sql, function (err, result) {
    res.send(result);
  });
});

router.post('/', (req, res) =>{
    if(!req.query.patientID || !req.query.bodyTemperature || !req.query.heartbeat)
    {
        res.send("Not all fields are filled: patientID, bodyTemperature, heartbeat");
        return;
    }
    let sql  = `INSERT INTO Measurement (patient_id, bodyTemperature, heartbeat) VALUES("${req.query.patientID}", "${req.query.bodyTemperature}","${req.query.heartbeat}")`;
    conn.query(sql, function (err, result) {
        if(!err)
        {
          console.log("Adding measurement: " + sql);
          res.send("OK");
        }
        else
        {
             res.send(err);
        }
    });
});

router.delete('/:measurementID', (req, res) =>{
  let sql  = `DELETE FROM Measurement where measurement_id = ${req.params.measurementID}`;
  conn.query(sql, function (err, result) {
         if(!err)
         {
            console.log("Deleting measurement: " + sql);
            res.send("OK");
         }
         else
         {
             res.send(err);
        }
    });
});

module.exports = router;