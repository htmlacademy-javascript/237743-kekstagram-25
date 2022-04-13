import { isEscapeKey, isAllowedString } from './util.js';
import { HASHTAGS_REGULAR_EXPRESSION, COMMENT_MAX_LENGTH, HASHTAGS_MAX_COUNT, HASHTAGS_MAX_LENGTH } from './constants.js';

const hashtagValidateRegExp = new RegExp(HASHTAGS_REGULAR_EXPRESSION);

const uploadForm = document.querySelector('.img-upload__overlay');
const form = document.querySelector('#upload-select-image');
const uploadFile = form.querySelector('#upload-file');
const body = document.querySelector('body');
const buttonCloseForm = form.querySelector('#upload-cancel');
const textAreaInput =  form.querySelector('.text__description');
const hashTagsInput = form.querySelector('.text__hashtags');
const scaleInput = form.querySelector('.scale__control--value');
const effectLevelInput = form.querySelector('.img-upload__effect-level');
const effectOriginalInput = form.querySelector('#effect-none');

uploadFile.addEventListener('change', () => {
  uploadForm.classList.remove('hidden');
  body.classList.add('modal-open');

});

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
  hashTagsInput.value = '';
  scaleInput.value = '100%';
  effectLevelInput.value = '100%';
  effectOriginalInput.checked = 'true';


  document.removeEventListener('keydown', onFormPhotoEscKeydown);
}

buttonCloseForm.addEventListener('click', closeForm);
document.addEventListener('keydown', onFormPhotoEscKeydown);

const pristine = new Pristine(form, {
  classTo: 'img-upload__text',
  errorClass: 'img-upload__text--invalid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'div',
  errorTextClass: 'text'
});

const getHashTagArray = (hashTagText) => hashTagText.toLowerCase().split(' ').filter((el) => el);

const checkHashtagsAmount = (value) => getHashTagArray(value).length <= HASHTAGS_MAX_COUNT;

const checkDuplicateHashtags = (value) => {
  const hashtagsArray = getHashTagArray(value);
  const uniqueHashtags = new Set(hashtagsArray);
  return uniqueHashtags.size === hashtagsArray.length;
};

const checkHashTagLength = (value) => getHashTagArray(value).every((hashtag) => hashtag.length <= HASHTAGS_MAX_LENGTH);

const validateComment = (value) => (
  isAllowedString(value, COMMENT_MAX_LENGTH)
);

const checkCorrectHashtags = (value) => {
  const hashtagsArray = getHashTagArray(value);
  const isValid = (hashtag) => hashtagValidateRegExp.test(hashtag);
  return hashtagsArray.every(isValid);
};

const validateUploadPhoto = () => uploadFile.value;

pristine.addValidator(hashTagsInput, checkHashtagsAmount, `Нельзя указать больше ${HASHTAGS_MAX_COUNT} хэш-тегов`);
pristine.addValidator(hashTagsInput, checkDuplicateHashtags, 'Один и тот же хэш-тег не может быть использован дважды');
pristine.addValidator(hashTagsInput, checkCorrectHashtags, 'Хэштег должен начинаться с "#" и содержать буквы и числа');
pristine.addValidator(hashTagsInput, checkHashTagLength, `Максимальная длина одного хэш-тега ${HASHTAGS_MAX_LENGTH} символов, включая решетку`);
pristine.addValidator(textAreaInput, validateComment, `Длина комментария не может составлять больше ${COMMENT_MAX_LENGTH} символов`);
pristine.addValidator(uploadFile, validateUploadPhoto, 'Вам нужно загрузить фотографию');

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    form.submit();
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

