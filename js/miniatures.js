import { openFullSizePhoto } from './full-photo.js';

const picturesContainer = document.querySelector('.pictures');
const miniatureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const similarListFragment = document.createDocumentFragment();

const renderListPhoto = (listPhotos) => {
  listPhotos.forEach(({url, likes, comments, description }) => {
    const miniatureElement = miniatureTemplate.cloneNode(true);
    miniatureElement.querySelector('img').src = url;
    miniatureElement.querySelector('.picture__likes').textContent = likes;
    miniatureElement.querySelector('.picture__comments').textContent = comments.length;
    similarListFragment.append(miniatureElement);
    miniatureElement.addEventListener('click', () => {
      openFullSizePhoto(url, likes, comments, description);
    });
    picturesContainer.append(similarListFragment);

  });
};

export { renderListPhoto };
