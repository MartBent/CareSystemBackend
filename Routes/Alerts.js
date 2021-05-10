var express = require('express');
const router = express.Router();
var db = require('../SqlHelper');
var conn = db.getConnection();
var notifier = require('../Notifier');

router.get('/call', (req, res) =>{
    if(!req.query.roomNumber || req.query.roomNumber === "")
    {
        res.send("ERROR: NO ROOM NUMBER");
        return;
    }
    if(!req.query.message)
    {
        res.send("ERROR: NO MESSAGE");
        return;
    }

    var roomNum = req.query.roomNumber;
    var message = req.query.message;
    var patientID;

    conn.query("SELECT * FROM Patient where patient_room_no = " + roomNum, function (err, result) {
        //console.log(result[0].patient_id);
        //patientID = result[0].RowDataPacket.patient_id;
    });
  

   // let sql  = `INSERT INTO Alert (patient_id, alert_message, helped) VALUES ( ${patient_id} , ${message}, 0)`;

    // conn.query(sql, function (err, result) {
    //   if (err) throw err;
    //   res.send(result);
    // });
    console.log("Help called on room: " + roomNum);
    notifier.notifyWatches(roomNum, message, 0);
    res.send("OK");

});

module.exports = router;