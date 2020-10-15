

var ObjectId = require('mongodb').ObjectId; 

module.exports = {
    viewAll: function (app, req, res) {
        console.info("View All Transactions controller")
        app.set('myDb').collection('transactionsCollection').find({}).toArray(function (err, docs) {
            if (err) {
                console.error(err)
            }
            res.json(docs)
        })
    },
    viewAllOutgoings: function (app, req, res) {
        console.info("View All Incoming Transactions controller")
        app.set('myDb').collection('transactionsCollection').find({"transactionType": "incoming"}).toArray(function(err, docs) {
            if (err) {
                console.error(err)
            }
            return res.json(docs)
        })
    },
    viewAllOutgoings: function (app, req, res) {
        console.info("View All Outgoing Transactions controller")
        app.set('myDb').collection('transactionsCollection').find({"transactionType": "outgoing"}).toArray(function(err, docs) {
            if (err) {
                console.error(err)
            }
            return res.json(docs)
        })
    },viewAllFromUser: function (app, req, res) {
        console.info("View All Transactions For User controller")
        let userID = req.params.userID;
        var o_id = new ObjectId(transactionID);
        app.set('myDb').collection('transactionsCollection').find({"userID": userID}).toArray(function(err, docs) {
            if (err) {
                console.error(err)
            }
            console.dir(docs);
            return res.json(docs)
        })
    },
    viewItem: function (app, req, res) {
        console.info("View One Transaction controller")
        let transactionID = req.params.transactionID;
        var o_id = new ObjectId(transactionID);
        app.set('myDb').collection('transactionsCollection').find({"_id": o_id}).toArray(function(err, docs) {
            if (err) {
                console.error(err)
            }
            console.dir(docs);
            return res.json(docs[0])
        })
    },
    addItem: function (app, req, res) {
        console.info("POST Transaction controller")
        var newTransaction = req.body;
        console.dir(newTransaction);
        app.get('myDb').collection("transactionsCollection").insertOne(newTransaction,
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
        console.info("PUT / UPDATE Transaction controller")
        var amendTransaction = req.body;
        let transactionID = amendTransaction.transactionID;
        var o_id = new ObjectId(transactionID);
        console.info(o_id);
        app.get('myDb').collection("transactionsCollection").updateOne(
            { _id: o_id },
            { $set: { "transactionType": amendTransaction.transactionType, "userId": amendTransaction.userID, "amount": amendTransaction.amount } },
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
        console.info("DELETE Transaction controller")
        var removeTransaction = req.body;
        console.dir(removeTransaction);
        var o_id = new ObjectId(removeTransaction.transactionID);
        app.get('myDb').collection("transactionsCollection").deleteOne(
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