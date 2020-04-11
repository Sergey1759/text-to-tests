let test_form = document.getElementsByClassName('test_form');
let btn_upload_res = document.getElementsByClassName('btn_upload_res')[0];

btn_upload_res.addEventListener('click', async () => {
    let answer = create_answer();
    await postData('/upload_test_result', answer).then(res => {
        console.log(res);
    })
});

function create_answer() {
    let arr = [];
    let idTest = document.getElementById('test_ID').value;
    for (const input of test_form) {
        let el = {};
        for (const chahed_input of input) {
            if (chahed_input.checked) {
                el.form_id = input.id;
                el.input_id = chahed_input.id;
                arr.push(el);
            }
        }
    }
    return {
        arr: arr,
        idTest: idTest
    };
}

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'error', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
}