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

const isAllowedString = (string, maxLength) => string.length <= maxLength;

getRundomNumber(10, 5);
isAllowedString('Here is the short string', 140);
