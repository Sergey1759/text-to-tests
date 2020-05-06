let form = document.getElementsByTagName("form")[0];
let socket = io();
let audio = new Audio('https://d1490khl9dq1ow.cloudfront.net/audio/sfx/mp3preview/BsTwCwBHBjzwub4i4/windshield-knock-single_f1n9owNd_NWM.mp3');
let btn_submit = document.getElementById('btn-submit');
let btn_emoji = document.getElementById('btn-emoji');
let target_img = document.getElementById('target_img');

let typing = document.getElementsByClassName('typing')[0];

isOpenSetting = false;

const user = {
  user: document.getElementById("userID").value,
  room: document.getElementById("RoomID").value,
  user_img: document.getElementById("user_img").value,
  user_name: document.getElementById("user_name").value,
};
let typing_bool = false;
socket.on('display', (data) => {
  if (data) {
    // console.log(timer);
    if (typing_bool) {

    } else {
      let div = document.createElement('div');
      div.innerText = data.name + ' печатает';
      typing.appendChild(div);
      typing_bool = true;
      let timer = setTimeout(() => {
        typing.removeChild(div);
        typing_bool = false;
      }, 3000);
    }


  } else
    console.log('d')
})

socket.emit("user_join", user, (data) => {
  console.log(data);
});

socket.on("newMessage", (data) => {
  console.log(data)
  audio.play();
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
});

form.addEventListener('submit', (e) => e.preventDefault());

btn_submit.addEventListener("click", (e) => {
  let m = document.getElementById("input_submit");
  socket.emit("CreateMessage", {
    user: user.user,
    text: m.value,
    room: user.room,
    user_img: user.user_img
  });
  m.value = "";
});

let bool_toggle = false;
btn_emoji.addEventListener("click", (e) => {
  if (e.target == target_img) {
    emoji.style.display = bool_toggle ? 'none' : 'flex';
    bool_toggle = !bool_toggle;
  }
});

document.addEventListener("keydown", function (event) {
  let m = document.getElementById("input_submit");
  if (event.code != "Enter") {
    if (!isOpenSetting) {
      m.focus();
      if (bool_toggle) {
        emoji.style.display = bool_toggle ? 'none' : 'flex';
        bool_toggle = !bool_toggle;
      }
      socket.emit('typing', {
        user: user.user_name,
        typing: true,
        room: user.room,
        user_img: user.user_img,
        user_id: user.user
      })
    }
  } else {
    if (m.value.trim()) {
      socket.emit("CreateMessage", {
        user: user.user,
        text: m.value,
        room: user.room,
        user_img: user.user_img
      });
      m.value = "";
    }
    if (bool_toggle) {
      emoji.style.display = bool_toggle ? 'none' : 'flex';
      bool_toggle = !bool_toggle;
    }
  }
});