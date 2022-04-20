import { listPhotos } from './main.js';
import {debounce, getRandomArray } from './util.js';
import { RERENDER_DELAY } from './constants.js';
import {renderListPhoto} from './miniatures.js';

const filterContainer = document.querySelector('.img-filters');
const filterDefault = filterContainer.querySelector('#filter-default');
const filterRandom = filterContainer.querySelector('#filter-random');
const filterDiscussed = filterContainer.querySelector('#filter-discussed');

const comparePhotos = (photoFirst, photoSecond) => photoSecond.comments.length - photoFirst.comments.length;

const showFilters = () => {
  filterContainer.classList.remove('img-filters--inactive');
};

const deletePhotos = () => {
  const picture = document.querySelectorAll('.picture').forEach((elem) => elem.parentNode.removeChild(elem));
  return picture;
};

const renderPhotos = (pictures) => {
  deletePhotos();
  renderListPhoto(pictures);
};

const renderPhotosWithDelay = debounce(renderPhotos, RERENDER_DELAY);

const onFilterDefaultClick = () => {
  filterDefault.classList.add('img-filters__button--active');
  filterRandom.classList.remove('img-filters__button--active');
  filterDiscussed.classList.remove('img-filters__button--active');

  renderPhotosWithDelay(listPhotos);
};

const onFilterRandomClick = () => {
  const slicedPhotos = listPhotos.slice();
  filterDefault.classList.remove('img-filters__button--active');
  filterRandom.classList.add('img-filters__button--active');
  filterDiscussed.classList.remove('img-filters__button--active');

  renderPhotosWithDelay(getRandomArray(slicedPhotos, 10));
};

const onFilterDiscussedClick = () => {
  const slicedPhotos = listPhotos.slice();
  filterDefault.classList.remove('img-filters__button--active');
  filterRandom.classList.remove('img-filters__button--active');
  filterDiscussed.classList.add('img-filters__button--active');

  renderPhotosWithDelay(slicedPhotos.sort(comparePhotos));
};

filterDefault.addEventListener('click', onFilterDefaultClick);
filterRandom.addEventListener('click', onFilterRandomClick);
filterDiscussed.addEventListener('click', onFilterDiscussedClick);

export {showFilters};
