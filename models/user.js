const bcrypt = require("bcrypt");
const saltRounds = 10;

async function login(app, emailAddress, password, session)
{
    return new Promise (resolve =>  {        
        app
        .set("myDb")
        .collection("usersCollection")
        .find({ emailAddress: emailAddress })
        .toArray(function (err, users) {
            if (err) {
                console.error(err);                
            } 
            if (users.length > 0) {
                let user = users[0];
                bcrypt.compare(password, user.password, function(err, result) {       
                    if (result == true) {
                        session.login = true;                                  
                        session.userId = user._id;                            
                        console.log("password correct");
                        resolve({ statusCode: 200, msg: "Found " + user.emailAddress  });
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

function addUser(app,newUser)  {     
    return new Promise (resolve =>  {
        bcrypt.hash(newUser.password, saltRounds, function (err, hash) 
        {
            let hashedPwd = hash;
            console.log(newUser.password);
            newUser.password = hashedPwd;
            console.log(hashedPwd);

            app
            .get('myDb')
            .collection("usersCollection")
            .insertOne(newUser, function (err, dbResp) {
                if (err) {
                    console.error(err);
                }
                if (dbResp.insertedCount === 1) {
                    console.info( "Successfully Added" + dbResp.insertedId);
                    resolve ({ statusCode: 200, msg: "Successfully Added user" });               
                } else {
                    console.log("Failed to add to db");
                    resolve({ statusCode: 400,msg: "Failed to add to db" });                
                }
            });
        }); 
    });
}

function updateUser(app, userInfo, userId) {   
    return new Promise (resolve =>  {
        console.info("PUT / UPDATE controller")
        var o_id = new ObjectId(userId);
        console.info(o_id);
        app.get('myDb').collection("usersCollection").updateOne(
            { _id: o_id },
            { $set : userInfo},
            function (err, dbResp) {
                if (err) {
                    console.error(err)
                }
                if (dbResp.modifiedCount === 1) {
                    resolve({ msg: "Successfully Amended" })
                } else {
                    resolve({ msg: "Not Found" })
                }
            }
        );        
    });
}
function createUserFromRequest(req)
{
    let newUser = {};

    if (req.body.firstname != null)
        newUser.firstName = req.body.firstname;
        
    if (req.body.lastname != null) 
        newUser.lastname = req.body.lastname;

    if (req.body.dateOfBirth != null)
        newUser.dateOfBirth = req.body.dateOfBirth;

    if (req.body.username != null)
        newUser.emailAddress = req.body.username;

    if (req.body.password != null)
        newUser.password = req.body.password;

    if (req.body.budgetTargetDate != null)
        newUser.budgetTargetDate = req.body.budgetTargetDate;

    if (req.body.MonthlyBudget != null)
        newUser.MonthlyBudget = req.body.MonthlyBudget;

    if (req.body.WeeklyBudget != null)
        newUser.WeeklyBudget = req.body.WeeklyBudget;

      return newUser;
}
   
module.exports.login = login;
module.exports.addUser = addUser;
module.exports.updateUser = updateUser;
module.exports.createUserFromRequest = createUserFromRequest;