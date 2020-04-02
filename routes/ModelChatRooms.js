var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connect("mongodb+srv://sergey:root@cluster0-ppek4.mongodb.net/test")
var Rooms = new Schema({
    id_chats: Schema.Types.ObjectId,
    users: []
});

var rooms = mongoose.model('Rooms', Rooms);

module.exports = rooms;