import { isEscapeKey, isAllowedString, clickEscKeydown } from './util.js';
import { sendData } from './api.js';
import { HASHTAG_REGULAR_EXPRESSION, COMMENT_MAX_LENGTH, HASHTAG_MAX_COUNT, HASHTAG_MAX_LENGTH } from './constants.js';

const uploadForm = document.querySelector('.img-upload__overlay');
const form = document.querySelector('#upload-select-image');
const uploadFile = form.querySelector('#upload-file');
const body = document.body;
const buttonCloseForm = form.querySelector('#upload-cancel');
const textAreaInput =  form.querySelector('.text__description');
const hashTagsInput = form.querySelector('.text__hashtags');
const scaleInput = form.querySelector('.scale__control--value');
const effectLevelInput = form.querySelector('.img-upload__effect-level');
const effectOriginalInput = form.querySelector('#effect-none');
const photoUploadPreview = form.querySelector('.img-upload__preview img');
const btnSubmit = form.querySelector('.img-upload__submit');
const successTemplate = document.querySelector('#success');
const successContent = successTemplate.content.querySelector('.success');
const uploadSuccessButton = successContent.querySelector('.success__button');
const errorTemplate = document.querySelector('#error');
const errorContent = errorTemplate.content.querySelector('.error');
const uploadErrorButton = errorContent.querySelector('.error__button');

const hashtagValidateRegExp = new RegExp(HASHTAG_REGULAR_EXPRESSION);

const blockSubmitButton = () => {
  btnSubmit.disabled = true;
  btnSubmit.textContent = 'Публикую...';
};

const removeBlockSubmitButton = () => {
  btnSubmit.disabled = false;
  btnSubmit.textContent = 'Опубликовать';
};

uploadFile.addEventListener('change', () => {
  uploadForm.classList.remove('hidden');
  body.classList.add('modal-open');

  effectLevelInput.classList.add('hidden');
  photoUploadPreview.style.filter = 'none';
});

const clickFormPhotoEscKeydown = (evt) => {
  clickEscKeydown(evt, closeForm);
};

function closeForm () {
  uploadForm.classList.add('hidden');
  body.classList.remove('modal-open');

  uploadFile.value = '';
  textAreaInput.value = '';
  hashTagsInput.value = '';
  scaleInput.value = '100%';
  effectLevelInput.value = '100%';
  effectOriginalInput.checked = 'true';

  document.removeEventListener('keydown', clickFormPhotoEscKeydown);
}

buttonCloseForm.addEventListener('click', closeForm);
document.addEventListener('keydown', clickFormPhotoEscKeydown);

const pristine = new Pristine(form, {
  classTo: 'img-upload__text',
  errorClass: 'img-upload__text--invalid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'div',
  errorTextClass: 'text'
});

const getHashTagArray = (hashTagText) => hashTagText.toLowerCase().split(' ').filter((el) => el);

const checkHashtagsAmount = (value) => getHashTagArray(value).length <= HASHTAG_MAX_COUNT;

const checkDuplicateHashtags = (value) => {
  const hashtagsArray = getHashTagArray(value);
  const uniqueHashtags = new Set(hashtagsArray);
  return uniqueHashtags.size === hashtagsArray.length;
};

const checkHashTagLength = (value) => getHashTagArray(value).every((hashtag) => hashtag.length <= HASHTAG_MAX_LENGTH);

const validateComment = (value) => (
  isAllowedString(value, COMMENT_MAX_LENGTH)
);

const checkCorrectHashtags = (value) => {
  const hashtagsArray = getHashTagArray(value);
  const isValid = (hashtag) => hashtagValidateRegExp.test(hashtag);
  return hashtagsArray.every(isValid);
};

const validateUploadPhoto = () => uploadFile.value;

pristine.addValidator(hashTagsInput, checkHashtagsAmount, `Нельзя указать больше ${HASHTAG_MAX_COUNT} хэш-тегов`);
pristine.addValidator(hashTagsInput, checkDuplicateHashtags, 'Один и тот же хэш-тег не может быть использован дважды');
pristine.addValidator(hashTagsInput, checkCorrectHashtags, 'Хэштег должен начинаться с "#" и содержать буквы и числа');
pristine.addValidator(hashTagsInput, checkHashTagLength, `Максимальная длина одного хэш-тега ${HASHTAG_MAX_LENGTH} символов, включая решетку`);
pristine.addValidator(textAreaInput, validateComment, `Длина комментария не может составлять больше ${COMMENT_MAX_LENGTH} символов`);
pristine.addValidator(uploadFile, validateUploadPhoto, 'Вам нужно загрузить фотографию');

const onSuccessEscKeydown = (evt) => {
  clickEscKeydown(evt, closeSuccessForm);
};

const onErrorEscKeydown = (evt) => {
  clickEscKeydown(evt, closeErrorForm);
};

function closeSuccessForm() {
  document.body.removeChild(successContent);

  uploadSuccessButton.removeEventListener('click', closeSuccessForm);
  document.removeEventListener('keydown', onSuccessEscKeydown);
  successContent.removeEventListener('click', closeSuccessForm);
}

const onSuccessForm = () => {
  body.appendChild(successContent);

  successContent.addEventListener('click', closeSuccessForm);
  document.addEventListener('keydown', onSuccessEscKeydown);
  uploadSuccessButton.addEventListener('click', closeSuccessForm);

  closeForm();
};

function closeErrorForm() {
  body.removeChild(errorContent);

  document.removeEventListener('keydown', onErrorEscKeydown);
  uploadErrorButton.removeEventListener('click', closeErrorForm);
  errorContent.removeEventListener('click', closeErrorForm);
}

const onErrorForm = () => {
  document.body.appendChild(errorContent);

  errorContent.addEventListener('click', closeErrorForm);
  uploadErrorButton.addEventListener('click', closeErrorForm);
  document.addEventListener('keydown', closeErrorForm);

  closeForm();
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    sendData(
      () => {
        onSuccessForm();
        removeBlockSubmitButton();
      },
      () => {
        onErrorForm();
        removeBlockSubmitButton();
      },
      new FormData(evt.target),
    );
  }
});

textAreaInput.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

hashTagsInput.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});
