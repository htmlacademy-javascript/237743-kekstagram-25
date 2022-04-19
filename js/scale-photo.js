const form = document.querySelector('.img-upload__form');
const scalePhotoWrapper = form.querySelector('.scale');
const btnScaleControlValue = scalePhotoWrapper.querySelector('.scale__control--value');
const btnScaleMakeSmaller = scalePhotoWrapper.querySelector('.scale__control--smaller');
const btnScaleMakeBigger = scalePhotoWrapper.querySelector('.scale__control--bigger');
const photo = form.querySelector('.img-upload__preview > img');

const scaleStep = 25;
const minValueScale = 25;
const maxValueScale = 100;
let scaleValue = 100;

btnScaleMakeSmaller.addEventListener('click', () => {
  scaleValue -= scaleStep;
  if (scaleValue < minValueScale) {
    scaleValue = minValueScale;
  }

  photo.style.transform  = `scale(${(scaleValue / 100)})`;
  btnScaleControlValue.value = `${scaleValue}%`;
});

btnScaleMakeBigger.addEventListener('click', () => {
  scaleValue += scaleStep;
  if (scaleValue > maxValueScale) {
    scaleValue = maxValueScale;
  }

  photo.style.transform  = `scale(${(scaleValue / 100)})`;
  btnScaleControlValue.value = `${scaleValue}%`;
});
