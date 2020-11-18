const bcrypt = require("bcrypt");
const saltRounds = 10;

async function login(app, emailAddress, password, session)
{
    var users = await getUsersWithEmailAddress(app, emailAddress);
    if (users.length > 0) {
        console.log("User found in database for " + emailAddress)           
        bcrypt.compare(password, users[0].password, function(err, result) 
        {
            if (result == true) {
                session.login = true;                                  
                session.userId = users[0]._id;                            
                console.log("password correct")
                return({ statusCode: 200, msg: "Found " + emailAddress  })
            }
            else {
                console.log("password incorect")
                return({ statusCode: 400, msg: "Invalid Password" })
            }
        });

    }
    else {

        console.log("User not found in database for " + emailAddress)             
        return({ statusCode: 400,  msg: "User Not Found" });   
    }


    // app
    //     .set("myDb")
    //     .collection("usersCollection")
    //     .find({ emailAddress: emailAddress })
    //     .toArray(function (err, docs) {
    //     if (err) {
    //       console.error(err);
    //     }
    //     if (docs.length > 0) {            
    //         console.log("User found in database for " + emailAddress)           
    //         bcrypt.compare(password, docs[0].password, function(err, result) 
    //         {
    //             console.info(result);
    //             if (result == true) {
    //                 req.session.login = true;                                  
    //                 req.session.userId = docs[0]._id;                            
    //                 console.log("password correct")
    //                 res.json({ statusCode: 200, msg: "Found " + emailAddress  })
    //             }
    //             else {
    //                 console.log("password incorect")
    //                 res.json({ statusCode: 400, msg: "Invalid Password" })
    //             }
    //         });
    //     }
    //     else {                        
    //         console.log("User not found in database for " + emailAddress)             
    //         res.json({ statusCode: 400,  msg: "User Not Found" });            
    //     }    
    // })    
}

function getUsersWithEmailAddress(app, emailAddress ) {        
    return new Promise (resolve => {
        console.log("email: ", emailAddress) ;
        app
        .set("myDb")
        .collection("usersCollection")
        .find({ emailAddress: emailAddress })
        .toArray(function (err, users) {
            if (err) {
                console.error(err);
            }
          //  console.dir("Model users" + docs); 
            resolve( users);  
        });
    });
}


function getUserWithUserId(app, userId ) {        
    return new Promise (resolve => {
        console.log("email: ", emailAddress) ;
        app
        .set("myDb")
        .collection("usersCollection")
        .find({ _id: userId })
        .toArray(function (err, docs) {
            if (err) {
                console.error(err);
            }
            console.dir("Model users" + docs); 
            resolve( {user : docs} );  
        });
    });        
}

function getAllUsers(app)
{        
    return new Promise (resolve => {
        app
        .set("myDb")
        .collection("usersCollection")    
        .find()
        .toArray(function (err, docs) {
            if (err) {
                console.error(err);
            }             
            resolve( docs );
        });
    });        
}

    //this will add new user to the user collection  
    //this will take 2 parameter.newUser is object and cb is a callback  
function addUser(app,newUser,res)  {      
    app
        .get('myDb')
        .collection("usersCollection")
        .insertOne(newUser, function (err, dbResp) {
            if (err) {
                console.error(err)
            }
            if (dbResp.insertedCount === 1) {
                res.json({ statusCode: 200, msg: "Successfully Added" + dbResp.insertedId })
                console.info( "Successfully Added" + dbResp.insertedId)
            } else {
                res.json({ statusCode: 400,msg: "Failed to add to db" })
                console.info("Failed to add to db")
            }
        })
}
    
   
module.exports.login = login;
module.exports.getAllUsers = getAllUsers;
module.exports.getUsersWithEmailAddress = getUsersWithEmailAddress;
module.exports.getUserWithUserId = getUserWithUserId;
module.exports.addUser = addUser;
