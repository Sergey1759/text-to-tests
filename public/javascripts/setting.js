let btn_save_info_profile = getID('btn_save_info_profile');
let container_confirm = document.getElementsByClassName('container_confirm')[0];
let btn_save_info_profile2 = getID('btn_save_info_profile2');
let error = getID('error');

let confirm_data = {
    name: getID('confirm_name').value,
    lastname: getID('confirm_lastname').value,
    email: getID('confirm_email').value
}




btn_save_info_profile.addEventListener('click', () => {
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
        console.log(1)
    }
    if ((form.lastname != confirm_data.lastname) && validate_lastname(form.lastname)) {
        counter--;
        console.log(2)
    }
    if (form.email !== confirm_data.email && validate_email(form.email)) {
        counter--;
        console.log(3)
    }
    if (form.password && validate_password(form.password)) {
        counter--;
        console.log(4)
    }
    if (counter < 4) {
        container_confirm.style.display = 'flex';
    } else {
        error.innerText = 'Ничего не поменялось'
    }
});

container_confirm.addEventListener('click', e => {
    if (e.target == container_confirm) {
        container_confirm.style.display = 'none';
    }
});

btn_save_info_profile2.addEventListener('click', () => {
    console.log('fetch data');
    let form = {
        name: getID('new_name').value,
        lastname: getID('new_lastname').value,
        email: getID('new_email').value,
        password: getID('new_password').value,
    }
    if (getID('repeated_pass').value == form.password) {
        alert("OK")
    } else {
        alert('error')
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