import {showBigPhoto} from './popup.js';

const userPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPhotoItem = (picture) => {

  const photoItem = userPhotoTemplate.cloneNode(true);

  photoItem.querySelector('.picture__img').src = picture.url;
  photoItem.querySelector('.picture__comments').textContent = picture.comments.length;
  photoItem.querySelector('.picture__likes').textContent = picture.likes;

  photoItem.addEventListener('click', (evt) => {
    evt.preventDefault();
    showBigPhoto(picture);
  });

  return photoItem;
};

export {createPhotoItem};
