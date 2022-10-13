const PHOTO_COUNT = 25;

const COMMENT_COUNT = 7;

const NAMES = [
  'Дюймовочка',
  'Белоснежка',
  'Серый волк',
  'Змей Горыныч',
  'Василиса Прекрасная',
];

const DESCRIPTIONS = [
  'Прекрасный день для морской прогулки!',
  'Отлично поработали. Теперь можно и отдохнуть.',
];

const MESSAGETEXT = [
  'Всё отлично!',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
];

const getRandomInteger = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (min >= max) {
    return NaN;
  }

  return Math.floor(min + Math.random() * (max + 1 - min));
};

const checkTextLength = (text, maxlength) => text.length <= maxlength;
checkTextLength ('Новый комментарий', 140);

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const addPhotos = () => {

  const addComment = () => {
    const comments = [];
    for (let i = 0; i < COMMENT_COUNT; i++) {
      comments.push({
        id: getRandomInteger(1, 999),
        avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
        message: getRandomArrayElement(MESSAGETEXT),
        name: getRandomArrayElement(NAMES),
      });
    }
    return comments;
  };
  const addPhoto = () => ({
    id: getRandomInteger(1, 25),
    url: `photos/${getRandomInteger(1, 25)}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(15, 200),
    comments: addComment(),
  });

  Array.from({length: PHOTO_COUNT}, addPhoto);
};

addPhotos();
