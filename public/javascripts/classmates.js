let btn = document.body.getElementsByClassName('btn_message');
console.log(btn)
for (const iterator of btn) {
    iterator.addEventListener('click', message)
}

async function message() {
    let dom_up_input = this.previousElementSibling;
    await fetch('/classmates', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            classmates_id: dom_up_input.id
        })
    });

}