var transactionModel = require('../models/transaction.js');

module.exports = {
    
    viewAllForUser: async function (app, req, res) {        
        res = await transactionModel.getTransactionsForUser(app, req.session.userId, res);
    },

    addItem: async function (app, req, res) {
        let newTransaction = transactionModel.createTransactionFromRequest(req);
        res = await transactionModel.addTransaction(app, newTransaction, res);
    },


    // viewAll: function (app, req, res) {
    //     console.info("Transactions controller - View all transactions")
    //     app.set('myDb').collection('transactionsCollection').find({}).toArray(function (err, docs) {
    //         if (err) {
    //             console.error(err)
    //         }
    //         console.dir(docs);
    //         res.json(docs)
    //     })
    // },
    // viewIncomingsForUser: function (app, req, res) {
    //     console.info("Transactions controller - View all incoming transactions for user")
    //     if (!req.session.login) {
    //         res.json({ statusCode: 400, msg: "User not logged in"  })
    //     }
    //     else if (req.session.userId == null) {
    //         res.json({ statusCode: 400, msg: "No user ID stored in session"  })
    //     }
    //     else {
    //         app.set('myDb').collection('transactionsCollection').find({"transactionType": "incoming","userID": req.session.userId}).toArray(function(err, docs){            
    //             if (err) {
    //                 console.error(err)
    //             }
    //             if (docs.length > 0){
    //                 console.dir(docs);
    //                 res.json({statusCode: 200, msg: "Incoming Transactions found for user", transactions: docs})
    //             }
    //             else {
    //                 res.json({ statusCode: 400, msg: "No incoming transactions found for this user"  })
    //             }
    //         })}
    // },
    // viewOutgoingsForUser: function (app, req, res) {
    //     console.info("Transactions controller - View all outgoing transactions for user")
    //     if (!req.session.login) {
    //         res.json({ statusCode: 400, msg: "User not logged in"  })
    //     }
    //     else if (req.session.userId == null) {
    //         res.json({ statusCode: 400, msg: "No user ID stored in session"  })
    //     }
    //     else {
    //         app.set('myDb').collection('transactionsCollection').find({"transactionType": "outgoing","userID": req.session.userId}).toArray(function(err, docs){            
    //             if (err) {
    //                 console.error(err)
    //             }
    //             if (docs.length > 0){
    //                 console.dir(docs);
    //                 res.json({statusCode: 200, msg: "Outgoing Transactions found for user", transactions: docs})
    //             }
    //             else {
    //                 res.json({ statusCode: 400, msg: "No outgoing transactions found for this user"  })
    //             }
    //         })}
    // },
    // viewItem: function (app, req, res) {
    //     console.info("Transactions controller - View one transaction")
    //     let transactionID = req.params.transactionID;
    //     var o_id = new ObjectId(transactionID);
    //     app.set('myDb').collection('transactionsCollection').find({"_id": o_id}).toArray(function(err, docs) {
    //         if (err) {
    //             console.error(err)
    //         }
    //         console.dir(docs);
    //         return res.json(docs[0])
    //     })
    // },
    // amendItem: function (app, req, res) {
    //     console.info("PUT / UPDATE Transaction controller")
    //     var amendTransaction = req.body;
    //     let transactionID = amendTransaction.transactionID;
    //     var o_id = new ObjectId(transactionID);
    //     console.info(o_id);
    //     app.get('myDb').collection("transactionsCollection").updateOne(
    //         { _id: o_id },
    //         { $set: { "transactionType": amendTransaction.transactionType, "userId": amendTransaction.userID, "amount": amendTransaction.amount } },
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
    //     console.info("DELETE Transaction controller")
    //     var removeTransaction = req.body;
    //     console.dir(removeTransaction);
    //     var o_id = new ObjectId(removeTransaction.transactionID);
    //     app.get('myDb').collection("transactionsCollection").deleteOne(
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