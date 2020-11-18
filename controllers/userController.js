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
        
        res.json(result); 
        console.dir(result);
    },

    logout: function(app, req, res) {
        req.backendSession.destroy(function(err) {
            res.json({ statusCode: 200, msg: "Successfully logged out" })
          });
    },

    addItem: async function (app, req, res) {        
        let newUser =  userModel.createUserFromRequest(req);
                                
        result = await userModel.addUser(app,newUser, res);
        res.json = result;   
        console.dir(result)   ;
    },


    amendItem: async function (app, req, res) {
        result = updateUser()
    },
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