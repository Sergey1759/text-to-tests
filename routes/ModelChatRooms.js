var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connect("mongodb+srv://sergey:root@cluster0-ppek4.mongodb.net/test")
var Rooms = new Schema({
    users: [],
    message: [],
    name: Schema.Types.String,
});

var rooms = mongoose.model('Rooms', Rooms);

module.exports = rooms;