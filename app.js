const express = require("express");
const path = require("path");
const history = require('connect-history-api-fallback'); // https://github.com/bripkens/connect-history-api-fallback fixes issue with # for SPA using single index file.
const app = express();

// add for RESTful
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(history());

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(express.static("./public"));

// app.use((req, res, next) => {
//   console.dir(req.url);
//   next();
// })

const routes = require('./routes/routes');
app.use('/', routes(app))

// remove for sample files
// app.use((req, res, next) => {
//     res.status(404).send("Sorry can't find that!");
//     next();
// })



// Database

var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {

    app.set('myDb', client.db('myMoviesDb'));

})


app.listen(3000);

console.log("Express on 3000");

module.exports = app;
