var mongoose = require('mongoose')
var db = mongoose.connect("mongodb+srv://sergey:root@cluster0-ppek4.mongodb.net/test")
var Group = require('./ModelGroup')
let Api_rooms = require('./ApiRooms');


function get(name) {
  return Group.findOne({
    'name': name
  }, function (err, doc) {
    return Promise.resolve(doc);
  });
}

async function createGroup(name) {
  let created_chat = await Api_rooms.createRooms(`${name}_chat`, 'group');
  let group = {
    name: name,
    chatId: created_chat._id
  }
  console.log(group);
  return new Group(group).save();
}

function getAll() {
  return Group.find({}, function (err, doc) {
    return Promise.resolve(doc);
  });
}

function getAllForAuth() { // for select in index hbs
  return Group.find({}, function (err, doc) {
    return Promise.resolve(doc);
  }).then(res => {
    let names_group = []
    for (const iterator of res) {
      names_group.push(iterator.name);
    }
    return names_group;
  })
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
  insertNameTest,
  getAllForAuth,
  createGroup
}