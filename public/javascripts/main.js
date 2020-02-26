//  форма регистрации
let SignIn =  document.getElementById('SignIn');
let SignUp =  document.getElementById('SignUp');
let SignInForm =  document.getElementById('SignInForm');
let SignUpForm =  document.getElementById('SignUpForm');



SignIn.addEventListener('click',() => {
    SignIn.classList.remove('inactive');
    SignIn.classList.add('active');
    SignUp.classList.remove('active');
    SignInForm.style.display = 'block';
    SignUpForm.style.display = 'none';
},false);

SignUp.addEventListener('click',() => {
    SignUp.classList.add('active');
    SignUp.classList.remove('inactive');
    SignIn.classList.remove('active');
    SignInForm.style.display = 'none';
    SignUpForm.style.display = 'block';
},false);