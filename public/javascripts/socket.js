let form = document.getElementsByTagName('form')[0];
let socket = io('http://localhost:8080');
// let room = form.id;

const user = {
    user: 'sergey',
    room: '1'
}

socket.emit("user_join", user, (data) => {
    console.log(data)
})
socket.on("newMessage", (data) => {
    let messages = document.getElementById('messages');
    let li = document.createElement('li');
    li.innerText = data.text;
    messages.appendChild(li);
})

form.addEventListener('submit', e => {
    e.preventDefault();
    let m = document.getElementById('input_submit');
    socket.emit('CreateMessage', m.value);
    m.value = ''
})
