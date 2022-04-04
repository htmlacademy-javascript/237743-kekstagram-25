import { isEscapeKey } from './util.js';

const body = document.querySelector('body');
const fullPhoto = document.querySelector('.big-picture');
const fullPhotoAddress = document.querySelector('.big-picture__img > img');
const fullPhotoCloseElement = document.querySelector('.big-picture__cancel');
const commentsCounterWrapper =  document.querySelector('.social__comment-count');
const commentsCount = document.querySelector('.comments-count');
const commentsLoader = document.querySelector('.comments-loader');
const likeCount = document.querySelector('.likes-count');
const socialComments = document.querySelector('.social__comments');
const photoCaption = document.querySelector('.social__caption');

const onFullSizePhotoEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullSizePhoto();
  }
};

fullPhotoCloseElement.addEventListener('click', () => {
  closeFullSizePhoto();
});

function closeFullSizePhoto () {
  fullPhoto.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onFullSizePhotoEscKeydown);
}

const commentFragment = document.createDocumentFragment();

const getCommentElements = (comments) => {
  for (const comment of comments) {
    const commentsItem = document.createElement('li');
    commentsItem.classList.add('social__comment');
    const commentsItemImg = document.createElement('img');
    commentsItemImg.classList.add('social__picture');
    commentsItemImg.src = comment.avatar;
    commentsItemImg.alt = comment.name;
    commentsItemImg.style.width = '35px';
    commentsItemImg.style.height = '35px';
    const commentsItemParagraf = document.createElement('p');
    commentsItemParagraf.classList.add('social__text');
    commentsItemParagraf.textContent = comment.message;
    commentsItem.append(commentsItemImg);
    commentsItem.append(commentsItemParagraf);
    commentFragment.append(commentsItem);
    socialComments.append(commentFragment);
  }
};

const renderFullPhoto = (src, likes, comments, description) => {
  fullPhotoAddress.src = src;
  likeCount.textContent = likes;
  commentsCount.textContent = comments.length;
  photoCaption.textContent = description;
  socialComments.textContent = '';
  getCommentElements(comments);
};

const openFullSizePhoto = (src, likes, comments, description) => {
  fullPhoto.classList.remove('hidden');
  commentsCounterWrapper.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  body.classList.add('modal-open');

  renderFullPhoto(src, likes, comments, description);
  document.addEventListener('keydown', onFullSizePhotoEscKeydown);
};

export { openFullSizePhoto };
