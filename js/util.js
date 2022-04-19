import { ALERT_TIME } from './constants.js';

const getRundomNumber = (numberOne, numberTwo) => {
  if(numberOne > numberTwo) {
    numberOne = Math.floor(numberOne);
    numberTwo = Math.ceil(numberTwo);
    return Math.floor(Math.random() * (numberOne - numberTwo)) + numberTwo;
  }

  numberOne = Math.ceil(numberOne);
  numberTwo = Math.floor(numberTwo);
  return Math.floor(Math.random() * (numberTwo - numberOne)) + numberOne;
};

const getRandomArrayElement = (elements) => elements[getRundomNumber(0, elements.length)];

const isAllowedString = (string, maxLength) => string.length <= maxLength;

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '50%';
  alertContainer.style.transform = 'translateY(-50%)';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '50px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.background = 'linear-gradient(45deg, rgb(88, 13, 246), rgb(212, 176, 242))';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_TIME);
};

const clickEscKeydown = (evt, escFunction) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    escFunction();
  }
};

export {getRundomNumber, isAllowedString, getRandomArrayElement, isEscapeKey, showAlert, clickEscKeydown};
