let btn = document.body.getElementsByClassName('btn_message');
console.log(btn)
for (const iterator of btn) {
    iterator.addEventListener('click', message)
}

async function message() {
    let dom_up_input = this.previousElementSibling;
    await fetch('/classmates', {
        method: 'POST',
        redirect: 'follow',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            classmates_id: dom_up_input.id
        })
    }).then(res => {
        // console.log(res);
        document.location.href = res.url;
    });

}