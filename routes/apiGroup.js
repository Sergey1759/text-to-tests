var mongoose = require('mongoose')
var db = mongoose.connect("mongodb+srv://sergey:root@cluster0-ppek4.mongodb.net/test")
var Group = require('./ModelGroup')

exports.get = function(name) {
    return Group.find({'name' : name}, function (err, doc) {
        return Promise.resolve(doc);
      });
}