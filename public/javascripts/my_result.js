// document.addEventListener("DOMContentLoaded", ready);
window.onload = () => {
    ready()
};
let circle = document.querySelectorAll('.progress_ring__circle');

function ready() {
    setPercent(circle[0], 100, 'rgb(71, 71, 71,0.3)');
    setPercent(circle[1], 66, 'rgba(252, 210, 113, 1)');

    setPercent(circle[2], 100, 'rgb(71, 71, 71,0.3)');
    setPercent(circle[3], 75, 'rgba(43, 187, 216, 1)');

    setPercent(circle[4], 100, 'rgb(71, 71, 71,0.3)');
    setPercent(circle[5], 50, 'rgba(247, 141, 63, 1)');

    setPercent(circle[6], 100, 'rgb(71, 71, 71,0.3)');
    setPercent(circle[7], 44, 'rgba(16, 46, 55, 1)');
    console.log(circle)
}
// setTimeout(ready, 1000)



function setPercent(circle, percent, stroke) {
    let radius = circle.r.baseVal.value;
    let circumference = 2 * Math.PI * radius;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;
    circle.style.stroke = stroke;
    let offset = circumference - percent / 100 * circumference;
    circle.style.strokeDashoffset = offset;
}