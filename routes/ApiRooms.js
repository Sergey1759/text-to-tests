var mongoose = require('mongoose')
var db = mongoose.connect("mongodb+srv://sergey:root@cluster0-ppek4.mongodb.net/test")
var ModelChatRooms = require('./ModelChatRooms');

function createRooms(name) {
    return new ModelChatRooms({
        name: name
    }).save();
}

function getAll() {
    return ModelChatRooms.find({});
}

async function addUser(Room_id, User_id) {
    let m = await ModelChatRooms.findOne({
        _id: Room_id
    }).then(res => {
        res.users.push(User_id)
        return Promise.resolve(res);
    })
    return await m.save();
}
module.exports = {
    createRooms,
    getAll,
    addUser
}