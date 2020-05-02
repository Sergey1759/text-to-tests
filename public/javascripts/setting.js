let btn_save_info_profile = getID('btn_save_info_profile');
let container_confirm = document.getElementsByClassName('container_confirm')[0];
let btn_save_info_profile2 = getID('btn_save_info_profile2');
let error = getID('error');

let confirm_data = {
    name: getID('confirm_name').value,
    lastname: getID('confirm_lastname').value,
    email: getID('confirm_email').value
}

let change_data = {};


btn_save_info_profile.addEventListener('click', async () => {
    let form = {
        name: getID('new_name').value,
        lastname: getID('new_lastname').value,
        email: getID('new_email').value,
        password: getID('new_password').value,
    }
    error.innerText = '';
    let counter = 4;
    if ((form.name != confirm_data.name) && validate_name(form.name)) {
        counter--;
        change_data.name = form.name;
    }
    if ((form.lastname != confirm_data.lastname) && validate_lastname(form.lastname)) {
        counter--;
        change_data.lastname = form.lastname;
    }
    if (form.email !== confirm_data.email && validate_email(form.email)) {
        counter--;
        change_data.email = form.email;
    }
    if (form.password && validate_password(form.password)) {
        counter--;
        change_data.password = form.password;
    }
    console.log(change_data);
    if (counter < 4) {
        if (!change_data.password) {
            getID('repeated_pass').parentElement.parentElement.style.display = 'none';
        }
        container_confirm.style.display = 'flex';
        if (change_data.email) {
            await axios.post('/setting/confirm', {
                isChangeEmail: true,
                new_email: change_data.email
            });
        } else {
            await axios.post('/setting/confirm', {
                isChangeEmail: false
            });
        }
    } else {
        error.innerText = 'Вы в формах ничего не изменили'
    }
});

container_confirm.addEventListener('click', e => {
    if (e.target == container_confirm) {
        container_confirm.style.display = 'none';
    }
});

btn_save_info_profile2.addEventListener('click', async () => {
    let confirm_inputs_data = {
        repeated_pass: document.getElementById('repeated_pass').value,
        old_password: document.getElementById('old_password').value,
        mail_code: document.getElementById('mail_code').value
    }
    if (change_data.password) {
        if (
            (confirm_inputs_data.repeated_pass == change_data.password) &&
            validate_password(confirm_inputs_data.old_password) &&
            validate_mail_code(confirm_inputs_data.mail_code)
        ) {
            let data_post = {};
            data_post.change_data = change_data;
            // data_post.repeated_pass = confirm_inputs_data.repeated_pass;
            data_post.old_password = confirm_inputs_data.old_password;
            data_post.mail_code = confirm_inputs_data.mail_code;
            let res = await axios.post('/setting/update', data_post);
            if (res.status == 200) {
                location.reload()
            } else {
                alert("Не верные данные были введены");
            }

        } else {
            alert('Введенные данные не валидны')
        }
    } else {
        if (validate_password(confirm_inputs_data.old_password) && validate_mail_code(confirm_inputs_data.mail_code)) {
            let data_post = {};
            data_post.change_data = change_data;
            // data_post.repeated_pass = confirm_inputs_data.repeated_pass;
            data_post.old_password = confirm_inputs_data.old_password;
            data_post.mail_code = confirm_inputs_data.mail_code;
            let res = await axios.post('/setting/update', data_post);

            if (res.data.err) {
                alert(res.data.err);
            } else {
                location.reload();
            }

        } else {
            alert('Введенные данные не валидны')
        }
    }

});

function getID(id) {
    return document.getElementById(id);
}

function message(text) {
    error.innerText = text;
}

function validate_name(name) {
    console.log(name)
    return true
}

function validate_lastname(lastname) {
    return true
}

function validate_email(email) {
    return true
}

function validate_password(password) {
    return true
}

function validate_mail_code(code) {
    return true
}

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
        console.log('fddfd1');
        obj.url = input_url.value
    }
    if (file.files[0]) {
        obj.count++;
        console.log('fddfd2');
        obj.file = file.files[0]
    }
    if (obj.count == 2 || obj.count == 0) {
        container_setting_error.innerText = "Обновите страницу, и выберите один из вариантов смены фото"
    } else {
        console.log('fddfd');
        let m = new FormData();
        if (obj.url) {
            m.append('url', obj.url);
        } else {
            m.append('avatar', file.files[0]);
        }
        m.append('user_id', document.getElementById('user_id').value);
        let res = await axios.post(`/setting/updateUserImg`, m);
        console.log(res)
        if (res.status == 200) {
            location.reload();
        }
    }
});