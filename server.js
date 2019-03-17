const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");
const path = require("path");
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const PORT = process.env.PORT || 3001;


const app = express();
//var router = require("./routes/index.js");

// Define middleware here
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


app.use(routes);

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/client";



mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true)

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://mongolab-infinite-81177/googlebooks";
// mongoose.connect(MONGODB_URI, {useNewUrlParser:true});

// // mongoose.connect(
//   process.env.MONGODB_URI || "mongodb://localhost/games", 
//   {
//     useMongoClient: true,
//     useNewUrlParser:true
//   }
// );

// Start the API server
app.listen(process.env.PORT || 3001, () => console.log('Server has started'));
{
  console.log ("yayy it works")
  }