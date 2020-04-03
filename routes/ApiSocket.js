var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
http.listen(8080, "https://cryptic-tundra-22516.herokuapp.com/");
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
        socket.emit('newMessage', m('admin', `hello ${data.user}`));
        socket.broadcast.to(data.room)
            .emit('newMessage', m('admin', `hello2 ${data.user}`))
    });

    socket.on('CreateMessage', data => {
        io.to(data.room).emit('newMessage', m(`${data.user}`, data.text))
    });

});



module.exports = {

}