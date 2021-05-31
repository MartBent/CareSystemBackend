var express = require('express');
const router = express.Router();
var db = require('../SqlHelper');
var conn = db.getConnection();

router.get('/', (req, res) =>{
      conn.query("SELECT * FROM Nurse", function (err, result) {
      res.send(result);
    });
 });

router.get('/:nurseID', (req, res) =>{

  let sql  = "SELECT * FROM Nurse WHERE nurse_id ="+req.params.nurseID;
  conn.query(sql, function (err, result) {
    res.send(result);
  });
});

router.post('/', (req, res) =>{
let sql  = `INSERT INTO Nurse (nurse_firstname, nurse_lastname, nurse_function) VALUES("${req.query.nurseFirstname}", "${req.query.nurseLastname}","${req.query.nurseFunction}")`;
conn.query(sql, function (err, result) {
        if(!err)
        {
          console.log("Adding nurse: " + sql);
          res.send("OK");
        }
        else
        {
             res.send(err);
        }
    });
});

router.delete('/:nurseID', (req, res) =>{
  let sql  = `DELETE FROM Nurse where nurse_id = ${req.params.nurseID}`;
  conn.query(sql, function (err, result) {
         if(!err)
         {
             console.log("Deleting nurse: " + sql);
             res.send("OK");
         }
         else
         {
             res.send(err);
        }
    });
});

module.exports = router;