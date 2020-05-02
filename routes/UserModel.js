var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  name: 'string',
  lastname: 'string',
  photo: {
    type: String,
    default: 'https://www.wellcaredemo.com/csoffshore/wp-content/uploads/2015/08/delete-my-profile-e1443936078215.png'
  },
  email: {
    type: String,
    unique: true
  },
  password: 'string',
  group: 'string',
  role: 'string',
  chats: Array,
  online: Date,
  confirm_code: {
    type: String,
    default: '1234'
  },
  result: []
});

var Test = mongoose.model('User', User);

module.exports = Test;