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

router.get('/measurement', (req, res) =>{
    if(!req.query.amazonID || req.query.amazonID === "")
    {
        res.send("ERROR: NO ROOM NUMBER");
        return;
    }
    conn.query('SELECT room_no FROM AmazonIdRoomNumber where amazon_id="'+req.query.amazonID+'"', function (err, result) 
    {
        var roomNum = 0;
        if(result.length < 1)
        {
            console.log(result);
            res.send("No room found with this device");
            return;
        }
        else
        {
            roomNum = result[0].room_no;
        }
        console.log("Taking a measurement in room: " + roomNum)
        notifier.notifyRobot(roomNum,"MEASUREMENT");
        res.send("OK");
    });

});

router.get('/medicine', (req, res) =>{
    if(!req.query.amazonID || req.query.amazonID === "")
    {
        res.send("ERROR: NO ROOM NUMBER");
        return;
    }
    
    conn.query('SELECT room_no FROM AmazonIdRoomNumber where amazon_id="'+req.query.amazonID+'"', function (err, result) 
    {
        var roomNum = 0;
        var pills = 0;
        if(result.length < 1)
        {
            res.send("No room found with this device");
        }
        else
        {
            roomNum = result[0].room_no;
            //conn.query('UPDATE Patient SET pillsRemaining = pillsRemaining - 1 where patient_room_no = '+roomNum+" AND pillsRemaining > 0", null)
            //Handled in the robot
            
            conn.query('SELECT * FROM Patient where patient_room_no = '+roomNum, function (err, result2) 
            {
                if(result2 && result2.length > 0)
                {
                    pills = result2[0].pillsRemaining;
                    res.send("OK");
                    console.log("Deploying medicine in room: " + roomNum + " " + pills);
                    notifier.notifyRobot(roomNum, pills + " MEDICINE");
                }
                else
                {
                    res.send("ERROR PATIENT NOT FOUND");
                }
                
            });
        }
    });
});

router.get('/assignRoom', (req, res) =>{
    if(!req.query.amazonID || req.query.amazonID === "" || !req.query.roomNumber || req.query.roomNumber === "")
    {
        res.send("ERROR: NO ROOM NUMBER OR AMAZON ID");
        return;
    }

    conn.query(`DELETE FROM AmazonIdRoomNumber WHERE amazon_id = \"${req.query.amazonID}\"`, function (err, result) 
    {  
        conn.query(`INSERT INTO AmazonIdRoomNumber (amazon_id, room_no) VALUES (\"${req.query.amazonID}\", ${req.query.roomNumber})`, function (err, result) 
        {   
            console.log("Device has been assigned to room: " + req.query.roomNumber)
            res.send("OK");
        });
    });
});


module.exports = router;