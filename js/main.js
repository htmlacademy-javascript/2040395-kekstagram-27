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

const MESSAGES = [
  'Всё отлично!',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
];

let indexes = [];

const checkTextLength = (text, maxlength) => text.length <= maxlength;

const getRandomInteger = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (min >= max) {
    return NaN;
  }

  return Math.floor(min + Math.random() * (max + 1 - min));
};

function getUniqueNumberArray(count) {
  const uniqueNumbers = new Set();
  while (uniqueNumbers.size < count) {
    uniqueNumbers.add(getRandomInteger(1, count));
  }
  return [...uniqueNumbers];
}

const getRandomArrayItem = (items) => items[getRandomInteger(0, items.length - 1)];

const getCommentArray = () => {
  const comments = [];
  for (let i = 0; i < COMMENT_COUNT; i++) {
    comments.push({
      id: indexes[i],
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: getRandomArrayItem(MESSAGES),
      name: getRandomArrayItem(NAMES),
    });
  }
  return comments;
};

const getPhotoArray = () => {
  const photos = [];
  for (let i = 0; i < PHOTO_COUNT; i++) {
    photos.push({
      id: i + 1,
      url: `photos/${i + 1}.jpg`,
      description: getRandomArrayItem(DESCRIPTIONS),
      likes: getRandomInteger(15, 200),
      comments: getCommentArray(),
    });
  }
  return photos;
};

checkTextLength ('Новый комментарий', 140);
indexes = getUniqueNumberArray(COMMENT_COUNT);
getPhotoArray();
