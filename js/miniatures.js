import {getListPhotosDescriptions} from './data.js';
import { openFullSizePhoto } from './full-photo.js';

const picturesContainer = document.querySelector('.pictures');

const miniatureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const listPhotos = getListPhotosDescriptions();

const similarListFragment = document.createDocumentFragment();

listPhotos.forEach(({url, likes, comments, description }) => {
  const miniatureElement = miniatureTemplate.cloneNode(true);
  miniatureElement.querySelector('img').src = url;
  miniatureElement.querySelector('.picture__likes').textContent = likes;
  miniatureElement.querySelector('.picture__comments').textContent = comments.length;
  similarListFragment.append(miniatureElement);
  miniatureElement.addEventListener('click', () => {
    openFullSizePhoto(url, likes, comments, description);
  });
});

picturesContainer.append(similarListFragment);
