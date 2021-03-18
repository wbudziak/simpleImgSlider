const btnLeft = document.querySelector('.container__button--left');
const btnRight = document.querySelector('.container__button--right');
const imgBox = document.querySelector('.container__img-box');
const image = [...document.querySelectorAll('.container__img')];
const arrowLeft = document.querySelector('.container__arrow-left');
const arrowRight = document.querySelector('.container__arrow-right');
const spanNumber = document.querySelector('span');
let movePX = 0;
let number = 1;

const start = () => {
    imgBox.style.width = `${image.length * 100}%`;
    spanNumber.textContent = `Picture ${number}/${image.length}`;
}
const numberOfPicture = () => {
    spanNumber.textContent = `Picture ${number} of ${image.length}`;
}
const animation = () => {
    imgBox.style.transition = "0s linear all";
    imgBox.style.filter = "blur(10px)";
    setTimeout(() => {
        imgBox.style.filter = "blur(0)";
        imgBox.style.transition = ".3s linear all";
    }, 300);
}
start();
numberOfPicture();


btnLeft.addEventListener('click', (e) => {
    if (number <= 1) {
        animation()
        number = image.length;
        numberOfPicture();
        movePX = ((image.length - 1) * -100);
        imgBox.style.left = `${movePX}%`;
        return;
    }
    number--;
    numberOfPicture();
    movePX += 100;
    imgBox.style.left = `${movePX}%`;
})
btnLeft.addEventListener("mousedown", ()=>{
    arrowLeft.style.transform = "translateX(-5px)";
})
btnLeft.addEventListener("mouseup", ()=>{
    arrowLeft.style.transform = "translateX(0px)";
})


btnRight.addEventListener('click', (e) => {
    arrowLeft.style.transform = "translateX(-5px);";
    if (number >= image.length) {
        animation()
        imgBox.style.left = `0%`;
        number = 1;
        numberOfPicture();
        movePX = 0;
        return;
    }
    number++;
    numberOfPicture();
    movePX -= 100;
    imgBox.style.left = `${movePX}%`;
})
btnRight.addEventListener("mousedown", ()=>{
    arrowRight.style.transform = "translateX(5px)";
})
btnRight.addEventListener("mouseup", ()=>{
    arrowRight.style.transform = "translateX(0px)";
})