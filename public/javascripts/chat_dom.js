// ----------------------------------------------emoji
let emoji = document.getElementsByClassName('emoji')[0]; // create emoji
for (let index = 128512; index <= 128591; index++) {
    let div = document.createElement('div');
    div.classList.add('smile');
    div.innerHTML = `&#${index}`;
    emoji.appendChild(div);
}

let smile = document.getElementsByClassName('smile'); // addEventListener
for (const iterator of smile) {
    iterator.addEventListener('click', () => {
        let m = document.getElementById("input_submit");
        let buf = m.value;
        buf = buf + iterator.innerHTML;
        m.value = buf;
    })
}

// ----------------------------------  scroll bottom
var objDiv = document.getElementById("messages");
objDiv.scrollTop = objDiv.scrollHeight;


// ----------------------------------  chat setting
//container_setting
let container_setting = document.getElementsByClassName('container_setting')[0];

let chat_setting = document.getElementsByClassName('chat_setting')[0];
chat_setting.addEventListener('click', () => {
    container_setting.style.display = "flex";
    isOpenSetting = true;
});

let setting_header_btn_close = document.getElementsByClassName('setting_header_btn_close')[0];
setting_header_btn_close.addEventListener('click', () => {
    container_setting.style.display = "none";
    isOpenSetting = false;
});