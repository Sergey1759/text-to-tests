let form = document.getElementsByTagName("form")[0];

let socket = io();

var objDiv = document.getElementById("messages");
objDiv.scrollTop = objDiv.scrollHeight;

const user = {
  user: document.getElementById("userID").value,
  room: document.getElementById("RoomID").value,
  user_img: document.getElementById("user_img").value,
};

socket.emit("user_join", user, (data) => {
  console.log(data);
});
socket.on("newMessage", (data) => {
  console.log(data)
  let messages = document.getElementById("messages");
  let li = document.createElement("li");
  if (data.name == user.user) {
    li.classList.add("li");
    li.innerHTML = `<img src="${user.user_img}" alt="" width="50px"
    height="50px"> ${data.text}`;
  } else {
    li.classList.add("li");
    li.classList.add("li_reverse");
    li.innerHTML = `<img src="${data.img}" alt="" width="50px"
    height="50px"> ${data.text}`;
  }

  messages.appendChild(li);
  var objDiv = document.getElementById("messages");
  objDiv.scrollTop = objDiv.scrollHeight;
  console.log('eew')
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let m = document.getElementById("input_submit");

  socket.emit("CreateMessage", {
    user: user.user,
    text: m.value,
    room: user.room,
    user_img: user.user_img
  });
  m.value = "";
});

document.addEventListener("keydown", function (event) {
  let m = document.getElementById("input_submit");
  if (event.code != "Enter") {
    m.focus();
  } else {
    // if (m.value.trim()) {
    //   socket.emit("CreateMessage", {
    //     user: user.user,
    //     text: m.value,
    //     room: user.room,
    //     user_img: user.user_img
    //   });
    //   m.value = "";
    // }
  }
});