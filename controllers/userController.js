
const bcrypt = require("bcrypt");
const saltRounds = 10;

var ObjectId = require('mongodb').ObjectId; 

module.exports = {
    login: function (app, req, res) {
        console.log("login entered")
        let emailAddress = "emailAddress"//req.body.emailAddress;
        let password = "password"//req.body.password;
    
        app
        .set("myDb")
        .collection("usersCollection")
        .find({ emailAddress: emailAddress })
        .toArray(function (err, docs) {
        if (err) {
          console.error(err);
        }
        if (docs.length > 0) {
            bcrypt.compare(password, docs[0].password, function(err, result) {
            console.info(result);
            if (result == true) {
              req.session.login = true;
              
              res.json({ msg: "found " +emailAddress  })
              //res.redirect("/example");
            }
          });
        } else {            
            res.json({ msg: "Not Found" })
          //res.redirect("/login");
        }
        
      });
    },
    viewAll: function (app, req, res) {
        console.info("View All controller")
        app.set('myDb').collection('usersCollection').find({}).toArray(function (err, docs) {
            if (err) {
                console.error(err)
            }
            res.json(docs)
        })
    },
    viewItem: function (app, req, res) {
        console.info("View One controller")
        let userID = req.params.userID;
        var o_id = new ObjectId(userID);
        app.set('myDb').collection('usersCollection').find({"_id": o_id}).toArray(function(err, docs) {
            if (err) {
                console.error(err)
            }
            console.dir(docs);
            return res.render('oneUser', {
                title : "Some Title",
                film: docs[0]
                });
        })
    },
    addItem: function (app, req, res) {
        console.info("POST controller")
        var newUser = req.body;
        console.dir(newUser);
        app.get('myDb').collection("usersCollection").insertOne(newUser,
            function (err, dbResp) {
                if (err) {
                    console.error(err)
                }
                if (dbResp.insertedCount === 1) {
                    res.json({ msg: "Successfully Added" + dbResp.insertedId })

                } else {
                    res.json({ msg: "Not Found" })
                }
            })
    },
    amendItem: function (app, req, res) {
        console.info("PUT / UPDATE controller")
        var amendUser = req.body;
        let userID = amendUser.userID;
        var o_id = new ObjectId(userID);
        console.info(o_id);
        app.get('myDb').collection("usersCollection").updateOne(
            { _id: o_id },
            { $set: { "firstName": amendUser.firstName, "lastName": amendUser.lastName, "emailAddress": amendUser.emailAddress, "age": amendUser.age , "password":amendUser.password} },
            function (err, dbResp) {
                if (err) {
                    console.error(err)
                }
                if (dbResp.modifiedCount === 1) {
                    res.json({ msg: "Successfully Amended" })
                } else {
                    res.json({ msg: "Not Found" })
                }
            })
    },
    deleteItem: function (app, req, res) {
        console.info("DELETE controller")
        var removeUser = req.body;
        console.dir(removeUser);
        var o_id = new ObjectId(removeUser.userID);
        app.get('myDb').collection("usersCollection").deleteOne(
            { _id: o_id },
            function (err, dbResp) {
                if (err) {
                    console.error(err)
                }
                if (dbResp.deletedCount === 1) {
                    res.json({ msg: "Successfully Removed" })
                } else {
                    res.json({ msg: "Not Found" })
                }
            })
    },
}