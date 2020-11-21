const bcrypt = require("bcrypt");
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
            } 
            if (users.length > 0) {
                let user = users[0];
                bcrypt.compare(password, user.Password, function(err, result) {       
                    if (result == true) {
                        session.login = true;                                  
                        session.userId = user._id;                            
                        console.log("password correct");
                        resolve(res.status(200).json({ statusCode: 200, msg: "Found " + user.emailAddress  }));
                    }
                    else {
                        console.log("password incorect");
                        resolve({ statusCode: 400, msg: "Invalid Password" });
                    }
                });
            }
            else {
                console.log("User not found in database for " + emailAddress);             
                resolve({ statusCode: 400,  msg: "User Not Found" });   
            } 
        });
    });   
}

function addUser(app,newUser, res)  {     
    return new Promise (resolve =>  {
        bcrypt.hash(newUser.password, saltRounds, function (err, hash) 
        {
            let hashedPwd = hash;
            console.log(newUser.Password);
            newUser.Password = hashedPwd;
            console.log(hashedPwd);

            app
            .get('myDb')
            .collection("User")
            .insertOne(newUser, function (err, dbResp) {
                if (err) {
                    console.error(err);
                }
                if (dbResp.insertedCount === 1) {
                    console.info( "Successfully Added" + dbResp.insertedId);
                    resolve(res.status(200).json({ statusCode: 200, msg: "Successfully Added user" }));
                } else {
                    console.log("Failed to add to db");
                    resolve(res.status(400).json({ msg: "Failed to add to db" }));                
                }
            });
        }); 
    });
}

function updateUser(app, userInfo, userId, res) {   
    return new Promise (resolve =>  {
        var userObjectId = new ObjectId(userId);
        app.get('myDb')
        .collection("User")
        .updateOne(
            { _id: userObjectId },
            { $set : userInfo},
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

function deleteUser(app, userId, res){      
    return new Promise (resolve =>  {
        var userObjectId = new ObjectId(userId);
        app
        .get('myDb')
        .collection("User")
        .deleteOne(
            { _id: userObjectId },
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


function createUserFromRequest(req)
{
    let newUser = {};

    if (req.body.FirstNm != null)
        newUser.FirstNm = req.body.FirstNm;
        
    if (req.body.LastNm != null) 
        newUser.lastname = req.body.LastNm;

    if (req.body.DOB != null)
        newUser.DOB = req.body.DOB;

    if (req.body.username != null)
        newUser.Email = req.body.username;

    if (req.body.Password != null)
        newUser.Password = req.body.Password;

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
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.createUserFromRequest = createUserFromRequest;