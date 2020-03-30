var mongoose = require('mongoose')
var db = mongoose.connect("mongodb+srv://sergey:root@cluster0-ppek4.mongodb.net/test")
var UserResult = require('./UserResult')

function createUserResult(id_test, id_user, arr) {
   var user = {
      id_test: id_test,
      id_user: id_user,
      arr: arr,
      attempt: 0
   }
   return new UserResult(user).save()
}

async function findUserResult(id_test, id_user) {
   return UserResult.find({
      id_test: id_test,
      id_user: id_user
   }, function (err, doc) {
      return Promise.resolve(doc);
   })
}

function insertIdRESULT(id, arr) {
   return UserResult.findOneAndUpdate({
      _id: id
   }, {
      arr: arr
   }, function (err, doc) {
      return Promise.resolve(doc);
   });
}

function insertIdAttempt(id, attempt) {
   return UserResult.findOneAndUpdate({
      _id: id
   }, {
      attempt: attempt
   }, function (err, doc) {
      return Promise.resolve(doc);
   });
}

module.exports = {
   createUserResult,
   findUserResult,
   insertIdRESULT,
   insertIdAttempt
}