var mysql = require("mysql");
var pool = mysql.createPool(require("../../config").database.connection);

module.exports = function query(sql, parm) {
  return new Promise(async (resolve, reject) => {
    if (parm) {
      pool.query(sql, parm, (err, rows, fields) => {
        if (!err) {
          resolve(rows); // on Success
        } else {
          reject(rows.solution);
        } // on Fail
      });
    } else {
      pool.query(sql, (err, rows, fields) => {
        if (!err) {
          resolve(rows); // on Success
        } else {
          reject(err);
        } // on Fail
      });
    }
  });
};
