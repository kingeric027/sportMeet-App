const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");
const path = require("path");
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const PORT = process.env.PORT || 3001;


const app = express();

// Define middleware here
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


app.use(routes);


var MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://kingeric027:zaLMePlyvpvfrIV7@cluster0.xpt8e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true)

// Start the API server
app.listen(process.env.PORT || 3001, () => console.log('Server has started'));
{
  console.log(process.env)
  console.log("yayy it works")
}