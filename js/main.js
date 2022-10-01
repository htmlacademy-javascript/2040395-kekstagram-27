const getRandomInteger = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (min >= max) {
    return NaN;
  }

  return Math.floor(min + Math.random() * (max + 1 - min));
};

getRandomInteger(0, 5);

const checkCommentLength = (text, maxlength) => text.length <= maxlength;
checkCommentLength ('Новый комментарий', 140);
