import { isEscapeKey, removeEventListener } from './util.js';
import { resetScale } from './scale.js';
import { onFormChange, resetEffects } from './effects.js';

const form = document.querySelector('.img-upload__form');
const fileInput = document.querySelector('#upload-file');
const uploadModal = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('#upload-cancel');
const inputHashtag = form.querySelector('.text__hashtags');
const inputComment = form.querySelector('.text__description');

const showModal = () => {
  uploadModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closeModal = () => {
  uploadModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const hideModal = () => {
  closeModal();
  resetScale();
  resetEffects();
  form.reset();
};

const isFieldFocused = () =>
  document.activeElement === inputHashtag ||
  document.activeElement === inputComment;

const onPopup = (evt) => {
  switch (evt.type) {
    case 'click':
      hideModal();
      removeEventListener(cancelButton, 'click', onPopup);
      removeEventListener(document, 'keydown', onPopup);
      break;
    case 'keydown':
      if (isEscapeKey(evt) && !isFieldFocused()) {
        evt.preventDefault();
        hideModal();
        removeEventListener(document, 'keydown', onPopup);
        removeEventListener(cancelButton, 'click', onPopup);
      }
      break;
    default:
      hideModal();
      removeEventListener(document, 'keydown', onPopup);
      removeEventListener(cancelButton, 'click', onPopup);
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

fileInput.addEventListener('change', () => {
  showModal();
  cancelButton.addEventListener('click', onPopup);
  document.addEventListener('keydown', onPopup);
});

form.addEventListener('change', onFormChange);

export {
  hideModal,
  closeModalAndRemoveEscapeListener,
  openModalAndAddEscapeListener
};
