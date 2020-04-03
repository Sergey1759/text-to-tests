// let SignIn = document.getElementById('tab_sign_in');
// let SignUp = document.getElementById('tab_sign_up');

// let SignInContainer = document.getElementsByClassName('SignIn')[0];
// let SignUpContainer = document.getElementsByClassName('SignUp')[0];

// let container_auth = document.getElementsByClassName('container_auth')[0];
// let error_login = document.getElementsByClassName('error_login')[0];

// let toggle = wrap_toggle();
// SignIn.addEventListener('click', toggle);
// SignUp.addEventListener('click', toggle);

// function wrap_toggle() {
//     let bool = true;
//     return function () {
//         SignIn.style.background = bool ? "rgba(0, 0, 70, 1)" : 'white';
//         SignIn.style.color = bool ? "white" : "rgba(0, 0, 70, 1)";
//         SignUp.style.background = bool ? 'white' : "rgba(0, 0, 70, 1)";
//         SignUp.style.color = bool ? "rgba(0, 0, 70, 1)" : 'white';
//         SignInContainer.style.display = bool ? 'none' : 'block';
//         SignUpContainer.style.display = bool ? 'block' : 'none';
//         container_auth.style.height = bool ? '370px' : '242px';
//         bool = !bool;
//     }
// }

// //  validation forms
// class Forms {
//     constructor(id) {
//         this.elem = document.getElementById(id);
//         this.inputs = this.getInputs();
//     }
//     submit(func) {
//         this.elem.addEventListener('submit', (event) => {
//             event.preventDefault();
//             func(this.elem);
//         });
//     }
//     getInputs() {
//         let inputs = this.elem.querySelectorAll('input');
//         let obj = {};
//         for (const iterator of inputs) {
//             if (iterator.name) {
//                 obj[iterator.name] = iterator
//             }
//         }
//         return obj
//     }
//     validatorEmail() {
//         let email = this.getInputs().email;
//         return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value));
//     }
//     validatorPassword() {
//         let password = this.inputs.password;
//         let password_reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
//         return password.value.match(password_reg);
//         // return true;
//     }
//     wrap_validate(placeholder_text, elem_by_name, callback_Validator) {
//         if (!callback_Validator()) {
//             this.inputs[elem_by_name].placeholder = placeholder_text;
//             this.inputs[elem_by_name].value = '';
//             this.inputs[elem_by_name].parentElement.classList.add('danger_placeholder');
//         }
//     }
//     submitFetch = async function postData(data = {}) {
//         const response = await fetch(this.elem.action, {
//             method: 'POST', // *GET, POST, PUT, DELETE, etc.
//             mode: 'cors', // no-cors, *cors, same-origin
//             cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//             credentials: 'include', // include, *same-origin, omit
//             headers: {
//                 'Content-Type': 'application/json'
//                 // 'Content-Type': 'application/x-www-form-urlencoded',
//             },
//             redirect: 'follow', // manual, *follow, error
//             referrerPolicy: 'no-referrer', // no-referrer, *client
//             body: JSON.stringify(data) // body data type must match "Content-Type" header
//         });
//         let m;
//         if (!response.redirected) {
//             m = await response.json();
//         } else {
//             m = response
//         }
//         console.log(m)
//         return m // parses JSON response into native JavaScript objects
//     }
// }

// let SignInForm = new Forms('SignInForm');
// SignInForm.submit(async (elem) => {
//     let inputs = SignInForm.getInputs();
//     if (!SignInForm.validateEmail()) {
//         inputs.email.placeholder = 'ведите коректный email';
//         inputs.email.value = '';
//         inputs.email.parentElement.classList.add('danger_placeholder');
//     }

//     if (!SignInForm.validatePassword()) {
//         inputs.password.placeholder = 'ведите коректный пароль';
//         inputs.password.value = '';
//         inputs.password.parentElement.classList.add('danger_placeholder');
//     }

//     if (SignInForm.validatePassword() && SignInForm.validateEmail()) {
//         let m = await SignInForm.submitFetch({
//             email: inputs.email.value,
//             password: inputs.password.value
//         });
//         if (m.answer) {
//             error_login.innerHTML = m.answer;
//             error_login.style.opacity = 1;
//         } else {
//             location.reload(true);
//         }
//     }
// });

// let SignUpForm = new Forms('SignUpForm');
// SignUpForm.submit(async (elem) => {
//     let inputs = SignUpForm.getInputs();
//     if (!SignUpForm.validateEmail()) {
//         inputs.email.placeholder = 'ведите коректный email';
//         inputs.email.value = '';
//         inputs.email.parentElement.classList.add('danger_placeholder');
//     }

//     if (!SignUpForm.validatePassword()) {
//         inputs.password.placeholder = 'ведите коректный пароль';
//         inputs.password.value = '';
//         inputs.password.parentElement.classList.add('danger_placeholder');
//     }
//     if (inputs.password.value != inputs.password_2.value) {
//         inputs.password.placeholder = 'пароли не свпадают';
//         inputs.password.value = '';
//         inputs.password.parentElement.classList.add('danger_placeholder');

//         inputs.password_2.placeholder = 'пароли не свпадают';
//         inputs.password_2.value = '';
//         inputs.password_2.parentElement.classList.add('danger_placeholder');
//     }

//     if (SignUpForm.validatePassword() && SignUpForm.validateEmail()) {
//         // let m = await SignInForm.submitFetch({
//         //     email: inputs.email.value,
//         //     password: inputs.password.value
//         // });
//         // if (m.answer) {
//         //     error_login.innerHTML = m.answer;
//         //     error_login.style.opacity = 1;
//         // } else {
//         //     location.reload(true);
//         // }
//         console.log('s')
//     }
// });
let m = {};
