var mongoose = require('mongoose')
var db = mongoose.connect("mongodb+srv://sergey:root@cluster0-ppek4.mongodb.net/test")
var ModelMessage = require('./ModelMessage');

function createMessage(roomID, massage, from, to) {
    message = {
        roomID: roomID,
        message: massage,
        from: from,
        to: to,
    }
    return new ModelMessage(message).save();
}

function getChatById(id) {
    return ModelMessage.find({
        id_chat: id
    });
}
module.exports = {
    createMessage,
    getChatById
}