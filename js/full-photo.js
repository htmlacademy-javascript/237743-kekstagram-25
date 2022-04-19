import { isEscapeKey } from './util.js';
import { SHOWING_COMMENTS_AT_A_TIME } from './constants.js';

const body = document.body;
const fullPhoto = body.querySelector('.big-picture');
const fullPhotoAddress = fullPhoto.querySelector('.big-picture__img > img');
const fullPhotoCloseElement = fullPhoto.querySelector('.big-picture__cancel');
const commentsCount = fullPhoto.querySelector('.comments-count');
const currentCommentsCount = fullPhoto.querySelector('.current_comments_count');
const commentsLoader = fullPhoto.querySelector('.comments-loader');
const likeCount = fullPhoto.querySelector('.likes-count');
const socialComments = fullPhoto.querySelector('.social__comments');
const photoCaption = fullPhoto.querySelector('.social__caption');

let shownCommentsCount = 0;
let totalCommentList = [];
let totalCommentListLength = 0;

const onFullSizePhotoEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullSizePhoto();
  }
};

fullPhotoCloseElement.addEventListener('click', closeFullSizePhoto);

const fillPhotoComments = (comments) => {
  const commentsListPortion = comments.slice(shownCommentsCount, shownCommentsCount + SHOWING_COMMENTS_AT_A_TIME).reduce((commentsHtml, commentId) => {
    commentsHtml += `<li class="social__comment">
      <img class="social__picture" src="${commentId.avatar}" alt="${commentId.name}" width="35px" height="35px">
      <p class="social__text">${commentId.message}</p>
      </li>`;
    return commentsHtml;
  }, '');
  socialComments.insertAdjacentHTML('beforeend', commentsListPortion);
};

const onCommentsLoaderClick = (evt) => {
  evt.preventDefault();

  fillPhotoComments(totalCommentList);
  shownCommentsCount += SHOWING_COMMENTS_AT_A_TIME;
  currentCommentsCount.textContent = shownCommentsCount.toString();

  if (totalCommentListLength <= shownCommentsCount) {
    commentsLoader.classList.add('hidden');
    currentCommentsCount.textContent = totalCommentListLength.toString();
  }
};

function closeFullSizePhoto () {
  fullPhoto.classList.add('hidden');
  body.classList.remove('modal-open');

  shownCommentsCount = 0;

  commentsLoader.classList.remove('hidden');

  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  document.removeEventListener('keydown', onFullSizePhotoEscKeydown);
}

const renderFullPhoto = (src, likes, comments, description) => {
  likeCount.textContent = likes.toString();
  commentsCount.textContent = totalCommentListLength.toString();

  fullPhotoAddress.src = src;
  photoCaption.textContent = description;
  socialComments.textContent = '';

  fillPhotoComments(comments);

  if (totalCommentListLength <= SHOWING_COMMENTS_AT_A_TIME) {
    currentCommentsCount.textContent = totalCommentListLength.toString();
    currentCommentsCount.classList.add('hidden');
  } else {
    currentCommentsCount.textContent = SHOWING_COMMENTS_AT_A_TIME.toString();
  }
  shownCommentsCount += SHOWING_COMMENTS_AT_A_TIME;
};

const openFullSizePhoto = (src, likes, comments, description) => {
  totalCommentList = comments;
  totalCommentListLength = totalCommentList.length;

  fullPhoto.classList.remove('hidden');
  body.classList.add('modal-open');

  renderFullPhoto(src, likes, comments, description);

  commentsLoader.addEventListener('click', onCommentsLoaderClick);
  document.addEventListener('keydown', onFullSizePhotoEscKeydown);
};

export { openFullSizePhoto };
