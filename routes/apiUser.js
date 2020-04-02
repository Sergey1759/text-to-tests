var mongoose = require('mongoose')
var crypto = require('crypto')
var db = mongoose.connect("mongodb+srv://sergey:root@cluster0-ppek4.mongodb.net/test")
var User = require('./UserModel')


exports.createUser = function (userData) {
  let user_local = User.findOne({
    email: userData.email
  });
  if (user_local) {
    return Promise.reject(false);
  } else {
    var user = {
      name: userData.name,
      lastname: userData.lastname,
      group: userData.group,
      email: userData.email,
      photo: userData.photo,
      role: 'user',
      password: hash(userData.password)
    }
    return new User(user).save()
  }

}

exports.checkUser = function (userData) {
  return User
    .findOne({
      email: userData.email
    })
    .then(function (doc) {
      if (doc.password == hash(userData.password)) {
        console.log("User password is ok");
        return Promise.resolve(doc)
      } else {
        return Promise.reject("Error wrong")
      }
    })
}

exports.insertIdRESULT = function (id, arr) {
  return User.findOneAndUpdate({
    _id: id
  }, {
    result: arr
  }, function (err, doc) {
    return Promise.resolve(doc);
  });
}

exports.getByID = function (id) {
  return User.findById(id, function (err, doc) {
    return Promise.resolve(doc);
  });
}
exports.getByIDandReturnResult = function (id) {
  return User.findById(id).then(res => {
    return res.result
  });
}
exports.delete_result = function (id) {
  return User.findOneAndUpdate({
    _id: id
  }, {
    result: []
  });
}
exports.getAll = function (id) {
  return User.find({}, function (err, doc) {
    return Promise.resolve(doc);
  });
}


function hash(text) {
  return crypto.createHash('sha1')
    .update(text).digest('base64')
}