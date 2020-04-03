var mongoose = require('mongoose')
var db = mongoose.connect("mongodb+srv://sergey:root@cluster0-ppek4.mongodb.net/test")
var Group = require('./ModelGroup')


function get(name) {
  return Group.findOne({
    'name': name
  }, function (err, doc) {
    return Promise.resolve(doc);
  });
}

function getAll() {
  return Group.find({}, function (err, doc) {
    return Promise.resolve(doc);
  });
}

function getAll() {
  return Group.find({}, function (err, doc) {
    return Promise.resolve(doc);
  });
}

async function addStudent(id, group) {
  let m = await get(group);
  m.students.push(id);
  m.save();
}
async function insertNameTest(nameGroup, idTest) {
  let m = await get(nameGroup);
  m.tests.push(idTest);
  m.save();
}
module.exports = {
  addStudent,
  get,
  getAll,
  insertNameTest
}
