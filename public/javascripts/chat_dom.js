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

// ---------------------------------save img
let container_setting_error = document.getElementsByClassName('container_setting_error')[0];
let btn_save_img = document.getElementsByClassName('btn_save_img')[0];
let input_url = document.getElementById('input_url');


btn_save_img.addEventListener('click', async () => {
    let obj = {};
    let file = document.getElementById('file');
    obj.count = 0;
    if (input_url.value) {
        obj.count++;
        obj.url = input_url.value
    }
    if (file.files[0]) {
        obj.count++;
        obj.file = file.files[0]
    }
    if (obj.count == 2) {
        container_setting_error.innerText = "Обновите страницу, и выберите один из вариантов смены фото"
    } else {
        let m = new FormData();
        if (obj.url) {
            m.append('url', obj.url);
        } else {
            m.append('avatar', file.files[0]);
        }
        m.append('room', document.getElementById("RoomID").value);
        let res = await axios.post(`/chat/update_img`, m);
        console.log(res)
        if (res.status == 200) {
            location.reload();
        }
    }

});