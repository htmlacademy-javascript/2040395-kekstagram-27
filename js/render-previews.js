import { createPhotoItem } from './photo-item.js';

const userPhotoList = document.querySelector('.pictures');

const renderPreviews = (array) => {
  const pictures = [];
  for (let i = 0; i < array.length; i++) {
    pictures.push(createPhotoItem(array[i]));
  }
  userPhotoList.append(...pictures);
};

export {renderPreviews};
