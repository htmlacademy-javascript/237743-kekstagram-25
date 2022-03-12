const PHOTO_DESCRIPTIONS_COUNT = 25;

const NUMBER_OF_COMMENTS = 5;

const IDS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25
];

const DESCRIPTIONS = [
  'This is a photo of the lake',
  'This is a picture of the castle',
  'Its me in London',
  'Dog and cat',
  'Sunset on the sea',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Колобок',
  'Тур Хейердал',
  'Золушка',
  'Микки Маус',
  'Иванушка Дурачок',
  'Илья Муромец',
  'Чингачгук',
]

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

const getRandomArrayElement = (elements) => elements[getRundomNumber(0, elements.length - 1)];

const createComment = () => ({
  id: getRundomNumber(1, 100),
  avatar: `img/avatar-${  getRundomNumber(1, 6)  }.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createPhotoDescription = (i) => ({
  id: IDS[i],
  url: `photos/${  IDS[i]  }.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRundomNumber(15, 200),
  comments: Array.from({length: NUMBER_OF_COMMENTS}, createComment),
});


getRundomNumber(10, 5);
isAllowedString('Here is the short string', 140);

for(let i = 0; i < PHOTO_DESCRIPTIONS_COUNT; i++) {
  console.log(createPhotoDescription(i));
}
