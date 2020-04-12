let form = document.getElementsByTagName('form')[0];
let socket = io('https://cryptic-tundra-22516.herokuapp.com:443');
// let room = form.id;
var objDiv = document.getElementById("messages");
objDiv.scrollTop = objDiv.scrollHeight;

const user = {
    user: document.getElementById('userID').value,
    room: document.getElementById('RoomID').value
}

socket.emit("user_join", user, (data) => {
    console.log(data)
})
socket.on("newMessage", (data) => {
    let messages = document.getElementById('messages');
    let li = document.createElement('li');
    li.classList.add('li');
    li.innerHTML = `<img src="https://img.icons8.com/plasticine/2x/user.png" alt="" width="50px"
    height="50px"> ${data.text}`;
    messages.appendChild(li);
    var objDiv = document.getElementById("messages");
    objDiv.scrollTop = objDiv.scrollHeight;
})

form.addEventListener('submit', e => {
    e.preventDefault();
    let m = document.getElementById('input_submit');
    socket.emit('CreateMessage', {
        user: user.user,
        text: m.value,
        room: user.room
    });
    m.value = ''
})