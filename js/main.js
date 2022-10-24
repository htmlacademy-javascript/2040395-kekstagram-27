import {getPhotoArray} from './data.js';
import {createPicture} from './picture.js';
import {showBigPhoto, onPopupEscKeydown} from './popup.js';

const thumbnails = getPhotoArray();
const userPhotoList = document.querySelector('.pictures');

const onThumbnailClick = (thumbnail, photo) => {
  thumbnail.addEventListener('click', (evt) => {
    if (evt.target.closest('.picture')) {
      evt.preventDefault();
      showBigPhoto(photo);
      document.addEventListener('keydown', onPopupEscKeydown);
    }
  });
};

const renderPreviews = (photos) => {
  const previews = [];
  photos.forEach((element, index) => {
    previews.push(createPicture(element));
    onThumbnailClick(previews[index], photos[index]);
  });
  userPhotoList.append(...previews);
};

renderPreviews(thumbnails);
