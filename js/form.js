import { isEscapeKey } from './util.js';

const uploadForm = document.querySelector('.img-upload__overlay');
const form = document.querySelector('.img-upload__form');
const uploadFile = form.querySelector('#upload-file');
const body = document.querySelector('body');
const buttonCloseForm = form.querySelector('#upload-cancel');
const textAreaInput =  form.querySelector('.text__description');
const hashtagsInput = form.querySelector('.text__hashtags');
const scaleInput = form.querySelector('.scale__control--value');
const effectLevelInput = form.querySelector('.img-upload__effect-level');
const effectOriginalInput = form.querySelector('#effect-none');

uploadForm.classList.remove('hidden');

uploadFile.addEventListener('change', () => {
  uploadForm.classList.remove('hidden');
  body.classList.add('modal-open');

});
console.log(textAreaInput.onfocus);
const onFormPhotoEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
  }
};

function closeForm () {
  uploadForm.classList.add('hidden');
  body.classList.remove('modal-open');

  uploadFile.value = '';
  textAreaInput.value = '';
  hashtagsInput.value = '';
  scaleInput.value = '100%';
  effectLevelInput.value = '100%';
  effectOriginalInput.checked = 'true';


  document.removeEventListener('keydown', onFormPhotoEscKeydown);
}

buttonCloseForm.addEventListener('click', closeForm);
document.addEventListener('keydown', onFormPhotoEscKeydown);

const pristine = new Pristine(form);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    console.log('Можно отправлять');
  } else {
    console.log('Форма невалидна');
  }
});


