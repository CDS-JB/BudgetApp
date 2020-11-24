var transactionModel = require('../models/transaction.js');

module.exports = {
    
    viewAllForUser: async function (app, req, res) {        
        res = await transactionModel.getTransactionsForUser(app, req.session.userId, res);
    },

    addItem: async function (app, req, res) {
        let newTransaction = transactionModel.createTransactionFromRequest(req);
        res = await transactionModel.addTransaction(app, newTransaction, res);
    },

    amendItem: async function (app, req, res) {
        let amendedTransaction = transactionModel.createUserFromRequest(req);
        res = await transactionModel.updateTransaction(app, amendedTransaction, req.body.transactionId, res)
        return res;
    },

    deleteItem: async function (app, req, res) {
        res = await transactionModel.deleteTransaction(app, req.body.transactionId, res);
        return res;
    }
}