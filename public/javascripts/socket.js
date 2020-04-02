let form = document.getElementsByTagName('form')[0];
let socket = io('http://localhost:8080');


form.addEventListener('submit', e => {
    e.preventDefault();
    let m = document.getElementById('input_submit');
    socket.emit('chat message', m.value);
    m.value = ''
})

socket.on('chat message', function (msg) {
    let messages = document.getElementById('messages');
    let li = document.createElement('li');
    li.innerText = msg;
    messages.appendChild(li);
});