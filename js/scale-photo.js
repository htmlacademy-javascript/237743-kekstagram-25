const formDelete = document.querySelector('.img-upload__overlay');
const form = document.querySelector('.img-upload__form');
const scalePhotoWrapper = document.querySelector('.scale');
const btnScaleControlValue = scalePhotoWrapper.querySelector('.scale__control--value');
const btnScaleMakeSmaller = scalePhotoWrapper.querySelector('.scale__control--smaller');
const btnScaleMakeBigger = scalePhotoWrapper.querySelector('.scale__control--bigger');
const photo = form.querySelector('.img-upload__preview > img');

formDelete.classList.remove('hidden');

let scaleValue = 100;

btnScaleMakeSmaller.addEventListener('click', () => {
  scaleValue -= 25;
  if (scaleValue < 25) {
    scaleValue = 25;
  }

  photo.style.transform  = `scale(${(scaleValue / 100)})`;
  btnScaleControlValue.value = `${scaleValue}%`;
});

btnScaleMakeBigger.addEventListener('click', () => {
  scaleValue += 25;
  if (scaleValue > 100) {
    scaleValue = 100;
  }

  photo.style.transform  = `scale(${(scaleValue / 100)})`;
  btnScaleControlValue.value = `${scaleValue}%`;
});
