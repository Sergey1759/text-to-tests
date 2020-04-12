var mongoose = require('mongoose')
var crypto = require('crypto')
var db = mongoose.connect("mongodb+srv://sergey:root@cluster0-ppek4.mongodb.net/test")
var User = require('./UserModel')
var group = require('./apiGroup')


exports.createUser = async function (userData) {
  let user_local = await User.findOne({
    email: userData.email
  });
  if (user_local) {
    console.log('user_local')
    console.log(user_local)
    return Promise.reject(false);
  } else {
    console.log(12)
    return await group.get(userData.group).then(res => {
      let buf = [];
      buf.push(res.chatId);
      var user = {
        name: userData.name,
        lastname: userData.last_name,
        group: userData.group,
        email: userData.email,
        photo: userData.photo,
        role: 'user',
        password: hash(userData.password),
        chats: buf
      }
      return Promise.resolve(new User(user).save())
    });
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

function getByID(id) {
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

exports.addChatRooms = async function (user_id, chat_id) {
  let user = await getByID(user_id);
  let user_chats = user.chats;
  user_chats.push(chat_id);
  return User.findOneAndUpdate({
    _id: user_id
  }, {
    chats: user_chats
  });
}

function hash(text) {
  return crypto.createHash('sha1')
    .update(text).digest('base64')
}