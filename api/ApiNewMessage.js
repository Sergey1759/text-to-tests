var mongoose = require('mongoose')
var db = mongoose.connect("mongodb+srv://sergey:root@cluster0-ppek4.mongodb.net/test")
var ModelNewMessage = require('../model/ModelNewMessage');

function createNewMessage(id_chat, id_user) {
    new_message = {
        id_chat: id_chat,
        id_user: id_user,
        count: 1
    }
    return new ModelNewMessage(new_message).save();
}

function addCount(id, count) {
    return ModelNewMessage.findOneAndUpdate({
        _id: id
    }, {
        count: count
    });
}

function reset(id_chat, id_user) {
    return ModelNewMessage.findOneAndUpdate({
        $and: [{
            id_chat: id_chat
        }, {
            id_user: id_user
        }]
    }, {
        count: 0
    });
}

function getObjectChatsId(id_user) {
    return ModelNewMessage.find({
        id_user: id_user
    }).then(res => {
        let obj = {};
        for (const obj_new_message of res) {
            obj[obj_new_message.id_chat] = obj_new_message.count;
        }
        return obj;
    })
}

function getByChatAndUser(id_chat, id_user) {
    return ModelNewMessage.findOne({
        $and: [{
            id_chat: id_chat
        }, {
            id_user: id_user
        }]
    })
}


module.exports = {
    createNewMessage,
    getByChatAndUser,
    addCount,
    getObjectChatsId,
    reset
}