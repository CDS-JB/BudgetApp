var paymentModel = require('../models/payment.js');

module.exports = {
   
    viewAllForUser: async function (app, req, res) {
        res = await paymentModel.getPaymentsForUser(app, req.session.userId, res)
    },

    addItem: async function(app, req, res){
        let payment = paymentModel.createPaymentFromRequest(req);
        res = await paymentModel.addPaymend(app, payment, res)
    } 
    
    
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