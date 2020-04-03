var mongoose = require('mongoose')
var db = mongoose.connect("mongodb+srv://sergey:root@cluster0-ppek4.mongodb.net/test")
var ModelChatRooms = require('./ModelChatRooms');

function createRooms(name) {
    return new ModelChatRooms({name : name}).save();
}

function getAll() {
    return ModelChatRooms.find({});
}

module.exports = {
    createRooms,
    getAll
}