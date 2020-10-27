var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NewMessage = new Schema({
    id_chat: Schema.Types.ObjectId,
    id_user: Schema.Types.ObjectId,
    count: Schema.Types.Number
});

var model = mongoose.model('NewMessage', NewMessage);

module.exports = model;