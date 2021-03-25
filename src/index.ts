const btnLeft = document.querySelector<HTMLButtonElement>('.image-slider__button--left');
const btnRight = document.querySelector<HTMLButtonElement>('.image-slider__button--right');
const imgBox = document.querySelector<HTMLDivElement>('.image-slider__img-box');
const previewImgBox = document.querySelector<HTMLDivElement>('.preview-slider__img-box');
const image = [...document.querySelectorAll<HTMLImageElement>('.image-slider__img')];
const imgURL = [...document.querySelectorAll<HTMLImageElement>('.img-id')];
const arrowLeft = document.querySelector<HTMLElement>('.image-slider__arrow-left');
const arrowRight = document.querySelector<HTMLElement>('.image-slider__arrow-right');
const slideBtn = document.querySelector<HTMLButtonElement>('.image-slider__slide-btn');
const spanNumber = document.querySelector<HTMLSpanElement>('span');

let slideTransition = 3000;
let moveSliderValue = 100;
let movePreviewValue = 25;
let previewElement: HTMLDivElement[] = [];
let moveSlider = 0;
let movePreview = 0;
let number = 1;
let previewNumber = 1;
let slideIntervalId: ReturnType<typeof setTimeout> | undefined;
let slideFlag = true;

imgBox.style.width = `${image.length * 100}%`;

const numberOfPicture = () => {
    spanNumber.textContent = `Image ${number} of ${image.length}`;
}

const animation = () => {
    imgBox.style.transition = "0s linear all";
    imgBox.style.filter = "blur(10px)";
    setTimeout(() => {
        imgBox.style.filter = "blur(0)";
        imgBox.style.transition = ".3s linear all";
    }, 300);
}

const previewPictures = () => {
    if (image.length === 1) {
        previewImgBox.style.width = `${image.length * 100}%`;
    }
    if (image.length === 2) {
        previewImgBox.style.width = `${image.length * 50}%`;
    }
    if (image.length === 3) {
        previewImgBox.style.width = `${image.length * 33.33}%`;
    }
    if (image.length >= 4) {
        previewImgBox.style.width = `${image.length * 25}%`;
    }
    for (let i = 0; i < image.length; i++) {
        const previewSlideImg = document.createElement('div');
        previewSlideImg.className = "preview-slider__img";
        const previewImg = document.createElement('img');
        previewImg.src = imgURL[i].src;
        previewSlideImg.appendChild(previewImg);
        previewImgBox.appendChild(previewSlideImg);
        previewElement.push(previewSlideImg);
    }
    previewElement.forEach((element, index) => {
        let idPreview = index + 1;
        element.addEventListener("click", () => {
            moveSlider = 0;
            movePreview = 0;
            previewNumber = idPreview;
            number = previewNumber;
            moveSlider -= (moveSliderValue * (previewNumber - 1));
            imgBox.style.left = `${moveSlider}%`;
            movePreview -= (movePreviewValue * (previewNumber - 1));
            previewImgBox.style.left = `${movePreview}%`;
            numberOfPicture();
        })
    });
}

const slideLeft = () => {
    if (number <= 1) {
        animation()
        number = image.length;
        numberOfPicture();
        moveSlider = ((image.length - 1) * -moveSliderValue);
        movePreview = ((image.length - 1) * -movePreviewValue);
        imgBox.style.left = `${moveSlider}%`;
        previewImgBox.style.left = `${movePreview}%`;
        return;
    }
    number--;
    numberOfPicture();
    moveSlider += moveSliderValue;
    imgBox.style.left = `${moveSlider}%`;
    movePreview += movePreviewValue;
    previewImgBox.style.left = `${movePreview}%`;
}

const slideRight = () => {
    if (number >= image.length) {
        animation()
        imgBox.style.left = `0%`;
        previewImgBox.style.left = `0%`;
        number = 1;
        numberOfPicture();
        moveSlider = 0;
        movePreview = 0;
        return;
    }
    number++;
    numberOfPicture();
    moveSlider -= moveSliderValue;
    imgBox.style.left = `${moveSlider}%`;
    movePreview -= movePreviewValue;
    previewImgBox.style.left = `${movePreview}%`;
}

btnLeft.addEventListener('click', slideLeft);
btnRight.addEventListener('click', slideRight);
slideBtn.addEventListener('click', () => {
    if (slideFlag) {
        slideFlag = !slideFlag;
        slideBtn.innerHTML = '<i class="fas fa-pause"></i>';
        slideIntervalId = setInterval(() => {
            slideRight();
            if (number === 1) {
                window.clearInterval(slideIntervalId);
                slideBtn.innerHTML = `<i class="fas fa-play"></i>`;
                slideFlag = !slideFlag;
            }
        }, slideTransition);
    } else {
        slideFlag = !slideFlag;
        window.clearInterval(slideIntervalId);
        slideBtn.innerHTML = `<i class="fas fa-play"></i>`;
    }
})

btnLeft.addEventListener("mousedown", () => {
    arrowLeft.style.transform = "translateX(-5px)";
})
btnLeft.addEventListener("mouseup", () => {
    arrowLeft.style.transform = "translateX(0px)";
})
btnRight.addEventListener("mousedown", () => {
    arrowRight.style.transform = "translateX(5px)";
})
btnRight.addEventListener("mouseup", () => {
    arrowRight.style.transform = "translateX(0px)";
})

previewPictures();
numberOfPicture();