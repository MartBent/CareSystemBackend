var express = require('express');
const router = express.Router();

var sqlhelp = require('../SqlHelper');
const conn = sqlhelp.getConnection();

router.get('/', (req, res) =>{
      conn.query("SELECT * FROM Nurse", function (err, result) {
      if (err) throw err;
      res.send(result);
    });
 });
 router.get('/:nurseID', (req, res) =>{
 
   let sql  = "SELECT * FROM Nurse WHERE nurse_id ="+req.params.nurseID;
    conn.query(sql, function (err, result) {
      if (err) throw err;
      res.send(result);
    });
  });

module.exports = router;