var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var test = new Schema(
  {
     name : 'string',
     test : [],
  }
);

var test = mongoose.model('tests', test);

module.exports = test;