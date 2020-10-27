var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Result = new Schema({
  id_test: 'string',
  id_user: 'string',
  attempt: 'number',
  arr: []
});



var Test = mongoose.model('Result', Result);

module.exports = Test;