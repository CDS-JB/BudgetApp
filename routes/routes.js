const express = require('express');

const router = express.Router();

const userController = require('../controllers/usercontroller.js');
const transactionController = require('../controllers/transactioncontroller.js');

console.dir(userController);

module.exports = (app) => { 

    router.get('/allusers', (req, res) => {
        userController.viewAll(app, req, res);
    });

    router.get('/user/:userID', (req, res) => {
        userController.viewItem(app, req, res);
    });

    router.post('/api/user', (req, res) => {
        userController.addItem(app, req, res);
    });

    router.put('/api/user', (req, res) => {
        userController.amendItem(app, req, res);
    });

    router.delete('/api/user', (req, res) => {
        userController.deleteItem(app, req, res);
    });


    router.get('/alltransactions/', (req, res) => {
        transactionController.viewAll(app, req, res);
    });
    router.get('/alltransactions/:userID', (req, res) => {
        transactionController.viewAllForUser(app, req, res);
    });
    router.get('/incomings/:userID', (req, res) => {
        transactionController.viewIncomingsForUser(app, req, res);
    });
    router.get('/outgoings/:userID', (req, res) => {
        transactionController.viewOutgoingsForUser(app, req, res);
    });
    router.get('/transaction/:transactionID', (req, res) => {
        transactionController.viewItem(app, req, res);
    });
    router.post('/api/transaction', (req, res) => {
        transactionController.addItem(app, req, res);
    });
    router.put('/api/transaction', (req, res) => {
        transactionController.amendItem(app, req, res);
    });
    router.delete('/api/transaction', (req, res) => {
        transactionController.deleteItem(app, req, res);
    });
    router.get('/alloutgoings', (req, res) => {
        transactionController.viewAllOutgoings(app, req, res);
    });


  
    return router;

}
