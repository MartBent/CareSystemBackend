var express = require('express');
const router = express.Router();
var db = require('../SqlHelper');

router.get('/', (req, res) =>{
    var result = db.query("SELECT * FROM Patient");
    res.send(result);
});

module.exports = router;