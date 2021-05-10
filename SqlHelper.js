var mysql = require('mysql');

var conn = mysql.createConnection({
    socketPath: "/var/run/mysqld/mysqld.sock",
    user: "Mart",
    password: "Bent",
    database: "Hospital"
  });
  
conn.connect(function(err) {
    if(err)
    {
        console.log(err);
        return;
    }
    console.log("DB Connected!");
});

module.exports = {
    getConnection: function () {
        return conn;
    }
  };