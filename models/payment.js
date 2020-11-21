const { deleteItem } = require("../controllers/usercontroller");

function createPaymentFromRequest(req)
{
    let newPayment = {};

    //if (req.body.UserObjectId != null)
    newPayment.UserObjectId = req.session.userId;
        
    if (req.body.PaymentType != null) 
        newPayment.PaymentType = req.body.PaymentType;

    if (req.body.Source != null)
        newPayment.Source = req.body.Source;

    if (req.body.IncInBudget != null)
        newPayment.IncInBudget = req.body.IncInBudget;

    if (req.body.Amount != null)
        newPayment.Amount = req.body.Amount;

    if (req.body.FrequencyType != null)
        newPayment.FrequencyType = req.body.FrequencyType;

    if (req.body.PaymentStart != null)
        newPayment.PaymentStart = req.body.PaymentStart;

    if (req.body.PaymentEnd != null)
        newPayment.PaymentEnd = req.body.PaymentEnd;
        
    if (req.body.Frequency != null)
        newPayment.Frequency = req.body.Frequency;

    return newPayment;
}

function addPayment(app, newPayment, res)  {     
    return new Promise (resolve =>  {
        app
        .get('myDb')
        .collection("Payment")
        .insertOne(newPayment, function (err, dbResp) {
            if (err) {
                console.error(err);
            }
            if (dbResp.insertedCount === 1) {
                console.info( "Successfully Added" + dbResp.insertedId);
                resolve (res.status(200).json({ msg: "Successfully added payment" }));               
            } else {
                console.log("Failed to add to db");
                resolve(res.status(400).json({ msg: "Failed to add to db" }));                
            }            
        }); 
    });
}

async function getPaymentsForUser(app, userId, res)
{
    return new Promise (resolve =>  {        
        app
        .set("myDb")
        .collection("Payment")
        .find({ UserObjectId: userId })
        .toArray(function (err, payments) {
            if (err) {
                console.error(err);               
            }
            if(payments.length >0 ){
                console.log(payments.length + " payments found for " + userId); 
                resolve(res.status(200).json({ payments: payments, msg: "Payments found for user"}));
            }
            else {
                console.log("No payments found for " + userId);             
                resolve(res.status(400).json({ msg: "No payments found" }));   
            } 
        });
    });   
}


function updatePayment(app, paymentInfo, paymentId, res) {   
    return new Promise (resolve =>  {
        var paymentObjectId = new ObjectId(paymentId);
        app.get('myDb')
        .collection("Payment")
        .updateOne(
            { _id: paymentObjectId },
            { $set : paymentInfo},
            function (err, dbResp) {
                if (err) {
                    console.error(err)
                }
                if (dbResp.modifiedCount === 1) {
                    resolve(res.status(200).json({ msg: "Successfully Amended" }));
                } else {
                    resolve(res.status(400).json({ msg: "Not Found" }));
                }
            }
        );        
    });
}

function deletePayment(app, paymentId, res){      
    return new Promise (resolve =>  {
        var paymentObjectId = new ObjectId(paymentId);
        app
        .get('myDb')
        .collection("Payment")
        .deleteOne(
            { _id: paymentObjectId },
            function (err, dbResp) {
                if (err) {
                    console.error(err)
                }
                if (dbResp.deletedCount === 1) {
                    resolve(res.status(200).json({ msg: "Successfully Removed" }));
                } else {
                    resolve(res.status(400).json({ msg: "Not Found" }));
                }
        })
    })
}




function filterPaymentsByType(payments, type){
    return payments.filter(payment => payment.PaymentType == type);
}

function filterPaymentsByFrequency(payments, frequency){
    return payments.filter(payment => payment.FrequencyType == frequency);
}



module.exports.createPaymentFromRequest = createPaymentFromRequest;
module.exports.addPayment = addPayment;
module.exports.updatePayment = updatePayment;
module.exports.deletePayment = deletePayment;
module.exports.getPaymentsForUser = getPaymentsForUser;