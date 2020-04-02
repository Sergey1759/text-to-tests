var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connect("mongodb+srv://sergey:root@cluster0-ppek4.mongodb.net/test")
var Chat = new Schema({
    id_user: Schema.Types.ObjectId,
    massage: String,
    data: { type: Date, default: Date.now }, 
});

var chat = mongoose.model('Chat', Chat);

module.exports = chat;