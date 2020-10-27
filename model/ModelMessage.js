var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var db = mongoose.connect("mongodb+srv://sergey:root@cluster0-ppek4.mongodb.net/test")
var Message = new Schema({
    roomID: Schema.Types.ObjectId,
    message: String,
    data: {
        type: Date,
        default: Date.now
    },
    from: Schema.Types.ObjectId,
    to: Schema.Types.ObjectId
});

var message = mongoose.model('Message', Message);

module.exports = message;