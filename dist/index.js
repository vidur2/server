"use strict";

var express = require('express');
var app = express();
var _require = require('mongodb'),
  MongoClient = _require.MongoClient,
  ServerApiVersion = _require.ServerApiVersion;
var user = {
  user: "vidurmodgil",
  password: "5FgCOAreMDQsZruG"
};
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
var uri = "mongodb+srv://".concat(user.user, ":").concat(user.password, "@cluster0.yzwdwqn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
var client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.get("/", function (req, res) {
  return res.send("Express on Vercel");
});
app.post("/api/add", function (req, res) {
  console.log(req.body);
  client.connect().then(function () {
    return client.db("seeker-ai").collection("emails").insertOne({
      email: req.body.email
    });
  }).then(function () {
    res.send("works");
  });
});
app.listen(3000);
module.exports = app;