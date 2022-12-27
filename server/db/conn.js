const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const uri = process.env.ATLAS_URI;
const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  time: Date
});
var _db;
const Note = mongoose.model('Note', noteSchema);
module.exports = {
  connectToServer: function () {
    mongoose.connect(uri);
    _db = mongoose.connection;
    _db.on('error', function (err) {
      console.log('Error occured' + err)
    });
    _db.once('connected', function () {
      console.log('connection is successful to ' + uri)
    });
  },
  getDb: function () {
    return _db;
  },
  getSchema: function() {
    return Note;
  }
};