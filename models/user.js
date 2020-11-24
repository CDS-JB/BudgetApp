const bcrypt = require("bcrypt");
const { ObjectID, ObjectId } = require("mongodb");
const saltRounds = 10;

async function login(app, emailAddress, password, session, res)
{
    return new Promise (resolve =>  {        
        app
        .set("myDb")
        .collection("User")
        .find({ Email: emailAddress })
        .toArray(function (err, users) {
            if (err) {
                console.error(err); 
                resolve(res.status(400).json({ error: "Failed to login due to: " + err}))               
            } 
            if (users.length > 0) {
                let user = users[0];
                bcrypt.compare(password, user.Password, function(err, result) {       
                    if (result == true) {
                        session.login = true;                                  
                        session.userId = user._id;                            
                        console.log("password correct");
                        resolve(res.status(200).json({FirstNm: user.FirstNm, BudgetTargetDate: user.BudgetTargetDate}));
                    }
                    else {
                        console.log("password incorect");
                        resolve(res.status(400).json({error: "Invalid Email and/or Password"}));   
                    }
                });
            }
            else {
                console.log("User not found in database for " + emailAddress);             
                resolve(res.status(400).json({error: "Invalid Email and/or Password"}));   
            } 
        });
    });   
}

function addUser(app,newUser, res) {     
    return new Promise (resolve =>  {       
        app
        .set('myDb')
        .collection("User")
        .insertOne(newUser, function (err, dbResp) {
            if (err) {
                console.error(err);
                resolve(res.status(400).json({ error: "Failed to create due to: " + err}))
            }
            if (dbResp.insertedCount === 1) {
                console.info( "Successfully Added" + dbResp.insertedId);
                resolve(res.status(200).json({ msg: "Successfully Added user" }));
            } else {
                console.log("Failed to add to db");
                resolve(res.status(400).json({ error: "Failed to add to db" }));                
            }
        });
    });
}

function getUser(app, userId, res) {
    return new Promise(resolve => {
        var userObjectId = new ObjectId(userId);

        app
        .set('myDb')
        .collection("User")
        .find({"_id": userObjectId})
        .toArray((err, users) => {
            if(err){
                resolve(res.status(400).json({msg: err}))
            } else {
                user = {
                    Email: users[0].Email,
                    FirstNm: users[0].FirstNm,
                    LastNm: users[0].LastNm,
                    BudgetTargetDate: users[0].BudgetTargetDate
                }

                resolve(res.status(200).json({user}))
            }
        })
    })
}

function updateUser(app, userInfo, userId, res) {   
    return new Promise (resolve =>  {
        var userObjectId = new ObjectId(userId);
        app
        .set('myDb')
        .collection("User")
        .updateOne(
            { _id: userObjectId },
            { $set : userInfo},
            function (err, dbResp) {
                if (err) {
                    console.error(err)
                    resolve(res.status(400).json({ error: "Failed to update due to: " + err}))
                }
                if (dbResp.modifiedCount === 1) {
                    resolve(res.status(200).json({ msg: "Updated"}));
                } else {
                    resolve(res.status(400).json({ error: "User Not Found" }));
                }
            }
        );        
    });
}

function deleteUser(app, userId, res){      
    return new Promise (resolve =>  {
        var userObjectId = new ObjectId(userId);
        app
        .set('myDb')
        .collection("User")
        .deleteOne(
            { _id: userObjectId },
            function (err, dbResp) {
                if (err) {
                    console.error(err)
                    resolve(res.status(400).json({ error: "Failed to delete due to: " + err}))
                }
                if (dbResp.deletedCount === 1) {
                    resolve(res.status(200).json({ msg: "Successfully Removed" }));
                } else {
                    resolve(res.status(400).json({ error: "User Not Found" }));
                }
        })
    })
}

async function hashPassword(pass)
{
    return new Promise (resolve =>  {
        bcrypt.hash(pass, saltRounds, function (err, hash) 
        {
            resolve(hash);
        });
    });
}

async function createUserFromRequest(req)
{
    let newUser = {};

    if (req.body.Email != null)
        newUser.Email = req.body.Email;

    if (req.body.Password != null && req.body.Password != '')
        newUser.Password = await hashPassword(req.body.Password);

    if (req.body.FirstNm != null)
        newUser.FirstNm = req.body.FirstNm;
        
    if (req.body.LastNm != null) 
        newUser.LastNm = req.body.LastNm;

    if (req.body.DOB != null)
        newUser.DOB = req.body.DOB;

    if (req.body.BudgetTargetDate != null)
        newUser.BudgetTargetDate = req.body.BudgetTargetDate;

    if (req.body.MonthlyBudget != null)
        newUser.MonthlyBudget = req.body.MonthlyBudget;

    if (req.body.WeeklyBudget != null)
        newUser.WeeklyBudget = req.body.WeeklyBudget;
           
    return newUser;
}
   
module.exports.login = login;
module.exports.addUser = addUser;
module.exports.getUser = getUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.createUserFromRequest = createUserFromRequest;