import { getRundomNumber, getRandomArrayElement } from './util.js';

const PHOTO_DESCRIPTIONS_COUNT = 25;
const NUMBER_OF_COMMENTS = 5;
const PHOTO_DESCRIPTIONS = [
  'Красивое озеро',
  'Это старинный замой в Англии',
  'Я наконец в Лондоне!',
  'Дружба кота и собаки',
  'Закат на море',
  'Посмотрите на эти пирожные!',
  'Пора садиться в поезд'
];
const COMMENTS_MESSAGES = [
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
];

const createComment = () => ({
  id: getRundomNumber(1, 100),
  avatar: `img/avatar-${  getRundomNumber(1, 6)  }.svg`,
  message: getRandomArrayElement(COMMENTS_MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createPhotoDescription = (i) => ({
  id: i,
  url: `photos/${ i }.jpg`,
  description: getRandomArrayElement(PHOTO_DESCRIPTIONS),
  likes: getRundomNumber(15, 200),
  comments: Array.from({length: NUMBER_OF_COMMENTS}, createComment),
});

const getListPhotosDescriptions = () => {
  const listPhotosDescriptions = [];

  for(let i = 0; i < PHOTO_DESCRIPTIONS_COUNT; i++) {
    listPhotosDescriptions.push(createPhotoDescription(i + 1));
  }

  return listPhotosDescriptions;
};

export { getListPhotosDescriptions };
