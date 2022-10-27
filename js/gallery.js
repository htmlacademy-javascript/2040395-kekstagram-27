import { showBigPhoto, hideBigPhoto, setBigPhotoCloseButtonClickHandler } from './popup.js';
import { createPicture } from './picture.js';
import { isEscapeKey } from './util.js';

const userPhotoList = document.querySelector('.pictures');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    hideBigPhoto();
    document.removeEventListener('keydown', onPopupEscKeydown);
  }
};

const renderPreview = (photo) => {
  const picture = createPicture(photo);

  picture.addEventListener('click', (evt) => {
    if (!evt.target.closest('.picture')) {
      return;
    }

    evt.preventDefault();

    showBigPhoto(photo);
    setBigPhotoCloseButtonClickHandler(() => {
      hideBigPhoto();
      document.removeEventListener('keydown', onPopupEscKeydown);
    });

    document.addEventListener('keydown', onPopupEscKeydown);
  });

  return picture;
};

const renderPreviews = (photos) => {
  userPhotoList.append(...photos.map(renderPreview));
};

export { renderPreviews };
