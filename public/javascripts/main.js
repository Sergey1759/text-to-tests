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

SignUpForm.addEventListener('change' , () => {
    let result_obj = validate(SignUpForm);
    result_obj.submit.style.pointerEvents = result_obj.value ? 'auto' : 'none';
},false)

// form validate
function validate(elem){
    let count = -1;
    let bool_email = false;
    let inputs = elem.getElementsByTagName('input');
    let submit;
    for (const input of inputs) {
        if(!input.value) count++;
        if(input.name == "email") bool_email = validate_mail(input);
        if(input.type == "submit") submit = input;
    }
    return {
        value : (bool_email && count == 0),
        submit : submit
    }
}
function validate_mail(elem){
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(elem.value))
}