const getRandomInteger = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (min >= max) {
    return NaN;
  }

  return Math.floor(min + Math.random() * (max + 1 - min));
};

const getRandomArrayItem = (items) => items[getRandomInteger(0, items.length - 1)];

const getUniqueNumberArray = (count) => {
  const uniqueNumbers = new Set();
  while (uniqueNumbers.size < count) {
    uniqueNumbers.add(getRandomInteger(1, count));
  }
  return [...uniqueNumbers];
};

export { getRandomInteger, getRandomArrayItem, getUniqueNumberArray };
