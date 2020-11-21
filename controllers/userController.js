var  userModel = require('../models/user.js');

module.exports = {
    
    login: async function (app, req, res) {
        console.log("userController.login")
        let emailAddress = req.body.username;
        let password = req.body.password;    
        res = await userModel.login(app, emailAddress, password, req.session,res);          
        return res;
    },

    logout: function(app, req, res) {
        req.session.destroy(function(err) {
            res.status(200).json({ msg: "Successfully logged out" })
        });
    },

    addItem: async function (app, req, res) {        
        let newUser =  userModel.createUserFromRequest(req);                                
        res = await userModel.addUser(app,newUser, res);
        return res;
    },

    amendItem: async function (app, req, res) {
        let amendedUser = userModel.createUserFromRequest(req);
        res = await userModel.updateUser(app, amendedUser, req.session.userId, res)
        return res;
    },

    deleteItem: async function (app, req, res) {
        res = await userModel.deleteUser(app, req.session.userId, res);
        return res;
    },
}