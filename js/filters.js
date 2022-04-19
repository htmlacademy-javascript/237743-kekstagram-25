import { renderListPhoto } from './miniatures.js';

const userFiltersElement = document.querySelector('.img-filters');
const userFiltersButtons = document.querySelectorAll('.img-filters__button');

// Комментарии в порядке убывания
const compareComments = (a, b) => b.comments.length-a.comments.length;
// Случаные 10 фото
const getRandomThumbnails = () => Math.random() - 0.5;

const RANDOM_PHOTO_COUNT = 10;

const filter = (listItems) => {

  let sortedData;

  userFiltersElement.addEventListener ('click', (evt)  => {

    switch (evt.target.id) {
      case 'filter-random':
        sortedData = listItems.slice().sort(getRandomThumbnails).slice(0, RANDOM_PHOTO_COUNT);
        for (const button of userFiltersButtons) {
          button.classList.remove('img-filters__button--active');
        }
        evt.target.classList.add('img-filters__button--active');
        break;
      case 'filter-discussed':
        sortedData = listItems.slice().sort(compareComments);
        for (const button of userFiltersButtons) {
          button.classList.remove('img-filters__button--active');
        }
        evt.target.classList.add('img-filters__button--active');
        break;
      case 'filter-default':
        for (const button of userFiltersButtons) {
          button.classList.remove('img-filters__button--active');
        }
        evt.target.classList.add('img-filters__button--active');
    }
    renderListPhoto(sortedData);


  });
};

export { filter };
