var  userModel = require('../models/user.js');

module.exports = {
    
    login: async function (app, req, res) {
        console.log("userController.login")
        let emailAddress = req.body.Email;
        let password = req.body.Password;    
        res = await userModel.login(app, emailAddress, password, req.session,res);          
        return res;
    },

    logout: function(app, req, res) {
        req.session.destroy(function(err) {
            res.status(200).json({ msg: "Successfully logged out" })
        });
    },

    addItem: async function (app, req, res) {   
        let newUser =  await userModel.createUserFromRequest(req);                                
        res = await userModel.addUser(app, newUser, req.session, res);
        return res;
    },

    getItem: async function (app, req, res) {
        if(!req.session.login){return res.status(401).json({error: 'Unauthorised'})}
        res = await userModel.getUser(app, req.session.userId, res);
        return res;
    },

    amendItem: async function (app, req, res) {
        if(!req.session.login){return res.status(401).json({error: 'Unauthorised'})}
        let amendedUser = await userModel.createUserFromRequest(req);
        res = await userModel.updateUser(app, amendedUser, req.session.userId, res)
        return res;
    },

    deleteItem: async function (app, req, res) {
        if(!req.session.login){return res.status(401).json({error: 'Unauthorised'})}
        res = await userModel.deleteUser(app, req.session.userId, res);
        return res;
    },
}