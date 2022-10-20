import {commentList} from './comment.js';
import {renderComments} from './render-comments.js';
import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const bigPhoto = document.querySelector('.big-picture');
const closePopupButton = document.querySelector('.big-picture__cancel');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPhoto.classList.add('hidden');
  }
};

const onPopupClose = () => {
  bigPhoto.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  closePopupButton.removeEventListener('click', onPopupClose);
  commentList.innerHTML = '';
};

const showBigPhoto = (picture) => {
  body.classList.add('modal-open');
  bigPhoto.classList.remove('hidden');

  bigPhoto.querySelector('.social__comment-count').classList.add('hidden');
  bigPhoto.querySelector('.comments-loader').classList.add('hidden');

  bigPhoto.querySelector('.big-picture__img img').src = picture.url;
  bigPhoto.querySelector('.likes-count').textContent = picture.likes;
  bigPhoto.querySelector('.social__caption').textContent = picture.description;
  bigPhoto.querySelector('.comments-count').textContent = picture.comments.length;
  renderComments(picture.comments);

  closePopupButton.addEventListener('click', onPopupClose);
  document.addEventListener('keydown', onPopupEscKeydown);
};

export {showBigPhoto};
