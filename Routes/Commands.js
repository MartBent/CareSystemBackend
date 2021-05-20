var express = require('express');
const router = express.Router();
var db = require('../SqlHelper');
var conn = db.getConnection();
var notifier = require('../Notifier');

router.get('/measurement', (req, res) =>{
    if(!req.query.roomNumber || req.query.roomNumber === "")
    {
        res.send("ERROR: NO ROOM NUMBER");
        return;
    }

    var roomNum = req.query.roomNumber;
    console.log("Taking a measurement in room: " + roomNum)
    notifier.notifyRobot(roomNum,"MEASUREMENT");
    res.send("OK");

});

router.get('/medicine', (req, res) =>{
    if(!req.query.amazonID || req.query.amazonID === "")
    {
        res.send("ERROR: NO ROOM NUMBER");
        return;
    }
    console.log(req.query.amazonID);
    
    conn.query('SELECT room_no FROM AmazonIdRoomNumber where amazon_id="'+req.query.amazonID+'"', function (err, result) 
    {
        if(result.length < 1)
        {
            console.log(result);
            res.send("No room found with this device");
            return;
        }
        console.log(result);
        var roomNum = req.query.roomNumber;
        console.log("Deploying medicine in room: " + roomNum);
        notifier.notifyRobot(roomNum,"MEDICINE");
        res.send("OK");

    });
});


module.exports = router;