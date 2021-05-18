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
    var patientID = 0;

    let getsql = "SELECT * FROM Patient where patient_room_no = " + roomNum;

    conn.query(getsql, function (err, result) 
    {
        patientID = result[0].patient_id;
        let sql  = `INSERT INTO Alert (patient_id, alert_message) VALUES (${patientID} ,\'${message}\')`;

        conn.query(sql, function (err, result) 
        {
            if (err){console.log(err); return;}

            console.log();
            notifier.notifyWatches(roomNum, message, 0);
            res.send("OK");
        });
    });
});



module.exports = router;