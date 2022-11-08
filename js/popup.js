import {renderComments, clearComments} from './popup-comments.js';

const popupPhoto = document.querySelector('.big-picture');
const bigPicture = popupPhoto.querySelector('.big-picture__img img');
const likesCount = popupPhoto.querySelector('.likes-count');
const socialCaption = popupPhoto.querySelector('.social__caption');
const commentsCount = popupPhoto.querySelector('.comments-count');
const closeButton = document.querySelector('.big-picture__cancel');

let handleCloseButtonClick = null;

const setBigPhotoCloseButtonClickHandler = (callback) => {
  handleCloseButtonClick = callback;
};

const onCloseButtonClick = (evt) => {
  evt.preventDefault();

  handleCloseButtonClick?.();
};

const hideBigPhoto = () => {
  popupPhoto.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeButton.removeEventListener('click', onCloseButtonClick);
};

const openPopup = () => {
  popupPhoto.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeButton.addEventListener('click', onCloseButtonClick);
};

const showBigPhoto = (photo) => {
  bigPicture.src = photo.url;
  likesCount.textContent = photo.likes;
  socialCaption.textContent = photo.description;
  commentsCount.textContent = photo.comments.length;

  clearComments();

  renderComments(photo.comments);
  openPopup();
};

export { showBigPhoto, hideBigPhoto, setBigPhotoCloseButtonClickHandler };
