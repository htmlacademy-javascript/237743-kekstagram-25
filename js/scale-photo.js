import { SCALE_STEP, MIN_VALUE_SCALE, MAX_VALUE_SCALE } from './constants.js';

const form = document.querySelector('.img-upload__form');
const scalePhotoWrapper = form.querySelector('.scale');
const btnScaleControlValue = scalePhotoWrapper.querySelector('.scale__control--value');
const btnScaleMakeSmaller = scalePhotoWrapper.querySelector('.scale__control--smaller');
const btnScaleMakeBigger = scalePhotoWrapper.querySelector('.scale__control--bigger');
const photo = form.querySelector('.img-upload__preview > img');

let scaleValue = 100;

btnScaleMakeSmaller.addEventListener('click', () => {
  scaleValue -= SCALE_STEP;
  if (scaleValue < MIN_VALUE_SCALE) {
    scaleValue = MIN_VALUE_SCALE;
  }

  photo.style.transform  = `scale(${(scaleValue / 100)})`;
  btnScaleControlValue.value = `${scaleValue}%`;
});

btnScaleMakeBigger.addEventListener('click', () => {
  scaleValue += SCALE_STEP;
  if (scaleValue > MAX_VALUE_SCALE) {
    scaleValue = MAX_VALUE_SCALE;
  }

  photo.style.transform  = `scale(${(scaleValue / 100)})`;
  btnScaleControlValue.value = `${scaleValue}%`;
});
