var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var db = mongoose.connect("mongodb+srv://sergey:root@cluster0-ppek4.mongodb.net/test")
var Group = new Schema({
  students: [],
  tests: [],
  name: 'string',
  chatId: Schema.Types.ObjectId
});

var group = mongoose.model('groups', Group);

module.exports = group;