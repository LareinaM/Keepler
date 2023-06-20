const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const uri = process.env.ATLAS_URI;
 
var _db;
 
module.exports = {
  connectToServer: function (callback) {
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    const db = mongoose.connection;
    db.on("error", err => {
      return callback(err);
    });
    db.once("open", () => {
      console.log("> Successfully connected to database");
      _db = db;
    });
  },
 
  getDb: function () {
    return _db;
  },
};