let SignIn = document.getElementById('tab_sign_in');
let SignUp = document.getElementById('tab_sign_up');

let SignInContainer = document.getElementsByClassName('SignIn')[0];
let SignUpContainer = document.getElementsByClassName('SignUp')[0];

let container_auth = document.getElementsByClassName('container_auth')[0];

let toggle = wrap_toggle();
SignIn.addEventListener('click', toggle);
SignUp.addEventListener('click', toggle);

function wrap_toggle() {
    let bool = true;
    return function () {
        SignIn.style.background = bool ? "rgba(0, 0, 70, 1)" : 'white';
        SignIn.style.color = bool ? "white" : "rgba(0, 0, 70, 1)";
        SignUp.style.background = bool ? 'white' : "rgba(0, 0, 70, 1)";
        SignUp.style.color = bool ? "rgba(0, 0, 70, 1)" : 'white';
        SignInContainer.style.display = bool ? 'none' : 'flex';
        SignUpContainer.style.display = bool ? 'flex' : 'none';
        container_auth.style.height = bool ? '442px' : '242px';
        bool = !bool;
    }
}

//  validation forms
class Forms {
    constructor(id) {
        this.elem = document.getElementById(id);
    }
    submit(func) {
        this.elem.addEventListener('submit', (event) => {
            event.preventDefault();
            func(this.elem);
        });
    }
    getInputs() {
        let inputs = this.elem.querySelectorAll('input');
        let obj = {};
        for (const iterator of inputs) {
            if (iterator.name) {
                obj[iterator.name] = iterator
            }
        }
        return obj
    }
    validateEmail() {
        let email = this.getInputs().email;
        return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value));
    }

}

let SignInForm = new Forms('SignInForm');
SignInForm.submit((elem) => {
    let inputs = SignInForm.getInputs();
    if (!SignInForm.validateEmail()) {
        inputs.email.placeholder = 'ведите корестный ва';
        inputs.email.value = '';
        inputs.email.classList.add('danger_placeholder');
    }

});