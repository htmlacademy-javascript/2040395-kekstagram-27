import { isEscapeKey, removeEventListener } from './util.js';
import { renderComments, clearComments } from './comments.js';
import {
  uploadMoreComment,
  clearCommentMarkupCounterState,
  onSocialComments,
  addEventListenerSocialCommentsLoader
} from './more-comments.js';

const bodyElement = document.querySelector('body');
const bigPictureElement = document.querySelector('.big-picture');
const cancelBigPictureButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const socialCommentLoaderButtonElement = bigPictureElement.querySelector('.social__comments-loader');

const closeModal = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
};

const closeModalByEscape = (evt, typeOfEvent, handleEventFunction) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
    removeEventListener(document, typeOfEvent, handleEventFunction);
  }
};

const onBigPicture = (evt) => {
  switch (evt.type) {
    case 'click':
      closeModal();
      removeEventListener(cancelBigPictureButtonElement, 'click', onBigPicture);
      removeEventListener(document, 'keydown', onBigPicture);
      removeEventListener(socialCommentLoaderButtonElement, 'click', onSocialComments);
      clearCommentMarkupCounterState();
      break;
    case 'keydown':
      closeModalByEscape(evt, 'keydown', onBigPicture);
      removeEventListener(socialCommentLoaderButtonElement, 'click', onSocialComments);
      clearCommentMarkupCounterState();
      break;
    default:
      closeModal();
      break;
  }
};

const renderBigPicture = ((url, likes, comments, description) => {
  bigPictureElement.classList.remove('hidden');
  socialCommentLoaderButtonElement.classList.remove('hidden');

  cancelBigPictureButtonElement.addEventListener('click', onBigPicture);
  document.addEventListener('keydown', onBigPicture);

  bigPictureElement.querySelector('.big-picture__img').querySelector('img').src = url;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.comments-count').textContent = comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = description;

  bodyElement.classList.add('modal-open');

  clearComments();
  renderComments(comments);
  uploadMoreComment();
  addEventListenerSocialCommentsLoader();
});

export { renderBigPicture };
