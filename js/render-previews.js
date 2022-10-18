import {getPhotoArray} from './data.js';

const userPhotoList = document.querySelector('.pictures');

const userPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const userPhotoListFragment = document.createDocumentFragment();

const photos = getPhotoArray();

const renderPreviews = () => {
  photos.forEach(({url, comments, likes}) => {
    const photoItem = userPhotoTemplate.cloneNode(true);

    photoItem.querySelector('.picture__img').src = url;
    photoItem.querySelector('.picture__comments').textContent = comments.length;
    photoItem.querySelector('.picture__likes').textContent = likes;

    userPhotoListFragment.appendChild(photoItem);
  });
  userPhotoList.appendChild(userPhotoListFragment);
};

export {renderPreviews};
