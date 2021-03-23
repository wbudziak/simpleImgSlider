const btnLeft = document.querySelector('.image-slider__button--left');
const btnRight = document.querySelector('.image-slider__button--right');
const imgBox = document.querySelector('.image-slider__img-box');
const previewImgBox = document.querySelector('.preview-slider__img-box');
const image = [...document.querySelectorAll('.image-slider__img')];
const imgURL = [...document.querySelectorAll('.img-id')];
const arrowLeft = document.querySelector('.image-slider__arrow-left');
const arrowRight = document.querySelector('.image-slider__arrow-right');
const slideBtn = document.querySelector('.image-slider__slide-btn');
const spanNumber = document.querySelector('span');
let previewElement = [];
let moveSlider = 0;
let movePreview = 0;
let moveSliderValue = 100;
let movePreviewValue = 25;
let number = 1;
let previewNumber = 1;
let numberPreview = 1;
let slideInterval;
let slideTransition = 3000;
let slideFlag = true;


const imgBoxWidth = () => {
    imgBox.style.width = `${image.length * 100}%`;
}

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

const addNumber = () => {
    number++;
}
const substractionNumber = () => {
    number--;
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
        let idPreview = index;
        element.addEventListener("click", () => {
            moveSlider = 0;
            movePreview = 0;
            if (previewNumber < number) {
                previewNumber = idPreview + 1;
                number--;
                moveSlider += (moveSliderValue * (previewNumber - 1));
                imgBox.style.left = `${moveSlider}%`;
                movePreview += (movePreviewValue * (previewNumber - 1));
                previewImgBox.style.left = `${movePreview}%`;
            } else {
                previewNumber = idPreview + 1;
                number = previewNumber;
                moveSlider -= (moveSliderValue * (previewNumber - 1));
                imgBox.style.left = `${moveSlider}%`;
                movePreview -= (movePreviewValue * (previewNumber - 1));
                previewImgBox.style.left = `${movePreview}%`;
            }
            numberOfPicture();
        })
    });
}

const slideLeft = () => {
    if (number <= 1) {
        animation()
        number = image.length;
        console.log(number);
        numberOfPicture();
        moveSlider = ((image.length - 1) * -moveSliderValue);
        movePreview = ((image.length - 1) * -movePreviewValue);
        imgBox.style.left = `${moveSlider}%`;
        previewImgBox.style.left = `${movePreview}%`;
        return;
    }
    substractionNumber();
    console.log(number);

    numberOfPicture();
    moveSlider += moveSliderValue;
    imgBox.style.left = `${moveSlider}%`;
    movePreview += movePreviewValue;
    previewImgBox.style.left = `${movePreview}%`;

}

const slideRight = () => {
    arrowLeft.style.transform = "translateX(-5px);";
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
    addNumber();
    console.log(number);

    numberOfPicture();
    moveSlider -= moveSliderValue;
    imgBox.style.left = `${moveSlider}%`;
    movePreview -= movePreviewValue;
    previewImgBox.style.left = `${movePreview}%`;
}

btnLeft.addEventListener('click', slideLeft);

btnLeft.addEventListener("mousedown", () => {
    arrowLeft.style.transform = "translateX(-5px)";
})

btnLeft.addEventListener("mouseup", () => {
    arrowLeft.style.transform = "translateX(0px)";
})

btnRight.addEventListener('click', slideRight);

btnRight.addEventListener("mousedown", () => {
    arrowRight.style.transform = "translateX(5px)";
})

btnRight.addEventListener("mouseup", () => {
    arrowRight.style.transform = "translateX(0px)";
})

slideBtn.addEventListener('click', () => {

    if (slideFlag) {
        slideFlag = !slideFlag;
        slideBtn.innerHTML = '<i class="fas fa-pause"></i>';
        slideInterval = setInterval(() => {
            slideRight();
            if (number === 1) {
                window.clearInterval(slideInterval);
                slideBtn.innerHTML = `<i class="fas fa-play"></i>`;
                slideFlag = !slideFlag;
            }
        }, slideTransition);
    } else {
        slideFlag = !slideFlag;
        window.clearInterval(slideInterval);
        slideBtn.innerHTML = `<i class="fas fa-play"></i>`;
    }
})

imgBoxWidth();
previewPictures();
numberOfPicture();