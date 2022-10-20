import {createPhotoItem} from './photo-item.js';

const userPhotoList = document.querySelector('.pictures');

const renderPreviews = (pictures) => {
  const previews = [];
  for (let i = 0; i < pictures.length; i++) {
    previews.push(createPhotoItem(pictures[i]));
  }
  userPhotoList.append(...previews);
};

export {renderPreviews, userPhotoList};
