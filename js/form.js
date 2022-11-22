import { isEscapeKey, removeEventListener } from './util.js';
import { resetScale } from './scale.js';
import { onFormChange, resetEffects } from './effects.js';

const formElement = document.querySelector('.img-upload__form');
const fileInputElement = document.querySelector('#upload-file');
const uploadModalElement = document.querySelector('.img-upload__overlay');
const cancelButtonElement = document.querySelector('#upload-cancel');
const inputHashtagElement = formElement.querySelector('.text__hashtags');
const inputCommentElement = formElement.querySelector('.text__description');

const showModal = () => {
  uploadModalElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closeModal = () => {
  uploadModalElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const hideModal = () => {
  closeModal();
  resetScale();
  resetEffects();
  formElement.reset();
};

const isFieldFocused = () =>
  document.activeElement === inputHashtagElement ||
  document.activeElement === inputCommentElement;

const onPopup = (evt) => {
  switch (evt.type) {
    case 'click':
      hideModal();
      removeEventListener(cancelButtonElement, 'click', onPopup);
      removeEventListener(document, 'keydown', onPopup);
      break;
    case 'keydown':
      if (isEscapeKey(evt) && !isFieldFocused()) {
        evt.preventDefault();
        hideModal();
        removeEventListener(document, 'keydown', onPopup);
        removeEventListener(cancelButtonElement, 'click', onPopup);
      }
      break;
    default:
      hideModal();
      removeEventListener(document, 'keydown', onPopup);
      removeEventListener(cancelButtonElement, 'click', onPopup);
      break;
  }
};

const openModalAndAddEscapeListener = () => {
  showModal();
  document.addEventListener('keydown', onPopup);
};

const closeModalAndRemoveEscapeListener = () => {
  closeModal();
  removeEventListener(document, 'keydown', onPopup);
};

const hideModalAndRemoveAllListener = () => {
  hideModal();
  removeEventListener(document, 'keydown', onPopup);
  removeEventListener(cancelButtonElement, 'click', onPopup);
};

fileInputElement.addEventListener('change', () => {
  showModal();
  cancelButtonElement.addEventListener('click', onPopup);
  document.addEventListener('keydown', onPopup);
});

formElement.addEventListener('change', onFormChange);

export {
  hideModalAndRemoveAllListener,
  closeModalAndRemoveEscapeListener,
  openModalAndAddEscapeListener
};
