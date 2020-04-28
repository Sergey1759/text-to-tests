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
}