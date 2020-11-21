var  userModel = require('../models/user.js');

module.exports = {
     login: async function (app, req, res) {
        console.log("userController.login")
        let emailAddress = req.body.username;
        let password = req.body.password;    
        res = await userModel.login(app, emailAddress, password, req.session);
    },

    logout: function(app, req, res) {
        req.session.destroy(function(err) {
            res.json({ statusCode: 200, msg: "Successfully logged out" })
        });
    },

    addItem: async function (app, req, res) {        
        let newUser =  userModel.createUserFromRequest(req);                                
        res = await userModel.addUser(app,newUser, res);
    },

    amendItem: async function (app, req, res) {
        let amendedUser = userModel.createUserFromRequest(req);
        res = await updateUser(app, amendedUser, req.session.userId);
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