var express = require('express');
const router = express.Router();
var db = require('../SqlHelper');
var notifier = require('../Notifier');

router.post('/measurement', (req, res) =>{
    if(!req.query.roomNumber || req.query.roomNumber === "")
    {
        res.send("ERROR: NO ROOM NUMBER");
        return;
    }

    var roomNum = req.query.roomNumber;
    notifier.notifyRobot(roomNum,"MEASUREMENT");
    res.send("OK");

});

router.post('/medicine', (req, res) =>{
    if(!req.query.roomNumber || req.query.roomNumber === "")
    {
        res.send("ERROR: NO ROOM NUMBER");
        return;
    }

    var roomNum = req.query.roomNumber;
    notifier.notifyRobot(roomNum,"MEDICINE");
    res.send("OK");

});


module.exports = router;