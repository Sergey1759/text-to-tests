var mongoose = require('mongoose')
var crypto = require('crypto')
var db = mongoose.connect("mongodb+srv://sergey:root@cluster0-ppek4.mongodb.net/test")
var User = require('./database')
 
// User API
 
exports.createUser = function(userData){
 var user = {
 name: userData.name,
 lastname: userData.lastname,
 group: userData.group,
 email: userData.email,
 photo: userData.photo,
 password: hash(userData.password)
 }
 return new User(user).save()
}
 
exports.getUser = function(id) {
 return User.findOne(id)
}
 
exports.checkUser = function(userData) {
 return User
 .findOne({email: userData.email})
 .then(function(doc){
 if ( doc.password == hash(userData.password) ){
 console.log("User password is ok");
 return Promise.resolve(doc)
 } else {
 return Promise.reject("Error wrong")
 }
 })
}

exports.myfind = function(id) {
    return User.findById(id, function (err, doc) {
        return Promise.resolve(doc);
      });
}
 
function hash(text) {
 return crypto.createHash('sha1')
 .update(text).digest('base64')
}