var paymentModel = require('../models/payment.js');

module.exports = {
   
    viewAllForUser: async function (app, req, res) {
        if(!req.session.login){return res.status(401).json({error: 'Unauthorised'})}
        res = await paymentModel.getPaymentsForUser(app, req.session.userId, res)
        return res;
    },

    addItem: async function(app, req, res){
        if(!req.session.login){return res.status(401).json({error: 'Unauthorised'})}
        let payment = paymentModel.createPaymentFromRequest(req);
        res = await paymentModel.addPayment(app, payment, res)
        return res;
    }, 
    
    amendItem: async function (app, req, res) {
        if(!req.session.login){return res.status(401).json({error: 'Unauthorised'})}
        let amendedPayment = paymentModel.createPaymentFromRequest(req);
        res = await updatePayment(app, amendedPayment, req.body.paymentId, res)
        return res;
    },

    deleteItem: async function (app, req, res) {
        // console.log(req.body)
        // return res.status(400).json({error: 'Request Body: ' + req.body.paymentId})
        if(!req.session.login){return res.status(401).json({error: 'Unauthorised'})}
        res = await paymentModel.deletePayment(app, req.body.paymentId, res);
        return res;
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

}