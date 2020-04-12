class Form {
    constructor(id) {
        this.element = document.getElementById(id);
        this.inputs = this.getInputs();
        this.select_group = this.element.querySelector("select");
    }
    submit(callback) {
        this.element.addEventListener("submit", (e) => {
            e.preventDefault();
            callback();
        });
    }
    getInputs() {
        let obj = {};
        let inputs = this.element.querySelectorAll("input");
        for (const iterator of inputs) {
            obj[iterator.name] = iterator;
        }
        return obj;
    }

    // validators
    validatorEmail() {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
            this.inputs["email"].value
        );
    }
    validatorPassword() {
        return true;
        // return this.inputs['password'].value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/); //in error return null
    }
    validatorName() {
        return (
            this.inputs["name"].value.length > 3 &&
            /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u.test(
                this.inputs["name"].value
            )
        );
    }
    validatorLastName() {
        return (
            this.inputs["last_name"].value.length > 3 &&
            /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u.test(
                this.inputs["last_name"].value
            )
        );
    }
    validatorGroup() {
        return (this.select_group.value == 'Группа') || (this.select_group.value == 'Выбирете группу из списка ниже') ? false : true;
    }
    validatorRepeat_password() {
        return (
            this.inputs["password"].value == this.inputs["repeat_password"].value &&
            this.inputs["password"].value.length
        );
    }
    wrap_validator(name, placeholder, class_name) {
        if (!this.inputs[name]) throw new Error(`inputs[${name}] does not exist`);
        this.inputs[name].value = "";
        this.inputs[name].placeholder = placeholder;
        this.inputs[name].parentElement.classList.add(class_name);
    }
    async post_data(data, callback) {
        await fetch(this.element.action, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(async res => {
            if (res.redirected) {
                location.reload(true);
            } else {
                res = await res.json();
                callback(res);
            }
        });
    }
}

let SignInForm = new Form("SignInForm");
SignInForm.submit(async () => {
    if (!SignInForm.validatorEmail()) {
        SignInForm.wrap_validator(
            "email",
            "не валидный email",
            "danger_placeholder"
        );
    }
    if (SignInForm.validatorPassword() == null) {
        SignInForm.wrap_validator(
            "password",
            "не валидный пароль",
            "danger_placeholder"
        );
    }
    if (SignInForm.validatorEmail() && SignInForm.validatorPassword() != null) {
        SignInForm.post_data({
            email: SignInForm.element['email'].value,
            password: SignInForm.element['password'].value,
        }, (res) => {
            SignInForm.wrap_validator('email', res.answer, 'danger_placeholder');
            SignInForm.wrap_validator('password', res.answer, 'danger_placeholder');
        });
    }
});

let SignUpForm = new Form("SignUpForm");
SignUpForm.submit(() => {
    let count_verify = 6;
    if (!SignUpForm.validatorEmail()) {
        SignUpForm.wrap_validator(
            "email",
            "не валидный email",
            "danger_placeholder"
        );
        count_verify--;
    }
    if (!SignUpForm.validatorName()) {
        SignUpForm.wrap_validator("name", "не валидное имя", "danger_placeholder");
        count_verify--;
    }
    if (!SignUpForm.validatorLastName()) {
        SignUpForm.wrap_validator(
            "last_name",
            "не валидная фамилия",
            "danger_placeholder"
        );
        count_verify--;
    }
    if (!SignUpForm.validatorGroup()) {
        let group = SignUpForm.element.querySelector('#group_header');
        let select = SignUpForm.element.querySelector('select');
        select.style.color = 'rgba(153, 15, 15, 0.788)'
        select.addEventListener('focus', () => {
            select.style.color = 'rgb(0, 87, 146)'
        })
        group.innerHTML = 'Выбирете группу из списка ниже';
        group.checked;
        count_verify--;
    }
    if (SignUpForm.validatorPassword() == null) {
        SignUpForm.wrap_validator(
            "password",
            "не валидный пароль",
            "danger_placeholder"
        );
        count_verify--;
    }
    if (!SignUpForm.validatorRepeat_password()) {
        SignUpForm.wrap_validator(
            "repeat_password",
            "пароли не совподают",
            "danger_placeholder"
        );
        count_verify--;
    }
    if (count_verify == 6) {
        console.log(2);
        SignUpForm.post_data({
            email: SignUpForm.element['email'].value,
            password: SignUpForm.element['password'].value,
            name: SignUpForm.element['name'].value,
            last_name: SignUpForm.element['last_name'].value,
            group: SignUpForm.select_group.value,
            email: SignUpForm.element['email'].value,
        }, (res) => {
            if (res.answer_True) {
                document.getElementsByClassName('successful_sign_up')[0].style.display = 'block';
                SignUpForm.element.style.display = 'none';
            } else if (res.answer_False) {
                SignUpForm.wrap_validator('email', res.answer_False, 'danger_placeholder')
            }
        });
    }
});