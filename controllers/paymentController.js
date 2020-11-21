var paymentModel = require('../models/payment.js');

module.exports = {
    viewAll: function (app, req, res) {
        console.info("Transactions controller - View all transactions")
        app.set('myDb').collection('transactionsCollection').find({}).toArray(function (err, docs) {
            if (err) {
                console.error(err)
            }
            console.dir(docs);
            res.json(docs)
        })
    },
    addOne:function(app, req, res){
        let paymentModel = payment.createPaymentFromRequest(req);
        res = await paymentModel.getPaymentsForUser(app, req)
    }
}