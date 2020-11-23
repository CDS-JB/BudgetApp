function createTransactionFromRequest(req)
{
    let newTransaction = {};

    //if (req.body.UserObjectId != null)
    newTransaction.UserObjectId = req.session.userId;
        
    if (req.body.AccountProvider != null) 
        newTransaction.AccountProvider = req.body.AccountProvider;

    if (req.body.AccountName != null)
        newTransaction.AccountName = req.body.AccountName;

    if (req.body.AccNumEnd != null)
        newTransaction.AccNumEnd = req.body.AccNumEnd;

    if (req.body.TransactionName != null)
        newTransaction.TransactionName = req.body.TransactionName;

    if (req.body.TransactionDate != null)
        newTransaction.TransactionDate = req.body.TransactionDate;

    if (req.body.Amount != null)
        newTransaction.Amount = req.body.Amount;

    if (req.body.TransactionType != null)
        newTransaction.TransactionType = req.body.TransactionType;

      return newTransaction;
}

function addTransaction(app, newTransaction, res)  {     
    return new Promise (resolve =>  {
        app
        .set('myDb')
        .collection("Transaction")
        .insertOne(newTransaction, function (err, dbResp) {
            if (err) {
                console.error(err);
            }
            if (dbResp.insertedCount === 1) {
                console.info( "Successfully Added" + dbResp.insertedId);
                resolve (res.status(200).json({msg: "Successfully added payment" }));               
            } else {
                console.log("Failed to add to db");
                resolve(res.status(400).json( {msg: "Failed to add to db" }));                
            }            
        }); 
    });
}

async function getTransactionsForUser(app, userId, res)
{
    return new Promise (resolve =>  {        
        app
        .set("myDb")
        .collection("Transaction")
        .find({ UserObjectId: userId })
        .toArray(function (err, transactions) {
            if (err) {
                console.error(err);               
            }
            if(transactions.length >0 ){
                console.log(transactions.length + " transactions found for " + userId); 
                resolve(res.status(200).json({ transactions: transactions, msg: "Transactions found for user"}));
            }
            else {
                console.log("No Transactions found for " + userId);             
                resolve(res.status(400).json({ statusCode: 400,  msg: "No Transactions found" }));   
            } 
        });
    });   
}


function updateTransaction(app, transactionInfo, transactionId, res) {   
    return new Promise (resolve =>  {
        var transactionObjectId = new ObjectId(transactionId);
        app
        .set('myDb')
        .collection("Transaction")
        .updateOne(
            { _id: transactionObjectId },
            { $set : transactionInfo},
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

function deleteTransaction(app, transactionId, res){      
    return new Promise (resolve =>  {
        var transactionObjectId = new ObjectId(transactionId);
        app
        .set('myDb')
        .collection("Transacion")
        .deleteOne(
            { _id: transactionObjectId },
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


function filterTransactionsByDateRange(transactions, startDate, endDate)
{
    return transactions.filter(transaction => transaction.TransactionDate > startDate && transaction.TransactionDate < endDate)
}

module.exports.createTransactionFromRequest = createTransactionFromRequest;
module.exports.addTransaction = addTransaction;
module.exports.updateTransaction = updateTransaction;
module.exports.deleteTransaction = deleteTransaction;
module.exports.getTransactionsForUser = getTransactionsForUser;