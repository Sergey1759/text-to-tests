let SignIn = document.getElementById('tab_sign_in');
let SignUp = document.getElementById('tab_sign_up');

let SignInContainer = document.getElementsByClassName('SignIn')[0];
let SignUpContainer = document.getElementsByClassName('SignUp')[0];

let container_auth = document.getElementsByClassName('container_auth')[0];
let error_login = document.getElementsByClassName('error_login')[0];

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
        SignInContainer.style.display = bool ? 'none' : 'block';
        SignUpContainer.style.display = bool ? 'block' : 'none';
        container_auth.style.height = bool ? '370px' : '242px';
        bool = !bool;
    }
}