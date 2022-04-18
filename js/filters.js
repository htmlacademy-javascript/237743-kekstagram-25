import { renderListPhoto } from './miniatures.js';

const filtersForm = document.querySelector('.img-filters__form');


const filter = (listPhotos) => {
  renderListPhoto(listPhotos);
};

export { filter };
