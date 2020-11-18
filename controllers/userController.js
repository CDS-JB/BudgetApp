

var  userModel = require('../models/user.js');

const bcrypt = require("bcrypt");
const saltRounds = 10;

var ObjectId = require('mongodb').ObjectId; 
module.exports = {
     login: async function (app, req, res) {
        console.log("userController.login")
        let emailAddress = req.body.username;
        let password = req.body.password;   
 
        result = await userModel.login(app, emailAddress, password, req.session);          
        console.dir(result);
        res.json(result);
       
        //let users = userModel.getUsers(app) ;

      //  console.log("controller users: " + users);
        //console.dir(res);
        // app
        // .set("myDb")
        // .collection("usersCollection")
        // .find({ emailAddress: emailAddress })
        // .toArray(function (err, docs) {
        // if (err) {
        //   console.error(err);
        // }
        // if (docs.length > 0) {            
        //     console.log("User found in database for " + emailAddress)           
        //     bcrypt.compare(password, docs[0].password, function(err, result) 
        //     {
        //         console.info(result);
        //         if (result == true) {
        //             req.session.login = true;                                  
        //             req.session.userId = docs[0]._id;                            
        //             console.log("password correct")
        //             res.json({ statusCode: 200, msg: "Found " + emailAddress  })
        //         }
        //         else {
        //             console.log("password incorect")
        //             res.json({ statusCode: 400, msg: "Invalid Password" })
        //         }
        //     });
        // }
        // else {                        
        //     console.log("User not found in database for " + emailAddress)             
        //     res.json({ statusCode: 400,  msg: "User Not Found" });            
        // }        
      //});
    },
    logout: function(app, req, res) {
        req.backendSession.destroy(function(err) {
            res.json({ statusCode: 200, msg: "Successfully logged out" })
          });
    },
    // viewAll: function (app, req, res) {
    //     console.info("View All controller")
    //     app.set('myDb').collection('usersCollection').find({}).toArray(function (err, docs) {
    //         if (err) {
    //             console.error(err)
    //         }
    //         res.json(docs)
    //     })
    // },
    // viewItem: function (app, req, res) {
    //     console.info("View One controller")
    //     let userID = req.params.userID;
    //     var o_id = new ObjectId(userID);
    //     app.set('myDb').collection('usersCollection').find({"_id": o_id}).toArray(function(err, docs) {
    //         if (err) {
    //             console.error(err)
    //         }
    //         console.dir(docs);
    //         return res.render('oneUser', {
    //             title : "Some Title",
    //             film: docs[0]
    //             });
    //     })
    // },
    addItem: function (app, req, res) {
        console.info("userController.addItem")
        bcrypt.hash(req.body.password, saltRounds, function (err, hash) 
        {
            let hashedPwd = hash;
            let newUser =   {
                firstName: req.body.firstname, 
                surname: req.body.lastname, 
                dateOfBirth: req.body.dateofbirth, 
                emailAddress: req.body.username,
                password: hashedPwd
            };
            
            console.dir(newUser);        
            
            userModel.addUser(app,newUser, res);

        })
    }
    // amendItem: function (app, req, res) {
    //     console.info("PUT / UPDATE controller")
    //     var amendUser = req.body;
    //     let userID = amendUser.userID;
    //     var o_id = new ObjectId(userID);
    //     console.info(o_id);
    //     app.get('myDb').collection("usersCollection").updateOne(
    //         { _id: o_id },
    //         { $set: { "firstName": amendUser.firstName, "lastName": amendUser.lastName, "emailAddress": amendUser.emailAddress, "age": amendUser.age , "password":amendUser.password} },
    //         function (err, dbResp) {
    //             if (err) {
    //                 console.error(err)
    //             }
    //             if (dbResp.modifiedCount === 1) {
    //                 res.json({ msg: "Successfully Amended" })
    //             } else {
    //                 res.json({ msg: "Not Found" })
    //             }
    //         })
    // },
    // deleteItem: function (app, req, res) {
    //     console.info("DELETE controller")
    //     var removeUser = req.body;
    //     console.dir(removeUser);
    //     var o_id = new ObjectId(removeUser.userID);
    //     app.get('myDb').collection("usersCollection").deleteOne(
    //         { _id: o_id },
    //         function (err, dbResp) {
    //             if (err) {
    //                 console.error(err)
    //             }
    //             if (dbResp.deletedCount === 1) {
    //                 res.json({ msg: "Successfully Removed" })
    //             } else {
    //                 res.json({ msg: "Not Found" })
    //             }
    //         })
    // },
}