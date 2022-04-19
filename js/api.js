import { showAlert } from './util.js';

const userFiltersElement = document.querySelector('.img-filters');

const getData = (success) => {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((photo) => {
      success(photo);
      userFiltersElement.classList.remove('img-filters--inactive');
    })
    .catch(() => {
      showAlert('Не удалось загрузить фотографии. Попробуйте ещё раз');
    });
};

const sendData = (success, fail, body) => {
  fetch(
    'https://25.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        success();
      } else {
        fail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      fail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getData, sendData};
