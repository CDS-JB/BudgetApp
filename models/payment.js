function createTransactionFromRequest(req)
{
    let newPayment = {};

    if (req.body.UserObjectId != null)
        newPayment.UserObjectId = req.body.UserObjectId;
        
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

function addPayment(app, newPayment)  {     
    return new Promise (resolve =>  {
        app
        .get('myDb')
        .collection("paymentCollection")
        .insertOne(newPayment, function (err, dbResp) {
            if (err) {
                console.error(err);
            }
            if (dbResp.insertedCount === 1) {
                console.info( "Successfully Added" + dbResp.insertedId);
                resolve ({ statusCode: 200, msg: "Successfully added payment" });               
            } else {
                console.log("Failed to add to db");
                resolve({ statusCode: 400,msg: "Failed to add to db" });                
            }            
        }); 
    });
}


module.exports.createTransactionFromRequest = createTransactionFromRequest;
module.exports.addPayment = addPayment;