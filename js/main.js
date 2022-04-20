import './miniatures.js';
import './form.js';
import './scale-photo.js';
import './effect-photo.js';
import './filters.js';
import {showFilters} from './filters.js';
import { renderListPhoto } from './miniatures.js';
import { getData } from './api.js';

let listPhotos;

getData(
  (loadedPhotos) => {
    listPhotos = loadedPhotos;
    renderListPhoto(loadedPhotos);
    showFilters();
  }
);

export { listPhotos };
