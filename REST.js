/**
 * Created by cahyo on 2/9/2017.
 */

var mysql = require('mysql');

function REST_ROUTER(router, connection, md5) {
    var self = this;
    self.handleRoutes(router, connection, md5);
}

REST_ROUTER.prototype.handleRoutes = function (router, connection, md5) {
    router.get("/", function (req, res) {
        res.json({"Message": "Hello World !"});
    });
    router.post("/users", function (req, res) {
        var query = "INSERT INTO ??(??,??) VALUES (?,?)";
        var table = ["user_login", "user_email", "user_password", req.body.email, md5(req.body.password)]; //[table,row,row]
        query = mysql.format(query, table); //the record will insert -> insert into user_login(user_email,user_password) values req.body.email, md5(req.body.password)
        connection.query(query, function (err, rows) {
            if (err) {
                res.json({"Error": true, "Message": "Error executing MySQL query"});
            } else {
                res.json({"Error": false, "Message": "User Added !"});
            }
        });
    });
    router.get("/users", function (req, res) {
       var query = "SELECT * FROM ??";
       var table = ["user_login"];
       query=mysql.format(query, table);
       connection.query(query, function (err,rows) {
          if(err) {
              res.json({"error":err, "message":"error executing MYSQL query"});
          } else {
              res.json({"error":"false", "message":"success ", "Users":rows});
          }
       });
    });
    router.get("/users/:user_id", function (req, res) {
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["user_login", "user_id", req.params.user_id];
        query=mysql.format(query, table);
        connection.query(query, function (err,rows) {
            if(err) {
                res.json({"error":err, "message":"error executing MYSQL query"});
            } else {
                res.json({"error":"false", "message":"has insert the "+rows, "Users":rows});
            }
        });
    });
    router.put("/users", function (req, res) {
        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        var table = ["user_login","user_password",md5(req.body.password),"user_email",req.body.email];
        query=mysql.format(query, table);
        connection.query(query, function (err,rows) {
            if(err) {
                res.json({"error":err, "message":"error executing MYSQL query"});
            } else {
                res.json({"error":"false", "message":"has update the password of"+req.body.email});
            }
        });
    });
}

module.exports = REST_ROUTER;