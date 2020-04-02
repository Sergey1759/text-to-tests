let nav_right = document.getElementsByClassName('nav_right')[0];
let sub_right = document.getElementsByClassName('sub_right')[0];

let toggle1 = wrap_toggle();
nav_right.addEventListener('click', toggle1);

let logout = document.getElementById('logout');

logout.addEventListener('click', async (e) => {
    await fetch('/users/logout', {
        method: 'POST',
        body: JSON.stringify({})
    }).then(() => location.reload(true))
});

function wrap_toggle(e) {
    let bool = true;
    return function (e) {
        if (e.target.className == 'user_name') {
            if (bool) {
                sub_right.classList.add('to_anim_sub');
                sub_right.classList.remove('from_anim_sub');
            } else {
                sub_right.classList.add('from_anim_sub');
                sub_right.classList.remove('to_anim_sub');
            }
            setTimeout(() => {
                sub_right.style.display = bool ? 'flex' : 'none';
                bool = !bool
            }, 290)
        }
    }
}