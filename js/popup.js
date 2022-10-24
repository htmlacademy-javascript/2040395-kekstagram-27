import {isEscapeKey} from './util.js';
import {renderComments, clearComments} from './popup-comment.js';

const popupPhoto = document.querySelector('.big-picture');
const bigPicture = popupPhoto.querySelector('.big-picture__img img');
const likesCount = popupPhoto.querySelector('.likes-count');
const socialCaption = popupPhoto.querySelector('.social__caption');
const commentsCount = popupPhoto.querySelector('.comments-count');
const socialCommentCount = popupPhoto.querySelector('.social__comment-count');
const commentsLoader = popupPhoto.querySelector('.comments-loader');
const closeButton = document.querySelector('.big-picture__cancel');

socialCommentCount.classList.add('hidden');
commentsLoader.classList.add('hidden');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    popupPhoto.classList.add('hidden');
  }
};

const closePopup = () => {
  popupPhoto.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
};


const onCloseButtonClick = () => {
  closePopup();
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
  openPopup();

  clearComments();
  renderComments(photo.comments);
};

export {showBigPhoto, onPopupEscKeydown};
