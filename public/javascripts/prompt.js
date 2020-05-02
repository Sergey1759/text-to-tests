let prompts = document.getElementsByClassName('prompt');

for (const iterator of prompts) {
    let div = document.createElement('div');
    let rect = document.createElement('div');
    div.classList.add('prompt_value');
    rect.classList.add('rect');
    div.innerText = iterator.dataset.value;
    div.appendChild(rect);
    iterator.appendChild(div);
}

// for (const iterator of prompts) {
//     iterator.addEventListener('mouseover', (e) => {
//         iterator.style.backgroundColor = 'red';
//         console.log(iterator.dataset);
//         let div = document.createElement('div');
//         div.classList.add('prompt_value');
//         div.innerText = iterator.dataset.value;
//         iterator.appendChild(div);
//     })
// }

// for (const iterator of prompts) {
//     iterator.addEventListener('mouseout', (e) => {
//         iterator.style.backgroundColor = 'black';
//     })
// }