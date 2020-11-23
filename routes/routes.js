const express = require('express');

const router = express.Router();

const userController = require('../controllers/usercontroller.js');
const transactionController = require('../controllers/transactioncontroller.js');
const paymentController = require('../controllers/paymentcontroller.js');
const report = require('../controllers/report');

console.dir(userController);

module.exports = (app) => { 

    router.get('/api/report', (req, res) => {report.show(app, req, res)})


    router.post('/api/login', (req, res) => {
        userController.login(app, req, res);
    });
    router.post('/api/logout', (req,res) => {
        userController.logout(app, req, res);
    })
    router.post('/api/register', (req, res) => {
        userController.addItem(app, req, res);
    });    
    router.put('/api/updateuser', (req, res) => {
        userController.amendItem(app, req, res);
    });
    router.delete('/api/unregister', (req, res) => {
        userController.deleteItem(app, req, res);
    });



    router.get('/api/transactions', (req, res) => {
        transactionController.viewAllForUser(app, req, res);
    });
    router.put('/api/addtransaction', (req, res) => {
        transactionController.addItem(app, req, res);
    });  
    router.put('/api/updatetransaction', (req, res) => {
        transactionController.amendItem(app, req, res);
    });
    router.delete('/api/removetransaction', (req, res) => {
        transactionController.deleteItem(app, req, res);
    });

    
    router.get('/api/payments', (req, res) => {
        paymentController.viewAllForUser(app, req, res);
    });

    router.put('/api/addpayment', (req, res) => {
        paymentController.addItem(app, req, res);
    });
    router.put('/api/updatepayment', (req, res) => {
        transactionController.amendItem(app, req, res);
    });
    router.delete('/api/removepayment', (req, res) => {
        transactionController.deleteItem(app, req, res);
    });

    return router;
}
