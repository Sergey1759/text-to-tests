var express = require("express");
var app = express();
var server = app.listen(8080);
var socketIO = require('socket.io');
var io = socketIO(server);
var ApiChats = require("./ApiMessage");

const m = (name, text, id) => {
    return {
        name: name,
        text: text,
        id: id
    }
}

io.on('connection', socket => {
    socket.on('user_join', (data, cb) => {
        socket.join(data.room)
        cb({
            userId: socket.id,
        });
        // socket.emit('newMessage', m('admin', `hello ${data.user}`));
        // socket.broadcast.to(data.room)
        //     .emit('newMessage', m('admin', `hello2 ${data.user}`))
    });

    socket.on('CreateMessage', async data => {
        io.to(data.room).emit('newMessage', m(`${data.user}`, data.text));
        await ApiChats.createMessage(data.room, data.text, data.user, data.room);
        console.log(data);
    });

});



module.exports = {

}