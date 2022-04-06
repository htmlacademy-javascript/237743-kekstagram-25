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

export {getRundomNumber, isAllowedString, getRandomArrayElement, isEscapeKey};
